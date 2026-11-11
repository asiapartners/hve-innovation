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
let teamAccessibility = [];
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
    assert.equal(await page.locator("#mapping .stage-map-item").count(), 6);
    assert.match(await page.locator("header").textContent(), /Relationship Manager Intelligence Experience/);
    assert.equal(await page.locator("#adapt-project").getAttribute("open"), null);
    await page.keyboard.press("Tab");
    assert.equal(await page.locator(":focus").textContent(), "Skip to current step");
    await page.keyboard.press("Enter");
    assert.equal(await page.locator(":focus").getAttribute("id"), "main");

    assert.equal(await page.locator(".team-member").count(), 4);
    assert.equal(await page.locator("#team-name").inputValue(), "");
    assert.equal(await page.locator(".team-remove:disabled").count(), 4);
    assert.equal(await page.locator("#copy-team").isDisabled(), true);
    if (process.env.WORKSHOP_EVIDENCE_DIR) {
        await mkdir(process.env.WORKSHOP_EVIDENCE_DIR, { recursive: true });
        await page.locator("#team-setup").screenshot({ path: join(process.env.WORKSHOP_EVIDENCE_DIR, "workshop-team-empty.png") });
    }
    await page.locator("#team-name").fill("Example workshop");
    for (let index = 0; index < 4; index++) {
        await page.locator(`#team-member-${index}-name`).fill(`Example member ${index + 1}`);
        await page.locator(`#team-member-${index}-handle`).fill(`@example-${index + 1}`);
    }
    await page.locator("#team-member-0-handle").fill("https://github.com/example");
    await page.locator("#save-team").click();
    assert.match(await page.locator("#team-error").textContent(), /not a URL/);
    assert.equal(await page.locator(":focus").getAttribute("id"), "team-member-0-handle");
    assert.equal((await server.snapshot()).team.name, "");
    await page.locator("#team-member-0-handle").fill("@example-1");
    await page.locator("#team-member-1-handle").fill("@EXAMPLE-1");
    await page.locator("#save-team").click();
    assert.match(await page.locator("#team-error").textContent(), /already listed/);
    await page.locator("#team-member-1-handle").fill("@example-2");
    for (let index = 4; index < 8; index++) {
        await page.locator("#add-member").click();
        assert.equal(await page.locator(":focus").getAttribute("id"), `team-member-${index}-name`);
        await page.locator(`#team-member-${index}-name`).fill(`Example member ${index + 1}`);
        await page.locator(`#team-member-${index}-handle`).fill(`example-${index + 1}`);
    }
    assert.equal(await page.locator(".team-member").count(), 8);
    assert.equal(await page.locator("#add-member").isDisabled(), true);
    assert.equal(await page.locator("#team-member-0-name").inputValue(), "Example member 1");

    await page.route("**/state", async (route) => {
        if (route.request().method() === "POST") {
            await route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ error: "Synthetic save failure" }) });
        } else await route.continue();
    });
    await page.locator("#save-team").click();
    await page.locator("#team-error").waitFor({ state: "visible" });
    assert.match(await page.locator("#team-error").textContent(), /could not be saved/);
    assert.match(await page.locator("#team-save-status").textContent(), /Unsaved/);
    assert.equal(await page.locator("#team-member-7-name").inputValue(), "Example member 8");
    assert.equal((await server.snapshot()).team.name, "");
    await page.unroute("**/state");
    await page.locator("#save-team").click();
    await page.waitForFunction(() => document.querySelector("#team-save-status").textContent === "Saved locally for all workshop stages.");
    assert.equal(await page.locator("#error").isVisible(), false);
    assert.equal(await page.locator("#team-member-0-handle").inputValue(), "example-1");
    assert.equal((await server.snapshot()).team.members.length, 8);

    for (const width of [320, 720]) {
        await page.setViewportSize({ width, height: 900 });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
            true, `Eight-member team form reflows at ${width}px`);
    }
    if (process.env.WORKSHOP_EVIDENCE_DIR) {
        await page.setViewportSize({ width: 390, height: 900 });
        await page.locator("#team-setup").screenshot({ path: join(process.env.WORKSHOP_EVIDENCE_DIR, "workshop-team-mobile.png") });
    }
    await page.setViewportSize({ width: 1440, height: 1100 });
    if (process.env.WORKSHOP_EVIDENCE_DIR) {
        await page.locator("#team-setup").screenshot({ path: join(process.env.WORKSHOP_EVIDENCE_DIR, "workshop-team-desktop.png") });
    }
    await page.addScriptTag({ path: resolve(here, "../node_modules/axe-core/axe.min.js") });
    teamAccessibility = await page.evaluate(async () => (await window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] },
    })).violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })));

    await page.locator("#steps button").nth(1).click();
    await page.waitForFunction(() => document.querySelector("#step-label").textContent === "STAGE 2 OF 6");
    assert.equal(await page.locator("#team-setup").isVisible(), false);
    assert.equal(await page.locator("#team-reference-name").textContent(), "Example workshop");
    await page.locator("#team-reference-members > summary").click();
    assert.equal(await page.locator("#team-roster li").count(), 8);
    await page.locator("#copy-team").click();
    const teamText = await page.evaluate(() => window.copiedPrompts.at(-1));
    assert.match(teamText, /^Company \/ team: Example workshop/);
    assert.match(teamText, /Example member 8 \(@example-8\)/);
    await page.reload();
    await page.locator(".activity").first().waitFor();
    assert.equal(await page.locator("#team-reference-name").textContent(), "Example workshop");
    await page.locator("#edit-team").click();
    await page.locator("#team-setup").waitFor({ state: "visible" });
    assert.equal(await page.locator(".team-member").count(), 8);
    await page.locator("#team-member-7-name").fill("Updated member 8");
    await page.locator("#steps button").nth(1).click();
    await page.waitForFunction(() => document.querySelector("#step-label").textContent === "STAGE 2 OF 6");
    assert.equal(await page.locator("#team-pending").isVisible(), true);
    await page.locator("#edit-team").click();
    await page.locator("#team-setup").waitFor({ state: "visible" });
    assert.equal(await page.locator("#team-member-7-name").inputValue(), "Updated member 8", "Navigation retains unsaved edits");
    await server.update({ role: "sme" });
    await page.waitForFunction(() => document.querySelector("#role").value === "sme");
    assert.equal(await page.locator("#team-member-7-name").inputValue(), "Updated member 8", "Polling retains unsaved edits");
    for (let count = 8; count > 4; count--) await page.locator(".team-remove").last().click();
    assert.equal(await page.locator(".team-member").count(), 4);
    assert.equal(await page.locator(".team-remove:disabled").count(), 4);
    assert.equal(await page.locator("#add-member").isDisabled(), false);
    await page.locator("#save-team").click();
    await page.waitForFunction(() => document.querySelector("#team-save-status").textContent === "Saved locally for all workshop stages.");
    await page.selectOption("#role", "all");
    await page.waitForFunction(() => document.querySelector("#role").value === "all" &&
        document.querySelector("#status").textContent === "Personal progress saved. This is not human approval.");
    await page.reload();
    await page.locator(".activity").first().waitFor();
    assert.equal(await page.locator(".team-member").count(), 4);
    assert.equal(await page.locator("#team-member-0-name").inputValue(), "Example member 1");

    for (let step = 1; step <= 6; step++) {
        await page.locator("#steps button").nth(step - 1).focus();
        await page.keyboard.press("Enter");
        await page.waitForFunction((id) => document.querySelector("#step-label").textContent === `STAGE ${id} OF 6` &&
            document.activeElement?.id === "main", step);
        assert.equal(await page.locator(":focus").getAttribute("id"), "main");
        const model = workshop.steps[step - 1];
        assert.equal(await page.locator("#team-reference-name").textContent(), "Example workshop");
        assert.equal(await page.locator("#team-setup").isVisible(), step === 1);
        assert.equal(await page.locator("#stage-input").textContent(), model.entry);
        assert.equal(await page.locator("#stage-output").textContent(), model.exit);
        assert.equal(await page.locator("#full-source").getAttribute("open"), null);
        assert.equal(await page.locator("#reference-prompts").getAttribute("open"), null);
        const mapRow = page.locator(`#mapping [data-stage-id="${step}"]`);
        assert.equal(await mapRow.locator(".stage-map-outcome p").textContent(), model.exit);
        assert.equal(await mapRow.getAttribute("aria-current"), "step");
        assert.equal(await mapRow.locator("details[open]").count(), 0);
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
        await page.locator("#full-source summary").click();
        await connections.locator(":scope > summary").click();
        assert.equal(await page.locator("#mapping .stage-map-item").count(), 6);
        assert.equal(await page.locator("#mapping table").count(), 0);
        await page.locator("#mapping [data-stage-id=\"3\"] .stage-map-details").first().locator("summary").click();
        assert.equal(await page.locator("#mapping [data-stage-id=\"3\"] .stage-map-list a").count(),
            new Set(workshop.steps[2].activities.flatMap((item) => item.components)).size);
        await page.locator("#mapping [data-stage-id=\"3\"] .stage-map-details").nth(1).locator("summary").click();
        assert.ok((await page.locator("#mapping [data-stage-id=\"3\"] .artifact").count()) > 0);
        for (const width of [320, 720]) {
            await page.setViewportSize({ width, height: 900 });
            assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
                true, `Expanded stage map reflows at ${width}px`);
        }
        await page.setViewportSize({ width: 1440, height: 1100 });
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
    await page.locator("#connections > summary").click();
    await page.locator("#mapping [data-stage-id=\"5\"] .stage-map-button").click();
    await page.waitForFunction(() => document.querySelector("#step-label").textContent === "STAGE 5 OF 6");
    assert.deepEqual(network, [], "Runtime must not request third-party resources");
    assert.deepEqual(failures, [], "No browser errors");
    const violations = [...results, { step: "eight-member team", violations: teamAccessibility }]
        .flatMap((r) => r.violations.map((v) => ({ step: r.step, ...v })));
    const report = { engine: "system Chrome via Playwright", stages: results, runtimeExternalRequests: network,
        browserErrors: failures, keyboard: "skip link, stage buttons, D3 stage control, hints, checkbox",
        walkthrough: "all 21 source-backed exercises visible by default; exact prompt copying without submission",
        team: { members: "starts at four; adds up to eight; can remove back to four", accessibility: teamAccessibility,
            persistence: "saved roster survives reload and is available in all stages; unsaved drafts survive navigation and polling",
            errors: "invalid URLs, duplicate handles and failed saves preserve the draft without claiming success" },
        persistence: "survives page reload", reflow: "all six primary walkthrough stages and team form at 320px and 720px passed" };
    if (process.env.WORKSHOP_EVIDENCE_DIR) await writeFile(join(process.env.WORKSHOP_EVIDENCE_DIR, "browser-results.json"), JSON.stringify(report, null, 2));
    assert.deepEqual(violations, [], "Axe WCAG A/AA violations");
    console.info(JSON.stringify(report, null, 2));
} finally {
    await browser.close(); await server.close(); await rm(directory, { recursive: true, force: true });
}
