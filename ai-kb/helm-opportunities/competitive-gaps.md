# Competitive Gaps Analysis: Where Helm Wins

## Overview

This document analyzes gaps in current market offerings that Helm is positioned to fill. Based on analysis of 18 vendor profiles, 182+ case studies, and tier-1 research from Gartner, Forrester, McKinsey, and MIT.

---

## Executive Summary: The Governance Gap

### The Market Reality

| What Exists                    | What's Missing                     |
| ------------------------------ | ---------------------------------- |
| Agent execution (many vendors) | Agent governance (no clear leader) |
| Platform analytics             | Decision intelligence              |
| Deployment tools               | Workflow redesign capability       |
| Point solutions                | Cross-platform visibility          |

### The Helm Opportunity

> "Every vendor we analyzed excels at making agents work. None of them help leaders understand, design, or govern how agents make decisions."

---

## Part 1: Vendor-by-Vendor Gap Analysis

### Salesforce Agentforce

**What They Do Well:**

- Atlas reasoning engine (best-in-class agent intelligence)
- Data Cloud integration (unified customer context)
- Trust Layer (responsible AI guardrails)
- Enterprise scale and ecosystem

**Gaps Helm Addresses:**

| Gap                       | Description                                        | Helm Solution                                  |
| ------------------------- | -------------------------------------------------- | ---------------------------------------------- |
| **Decision Visibility**   | No way to see why Atlas made specific decisions    | Mine captures decision traces                  |
| **Cross-Platform View**   | Only sees Salesforce agents, not Zendesk/others    | Platform-agnostic design                       |
| **Workflow Optimization** | No systematic way to redesign workflows            | Design module with data-driven recommendations |
| **External Governance**   | Trust Layer is internal; no external control plane | Manage provides external governance            |

**Key Quote from Case Studies:**

> "Agentforce handles 40% of cases autonomously, but we have no way to understand the other 60% or improve our resolution rate." — Service Leader at Wiley

---

### Zendesk AI

**What They Do Well:**

- Intent detection and ticket routing
- Answer Bot deflection
- Agent Workspace integration
- Knowledge base optimization

**Gaps Helm Addresses:**

| Gap                             | Description                                              | Helm Solution                               |
| ------------------------------- | -------------------------------------------------------- | ------------------------------------------- |
| **Resolution vs. Deflection**   | Tracks deflection, not true resolution                   | Outcome tracking beyond initial interaction |
| **Decision Context**            | Limited visibility into why specific answers were chosen | Decision trace capture                      |
| **Multi-Channel Orchestration** | Siloed by channel                                        | Cross-channel decision patterns             |
| **Strategic Workflow Design**   | Operational tool, not strategic planning                 | Design module for process optimization      |

---

### Intercom Fin

**What They Do Well:**

- Resolution engine (best-in-class resolution rates)
- Custom answers with source control
- Human handoff orchestration
- Developer-friendly API

**Gaps Helm Addresses:**

| Gap                         | Description                                             | Helm Solution                       |
| --------------------------- | ------------------------------------------------------- | ----------------------------------- |
| **Enterprise Governance**   | Built for product teams, not enterprise service leaders | Service leader-focused governance   |
| **Compliance Audit Trails** | Limited regulatory-grade logging                        | Complete audit trail infrastructure |
| **Workflow Redesign**       | No systematic process improvement                       | Design module                       |
| **Cross-Platform**          | Intercom-only visibility                                | Multi-platform integration          |

---

### NICE CXone

**What They Do Well:**

- Enlighten AI (interaction analytics)
- Autopilot (virtual agent)
- Workforce management integration
- Quality management

**Gaps Helm Addresses:**

| Gap                        | Description                                        | Helm Solution                                 |
| -------------------------- | -------------------------------------------------- | --------------------------------------------- |
| **Decision-Level Insight** | Analytics at interaction level, not decision level | Granular decision traces                      |
| **Prescriptive Actions**   | Descriptive analytics, limited prescription        | Design module with actionable recommendations |
| **Real-Time Governance**   | After-the-fact analysis                            | Real-time policy enforcement                  |

---

### ServiceNow Now Assist

**What They Do Well:**

- Virtual Agent for service requests
- Agent Workspace with AI assist
- IT and HR service automation
- Enterprise workflow platform

**Gaps Helm Addresses:**

| Gap                           | Description                               | Helm Solution                      |
| ----------------------------- | ----------------------------------------- | ---------------------------------- |
| **Customer Service Focus**    | IT/HR-centric, customer service secondary | Purpose-built for customer service |
| **External Agent Governance** | Only governs ServiceNow agents            | Platform-agnostic governance       |
| **Service Leader Interface**  | IT-centric UI and workflows               | Designed for service leaders       |

---

### Genesys Cloud

**What They Do Well:**

- Predictive routing
- Agent Copilot
- Journey orchestration
- Voice AI (native)

**Gaps Helm Addresses:**

| Gap                       | Description                 | Helm Solution                      |
| ------------------------- | --------------------------- | ---------------------------------- |
| **Decision Transparency** | Black-box routing decisions | Explainable decision traces        |
| **Strategic Planning**    | Operational focus           | Workflow redesign capability       |
| **Governance Layer**      | Internal only               | External governance infrastructure |

---

### Amazon Connect + Bedrock

**What They Do Well:**

- AWS ecosystem integration
- Bedrock AgentCore (agent orchestration)
- Pay-as-you-go pricing
- Voice AI infrastructure

**Gaps Helm Addresses:**

| Gap                      | Description                          | Helm Solution                      |
| ------------------------ | ------------------------------------ | ---------------------------------- |
| **Turnkey Solution**     | Requires significant development     | Ready-to-use governance platform   |
| **Service Leader Focus** | Technical/developer audience         | Business user interface            |
| **Best Practices**       | Infrastructure, not domain expertise | Customer service-specific guidance |

---

## Part 2: Category-Level Gaps

### Gap 1: Decision Visibility

**What the Market Has:**

- Interaction logs (what happened)
- Outcome metrics (resolution rate, CSAT)
- Basic routing information

**What's Missing:**

- Why agents made specific decisions
- What alternatives were considered
- Confidence levels and uncertainty
- Learning from decision patterns

**Helm's Solution:**

> Mine module captures complete decision traces—context, reasoning, alternatives, outcomes—creating the data foundation for improvement.

---

### Gap 2: Workflow Redesign

**What the Market Has:**

- Agent configuration tools
- Rule builders
- Routing logic editors

**What's Missing:**

- Data-driven workflow optimization
- Systematic process improvement
- Human-AI collaboration design
- Exception pattern analysis

**Helm's Solution:**

> Design module uses decision data to recommend workflow changes, optimize human-AI handoffs, and identify where processes should be redesigned.

**McKinsey Validation:**

> "The redesign of workflows has the biggest effect on an organization's ability to see EBIT impact from its use of gen AI."

---

### Gap 3: External Governance

**What the Market Has:**

- Vendor-specific guardrails
- Content moderation
- Basic access controls

**What's Missing:**

- External control plane
- Cross-platform policy enforcement
- Regulatory-grade audit trails
- Continuous governance monitoring

**Helm's Solution:**

> Manage module provides external governance infrastructure that works across agent platforms, ensuring policies are enforced regardless of which agent is executing.

**Forrester Validation:**

> "You cannot trust agents to police themselves; you need an external governance layer."

---

### Gap 4: Cross-Platform Intelligence

**What the Market Has:**

- Single-vendor analytics
- Siloed reporting
- Platform-specific dashboards

**What's Missing:**

- Unified view across agent platforms
- Cross-platform decision patterns
- Consistent governance across vendors
- Fleet-level learning

**Helm's Solution:**

> Platform-agnostic architecture that sits above agent vendors, providing unified visibility and governance across Salesforce, Zendesk, Intercom, custom solutions, etc.

---

### Gap 5: Service Leader Experience

**What the Market Has:**

- IT-centric administration
- Technical dashboards
- Developer tools

**What's Missing:**

- Business user interface
- Service leader dashboards
- Strategic decision support
- ROI validation tools

**Helm's Solution:**

> Purpose-built for service leaders, not IT administrators. Interface designed for the VP of Customer Service who needs to command operations, not configure systems.

---

## Part 3: Competitive Positioning Matrix

### By Capability

| Capability          | Salesforce | Zendesk | NICE | ServiceNow | Genesys | **Helm** |
| ------------------- | ---------- | ------- | ---- | ---------- | ------- | -------- |
| Agent Execution     | ✅         | ✅      | ✅   | ✅         | ✅      | —        |
| Decision Visibility | ⚠️         | ⚠️      | ⚠️   | ⚠️         | ⚠️      | ✅       |
| Workflow Redesign   | —          | —       | —    | ⚠️         | —       | ✅       |
| External Governance | —          | —       | —    | —          | —       | ✅       |
| Cross-Platform      | —          | —       | —    | —          | —       | ✅       |
| Service Leader UX   | ⚠️         | ⚠️      | ⚠️   | —          | ⚠️      | ✅       |

**Legend:** ✅ Strong ⚠️ Partial — Missing

---

### By Buyer Need

| Buyer Need                             | Market Solution  | Gap                             | Helm Solution         |
| -------------------------------------- | ---------------- | ------------------------------- | --------------------- |
| "I can't see what my agents are doing" | Agent dashboards | Shows activity, not decisions   | Decision traces       |
| "I can't prove ROI to my CFO"          | Basic metrics    | No business outcome attribution | ROI validation        |
| "My agents don't follow our policies"  | Content filters  | No external enforcement         | Policy governance     |
| "I don't know how to improve"          | A/B testing      | No systematic redesign          | Workflow optimization |
| "We use multiple platforms"            | Vendor analytics | Single platform only            | Cross-platform view   |

---

## Part 4: Defensibility Analysis

### Why Can't Incumbents Build This?

| Incumbent      | Structural Barrier                                       |
| -------------- | -------------------------------------------------------- |
| **Salesforce** | Incentive to optimize Agentforce, not govern competitors |
| **Zendesk**    | Platform economics require customers to stay in Zendesk  |
| **NICE**       | Contact center heritage, not decision intelligence DNA   |
| **ServiceNow** | IT workflow focus, customer service secondary            |
| **Genesys**    | Voice-centric architecture, digital secondary            |

### Helm's Structural Advantages

1. **Platform Independence:** No incentive to favor one agent vendor
2. **Decision-Level Focus:** Built for decision intelligence, not interaction management
3. **Service Leader Orientation:** Designed for business users, not IT
4. **Category Creation:** First mover in "Executive Agent" positioning

---

## Part 5: Go-to-Market Implications

### Messaging by Competitor

| When Competing Against | Lead With                                         |
| ---------------------- | ------------------------------------------------- |
| Salesforce             | Cross-platform visibility, external governance    |
| Zendesk                | Decision-level insight, strategic workflow design |
| NICE                   | Service leader UX, prescriptive recommendations   |
| ServiceNow             | Customer service focus, business user interface   |
| Genesys                | Decision transparency, workflow redesign          |

### Positioning Against "Do Nothing"

**For companies not yet deploying agents:**

- "Build governance from day one, not as an afterthought"
- "Avoid the ROI gap—88% deployed, only 39% seeing value"

**For companies in pilot phase:**

- "Turn pilot learning into organizational capability"
- "Move from Stage 2 to Stage 3 (+24pp profitability swing)"

**For companies with deployed agents:**

- "Finally see what your agents are actually doing"
- "Governance before it's a regulatory requirement"

---

## Part 6: Case Study Gaps

### What's Missing from Vendor Case Studies

| Gap                    | Description                                          | Helm Opportunity                          |
| ---------------------- | ---------------------------------------------------- | ----------------------------------------- |
| **Decision-Level ROI** | Case studies report deflection, not decision quality | Track and report decision-level metrics   |
| **Governance Success** | No case studies on governance implementation         | Create "governance first" success stories |
| **Cross-Platform**     | All case studies are single-vendor                   | Document multi-platform wins              |
| **Workflow Redesign**  | Deployment stories, not transformation               | Capture workflow redesign outcomes        |

### Target Case Study Types for Helm

1. **"From Blind to Visible"** — Companies that gained decision visibility
2. **"From Pilot to Production"** — Stage 2→3 transitions
3. **"Governance as Competitive Advantage"** — EU AI Act readiness
4. **"Cross-Platform Command"** — Multi-vendor orchestration

---

## Document Information

**Created:** 2026-01-20
**Last Updated:** 2026-01-20
**Sources:** 18 vendor profiles, 182+ case studies, tier-1 research
**Location:** ai-kb/helm-opportunities/competitive-gaps.md

**Related Documents:**

- [Positioning Summary](./positioning-summary.md)
- [ROI Alignment](./roi-alignment.md)
- [Vendor Profiles](../processed/vendor-profiles/)
