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
function renderMarkdown(target, markdown) {
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
        .attr("aria-label", `Stage ${active.id} uses ${ids.map((id) => workshop.components[id].name).join(", ") || "team alignment without a required agent"}. See the mapping table below.`);
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
function renderActivity(item, source) {
    const card = node("article", undefined, "activity");
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
    top.append(heading, label); card.append(top, node("p", item.guidance));
    const componentLine = node("div");
    for (const id of item.components) {
        const component = workshop.components[id];
        const link = sourceLink(component.path, component.name + (component.available ? "" : " (missing)"));
        link.className = `component${component.available ? "" : " missing"}`;
        componentLine.append(link);
    }
    card.append(componentLine, node("p", "Expected output / handoff", "small muted"));
    for (const output of item.outputs) card.append(node("code", output, "artifact"));
    const hints = node("details");
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
    const sourceDetails = node("details");
    sourceDetails.append(node("summary", `Read source activity: ${item.section}`));
    const rendered = node("div", undefined, "markdown");
    renderMarkdown(rendered, source.sections.find((s) => s.title === item.section).markdown);
    sourceDetails.append(rendered);
    card.append(hints, sourceDetails);
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
        const actions = node("div", undefined, "prompt-actions");
        const button = node("button", "Copy source text");
        button.type = "button";
        button.addEventListener("click", async () => {
            try { await navigator.clipboard.writeText(prompt.text); announce("Source text copied. Review placeholders and warnings before sending."); }
            catch { text.tabIndex = 0; text.focus(); announce("Clipboard unavailable. Select and copy the source text manually."); }
        });
        actions.append(button, node("span", "Original source; review before execution", "muted small"));
        details.append(actions, pre); $("prompts").append(details);
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
    $("step-label").textContent = `STAGE ${step.id} OF 6`;
    $("step-title").textContent = step.title;
    $("purpose").textContent = step.purpose;
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
    for (const step of workshop.steps) {
        const row = node("tr");
        const heading = node("th");
        heading.scope = "row";
        const button = node("button", `${step.id}. ${step.title}`);
        button.type = "button"; button.addEventListener("click", () => navigate(step.id));
        heading.append(button);
        const componentCell = node("td");
        componentCell.textContent = [...new Set(step.activities.flatMap((a) => a.components))]
            .map((id) => workshop.components[id].name).join("; ") || "Team alignment";
        const outputCell = node("td");
        for (const output of new Set(step.activities.flatMap((a) => a.outputs))) outputCell.append(node("code", output, "artifact"));
        row.append(heading, componentCell, outputCell); $("mapping").append(row);
    }
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
