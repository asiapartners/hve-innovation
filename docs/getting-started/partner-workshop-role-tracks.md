---
title: Partner Workshop Role Guide
description: Structured role-based guide for the HVE partner workshop
sidebar_position: 9
author: Microsoft
ms.date: 2026-09-08
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

## Workshop flow

1. Review the shared scenario and workshop context.
2. Choose a role track and complete its guided steps.
3. Share your artifact with the rest of the team.
4. After the role tracks, proceed first to the [Partner Workshop solution](partner-workshop-solution.md) guide to integrate the outputs, then continue to the [Partner Workshop Publishing Follow-Up](partner-workshop-publishing.md) guide for publication readiness.

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
* **`/rpi-research`** for gathering, testing, and synthesizing evidence before the SME creates the shared context pack. It writes a research artifact under `.copilot-tracking/research/`; reference that artifact from the context pack saved under `.copilot-tracking/research/`.
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

Across all roles, design for publication of your solution to Microsoft Marketplace and Microsoft 365 Copilot Agent Store. Publishing solutions to the Microsoft Marketplace is one of the fastest ways to scale reach, simplify customer procurement, earn rewards, incentives and GTM benefits, and create recurring revenue opportunities.

Keep your outputs clear enough to support packaging, discovery, and review in both destinations.

## Subject Matter Expert track

### Objective

Capture the business truth before anyone designs or builds anything.

### Steps

1. Read the session-context artifact before selecting an agent. Treat its topic, session name, evidence root, and production output roots as authoritative shared context. Do not redefine the topic in downstream prompts.
1. For your selected use case, gather available evidence such as policy documents, SOPs, process diagrams, notes, document references, PDFs, screenshots, and images.
1. For workshop-only evidence, keep synthetic or public source files in a manually managed `workshop-input/` folder, organized by type such as `policies/`, `sops/`, and `process-diagrams/`. Keep original diagram files beside rendered images.
1. For an actual production case, do not copy customer, regulated, confidential, or production evidence into the repository. Keep it in an approved system such as a governed SharePoint or OneDrive library, Azure Blob Storage or ADLS with controlled access, an approved document-management system, or a secure data room. Confirm classification, retention, and access permissions, then provide `/rpi-research` with a trusted readable path or controlled links.
1. Run `/rpi-research` on the scenario and available evidence:

   ```text
   /rpi-research session-context=.copilot-tracking/research/[date]/[session-name]-session-context.md. Read the topic and evidence root from the session context. Research the supplied scenario, policies, process notes, and supporting materials. Identify evidence-backed business facts, affected users, business rules, constraints, known failure cases, AI guardrails, open questions, and credible alternatives or counter-evidence. Save the dated primary research artifact under `.copilot-tracking/research/`. Keep the scope to context discovery.
   ```

   For a production case using a locally synced, access-controlled OneDrive folder, provide the trusted evidence root explicitly:

   ```text
   /rpi-research session-context=.copilot-tracking/research/[date]/[session-name]-session-context.md. Read the topic and OneDrive evidence root from the session context. Research the policies, SOPs, process diagrams, notes, PDFs, and screenshots in that folder. Identify evidence-backed business facts, affected users, business rules, constraints, known failure cases, AI guardrails, open questions, and credible alternatives or counter-evidence. Save the dated primary research artifact under `.copilot-tracking/research/`. Do not copy source files into the repository; cite the source filename and controlled location in the research artifact.
   ```

   Use a OneDrive folder that is governed by the organization's permissions, retention, and classification policies. Do not use a public sharing link or a personal OneDrive folder for production evidence.

1. Review the generated research artifact at `.copilot-tracking/research/`. This is your permanent evidence trail.
1. Extract and record key findings in a context document: problem statement, affected users, business impact, business rules, known failure cases, and AI guardrails. Reference the research artifact for traceability.
1. Separate facts from assumptions, decisions, and open questions. Link or reference the supporting material when available.
1. If you need structure, ask **BRD Builder** or **PRD Builder** to draft a business or product requirements outline. Start by sharing your notes and ask it to create a problem statement, business goals, scope, assumptions, and acceptance criteria.

   Use **BRD Builder** when the team needs to establish the business case, stakeholders, outcomes, constraints, and decision context:

   ```text
   Select the /BRD Builder agent. Session context: .copilot-tracking/research/[date]/[session-name]-session-context.md. Read the topic from the session context, then use its evidence references and research artifact. Draft a concise business requirements outline covering the business problem, affected stakeholders, measurable business outcomes, scope, non-goals, business rules, constraints, risks, assumptions, dependencies, and unresolved questions. Save the BRD draft and its session state under `.copilot-tracking/brd-sessions/`. Separate evidence-backed facts from assumptions and proposed decisions. Do not invent customer facts, policy requirements, metrics, or implementation commitments. Mark the document as a draft for human review and include testable acceptance criteria where they clarify the business outcome.
   ```

   Use **PRD Builder** when the team needs product behavior, user needs, functional requirements, non-functional requirements, and acceptance criteria:

   ```text
   Select the /PRD Builder agent. Session context: .copilot-tracking/research/[date]/[session-name]-session-context.md. Read the topic from the session context, then use its research artifact and business requirements references. Draft a concise product requirements outline covering target users, jobs to be done, user journeys, in-scope and out-of-scope behavior, functional requirements, non-functional requirements, data and AI guardrails, known failure cases, accessibility needs, success metrics, dependencies, and testable acceptance criteria. Save the PRD draft and its session state under `.copilot-tracking/prd-sessions/`. Preserve citations or references to the supporting evidence. Separate facts from assumptions, decisions, and open questions. Do not invent customer data, policy requirements, or unsupported technical details. Mark the document as a draft for human review.
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
9. If you need a first draft, ask **UX UI Designer** to turn the problem into a simple user journey and experience outline.
   Select the context pack under `.copilot-tracking/research/` and use this prompt in GitHub Copilot Chat:

```text
"Turn these notes into a simple user journey, experience outline, and key pain points for this scenario. Save the reviewed experience draft under `.copilot-tracking/dt/`."
```

1. If the team needs a guided conversation, ask **Design Thinking Coach** to help frame the opportunity and challenge assumptions.

```text
"Coach me through a short design thinking session for this scenario. Help me frame the problem, identify user needs, and define a focused opportunity area for the solution."
```

1. If the team needs learning support or a clearer next step, ask **Design Thinking Learning Tutor** to explain the method and help transform notes into a simple design artifact.

```text
"Act as a Design Thinking Learning Tutor. Explain the next design thinking step for this scenario and help me turn my notes into an insight, opportunity statement, or user journey outline."
```

1. Use Accessibility Planner and Accessibility Reviewer to surface accessibility requirements and review the draft for gaps.
   Select the experience draft under `.copilot-tracking/dt/` and prompt Accessibility Planner:

```text
"Review the experience draft under `.copilot-tracking/dt/` and identify accessibility requirements, user needs, follow-up questions for implementation, and updates to the draft."
```

1. Use RAI Planner and RAI Reviewer to capture responsible AI requirements, guardrails, and review findings.
   Select the experience draft under `.copilot-tracking/dt/` and use the **RAI Planner** prompt:

```text
"Review the experience draft under `.copilot-tracking/dt/` and identify responsible AI requirements, potential harms, mitigation ideas, and updates to the draft."
```

1. If your team uses Figma, include links or references to Figma files, wireframes, and design artifacts in the experience draft. Use Figma outputs as evidence for user flows, screens, and design decisions, and note how those artifacts support the workshop handoff.
2. Identify and validate the use case for publishing to Microsoft 365 Copilot Agent Store.
   Select the experience draft under `.copilot-tracking/dt/` and prompt UX UI Designer:

```text
"How would end users benefit from Microsoft 365 Copilot integrated to this scenario? What research would I need to run to validate it? Update the experience draft under `.copilot-tracking/dt/`."
```

1. Note how the experience should be packaged, discoverable, and reviewable for Microsoft Marketplace and Microsoft 365 Copilot Agent Store.
2. Define success criteria and unresolved questions.
3. Save the reviewed results under `.copilot-tracking/dt/` as the experience draft.

### Deliverable

`.copilot-tracking/dt/`: A user experience draft that captures the user path, pain points, and design constraints.

## Project Management track

### Objective

Turn business context and user experience into requirements, priorities, and a backlog draft with an implementation plan.

### Steps

1. Review the context pack in `.copilot-tracking/research/`, `.copilot-tracking/prd-sessions/`, `.copilot-tracking/brd-sessions/`, and `.copilot-tracking/dt/`. Align them to business outcomes, measurable success metrics, functional and non-functional requirements, user stories, acceptance criteria, out-of-scope items, and open assumptions.
2. Run `/rpi-plan` to turn the requirements and context into an implementation plan with phases and phase details:

   ```text
   /rpi-plan context=[shared scenario]. Requirements: [paste key requirements]. Design: [paste key design decisions]. Create a lightweight implementation plan with phases for the first MVP, including phase objectives, deliverables, and acceptance criteria. Ensure the plan is aligned to publication readiness for Microsoft Marketplace and Microsoft 365 Copilot Agent Store.
   ```

   This writes to `.copilot-tracking/plans/` and creates a durable record that links to your requirements and design context.

3. Review the generated plan at `.copilot-tracking/plans/` and refine phase details as needed.
4. Create a backlog outline only if it helps the team move from requirements to implementation. If needed, use a lightweight hierarchy such as epic, feature, story, and task for the first MVP.
5. Prioritize the first MVP with simple labels such as P0, P1, and P2 only if the team needs a sequencing signal. Keep this lightweight and outcome-focused rather than turning it into a rigid Agile process.
6. Prepare the requirements and backlog artifacts for publication readiness in Microsoft Marketplace and Microsoft 365 Copilot Agent Store.
   Select the context, requirements, experience and prompt Functional Planner:

```text
"Review the requirements under `.copilot-tracking/prd-sessions/`, the context pack under `.copilot-tracking/research/`, and the experience draft under `.copilot-tracking/dt/`. Create or refine a more implementation-ready first-slice backlog plan under `.copilot-tracking/github-issues/` with clear epics, features, stories, and tasks. Then prioritize the first slice with simple labels such as P0, P1, and P2 only if they help sequence the work. Also assess publication readiness for Microsoft Marketplace and Microsoft 365 Copilot Agent Store. Keep the output concise, outcome-focused, and useful for backlog refinement."
```

1. If you are targeting GitHub Issues, ask Backlog Manager to coordinate the workflow and have GitHub Backlog Executor create the first parent issue and child issues for the initial MVP. The Backlog Manager should also ensure the resulting issue links and summary are recorded under `.copilot-tracking/github-issues/` for traceability.

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

   Prompt:

```text
"Review the approved requirements under `.copilot-tracking/prd-sessions/` and the backlog outline under `.copilot-tracking/github-issues/`. Confirm the target GitHub repository, create the first parent issue and child issues for this initial MVP, and record the issue links and summary under `.copilot-tracking/github-issues/` for traceability. Use labels such as P0, P1, P2, epic, feature, story, and task only if they help the workflow. Update the backlog plan and create the backlog in GitHub Issues."
```

1. Review the issue list for traceability from business outcome to requirement to backlog item, then save the final backlog summary and issue links under `.copilot-tracking/github-issues/`.

### Deliverable

1. **Implementation Plan** (`.copilot-tracking/plans/`): A phased implementation plan with objectives, deliverables, and acceptance criteria for each phase.
2. **GitHub Backlog** (`.copilot-tracking/github-issues/`): A backlog of features, stories, or tasks for translating business outcome to trackable work items, linked to the implementation plan.

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
   * Create a simple Mermaid architecture diagram for the proposed solution.

   ```text
   "Review the implementation plan at `.copilot-tracking/plans/`, the requirements under `.copilot-tracking/prd-sessions/`, and the experience draft under `.copilot-tracking/dt/`. Create architecture notes under `.copilot-tracking/details/` covering a simple solution approach for each phase, major tradeoffs, cloud architecture, well-architected concerns, publication requirements, Microsoft IQ, and a Mermaid architecture diagram. Link the architecture notes back to the phases in the implementation plan."
   ```

4. Use **Security Planner** to review readiness and surface follow-up work aligned to each phase.

   ```text
   "Review this solution draft for security risks, deployment considerations, and follow-up actions needed for each phase in the implementation plan. Link any security-related work back to the appropriate phase."
   ```

5. Review the mermaid diagram and use natural language to refine it.
6. (Optional) Instead of GitHub Copilot, use **Microsoft 365 Copilot** to create an image. In M365 Copilot, attach the implementation plan, and create an architecture image from the mermaid diagram for this solution using Azure and Copilot-style icons to represent core services, data sources, user experience layers, and integrations for the first MVP.

   ```text
   "Create an architecture image from the Mermaid diagram for this solution using Azure and Copilot-style icons to represent core services, data sources, user experience layers, and integrations for the first MVP. Save or reference the reviewed image under `.copilot-tracking/details/` and show how it supports the phased implementation plan at `.copilot-tracking/plans/`."
   ```

7. Capture only the publication assumptions needed for the solution review in the architecture notes and link them to the implementation plan.

   * Record Azure Managed Application as the preferred Marketplace model and the Microsoft 365 agent as a potential companion experience.
   * State what the Managed Application deploys, what the agent presents to users, and where each product boundary begins and ends.
   * Summarize the API, identity, permission, and data contract between the two products.
   * Record architecture constraints that affect solutioning, including data residency, tenant isolation, customer-controlled infrastructure, and least-privilege access.
   * List unresolved publication assumptions with an owner. Do not resolve commercial or submission details during the role exercise.

   ```text
   "Review the implementation plan at `.copilot-tracking/plans/`, the requirements under `.copilot-tracking/prd-sessions/`, the experience draft under `.copilot-tracking/dt/`, and the architecture notes under `.copilot-tracking/details/`. Update the architecture notes with only the publication assumptions needed for the solution review. Record Azure Managed Application as the preferred Marketplace model and the Microsoft 365 agent as a potential companion experience. Define the product boundaries and summarize the API, identity, permission, and data contract between them. Capture only architecture constraints, assumptions, unresolved decisions, and owners needed for solutioning. Link these inputs to the implementation plan. Defer the canonical Marketplace implementation plan, offer validation, pricing, monetization, Partner Center configuration, package preparation, certification, and rollout planning to the Partner Workshop Publishing Follow-Up."
   ```

   Complete the detailed readiness assessment during the [Partner Workshop Publishing Follow-Up](partner-workshop-publishing).

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
