---
title: Implement and review workshop outcomes
description: Move completed workshop artifacts into a working repository, implement the first approved slice, and review the result with HVE Core
author: Microsoft
ms.date: 2026-09-13
ms.topic: tutorial
keywords:
  - workshop
  - implementation
  - review
  - rpi workflow
  - new project
  - existing project
estimated_reading_time: 7
sidebar_position: 5
---

Use this guide to move the approved research and plan, and handoff into the implementation repository, deliver one incremental scope, and review
the result against the original evidence.

## Workshop Agenda

| Step | Activity                                                                                    | Time   |
|------|---------------------------------------------------------------------------------------------|--------|
| 1    | [Workshop Overview](partner-workshop.md)                                                    | 30 min |
| 2    | [Set up Codespaces or local VS Code](partner-workshop-setup.md)                             | 30 min |
| 3    | [Plan, Envision, Experience, Architecture Design, Backlog](partner-workshop-role-tracks.md) | 90 min |
| 4    | [Validation & Solution](partner-workshop-solution.md)                                       | 30 min |
| 5    | [Microsoft Marketplace and Copilot Agent Store readiness](partner-workshop-publishing.md)   | 60 min |
| 6    | [**Handoff to Implementation & Commercialization**](partner-workshop-implementation.md)     | 30 min |

## From Workshop to Solution Implementation

The simplest setup is to install the HVE Core VS Code extension for the target project repository for implementation. It manages the HVE agents.
RPI Agent and the `/rpi`, `/rpi-research`, `/rpi-plan`, `/rpi-implement`, and
`/rpi-review`. In addition copy .copilot-tracking to your target project repository to preserve context, and .github files from this repo for Microsoft Partner specific custom agents and skills.

Follow [Installing HVE Core](install.md) to choose one of these options:

| Situation | Recommended setup |
|---|---|
| Most teams using VS Code | Install the HVE Core VS Code extension |
| Teams using Copilot CLI | Install the `hve-core` plugin |
| Teams that must own and customize the artifacts | Use selective clone adoption |

Do not copy the entire HVE repository into the product
repository unless the team intends to maintain those files.

After installation:

1. Open the implementation repository in VS Code.
2. Open GitHub Copilot Chat.
3. Select **RPI Agent**, or use the direct phase commands.

Initial research and planning are already complete, use the /rpi-implement and /rpi-review in the next phase.

## Step 1A: Start a New Project

Use this path when the workshop output will become a new application or service.

1. Create the repository and open its root in VS Code.
2. Copy the Hypervelocity Innovation Github Agents and Skills: .github/* to your repository.
3. Install or enable HVE Core (see [Installing HVE Core](install.md)). 
4. Review, update and approve workshop outputs,

   * Copy only the reviewed artifacts into the new repository under a matching
     `.copilot-tracking/` folder (preserve the same relative subpaths):
     * `.copilot-tracking/research/{{YYYY-MM-DD}}/*-research.md`
     * `.copilot-tracking/brd-sessions/*.md`
     * `.copilot-tracking/prd-sessions/*.md` and `*.state.json`
     * `.copilot-tracking/dt/**/experience-draft.md`
     * `.copilot-tracking/plans/{{YYYY-MM-DD}}/*-plan.md`
     * `.copilot-tracking/github-issues/prds/**/issues-plan.md` and `handoff.md`
     * `.copilot-tracking/details/{{YYYY-MM-DD}}/*-implementation-plan.md`
       (Marketplace and Agent Store readiness, if applicable)

   * Do not copy `.copilot-tracking/sandbox/`, `.copilot-tracking/challenges/`, or any
     unreviewed working files; only reviewed, approved artifacts belong in the
     handoff.

5. Confirm research and plan readiness before implementation starts. Close any gap before continuing to the next step. Do not start `/rpi-implement` while the plan or
   PRD records a `Blocked` or `Not ready` status.
6. If the plan is still conceptual, run `/rpi-plan` once to adapt it to the new
   repository. Do not repeat product discovery.
7. Project Manager to facilitate approval of the first implementation task. 
   * A named accountable owner (product, tech lead, or delivery owner) reviews
     the plan's first P0 task against step 5's readiness checks.
   * The owner confirms in writing (a comment, a checked box in the plan, or a
     note in `planning-log.md` or the backlog item) that the task is approved
     to implement, including the date and approver's name.
   * If the plan or PRD has an unchecked human-review checkbox that covers this
     task, the reviewer named there must check it before approval; an agent
     must never check it on their behalf.
   * Do not treat "the plan looks complete" as approval. Approval requires an
     explicit human decision, even when every checklist row in step 5 is ready.
8. Run `/rpi-implement`.

Use this prompt:

```text
/rpi-implement Use the approved implementation plan and implement
only the first approved P0 task in this new repository. Create the minimum
project structure required by the plan, follow the repository instructions, and
use the planned acceptance criteria and existing validation commands. Record
implementation evidence under .copilot-tracking/changes/. Do not implement
deferred work or publication activities.
```

The first implementation should produce a runnable, testable scope of work. It should not scaffold the entire future architecture.

## Step 1B: Continue in an Existing Project

Use this path when the workshop adds a capability to an existing product.

1. Open the current repository in VS Code.
2. Copy the Hypervelocity Innovation Github Agents and Skills: .github/* to your repository.
3. Install or enable HVE Core (see [Installing HVE Core](install.md)). 
4. Review, Update and approve workshop outputs.

   * Copy only the reviewed artifacts into the new repository under a matching
     `.copilot-tracking/` folder (preserve the same relative subpaths):
     * `.copilot-tracking/research/{{YYYY-MM-DD}}/*-research.md`
     * `.copilot-tracking/brd-sessions/*.md`
     * `.copilot-tracking/prd-sessions/*.md` and `*.state.json`
     * `.copilot-tracking/dt/**/experience-draft.md`
     * `.copilot-tracking/plans/{{YYYY-MM-DD}}/*-plan.md`
     * `.copilot-tracking/github-issues/prds/**/issues-plan.md` and `handoff.md`
     * `.copilot-tracking/details/{{YYYY-MM-DD}}/*-implementation-plan.md`
       (Marketplace and Agent Store readiness, if applicable)

   * Do not copy `.copilot-tracking/sandbox/`, `.copilot-tracking/challenges/`, or any
     unreviewed working files; only reviewed, approved artifacts belong in the
     handoff.
5. Compare the plan with the current repository:
   * reuse existing modules and patterns
   * preserve compatible behavior
   * identify dependencies and integration boundaries
   * keep unrelated code out of scope
6. If the plan does not map to the current code, run `/rpi-plan` to revise only
   that mapping.
7. Confirm research and plan readiness before implementation starts. Close any gap before continuing to the next step. Do not start `/rpi-implement` while the plan or
   PRD records a `Blocked` or `Not ready` status.
9. Approve the first implementation task using the same approval process in
   [Step 1A, item 7](#step-1a-start-a-new-project): a named accountable owner
   confirms in writing, and any required human-review checkbox is checked by
   its named reviewer, not by an agent.
10. Run `/rpi-implement`.

Use this prompt:

```text
/rpi-implement Use the approved implementation plan and implement
only the first approved P0 task in this repository. Reuse existing components,
follow current code and test conventions, and limit changes to the planned
behavior. Run the smallest existing validation commands that cover the change
and record implementation evidence under .copilot-tracking/changes/.Do not implement
deferred work or publication activities.
```

Do not replace working architecture merely because the workshop proposed a
different pattern. Record material differences and return to `/rpi-plan` when
they change scope, requirements, or dependencies.

## Step 2: Implement One Task

During implementation:

1. Follow the approved plan in dependency order.
2. Work on one backlog story or plan task at a time.
3. Keep requirements and acceptance criteria visible.
4. Add or update tests with the behavior.
5. Run the smallest existing validation command that covers each change.
6. Record deviations, discoveries, and validation results in the implementation
   changes record.
7. Stop and return to planning if a discovery changes scope, architecture,
   security, privacy, responsible AI, or user behavior.

The implementation phase may make local engineering decisions supported by the
plan and repository. It must not invent missing business rules, permissions,
success targets, or publication claims.

## Step 3: Review the Result

Run `/rpi-review` after the implementation and its validations are complete.

Use this prompt:

```text
/rpi-review Review the completed implementation against:

* the approved implementation plan
* the PRD and its acceptance criteria
* the implementation changes record
* the repository's existing conventions and validation results

Confirm whether the first milestone delivers the intended user outcome. Identify
functional gaps, regressions, security or privacy concerns, accessibility gaps,
unsupported deviations, and follow-up work. Do not treat Marketplace, Agent Store,
or production readiness as complete without their separate evidence and human
approval.
```

The review should answer:

* Did the implementation satisfy every in-scope acceptance criterion?
* Did it preserve permission and data boundaries?
* Are citations, uncertainty, failures, and human decisions represented
  correctly?
* Do tests and validation results support the completion claim?
* Did implementation deviate from the plan?
* Which findings block completion?
* Which items belong in a later milestone?

If review finds a blocking defect, return to `/rpi-implement` with the specific
finding. Run `/rpi-review` again only after the fixes and relevant validations
are complete.

## Step 4: Close the Milestone

When review passes:

1. Confirm that implementation and review evidence are stored with the project.
2. Update the backlog item with the completed acceptance evidence.
3. Move deferred work into explicit follow-up items.
4. Ask a human reviewer to approve the pull request or milestone.
5. Merge through the repository's normal review process.
6. Start the next milestone with the remaining approved backlog.

Do not mark a human-review checkbox complete on behalf of a reviewer.

## Step 5: Reassess Publication Readiness

Marketplace and Agent Store readiness are separate from MVP completion.

After the MVP review:

1. Update the Marketplace and Agent Store readiness artifacts with the validated
   product behavior.
2. Verify current Microsoft guidance rather than relying on workshop-era notes.
3. Verify Partner Center and tenant state in their authoritative systems.
4. Complete package, identity, routing, lifecycle, security, privacy,
   accessibility, support, and removal tests.
5. Keep publisher-controlled readiness separate from certification,
   publication, and co-sell status.
6. Submit or publish only after accountable owners approve the relevant gates.

Use this prompt to reassess readiness against the validated MVP:

```text
Review the Marketplace and Agent Store readiness artifacts under
.copilot-tracking/details/ against the implemented and reviewed MVP evidence
under .copilot-tracking/changes/. Identify which readiness gates (Product,
Technical, Partner Center, Governance, Companion Agent) are still open, verify
current Microsoft guidance for anything version-sensitive, and list the
accountable owner and next action for each open gate. Do not mark any gate
ready without supporting evidence, and do not submit or publish anything.
```

See [Microsoft Marketplace and Copilot Agent Store readiness](partner-workshop-publishing.md)
for the publication workflow.

## Expected Outcome

Upon completing the MVP implementation, testing, and readiness validation, the team achieves the following outcomes:

* The MVP is fully implemented, tested, and validated against PRD acceptance criteria.
* Implementation changes and review evidence are documented to satisfy quality and governance gates.
* Partner Center configuration, technical offer details, and pricing models are verified.
* The solution is submitted, certified, and published on Microsoft Marketplace for commercialization.
* Follow-up work items are identified for post-launch iterations and co-sell enablement.

The workshop artifacts provide the initial evidence trail, while the implementation repository and Partner Center drive ongoing engineering and commercialization.

### Congratulations on your Solution Launch!
