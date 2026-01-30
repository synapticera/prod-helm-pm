"# Claude Code Prompt: Dispatch AI Opportunity Navigator

## Project Overview

Build an interactive web application that helps executive stakeholders at Dispatch (an enterprise SaaS company) explore their department cost structure, compare it to industry benchmarks, and navigate AI transformation scenarios with clear ROI and enterprise value impact.

## Design Philosophy

This is a **strategic decision-making tool**, not a dashboard. The UX should feel like a guided journey:
1. **Understand where you are** → Department Cost Benchmarking
2. **See what's possible** → AI Opportunity by Department
3. **Model the outcomes** → Scenario comparison with financials
4. **Quantify the value** → Enterprise Value impact and ROI

Think: clean, modern fintech aesthetic. Stripe, Carta, or Ramp-level polish. Dark mode preferred but light mode option.

---

## Core Features

### 1. Department Cost Benchmarking View

**Purpose**: Show Dispatch's current department spend vs. industry benchmarks

**Key Elements**:
- Interactive bar chart comparing Dispatch spend % vs. Benchmark Median vs. Top Quartile
- Departments: COGS, Customer Success & Service, R&D, Sales, Marketing, G&A
- Color-coded assessment badges: ✅ At/Below Benchmark, ⚠️ Above Median
- Click into any department to see:
  - Subcategory breakdown
  - Headcount details
  - Specific benchmark notes
  - AI opportunity preview (teaser to next section)

**Visual Treatment**:
- Horizontal bar chart with benchmark lines overlaid
- Hover states showing exact percentages and dollar amounts
- ""Variance from median"" callouts for departments above benchmark

**Data Source**: `departments` array in JSON, cross-referenced with `industryBenchmarks`

---

### 2. AI Opportunity Roadmap

**Purpose**: Show AI impact potential by department with real case study evidence

**Key Elements**:
- Department cards/rows showing:
  - Current annual spend
  - Savings potential across 4 scenarios (Conservative → Transformed)
  - Top AI use cases with evidence snippets
- Expandable detail view per department showing:
  - Specific use cases (e.g., ""Ticket Deflection"", ""Copilot Productivity"")
  - Market evidence quotes with source attribution
  - Visual showing efficiency gain curve

**Interaction**:
- Scenario toggle/slider to switch between Conservative/Moderate/Aggressive/Transformed
- As user changes scenario, all department numbers update dynamically
- ""Evidence"" expandable sections with real case study data

**Data Source**: `departments[].aiOpportunity`, `aiScenarios.departmentImpact`

---

### 3. Scenario Comparison & P&L Impact

**Purpose**: Side-by-side comparison of financial outcomes across scenarios

**Key Elements**:
- 4-column comparison: Conservative | Moderate | Aggressive | Transformed
- For each scenario show:
  - Total efficiency savings
  - Investment required
  - Net annual benefit
  - ROI multiple (e.g., ""6.2x"")
  - Payback period
  - FTE equivalent impact (clarify: ""capacity freed, not layoffs"")
  - New EBITDA and EBITDA margin
  - Rule of 40 score with target line visualization

**Visual Treatment**:
- Waterfall chart showing: Current EBITDA → Savings → Investment → New EBITDA
- Rule of 40 gauge/meter with 40% target line clearly marked
- Highlight when scenarios cross key thresholds (e.g., ""Exceeds Rule of 40!"")

**Data Source**: `projectedOutcomes.scenarios`

---

### 4. Enterprise Value Impact Calculator

**Purpose**: Translate operational improvements into valuation outcomes

**Key Elements**:
- EV multiple selector (8x / 10x / 12x EBITDA) with context:
  - 8x = ""Lower-growth SaaS""
  - 10x = ""Median SaaS multiple""
  - 12x = ""Premium / high-growth SaaS""
- For selected multiple, show:
  - Baseline Enterprise Value
  - New EV by scenario
  - EV Gain (absolute $ and % increase)
  - ""EV Return Multiple"" → Every $1 invested creates $X in EV

**Key Insight to Highlight**:
> ""At a 10x multiple, the Moderate scenario generates $41M in enterprise value from a $760K investment — a 54x return on AI investment.""

**Visual Treatment**:
- Large, impactful numbers for EV gains
- Investment → EV gain visualization (small bar on left, large bar on right)
- Comparison across scenarios at selected multiple

**Data Source**: `enterpriseValueImpact`

---

### 5. Market Evidence Library (Optional Enhancement)

**Purpose**: Searchable repository of AI case studies backing the projections

**Key Elements**:
- Organized by department
- Source attribution (McKinsey, Bain, Gartner, company case studies)
- Key stats highlighted
- Filter by department, metric type, or source

**Data Source**: `marketEvidence`

---

## Technical Requirements

### Stack Recommendation
- **Framework**: Next.js 14 with App Router (or React + Vite if simpler)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Charts**: Recharts or Tremor (great for financial dashboards)
- **State**: React useState/useContext (no need for Redux complexity)
- **Data**: Static JSON import (no backend needed)

### Key Interactions
1. **Global scenario selector**: Persists across views, updates all numbers
2. **Department drill-down**: Click department → expanded view with details
3. **EV multiple toggle**: Real-time recalculation of enterprise value
4. **Smooth transitions**: Animate number changes when switching scenarios

### Responsive Design
- Desktop-first (this is an exec tool, likely viewed on laptop/monitor)
- Tablet-friendly for board meetings
- Mobile: simplified view with key metrics only

---

## Data Structure

The attached `dispatch_ai_data.json` contains all data needed:

```
{
  company: { metrics, name, fiscalYear }
  industryBenchmarks: { metrics by category }
  departments: [
    { id, name, annualSpend, percentOfRevenue, benchmark, assessment, teams, aiOpportunity }
  ]
  aiScenarios: {
    definitions: [ { id, name, efficiencyTarget, timeline, riskProfile, description } ]
    departmentImpact: { [deptId]: { conservative, moderate, aggressive, transformed } }
    investmentRates: { conservative, moderate, aggressive, transformed }
  }
  projectedOutcomes: {
    scenarios: { baseline, conservative, moderate, aggressive, transformed }
  }
  enterpriseValueImpact: {
    multiples, evByScenario
  }
  marketEvidence: { generalStats, byDepartment }
}
```

---

## Sample UI Copy & Messaging

### Headlines
- ""Department Cost Benchmarking"" → ""How does Dispatch compare to the market?""
- ""AI Opportunity Roadmap"" → ""Where can AI create the most value?""
- ""Scenario Comparison"" → ""What are the financial outcomes?""
- ""Enterprise Value Impact"" → ""How does this translate to valuation?""

### Key Insights to Surface
1. **CS&S is above benchmark** (10.8% vs 8% median) → ""Highest AI opportunity area""
2. **Marketing is lean** (4.1% vs 8% median) → ""Already efficient; AI amplifies output""
3. **Rule of 40 gap** (23.6% vs 40% target) → ""Aggressive AI gets you to 50%+""
4. **EV creation** → ""Every $1 invested creates $50+ in enterprise value""

### Tone
- Executive-level, not technical
- Confident but not hyperbolic
- Data-driven with clear sourcing

---

## Deliverables

1. **Single-page application** with tabbed/scrolling navigation
2. **Interactive scenario selector** affecting all views
3. **Department drill-down** capability
4. **EV calculator** with multiple selector
5. **Clean, professional design** suitable for board presentation

---

## Stretch Goals (If Time Permits)

- Export to PDF for board decks
- ""Build Your Own Scenario"" with custom efficiency sliders per department
- Timeline view showing implementation phases
- Comparison to specific peer companies (would need additional data)

---

## Getting Started

1. Create new Next.js project: `npx create-next-app@latest dispatch-ai-navigator`
2. Install dependencies: `npm install recharts @radix-ui/react-* tailwindcss`
3. Copy the JSON data file into `/src/data/dispatch_ai_data.json`
4. Build the component structure following the 4-view architecture above
5. Start with the Department Benchmarking view and work forward

Let's build something awesome! 🚀"