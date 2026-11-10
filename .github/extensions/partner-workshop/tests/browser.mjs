// Copyright (c) Microsoft Corporation. All rights reserved.
// SPDX-License-Identifier: MIT
import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { startServer } from "../server.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const directory = await mkdtemp(join(tmpdir(), "workshop-browser-"));
const server = await startServer({ stateDirectory: directory });
const browser = await chromium.launch({ channel: "chrome" });
const failures = [];
const network = [];
const results = [];
try {
    const workshop = await (await fetch(new URL("workshop", server.url))).json();
    const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, reducedMotion: "reduce", bypassCSP: true });
    await page.addInitScript(() => {
        window.copiedPrompts = [];
        Object.defineProperty(navigator, "clipboard", {
            value: { writeText: async (text) => { window.copiedPrompts.push(text); } },
        });
    });
    page.on("pageerror", (error) => failures.push(error.message));
    page.on("request", (request) => { if (!request.url().startsWith(server.url)) network.push(request.url()); });
    await page.goto(server.url);
    await page.locator(".activity").first().waitFor();
    assert.equal(await page.locator("#steps button").count(), 6);
    assert.equal(await page.locator("#journey svg").count(), 1);
    assert.match(await page.locator("header").textContent(), /Relationship Manager Intelligence Experience/);
    assert.equal(await page.locator("#adapt-project").getAttribute("open"), null);
    await page.keyboard.press("Tab");
    assert.equal(await page.locator(":focus").textContent(), "Skip to current step");
    await page.keyboard.press("Enter");
    assert.equal(await page.locator(":focus").getAttribute("id"), "main");
    for (let step = 1; step <= 6; step++) {
        await page.locator("#steps button").nth(step - 1).focus();
        await page.keyboard.press("Enter");
        await page.waitForFunction((id) => document.querySelector("#step-label").textContent === `STAGE ${id} OF 6` &&
            document.activeElement?.id === "main", step);
        assert.equal(await page.locator(":focus").getAttribute("id"), "main");
        const model = workshop.steps[step - 1];
        assert.equal(await page.locator("#stage-input").textContent(), model.entry);
        assert.equal(await page.locator("#stage-output").textContent(), model.exit);
        assert.equal(await page.locator("#full-source").getAttribute("open"), null);
        assert.equal(await page.locator("#reference-prompts").getAttribute("open"), null);
        assert.equal(await page.locator(".walkthrough").count(), model.activities.length);
        for (const activity of model.activities) {
            const primary = page.locator(`[data-activity-id="${activity.id}"] .walkthrough`);
            assert.equal(await primary.isVisible(), true, `${activity.id}: exercise is visible without expanding details`);
            assert.equal(await primary.evaluate((element) => element.closest("details") === null), true);
            assert.equal(await primary.getAttribute("data-section"), activity.section);
            assert.ok((await primary.textContent()).length > 100);
            for (const [label, path] of activity.sources) {
                const link = page.locator(`[data-activity-id="${activity.id}"]`).getByRole("link", { name: label });
                assert.equal(await link.isVisible(), true);
                assert.equal(await link.getAttribute("href"), `source?path=${encodeURIComponent(path)}`);
            }
        }
        assert.match((await page.locator(".walkthrough").allTextContents()).join("\n"), /Client A/);
        const copyButtons = page.locator(".walkthrough .prompt-actions button");
        for (let index = 0; index < await copyButtons.count(); index++) {
            await copyButtons.nth(index).click();
            const copied = await page.evaluate(() => window.copiedPrompts.at(-1));
            assert.ok(workshop.documents[model.file].prompts.some((prompt) => prompt.text === copied),
                "Inline copy must preserve the exact source prompt without submitting it");
        }
        const connections = page.locator("#connections");
        if (await connections.getAttribute("open") !== null) await connections.locator(":scope > summary").click();
        for (const width of [320, 720]) {
            await page.setViewportSize({ width, height: 900 });
            assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
                true, `Stage ${step}: ${width}px primary walkthrough reflow`);
        }
        await page.setViewportSize({ width: 1440, height: 1100 });
        if ([1, 3].includes(step) && process.env.WORKSHOP_EVIDENCE_DIR) {
            await mkdir(process.env.WORKSHOP_EVIDENCE_DIR, { recursive: true });
            await page.locator(".activity").first().screenshot({
                path: join(process.env.WORKSHOP_EVIDENCE_DIR, `workshop-stage-${step}-activity.png`),
            });
        }
        const hint = page.locator(".activity").first().locator(".hints");
        await hint.locator("summary").first().focus();
        await page.keyboard.press("Enter");
        assert.equal(await hint.getAttribute("open"), "");
        const nested = hint.locator("details").first();
        await nested.locator("summary").first().focus();
        await page.keyboard.press("Enter");
        assert.equal(await nested.getAttribute("open"), "");
        await page.locator("#full-source summary").click();
        assert.ok((await page.locator("#source").textContent()).length > 1000);
        await connections.locator(":scope > summary").click();
        for (const summary of ["Mermaid: evidence and approval flow", "PlantUML: facilitation and product boundaries"]) {
            const details = connections.locator("details").filter({ has: page.getByText(summary, { exact: true }) });
            if (await details.getAttribute("open") === null) await details.locator("summary").first().click();
            const image = details.locator("img");
            await image.waitFor({ state: "visible" });
            assert.equal(await image.evaluate((img) => img.complete && img.naturalWidth > 0), true);
            if (step === 1 && process.env.WORKSHOP_EVIDENCE_DIR) {
                await mkdir(process.env.WORKSHOP_EVIDENCE_DIR, { recursive: true });
                await image.screenshot({ path: join(process.env.WORKSHOP_EVIDENCE_DIR, summary.startsWith("Mermaid") ? "workshop-mermaid.png" : "workshop-plantuml.png") });
            }
        }
        await page.addScriptTag({ path: resolve(here, "../node_modules/axe-core/axe.min.js") });
        const axe = await page.evaluate(async () => window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] } }));
        results.push({ step, violations: axe.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })) });
        await page.locator("#full-source summary").click();
    }
    await page.locator("#steps button").nth(2).click();
    await page.waitForFunction(() => document.querySelector("#step-label").textContent.includes("3 OF"));
    await page.selectOption("#role", "design");
    await page.waitForFunction(() => document.querySelectorAll(".activity").length === 2);
    assert.ok((await page.locator(".activity").allTextContents()).every((text) => text.includes("Design")));
    const first = page.locator("[data-activity]").first();
    await first.focus(); await page.keyboard.press("Space");
    await page.waitForFunction(() => document.querySelector("#count").textContent.startsWith("1 /"));
    await page.reload();
    await page.locator(".activity").first().waitFor();
    assert.equal(await page.locator("#role").inputValue(), "design");
    assert.equal(await page.locator("[data-activity]").first().isChecked(), true);
    await page.selectOption("#role", "all");
    await page.waitForFunction(() => document.querySelectorAll(".activity").length > 2);
    await page.locator("#reference-prompts > summary").click();
    const prompt = page.locator("#prompts details").first();
    await prompt.locator("summary").click();
    assert.ok((await prompt.locator("code").textContent()).includes("/rpi-research"));
    await page.locator("#journey [role=button]").first().focus();
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => document.querySelector("#step-label").textContent.includes("1 OF"));
    assert.equal(await page.locator("#previous").isDisabled(), true);
    if (process.env.WORKSHOP_EVIDENCE_DIR) {
        await mkdir(process.env.WORKSHOP_EVIDENCE_DIR, { recursive: true });
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({ path: join(process.env.WORKSHOP_EVIDENCE_DIR, "workshop-desktop.png"), fullPage: false });
    }
    await page.setViewportSize({ width: 320, height: 900 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, "320px page reflow");
    await page.setViewportSize({ width: 720, height: 900 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, "200% equivalent reflow");
    assert.deepEqual(network, [], "Runtime must not request third-party resources");
    assert.deepEqual(failures, [], "No browser errors");
    const violations = results.flatMap((r) => r.violations.map((v) => ({ step: r.step, ...v })));
    const report = { engine: "system Chrome via Playwright", stages: results, runtimeExternalRequests: network,
        browserErrors: failures, keyboard: "skip link, stage buttons, D3 stage control, hints, checkbox",
        walkthrough: "all 21 source-backed exercises visible by default; exact prompt copying without submission",
        persistence: "survives page reload", reflow: "all six primary walkthrough stages at 320px and 720px passed" };
    if (process.env.WORKSHOP_EVIDENCE_DIR) await writeFile(join(process.env.WORKSHOP_EVIDENCE_DIR, "browser-results.json"), JSON.stringify(report, null, 2));
    assert.deepEqual(violations, [], "Axe WCAG A/AA violations");
    console.info(JSON.stringify(report, null, 2));
} finally {
    await browser.close(); await server.close(); await rm(directory, { recursive: true, force: true });
}
