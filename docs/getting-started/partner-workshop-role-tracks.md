---
title: Partner Workshop Role Guide
description: Structured role-based guide for the HVE partner workshop
sidebar_position: 9
author: Microsoft
ms.date: 2026-11-18
ms.topic: tutorial
keywords:
  - Project Manager
  - Subject Matter Expert
  - UX Designer
  - Engineer
  - Data Scientist
  - HVE roles
estimated_reading_time: 10
---

## Workshop Agenda

| Step | Activity                                                                                        | Time   |
|------|-------------------------------------------------------------------------------------------------|--------|
| 1    | [Workshop Overview](partner-workshop.md)                                                        | 30 min |
| 2    | [Set up Codespaces or local VS Code](partner-workshop-setup.md)                                 | 30 min |
| 3    | [**Plan, Envision, Experience, Architecture Design, Backlog**](partner-workshop-role-tracks.md) | 90 min |
| 4    | [Validation & Solution](partner-workshop-solution.md)                                           | 30 min |
| 5    | [Microsoft Marketplace and Copilot Agent Store readiness](partner-workshop-publishing.md)       | 60 min |
| 6    | [Handoff to Implementation & Commercialization](partner-workshop-implementation.md)             | 30 min |

Use this guide during the role-exercise portion of the workshop. Participants should work from the same scenario, capture assumptions, and leave with a handoff that the next role can use.

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

* **BRD Builder** or **PRD Builder** for first-draft requirements and a simple structure for business outcomes, scope, and acceptance criteria. In this workshop, the Project Management role should typically own the BRD/PRD draft, while the Subject Matter Expert provides the business context, evidence, and constraints that inform it.
* **RPI Agent** for gathering, testing, and synthesizing evidence before the SME creates the shared context pack.
* **Functional Planner** for turning a draft requirement into a lightweight epic, feature, story, and task hierarchy when the team needs a delivery handoff.
* **UX UI Designer** for user journeys, pain points, wireframe outline, and experience artifacts.
* **Design Thinking Coach** for facilitation and discovery.
* **Design Thinking Learning Tutor** for guided learning and method support.
* **Accessibility Planner** for accessibility requirements and inclusive design considerations.
* **Accessibility Reviewer** for a review pass on accessibility readiness.
* **RAI Planner** for responsible AI requirements, risks, and guardrails.
* **RAI Reviewer** for a responsible AI review pass.
* **System Architecture Reviewer** for framing a simple solution approach, tradeoffs, and architecture notes.
* **GitHub Backlog Executor** for creating or updating GitHub Issues after the backlog is reviewed.
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
1. For workshop case, keep synthetic or public source files in a manually managed `./copilot-tracking/research/workshop-input/` folder, organized by type such as `policies/`, `sops/`, and `process-diagrams/`. Keep original diagram files beside rendered images.
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

Select **RPI Agent** when you need to research on the product.

```text
/rpi-research
Find the most recent workshop session-context artifact. If it is missing or
the latest session is ambiguous, ask me to identify the session before
continuing. Read the use case, evidence location, evidence boundary, and
output roots from that context.

Use the available approved evidence and any existing research for this session.
Update the latest related lean canvas if one exists; otherwise draft one. If the
latest canvas is ambiguous, ask me which one to use. Capture the problem, target
customer segments, value proposition, core offering, channels, revenue model,
costs, success metrics, and unique advantage. Separate facts from assumptions,
mark unknowns for follow-up, and avoid unsupported claims. 

Save the output under 
[./copilot-tracking/research/workshop-input/leancanvas.md] and mark it for human review.
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

Select **RPI Agent** when you need to research business facts against your product plan.

1. Run `/rpi-research` on the scenario and available evidence:

   ```text
   /rpi-research
   Find the most recent session-context artifact. If it is missing or the latest session is ambiguous, ask me to identify the session before continuing. Read the use case, evidence location, evidence boundary, and output roots from that context.

   Research the approved workshop inputs and use any existing research for this
   session. If the evidence is unavailable or the relevant research is
   ambiguous, ask me for clarification. Identify evidence-backed business
   facts, affected users, business rules, constraints, known failure cases,
   AI guardrails, open questions, and credible alternatives or
   counter-evidence. Save the dated primary research artifact to the approved
   research output root from the session context. Keep the scope to context
   discovery.
   ```

   For a production case using a locally synced, access-controlled OneDrive folder, identify the trusted evidence location in the session context:

   ```text
   /rpi-research
   Find the latest workshop session-context artifact, including ignored
   tracking files. If it is missing or the latest session is ambiguous, ask
   me to identify the session. Read the use case, evidence boundary, OneDrive
   evidence location, and approved output roots from that context.

   Use approved inputs from the access-controlled, locally synced OneDrive
   folder and any existing research for this session. If the location, access,
   or relevant research is unavailable or ambiguous, ask me for clarification.
   Confirm that the folder and intended outputs meet the organization's
   classification, retention, and access requirements before using evidence.
   Identify evidence-backed business facts, affected users, business rules,
   constraints, failure cases, AI guardrails, open questions, and credible
   alternatives or counter-evidence. Save the dated research artifact to the
   approved research output root. Do not copy source files into the repository;
   cite the source filename and controlled location instead.
   ```

   Use a OneDrive folder that is governed by the organization's permissions, retention, and classification policies. Do not use a public sharing link or a personal OneDrive folder for production evidence.

1. Review the generated research artifact at `.copilot-tracking/research/`. This is your permanent evidence trail.
1. Extract and record key findings in a context document: problem statement, affected users, business impact, business rules, known failure cases, and AI guardrails. Reference the research artifact for traceability.
1. Separate facts from assumptions, decisions, and open questions. Link or reference the supporting material when available.
1. If you need structure, ask **BRD Builder** or **PRD Builder** to draft a business or product requirements outline. Start by sharing your notes and ask it to create a problem statement, business goals, scope, assumptions, and acceptance criteria.

   Select the  **BRD Builder** when the team needs to establish the business case, stakeholders, outcomes, constraints, and decision context:

   ```text    
   Find the latest workshop session-context artifact. If it is missing or the latest
   session is ambiguous, ask me to identify the session. Read the use case,
   evidence location, evidence boundary, and output roots from that context.

   Use the approved workshop inputs and latest relevant research for this
   session. If evidence is unavailable or the relevant research is ambiguous,
   ask me for clarification. 
   
   Draft a concise business requirements outline
   covering the business problem, affected stakeholders, measurable outcomes,
   scope, non-goals, business rules, constraints, risks, assumptions,
   dependencies, and unresolved questions. Separate evidence-backed facts
   from assumptions and proposed decisions. Do not invent customer facts,
   policy requirements, metrics, or implementation commitments. Include
   testable acceptance criteria where they clarify the business outcome.
   
   Save the BRD draft and session state under [./copilot-tracking/brd-sessions]  and
   mark the draft for human review.
   ```

   Select  **PRD Builder** when the team needs product behavior, user needs, functional requirements, non-functional requirements, and acceptance criteria:

   ```text
   Find the latest workshop session-context artifact. If it is missing or the latest
   session is ambiguous, ask me to identify the session. Read the use case,
   evidence location, evidence boundary, and output roots from that context.

   Use the approved workshop inputs, latest relevant research, and available
   business requirements for this session. If evidence is unavailable or the
   relevant research or requirements are ambiguous, ask me for clarification.
   
   Draft a concise product requirements outline covering target users, jobs to
   be done, user journeys, in-scope and out-of-scope behavior, functional and
   non-functional requirements, data and AI guardrails, known failure cases,
   accessibility needs, success metrics, dependencies, and testable acceptance
   criteria. Preserve evidence references and separate facts from assumptions,
   decisions, and open questions. Do not invent customer data, policy
   requirements, or unsupported technical details. 
   
   Save the PRD draft and session state under [./copilot-tracking/prd-sessions]  and
   mark the draft for human review.
   ```

   For production evidence, provide the approved source path or controlled link as context. Do not paste or copy sensitive source content into the repository unless the approved environment permits it.

### Deliverables

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
9. To create a first draft, 

Select **UX UI Designer** when you need to turn workshop context into a user journey, experience outline, and key pain points.

   ```text
   Find the latest workshop session-context artifact and its related context
   and research. If the session or context pack is
   missing or ambiguous, ask me to identify it. Read the use case, evidence
   boundary, and relevant research from those artifacts.

   Use this context to draft a simple user journey, experience outline, and
   key pain points. Separate evidence-backed findings from assumptions and
   open questions.
   
   Save the experience draft under `.copilot-tracking/ux-artifacts/`
   and mark it for human review.
   ```

10. Identify and validate the use case for publishing to Microsoft 365 Copilot Agent Store.
     
Select **UX UI Designer** to create Microsoft 365 Copilot experiences,

```text
Find the latest workshop session context, relevant research, and experience
draft. If the session or draft is missing or ambiguous, ask me to identify it.

Using the use case and available evidence, identify potential end-user
benefits of Microsoft 365 Copilot, integrations with Teams, or Outlook. Explain how
each experience could fit into users' existing workflows. Separate supported
findings from assumptions and avoid inventing benefits.

Propose research to validate the benefits, including the users to involve,
questions to investigate, methods, and evidence of success. Update the
experience draft under `.copilot-tracking/ux-artifacts/` and mark the changes
for human review.
```
Note how the experience should be packaged, discoverable, and reviewable for Microsoft Marketplace and Microsoft 365 Copilot Agent Store. Define success criteria and unresolved questions.
Save the reviewed results under `.copilot-tracking/ux-artifacts/` as the experience draft.

11. If the team needs a guided conversation, 

Select **DT Coach** to help frame the opportunity and challenge assumptions.

```text
"Coach me through a short design thinking session for this scenario. Help me
frame the problem, identify user needs, and define a focused opportunity area
for the solution."
```

12. If the team needs learning support or a clearer next step, 

Select **DT Learning Tutor** to explain the method and help transform notes into a simple design artifact.

```text
"Explain the next design thinking step
for this scenario and help me turn my notes into an insight, opportunity
statement, or user journey outline."
```

13. Use **RAI Planner** and **RAI Reviewer** to capture responsible AI requirements, guardrails, and review findings.

Select the **RAI Planner** to plan the Responsible AI experience,

```text
"Plan the experience draft under `.copilot-tracking/dt/` and identify
responsible AI requirements, potential harms, mitigation ideas, and updates to
the draft."
```

14. Use **Accessibility Planner** and **Accessibility Reviewer** to surface accessibility requirements and review the draft for gaps.

Select **Accessibility Planner** to plan the accessibility experience,

```text
"Plan the experience draft under `.copilot-tracking/dt/` and identify
accessibility requirements, user needs, follow-up questions for implementation,
and updates to the draft."
```

#### Connect Figma MCP and FigJam

Figma MCP is optional. It connects GitHub Copilot to Figma files and FigJam boards for design evidence, user flows, wireframes, and workshop handoffs.


15. If your team uses Figma, include links or references to Figma files, wireframes, and design artifacts in the experience draft. Use Figma outputs as evidence for user flows, screens, and design decisions, and note how those artifacts support the workshop handoff.
16. Create or open `.vscode/mcp.json` in the workspace root.
17. Add the Figma MCP server:

    ```json
    {
       "servers": {
          "figma": {
             "type": "http",
             "url": "https://mcp.figma.com/mcp"
          }
       }
    }
    ```

18. Save the file and reload VS Code if the MCP server does not appear in Copilot Chat.
19. Start a Figma or FigJam action from the relevant design prompt, such as `dt-figma-export`.
20. On the first call, complete the browser-based Figma OAuth sign-in and grant access to the files or boards used for the workshop.
21. Reference the resulting Figma or FigJam URL in the experience draft, along with the artifact type, date, evidence status, and the user-flow or design decision it supports.

The Figma MCP server does not require a local installation. A Figma account with a Dev or Full seat on a Professional, Organization, or Enterprise plan is required for sustained usage. See [MCP Server Configuration](mcp-configuration) for the complete workspace configuration and troubleshooting guidance.

### Deliverable

`.copilot-tracking/dt/`: A user experience draft that captures the user path, pain points, and design constraints.

## Project Management track

### Objective

Turn business context and user experience into requirements, priorities, and a backlog draft with an implementation plan.

### Steps

1. Review the context pack in `.copilot-tracking/research/`, `.copilot-tracking/prd-sessions/`, `.copilot-tracking/brd-sessions/`, `.copilot-tracking/ux-artifacts/` and `.copilot-tracking/dt/`. Align them to business outcomes, measurable success metrics, functional and non-functional requirements, user stories, acceptance criteria, out-of-scope items, and open assumptions.
2. Select **RPI Agent**  to turn the requirements and context into an implementation plan with phases and phase details.

   ```text
   /rpi-plan
   Find the latest workshop session context and its relevant research,
   requirements, and experience artifacts.
   If the session or relevant artifacts are missing or ambiguous, ask me for
   clarification. Read the use case, evidence boundary, and approved output
   roots from the session context.

   Create a lightweight implementation plan for the first MVP. Include phase
   objectives, deliverables, requirements, dependencies, risks, and acceptance
   criteria. Scope the MVP to one evidence-backed user job, with grounded
   responses, source citations, permission-aware retrieval, clear uncertainty,
   human escalation, and confirmation before external actions.

   Address Microsoft Marketplace and Microsoft 365 Copilot Agent Store
   readiness. Keep publication claims provisional until current Microsoft
   guidance, Partner Center state, and tenant feasibility are verified.
   Save the plan to '.copilot-tracking/plans/' using the approved output roots and link its supporting artifacts. Do not implement or publish anything.
   ```

3. Review the generated plan at `.copilot-tracking/plans/` and refine phase details as needed.
4. Create a backlog outline only if it helps the team move from requirements to implementation. If needed, use a lightweight hierarchy such as epic, feature, story, and task for the first MVP.
5. Prioritize the first MVP with simple labels such as P0, P1, and P2 only if the team needs a sequencing signal. Keep this lightweight and outcome-focused rather than turning it into a rigid Agile process.
6. Prepare the requirements and backlog artifacts for publication readiness in Microsoft Marketplace and Microsoft 365 Copilot Agent Store.

Select **Functional Planner** to prepare backlog,

```text
Find the latest workshop session context and its relevant research,
requirements, experience draft, and implementation plan. If the session or
relevant artifacts are missing or ambiguous, ask me for clarification. Read
the use case, evidence boundary, and approved output roots from the session
context.

Create or refine a concise, implementation-ready MVP backlog plan with epics,
features, stories, and tasks traceable to the supporting artifacts. Use P0,
P1, and P2 priorities only if they help sequence the work. Assess Microsoft
Marketplace and Microsoft 365 Copilot Agent Store publication readiness;
identify assumptions and unresolved questions rather than inventing facts.

Save the plan to '.copilot-tracking/plans/' using the approved output
roots for human review. Do not create or update tracker items.
```

1. (Optional) If you are targeting GitHub Issues, ask Backlog Manager to coordinate the workflow and have GitHub Backlog Executor create the first parent issue and child issues for the initial MVP. The **Backlog Manager** should also ensure the resulting issue links and summary are recorded under `.copilot-tracking/github-issues/` for traceability.

   Enable writing of GitHub issues:

   * Authenticate GitHub CLI
     * Run: gh auth login --web
     * Or, if needed: gh auth refresh -h github.com -s repo
   * Verify authentication
     * Run: gh auth status
   * Confirm the target repository
     * Run: gh repo set-default [your git clone url]/hve-partner-workshop
   * Create GitHub Issues the backlog creation from a session that exposes GitHub write tools
     * If you are using Copilot or an agent workflow, make sure the session has access to the GitHub MCP write tools.
     * Refer to using [Using the GitHub MCP server from Copilot Chat](https://docs.github.com/en/copilot/how-tos/copilot-on-github/copilot-for-github-tasks/using-the-github-mcp-server-from-copilot-chat)
     * Refer to [Using the GitHub MCP server in your IDE](https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide/use-the-github-mcp-server)

   Select **Backlog Manager**  to create feature backlog,

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
2. (Optional) **GitHub Backlog** (`.copilot-tracking/github-issues/`): A backlog of features, stories, or tasks for translating business outcome to trackable work items, linked to the implementation plan.

## Technical track

### Objective

Frame the solution approach, architecture, and publication considerations aligned to the implementation plan.

### Steps

1. Review the requirements under `.copilot-tracking/brd-sessions/`,`copilot-tracking/prd-sessions/`, the experience draft under `.copilot-tracking/dt/`, and the implementation plan at `.copilot-tracking/plans/`.
2. Identify the core services, data sources, and integration points that support the phased plan.
3. Select **System Architecture Reviewer** to help frame a simple solution approach, major tradeoffs, and architecture notes that align to each phase of the plan:

   * Note deployment, security, and operational considerations.
   * Review the draft for well-architected design and Cloud Adoption Framework guidance.
   * Capture the publication requirements for Microsoft Marketplace and Microsoft 365 Copilot Agent Store readiness, including packaging, discoverability, supportability, and integration expectations.

   ```text
   Find the latest workshop session context and its related implementation
   plan, requirements, and experience draft.
   If the session or relevant artifacts are missing or ambiguous, ask me to
   identify them. Read the use case, evidence boundary, and approved output
   roots from the session context.

   Create architecture notes aligned to the implementation plan. For each
   phase, describe the solution approach, major tradeoffs, cloud architecture,
   and relevant Well-Architected concerns. Address Microsoft Marketplace and
   Microsoft 365 Copilot Agent Store publication needs, including packaging,
   discoverability, supportability, and integration expectations. Assess
   whether Microsoft IQ has relevant implications; state assumptions and open
   questions rather than inventing requirements.

   Save the architecture design plan at [.copilot-tracking/details/] using an
   approved output root from the session context and link it from the 
   architecture notes for human review.
   ```
4. Use **Security Planner** to review readiness and surface follow-up work aligned to each phase.

   ```text
   "Review this solution draft for security risks, deployment considerations,
   and follow-up actions needed for each phase in the implementation plan. Link any
   security-related work back to the appropriate phase."
   ```
5. Create a simple Mermaid architecture diagram by selecting **Arch Diagram Builder**,

   ```text
   Find the latest workshop session context and its related implementation plan,
   requirements, experience draft, and architecture notes. If the context or source artifacts are missing or ambiguous, ask me to identify them.

   Create a Mermaid architecture diagram from the confirmed design. Show the
   users, components, data sources, integrations, and key data flows. Reflect
   trust boundaries where they are documented. Do not invent components or
   relationships; label unresolved details as assumptions.

   Save the diagram at [.copilot-tracking/details/] using an approved output root from the session context and link it from the architecture notes for human review.
   ```
6. Review the mermaid diagram and use natural language to refine it.
7. (Optional) Instead of GitHub Copilot, use **Microsoft 365 Copilot** to create an image. In M365 Copilot, attach the implementation plan, and create an architecture image from the mermaid diagram for this solution using Azure and Copilot-style icons to represent core services, data sources, user experience layers, and integrations for the first MVP.

   ```text
   "Create an architecture image from the Mermaid diagram for this solution
   using Azure and Copilot-style icons to represent core services, data sources, user
   experience layers, and integrations for the first MVP."
   ```
   Save or reference the reviewed image under `.copilot-tracking/details/`.

8. Capture only the publication assumptions needed for the solution review in the architecture notes and link them to the implementation plan.

   * Select SaaS or Azure Managed Application as the preferred Marketplace model and the Microsoft 365 agent as a potential companion experience.
   * Managed Application: State what the components deploys, what the agent presents to users, and where each product boundary begins and ends.
   * Summarize the API, identity, permission, and data contract between the two products.
   * Record architecture constraints that affect solution, including data residency, tenant isolation, customer-controlled infrastructure, and least-privilege access.
   * List unresolved publication assumptions with an owner. Do not resolve commercial or submission details during the role exercise.

   Select **RPI Agent** and use this prompt:

   ```text
   Find the latest workshop session context and its related implementation
   plan, requirements, experience draft, and architecture notes. If the session or relevant artifacts are missing or ambiguous, ask me to identify them. Read the use case, evidence boundary, and approved output roots from the session context.

   Update the architecture notes with only the publication assumptions needed
   for the solution review. Record a provisional Marketplace model and the
   Microsoft 365 agent as a potential companion experience. Define product
   boundaries and summarize the API, identity, permission, and data contracts.
   Capture relevant architecture constraints, unresolved assumptions and
   decisions, and owners. Link the notes to the implementation plan.

   Defer detailed publication planning, offer validation, pricing,
   monetization, Partner Center configuration, package preparation,
   certification, and rollout to the Partner Workshop Publishing Follow-Up.
   Save the updated notes [`.copilot-tracking/details/`] the approved output roots and mark them for human review.
   ```

   Complete the detailed readiness assessment during the [Partner Workshop Publishing Follow-Up](partner-workshop-publishing).

9. Share the output with the rest of the team.

### Deliverable

1. **Architecture Notes** (`.copilot-tracking/details/`): Architecture design notes aligned to each phase of the implementation plan, including risks, tradeoffs, integration requirements, and the minimal publication assumptions needed by the solution review.
2. Publication planning input: The provisional product split, integration boundary, architecture constraints, and open decisions recorded within the architecture notes for the publishing workshop.

### Data Scientist Track

#### Objective

Create an initial synthetic dataset and data science notebook that map to the
shared use case, business rules, and measurable outcome. Run this exercise
alongside architecture design within the Technical track.

Use the [Data Scientist Guide](../hve-guide/roles/data-scientist)
as the pattern: confirm the catalog job first, then confirm the analysis job.
Keep customer, regulated, confidential, and production data in its approved
system. Synthetic workshop results do not demonstrate business value or
production model performance.

#### Steps

1. Agree with the SME and PM on one outcome and the decision the analysis must
   support. Use the latest session context, lean canvas, and requirements
   rather than adopting the sales or API examples from the starter guide.
2. Select **Data Science and Engineering Coach**, confirm the catalog job,
   and use the first prompt. Review the proposed entities, relationships,
   fields, business rules, and mapping to the use case before generating data.
3. Confirm the transition to the analysis job and use the second prompt.
   Approve the synthetic dataset size, assumptions, and output locations.
   Create the dataset and notebook, then run the notebook when the required
   environment is available.
4. Review data quality checks, visualizations, and outcome metrics with the
   SME. Confirm that normal, boundary, and failure cases reflect the scenario.
   Distinguish deliberately generated patterns from evidence about real users.
5. Share the outputs with the technical lead and PM. Record missing real-data
   evidence, privacy and responsible AI concerns, owners, and follow-up work
   for the architecture and implementation plan.

Select **Data Science and Engineering Coach** and confirm the catalog job:

```text
Find the latest workshop session context, lean canvas, relevant requirements,
and approved evidence. If the session or inputs are missing or ambiguous,
ask me to identify them. Read the use case, evidence boundary, and output
roots from that context. Confirm the project and deliverable locations.

Catalog the data needed for one measurable outcome from this use case.
Map each entity and field to a requirement, business rule, or outcome metric.
Capture relationships, types, units, valid ranges, sensitivity, and quality
rules. Identify any required labels or ground truth and their limitations.

Propose an initial synthetic dataset with a small, configurable row count,
normal cases, boundary cases, and deliberately invalid records for quality
checks. Label unsupported rules and distributions as workshop assumptions.
Do not copy or derive records from restricted source data.

Save the catalog and dataset profile in the confirmed location for human
review. Wait for my approval before changing jobs or generating the dataset.
```

Select **Data Science and Engineering Coach**, confirm the analysis job, and
use the reviewed catalog from the previous step:

```text
Use the latest confirmed workshop context and reviewed catalog for this
session. If either is missing or ambiguous, ask me to identify it.
Confirm the synthetic dataset size, generation assumptions, and approved
locations for the dataset, generation code, and analysis notebook.

Create an initial synthetic CSV dataset that follows the catalog and maps to
the selected use case. Use a fixed random seed and fictional identifiers.
Include the approved normal, boundary, and invalid cases. Clearly label the
data as synthetic and document how to regenerate it.

Create a data analysis notebook using that dataset. Include the use-case
question, requirement-to-field mapping, data loading, schema and quality
checks, missing values, duplicates, and business-rule violations. Preserve
the original dataset and show how invalid records are handled.

Analyze the selected outcome with relevant summaries, segment comparisons,
and visualizations. Calculate the agreed metrics and include a simple
baseline where appropriate. Explain which patterns were generated by design.
Do not treat synthetic labels or results as evidence of real-world accuracy,
fairness, demand, or business impact.

Run the notebook from start to finish when the approved environment is
available. Report execution status and unresolved errors; do not claim
unexecuted cells passed. Save outputs with reproduction instructions and
limitations for human review. Identify the real data and validation needed
next. Do not train models, deploy resources, or change jobs without approval.
```

#### Data scientist handoff

Share the reviewed catalog and dataset profile, synthetic dataset, generation
code, and analysis notebook with the technical lead and PM. Include their
confirmed locations, execution status, outcome metrics, assumptions, and
limitations. Link the outputs to the requirements and implementation plan.
Record real-data validation tasks and owners before making feasibility or
production-readiness claims.

### More HVE Roles

The technical track primarily supports full-stack engineering. For specialist roles such as SRE and Security, refer to the [HVE Guide role guides](../hve-guide/roles/) for role-specific capabilities, starter prompts, and collaboration patterns.

## Working session reminder

Keep the output concise and action-oriented. Do not wait for perfect
information. The goal is to produce a reviewed draft that the team can refine after the workshop.

Proceed to the [solution guide](partner-workshop-solution.md).

---

<!-- markdownlint-disable MD036 -->
*🤖 Crafted with precision by ✨Copilot following brilliant human instruction,
then carefully refined by our team of discerning human reviewers.*
<!-- markdownlint-enable MD036 -->
