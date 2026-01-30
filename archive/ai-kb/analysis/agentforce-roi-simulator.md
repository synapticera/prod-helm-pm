# Agentforce ROI Simulator

## Interactive Calculator with Multiple Scenarios

This simulator allows you to input your own parameters and compare:

1. **Salesforce Methodology** - How Salesforce calculates ROI
2. **Conservative Estimate** - Realistic with implementation costs
3. **Pessimistic Scenario** - Accounting for common pitfalls

---

## Part 1: Input Your Parameters

### 1.1 Your Current State (Fill In)

```yaml
# ==========================================
# STEP 1: INPUT YOUR NUMBERS HERE
# ==========================================

# TEAM STRUCTURE
service_reps: 25 # Number of service agents
agent_fully_loaded_salary: 75000 # Annual cost per agent (salary + benefits + overhead)

# VOLUME METRICS
monthly_case_volume: 10000 # Cases/tickets per month
average_handle_time_minutes: 12 # Minutes per case (including wrap-up)

# OPTIONAL: SDR/SALES (if applicable)
sdr_count: 0 # Number of SDRs
leads_per_sdr_per_week: 50 # Leads touched per SDR weekly
sdr_salary: 80000 # Fully loaded SDR cost

# OPTIONAL: FIELD SERVICE (if applicable)
field_technicians: 0 # Number of field techs
technician_salary: 60000 # Fully loaded technician cost
repeat_visit_rate: 15 # % of visits that are repeat
cost_per_truck_roll: 150 # Cost per service visit


# ==========================================
```

### 1.2 Your Targets (Fill In)

```yaml
# ==========================================
# STEP 2: SET YOUR TARGETS
# ==========================================

# AI DEFLECTION TARGETS
target_deflection_rate:
  50 # % of cases AI should handle by Year 3
  # Reference: Industry average 30-50%
  # High performers: 60-85%

# DEPLOYMENT APPROACH
implementation_model: "phased" # "phased" (recommended) or "big_bang"
deployment_months: 4 # Months to full production

# LICENSING MODEL
pricing_model: "per_conversation" # "per_conversation" ($2) or "flex_credits" ($0.50/100 credits)


# ==========================================
```

---

## Part 2: Salesforce Methodology (Their Calculator)

### How Salesforce Calculates Your ROI

Using your inputs above, here's how Salesforce would calculate:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SALESFORCE ROI METHODOLOGY                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  STEP 1: Calculate Annual Case Volume                               │
│  ─────────────────────────────────────                              │
│  monthly_case_volume × 12 = annual_cases                            │
│  Example: 10,000 × 12 = 120,000 cases/year                          │
│                                                                     │
│  STEP 2: Apply Ramped Deflection                                    │
│  ─────────────────────────────────                                  │
│  Year 1: 70% of target_deflection_rate                              │
│  Year 2: 85% of target_deflection_rate                              │
│  Year 3: 100% of target_deflection_rate                             │
│                                                                     │
│  Example (50% target):                                              │
│    Year 1: 50% × 70% = 35% deflection                               │
│    Year 2: 50% × 85% = 42.5% deflection                             │
│    Year 3: 50% × 100% = 50% deflection                              │
│                                                                     │
│  STEP 3: Calculate Cases Deflected                                  │
│  ─────────────────────────────────                                  │
│  annual_cases × deflection_rate = cases_deflected                   │
│                                                                     │
│  Example:                                                           │
│    Year 1: 120,000 × 35% = 42,000 cases                             │
│    Year 2: 120,000 × 42.5% = 51,000 cases                           │
│    Year 3: 120,000 × 50% = 60,000 cases                             │
│                                                                     │
│  STEP 4: Calculate Time Saved                                       │
│  ─────────────────────────────                                      │
│  cases_deflected × average_handle_time_minutes ÷ 60 = hours_saved   │
│                                                                     │
│  Example (Year 1):                                                  │
│    42,000 × 12 ÷ 60 = 8,400 hours saved                             │
│                                                                     │
│  STEP 5: Convert to FTE Savings                                     │
│  ──────────────────────────────                                     │
│  hours_saved ÷ (8 hours × 260 work_days) = FTE_equivalent           │
│                                                                     │
│  Example (Year 1):                                                  │
│    8,400 ÷ 2,080 = 4.0 FTE equivalent                               │
│                                                                     │
│  STEP 6: Calculate Labor Savings                                    │
│  ────────────────────────────────                                   │
│  FTE_equivalent × agent_fully_loaded_salary = labor_savings         │
│                                                                     │
│  Example (Year 1):                                                  │
│    4.0 × $75,000 = $300,000 labor savings                           │
│                                                                     │
│  STEP 7: Calculate Agentforce Cost                                  │
│  ─────────────────────────────────                                  │
│  Per-Conversation: cases_deflected × $2                             │
│  Flex Credits: cases_deflected × 20 credits × $0.005                │
│                                                                     │
│  Example (Per-Conversation, Year 1):                                │
│    42,000 × $2 = $84,000                                            │
│                                                                     │
│  STEP 8: Net Benefit                                                │
│  ────────────────────                                               │
│  labor_savings - agentforce_cost = net_benefit                      │
│                                                                     │
│  Example (Year 1):                                                  │
│    $300,000 - $84,000 = $216,000                                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Salesforce Method Results (Based on Example Inputs)

| Metric              | Year 1   | Year 2   | Year 3   | 3-Year Total |
| ------------------- | -------- | -------- | -------- | ------------ |
| **Deflection Rate** | 35%      | 42.5%    | 50%      | -            |
| **Cases Deflected** | 42,000   | 51,000   | 60,000   | 153,000      |
| **Hours Saved**     | 8,400    | 10,200   | 12,000   | 30,600       |
| **FTE Equivalent**  | 4.0      | 4.9      | 5.8      | -            |
| **Labor Savings**   | $300,000 | $367,500 | $435,000 | $1,102,500   |
| **Agentforce Cost** | $84,000  | $102,000 | $120,000 | $306,000     |
| **Net Benefit**     | $216,000 | $265,500 | $315,000 | **$796,500** |
| **Cumulative ROI**  | -        | -        | -        | **160%**     |

**What Salesforce Doesn't Include:**

- ❌ Implementation costs
- ❌ Training and adoption
- ❌ Integration development
- ❌ Ongoing tuning/maintenance
- ❌ Platform prerequisites

---

## Part 3: Conservative Estimate (Realistic)

### Adding Real-World Costs

```
┌─────────────────────────────────────────────────────────────────────┐
│                 CONSERVATIVE ROI CALCULATION                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ADDITIONAL COSTS TO INCLUDE:                                       │
│  ────────────────────────────                                       │
│                                                                     │
│  Implementation Costs (One-Time):                                   │
│  ├── SI Partner/Consulting:     $75,000 - $300,000                  │
│  │   (Based on complexity: Basic $75K, Mid $150K, Enterprise $300K) │
│  ├── Internal Team Time:        $25,000 - $75,000                   │
│  │   (Project manager, SMEs, IT involvement)                        │
│  ├── Data Preparation:          $15,000 - $50,000                   │
│  │   (Clean-up, unification, Data Cloud setup)                      │
│  └── Training:                  $10,000 - $30,000                   │
│      (Admin training, end-user enablement)                          │
│                                                                     │
│  Ongoing Costs (Annual):                                            │
│  ├── Platform Licensing:        Varies                              │
│  │   (Often requires Service Cloud, Data Cloud subscriptions)       │
│  ├── Tuning/Maintenance:        $25,000 - $50,000/year              │
│  │   (0.5 FTE dedicated to AI optimization)                         │
│  └── Escalation Handling:       Variable                            │
│      (Complex cases that AI fails)                                  │
│                                                                     │
│  REDUCED BENEFITS (Conservative Assumptions):                       │
│  ─────────────────────────────────────────────                      │
│  ├── Slower ramp: 50% → 70% → 85% of target (not 70/85/100%)        │
│  ├── Lower deflection quality: 10% of "deflected" re-contact        │
│  └── Implementation delay: Month 4-5 before production              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Conservative Results (Same Example Inputs)

**One-Time Costs (Mid-Complexity Implementation):**
| Cost Category | Amount |
|---------------|--------|
| SI Partner/Consulting | $150,000 |
| Internal Team Time | $50,000 |
| Data Preparation | $30,000 |
| Training | $20,000 |
| **Total Implementation** | **$250,000** |

**Annual Operating Costs:**
| Cost Category | Year 1 | Year 2 | Year 3 |
|---------------|--------|--------|--------|
| Agentforce (per conversation) | $63,000 | $84,000 | $102,000 |
| Tuning/Maintenance (0.5 FTE) | $37,500 | $37,500 | $37,500 |
| Platform Licensing (incremental) | $30,000 | $30,000 | $30,000 |
| **Total Operating** | **$130,500** | **$151,500** | **$169,500** |

**Benefits (Conservative Ramp):**
| Metric | Year 1 | Year 2 | Year 3 |
|--------|--------|--------|--------|
| Effective Deflection Rate | 25% | 35% | 42.5% |
| Cases Deflected (net of re-contact) | 27,000 | 37,800 | 45,900 |
| Hours Saved | 5,400 | 7,560 | 9,180 |
| Labor Savings | $194,700 | $272,580 | $330,990 |

**Net Results (Conservative):**
| Metric | Year 1 | Year 2 | Year 3 | 3-Year Total |
|--------|--------|--------|--------|--------------|
| Labor Savings | $194,700 | $272,580 | $330,990 | $798,270 |
| Operating Costs | ($130,500) | ($151,500) | ($169,500) | ($451,500) |
| **Net Operating Benefit** | $64,200 | $121,080 | $161,490 | $346,770 |
| Implementation Cost | ($250,000) | - | - | ($250,000) |
| **Cumulative Cash Flow** | ($185,800) | ($64,720) | $96,770 | **$96,770** |

**Conservative ROI: 39%** (vs. Salesforce's 160%)

**Payback Period: ~27 months**

---

## Part 4: Pessimistic Scenario (Risk Assessment)

### What If Things Don't Go Well?

Common failure modes and their financial impact:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PESSIMISTIC SCENARIO                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  FAILURE MODE 1: Data Quality Issues                                │
│  ────────────────────────────────────                               │
│  • 64% of orgs lack clear data & AI roadmap                         │
│  • Dirty data = wrong answers = customer frustration                │
│  • Impact: 30% lower deflection than target                         │
│                                                                     │
│  FAILURE MODE 2: Adoption Struggles                                 │
│  ──────────────────────────────────                                 │
│  • 60% cite lack of AI skills as barrier                            │
│  • Staff resistance to AI ("it will take my job")                   │
│  • Impact: 6-month delay to production, 50% of Year 1 lost          │
│                                                                     │
│  FAILURE MODE 3: Scope Creep                                        │
│  ─────────────────────────────                                      │
│  • "Just add this one more use case..."                             │
│  • Implementation doubles in cost and time                          │
│  • Impact: 2x implementation cost                                   │
│                                                                     │
│  FAILURE MODE 4: Quality Trade-offs                                 │
│  ────────────────────────────────────                               │
│  • CSAT drops when AI handles complex cases poorly                  │
│  • Customer churn from bad experiences                              │
│  • Impact: Hidden cost of 5-10% in lost revenue                     │
│                                                                     │
│  FAILURE MODE 5: Platform Lock-in                                   │
│  ─────────────────────────────────                                  │
│  • Requires Data Cloud, Service Cloud, potentially MuleSoft         │
│  • Switching costs grow over time                                   │
│  • Impact: Ongoing platform cost increases                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Pessimistic Results (Same Example Inputs)

**Adjusted Assumptions:**

- Implementation cost: 2x ($500,000)
- 6-month delay to production
- Deflection rate: 70% of target (35% max)
- 15% re-contact rate
- Platform costs increase 15%/year

| Metric                   | Year 1     | Year 2     | Year 3     | 3-Year Total   |
| ------------------------ | ---------- | ---------- | ---------- | -------------- |
| Effective Deflection     | 15%        | 25%        | 30%        | -              |
| Labor Savings            | $83,250    | $166,500   | $199,800   | $449,550       |
| Operating Costs          | ($115,000) | ($155,000) | ($180,000) | ($450,000)     |
| Net Operating Benefit    | ($31,750)  | $11,500    | $19,800    | ($450)         |
| Implementation Cost      | ($500,000) | -          | -          | ($500,000)     |
| **Cumulative Cash Flow** | ($531,750) | ($520,250) | ($500,450) | **($500,450)** |

**Pessimistic ROI: -50%**

**Payback Period: Never (within 3 years)**

---

## Part 5: Scenario Comparison Summary

### Side-by-Side Results

| Metric                 | Salesforce Method | Conservative | Pessimistic |
| ---------------------- | ----------------- | ------------ | ----------- |
| **3-Year Net Benefit** | $796,500          | $96,770      | ($500,450)  |
| **ROI**                | 160%              | 39%          | -50%        |
| **Payback Period**     | 4 months          | 27 months    | Never       |
| **Year 1 Cash Flow**   | +$216,000         | -$185,800    | -$531,750   |
| **Break-Even Point**   | Month 4           | Month 27     | N/A         |

### Visual Comparison

```
Cumulative Cash Flow Over 3 Years
─────────────────────────────────

          Salesforce Method                Conservative              Pessimistic
              ┌─────┐                         ┌─────┐                   ┌─────┐
              │     │                         │     │                   │     │
              │     │ $796K                   │     │ $97K              │     │
              │     │                         │     │                   │     │
              │     │                         │     │                   │     │
        ──────┼─────┼───── $0         ────────┼─────┼──── $0    ────────┼─────┼──── $0
              │     │                         │     │                   │     │
              │     │                         │     │ -$185K Y1         │     │ -$500K
              │     │                         │     │                   │     │
              └─────┘                         └─────┘                   └─────┘
         Y1   Y2   Y3                    Y1   Y2   Y3              Y1   Y2   Y3
```

---

## Part 6: Sensitivity Analysis

### What Matters Most? (Sensitivity to Key Variables)

#### Deflection Rate Impact

| Target Deflection      | Conservative ROI | Break-Even    |
| ---------------------- | ---------------- | ------------- |
| 30%                    | -15%             | 40+ months    |
| 40%                    | 12%              | 32 months     |
| **50%**                | **39%**          | **27 months** |
| 60%                    | 66%              | 22 months     |
| 70%                    | 93%              | 18 months     |
| 85% (Salesforce claim) | 140%             | 12 months     |

**Key Insight**: Every 10% increase in deflection rate improves ROI by ~27%

#### Agent Salary Impact

| Fully Loaded Salary | Conservative ROI | Break-Even    |
| ------------------- | ---------------- | ------------- |
| $50,000             | -12%             | 38 months     |
| $65,000             | 18%              | 30 months     |
| **$75,000**         | **39%**          | **27 months** |
| $100,000            | 85%              | 20 months     |
| $125,000            | 131%             | 15 months     |

**Key Insight**: Higher-cost labor markets see faster ROI

#### Implementation Cost Impact

| Implementation Cost    | Conservative ROI | Break-Even    |
| ---------------------- | ---------------- | ------------- |
| $100,000 (minimal)     | 99%              | 18 months     |
| $150,000 (low)         | 66%              | 21 months     |
| **$250,000 (mid)**     | **39%**          | **27 months** |
| $400,000 (complex)     | 1%               | 35 months     |
| $500,000+ (enterprise) | -11%             | 40+ months    |

**Key Insight**: Implementation costs can swing ROI by 100+ percentage points

---

## Part 7: Custom Scenario Calculator

### Fill In Your Numbers

Use this template to calculate your specific scenario:

```yaml
# ============================================
# YOUR CUSTOM SCENARIO
# ============================================

# STEP 1: ENTER YOUR INPUTS
inputs:
  service_reps: ___
  monthly_cases: ___
  handle_time_minutes: ___
  agent_salary: ___
  target_deflection: ___ # as decimal (e.g., 0.50 for 50%)

# STEP 2: CALCULATE ANNUAL METRICS
annual_cases: monthly_cases × 12 = ___
work_hours_per_fte: 2,080

# STEP 3: YEAR 1 CALCULATION (Conservative)
year_1_deflection: target_deflection × 0.50 = ___
cases_deflected_y1: annual_cases × year_1_deflection × 0.90 = ___ # 90% effective
hours_saved_y1: cases_deflected_y1 × handle_time_minutes ÷ 60 = ___
fte_saved_y1: hours_saved_y1 ÷ 2,080 = ___
labor_savings_y1: fte_saved_y1 × agent_salary = ___

# STEP 4: YEAR 1 COSTS
agentforce_cost_y1: cases_deflected_y1 × $2 = ___
maintenance_cost_y1: agent_salary × 0.5 = ___ # 0.5 FTE for tuning
total_operating_y1: agentforce_cost_y1 + maintenance_cost_y1 + $30,000 = ___

# STEP 5: YEAR 1 NET
net_operating_y1: labor_savings_y1 - total_operating_y1 = ___

# STEP 6: IMPLEMENTATION COST
# Low: $100K | Mid: $250K | High: $500K
implementation_cost: ___

# STEP 7: YEAR 1 CASH FLOW
year_1_cash_flow: net_operating_y1 - implementation_cost = ___

# STEP 8: REPEAT FOR YEARS 2-3
# Year 2: use target_deflection × 0.70
# Year 3: use target_deflection × 0.85

# STEP 9: CALCULATE TOTALS
three_year_benefit: sum of net operating benefits = ___
total_investment: implementation_cost + sum of operating costs = ___
roi: (three_year_benefit - total_investment) ÷ total_investment × 100 = ___%
```

---

## Part 8: Key Decision Framework

### Should You Proceed?

Use this decision tree based on your scenario results:

```
                     ┌────────────────────────────┐
                     │ Calculate Conservative ROI │
                     └────────────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
              ROI > 50%?                  ROI < 50%?
                    │                           │
                    ▼                           ▼
          ┌────────────────┐          ┌────────────────────────┐
          │ GREEN LIGHT    │          │ Is ROI > 0%?           │
          │ • Strong case  │          └────────────────────────┘
          │ • Proceed with │                    │
          │   phased       │          ┌─────────┴─────────┐
          │   deployment   │          │                   │
          └────────────────┘     ROI > 0%            ROI < 0%
                                      │                   │
                                      ▼                   ▼
                            ┌────────────────┐  ┌────────────────────┐
                            │ YELLOW LIGHT   │  │ RED LIGHT          │
                            │ • Marginal     │  │ • Do not proceed   │
                            │ • Reduce scope │  │ • Address barriers │
                            │ • Pilot first  │  │   before investing │
                            └────────────────┘  └────────────────────┘
```

### Pre-Flight Checklist

Before committing to Agentforce:

| Readiness Factor                  | Ready? | If No, Action Required  |
| --------------------------------- | ------ | ----------------------- |
| Data Cloud deployed and populated | ☐      | Deploy Data Cloud first |
| Service Cloud case data clean     | ☐      | Data clean-up project   |
| Knowledge base comprehensive      | ☐      | KB expansion project    |
| AI skills on team                 | ☐      | Training investment     |
| Clear use case scope              | ☐      | Use case prioritization |
| Executive sponsorship             | ☐      | Stakeholder alignment   |
| Measurement KPIs defined          | ☐      | Analytics strategy      |
| SI partner selected               | ☐      | Partner evaluation      |

### Red Flags (Consider Alternatives)

| Condition                                 | Concern                     | Alternative                            |
| ----------------------------------------- | --------------------------- | -------------------------------------- |
| ROI < 0% even with optimistic assumptions | Not viable                  | Evaluate competitors                   |
| Implementation > $400K for < 50 agents    | Over-engineered             | Start with basic automation            |
| No existing Salesforce footprint          | Platform lock-in            | Evaluate standalone AI (Ada, Intercom) |
| Case volume < 5,000/month                 | Not enough scale            | Simpler tools first                    |
| AHT < 5 minutes                           | Limited savings opportunity | Focus on quality, not deflection       |

---

## Part 9: Comparison to Other Vendors

### How Does Agentforce ROI Compare?

Based on our knowledge base analysis:

| Vendor                    | Typical ROI      | Deployment Time | Best For                           |
| ------------------------- | ---------------- | --------------- | ---------------------------------- |
| **Salesforce Agentforce** | 39-160%          | 3-6 months      | Salesforce-centric enterprises     |
| **Ada**                   | 357% (best case) | 4-8 weeks       | Multi-market, channel optimization |
| **Intercom Fin**          | 86%              | 2-4 weeks       | PLG, digital-first                 |
| **Zendesk AI**            | 50-100%          | 4-6 weeks       | Helpdesk-centric                   |
| **Genesys Cloud**         | 9.8x (3 years)   | 4-6 months      | Voice-centric enterprises          |

### When Agentforce Wins

✅ Already heavily invested in Salesforce ecosystem
✅ Data Cloud deployed with unified customer data
✅ High-value cases ($100K+ agent costs)
✅ Need for deep CRM integration
✅ Complex multi-step processes

### When Alternatives Win

❌ No existing Salesforce investment
❌ Digital-only (chat/email) operations
❌ Speed to deployment is critical
❌ Tight budget with implementation constraints
❌ Multi-market with language diversity

---

## Appendix: Formulas Reference

### Core Calculations

```python
# Annual case volume
annual_cases = monthly_case_volume * 12

# Ramped deflection (Conservative)
year_1_deflection = target_deflection * 0.50
year_2_deflection = target_deflection * 0.70
year_3_deflection = target_deflection * 0.85

# Effective cases (accounting for re-contact)
effective_cases = deflected_cases * 0.90  # 10% re-contact

# Time savings
hours_saved = effective_cases * handle_time_minutes / 60
fte_equivalent = hours_saved / 2080  # annual work hours

# Labor savings
labor_savings = fte_equivalent * agent_salary

# Agentforce cost (per-conversation)
agentforce_cost = effective_cases * 2.00

# Agentforce cost (flex credits)
credits_used = effective_cases * 20  # 20 credits per action
agentforce_cost = credits_used * 0.005  # $0.005 per credit

# Net operating benefit
net_operating = labor_savings - agentforce_cost - maintenance_cost - platform_cost

# ROI
roi = (total_benefits - total_investment) / total_investment * 100

# Payback period (months)
monthly_benefit = net_operating / 12
payback_months = implementation_cost / monthly_benefit
```

---

_Simulator Created: 2026-01-20_
_Based on Agentforce Deep-Dive Database and Salesforce Official ROI Calculator Methodology_
_For use with [Agentforce Deep-Dive Database](agentforce-deep-dive-database.md)_
