# Helm Product Validation: 90-Day Plan

**Objective**: Validate product-market fit with 3-5 paying customers using services relationships
**Success Criteria**: Clear signal (strong/moderate/weak PMF) by Day 90 to inform strategic decision
**Budget**: $150K-$200K from services cash flow

---

## Executive Summary

The 90-day plan validates Helm's core thesis before committing significant capital. By leveraging services client relationships, you can test the product with minimal investment while maintaining optionality.

### Key Questions to Answer

1. **Problem validation**: Do service leaders actually have the pain we're solving?
2. **Solution fit**: Does Helm's approach resonate (Mine → Design → Manage)?
3. **Willingness to pay**: Will companies pay $5K-$50K/month for this?
4. **Competitive positioning**: How do we compare to alternatives?
5. **Channel fit**: Can we sell through existing relationships?

---

## Phase 1: Foundation (Days 1-30)

### Week 1-2: ICP Refinement and Prospect Identification

**Ideal Customer Profile (ICP) Hypothesis**:

| Attribute               | Target                                                  |
| ----------------------- | ------------------------------------------------------- |
| **Company size**        | 500-5,000 employees                                     |
| **Service team size**   | 50-500 agents/CSRs                                      |
| **Current AI adoption** | Deploying or deployed agents                            |
| **Decision maker**      | VP/Director of Customer Service, Chief Customer Officer |
| **Pain**                | Agent governance, ROI measurement, decision visibility  |
| **Budget**              | $50K-$500K annual for tooling                           |

**Prospect List Development**:

From services clients:
| Client | Contact | Role | Pain Signals | Priority |
|--------|---------|------|--------------|----------|
| Client A | Name | Title | What have they said? | High/Med |
| Client B | Name | Title | What have they said? | High/Med |
| ... | ... | ... | ... | ... |

**Target**: Identify 15-20 prospects, prioritize top 10 for outreach

### Week 2-3: Discovery Interview Framework

**Interview Script (30-45 minutes)**:

**Part 1: Current State (10 min)**

1. "Tell me about your service operations. What's your team structure?"
2. "Where are you with AI/agent deployment in service?"
3. "What decisions are agents making today? What's still human?"

**Part 2: Pain Exploration (15 min)** 4. "What challenges have you encountered with agent deployment?" 5. "How do you know if your agents are making good decisions?" 6. "How do you handle when an agent makes a mistake?" 7. "What's your current approach to governance and oversight?" 8. "How do you measure ROI on your AI investments?"

**Part 3: Solution Exploration (10 min)** 9. "If you could have complete visibility into agent decisions, what would you do with it?" 10. "How valuable would it be to have a library of decision precedents?" 11. "Would you pay for a system that captures decision context and improves over time?"

**Part 4: Next Steps (5 min)** 12. "Would you be interested in being an early design partner?" 13. "What would you need to see to consider piloting something like this?"

**Goal**: Complete 8-10 discovery interviews by Day 30

### Week 3-4: MVP Scoping

Based on discovery interviews, define MVP scope:

**Core MVP Features**:

| Module     | MVP Scope                               | Full Vision              |
| ---------- | --------------------------------------- | ------------------------ |
| **Mine**   | Decision trace capture for 1 agent type | All agent decisions      |
| **Design** | Basic workflow visualization            | Full governance designer |
| **Manage** | Dashboard + alerts                      | Continuous optimization  |

**MVP Technical Requirements**:

- [ ] Integration with 1-2 agent platforms (Salesforce Agentforce, Zendesk)
- [ ] Decision event capture and storage
- [ ] Basic visualization dashboard
- [ ] Simple alerting on anomalies

**Build vs. Buy Analysis**:
| Component | Build | Buy/Partner | Decision |
|-----------|-------|-------------|----------|
| Data capture | Custom | - | Build |
| Storage | - | AWS/Snowflake | Buy |
| Visualization | - | Embedded BI | Buy |
| Agent integration | Custom | - | Build |

---

## Phase 2: Build and Test (Days 31-60)

### Week 5-6: Design Partner Recruitment

**Design Partner Terms**:

- Free access during pilot (3 months)
- Deep collaboration on product development
- Weekly feedback sessions
- Case study commitment (if successful)
- First-mover pricing when product launches

**Design Partner Agreement Template**:

```
HELM DESIGN PARTNER AGREEMENT

Company: [Partner Name]
Contact: [Name, Title]
Duration: 90 days from [Date]

Partner Commits To:
- Weekly 30-min feedback calls
- Access to relevant systems for integration
- Honest feedback on product direction
- Case study and reference (if successful)
- Data sharing for product improvement

Helm Commits To:
- Free access during pilot
- Dedicated support and implementation
- Priority feature development
- [X]% discount on first year (if successful)
- Data privacy and security guarantees
```

**Target**: Sign 3-5 design partners by Day 45

### Week 6-8: MVP Development

**Sprint 1 (Week 6-7): Core Infrastructure**

- [ ] Agent integration scaffold
- [ ] Event capture pipeline
- [ ] Basic data storage
- [ ] Authentication and tenant management

**Sprint 2 (Week 7-8): User-Facing Features**

- [ ] Decision trace visualization
- [ ] Basic dashboard
- [ ] Alert configuration
- [ ] Simple reporting

**Technical Milestones**:
| Milestone | Target Date | Owner | Status |
|-----------|-------------|-------|--------|
| First agent connected | Day 40 | Engineering | |
| First decision captured | Day 45 | Engineering | |
| Dashboard live | Day 50 | Engineering | |
| First partner live | Day 55 | Product | |

### Week 8: Initial Deployment

**Deployment Checklist (per partner)**:

- [ ] Security review completed
- [ ] Data handling agreement signed
- [ ] Integration credentials obtained
- [ ] Test environment validated
- [ ] Go-live date confirmed
- [ ] Success metrics defined

**Success Metrics by Partner**:
| Partner | Primary Metric | Target | Measurement |
|---------|---------------|--------|-------------|
| Partner A | Decisions captured | 1,000/week | Dashboard |
| Partner B | Time to insight | <24 hours | User feedback |
| Partner C | Anomaly detection | 95% accuracy | Manual review |

---

## Phase 3: Validate and Decide (Days 61-90)

### Week 9-10: Gather Feedback

**Weekly Partner Check-in Agenda**:

1. What's working well? (3 min)
2. What's frustrating? (5 min)
3. What's missing? (5 min)
4. Would you pay for this today? Why/why not? (5 min)
5. NPS score (0-10) (2 min)

**Feedback Tracking**:
| Partner | Week | NPS | Would Pay? | Key Feedback |
|---------|------|-----|------------|--------------|
| Partner A | 9 | x | Y/N | "..." |
| Partner A | 10 | x | Y/N | "..." |
| ... | ... | ... | ... | ... |

### Week 10-11: Pricing Validation

**Pricing Test Methodology**:

Present tiered pricing to each partner:

| Tier             | Price/month | Includes                       | Target Segment |
| ---------------- | ----------- | ------------------------------ | -------------- |
| **Starter**      | $5,000      | 10K decisions, basic dashboard | SMB            |
| **Professional** | $15,000     | 50K decisions, governance      | Mid-market     |
| **Enterprise**   | $50,000     | Unlimited, full platform       | Enterprise     |

**Questions**:

1. "At $X/month, would you buy this today?"
2. "What would have to be true for you to say yes?"
3. "What's the maximum you'd pay for this value?"
4. "How does this compare to what you're spending on alternatives?"

**Target**: 2+ partners commit to paid pilot by Day 80

### Week 11-12: Decision Point

**PMF Signal Assessment**:

| Signal                     | Strong PMF    | Moderate PMF   | Weak PMF      |
| -------------------------- | ------------- | -------------- | ------------- |
| **Partners using product** | 3+ daily      | 1-2 weekly     | None actively |
| **Willingness to pay**     | 3+ commit     | 1-2 interested | None commit   |
| **Feature requests**       | "I need more" | "Nice to have" | "Not sure"    |
| **Referral willingness**   | Enthusiastic  | Conditional    | Hesitant      |
| **NPS**                    | 8+ average    | 6-7 average    | <6 average    |

**Decision Framework**:

| Scenario         | Signal Criteria                          | Strategic Action                          |
| ---------------- | ---------------------------------------- | ----------------------------------------- |
| **Strong PMF**   | 3+ paying/committed, NPS 8+, daily usage | Accelerate: Sell services, raise seed     |
| **Moderate PMF** | 1-2 paying, NPS 6-7, weekly usage        | Continue: More validation, smaller raise  |
| **Weak PMF**     | 0 paying, NPS <6, minimal usage          | Pivot: Reassess thesis, preserve services |

---

## Resource Requirements

### Team

| Role                       | Time Commitment | Source                     |
| -------------------------- | --------------- | -------------------------- |
| **Product Lead**           | 100%            | Founder or hire            |
| **Engineering**            | 2 FTE           | Hire or contract           |
| **Design Partner Manager** | 50%             | Founder or services person |

### Budget (90 Days)

| Category            | Amount       | Notes                  |
| ------------------- | ------------ | ---------------------- |
| **Engineering**     | $90,000      | 2 engineers x 3 months |
| **Infrastructure**  | $15,000      | Cloud, tools           |
| **Design**          | $10,000      | UX/UI contract         |
| **Travel/Meetings** | $5,000       | Partner visits         |
| **Contingency**     | $20,000      | Buffer                 |
| **TOTAL**           | **$140,000** |                        |

---

## Risk Mitigation

### Technical Risks

| Risk                   | Mitigation                         |
| ---------------------- | ---------------------------------- |
| Integration complexity | Start with 1 platform (Salesforce) |
| Data volume            | Cap pilot scope                    |
| Security concerns      | SOC 2 readiness, data agreements   |

### Market Risks

| Risk                  | Mitigation                             |
| --------------------- | -------------------------------------- |
| Partners don't engage | Over-recruit (5 partners for 3 needed) |
| Wrong ICP             | Pivot ICP based on discovery           |
| Competitive entry     | Speed of execution                     |

### Internal Risks

| Risk                 | Mitigation                               |
| -------------------- | ---------------------------------------- |
| Services distraction | Clear boundaries, dedicated product team |
| Founder bandwidth    | Hire product support early               |
| Cash runway          | Conservative burn, services backup       |

---

## Weekly Milestones

| Week | Key Milestone                | Success Criteria                    |
| ---- | ---------------------------- | ----------------------------------- |
| 1    | Prospect list complete       | 15+ qualified prospects             |
| 2    | Discovery interviews started | 3+ interviews completed             |
| 3    | MVP scope defined            | Scope document signed off           |
| 4    | Discovery complete           | 8+ interviews, clear pain signals   |
| 5    | Design partners recruiting   | 5+ prospects engaged                |
| 6    | Design partners signed       | 3+ signed agreements                |
| 7    | MVP Sprint 1 complete        | Core infrastructure working         |
| 8    | MVP Sprint 2 complete        | Dashboard live                      |
| 9    | First partner live           | Data flowing, feedback starting     |
| 10   | All partners live            | 3+ partners using product           |
| 11   | Pricing validated            | 2+ payment commitments              |
| 12   | Decision made                | Clear PMF signal, strategy selected |

---

## Appendix: Discovery Interview Questions Deep Dive

### Pain Point Probes

**Agent Governance Pain**:

- "What happens when an agent makes a decision you disagree with?"
- "How do you explain agent decisions to customers when they complain?"
- "Who's accountable when an agent makes a mistake?"

**ROI Measurement Pain**:

- "How do you justify your AI investment to the CFO?"
- "What metrics are you tracking for agent performance?"
- "Can you tie agent deployment to business outcomes?"

**Decision Visibility Pain**:

- "Do you know what decisions your agents are making right now?"
- "How do you audit agent decisions for compliance?"
- "How do you learn from successful agent decisions?"

### Solution Validation Probes

**Mine Module**:

- "If you could see every decision your agents make, what would you do first?"
- "How valuable would a 'decision log' be for your operations?"

**Design Module**:

- "How do you currently design agent decision policies?"
- "Would a visual workflow designer for governance help?"

**Manage Module**:

- "How do you currently monitor agent performance?"
- "What alerts would be most valuable?"

### Willingness to Pay Probes

- "What's your current budget for service operations tools?"
- "What would you stop paying for if this worked?"
- "Who needs to approve a $15K/month purchase?"
- "What's the buying process for new tools in your org?"

---

**Document Created**: January 9, 2026
**Owner**: Product Leadership
**Review**: Weekly during validation period
