---
title: Partner Workshop Publishing Follow-Up
description: Frame publication readiness and product pricing for Microsoft Marketplace and Microsoft 365 Copilot Agent Store
sidebar_position: 11
author: Microsoft
ms.date: 2026-11-15
ms.topic: how-to
keywords:
  - Azure Applications
  - Microsoft Marketplace
  - Partner Center
  - Microsoft 365 Copilot
  - Agent Store
  - monetization
  - product pricing
estimated_reading_time: 16
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
* What public price, private-offer price, and cost assumptions support a profitable product?
* What needs to be owned by engineering, product, security, or operations?
* What remains unresolved before a real submission can happen?

## Commercial readiness and publication planning

Before building the offer package, capture the commercial and go-to-market context that will affect Marketplace and agent-store review.

1. Define the product brand, messaging, and primary value proposition for both the Azure offer and the Microsoft 365 agent experience.
2. Confirm the initial geographic coverage, target customer segment, and any launch limitations such as language or regional compliance constraints.
3. Complete the [product manager monetization plan](#product-manager-monetization-plan) with both publishing tracks so pricing, billing, costs, and taxation assumptions are aligned.
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
Read available BRD, PRD, architecture, and Marketplace planning artifacts in
.copilot-tracking/ folder. We are building product for customers and need to
reach Azure IP Co-sell eligibility in 2 weeks.

Recommend:
1. SaaS, Managed Application, or Azure Container
2. The deployment and publisher-access model
3. The pricing and transaction approach, using the shared product manager
   monetization plan: fixed, hybrid, or consumption; separate public and
   private prices; SMC/SMB self-service checkout; costs, profit, fees, and tax
4. The shortest credible readiness path

State the trade-offs and blockers, then ask me to confirm all decisions
together.
Record confirmed decisions, owners, evidence, and next actions in the canonical
Marketplace plan under .copilot-tracking/details/.
```

### Microsoft 365 Copilot Agent track

Select **Copilot Agent Store Coach** and provide the current agent state in one prompt:

```text
Read our available BRD, PRD, architecture, and Marketplace planning artifacts in
.copilot-tracking/ folder.
We are building copilot agent experience for customers and need to reach
publication in 2 weeks.

Recommend:
1. Declarative agent, custom engine agent, or another supported agent type
2. The backend binding and authentication model
3. The licensing, entitlement, and tenant rollout approach, reconciled with the
   shared monetization plan and Marketplace pricing so agent and backend
   charges are clear and included usage is not billed twice
4. The shortest credible validation and submission path

State the trade-offs and blockers, then ask me to confirm all decisions
together.
Record confirmed decisions, owners, evidence, and next actions in the canonical
agent-store plan under .copilot-tracking/details/.
```

> [!IMPORTANT]
> Neither coach provides tax, legal, or financial advice. They explain what Microsoft documents and stop where the answer depends on your entity, jurisdiction, or contracts. Route those questions to a qualified professional and record the referral as a workshop action item.

## Product Manager Monetization Plan

The Product Manager owns pricing with finance, engineering, partner sales, and both publishing-track owners. The Marketplace skill supplies the reusable cost checklist, pricing comparisons, private-service scope, and approval checks.

Use this prompt to prepare an MVP pricing recommendation: one launch package, a proposed price range using available market references, public versus private prices, and fixed-package versus per-user billing with monthly and annual terms.

Complete this step before configuring a Marketplace offer so the Product Manager can review what customers buy, what they pay separately, and whether the proposed price is supported by costs and market evidence. Missing costs, licensing requirements and approvals remain visible; the result is a recommendation for review, not an approved price list.

Select **Microsoft Marketplace Coach** and paste:

```text
Use ms-marketplace-publish's MVP commercialization decision mode to create or
update our shared solution monetization plan from the BRD, PRD, architecture and
publication decisions. Keep it concise for Product Manager review and link it
from the Marketplace handoff. Planning only; do not publish.
```

### Reconcile Agent Monetization

Reconciling agent monetization means checking the companion agent's charges, licensing and paid-access rules against the backend price plan. The objective is one consistent customer package: explain whether companion access is included or separately charged, what customers must purchase separately, and how backend entitlement is verified.

Use this step to prevent double billing for backend usage or included support and conflicting prices across the two publishing tracks. The prompt updates the existing shared plan and identifies unresolved costs, licensing decisions and approvals; it does not create another price list or approve prices for sale.

Select **Copilot Agent Store Coach** and paste:

```text
Use copilot-agent-store-publish's monetization reconciliation workflow to update
our existing shared solution monetization plan. Present the agent/backend charge
breakdown and approval gaps for review, and link it from the Agent Store
handoff. Planning only; do not publish.
```

After reconciliation, Product Manager can review the shared plan at `.\.copilot-tracking\details\YYYY-MM-DD\solution-monetization-plan.md`. Use the existing plan's date folder, or the actual saved path reported by the coach if different, and include that path in the review request. Review the package, public/private prices, separate customer charges and unresolved approval gaps before authorizing commercial implementation.

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
8. Confirm the shared monetization worksheet, public and private pricing, and whether metered billing is required.

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

### Phase 5: Enable Azure IP Co-sell

1. Confirm the live Managed Application offer is transactable through Microsoft
   Marketplace and that the solution is eligible for the Azure IP Co-sell route.
2. In Partner Center, open **Marketplace offers**, select the live Azure
   Application offer, and open the **Co-sell with Microsoft** area in the offer
   navigation.
3. Choose **Enroll** and complete the Co-sell Solutions profile.
4. Add industries served, business lines, geographic markets, customer segments,
   sales contacts, and the business profile.
5. Add the solution one-pager and pitch deck.
6. Add architecture evidence and other required technical or sales materials
   for the offer.
7. Verify customer references and revenue evidence against the current Azure IP
   Co-sell requirements.
8. Submit the Co-sell profile for review and track any requested changes.
9. Keep unresolved qualification requirements as open follow-up items until
   Partner Center confirms the Co-sell status.
10. Recheck eligibility, benefits, fees, incentives, and MACC implications with
    current Microsoft guidance before making customer or sales commitments.

> [!IMPORTANT]
> A live Marketplace offer or Azure integration does not by itself establish
> Azure IP Co-sell eligibility. Confirm the offer type, transactability,
> solution qualification, required evidence, and account-specific status in
> Partner Center.

## Microsoft 365 Copilot Agent path

### Phase 1: Offer commercialization

1. Choose **Microsoft 365 Agents Toolkit** for a packaged declarative or custom engine agent that can target Microsoft Marketplace.
2. Identify the existing transactable Azure offer that the agent will use:
   * **Transactable SaaS:** Verify that the SaaS offer purchase applies to
     agent access and maps to tenant or seat entitlement.
   * **Transactable Managed Application:** Use the Managed Application as the
     Azure-backed bundle when the agent fronts a customer-deployed
     application. Billing remains with the Azure offer, and the agent acts as
     the discovery and usage surface.
3. Do not assume that every Managed Application listing qualifies for a
   Copilot Agent bundle or linked-SaaS route. Verify the current
   [Microsoft 365 Copilot publishing guidance](https://learn.microsoft.com/microsoft-365-copilot/extensibility/publish)
   and
   [linked-SaaS monetization guidance](https://learn.microsoft.com/partner-center/marketplace-offers/monetize-addins-through-microsoft-commercial-marketplace)
   before selecting the path.
4. Reconcile separate Microsoft 365 licenses, agent requirements, public or
   private prices, and any Azure or third-party charges with the shared
   monetization plan.
5. Test purchase, deployment or activation, plan change, renewal, cancellation,
   revoked entitlement, and agent access without creating a duplicate purchase
   or usage charge.

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

## Azure SaaS path

Use this path for a cloud-hosted SaaS application that will sell through
Microsoft Marketplace and pursue Azure IP Co-sell eligibility.

### Phase 1: Confirm publisher and transaction readiness

1. Verify or create the publisher account in Partner Center.
2. Complete Marketplace publisher verification and confirm the legal entity,
   tax, payout, support, and Co-sell owners.
3. Choose **Sell through Microsoft** for a transactable SaaS offer.
4. Confirm the SaaS offer model, billing cadence, plans, markets, trial, and
   whether metered billing is required.
5. Reconcile public and private prices, costs, tax treatment, entitlements,
   included usage, and approved commercial terms in the shared monetization
   plan.
6. Confirm the solution is primarily platformed on Azure and qualifies for
   Azure IP Co-sell as an intellectual-property solution. Verify the current
   revenue, Marketplace, and technical-validation requirements in Partner
   Center rather than relying on legacy thresholds or benefit promises.

### Phase 2: Implement SaaS fulfillment and lifecycle

1. Evaluate the [Commercial-Marketplace-SaaS-Accelerator](https://github.com/Azure/Commercial-Marketplace-SaaS-Accelerator), a community-supported reference implementation for subscription activation, webhooks, administration, metering, and Marketplace lifecycle integration.

   > **If adopted, skip items 2-6 below; the Accelerator covers the SaaS landing page, Fulfillment API activation, lifecycle webhooks, subscription-state checks, entitlement, tenant isolation, and secure reconciliation.**

2. Build the SaaS landing page and resolve the Marketplace purchase token through the SaaS Fulfillment API.
3. Activate the subscription and bind the customer, tenant, plan, quantity, and purchase context to the SaaS service.
4. Implement subscription lifecycle webhooks for activation, change, suspension, reinstatement, cancellation, and renewal.
5. Verify subscription state and enforce entitlement and tenant isolation before granting service access.
6. Add secure webhook validation, idempotency, retry handling, audit logging, and reconciliation.
7. **If applicable, customize or validate:** Configure usage dimensions, emit only approved billable events, and reconcile usage and invoices.
8. Add customer support, health, telemetry, cancellation, deletion, and removal
   workflows.

### Phase 3: Create and validate the SaaS offer

1. Sign in to [Partner Center](https://partner.microsoft.com/dashboard/home)
   and open **Marketplace offers**.
2. Create a new offer, choose **SaaS**, and enter a permanent unique offer ID.
3. Complete setup, properties, categories, legal terms, privacy, support,
   documentation, and customer-facing listing content.
4. Create the offer plans and set billing type, monthly or annual pricing,
   markets, availability, and trial behavior.
5. Add the landing page URL and webhook connection settings.
6. Configure metered dimensions when applicable.
7. Add a controlled preview audience using test accounts.
8. Submit the offer for preview and resolve listing or technical validation
   findings.

### Phase 4: Preview, go live, and enable Azure IP Co-sell

1. Test purchase, activation, plan change, suspension, renewal, cancellation,
   and removal in a clean tenant.
2. Test private and public offer behavior, entitlement, metered usage,
   telemetry, support, and reconciliation.
3. Obtain security, privacy, accessibility, legal, finance, product, and
   support approval.
4. Resolve certification findings and make the transactable SaaS offer live.
5. Open the live offer in Partner Center and complete **Co-sell with Microsoft**
   for the Azure IP Co-sell route.
6. Add industries, business lines, geographic markets, customer segment,
   sales contacts, and the Microsoft partner business profile.
7. Upload the current solution one-pager, pitch deck, architecture evidence,
   and other required sales-enablement materials.
8. Verify the offer's documented solution type, Azure platform usage, revenue
   evidence, and technical readiness against the current Co-sell requirements.
9. Submit or update the Co-sell profile and retain unresolved qualification
   items as open findings until Partner Center confirms the status.
10. Recheck MACC, benefit, fee, revenue-share, and marketplace implications
    with the current Microsoft guidance before making customer commitments.

> [!IMPORTANT]
> A live Marketplace listing or Azure integration alone does not establish
> Azure IP Co-sell eligibility. Transactability, solution qualification,
> required sales materials, and account-specific evidence must be validated
> independently.

## Next steps

Proceed to the [implementation guide](partner-workshop-implementation.md)

---

<!-- markdownlint-disable MD036 -->
*🤖 Crafted with precision by ✨Copilot following brilliant human instruction,
then carefully refined by our team of discerning human reviewers.*
<!-- markdownlint-enable MD036 -->
