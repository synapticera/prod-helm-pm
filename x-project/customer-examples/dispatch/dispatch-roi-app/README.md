# Dispatch AI ROI Navigator

An interactive web application for exploring AI transformation scenarios and enterprise value impact for Dispatch.

## Quick Start

```bash
./start.sh
```

The app will automatically:
- Kill any existing process on port 4111
- Install dependencies if needed
- Start the development server at **http://localhost:4111**

## Features

### 1. Department Cost Benchmarking
- Compare Dispatch's department spending vs. industry benchmarks
- View detailed breakdowns by clicking on any department
- See assessment badges (At Benchmark, Above Median, Below Median)

### 2. AI Opportunity Roadmap
- Explore AI savings potential by department
- Toggle between 4 scenarios: Conservative, Moderate, Aggressive, Transformed
- View real-world use cases and evidence for each department

### 3. Scenario Comparison
- Side-by-side comparison of all 4 AI transformation scenarios
- See ROI multiples, payback periods, and EBITDA impact
- Track Rule of 40 score improvements

### 4. Enterprise Value Impact
- Calculate enterprise value gains at different EBITDA multiples (8x, 10x, 12x)
- See EV return multiples ("Every $1 invested creates $X in EV")
- Compare valuation impact across all scenarios

## Technology Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Recharts** for data visualization
- **@react-spring** for smooth animations
- **@radix-ui** for accessible UI components

## Development Commands

```bash
# Start development server (recommended)
./start.sh

# Or manually
PORT=4111 npm run dev

# Build for production
npm run build

# Start production server
PORT=4111 npm start

# Run linter
npm run lint
```

## Key Interactions

1. **Global Scenario Selector**: Changes the active scenario across all views
2. **Department Drill-Down**: Click any department card to see detailed breakdown
3. **EV Multiple Toggle**: Switch between 8x, 10x, and 12x EBITDA multiples
4. **Animated Numbers**: Smooth transitions when changing scenarios

## Design Philosophy

This is a **strategic decision-making tool**, not a dashboard. The UX is designed as a guided journey:
1. Understand where you are → Department Cost Benchmarking
2. See what's possible → AI Opportunity Roadmap
3. Model the outcomes → Scenario Comparison
4. Quantify the value → Enterprise Value Impact
