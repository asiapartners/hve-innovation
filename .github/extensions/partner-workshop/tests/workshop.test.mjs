// Copyright (c) Microsoft Corporation. All rights reserved.
// SPDX-License-Identifier: MIT
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { extractDocument, loadWorkshop, steps } from "../content.mjs";
import { repoRoot, startServer, validateState } from "../server.mjs";
import { emptyTeam, validateTeam } from "../team.mjs";

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
        ...steps.flatMap((s) => [s.title, s.purpose, s.entry, s.exit,
            ...s.activities.flatMap((a) => [a.title, a.guidance, ...a.hints])]),
        ...workshop.gaps,
        await readFile(new URL("../web/index.html", import.meta.url), "utf8"),
    ];
    assert.deepEqual(canvasText.flatMap((t) => t.match(/VS ?Code|Visual Studio|Codespaces?|\.vscode|Copilot Chat/g) ?? []), []);
});

test("the primary walkthrough carries the FSI case across source-backed activities", async () => {
    const workshop = await loadWorkshop(repoRoot);
    for (const step of workshop.steps) {
        assert.ok(step.entry && step.exit, `Stage ${step.id} must connect its incoming and outgoing handoff`);
        const document = workshop.documents[step.file];
        const sections = step.activities.map((item) => document.sections.find((s) => s.title === item.section));
        const primary = sections.map((s) => s.markdown).join("\n");
        assert.match(primary, /Client A/, `Stage ${step.id} must continue the sample, not ask for a new scenario`);
        assert.doesNotMatch(primary, /Use your own project or|when participants do not bring a project/);
        assert.doesNotMatch(primary, /Topic: \[topic|Session name: \[short name/);
        if ([3, 4, 6].includes(step.id)) {
            for (const fixture of ["CRM-01", "MAIL-01", "Client B"]) assert.ok(primary.includes(fixture));
        }
        if (step.id === 3) assert.ok(sections.every((s) => !s.markdown.includes("## Role facilitation reference")));
        if (step.id === 6) {
            assert.match(primary, /Not run/);
            assert.doesNotMatch(primary, /```text\s+\/rpi-implement/);
        }
    }
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

test("team validation accepts draft rosters and normalizes names and handles within four to eight slots", () => {
    const draft = emptyTeam();
    draft.name = "  \u00c9quipe Example  ";
    draft.members[0] = { name: "  Example Member  ", handle: " @member-one " };
    draft.members[1] = { name: "", handle: "member_org" };
    const normalized = validateTeam(draft);
    assert.equal(normalized.name, "\u00c9quipe Example");
    assert.deepEqual(normalized.members[0], { name: "Example Member", handle: "member-one" });
    assert.deepEqual(normalized.members[1], { name: "", handle: "member_org" });
    assert.equal(normalized.members.length, 4);
    assert.equal(draft.members[0].handle, " @member-one ", "Validation does not modify an unsaved draft");
    assert.equal(validateTeam({ ...draft, members: [...draft.members, ...emptyTeam().members] }).members.length, 8);

    const invalid = [
        null, [], {}, { ...draft, approved: true },
        { ...draft, name: "x".repeat(121) }, { ...draft, name: "Two\nlines" },
        { ...draft, members: draft.members.slice(0, 3) },
        { ...draft, members: [...draft.members, ...draft.members, draft.members[0]] },
        { ...draft, members: new Array(4) },
        ...[null, {}, { name: "", handle: "", approved: true }, { name: "x".repeat(121), handle: "" },
            { name: "", handle: "https://github.com/example" }, { name: "", handle: "has space" },
            { name: "", handle: "x".repeat(40) }, { name: "", handle: "@@example" },
            { name: "", handle: "line\nbreak" }].map((member) => ({ ...draft, members: [member, ...draft.members.slice(1)] })),
        { ...draft, members: [draft.members[0], { name: "", handle: "@MEMBER-ONE" }, ...draft.members.slice(2)] },
    ];
    for (const team of invalid) assert.throws(() => validateState({ team }, true));
});

test("saved rosters preserve existing progress, survive fresh servers and stay separate from concurrent progress updates", async () => {
    const directory = await mkdtemp(join(tmpdir(), "workshop-team-test-"));
    const folder = join(directory, createHash("sha256").update(repoRoot).digest("hex").slice(0, 24));
    const path = join(folder, "progress.json");
    let first;
    let second;
    let reopened;
    try {
        await mkdir(folder, { mode: 0o700 });
        const progress = { step: 4, role: "design", completed: ["align"] };
        await writeFile(path, JSON.stringify(progress), { mode: 0o600 });
        first = await startServer({ stateDirectory: directory });
        assert.deepEqual((await first.snapshot()).progress, progress);
        assert.deepEqual((await first.snapshot()).team, emptyTeam(), "Existing progress gains empty team slots without being reset");
        const team = { name: "  Example team  ", members: Array.from({ length: 8 }, (_, index) => ({
            name: `Example member ${index + 1}`, handle: `@example-${index + 1}`,
        })) };
        second = await startServer({ stateDirectory: directory });
        await Promise.all([first.update({ team }), second.update({ step: 5, role: "pm" })]);
        const expected = { step: 5, role: "pm", completed: ["align"], team: validateTeam(team) };
        assert.deepEqual(JSON.parse(await readFile(path, "utf8")), expected);
        assert.equal((await stat(path)).mode & 0o777, 0o600);
        await first.close(); first = undefined;
        await second.close(); second = undefined;
        reopened = await startServer({ stateDirectory: directory });
        const endpoint = new URL("state", reopened.url);
        assert.deepEqual(await (await fetch(endpoint)).json(), expected);
        const invalid = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ team: { ...team, members: [...team.members, { name: "", handle: "" }] } }) });
        assert.equal(invalid.status, 400, "The server enforces the eight-member maximum independently of the UI");
        assert.deepEqual(await (await fetch(endpoint)).json(), expected, "Rejected writes leave saved data intact");
        await reopened.update({ team: emptyTeam() });
        assert.deepEqual((await reopened.snapshot()).team, emptyTeam());
        assert.deepEqual((await reopened.snapshot()).progress, { step: 5, role: "pm", completed: ["align"] });
    } finally {
        await first?.close(); await second?.close(); await reopened?.close();
        await rm(directory, { recursive: true, force: true });
    }
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
        const leanCanvas = await fetch(new URL("source?path=docs/getting-started/samples/FSI/workshop-input/leancanvas.md", first.url));
        assert.equal(leanCanvas.status, 200);
        assert.match(await leanCanvas.text(), /All business-model statements below are assumptions/);
        for (const name of ["team.mjs", "d3.min.js", "marked.js", "purify.js", "handoffs.svg", "components.svg"]) {
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
