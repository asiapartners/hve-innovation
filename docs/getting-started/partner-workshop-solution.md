---
title: Partner Workshop solution
description: Integrate role outputs into a shared solution pack, backlog, architecture view, and publication-readiness plan
sidebar_position: 10
author: Microsoft
ms.date: 2026-09-08
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

| Step | Activity                                                                                    | Time   |
|------|---------------------------------------------------------------------------------------------|--------|
| 1    | [Workshop Overview](partner-workshop.md)                                                    | 30 min |
| 2    | [Set up Codespaces or local VS Code](partner-workshop-setup.md)                             | 30 min |
| 3    | [Plan, Envision, Experience, Architecture Design, Backlog](partner-workshop-role-tracks.md) | 90 min |
| 4    | [**Validation & Solution**](partner-workshop-solution.md)                                   | 30 min |
| 5    | [Microsoft Marketplace and Copilot Agent Store readiness](partner-workshop-publishing.md)   | 60 min |
| 6    | [Handoff to Implementation & Commercialization](partner-workshop-implementation.md)         | 30 min |

Use this guide during the solution portion of the workshop. Participants should bring their role outputs together, check for gaps and traceability, and leave with a reviewed handoff that can be refined after the session.

## Objective

Create one shared solution draft that connects business context, requirements, experience, backlog, architecture, and publication readiness into a coherent story.

## Suggested solution flow

1. Ask each role to summarize its artifact in two minutes.
2. Open the production artifacts under `.copilot-tracking/research/`, `.copilot-tracking/prd-sessions/`, `.copilot-tracking/dt/`, `.copilot-tracking/plans/`, `.copilot-tracking/details/`, and `.copilot-tracking/github-issues/`.
3. Compare terminology across the files and resolve contradictions.
4. Use the SME context pack as the source of truth for domain terms and business rules.
5. Confirm that each user story identifies a user, need, and outcome.
6. Confirm that each acceptance criterion is observable and testable.
7. Confirm that each architecture component maps to at least one requirement.
8. Confirm that high-risk requirements and important decisions map to backlog items.
9. Confirm that the experience captures uncertainty, feedback, access failures, and human escalation.
10. Record unresolved publication inputs in the architecture notes for the publishing workshop.

## Traceability review

Select **RPI-Plan** and enter this prompt:

```text
"Review the production artifact set under `.copilot-tracking/research/`, `.copilot-tracking/prd-sessions/`, `.copilot-tracking/dt/`, `.copilot-tracking/plans/`, `.copilot-tracking/details/`, and `.copilot-tracking/github-issues/` as one solution pack. Build a traceability matrix from context facts and decisions to requirements, experience needs, architecture components, backlog items, tests, and publication gates. Save the matrix under `.copilot-tracking/details/`. Report missing links, contradictions, unsupported claims, and unowned risks. Do not implement or publish anything."
```

Then complete these steps:

1. Capture the matrix draft under `.copilot-tracking/details/`.
2. Assign an owner to each gap.
3. Fix gaps that can be resolved from workshop evidence.
4. Record remaining publication gaps in the architecture notes with an owner.
5. Mark generated content as draft until a responsible human reviews it.

The next workshop gives these publication inputs to the Microsoft Marketplace
Coach, which creates the canonical Marketplace implementation plan under
`.copilot-tracking/plans/`. Do not create a separate publication-readiness
artifact during solution review.

### Project Manager: GitHub Issues

1. Select **Backlog Manager**.
2. Ask it to inspect the backlog plan under `.copilot-tracking/github-issues/` for readiness and duplicates.
3. Confirm repository, labels, milestone, owners, and issue hierarchy.
4. Ask for a dry-run summary before any mutation.
5. Review the proposed issue titles and acceptance criteria.
6. Create issues only with facilitator approval and repository permission.

### Project Manager: Markdown-only fallback

1. Keep the backlog plan under `.copilot-tracking/github-issues/` as the system-neutral backlog.
2. Add columns for target system, owner, state, and external ID.
3. Assign a post-workshop owner to import or create each approved item.

## Engineer: Review the architecture

1. Open the architecture notes and diagram under `.copilot-tracking/details/` in Markdown Preview.
2. Follow the primary user request from Microsoft 365 Copilot to the Azure API, retrieval layer, model, and response path.
3. Follow the content ingestion and update path separately.
4. Identify where authorization is enforced.
5. Identify where secrets and keys are stored.
6. Identify where prompts, retrieved content, responses, and feedback could be logged.
7. Confirm telemetry does not collect secrets or unnecessary personal data.
8. Add failure paths for model, search, identity, and dependency outages.
9. Add a cost owner and an operational owner.
10. Mark the diagram as conceptual until infrastructure source and deployment validation exist.

## Ten-minute team discussion

1. The PM presents the outcome, requirements, and first release slice.
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
