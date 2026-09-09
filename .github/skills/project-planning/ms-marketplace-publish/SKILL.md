---
name: Microsoft Marketplace Publishing
description: Comprehensive reference for publishing solutions on Azure Marketplace, achieving IP Co-sell eligibility, pricing strategies, monetization, and Partner Center configuration
authors:
  - Microsoft
ms.date: 2026-08-30
keywords:
  - Azure Marketplace
  - SaaS
  - Managed Applications
  - Container Apps
  - Azure VMs
  - Co-sell
  - Pricing
  - Monetization
  - Partner Center
  - Publication
  - Certification
---

# Microsoft Marketplace Publishing Skill

## Overview

The Microsoft Marketplace connects Microsoft customers to your solution through a unified discovery, trial, and purchase experience. Publishing on the Marketplace enables you to:

- **Reach millions of Azure customers** globally
- **Qualify for Azure IP Co-sell**, where Microsoft field teams actively promote your solution
- **Automate billing** through the Microsoft Marketplace (optional)
- **Integrate with customer workflows** through Azure Portal and procurement processes
- **Build brand trust** with Microsoft's certification and support

This skill provides comprehensive guidance on:
1. **Offer types and selection**
2. **Pricing and billing models**
3. **Monetization and revenue**
4. **Partner Center configuration**
5. **Certification and compliance**
6. **Co-sell readiness**

> **Currency note.** Marketplace programs, offer types, certification policies, and fee structures change regularly. Every fee percentage, eligibility rule, offer type, package schema version, and payout or tax mechanic in this document is a **starting point to verify**, not a current fact. Confirm against [Microsoft Learn](https://learn.microsoft.com/en-us/azure/marketplace/) and your own [Partner Center](https://partner.microsoft.com/dashboard) dashboard before pricing, building, or committing to a customer.

> **Fee percentages in this document are illustrative.** The worked examples use a 20% marketplace fee to show the *shape* of the math. Your actual rate depends on offer type, program, and partner status, and reduced rates exist for qualifying offers. Never model your business on a percentage quoted here — confirm your current rate in Partner Center and with your partner manager.

---

## Section 1: Offer Types & Selection

### Choosing Your Offer Type

The Azure Marketplace supports six primary offer types for software solutions:

#### **1. SaaS Offer (Cloud-Only Service)**

**What it is:**
- A software-as-a-service solution running in your cloud (or Microsoft-managed)
- Customers access via web browser or API integration
- Billed through Azure Marketplace or directly

**Best for:**
- Productivity tools, analytics, monitoring, security
- Solutions requiring ongoing SaaS management
- Applications not tied to Azure infrastructure

**Revenue model:**
- Monthly/annual subscriptions
- Per-user, per-organization, or tiered pricing
- Optional metered billing for add-on usage

**Marketplace fee:**
- 20% standard (negotiable for co-sell-qualified solutions)

**Typical shape:** Monitoring and observability platforms, collaboration tools, developer productivity suites

---

#### **2. Managed Application**

**What it is:**
- Your application deployed into the customer's Azure subscription
- You retain management rights; customer owns the resource
- Enables custom billing and control

**Best for:**
- Infrastructure-heavy workloads requiring customer data sovereignty
- Applications needing deep Azure integration
- Solutions requiring administrative control post-deployment

**Revenue model:**
- Monthly per-deployment
- Metered billing based on consumption
- BYOL with annual licenses

**Marketplace fee:**
- 20% (or negotiated for co-sell solutions)

**Typical shape:** Backup and recovery platforms, data protection appliances, cost governance tooling

---

#### **3. Container App**

**What it is:**
- A Docker container image published to Azure Marketplace
- Customers deploy to Azure Container Instances or their own AKS/Kubernetes
- Lightweight and portable

**Best for:**
- Stateless microservices
- Dev tools and CI/CD extensions
- AI/ML models and inference engines
- Rapid deployment scenarios

**Revenue model:**
- BYOL (bring your own license)
- Metered billing if running in Azure Container Instances
- Free tier to drive adoption

**Marketplace fee:**
- 0% for BYOL containers (no Azure billing)
- 20% for metered billing

**Example:** TensorFlow containers, database tools, security scanners

---

#### **4. Azure Virtual Machine (VM)**

**What it is:**
- A pre-configured VM image with your software pre-installed
- Customers launch from the Marketplace directly
- Billing per hour of VM runtime

**Best for:**
- Applications requiring full OS control
- Complex multi-tier deployments
- Solutions with specific hardware or OS dependencies
- Enterprise software with licensing requirements

**Revenue model:**
- Hourly VM pricing (your software + infrastructure)
- BYOL if customers bring existing licenses
- Consumption-based metering

**Marketplace fee:**
- 20% on consumption billing
- 0% for BYOL (no Marketplace transaction)

**Typical shape:** Commercial Linux distributions, database engines, licensed enterprise software

---

#### **5. Azure Services (Built on Azure)**

**What it is:**
- Managed Azure services (databases, caches, search, messaging)
- Leverages Azure's infrastructure and billing
- Native Azure service experience

**Best for:**
- Specialized databases or engines
- Managed infrastructure services
- Solutions extending Azure's capabilities

**Revenue model:**
- Consumption-based pricing (per hour, per GB, per request)
- Reserved instances for commitment discounts

**Marketplace fee:**
- Varies; consult Microsoft

**Typical shape:** Managed NoSQL and document databases, analytics platforms, search and streaming services

---

#### **6. Consulting Services**

**What it is:**
- Professional services for deployment, integration, or optimization
- Time and materials or fixed-price engagements
- Lead generation through Marketplace

**Best for:**
- Implementation and deployment services
- Customization and integration work
- Training and enablement offerings

**Revenue model:**
- Billed directly to customer or through Azure subscription
- Project-based or hourly

**Marketplace fee:**
- 0% (direct customer engagement)

**Example:** System integration, cloud migration, custom development

---

### Quick Selection Flowchart

```
Do you have software to sell?
├─ Yes, cloud-only SaaS → Use SaaS Offer
├─ Yes, deployed to customer Azure subscriptions → Use Managed Application
├─ Yes, containerized microservice → Use Container App
├─ Yes, needs OS control / VM runtime → Use Azure VM
├─ Yes, managed service on Azure → Use Azure Services
└─ No, offering implementation services → Use Consulting Services
```

---

## Section 2: Pricing Models & Revenue Sharing

### Pricing Models Explained

#### **BYOL (Bring Your Own License)**

**What it is:**
- Customer brings existing enterprise license
- No per-unit charge through Azure Marketplace
- Marketplace fee: **0%**

**When to use:**
- Enterprise software with perpetual licenses
- Customers already committed to your licensing model
- Compliance/regulatory requirements prevent cloud billing

**Example:**
- Oracle Database, SAP ERP, SAS Analytics

**Revenue impact:**
- Marketplace handles billing (free)
- You invoice customer directly or via Azure hybrid benefit integration

---

#### **Hourly/Metered Billing**

**What it is:**
- Customer charged per hour of usage or per unit consumed
- Marketplace collects payment and remits to you
- Marketplace fee: **20%**

**When to use:**
- VM-based offerings
- Usage-based scenarios (per GB, per transaction, per hour)
- Trial periods or low-commitment entry

**Example:**
- VM pricing: $0.50/hour → Microsoft takes $0.10, you keep $0.40
- Container with metering: $0.001 per API call

**Revenue impact:**
- Marketplace retains 20%, you receive 80%
- Monthly payout after 30-day customer payment window

---

#### **Subscription Billing (SaaS/Managed Apps)**

**What it is:**
- Recurring monthly or annual charges
- Customers manage subscriptions through Partner Center
- Marketplace fee: **20%**

**Pricing tiers:**
- Flat-rate plan: $100/month for all users
- Per-seat pricing: $20/user/month (e.g., for 5-100 users)
- Tiered pricing: Bronze ($50), Silver ($150), Gold ($500)
- Custom pricing for enterprise customers

**When to use:**
- SaaS applications with predictable costs
- Per-user or per-tenant billing
- Feature-tier differentiation

**Example:**
- Collaboration tool: $50/month for up to 50 users
- Analytics platform: $200/month + $0.01 per GB ingested

**Revenue impact:**
- Microsoft retains 20%, you keep 80%
- Monthly recurring revenue (MRR) is highly predictable

---

#### **Free Trial**

**What it is:**
- Offer initial free access (14-30 days) before first charge
- Drives adoption; customers must add payment info upfront
- Marketplace fee applies only to paid tier

**When to use:**
- New products building initial traction
- High-touch sales cycles requiring product evaluation
- Building proof of concept before customer commitment

**Example:**
- "Try free for 30 days, then $99/month"
- Free tier forever + premium plans

**Revenue impact:**
- Increases conversion and customer lifetime value
- Requires high-quality onboarding to convert trial → paid

---

#### **Freemium Model**

**What it is:**
- Permanent free tier + paid premium tier
- Customers start free, upgrade for advanced features
- Marketplace fee applies only to paid tiers

**When to use:**
- Developer tools or small-team scenarios
- High-volume adoption desired
- Monetizing power users or enterprise features

**Example:**
- Free: 1 project, 1 user
- Pro: $50/month, unlimited projects, 100 users
- Enterprise: Custom pricing, dedicated support

**Revenue impact:**
- Highest user acquisition but lower conversion rate
- Requires aggressive upsell or high premium tier value

---

### Revenue Sharing Model

**Standard Marketplace Economics:**

| Scenario          | Pricing        | Marketplace Fee | You Receive | Notes                  |
|-------------------|----------------|-----------------|-------------|------------------------|
| SaaS (annual)     | $1,200/year    | $240 (20%)      | $960 (80%)  | Predictable MRR        |
| VM (hourly)       | $0.50/hour     | $0.10 (20%)     | $0.40 (80%) | Per-minute billing     |
| BYOL Container    | Direct invoice | 0%              | 100%        | You handle billing     |
| Managed App       | $500/month     | $100 (20%)      | $400 (80%)  | Subscription billing   |
| Co-sell Qualified | Negotiable     | 10-20%          | 80-90%      | Higher margin possible |

**Payment & Payout:**
- Customers pay Azure Marketplace → Microsoft holds for 30 days → You receive via bank transfer
- Payout occurs monthly (typically by the 25th)
- Tax withholding may apply (varies by jurisdiction)

---

## Section 3: Monetization Options & Strategy

### Transactable vs. Non-Transactable Offers

#### **Transactable Offers** (Marketplace handles billing)

**Recommended for:**
- SaaS subscriptions
- Managed Applications
- Hourly/metered VM offerings
- Container Apps with metered billing

**Benefits:**
- Customers can pay via Azure subscription/purchase order
- Seamless billing integration with enterprise customers
- Automatic payment collection and payout

**Drawback:**
- Marketplace fee (20%) reduces your revenue

#### **Non-Transactable Offers** (You handle billing)

**Recommended for:**
- BYOL solutions
- Free tools or lead generation
- Custom enterprise offerings
- Consulting services

**Benefits:**
- 0% marketplace fee
- Direct customer relationship for billing
- Can offer custom pricing

**Drawback:**
- You manage payment collection and compliance

---

### Metered Billing (Advanced)

Metered billing allows you to charge for consumption beyond the subscription base.

**Example:**
- Base plan: $100/month (includes 100 GB of data)
- Overage: $1 per additional GB
- Customer uses 250 GB → $100 + (150 × $1) = $250/month

**How it works:**
1. You define meter dimensions in Partner Center
2. Your solution emits usage events to Azure Metering API
3. Marketplace aggregates and bills customers
4. You receive 80% of overage revenue

**Common meter dimensions:**
- `data_gb_ingested` — Per gigabyte ingested
- `api_calls` — Per million API calls
- `active_users` — Per concurrent connected user
- `compute_hours` — Per hour of compute usage

**Implementation:**
- Call Azure Metering Service API from your application
- Format: `https://marketplaceapi.microsoft.com/api/usageEvent`
- Authenticate with managed identity or service principal

**Code example (Python):**
```python
import requests
import json

# Emit usage to Azure Marketplace Metering Service
def report_usage(subscription_id, meter_name, quantity):
    url = "https://marketplaceapi.microsoft.com/api/usageEvent"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    payload = {
        "resourceId": subscription_id,
        "quantity": quantity,
        "dimension": meter_name,
        "effectiveStartTime": datetime.utcnow().isoformat() + "Z"
    }
    response = requests.post(url, json=payload, headers=headers)
    return response.json()
```

---

### Tiered Pricing Strategy

Create multiple tiers to capture different customer segments:

**Example 1: SaaS Tool (Per-User)**
| Plan             | Price/User/Month | Max Users | Features                |
|------------------|------------------|-----------|-------------------------|
| **Starter**      | $20              | 25        | Core features           |
| **Professional** | $50              | 100       | + Advanced analytics    |
| **Enterprise**   | $100             | Unlimited | + Integrations, support |

**Example 2: Managed App (Consumption)**
| Plan             | Monthly Fee | Includes            | Overage               |
|------------------|-------------|---------------------|-----------------------|
| **Essentials**   | $250        | 500 GB, 100 queries | $0.50/GB, $1/query    |
| **Professional** | $750        | 2 TB, 1M queries    | $0.40/GB, $0.80/query |
| **Enterprise**   | Custom      | Unlimited           | Negotiated            |

**Strategy:**
- Ensure each tier has clear value progression
- Avoid pricing inversions (higher tier should always be better value)
- Freemium/trial tier drives adoption
- Premium tier targets enterprise customers

---

### Co-Sell Margin Negotiation

Solutions meeting co-sell requirements may negotiate improved terms:

| Type        | Standard             | Co-Sell Qualified          | Benefit              |
|-------------|----------------------|----------------------------|----------------------|
| SaaS        | 20% fee (80% to you) | 10-15% fee (85-90% to you) | 5-10% higher revenue |
| Managed App | 20% fee              | 10-15% fee                 | 5-10% higher revenue |
| VM          | 20% fee              | 10-15% fee                 | 5-10% higher revenue |

**To negotiate:**
- Meet co-sell criteria (see Section 6)
- Document co-sell value (customer value statement, ROI calculator)
- Request business review with Microsoft partner manager
- Provide sales enablement materials (deck, data sheet, demo video)

---

## Section 4: Partner Center Configuration

### Account Setup

#### **Step 1: Enroll in Microsoft Partner Network (MPN)**

1. Go to [Microsoft Partner Network](https://partner.microsoft.com/)
2. Click **"Join now"**
3. Provide company details:
   - Legal business name
   - Headquarters address
   - Tax ID / VAT number
   - Business phone and website
4. Verify company information (48-72 hours)
5. Receive MPN ID

**Why it matters:**
- Required for all Marketplace publishers
- Establishes partnership identity
- Enables co-sell enrollment

---

#### **Step 2: Create Partner Center Account**

1. Go to [Partner Center](https://partner.microsoft.com/dashboard)
2. Sign in with work account (user from company domain)
3. Complete company profile:
   - Legal/business address
   - Business support contact
   - Technical contact
   - Program contact
4. Verify email address
5. Accept Microsoft Partner Agreement

**Roles to assign:**
- **Account admin** — Can manage users, offerings, payout settings
- **Developer** — Can create and edit offers
- **Business profile manager** — Manages co-sell materials
- **Financial contributor** — Configures payout account

---

#### **Step 3: Configure Payout Account**

To receive revenue, set up payout details:

1. In Partner Center, go **Account settings** → **Payout account**
2. Select country/region
3. Fill payout method:
   - **Bank account** (preferred)
     - Bank name, branch code, account number
     - Account holder name
     - Routing number (US) or SWIFT code (international)
   - **Check** (slower; US only)
   - **Wire transfer** (for high volumes)

4. Provide tax information:
   - W-9 (US citizens)
   - W-8BEN (non-US)
   - ITIN if applicable
   - State tax ID (if applicable)

5. Save and verify

**Timing:** Allow 2-4 weeks for bank setup before first payout

---

### Creating Your First Offer

#### **Phase 1: Offer Setup**

1. In Partner Center, click **Create an offer**
2. Choose offer type (SaaS, Managed App, Container, VM, etc.)
3. Enter **Offer ID** (internal reference, not visible to customers)
4. Enter **Offer alias** (customer-facing name)
5. Click **Create**

**Offer naming tips:**
- Clear and descriptive (e.g., "CloudOptimizer Analytics")
- Include company or brand name
- Avoid generic terms
- 50-character limit for Marketplace display

#### **Phase 2: Offer Setup Details**

**General Information:**
- Publisher (auto-filled)
- Offer name (customer-facing)
- Description (2-3 sentences)
- Help link, privacy policy

**Legal agreements:**
- Accept Microsoft Publisher Agreement
- Accept Microsoft Marketplace Certification Policies

**Setup type:**
- **Transactable** (Marketplace handles billing)
- **Non-transactable** (you handle billing; lead generation)

---

### Configuring Pricing & Plans

#### **For SaaS Offers:**

1. Go **Plans** tab
2. Create plan:
   - **Plan name** (e.g., "Starter", "Professional", "Enterprise")
   - **Plan ID** (internal reference)
   - **Description** (benefits of this plan)

3. Set pricing:
   - Monthly or annual billing
   - Price in USD
   - Include 14-30 day free trial (optional)

4. Define plan features:
   - List what's included in each tier
   - Highlight value differences

5. Set availability:
   - Markets (geo availability)
   - Customer type (enterprise, SMB, etc.)
   - Hide plan option (for testing)

6. Landing page:
   - Where customers are directed post-purchase
   - Webhook for subscription notifications

#### **For Managed Apps:**

1. Go **Plans** tab
2. Create plan with:
   - Plan name and description
   - Pricing (monthly or consumption-based)
   - Azure resource requirements

3. Configure:
   - Deployment + configuration (ARM template)
   - Metadata and description
   - Support contact and documentation

#### **For VMs:**

1. Go **Plans** tab
2. Pricing:
   - Hourly rate (or BYOL)
   - Cores/RAM resource tier
   - License term options

3. Technical details:
   - VHD/image details
   - VM family and size recommendations
   - OS and software specifications

---

### Certification & Validation

#### **Technical Validation Checklist:**

- [ ] **Application functionality**
  - Product launches without errors
  - All advertised features work
  - Performance meets claims

- [ ] **Security**
  - HTTPS/TLS encryption for data in transit
  - No hardcoded secrets or credentials
  - Data handling documented
  - Vulnerability scanning passed (e.g., Qualys, Checkmarx)

- [ ] **Compliance**
  - Terms of Service provided
  - Privacy Policy addressing GDPR, CCPA
  - Customer data handling documented
  - Support contact provided

- [ ] **Documentation**
  - User guide or quickstart
  - API documentation (if applicable)
  - Troubleshooting guide
  - Support resource (email, chat, docs)

- [ ] **Metadata**
  - Hero image (1090×500 px, < 500 KB)
  - Screenshots (3-5 of key features)
  - Video demo (optional but recommended; 3-5 min)
  - Accurate description and categorization

#### **Publication Workflow:**

1. **Draft** — Complete offer details
2. **Preview** — Limited audience testing (optional)
   - Test with internal users
   - Validate purchase and billing flow
   - Verify customer experience
3. **Review** — Microsoft certification team validates (3-5 business days)
4. **Live** → Published on Azure Marketplace

---

## Section 5: Compliance & Certification

### Publisher Policies

All publishers must comply with:

1. **Microsoft Publisher Agreement**
   - Intellectual property ownership
   - Indemnification clauses
   - Limitation of liability
   - Data protection obligations

2. **Marketplace Certification Policies**
   - No malware, viruses, or unauthorized access mechanisms
   - No misleading or fraudulent claims
   - Functional offerings with clear support plans
   - Proper data handling and privacy disclosures

3. **Code of Conduct**
   - Professional behavior
   - No discriminatory, hateful, or offensive content
   - Respect intellectual property rights
   - Ethical business practices

### Data Protection & Privacy

Your solution must handle customer data securely:

#### **Privacy Policy Requirements:**

- [ ] **Data collection statement** — What data is collected?
- [ ] **Purpose statement** — Why is data collected?
- [ ] **Retention policy** — How long is data retained?
- [ ] **User rights** — How can users access/delete their data?
- [ ] **Third-party sharing** — Is data shared with partners?
- [ ] **GDPR compliance** — Can be deleted on request
- [ ] **CCPA compliance** — California resident rights
- [ ] **Data breach notification** — Incident response plan
- [ ] **Subprocessors disclosure** — Third-party services handling data

#### **Example Privacy Policy Structure:**

```markdown
# Privacy Policy

## Data We Collect
- User account information (name, email, company)
- Usage analytics (features used, duration)
- Performance data (API latency, error rates)

## How We Use Your Data
- Improve product features and performance
- Provide customer support
- Prevent fraud and security threats

## Data Retention
- Account data: Retained while active, deleted 30 days after termination
- Usage logs: Retained for 90 days, then aggregated

## Your Rights
- Access: Request your data via support
- Deletion: Request deletion of your account and data
- Portability: Export your configuration as JSON
- Opt-out: Disable analytics in settings

## Subprocessors
- AWS S3: Data backup storage
- Datadog: Performance monitoring
- Stripe: Payment processing
```

### Certification Process

**Timeline:** 3-5 business days

**Common rejection reasons & fixes:**

| Issue                   | Fix                                              |
|-------------------------|--------------------------------------------------|
| Malware detected        | Run antivirus/security scan; sign binaries       |
| Broken links in offer   | Verify all URLs in description and documentation |
| Missing privacy policy  | Add clear, comprehensive privacy policy          |
| Broken product demo     | Test with fresh account; provide working video   |
| Unclear pricing         | Clearly state all costs and billing frequency    |
| Missing support contact | Provide email, phone, or support portal link     |

**Resubmission:**
- Address feedback in Partner Center
- Re-upload any updated assets
- Submit for re-review (no additional fee)
- Repeat until approved

---

## Section 6: Azure IP Co-Sell Eligibility & Enrollment

### What is Co-Sell?

**Co-sell** enables Microsoft's field sales team to actively promote and sell your solution to their enterprise customers.

**Benefits:**
- Microsoft sales engineers present your solution to customers
- Access to Microsoft's customer relationships and deal flow
- Joint marketing and sales enablement
- Higher likelihood of large enterprise deals
- Recognition in Microsoft partner ecosystem

**Requirements met, you receive:**
- Co-sell listing badge on Marketplace
- Priority customer matching
- Sales and marketing development funds (SMC)
- Access to Microsoft partner resources

### Co-Sell Eligibility Criteria

Your solution must meet **all** of these:

#### **1. IP Co-Sell Qualified Status**

**Requirement:**
- Solution must be a **transactable Azure Marketplace offer**
  - SaaS with recurring billing
  - Managed Application
  - Azure VM
  - Container App (with metered billing)
- OR provides significant value extension to Azure services

**Non-qualifying:**
- BYOL-only offerings
- Consulting/services (non-transactable)
- Free tools (though you can add paid tiers)

**Action:**
- Create a transactable offer in Partner Center
- Set pricing and publish

---

#### **2. Seller Engagement**

**Requirement:**
- Assign a sales contact in Partner Center who will partner with Microsoft
- This contact will receive deal registrations and customer inquiries
- Active engagement is expected

**Preparation:**
- Identify your sales lead or account executive
- Provide email, phone, cell phone
- Ensure they're authorized to commit to co-sell activities

---

#### **3. Sales Enablement Materials**

Your solution must have clear, professional materials:

**Required:**
- [ ] **Solution overview document** (1-2 pages)
  - Problem solved
  - Target customer
  - Value proposition
  - Pricing/licensing overview

- [ ] **Customer value statement or ROI calculator**
  - Business impact (cost reduction, revenue increase, time saved)
  - Customer segment or use case
  - Measurable benefits

- [ ] **Customer references or case studies** (at least 2-3)
  - Customer name and industry
  - Problem and solution
  - Quantified results (ROI, efficiency gains)
  - Customer testimonial or quote

- [ ] **Sales deck** (10-15 slides)
  - Problem introduction
  - Solution overview and architecture
  - Competitive differentiation
  - Deployment and integration details
  - Pricing and licensing
  - Customer success stories
  - Call to action and next steps

- [ ] **Product demo video** (3-5 minutes)
  - Record walkthrough of key features
  - Show customer benefits
  - Include subtitles for accessibility

**Optional but recommended:**
- Technical architecture diagram
- Integration guide (APIs, webhooks)
- Competitive comparison matrix
- Industry-specific use case documents

---

#### **4. Customer References**

**Requirement:**
- At least 2-3 paying customers or pilot deployments
- Customers willing to provide reference calls or written testimonials

**Preparation:**
- Document customer names, industries, results
- Obtain permission for use in marketing materials
- Capture success metrics (ROI, efficiency, adoption rate)

**Example case study:**

```markdown
# Customer Reference: Acme Corp

## Industry
Financial Services

## Challenge
Manual cost reconciliation across 50+ cloud subscriptions took 3 weeks monthly.

## Solution
Deployed CloudOptimizer analytics to automate cost analysis and forecasting.

## Results
- Reduced reconciliation time from 3 weeks to 2 days (87% time savings)
- Identified $2.1M in annual cloud waste
- Implemented recommendations; saved $500K annually
- Improved forecasting accuracy from ±30% to ±5%

## Customer Quote
"CloudOptimizer transformed our cloud financial management. We went from reactive to proactive, and those savings have funded our digital transformation initiatives." — Jane Smith, Finance Director, Acme Corp
```

---

#### **5. Microsoft Customer Commitment**

**Requirement:**
- Agree to work with Microsoft to jointly pursue customer opportunities
- Support co-selling motion (participate in customer meetings, provide technical resources)
- Enable Microsoft visibility into customer deployments and usage

**Responsibilities:**
- Respond to customer inquiries and deal registrations within 48 hours
- Provide technical resources for joint customer meetings
- Share monthly pipeline updates with Microsoft partner manager
- Participate in quarterly business reviews

---

### Enrollment Process

**Step 1: Build Co-Sell Profile**

1. Log into Partner Center
2. Go **Marketplace offers** → Select your offer
3. Scroll to **Co-sell with Microsoft**
4. Click **Enroll**

**Step 2: Complete Co-Sell Profile**

Fill in:
- [ ] **Industries served** (e.g., Financial Services, Healthcare, Retail)
- [ ] **Lines of business** (e.g., ERP, CRM, Analytics)
- [ ] **Geographic markets** (regions where you're active)
- [ ] **Customer segment** (enterprise, mid-market, SMB)
- [ ] **Sales contacts** (email, phone for deal inquiries)
- [ ] **Business profile** (link to your company site)

**Step 3: Upload Sales Enablement Materials**

In Partner Center, upload:
- Solution overview document (PDF)
- Sales deck (PowerPoint)
- Customer value statement (PDF)
- Product demo video (MP4 or YouTube link)
- Customer references (list with contact info)

**Step 4: Submit for Review**

- Microsoft partner manager reviews materials (5-10 days)
- Provides feedback or approves
- Approved → Your offer receives co-sell badge

**Step 5: Activate Co-Selling**

- Monitor deal registrations in Partner Center
- Respond to customer opportunities
- Collaborate with Microsoft sales team

---

### Co-Sell Badge & Visibility

Once approved, your offer receives:

```
🔗 [Co-Sell Qualified Badge] 
   "Microsoft partner working with us to support your success"
```

This appears on:
- Azure Marketplace listing
- Your company profile
- Partner locator search results
- Microsoft sales tools and customer portals

---

## Section 7: Monetization & Payment Best Practices

### Revenue Recognition & Accounting

**When do you recognize revenue?**

| Offer Type            | Revenue Recognition Timing                |
|-----------------------|-------------------------------------------|
| **SaaS subscription** | Monthly, as customer service is delivered |
| **Managed App**       | Monthly or per-deployment event           |
| **VM hourly billing** | Hourly, as instance runs                  |
| **Metered billing**   | As usage is reported                      |
| **BYOL**              | Upon invoice to customer                  |

**Example (SaaS):**
- Customer purchases annual plan on Jan 1: $1,200
- You recognize $100 revenue per month (Jan-Dec)
- For tax reporting: $1,200 in year 1

### Tax Obligations

**You are responsible for:**

1. **Sales tax / VAT**
   - Collected by Azure Marketplace on behalf of Microsoft
   - Automatically calculated and remitted to tax authorities
   - You don't need to collect; Microsoft handles it

2. **Income tax**
   - Marketplace revenue is taxable business income
   - Report on business tax return or Form 1040 Schedule C (US)
   - Quarterly estimated payments may be required

3. **Tax documentation**
   - W-9 (US citizens and corporations)
   - W-8BEN (non-US individuals)
   - W-8BEN-E (non-US entities)
   - ITIN if applicable

4. **International considerations**
   - VAT registration if selling to EU (if > €85K/year)
   - GST in Australia if > AU$75K/year
   - Withholding taxes if non-US entity

**Recommendation:** Consult a tax professional for your specific situation.

### Payment & Payout Details

**Marketplace Payment Flow:**

```
Customer → Azure Marketplace Billing
         ↓
         (Collects payment + tax; 30-day hold)
         ↓
Microsoft Payout Account
         ↓
Your Bank Account (monthly transfer)
```

**Payout Timing:**
- Purchase date: Day 1
- Microsoft holds payment: Days 1-30 (chargeback window)
- Payout processed: ~Day 35-45
- Received in your bank: 1-3 business days after

**Reporting:**
- Monthly revenue report in Partner Center
- 1099-K issued by Microsoft (US; if > $20K revenue)
- Payout statements with transaction details
- Tax documentation (W-8BEN withholding)

### Expense & Cost Management

**Typical expenses (SaaS co-sell example):**

| Expense                              | Monthly (Startup) |
|--------------------------------------|-------------------|
| Cloud infrastructure (AWS/Azure)     | $2,000-5,000      |
| Sales commission (10-15% of revenue) | $500-2,000        |
| Marketing & lead gen                 | $1,000-3,000      |
| Support staff                        | $2,000-5,000      |
| Tools/SaaS licenses                  | $500-1,000        |
| **Total monthly expenses**           | $6,000-16,000     |

**Break-even calculation:**
- If expenses = $10,000/month
- At 80% revenue (Marketplace fee)
- Need $12,500 monthly revenue ($150K annual)
- At $50/month per customer, need 250 customers

### Scaling Revenue

**Strategies to increase co-sell revenue:**

1. **Expand offer portfolio**
   - Publish additional offers (different customer segments)
   - Introduce higher-tier/premium plans
   - Add-on or extension products

2. **Optimize pricing**
   - Conduct pricing analysis; test premium pricing
   - Introduce annual discounts (improve LTV)
   - Add overage/metered billing for higher-value customers

3. **Improve conversion**
   - Free trial to reduce purchase friction
   - Better onboarding to reduce churn
   - Sales enablement to help Microsoft team close deals

4. **Geographic expansion**
   - Publish in new markets (Europe, APAC, etc.)
   - Localize pricing and language
   - Comply with regional regulations (GDPR, etc.)

5. **Channel partnerships**
   - Reseller agreements (offer discounts for partners to sell)
   - Integrations with complementary solutions
   - Bundle offerings for larger deals

---

## Section 8: Partner Center Admin Guide

For Partner Center administrators managing Marketplace offerings:

### User Roles & Permissions

| Role                         | Permissions                                   | Use Case                     |
|------------------------------|-----------------------------------------------|------------------------------|
| **Account Admin**            | Manage users, roles, payout, legal agreements | Finance, executive oversight |
| **Developer**                | Create, edit, publish offers                  | Product managers, engineers  |
| **Business Profile Manager** | Manage co-sell materials, sales contacts      | Sales, marketing leadership  |
| **Financial Contributor**    | Configure payout account, tax info            | Finance/accounting           |
| **MPN Admin**                | Manage Partner Network membership             | Executive/partnership ops    |

**Best practice:** Distribute roles by function; avoid concentrating too much access.

### Offer Lifecycle Management

**State transitions:**

```
Draft → Preview → Ready for Review → In Review → Live
 ↑                                              ↓
 └─ Reject / Unpublish ─────────────────────────
```

**Common tasks:**

- **Save as Draft** — Work in progress; not visible to customers
- **Preview** — Limited audience testing (internal/partner access)
- **Submit for Review** — Microsoft certification begins
- **Publish** — Go live on Marketplace
- **Update** — Revise existing offer (new pricing, features, metadata)
- **Unpublish** — Remove from Marketplace (e.g., end of life)

### Monitoring & Analytics

Partner Center provides insights:

- **Customer acquisition** — New customers by month/offer
- **Revenue** — MRR, ARR, customer value
- **Conversion metrics** — Marketplace views → purchases
- **Customer retention** — Churn rate, renewal rate
- **Geographic performance** — Revenue by region
- **Usage analytics** — Feature adoption, API calls

**Recommendation:** Review analytics monthly to identify trends and optimize pricing/positioning.

---

## Section 9: When to Seek Expert Help

### Consult a Tax Professional

- Calculating estimated quarterly tax payments
- Structuring entity (LLC, S-Corp, etc.) for tax efficiency
- Understanding withholding tax on international sales
- Preparing annual tax return
- Audit or IRS inquiry

### Consult a Lawyer

- Drafting or reviewing Terms of Service
- GDPR/CCPA compliance (data handling)
- Intellectual property and licensing agreements
- Partnership or reseller agreements
- Customer contracts or SLAs

### Consult a Payment/Fintech Expert

- Complex pricing models (dynamic pricing, auctions)
- Multi-currency and international payment handling
- Custom billing or invoicing requirements
- Subscription management platform selection
- Marketplace settlement and reconciliation

### Consult a Sales/Marketing Expert

- Go-to-market strategy for Azure
- Sales enablement materials and messaging
- Co-sell partnership development with Microsoft
- Channel partner recruitment
- Campaign strategy and attribution

---

## Appendix A: Resources & Documentation

### Microsoft Official Docs

- [Azure Marketplace Overview](https://learn.microsoft.com/en-us/azure/marketplace/overview)
- [Publisher Guide](https://learn.microsoft.com/en-us/azure/marketplace/publisher-guide)
- [Partner Center Help](https://learn.microsoft.com/en-us/partner-center/)
- [Co-Sell Program Guide](https://learn.microsoft.com/en-us/partner-center/co-sell-requirements)
- [SaaS Offer Guide](https://learn.microsoft.com/en-us/azure/marketplace/partner-center-portal/create-new-saas-offer)

### Third-Party Resources

- [Azure Marketplace Pricing Calculator](https://calculator.azure.com/)
- [Stripe Marketplace Documentation](https://stripe.com/docs/connect)
- [ServiceTitan Marketplace Guide](https://partners.azuremarketplace.microsoftonline.com/)

### Support

- [Microsoft Partner Support](https://partner.microsoft.com/support)
- [Azure Marketplace Contact Form](https://learn.microsoft.com/en-us/azure/marketplace/support)
- Community forums and user groups

---

## Appendix B: Offer Type Comparison Matrix

| Factor                | SaaS                | Managed App             | Container                | VM             | Consulting         |
|-----------------------|---------------------|-------------------------|--------------------------|----------------|--------------------|
| **Marketplace fee**   | 20%                 | 20%                     | 0-20%                    | 20%            | 0%                 |
| **Billing frequency** | Monthly/annual      | Monthly/usage           | Usage                    | Hourly         | Custom             |
| **Deployment time**   | Instant             | 5-15 min                | Instant                  | 10-20 min      | Varies             |
| **Customer risk**     | Low (trial)         | Medium                  | Low                      | Medium         | Varies             |
| **Co-sell eligible**  | Yes                 | Yes                     | Yes                      | Yes            | No                 |
| **Best for**          | Cloud-only products | Azure-native            | Microservices            | OS control     | Services           |
| **Examples**          | Collaboration, CRM  | Backup, cost governance | ML frameworks, streaming | Databases, ERP | System integration |

---

*This skill is maintained by Microsoft and the community. Last updated: 2026-08-30.*

