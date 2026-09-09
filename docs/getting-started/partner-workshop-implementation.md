---
title: Start implementing from workshop outputs
description: Turn workshop research, decisions, and backlog outputs into engineering execution using RPI agents
author: Microsoft
ms.date: 2026-09-08
ms.topic: tutorial
keywords:
  - workshop
  - implementation
  - rpi workflow
  - research plan implement review
  - new project
  - existing project
estimated_reading_time: 6
sidebar_position: 5
---

With your workshop outputs, the next step is to move those outputs into implementation with the RPI workflow so engineering work stays evidence-based, traceable, and reviewable.

Use this guide when the workshop has produced product goals, architecture direction, risks, backlog items, decisions, or design artifacts. The goal is to convert workshop output into a concrete engineering slice that can be implemented and validated without losing the original intent.

## Workshop Agenda

| Step | Activity                                                                                    | Time   |
|------|---------------------------------------------------------------------------------------------|--------|
| 1    | [Workshop Overview](partner-workshop.md)                                                    | 30 min |
| 2    | [Set up Codespaces or local VS Code](partner-workshop-setup.md)                             | 30 min |
| 3    | [Plan, Envision, Experience, Architecture Design, Backlog](partner-workshop-role-tracks.md) | 90 min |
| 4    | [Validation & Solution](partner-workshop-solution.md)                                       | 30 min |
| 5    | [Microsoft Marketplace and Copilot Agent Store readiness](partner-workshop-publishing.md)   | 60 min |
| 6    | [**Handoff to Implementation & Commercialization**](partner-workshop-implementation.md)     | 30 min |

## The Execution Pattern

A workshop is usually the source of context, not the actual implementation boundary. The implementation loop should start by translating the workshop outputs into a clear engineering task, then use the RPI lifecycle to execute that task with verification.

The practical sequence is:

1. Confirm the workshop outputs and identify the actual engineering scope.
2. Treat the workshop as evidence, not as a substitute for current code or environment investigation.
3. Use `/rpi-research` only for demonstrated gaps.
4. Use `/rpi-plan` to convert the workshop outputs into a milestone-level implementation plan.
5. Use `/rpi-implement` to execute the approved work.
6. Use `/rpi-review` to validate the final result and route any follow-up work.

> [!TIP]
> If you want one entry point instead of direct phase prompts, start with `/rpi` or `RPI Agent`. If you want a smaller, more focused action, use a direct phase command like `/rpi-plan`.

## Marketplace implementation handoff

When Marketplace publication is in scope, start from the canonical plan created
by the Microsoft Marketplace Coach. Its default location is
`.copilot-tracking/plans/YYYY-MM-DD/marketplace-implementation-plan.md`, where
`YYYY-MM-DD` is the date of the planning session.

Proceed only when its readiness decision is `Ready to implement` and the
accountable human owners have approved the handoff. Give `/rpi-plan` the file
path and ask it to select the approved first implementation slice, preserve the
recorded dependencies and deferred scope, and turn the acceptance evidence into
validation tasks. If the decision is `Not ready`, return to the
[publication planning workshop](partner-workshop-publishing) instead of starting
implementation.

Do not copy the full handoff into a second document. The Marketplace Coach owns
its structure; RPI plans reference it as source evidence and record only the
implementation detail needed for the selected milestone.

## When to Use `/rpi-plan`

Use `/rpi-plan` when you have:

* Research completed or evidence gathered: `/rpi-research` results, workshop outputs, or existing codebase knowledge that answers "what problem are we solving?" and "what constraints apply?"
* Clear scope for the next milestone: You know which feature, service, or capability is in scope and what success looks like
* A need to convert goals into actionable tasks: You have business or product direction but need an engineering plan that names files, services, phases, and validation steps
* Existing codebase or project structure: You're working in a repo with patterns, tests, build tools, and deployment infrastructure you want the plan to reference
* A decision gate before implementation: You want to review and approve a plan before starting code changes

Do NOT use `/rpi-plan` if:

* You have not yet gathered research or evidence about what needs to be built
* The scope is completely undefined or the goals are still being debated
* You just want to brainstorm architecture without committing to a plan
* You're looking for general design guidance (use a design-thinking or architecture agent instead)

What `/rpi-plan` produces:

* A milestone-level implementation roadmap tied to your actual codebase
* Named files, services, modules, and dependencies that will change
* Phases and checkpoints so progress is measurable
* Validation steps and review criteria so you know when the milestone is done
* Out-of-scope list so expectations are clear

Next steps after `/rpi-plan`:

* Review the plan and approve it (or ask for revisions)
* Share it with the team so everyone agrees on the milestone boundaries
* Use the approved plan as input to `/rpi-implement`
* Reference the plan during `/rpi-review` to verify implementation matched intent

## When to Use `/rpi-review`

Use `/rpi-review` when you have:

* Implementation complete or at a milestone boundary: Code is written, tested, deployed, or ready for acceptance review
* An approved plan to compare against: You have a concrete implementation plan, milestone criteria, or acceptance definition from `/rpi-plan` or workshop output
* A need to verify intent was honored: You want to check that the implementation satisfies the original goals, constraints, and design decisions
* Changes that may have diverged from the plan: You discovered new requirements, took shortcuts, or made architectural adjustments during implementation that need to be captured
* A gate before moving to the next milestone: You want independent verification before declaring success and planning follow-up work

Do NOT use `/rpi-review` if:

* Implementation has not started or is not ready for review
* You have no plan or criteria to review against (use `/rpi-plan` first)
* You're looking for live code review during development (use code-review agents or `/rpi-implement` instead)
* You want to brainstorm improvements instead of verify delivery (use design-thinking or architecture agents instead)
* The milestone scope is still undefined or acceptance criteria are still being debated

What `/rpi-review` produces:

* A structured assessment comparing implementation to the original workshop intent and milestone plan
* Documented gaps, deviations, and risks with severity and evidence
* Validation evidence: which acceptance criteria were met, which may need follow-up, and what is ready for the next milestone
* A clear list of completed work, deferred features, and follow-up decisions
* Routes for follow-up: backlog items for remaining work, ADRs for deviations, or research needs if new constraints emerged

Next steps after `/rpi-review`:

* Approve the milestone if all acceptance criteria are met (or ask for specific fixes)
* Document any deviations as architecture decisions (ADRs) if they represent significant changes from the plan
* Route any deferred work into the backlog with clear priority and dependency information
* Use the review evidence as the starting point for the next milestone plan
* If significant gaps remain, loop back to `/rpi-implement` or `/rpi-plan` before declaring the milestone complete

## What part of the HVE repo to import

In addition to the workshop materials, bring over the minimum HVE adoption package that helps engineers actually execute the work in the target repository.

### Full HVE adoption package paths

When the team is carrying the HVE setup into a new repo, the full repo-level adoption package lives under the `.github` folder and includes these paths:

* `.github/copilot-instructions.md`
* `.github/CUSTOM-AGENTS.md`
* `.github/plugin.json`
* `.github/labels.yml`
* `.github/PULL_REQUEST_TEMPLATE.md`
* `.github/actions/`
* `.github/agents/`
* `.github/config/`
* `.github/hooks/`
* `.github/instructions/`
* `.github/ISSUE_TEMPLATE/`
* `.github/plugin/`
* `.github/policies/`
* `.github/prompts/`
* `.github/skills/`
* `.github/workflows/`

For the minimum viable adoption set, prioritize the workflow, agent, instruction, prompt, skill, and hook configuration under `.github/agents`, `.github/instructions`, `.github/prompts`, `.github/skills`, `.github/hooks`, and `.github/workflows`.

## Scenario 1: New project

Use this path when the team is creating a project from scratch based on workshop results or an early solution concept.

For a brand-new repo, the workshop is not the codebase yet. It is the source of truth for the product outcome, constraints, architecture direction, and first milestone. The engineering team’s job is to turn that workshop package into a working repo and then apply RPI so the implementation remains evidence-based from day one.

### Step-by-step

1. Create the project foundation
   * Initialize the repo and establish the basic folder structure.
   * Decide the application type, language, runtime, and CI workflow early.
   * Set up the minimum developer workflow: repo, branch policy, build tool, test runner, and environment configuration.
   * Keep this light at first; do not invent a large architecture before you know the first milestone.

2. Copy the workshop package into the repo
   * Store the workshop summary in a durable project artifact such as a design or requirements folder.
   * Capture the agreed goals, non-goals, constraints, key decisions, dependencies, and acceptance criteria.
   * Include any architecture diagrams, sketches, backlog items, and design references that explain the intended outcome.
   * Keep the workshop evidence in a clearly named document so future engineers can find it without rereading the full deck.

3. Add the HVE adoption package if the team is using this workflow in the repo
   * Bring over the minimal HVE setup used to run the RPI lifecycle in the project, especially the agent, prompt, and instruction configuration under `.github`.
   * Add the guidance needed for engineers to use `/rpi-research`, `/rpi-plan`, `/rpi-implement`, and `/rpi-review` consistently.
   * Include the onboarding docs that explain how the workflow works for the team.

4. Define the first milestone in plain language
   * Make the first milestone small enough to finish and review quickly.
   * Choose a slice such as a baseline app skeleton, service bootstrap, core workflow, API shell, or first user journey.
   * Write the milestone outcome as: “When this milestone is complete, we can demonstrate X and validate Y.”
   * Explicitly list what is out of scope for this first delivery.

5. Run `/rpi-research` before implementation starts
   * Use the workshop summary and repo setup as input.
   * Ask the agent to identify the technical gaps, architectural choices, dependency risks, and validation paths.
   * Check whether the workshop assumptions are still valid for the chosen stack and repo structure.
   * Example:

```text
/rpi-research I am starting a new project from workshop outputs. Please review the workshop goals, constraints, architecture direction, and the current repo setup, then identify the technical gaps, dependency risks, and key implementation decisions before I start coding.
```

* This phase is for evidence gathering. It should answer: what do we know, what is still uncertain, and what technical choices need validation?

1. Run `/rpi-plan` for the greenfield repo
   * Convert the workshop brief into a milestone-based implementation plan.
   * Include phases such as repo setup, infrastructure or runtime bootstrapping, the first feature slice, validation, and review.
   * Name the likely files, services, modules, and dependencies involved.
   * Add expected validation steps, testing gates, and deployment or run checks.
   * Example:

```text
/rpi-plan Create an implementation plan for the first milestone of this new project using the workshop outputs and the repo setup. Keep the scope narrow, define clear phases, list the likely components and dependencies, and include validation steps and a review gate.
```

1. Start implementation with `/rpi-implement`
   * Execute the approved milestone in small increments.
   * Build the project skeleton, configuration, and first user-visible or service-visible behavior before expanding to broader functionality.
   * Keep implementation tied to the workshop decisions.
   * If a new decision is required, capture it and return to planning before broadening scope.
   * Example:

```text
/rpi-implement Execute the approved first milestone from the plan. Scaffold the repo, set up the required runtime and configuration, deliver the first functional slice, and validate the minimum working behavior.
```

1. Validate and review with `/rpi-review`
   * Compare the implementation to the workshop intent and the plan.
   * Check whether the first milestone satisfies the acceptance criteria and whether any risk remains open.
   * Capture leftover work, deferred features, or follow-up decisions.
   * Example:

```text
/rpi-review Review the milestone implementation against the workshop requirements, the approved plan, and the repo setup. Identify any gaps, risks, or remaining follow-up work before the milestone is considered complete.
```

1. Prepare the next milestone based on the same evidence pack
   * Use the first milestone as a foundation, not a final state.
   * Keep the workshop summary and the repo artifacts together so the next team members can understand why the project was built this way.
   * Each iteration should have a clear objective, acceptance criteria, and review evidence.

### Prompt flow for a new project

```text
/rpi-research I am starting a new project from workshop outputs. Review the workshop goals, constraints, architecture direction, and repo setup, then identify missing technical evidence, dependency risks, and implementation decisions before coding.

/rpi-plan Create an implementation plan for the first milestone of this new project using the workshop results and the repo setup. Keep the scope narrow and define validation criteria.

/rpi-implement Execute the approved plan for the first milestone, scaffold the repo, and deliver the minimum working slice with validation evidence.

/rpi-review Review the implementation against the original workshop intent and the milestone criteria. Identify any remaining gaps or follow-up work.
```

### Checklist for new projects

Before starting implementation, confirm the following:

* The workshop outputs are captured in a durable project artifact
* The first milestone is identified and truly small enough to finish
* The repo structure and technology baseline are in place
* The HVE workflow setup is available in the repo if the team is using it
* Technical assumptions have been checked with `/rpi-research`
* The plan includes validation and a review gate

### Common mistakes for new projects

* Starting to code before capturing the workshop decisions in the repo
* Building the full roadmap instead of the first milestone
* Ignoring research gaps because the team is excited to start coding
* Skipping review because the project is “new” and feels early-stage
* Treating workshop output as final architecture without verifying repo decisions

## Scenario 2: Existing project

Use this path when the team is integrating workshop recommendations into an already running codebase, product, or service.

This is the most common scenario for engineering teams. In a live repo, the workshop outputs are not the code itself; they are the decision context that helps you choose the correct implementation path. Your job is to copy the useful workshop content into the repo workflow and then let the project’s existing code and architecture drive the implementation.

### Step-by-step

1. Open the current repository and confirm the target scope
   * Open the repo root in VS Code.
   * Confirm the exact feature, service, or workflow the workshop is targeting.
   * Make sure everyone agrees on what is in scope and what is not.
   * If the workshop covered multiple themes, pick the first engineering milestone instead of trying to implement everything at once.

2. Decide what to copy from the workshop
   * Copy the parts that are still useful to engineering, not the entire meeting transcript.
   * Keep the items that answer: what are we trying to build, what are the constraints, what are the risks, and what counts as success?
   * Treat the workshop as contextual evidence, not as an instruction to rewrite the repo.

3. What to copy over from a workshop into an existing repo
   * Business outcome or user problem
   * Goals and non-goals
   * Key product or technical requirements
   * Architecture decisions and design direction
   * Dependencies and external systems
   * Security, privacy, or compliance requirements
   * Risks, assumptions, and unresolved questions
   * Acceptance criteria and definition of done
   * Backlog items or work items that are already agreed
   * Screens, flows, diagrams, or reference artifacts that explain the desired behavior

4. Create a small implementation brief before calling the agents
   * Write a single paragraph describing the target outcome.
   * Mention the repo path or service name you are changing.
   * List the top constraints and the key acceptance criteria.
   * State the first milestone clearly.

5. Run `/rpi-research` in the existing repo
   * Use the feature or service name and include the copied workshop summary.
   * Ask the agent to compare the workshop direction to the actual repo structure and current implementation patterns.
   * Example:

```text
/rpi-research I am working in this existing repository. The workshop outputs say the goal is to add X, with constraints Y and Z. Please compare these workshop outputs to the current codebase, identify the relevant files and services, and tell me what implementation gaps or risks exist before coding begins.
```

* What to expect: the agent reviews the repo, identifies current patterns, checks existing architecture, and points out missing evidence or risky assumptions.
* This stage is not implementation. It is evidence gathering so the plan is based on reality.

1. Run `/rpi-plan` using the repo and workshop evidence
   * Ask for a milestone plan tied to the actual codebase.
   * Tell the agent which service, folder, or feature is in scope.
   * Ask it to reference the repo files it found in the research step.
   * Example:

```text
/rpi-plan Using the workshop outputs and the current repository evidence, create an implementation plan for the first milestone of this change. Keep the scope narrow, name the likely files and services involved, call out dependencies, and include validation steps that match this repo's existing patterns.
```

* The plan should define:
  * objective
  * in-scope work
  * out-of-scope work
  * affected files or services
  * dependencies
  * validation approach
  * review gate

1. Run `/rpi-implement` only after the plan is acceptable
   * Use the approved plan and the exact scope from the plan.
   * Keep implementation focused on the current feature slice.
   * Example:

```text
/rpi-implement Execute the approved first milestone from the plan. Work only in the identified service, update the necessary files, and validate the affected behavior with the repo’s existing quality gates and tests.
```

* If the project has strong conventions, ask the agent to follow them.
* If the repo has tests, build steps, linting, or deployment commands, include them in the validation ask.

1. Run `/rpi-review` when the implementation is ready
   * Ask the agent to compare the final code to the workshop intent and the plan.
   * Make sure it checks whether the change delivered the promised outcome and whether any risks remain.
   * Example:

```text
/rpi-review Review the implementation against the workshop requirements, the approved plan, and the repository's current code patterns. Identify any gaps, risks, or follow-up work needed before marking this milestone complete.
```

1. Capture the final work in a small follow-up list
   * Record anything left for a later milestone.
   * Keep the unresolved items explicit instead of silently skipping them.
   * Do not allow workshop assumptions to remain hidden inside code review.

### Templates for GitHub Copilot

```text
I am working in an existing repo. Here are the workshop outputs:

- Goal:
- Constraints:
- Key decisions:
- Acceptance criteria:
- Risks:
- Relevant services or files:

Please do the following in order:
1. /rpi-research: compare the workshop outputs to the current repo and identify implementation gaps, risks, and relevant files.
2. /rpi-plan: create a narrow first-milestone plan based on the repo and the workshop evidence.
3. /rpi-implement: execute the approved milestone and validate the changes with the repo's existing methods.
4. /rpi-review: validate that the implementation matches the workshop intent and identify any remaining follow-up work.
```

### Example prompt flow for an existing project

```text
/rpi-research Compare the workshop outputs to the current repository and identify the implementation gaps, service touchpoints, and technical constraints for this feature.

/rpi-plan Create a milestone plan for integrating the workshop recommendations into the current project without broad scope changes. Keep the plan tied to the actual files and workflows used in this repo.

/rpi-implement Execute the approved plan for the targeted change and validate the impacted workflows using the repository's existing build or test approaches.

/rpi-review Review the implemented change against the workshop intent, acceptance criteria, and existing repository constraints.
```

### Checklist

Before asking the agents to implement, fill in this checklist:

* What is the product outcome we want?
* What is the exact scope of the first milestone?
* Which repo areas are involved?
* What decisions from the workshop are already confirmed?
* Which assumptions still need validation?
* What would make this milestone successful?
* What is out of scope for now?

If you can answer these questions, the repo implementation phase is much more likely to succeed.

### Common mistakes

* Starting code changes before comparing the workshop to the current repo
* Trying to implement the entire roadmap in one pass
* Skipping `/rpi-research` when the workshop assumptions are not yet confirmed
* Using `/rpi-implement` without a plan or review gate

## Scenario 3: Workshop in one repository, implementation in another

Use this path when the team runs the workshop in a shared or workshop repository, exports the artifacts, and then implements in their own engineering repository.

This scenario is common when:

* The workshop is facilitated in a shared HVE Partner Workshop repo or a customer-managed workshop space
* The team wants to keep workshop context separate from implementation code
* Multiple teams are using the same workshop repo and each needs their own implementation space
* You want workshop artifacts to be read-only reference during implementation

### Step-by-step

1. Complete the workshop and confirm all artifacts are ready
   * Verify that the `.copilot-tracking/` directories contain complete research, PRD, plans, and backlog items
   * Check that all design artifacts, ADRs, and architecture diagrams are finalized
   * Ensure the backlog is prioritized and acceptance criteria are clear
   * Example artifacts to confirm:
     * `.copilot-tracking/research/`: research findings and evidence
   * `.copilot-tracking/prd-sessions/`: approved requirements PRD
     * `.copilot-tracking/plans/`: implementation plan and phase details
     * `.copilot-tracking/dt/`: design thinking outputs and user journeys
     * `docs/planning/adrs/`: architecture decision records
     * `.copilot-tracking/github-issues/`: prioritized backlog

2. Reference workshop artifacts from your implementation repository
   * Clone or create your implementation repository (e.g., your existing solutions repo)
   * Keep the workshop repository or approved artifact store as the source of truth; do not create a second copied workshop tree
   * Record stable links or approved paths to the following production artifact roots:

   ```text
    workshop-repo/
       .copilot-tracking/research/
       .copilot-tracking/prd-sessions/
       .copilot-tracking/plans/
       .copilot-tracking/details/
       .copilot-tracking/dt/
       .copilot-tracking/github-issues/
       docs/planning/adrs/
   ```

   * Keep the original production folder structure so references are predictable
   * Do not copy CI/CD workflows or repo-specific tooling from the workshop repo

3. Create an implementation context document
   * At the root of your repo, create `WORKSHOP_CONTEXT.md` or similar
   * Link to all imported workshop artifacts
   * Summarize the key outcomes, constraints, and non-goals
   * List the first-milestone acceptance criteria
   * Document any assumptions that need validation in your repo environment
   * Example structure:

   ```markdown
   # Workshop Context and Implementation Plan

   ## Workshop Outcomes
   [Link to: .copilot-tracking/prd-sessions/]

   ## Architecture Decisions
   [Link to: docs/planning/adrs/ and .copilot-tracking/details/]

   ## First Milestone
   [Description and acceptance criteria]

   ## Key Assumptions to Validate
   - [assumption 1]
   - [assumption 2]

   ## Backlog
   [Link to: .copilot-tracking/github-issues/ or GitHub issues]
   ```

4. Run `/rpi-research` to validate workshop assumptions in your repo
   * Open your implementation repo in VS Code
   * Reference the workshop artifacts and ask the agent to assess them against your actual codebase
   * Example prompt:

   ```text
   /rpi-research I am working in an existing repository that received workshop artifacts. 
   Please review the workshop requirements [link to WORKSHOP_CONTEXT.md] and the current 
   codebase to identify:
   1. Whether the workshop assumptions are valid in our environment
   2. What technical choices or dependencies need to be adjusted
   3. What implementation gaps or risks exist before we start coding
   4. Which files or services will need to change
   ```

   * What to expect: the agent compares workshop intent to your actual repo, flags environment differences, and confirms the implementation baseline

5. Run `/rpi-plan` using the workshop artifacts as input
   * Ask the agent to create a milestone plan based on the workshop and your repo structure
   * Reference both the workshop requirements and your codebase
   * Example prompt:

   ```text
   /rpi-plan Create an implementation plan for the first milestone of this project using:
   - Workshop requirements: [link to .copilot-tracking/prd-sessions/]
   - Current repository structure and patterns
   - Architecture decisions: [link to ADRs]
   
   The plan should be tied to the actual files and services in this repo, include validation 
   steps using our existing test and build infrastructure, and include a review gate before 
   moving to the next milestone.
   ```

   * The plan becomes your implementation roadmap in your repo

6. Run `/rpi-implement` to execute the approved milestone
   * Reference the approved plan and the workshop artifacts as context
   * Work only within your repo; do not modify the workshop repo
   * Example prompt:

   ```text
   /rpi-implement Execute the approved first milestone from the plan. 
   Follow the implementation sequence defined in the plan, update only the identified 
   files and services, validate using the repository's existing build, test, and 
   deployment methods, and confirm the changes meet the workshop acceptance criteria 
   from [link to requirements].
   ```

   * Implementation happens entirely in your repo with full access to your codebase, tests, CI/CD, and deployment infrastructure

7. Run `/rpi-review` when the implementation is ready
   * Compare the result to both the workshop intent and your repo's patterns
   * Confirm that implementation choices align with the approved plan
   * Example prompt:

   ```text
   /rpi-review Review the milestone implementation against:
   1. The workshop requirements: [link to .copilot-tracking/prd-sessions/]
   2. The approved implementation plan
   3. The repository's code patterns and quality gates
   
   Identify any gaps, risks, or follow-up work needed before this milestone is considered complete.
   ```

### Prompt flow for workshop-in-one-repo, implementation-in-another

```text
/rpi-research Validate workshop assumptions [link to WORKSHOP_CONTEXT.md] against our actual codebase and identify technical gaps or environment adjustments needed.

/rpi-plan Create a milestone plan using the workshop requirements [link] and our repository structure. Keep it narrow and include validation steps.

/rpi-implement Execute the approved plan in our repository, following our existing patterns and quality gates.

/rpi-review Review the implementation against the workshop intent [link to .copilot-tracking/prd-sessions/], the plan, and our code patterns. Identify remaining work.
```

### Checklist for artifact handoff

Before starting implementation, confirm:

* All workshop artifacts are copied to your repo under a stable, documented location
* A `WORKSHOP_CONTEXT.md` or equivalent exists and links to all artifacts
* The first milestone is clearly defined in the workshop requirements
* The implementation repository is open and ready
* You have confirmed who will run the implementation steps (person or team)
* Any environment-specific setup (credentials, accounts, infrastructure) is ready
* Your team understands which workshop decisions are final versus open for revision

### Common mistakes when moving artifacts across repos

* Not copying the full artifact set (missing research, ADRs, or design artifacts)
* Losing context by not creating a clear WORKSHOP_CONTEXT.md or artifact index
* Skipping `/rpi-research` because "the workshop already validated everything"
* Treating workshop output as a checklist rather than as contextual evidence
* Forgetting to validate workshop assumptions in your actual environment before coding
* Running `/rpi-implement` without an approved `/rpi-plan` from the new repo
* Editing workshop artifacts during implementation instead of keeping them read-only reference

### What to do if workshop assumptions change during implementation

If your team discovers that a workshop assumption is no longer valid in your actual environment:

1. Do not silently adjust the code to work around the mismatch
2. Document the assumption that changed and why
3. Record the change in your `.copilot-tracking/changes/` directory or a similar artifact
4. Return to `/rpi-plan` to adjust the implementation approach
5. Update `WORKSHOP_CONTEXT.md` to reflect the discovery
6. Move forward with the revised plan

This keeps the implementation honest and helps future team members understand why the code is the way it is.

## Integrating with Microsoft/CAIRA and reusing CAF accelerators

When the workshop is part of a customer engagement, a Microsoft-facing solution review, or a broader cloud adoption effort, use the workshop outputs as the implementation input to Microsoft/CAIRA and the Cloud Adoption Framework (CAF) program instead of treating them as a stand-alone design artifact.

The pattern is:

1. Use the workshop outputs as the business, user, and solution context.
2. Map that context to the relevant CAF domains and Microsoft adoption motions.
3. Reuse accelerators only where they reduce uncertainty or create a repeatable pattern.
4. Bring the accelerator decisions back into the engineering execution plan.
5. Keep the RPI workflow as the delivery engine for code, tests, and review evidence.

### Use CAIRA as the adoption context, not as a replacement for engineering work

CAIRA and similar Microsoft readiness processes are valuable when they help the team answer the questions that matter before implementation starts:

* What business outcome are we trying to achieve?
* What are the target users, data, and compliance boundaries?
* What is the first tangible milestone worth delivering?
* Which decisions are already confirmed versus still uncertain?
* What would make the solution ready for broader rollout or production adoption?

Use the workshop outputs to answer those questions in a structured way, then convert them into a milestone plan and engineering backlog. This keeps the project grounded in the customer context while still respecting the repo's actual implementation constraints.

### Reuse CAF accelerators selectively

CAF accelerators are most helpful when they provide a proven starting pattern rather than a broad template. Reuse them in the areas where the workshop identifies risk or unknowns:

* landing zone and environment governance
* identity, access, and policy guardrails
* security and privacy baseline patterns
* cost optimization and scalable architecture decisions
* application modernization or migration readiness
* operational readiness, observability, and supportability

The goal is not to copy a generic framework wholesale. The goal is to select the specific accelerator patterns that help the team move from workshop intent to a working engineering path.

### Practical workflow for a partner team

Use this sequence when the project includes Microsoft/CAIRA or CAF alignment:

1. Review the workshop outputs and confirm the desired customer outcome.
2. Identify the top technical, adoption, and governance decisions that still need a pattern.
3. Match each decision to the relevant CAF domain or Microsoft accelerator path.
4. Capture the selected decisions in the project brief, architecture notes, or implementation plan.
5. Run `/rpi-research`, `/rpi-plan`, `/rpi-implement`, and `/rpi-review` in the repo to execute the agreed milestone.
6. Revisit the CAF and CAIRA considerations only when the technical implementation requires a change in scope, platform choice, or adoption model.

### Example mapping

| Workshop decision                              | CAF or Microsoft adoption lens                  | Engineering action                               |
|------------------------------------------------|-------------------------------------------------|--------------------------------------------------|
| Need a secure environment baseline             | landing zone and governance patterns            | set repo and environment guardrails early        |
| Need clear ownership and deployment separation | operating model and responsibility mapping      | define roles, environments, and review gates     |
| Need a reliable modernization path             | app or platform modernization guidance          | plan a phased implementation and validation gate |
| Need cost and performance discipline           | Well-Architected and cost optimization guidance | size the first milestone conservatively          |
| Need enterprise-grade adoption readiness       | CAIRA readiness review                          | capture rollout, support, and adoption criteria  |

### What to bring into the repo

When you integrate with Microsoft/CAIRA or CAF, capture the selected decisions in the project artifacts that engineers can actually use:

* the business and user outcome
* the target milestone and first deliverable
* the environment and platform assumptions
* the security, governance, and compliance guardrails
* the deployment and support model
* the open risks and the follow-up work that remains after the milestone

This is the bridge between enterprise adoption guidance and day-to-day engineering execution.

## What to use when the workshop outputs are incomplete

If workshop outputs are still vague, incomplete, or contradictory, do not jump straight into code. Treat that as a planning issue, not an implementation issue.

Use a smaller RPI cycle first:

1. Research the missing facts.
2. Plan the next milestone.
3. Implement only the confirmed slice.
4. Review the result and capture open questions.

This keeps the work honest and prevents the implementation loop from hiding uncertainty behind “reasonable” code.

## Recommended resources

* [Getting Started Overview](README.md)
* [Your First Full Workflow](first-workflow.md)
* [Understanding the RPI Workflow](../rpi/README.md)
* [Why the RPI Workflow Works](../rpi/why-rpi.md)
* [Using RPI Together](../rpi/using-together.md)
* [Engineer Guide](../hve-guide/roles/engineer.md)
* [Stage 6: Implementation](../hve-guide/lifecycle/implementation.md)
* [DT to RPI Integration](../design-thinking/dt-rpi-integration.md) if your workshop used a Design Thinking handoff

## Common next actions

* Start a new implementation slice with `/rpi` or `RPI Agent`.
* Reuse the workshop artifact as the evidence source for the first plan.
* Keep the first milestone small, reviewable, and aligned to the original outcomes.
* Route follow-up items instead of letting unresolved decisions block the work.

---

<!-- markdownlint-disable MD036 -->
*🤖 Crafted with precision by ✨Copilot following brilliant human instruction,
then carefully refined by our team of discerning human reviewers.*
<!-- markdownlint-enable MD036 -->
