---
title: Partner Workshop solution
description: Integrate role outputs into a shared solution pack, backlog, architecture view, and publication-readiness plan
sidebar_position: 10
author: Microsoft
ms.date: 2026-11-11
ms.topic: tutorial
keywords:
  - workshop solution
  - backlog
  - requirements traceability
  - Azure diagram
  - publication readiness
estimated_reading_time: 8
---

## Workshop Agenda

| Step | Activity                                                       | Time   |
|------|----------------------------------------------------------------|--------|
| 1    | [Meet the FSI client](partner-workshop.md)                     | 30 min |
| 2    | [Prepare the FSI case](partner-workshop-setup.md)              | 30 min |
| 3    | [Design the briefing](partner-workshop-role-tracks.md)         | 90 min |
| 4    | [**Challenge the briefing**](partner-workshop-solution.md)     | 30 min |
| 5    | [Plan both launch paths](partner-workshop-publishing.md)       | 60 min |
| 6    | [Hand off the first slice](partner-workshop-implementation.md) | 30 min |

Bring the Client A research, PRD, plan, experience, architecture, and Markdown
backlog together. This stage checks whether every role has designed the same
read-only briefing, including what happens when evidence is missing or access
is denied. It is a tabletop review, not proof that the product already works.

## Objective

Create one shared briefing solution draft. The manager should see the two cited
practice facts, an explicit transaction-history unknown, and a proposed next
action that has not been executed.

## Suggested solution flow

1. Ask each role to summarize its artifact in two minutes.
2. Type `@` in the prompt box to add the production artifacts under `.copilot-tracking/research/`, `.copilot-tracking/prd-sessions/`, `.copilot-tracking/dt/`, `.copilot-tracking/plans/`, `.copilot-tracking/details/`, and `.copilot-tracking/github-issues/` to the session.
3. Compare terminology across the files and resolve contradictions.
4. Use the SME context pack as the source of truth for domain terms and business rules.
5. Confirm that each user story identifies a user, need, and outcome.
6. Confirm that each acceptance criterion is observable and testable.
7. Confirm that each architecture component maps to at least one requirement.
8. Confirm that high-risk requirements and important decisions map to backlog items.
9. Confirm that the experience captures uncertainty, feedback, access failures, and human escalation.
10. Record unresolved publication inputs in the architecture notes for the publishing workshop.

## Traceability review

Each role has two minutes to show how its artifact handles Client A. Choose
**RPI Agent**, then attach the shared session context and the actual role
artifacts with `@`. Use the real requirement and backlog IDs, not a second set
invented for this review.

```text
/rpi-plan
Read the attached relationship-manager-fsi context and role artifacts as one
Client A briefing solution pack. Trace the authorized briefing, practice
citations, missing transaction evidence, denied Client B request, and human
review of next actions through requirements, experience, architecture, backlog,
proposed acceptance checks, and publication gates.
Use existing IDs and paths. Save the matrix under .copilot-tracking/details/
and report contradictions, missing links, unsupported claims, and unowned risks.
Separate tabletop checks from tests that have actually run. Keep publication
questions in the existing architecture notes for the two coaches.
Do not implement or publish anything.
```

Then complete these steps:

1. Capture the matrix draft under `.copilot-tracking/details/`.
2. Assign an owner to each gap.
3. Fix gaps that can be resolved from workshop evidence.
4. Record remaining publication gaps in the architecture notes with an owner.
5. Mark generated content as draft until a responsible human reviews it.

The next stage gives these inputs to the publishing coaches. Link each coach's
actual canonical plan path rather than creating a competing readiness record.
Do not create a separate publication-readiness artifact during solution review.

## Project Manager: GitHub Issues

The default walkthrough leaves a reviewed **Markdown backlog**. Choose
**Backlog Manager**, attach the Client A backlog and traceability matrix, and
request a dry run:

```text
Read the attached FSI briefing backlog and traceability matrix. Review whether
the first slice covers authorized facts, citations, missing evidence, and
denied access. Identify blockers and duplicates in the proposed hierarchy.
Prepare a dry-run handoff under .copilot-tracking/github-issues/ with owners,
review status, and acceptance criteria. Leave target repository or external IDs
unconfirmed when not supplied.
Do not create or update GitHub issues, or mark human-review checkboxes complete.
```

Record the target system, owner, state, and external ID fields for later import.
If the facilitator separately approves issue creation, first confirm the target
repository, permissions, labels, milestone, and hierarchy, and complete the
human-review gate. Then review the created items under **Issues** in the app.
Missing write access does not prevent completion of this stage.

## Engineer: Review the architecture

Rehearse these three cases against the experience and conceptual Mermaid
diagram. Use only the fictional fixtures from stage 3:

| Case                         | Expected walkthrough behavior                                                                                       |
|------------------------------|---------------------------------------------------------------------------------------------------------------------|
| Authorized Client A briefing | Renewal discussion cites CRM-01; onboarding request cites MAIL-01; next action stays a draft for human review       |
| Missing transaction history  | Response says Unknown or insufficient evidence; it does not invent a trend, balance, risk score, or growth forecast |
| Denied Client B request      | Service denies access before retrieval; no account content appears in the answer, citations, or diagnostic output   |

These are expected behaviors for review, not a record of passed implementation
tests. Ask the designer to show what the manager sees and the technical lead to
show where the corresponding control is enforced.

1. Type `@` to add the architecture notes under `.copilot-tracking/details/`, then ask Copilot to show the Mermaid diagram. The app renders Mermaid diagrams in the conversation.
2. Follow the primary user request from Microsoft 365 Copilot to the Azure API, retrieval layer, model, and response path.
3. Follow the content ingestion and update path separately.
4. Identify where authorization is enforced.
5. Identify where secrets and keys are stored.
6. Identify where prompts, retrieved content, responses, and feedback could be logged.
7. Confirm telemetry does not collect secrets or unnecessary personal data.
8. Add failure paths for model, search, identity, and dependency outages.
9. Add a cost owner and an operational owner.
10. Mark the diagram as conceptual until infrastructure source and deployment validation exist.

Hand off the reviewed matrix, the three highest unresolved risks, their owners,
and the architecture's publication questions. A citation in a mockup is not
proof that retrieval or authorization has been implemented.

## Ten-minute team discussion

1. The PM presents the outcome, requirements, and first release scope.
2. The SME presents key constraints and unresolved domain questions.
3. The designer presents the primary journey and human review points.
4. The technical lead presents the architecture view and publication routes.
5. The team names its three highest risks.
6. The facilitator confirms owners and the next review date.

Proceed to the [publishing guide](partner-workshop-publishing.md).

---

<!-- markdownlint-disable MD036 -->
*🤖 Crafted with precision by ✨Copilot following brilliant human instruction,
then carefully refined by our team of discerning human reviewers.*
<!-- markdownlint-enable MD036 -->
