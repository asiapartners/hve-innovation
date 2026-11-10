// Copyright (c) Microsoft Corporation. All rights reserved.
// SPDX-License-Identifier: MIT
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { extractDocument, loadWorkshop, steps } from "../content.mjs";
import { repoRoot, startServer, validateState } from "../server.mjs";

test("workshop model covers the real agenda and all available referenced components", async () => {
    const workshop = await loadWorkshop(repoRoot);
    assert.deepEqual(steps.map((s) => s.minutes), [30, 30, 90, 30, 60, 30]);
    assert.equal(steps.reduce((n, s) => n + s.minutes, 0), 270);
    assert.ok(Object.values(workshop.components).every((c) => c.available));
    const ids = steps.flatMap((s) => s.activities.map((a) => a.id));
    assert.equal(ids.length, new Set(ids).size);
    assert.equal(workshop.documents["partner-workshop.md"].prompts.length, 0);
    assert.equal(workshop.documents["partner-workshop-publishing.md"].prompts.length, 4);
    const rolePrompts = workshop.documents["partner-workshop-role-tracks.md"].prompts;
    assert.ok(rolePrompts.some((p) => p.text.startsWith("/rpi-research")));
    assert.ok(rolePrompts.some((p) => /Do not\s+implement or publish anything\./.test(p.text)));
    assert.ok(rolePrompts.every((p) => !p.text.includes("home-screen-sketch.png")));
});

test("workshop guides and canvas text target the GitHub Copilot app, not VS Code", async () => {
    const workshop = await loadWorkshop(repoRoot);
    const canvasText = [
        ...Object.values(workshop.documents).map((d) => d.markdown),
        ...steps.flatMap((s) => [s.purpose, ...s.activities.flatMap((a) => [a.title, a.guidance, ...a.hints])]),
        ...workshop.gaps,
        await readFile(new URL("../web/index.html", import.meta.url), "utf8"),
    ];
    assert.deepEqual(canvasText.flatMap((t) => t.match(/VS ?Code|Visual Studio|Codespaces?|\.vscode|Copilot Chat/g) ?? []), []);
});

test("source extraction preserves prompt contents, ignores headings in fences and includes child sections", () => {
    const markdown = "---\ntitle: Source\n---\n## Parent\n### Child\n   ```text\n   /rpi-plan\n   ## not a heading\n   Save to `.copilot-tracking/plans/`.\n   ```\n## Next\nend";
    const parsed = extractDocument(markdown);
    assert.deepEqual(parsed.sections.map((s) => s.title), ["Parent", "Child", "Next"]);
    assert.equal(parsed.prompts[0].text, "/rpi-plan\n## not a heading\nSave to `.copilot-tracking/plans/`.");
    assert.ok(parsed.sections[0].markdown.includes("### Child"));
    assert.ok(!parsed.sections[0].markdown.includes("## Next"));
});

test("invalid progress cannot impersonate review approval or reference unknown activities", () => {
    for (const value of [{ step: 7 }, { role: "admin" }, { approved: true },
        { completed: ["unknown"] }, { completed: ["align", "align"] }, null, []]) {
        assert.throws(() => validateState(value, true));
    }
    assert.deepEqual(validateState({ step: 3, role: "design" }, true), { step: 3, role: "design" });
});

test("loopback server persists across fresh panels and rejects unsafe routes and writes", async () => {
    const directory = await mkdtemp(join(tmpdir(), "workshop-test-"));
    const logs = [];
    let first;
    let second;
    try {
        first = await startServer({ stateDirectory: directory, log: (message) => logs.push(message) });
        const patch = (url, body, headers = {}) => fetch(new URL("state", url), {
            method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(body),
        });
        assert.equal((await fetch(first.url)).status, 200);
        assert.equal((await fetch(first.url, { headers: { "Sec-Fetch-Site": "cross-site", "Sec-Fetch-Dest": "iframe" } })).status, 200);
        assert.equal((await patch(first.url, { step: 3, role: "design", completed: ["align"] })).status, 200);
        second = await startServer({ stateDirectory: directory });
        assert.deepEqual((await second.snapshot()).progress, { step: 3, role: "design", completed: ["align"] });
        await Promise.all([first.update({ role: "pm" }), second.update({ step: 5 })]);
        assert.deepEqual((await second.snapshot()).progress, { step: 5, role: "pm", completed: ["align"] });
        assert.equal((await patch(first.url, { approved: true })).status, 400);
        assert.equal((await patch(first.url, { step: 1 }, { Origin: "https://example.com" })).status, 403);
        assert.equal((await patch(first.url, { step: 1 }, { "Sec-Fetch-Site": "cross-site" })).status, 403);
        assert.equal((await fetch(new URL("source?path=../../etc/passwd", first.url))).status, 404);
        assert.equal((await fetch(new URL("source?path=.github/plugin.json", first.url))).status, 404);
        assert.equal((await fetch(new URL("/", first.url))).status, 404);
        const source = await fetch(new URL("source?path=docs/getting-started/partner-workshop.md", first.url));
        assert.equal(source.status, 200);
        assert.ok((await source.text()).includes("Workshop Agenda"));
        for (const name of ["d3.min.js", "marked.js", "purify.js", "handoffs.svg", "components.svg"]) {
            const response = await fetch(new URL(name, first.url));
            assert.equal(response.status, 200, name);
        }
        assert.deepEqual(logs, []);
    } finally {
        await first?.close(); await second?.close();
        await rm(directory, { recursive: true, force: true });
    }
});

test("launcher, skill and extension are registered and have no automatic workshop mutations", async () => {
    const plugin = JSON.parse(await readFile(join(repoRoot, ".github/plugin.json"), "utf8"));
    assert.ok(plugin.commands.includes("prompts/workshop/partner-workshop.prompt.md"));
    assert.ok(plugin.skills.includes("skills/workshop/partner-workshop"));
    assert.ok(plugin.extensions.includes("extensions"));
    const skill = await readFile(join(repoRoot, ".github/skills/workshop/partner-workshop/SKILL.md"), "utf8");
    const prompt = await readFile(join(repoRoot, ".github/prompts/workshop/partner-workshop.prompt.md"), "utf8");
    assert.ok(skill.includes("../../../extensions/partner-workshop/prepare.mjs"));
    assert.ok(skill.includes("partner-workshop-guide"));
    assert.ok(prompt.includes("partner-workshop"));
    assert.ok(!prompt.includes("model:"));
});
