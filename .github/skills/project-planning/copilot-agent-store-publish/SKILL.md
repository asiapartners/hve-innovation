---
name: Copilot Agent Store Publishing
description: Comprehensive reference for publishing Copilot agents to the Microsoft 365 Copilot Agent Store, binding them to Azure-backed SaaS, Managed App, Container App, or VM offers, monetizing through Partner Center, and preparing for Agent 365 governance
authors:
  - Microsoft
ms.date: 2026-08-30
keywords:
  - Copilot Agent Store
  - Microsoft 365 Copilot
  - Declarative agent
  - Custom engine agent
  - Agent 365
  - Partner Center
  - Monetization
  - Transactable SaaS
  - Certification
  - Tenant rollout
---

# Copilot Agent Store Publishing Skill

## Overview

Publishing a Copilot agent to the Microsoft 365 Copilot Agent Store puts your capability inside the surface where enterprise users already work. Done well, it also becomes a monetization channel: the agent is the front door, and an Azure-backed SaaS, Managed Application, Container App, or Virtual Machine offer is the meter.

This skill covers:

1. Agent types and selection
2. Backend architecture and binding
3. Packaging, manifest, and validation
4. Partner Center publication
5. Monetization, payments, and tax
6. Microsoft 365 admin rollout
7. Agent 365 governance readiness

> **Currency note.** Microsoft 365 Copilot extensibility, the Agent Store, and Agent 365 are evolving rapidly. Treat every schema version, program name, fee percentage, and policy requirement in this document as a starting point to verify against [Microsoft Learn](https://learn.microsoft.com/en-us/microsoft-365-copilot/extensibility/) and [Partner Center](https://partner.microsoft.com/dashboard) before you build or submit.

---

## Section 1: Agent Types and Selection

### The three shapes

#### 1. Declarative agent

**What it is:** A configuration on top of Microsoft 365 Copilot. You supply instructions, knowledge sources, and actions. Microsoft supplies the model, orchestration, safety stack, and hosting.

**You provide:**

- Agent name, description, and instructions
- Knowledge grounding (SharePoint, Graph connectors, web, uploaded files)
- Actions via API plugins backed by an OpenAPI description
- Conversation starters

**Best for:**

- Scenarios grounded in Microsoft 365 content
- Fast time-to-market
- Teams without model-hosting infrastructure

**Trade-off:** Less control over orchestration and model behavior. Monetization must come from the backing actions or a bundled offer, since the model itself is Microsoft's.

---

#### 2. Custom engine agent

**What it is:** Your own orchestration and model, surfaced inside Copilot and Teams. You own the runtime.

**You provide:**

- Model choice and hosting (Azure AI Foundry, Azure OpenAI, self-hosted, third-party)
- Orchestration logic and tool calling
- Conversation state, memory, and any RAG pipeline
- Compliance and safety layers for your own model path

**Best for:**

- Proprietary or fine-tuned models
- Complex multi-step or long-running workflows
- Teams with an existing agent stack they want to distribute through Copilot

**Trade-off:** You carry hosting cost, latency, safety, and reliability. Monetization is straightforward because you have a meter.

---

#### 3. App with an agent surface

**What it is:** An existing Teams or Microsoft 365 app that adds a Copilot agent entry point alongside tabs, bots, or message extensions.

**Best for:** Products already distributed in the Microsoft ecosystem that want incremental Copilot reach without re-architecting.

---

### Selection guide

```
Do you need your own model or custom orchestration?
├─ No  → Declarative agent
│        └─ Do you need actions against your own API?
│            ├─ Yes → Declarative agent + API plugin (this is your monetization hook)
│            └─ No  → Declarative agent, knowledge only (free/lead-gen listing)
├─ Yes → Custom engine agent
└─ Already shipping a Teams/M365 app? → Add an agent surface to the existing package
```

---

## Section 2: Backend Architecture and Binding

The agent is the interface. The Azure resource behind it is usually what customers pay for.

### Backend shapes and when to pick them

| Backend                   | Fits when                                                | Billing surface                                       | Notes                                             |
|---------------------------|----------------------------------------------------------|-------------------------------------------------------|---------------------------------------------------|
| **Multi-tenant SaaS API** | You already run a hosted service                         | Transactable SaaS offer on the commercial marketplace | Cleanest path; one codebase, per-tenant isolation |
| **Managed Application**   | Data must stay in the customer's subscription            | Managed App offer, monthly or metered                 | Heavier ops; strong fit for regulated buyers      |
| **Container App**         | Stateless service, bursty traffic, fast scale-to-zero    | Metered or bundled with a SaaS offer                  | Good default for new agent backends               |
| **Azure VM**              | OS-level control, legacy dependencies, licensed software | Hourly or BYOL VM offer                               | Rarely the right choice for a new agent backend   |

### Binding patterns

#### Pattern A: Agent calls your SaaS API (most common)

```
Microsoft 365 Copilot
    → Declarative agent
        → API plugin (OpenAPI description)
            → Microsoft Entra ID auth (OBO or client credentials)
                → Your SaaS API (App Service / Container Apps / AKS)
                    → Your data plane
```

**Monetization:** Transactable SaaS offer. Entitlement checked in your API on every call.

#### Pattern B: Agent fronts a customer-deployed Managed Application

```
Microsoft 365 Copilot
    → Agent
        → API plugin pointed at the customer's deployed endpoint
            → Managed Application in the customer's subscription
```

**Monetization:** Managed App offer with monthly or metered billing. The agent listing is the discovery surface.

#### Pattern C: Custom engine agent hosted on Container Apps

```
Microsoft 365 Copilot / Teams
    → Custom engine agent (Bot Framework or Agents SDK endpoint)
        → Container App running orchestration
            → Azure AI Foundry model + your tools/data
```

**Monetization:** Per-seat SaaS offer, or metered on consumption you emit.

### Identity and authentication

Decide early, because it constrains everything downstream:

| Approach                       | Agent acts as              | Use when                                                        |
|--------------------------------|----------------------------|-----------------------------------------------------------------|
| **On-behalf-of (OBO)**         | The signed-in user         | Data access must respect the user's permissions                 |
| **Application permissions**    | The app itself             | Background or tenant-wide processing                            |
| **Agent identity (Agent 365)** | A governed agent principal | Enterprise buyers require agent-level audit and least privilege |

**Practical rule:** if your agent reads user-scoped Microsoft 365 data, use OBO. Application permissions on Graph invite a hard security review.

### Entitlement enforcement

Your backend must be able to answer "is this caller entitled?" on every request.

Minimum viable design:

1. Marketplace webhook notifies you of subscription create, change, suspend, and cancel
2. You persist tenant ID, subscription ID, plan, and seat count
3. Agent calls carry a validated token containing tenant and user identity
4. Your API checks tenant subscription state and seat assignment before serving
5. Unentitled calls return a clear upgrade message the agent can render

Skipping step 5 produces a bad first impression: users hit an opaque failure instead of a purchase path.

---

## Section 3: Packaging, Manifest, and Validation

### Package contents

A Copilot agent app package is a zip containing, at minimum:

| File                                 | Purpose                                                                      |
|--------------------------------------|------------------------------------------------------------------------------|
| `manifest.json`                      | App manifest: identity, capabilities, permissions, and the agent declaration |
| Color icon (192x192 PNG)             | Store and client display                                                     |
| Outline icon (32x32 transparent PNG) | Monochrome client surfaces                                                   |
| Declarative agent JSON               | Instructions, knowledge, conversation starters, actions (declarative agents) |
| API plugin JSON + OpenAPI document   | Action definitions and the API contract (when using actions)                 |

Verify the current required schema versions and file set against Microsoft Learn before packaging; these change with each extensibility release.

### Manifest essentials

Get these right or validation will bounce you:

- **App ID** — A stable GUID. Do not regenerate it between versions.
- **Version** — Semantic version that strictly increases on every submission.
- **Developer block** — Name, website, privacy policy URL, terms of use URL. All URLs must resolve over HTTPS and be publicly reachable without authentication.
- **Name and description** — Short and long forms. No competitor names, no superlatives you cannot substantiate, no "Microsoft" in your product name in a way that implies endorsement.
- **Permissions and scopes** — Request the minimum. Every extra scope is a review question you will have to answer.
- **Valid domains** — Every domain your agent or plugin contacts must be declared.

### Store listing content

| Asset                 | Guidance                                                                                                        |
|-----------------------|-----------------------------------------------------------------------------------------------------------------|
| **Name**              | Short, descriptive, no marketing punctuation. Must match the manifest.                                          |
| **Short description** | One clear sentence about what the user gets.                                                                    |
| **Long description**  | Problem, capability, who it's for, what's required (license, account, backend). State prerequisites explicitly. |
| **Screenshots**       | 3-5 images showing real agent responses, not mockups of unimplemented features.                                 |
| **Video**             | Optional, 60-180 seconds, captioned. Meaningfully raises conversion.                                            |
| **Support links**     | Working support URL and a monitored contact address.                                                            |

### Pre-submission validation checklist

Run this before every submission:

- [ ] Package installs cleanly in a clean test tenant via sideload
- [ ] Every conversation starter produces a useful, non-error response
- [ ] Actions succeed for an entitled user and fail gracefully for an unentitled one
- [ ] Privacy policy URL resolves, is public, and describes what data the agent sends to your backend
- [ ] Terms of use URL resolves and is public
- [ ] Support URL and contact are monitored by a human
- [ ] Icons match the required dimensions and transparency rules
- [ ] Long description states all prerequisites, including required licenses and accounts
- [ ] No placeholder text, lorem ipsum, or internal hostnames anywhere in the package
- [ ] All declared domains are actually used and all used domains are declared
- [ ] Version number is higher than the last published version
- [ ] Agent responses stay in scope; out-of-scope prompts decline politely rather than hallucinating
- [ ] Accessibility: responses render usefully with a screen reader; images have alt text

### Common rejection causes

| Cause                                          | Fix                                                                         |
|------------------------------------------------|-----------------------------------------------------------------------------|
| Privacy policy missing, broken, or generic     | Publish a policy that names the data your agent transmits and why           |
| Agent errors on a conversation starter         | Test every starter in a clean tenant, not just your dev tenant              |
| Undisclosed prerequisites                      | State required licenses, accounts, or paid backends in the long description |
| Over-broad permissions                         | Drop to least privilege and justify what remains                            |
| Screenshots not matching behavior              | Recapture from the actual shipping build                                    |
| Name or branding implies Microsoft endorsement | Rename per branding guidance                                                |
| Unentitled user hits an opaque failure         | Return a clear message with a purchase or contact path                      |
| Agent answers far outside its stated scope     | Tighten instructions and add explicit refusal guidance                      |

---

## Section 4: Partner Center Publication

### Prerequisites

1. **Partner Center account** with a verified publisher profile
2. **Publisher verification** completed — unverified publishers see reduced trust signals and stricter review
3. **Publisher display name** finalized — customers see this; changing it post-publication is disruptive
4. **Roles assigned** — separate account admin, developer, and financial contributor duties

### Publication flow

```
Create offer
  → Offer setup (identity, categories, lead management)
    → Properties (categories, industries, legal terms)
      → Listing (descriptions, assets, contacts, support)
        → Availability (markets, audience, preview)
          → Technical configuration (package upload)
            → Plan and pricing (if transactable)
              → Review and publish
                → Automated validation
                  → Certification review
                    → Publisher sign-off
                      → Live
```

**Preview is not optional in practice.** Use the preview audience to validate purchase, entitlement, and first-run experience with real accounts before general availability.

### Reading validation feedback

Validation errors arrive in two flavors:

- **Automated** — schema, asset, and policy scans. Deterministic. Fix and resubmit.
- **Certification review** — human evaluation of behavior, listing accuracy, and policy compliance. Read the cited policy section, fix the root cause, and reply with what changed.

Resubmission is free. Arguing with a reviewer without changing anything is not productive; if you believe a finding is wrong, respond with specific evidence.

### Versioning after go-live

- Increment the manifest version on every update
- Metadata-only changes (description, screenshots) typically re-review faster than package changes
- Breaking changes to actions should ship behind a new plan or a versioned API path, not silently
- Keep an internal changelog; reviewers and customers both ask for it

---

## Section 5: Monetization, Payments, and Tax

### Choosing a model

| Model                       | How customers buy                                | You need                                                | Best for                                    |
|-----------------------------|--------------------------------------------------|---------------------------------------------------------|---------------------------------------------|
| **Free**                    | Install from Store                               | Nothing beyond the listing                              | Adoption, lead-gen, land-and-expand         |
| **Transactable SaaS**       | Purchase through the marketplace                 | SaaS fulfillment API integration, landing page, webhook | Standard commercial agents                  |
| **License-managed**         | Purchase, then admin assigns seats               | License management integration                          | Per-seat products with admin-driven rollout |
| **Metered**                 | Purchase base plan, consume overage              | Usage emission to the metering service                  | Consumption-shaped value                    |
| **Bring your own contract** | Contact sales, invoice directly                  | Your own billing                                        | Enterprise deals, custom terms              |
| **Azure-backed bundle**     | Buy the Azure offer; the agent is the front door | An Azure SaaS/Managed App/Container/VM offer            | Existing Azure sellers adding Copilot reach |

### Pricing shapes

**Per-seat** — Simplest to explain, maps cleanly to admin center seat assignment. Price against the value per user per month, not against your infrastructure cost.

**Per-tenant flat** — Good for small teams and for agents whose value does not scale with headcount. Caps your upside.

**Tiered** — Bronze/Silver/Gold by capability or volume. Ensure each tier is unambiguously better value than the one below it.

**Metered** — Base plan plus consumption dimensions. Requires your backend to emit usage reliably. Define dimensions in terms customers already understand (documents processed, queries answered) rather than internal units (tokens, compute seconds).

**Trial** — A time-boxed free period materially raises conversion for agents, because value is hard to judge from a listing. Make sure trial expiry produces a clear upgrade prompt inside the agent, not a silent failure.

### Marketplace fees and revenue

Microsoft takes a platform fee on transactable offers. The exact percentage varies by offer type, program, and partner status, and reduced rates exist for qualifying offers.

**Do not model your business on a percentage quoted in a document.** Confirm your current rate in Partner Center and with your partner manager before pricing.

Non-transactable listings carry no marketplace fee, because no transaction runs through Microsoft — you also carry all billing, collections, dunning, and compliance yourself.

### License management and seat assignment

For license-managed offers the flow is:

1. Customer purchases a plan with N seats
2. A Microsoft 365 admin assigns seats to users in the admin center
3. Your backend receives or queries the assignment state
4. Your agent grants full functionality to assigned users and a clear upgrade path to everyone else

**Failure mode to avoid:** an unassigned user invokes the agent and gets a generic error. Return an explicit "you don't have a seat, ask your admin" message instead. This single behavior meaningfully reduces support volume.

### Payout profile

Before you can be paid:

1. Complete the payout account in Partner Center (bank details, account holder, routing/SWIFT)
2. Complete the tax profile and submit the required forms for your entity type and country
3. Wait for verification, which can take weeks — start this before you need it, not after your first sale

Payouts run on a monthly cycle after a holding period. Reconcile Partner Center payout statements against your own revenue records every month.

### Tax: what this skill does and does not cover

**Covered here, because Microsoft documents it:**

- Partner Center collects and remits certain transaction taxes on transactable marketplace sales in supported markets
- You must complete a tax profile and the correct tax forms for your entity and country
- Withholding may be applied depending on your country, treaty status, and form completeness
- Payout statements and any issued tax documents are available in Partner Center
- Complete forms accurately; incomplete tax profiles are a common cause of withholding surprises and delayed payouts

**Not covered here — engage a professional:**

- Your entity structure and where you should be registered
- VAT, GST, or sales tax registration thresholds in any jurisdiction
- Cross-border withholding optimization and treaty claims
- Revenue recognition treatment for subscriptions, trials, and metered revenue
- Anything that depends on your specific facts

**The rule this skill follows:** if Microsoft documents it on a Microsoft site, explain it and cite it. If the answer depends on jurisdiction, entity structure, or individual circumstances, name the question clearly and hand it to a qualified tax or payments professional. Do not improvise tax advice.

---

## Section 6: Microsoft 365 Admin Rollout

Enterprise adoption is gated by admins, not users. Make their job easy.

### What an admin does

1. **Discover** — Finds your agent in the admin center's integrated apps or the Store
2. **Review** — Reads permissions, data flows, publisher verification status, and policy links
3. **Consent** — Grants required Graph or API permissions on behalf of the org
4. **Deploy** — Assigns to a pilot group, then expands
5. **License** — Assigns purchased seats
6. **Monitor** — Watches usage, cost, and incidents
7. **Retire** — Blocks or removes when needed

### What you should ship for admins

- [ ] A one-page permission justification: each permission, why it's needed, what breaks without it
- [ ] A data flow summary: what leaves the tenant, where it goes, how long it's retained, who can access it
- [ ] A pilot rollout guide: recommended group size, success criteria, and expansion triggers
- [ ] A troubleshooting page for the top five failure modes
- [ ] A clear statement of what happens to customer data on cancellation

**Reality check:** if a security admin cannot approve your agent from your documentation alone, they will delay it indefinitely. The documentation gap, not the product, is what stalls most enterprise rollouts.

### Common admin blockers

| Blocker                 | Preventive fix                                              |
|-------------------------|-------------------------------------------------------------|
| Broad Graph permissions | Request least privilege; document each scope                |
| Unclear data residency  | State where data is processed and stored, per region        |
| No pilot path           | Ship a documented pilot group configuration                 |
| Unverified publisher    | Complete publisher verification before pitching enterprises |
| No offboarding story    | Document data deletion on cancellation, with a timeline     |

---

## Section 7: Agent 365 Governance Readiness

Agent 365 reframes agents as governed identities with lifecycle, permissions, and observability, rather than opaque integrations. Enterprise buyers increasingly evaluate agents against that expectation regardless of which tooling they use today.

### The four questions every enterprise buyer asks

1. **Identity** — What principal does the agent act as? Can it be scoped down?
2. **Data** — What does it read and write, where does that go, and how long is it kept?
3. **Observability** — What can an admin see about its activity, cost, and errors?
4. **Lifecycle** — How is it inventoried, restricted, updated, and retired?

### Readiness checklist

- [ ] Agent acts under an identity that can be least-privileged, not a shared high-privilege app principal
- [ ] Every permission is documented with a justification
- [ ] Data flows are diagrammed, including third-party model or service calls
- [ ] Retention and deletion behavior is documented and implemented
- [ ] Agent actions are auditable, and you can describe what appears in audit surfaces
- [ ] Failure modes are graceful and produce actionable messages
- [ ] The agent declines out-of-scope requests instead of improvising
- [ ] An admin can disable the agent without uninstalling other products
- [ ] Update cadence and breaking-change policy are published

### Design implications

**Least privilege beats convenience.** Requesting broad permissions to simplify your build transfers cost to every customer's security review. Narrow scopes and document them.

**Make refusal a feature.** An agent that clearly says "that's outside what I do" earns more enterprise trust than one that answers everything with variable accuracy.

**Instrument for the admin, not just for yourself.** Usage, error rate, and per-tenant cost visibility is a purchasing criterion, not a nice-to-have.

---

## Appendix A: End-to-End Timeline

Indicative for a first-time publisher with a working prototype. Parallelize where you can.

| Stage                                             | Typical span  | Gating dependency             |
|---------------------------------------------------|---------------|-------------------------------|
| Agent type decision and architecture              | Days          | Backend choice                |
| Backend build or binding                          | Weeks         | Existing infrastructure       |
| Partner Center account and publisher verification | Weeks         | Business documentation        |
| Packaging and internal validation                 | Days          | Test tenant access            |
| Payout and tax profile                            | Weeks         | Bank and tax documentation    |
| Submission and certification                      | Days to weeks | Review queue and defect count |
| Preview validation                                | Days          | Real test purchasers          |
| General availability                              | —             | Your sign-off                 |

**Start publisher verification and the payout/tax profile first.** They are the longest poles and they are pure waiting; everything else is work you control.

---

## Appendix B: Decision Summary

| Question     | Options                                                        | Decide by                                            |
|--------------|----------------------------------------------------------------|------------------------------------------------------|
| Agent type   | Declarative / Custom engine / App surface                      | Do you need your own model or orchestration?         |
| Backend      | SaaS / Managed App / Container App / VM / none                 | Where must the data live, and what are you metering? |
| Auth         | OBO / application permissions / agent identity                 | Does data access need to respect user permissions?   |
| Monetization | Free / transactable / license-managed / metered / own contract | Is value per-seat or per-consumption?                |
| Distribution | Store listing / tenant-only / both                             | Are you selling broadly or to named accounts?        |

---

## Appendix C: Authoritative Sources

- [Microsoft 365 Copilot extensibility documentation](https://learn.microsoft.com/en-us/microsoft-365-copilot/extensibility/)
- [Partner Center marketplace offers](https://learn.microsoft.com/en-us/partner-center/marketplace-offers/)
- [Commercial marketplace payouts](https://learn.microsoft.com/en-us/partner-center/marketplace-offers/payout-policy-details)
- [Commercial marketplace tax details](https://learn.microsoft.com/en-us/partner-center/marketplace-offers/tax-details-marketplace)
- [Microsoft 365 admin center documentation](https://learn.microsoft.com/en-us/microsoft-365/admin/)
- [Microsoft Partner support](https://partner.microsoft.com/support)

For the Azure-side offer that backs your agent, see the `ms-marketplace-publish` skill.

---

*AI-assisted reference. Microsoft 365 Copilot extensibility, Agent Store, and Agent 365 requirements change frequently — verify against Microsoft Learn and Partner Center before building or submitting. This document does not provide tax, legal, or financial advice.*
