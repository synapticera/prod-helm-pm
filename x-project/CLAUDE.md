# Helm x-project Master State

This document is the master reference for the Helm project. It describes what we're building, where we are strategically, key decisions made, and how to navigate the project materials.

---

## 🎯 What is Helm?

**Helm** is an **Executive Agent Platform for Service Leaders** - the missing executive function layer that separates successful AI deployments from failed ones.

### The Problem We Solve

**AI ROI Crisis**:
- 95% of AI pilots deliver zero ROI (MIT)
- 85% of AI projects fail before proving value (Gartner)
- 78% using AI see no bottom-line impact (McKinsey)
- 88% of organizations use AI regularly, but only 39% see enterprise-level EBIT impact (49-point gap is Helm's core market)

**Root Cause**: No one has "Full Command"
- **Horizons Challenge**: Short-term operations vs. long-term strategy disconnect
- **Domains Challenge**: Siloed view across Systems, Process, Data, Team, Financials
- Companies have plenty of AI "arms and legs" (execution technology) but lack the executive function layer to govern, understand, plan, and measure results
- Service leaders can't answer: "What's my current state? Where should I add agents? How do I ensure it works?"

### Our Solution: The Executive Co-Pilot

**One-liner**: "Helm is the AI command center that shows customer service leaders what they can't see — so they can act on what matters."

**Core Concept**: Fills the gap between operational tools and strategic decision-making. Not execution tools, but decision intelligence - the layer that shows executives what they can't see so they can act on what matters.

**Complete AI Agent Lifecycle**:

1. **Understand** - Map current operations and constraints
2. **Plan** - Design agent integration strategy
3. **Sell** - Build internal business cases
4. **Execute** - Deploy with governance and decision tracing
5. **Monitor & Correct** - Measure results and iterate

### Why It Matters

- Helm users see 5-7x better outcomes vs 10-20% from ad-hoc deployment
- Decision trace infrastructure creates a competitive moat (more data = better recommendations)
- $1T+ productivity opportunity across enterprise service functions
- **Workflow redesign has the biggest effect on EBIT impact** (McKinsey) - validates Helm's Design module positioning

### Value Proposition

- **Full Command**: Provides context across domains (Systems, Process, Data, Team, Financials) and horizons (short-term operations + long-term strategy)
- **Executive Co-Pilot**: One view of what's happening and one clear answer: what to do next
- **AI-Native Advantage**: Speed, adaptability, depth of insight, self-learning capabilities
- **Confidence & Impact**: Enable leaders to make decisions with certainty and drive meaningful results
- **Command Layer**: Sits above CRM, ticketing, workforce management, analytics - connecting the dots

---

## 🏗️ Product Architecture & Modules

### Four-Module Transformation Framework

Helm guides executives through every stage of the AI transformation process:

#### 1. EXPLORE (Free - Self-Service)
**Purpose**: Learn and understand AI landscape in customer service

**Capabilities**:
- AI in Customer Service primer
- Industry metrics, benchmarks and best practices
- Generic roadmaps and action plans
- Q&A with the Helm agent

**Pricing**: No charge, self-service, email address only
**Target**: Individual contributors, managers, early explorers

#### 2. MINE (Paid Service - One-Time)
**Purpose**: Map current operations, analyze, and establish baseline

**Define the Goal**:
- Business Overview
- Areas of Focus
- Metrics Hierarchy
- Industry Benchmark
- Metrics Baseline

**Map Your Operations**:
- Systems
- Process
- Data (with natural language mapping instructions)
- Team
- Financials

**Analyze Current State**:
- Request Analysis: Summary and case-level insights
- Resolution Analysis: Paths, patterns, efficiency
- Process Analysis: Workflows, bottlenecks, optimization opportunities
- Team Analysis: Performance, skill gaps, capacity planning
- **Live Work Analysis (Desktop)**: Real-time observation of actual work vs. intended process
- **Salesforce Org Analysis**: Configuration, tech debt, system health (unique capability)
- Financial Analysis: Cost per interaction, ROI measurement

**Key Innovations**:
- Natural language data mapping (no technical skills required)
- Desktop observation for ground truth understanding
- Comprehensive baseline across all dimensions

**Pricing**: Paid service (one-time), expert assistance
**Target**: Directors, VPs needing baseline understanding

#### 3. DESIGN (Paid Service - One-Time)
**Purpose**: Define target future state and create transformation roadmap

**Capabilities**:
- Define target future state metrics and outcomes
- Propose & review roadmap options & tradeoffs:
  - Process optimization
  - Technology selection and implementation
  - Team structure and skills
  - Financial impact and ROI projections
- Detailed program plan & specification
- Roadmap prototypes with multiple scenario analysis

**Pricing**: Paid service (one-time), expert assistance
**Target**: VPs, C-Suite planning transformation

#### 4. MANAGE (Paid Subscription)
**Purpose**: Observe, monitor, and continuously improve operations

**Capabilities**:
- Continuous monitoring, observation and analysis
- Real-time alerts, dashboards and reporting
- On-going improvement priorities & specs
- Recommendations for executive and team
- AI-driven executive insight and command center

**Pricing**: Paid subscription, per month by customer interaction volume
**Target**: C-Suite, operations leaders ensuring ongoing success

### AI-Native Differentiation

Six Key Advantages Over Traditional Approaches:

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

### Technical Architecture

**Deployment Options**:

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

**Helm Desktop (Enterprise Client)**:
- Desktop observation client for live work analysis
- Privacy-preserving monitoring
- Data masking at collection point
- No data retention (edge processing)
- BAA with Google for cloud components
- HTTPS & OAuth 2.0 communication

**Security & Compliance**:
- Authentication: OAuth 2.0 across all components
- Data Protection: Data masking, no retention policy
- Compliance: BAA with Google for HIPAA/healthcare compliance
- Transport Security: HTTPS for all communications
- Privacy: Desktop observation with local processing and data masking

### Technical Foundation: Task Mining Platform

**Signal Capture**:
- 8 signal types: keyboard inputs, mouse movements, screen recording, application usage, file interactions, timing data, system events, user feedback
- Smart retention strategy: continuous monitoring but selective preservation
- Edge-first LLM architecture with local processing
- Privacy-preserving discovery
- Multi-tiered retention (24hr buffer → 90-day patterns → indefinite aggregates)

**Natural Language Data Mapping**:
- Business logic defined in plain English
- Example: "For escalation logic, whenever the escalation indicator is set or a team member from the product team is assigned to the case then assume we have escalated to L3"
- No technical skills required
- Executive-friendly configuration

**Key Innovation: Fleet Learning**
- Like Tesla's vehicles making autopilot smarter
- Every workflow captured improves recommendations for everyone
- Edge processing preserves privacy while contributing to aggregate intelligence
- Network effects: more users → better benchmarks → smarter recommendations

---

## 📍 Project State & Key Decisions

### Product Name Evolution

**Historical Context**: Agentfinder → Miner → EVOLVE → **Helm (current)**

- **EVOLVE** was the primary brand name immediately before Helm
- Most older business plan documents use "EVOLVE" branding
- **EVOLVE positioning**: "The Agent Assurance & ROI Platform" - first platform to combine process mining, task mining, org mining, and agent observability
- **Helm positioning**: Focused on customer service executive command center, narrower but more strategic

**Relationship Between EVOLVE and Helm**:
- EVOLVE = horizontal platform (all business process transformation)
- Helm = vertical application (customer service executive command center)
- Both leverage same technical foundation (task mining, fleet learning, edge-first architecture)
- Helm appears to be a focused vertical market entry strategy

### Primary Positioning (Decided)

**"Executive Agent Platform for Service Leaders"**

This replaced earlier candidates:

- Decision Intelligence for Customer Service (too narrow, academic)
- AI Management (too generic)
- Execution Intelligence Layer (too technical)

We chose "Executive Agent" because it:

- Clearly names the category we're creating
- Appeals directly to our primary buyer (Service Leaders)
- Emphasizes the platform nature (not point solution)
- Aligns with market convergence (VC, Gartner, Forrester all recognizing execution/governance as critical)

### Market Inflection: The Constraint Stack

**Key Strategic Insight**: The opportunity isn't solving the current constraint; it's solving the _next_ constraint in the ecosystem.

**Current State (Arms & Legs)**: Market flooded with LLMs, prompt engineering tools, agent frameworks
**Next Constraint**: Executive function layer - governance, decision tracing, outcome measurement
**Our Position**: First-mover in building executive function infrastructure for customer service

### Triple Market Validation

1. **Customer Conversations** - Direct articulated needs from:
   - Mike (VP Service) - needs governance layer
   - Shibohn (Director of AI) - needs understanding/planning capability
   - Colby (Chief Service Officer) - needs execution framework
   - Mark (VP Customer Operations) - needs measurement

2. **Internal Products** - We're experiencing the management constraint ourselves:
   - MAX: needs governance layer for agent proliferation
   - Claude Code: needs decision tracing and outcome tracking
   - This validates the problem is real

3. **VC/Analyst Convergence**:
   - Ed Sim (Boldstart): invested in "Execution Intelligence Layer" thesis
   - Gartner: Decision Intelligence #1 trend for 2026
   - Forrester: Agent Control Planes emerging requirement
   - Foundation Capital / Jaya Gupta: "Context Graphs: AI's Trillion-Dollar Opportunity" (Dec 2025)
   - Aaron Levie (Box): "Jevon's Paradox for Knowledge Work" - AI will massively expand knowledge work
   - McKinsey: "The Agentic Organization" - governance shifts from managing workflows to validating decisions

### Category Positioning: Decision Intelligence vs Control Plane

**CRITICAL DISTINCTION** (Jan 2026): Two distinct categories crystallizing simultaneously:

**1. Control Plane (Operational Governance) - CLAIMED BY BIG TECH**
- **Who's Claiming It**: Microsoft Agent 365, GitHub Agent Control Plane, Salesforce Agentforce, Forrester
- **What It Governs**: HOW agents operate
  - Identity, access, audit trails, compliance
  - Monitoring, guardrails, policy enforcement
  - Agent inventory and lifecycle management
- **Status**: Category being formalized NOW (Forrester published framework Nov 2025)
- **Key Players**: Microsoft, GitHub, Salesforce, UiPath, Workato

**2. Decision Intelligence (Strategic Context) - UNOWNED / OPEN OPPORTUNITY**
- **Who's Defining It**: Foundation Capital, Ed Sim (Boldstart), Gartner, Mark Palmer
- **What It Governs**: WHY decisions get made
  - Decision traces, reasoning chains, exception handling
  - Strategic context that informs decisions BEFORE agents act
  - Systems of record for decisions (not just data)
- **Status**: Conceptually emerging, no clear category leader yet
- **Key Insight**: This is where Helm fits - not the operational control plane, but the executive decision layer

**The Category Stack**:
```
┌──────────────────────────────────────────────────────────┐
│ DECISION INTELLIGENCE (← Helm positioning)               │
│ Strategic Layer: WHY decisions happen                    │
│ • Decision traces & reasoning chains                     │
│ • Cross-domain context (Systems, Process, Data,          │
│   Team, Financials)                                      │
│ • Executive command center                               │
├──────────────────────────────────────────────────────────┤
│ CONTROL PLANE (Microsoft/GitHub/Salesforce)              │
│ Operational Layer: What agents DO                        │
│ • Identity, monitoring, compliance                       │
│ • Guardrails, policy enforcement                         │
├──────────────────────────────────────────────────────────┤
│ ORCHESTRATION (Salesforce/Oracle)                        │
│ Coordination Layer: Multi-agent workflows                │
├──────────────────────────────────────────────────────────┤
│ EXECUTION (ClickUp/SuperAGI/Copilots)                   │
│ Agent Layer: The agents themselves                       │
└──────────────────────────────────────────────────────────┘
```

**Strategic Positioning Implication**:
Helm should position as the Decision Intelligence Layer for Customer Service, NOT compete with Control Plane vendors:
- **Microsoft/GitHub/Salesforce**: Operational governance of how agents work
- **Helm**: Strategic intelligence for executives on why decisions happen and what to do next
- Different problems, different buyers, different value propositions

**Key Thought Leaders**:
- Jaya Gupta & Ashu Garg (Foundation Capital) - "Context Graphs: AI's Trillion-Dollar Opportunity"
- Ed Sim (Boldstart Ventures) - "What's Hot in Enterprise IT/VC" - coined "Execution Intelligence Layer"
- Aaron Levie (Box) - "Jevon's Paradox for Knowledge Work"
- Mark Palmer - "Enterprise Context Management" - context as the missing layer
- Forrester - Formalizing "Agent Control Plane" market (Nov 2025)
- McKinsey - "The Agentic Organization" - governance framework

---

## 📁 Project Structure

```
x-project/
├── CLAUDE.md                          ← You are here
├── bplan/                             ← Business planning & positioning
│   ├── helm-strategy-master.md        ← PRIMARY: Complete strategic document
│   ├── helm-research-master.md        ← PRIMARY: Market research index
│   ├── preso-outline.md               ← PRIMARY: Investor presentation outline
│   ├── 2026-01-03-category-brand-comparison.md
│   ├── helm-eu-ai-act-strategy-selector.html
│   ├── docs/
│   │   ├── helm-messaging-guide.md
│   │   ├── helm-product-positioning.md
│   │   ├── helm-lifecycle-one-pager.html
│   │   ├── helm-competitive-positioning-one-pager.html
│   │   ├── helm-markdown-documentation-opportunity.md
│   │   ├── helm-markdown-governance-opportunity.html
│   │   ├── helm-compliance-messaging-playbook.md
│   │   └── helm-eu-ai-act-implementation-roadmap.md
│   ├── design-assets/
│   ├── archive/                       ← Historical & superseded docs
│   └── README.md
├── reference/
│   ├── market-research/
│   │   ├── fortress-iq-overview.md
│   │   └── 2026-01-05-eu-ai-act-governance-requirements.md
│   └── [other reference materials]
├── .app/                              ← Application code
├── original/                          ← Original project materials
├── specs/                             ← Technical specifications
├── intake.md                          ← Project intake document
└── workflow-config.yml                ← Workflow configuration
```

---

## 🎯 Core Documents (bplan/)

### Primary Strategic Documents (Actively Maintained)

**[helm-strategy-master.md](bplan/helm-strategy-master.md)**

- **Purpose**: Complete strategic positioning, branding, and strategy document
- **When to Use**: Strategic planning, competitive analysis, messaging development
- **Contains**: Market inflection analysis, emerging category thesis, competitive landscape, GTM strategy, positioning narratives for all audiences
- **Owner**: Strategy team
- **Last Updated**: January 5, 2026

**[helm-research-master.md](bplan/helm-research-master.md)**

- **Purpose**: Single source of truth for all market research and competitive data
- **When to Use**: Fact-checking, investor conversations, market validation
- **Contains**: Quick reference table with 10+ critical metrics, complete research articles index, source documentation
- **Owner**: Research team
- **Last Updated**: January 5, 2026

**[preso-outline.md](bplan/preso-outline.md)**

- **Purpose**: Investor presentation outline with complete slide structure
- **When to Use**: Investor pitches, board updates, presentation narrative development
- **Contains**: 10+ slide outline with presenter notes, market-first approach, financial projections, roadmap
- **Notable**: Includes H2 2026 roadmap item for Markdown-native governance capability
- **Owner**: Sales/Investor Relations
- **Last Updated**: January 5, 2026

**[2026-01-03-category-brand-comparison.md](bplan/2026-01-03-category-brand-comparison.md)**

- **Purpose**: Strategic analysis comparing positioning candidates
- **When to Use**: Understanding why "Executive Agent" was chosen, positioning history
- **Contains**: Head-to-head comparison of three candidates, scoring, decision rationale
- **Owner**: Strategy team

### EU AI Act Opportunity Documents (Ready for Leadership Decision)

**[helm-eu-ai-act-strategy-selector.html](bplan/helm-eu-ai-act-strategy-selector.html)**

- **Purpose**: Interactive visual decision framework for EU AI Act GTM strategy
- **When to Use**: Strategic planning, leadership decision-making
- **Shows**: Three strategic paths with timeline, audience, messaging, TAM, pros/cons
- **Decision Required**: Choose which path to activate (Aggressive Compliance, Balanced, or Productivity-Only)
- **Status**: Market research complete, awaiting leadership decision

**[docs/helm-compliance-messaging-playbook.md](bplan/docs/helm-compliance-messaging-playbook.md)**

- **Purpose**: Ready-to-activate messaging variants for compliance-focused GTM
- **When to Use**: Campaign development, sales enablement, marketing asset creation
- **Contains**: Subject lines, email openings, landing page copy, implementation checklists by audience
- **Status**: Ready to activate once strategic path is chosen

**[docs/helm-eu-ai-act-implementation-roadmap.md](bplan/docs/helm-eu-ai-act-implementation-roadmap.md)**

- **Purpose**: Month-by-month execution plan for chosen strategic path
- **When to Use**: Implementation planning, stakeholder alignment
- **Contains**: Marketing, sales, analyst, and product execution with go/no-go checkpoints
- **Status**: Ready to activate once strategic path is chosen

### H2 2026 Opportunity: Markdown-Native Governance

**[docs/helm-markdown-governance-opportunity.html](bplan/docs/helm-markdown-governance-opportunity.html)**

- **Purpose**: Executive-grade presentation of Markdown governance market opportunity
- **TAM**: $913M base case, $3.2B-$4.8B extended opportunity
- **Capabilities**: Policy-as-Code, Git-based version control, compliance documentation
- **Timeline**: 2H 2026 roadmap item
- **Competitive Position**: First-mover in markdown-native governance for AI operations

**[docs/helm-markdown-documentation-opportunity.md](bplan/docs/helm-markdown-documentation-opportunity.md)**

- **Purpose**: Detailed market analysis and TAM breakdown
- **When to Use**: Investor conversations about future growth, product planning
- **Contains**: Market sizing, competitive analysis, implementation approach, revenue model

### Supporting Materials (bplan/docs/)

**[helm-messaging-guide.md](bplan/docs/helm-messaging-guide.md)**

- Quick reference messaging for Service Leaders, Investors, Analysts
- Use for: Pitch refinement, sales conversations, analyst briefings

**[helm-product-positioning.md](bplan/docs/helm-product-positioning.md)**

- Product-focused positioning guide mapping modules to lifecycle stages
- Use for: Product team alignment, feature prioritization

**[helm-lifecycle-one-pager.html](bplan/docs/helm-lifecycle-one-pager.html)**

- Visual one-pager showing 5-stage Executive Function Lifecycle
- Use for: Quick visual explanation, presentations

**[helm-competitive-positioning-one-pager.html](bplan/docs/helm-competitive-positioning-one-pager.html)**

- Visual positioning showing competitive advantages and structural moats
- Use for: Competitive discussions, investor conversations

---

## 📊 Market Opportunity Summary

### Primary Market: Executive Function for Service Leaders

**Total Addressable Market**:
- **TAM**: $127B by 2030
  - AI Agents: $68B (35% CAGR)
  - Process Mining: $23B (33% CAGR)
  - RPA: $36B (27% CAGR)
- **SAM**: $31B (US/UK/EU, 100-10K employees)
- **Labor Cost Savings TAM**: $98.6B annually
  - 29M target knowledge workers
  - $85K average fully-loaded cost
  - 40% automation potential

**Target Segments**:
- **Primary**: 150,000 SMB companies (100-2,000 employees) - completely ignored by incumbents
- **Expansion**: Mid-market (2,000-10,000 employees)
- **Enterprise**: 8,000 large enterprises (upmarket move)

**Beachhead Strategy**:
- Salesforce Service Cloud SMBs via AppExchange
- 44K-51K companies, $5.4B TAM
- Weak competition in this segment
- Fortune 500 customer service operations

**Key Insight**: 95% of AI projects fail; our platform separates winners (5-7x better outcomes) from failures. The 61% of companies NOT seeing enterprise ROI are Helm's addressable market.

### Secondary Market: EU AI Act Compliance (2H 2026+)

- **Inflection Date**: August 2, 2026 (EU AI Act full enforcement)
- **Compliance TAM**: €900M-1B market opportunity in 6 months
- **Extended Opportunity**: €11B+ expansion once compliance achieved
- **Strategic Decision**: Three paths available (see strategy selector)

### Tertiary Market: Markdown-Native Governance (2H 2026 Roadmap)

- **TAM**: $913M base, $3.2B-$4.8B extended
- **Capabilities**: Policy-as-Code, Git-based compliance, automated governance
- **Positioning**: First-mover in markdown governance for AI operations
- **Timeline**: 2H 2026 implementation

---

## 💼 Business Model & Unit Economics

### Three-Tier Monetization

**FREE TIER - Build User Base**
- Web assessment + desktop client for workflow discovery
- Full MINE phase capabilities
- Basic peer benchmarking
- **Purpose**: Drive maximum adoption (100,000+ free users)

**PAID TIER 1 - Transformation ($500-$50K/month)**
- AI-powered transformation roadmaps
- Autonomous agent authoring and deployment
- Token-based consumption pricing
- Detailed peer comparison and industry benchmarks
- **Target**: SMB to mid-market, 30-40% free-to-paid conversion

**PAID TIER 2 - Enterprise Platform ($50K-$500K+/month)**
- Full service assurance and continuous improvement
- Enterprise governance, advanced analytics
- Multi-team synthesis and optimization
- **Target**: 10-15% expand from Tier 1

### Unit Economics (at scale)

**SMB**:
- LTV:CAC 80-250:1
- Payback 1-2 months
- Churn 15-20%
- NDR 110-120%

**Mid-Market**:
- LTV:CAC 100-300:1
- Payback 2-4 months
- Churn 8-12%
- NDR 130-150%

**Enterprise**:
- LTV:CAC 100-400:1
- Payback 3-6 months
- Churn 5-8%
- NDR 140-180%

**Blended Metrics**:
- 80-85% gross margin
- 0.6+ viral coefficient
- 1.5+ magic number

### Go-to-Market Strategy

**Phase 1: SMB Domination (Months 1-12)**
- Product-led growth with instant web assessment
- Partnerships with SMB software (QuickBooks, HubSpot, Gusto)
- Content marketing on cost efficiency and peer insights
- **Target**: 50,000 free users, 500-1,000 paying SMB customers, $1-2M ARR

**Phase 2: Mid-Market Expansion (Year 2)**
- "If it works for smaller companies, why not us?"
- Proof: "5,000+ SMBs transformed, $100M in proven labor savings"
- **Target**: 200,000 free users, 2,500-4,000 paying customers, $5-10M ARR

**Phase 3: Enterprise Adoption (Year 3+)**
- Grassroots adoption through departmental freemium usage
- Unmatched peer benchmarking data
- **Target**: 500,000+ free users, 7,000-10,000 paying customers, $20-40M ARR

### 5-Year Revenue Projections

**Conservative**: $1M → $5M → $20M → $60M → $150M
**Target**: $2M → $10M → $40M → $120M → $300M
**Aggressive**: $3M → $20M → $80M → $250M → $600M

**Year 5 Target**: $300M ARR = ~1% of SAM, 88,000 workers automated across 35,000 customers

### Investment Context

**Seeking**: $2-3M Seed Extension (18-month runway to Series A)

**Comparable Success Stories**:
- Atlassian: SMB to enterprise, $50B valuation
- Zoom: Freemium viral, $20B valuation
- Figma: Network effects, $20B acquisition

---

## 🎯 Competitive Strategy

### Low-End Disruption Playbook

**Why We Win**:

| Dimension | Legacy Vendors | Helm/EVOLVE |
|-----------|---------------|-------------|
| Product | Mining technology (expensive) | Mining is free, monetize transformation |
| Market | Enterprise-only (8,000 cos.) | SMB-first (150,000 cos.), then upmarket |
| Pricing | $100K-500K deals | Freemium → $500-50K/month |
| Distribution | Enterprise field sales | Product-led growth, viral adoption |
| Intelligence | Siloed per customer | Aggregate learning across users |
| Economics | High CAC, slow growth | Near-zero CAC, rapid scaling |
| Moat | Technology (commoditizing) | Network effects (compounding) |

**Competitive Moats**:
1. **Technology**: Edge-first LLM architecture
2. **Data**: Millions of observed workflows, peer benchmarks that don't exist elsewhere
3. **Network Effects**: Winner-takes-most dynamics
4. **Business Model**: Freemium creates 10-100x more users than competitors

**Why Competitors Can't Catch Up**:
- **Celonis, UiPath, SAP Signavio**: Trapped in $100K+ deal economics
- **Task Mining Vendors**: Expensive specialized sensors, cloud architecture
- **Agent Platforms**: No process discovery, starting from wrong end

**Unique Differentiators**:
- Peer benchmarking data that doesn't exist anywhere else
- Four-layer intelligence integration (unique to EVOLVE): Process Mining + Task Mining + Org Mining + Agent Observability
- Edge-first, privacy-preserving architecture
- Fleet learning / network effects
- Freemium SMB-first disruption model
- **Salesforce Org MRI**: System health and tech debt analysis (unique)
- **EVOLVE Transformation Score**: "FICO score for agent readiness"
- **AgentOps Flight Recorder**: Agent performance monitoring

**Competitive Urgency**:
- 12-month window before Salesforce potentially integrates Apromore (process mining vendor)
- Traditional vendors trapped in enterprise-only economics
- SMB market (150,000 companies) completely unaddressed

---

## 🗺️ How to Use This Project

### For Investor Conversations

1. Start with [helm-research-master.md](bplan/helm-research-master.md) (quick data reference)
2. Reference [helm-strategy-master.md](bplan/helm-strategy-master.md) (strategic context)
3. Walk through [preso-outline.md](bplan/preso-outline.md) (presentation narrative)
4. Show [helm-competitive-positioning-one-pager.html](bplan/docs/helm-competitive-positioning-one-pager.html) (visual)

### For Service Leader Sales Conversations

1. Reference [helm-messaging-guide.md](bplan/docs/helm-messaging-guide.md) (Service Leader messaging)
2. Show [helm-lifecycle-one-pager.html](bplan/docs/helm-lifecycle-one-pager.html) (visual overview)
3. Deep-dive with [helm-product-positioning.md](bplan/docs/helm-product-positioning.md) (capabilities)

### For Product Team

1. Review [helm-product-positioning.md](bplan/docs/helm-product-positioning.md) (module positioning)
2. Reference [helm-strategy-master.md](bplan/helm-strategy-master.md) (market context)
3. Check [preso-outline.md](bplan/preso-outline.md) (roadmap items)

### For Analyst Briefings

1. Start with [helm-messaging-guide.md](bplan/docs/helm-messaging-guide.md) (analyst messaging)
2. Reference [helm-strategy-master.md](bplan/helm-strategy-master.md) (category analysis)
3. Show competitive positioning materials

### For EU AI Act Strategic Decision

1. Open [helm-eu-ai-act-strategy-selector.html](bplan/helm-eu-ai-act-strategy-selector.html) in browser
2. Review [helm-eu-ai-act-implementation-roadmap.md](bplan/docs/helm-eu-ai-act-implementation-roadmap.md)
3. Use [helm-compliance-messaging-playbook.md](bplan/docs/helm-compliance-messaging-playbook.md) for GTM activation

### For Market Research

1. Check [helm-research-master.md](bplan/helm-research-master.md) (quick reference)
2. Review [reference/market-research/](reference/market-research/) (source documents)
3. See [bplan/README.md](bplan/README.md) for detailed navigation

---

## 📚 Market Research Organization

### Research File Structure

The market research for Helm is organized in two complementary locations:

**Master Consolidation File**: `bplan/helm-research-master.md`

- Single source of truth for all market research
- Contains quick-reference data table, research article index, validation framework
- Used for: Quick fact-checking, investor conversations, complete market validation overview

**Individual Research Summaries**: `reference/market-research/` (Authoritative Path)

- Individual deep-dive research article summaries
- Each file documents a specific market validation source
- Used for: Detailed research review, source documentation, fact verification

### Research Article Categories

**VC & Strategic Theses**

- Foundation Capital context graphs and $Trillion opportunity thesis
- Ed Sim execution intelligence layer thesis
- Internal evidence and strategic validation

**Analyst Research**

- Gartner Decision Intelligence 2026 positioning
- Forrester Agent Control Planes 3-plane architecture
- Market research on AI ROI and governance requirements

**Customer Validation**

- Direct customer conversation summaries (Mike, Shibohn, Colby, Mark)
- Market need validation across enterprise verticals
- Urgency indicators and pain point confirmation

**Competitive & Category Analysis**

- Category brand comparison and positioning rationale
- Competitive landscape assessment
- Market timing and inflection analysis

### Current Research Files in `reference/market-research/`

| File                                                       | Purpose                                                  | Category             |
| ---------------------------------------------------------- | -------------------------------------------------------- | -------------------- |
| `2026-01-05-customer-validation-interviews.md`             | Ground-truth validation from customer conversations      | Customer Validation  |
| `2026-01-05-foundation-capital-context-graphs.md`          | VC thesis on context graphs and decision systems         | VC Thesis            |
| `2026-01-05-ed-sim-execution-intelligence-layer.md`        | Boldstart thesis on vertical specialization              | VC Thesis            |
| `2026-01-05-gartner-decision-intelligence-2026.md`         | Analyst positioning of Decision Intelligence as #1 trend | Analyst Research     |
| `2026-01-05-forrester-agent-control-planes.md`             | Analyst 3-plane architecture framework for agents        | Analyst Research     |
| `2026-01-03-category-brand-comparison.md`                  | Strategic analysis of positioning candidates             | Competitive Analysis |
| `2026-01-05-eu-ai-act-governance-requirements.md`          | EU AI Act compliance framework and requirements          | Regulatory           |
| `2026-01-05-synaptic-ai-predictions-2026-comprehensive.md` | Synaptic's 2026 AI market predictions                    | Market Analysis      |
| Additional research files                                  | [See complete list in reference/market-research/]        | Various              |

### How to Update Market Research

**Adding New Research**:

1. Create new file in `reference/market-research/` with date prefix: `YYYY-MM-DD-{description}.md`
2. Document source, date, category, and relevance
3. Add file to research article categories table in this CLAUDE.md
4. Reference in [helm-research-master.md](bplan/helm-research-master.md) index if appropriate

**Master File Updates**:

1. Update [helm-research-master.md](bplan/helm-research-master.md) research index
2. Add quick-reference data to validation table if applicable
3. Keep master file as consolidated reference, not primary source

**Workflow**:

- Individual research summaries are the authoritative source documents (`reference/market-research/`)
- Master consolidation file (`helm-research-master.md`) pulls from these sources
- Both should be version-controlled in git

---

## 🚀 Current Status & Next Steps

### Completed (Q1 2026)

- ✅ Primary positioning finalized: "Executive Agent for Service Leaders"
- ✅ Comprehensive market research and validation
- ✅ Competitive analysis and positioning framework
- ✅ EU AI Act market opportunity analysis (3 strategic paths identified)
- ✅ Markdown-native governance opportunity analysis ($3.2B-$4.8B TAM)
- ✅ Investor presentation outline with roadmap
- ✅ Strategic document reorganization (helm-positioning-master → helm-strategy-master)

### Pending Leadership Decision

- ⏳ **EU AI Act GTM Strategy**: Choose between 3 strategic paths:
  1. Aggressive Compliance Focus (€500M-1B in 6 months)
  2. Balanced Compliance + Strategy (€900M-1B + €11B expansion) - RECOMMENDED
  3. Productivity-Only (€100-200M)

### 2026 Roadmap

- **Q1**: Positioning finalized, market strategy outlined
- **Q2**: EU AI Act path activation, messaging campaigns launch
- **H2**: Markdown-native governance capability implementation

---

## 📋 Document Maintenance

### How to Update Core Documents

1. Edit relevant file (helm-strategy-master.md, preso-outline.md, etc.)
2. Update version date in document header
3. Commit with clear message
4. Update this CLAUDE.md if structure changes

### How to Archive Documents

1. Move to [bplan/archive/](bplan/archive/) subdirectory
2. Document reason for archiving
3. Keep organized by date

### Version Control

All documents are version controlled in git. Check recent commits to see what changed.

---

## 📚 Quick Reference Links

### Strategic Documents

- [helm-strategy-master.md](bplan/helm-strategy-master.md) - Master strategy
- [helm-research-master.md](bplan/helm-research-master.md) - Market research index
- [preso-outline.md](bplan/preso-outline.md) - Investor presentation
- [bplan/README.md](bplan/README.md) - Business planning navigation

### Market Research

- [reference/market-research/](reference/market-research/) - Source documents
- [2026-01-05-eu-ai-act-governance-requirements.md](reference/market-research/2026-01-05-eu-ai-act-governance-requirements.md)
- [fortress-iq-overview.md](reference/market-research/fortress-iq-overview.md)

### Visual Materials

- [helm-lifecycle-one-pager.html](bplan/docs/helm-lifecycle-one-pager.html)
- [helm-competitive-positioning-one-pager.html](bplan/docs/helm-competitive-positioning-one-pager.html)
- [helm-eu-ai-act-strategy-selector.html](bplan/helm-eu-ai-act-strategy-selector.html)
- [helm-markdown-governance-opportunity.html](bplan/docs/helm-markdown-governance-opportunity.html)

---

## 🔑 Key Contacts & Responsibilities

| Role          | Responsibility                                                 |
| ------------- | -------------------------------------------------------------- |
| Strategy Lead | Helm positioning, market insights, category development        |
| Product Owner | Product roadmap, module positioning, feature prioritization    |
| Sales Lead    | Customer conversations, messaging refinement, sales enablement |
| Research      | Market data, competitive intelligence, validation sources      |

---

## 📌 Important Notes

- **This document is the master state** - refer here when you need to understand project context
- **bplan/README.md** - Contains detailed navigation for business planning materials
- **Core documents are actively maintained** - Check dates and recent commits
- **Archives exist** - Historical debates and superseded documents are in bplan/archive/
- **No single source of truth for code** - This project is positioning/GTM focused; see .app/ for application code

---

## 📊 Key Market Data Points

### McKinsey State of AI 2025 - Critical Findings

**The Core Gap**: 88% of organizations use AI regularly, but only 39% see enterprise-level EBIT impact. This 49-point gap is Helm's core market opportunity.

**Agent Adoption Status**:
| Stage | % of Orgs |
|-------|-----------|
| Scaling agents | 23% |
| Experimenting | 39% |
| Not engaged | 38% |

**High Performer Differentiation**: High performers are **3x more likely** to have:

- Executive leadership actively driving AI adoption
- Scaled agents across most business functions
- Advanced agent use cases deployed

**Critical Success Factor**: McKinsey explicitly states **"Workflow redesign has the biggest effect on EBIT impact"** - this directly validates Helm's Design module positioning. Companies can't just deploy agents; they must redesign how work happens.

**Risk Escalation**: Companies managing 2x more AI-related risks in 2025 vs 2022 (4 vs 2 average). As agents scale, governance becomes critical.

**Helm Alignment**: The 61% of companies NOT seeing enterprise ROI are Helm's addressable market—they can deploy agents but lack infrastructure to redesign workflows and achieve governance at scale.

### Adjacent Market Categories

**Customer Success Platforms** (Forrester Wave Q4 2025):

- Gainsight, Totango, Planhat, ChurnZero
- Focus: Post-sales customer outcomes, retention/expansion
- Emerging sub-category: "Customer Growth Platforms" (Customer-Led Growth)

**Helm Differentiation**: These platforms focus on customer relationship management; Helm focuses on **decision intelligence and agent governance** for customer service operations—complementary but different markets.

---

---

## 📋 Positioning Guidelines

### When Positioning Helm

**NEW (Jan 2026)**: Position as the **Decision Intelligence Layer**, NOT a Control Plane
- Emphasize "executive co-pilot" and "command center" framing
- Focus on decision intelligence and context, not just data
- Highlight blind spots problem and strategic clarity solution
- Avoid "just another dashboard" or tool positioning
- **Key distinction**: "We show executives WHY decisions happen, not just monitor WHAT agents do"
- **Complementary to Control Plane vendors**: "Microsoft/GitHub govern agent operations; Helm governs strategic decisions"
- Use McKinsey framing: Enable executives to "set boundaries, validate decisions, and intervene when patterns emerge"

### When Discussing Technical Architecture

- Edge-first, privacy-preserving is core differentiator
- Fleet learning / aggregate intelligence is the moat
- Smart retention strategy balances comprehensive capture with privacy
- Natural language data mapping enables executive-friendly configuration

### When Discussing Business Model

- Always lead with freemium and SMB-first disruption
- Network effects and peer benchmarking are unique advantages
- Low-end disruption playbook (Atlassian, Zoom, Figma parallels)
- Unit economics demonstrate capital efficiency

### When Discussing Category

**CRITICAL (Jan 2026)**: Distinguish Helm's Decision Intelligence layer from Control Plane vendors
- Never position Helm as competing with Microsoft Agent 365, GitHub Agent Control Plane, or Salesforce Agentforce
- Frame as complementary: "Control Plane governs WHAT agents do; Helm governs WHY decisions get made"
- Reference Decision Intelligence / Context Graphs thought leadership (Foundation Capital, Ed Sim)
- Position as systems of record for decisions, not data
- Emphasize orchestration path structural advantage
- Use the Category Stack visual (Decision Intelligence → Control Plane → Orchestration → Execution)

### EVOLVE vs Helm: Understanding the Relationship

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

**The Strategic Relationship**:
- Helm appears to be a vertical market entry strategy or rebrand
- EVOLVE = horizontal platform, Helm = vertical application
- Both leverage same technical foundation (task mining, fleet learning, edge-first architecture)
- Current business plan documents may use EVOLVE branding and need updating for Helm positioning

---

## 📚 Reference Documents

### Most Recent Business Plan Documents (For Update)

Located in `/reference/bplan-prior-version/`:
- `EVOLVE_InvestorDeck.pptx` - PowerPoint presentation - NEEDS UPDATE FOR HELM
- `EVOLVE_Revenue_Model-edited.xlsx` - Revenue model spreadsheet - NEEDS UPDATE
- `EVOLVE_Expense_Model-edited2.xlsx` - Expense model spreadsheet - NEEDS UPDATE
- `EVOLVE_InvestorBrief.md/.pdf/.html` - Investor brief in multiple formats - NEEDS UPDATE
- `Product_Roadmap_2026.html` - Product roadmap by quarter - NEEDS REVIEW

### Latest Messaging & Capabilities

**IMPORTANT**: The most current and comprehensive messaging for Helm is documented in:
- `/reference/helm-latest-messaging.md` (Updated Jan 2, 2026)
- `/reference/latest-pitch/extracted-presentation.md` - Full text extraction from December 2025 investor presentation

These documents capture complete details from the AARP Conversation Presentation (December 18, 2025) including:
- Core positioning and messaging
- Four-module framework (Explore, Mine, Design, Manage)
- AI-native differentiation (6 key advantages)
- Technical architecture and deployment options
- Pricing model and monetization strategy
- Key capabilities deep dive
- Competitive differentiation
- Implementation considerations

---

**Last Updated**: January 29, 2026
**Branch**: add-ai-kb
**Status**: Strategic positioning complete, EU AI Act path decision pending, CLAUDE.md consolidated with historical knowledge base
