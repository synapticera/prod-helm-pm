# Helm Buyer Analysis: The Underserved Mid-Market Service Executive

**Date:** January 10, 2026
**Purpose:** Analyze the buyer persona gap for mid-market Chief Customer Success Officers and Service Leaders who lack an "executive intelligence layer" above their operational tools
**Status:** Working hypothesis—requires customer validation

---

## Executive Summary

**The Hypothesis:** There's a significant buyer persona—the mid-market CCO/VP of Service—who:

- Has accountability for service outcomes (CSAT, NPS, retention, cost)
- Operates with siloed operational tools (Salesforce, Zendesk, etc.)
- Lacks an "executive layer" that provides decision visibility across systems
- Isn't served by enterprise data stacks (Snowflake, dbt) OR by their CRM's native dashboards
- Would pay for infrastructure that answers "why" not just "what"

**The Gap:** Enterprise companies build custom analytics and governance layers. SMBs don't need them. Mid-market ($10M-$500M revenue, 50-500 employees) is caught in the middle—accountable like enterprises but resourced like SMBs.

**Helm's Opportunity:** Position as the "executive intelligence layer" for service leaders who need to understand, govern, and improve decisions—without building a data team.

---

## Part 1: The Tool Landscape Gap

### What Mid-Market Service Leaders Have Today

| Tool Category          | Examples                                               | What It Does                                 | What It Doesn't Do                                    |
| ---------------------- | ------------------------------------------------------ | -------------------------------------------- | ----------------------------------------------------- |
| **CRM/Service Cloud**  | Salesforce Service Cloud, Zendesk, Freshdesk, Intercom | Case management, ticketing, routing, SLAs    | Explain WHY decisions are made, cross-system patterns |
| **Help Desk**          | Zendesk Support, Freshdesk, Help Scout                 | Ticket lifecycle, agent workflows, macros    | Decision governance, precedent tracking               |
| **Chatbots/AI Agents** | Intercom Fin, Zendesk AI, Ada, Forethought             | Deflection, auto-responses, intent detection | Decision traces, policy enforcement, audit trails     |
| **Analytics/BI**       | Salesforce Reports, Zendesk Explore, Metabase          | Dashboards, metrics, historical trends       | "Why" analysis, decision context, what-if planning    |
| **QA/Coaching**        | Klaus, MaestroQA, Scorebuddy                           | Agent performance scoring, coaching          | Process understanding, decision patterns              |

### The "Above the Tools" Layer: Who Has It?

| Segment                     | What They Do                          | How They Do It                                                            |
| --------------------------- | ------------------------------------- | ------------------------------------------------------------------------- |
| **Enterprise ($500M+)**     | Build custom decision/analytics layer | Snowflake + dbt + Looker + data engineering team (5-15 people, $1M+/year) |
| **Mid-Market ($10M-$500M)** | **Nothing**                           | Live with siloed tools, manual spreadsheets, gut feel                     |
| **SMB (<$10M)**             | Don't need it                         | Simple enough that CRM reporting suffices                                 |

### The Mid-Market Gap

**The mid-market CCO is stuck:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ENTERPRISE (Has This)                            │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  EXECUTIVE INTELLIGENCE LAYER                                 │  │
│  │  - Cross-system decision visibility                           │  │
│  │  - "Why" analysis and patterns                                │  │
│  │  - Policy governance and enforcement                          │  │
│  │  - What-if scenario planning                                  │  │
│  │  - Precedent tracking and learning                            │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                              ↑                                      │
│                    Built with: Snowflake + dbt + Looker             │
│                    Cost: $1M+/year + data team                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    MID-MARKET (Gap Here)                            │
│                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                 │
│  │  Salesforce │  │   Zendesk   │  │  AI Agent   │   ← Siloed      │
│  │  Service    │  │   Support   │  │  (Ada/Fin)  │                 │
│  │  Cloud      │  │             │  │             │                 │
│  └─────────────┘  └─────────────┘  └─────────────┘                 │
│                                                                     │
│  No executive layer. No cross-system view. No "why."               │
│  Just dashboards showing WHAT happened, not WHY.                    │
└─────────────────────────────────────────────────────────────────────┘
```

### What's Missing for the Mid-Market CCO

| Need                        | Current State                                  | Impact                                                      |
| --------------------------- | ---------------------------------------------- | ----------------------------------------------------------- |
| **Cross-system visibility** | Each tool has its own silo                     | Can't see full customer journey or decision patterns        |
| **Decision context**        | Tools track outcomes, not reasoning            | Can't explain why escalations happen or how to prevent them |
| **Policy governance**       | Rules scattered across tools, tribal knowledge | Inconsistent decisions, compliance risk                     |
| **Pattern recognition**     | Manual analysis in spreadsheets                | Slow, incomplete, not actionable                            |
| **AI governance**           | None                                           | When agents come, no infrastructure to manage them          |
| **Precedent library**       | Doesn't exist                                  | Every decision starts from scratch                          |

---

## Part 1B: Deep Dive on Specific Tool Limitations

### Salesforce Service Cloud Limitations

**Sources:** [eesel AI Service Cloud Overview](https://www.eesel.ai/blog/salesforce-service-cloud-overview)

| Limitation                        | Impact on Mid-Market CCO                                                                                                                                                                                  |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Steep learning curve**          | "You'll need a certified Salesforce administrator to set it up and keep it running"—creates ongoing operational dependencies that mid-market can barely afford                                            |
| **Hidden costs**                  | License fees ($25-$550/month per user) are "just the beginning"—implementation partners, developers, admin work, and paid add-ons make budgeting unpredictable                                            |
| **Long implementation**           | "A full Service Cloud implementation is a major project that can easily take months"—mid-market needs results in weeks, not quarters                                                                      |
| **Knowledge base constraints**    | "Salesforce Knowledge works best when all your information is already in Salesforce"—requires consolidating data from Confluence, Google Docs, Notion (a migration burden mid-market lacks resources for) |
| **Einstein AI prep requirements** | Needs "someone with special expertise, a ton of clean historical data, and a pretty long setup process"—most mid-market doesn't have clean historical data OR AI expertise                                |
| **Vendor lock-in**                | "Once you're all in on the Salesforce ecosystem, it can be really difficult and expensive to switch"—creates strategic risk                                                                               |

**The Core Gap:** Salesforce shows **what happened** (cases closed, SLAs met) but not **why decisions were made**. The reporting is powerful but fundamentally descriptive, not explanatory.

### Zendesk Limitations

**Sources:** [Swifteq Zendesk Reporting](https://swifteq.com/post/zendesk-reporting), [Zendesk AI Advanced Review](https://www.demeterict.com/en/zendesk-updates-en/zendesk-ai-agent-advanced-review-2025-features-pros-and-limitations/), [Desk365 Zendesk Features](https://www.desk365.io/blog/zendesk-features/)

| Limitation                   | Impact on Mid-Market CCO                                                                                                                                                                        |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Clunky reporting UI**      | "UI is clunky and difficult to learn for many users"—adoption barriers for teams trying to get insights                                                                                         |
| **Features behind paywalls** | "Advanced capabilities hidden behind permissions and gated behind higher level plans"—mid-market gets second-class analytics                                                                    |
| **Fragmented analytics**     | "Insights and Explore don't fully integrate"—users work across disconnected interfaces instead of unified view                                                                                  |
| **Single-system blind spot** | "Zendesk Explore does a great job analyzing data that lives inside Zendesk. But what about all the important info that lives everywhere else?"—can't see Confluence, Google Docs, Slack threads |
| **No agent effort tracking** | "Zendesk does not natively time an agent's on-ticket activity"—can't measure effort, only duration                                                                                              |
| **Unreliable data**          | User quote: "Getting reports is freaking difficult and many times it doesn't even show accurate, reliable data"                                                                                 |

**Zendesk AI Specific Limitations:**

| Limitation                             | Impact                                                                                                                                                                                  |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Can't answer from external sources** | "The AI can't answer questions if the information isn't in Zendesk. This leads to a ton of unnecessary escalations where the bot gives up just because it's looking in the wrong place" |
| **Rigid dialogue flows**               | "The Dialogue Builder locks you into creating very rigid, rule-based flows. If a customer's question doesn't fit perfectly into one of your pre-made paths, the experience feels stiff" |
| **No pre-deployment testing**          | "There isn't a good way to simulate how the AI will perform across thousands of your past tickets before you let it loose on live customers"—creates risk                               |
| **Struggle with emotional cases**      | "For highly nuanced, ambiguous or emotional (complaints, escalations) cases the bot may still struggle"—exactly when decision context matters most                                      |
| **Heavy setup required**               | "While Zendesk markets that you can launch in minutes, the reality for meaningful performance will require setup time, cross-team collaboration (CS, IT, product, content)"             |

**The Core Gap:** Zendesk is a ticket management system, not a decision intelligence platform. It tracks **ticket state** but not **decision reasoning**. When the AI escalates, it can't explain why in terms the CCO can act on.

### The Cross-System Problem (Neither Tool Solves)

**Sources:** [Zoom CX Trends 2026](https://www.zoom.com/en/blog/customer-experience-trends/), [CX Today Strategy Guide](https://www.cxtoday.com/contact-center/how-to-build-a-winning-customer-experience-strategy-in-2026/)

| Reality                             | Industry Data                                                                                                                                                                         |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Siloed data is the #1 problem**   | "Without unified data, organizations cannot deliver consistent, personalized experiences customers expect or leverage AI effectively"                                                 |
| **Service data underutilized**      | "Organizations will realize that service data is no longer just operational—it's the foundation for predictive customer insights, churn prevention, and cross-sell opportunities"     |
| **Most companies still at basics**  | "Customer analytics has evolved from descriptive reporting to predictive and prescriptive intelligence—however, most organizations are still struggling with the descriptive aspects" |
| **Journey analytics still nascent** | "Traditional analytics can't keep up with customer expectations; they capture isolated actions or feedback, but rarely reveal the full story"                                         |

**Key Stat:** "Over 90% of IT and CX leaders say interaction analytics is among the most valuable data in their companies, and 84% believe it should inform enterprise-wide dashboards for decision-making."

**The Implication:** Leaders KNOW they need cross-system decision visibility. They just don't have a tool that provides it without building an enterprise data stack.

### What Would Close the Gap

Based on the tool analysis, mid-market CCOs need:

| Capability                     | Why Current Tools Fail                            | What Helm Could Provide                                                       |
| ------------------------------ | ------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Cross-system decision view** | Salesforce sees Salesforce; Zendesk sees Zendesk  | Single view across all service systems + context from Slack, Confluence, etc. |
| **"Why" analysis**             | Tools show outcomes, not reasoning                | Decision traces that capture inputs, logic, exceptions                        |
| **Pre-built, no data team**    | Both require specialists to set up analytics      | Out-of-box insights without Salesforce admin or data engineers                |
| **AI governance ready**        | Neither tracks why AI escalates or how to improve | Decision traces for agents (human AND AI) with audit capability               |
| **Fast time-to-value**         | Salesforce: months; Zendesk: weeks for basics     | Insights in days, not months                                                  |
| **Affordable for mid-market**  | Enterprise features at enterprise prices          | Mid-market pricing without feature gating                                     |

---

## Part 1C: Competitive Landscape Deep Dive

### The Competitive Map for Mid-Market Service Intelligence

**Key Insight:** No single platform exists that provides "executive intelligence layer" capabilities for mid-market service leaders. The market is fragmented across adjacent categories, each with significant limitations.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        COMPETITIVE LANDSCAPE MAP                                 │
│                                                                                  │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                    ENTERPRISE ONLY ($200K+/year)                          │   │
│  │  Qualtrics XM • Medallia • Gainsight • Adobe Experience Cloud            │   │
│  │  → Mid-market priced out; require dedicated teams to operate             │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                                                                  │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                    CUSTOMER SUCCESS PLATFORMS ($30-70K/year)              │   │
│  │  ChurnZero • Totango/Catalyst • Custify                                  │   │
│  │  → Health scores & churn prediction, NOT decision intelligence           │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                                                                  │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                    CONVERSATION INTELLIGENCE ($50-150K/year)              │   │
│  │  CallMiner • Observe.AI • Balto • Level AI                               │   │
│  │  → Call/chat analytics, NOT cross-system decision context                │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                                                                  │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                    QA/COACHING TOOLS ($15-40K/year)                       │   │
│  │  Klaus • MaestroQA • Scorebuddy                                          │   │
│  │  → Agent scoring, NOT decision reasoning or governance                   │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                                                                  │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                    THE GAP: EXECUTIVE DECISION LAYER                      │   │
│  │  ┌────────────────────────────────────────────────────────────────────┐  │   │
│  │  │  HELM OPPORTUNITY                                                  │  │   │
│  │  │  • Cross-system decision visibility                                │  │   │
│  │  │  • "Why" analysis (not just "what")                               │  │   │
│  │  │  • AI governance infrastructure                                    │  │   │
│  │  │  • Mid-market pricing ($24-60K/year)                              │  │   │
│  │  └────────────────────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Category 1: Enterprise Experience Platforms (Too Expensive for Mid-Market)

**Sources:** [SelectHub Qualtrics vs Medallia](https://www.selecthub.com/experience-management-software/qualtrics-vs-medallia/), [Zonka Qualtrics Alternatives](https://www.zonkafeedback.com/blog/qualtrics-alternatives-and-competitors)

| Platform                   | What It Does                                                                               | Why Mid-Market Can't Use It                                                                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Qualtrics XM**           | Enterprise-grade experience management with deep analytics (Text iQ, Predict iQ, Stats iQ) | Pricing not published but enterprise-scale; "steep learning curve and higher price point" are barriers; requires "deep learning curve" and technical expertise       |
| **Medallia**               | Real-time feedback capture, predictive analytics, workflow automation                      | "Integrating Medallia with other systems can be complex and may require additional technical expertise"; UI "can feel overwhelming due to the platform's complexity" |
| **Adobe Experience Cloud** | All-in-one digital experience platform                                                     | Pricing scales for "mid-market to large enterprises adopting multiple solutions"—prohibitive for mid-market                                                          |

**The Gap:** These platforms are built for Fortune 500 companies with dedicated analytics teams. A mid-market CCO with 50 agents doesn't have the budget, staff, or time to implement them.

### Category 2: Customer Success Platforms (Wrong Problem)

**Sources:** [Axis Intelligence Platform Testing](https://axis-intelligence.com/ai-powered-customer-success-platforms-2025/), [CS Cafe Platform Guide](https://www.thecscafe.com/p/best-customer-success-platforms), [Avoma Gainsight vs ChurnZero](https://www.avoma.com/blog/gainsight-vs-churnzero)

| Platform             | Pricing                                             | What It Does                                                          | What It Doesn't Do                                                                                                        |
| -------------------- | --------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Gainsight**        | $67K avg/year (quoted at $30K but actual is higher) | Health scores, playbooks, customer journey tracking, churn prediction | Decision context across systems; "ease-of-use does not appear to be their main draw"; admin features are "click heavy"    |
| **ChurnZero**        | ~$30K/year + $1,400/CSM                             | Real-time churn detection, automated playbooks, customer segmentation | "Reporting capabilities feel dated"; "analytics require significant manual work"; no cross-system decision visibility     |
| **Totango/Catalyst** | ~$58K avg/year                                      | Modular "SuccessBLOC" approach, expansion opportunity identification  | "Modularity can feel disjointed"; "creating complex custom reports can be challenging"; predictive analytics "lag behind" |
| **Custify**          | Lower price point                                   | Basic health scores, automated workflows                              | Limited to core CS features; lacks advanced decision intelligence                                                         |

**Key Finding from Testing:** "Companies that tried to save money on implementation consistently struggled with adoption and ROI." Budget 40-60% of platform costs for professional services in year one.

**The Gap:** These platforms are optimized for _customer success managers_ tracking account health, not _service leaders_ understanding why decisions are made. They measure churn risk, not decision patterns.

### Category 3: Conversation Intelligence (Single Channel, Not Decision Layer)

**Sources:** [MiaRec Market Guide](https://www.miarec.com/conversation-intelligence-market-guide), [MiaRec Pricing Blog](https://blog.miarec.com/conversation-intelligence-auto-qa-pricing), [CallMiner vs Observe.AI](https://callminer.com/compare/callminer-vs-observe-ai)

| Platform             | Pricing                                       | What It Does                                                                        | What It Doesn't Do                                                                              |
| -------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **CallMiner Eureka** | $89/user/mo for QA; custom enterprise pricing | 100% call analysis, sentiment detection, CallMiner GPT for natural language queries | Limited to voice/text; doesn't connect to CRM, knowledge base, or cross-system context          |
| **Observe.AI**       | $100-500 range                                | Voice AI agents, real-time assistance, post-interaction QA                          | "Accuracy issues and data analysis inconsistencies reported"; limited to contact center channel |
| **Balto**            | Custom pricing (contact sales)                | Real-time agent guidance, live coaching alerts, automated QA                        | Focus on in-call guidance, not post-decision analysis or cross-system visibility                |
| **Level AI**         | Custom pricing                                | GenAI-powered conversation intelligence, quality assurance                          | Single-channel focus; doesn't address service decision governance                               |

**Forrester Recognition (Q2 2025):** CallMiner was recognized in The Forrester Wave™ for Conversation Intelligence Solutions—but the category is defined narrowly around contact center calls, not enterprise decision visibility.

**The Gap:** These tools analyze conversations, not decisions. They can tell you WHAT was said, but not WHY that resolution was chosen, what policy it followed, or how it connects to other systems.

### Category 4: QA/Coaching Tools (Agent Performance, Not Decision Intelligence)

| Platform       | Pricing       | What It Does                                         | What It Doesn't Do                                           |
| -------------- | ------------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| **Klaus**      | ~$15-25K/year | Agent QA scoring, coaching workflows, feedback loops | Scores agents, doesn't capture decision context or precedent |
| **MaestroQA**  | ~$20-40K/year | QA automation, root cause analysis, calibration      | Process compliance focus, not decision reasoning             |
| **Scorebuddy** | ~$10-20K/year | Quality monitoring, agent scorecards                 | Limited to agent evaluation                                  |

**The Gap:** QA tools measure whether agents followed the script, not whether the decision itself was correct or how to improve decision-making at scale.

### Category 5: Decision Intelligence Platforms (Enterprise-Only, Wrong Domain)

**Sources:** [Domo Decision Intelligence](https://www.domo.com/learn/article/decision-intelligence-platforms), [Grand View Research](https://www.grandviewresearch.com/industry-analysis/decision-intelligence-market-report)

| Platform                    | Focus Area                                                                     | Why Not for Mid-Market Service                                                       |
| --------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| **Pyramid Analytics**       | Business intelligence, no-code analytics                                       | General BI, not service-specific; "Large Enterprises, Mid Size Business" but generic |
| **Circuitry.ai**            | Field service decision intelligence (first-time fix, parts matching, warranty) | Industrial/field service focused, not customer service/support                       |
| **Aera Technology**         | Supply chain and inventory optimization                                        | Wrong domain entirely                                                                |
| **Vianai/TATA Partnership** | C-suite enterprise data interaction via GenAI                                  | Enterprise-only partnership model                                                    |

**Market Size Context:** Decision intelligence market is $17.5B in 2025 growing to $36-50B by 2030—but almost none of this is focused on customer service decision-making for mid-market.

### Category 6: Native CRM Analytics (Already Covered in Part 1B)

| Platform                          | Limitation Summary                                                                              |
| --------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Salesforce Reports/Dashboards** | Shows WHAT happened, not WHY; requires admin expertise; single-system view                      |
| **Zendesk Explore**               | "Clunky and difficult to learn"; features gated behind higher plans; can't see external systems |
| **Freshdesk Analytics**           | Basic reporting; no cross-system capability                                                     |
| **Intercom Reporting**            | Limited to Intercom interactions; no decision context                                           |

### Why the Gap Exists: Market Dynamics

**1. Enterprise platforms went upmarket:**

> "Large enterprises typically have vast amounts of customer data collected from various touchpoints... CIP solutions help these enterprises consolidate and analyze this data to gain a 360-degree view." —Grand View Research

The big platforms (Qualtrics, Medallia, Gainsight) optimized for $500M+ companies with dedicated analytics teams. They didn't build for the CCO with no data engineers.

**2. Point solutions stayed narrow:**
Conversation intelligence stayed in the contact center. QA tools stayed in agent coaching. Customer success platforms stayed in churn prediction. No one unified the decision layer.

**3. Mid-market was left with DIY:**

> "Small and medium enterprises increasingly adopt cloud services because subscription models remove large capital outlays... annual technology spending for many SMEs falls between USD 10,000 and USD 49,000." —Industry Research

But there's no "decision layer" SaaS product in that price range. Mid-market CCOs either build spreadsheets or do without.

### The AI Governance Gap (Emerging Competitive Dimension)

**Sources:** [CX Today AI Trends](https://www.cxtoday.com/crm/cx-trends-2026-customer-data/), [Zendesk CX Trends 2026](https://www.zendesk.com/blog/zip1-cx-trends-2026-contextual-intelligence/)

**Industry Signal:**

> "AI governance will shift from a checkbox exercise to a core buying criterion... Buyers want systems that provide audit trails, explainable decisions, and full accountability for every AI driven action. In 2026, vendors that can't show how their AI works won't make it past procurement." —Tim Banting, TechTelligence

**Current State:**

- 95% of consumers expect an explanation for AI-made decisions
- 79% say plain-language reasoning is important
- 80% of CX leaders agree AI transparency will be required within two years

**Who Provides AI Governance Today?**

| Category                  | AI Governance Capability                              |
| ------------------------- | ----------------------------------------------------- |
| CRM platforms             | None—they're adding AI agents but not governance      |
| CS platforms              | Churn prediction explainability, not agent governance |
| Conversation intelligence | Call-level AI insights, not decision governance       |
| QA tools                  | Agent scoring, not AI agent supervision               |
| Decision intelligence     | Enterprise-only, wrong domain                         |

**The Gap:** When mid-market companies deploy AI agents (Zendesk AI, Intercom Fin, etc.), they have no infrastructure to govern them. The governance layer doesn't exist at mid-market price points.

### Competitive Positioning Summary

| Competitive Alternative         | What They Do                   | Where Helm Wins                                                  |
| ------------------------------- | ------------------------------ | ---------------------------------------------------------------- |
| **Qualtrics/Medallia**          | Enterprise XM                  | Mid-market pricing; no data team required                        |
| **Gainsight/Totango/ChurnZero** | Customer success (churn focus) | Decision context vs. health scores; cross-system vs. single view |
| **CallMiner/Observe.AI/Balto**  | Conversation analytics         | Cross-system decisions vs. single-channel calls                  |
| **Klaus/MaestroQA**             | Agent QA                       | Decision reasoning vs. performance scoring                       |
| **Salesforce/Zendesk native**   | CRM reporting                  | "Why" analysis vs. "what" dashboards; cross-system visibility    |
| **Build-your-own (Snowflake)**  | Data warehouse                 | Weeks vs. months; no engineers required                          |
| **Do nothing (spreadsheets)**   | Manual reconciliation          | Automated, real-time, comprehensive                              |

### Helm's Differentiated Position

**The only platform purpose-built for:**

1. **Mid-market price point** ($24-60K/year vs. $67K+ for Gainsight or enterprise pricing for Qualtrics)
2. **Service decision visibility** (not churn scores, not call analytics, not QA)
3. **Cross-system context** (connects Salesforce + Zendesk + AI agents + knowledge sources)
4. **"Why" not "what"** (decision traces, not just metrics)
5. **AI governance ready** (built-in infrastructure for agent supervision)
6. **No data team required** (out-of-box insights vs. months of implementation)

---

## Part 2: The Buyer Persona

### Primary Persona: The Mid-Market Chief Customer Success Officer

**Title Variations:**

- Chief Customer Success Officer (CCO/CCSO)
- VP of Customer Success
- VP of Customer Service / Service Operations
- SVP Customer Experience
- Head of Customer Support
- Director of Service Delivery (reports to CCO or COO)

**Company Profile:**

- **Revenue:** $10M - $500M ARR
- **Employees:** 50 - 500 total
- **Service Team:** 10 - 100 agents/CSMs
- **Industry:** B2B SaaS, Fintech, Healthcare SaaS, Professional Services, E-commerce
- **Stage:** Series B through pre-IPO, or established private companies

### Day-in-the-Life Pain Points

**Morning: The Dashboard Scramble**

> "I open Salesforce, Zendesk, and three spreadsheets to understand what happened yesterday. None of them agree on the numbers. I spend 2 hours just getting a coherent picture before my 9am exec meeting."

**Mid-day: The Escalation Fire Drill**

> "A VIP customer escalated to the CEO. I need to know: What happened? Why did we make that decision? What's the pattern here? I'm digging through case notes, Slack threads, and asking agents to reconstruct the story. There's no single source of truth."

**Afternoon: The AI Question**

> "Leadership wants to know when we're deploying AI agents. I have no idea how to govern them. Our current tools don't even tell me how humans make decisions—how would I supervise an AI?"

**Weekly: The Metrics Meeting**

> "I report CSAT, NPS, AHT, cost-per-contact. Everyone nods. But when someone asks 'why did CSAT drop 3 points this month?' I can't give a real answer. I have correlations, not causation."

**Quarterly: The Budget Battle**

> "I need to justify headcount and tool spend. But I can't prove ROI on anything because I can't connect decisions to outcomes. Every budget cycle is a negotiation, not a data-driven conversation."

### Psychographic Profile

| Dimension                    | Description                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------ |
| **Accountability**           | High. Owns NPS, CSAT, retention, churn. Board-visible metrics.                 |
| **Technical Sophistication** | Medium. Can use tools, not build them. Won't write SQL or hire data engineers. |
| **Time Pressure**            | Extreme. Running a team, managing escalations, attending exec meetings.        |
| **Tool Fatigue**             | High. Has 5-10 tools already. Doesn't want another dashboard.                  |
| **AI Anxiety**               | Growing. Knows AI is coming. Doesn't know how to prepare.                      |
| **Budget Authority**         | $50K-$500K discretionary. Needs C-suite approval for more.                     |

### Buying Triggers

**Reactive Triggers (Pain-driven):**

1. Major customer escalation that exposed decision-making gaps
2. Failed AI pilot that lacked governance infrastructure
3. Audit or compliance request they couldn't answer
4. Board/investor question about service efficiency they couldn't explain
5. Key agent/manager quit and took tribal knowledge with them

**Proactive Triggers (Opportunity-driven):**

1. Mandate to deploy AI agents in 2026
2. New CCO/VP hired who wants visibility from day one
3. PE or strategic acquirer doing due diligence
4. Expansion into regulated industry (healthcare, financial services)
5. Customer success becoming revenue center (expansion, upsell accountability)

### What They're NOT Looking For

| They Don't Want                | Why                                                         |
| ------------------------------ | ----------------------------------------------------------- |
| Another dashboard              | Already have too many; dashboards show WHAT not WHY         |
| Data warehouse project         | Don't have engineers; 6-12 month implementation is too slow |
| Point solution for one problem | Need integrated view across systems                         |
| Generic AI agent               | Already evaluating Zendesk AI, Intercom Fin, etc.           |
| Consulting engagement          | Need product, not services                                  |

### What They ARE Looking For

| They Want                  | Why                                                |
| -------------------------- | -------------------------------------------------- |
| Single view across systems | Tired of reconciling silos                         |
| "Why" not just "what"      | Need to explain decisions, not just report metrics |
| Ready for AI governance    | Know agents are coming; need infrastructure first  |
| Fast time-to-value         | Can't wait 6-12 months; need results in weeks      |
| Doesn't require data team  | Not hiring engineers for this                      |

---

## Part 3: Validation Assumptions

### Core Assumptions to Test

| #      | Assumption                                            | How to Validate                                                                                    | Signal of Truth                             |
| ------ | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| **A1** | Mid-market CCOs lack cross-system decision visibility | Interview: "Walk me through how you understand what happened yesterday"                            | They describe manual, fragmented process    |
| **A2** | They can't answer "why" questions about decisions     | Interview: "When CSAT drops, how do you figure out why?"                                           | They describe correlation, not causation    |
| **A3** | AI governance is a growing anxiety                    | Interview: "What's your plan for governing AI agents?"                                             | They express uncertainty or concern         |
| **A4** | They would pay for an "executive layer"               | Interview: "If you could see all decisions across systems with context, what would that be worth?" | They express concrete value                 |
| **A5** | Current tools don't solve this                        | Interview: "Why doesn't Salesforce/Zendesk solve this for you?"                                    | They identify specific gaps                 |
| **A6** | Enterprise solutions are out of reach                 | Interview: "Have you considered Snowflake/data warehouse?"                                         | They cite cost, complexity, or lack of team |

### Interview Questions Framework

**Opening (Warm-up):**

1. "Tell me about your role and team structure."
2. "What tools do you use to manage service operations today?"
3. "How do you typically start your day—what do you look at first?"

**Pain Exploration:** 4. "Walk me through the last time you had a major customer escalation. How did you figure out what happened?" 5. "When a metric like CSAT or NPS changes, how do you understand why?" 6. "How do you ensure your team makes consistent decisions across similar situations?" 7. "What happens when a key agent or manager leaves? How do you preserve their knowledge?"

**Tool Gap:** 8. "What's the biggest limitation of your current service tools?" 9. "Have you considered building a data warehouse or analytics layer? What stopped you?" 10. "Do your tools today help you understand WHY decisions are made, or just WHAT happened?"

**AI Readiness:** 11. "What's your timeline for deploying AI agents in service?" 12. "When you think about AI making decisions for your team, what concerns you most?" 13. "How would you govern an AI agent today with your current tools?"

**Value/Budget:** 14. "If you could have complete visibility into decisions across all your systems—with context on why decisions were made—what would that be worth to your organization?" 15. "What budget authority do you have for tools like this?" 16. "Who else would need to approve a purchase in this category?"

### Success Criteria for Validation

**Strong Signal (Proceed with Confidence):**

- 7+ of 10 interviewees describe fragmented, manual process for understanding decisions
- 6+ of 10 express concrete anxiety about AI governance
- 5+ of 10 articulate specific value ($X/year or equivalent) for decision visibility
- 0-1 mention a current tool that solves this problem

**Weak Signal (Pivot or Dig Deeper):**

- <5 of 10 describe the pain compellingly
- Most say "Salesforce reporting is fine for us"
- AI governance is not top-of-mind concern
- No clear willingness to pay

**Disconfirming Signal (Rethink Hypothesis):**

- Most say they've already solved this with existing tools
- Mid-market doesn't have this problem (only enterprise)
- The persona doesn't have budget authority
- Pain is real but not urgent enough to buy

---

## Part 4: Helm Positioning for This Buyer

### The Core Message

**For Mid-Market CCOs who are accountable for service outcomes but lack visibility into decisions:**

> **Helm is the executive intelligence layer that sits above your service tools—giving you the "why" behind decisions, not just the "what."**
>
> While your CRM tracks cases and your help desk tracks tickets, Helm captures the decision context: why did we escalate? what pattern is emerging? what should we do differently?
>
> And when AI agents arrive, Helm is the governance infrastructure that makes them work.

### Positioning Statement

**For:** Mid-market Chief Customer Success Officers and Service Leaders
**Who:** Are accountable for CSAT, NPS, retention, and cost
**The Problem:** Current tools (Salesforce, Zendesk, etc.) show WHAT happened but not WHY decisions were made
**Helm Is:** The executive intelligence layer that captures decision context across systems
**That:** Enables service leaders to understand patterns, govern agents, and improve outcomes
**Unlike:** Dashboards that show metrics, or enterprise data stacks that require engineering teams
**Helm:** Delivers decision visibility in weeks, not months, without a data team

### Messaging by Pain Point

| Pain Point                | Message                                                                                                                      |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Siloed tools**          | "Helm connects the dots across Salesforce, Zendesk, and your AI agents—so you see the full picture, not fragments."          |
| **Can't explain "why"**   | "When CSAT drops, Helm shows you why—not just correlations, but the actual decisions that drove the outcome."                |
| **AI anxiety**            | "AI agents are coming. Helm is the governance layer that makes them work—policy enforcement, decision traces, audit trails." |
| **No data team**          | "Helm is built for service leaders, not data engineers. Set up in days, insights in weeks."                                  |
| **Tribal knowledge loss** | "When your best agents leave, their knowledge stays. Helm captures decision patterns as a permanent asset."                  |

### Value Proposition by Stakeholder

**For the CCO/VP Service:**

> "Finally understand why your team makes decisions—and be ready when AI takes over. Helm gives you the executive view you've been building in spreadsheets."

**For the CFO:**

> "Justify service investments with decision data, not anecdotes. Helm proves ROI by connecting decisions to outcomes."

**For the CTO/CIO:**

> "Helm integrates with your existing stack—no data warehouse required. AI governance built-in for what's coming."

**For the CEO:**

> "When the board asks about service efficiency and AI readiness, have an answer. Helm is the infrastructure that makes service leadership accountable."

### Competitive Differentiation

| Alternative                | Why Helm Wins                                                                         |
| -------------------------- | ------------------------------------------------------------------------------------- |
| **Salesforce Dashboards**  | Dashboards show WHAT happened. Helm shows WHY decisions were made.                    |
| **Zendesk Explore**        | Single-system view. Helm provides cross-system decision visibility.                   |
| **Snowflake + dbt**        | Requires data team, 6-12 month implementation. Helm works in weeks with no engineers. |
| **QA Tools (Klaus, etc.)** | Scores agent performance. Helm captures decision patterns and context.                |
| **AI Agents (Fin, Ada)**   | Execute decisions. Helm governs how decisions should be made.                         |

### The "Above the Tools" Positioning

**Visual Concept:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                         HELM                                        │
│         The Executive Intelligence Layer for Service                │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  • Cross-system decision visibility                           │  │
│  │  • "Why" context on every decision                            │  │
│  │  • Policy governance and enforcement                          │  │
│  │  • AI agent supervision and audit                             │  │
│  │  • Precedent library for learning                             │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                              ↑                                      │
│                      Sits ABOVE your tools                          │
└─────────────────────────────────────────────────────────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        ↓                      ↓                      ↓
┌─────────────┐        ┌─────────────┐        ┌─────────────┐
│  Salesforce │        │   Zendesk   │        │  AI Agents  │
│  Service    │        │   Support   │        │  (Fin/Ada)  │
│  Cloud      │        │             │        │             │
└─────────────┘        └─────────────┘        └─────────────┘
```

---

## Part 5: Go-to-Market Implications

### Target Account Profile

**Ideal Customer:**

- **Revenue:** $25M - $200M ARR (sweet spot within mid-market)
- **Service Team:** 20-75 agents/CSMs
- **Tools:** Salesforce Service Cloud or Zendesk + considering AI agents
- **Trigger:** New CCO hired, AI mandate, recent escalation crisis, or PE ownership
- **Industry:** B2B SaaS, Fintech, Healthcare SaaS

**Why This Profile:**

- Large enough to have decision complexity
- Small enough to lack enterprise data stack
- Sophisticated enough to understand value
- Funded enough to pay for solution

### Channel Strategy

**Primary:** Direct sales to CCO/VP Service

- LinkedIn targeting by title and company size
- Industry events (CCO/CX conferences)
- Referrals from Salesforce/Zendesk partner ecosystem

**Secondary:** Product-led growth via "decision audit"

- Free assessment: "See your decision visibility gaps"
- Generates leads and demonstrates value before purchase

### Pricing Hypothesis

**Model:** Per-seat or per-decision-volume
**Range:** $2K-$10K/month for mid-market (team of 20-75)
**Justification:** Less than hiring one analyst ($80K/year) to build spreadsheets

### Success Metrics

**For Helm (Business):**

- Pipeline from mid-market CCO persona
- Win rate vs. "do nothing" or "spreadsheets"
- Time-to-value (first insight delivered)

**For Customer (Value Delivered):**

- Time saved on decision analysis (hours/week)
- Escalations explained in minutes vs. hours
- AI governance readiness score
- Decision consistency improvement

---

## Next Steps

### Immediate (This Week)

- [ ] Identify 10 mid-market CCOs for validation interviews
- [ ] Draft interview script based on questions framework
- [ ] Schedule first 3 interviews

### Short-term (Next 2 Weeks)

- [ ] Complete 10 validation interviews
- [ ] Score against validation criteria
- [ ] Update this document with findings

### Decision Point (Week 3)

- [ ] If strong signal: Refine positioning and proceed with GTM
- [ ] If weak signal: Dig deeper on specific pain points
- [ ] If disconfirming: Revisit buyer hypothesis

---

## Document History

| Date       | Update                                 |
| ---------- | -------------------------------------- |
| 2026-01-10 | Initial draft—hypothesis and framework |

---

**Document Status:** Working Hypothesis
**Owner:** Strategic Planning
**Next Review:** After validation interviews complete
