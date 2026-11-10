---
title: Partner Workshop Publishing Follow-Up
description: Frame publication readiness and product pricing for Microsoft Marketplace and Microsoft 365 Copilot Agent Store
sidebar_position: 11
author: Microsoft
ms.date: 2026-11-11
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

| Step | Activity                                                       | Time   |
|------|----------------------------------------------------------------|--------|
| 1    | [Meet the FSI client](partner-workshop.md)                     | 30 min |
| 2    | [Prepare the FSI case](partner-workshop-setup.md)              | 30 min |
| 3    | [Design the briefing](partner-workshop-role-tracks.md)         | 90 min |
| 4    | [Challenge the briefing](partner-workshop-solution.md)         | 30 min |
| 5    | [**Plan both launch paths**](partner-workshop-publishing.md)   | 60 min |
| 6    | [Hand off the first slice](partner-workshop-implementation.md) | 30 min |

Turn the reviewed Client A briefing design into two connected publication
handoffs: the proposed Azure backend and the companion Microsoft 365 Copilot
agent. Use the same `relationship-manager-fsi` context and actual artifacts from
stage 4. Planning a route does not mean the product is built, certified, or
commercially approved.

## Objective

Capture the minimum work needed to make the solution reviewable and eligible for publication through Microsoft Marketplace and Microsoft 365 Copilot Agent Store.

## Suggested workshop outcome

By the end of the session, the team should be able to answer:

* Which publication path is being targeted first?
* What public price, private-offer price, and cost assumptions support a profitable product?
* What needs to be owned by engineering, product, security, or operations?
* What remains unresolved before a real submission can happen?

## Commercial readiness and publication planning

The PM starts with a truthful product-state summary: **a fictional briefing
scenario and reviewed design artifacts**, not a deployed product or a verified
publisher account. The proposed value is helping a manager prepare for a client
meeting while preserving citations, account permissions, and human decisions.

1. Attach the FSI context, lean canvas, PRD, architecture notes, and solution
   review. Preserve the difference between classroom choices and validated
   customer demand.
2. Record the first market, buyer, measured value, costs, and willingness to pay
   as Unknown unless the team has supporting evidence.
3. Assign owners for product scope, publisher/account readiness, legal and tax
   questions, customer support, engineering, and tenant administration.
4. Take the proposed customer-subscription deployment to **Microsoft Marketplace
   Coach**, then the companion-agent boundary to **Copilot Agent Store Coach**.
5. Reconcile both tracks in one shared monetization plan. Do not promise launch
   dates, co-sell eligibility, or prices from the fictional briefing exercise.

The handoff is a shared commercial context and a list of verification owners,
not an offer package or approved business case.

> [!NOTE]
> Treat any commercial route, offer type, or add-on limitation as a verification item until current Microsoft guidance confirms the supported path. The policy matrix can change by agent type and distribution route.

## Marketplace FastTrack Coaching
### Guided path to Microsoft Marketplace and Copilot Agent Store publication

Two repository-local coaching agents support this session.

| Agent                           | Use it for                                                                                                                                            | Backing skill                 |
|---------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------|
| **Microsoft Marketplace Coach** | The Azure side: SaaS, Managed Application, Container App, or Azure VM offers, pricing, Partner Center configuration, and Azure IP Co-sell eligibility | `ms-marketplace-publish`      |
| **Copilot Agent Store Coach**   | The Microsoft 365 side: agent type selection, packaging, Agent Store submission, monetization, tenant rollout, and Agent 365 governance               | `copilot-agent-store-publish` |

Choose the coach in the agent picker in the prompt box, or type `/agent`, then paste one of the prompts below.

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

Choose **Microsoft Marketplace Coach** and attach the FSI context, reviewed
solution pack, and commercial-context notes. Customer-controlled Azure resources
are the sample's design hypothesis; ask the coach to examine that choice.

```text
Read the attached relationship-manager-fsi context, solution pack, and commercial
notes. We have workshop design artifacts for a read-only client briefing, not a
deployed product or confirmed Partner Center readiness.
Assess the proposed Azure Managed Application in each customer's subscription
against SaaS and Container alternatives. Explain deployment, publisher access,
packaging, billing, support, and co-sell prerequisites without assuming approval.
Cite current Microsoft guidance with retrieval dates for volatile rules. Treat
account-specific state, prices, costs, and launch timing as Unknown unless
evidence supports them. Ask the accountable owners to confirm proposed decisions.
Create or update the canonical Marketplace plan under .copilot-tracking/details/,
report its actual path, and link the existing architecture and monetization
records. Separate decisions, blockers, owners, and next evidence needed.
Planning only; do not deploy, configure paid terms, submit, or publish.
```

Check that the result explains what must be built and verified after the
workshop. It must not treat a conceptual Mermaid diagram as a tested package.

### Microsoft 365 Copilot Agent track

Choose **Copilot Agent Store Coach**. Attach the same FSI context and solution
pack plus the Marketplace plan's actual path.

```text
Read the attached FSI context, briefing experience, architecture, and canonical
Marketplace plan. Plan the customer-facing Microsoft 365 Copilot companion that
requests a cited Client A briefing from the Azure backend.
Verify the current publishing matrix before recommending an agent type and
distribution route. Cite current guidance with retrieval dates. Explain backend
binding, identity, service-side account authorization, tenant consent, licensing,
entitlement, and removal. Preserve missing-evidence and denied-access behavior.
HVE workshop agents are development tools, not publishable customer agents.
Record proposed decisions, blockers, owners, and next evidence in the canonical
Agent Store plan under .copilot-tracking/details/ and report its path.
Link the Marketplace plan and reconcile charges through the same monetization
record. Planning only; do not configure a tenant, submit, or publish.
```

> [!IMPORTANT]
> Neither coach provides tax, legal, or financial advice. They explain what Microsoft documents and stop where the answer depends on your entity, jurisdiction, or contracts. Route those questions to a qualified professional and record the referral as a workshop action item.

## Product Manager Monetization Plan

The Product Manager owns pricing with finance, engineering, partner sales, and both publishing-track owners. The Marketplace skill supplies the reusable cost checklist, pricing comparisons, private-service scope, and approval checks.

For the briefing product, distinguish the partner's product charge from the
customer's Azure consumption and Microsoft 365 license requirements. The Client A
fixtures cannot establish willingness to pay or cost. Keep missing figures
Unknown rather than inventing a profitable price.

Complete this step before configuring a Marketplace offer so the Product Manager can review what customers buy, what they pay separately, and whether the proposed price is supported by costs and market evidence. Missing costs, licensing requirements and approvals remain visible; the result is a recommendation for review, not an approved price list.

Choose **Microsoft Marketplace Coach** in the agent picker and paste:

```text
Use ms-marketplace-publish's MVP commercialization decision mode to create or
update the FSI briefing product's shared solution monetization plan from the
attached context, PRD, architecture, and two publication handoffs.
Compare one proposed launch package, fixed versus per-user charging, public
versus private pricing, and monthly versus annual terms. Separate the partner
charge, customer Azure consumption, Microsoft 365 licensing, and support.
Keep unsupported costs and prices Unknown, and identify the evidence and owner
needed for each decision. Link the same plan from the Marketplace handoff and
report its actual path. Planning only; do not approve prices or publish.
```

### Reconcile Agent Monetization

Reconciling agent monetization means checking the companion agent's charges, licensing and paid-access rules against the backend price plan. The objective is one consistent customer package: explain whether companion access is included or separately charged, what customers must purchase separately, and how backend entitlement is verified.

Use this step to prevent double billing for backend usage or included support and conflicting prices across the two publishing tracks. The prompt updates the existing shared plan and identifies unresolved costs, licensing decisions and approvals; it does not create another price list or approve prices for sale.

Choose **Copilot Agent Store Coach** in the agent picker and paste:

```text
Use copilot-agent-store-publish's monetization reconciliation workflow to update
the attached existing FSI briefing monetization plan, not create another price
list. Reconcile companion access, backend entitlement, included usage, separate
customer licenses, and support so the proposed package does not bill twice for
the same usage. Preserve Unknowns and approval gaps. Link the same plan from the
Agent Store handoff. Planning only; do not approve prices or publish.
```

After reconciliation, Product Manager can review the shared plan at `.copilot-tracking/details/YYYY-MM-DD/solution-monetization-plan.md`. Use the existing plan's date folder, or the actual saved path reported by the coach if different, and include that path in the review request. Review the package, public/private prices, separate customer charges and unresolved approval gaps before authorizing commercial implementation.

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

## Microsoft 365 Copilot Agent path

### Phase 1: Offer commercialization

1. Choose **Microsoft 365 Agents Toolkit** for a packaged declarative or custom engine agent that can target Microsoft Marketplace.
2. Reconcile the shared monetization worksheet with the Marketplace track, including paid backend access, separate license prerequisites, and public or private purchase paths.

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
