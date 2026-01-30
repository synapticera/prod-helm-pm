# Helm Agent Architecture: Technical Specification

**Version**: 1.0
**Date**: January 29, 2026
**Status**: Draft for Review
**Authors**: Helm Product & Engineering
**Audience**: Engineering, Product, Investors, Strategic Partners

---

## Executive Summary

This document defines Helm's distributed agent architecture - a system of eight specialized AI agents that work together to provide continuous decision intelligence for customer service operations.

**Key Innovation**: Helm implements Forrester's "Agent Control Plane" concept through a federated architecture where specialized agents handle sensing, planning, and acting across the decision lifecycle. Agents coordinate via event-driven choreography (background work) and orchestrated workflows (user interactions), sharing intelligence through a central Decision Graph.

**Strategic Positioning**: This architecture enables Helm to deliver on its promise as the "Decision Intelligence Platform for Customer Service" while naturally extending to other verticals (finance, operations, HR) as market demand grows.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [The Eight Core Agents](#the-eight-core-agents)
3. [Coordination Patterns](#coordination-patterns)
4. [Technology Stack](#technology-stack)
5. [Deployment Architecture](#deployment-architecture)
6. [Data Model: Decision Graph](#data-model-decision-graph)
7. [Implementation Roadmap](#implementation-roadmap)
8. [Appendices](#appendices)

---

## Architecture Overview

### The Three-Layer Model

```
┌────────────────────────────────────────────────────────────┐
│               CUSTOMER-FACING LAYER                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          Conversational Agent                         │  │
│  │       (User Interface & Orchestration)                │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────┬──────────────────────────────────┘
                          │
                          ▼
┌────────────────────────────────────────────────────────────┐
│                  SHARED INTELLIGENCE                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Decision Graph                           │  │
│  │  (Knowledge Store + Event Bus + Audit Trail)          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────┬──────────────────────────────────┘
                          │
                          ▼
┌────────────────────────────────────────────────────────────┐
│               AGENT PROCESSING LAYER                        │
│                                                             │
│  SENSING           PLANNING           ACTING                │
│  ┌──────────┐     ┌──────────┐      ┌──────────┐          │
│  │Discovery │     │ Strategy │      │Execution │          │
│  │  Agent   │     │  Agent   │      │  Agent   │          │
│  └──────────┘     └──────────┘      └──────────┘          │
│                                                             │
│  ┌──────────┐     ┌──────────┐      ┌──────────┐          │
│  │ Analysis │     │Simulation│      │ Insight  │          │
│  │  Agent   │     │  Agent   │      │  Agent   │          │
│  └──────────┘     └──────────┘      └──────────┘          │
│                                                             │
│  ┌──────────────────────────────────────────────┐          │
│  │       Market Sensing Agent                   │          │
│  │     (External Intelligence)                  │          │
│  └──────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

### Architectural Principles

1. **Single Responsibility**: Each agent owns one problem domain
2. **Bounded Context**: Clear interfaces, minimal coupling
3. **Asynchronous by Default**: Non-blocking communication
4. **Shared Memory**: Central Decision Graph for all agents
5. **Human-in-the-Loop**: Critical decisions require approval
6. **Observability**: Every action traced and logged
7. **Graceful Degradation**: System functions if agents fail
8. **Scalable Independence**: Each agent scales independently

---

## The Eight Core Agents

### 1. Discovery Agent (Sensing)

**Responsibility**: Continuous ambient capture of decision-making activities

**Runtime Profile**:
- Execution: 24/7 background process
- Scaling: Horizontal (multiple instances per data source)
- Latency: Real-time (<1s from event to capture)

**Core Capabilities**:

```typescript
interface DiscoveryAgent {
  // Primary function: Capture decision events
  async captureDecision(event: DecisionEvent): Promise<void> {
    const decision = {
      id: generateId(),
      timestamp: event.timestamp,
      type: event.type,              // escalation, routing, resolution, etc.
      context: {
        customerId: event.customerId,
        channel: event.channel,       // chat, email, phone
        urgency: event.urgency,
        complexity: event.complexity,
        history: await this.getCustomerHistory(event.customerId)
      },
      outcome: event.outcome,          // success, failure, pending
      metrics: {
        resolutionTime: event.metrics.resolutionTime,
        satisfactionScore: event.metrics.csat,
        cost: event.metrics.cost
      },
      trace: event.trace               // Full decision lineage
    }

    // Write to Decision Graph
    await decisionGraph.write(decision)

    // Emit event for downstream agents
    eventBus.emit('decision.captured', decision)
  }

  // Intelligence: Pattern recognition
  async identifyNewPatterns(): Promise<Pattern[]> {
    // ML model detects emerging decision types not in taxonomy
    const novel = await this.detectNovelDecisions()
    return novel.filter(d => d.confidence > 0.85)
  }

  // Intelligence: Adaptive sampling
  async determineCapturePriority(event: DecisionEvent): Priority {
    // Don't capture routine decisions, focus on edge cases
    const importance = await this.scoreImportance(event)
    return importance > threshold ? 'CAPTURE' : 'SKIP'
  }
}
```

**Data Sources**:
- CRM events (Salesforce, HubSpot, Zendesk)
- Chat logs (Intercom, Drift)
- Phone transcripts (Dialpad, Gong)
- Email threads (Gmail, Outlook)
- Internal tools (ticketing systems, knowledge bases)

**Integration Pattern**: Webhooks + streaming APIs

**Example Event Flow**:

```
Customer calls support about billing issue
  └─> Discovery Agent captures:
      - Decision type: billing_dispute
      - Context: $500 charge, customer tenure 3 years, VIP tier
      - Agent decision: issue refund (high-value customer retention)
      - Outcome: customer satisfied (CSAT 5/5)
      - Cost: $500 refund
  └─> Write to Decision Graph
  └─> Emit decision.captured event
```

---

### 2. Analysis Agent (Sensing → Planning Bridge)

**Responsibility**: Extract actionable insights from captured decisions

**Runtime Profile**:
- Execution: Batch (scheduled) + Real-time (on-demand)
- Scaling: Vertical (CPU/memory intensive)
- Latency: Batch (minutes), Real-time (seconds)

**Core Capabilities**:

```typescript
interface AnalysisAgent {
  // Pattern detection: Find recurring decision patterns
  async detectPatterns(timeRange: TimeRange): Promise<Pattern[]> {
    const decisions = await decisionGraph.query({
      timeRange,
      limit: 10000
    })

    // Cluster similar decisions
    const clusters = await this.clusterDecisions(decisions)

    // Identify patterns
    return clusters.map(cluster => ({
      id: generateId(),
      type: cluster.type,
      frequency: cluster.count,
      avgOutcome: cluster.metrics.avgCSAT,
      trend: this.computeTrend(cluster),
      significance: this.assessSignificance(cluster)
    }))
  }

  // Causal inference: Why did X happen?
  async explainCausality(question: string): Promise<Explanation> {
    // Example: "Why did escalations spike 20% last week?"

    // 1. Parse question
    const intent = await this.parseIntent(question)

    // 2. Fetch relevant decisions
    const decisions = await decisionGraph.query({
      type: 'escalation',
      timeRange: 'last_week'
    })

    // 3. Identify causal factors
    const factors = await this.identifyCauses(decisions)

    // 4. Rank by impact
    return {
      primaryCause: factors[0],      // e.g., "Staffing shortage"
      contributingFactors: factors.slice(1),
      quantification: "18% of variance explained",
      confidence: 0.87
    }
  }

  // Opportunity detection: Where can we improve?
  async identifyOpportunities(): Promise<Opportunity[]> {
    const patterns = await this.detectPatterns('last_30_days')

    return patterns
      .filter(p => p.significance > 0.7)
      .map(p => ({
        description: this.describeOpportunity(p),
        impact: this.estimateImpact(p),
        effort: this.estimateEffort(p),
        priority: this.computePriority(p)
      }))
      .sort((a, b) => b.priority - a.priority)
  }
}
```

**Analysis Types**:

1. **Descriptive**: What happened? (trends, distributions)
2. **Diagnostic**: Why did it happen? (causal factors)
3. **Predictive**: What will happen? (forecasts)
4. **Prescriptive**: What should we do? (recommendations)

**Triggers**:
- Scheduled: Daily deep analysis, weekly reports
- Event-driven: When decision corpus reaches threshold (e.g., 100 new escalations)
- On-demand: User asks "why" question

**Example Insight Generation**:

```
Input: 1000 escalation decisions from last week

Analysis:
  Pattern 1: Complex billing disputes → 80% escalation rate
  Pattern 2: After-hours calls → 60% escalation rate
  Pattern 3: New customer onboarding → 40% escalation rate

Causal Analysis:
  Root cause: Tier 1 agents lack training on new billing system
  Contributing: Staffing shortage during evening shifts

Opportunity:
  Action: Provide billing system training to Tier 1
  Expected Impact: Reduce escalations by 25%
  Confidence: 0.82

Output: insights.ready event → Strategy Agent
```

---

### 3. Strategy Agent (Planning)

**Responsibility**: Generate optimal decision policies based on insights

**Runtime Profile**:
- Execution: On-demand (human-triggered or insight-triggered)
- Scaling: Horizontal (parallel strategy generation)
- Latency: Minutes (deep reasoning)

**Core Capabilities**:

```typescript
interface StrategyAgent {
  // Policy optimization: Create new decision rules
  async optimizePolicy(
    goal: Goal,
    constraints: Constraint[]
  ): Promise<Policy> {
    // Goal: "Reduce escalations while maintaining CSAT"
    // Constraints: ["Cost increase < 10%", "Implementation time < 30 days"]

    // 1. Generate candidate policies
    const candidates = await this.generateCandidates(goal)

    // 2. Simulate each candidate
    const simulations = await Promise.all(
      candidates.map(c => simulationAgent.simulate(c))
    )

    // 3. Multi-objective optimization
    const optimal = this.selectOptimal(simulations, constraints)

    return {
      policy: optimal.policy,
      expectedImpact: {
        escalations: "-25%",
        csat: "+2%",
        cost: "+5%"
      },
      confidence: optimal.confidence,
      rationale: optimal.reasoning
    }
  }

  // Scenario planning: What-if analysis
  async exploreScenarios(
    baseline: Policy,
    variations: Variation[]
  ): Promise<Scenario[]> {
    // Example variations:
    // - Increase Tier 1 training hours
    // - Add AI assist for complex cases
    // - Adjust escalation thresholds

    return Promise.all(
      variations.map(async (v) => ({
        variation: v,
        outcome: await this.projectOutcome(baseline, v),
        tradeoffs: this.analyzeTradeoffs(v)
      }))
    )
  }

  // Risk assessment: What could go wrong?
  async assessRisks(policy: Policy): Promise<Risk[]> {
    return [
      {
        description: "Lower escalation threshold may overload Tier 2",
        likelihood: 0.6,
        impact: "Medium",
        mitigation: "Hire 2 additional Tier 2 agents"
      },
      // ...
    ]
  }
}
```

**Strategy Types**:

1. **Reactive**: Respond to identified problems
2. **Proactive**: Anticipate future challenges
3. **Adaptive**: Continuous policy refinement
4. **Exploratory**: Test novel approaches

**Triggers**:
- Analysis Agent identifies high-priority opportunity
- User requests: "How can we reduce escalations?"
- Scheduled: Quarterly policy review
- Market Sensing Agent detects industry shift

**Human Approval Gate**:

```typescript
async function deployPolicy(policy: Policy) {
  // NEVER auto-deploy - always require human approval
  const approval = await requestHumanApproval({
    policy,
    simulation: await simulationAgent.simulate(policy),
    risks: await strategyAgent.assessRisks(policy),
    approver: 'ops-manager'
  })

  if (approval.approved) {
    await executionAgent.deploy(policy)

    // Log for audit
    await auditLog.write({
      action: 'policy.deployed',
      policy,
      approvedBy: approval.approver,
      timestamp: Date.now()
    })
  }
}
```

---

### 4. Simulation Agent (Planning Support)

**Responsibility**: Test policies before production deployment

**Runtime Profile**:
- Execution: On-demand (triggered by Strategy Agent)
- Scaling: Horizontal (parallel simulations)
- Latency: Seconds to minutes (depends on data volume)

**Core Capabilities**:

```typescript
interface SimulationAgent {
  // Time-travel simulation: Replay history with new policy
  async simulate(policy: Policy): Promise<SimulationResult> {
    // Fetch historical decisions (last 30 days)
    const decisions = await decisionGraph.query({
      timeRange: 'last_30_days'
    })

    // Replay each decision with new policy
    const results = await Promise.all(
      decisions.map(d => this.applyPolicy(d, policy))
    )

    // Aggregate outcomes
    return {
      baselineMetrics: this.aggregate(decisions),
      simulatedMetrics: this.aggregate(results),
      delta: this.computeDelta(decisions, results),
      confidence: this.estimateConfidence(results)
    }
  }

  // Monte Carlo simulation: Test under uncertainty
  async monteCarloSimulation(
    policy: Policy,
    scenarios: number = 1000
  ): Promise<Distribution> {
    // Generate random scenarios (varying load, complexity, etc.)
    const outcomes = await Promise.all(
      Array(scenarios).fill(0).map(() =>
        this.simulateRandomScenario(policy)
      )
    )

    return {
      mean: this.mean(outcomes),
      median: this.median(outcomes),
      p5: this.percentile(outcomes, 5),
      p95: this.percentile(outcomes, 95),
      confidence: "95%"
    }
  }

  // A/B test planning: Design experiments
  async designExperiment(
    control: Policy,
    treatment: Policy
  ): Promise<ExperimentPlan> {
    return {
      duration: this.estimateDuration(control, treatment),
      sampleSize: this.computeSampleSize(control, treatment),
      successCriteria: this.defineSuccess(treatment),
      risks: this.identifyRisks(treatment)
    }
  }
}
```

**Simulation Types**:

1. **Historical Replay**: "What if we had this policy last month?"
2. **Synthetic Scenarios**: "What if load increases 50%?"
3. **Stress Testing**: "What's the worst-case outcome?"
4. **A/B Test Preview**: "How long until statistical significance?"

**Example Simulation**:

```
Policy Change: Reduce escalation threshold from 3 → 2 touches

Historical Replay (last 30 days):
  Baseline:
    - Escalations: 1,000 (20%)
    - Avg resolution time: 24 hours
    - CSAT: 4.2/5
    - Cost per ticket: $15

  Simulated (new policy):
    - Escalations: 750 (15%)
    - Avg resolution time: 18 hours
    - CSAT: 4.4/5
    - Cost per ticket: $18

  Delta:
    - Escalations: -25% ✓
    - Resolution time: -25% ✓
    - CSAT: +4.8% ✓
    - Cost: +20% ⚠️

  Recommendation: APPROVE with caveat on cost increase
  Confidence: 87%
```

---

### 5. Execution Agent (Acting)

**Responsibility**: Enforce policies in production and log all decisions

**Runtime Profile**:
- Execution: Real-time (sub-second response)
- Scaling: Horizontal (stateless, high throughput)
- Latency: <100ms per decision

**Core Capabilities**:

```typescript
interface ExecutionAgent {
  // Real-time decision making
  async decide(context: DecisionContext): Promise<Decision> {
    // 1. Fetch applicable policy
    const policy = await this.getActivePolicy(context.type)

    // 2. Apply policy logic
    const decision = await this.applyPolicy(policy, context)

    // 3. Check confidence threshold
    if (decision.confidence < this.confidenceThreshold) {
      // Escalate to human
      return this.escalateToHuman(context, decision)
    }

    // 4. Log decision trace (compliance)
    await this.logDecisionTrace({
      context,
      policy: policy.id,
      decision,
      timestamp: Date.now(),
      agent: 'execution'
    })

    // 5. Execute decision
    return decision
  }

  // Policy deployment
  async deployPolicy(policy: Policy): Promise<void> {
    // Validate policy
    await this.validatePolicy(policy)

    // Version control
    const version = await this.versionPolicy(policy)

    // Gradual rollout (canary deployment)
    await this.canaryDeploy(policy, {
      initialTraffic: 0.05,  // 5% of decisions
      increment: 0.1,        // Increase by 10% every hour
      rollbackOnError: true
    })
  }

  // Graceful degradation
  async handleFailure(context: DecisionContext): Decision {
    // If policy application fails, fall back to safe default
    return {
      action: 'ESCALATE_TO_HUMAN',
      rationale: 'Policy application failed',
      confidence: 0.0
    }
  }
}
```

**Decision Enforcement Pattern**:

```typescript
// Example: Customer support ticket routing

Inbound Ticket:
  Customer: VIP tier, 3-year tenure
  Issue: Billing dispute, $500 charge
  Channel: Chat
  Urgency: High

Execution Agent:
  1. Fetch policy: VIP_Routing_Policy_v2.3
  2. Apply rules:
     - VIP + billing → Route to Tier 2 specialist
     - High urgency → Priority queue
     - Amount > $100 → Enable instant refund authority
  3. Confidence: 0.95 (high)
  4. Decision: Route to Tier 2 (agent ID: 42), authorize refund
  5. Log trace:
     {
       ticket_id: '123',
       policy: 'VIP_Routing_Policy_v2.3',
       decision: 'route_tier2_agent42',
       confidence: 0.95,
       timestamp: 1706558400,
       trace: [context, policy, decision]
     }
```

**EU AI Act Compliance**:

Every decision trace includes:
- Input context (what led to this decision)
- Policy applied (which rules governed)
- Decision output (what action was taken)
- Confidence score (how certain was the system)
- Human override capability (can be reversed)

---

### 6. Insight Agent (Acting - Visualization)

**Responsibility**: Generate visualizations and narratives for stakeholders

**Runtime Profile**:
- Execution: On-demand (user-triggered)
- Scaling: Horizontal (stateless)
- Latency: Seconds (interactive)

**Core Capabilities**:

```typescript
interface InsightAgent {
  // Natural language question answering
  async answerQuestion(question: string): Promise<Insight> {
    // 1. Parse intent
    const intent = await this.parseIntent(question)
    // Example: "Why did escalations increase last week?"

    // 2. Query Decision Graph
    const data = await decisionGraph.query(intent.query)

    // 3. Coordinate with Analysis Agent for deep reasoning
    const analysis = await analysisAgent.explain(intent)

    // 4. Select visualization type
    const vizType = this.selectVisualization(data, intent)

    // 5. Generate chart + narrative
    return {
      visualization: this.generateChart(data, vizType),
      narrative: this.generateNarrative(analysis),
      sources: data.sources,
      confidence: analysis.confidence
    }
  }

  // Proactive insights: "You should know..."
  async generateProactiveInsights(): Promise<Insight[]> {
    // Monitor for significant changes
    const anomalies = await this.detectAnomalies()

    return anomalies.map(a => ({
      title: `${a.metric} ${a.direction} ${a.magnitude}`,
      description: this.explainAnomaly(a),
      urgency: this.assessUrgency(a),
      recommendedAction: this.suggestAction(a)
    }))
  }

  // Dashboard generation: Custom views for roles
  async generateDashboard(role: Role): Promise<Dashboard> {
    // Role: ops-manager, ceo, analyst, etc.

    const widgets = this.selectWidgets(role)

    return {
      widgets: await Promise.all(
        widgets.map(w => this.renderWidget(w, role))
      ),
      refreshInterval: this.determineRefreshRate(role)
    }
  }
}
```

**Visualization Types**:

1. **Time Series**: Trends over time (escalations, CSAT, cost)
2. **Distribution**: Histograms, box plots (resolution time distribution)
3. **Correlation**: Scatter plots (complexity vs resolution time)
4. **Flow**: Sankey diagrams (routing decisions)
5. **Heatmaps**: Time-of-day patterns
6. **Tables**: Ranked lists (top issues, agents, customers)

**Narrative Generation**:

```typescript
// User asks: "Why did escalations spike last week?"

Insight Agent generates:

Visualization:
  [Time series chart showing 20% spike on Tuesday]

Narrative:
  "Escalations increased by 20% last week, primarily on Tuesday
   and Wednesday. Analysis identified three contributing factors:

   1. Staffing shortage (40% of variance)
      - 2 senior agents on PTO
      - Coincided with product launch support spike

   2. Complex billing system issues (30% of variance)
      - New pricing tier causing confusion
      - Tier 1 agents lacked training

   3. After-hours surge (30% of variance)
      - Late-night calls routed to less experienced agents

   Recommendation: Provide billing system training to Tier 1
   agents and consider temporary evening shift coverage."

Confidence: 87%
Sources: 342 escalation decisions from Jan 20-26
```

---

### 7. Conversational Agent (Customer-Facing)

**Responsibility**: Natural language interface for users (internal ops team, customers)

**Runtime Profile**:
- Execution: Real-time (conversational)
- Scaling: Horizontal (hundreds of concurrent sessions)
- Latency: <2s per turn

**Core Capabilities**:

```typescript
interface ConversationalAgent {
  // Multi-turn conversation management
  async handleMessage(
    message: string,
    sessionId: string
  ): Promise<Response> {
    // 1. Load session context
    const session = await this.loadSession(sessionId)

    // 2. Parse user intent
    const intent = await this.parseIntent(message, session)

    // 3. Route to appropriate agent(s)
    if (intent.type === 'QUESTION') {
      // Orchestrate: Insight Agent → Analysis Agent
      const answer = await insightAgent.answer(intent.question)
      return this.formatResponse(answer)
    }

    if (intent.type === 'DECISION_REQUEST') {
      // Orchestrate: Execution Agent
      const decision = await executionAgent.decide(intent.context)

      // If low confidence, also get alternatives
      if (decision.confidence < 0.8) {
        const alternatives = await strategyAgent.suggestAlternatives(decision)
        return this.formatResponseWithAlternatives(decision, alternatives)
      }

      return this.formatResponse(decision)
    }

    if (intent.type === 'POLICY_CHANGE') {
      // Orchestrate: Strategy → Simulation → Human Approval
      return this.initiateApprovalWorkflow(intent)
    }

    // 4. Update session context
    await this.updateSession(sessionId, message, response)

    return response
  }

  // Proactive notifications
  async notify(insight: Insight, users: User[]): Promise<void> {
    // Send via appropriate channel (Slack, email, in-app)
    await Promise.all(
      users.map(u => this.sendNotification(u, insight))
    )
  }

  // Escalation to human
  async escalateToHuman(
    context: Context,
    reason: string
  ): Promise<void> {
    // Hand off to human operator with full context
    await this.createHandoffTicket({
      context,
      reason,
      conversationHistory: await this.getHistory(context.sessionId)
    })
  }
}
```

**Conversational Patterns**:

```typescript
// Example 1: Question Answering

User: "Why are escalations up this week?"

Conversational Agent:
  → Parse intent: QUESTION about escalations trend
  → Route to: Insight Agent
  → Insight Agent coordinates with Analysis Agent
  → Return: Chart + narrative explanation

Response: "Escalations increased 20% this week due to..."


// Example 2: Decision Support

User: "I have a VIP customer disputing a $500 charge. What should I do?"

Conversational Agent:
  → Parse intent: DECISION_REQUEST for billing dispute
  → Route to: Execution Agent
  → Execution Agent applies VIP_Billing_Policy
  → Confidence: 0.95

Response: "Based on our VIP retention policy, you're authorized
          to issue an immediate refund. The customer has 3-year
          tenure and high lifetime value ($50K). This decision
          has been logged for compliance."


// Example 3: Policy Exploration

User: "What if we lowered the escalation threshold to 2 touches?"

Conversational Agent:
  → Parse intent: WHAT_IF scenario request
  → Route to: Strategy Agent → Simulation Agent
  → Simulation runs historical replay

Response: "Lowering the threshold to 2 touches would reduce
          escalations by ~25% but increase cost by ~20%.
          Here's a detailed simulation..."
```

**User Roles & Permissions**:

- **Ops Manager**: Full access (view insights, propose policies, approve changes)
- **Analyst**: Read-only access (view insights, run simulations)
- **Agent**: Limited access (get decision support, view relevant context)
- **Executive**: Dashboard access (high-level KPIs, strategic insights)

---

### 8. Market Sensing Agent (External Intelligence)

**Responsibility**: Monitor external environment and provide strategic context

**Runtime Profile**:
- Execution: Scheduled (daily scan, weekly deep analysis)
- Scaling: Single instance (rate-limited external APIs)
- Latency: Minutes to hours (deep research)

**Core Capabilities**:

```typescript
interface MarketSensingAgent {
  // External signal detection
  async scanEnvironment(): Promise<Signal[]> {
    const signals = await Promise.all([
      this.scanIndustryNews(),
      this.monitorCompetitors(),
      this.trackRegulations(),
      this.analyzeBenchmarks(),
      this.scrapeSocialMedia(),
      this.reviewAcademicResearch()
    ])

    // Filter for relevance
    return signals
      .flat()
      .filter(s => this.isRelevant(s))
      .sort((a, b) => b.importance - a.importance)
  }

  // Competitive intelligence
  async analyzeCompetitor(competitor: string): Promise<Analysis> {
    return {
      recentMoves: await this.getRecentAnnouncements(competitor),
      productChanges: await this.detectProductChanges(competitor),
      marketPosition: await this.assessMarketPosition(competitor),
      threats: this.identifyThreats(competitor),
      opportunities: this.identifyOpportunities(competitor)
    }
  }

  // Regulatory monitoring
  async trackCompliance(): Promise<Regulation[]> {
    return [
      {
        name: 'EU AI Act',
        effectiveDate: '2026-08-02',
        requirements: [
          'Transparent decision lineage',
          'Meaningful human review',
          'Risk impact assessment'
        ],
        helm_compliance: await this.assessCompliance('EU_AI_ACT')
      },
      // ... other regulations
    ]
  }

  // Strategic recommendations
  async generateStrategicInsights(): Promise<Insight[]> {
    const signals = await this.scanEnvironment()

    return signals
      .filter(s => s.actionable)
      .map(s => ({
        signal: s,
        impact: this.assessImpact(s),
        urgency: this.assessUrgency(s),
        recommendation: this.generateRecommendation(s)
      }))
  }
}
```

**Data Sources**:

1. **Industry Research**:
   - Forrester, Gartner, McKinsey reports
   - IDC, CB Insights market data
   - Trade publications (e.g., ContactCenterWorld)

2. **Competitive Intelligence**:
   - Company announcements (press releases, earnings)
   - Product changes (pricing, features, positioning)
   - Customer reviews (G2, Capterra, TrustRadius)

3. **Regulatory Tracking**:
   - EU AI Act updates
   - State-level AI laws (US)
   - Industry-specific regulations (GDPR, CCPA, HIPAA)

4. **Academic Research**:
   - arXiv papers on AI decision-making
   - Conference proceedings (NeurIPS, ICML, AAAI)
   - Industry case studies

5. **Social Sentiment**:
   - Twitter, LinkedIn discussions
   - Reddit communities (r/customerservice, r/MachineLearning)
   - Hacker News trends

**Example Signal Processing**:

```typescript
// Signal detected: Forrester announces Agent Control Plane research

Market Sensing Agent:

  1. Scan: Forrester blog post detected
  2. Extract:
     - Category: Agent Control Plane
     - Announcement: Market evaluation coming Q1 2026
     - Key features: Inventory, policies, monitoring, control, compliance

  3. Analyze relevance:
     - Helm's positioning: Decision Intelligence Platform
     - Overlap: 100% (Helm implements all 5 control plane features)
     - Opportunity: Category leadership
     - Urgency: HIGH (first-mover advantage)

  4. Generate recommendation:
     {
       signal: 'Forrester Agent Control Plane announcement',
       impact: 'CRITICAL',
       urgency: 'HIGH',
       recommendation: [
         'Update messaging to claim "Agent Control Plane" positioning',
         'Brief Forrester analysts on Helm capabilities',
         'Accelerate product roadmap for control plane features',
         'Prepare for market evaluation participation'
       ]
     }

  5. Route to Strategy Agent + alert leadership
```

**Strategic Value**:

- **Early Warning**: Detect threats before they materialize
- **Opportunity Identification**: Spot market shifts before competitors
- **Positioning Guidance**: Align Helm's messaging with market language
- **Compliance Preparedness**: Stay ahead of regulatory changes

---

## Coordination Patterns

### Pattern 1: Event-Driven Choreography (Background Work)

**When to Use**: Continuous ambient processes with no strict ordering

**Architecture**:

```typescript
// Central event bus
const eventBus = new EventEmitter()

// Agents publish events
class DiscoveryAgent {
  async captureDecision(decision: Decision) {
    await decisionGraph.write(decision)
    eventBus.emit('decision.captured', decision)
  }
}

// Agents subscribe independently
class AnalysisAgent {
  constructor() {
    eventBus.on('decision.captured', async (decision) => {
      const count = await this.getDecisionCount(decision.type)

      if (count >= 100) {
        const insights = await this.analyze(decision.type)
        eventBus.emit('insights.ready', insights)
      }
    })
  }
}

class MarketSensingAgent {
  constructor() {
    // Also subscribes to same event (parallel processing)
    eventBus.on('decision.captured', async (decision) => {
      await this.enrichWithMarketContext(decision)
    })
  }
}

// No central orchestrator - agents coordinate via events
```

**Pros**:
- Agents scale independently
- Failure isolation (one agent crash doesn't stop others)
- Easy to add new agents (just subscribe)
- Natural parallelism

**Cons**:
- Harder to debug (distributed trace required)
- No global transaction guarantees
- Eventual consistency

**Use Cases**:
- Discovery Agent → Analysis Agent
- Analysis Agent → Strategy Agent
- Market Sensing Agent → Strategy Agent

---

### Pattern 2: Orchestrated Workflows (User-Initiated)

**When to Use**: Synchronous user requests requiring coordinated response

**Architecture**:

```typescript
class ConversationalOrchestrator {
  async handleUserQuestion(question: string): Promise<Response> {
    try {
      // Sequential coordination with clear flow

      // Step 1: Parse intent (must complete first)
      const intent = await this.parseIntent(question)

      // Step 2: Gather context (depends on intent)
      const context = await this.gatherContext(intent)

      // Step 3: Coordinate multiple agents based on intent
      if (intent.type === 'WHY_QUESTION') {
        // Parallel: Query Decision Graph + Market Context
        const [decisions, marketContext] = await Promise.all([
          decisionGraph.query(intent.query),
          marketSensingAgent.getContext(intent.subject)
        ])

        // Sequential: Analysis → Visualization
        const analysis = await analysisAgent.explain(decisions, marketContext)
        const visualization = await insightAgent.visualize(analysis)

        return {
          answer: visualization,
          trace: this.buildTrace([intent, context, analysis, visualization])
        }
      }

      // ... other intent types

    } catch (error) {
      // Centralized error handling
      return this.handleError(error)
    }
  }
}
```

**Pros**:
- Clear execution path (easy to debug)
- Transactional semantics (all-or-nothing)
- Immediate response (no eventual consistency)
- Centralized error handling

**Cons**:
- Orchestrator is single point of failure
- Tighter coupling between agents
- Less scalable (orchestrator bottleneck)

**Use Cases**:
- Conversational Agent coordinating responses
- Policy deployment workflows (Strategy → Simulation → Approval → Execution)

---

### Pattern 3: Hybrid (Helm's Approach)

**Background**: Event-Driven Choreography
**Foreground**: Orchestrated Workflows

```typescript
// BACKGROUND: Always running, event-driven

// Discovery Agent captures continuously
discoveryAgent.startContinuous()

// Analysis Agent processes in batches
cron.schedule('0 2 * * *', async () => {
  await analysisAgent.runDailyAnalysis()
})

// Market Sensing Agent scans weekly
cron.schedule('0 9 * * MON', async () => {
  const signals = await marketSensingAgent.scan()
  eventBus.emit('market.signals', signals)
})

// Agents coordinate via events
eventBus.on('insights.ready', async (insights) => {
  if (insights.priority === 'HIGH') {
    await strategyAgent.generateStrategies(insights)
  }
})


// FOREGROUND: User-initiated, orchestrated

app.post('/api/ask', async (req, res) => {
  const orchestrator = new ConversationalOrchestrator()
  const response = await orchestrator.handle(req.body.question, req.user)
  res.json(response)
})
```

---

## Technology Stack

### Core Infrastructure

```yaml
# Agent Runtime
LangGraph: Agent orchestration framework (from LangChain)
  - State management for multi-step reasoning
  - Built-in support for LLM tool calling
  - Graph-based agent coordination

Temporal: Workflow engine for long-running tasks
  - Durable execution (survives crashes)
  - Built-in retry and error handling
  - Time-travel debugging

# Message Queue
BullMQ: Event bus for agent communication
  - Redis-backed job queue
  - Priority queues, delayed jobs
  - Horizontal scaling

# LLM Providers
Anthropic Claude: Primary reasoning engine
  - Sonnet 4.5 for complex analysis
  - Haiku for simple classification
  - Extended thinking for deep reasoning

OpenAI GPT-4: Backup/fallback
  - Structured output mode
  - Function calling

# Memory & Storage
PostgreSQL: Decision Graph relational store
  - JSONB for flexible decision schema
  - Full-text search (pg_trgm)
  - Time-series extensions (TimescaleDB)

Pinecone/Weaviate: Vector embeddings
  - Semantic search over decisions
  - Similarity detection
  - RAG for context retrieval

Redis: Agent coordination
  - Session state
  - Rate limiting
  - Distributed locks

# Communication
gRPC: Agent-to-agent RPC
  - Type-safe communication
  - Streaming support
  - Load balancing

WebSockets: Real-time UI updates
  - Live dashboard updates
  - Conversational Agent streaming

Kafka/Pulsar: High-volume event streaming
  - Decision event ingestion
  - Cross-region replication
  - Exactly-once semantics

# Observability
OpenTelemetry: Distributed tracing
  - Trace every agent interaction
  - Cross-agent correlation
  - Performance profiling

Prometheus + Grafana: Metrics
  - Agent latency, throughput
  - Decision Graph query performance
  - Cost tracking (LLM tokens)

LangSmith: LLM debugging
  - Prompt/response logging
  - Cost attribution
  - Quality evaluation

# Frontend
Next.js 15: Web application
  - React Server Components
  - Vercel AI SDK integration
  - Streaming UI updates

shadcn/ui: Component library
  - Forms, dialogs, commands
  - Accessible, customizable

Recharts/Tremor: Data visualization
  - Time series, distributions
  - Interactive dashboards
```

### Deployment Stack

```yaml
# Container Orchestration
Kubernetes: Agent deployment
  - Horizontal pod autoscaling
  - Rolling updates
  - Resource quotas

Helm Charts: Application packaging
  - Templated deployments
  - Version management
  - Environment-specific configs

# Cloud Infrastructure
AWS/GCP/Azure: Multi-cloud support
  - Compute: EKS/GKE/AKS
  - Storage: S3/GCS/Azure Blob
  - Databases: RDS/Cloud SQL/Azure DB

# CI/CD
GitHub Actions: Build & deploy
  - Automated testing
  - Docker image building
  - GitOps with ArgoCD

# Security
Vault: Secrets management
  - API keys, database credentials
  - Dynamic secrets rotation
  - Audit logging

NGINX/Envoy: API Gateway
  - Rate limiting
  - Authentication
  - TLS termination
```

---

## Deployment Architecture

### Development Environment

```
┌─────────────────────────────────────────────────────┐
│               Developer Laptop                       │
│                                                      │
│  docker-compose up                                   │
│    ├─ PostgreSQL (Decision Graph)                   │
│    ├─ Redis (Event Bus + Cache)                     │
│    ├─ All 8 agents (single containers)              │
│    └─ Next.js frontend                               │
│                                                      │
│  Simulated data: Synthetic decision events          │
└─────────────────────────────────────────────────────┘
```

### Production Environment (Kubernetes)

```
┌───────────────────────────────────────────────────────────┐
│                 Kubernetes Cluster                         │
│                                                            │
│  ┌──────────────────────────────────────────────────┐    │
│  │         INGRESS LAYER (Load Balancer)             │    │
│  │  - NGINX Ingress Controller                       │    │
│  │  - TLS termination                                │    │
│  │  - Rate limiting                                  │    │
│  └────────────────┬──────────────────────────────────┘    │
│                   │                                        │
│  ┌────────────────┴──────────────────────────────────┐    │
│  │         FRONTEND LAYER (Deployment)                │    │
│  │  - Next.js pods (3 replicas)                       │    │
│  │  - Auto-scaling: 3-10 pods                         │    │
│  │  - Resource: 2 CPU, 4GB RAM per pod               │    │
│  └────────────────┬──────────────────────────────────┘    │
│                   │                                        │
│  ┌────────────────┴──────────────────────────────────┐    │
│  │         AGENT LAYER (Multiple Deployments)         │    │
│  │                                                    │    │
│  │  ┌──────────────────┐  ┌──────────────────┐      │    │
│  │  │ Discovery Agent  │  │ Analysis Agent   │      │    │
│  │  │ (3 replicas)     │  │ (2 replicas)     │      │    │
│  │  │ 24/7 running     │  │ Batch scheduler  │      │    │
│  │  └──────────────────┘  └──────────────────┘      │    │
│  │                                                    │    │
│  │  ┌──────────────────┐  ┌──────────────────┐      │    │
│  │  │ Execution Agent  │  │ Conversational   │      │    │
│  │  │ (5 replicas)     │  │ Agent (4 reps)   │      │    │
│  │  │ High throughput  │  │ User-facing      │      │    │
│  │  └──────────────────┘  └──────────────────┘      │    │
│  │                                                    │    │
│  │  ┌──────────────────┐  ┌──────────────────┐      │    │
│  │  │ Strategy Agent   │  │ Simulation Agent │      │    │
│  │  │ (1 replica)      │  │ (2 replicas)     │      │    │
│  │  │ On-demand        │  │ CPU-intensive    │      │    │
│  │  └──────────────────┘  └──────────────────┘      │    │
│  │                                                    │    │
│  │  ┌──────────────────┐  ┌──────────────────┐      │    │
│  │  │ Insight Agent    │  │ Market Sensing   │      │    │
│  │  │ (2 replicas)     │  │ (1 replica)      │      │    │
│  │  │ On-demand        │  │ Scheduled        │      │    │
│  │  └──────────────────┘  └──────────────────┘      │    │
│  │                                                    │    │
│  └────────────────┬──────────────────────────────────┘    │
│                   │                                        │
│  ┌────────────────┴──────────────────────────────────┐    │
│  │         DATA LAYER (StatefulSets)                  │    │
│  │                                                    │    │
│  │  ┌──────────────────┐  ┌──────────────────┐      │    │
│  │  │ PostgreSQL       │  │ Redis            │      │    │
│  │  │ (Decision Graph) │  │ (Event Bus)      │      │    │
│  │  │ 3-node cluster   │  │ 3-node cluster   │      │    │
│  │  └──────────────────┘  └──────────────────┘      │    │
│  │                                                    │    │
│  │  ┌──────────────────┐                             │    │
│  │  │ Pinecone/Weaviate│                             │    │
│  │  │ (Vectors)        │                             │    │
│  │  │ Managed service  │                             │    │
│  │  └──────────────────┘                             │    │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌───────────────────────────────────────────────────┐    │
│  │         OBSERVABILITY (DaemonSets)                 │    │
│  │  - OpenTelemetry Collector                         │    │
│  │  - Prometheus Node Exporter                        │    │
│  │  - Fluent Bit (log aggregation)                    │    │
│  └───────────────────────────────────────────────────┘    │
└───────────────────────────────────────────────────────────┘

External Services:
  ├─ Anthropic API (Claude)
  ├─ OpenAI API (GPT-4)
  ├─ Grafana Cloud (metrics/dashboards)
  ├─ LangSmith (LLM tracing)
  └─ Customer systems (CRM, chat platforms)
```

### Scaling Strategy

```yaml
# Agent-Specific Scaling

Discovery Agent:
  replicas: 3-10
  scaling_metric: decision_event_rate
  scale_up_threshold: 100 events/sec
  resource_limits:
    cpu: 1 core
    memory: 2GB

Analysis Agent:
  replicas: 2-5
  scaling_metric: decision_corpus_size
  scale_up_threshold: 10,000 unanalyzed decisions
  resource_limits:
    cpu: 4 cores
    memory: 8GB

Execution Agent:
  replicas: 5-20
  scaling_metric: decision_request_rate
  scale_up_threshold: 500 requests/sec
  target_latency: <100ms p99
  resource_limits:
    cpu: 2 cores
    memory: 4GB

Conversational Agent:
  replicas: 4-15
  scaling_metric: active_sessions
  scale_up_threshold: 100 concurrent users
  target_latency: <2s p99
  resource_limits:
    cpu: 2 cores
    memory: 4GB
```

---

## Data Model: Decision Graph

### Schema Overview

```sql
-- Core decision event
CREATE TABLE decisions (
  id UUID PRIMARY KEY,
  timestamp TIMESTAMPTZ NOT NULL,
  type VARCHAR(50) NOT NULL,  -- escalation, routing, resolution, etc.

  -- Context
  context JSONB NOT NULL,  -- {customer_id, channel, urgency, complexity, history}

  -- Decision
  decision JSONB NOT NULL,  -- {action, rationale, confidence, policy_id}

  -- Outcome
  outcome JSONB,  -- {success, metrics, feedback} (nullable until outcome known)

  -- Metadata
  agent VARCHAR(50) NOT NULL,  -- which agent made this decision
  policy_version VARCHAR(50),  -- which policy was applied
  trace JSONB,  -- full decision lineage for audit

  -- Indexes
  INDEX idx_timestamp (timestamp DESC),
  INDEX idx_type (type),
  INDEX idx_context_gin (context jsonb_path_ops),
  INDEX idx_decision_gin (decision jsonb_path_ops)
);

-- Policies (versioned)
CREATE TABLE policies (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  version VARCHAR(20) NOT NULL,

  -- Policy definition
  rules JSONB NOT NULL,  -- {conditions, actions, thresholds}

  -- Lifecycle
  created_at TIMESTAMPTZ NOT NULL,
  deployed_at TIMESTAMPTZ,
  deprecated_at TIMESTAMPTZ,

  -- Metadata
  created_by VARCHAR(100),
  approved_by VARCHAR(100),
  approval_timestamp TIMESTAMPTZ,

  -- Performance tracking
  decisions_made INT DEFAULT 0,
  avg_confidence FLOAT,
  outcomes JSONB,  -- {success_rate, csat_impact, cost_impact}

  UNIQUE(name, version)
);

-- Insights (generated by Analysis Agent)
CREATE TABLE insights (
  id UUID PRIMARY KEY,
  timestamp TIMESTAMPTZ NOT NULL,
  type VARCHAR(50) NOT NULL,  -- pattern, anomaly, opportunity

  -- Insight content
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  data JSONB NOT NULL,  -- supporting data

  -- Significance
  confidence FLOAT NOT NULL,  -- 0-1
  priority VARCHAR(20) NOT NULL,  -- low, medium, high, critical

  -- Relationships
  decision_ids UUID[],  -- which decisions contributed to this insight

  -- Status
  status VARCHAR(20) DEFAULT 'pending',  -- pending, actioned, dismissed
  actioned_by VARCHAR(100),
  actioned_at TIMESTAMPTZ
);

-- Simulations (generated by Simulation Agent)
CREATE TABLE simulations (
  id UUID PRIMARY KEY,
  timestamp TIMESTAMPTZ NOT NULL,

  -- Input
  policy_id UUID REFERENCES policies(id),
  scenario JSONB NOT NULL,  -- what conditions were simulated

  -- Output
  baseline_metrics JSONB NOT NULL,
  simulated_metrics JSONB NOT NULL,
  delta JSONB NOT NULL,

  -- Confidence
  confidence FLOAT NOT NULL,
  method VARCHAR(50) NOT NULL,  -- historical_replay, monte_carlo, etc.

  -- Usage
  used_for_decision BOOLEAN DEFAULT FALSE
);

-- Market signals (captured by Market Sensing Agent)
CREATE TABLE market_signals (
  id UUID PRIMARY KEY,
  timestamp TIMESTAMPTZ NOT NULL,

  -- Signal content
  source VARCHAR(100) NOT NULL,  -- forrester, competitor, regulation
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  url TEXT,

  -- Significance
  relevance FLOAT NOT NULL,  -- 0-1
  urgency VARCHAR(20) NOT NULL,
  impact VARCHAR(20) NOT NULL,

  -- Recommendations
  recommendations JSONB,

  -- Status
  status VARCHAR(20) DEFAULT 'pending'
);

-- Conversations (managed by Conversational Agent)
CREATE TABLE conversations (
  id UUID PRIMARY KEY,
  user_id VARCHAR(100) NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ,

  -- Session data
  messages JSONB[],  -- [{role, content, timestamp}]
  context JSONB,     -- accumulated context

  -- Outcomes
  decisions_made UUID[],  -- decisions made during this conversation
  insights_generated UUID[]  -- insights generated
);
```

### Vector Embeddings (Semantic Search)

```python
# Pinecone/Weaviate schema

decision_embeddings = {
  "id": "decision_uuid",
  "vector": [0.12, -0.45, ...],  # 1536-dim embedding
  "metadata": {
    "decision_type": "escalation",
    "timestamp": "2026-01-29T10:00:00Z",
    "customer_tier": "VIP",
    "outcome": "success"
  }
}

# Query: Find similar decisions
query_vector = embed("billing dispute with VIP customer")
results = pinecone.query(
  vector=query_vector,
  top_k=10,
  filter={"decision_type": "escalation"}
)
```

---

## Implementation Roadmap

### Phase 1: Foundation (Months 1-3)

**Goal**: Build core infrastructure and 3 essential agents

**Deliverables**:
1. Decision Graph (PostgreSQL + Redis + Pinecone)
2. Event bus (BullMQ)
3. Discovery Agent (MVP)
4. Execution Agent (MVP)
5. Conversational Agent (MVP)

**Success Criteria**:
- [ ] Capture 1000 decisions/day from pilot customer
- [ ] Execution Agent enforces policies with <100ms latency
- [ ] Conversational Agent answers basic questions
- [ ] Full audit trail for every decision

**Timeline**: 12 weeks
**Team**: 3 engineers (backend), 1 engineer (frontend), 1 ML engineer

---

### Phase 2: Intelligence (Months 4-6)

**Goal**: Add reasoning and planning capabilities

**Deliverables**:
1. Analysis Agent (pattern detection, causal inference)
2. Strategy Agent (policy optimization)
3. Insight Agent (visualization, narratives)
4. Simulation Agent (policy testing)

**Success Criteria**:
- [ ] Analysis Agent identifies 3+ actionable insights per week
- [ ] Strategy Agent proposes policies with >80% simulation confidence
- [ ] Insight Agent generates charts and narratives for common questions
- [ ] Simulation Agent validates policies before deployment

**Timeline**: 12 weeks
**Team**: +2 ML engineers, +1 data scientist

---

### Phase 3: Strategic Intelligence (Months 7-9)

**Goal**: Add external intelligence and advanced coordination

**Deliverables**:
1. Market Sensing Agent (competitive intelligence, regulatory monitoring)
2. Advanced agent coordination (choreography + orchestration)
3. Multi-agent reasoning (collaborative problem solving)
4. Real-time streaming updates

**Success Criteria**:
- [ ] Market Sensing Agent detects 5+ relevant signals per week
- [ ] Agents coordinate on complex workflows (e.g., policy approval)
- [ ] Real-time dashboard updates (<1s latency)
- [ ] Full Forrester Agent Control Plane feature parity

**Timeline**: 12 weeks
**Team**: +1 ML engineer, +1 frontend engineer

---

### Phase 4: Scale & Optimization (Months 10-12)

**Goal**: Production hardening and enterprise features

**Deliverables**:
1. Multi-tenancy (isolation, security)
2. Advanced observability (distributed tracing, cost attribution)
3. Performance optimization (sub-second latency at scale)
4. Compliance certifications (SOC 2, GDPR, EU AI Act)

**Success Criteria**:
- [ ] Support 10+ concurrent enterprise customers
- [ ] Process 100K decisions/day per customer
- [ ] <100ms p99 latency for Execution Agent
- [ ] SOC 2 Type 2 certified

**Timeline**: 12 weeks
**Team**: +2 DevOps engineers, +1 security engineer

---

## Appendices

### Appendix A: Agent Decision Matrix

**When should a new capability be an Agent vs a Function?**

| Dimension | Agent | Function |
|-----------|-------|----------|
| **Decision Making** | Makes autonomous choices | Deterministic output |
| **Memory** | Maintains state across calls | Stateless |
| **Goal-Oriented** | Works toward objectives | Completes single task |
| **Multi-Turn** | Plans, acts, reflects, adapts | One-shot execution |
| **Domain Ownership** | Owns problem space | Implements specific logic |

**Examples**:

✅ **Make it an Agent**:
- "Detect emerging decision patterns" (requires reasoning, adaptation)
- "Generate optimal policy for a goal" (requires planning, tradeoff analysis)
- "Monitor external market for relevant signals" (requires continuous assessment)

❌ **Make it a Function**:
- "Parse user question into intent" (deterministic NLP)
- "Format chart data for visualization" (data transformation)
- "Send email notification" (side effect execution)

---

### Appendix B: Forrester Control Plane Mapping

**How Helm's 8 Agents Implement the 5 Control Plane Features**:

| Control Plane Feature | Helm Implementation |
|-----------------------|---------------------|
| **1. Agent Inventory & Identity** | Discovery Agent captures all decision points; Decision Graph stores full inventory |
| **2. Policies & Guardrails** | Strategy Agent defines policies; Execution Agent enforces at runtime |
| **3. Monitoring & Insights** | Analysis Agent monitors patterns; Insight Agent visualizes; Market Sensing Agent provides external context |
| **4. Control & Coordination** | Conversational Agent orchestrates user workflows; Event bus coordinates background agents |
| **5. Risk, Compliance, Auditing** | Execution Agent logs every decision trace; Simulation Agent validates policy changes; Decision Graph provides audit trail |

---

### Appendix C: Technology Decision Rationale

**Why LangGraph?**
- Built specifically for agent orchestration
- State management for multi-step reasoning
- Native LLM tool calling support
- Production-ready (LangChain ecosystem)

**Why PostgreSQL over MongoDB?**
- Decision data has relational structure (policies → decisions → outcomes)
- JSONB provides schema flexibility where needed
- Superior query optimizer for complex analytics
- Time-series extensions (TimescaleDB)

**Why BullMQ over Kafka?**
- Simpler operational overhead
- Built on Redis (already in stack)
- Sufficient throughput for Phase 1-2 (can migrate to Kafka later)
- Better DX for event-driven patterns

**Why Pinecone over self-hosted Weaviate?**
- Managed service (reduce ops burden)
- Better scaling (automatic index management)
- Superior query latency (<50ms p99)
- Can self-host Weaviate later if needed

---

### Appendix D: Cost Estimation

**Phase 1 Production Costs (per customer, per month)**:

```
Infrastructure:
  - Kubernetes cluster (3 nodes): $500/month
  - PostgreSQL (managed): $200/month
  - Redis (managed): $100/month
  - Pinecone: $70/month (100K vectors)
  Total: $870/month

LLM API Costs (based on 10K decisions/month):
  - Anthropic Claude (Analysis, Strategy): $1,500/month
  - OpenAI GPT-4 (Conversational): $800/month
  Total: $2,300/month

Observability:
  - Grafana Cloud: $100/month
  - LangSmith: $50/month
  Total: $150/month

TOTAL: $3,320/month per enterprise customer

Target pricing: $10K-$15K/month per customer
Gross margin: 67-78%
```

---

### Appendix E: Security & Compliance

**Data Protection**:
- All decision data encrypted at rest (AES-256)
- TLS 1.3 for data in transit
- Customer data isolated (multi-tenancy)
- RBAC for agent access control

**Compliance Readiness**:
- **EU AI Act**: Decision traces provide transparent lineage
- **GDPR**: Customer data deletion workflows
- **SOC 2**: Audit logs, access controls, monitoring
- **HIPAA** (optional): BAA-compliant infrastructure

**Agent Safety**:
- Confidence thresholds for autonomous decisions
- Human-in-the-loop for critical changes
- Rollback capability for policy changes
- Anomaly detection for agent behavior

---

**Document Status**: Draft for Review
**Next Steps**: Engineering review → Product approval → Implementation kickoff

**Questions or Feedback**: Contact [Product Team]
