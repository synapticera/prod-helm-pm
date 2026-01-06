# Helm x-project Master State

This document is the master reference for the Helm project. It describes what we're building, where we are strategically, key decisions made, and how to navigate the project materials.

---

## 🎯 What is Helm?

**Helm** is an **Executive Agent Platform for Service Leaders** - the missing executive function layer that separates successful AI deployments from failed ones.

**The Problem We Solve**:

- 95% of AI projects fail or deliver zero ROI
- Companies have plenty of AI "arms and legs" (execution technology) but lack the executive function layer to govern, understand, plan, and measure results
- Service leaders can't answer: "What's my current state? Where should I add agents? How do I ensure it works?"

**Our Solution**:
Helm helps service leaders through the complete AI agent lifecycle:

1. **Understand** - Map current operations and constraints
2. **Plan** - Design agent integration strategy
3. **Sell** - Build internal business cases
4. **Execute** - Deploy with governance and decision tracing
5. **Monitor & Correct** - Measure results and iterate

**Why It Matters**:

- Helm users see 5-7x better outcomes vs 10-20% from ad-hoc deployment
- Decision trace infrastructure creates a competitive moat (more data = better recommendations)
- $1T+ productivity opportunity across enterprise service functions

---

## 📍 Project State & Key Decisions

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
   - Ed Sim: invested in "Execution Intelligence Layer" thesis
   - Gartner: Decision Intelligence #1 trend for 2026
   - Forrester: Agent Control Planes emerging requirement

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

- **TAM**: $1T+ across all enterprise service functions
- **SAM** (Service vertical, 2026): ~€10-15B
- **Beachhead**: Fortune 500 customer service operations
- **Key Insight**: 95% of AI projects fail; our platform separates winners (5-7x better outcomes) from failures

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

**Last Updated**: January 5, 2026
**Branch**: bk/initial-commit
**Status**: Strategic positioning complete, EU AI Act path decision pending
