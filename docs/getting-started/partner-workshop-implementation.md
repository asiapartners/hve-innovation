---
title: Implement and review workshop outcomes
description: Move completed workshop artifacts into a working repository, implement the first approved slice, and review the result with HVE Core
author: Microsoft
ms.date: 2026-11-11
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

Finish the Client A walkthrough by preparing one buildable briefing slice and
its review contract. The 30-minute stage is a handoff, not a requirement to build,
deploy, or publish the full product. The later reference sections describe the
separately approved implementation follow-up.

## Workshop Agenda

| Step | Activity                                                           | Time   |
|------|--------------------------------------------------------------------|--------|
| 1    | [Meet the FSI client](partner-workshop.md)                         | 30 min |
| 2    | [Prepare the FSI case](partner-workshop-setup.md)                  | 30 min |
| 3    | [Design the briefing](partner-workshop-role-tracks.md)             | 90 min |
| 4    | [Challenge the briefing](partner-workshop-solution.md)             | 30 min |
| 5    | [Plan both launch paths](partner-workshop-publishing.md)           | 60 min |
| 6    | [**Hand off the first slice**](partner-workshop-implementation.md) | 30 min |

## Walkthrough: hand off the Client A slice

### Package the reviewed FSI context

1. Choose the intended implementation repository. Record whether it is new or
   existing; do not switch projects merely by changing a canvas stage.
2. Inventory the actual paths of the reviewed session context, fixture
   references, research, PRD and state, plan, experience draft, architecture,
   traceability matrix, backlog, two coach plans, and shared monetization plan.
3. Retain the draft and approval status of every artifact. Transfer only the
   reviewed handoff when the destination and file changes are authorized, keeping
   relative paths intact. Carry the fictional fixture section or an explicitly
   reviewed extract with its source and synthetic label so it is still readable
   outside the workshop repository.
4. Add the target repository in the GitHub Copilot app, enable its HVE
   customizations, and use **Current checkout** when you need copied uncommitted
   context. Follow the setup reference below for the chosen repository.

The handoff should let an engineer explain the Client A question, the two
practice records, the missing-data and denied-access cases, and the approvals
still outstanding without repeating discovery.

### Define the first briefing build task

Propose one task: **return a read-only briefing from approved synthetic inputs,
with citations and permission checks**. Use **RPI Agent** in planning mode with
the context and reviewed plan attached:

```text
/rpi-plan
Read the attached FSI context, reviewed briefing plan, PRD, traceability matrix,
and commercial handoffs. Prepare the first Client A implementation task for
human approval. Map it to the intended repository if that repository is available;
otherwise record repository mapping as an open dependency.
Scope one testable slice using the synthetic fixtures: cite CRM-01 and MAIL-01,
mark absent transaction evidence Unknown, deny Client B before retrieval, and
leave next actions as drafts. Exclude live CRM integration, cloud deployment,
paid-term enforcement, and publication.
Record dependencies, acceptance checks, accountable approver, and unresolved
readiness gates in the existing plan. Do not implement, create external work
items, invent approval, or mark human-review checkboxes complete.
```

Check that the task is small enough to run and test independently. Before a
later `/rpi-implement` invocation, a named accountable human must approve this
task in writing with a date, and its designated reviewer must complete every
applicable human-review checkbox. Canvas progress does neither.

### Agree the briefing review evidence

Write the review contract into the task before anyone starts building:

* The authorized Client A case returns only supported statements and their
  correct practice citations.
* Missing transaction history produces an explicit unknown, not invented
  financial information.
* The denied Client B case retrieves and exposes no protected account content.
* Suggested next actions remain drafts; no CRM update, message, or transaction
  occurs.
* Implementation and test evidence will be saved under
  `.copilot-tracking/changes/`, and the later `/rpi-review` result under
  `.copilot-tracking/reviews/`.

Assign a reviewer and follow-up date. If implementation has not happened, mark
these checks **Not run**. After a separately approved implementation and review,
use **Changes** and **Create PR** for human review in the app.

End the workshop with the handoff and open decisions. MVP completion,
Marketplace readiness, Agent Store approval, and commercial approval require
separate evidence; none follows from finishing the walkthrough.

## Implementation follow-up reference

The remaining instructions apply after the relevant people approve the first
task and its destination. They are not additional actions to perform merely
because you reached the final canvas stage.

## From Workshop to Solution Implementation

Continue in the GitHub Copilot app. The `hve-core` plugin provides RPI Agent and
the `/rpi`, `/rpi-research`, `/rpi-plan`, `/rpi-implement`, and `/rpi-review`
skills in the implementation repository. Also copy `.copilot-tracking/` to the
target repository to preserve context, and copy this repository's `.github/`
files for the Microsoft partner custom agents and skills.

Choose one of these setup options:

| Situation                                       | Recommended setup                                                                                        |
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| Most teams using the GitHub Copilot app         | In **Customize**, add the `microsoft/hve-core` plugin marketplace, then install the `hve-core` plugin    |
| Teams that also use Copilot CLI                 | Run `copilot plugin marketplace add microsoft/hve-core`, then `copilot plugin install hve-core@hve-core` |
| Teams that must own and customize the artifacts | Use [selective clone adoption](install.md#selective-clone-adoption)                                      |

Do not copy the entire HVE repository into the product
repository unless the team intends to maintain those files. If you copy this
repository's full `.github/` folder, it already includes the HVE agents and
skills. Turn off the `hve-core` plugin in **Customize** > **Installed** while you
work in that repository so each agent appears once.

After installation:

1. In the sidebar, next to **Sessions**, select **+**, then select **Add GitHub repository** or **Open local folder** to add the implementation repository.
2. Trust the repository if the app shows a trust card, so its repository customizations load.
3. Start a session with **Workspace** set to **Current checkout** so it can read copied files that are not committed, such as `.copilot-tracking/` artifacts.
4. Choose **RPI Agent** in the agent picker, or type `/` to use the phase skills directly.
5. Confirm under **Customize** > **Installed** that the `hve-core` plugin or the copied repository customizations are listed.

Initial research and planning are already complete, so use `/rpi-implement` and
`/rpi-review` in the next phase.

## Step 1A: Start a New Project

Use this path when the workshop output will become a new application or service.

1. Create the repository and add it in the app.
2. Copy the Hypervelocity Innovation GitHub agents and skills (`.github/*`) to your repository.
3. Install or enable HVE Core with one of the [setup options](#from-workshop-to-solution-implementation), then start a new session in the repository's current checkout so the copied agents and skills load.
4. Review, update, and approve workshop outputs.

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
     * `.copilot-tracking/details/{{YYYY-MM-DD}}/solution-monetization-plan.md`
       (the shared commercial record, including pending decisions and approval status, if applicable)

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
use the planned acceptance criteria and existing validation commands. Respect
approved commercial decisions in the linked shared solution monetization plan
where relevant to this task; do not implement proposed terms as approved rules.
Record implementation evidence under .copilot-tracking/changes/. Do not
implement deferred work or publication activities.
```

The first implementation should produce a runnable, testable scope of work. It should not scaffold the entire future architecture.

## Step 1B: Continue in an Existing Project

Use this path when the workshop adds a capability to an existing product.

1. Add the current repository in the app if it is not already listed.
2. Copy the Hypervelocity Innovation GitHub agents and skills (`.github/*`) to your repository.
3. Install or enable HVE Core with one of the [setup options](#from-workshop-to-solution-implementation), then start a new session in the repository's current checkout so the copied agents and skills load.
4. Review, update, and approve workshop outputs.

   * Copy only the reviewed artifacts into the current repository under a matching
     `.copilot-tracking/` folder (preserve the same relative subpaths):
     * `.copilot-tracking/research/{{YYYY-MM-DD}}/*-research.md`
     * `.copilot-tracking/brd-sessions/*.md`
     * `.copilot-tracking/prd-sessions/*.md` and `*.state.json`
     * `.copilot-tracking/dt/**/experience-draft.md`
     * `.copilot-tracking/plans/{{YYYY-MM-DD}}/*-plan.md`
     * `.copilot-tracking/github-issues/prds/**/issues-plan.md` and `handoff.md`
     * `.copilot-tracking/details/{{YYYY-MM-DD}}/*-implementation-plan.md`
       (Marketplace and Agent Store readiness, if applicable)
     * `.copilot-tracking/details/{{YYYY-MM-DD}}/solution-monetization-plan.md`
       (the shared commercial record, including pending decisions and approval status, if applicable)

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
8. Approve the first implementation task using the same approval process in
   [Step 1A, item 7](#step-1a-start-a-new-project): a named accountable owner
   confirms in writing, and any required human-review checkbox is checked by
   its named reviewer, not by an agent.
9. Run `/rpi-implement`.

Use this prompt:

```text
/rpi-implement Use the approved implementation plan and implement
only the first approved P0 task in this repository. Reuse existing components,
follow current code and test conventions, and limit changes to the planned
behavior. Respect approved commercial decisions in the linked shared solution
monetization plan where relevant to this task; do not implement proposed terms
as approved rules. Run the smallest existing validation commands that cover the
change and record implementation evidence under
.copilot-tracking/changes/. Do not implement deferred work or publication
activities.
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
   security, privacy, responsible AI, user behavior, pricing, licensing or
   paid-access rules. Route commercial changes to the Product Manager and update
   the shared monetization plan before implementing dependent behavior.

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
* the shared solution monetization plan's approved commercial decisions,
  where package limits, paid access or billing are in scope
* the implementation changes record
* the repository's existing conventions and validation results

Confirm whether the first milestone delivers the intended user outcome. Identify
functional gaps, regressions, security or privacy concerns, accessibility gaps,
unsupported deviations, and follow-up work. Do not treat Marketplace, Agent
Store, or production readiness as complete without their separate evidence and
human approval.
```

The review should answer:

* Did the implementation satisfy every in-scope acceptance criterion?
* Did it preserve permission and data boundaries?
* Are citations, uncertainty, failures, and human decisions represented
  correctly?
* Do tests and validation results support the completion claim?
* Did implementation deviate from the plan?
* Where commercial behavior is in scope, does it match approved package,
  entitlement and billing decisions without charging twice for included usage
  or support?
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
4. Review the diff in **Changes**, then select **Create PR** to open a pull request.
5. Ask a human reviewer to approve the pull request or milestone.
6. Merge through the repository's normal review process.
7. Start the next milestone with the remaining approved backlog.

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
5. Reconcile measured delivery costs, package limits, entitlements and separate
   customer charges in the shared solution monetization plan. Obtain Product
   Manager, finance and other required reviews before approving prices or
   configuring commercial terms; retain unresolved decisions as open.
6. Keep publisher-controlled readiness separate from certification,
   publication, and co-sell status.
7. Submit or publish only after accountable owners approve the relevant gates.

Use this prompt to reassess readiness against the validated MVP:

```text
Review the Marketplace and Agent Store readiness artifacts under
.copilot-tracking/details/ against the implemented and reviewed MVP evidence
under .copilot-tracking/changes/. Include the shared solution monetization plan
linked from those artifacts; reconcile commercial findings there rather than
creating another price list. Identify which readiness gates (Product,
Technical, Commercial, Partner Center, Governance, Companion Agent) are still
open, verify current Microsoft guidance for anything version-sensitive, and list
the accountable owner and next action for each open gate. Do not mark any gate
ready without supporting evidence, and do not submit or publish anything.
```

See [Microsoft Marketplace and Copilot Agent Store readiness](partner-workshop-publishing.md)
for the publication workflow.

## Expected Outcome

Upon completing the MVP implementation, testing, and readiness validation, the team achieves the following outcomes:

* The MVP is fully implemented, tested, and validated against PRD acceptance criteria.
* Implementation changes and review evidence are documented to satisfy quality and governance gates.
* Partner Center configuration and technical offer details are verified; the shared solution monetization plan records current costs, package and entitlement decisions, proposed or approved prices, and remaining commercial approval gaps.
* The solution advances to submission only after commercial and publishing gates are approved; certification and publication remain subject to external review and approval.
* Follow-up work items are identified for post-launch iterations and co-sell enablement.

The workshop artifacts provide the initial evidence trail, while the implementation repository and Partner Center drive ongoing engineering and commercialization.

### Congratulations on your Solution Launch!
