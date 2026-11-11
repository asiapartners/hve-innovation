// Copyright (c) Microsoft Corporation. All rights reserved.
// SPDX-License-Identifier: MIT
/* global d3, marked, DOMPurify */
"use strict";
let workshop;
let state;
let saving = Promise.resolve();
const $ = (id) => document.getElementById(id);
function node(tag, text, className) {
    const element = document.createElement(tag);
    if (text !== undefined) element.textContent = text;
    if (className) element.className = className;
    return element;
}
function announce(message) { $("status").textContent = message; }
function fail(error) { $("error").hidden = false; $("error").textContent = error.message; }
async function request(route, options) {
    const response = await fetch(route, options);
    if (!response.ok) {
        const body = await response.json();
        throw new Error(body.error ?? `Request failed (${response.status}).`);
    }
    return response.json();
}
function save(patch) {
    saving = saving.then(async () => {
        const previous = state;
        state = await request("state", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(typeof patch === "function" ? patch(state) : patch),
        });
        $("error").hidden = true;
        if (previous.step !== state.step || previous.role !== state.role) render();
        else renderProgress();
        announce("Personal progress saved. This is not human approval.");
    }).catch(fail);
    return saving;
}
function navigate(step) {
    save({ step }).then(() => { $("main").focus(); });
}
function sourceLink(path, text) {
    const link = node("a", text);
    link.href = `source?path=${encodeURIComponent(path)}`;
    link.target = "_blank";
    link.rel = "noreferrer";
    return link;
}
function promptActions(text, code, walkthrough = false) {
    const actions = node("div", undefined, "prompt-actions");
    const button = node("button", walkthrough ? "Copy walkthrough prompt" : "Copy source text");
    button.type = "button";
    button.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(text);
            announce("Prompt copied. Attach the reviewed context, check the request, and send it yourself.");
        } catch {
            code.tabIndex = 0; code.focus();
            announce("Clipboard unavailable. Select and copy the prompt manually.");
        }
    });
    actions.append(button, node("span", "Review and send manually in the Copilot app", "muted small"));
    return actions;
}
function renderMarkdown(target, markdown, copyPrompts = false) {
    target.innerHTML = DOMPurify.sanitize(marked.parse(markdown), { FORBID_TAGS: ["img", "style", "form", "input"] });
    for (const link of target.querySelectorAll("a")) {
        const href = link.getAttribute("href") ?? "";
        if (href.startsWith("#")) {
            link.removeAttribute("href");
        } else if (href.startsWith("https://")) {
            link.target = "_blank"; link.rel = "noreferrer";
        } else {
            link.replaceWith(node("span", link.textContent));
        }
    }
    if (copyPrompts) {
        for (const code of target.querySelectorAll("pre > code.language-text")) {
            code.parentElement.before(promptActions(code.textContent.trimEnd(), code, true));
        }
    }
}
function renderProgress() {
    const total = workshop.steps.reduce((n, step) => n + step.activities.length, 0);
    $("progress").max = total;
    $("progress").value = state.completed.length;
    $("count").textContent = `${state.completed.length} / ${total} activities`;
    for (const box of document.querySelectorAll("[data-activity]")) box.checked = state.completed.includes(box.dataset.activity);
    drawJourney();
}
function drawJourney() {
    const container = d3.select("#journey");
    container.selectAll("*").remove();
    const svg = container.append("svg").attr("viewBox", "0 0 1000 54").attr("role", "group")
        .attr("aria-label", "Agenda proportional to duration: 30, 30, 90, 30, 60 and 30 minutes. Use the step buttons below to navigate.");
    const scale = d3.scaleLinear().domain([0, 270]).range([0, 1000]);
    let start = 0;
    for (const step of workshop.steps) {
        const width = scale(step.minutes) - 5;
        const complete = step.activities.every((a) => state.completed.includes(a.id));
        const group = svg.append("g").attr("transform", `translate(${scale(start)},0)`)
            .attr("role", "button").attr("tabindex", 0).attr("aria-label", `Go to stage ${step.id}: ${step.title}`)
            .style("cursor", "pointer").on("click", () => navigate(step.id))
            .on("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") { event.preventDefault(); navigate(step.id); }
            });
        group.append("rect").attr("width", width).attr("height", 42).attr("rx", 5)
            .attr("fill", complete ? "#238636" : state.step === step.id ? "#1f6feb" : "#212830")
            .attr("stroke", state.step === step.id ? "#79c0ff" : "#3d444d");
        group.append("text").attr("x", 12).attr("y", 26).attr("fill", "#f0f6fc").attr("font-size", 13)
            .text(`${step.id} / ${step.minutes}m`);
        start += step.minutes;
    }
}
function drawRelationships() {
    const active = workshop.steps[state.step - 1];
    const ids = [...new Set(active.activities.flatMap((a) => a.components))];
    const height = Math.max(130, ids.length * 31 + 24);
    const container = d3.select("#relationships");
    container.selectAll("*").remove();
    const svg = container.append("svg").attr("viewBox", `0 0 900 ${height}`).attr("role", "img")
        .attr("aria-label", `Stage ${active.id} uses ${ids.map((id) => workshop.components[id].name).join(", ") || "team alignment without a required agent"}. See the stage handoff cards below.`);
    const y = d3.scalePoint().domain(ids).range([25, height - 25]);
    for (const id of ids) {
        svg.append("path").attr("d", `M 240 ${height / 2} C 360 ${height / 2}, 360 ${y(id)}, 440 ${y(id)}`)
            .attr("fill", "none").attr("stroke", "#3d444d").attr("stroke-width", 2);
        svg.append("circle").attr("cx", 440).attr("cy", y(id)).attr("r", 4).attr("fill", "#3fb950");
        svg.append("text").attr("x", 455).attr("y", y(id) + 4).attr("fill", "#a5d6ff").attr("font-size", 13)
            .text(workshop.components[id].name);
    }
    svg.append("rect").attr("x", 0).attr("y", height / 2 - 25).attr("width", 240).attr("height", 50)
        .attr("rx", 6).attr("fill", "#152b44").attr("stroke", "#4493f8");
    svg.append("text").attr("x", 12).attr("y", height / 2 + 5).attr("fill", "#f0f6fc").attr("font-size", 14)
        .text(`${active.id}. ${active.title}`);
}
function renderMapping() {
    $("mapping").replaceChildren(...workshop.steps.map((step) => {
        const row = node("li", undefined, "stage-map-item");
        row.dataset.stageId = step.id;
        const header = node("div", undefined, "stage-map-heading");
        const title = node("h3", `${step.id}. ${step.title}`);
        const time = node("span", `${step.minutes} min`, "stage-map-time");
        const button = node("button", "Open stage", "stage-map-button");
        button.type = "button";
        button.addEventListener("click", () => navigate(step.id));
        header.append(title, time, button);
        const outcome = node("div", undefined, "stage-map-outcome");
        outcome.append(node("span", "Handoff", "stage-map-label"), node("p", step.exit));
        row.append(header, outcome);

        const componentIds = [...new Set(step.activities.flatMap((item) => item.components))];
        const componentDetails = node("details", undefined, "stage-map-details");
        componentDetails.append(node("summary", `HVE components · ${componentIds.length}`));
        const componentList = node("ul", undefined, "stage-map-list");
        for (const id of componentIds) {
            const component = workshop.components[id];
            const link = sourceLink(component.path, component.name + (component.available ? "" : " (missing)"));
            if (!component.available) link.className = "missing";
            const item = node("li");
            item.append(link);
            componentList.append(item);
        }
        if (!componentIds.length) componentList.append(node("li", "Team alignment; no dedicated HVE component."));
        componentDetails.append(componentList);

        const outputs = [...new Set(step.activities.flatMap((item) => item.outputs))];
        const outputDetails = node("details", undefined, "stage-map-details");
        outputDetails.append(node("summary", `Artifact references · ${outputs.length}`));
        const outputList = node("ul", undefined, "stage-map-list");
        for (const output of outputs) {
            const item = node("li");
            if (/^(?:\.copilot-tracking|docs\/)/.test(output)) item.append(node("code", output, "artifact"));
            else item.textContent = output;
            outputList.append(item);
        }
        outputDetails.append(outputList);
        const details = node("div", undefined, "stage-map-details-row");
        details.append(componentDetails, outputDetails);
        row.append(details);
        return row;
    }));
}
function renderActivity(item, source) {
    const card = node("article", undefined, "activity");
    card.dataset.activityId = item.id;
    const top = node("div", undefined, "activity-top");
    const heading = node("div");
    heading.append(node("span", workshop.roles.find(([id]) => id === item.role)[1], "tag"), node("h3", item.title));
    const label = node("label", undefined, "done-label");
    const check = node("input");
    check.type = "checkbox"; check.dataset.activity = item.id;
    check.checked = state.completed.includes(item.id);
    check.addEventListener("change", () => {
        const checked = check.checked;
        save((latest) => {
            const completed = new Set(latest.completed);
            checked ? completed.add(item.id) : completed.delete(item.id);
            return { completed: [...completed] };
        });
    });
    label.append(check, document.createTextNode(" Activity done"));
    top.append(heading, label); card.append(top, node("p", item.guidance, "activity-summary"));
    for (const [label, path] of item.sources) card.append(sourceLink(path, label));
    const section = source.sections.find((s) => s.title === item.section);
    const walkthrough = node("div", undefined, "markdown walkthrough");
    walkthrough.dataset.section = item.section;
    renderMarkdown(walkthrough, section.markdown.replace(/^#{2,6} .+\r?\n/, ""), true);
    for (const original of walkthrough.querySelectorAll("h2, h3, h4, h5, h6")) {
        const level = Math.min(6, Number(original.tagName.slice(1)) - section.level + 3);
        const nested = node(`h${level}`);
        nested.append(...original.childNodes);
        original.replaceWith(nested);
    }
    card.append(walkthrough);
    const componentLine = node("div");
    for (const id of item.components) {
        const component = workshop.components[id];
        const link = sourceLink(component.path, component.name + (component.available ? "" : " (missing)"));
        link.className = `component${component.available ? "" : " missing"}`;
        componentLine.append(link);
    }
    card.append(componentLine, node("p", "Carry into the next activity", "small muted"));
    for (const output of item.outputs) card.append(node("code", output, "artifact"));
    const hints = node("details");
    hints.className = "hints";
    hints.append(node("summary", "Need a hint? Start here"));
    let target = hints;
    item.hints.forEach((text, index) => {
        target.append(node("p", text));
        if (index < item.hints.length - 1) {
            const next = node("details");
            next.append(node("summary", index === 0 ? "More guidance" : "Still stuck?"));
            target.append(next); target = next;
        }
    });
    card.append(hints);
    return card;
}
function renderPrompts(source) {
    $("prompts").replaceChildren();
    if (!source.prompts.length) $("prompts").append(node("p", "This stage has no source prompt. Use the team activities in the guide."));
    for (const prompt of source.prompts) {
        const details = node("details");
        details.append(node("summary", prompt.section));
        const pre = node("pre");
        const text = node("code", prompt.text);
        pre.append(text);
        details.append(promptActions(prompt.text, text), pre); $("prompts").append(details);
    }
}
function render() {
    const step = workshop.steps[state.step - 1];
    const source = workshop.documents[step.file];
    $("role").value = state.role;
    $("steps").replaceChildren(...workshop.steps.map((item) => {
        const button = node("button", `${item.id}. ${item.title}`);
        button.type = "button"; button.append(node("span", `${item.minutes} minutes`));
        if (item.id === state.step) button.setAttribute("aria-current", "step");
        button.addEventListener("click", () => navigate(item.id));
        return button;
    }));
    for (const row of $("mapping").children) {
        if (Number(row.dataset.stageId) === step.id) row.setAttribute("aria-current", "step");
        else row.removeAttribute("aria-current");
    }
    $("step-label").textContent = `STAGE ${step.id} OF 6`;
    $("step-title").textContent = step.title;
    $("purpose").textContent = step.purpose;
    $("stage-input").textContent = step.entry;
    $("stage-output").textContent = step.exit;
    const offset = workshop.steps.slice(0, step.id - 1).reduce((n, s) => n + s.minutes, 0);
    $("step-budget").textContent = `${step.minutes} min / agenda ${offset}-${offset + step.minutes}m`;
    $("previous").disabled = step.id === 1; $("next").disabled = step.id === 6;
    let visible = step.activities.filter((item) => state.role === "all" || item.role === "all" || item.role === state.role);
    if (!visible.length) {
        visible = step.activities;
        $("role-note").textContent = "No dedicated activity for your role here. Review the team handoffs below.";
    } else $("role-note").textContent = state.role === "all" ? "All role handoffs shown." : "Showing your role and whole-team activities. Choose Whole team to inspect other handoffs.";
    $("activities").replaceChildren(...visible.map((item) => renderActivity(item, source)));
    $("raw-source").href = `source?path=${encodeURIComponent(`docs/getting-started/${step.file}`)}`;
    renderMarkdown($("source"), source.markdown);
    $("full-source").open = false;
    $("reference-prompts").open = false;
    renderPrompts(source);
    renderProgress(); drawRelationships();
}
async function initialize() {
    [workshop, state] = await Promise.all([request("workshop"), request("state")]);
    $("role").replaceChildren(...workshop.roles.map(([id, name]) => {
        const option = node("option", name); option.value = id; return option;
    }));
    $("role").addEventListener("change", (event) => save({ role: event.target.value }));
    $("previous").addEventListener("click", () => navigate(state.step - 1));
    $("next").addEventListener("click", () => navigate(state.step + 1));
    $("gaps").replaceChildren(...workshop.gaps.map((gap) => node("li", gap)));
    renderMapping();
    render();
    setInterval(async () => {
        try {
            await saving;
            const latest = await request("state");
            if (JSON.stringify(latest) !== JSON.stringify(state)) { state = latest; render(); }
        } catch (error) { fail(error); }
    }, 2500);
}
initialize().catch(fail);
