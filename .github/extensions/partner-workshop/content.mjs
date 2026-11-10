// Copyright (c) Microsoft Corporation. All rights reserved.
// SPDX-License-Identifier: MIT
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export const roles = [
    ["all", "Whole team"], ["sme", "Subject matter expert"], ["pm", "Project management"],
    ["design", "Design"], ["technical", "Technical"],
];
const activity = (id, role, title, section, components, outputs, guidance, hints) =>
    ({ id, role, title, section, components, outputs, guidance, hints });
export const steps = [
    {
        id: 1, title: "Align on the outcome", minutes: 30, file: "partner-workshop.md",
        purpose: "Choose one scenario, form a multidisciplinary team, and agree what a reviewed workshop draft means.",
        activities: [
            activity("align", "all", "Choose the scenario and owners", "Sample Scenario", [],
                ["Shared scenario and role ownership"],
                "Use your own project or the FSI Relationship Manager Intelligence Experience. Work with four to six people; use only synthetic or public evidence. Agree the outcomes and completion standard before drafting.",
                ["Name the primary user and the business problem, not a feature list.",
                    "The FSI lean canvas is a draft with assumptions, not validated customer research.",
                    "Completion means reviewed drafts, open assumptions and follow-up owners, not deployment or certification."]),
        ],
    },
    {
        id: 2, title: "Prepare the shared context", minutes: 30, file: "partner-workshop-setup.md",
        purpose: "Use this repository in the Copilot app and establish the evidence boundary before any research.",
        activities: [
            activity("environment", "all", "Verify the Copilot app environment", "Verify The Environment", ["rpi"],
                ["Available HVE agents and RPI commands"],
                "In the app, open this repository and its workshop session. Confirm Copilot access and repository trust yourself. Check the available agents and slash commands. VS Code extension installation is an alternative host path, not an app prerequisite.",
                ["Type / in the app composer and look for the RPI phase commands.",
                    "If components are missing, inspect repository customizations and enabled plugins; do not assume a VS Code extension installs into this app.",
                    "Use the documented Codespaces or VS Code path if your app runtime cannot load the required HVE components."]),
            activity("context", "technical", "Create the session context only", "Prepare The Workshop Workspace", ["rpi"],
                [".copilot-tracking/research/[YYYY-MM-DD]/[session-name]-session-context.md"],
                "Ask the technical lead to prepare the workshop branch, roles and approved evidence location. Copy the source prompt, fill its placeholders and create only the context artifact. Every later request should reference that path and read its topic.",
                ["Keep credentials, personal data and production evidence out of the repo.",
                    "Canonical tracking paths start with .copilot-tracking/. Some source examples omit the dot; correct that explicitly before running them.",
                    "The context records session, topic, evidence root, date, boundary and output roots. Review it before starting research."]),
        ],
    },
    {
        id: 3, title: "Build the role handoffs", minutes: 90, file: "partner-workshop-role-tracks.md",
        purpose: "Build on shared evidence in the suggested order: SME, PM, Design, Technical, then team integration. Backlog planning follows requirements; issue writes need approval.",
        activities: [
            activity("evidence", "sme", "Gather evidence and frame the lean canvas", "Marketplace Lean Canvas as Workshop Input", ["rpi"],
                [".copilot-tracking/research/workshop-input/leancanvas.md"],
                "Gather policies, SOPs, process diagrams and user-impact notes. Keep original diagram sources with renders. Use the nine-cell lean canvas to distinguish facts, assumptions and Unknown. Production sources stay in an approved governed location.",
                ["Start with business pain, affected users and the cost of doing nothing.",
                    "The only supplied FSI workshop input is leancanvas.md; its own evidence warning says supporting research is absent.",
                    "Ask for missing sources or name an accountable decision owner. Do not invent pricing, metrics or customer segments."]),
            activity("research", "sme", "Research and create the context pack", "Start Research", ["rpi", "brd", "prd"],
                [".copilot-tracking/research/", ".copilot-tracking/brd-sessions/", ".copilot-tracking/prd-sessions/"],
                "Run rpi-research on the approved evidence, review its permanent trail, and extract business rules, constraints, failures and AI guardrails. PM normally owns the BRD/PRD; SME supplies business evidence. Use the BRD or PRD prompt here only when that structure is needed.",
                ["Research stays in context discovery; it does not authorize implementation.",
                    "Cite the research artifact when extracting a context pack.",
                    "BRD explains the business case; PRD defines product behavior and observable acceptance criteria. Both remain drafts until reviewed."]),
            activity("requirements", "pm", "Own requirements and phase the MVP", "Project Management track", ["brd", "prd", "rpi", "functional"],
                [".copilot-tracking/brd-sessions/", ".copilot-tracking/prd-sessions/", ".copilot-tracking/plans/"],
                "Align context, business outcomes, product behavior and experience. Use BRD Builder / PRD Builder as needed, then rpi-plan for the first MVP, with phase objectives, dependencies, risks and acceptance criteria. Do not implement or publish.",
                ["Read the BRD/PRD source prompts in the SME research section; PM remains the typical owner.",
                    "Plan one evidence-backed job with citations, permission-aware retrieval, uncertainty, escalation and confirmation before external actions.",
                    "Keep Marketplace and Agent Store claims provisional until current guidance and account/tenant feasibility are verified."]),
            activity("backlog", "pm", "Plan the backlog, then gate external writes", "Project Management track", ["functional", "backlog", "executor"],
                [".copilot-tracking/github-issues/"],
                "Functional Planner structures requirements into epics, features, stories and tasks when useful. P0/P1/P2 labels are optional. Backlog Manager coordinates readiness and duplicates; GitHub Backlog Executor writes only after human review, target-repo confirmation and facilitator approval.",
                ["A Markdown backlog is a valid fallback if GitHub writes are unavailable.",
                    "Review the proposed hierarchy and acceptance criteria before creation.",
                    "A progress check in this canvas is not a human-review approval or permission to write issues."]),
            activity("experience", "design", "Ground the user journey in evidence", "Design Track", ["ux", "dt", "tutor", "cards"],
                [".copilot-tracking/dt/<project-name>/user-research.md", ".copilot-tracking/dt/<project-name>/experience-draft.md"],
                "Capture study goal, observations, themes and unknowns. Pick one primary user and job; map current pain points and future flow. Label evidence as observed, reported, assumed or open. Use AI Discovery Cards after problem framing; Coach and Tutor are optional facilitation/learning support.",
                ["Do not turn assumptions into observed user research.",
                    "Keep sketches, journey notes and wireframes with the experience evidence.",
                    "Figma/FigJam is optional. Configure and authorize its MCP server in the app's repository MCP settings, not by assuming .vscode/mcp.json is consumed."]),
            activity("inclusive", "design", "Review accessibility, AI harms and the agent experience", "Design Track", ["accessibility", "rai", "ux"],
                [".copilot-tracking/dt/", ".copilot-tracking/accessibility/", ".copilot-tracking/rai-plans/"],
                "Ask the named planners and reviewers to identify requirements, potential harms, mitigation ideas and implementation questions. Validate the benefit of a Microsoft 365 Copilot experience, then capture packaging, discovery and unresolved success criteria.",
                ["Review uncertainty, feedback, access failures and human escalation, not just the happy path.",
                    "Reference approved Figma artifacts with type, date and evidence status when used.",
                    "Planner-specific roots are component workflow outputs; the workshop's primary handoff remains the reviewed experience draft."]),
            activity("architecture", "technical", "Frame and review the conceptual architecture", "Technical track", ["architecture", "diagrams", "security", "adr"],
                [".copilot-tracking/details/", "docs/planning/adrs/ (when an ADR is chosen)"],
                "Map requirements and plan phases to services, sources and integrations. Use System Architecture Reviewer and the architecture-diagrams skill for Mermaid. Add security, operations, failure paths and tradeoffs. ADR Creator is available for durable decisions but is not a mandatory role-track exercise.",
                ["No Arch Diagram Builder agent file is present here; architecture-diagrams is the available skill. Do not invent a missing agent.",
                    "Without IaC, label the solution diagram conceptual, not deployment-validated. The PlantUML view in this canvas explains workflow ownership, not a validated Azure design.",
                    "The optional M365 Copilot architecture image is an external manual activity; this canvas does not generate it."]),
            activity("boundaries", "technical", "Record only the publication assumptions", "Technical track", ["rpi", "architecture"],
                [".copilot-tracking/details/"],
                "Describe the provisional Marketplace product, companion Microsoft 365 agent, API/identity/permission/data contract, residency, tenant isolation and least privilege. Assign open decisions to owners and link the plan. Defer offer packaging, pricing, certification and rollout to stage 5.",
                ["An HVE custom agent is not a customer-facing Microsoft 365 agent.",
                    "Keep provisional product boundaries in the existing architecture notes.",
                    "Do not create a competing publication plan during role work or solution review."]),
        ],
    },
    {
        id: 4, title: "Validate one solution pack", minutes: 30, file: "partner-workshop-solution.md",
        purpose: "Reconcile the role outputs and trace each outcome to requirements, architecture, backlog, tests and publication gates.",
        activities: [
            activity("traceability", "all", "Review terminology and traceability", "Traceability review", ["rpi"],
                [".copilot-tracking/details/ (traceability matrix)"],
                "Give each role two minutes to present. Resolve conflicting terminology using SME evidence. Use rpi-plan to build the matrix and report missing links, contradictions, unsupported claims and unowned risks. Assign owners and fix what the workshop evidence supports.",
                ["Every story needs a user, need and outcome; every acceptance criterion needs an observable check.",
                    "Every architecture component needs a requirement; high-risk requirements need backlog coverage.",
                    "Publication gaps stay in architecture notes for the coaches. Do not create a separate readiness artifact here."]),
            activity("issue-review", "pm", "Choose an approved backlog handoff", "Project Manager: GitHub Issues", ["backlog", "executor"],
                [".copilot-tracking/github-issues/"],
                "Confirm repository, labels, milestone, owners and hierarchy; require a dry run and human review before writes. Alternatively retain the Markdown backlog with target system, owner, state and external ID for later import.",
                ["Missing write access does not block the workshop.",
                    "Inspect duplicates before authorizing creation.",
                    "Unchecked human-review boxes stop backlog mutation; agents cannot check them for people."]),
            activity("solution-review", "technical", "Walk the request, ingestion and failure paths", "Engineer: Review the architecture", ["architecture", "security"],
                [".copilot-tracking/details/"],
                "Trace the Microsoft 365 request through Azure API, retrieval, model and response separately from ingestion. Identify authorization, secrets, logging boundaries, outage paths, cost owner and operational owner. End with the ten-minute team discussion, three highest risks and next review date.",
                ["Keep telemetry free of secrets and unnecessary personal data.",
                    "Keep the diagram conceptual until infrastructure and deployment evidence exist.",
                    "Use the final source section below for the PM, SME, designer and technical lead's closing discussion."]),
        ],
    },
    {
        id: 5, title: "Plan publication readiness", minutes: 60, file: "partner-workshop-publishing.md",
        purpose: "Prepare two connected publication paths and one shared monetization record. Planning is not submission, certification, co-sell eligibility or legal advice.",
        activities: [
            activity("commercial-context", "pm", "Frame commercial and go-to-market context", "Commercial readiness and publication planning", ["marketplace", "store"],
                [".copilot-tracking/details/ (confirmed publication handoffs)"],
                "Define brand, value, geography, segment, launch limits and the lean business summary. Identify publisher/legal/tax/support owners and test environments. Treat offer/add-on support as unverified until current guidance confirms it.",
                ["Report current product and Partner Center state honestly.",
                    "The source's two-week target is a coaching scenario, not a delivery guarantee.",
                    "Fees, publishing matrix, schemas, certification and tax require current sources; Partner Center is authoritative for account-specific facts."]),
            activity("marketplace", "technical", "Coach the Azure offer path", "Microsoft Marketplace track", ["marketplace"],
                [".copilot-tracking/details/ (Marketplace plan; confirm actual canonical path)"],
                "Compare SaaS, Managed Application and Container offers, deployment/publisher-access model, pricing and credible readiness path. Record confirmed decisions, owners, evidence and next actions. The source includes publisher readiness, package validation, offer draft, preview/certification and go-live references.",
                ["For a Managed Application, follow the source's mainTemplate.json / createUiDefinition.json / app.zip requirements and verify current policy.",
                    "Package testing and non-production Azure deployment are follow-up work requiring authorized environments.",
                    "The solution page says plans/ while coach prompts say details/. Ask the coach to locate the existing canonical plan, report its actual path and link rather than duplicate it."]),
            activity("agent-store", "technical", "Coach the companion Microsoft 365 agent", "Microsoft 365 Copilot Agent track", ["store"],
                [".copilot-tracking/details/ (Agent Store plan; confirm actual canonical path)"],
                "Confirm a supported agent type, backend binding, authentication, licensing, entitlement and tenant rollout. Review the current publishing matrix. The source references building/testing, least-privilege service-side authorization, package/RAI validation, tenant approval and marketplace submission.",
                ["HVE planning agents cannot be uploaded to the Microsoft 365 Agent Store.",
                    "An agent prompt is not a substitute for Azure-side authorization.",
                    "Admin consent, publisher enrollment and certification remain external approval gates."]),
            activity("monetization", "pm", "Create and reconcile one monetization plan", "Product Manager Monetization Plan", ["marketplace", "store"],
                [".copilot-tracking/details/YYYY-MM-DD/solution-monetization-plan.md"],
                "Use Marketplace MVP commercialization decision mode, then Agent Store monetization reconciliation. Review launch package, public/private prices, fixed/per-user and monthly/annual terms, costs, tax/fees, separate customer licenses, backend entitlement and double-billing risks. Preserve approval gaps.",
                ["Use both source prompts and the existing plan's actual date folder.",
                    "Do not invent missing costs or approve proposed prices.",
                    "PM, finance and other accountable owners review commercial decisions. Coaches do not provide legal, tax or financial advice."]),
        ],
    },
    {
        id: 6, title: "Hand off an approved slice", minutes: 30, file: "partner-workshop-implementation.md",
        purpose: "Prepare the engineering handoff. Implementation, deployments and publication beyond the workshop require their own explicit human approvals.",
        activities: [
            activity("transfer", "all", "Select new or existing project and transfer reviewed context", "From Workshop to Solution Implementation", ["rpi"],
                [".copilot-tracking/ (reviewed relative subpaths)", "docs/planning/adrs/ (reviewed decisions, when used)"],
                "Choose the new/existing path in the source. Enable HVE in the implementation repo and bring only reviewed research, BRD/PRD and state, experience, plan, backlog handoff and commercial records. Preserve paths. Do not copy sandbox, challenges, unreviewed content or the entire HVE repo.",
                ["In the app, open the target repository and verify customizations there; changing the canvas does not change your checkout.",
                    "For existing projects, reuse established modules and map the plan to current code.",
                    "Adapt a conceptual plan with rpi-plan without repeating discovery. Stop if PRD or plan says Blocked or Not ready."]),
            activity("implement", "technical", "Gate and implement the first P0 task", "Step 2: Implement One Task", ["rpi"],
                [".copilot-tracking/changes/"],
                "A named accountable human approves the first P0 task in writing with date and name. The named reviewer must complete any applicable human-review checkbox. Only then use the new/existing rpi-implement prompt to deliver one runnable, testable slice.",
                ["This canvas never grants approval or marks human-review boxes.",
                    "Implement only approved commercial terms, not proposed pricing or paid-access rules.",
                    "If scope, architecture, security, privacy, RAI or commercial rules change, return to planning and the accountable owners."]),
            activity("review", "technical", "Review, close and reassess readiness", "Step 3: Review the Result", ["rpi", "marketplace", "store"],
                [".copilot-tracking/reviews/", ".copilot-tracking/changes/", ".copilot-tracking/details/"],
                "After implementation validation, run rpi-review against the approved plan, PRD, commercial decisions, changes and conventions. Fix blockers before rereview. Close the milestone with evidence, follow-ups and human PR review. Reassess publication separately using validated MVP evidence.",
                ["MVP completion is not publication readiness.",
                    "Recheck Product, Technical, Commercial, Partner Center, Governance and Companion Agent gates with owners and next actions.",
                    "Only accountable humans authorize submission, publication and commercial terms; external certification remains external."]),
        ],
    },
];

export const components = {
    rpi: ["RPI Agent / phase skills", ".github/agents/hve-core/rpi-agent.agent.md"],
    brd: ["BRD Builder / requirements-author", ".github/agents/project-planning/brd-builder.agent.md"],
    prd: ["PRD Builder / requirements-author", ".github/agents/project-planning/prd-builder.agent.md"],
    functional: ["Functional Planner", ".github/agents/project-planning/functional-planner.agent.md"],
    backlog: ["Backlog Manager / backlog-management", ".github/agents/project-planning/backlog-manager.agent.md"],
    executor: ["GitHub Backlog Executor (coordinated writer)", ".github/agents/project-planning/subagents/github-backlog-executor.agent.md"],
    ux: ["UX UI Designer", ".github/agents/project-planning/ux-ui-designer.agent.md"],
    dt: ["Design Thinking Coach / dt-methods", ".github/agents/design-thinking/dt-coach.agent.md"],
    tutor: ["Design Thinking Learning Tutor", ".github/agents/design-thinking/dt-learning-tutor.agent.md"],
    cards: ["AI Discovery Cards", ".github/skills/design-thinking/ai-discovery-cards/SKILL.md"],
    accessibility: ["Accessibility Planner / Reviewer", ".github/agents/accessibility/accessibility-planner.agent.md"],
    rai: ["RAI Planner / Reviewer", ".github/agents/rai-planning/rai-planner.agent.md"],
    architecture: ["System Architecture Reviewer", ".github/agents/project-planning/system-architecture-reviewer.agent.md"],
    diagrams: ["architecture-diagrams skill", ".github/skills/hve-core/architecture-diagrams/SKILL.md"],
    security: ["Security Planner", ".github/agents/security/security-planner.agent.md"],
    adr: ["ADR Creator (optional)", ".github/agents/project-planning/adr-creation.agent.md"],
    marketplace: ["Microsoft Marketplace Coach / ms-marketplace-publish", ".github/agents/ms-marketplace-coach.agent.md"],
    store: ["Copilot Agent Store Coach / copilot-agent-store-publish", ".github/agents/copilot-agent-store-coach.agent.md"],
};

export const gaps = [
    "App adaptation: the source setup targets Codespaces/local VS Code. This canvas uses app repository customizations and runtime canvas tools; VS Code extension and .vscode/mcp.json behavior are not assumed to transfer.",
    "Path inconsistency: several examples use ./copilot-tracking without the leading dot. Use the setup's canonical .copilot-tracking/ root, and explicitly correct copy-ready source prompts before execution.",
    "Publication-plan inconsistency: solution review refers to plans/ while publication coach prompts and implementation handoff use details/. Locate and link the actual canonical coach artifact instead of creating parallel plans.",
    "Component naming: the workshop names Arch Diagram Builder; this checkout provides architecture-diagrams as a skill, not that named agent. ADR Creator is available and overview lists ADRs, but no mandatory ADR exercise is specified.",
    "Evidence gap: the sole supplied FSI input is an assumption-labelled lean canvas. Its cited historical context is not bundled as workshop evidence. Do not treat business models, pricing or metrics as verified.",
    "Approval boundary: completion here is personal activity tracking, not human sign-off, issue-write authority, implementation approval, deployment permission, or publication certification.",
    "Availability gap: this checkout has no root package.json, scripts/ or docs generator despite inherited contribution instructions naming them. Canvas-specific checks are provided without manufacturing upstream tooling.",
];

export function extractDocument(markdown) {
    const body = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
    const lines = body.split("\n");
    const sections = [];
    let fence = false;
    for (let i = 0; i < lines.length; i++) {
        if (/^\s*```/.test(lines[i])) fence = !fence;
        const match = !fence && /^(#{2,6}) (.+)$/.exec(lines[i]);
        if (match) sections.push({ title: match[2], level: match[1].length, start: i });
    }
    for (const section of sections) {
        const end = sections.find((s) => s.start > section.start && s.level <= section.level)?.start ?? lines.length;
        section.markdown = lines.slice(section.start, end).join("\n");
    }
    const prompts = [...body.matchAll(/^[ \t]*```text[ \t]*\r?\n([\s\S]*?)^[ \t]*```/gm)]
        .filter((match) => !/\|--|^\.copilot-tracking\/dt\/<project-name>\//m.test(match[1]))
        .map((match, index) => {
        const line = body.slice(0, match.index).split("\n").length - 1;
        const section = sections.filter((s) => s.start <= line).at(-1)?.title ?? "Source";
        const indent = /^[ \t]*/.exec(match[0])[0];
        const text = match[1].split("\n").map((l) => l.startsWith(indent) ? l.slice(indent.length) : l).join("\n").trimEnd();
        return { id: index, section, text };
    });
    return { markdown: body, sections, prompts };
}

export async function loadWorkshop(root) {
    const documents = {};
    for (const step of steps) {
        documents[step.file] = extractDocument(await readFile(resolve(root, "docs/getting-started", step.file), "utf8"));
        for (const item of step.activities) {
            if (!documents[step.file].sections.some((s) => s.title === item.section)) {
                throw new Error(`Missing workshop section: ${step.file}: ${item.section}`);
            }
        }
    }
    const componentStatus = {};
    for (const [id, [name, path]] of Object.entries(components)) {
        try {
            await readFile(resolve(root, path), "utf8");
            componentStatus[id] = { name, path, available: true };
        } catch (error) {
            if (error.code !== "ENOENT") throw error;
            componentStatus[id] = { name, path, available: false };
        }
    }
    return { steps, roles, documents, components: componentStatus, gaps };
}
