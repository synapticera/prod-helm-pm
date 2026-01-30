# Helm Knowledge Base - Context for Claude

## Product Overview

### Product Name Evolution
- **Agentfinder** → **Miner** → **EVOLVE** → **Helm** (current)
- **EVOLVE** was the primary brand name immediately before Helm
- Most business plan documents use "EVOLVE" branding
- **Helm** represents a focused positioning on customer service executive command center

### Core Positioning - Helm (Current)

**Last Updated:** January 2, 2026 - Based on AARP Conversation Presentation (December 18, 2025)

**Helm** is an AI-native executive command center that gives service leaders the tailored insight they need to evolve their operations with confidence and impact.

**Key Concept:** Fills the gap between operational tools and strategic decision-making. Not execution tools, but decision intelligence - the layer that shows executives what they can't see so they can act on what matters.

**One-liner:** "Helm is the AI command center that shows customer service leaders what they can't see — so they can act on what matters."

**Target Audience:**
- Service executives facing transformation challenges
- Customer service leaders with blind spots in execution or strategy
- CS leaders navigating AI adoption and transformation
- Executives needing strategic clarity across domains

**Value Proposition:**
- **Full Command:** Provides context across domains (Systems, Process, Data, Team, Financials) and horizons (short-term operations + long-term strategy)
- **Executive Co-Pilot:** One view of what's happening and one clear answer: what to do next
- **AI-Native Advantage:** Speed, adaptability, depth of insight, self-learning capabilities
- **Confidence & Impact:** Enable leaders to make decisions with certainty and drive meaningful results
- **Command Layer:** Sits above CRM, ticketing, workforce management, analytics - connecting the dots

### Core Positioning - EVOLVE (Platform Brand)

**EVOLVE** is positioned as "The Agent Assurance & ROI Platform" - the first platform to combine process mining, task mining, org mining, and agent observability.

**One-sentence pitch:** "EVOLVE is the first Agent Assurance & ROI platform that combines process mining, task mining, org mining, and agent observability to show companies exactly what to automate, prove the ROI, and continuously ensure AI agents are delivering value."

**Key Differentiators:**
- **Four Intelligence Layers** (unique integration):
  1. **Process Mining**: Workflow intelligence
  2. **Task Mining**: What people actually do (edge-first, privacy-preserving)
  3. **Org Mining**: System configuration & tech debt (Salesforce Org MRI - unique)
  4. **Agent Observability**: AI agent performance & ROI (AgentOps Flight Recorder)

**Go-to-Market Wedge:**
- Salesforce Service Cloud SMBs via AppExchange
- 44K-51K companies, $5.4B TAM
- Weak competition in this segment

**Unique Assets:**
- **EVOLVE Transformation Score**: "FICO score for agent readiness"
- **Salesforce Org MRI**: System health and tech debt analysis
- **AgentOps Flight Recorder**: Agent performance monitoring

## Product Architecture

### The Problem: AI ROI Crisis

**Statistics Driving Urgency:**
- **95%** of AI pilots deliver zero ROI (MIT)
- **85%** of AI projects fail before proving value (Gartner)
- **78%** using AI see no bottom-line impact (McKinsey)

**Root Cause:** No one has **"Full Command"**
- **Horizons Challenge:** Short-term operations vs. long-term strategy disconnect
- **Domains Challenge:** Siloed view across Systems, Process, Data, Team, Financials
- **Result:** Powerful AI transformation requires broad command to connect the dots across domains and over time

### Four-Module Transformation Framework (Latest - Dec 2025)

Helm guides executives through every stage of the AI transformation process:

#### 1. **EXPLORE** (Free - Self-Service)
**Purpose:** Learn and understand AI landscape in customer service

**Capabilities:**
- AI in Customer Service primer
- Industry metrics, benchmarks and best practices
- Generic roadmaps and action plans
- Q&A with the Helm agent

**Pricing:** No charge, self-service, email address only
**Target:** Individual contributors, managers, early explorers

---

#### 2. **MINE** (Paid Service - One-Time)
**Purpose:** Map current operations, analyze, and establish baseline

**Define the Goal:**
- Business Overview
- Areas of Focus
- Metrics Hierarchy
- Industry Benchmark
- Metrics Baseline

**Map Your Operations:**
- Systems
- Process
- Data (with natural language mapping instructions)
- Team
- Financials

**Analyze Current State:**
- **Request Analysis:** Summary and case-level insights
- **Resolution Analysis:** Paths, patterns, efficiency
- **Process Analysis:** Workflows, bottlenecks, optimization opportunities
- **Team Analysis:** Performance, skill gaps, capacity planning
- **Live Work Analysis (Desktop):** Real-time observation of actual work vs. intended process
- **Salesforce Org Analysis:** Configuration, tech debt, system health (unique capability)
- **Financial Analysis:** Cost per interaction, ROI measurement

**Key Innovations:**
- Natural language data mapping (no technical skills required)
- Desktop observation for ground truth understanding
- Comprehensive baseline across all dimensions

**Pricing:** Paid service (one-time), expert assistance
**Target:** Directors, VPs needing baseline understanding

---

#### 3. **DESIGN** (Paid Service - One-Time)
**Purpose:** Define target future state and create transformation roadmap

**Capabilities:**
- Define target future state metrics and outcomes
- Propose & review roadmap options & tradeoffs:
  - Process optimization
  - Technology selection and implementation
  - Team structure and skills
  - Financial impact and ROI projections
- Detailed program plan & specification
- Roadmap prototypes with multiple scenario analysis

**Pricing:** Paid service (one-time), expert assistance
**Target:** VPs, C-Suite planning transformation

---

#### 4. **MANAGE** (Paid Subscription)
**Purpose:** Observe, monitor, and continuously improve operations

**Capabilities:**
- Continuous monitoring, observation and analysis
- Real-time alerts, dashboards and reporting
- On-going improvement priorities & specs
- Recommendations for executive and team
- AI-driven executive insight and command center

**Pricing:** Paid subscription, per month by customer interaction volume
**Target:** C-Suite, operations leaders ensuring ongoing success

### AI-Native Differentiation

**Six Key Advantages Over Traditional Approaches:**

1. **Speed of Integration**
   - AI-driven data ingest from multiple sources
   - Systems (Salesforce, etc.), Documents, Transcripts, Spreadsheets, Video, Audio
   - Natural language prompts for data mapping
   - No complex ETL or integration projects

2. **Adaptability**
   - Expert-in-the-loop validation
   - Feedback from users & usage patterns
   - Self-learning system that improves over time
   - Context-aware recommendations

3. **Depth of Insight**
   - AI-driven analysis & templates
   - Cross-domain synthesis (not siloed analytics)
   - Pattern recognition across dimensions
   - Strategic clarity from operational detail

4. **Self Learning**
   - Continuously improves from usage patterns
   - Learns from expert feedback
   - Adapts to organizational context
   - Fleet learning across customer base

5. **Direct Link to Execution**
   - Spec generation from natural language
   - Code generation capabilities
   - Seamless transition from insight to action
   - Closes the strategy-execution gap

6. **Natural Language Interface**
   - Voice & chat interface for executives and teams
   - Conversational AI for complex analysis
   - Desktop observation integration
   - No technical training required

### Technical Architecture (Latest - Dec 2025)

**Deployment Options:**

**Option 1: Managed Package**
- Deployed directly in client Salesforce Org
- Native Salesforce integration
- OAuth 2.0 authentication
- Live data access (no data copy)
- Seamless user experience

**Option 2: Web App (Connected App)**
- External web application architecture
- Client data copy via extraction/export
- Data masking & no retention policy
- BAA (Business Associate Agreement) with Google
- HTTPS & OAuth 2.0 security
- Separation of concerns for security-sensitive environments

**Helm Desktop (Enterprise Client):**
- Desktop observation client for live work analysis
- Privacy-preserving monitoring
- Data masking at collection point
- No data retention (edge processing)
- BAA with Google for cloud components
- HTTPS & OAuth 2.0 communication

**Security & Compliance:**
- **Authentication:** OAuth 2.0 across all components
- **Data Protection:** Data masking, no retention policy
- **Compliance:** BAA with Google for HIPAA/healthcare compliance
- **Transport Security:** HTTPS for all communications
- **Privacy:** Desktop observation with local processing and data masking

### Technical Foundation

**Task Mining Platform:**
- Captures 8 signal types: keyboard inputs, mouse movements, screen recording, application usage, file interactions, timing data, system events, user feedback
- Smart retention strategy: continuous monitoring but selective preservation
- Edge-first LLM architecture with local processing
- Privacy-preserving discovery
- Multi-tiered retention (24hr buffer → 90-day patterns → indefinite aggregates)

**Natural Language Data Mapping:**
- Business logic defined in plain English
- Example: "For escalation logic, whenever the escalation indicator is set or a team member from the product team is assigned to the case then assume we have escalated to L3"
- No technical skills required
- Executive-friendly configuration

**Key Innovation: Fleet Learning**
- Like Tesla's vehicles making autopilot smarter
- Every workflow captured improves recommendations for everyone
- Edge processing preserves privacy while contributing to aggregate intelligence
- Network effects: more users → better benchmarks → smarter recommendations

## Category & Market Position

### Emerging Category: Decision Intelligence / Agent Assurance

**LATEST INSIGHT (Jan 2, 2026):** Two distinct categories are crystallizing simultaneously - understanding the difference is critical for Helm's positioning:

#### 1. Control Plane (Operational Governance) - **CLAIMED BY BIG TECH**
**Who's Claiming It:** Microsoft Agent 365, GitHub Agent Control Plane, Salesforce Agentforce, Forrester
**What It Governs:** HOW agents operate
- Identity, access, audit trails, compliance
- Monitoring, guardrails, policy enforcement
- Agent inventory and lifecycle management
**Status:** Category being formalized NOW (Forrester published evaluation framework Nov 2025)
**Key Players:** Microsoft, GitHub, Salesforce, UiPath, Workato

#### 2. Decision Intelligence (Strategic Context) - **UNOWNED / OPEN OPPORTUNITY**
**Who's Defining It:** Foundation Capital, Ed Sim (Boldstart), Gartner, Mark Palmer
**What It Governs:** WHY decisions get made
- Decision traces, reasoning chains, exception handling
- Strategic context that informs decisions BEFORE agents act
- Systems of record for decisions (not just data)
**Status:** Conceptually emerging, no clear category leader yet
**Key Insight:** This is where Helm fits - not the operational control plane, but the executive decision layer

**Category Names Being Considered:**
- **Decision Intelligence for Customer Service** (Helm positioning - strategic layer)
- **Agent Assurance & ROI** (EVOLVE positioning - end-to-end platform)
- **Agent-Centric Operations (ACO)** - emphasizes agents as core focus
- **Context Intelligence** - emphasizes decision context over operational control

**Related Market Categories:**
- **Context Graphs** (Foundation Capital / Jaya Gupta) - "AI's Trillion-Dollar Opportunity"
- **Decision Intelligence** (Gartner, IDC) - formalizing as emerging category in 2025 Hype Cycle
- **Execution Intelligence Layer** (Ed Sim / Boldstart) - the layer that sits above systems of record
- **Enterprise Context Management** (Mark Palmer) - context as the missing infrastructure layer

**Core Thesis:**
- Traditional systems captured WHAT happened (Salesforce, Workday, SAP)
- New opportunity: capturing WHY it happened - decision traces, exceptions, approvals, precedents
- Context ≠ metadata or prompts - it's decision-time understanding: inputs, intent, constraints, history, permissions, exceptions, alternatives
- Startups in the "orchestration path" have structural advantage - they see full context at decision time, not after the fact via ETL
- **The feedback loop is the moat:** captured decision traces become searchable precedent, and every automated decision adds another training example

**The Category Stack (Jan 2026 Framework):**
```
┌──────────────────────────────────────────────────┐
│ DECISION INTELLIGENCE (← Helm positioning)       │
│ Strategic Layer: WHY decisions happen            │
│ • Decision traces & reasoning chains             │
│ • Cross-domain context (Systems, Process, Data,  │
│   Team, Financials)                              │
│ • Executive command center                       │
├──────────────────────────────────────────────────┤
│ CONTROL PLANE (Microsoft/GitHub/Salesforce)      │
│ Operational Layer: What agents DO                │
│ • Identity, monitoring, compliance               │
│ • Guardrails, policy enforcement                 │
├──────────────────────────────────────────────────┤
│ ORCHESTRATION (Salesforce/Oracle)                │
│ Coordination Layer: Multi-agent workflows        │
├──────────────────────────────────────────────────┤
│ EXECUTION (ClickUp/SuperAGI/Copilots)           │
│ Agent Layer: The agents themselves               │
└──────────────────────────────────────────────────┘
```

**Key Thought Leaders:**
- **Jaya Gupta & Ashu Garg (Foundation Capital)** - "Context Graphs: AI's Trillion-Dollar Opportunity" (Dec 2025) - foundational piece on decision traces
- **Ed Sim (Boldstart Ventures)** - "What's Hot in Enterprise IT/VC" - weekly synthesis, coined "Execution Intelligence Layer"
- **Aaron Levie (Box)** - "Jevon's Paradox for Knowledge Work" - AI will massively expand knowledge work, not shrink it
- **Mark Palmer** - "Enterprise Context Management" - context as the missing layer
- **Forrester** - Formalizing "Agent Control Plane" market (Nov 2025)
- **McKinsey** - "The Agentic Organization" - governance shifts from managing workflows to validating decisions and setting boundaries

**Strategic Positioning Implication:**
Helm should position as the **Decision Intelligence Layer for Customer Service**, NOT compete with Control Plane vendors. The pitch:
- Microsoft/GitHub/Salesforce: Operational governance of how agents work
- Helm: Strategic intelligence for executives on why decisions happen and what to do next
- Different problems, different buyers, different value propositions

### Market Opportunity

**TAM: $127B by 2030**
- AI Agents: $68B (35% CAGR)
- Process Mining: $23B (33% CAGR)
- RPA: $36B (27% CAGR)
- SAM: $31B (US/UK/EU, 100-10K employees)

**Labor Cost Savings TAM: $98.6B annually**
- 29M target knowledge workers
- $85K average fully-loaded cost
- 40% automation potential

**Target Segments:**
- **Primary:** 150,000 SMB companies (100-2,000 employees) - completely ignored by incumbents
- **Expansion:** Mid-market (2,000-10,000 employees)
- **Enterprise:** 8,000 large enterprises (upmarket move)

## Competitive Strategy

### Low-End Disruption Playbook

**Why We Win:**

| Dimension | Legacy Vendors | Helm/EVOLVE |
|-----------|----------------|-------------|
| Product | Mining technology (expensive) | Mining is free, monetize transformation |
| Market | Enterprise-only (8,000 cos.) | SMB-first (150,000 cos.), then upmarket |
| Pricing | $100K-500K deals | Freemium → $500-50K/month |
| Distribution | Enterprise field sales | Product-led growth, viral adoption |
| Intelligence | Siloed per customer | Aggregate learning across users |
| Economics | High CAC, slow growth | Near-zero CAC, rapid scaling |
| Moat | Technology (commoditizing) | Network effects (compounding) |

**Competitive Moats:**
1. Technology: Edge-first LLM architecture
2. Data: Millions of observed workflows, peer benchmarks that don't exist elsewhere
3. Network Effects: Winner-takes-most dynamics
4. Business Model: Freemium creates 10-100x more users than competitors

**Why Competitors Can't Catch Up:**
- Celonis, UiPath, SAP Signavio: Trapped in $100K+ deal economics
- Task Mining Vendors: Expensive specialized sensors, cloud architecture
- Agent Platforms: No process discovery, starting from wrong end

## Business Model

### Three-Tier Monetization

**FREE TIER - Build User Base**
- Web assessment + desktop client for workflow discovery
- Full MINE phase capabilities
- Basic peer benchmarking
- Purpose: Drive maximum adoption (100,000+ free users)

**PAID TIER 1 - Transformation ($500-$50K/month)**
- AI-powered transformation roadmaps
- Autonomous agent authoring and deployment
- Token-based consumption pricing
- Detailed peer comparison and industry benchmarks
- Target: SMB to mid-market, 30-40% free-to-paid conversion

**PAID TIER 2 - Enterprise Platform ($50K-$500K+/month)**
- Full service assurance and continuous improvement
- Enterprise governance, advanced analytics
- Multi-team synthesis and optimization
- Target: 10-15% expand from Tier 1

### Unit Economics (at scale)

**SMB:** LTV:CAC 80-250:1, Payback 1-2 months, Churn 15-20%, NDR 110-120%
**Mid-Market:** LTV:CAC 100-300:1, Payback 2-4 months, Churn 8-12%, NDR 130-150%
**Enterprise:** LTV:CAC 100-400:1, Payback 3-6 months, Churn 5-8%, NDR 140-180%

**Blended:** 80-85% gross margin, 0.6+ viral coefficient, 1.5+ magic number

## Go-to-Market Strategy

### Phase 1: SMB Domination (Months 1-12)
- Product-led growth with instant web assessment
- Partnerships with SMB software (QuickBooks, HubSpot, Gusto)
- Content marketing on cost efficiency and peer insights
- Target: 50,000 free users, 500-1,000 paying SMB customers, $1-2M ARR

### Phase 2: Mid-Market Expansion (Year 2)
- "If it works for smaller companies, why not us?"
- Proof: "5,000+ SMBs transformed, $100M in proven labor savings"
- Target: 200,000 free users, 2,500-4,000 paying customers, $5-10M ARR

### Phase 3: Enterprise Adoption (Year 3+)
- Grassroots adoption through departmental freemium usage
- Unmatched peer benchmarking data
- Target: 500,000+ free users, 7,000-10,000 paying customers, $20-40M ARR

## Investment Context

**Seeking:** $2-3M Seed Extension (18-month runway to Series A)

**5-Year Revenue Projections:**
- Conservative: $1M → $5M → $20M → $60M → $150M
- Target: $2M → $10M → $40M → $120M → $300M
- Aggressive: $3M → $20M → $80M → $250M → $600M

**Year 5 Target:** $300M ARR = ~1% of SAM, 88,000 workers automated across 35,000 customers

**Comparable Success Stories:**
- Atlassian: SMB to enterprise, $50B valuation
- Zoom: Freemium viral, $20B valuation
- Figma: Network effects, $20B acquisition

## Knowledge Base Structure

### Key Documents

**Most Recent Business Plan Documents (Jan 2, 2026 - FOR UPDATE):**
Located in `/bplan-prior-version/`:
- **EVOLVE_InvestorDeck.pptx** (21:44) - PowerPoint presentation - **NEEDS UPDATE FOR HELM**
- **EVOLVE_Revenue_Model-edited.xlsx** (21:44) - Revenue model spreadsheet - **NEEDS UPDATE**
- **EVOLVE_Expense_Model-edited2.xlsx** (21:44) - Expense model spreadsheet - **NEEDS UPDATE**
- **EVOLVE_InvestorBrief.md/.pdf/.html** (21:44) - Investor brief in multiple formats - **NEEDS UPDATE**
- **Product_Roadmap_2026.html** (21:45) - Product roadmap by quarter - **NEEDS REVIEW**
- **category-naming-discussion.md** (21:43) - Category positioning analysis

**Business Strategy (Prior Versions):**
- `/bplan-prior-version/EVOLVE_-_Executive_Summary__Fundraising_.md` - Investment thesis
- `/bplan-prior-version/EVOLVE_-_Investor_Pitch_Deck.md` - Pitch deck markdown
- `/bplan-prior-version/EVOLVE_Business_Plan_v3_Final.md` - Full business plan

**Product/Solution:**
- `/solution-specs/task_mining_project_overview.md` - Task mining technical spec
- `/solution-specs/Project_Overview.md` - Overall project overview
- `/solution-specs/Desktop_Project_Overview.md` - Desktop client details

**Positioning & Messaging:**
- `/ai conversations/helm-elevator-pitch-evolution.md` - Elevator pitch iterations
- `/ai conversations/emerging-decision-intelligence-category-research.md` - Category analysis
- `/ai conversations/b2b-saas-cs-metrics-hierarchy.md` - Customer service metrics

**Market Research:**
- `/market-research/emerging-category-control-plane-decision-intelligence.md` - **NEW (Jan 2, 2026)** - Deep research on emerging "Control Plane" vs "Decision Intelligence" categories, key thought leaders (Foundation Capital, Ed Sim, Gartner, Forrester), and strategic positioning for Helm
- `/market-research/mindsie/` - Competitor analysis (Mindsie task mining platform)
- `/market-research/Modern_AI-Centric_Vendors_in_Task_Mining_and_Process_Mining__Comprehensive_Market_Analysis.md`
- `/market-research/sequoia-ai-ascent-2025-keynote.md` - Market trends

**Transcripts & Insights:**
- `/transcripts/` - Call summaries and meeting notes

### Working with This Knowledge Base

**When positioning Helm:**
- **NEW (Jan 2026):** Position as the **Decision Intelligence Layer**, NOT a Control Plane
- Emphasize "executive co-pilot" and "command center" framing
- Focus on decision intelligence and context, not just data
- Highlight blind spots problem and strategic clarity solution
- Avoid "just another dashboard" or tool positioning
- **Key distinction:** "We show executives WHY decisions happen, not just monitor WHAT agents do"
- Complementary to Control Plane vendors: "Microsoft/GitHub govern agent operations; Helm governs strategic decisions"
- Use McKinsey framing: Enable executives to "set boundaries, validate decisions, and intervene when patterns emerge"

**When discussing technical architecture:**
- Edge-first, privacy-preserving is core differentiator
- Fleet learning / aggregate intelligence is the moat
- Smart retention strategy balances comprehensive capture with privacy

**When discussing business model:**
- Always lead with freemium and SMB-first disruption
- Network effects and peer benchmarking are unique advantages
- Low-end disruption playbook (Atlassian, Zoom, Figma parallels)

**When discussing category:**
- **CRITICAL (Jan 2026):** Distinguish Helm's Decision Intelligence layer from Control Plane vendors
- Never position Helm as competing with Microsoft Agent 365, GitHub Agent Control Plane, or Salesforce Agentforce
- Frame as complementary: "Control Plane governs WHAT agents do; Helm governs WHY decisions get made"
- Reference Decision Intelligence / Context Graphs thought leadership (Foundation Capital, Ed Sim)
- Position as systems of record for decisions, not data
- Emphasize orchestration path structural advantage
- Use the Category Stack visual (Decision Intelligence → Control Plane → Orchestration → Execution)
- McKinsey framing: "Leaders govern by setting boundaries, validating decisions, and intervening when patterns emerge"

## EVOLVE vs Helm: Understanding the Relationship

**EVOLVE** represents the full platform play:
- Broader market: all business process transformation
- Four intelligence layers: Process Mining + Task Mining + Org Mining + Agent Observability
- Salesforce AppExchange wedge strategy (Service Cloud SMBs)
- End-to-end platform from discovery to deployment to assurance
- Category: "Agent Assurance & ROI Platform"

**Helm** represents a focused vertical positioning:
- Narrower market: customer service executive command center
- Decision intelligence for customer service leaders
- "Executive co-pilot" framing
- Command layer that sits above operational tools
- Category: "Decision Intelligence" / "Context Intelligence"

**The Strategic Relationship:**
- Helm appears to be a vertical market entry strategy or rebrand
- EVOLVE = horizontal platform, Helm = vertical application
- Both leverage same technical foundation (task mining, fleet learning, edge-first architecture)
- Current business plan documents use EVOLVE branding and will need updating for Helm positioning

## Latest Messaging & Capabilities (Dec 2025)

**IMPORTANT:** The most current and comprehensive messaging for Helm is documented in:
`/reference/helm-latest-messaging.md` (Updated Jan 2, 2026)

This document captures the complete details from the AARP Conversation Presentation (December 18, 2025) including:
- Core positioning and messaging
- Four-module framework (Explore, Mine, Design, Manage)
- AI-native differentiation (6 key advantages)
- Technical architecture and deployment options
- Pricing model and monetization strategy
- Key capabilities deep dive
- Competitive differentiation
- Implementation considerations

**Key Reference:** `/reference/latest-pitch/extracted-presentation.md` - Full text extraction from the December 2025 investor presentation

## Important Notes & Next Actions

**Product Name Evolution:**
- Agentfinder → Miner → **EVOLVE** → **Helm** (current)
- Be aware of which brand/positioning each document references
- **EVOLVE** was the immediate predecessor to Helm
- **Latest positioning captured:** December 18, 2025 AARP Conversation

**Business Plan Update Required:**
- Most recent documents in `/bplan-prior-version/` dated Jan 2, 2026
- **NEEDS UPDATE:** Investor deck, revenue model, expense model, investor brief
- **NOW AVAILABLE:** Latest messaging extracted from December 2025 pitch in `/reference/helm-latest-messaging.md`
- **Decision made:** Helm positioning is focused on customer service executive command center
- **Next step:** Update investor materials to align with latest Helm messaging

**Category Timing:**
- Decision Intelligence / Context Graphs category emerging NOW (late 2024/early 2025)
- Agent Assurance & ROI is EVOLVE's proposed new category
- Perfect timing for category creation/leadership
- **NEW INSIGHT (Jan 2, 2026):** "Control Plane" category crystallizing for operational governance (Microsoft, GitHub, Forrester), while "Decision Intelligence" layer remains unowned - strategic opportunity for Helm to own the decision layer vs. control plane (see `/market-research/emerging-category-control-plane-decision-intelligence.md`)

**Key Differentiators:**
- Peer benchmarking data that doesn't exist anywhere else
- Four-layer intelligence integration (unique to EVOLVE)
- Edge-first, privacy-preserving architecture
- Fleet learning / network effects
- Freemium SMB-first disruption model

**Competitive Urgency:**
- 12-month window before Salesforce potentially integrates Apromore (process mining vendor they might acquire)
- Traditional vendors trapped in enterprise-only economics
- SMB market (150,000 companies) completely unaddressed
