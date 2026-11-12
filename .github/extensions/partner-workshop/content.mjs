// Copyright (c) Microsoft Corporation. All rights reserved.
// SPDX-License-Identifier: MIT
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export const roles = [
    ["all", "Whole team"], ["sme", "Subject matter expert"], ["pm", "Project management"],
    ["design", "Design"], ["technical", "Technical"],
];
const activity = (id, role, title, section, components, outputs, guidance, hints, sources = []) =>
    ({ id, role, title, section, components, outputs, guidance, hints, sources });
export const steps = [
    {
        id: 1, title: "Meet the FSI client", minutes: 30, file: "partner-workshop.md",
        purpose: "Start as the partner team building the Relationship Manager Intelligence Experience. Your first job is a trusted briefing for a meeting with fictional Client A.",
        entry: "A relationship manager needs to prepare for a client meeting.",
        exit: "One Client A briefing mission, a read-only scope, and four role owners.",
        activities: [
            activity("align", "all", "Take on the Client A briefing mission", "Client A briefing mission", [],
                ["Client A mission, first-slice boundary, and SME / PM / Design / Technical owners"],
                "Follow the same FSI scenario throughout the workshop. Decide who owns each handoff, not which project to invent.",
                ["Name the primary user and the business problem, not a feature list.",
                    "The FSI lean canvas is a draft with assumptions, not validated customer research.",
                    "Completion means reviewed drafts, open assumptions and follow-up owners, not deployment or certification."]),
        ],
    },
    {
        id: 2, title: "Prepare the FSI case", minutes: 30, file: "partner-workshop-setup.md",
        purpose: "Set up the GitHub Copilot app and give every role the same relationship-manager-fsi context. Use the supplied lean canvas and fictional Client A practice records.",
        entry: "The Client A mission and the team's role owners.",
        exit: "A reviewed FSI session-context file to attach with @ in every later exercise.",
        activities: [
            activity("environment", "all", "Connect the workshop in the Copilot app", "Connect the FSI workshop repository", ["rpi"],
                ["Available HVE agents and RPI commands"],
                "Prepare the workshop tools without connecting a live CRM, customer tenant, or Azure subscription.",
                ["Type / in the prompt box and look for the RPI phase commands.",
                    "If components are missing, check Customize > Installed and repository trust, then start a new session.",
                    "Choose a model and reasoning effort from the dropdowns below the prompt box."]),
            activity("context", "technical", "Save the shared FSI context", "Create the FSI session context", ["rpi"],
                [".copilot-tracking/research/[YYYY-MM-DD]/relationship-manager-fsi-session-context.md"],
                "The case is already filled in. Set the workshop date, create the context only, and review it before research begins.",
                ["Keep credentials, personal data and production evidence out of the repo.",
                    "Canonical tracking paths start with .copilot-tracking/. Verify output paths before running a prompt.",
                    "The context records session, topic, evidence root, date, boundary and output roots. Review it before starting research."]),
        ],
    },
    {
        id: 3, title: "Design the briefing", minutes: 90, file: "partner-workshop-role-tracks.md",
        purpose: "Carry Client A through the role handoffs: inspect the practice evidence, specify one briefing slice, design the manager's experience, and draw the permission-aware path.",
        entry: "The FSI context, assumption-labelled lean canvas, and fictional practice records.",
        exit: "A connected briefing PRD, plan, Markdown backlog, experience draft, and conceptual architecture.",
        activities: [
            activity("evidence", "sme", "Inspect the Client A practice records", "Inspect the Client A practice evidence", ["rpi"],
                ["SME annotations and evidence-gap owners; optional working copy at .copilot-tracking/research/workshop-input/leancanvas.md"],
                "Use two allowed records, a missing transaction history, and a denied-account request to make the briefing behavior concrete.",
                ["Start with business pain, affected users and the cost of doing nothing.",
                    "The supplied lean canvas lacks supporting business research. Client A's practice records are fictional fixtures, not a remedy for that evidence gap.",
                    "Ask for missing sources or name an accountable decision owner. Do not invent pricing, metrics or customer segments."],
                [["Open the supplied FSI lean canvas", "docs/getting-started/samples/FSI/workshop-input/leancanvas.md"]]),
            activity("research", "sme", "Separate briefing facts from assumptions", "Research the briefing constraints", ["rpi"],
                [".copilot-tracking/research/ (dated FSI research and context pack)"],
                "Trace the practice statements to CRM-01 and MAIL-01 while keeping business policies, metrics, and demand unconfirmed.",
                ["Research stays in context discovery; it does not authorize implementation.",
                    "Cite the research artifact when extracting a context pack.",
                    "BRD explains the business case; PRD defines product behavior and observable acceptance criteria. Both remain drafts until reviewed."]),
            activity("requirements", "pm", "Specify one read-only briefing slice", "Specify the first briefing slice", ["brd", "prd", "rpi"],
                [".copilot-tracking/prd-sessions/", ".copilot-tracking/plans/", ".copilot-tracking/brd-sessions/ (optional business case)"],
                "Turn the Client A question into observable behavior, then plan the smallest slice with citations, unknowns, and denied access.",
                ["Use the PRD prompt in this activity. BRD Builder is optional when the business case needs more structure; PM owns both drafts.",
                    "Plan one evidence-backed job with citations, permission-aware retrieval, uncertainty, escalation and confirmation before external actions.",
                    "Keep Marketplace and Agent Store claims provisional until current guidance and account/tenant feasibility are verified."]),
            activity("backlog", "pm", "Draft the briefing backlog", "Draft the briefing backlog", ["functional", "backlog", "executor"],
                [".copilot-tracking/github-issues/"],
                "Keep the first backlog in Markdown. Cover the two cited statements, missing evidence, and permission checks before any external issue writes.",
                ["A Markdown backlog is a valid fallback if GitHub writes are unavailable.",
                    "Review the proposed hierarchy and acceptance criteria before creation.",
                    "A progress check in this canvas is not a human-review approval or permission to write issues."]),
            activity("experience", "design", "Walk the manager through the briefing", "Design the manager's meeting preparation", ["ux", "dt", "tutor", "cards"],
                [".copilot-tracking/dt/relationship-manager-fsi/experience-draft.md"],
                "Design the journey from asking about Client A to inspecting citations, recognizing an unknown, and reviewing a suggested action.",
                ["Do not turn assumptions into observed user research.",
                    "Keep sketches, journey notes and wireframes with the experience evidence.",
                    "Figma/FigJam is optional. Add its MCP server from Customize > MCP, or in .github/mcp.json or .mcp.json under mcpServers; repository servers load after you trust the repository."]),
            activity("inclusive", "design", "Challenge trust and accessibility", "Challenge the briefing experience", ["accessibility", "rai", "ux"],
                [".copilot-tracking/dt/", ".copilot-tracking/accessibility/", ".copilot-tracking/rai-plans/"],
                "Review whether the manager can understand sources, uncertainty, access failures, and human decisions without relying on color or unsupported risk claims.",
                ["Review uncertainty, feedback, access failures and human escalation, not just the happy path.",
                    "Reference approved Figma artifacts with type, date and evidence status when used.",
                    "Planner-specific roots are component workflow outputs; the workshop's primary handoff remains the reviewed experience draft."]),
            activity("architecture", "technical", "Draw the permission-aware briefing path", "Draw the permission-aware briefing path", ["architecture", "diagrams", "security", "adr"],
                [".copilot-tracking/details/", "docs/planning/adrs/ (when an ADR is chosen)"],
                "Follow the Client A request from Microsoft 365 Copilot through authorization, retrieval, model grounding, and the cited response. Keep ingestion separate.",
                ["System Architecture Reviewer produces the Mermaid diagram. Use /architecture-diagrams once infrastructure code exists.",
                    "Without IaC, label the solution diagram conceptual, not deployment-validated. The PlantUML view in this canvas explains workflow ownership, not a validated Azure design.",
                    "The optional M365 Copilot architecture image is an external manual activity; this canvas does not generate it."]),
            activity("boundaries", "technical", "Separate the two customer products", "Separate the backend and companion agent", ["rpi", "architecture"],
                [".copilot-tracking/details/"],
                "Record the boundary between the proposed customer-subscription Azure backend and the companion Microsoft 365 agent. Hand open publication questions to stage 5.",
                ["An HVE custom agent is not a customer-facing Microsoft 365 agent.",
                    "Keep provisional product boundaries in the existing architecture notes.",
                    "Do not create a competing publication plan during role work or solution review."]),
        ],
    },
    {
        id: 4, title: "Challenge the briefing", minutes: 30, file: "partner-workshop-solution.md",
        purpose: "Rehearse the same Client A story across every artifact. Challenge the happy path with missing transaction evidence and a denied Client B request.",
        entry: "The role team's briefing design, requirements, architecture, and local backlog.",
        exit: "A reviewed traceability matrix, three tabletop cases, and named gap owners.",
        activities: [
            activity("traceability", "all", "Trace the briefing requirements", "Traceability review", ["rpi"],
                [".copilot-tracking/details/ (traceability matrix)"],
                "Check that the two cited facts, missing evidence, denied access, and draft next actions have matching requirements, design states, controls, and backlog items.",
                ["Every story needs a user, need and outcome; every acceptance criterion needs an observable check.",
                    "Every architecture component needs a requirement; high-risk requirements need backlog coverage.",
                    "Publication gaps stay in architecture notes for the coaches. Do not create a separate readiness artifact here."]),
            activity("issue-review", "pm", "Review the briefing backlog before writes", "Project Manager: GitHub Issues", ["backlog", "executor"],
                [".copilot-tracking/github-issues/"],
                "A reviewed Markdown handoff completes this exercise. Ask for a dry run, keep approval gaps visible, and create external issues only after separate authorization.",
                ["Missing write access does not block the workshop.",
                    "Inspect duplicates before authorizing creation.",
                    "Unchecked human-review boxes stop backlog mutation; agents cannot check them for people."]),
            activity("solution-review", "technical", "Rehearse three briefing outcomes", "Engineer: Review the architecture", ["architecture", "security"],
                [".copilot-tracking/details/"],
                "Compare what the manager sees with where the service enforces it. A tabletop pass is not proof that retrieval, citations, or authorization have been implemented.",
                ["Keep telemetry free of secrets and unnecessary personal data.",
                    "Keep the diagram conceptual until infrastructure and deployment evidence exist.",
                    "Finish with the PM, SME, designer and technical lead naming the three highest risks and their follow-up owners."]),
        ],
    },
    {
        id: 5, title: "Plan both launch paths", minutes: 60, file: "partner-workshop-publishing.md",
        purpose: "Turn the briefing design into connected plans for the Azure backend and Microsoft 365 companion agent. Reconcile one product package without inventing costs, prices, or launch readiness.",
        entry: "The reviewed briefing solution and its unresolved product-boundary questions.",
        exit: "Two linked publication plans, one shared monetization record, and explicit approval gaps.",
        activities: [
            activity("commercial-context", "pm", "Describe the briefing product honestly", "Commercial readiness and publication planning", ["marketplace", "store"],
                [".copilot-tracking/details/ (commercial context and verification owners)"],
                "The starting point is a fictional scenario and design pack, not a deployed product or verified publisher account. Assign the missing commercial evidence to owners.",
                ["Report current product and Partner Center state honestly.",
                    "Do not turn the workshop's timebox into a promised launch or co-sell date.",
                    "Fees, publishing matrix, schemas, certification and tax require current sources; Partner Center is authoritative for account-specific facts."]),
            activity("marketplace", "technical", "Plan the customer's Azure backend", "Microsoft Marketplace track", ["marketplace"],
                [".copilot-tracking/details/ (Marketplace plan; confirm actual canonical path)"],
                "Examine the sample's Managed Application hypothesis against alternatives, then record the build, package, account, support, and approval work still needed.",
                ["For a Managed Application, follow the source's mainTemplate.json / createUiDefinition.json / app.zip requirements and verify current policy.",
                    "Package testing and non-production Azure deployment are follow-up work requiring authorized environments.",
                    "Ask the coach to locate the existing canonical plan, report its actual path and link rather than duplicate it."]),
            activity("agent-store", "technical", "Plan the manager's companion agent", "Microsoft 365 Copilot Agent track", ["store"],
                [".copilot-tracking/details/ (Agent Store plan; confirm actual canonical path)"],
                "Plan how the manager requests a cited briefing from Microsoft 365 Copilot. Verify supported distribution, authentication, service-side access, consent, and entitlement.",
                ["HVE planning agents cannot be uploaded to the Microsoft 365 Agent Store.",
                    "An agent prompt is not a substitute for Azure-side authorization.",
                    "Admin consent, publisher enrollment and certification remain external approval gates."]),
            activity("monetization", "pm", "Reconcile one briefing product package", "Product Manager Monetization Plan", ["marketplace", "store"],
                [".copilot-tracking/details/YYYY-MM-DD/solution-monetization-plan.md"],
                "Separate the partner product charge, customer Azure consumption, Microsoft 365 licenses, and support. Both coaches update the same record; unknown prices stay unknown.",
                ["Use both source prompts and the existing plan's actual date folder.",
                    "Do not invent missing costs or approve proposed prices.",
                    "PM, finance and other accountable owners review commercial decisions. Coaches do not provide legal, tax or financial advice."]),
        ],
    },
    {
        id: 6, title: "Hand off the first slice", minutes: 30, file: "partner-workshop-implementation.md",
        purpose: "Finish with one buildable Client A briefing task and its review contract. Building, deploying, and publishing are separate follow-ups, not automatic workshop steps.",
        entry: "The reviewed briefing pack, coach handoffs, and unresolved approvals.",
        exit: "A first-slice task, test expectations, accountable approver, and follow-up reviewer.",
        activities: [
            activity("transfer", "all", "Package the reviewed FSI handoff", "Package the reviewed FSI context", ["rpi"],
                [".copilot-tracking/ (reviewed relative subpaths)", "docs/planning/adrs/ (reviewed decisions, when used)"],
                "Inventory the actual artifact paths and the fictional fixture references. Select the destination deliberately and preserve the remaining approval gaps.",
                ["In the app, connect the target repository, start a session there and verify its customizations; changing the canvas does not change your checkout.",
                    "For existing projects, reuse established modules and map the plan to current code.",
                    "Adapt a conceptual plan with rpi-plan without repeating discovery. Stop if PRD or plan says Blocked or Not ready."]),
            activity("implement", "technical", "Define the first briefing build task", "Define the first briefing build task", ["rpi"],
                [".copilot-tracking/plans/ (first briefing task and approval status)"],
                "Plan the testable read-only slice using CRM-01 and MAIL-01, an explicit unknown, and denied access. Prepare it for a human decision; do not start implementation here.",
                ["This canvas never grants approval or marks human-review boxes.",
                    "Implement only approved commercial terms, not proposed pricing or paid-access rules.",
                    "If scope, architecture, security, privacy, RAI or commercial rules change, return to planning and the accountable owners."]),
            activity("review", "technical", "Agree what will prove the slice works", "Agree the briefing review evidence", ["rpi", "marketplace", "store"],
                ["Review contract in the existing task; later changes/ and reviews/ evidence remains Not run"],
                "Assign the reviewer and the evidence expected after a separately approved build. Keep implementation, product launch, and commercial approval as distinct gates.",
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
    dt: ["DT Coach / dt-methods", ".github/agents/design-thinking/dt-coach.agent.md"],
    tutor: ["DT Learning Tutor", ".github/agents/design-thinking/dt-learning-tutor.agent.md"],
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
    "App alignment: the workshop guides target the GitHub Copilot app. Agents and skills load from repository customizations or the hve-core plugin, and repository MCP servers load from .github/mcp.json or .mcp.json after you trust the repository.",
    "Path check: the guides use the canonical .copilot-tracking/ root. Verify the saved path an agent reports before linking or copying an artifact.",
    "Publication handoff: locate and link each coach's actual canonical artifact path. The Marketplace and Agent Store handoffs share one monetization record; do not create competing price lists.",
    "Component naming: System Architecture Reviewer produces the conceptual Mermaid diagram; architecture-diagrams is a skill for infrastructure code, not a separate agent. ADR Creator is available and overview lists ADRs, but no mandatory ADR exercise is specified.",
    "Evidence gap: the FSI lean canvas is assumption-labelled and its cited historical context is not bundled. Client A's practice records in the role guide are fictional teaching fixtures, not customer research. Business models, pricing, policies and metrics remain unverified.",
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
            for (const [, path] of item.sources) await readFile(resolve(root, path), "utf8");
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
