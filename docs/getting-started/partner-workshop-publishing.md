---
title: Partner Workshop Publishing Follow-Up
description: Frame publication readiness for Azure Application and Microsoft 365 Copilot Agent Store as a workshop handoff
sidebar_position: 11
author: Microsoft
ms.date: 2026-09-10
ms.topic: how-to
keywords:
  - Azure Applications
  - Microsoft Marketplace
  - Partner Center
  - Microsoft 365 Copilot
  - Agent Store
estimated_reading_time: 12
---

## Workshop Agenda

| Step | Activity                                                                                      | Time   |
|------|-----------------------------------------------------------------------------------------------|--------|
| 1    | [Workshop Overview](partner-workshop.md)                                                      | 30 min |
| 2    | [Set up Codespaces or local VS Code](partner-workshop-setup.md)                               | 30 min |
| 3    | [Plan, Envision, Experience, Architecture Design, Backlog](partner-workshop-role-tracks.md)   | 90 min |
| 4    | [Validation & Solution](partner-workshop-solution.md)                                         | 30 min |
| 5    | [**Microsoft Marketplace and Copilot Agent Store readiness**](partner-workshop-publishing.md) | 60 min |
| 6    | [Handoff to Implementation & Commercialization](partner-workshop-implementation.md)           | 30 min |

Use this guide during the publication-readiness portion of the workshop. The goal is to turn the workshop outputs into a clear follow-up plan for the right publication path.

## Objective

Capture the minimum work needed to make the solution reviewable and eligible for publication through Microsoft Marketplace and Microsoft 365 Copilot Agent Store.

## Suggested workshop outcome

By the end of the session, the team should be able to answer:

* Which publication path is being targeted first?
* What needs to be owned by engineering, product, security, or operations?
* What remains unresolved before a real submission can happen?

## Commercial readiness and publication planning

Before building the offer package, capture the commercial and go-to-market context that will affect Marketplace and agent-store review.

1. Define the product brand, messaging, and primary value proposition for both the Azure offer and the Microsoft 365 agent experience.
2. Confirm the initial geographic coverage, target customer segment, and any launch limitations such as language or regional compliance constraints.
3. Define the monetization model, billing approach, and taxation expectations early so the offer plan and support model are aligned.
4. Capture a simple Lean Business Canvas summary with customer segments, problem, solution, channels, revenue, cost, partners, and differentiators.
5. For Azure IP Co-sell on Marketplace, complete a Partner Center Admin checklist that covers publisher setup, legal entity and tax readiness, offer metadata, support contacts, pricing plan, and technical package validation.
6. For a Copilot Agent Store add-on, verify the supported agent type, packaging path, tenant admin approvals, consent boundaries, and whether the agent should be listed as a standalone offer or an add-on to the Azure offer.

> [!NOTE]
> Treat any commercial route, offer type, or add-on limitation as a verification item until current Microsoft guidance confirms the supported path. The policy matrix can change by agent type and distribution route.

## Marketplace FastTrack Coaching
### Guided path to Microsoft Marketplace and Copilot Agent Store publication

Two repository-local coaching agents support this session.

| Agent                           | Use it for                                                                                                                                            | Backing skill                 |
|---------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------|
| **Microsoft Marketplace Coach** | The Azure side: SaaS, Managed Application, Container App, or Azure VM offers, pricing, Partner Center configuration, and Azure IP Co-sell eligibility | `ms-marketplace-publish`      |
| **Copilot Agent Store Coach**   | The Microsoft 365 side: agent type selection, packaging, Agent Store submission, monetization, tenant rollout, and Agent 365 governance               | `copilot-agent-store-publish` |

Select the agent from the agent picker in Copilot Chat, then paste one of the prompts below.

> [!TIP]
> Both coaches work best when you tell them your current state honestly. "We have a prototype and no Partner Center account" produces a far more useful plan than "we're ready to publish."

### Keeping the coaches grounded in current Microsoft guidance

Marketplace programs, offer types, fee percentages, and the Copilot publishing matrix change frequently. Both coaches are configured to look up volatile facts through Microsoft Learn documentation rather than answer from memory, and to cite the source URL with the date retrieved.

**Treat these as always-verify, never from memory:**

| Topic                                                  | Why it moves                                            |
|--------------------------------------------------------|---------------------------------------------------------|
| Marketplace fee percentage and revenue share           | Varies by offer type, program, and partner status       |
| Which offer types are transactable or co-sell eligible | Eligibility rules are revised regularly                 |
| Copilot agent publishing matrix                        | The most volatile item; changes by agent type and route |
| Manifest and package schema versions                   | Versioned; older versions get deprecated                |
| Certification and Store validation policies            | Updated without notice                                  |
| Payout timing, withholding, and tax forms              | Vary by market and change with policy                   |

> [!WARNING]
> For anything account-specific such as your fee rate, payout schedule, program enrollment, or offer eligibility, Partner Center is authoritative. Review before committing a number to a customer or a business case.

### Microsoft Marketplace track

Select **Microsoft Marketplace Coach** and provide the current product state in one prompt:

```text
Read available BRD, PRD, architecture, and Marketplace planning artifacts in .copilot-tracking/ folder. We are building product for customers and need to reach Azure IP Co-sell eligibility in 2 weeks.

Recommend:
1. SaaS, Managed Application, or Azure Container
2. The deployment and publisher-access model
3. The pricing and transaction approach
4. The shortest credible readiness path

State the trade-offs and blockers, then ask me to confirm all decisions together.
Record confirmed decisions, owners, evidence, and next actions in the canonical
Marketplace plan under .copilot-tracking/details/.
```

### Microsoft 365 agent track

Select **Copilot Agent Store Coach** and provide the current agent state in one prompt:

```text
Read our available BRD, PRD, architecture, and Marketplace planning artifacts in .copilot-tracking/ folder.
We are building copilot agent experience for customers and need to reach publication in 2 weeks.

Recommend:
1. Declarative agent, custom engine agent, or another supported agent type
2. The backend binding and authentication model
3. The licensing, entitlement, and tenant rollout approach
4. The shortest credible validation and submission path

State the trade-offs and blockers, then ask me to confirm all decisions together.
Record confirmed decisions, owners, evidence, and next actions in the canonical
agent-store plan under .copilot-tracking/details/.
```

> [!IMPORTANT]
> Neither coach provides tax, legal, or financial advice. They explain what Microsoft documents and stop where the answer depends on your entity, jurisdiction, or contracts. Route those questions to a qualified professional and record the referral as a workshop action item.


## Publication Readiness Reference

Here are reference guides that would support your Marketplace FastTrack Coaching sessions. It serves as a reference what needs to be prepared for successfully completing solution submission. In the next step, we will handoff your commercialization implementation plan to RPI Agent for implementation.

## Azure Managed Application path

### Phase 1: Confirm publisher readiness

1. Verify or create the publisher account in Partner Center.
2. Complete publisher verification and Marketplace enrollment.
3. Confirm the legal entity, tax, payout, support, and listing owners.
4. Confirm access to a non-production Azure subscription.
5. Register required resource providers.
6. Choose the Managed Application permission scenario.
7. Apply least privilege to publisher identities and customer operations.
8. Decide whether metered billing is required.

### Phase 2: Build and validate the package

1. Create a simple working folder for the package and keep the files organized before you start.
2. Define the minimum Azure resources first, such as the app service, storage account, key vault, or other required resources for the scenario.
3. Implement the deployment in Bicep if possible, because it is easier to read and maintain than raw ARM JSON.
4. Validate the Bicep locally with the Azure tooling you have available and fix any syntax or parameter issues before packaging.
5. Export or convert the validated Bicep into ARM template JSON for the Managed Application package.
6. Name the deployment template `mainTemplate.json` and keep it at the supported ARM template language version 1.0.
7. Create `createUiDefinition.json` so the portal has a guided experience for entering deployment values.
8. Map every UI field in `createUiDefinition.json` to a parameter in `mainTemplate.json` so the portal and template stay in sync.
9. Place both files at the root of `app.zip` with no extra nesting that could break the package structure.
10. Validate the ARM template and the package structure before uploading anything.
11. Test the portal experience in the CreateUiDefinition sandbox with sample values to confirm the UI behaves correctly.
12. Review secrets, vulnerabilities, RBAC, network exposure, data handling, diagnostics, quotas, and cost.
13. Deploy the package to a non-production subscription and confirm the deployment succeeds.
14. Test create, update, failure recovery, support access, and deletion from the customer experience.
15. Record any issues found during validation and fix them before the offer is submitted.

### Phase 3: Create the Marketplace offer

1. Sign in to [Partner Center](https://partner.microsoft.com/dashboard/home).
2. Open **Marketplace offers**.
3. Select **New offer** and then **Azure Application**.
4. Enter a permanent, unique offer ID.
5. Select the verified publisher account.
6. Complete offer setup, properties, categories, legal terms, and contracts.
7. Complete the listing content, search terms, images, support, privacy, and documentation links.
8. Add a preview audience using controlled test accounts.
9. Create a plan and choose the appropriate Azure Application plan type.
10. Upload the validated Managed Application package.
11. Save the draft and resolve validation errors.

### Phase 4: Preview, certify, and go live

1. Submit the offer for preview.
2. Resolve validation and certification feedback.
3. Ask preview users to deploy the offer into clean test subscriptions.
4. Verify deployment, billing, identity, telemetry, support, upgrades, and deletion from the customer perspective.
5. Obtain approval from security, privacy, accessibility, legal, support, and business owners.
6. Make the offer live once certification is complete.

## Microsoft 365 Copilot Agent path

### Phase 1: Offer commercialization

1. Choose **Microsoft 365 Agents Toolkit** for a packaged declarative or custom engine agent that can target Microsoft Marketplace.

> [!NOTE]
> Verify the current [Microsoft 365 Copilot publishing matrix](https://learn.microsoft.com/microsoft-365-copilot/extensibility/publish) before implementation because support varies by agent type and route.

### Phase 2: Build and test the agent

1. Create the agent in the selected tool.
2. Add the reviewed name, description, instructions, conversation starters, and approved knowledge sources.
3. Connect the Azure application through an authenticated API or supported action.
4. Apply delegated or application permissions according to least privilege.
5. Add authorization checks in the Azure service, not only in agent prompts.
6. Add citations, uncertainty behavior, feedback, and human escalation.
7. Prepare the Microsoft 365 app package, manifest, icons, and required files when using Agents Toolkit.
8. Run manifest and Responsible AI validation.
9. Side load into a test tenant with administrator approval.
10. Test expected prompts, prohibited prompts, unauthorized access, missing content, dependency failures, prompt injection, and harmful output handling.
11. Complete security, privacy, accessibility, Responsible AI, and support reviews.

### Phase 3: Publish through Microsoft Marketplace

1. Confirm the agent type supports commercial marketplace submission.
2. Enroll the verified Partner Center publisher in the **Microsoft 365 and Copilot** program.
3. Review Microsoft Commercial Marketplace certification policies.
4. Review Microsoft 365 Store validation guidelines for agents.
5. Complete Responsible AI validation checks.
6. Prepare customer-facing descriptions, icons, privacy policy, terms, support, setup instructions, and test credentials when required.
7. In Partner Center, create the offer type **Apps and agents for Microsoft 365 and Copilot**.
8. Upload the validated Microsoft 365 app package.
9. Submit the offer for validation and resolve certification findings.

## Next steps

Proceed to the [implementation guide](partner-workshop-implementation.md)

---

<!-- markdownlint-disable MD036 -->
*🤖 Crafted with precision by ✨Copilot following brilliant human instruction,
then carefully refined by our team of discerning human reviewers.*
<!-- markdownlint-enable MD036 -->
