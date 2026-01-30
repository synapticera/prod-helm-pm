# Agentforce ROI Calculator: Implementation Guide for AI Developers

## Purpose

This document provides guidance for an AI system building an interactive ROI calculator application for Salesforce Agentforce. It complements the machine-readable specification in `agentforce-roi-model-spec.json`.

---

## Quick Start for AI Builders

### What You're Building

An interactive web application that allows users to:

1. Input their current service team metrics
2. See projected ROI across three scenarios (Optimistic, Conservative, Pessimistic)
3. Compare their results to real-world benchmarks
4. Get actionable recommendations

### Key Files to Reference

| File                               | Purpose                                         |
| ---------------------------------- | ----------------------------------------------- |
| `agentforce-roi-model-spec.json`   | Complete data schema, formulas, inputs, outputs |
| `agentforce-roi-simulator.md`      | Human-readable explanation of methodology       |
| `agentforce-deep-dive-database.md` | Source data for benchmarks and case studies     |

---

## Core Calculation Logic

### The Three Scenarios

| Scenario                  | What It Models                  | Key Differences                                 |
| ------------------------- | ------------------------------- | ----------------------------------------------- |
| **Salesforce Optimistic** | How Salesforce markets ROI      | No implementation costs, 70%→85%→100% ramp      |
| **Conservative**          | Realistic enterprise deployment | Full costs, 50%→70%→85% ramp, 10% recontact     |
| **Pessimistic**           | Risk-adjusted worst case        | 2x implementation, 6-month delay, 15% recontact |

### Master Formula (Simplified)

```
For each year (1, 2, 3):

  effective_deflection = target_deflection × ramp_factor[year]
  cases_deflected = annual_cases × effective_deflection × (1 - recontact_rate)
  hours_saved = cases_deflected × handle_time_minutes / 60
  labor_savings = hours_saved / 2080 × agent_salary

  agentforce_cost = cases_deflected × $2  (per-conversation pricing)
  maintenance_cost = agent_salary × 0.5   (0.5 FTE for tuning)
  platform_cost = $30,000 × inflation     (incremental platform)

  net_operating = labor_savings - agentforce_cost - maintenance_cost - platform_cost

Total:
  implementation_cost = complexity_cost × multiplier
  three_year_net = sum(net_operating) - implementation_cost
  roi = (labor_savings - total_costs) / total_costs × 100
  payback_months = implementation_cost / (year_1_net_operating / 12)
```

---

## User Interface Recommendations

### Input Section Design

**Organize inputs into logical groups:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  YOUR SERVICE TEAM                                                  │
├─────────────────────────────────────────────────────────────────────┤
│  Number of Service Agents    [====○================] 25             │
│  Monthly Case Volume         [__________] 10,000                    │
│  Average Handle Time (min)   [====○================] 12             │
│  Agent Fully Loaded Cost     [$ ________] $75,000                   │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  YOUR TARGETS                                                       │
├─────────────────────────────────────────────────────────────────────┤
│  Target Deflection Rate      [====○================] 50%            │
│                              ├──────────────────────────────────┤   │
│                              Below    Typical   Good   Exceptional  │
│                              Avg       30-50%   50-70%   70-85%     │
│                                                                     │
│  Implementation Complexity   ○ Minimal  ○ Low  ● Mid  ○ High  ○ Ent │
│                              ($100K)  ($150K) ($250K) ($400K) ($500K)│
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  ADVANCED OPTIONS                                                   │
├─────────────────────────────────────────────────────────────────────┤
│  [Toggle] Include implementation costs    ● Yes  ○ No               │
│  [Toggle] Pricing model                   ● Per-Conv  ○ Flex Credits│
│  [Toggle] Include SDR Agent               ○ Yes  ● No               │
│  [Toggle] Include Field Service           ○ Yes  ● No               │
└─────────────────────────────────────────────────────────────────────┘
```

### Results Display Design

**Primary metrics should be highly visible:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CONSERVATIVE ESTIMATE                         │
├───────────────────┬───────────────────┬────────────────────────────┤
│                   │                   │                            │
│    3-YEAR NET     │       ROI         │     PAYBACK PERIOD         │
│                   │                   │                            │
│    $96,770        │       39%         │     27 months              │
│    ▲ Positive     │   ◉ Moderate      │     ◉ Medium               │
│                   │                   │                            │
└───────────────────┴───────────────────┴────────────────────────────┘
```

**Scenario comparison table:**

```
┌─────────────────────────────────────────────────────────────────────┐
│               SCENARIO COMPARISON                                    │
├──────────────────┬───────────────┬─────────────┬───────────────────┤
│ Metric           │ Salesforce    │ Conservative│ Pessimistic       │
│                  │ Method        │ (Realistic) │ (Risk-Adjusted)   │
├──────────────────┼───────────────┼─────────────┼───────────────────┤
│ 3-Year Net       │ $796,500      │ $96,770     │ -$500,450         │
│ ROI              │ 160%          │ 39%         │ -50%              │
│ Payback          │ 4 months      │ 27 months   │ Never             │
│ Year 1 Cash Flow │ +$216,000     │ -$185,800   │ -$531,750         │
└──────────────────┴───────────────┴─────────────┴───────────────────┘
```

### Visualization Priorities

**1. Cumulative Cash Flow Chart (Most Important)**

- X-axis: Months (0-36)
- Y-axis: Cumulative cash flow ($)
- Three lines for three scenarios
- Horizontal line at $0 to show break-even
- Markers where each scenario crosses break-even

**2. Deflection Rate Gauge**

- Gauge showing user's target deflection
- Color zones: Red (0-30%), Yellow (30-50%), Green (50-70%), Dark Green (70%+)
- Markers showing benchmark companies (Salesforce at 85%, Wyndham at 62%, etc.)

**3. Cost-Benefit Waterfall**

- Starting with Labor Savings (positive, green)
- Subtracting: Agentforce Cost, Implementation, Maintenance, Platform
- Ending with Net Benefit

---

## Decision Support Logic

### Recommendation Engine

Implement this decision tree:

```javascript
function getRecommendation(conservativeROI, inputs) {
  if (conservativeROI > 50) {
    return {
      signal: "green",
      title: "Strong Business Case",
      message: "Proceed with phased deployment",
      actions: [
        "Create detailed project plan",
        "Identify SI partner",
        "Begin Data Cloud preparation"
      ]
    };
  } else if (conservativeROI > 0) {
    return {
      signal: "yellow",
      title: "Marginal Business Case",
      message: "Consider reducing scope or piloting first",
      actions: [
        "Pilot with single use case",
        "Reduce implementation complexity",
        "Validate deflection assumptions with limited test"
      ]
    };
  } else {
    return {
      signal: "red",
      title: "Negative ROI Projected",
      message: "Address barriers before investing",
      actions: [
        "Improve data quality first",
        "Build AI skills on team",
        "Evaluate alternative vendors (Ada, Intercom)"
      ]
    };
  }
}
```

### Red Flag Detection

```javascript
function detectRedFlags(inputs, results) {
  const flags = [];

  if (results.pessimistic.roi > 0 && results.conservative.roi < 0) {
    // Even optimistic scenario is negative
    flags.push({
      severity: "critical",
      message: "Not viable. Even optimistic assumptions show negative ROI.",
      recommendation: "Evaluate competitor solutions."
    });
  }

  if (inputs.implementation_cost > 400000 && inputs.service_reps < 50) {
    flags.push({
      severity: "warning",
      message: "Implementation cost may be over-engineered for team size.",
      recommendation: "Consider lower complexity deployment."
    });
  }

  if (inputs.monthly_case_volume < 5000) {
    flags.push({
      severity: "warning",
      message: "Low case volume limits ROI potential.",
      recommendation: "Simpler automation tools may be more appropriate."
    });
  }

  if (inputs.average_handle_time_minutes < 5) {
    flags.push({
      severity: "info",
      message: "Short handle time limits savings per case.",
      recommendation: "Focus on quality improvement rather than deflection."
    });
  }

  return flags;
}
```

---

## Benchmark Data

Include these benchmarks for user context:

### Deflection Rate Benchmarks

| Company                    | Rate   | Context                        |
| -------------------------- | ------ | ------------------------------ |
| Salesforce (Customer Zero) | 85%    | Internal deployment, best-case |
| UK Police (Bobbi)          | 82%    | Public sector                  |
| Engie                      | 83%    | Energy/utilities               |
| 1-800Accountant            | 70%    | Peak period (tax season)       |
| Wyndham                    | 62%    | Hospitality enterprise         |
| Typical Mid-Market         | 30-50% | Industry average               |

### ROI Benchmarks

| Vendor/Company        | ROI  | Notes                              |
| --------------------- | ---- | ---------------------------------- |
| Wiley (Agentforce)    | 213% | Best documented Salesforce case    |
| Loop Earplugs (Ada)   | 357% | Best documented across all vendors |
| Genesys Customer Zero | 980% | 3-year cumulative                  |

### Deployment Time Benchmarks

| Company            | Time       | Context            |
| ------------------ | ---------- | ------------------ |
| Engine             | 12 days    | Fastest documented |
| Engie              | 3 weeks    | POC only           |
| Safari365          | 6 weeks    | Full deployment    |
| Fisher & Paykel    | <3 months  | Enterprise scale   |
| Typical Enterprise | 3-6 months | Industry standard  |

---

## Export Capabilities

### PDF Report Structure

```
Page 1: Executive Summary
- Key metrics (Net Benefit, ROI, Payback)
- Recommendation signal (Green/Yellow/Red)
- Top 3 action items

Page 2: Detailed Results
- Yearly breakdown table
- Scenario comparison
- Cash flow chart

Page 3: Sensitivity Analysis
- Deflection rate sensitivity
- Salary sensitivity
- Implementation cost sensitivity

Page 4: Assumptions & Methodology
- All input values
- Calculation methodology
- Data sources
```

### Excel Export

Include these sheets:

1. **Summary** - Key metrics
2. **Inputs** - All user inputs
3. **Calculations** - Full yearly breakdown with formulas visible
4. **Scenarios** - All three scenarios side-by-side
5. **Sensitivity** - Sensitivity tables
6. **Benchmarks** - Reference data

---

## Testing Scenarios

Use these test cases to validate your implementation:

### Test Case 1: Mid-Market (Default)

- 25 agents, 10,000 monthly cases, 12 min AHT, $75K salary, 50% target
- Expected Conservative ROI: ~39%
- Expected Payback: ~27 months

### Test Case 2: High-Volume Enterprise

- 100 agents, 50,000 monthly cases, 8 min AHT, $100K salary, 60% target
- Expected Conservative ROI: ~75%
- Expected Payback: ~18 months

### Test Case 3: Small Team (Edge Case)

- 5 agents, 2,000 monthly cases, 15 min AHT, $60K salary, 30% target
- Expected Conservative ROI: Negative
- Should trigger "insufficient scale" red flag

### Test Case 4: High Labor Cost Market

- 25 agents, 10,000 monthly cases, 12 min AHT, $125K salary, 50% target
- Expected Conservative ROI: ~100%+
- Expected Payback: <18 months

---

## Error Handling

### Input Validation

```javascript
const validationRules = {
  service_reps: { min: 1, max: 10000, type: "integer" },
  monthly_case_volume: { min: 100, max: 10000000, type: "integer" },
  average_handle_time_minutes: { min: 1, max: 120, type: "number" },
  agent_fully_loaded_salary: { min: 30000, max: 250000, type: "number" },
  target_deflection_rate: { min: 0.1, max: 0.85, type: "percentage" }
};
```

### Edge Cases

- **Division by zero**: If net operating is 0 or negative, payback period should show "N/A" or "Never"
- **Extreme values**: Cap display at reasonable ranges to prevent UI overflow
- **Negative results**: Always allow display of negative ROI (it's valid information)

---

## Accessibility Requirements

1. **Color blind safe**: Don't rely solely on red/green. Use icons (✓, !, ×) alongside colors
2. **Screen reader labels**: All charts need text alternatives
3. **Keyboard navigation**: All inputs and controls accessible via keyboard
4. **High contrast**: Ensure 4.5:1 contrast ratio for text

---

## Localization Notes

- Currency formatting should adapt to locale
- Number formatting (1,000 vs 1.000) should adapt
- Percentage display consistent (50% not 0.50 for user-facing)
- All text should be externalizable for future translation

---

## Performance Considerations

- Calculations are simple arithmetic; should update in real-time (<16ms)
- Charts can render on input change without debouncing
- Consider lazy-loading sensitivity analysis tables

---

## Questions This Calculator Should Answer

Users should be able to answer:

1. "What ROI can I realistically expect from Agentforce?"
2. "How long until I break even?"
3. "What happens if I don't hit my deflection target?"
4. "How does my scenario compare to published case studies?"
5. "Is Agentforce the right solution for my scale?"
6. "What should I watch out for in implementation?"

---

_Implementation Guide Version: 1.0_
_Created: 2026-01-20_
_Companion to: agentforce-roi-model-spec.json_
