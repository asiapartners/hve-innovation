---
title: HVE Partner Workshop
description: Follow an FSI relationship-manager scenario from a client briefing idea to a reviewed delivery and publication handoff
sidebar_position: 7
author: Microsoft
ms.date: 2026-11-11
ms.topic: tutorial
keywords:
  - partner workshop
  - HVE Core
  - role-based learning
  - Azure architecture
  - Microsoft Marketplace
  - Copilot Agent Store
estimated_reading_time: 8
---

Build the **Relationship Manager Intelligence Experience** together. Across six
stages, your partner team takes one financial-services client-briefing scenario
from a user need to requirements, a user journey, an Azure design, a backlog, and
publication plans. The sample is the main walkthrough, not an optional exercise.

The workshop teaches a repeatable workflow. It does not compress production security review, Azure deployment, or Microsoft Marketplace certification into a day.

## Client A briefing mission

You are the partner team helping a relationship manager prepare for a meeting
with **Client A**, a fictional business client. Today, the manager assembles
context from CRM records, email, transaction history, and internal knowledge.
Your proposed product brings that context into Microsoft 365 Copilot:

> Prepare me for my meeting with Client A. What changed, what needs attention,
> and what should I do next?

The first slice is a **read-only, cited pre-meeting briefing for one authorized
account**. It distinguishes supported facts from missing information and drafts
next actions for the manager to review. It does not send messages, update the CRM,
make financial decisions, or perform transactions.

The broader sample proposes an Azure Managed Application in each customer's
subscription, with data, search, model, API, identity, and monitoring resources.
Treat this as a design hypothesis to examine, not a validated deployment or
confirmed publication route.

1. Assign an SME, PM, designer, and technical lead within your team of four to eight.
2. Read the meeting question aloud. Agree that the walkthrough will produce a
   briefing with citations, permission-aware access, explicit unknowns, and human
   review of suggested actions.
3. Keep customer data out of the workshop. Client A and the later practice
   records are fictional; the supplied lean canvas contains assumptions, not
   validated customer research. No customer data may be used for model training.
4. Record the role owners and the first-slice boundary for the setup stage.

Your handoff is one shared mission: help the manager prepare, without revealing
unauthorized information or presenting an unsupported answer as fact.

You use the **GitHub Copilot app** and HVE agents to do the workshop. The
**Microsoft 365 Copilot agent** is the customer-facing product you are designing;
it is not the workshop tool.

In the canvas introduction, use **Your workshop team** to enter your company or
team name and each member's name and GitHub handle. Four member slots are ready;
choose **Add member** for up to eight. Choose **Save team** to keep the details
on this computer for this checkout. Blank slots can be saved while you gather
the roster. Saving does not look up accounts, invite members, or assign roles.

The **Your team** section remains available in later stages. Use **Copy saved
team details** when adding the roster to your shared context. Review those
details before sharing them; the canvas does not automatically write them to
the repository or send them to GitHub.

## Use the Copilot app guide

In the GitHub Copilot app, start a session in this repository and run
`/partner-workshop` to prepare and open the interactive guide. It covers every
agenda stage with the Client A exercise and copy-ready prompts visible directly
in the activity cards. Hints, reusable instructions, and diagrams remain optional
reference material. New customizations may require a new session before the command
appears.
See the [canvas launch and maintenance guide](../../.github/extensions/partner-workshop/README.md)
for the direct-file fallback, source assumptions and verification commands.
The canvas guides the workshop; it does not execute prompts or grant human approvals.

## Workshop Agenda

| Step | Activity                                                       | Time   |
|------|----------------------------------------------------------------|--------|
| 1    | [**Meet the FSI client**](partner-workshop.md)                 | 30 min |
| 2    | [Prepare the FSI case](partner-workshop-setup.md)              | 30 min |
| 3    | [Design the briefing](partner-workshop-role-tracks.md)         | 90 min |
| 4    | [Challenge the briefing](partner-workshop-solution.md)         | 30 min |
| 5    | [Plan both launch paths](partner-workshop-publishing.md)       | 60 min |
| 6    | [Hand off the first slice](partner-workshop-implementation.md) | 30 min |

## Outcomes

By the end of the facilitated session, the team can:

* Provide HVE Core grounded business, user, domain, design, and technical context
* Create business and user requirements with testable acceptance criteria
* Convert requirements into a prioritized GitHub backlog
* Generate and review a Mermaid architecture diagram for an Azure solution
* Explain the steps and approval gates for an Azure Managed Application offer on Microsoft Marketplace
* Explain the supported routes to the Microsoft 365 Copilot Agent Store

The team should leave with these artifacts in production locations:

```text
.copilot-tracking/
|-- research/                 [rpi-research artifacts]
|-- brd-sessions/             [BRD drafts and session state]
|-- prd-sessions/             requirements.md
|-- plans/                    [implementation plan and phase details]
|-- details/                  [phase-specific architecture and publication
                               notes]
|-- dt/                       [design thinking outputs]
`-- github-issues/            [backlog plan]
docs/
`-- planning/
    `-- adrs/                 [architecture decision records]
```

| Outcome                      | Workshop Artifact Location          | Post-Workshop Path                              |
|------------------------------|-------------------------------------|-------------------------------------------------|
| Context and research         | `.copilot-tracking/research/`       | Customer validation and approval                |
| Business requirements        | `.copilot-tracking/brd-sessions/`   | Validate business scope before product planning |
| Requirements and PRD         | `.copilot-tracking/prd-sessions/`   | Refine and lock PRD for development             |
| Implementation Plan          | `.copilot-tracking/plans/`          | Coordinate team delivery across phases          |
| Architecture and Publication | `.copilot-tracking/details/`        | Implement and validate per-phase deliverables   |
| Design and UX                | `.copilot-tracking/dt/`             | Implement UI and validate with users            |
| Architecture Decisions       | `docs/planning/adrs/`               | Implement and validate infrastructure           |
| GitHub Backlog               | `.copilot-tracking/github-issues/`  | Create approved external work items             |
| Publication Plan             | `.copilot-tracking/[session-type]/` | Execute marketplace and agent store publication |

> [!IMPORTANT]
> HVE Core custom agents run in the GitHub Copilot app. They are not Microsoft
> 365 Copilot agents and cannot be uploaded directly to the Agent Store. The
> team should build the customer-facing agent with a supported Microsoft 365
> agent tool, package it, validate it, and follow the applicable organizational
> catalog or Partner Center publishing route.

## Audience and Roles

Form multidisciplinary teams of four to eight people.

| Track                 | Suggested Participants                                                 | Primary Workshop Output                                                 |
|-----------------------|------------------------------------------------------------------------|-------------------------------------------------------------------------|
| Project Management    | PM, Program manager, Product owner                                     | Outcomes, requirements, priorities, backlog structure                   |
| Subject Matter Expert | Industry SME, Compliance Lead, Operations Lead                         | Domain context, terminology, constraints, evidence                      |
| Design                | UX Designer, Service Designer, Design Thinking Facilitator, Researcher | Personas, User Journey, Accessibility, Responsible AI, Agent experience |
| Technical             | Architect, Forward Deployed Engineer, Security, Platform Lead          | Azure design, diagram, deployment and publication plan                  |

Review the broader [HVE role guides](../hve-guide/roles/) after the workshop for ongoing role-specific workflows.

## Participant Flow

1. Frame the Client A briefing mission and assign role owners.
2. Complete [shared setup](partner-workshop-setup.md) and create the `relationship-manager-fsi` session context.
3. Follow the [role walkthrough](partner-workshop-role-tracks.md) to turn the practice evidence into a briefing design and backlog.
4. [Challenge the joined-up solution](partner-workshop-solution.md) with authorized, missing-data, and denied-access cases.
5. [Plan both launch paths](partner-workshop-publishing.md) for the Azure backend and companion Microsoft 365 agent, with one shared monetization record.
6. [Hand off the first briefing slice](partner-workshop-implementation.md), its acceptance checks, and the approvals still required before building.

## Adapt the walkthrough to your own project

Complete the Client A route first, or agree an adaptation with the facilitator.
Replace the user, core job, evidence location, and product boundaries in one
shared session-context artifact. Then keep the same six-stage handoffs and
approval gates. Do not mix the fictional FSI records with real customer evidence
or silently reuse the sample's commercial assumptions.

## Completion Standard

The workshop is complete when the team has reviewed the six draft artifacts, identified unresolved assumptions, and assigned owners for publication follow-up. Actual Azure deployment, commercial Microsoft Marketplace validation, and Copilot Agent Store availability are post-workshop milestones unless the facilitator explicitly provides extra time and project managers have authorized environments.

## Related Guidance

* [Getting started with the GitHub Copilot app](https://docs.github.com/en/copilot/get-started/quickstart-copilot-app)
* [Customizing the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/customize-github-copilot-app)
* [Registering the HVE Core plugin](install.md#copilot-plugin-registration)
* [Your First Full Workflow](first-workflow.md)
* [Architecture Diagrams Skill](../agents/project-planning/arch-diagram-builder.md)
* [Adding MCP servers for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers)

---

<!-- markdownlint-disable MD036 -->
*🤖 Crafted with precision by ✨Copilot following brilliant human instruction,
then carefully refined by our team of discerning human reviewers.*
<!-- markdownlint-enable MD036 -->
