# Salesforce Agentforce: Complete Deep-Dive Database

## Executive Summary

This document provides a comprehensive inventory and analysis of Salesforce Agentforce capabilities, real-world deployments, ROI models, and critical assessment of claims vs. reality.

**Key Statistics (as of January 2026):**

- 18,500+ Agentforce deals closed since launch
- 9,500+ paid deals (50% QoQ growth)
- 12,000+ customers across 39 countries
- 70% QoQ growth in production deployments
- $100M+ in reported annualized customer cost savings

---

## Part 1: Agentforce Product Capabilities

### 1.1 Agent Types

| Agent Type              | Primary Function            | Target User    | Key Actions                                |
| ----------------------- | --------------------------- | -------------- | ------------------------------------------ |
| **Service Agent**       | Customer support automation | Service teams  | Case resolution, KB lookup, escalation     |
| **SDR Agent**           | Sales development           | Sales teams    | Lead nurturing, qualification, outreach    |
| **Sales Coach**         | Rep enablement              | Sales managers | Coaching, deal guidance, role-play         |
| **Commerce Agent**      | E-commerce assistance       | Commerce teams | Product recommendations, order support     |
| **Field Service Agent** | Field dispatch/scheduling   | Field teams    | Appointment scheduling, technician routing |
| **Employee Help Agent** | Internal support            | All employees  | HR, IT, Finance, Ops queries via Slack     |
| **Custom Agents**       | Any business process        | Any team       | Built via Agent Builder                    |

### 1.2 Core Architecture Components

```
┌─────────────────────────────────────────────────────────────────┐
│                    AGENTFORCE ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  ATLAS REASONING ENGINE                  │   │
│  │  • Intent classification                                │   │
│  │  • Entity extraction                                    │   │
│  │  • Context retrieval (via Data Cloud)                   │   │
│  │  • Action plan determination                            │   │
│  │  • Multi-step reasoning                                 │   │
│  │  • Guardrail enforcement                                │   │
│  └─────────────────────────────────────────────────────────┘   │
│                             │                                   │
│           ┌─────────────────┼─────────────────┐                │
│           ▼                 ▼                 ▼                │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐          │
│  │   TOPICS    │   │   ACTIONS   │   │ GUARDRAILS  │          │
│  │ • Intents   │   │ • Flows     │   │ • Escalation│          │
│  │ • Templates │   │ • Apex      │   │ • Compliance│          │
│  │ • Mappings  │   │ • APIs      │   │ • Data ACLs │          │
│  └─────────────┘   └─────────────┘   └─────────────┘          │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                     DATA CLOUD                           │   │
│  │  Unified customer profiles from:                        │   │
│  │  Service Cloud | Sales Cloud | Commerce | Marketing     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  AGENT BUILDER                           │   │
│  │  Low-code configuration:                                │   │
│  │  • Agent definition (role, persona, scope)              │   │
│  │  • Topic configuration                                  │   │
│  │  • Action mapping (Flows, Apex, APIs)                   │   │
│  │  • Guardrail rules                                      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  PROMPT BUILDER                          │   │
│  │  Custom prompt engineering for:                         │   │
│  │  • Response generation                                  │   │
│  │  • Summarization                                        │   │
│  │  • Classification                                       │   │
│  │  • Extraction                                           │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 1.3 Key Capabilities Matrix

| Capability                 | Available | Details                           |
| -------------------------- | --------- | --------------------------------- |
| Autonomous Resolution      | ✅        | 30-85% rates documented           |
| Agent Assist/Copilot       | ✅        | Einstein Copilot                  |
| Knowledge Base Integration | ✅        | Data Cloud native                 |
| Omnichannel Support        | ✅        | Chat, email, voice, social, Slack |
| Voice AI                   | ⚠️        | Via partners (Five9, Vonage)      |
| Workflow Automation        | ✅        | Flow integration                  |
| Custom Training            | ✅        | Prompt Builder                    |
| Multi-language             | ✅        | Native language support           |
| 24/7 Availability          | ✅        | Always-on agents                  |
| Human Handoff              | ✅        | Configurable escalation           |
| CRM Integration            | ✅        | Native Salesforce                 |
| External API Calls         | ✅        | Via MuleSoft, Actions             |

---

## Part 2: Complete Case Study Database

### 2.1 Case Study Summary Table (28 Total)

| #   | Company                        | Industry              | Agent Type            | Key Metric               | Result                  | Deployment Time  |
| --- | ------------------------------ | --------------------- | --------------------- | ------------------------ | ----------------------- | ---------------- |
| 1   | **Salesforce (Customer Zero)** | Technology            | Service + SDR + Slack | Autonomous Resolution    | 83% (32K/week)          | 1 year (ongoing) |
| 2   | **Wiley**                      | Publishing/EdTech     | Service Agent         | ROI                      | 213%                    | Not disclosed    |
| 3   | **Asymbl**                     | Technology            | Custom                | Annual Savings           | $575,000                | Not disclosed    |
| 4   | **1-800Accountant**            | Financial Services    | Service Agent         | Autonomous Resolution    | 70% (tax week)          | Not disclosed    |
| 5   | **Fisher & Paykel**            | IoT/Appliances        | Service Agent         | Self-Service Target      | 65% (from 33%)          | <3 months        |
| 6   | **College Possible**           | Education/Non-Profit  | Custom                | Capacity Multiplier      | 4x (25K students)       | Not disclosed    |
| 7   | **Wyndham**                    | Hospitality           | Service Agent         | Automation Rate          | 62%                     | Not disclosed    |
| 8   | **Engine**                     | Travel Tech           | Service + Slack       | AI Resolution + Cost     | 30%, $2M saved          | **12 days**      |
| 9   | **Engie**                      | Energy/Utilities      | Service Agent         | User Assistance          | 83%                     | **3 weeks**      |
| 10  | **Safari365**                  | Travel                | Marketing + Ops       | Efficiency               | +30%                    | **6 weeks**      |
| 11  | **Healthcare Provider**        | Healthcare            | Service Agent         | Manual Work Reduction    | -80%                    | Not disclosed    |
| 12  | **Retail Company**             | Retail                | Operations            | Loss Mitigation          | $3.8M saved             | Not disclosed    |
| 13  | **Shoe Carnival**              | Retail                | Voice/Call Center     | AI Call Target           | 40%                     | Not disclosed    |
| 14  | **Precina**                    | Healthcare Tech       | Care Coordination     | A1C Reduction            | 9.6→6.4                 | 12 weeks pilot   |
| 15  | **UK Police (Bobbi)**          | Government            | Service Agent         | Resolution Rate          | 82%                     | Not disclosed    |
| 16  | **Grupo Falabella**            | Retail                | WhatsApp Service      | Conversations/Resolution | 5.4x growth, 60% auto   | Not disclosed    |
| 17  | **Finnair**                    | Airlines              | Journey Support       | FCR                      | 2x in 4 months          | 4 months         |
| 18  | **Reddit**                     | Digital Media         | Advertiser Support    | Resolution Speed         | 84% faster              | Not disclosed    |
| 19  | **Hero FinCorp**               | Financial Services    | Loan Processing       | STP + Time               | 75% STP, 30min approval | Not disclosed    |
| 20  | **Formula 1**                  | Sports/Entertainment  | Fan Engagement        | Response Times           | 80% faster              | Not disclosed    |
| 21  | **Grupo Globo**                | Media/Streaming       | Churn Prevention      | Retention                | +22% retention          | Not disclosed    |
| 22  | **Carnegie Learning**          | EdTech/Sales          | Sales Research        | Research Time            | 92% reduction           | Not disclosed    |
| 23  | **Nexo**                       | Crypto/FinTech        | 24/7 Support          | Hours Saved              | 1,200+ hours            | Not disclosed    |
| 24  | **Capita**                     | Recruitment/BPO       | High-Volume Hiring    | Time-to-Hire             | 24 hours                | Not disclosed    |
| 25  | **AAA**                        | Roadside Assistance   | Member Services       | Agent Augmentation       | Enhanced efficiency     | Not disclosed    |
| 26  | **Accenture**                  | Professional Services | Internal Assist       | Meeting/Task             | Always-on assistants    | Not disclosed    |
| 27  | **Saks**                       | Luxury Retail         | Digital Shopping      | CX Enhancement           | In-store level online   | Not disclosed    |
| 28  | **Pfizer**                     | Pharmaceuticals       | Commercial Ops        | Productivity             | Increased effectiveness | Not disclosed    |

### 2.2 Industry Distribution

| Industry                  | Case Studies | Key Metrics Range                                      |
| ------------------------- | ------------ | ------------------------------------------------------ |
| **Technology/SaaS**       | 5            | 30-85% autonomous, $230K-$575K savings                 |
| **Retail**                | 5            | 40-70% targets, 5.4x volume growth, $3.8M savings      |
| **Travel/Hospitality**    | 4            | 30-62% automation, 2x FCR, 12 days-6 months deployment |
| **Financial Services**    | 4            | 70% autonomous, 75% STP, 30-min loan approval          |
| **Media/Entertainment**   | 4            | 22-84% improvements (retention, speed, response)       |
| **Healthcare/Pharma**     | 4            | 50-80% manual reduction, 33% A1C improvement           |
| **Education/Non-Profit**  | 3            | 4x capacity, 92% research time reduction               |
| **Professional Services** | 2            | Always-on assistants, high-volume hiring               |
| **Energy/Utilities**      | 1            | 83% user assistance                                    |
| **Government**            | 1            | 82% resolution                                         |

### 2.3 Detailed Case Study Profiles

#### Tier 1: Enterprise Scale (Validated at Scale)

**SALESFORCE "CUSTOMER ZERO" (85% Autonomous)**

```
Company:        Salesforce
Scale:          150,000+ customer companies, 1.5M+ cases
Products:       Service Agent, SDR Agent, Slack Agent
Key Results:
├── Service:    85% autonomous resolution rate
├── SDR:        43,000+ leads processed, $1.7M pipeline from dormant leads
├── Slack:      500,000 hours saved
└── Weekly:     32,000 conversations, 83% resolution, <1% human escalation
Credibility:    HIGH (first-party, but self-promotional)
```

**WILEY (213% ROI)**

```
Company:        Wiley (Global publisher)
Industry:       Publishing/EdTech
Products:       Agentforce, Service Cloud, Einstein AI
Key Results:
├── ROI:        213%
├── Savings:    $230,000 annual
├── Efficiency: +40% in first weeks
├── Onboarding: 50% faster agent ramp-up
└── Use Case:   Seasonal scaling (back-to-school)
Credibility:    HIGH (Salesforce official customer story)
```

**WYNDHAM (62% Automation)**

```
Company:        Wyndham Hotels & Resorts
Scale:          9,200+ properties, 95 countries
Products:       Agentforce, Five9, Experience Cloud
SI Partner:     PwC, Amplix
Key Results:
├── Automation: 62% guest interactions automated
├── Savings:    "Millions" in legacy system costs
├── Use Cases:  Reservations, loyalty, check-in/out, IT support
└── Approach:   AI embedded across functions (not isolated)
Credibility:    HIGH (PwC case study)
```

#### Tier 2: Strong Mid-Market Evidence

**1-800ACCOUNTANT (70% During Peak)**

```
Company:        1-800Accountant
Industry:       Financial Services / Accounting
Products:       Agentforce Service Agent
Key Results:
├── Autonomous: 70% during tax week 2025
├── Impact:     Instant responses, CPAs freed for advisory
└── Scaling:    Handled seasonal peak without staff increase
Credibility:    HIGH (specific peak performance data)
```

**FISHER & PAYKEL (2x Self-Service Target)**

```
Company:        Fisher & Paykel (Premium appliances)
Scale:          Global, 50+ countries
Products:       Agentforce, Data Cloud, Service Cloud
Key Results:
├── Self-Service:    33% → 65% (target, ~2x improvement)
├── Training:        9 months → 3 weeks (76% reduction)
├── Email Opens:     +206%
├── Email Clicks:    +112%
├── Implementation:  <3 months
└── Innovation:      IoT integration, predictive maintenance
Credibility:    HIGH (detailed metrics, Salesforce official)
```

**ENGINE (12-Day Deployment)**

```
Company:        Engine (Travel technology)
Products:       Agentforce Service + Slack
Key Results:
├── AI Resolution:   30% of cases
├── Handle Time:     -15% in first month
├── Cancellations:   Seconds (vs. manual)
├── Deployment:      12 days
└── Coverage:        HR, IT, Ops, Finance via Slack
Credibility:    HIGH (fastest documented deployment)
```

**ENGIE (83% User Assistance)**

```
Company:        Engie M&S Belgium
Industry:       Energy/Utilities
Products:       Agentforce (via Capgemini)
Key Results:
├── Assistance:      83% of users successfully helped
├── Prototype:       3 weeks to working POC
├── Evolution:       FAQ-only → full conversational agent
└── Capability:      Balance checks, payments, recommendations
Credibility:    MEDIUM-HIGH (SI partner case study)
```

**GRUPO FALABELLA (5.4x Conversation Growth)**

```
Company:        Grupo Falabella (Latin American retailer)
Industry:       Retail
Scale:          500+ stores across LATAM
Products:       Agentforce + WhatsApp integration
Key Results:
├── Conversations:   5.4x growth in AI-handled interactions
├── Autonomous:      60% resolution without human intervention
├── Channel:         WhatsApp-native customer service
└── Region:          Latin America (Spanish/Portuguese)
Credibility:    HIGH (specific growth metrics, official Salesforce)
```

**FINNAIR (2x First Contact Resolution)**

```
Company:        Finnair
Industry:       Airlines
Scale:          14.5 million passengers annually
Products:       Agentforce Service Agent
Key Results:
├── FCR:             2x improvement in first contact resolution
├── Timeline:        4 months to achieve results
├── Use Cases:       Booking changes, flight info, loyalty queries
└── Integration:     Airline reservation systems
Credibility:    HIGH (specific timeline and outcome, official)
```

**REDDIT (84% Faster Resolution)**

```
Company:        Reddit
Industry:       Digital Media/Social
Scale:          1.7 billion monthly visitors
Products:       Agentforce for Advertiser Support
Key Results:
├── Resolution:      84% faster issue resolution
├── Focus:           Advertising platform support
├── Users:           Advertisers and partners
└── Outcome:         Improved advertiser experience
Credibility:    HIGH (specific metric, major brand)
```

**HERO FINCORP (75% STP, 30-Minute Approval)**

```
Company:        Hero FinCorp (India)
Industry:       Financial Services/NBFC
Products:       Agentforce for Loan Processing
Key Results:
├── STP:             75% straight-through processing
├── Approval Time:   30 minutes (from days)
├── Use Case:        Loan application processing
└── Region:          India
Credibility:    HIGH (specific operational metrics)
```

**FORMULA 1 (80% Faster Response)**

```
Company:        Formula 1
Industry:       Sports/Entertainment
Scale:          Global fanbase, 24 races annually
Products:       Agentforce for Fan Engagement
Key Results:
├── Response:        80% faster response times
├── Use Cases:       Fan queries, event info, merchandise
└── Channel:         Multi-channel fan support
Credibility:    HIGH (iconic brand, specific metric)
```

**GRUPO GLOBO (22% Retention Increase)**

```
Company:        Grupo Globo (Brazil)
Industry:       Media/Streaming
Scale:          Largest media company in Latin America
Products:       Agentforce for Churn Prevention
Key Results:
├── Retention:       +22% subscriber retention
├── Use Case:        Proactive churn intervention
├── Channel:         Streaming service support
└── Region:          Brazil/LATAM
Credibility:    HIGH (clear retention metric)
```

**CARNEGIE LEARNING (92% Research Time Reduction)**

```
Company:        Carnegie Learning
Industry:       EdTech
Products:       Agentforce for Sales Research
Key Results:
├── Research Time:   92% reduction in prospect research
├── Use Case:        Sales intelligence gathering
├── Function:        SDR/sales enablement
└── Outcome:         Faster sales cycles
Credibility:    HIGH (specific efficiency metric)
```

**NEXO (1,200+ Hours Saved)**

```
Company:        Nexo
Industry:       Crypto/FinTech
Products:       Agentforce for 24/7 Support
Key Results:
├── Hours Saved:     1,200+ hours annually
├── Availability:    24/7 automated support
├── Use Case:        Crypto platform support
└── Industry:        Cryptocurrency/blockchain
Credibility:    HIGH (specific hours metric)
```

**COLLEGE POSSIBLE (4x Student Capacity)**

```
Company:        College Possible
Industry:       Education/Non-Profit
Scale:          25,000+ students served
Products:       Agentforce Custom Agent
Key Results:
├── Capacity:        4x students served with same resources
├── Scale:           Expanded from 6,000 to 25,000+ students
├── Use Case:        College coaching and support
└── Mission:         First-generation college students
Credibility:    HIGH (clear mission impact metrics)
```

**CAPITA (24-Hour Time-to-Hire)**

```
Company:        Capita
Industry:       Recruitment/BPO
Scale:          Large-scale high-volume hiring
Products:       Agentforce for Recruitment
Key Results:
├── Time-to-Hire:    24 hours (from days/weeks)
├── Use Case:        High-volume recruitment automation
├── Function:        Candidate screening and processing
└── Industry:        Business process outsourcing
Credibility:    HIGH (specific operational improvement)
```

#### Tier 3: Emerging/Target-Based

**SHOE CARNIVAL (40% Target)**

```
Company:        Shoe Carnival
Industry:       Retail/Footwear
Products:       Agentforce Voice
Key Results:
├── Target:     40% of call volume
├── Escalation: 75% → 35% (target)
└── Status:     Implementation in progress
Credibility:    MEDIUM (targets, not actuals)
```

**HEALTHCARE PROVIDER (80% Manual Reduction)**

```
Company:        Anonymized Healthcare Provider
Products:       Agentforce
Key Results:
├── Eligibility:     Hours → Seconds
├── Prior-Auth:      +50% approval rate
├── Manual Work:     -80%
Credibility:    MEDIUM (anonymized)
```

**RETAIL COMPANY (Inventory Optimization)**

```
Company:        Anonymized Retailer
Products:       Agentforce Operations
Key Results:
├── Redistribution:  10 days → 1 hour (-99.6%)
├── Promotions:      1-2 days → 10 minutes
├── Losses:          $5.4M → $1.6M quarterly (-70%)
├── Revenue:         +23%
Credibility:    MEDIUM (anonymized, exceptional claims)
```

---

## Part 3: Salesforce ROI Model Analysis

### 3.1 Official Pricing Structure (as of Q3 2025)

#### Consumption-Based Options

| Model                | Price                    | Use Case        | Notes                                        |
| -------------------- | ------------------------ | --------------- | -------------------------------------------- |
| **Flex Credits**     | $500 per 100,000 credits | All agents      | 20 credits/standard action, 30 credits/voice |
| **Per Conversation** | $2 per conversation      | External-facing | 24-hour chat sessions                        |

#### Per-User Licensing

| Tier                        | Price           | Includes                                 |
| --------------------------- | --------------- | ---------------------------------------- |
| **Agentforce Add-ons**      | $125/user/month | Templates, automation, analytics         |
| **Agentforce Industries**   | $150/user/month | Industry-specific capabilities           |
| **Agentforce User License** | $5/user/month   | Requires Flex Credits purchase           |
| **Agentforce 1 Editions**   | $550/user/month | Full bundle + 1M Flex Credits + Data 360 |

#### Free Tier

- **Salesforce Foundations**: 200K Flex Credits, Agent Builder, Prompt Builder (no cost)

### 3.2 ROI Calculator Methodology

**Salesforce's official ROI calculator uses these key assumptions:**

#### Service Agent

```
Inputs Required:
├── Number of service reps
├── Average case volume
├── Average handle time (minutes)
├── Agent salary (assumes $100K fully loaded)

Assumptions:
├── Case deflection ramped: 70% → 85% → 100% of Year 3 target over 3 years
├── Cost per AI-handled case: ~$0.30
├── Work days: 260 annually per rep

Output:
├── FTE savings
├── Cost reduction
├── 3-year net benefit
```

#### SDR Agent

```
Inputs Required:
├── Number of SDRs
├── Email tasks per week
├── Leads processed

Assumptions:
├── Automation of 25% email tasks
├── 1 hour saved weekly per rep
├── Cost: ~$0.84 per lead (5-10 actions)
├── Engagement ramp: 50% → 75% → 100% over 3 years
├── SDR salary: $100,000 fully loaded

Output:
├── Hours saved
├── Lead engagement increase
├── Pipeline value
```

#### Sales Coach

```
Assumptions:
├── Manager salary: $100,000
├── 40 hours/week, 50 weeks
├── Cost: $0.10 per coaching conversation
├── Productivity improvement: 28% Year 1

Output:
├── Manager time saved
├── Rep performance improvement
```

#### Field Service Agent

```
Fixed Assumptions:
├── Cost per repeat service: $150
├── Technician salary: $60,000 fully loaded
├── Improvements ramped evenly

Output:
├── First-time-fix improvement
├── Travel time reduction
├── Repeat visit reduction
```

### 3.3 Critical Analysis of ROI Claims

#### What Salesforce's Model Gets Right ✅

1. **Consumption-Based Alignment**: Flex Credits tie cost to business value (pay per action)
2. **3-Year View**: Captures ramp-up period and compounding benefits
3. **Multiple Value Streams**: Covers deflection, productivity, revenue
4. **Realistic Ramp**: Acknowledges adoption curve (50%→75%→100%)

#### What's Missing or Concerning ⚠️

| Gap                               | Impact                                |
| --------------------------------- | ------------------------------------- |
| **Implementation Costs Excluded** | Understates true investment           |
| **Integration Complexity**        | Assumes seamless Salesforce ecosystem |
| **Data Quality Prerequisite**     | "Dirty data" cited as #1 barrier      |
| **Training/Adoption Costs**       | 60% cite lack of AI skills as barrier |
| **Maintenance Overhead**          | Ongoing tuning not modeled            |
| **Quality Trade-offs**            | CSAT impact rarely measured           |
| **Failure Scenarios**             | No risk modeling                      |

#### Validation Against Real-World Results

| Claim                | Calculator Assumption | Real-World Evidence             |
| -------------------- | --------------------- | ------------------------------- |
| Deflection Rate      | 60% default           | 30-85% observed (wide variance) |
| Cost per Interaction | $0.30/case            | $2/conversation pricing exists  |
| Time to Value        | 3-year ramp           | 12 days to 6 weeks deployment   |
| ROI                  | Varies by input       | 213% documented (Wiley)         |
| FTE Equivalent       | Calculated            | 5x team equivalent (Asymbl)     |

### 3.4 ROI Simulation: Sample Calculation

**Scenario: Mid-Market Service Team**

```
Inputs:
├── Service Reps:           25
├── Monthly Case Volume:    10,000
├── Average Handle Time:    12 minutes
├── Agent Salary:           $75,000 (fully loaded)
├── Target Deflection:      50% by Year 3

Year 1 Calculation:
├── Deflection Rate:        35% (70% of target)
├── Cases Deflected:        42,000 annually
├── Time Saved:             8,400 hours
├── FTE Equivalent:         4.0 FTEs
├── Labor Savings:          $300,000
├── Agentforce Cost:        $84,000 ($2/conv × 42,000)
├── Net Benefit Year 1:     $216,000

3-Year Projection:
├── Year 1:                 $216,000
├── Year 2:                 $336,000 (50% deflection)
├── Year 3:                 $420,000 (50% deflection + efficiency)
├── Total 3-Year Benefit:   $972,000
├── Estimated ROI:          ~150%

⚠️ Not Included:
├── Implementation:         $50,000-$200,000 (varies)
├── Training:               $25,000-$50,000
├── Integration:            $25,000-$100,000
├── Ongoing Tuning:         $30,000/year
```

---

## Part 4: Real-World vs. Claims Analysis

### 4.1 Resolution Rate Reality Check

| Source                       | Claimed/Target  | Evidence Level        |
| ---------------------------- | --------------- | --------------------- |
| **Salesforce Marketing**     | 85%+ autonomous | Unverified            |
| **Salesforce Customer Zero** | 85%             | First-party, detailed |
| **UK Police (Bobbi)**        | 82%             | Third-party validated |
| **Engie**                    | 83%             | SI partner documented |
| **1-800Accountant**          | 70%             | Peak period only      |
| **Wyndham**                  | 62%             | SI partner documented |
| **Typical Mid-Market**       | 30-50%          | Industry average      |

**Finding**: High performers achieve 70-85%, but require mature data infrastructure and narrow use cases. Typical deployments see 30-50%.

### 4.2 Deployment Speed Reality Check

| Company            | Claimed    | Context            |
| ------------------ | ---------- | ------------------ |
| Engine             | 12 days    | Fastest documented |
| Engie              | 3 weeks    | POC only           |
| Safari365          | 6 weeks    | Full deployment    |
| Fisher & Paykel    | <3 months  | Enterprise scale   |
| Typical Enterprise | 3-6 months | Industry standard  |

**Finding**: Rapid deployment (2-6 weeks) is possible for focused use cases. Enterprise-wide rollout typically takes 3-6 months.

### 4.3 Adoption Barriers (Real-World)

Per industry research:

- **60%** cite lack of AI skills and training as primary barrier
- **52%** say lack of knowledge is #1 obstacle
- **64%** don't have a clear data & AI roadmap
- Only **1%** consider their gen-AI rollout "mature"
- Organizations with clear data & AI roadmap are **2.7x more likely** to report positive ROI

### 4.4 What "Good" Looks Like

Based on case study analysis, successful Agentforce deployments share:

| Factor              | High Performers              | Strugglers          |
| ------------------- | ---------------------------- | ------------------- |
| Data Quality        | Clean, unified in Data Cloud | Dirty, siloed       |
| Use Case Scope      | Narrow, focused              | Boil-the-ocean      |
| Deployment Approach | Phased, iterative            | Big-bang            |
| Human-AI Balance    | Augmentation model           | Replacement mindset |
| Measurement         | Clear KPIs before launch     | Ad-hoc metrics      |
| Training Investment | Significant                  | Minimal             |

---

## Part 5: Agentforce Use Case Inventory by Industry

### 5.1 Financial Services

| Use Case           | Agent Type    | Example             | Expected Outcome            |
| ------------------ | ------------- | ------------------- | --------------------------- |
| Tax Support        | Service Agent | 1-800Accountant     | 70% autonomous during peak  |
| Loan Processing    | Custom        | Hero FinCorp        | 30-min approval, 75% STP    |
| Account Inquiries  | Service Agent | Various             | 50-70% deflection           |
| Lead Qualification | SDR Agent     | Salesforce internal | $1.7M pipeline from dormant |

### 5.2 Healthcare

| Use Case                  | Agent Type    | Example         | Expected Outcome   |
| ------------------------- | ------------- | --------------- | ------------------ |
| Eligibility Verification  | Service Agent | Anonymous payer | Hours → Seconds    |
| Prior Authorization       | Custom        | Anonymous payer | +50% approval rate |
| Patient Care Coordination | Custom        | Precina         | A1C 9.6→6.4        |
| Member Services           | Service Agent | Various         | 40-60% deflection  |

### 5.3 Retail

| Use Case               | Agent Type      | Example       | Expected Outcome              |
| ---------------------- | --------------- | ------------- | ----------------------------- |
| Customer Support       | Service + Voice | Shoe Carnival | 40% AI-handled target         |
| Inventory Optimization | Operations      | Anonymous     | 10 days→1 hour redistribution |
| Promotion Management   | Operations      | Anonymous     | 1-2 days→10 minutes           |
| Order Support          | Service Agent   | Various       | 30-50% deflection             |

### 5.4 Travel & Hospitality

| Use Case            | Agent Type    | Example   | Expected Outcome    |
| ------------------- | ------------- | --------- | ------------------- |
| Reservations        | Service Agent | Wyndham   | 62% automated       |
| Booking Support     | Service Agent | Engine    | 30% AI resolution   |
| Check-in/Out        | Custom        | Wyndham   | Automated           |
| Loyalty/Rewards     | Service Agent | Wyndham   | Automated queries   |
| Safari Coordination | Marketing/Ops | Safari365 | 30% efficiency gain |

### 5.5 Technology/SaaS

| Use Case           | Agent Type    | Example            | Expected Outcome        |
| ------------------ | ------------- | ------------------ | ----------------------- |
| Customer Support   | Service Agent | Salesforce         | 85% autonomous          |
| Internal Help Desk | Slack Agent   | Salesforce, Engine | 500K hours saved        |
| Sales Development  | SDR Agent     | Salesforce         | $1.7M pipeline          |
| Product Support    | Service Agent | Wiley              | 40% efficiency increase |

### 5.6 Energy/Utilities

| Use Case          | Agent Type    | Example | Expected Outcome    |
| ----------------- | ------------- | ------- | ------------------- |
| Billing Support   | Service Agent | Engie   | 83% user assistance |
| Balance Inquiries | Service Agent | Engie   | Instant responses   |
| Payment Updates   | Service Agent | Engie   | Self-service        |
| Clean Energy Info | Service Agent | Engie   | 24/7 availability   |

### 5.7 Government/Public Sector

| Use Case             | Agent Type    | Example         | Expected Outcome       |
| -------------------- | ------------- | --------------- | ---------------------- |
| Citizen Inquiries    | Service Agent | UK Police Bobbi | 82% resolution         |
| Tax Case Processing  | Custom        | IRS             | 98% manual reduction   |
| Administrative Tasks | Custom        | IRS             | 50K minutes/year saved |

---

## Part 6: Competitive Positioning

### 6.1 Agentforce vs. Key Competitors

| Dimension            | Agentforce          | ServiceNow Now Assist | Zendesk AI            | Intercom Fin   | Ada            |
| -------------------- | ------------------- | --------------------- | --------------------- | -------------- | -------------- |
| **Best For**         | Salesforce shops    | IT + Service          | Mid-market helpdesk   | PLG companies  | Multi-channel  |
| **Resolution Rate**  | 30-85%              | 45-80%                | 4-44%                 | 56-82%         | 50-84%         |
| **Deployment Speed** | 12 days - 3 months  | 4-6 weeks             | Days-weeks            | Days-weeks     | Days-weeks     |
| **Voice AI**         | Via partners        | Native                | Limited               | Via partners   | Yes            |
| **Pricing Model**    | Flex Credits + seat | Per user              | Per agent + AI add-on | Per resolution | Per resolution |
| **CRM Integration**  | Native (Salesforce) | Native (ServiceNow)   | Native + others       | Limited        | Multi-CRM      |
| **Enterprise Scale** | Very strong         | Very strong           | Good                  | Limited        | Good           |

### 6.2 When to Choose Agentforce

**Choose Agentforce When:**

- Existing Salesforce CRM investment
- Need multi-agent strategy (Service + Sales + Commerce)
- Enterprise scale requirements
- Complex CRM data context needed
- Budget for enterprise pricing

**Consider Alternatives When:**

- No Salesforce footprint (integration overhead)
- SMB budget constraints
- Voice-first requirements
- Need rapid standalone deployment
- Simple use case (over-engineered)

---

## Part 7: Key Takeaways

### 7.1 Validated Claims

✅ **85% autonomous resolution is achievable** - but only with mature data, focused use cases
✅ **Rapid deployment is possible** - 12 days to 6 weeks for focused implementations
✅ **Significant cost savings documented** - $230K-$575K annual savings in case studies
✅ **Capacity multipliers work** - 4-5x team equivalent proven
✅ **Healthcare outcomes beyond support** - A1C improvement, prior-auth acceleration

### 7.2 Overblown Claims

⚠️ **Universal 85% resolution** - Typical is 30-50%; 85% is exceptional
⚠️ **Immediate ROI** - 3-year ramp is more realistic
⚠️ **Plug-and-play simplicity** - Data quality, training, integration matter enormously
⚠️ **Cost savings without investment** - Implementation costs often excluded

### 7.3 Hidden Requirements

| Requirement              | Why It Matters                     |
| ------------------------ | ---------------------------------- |
| Clean Data Cloud data    | AI can't reason over garbage       |
| Clear use case scope     | Boil-the-ocean fails               |
| Change management        | 60% cite skills gap                |
| Ongoing tuning           | Models degrade without maintenance |
| Human escalation design  | Perfect autonomy is fiction        |
| SI partner consideration | PwC, Capgemini accelerate success  |

### 7.4 Recommended Evaluation Framework

1. **Assess data readiness** - Is Data Cloud populated with clean, unified customer data?
2. **Define narrow scope** - What ONE use case will you pilot first?
3. **Calculate true costs** - Include implementation, training, integration, maintenance
4. **Set realistic targets** - 30-50% deflection Year 1, not 85%
5. **Plan human escalation** - Design handoff experience upfront
6. **Budget for SI support** - Consider PwC, Slalom, Capgemini for enterprise
7. **Measure before/after** - Control group methodology recommended

---

## Part 8: Sources

### Primary Sources

- [Salesforce Agentforce ROI Calculator](https://www.salesforce.com/agentforce/ai-agents-roi-calculator/)
- [Salesforce Agentforce Pricing](https://www.salesforce.com/agentforce/pricing/)
- [Salesforce Agentforce Customer Stories](https://www.salesforce.com/agentforce/customer-stories/)
- [Salesforce Customer Zero Case Study](https://www.salesforce.com/news/stories/first-year-agentforce-customer-zero/)
- [Salesforce Agentforce Metrics](https://www.salesforce.com/agentforce/metrics/)

### Third-Party Analysis

- [Valantic: Agentforce Business Impact and ROI](https://www.valantic.com/en/blog/agentforce-salesforce-business-impact-and-roi/)
- [CX Today: 10 Agentforce Case Studies](https://www.cxtoday.com/crm/agentforce-case-studies/)
- [Accelirate: 5 Agentforce Case Studies](https://www.accelirate.com/agentforce-case-studies/)
- [Aquiva Labs: Measuring ROI for AI Agents](https://aquivalabs.com/blog/measuring-roi-for-ai-agents/)

### SI Partner Case Studies

- [PwC: Wyndham Agentic AI](https://www.pwc.com/us/en/library/case-studies/wyndham-agentic-ai.html)
- [Capgemini: Engie and Salesforce](https://www.capgemini.com/insights/expert-perspectives/recognized-for-innovation-capgeminis-trailblazing-work-with-engie-and-salesforce/)

---

_Database Created: 2026-01-20_
_Last Updated: 2026-01-20_
_Case Studies Analyzed: 28_
_Industries Covered: 10_
