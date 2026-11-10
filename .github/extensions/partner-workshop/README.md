---
title: Partner workshop canvas
description: Launch, maintain and verify the source-grounded GitHub Copilot app workshop guide
author: Microsoft
ms.date: 2026-11-10
ms.topic: reference
keywords:
  - workshop
  - Copilot app
  - canvas
---

## Launch in the GitHub Copilot app

Open this workshop repository in the app, then run `/partner-workshop`.
The [launch command](../../prompts/workshop/partner-workshop.prompt.md) uses the
[partner-workshop skill](../../skills/workshop/partner-workshop/SKILL.md) to check
the repository, discover the provider and open one `partner-workshop-guide` panel.
No npm restore, browser download, Java installation or network connection is
needed to use the shipped canvas.

New skills and slash commands may require a new conversation or customization
refresh before the app indexes them. Extension reload refreshes the canvas
provider, not the current conversation's cached skill catalog. If the command is
not yet visible, ask the agent to read the launch command file and follow it;
the same preparation and open flow applies.

The provider is project-scoped at `extension.mjs`; `.github/plugin.json` also
registers the extension discovery directory, launch command and skill. This guide
requires the workshop repository's documents and components. Installing its
plugin alone into an unrelated product repository does not supply those documents.

## What participants get

* Six stages, the original 270-minute agenda and 21 guided activities
* Four role filters plus a whole-team view
* Three-level hints, expected outputs, linked HVE component sources and the
  complete original guide for every stage
* Source-extracted prompts with placeholders and path warnings preserved;
  no automatic prompt submission or workshop actions
* A D3 duration-proportional journey and stage-to-component relationship view,
  a Mermaid handoff flow and a PlantUML workflow/product-boundary view
* Primer dark colors, native keyboard controls, visible focus, skip navigation,
  text equivalents for diagrams and responsive layouts

Personal progress is stored under
`$COPILOT_HOME/extensions/partner-workshop/artifacts/<checkout-hash>/progress.json`
(`COPILOT_HOME` defaults to `~/.copilot`). It belongs to this user and checkout,
not a panel or loopback port, and survives provider restarts and new panels.
Worktrees have independent progress. Activity checks never approve a human-review
checkbox, external write, engineering task or commercial decision.

## Workshop analysis

The canvas reads all six
[workshop guides](../../../docs/getting-started/partner-workshop.md) directly at
open, validates every mapped activity section and checks referenced component
files. It displays the full original instructions so manual and optional
activities are not reduced to the shorter facilitation summaries.

| Stage                 | HVE components                                                     | Artifact / handoff                                              |
|-----------------------|--------------------------------------------------------------------|-----------------------------------------------------------------|
| 1. Overview, 30m       | Team alignment, no required agent                                  | Scenario, roles, outcomes and completion standard                |
| 2. Setup, 30m          | RPI Agent and available RPI commands                                | `.copilot-tracking/research/<date>/<session>-session-context.md` |
| 3. SME, within 90m     | `rpi-research`, BRD/PRD Builders when needed                         | Research/context pack, lean canvas, BRD/PRD drafts               |
| 3. PM, within 90m      | BRD/PRD Builders, `rpi-plan`, Functional Planner, Backlog Manager     | Requirements, phased plan, `.copilot-tracking/github-issues/`    |
| 3. Design, within 90m  | UX UI Designer, DT Coach/Tutor, AI Discovery Cards, accessibility/RAI | `.copilot-tracking/dt/` experience and design evidence            |
| 3. Technical, in 90m   | System Architecture Reviewer, architecture-diagrams, Security Planner | `.copilot-tracking/details/` architecture and publication inputs |
| 4. Solution, 30m       | `rpi-plan`, Backlog Manager, approved executor or Markdown fallback  | Traceability matrix, gap owners, conceptual architecture review |
| 5. Publishing, 60m     | Marketplace Coach and Agent Store Coach with their backing skills  | Connected readiness plans and one shared monetization plan      |
| 6. Handoff, 30m        | `rpi-implement` and `rpi-review` after separate human task approval   | Reviewed context transfer, changes/review evidence, next owners  |

PM typically owns BRD/PRD drafts; SME contributes domain evidence even though
those prompts appear in the SME section. Suggested role handoff is SME, PM,
Design, Technical, then whole-team integration. Backlog creation is a separate
approved write, not a condition for completing a Markdown-only workshop.

The overview lists `docs/planning/adrs/` as an output. ADR Creator exists here,
but the role guide does not prescribe a mandatory ADR exercise. The canvas marks
it optional rather than inventing one. Accessibility and RAI planners may create
their own workflow records; the workshop's design handoff remains the reviewed
experience draft.

Supporting contracts live with the components, not in this guide. BRD/PRD use
`requirements-author`; Functional Planner uses `functional-planner`; backlog
orchestration uses `backlog-management` with its approved execution workflow;
ADR Creator uses `adr-author` and its identity/standards/handoff instructions.
RPI phase commands load their corresponding `rpi-*` skills. The two publishing
coaches load `ms-marketplace-publish` and `copilot-agent-store-publish`, sharing
the Marketplace skill's monetization discovery/output contract.
Tracking-location and untrusted-content instructions keep output roots and
source authority consistent. Human-review and backlog mutation guards remain
owned by those workflows; canvas activity checks never replace them.

### Source conflicts and assumptions

* Setup documents Codespaces/local VS Code, not the app. The guide adapts host
  navigation to repository customizations, app agents and runtime canvases.
  It does not claim that VS Code extensions or `.vscode/mcp.json` configure
  the app. Figma remains optional and separately authorized.
* Some evidence examples omit the dot in `.copilot-tracking/`. Source prompts
  remain verbatim; visible warnings require correcting the path before sending.
* The solution guide places the canonical Marketplace implementation plan under
  `plans/`, while coach prompts and implementation handoff use `details/`.
  Participants must find the existing canonical plan, report its actual path and
  link it instead of creating duplicates.
* The named Arch Diagram Builder agent is absent. The available
  `architecture-diagrams` skill is the appropriate local capability.
* The only bundled FSI input is
  [a draft lean canvas](../../../docs/getting-started/samples/FSI/workshop-input/leancanvas.md).
  It explicitly lacks supporting business evidence; users, pricing, metrics and
  business-model claims remain assumptions or Unknown.
* HVE custom agents are planning tools, not publishable Microsoft 365 agents.
  Azure and Microsoft 365 customer products have separate identity, packaging
  and certification gates. The PlantUML view describes these boundaries, not a
  validated Azure deployment.
* Publishing policy, fees, offer support, package schemas and tenant/account
  state must be verified by the coaches against current authoritative sources.
  The canvas is a guide, not a current-policy oracle.
* The 30-minute final stage prepares an approved handoff. Implementing and
  reviewing a runnable slice, deploying, submitting and becoming certified are
  separate follow-up milestones unless authorized extra time and environments exist.

## Local implementation and dependencies

`server.mjs` serves only allowlisted assets and workshop/component sources from a
loopback-only, unguessable route. Host/origin checks, a restrictive CSP, sanitized
Markdown and bounded validated progress writes keep source text separate from
execution. It does not read tokens, call an external API, run workshop commands or
write workshop outputs.

Committed runtime libraries are D3 7.9.0, marked 15.0.12 and DOMPurify 3.4.11.
Their original license notices and source URLs/SHA-512 checksums live in
`vendor/`. Mermaid 10.9.4 and PlantUML 1.2025.10 are build-time renderers only;
the canvas serves their committed SVG output. See
[third-party notices](../../../THIRD-PARTY-NOTICES).

## Maintenance and verification

Run these commands from this directory. The preparation and unit checks use
Node's standard library. Browser verification uses the locked dev dependencies
and an existing system Google Chrome; it does not install a browser.

```bash
node prepare.mjs
npm ci --ignore-scripts
npm test
npm run test:browser
```

`npm run test:browser` checks all six stages with source instructions expanded,
both SVG diagrams, role filtering, hints, keyboard navigation, checkbox
persistence, 320px reflow, 200%-equivalent reflow, no external runtime requests,
and axe WCAG A/AA rules. It bypasses CSP only in the isolated test context to
inject axe; the served app CSP remains restrictive. These checks are not a formal
accessibility certification or a real screen-reader assessment.

To deliberately refresh vendored runtime assets:

```bash
npm run prepare:assets
```

That maintenance command downloads pinned public package files from jsDelivr and
records their byte hashes; ordinary launch never downloads anything. Review the
changed bytes, URLs, versions and license notices before committing them.

To regenerate diagrams, supply local renderer files and a provisioned Playwright
WebKit browser:

```bash
MERMAID_SCRIPT=/approved/local/mermaid-10.9.4.min.js \
PLANTUML_JAR=/approved/local/plantuml-1.2025.10.jar \
npm run render:diagrams
```

Mermaid is the public `mermaid@10.9.4/dist/mermaid.min.js` build. PlantUML is
available from Maven Central at
`net/sourceforge/plantuml/plantuml/1.2025.10/plantuml-1.2025.10.jar`;
the verified SHA-256 is
`4a01ea09b317180fb8e7eef712dfdca725409d2ee1919e4b5adfe9d8362b6fe5`.
`WEBKIT_EXECUTABLE` optionally points to an existing compatible WebKit executable.
All rendering is local; no repository content goes to a public render service.
Review the two SVGs for readable labels after changing the diagram sources.

This checkout lacks the root `package.json`, `scripts/`, root plugin synchronizer
and generated-reference tooling mentioned by inherited contributor guidance.
Do not fabricate those tools or claim their checks passed. The manifest additions
are bounded and tested here; upstream plugin/extension/documentation-generation
validation remains unavailable until those tools are restored.

AI-assisted implementation and analysis. Responsible humans retain review and
approval authority.
