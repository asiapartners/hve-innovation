---
title: Partner Workshop Role Guide
description: Design the Client A briefing through connected SME, PM, design, and technical exercises
sidebar_position: 9
author: Microsoft
ms.date: 2026-11-11
ms.topic: tutorial
keywords:
  - Project Manager
  - Subject Matter Expert
  - UX Designer
  - Engineer
  - HVE roles
estimated_reading_time: 10
---

## Workshop Agenda

| Step | Activity                                                       | Time   |
|------|----------------------------------------------------------------|--------|
| 1    | [Meet the FSI client](partner-workshop.md)                     | 30 min |
| 2    | [Prepare the FSI case](partner-workshop-setup.md)              | 30 min |
| 3    | [**Design the briefing**](partner-workshop-role-tracks.md)     | 90 min |
| 4    | [Challenge the briefing](partner-workshop-solution.md)         | 30 min |
| 5    | [Plan both launch paths](partner-workshop-publishing.md)       | 60 min |
| 6    | [Hand off the first slice](partner-workshop-implementation.md) | 30 min |

Use the `relationship-manager-fsi` context from stage 2 throughout these
activities. Add it with `@` and attach the reviewed outputs as each role hands
over. The primary route designs the Client A briefing; the reference sections
below offer reusable prompts and optional tools for later adaptation.

## Walkthrough: design the Client A briefing

### Inspect the Client A practice evidence

The SME starts with the bundled
[FSI lean canvas](samples/FSI/workshop-input/leancanvas.md). Its business claims
are assumptions and its baselines, prices, and target segment are unknown.
Copy it to `.copilot-tracking/research/workshop-input/leancanvas.md` if you need
an annotated working copy; do not overwrite the supplied source.

Use these **fictional teaching fixtures** for the briefing exercise. They
illustrate response behavior, not real customer facts, policies, or research:

| Fixture          | Practice input                                                  | Access in the exercise |
|------------------|-----------------------------------------------------------------|------------------------|
| CRM-01           | Client A's next meeting includes a contract renewal discussion. | Allowed                |
| MAIL-01          | Client A asked for an onboarding timeline before the meeting.   | Allowed                |
| No record        | No approved transaction-history evidence has been supplied.     | Unknown                |
| Client B request | The manager is not authorized to access this account.           | Denied; no content     |

1. Separate the fictional records from the lean canvas's business assumptions.
2. Record unanswered business questions, such as the actual preparation-time
   baseline, policy requirements, and first customer segment, with an owner.
3. Hand the annotated assumptions and the exact fixture references to the
   research activity. Do not invent additional records to make the answer look
   complete.

A useful sample response shape is: "Discuss renewal [CRM-01]. Confirm the
onboarding timeline [MAIL-01]. Transaction changes: Unknown." These are practice
citations, not links to a real CRM or email system.

### Research the briefing constraints

Choose **RPI Agent** and attach the shared session context and SME annotations.
The exercise is to establish what is supported and what still needs research,
not to turn the classroom examples into market evidence.

```text
/rpi-research
Read the attached relationship-manager-fsi session context and its exact
evidence references, including the Client A practice evidence section.
Create a context pack for the pre-meeting briefing. Separate fictional fixture
facts, business assumptions, proposed design constraints, and Unknowns.
Trace the two available statements to CRM-01 and MAIL-01. Record the missing
transaction evidence and the denied-account case without inventing account data.
Identify what customer research and policy evidence the SME must obtain before
real requirements can be approved. Save the dated research artifact under
.copilot-tracking/research/ and report its path. Context discovery only;
do not implement, create external work items, deploy, or publish.
```

Check that the result does not claim measured time savings or verified banking
policies. Hand the research path and unresolved questions to the PM.

### Specify the first briefing slice

The PM uses **PRD Builder** to turn the research into a draft for one job:
prepare for a Client A meeting. Add the research artifact and session context
with `@`.

```text
Use PRD Builder. Read the attached relationship-manager-fsi session context and
research pack. Draft the first read-only client-briefing slice, with requirements
for source citations, account-level authorization, explicit missing evidence,
and human review of suggested next actions.
Define observable acceptance checks for the Client A fixtures, missing
transaction history, and a denied Client B request. Exclude sending messages,
updating CRM records, making financial decisions, and transactions.
Keep business metrics, policies, and commercial terms unconfirmed where evidence
is missing. Save the draft and session state under .copilot-tracking/prd-sessions/
and report their paths. Do not claim human approval.
```

Review the draft, then select **RPI Agent** to plan it:

```text
/rpi-plan
Read the attached FSI session context, research pack, and reviewed PRD draft.
Plan one thin client-briefing slice: authorized inputs, cited briefing,
missing-evidence response, denied-access response, and their acceptance checks.
Save the plan and phase details under .copilot-tracking/plans/. Record owners,
dependencies, and unresolved approvals. Keep the Azure Managed Application and
Microsoft 365 agent as publication hypotheses for stage 5.
Do not implement or publish anything.
```

The handoff is a PRD and plan that a designer can use without guessing what
"trusted briefing" means. Use **BRD Builder** from the reference material if the
team also needs a fuller business case.

### Draft the briefing backlog

Choose **Functional Planner** and attach the reviewed PRD and plan.
Start with the user story: "As a relationship manager, I want a cited briefing
for an account I can access so that I can prepare without assembling every source
manually." This is a proposed workshop story, not validated user research.

```text
Use Functional Planner. Read the attached FSI context, PRD, and briefing plan.
Draft a Markdown backlog for the read-only Client A briefing with traceability
to the actual requirement IDs. Cover authorized retrieval, citations, missing
evidence, denied access, and acceptance checks. Identify the first independently
testable slice and dependencies. Save the handoff under
.copilot-tracking/github-issues/ and report its path.
Planning only. Do not create GitHub issues or mark human-review boxes complete.
```

Check that access and missing-data behavior are part of the first slice, not
deferred behind a happy-path demo. Keep the backlog local for the solution
review; external issue creation is a separate approved action.

### Design the manager's meeting preparation

Choose **UX UI Designer**. Attach the context, research, PRD, and plan. Use this
journey: ask about Client A, inspect the briefing, open a citation, inspect an
unknown, and review a suggested follow-up.

```text
Use UX UI Designer. Read the attached FSI context and reviewed role artifacts.
Draft the relationship manager's Client A meeting-preparation journey in
Microsoft 365 Copilot. Show the request, briefing, practice citations, missing
transaction evidence, and a proposed next action awaiting human review.
Include a denied-account state and an unavailable-source state. Label the
journey as a fictional workshop design, not observed user research.
Save .copilot-tracking/dt/relationship-manager-fsi/experience-draft.md with
evidence references, assumptions, and open user-research questions.
Do not build the product or send any messages.
```

Review whether the manager can distinguish an evidence-backed statement from an
assumption and find its source. Sketches, DT coaching, and Figma are optional;
the experience draft is the required handoff.

### Challenge the briefing experience

Review the same experience draft with **Accessibility Planner**, then with
**RAI Planner**, selecting one agent at a time. Attach the context and experience
draft and use this focused request for each planner's scope:

```text
Read the attached FSI context and Client A experience draft. Within your
planner's scope, examine the briefing, source citations, missing-evidence state,
denied-access state, and human review of suggested actions.
Identify barriers or potential harms, proposed mitigations, and observable
checks. Consider keyboard and screen-reader access, uncertainty that does not
rely on color, unsupported risk claims, and inappropriate reliance on a draft.
Report your workflow artifact's actual path and summarize the findings for the
experience handoff. Keep all findings draft; do not claim certification,
validated customer research, or human approval.
```

Carry the relevant findings into the experience draft with owners. A "risk
indicator" without supporting evidence is not an acceptable answer merely
because it is labelled AI-generated.

### Draw the permission-aware briefing path

Choose **System Architecture Reviewer**. Attach the context, PRD, plan, and
experience draft. Follow the manager's question through the proposed system,
separately from how source content is ingested.

```text
Use System Architecture Reviewer. Read the attached FSI context and reviewed
PRD, plan, and experience draft. Create conceptual architecture notes under
.copilot-tracking/details/ for the Client A briefing, including a Mermaid diagram.
Trace Microsoft 365 Copilot through identity, the Azure API, account-level
authorization, retrieval, model grounding, citations, and the response.
Show ingestion separately. Include denied access, missing evidence, dependency
failure, tenant isolation, no customer-data training, and audit telemetry without
secrets or unnecessary personal data. Map components to actual requirements.
Record the customer-subscription Managed Application as a hypothesis and identify
tradeoffs and unresolved controls. Report the saved path.
Do not deploy or describe the diagram as deployment-validated.
```

Review the rendered Mermaid diagram in the GitHub Copilot app. Confirm that
authorization is enforced by the service, not by an agent prompt. Use
**Security Planner** for the resulting security follow-up; an ADR is optional.

### Separate the backend and companion agent

The technical lead identifies two proposed product boundaries: the Azure
backend deployed in the customer's subscription and the Microsoft 365
customer-facing agent. HVE's workshop agents are neither of those products.
Choose **RPI Agent** and attach the existing architecture notes:

```text
Read the attached FSI context, plan, and architecture notes. Update those same
notes with the proposed Azure backend and Microsoft 365 companion-agent
boundaries for the client briefing. Record the API, identity, authorization,
data, and entitlement questions between them.
Keep Managed Application packaging and agent distribution as hypotheses until
the publishing coaches verify them. Assign unresolved decisions to owners and
link the existing plan. Do not create a separate publication plan, configure
billing, deploy resources, or publish.
```

Hand the notes to the whole team. Stage 4 will challenge the briefing behavior;
stage 5 will turn these publication questions into connected coach handoffs.

## Role facilitation reference

The remaining sections provide reusable methods and prompts for deeper work or
an explicitly adapted project. They are not a second set of required exercises.

## Suggested role order

A practical sequence for the workshop is:

1. Subject Matter Expert creates the shared context.
2. Project Management turns the draft into requirements, priorities, and backlog structure.
3. Design translates that context into an experience draft and captures accessibility and responsible AI needs.
4. Technical frames the solution approach, architecture, and publication considerations.
5. The team reviews the handoff together during the solution integration step.

This sequence helps each role build on the previous one without waiting for perfect information.

## HVE vs Agile

| Agile                                         | HVE                                                       |
|-----------------------------------------------|-----------------------------------------------------------|
| Sprint-first and feature-first                | Outcome-first and value-first                             |
| Backlog refinement often drives delivery      | Shared context and AI-assisted planning drive delivery    |
| Teams often interpret requirements separately | Humans and agents work from the same context and evidence |
| Large feature sets can be explored too early  | Small outcome slices help teams learn quickly             |

## Track overview

| Track                 | Primary objective                                                 | Suggested output                       |
|-----------------------|-------------------------------------------------------------------|----------------------------------------|
| Project Management    | Turn context into requirements, priorities, and backlog structure | Requirements draft and backlog outline |
| Subject Matter Expert | Capture business facts, rules, constraints, and evidence          | Context pack                           |
| Design                | Express the user experience, pain points, and success criteria    | Experience draft                       |
| Technical             | Frame the solution, architecture, and deployment considerations   | Architecture and publication notes     |

## HVE Agent Guide

Use the HVE agents as lightweight helpers for your role. Start with your own draft, then ask an agent to refine or structure it.

In the GitHub Copilot app, choose an agent from the agent picker in the prompt box, or type `/agent`. Type `/` to run skills such as `/rpi-research` and `/rpi-plan`, and type `@` to add files as context.

* **BRD Builder** or **PRD Builder** for first-draft requirements and a simple structure for business outcomes, scope, and acceptance criteria. In this workshop, the Project Management role should typically own the BRD/PRD draft, while the Subject Matter Expert provides the business context, evidence, and constraints that inform it.
* **RPI Agent** for gathering, testing, and synthesizing evidence before the SME creates the shared context pack.
* **Functional Planner** for turning a draft requirement into a lightweight epic, feature, story, and task hierarchy when the team needs a delivery handoff.
* **UX UI Designer** for user journeys, pain points, wireframe outline, and experience artifacts.
* **DT Coach** (Design Thinking Coach) for facilitation and discovery.
* **DT Learning Tutor** (Design Thinking Learning Tutor) for guided learning and method support.
* **Accessibility Planner** for accessibility requirements and inclusive design considerations.
* **Accessibility Reviewer** for a review pass on accessibility readiness.
* **RAI Planner** for responsible AI requirements, risks, and guardrails.
* **RAI Reviewer** for a responsible AI review pass.
* **System Architecture Reviewer** for framing a simple solution approach, tradeoffs, and architecture notes.
* **GitHub Backlog Executor** for creating or updating GitHub Issues after the backlog is reviewed. **Backlog Manager** dispatches it, so it does not appear in the agent picker.
* **Security Planner** for additional review, risk checks, and readiness considerations.

### Getting Started Guide

> [!TIP]
> Across all roles, design for publication of your solution to Microsoft Marketplace and Microsoft 365 Copilot Agent Store. Publishing solutions to the Microsoft Marketplace is one of the fastest ways to scale reach, simplify customer procurement, earn rewards, incentives and GTM benefits, and create recurring revenue opportunities.
>
> Keep your outputs clear enough to support packaging, discovery, and review in both destinations.

## Subject Matter Expert track

### Objective

Capture the business truth before anyone designs or builds anything.

### Create Context
1. For your selected use case, gather available evidence such as policy documents, SOPs, process diagrams, notes, document references, PDFs, screenshots, and images.
1. For workshop case, keep synthetic or public source files in a manually managed `.copilot-tracking/research/workshop-input/` folder, organized by type such as `policies/`, `sops/`, and `process-diagrams/`. Keep original diagram files beside rendered images.
1. For an actual production case, do not copy customer, regulated, confidential, or production evidence into the repository. Keep it in an approved system such as a governed SharePoint or OneDrive library, Azure Blob Storage or ADLS with controlled access, an approved document-management system, or a secure data room. Confirm classification, retention, and access permissions, then provide `/rpi-research` with a trusted readable path or controlled links.

### Marketplace Lean Canvas as Workshop Input

Use this lean canvas as the SME's quick workshop input before the PM, design, and technical tracks begin. The purpose is to capture the business reality in a compact, shared format that the rest of the team can review and refine.

Keep each item evidence-based. Where data is unknown, write `Unknown` and note the source or decision needed. Do not invent customer segments, pricing, or metrics.

| Business problem or pain | Target customer or user | Unique value proposition |
|---|---|---|
| What problem is expensive, risky, slow, or frustrating today? What is the cost of doing nothing? | Who is affected? Who pays? Who is the primary decision maker? | What makes this offering meaningfully better, faster, safer, or cheaper? |

| Solution or core offering | Distribution or channels | Revenue model or value capture |
|---|---|---|
| What is the offering, workflow, or service that addresses the problem? What is the minimum viable version? | How do customers discover, buy, and receive the offering? What channels and partners matter? | What are the revenue streams, pricing model, and commercial assumptions? |

| Cost structure | Key metrics and success measures | Competitive advantage or unfair edge |
|---|---|---|
| What are the major cost drivers, dependencies, and operational constraints? | What metrics will prove value: adoption, speed, quality, cost reduction, risk reduction, throughput, or retention? | What gives this initiative a durable advantage: policy fit, workflow depth, data access, trust, low friction, or domain expertise? |

#### SME & Product Manager prompt to fill the canvas

```text
/rpi-research
session-context=.copilot-tracking/research/[date]/[session-name]-session-context.md.
Read the topic and evidence root from the session context. Use the business
evidence, policies, process notes, and user-impact notes in the research
artifact.
Draft a concise lean canvas for an [FSI relationship manager assistant]. Capture
the problem, target customer segments, value proposition, core offering,
channels,
revenue model, costs, success metrics, and unique advantage. Separate facts from
assumptions and flag each unknown item for follow-up. Keep the wording grounded
in evidence, not marketing language. Save the output under
.copilot-tracking/research/workshop-input/leancanvas.md
```
#### Output checklist

1. Problem statement with affected users and impact.
2. Target customer or user segment and decision-maker.
3. Value proposition grounded in business evidence.
4. Minimum viable offering or workflow.
5. Known revenue, cost, and operational assumptions.
6. Success metrics and business evidence needed to validate them.
7. Risks, dependencies, and unknowns the next roles must resolve.

### Start Research
1. Run `/rpi-research` on the scenario and available evidence:

   ```text
   /rpi-research
   session-context=.copilot-tracking/research/[date]/[session-name]-session-context.md.
   Read the topic and evidence root from the session context and the
   workshop-input. Research the supplied scenario, policies, process notes, and
   supporting materials. Identify evidence-backed business facts, affected
   users,
   business rules, constraints, known failure cases, AI guardrails, open
   questions,
   and credible alternatives or counter-evidence. Save the dated primary
   research
   artifact under `.copilot-tracking/research/`. Keep the scope to context
   discovery.
   ```

   For a production case using a locally synced, access-controlled OneDrive folder, provide the trusted evidence root explicitly:

   ```text
   /rpi-research
   session-context=.copilot-tracking/research/[date]/[session-name]-session-context.md.
   Read the topic and OneDrive evidence root from the session context. Research
   the policies, SOPs, process diagrams, notes, PDFs, and screenshots in that
   folder. Identify evidence-backed business facts, affected users, business
   rules, constraints, known failure cases, AI guardrails, open questions, and
   credible alternatives or counter-evidence. Save the dated primary research
   artifact under `.copilot-tracking/research/`. Do not copy source files into
   the
   repository; cite the source filename and controlled location in the research
   artifact.
   ```

   Use a OneDrive folder that is governed by the organization's permissions, retention, and classification policies. Do not use a public sharing link or a personal OneDrive folder for production evidence.

1. Review the generated research artifact at `.copilot-tracking/research/`. This is your permanent evidence trail.
1. Extract and record key findings in a context document: problem statement, affected users, business impact, business rules, known failure cases, and AI guardrails. Reference the research artifact for traceability.
1. Separate facts from assumptions, decisions, and open questions. Link or reference the supporting material when available.
1. If you need structure, choose **BRD Builder** or **PRD Builder** in the agent picker, or type `/agent`, and ask it to draft a business or product requirements outline. Type `@` to add your notes, then ask it to create a problem statement, business goals, scope, assumptions, and acceptance criteria.

   Use **BRD Builder** when the team needs to establish the business case, stakeholders, outcomes, constraints, and decision context:

   ```text
   Use the BRD Builder agent. Session context:
   .copilot-tracking/research/[date]/[session-name]-session-context.md.
   Read the topic from the session context, then use its evidence references and
   research artifact. Draft a concise business requirements outline covering the
   business problem, affected stakeholders, measurable business outcomes, scope,
   non-goals, business rules, constraints, risks, assumptions, dependencies, and
   unresolved questions. Save the BRD draft and its session state under
   `.copilot-tracking/brd-sessions/`. Separate evidence-backed facts from
   assumptions and proposed decisions. Do not invent customer facts, policy
   requirements, metrics, or implementation commitments. Mark the document as a
   draft for human review and include testable acceptance criteria where they
   clarify the business outcome.
   ```

   Use **PRD Builder** when the team needs product behavior, user needs, functional requirements, non-functional requirements, and acceptance criteria:

   ```text
   Use the PRD Builder agent. Session context:
   .copilot-tracking/research/[date]/[session-name]-session-context.md.
   Read the topic from the session context, then use its research artifact and
   business requirements references. Draft a concise product requirements
   outline
   covering target users, jobs to be done, user journeys, in-scope and
   out-of-scope
   behavior, functional requirements, non-functional requirements, data and AI
   guardrails, known failure cases, accessibility needs, success metrics,
   dependencies, and testable acceptance criteria. Save the PRD draft and its
   session state under `.copilot-tracking/prd-sessions/`. Preserve citations or
   references to the supporting evidence. Separate facts from assumptions,
   decisions, and open questions. Do not invent customer data, policy
   requirements, or unsupported technical details. Mark the document as a draft
   for human review.
   ```

   For production evidence, provide the approved source path or controlled link as context. Do not paste or copy sensitive source content into the repository unless the approved environment permits it.

### Deliverable

1. **Research Artifact** (`.copilot-tracking/research/`): Evidence-backed research findings with facts, assumptions, constraints, and open questions.
2. **BRD Draft** (`.copilot-tracking/brd-sessions/`): Business requirements, stakeholders, outcomes, constraints, and acceptance intent.
3. **Requirements Draft** (`.copilot-tracking/prd-sessions/`): Product requirements with testable acceptance criteria.

## Design Track

### Objective

Translate the business context into a clear user experience and shared
understanding of the problem.

### Steps

1. Read the context pack created by the SME under `.copilot-tracking/research/`.
2. Add design evidence to the shared context before writing the final experience draft. Capture relevant user research, screen sketches, and wireframes in the same project folder so the next role can review them as part of the evidence trail. A practical pattern is:

   * Create a design working folder under `.copilot-tracking/dt/<project-name>/` for the scenario.
   * Add a short `user-research.md` with the study goal, participants, observations, key themes, and unresolved questions.
   * Add a `screens/` or `wireframes/` folder for lo-fi screen sketches, annotated mockups, or a link to a Figma file.
   * Add a `journey-notes.md` or `experience-draft.md` summarizing the user flow, key pain points, and decisions.
   * Label each artifact with evidence type, date, source, and whether it is observed, reported, assumed, or open question.
   * Keep customer or regulated data out of the repository; if a design artifact is based on protected data, reference the approved source location instead of copying sensitive content.

   Example pattern:

```text
.copilot-tracking/dt/<project-name>/
  user-research.md
  journey-notes.md
  experience-draft.md
  screens/
    home-screen-sketch.png
    account-summary-wireframe.png
  wireframes/
    customer-conversation-prep.fig
```

3. Use the research and design artifacts to ground the design decisions in observed user needs rather than assumptions. Keep a list of open questions and assumptions so the team can review them later.
4. Plan for a design thinking [**Microsoft AI Discovery Cards workshop**](https://aka.ms/AIDiscoveryCards) to brainstorm agentic AI capabilities with end users and stakeholders.
5. Select one primary user and one core job to be done.
6. Map the current journey and identify pain points.
7. Describe the future journey with the intended solution.
8. Add accessibility and responsible AI requirements.
9. If you need a first draft, choose **UX UI Designer** in the agent picker to turn the problem into a simple user journey and experience outline.
   Type `@` to add the context pack files under `.copilot-tracking/research/`, then use this prompt:

```text
"Turn these notes into a simple user journey, experience outline, and key pain
points for this scenario. Save the reviewed experience draft under
`.copilot-tracking/dt/`."
```

10. If the team needs a guided conversation, choose **DT Coach** in the agent picker to help frame the opportunity and challenge assumptions.

```text
"Coach me through a short design thinking session for this scenario. Help me
frame the problem, identify user needs, and define a focused opportunity area
for the solution."
```

11. If the team needs learning support or a clearer next step, choose **DT Learning Tutor** in the agent picker to explain the method and help transform notes into a simple design artifact.

```text
"Act as a Design Thinking Learning Tutor. Explain the next design thinking step
for this scenario and help me turn my notes into an insight, opportunity
statement, or user journey outline."
```

12. Use **Accessibility Planner** and **Accessibility Reviewer** to surface accessibility requirements and review the draft for gaps.
   Choose **Accessibility Planner** in the agent picker, type `@` to add the experience draft under `.copilot-tracking/dt/`, and use this prompt:

```text
"Review the experience draft under `.copilot-tracking/dt/` and identify
accessibility requirements, user needs, follow-up questions for implementation,
and updates to the draft."
```

13. Use **RAI Planner** and **RAI Reviewer** to capture responsible AI requirements, guardrails, and review findings.
   Choose **RAI Planner** in the agent picker, type `@` to add the experience draft under `.copilot-tracking/dt/`, and use this prompt:

```text
"Review the experience draft under `.copilot-tracking/dt/` and identify
responsible AI requirements, potential harms, mitigation ideas, and updates to
the draft."
```

14. If your team uses Figma, include links or references to Figma files, wireframes, and design artifacts in the experience draft. Use Figma outputs as evidence for user flows, screens, and design decisions, and note how those artifacts support the workshop handoff.

#### Connect Figma MCP and FigJam

Figma MCP is optional. It connects the GitHub Copilot app to Figma files and FigJam boards for design evidence, user flows, wireframes, and workshop handoffs.

15. Choose where to add the Figma MCP server. To share it with your team, create `.github/mcp.json` in the repository and commit it. To keep it to your own checkout, create `.mcp.json` at the repository root instead. If the repository has both files, `.mcp.json` takes precedence. To use the server only on your computer, click **Customize** in the app sidebar, click **MCP**, and add a custom server with the URL below.
16. Add the Figma MCP server to the file:

    ```json
    {
      "mcpServers": {
        "figma": {
          "type": "http",
          "url": "https://mcp.figma.com/mcp"
        }
      }
    }
    ```

17. Save the file and start a new session. Repository MCP servers load only after you trust the repository, so accept the trust card if it appears. If the server is missing, check **Settings** > the project > **Repository customizations** > **MCP servers**.
18. Start a Figma or FigJam action from the relevant design prompt, or type `/dt-figma-export` to run the `dt-figma-export` skill.
19. On the first call, complete the browser-based Figma OAuth sign-in and grant access to the files or boards used for the workshop. If the app asks you to sign in to the server, select **Sign in** next to it under **Settings** > the project > **Repository customizations** > **MCP servers**, or under **Customize** > **Installed** if you added it from **Customize**.
20. Reference the resulting Figma or FigJam URL in the experience draft, along with the artifact type, date, evidence status, and the user-flow or design decision it supports.

The Figma MCP server does not require a local installation. A Figma account with a Dev or Full seat on a Professional, Organization, or Enterprise plan is required for sustained usage. For configuration and troubleshooting guidance, see [Configuring MCP servers](https://docs.github.com/en/copilot/how-tos/github-copilot-app/customize-github-copilot-app#configuring-mcp-servers) and [Adding per-repository MCP servers](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers#adding-per-repository-mcp-servers).

21. Identify and validate the use case for publishing to Microsoft 365 Copilot Agent Store.
   Choose **UX UI Designer** in the agent picker, type `@` to add the experience draft under `.copilot-tracking/dt/`, and use this prompt:

```text
"How would end users benefit from Microsoft 365 Copilot integrated to this
scenario? What research would I need to run to validate it? Update the
experience
draft under `.copilot-tracking/dt/`."
```

22. Note how the experience should be packaged, discoverable, and reviewable for Microsoft Marketplace and Microsoft 365 Copilot Agent Store.
23. Define success criteria and unresolved questions.
4. Save the reviewed results under `.copilot-tracking/dt/` as the experience draft.

### Deliverable

`.copilot-tracking/dt/`: A user experience draft that captures the user path, pain points, and design constraints.

## Project Management track

### Objective

Turn business context and user experience into requirements, priorities, and a backlog draft with an implementation plan.

### Steps

1. Review the context pack in `.copilot-tracking/research/`, `.copilot-tracking/prd-sessions/`, `.copilot-tracking/brd-sessions/`, and `.copilot-tracking/dt/`. Align them to business outcomes, measurable success metrics, functional and non-functional requirements, user stories, acceptance criteria, out-of-scope items, and open assumptions.
2. Choose **RPI Agent** in the agent picker and run `/rpi-plan` to turn the requirements and context into an implementation plan with phases and phase details. For example:

   ```text
   /rpi-plan Read `.copilot-tracking/research/`,
   `.copilot-tracking/brd-sessions/` and `.copilot-tracking/dt/`. Create a
   lightweight implementation plan for the first MVP of the [Relationship
   Manager
   Assistant for FSI]. Include phase objectives, deliverables, requirements,
   dependencies, risks, and acceptance criteria. Plan for one evidence-backed
   job
   with grounded responses, source citations, permission-aware retrieval, clear
   uncertainty, human escalation, and confirmation before external actions.
   Align the plan to Microsoft Marketplace and Microsoft 365 Copilot Agent Store
   readiness, but keep publication claims provisional until current Microsoft
   guidance, Partner Center state, and tenant feasibility are verified. Do not
   implement or publish anything.
   ```

   This writes to `.copilot-tracking/plans/` and creates a durable record that links to your requirements and design context.

3. Review the generated plan at `.copilot-tracking/plans/` and refine phase details as needed.
4. Create a backlog outline only if it helps the team move from requirements to implementation. If needed, use a lightweight hierarchy such as epic, feature, story, and task for the first MVP.
5. Prioritize the first MVP with simple labels such as P0, P1, and P2 only if the team needs a sequencing signal. Keep this lightweight and outcome-focused rather than turning it into a rigid Agile process.
6. Prepare the requirements and backlog artifacts for publication readiness in Microsoft Marketplace and Microsoft 365 Copilot Agent Store.
   Choose **Functional Planner** in the agent picker, type `@` to add the context, requirements, and experience files, and use this prompt:

```text
"Use the functional-planner skill and review the requirements under
`.copilot-tracking/prd-sessions/`, the context under
`.copilot-tracking/research/`, and the experience draft under
`.copilot-tracking/dt/`. Create or refine a more implementation-ready MVP
backlog
plan under `.copilot-tracking/github-issues/` with clear epics, features,
stories,
and tasks. Then prioritize the MVP with simple labels such as P0, P1, and P2
only
if they help sequence the work. Also assess publication readiness for Microsoft
Marketplace and Microsoft 365 Copilot Agent Store. Keep the output concise,
outcome-focused, and useful for backlog refinement."
```

1. If you are targeting GitHub Issues, choose **Backlog Manager** in the agent picker. It coordinates the workflow and dispatches GitHub Backlog Executor to create the first parent issue and child issues for the initial MVP. **Backlog Manager** should also ensure the resulting issue links and summary are recorded under `.copilot-tracking/github-issues/` for traceability.

   Enable writing of GitHub issues:

   * Confirm that the GitHub account signed in to the app has write access to the target repository.
   * In a terminal on your computer, authenticate the GitHub CLI with `gh auth login --web`, or run `gh auth refresh -h github.com -s repo` if you need the `repo` scope. Check the result with `gh auth status`.
   * Confirm the target repository with `gh repo set-default [your git clone url]/hve-partner-workshop`.
   * GitHub Backlog Executor creates issues through GitHub MCP issue-write tools. If your session does not expose those tools, keep the reviewed Markdown backlog under `.copilot-tracking/github-issues/` and create the issues later from a session that does.
   * After the issues exist, click **Issues** in the app sidebar to review them. See [Managing issues and pull requests with the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/managing-issues-and-pull-requests).

   Prompt:

```text
"Review the approved requirements under `.copilot-tracking/prd-sessions/` and
the
backlog outline under `.copilot-tracking/github-issues/`. Confirm the target
GitHub repository, create the first parent issue and child issues for this
initial MVP, and record the issue links and summary under
`.copilot-tracking/github-issues/` for traceability. Use labels such as P0, P1,
P2, epic, feature, story, and task only if they help the workflow. Update the
backlog plan and create the backlog in GitHub Issues."
```

1. Review the issue list for traceability from business outcome to requirement to backlog item, then save the final backlog summary and issue links under `.copilot-tracking/github-issues/`.

### Deliverable

1. **Implementation Plan** (`.copilot-tracking/plans/`): A phased implementation plan with objectives, deliverables, and acceptance criteria for each phase.
2. **GitHub Backlog** (`.copilot-tracking/github-issues/`): A backlog of features, stories, or tasks for translating business outcome to trackable work items, linked to the implementation plan.

## Technical track

### Objective

Frame the solution approach, architecture, and publication considerations aligned to the implementation plan.

### Steps

1. Review the requirements under `.copilot-tracking/brd-sessions/`, `.copilot-tracking/prd-sessions/`, the experience draft under `.copilot-tracking/dt/`, and the implementation plan at `.copilot-tracking/plans/`.
2. Identify the core services, data sources, and integration points that support the phased plan.
3. Choose **System Architecture Reviewer** in the agent picker to help frame a simple solution approach, major tradeoffs, and architecture notes that align to each phase of the plan:

   * Note deployment, security, and operational considerations.
   * Review the draft for well-architected design and Cloud Adoption Framework guidance.
   * Capture the publication requirements for Microsoft Marketplace and Microsoft 365 Copilot Agent Store readiness, including packaging, discoverability, supportability, and integration expectations.

   ```text
   "Review the implementation plan at `.copilot-tracking/plans/`, the
   requirements
   under `.copilot-tracking/prd-sessions/`, and the experience draft under
   `.copilot-tracking/dt/`. Create architecture notes under
   `.copilot-tracking/details/` covering a simple solution approach for each
   phase, major tradeoffs, cloud architecture, well-architected concerns,
   publication requirements, Microsoft IQ, and a Mermaid architecture diagram.
   Link the architecture notes back to the phases in the implementation plan."
   ```
   * The prompt asks System Architecture Reviewer to include a Mermaid architecture diagram in the notes. The GitHub Copilot app renders Mermaid diagrams in the conversation. Once infrastructure code exists, type `/architecture-diagrams` to generate diagrams from it.

4. Use **Security Planner** to review readiness and surface follow-up work aligned to each phase.

   ```text
   "Review this solution draft for security risks, deployment considerations,
   and
   follow-up actions needed for each phase in the implementation plan. Link any
   security-related work back to the appropriate phase."
   ```

5. Ask Copilot to show the Mermaid diagram in the conversation, review it, and describe any changes in natural language.
6. (Optional) Instead of the GitHub Copilot app, use **Microsoft 365 Copilot** to create an image. In M365 Copilot, attach the implementation plan, and create an architecture image from the mermaid diagram for this solution using Azure and Copilot-style icons to represent core services, data sources, user experience layers, and integrations for the first MVP.

   ```text
   "Create an architecture image from the Mermaid diagram for this solution
   using
   Azure and Copilot-style icons to represent core services, data sources, user
   experience layers, and integrations for the first MVP. "
   ```
   Save or reference the reviewed image under `.copilot-tracking/details/`.

7. Capture only the publication assumptions needed for the solution review in the architecture notes and link them to the implementation plan.

   * Select SaaS or Azure Managed Application as the preferred Marketplace model and the Microsoft 365 agent as a potential companion experience.
   * Managed Application: State what the components deploys, what the agent presents to users, and where each product boundary begins and ends.
   * Summarize the API, identity, permission, and data contract between the two products.
   * Record architecture constraints that affect solution, including data residency, tenant isolation, customer-controlled infrastructure, and least-privilege access.
   * List unresolved publication assumptions with an owner. Do not resolve commercial or submission details during the role exercise.

   Choose **RPI Agent** in the agent picker and use this prompt:

   ```text
   "Review the implementation plan at `.copilot-tracking/plans/`, the
   requirements
   under `.copilot-tracking/prd-sessions/`, the experience draft under
   `.copilot-tracking/dt/`, and the architecture notes under
   `.copilot-tracking/details/`. Update the architecture notes with only the
   publication assumptions needed for the solution review. Record preferred
   Marketplace model and the Microsoft 365 agent as a potential companion
   experience. Define the product boundaries and summarize the API, identity,
   permission, and data contract between them. Capture only architecture
   constraints, assumptions, unresolved decisions, and owners needed for
   solution
   integration. Link these inputs to the implementation plan. Defer the
   Marketplace implementation plan, offer validation, pricing, monetization,
   Partner Center configuration, package preparation, certification, and rollout
   planning to the Partner Workshop Publishing Follow-Up."
   ```

   Complete the detailed readiness assessment during the [Partner Workshop Publishing Follow-Up](partner-workshop-publishing.md).

8. Share the output with the rest of the team.

### Deliverable

1. **Architecture Notes** (`.copilot-tracking/details/`): Architecture design notes aligned to each phase of the implementation plan, including risks, tradeoffs, integration requirements, and the minimal publication assumptions needed by the solution review.
2. Publication planning input: The provisional product split, integration boundary, architecture constraints, and open decisions recorded within the architecture notes for the publishing workshop.

## Working session reminder

Keep the output concise and action-oriented. Do not wait for perfect
information. The goal is to produce a reviewed draft that the team can refine after the workshop.

Proceed to the [solution guide](partner-workshop-solution.md).

---

<!-- markdownlint-disable MD036 -->
*🤖 Crafted with precision by ✨Copilot following brilliant human instruction,
then carefully refined by our team of discerning human reviewers.*
<!-- markdownlint-enable MD036 -->
