'use client';

import { formatCurrency, formatPercent } from '@/lib/utils/formatters';
import { getDepartmentColor } from '@/lib/utils/colors';

// AI Use Case data by department
const roadmapData = [
  {
    dept: 'CUSTOMER SUCCESS & SERVICE',
    spend: '$2.8M',
    ftes: 19,
    conservative: {
      savings: '$347K (12.5%)',
      fteSavings: 2.4,
      useCases: [
        { name: 'Enable AI chatbot in existing platform', impact: '20-30% ticket deflection' },
        { name: 'AI-assisted response templates', impact: 'Faster agent responses, consistency' },
        { name: 'Knowledge base auto-tagging', impact: 'Better self-service discovery' },
      ]
    },
    moderate: {
      savings: '$969K (35%)',
      fteSavings: 6.7,
      useCases: [
        { name: 'Deploy AI agent for Tier 1 ticket resolution', impact: '45% deflection, 4x faster resolution' },
        { name: 'Predictive churn & health scoring', impact: 'CSMs focus on at-risk accounts only' },
        { name: 'AI call summarization & CRM updates', impact: 'Eliminate manual note-taking' },
      ]
    },
    aggressive: {
      savings: '$1.7M (60%)',
      fteSavings: 11.4,
      useCases: [
        { name: 'Autonomous AI handles 60%+ of all support', impact: 'Harness efficiency ($40M savings model)' },
        { name: 'AI-driven proactive outreach & upsell', impact: 'AI identifies expansion opportunities' },
        { name: 'Voice AI for phone support', impact: '24/7 phone coverage without headcount' },
      ]
    }
  },
  {
    dept: 'R&D / ENGINEERING',
    spend: '$6.3M',
    ftes: 25,
    conservative: {
      savings: '$946K (15%)',
      fteSavings: 3.8,
      useCases: [
        { name: 'GitHub Copilot for all developers', impact: '26% more PRs, 55% faster coding' },
        { name: 'AI-powered documentation generation', impact: 'Auto-generate API docs, READMEs' },
        { name: 'Copilot Chat for codebase Q&A', impact: 'Faster onboarding, less tribal knowledge' },
      ]
    },
    moderate: {
      savings: '$2.2M (35%)',
      fteSavings: 8.8,
      useCases: [
        { name: 'AI code review & automated testing', impact: 'PR cycle 9.6 days → 2.4 days' },
        { name: 'Automated bug triage & prioritization', impact: 'ML-based severity scoring, routing' },
        { name: 'AI test case generation', impact: '80%+ test coverage automatically' },
      ]
    },
    aggressive: {
      savings: '$3.5M (55%)',
      fteSavings: 13.8,
      useCases: [
        { name: 'AI pair programming & architecture', impact: '46% of code AI-generated' },
        { name: 'AI agents for DevOps & incident response', impact: 'Auto-remediation of common issues' },
        { name: 'AI product spec → code generation', impact: 'Prototype features in hours not weeks' },
      ]
    }
  },
  {
    dept: 'SALES',
    spend: '$4.6M',
    ftes: 11,
    conservative: {
      savings: '$463K (10%)',
      fteSavings: 1.1,
      useCases: [
        { name: 'AI email drafting & personalization', impact: '2-3 hrs/week saved per rep' },
        { name: 'CRM auto-enrichment & activity logging', impact: 'Eliminate manual data entry' },
        { name: 'Meeting prep summaries from CRM', impact: '5-min prep vs 30-min research' },
      ]
    },
    moderate: {
      savings: '$1.4M (30%)',
      fteSavings: 3.3,
      useCases: [
        { name: 'AI lead scoring & prioritization', impact: 'Focus on highest-propensity leads' },
        { name: 'AI call coaching & objection handling', impact: 'Real-time guidance during calls' },
        { name: 'Pipeline forecasting with AI', impact: '95%+ forecast accuracy' },
      ]
    },
    aggressive: {
      savings: '$2.3M (50%)',
      fteSavings: 5.5,
      useCases: [
        { name: 'AI SDR agents for outbound', impact: '10x outbound volume, 24/7 prospecting' },
        { name: 'AI negotiation & proposal generation', impact: 'Dynamic pricing, custom proposals' },
        { name: 'AI account planning & strategy', impact: 'Whitespace analysis, expansion plays' },
      ]
    }
  },
  {
    dept: 'MARKETING',
    spend: '$1.0M',
    ftes: 4,
    conservative: {
      savings: '$156K (15%)',
      fteSavings: 0.6,
      useCases: [
        { name: 'AI content generation (blogs, social)', impact: '10x content output, same team' },
        { name: 'AI image/video creation for campaigns', impact: 'Reduce agency/contractor spend' },
        { name: 'SEO content optimization with AI', impact: 'Keyword research, meta tags automated' },
      ]
    },
    moderate: {
      savings: '$390K (37.5%)',
      fteSavings: 1.5,
      useCases: [
        { name: 'AI campaign optimization & A/B testing', impact: '20-30% higher conversion rates' },
        { name: 'Predictive audience targeting', impact: 'Find lookalike audiences automatically' },
        { name: 'AI chatbot for website lead capture', impact: '24/7 qualification, demo booking' },
      ]
    },
    aggressive: {
      savings: '$625K (60%)',
      fteSavings: 2.4,
      useCases: [
        { name: 'AI-driven personalization at scale', impact: '1:1 messaging for every prospect' },
        { name: 'AI marketing strategist & planner', impact: 'Auto-generate campaign briefs & calendars' },
        { name: 'Autonomous paid media management', impact: 'AI adjusts bids, budgets, creative in real-time' },
      ]
    }
  },
  {
    dept: 'G&A / FINANCE',
    spend: '$4.3M',
    ftes: 9,
    conservative: {
      savings: '$427K (10%)',
      fteSavings: 0.9,
      useCases: [
        { name: 'AI invoice processing & AP automation', impact: '85% faster invoice processing' },
        { name: 'Contract review & redlining AI', impact: '80% faster legal review' },
        { name: 'HR onboarding & policy Q&A chatbot', impact: 'Self-service HR, reduce tickets' },
      ]
    },
    moderate: {
      savings: '$1.1M (25%)',
      fteSavings: 2.3,
      useCases: [
        { name: 'AI-powered FP&A & variance analysis', impact: 'Auto-generate variance explanations' },
        { name: 'AI expense auditing & policy enforcement', impact: 'Flag anomalies, ensure compliance' },
        { name: 'AI recruiting screening & scheduling', impact: 'Auto-screen resumes, book interviews' },
      ]
    },
    aggressive: {
      savings: '$1.9M (45%)',
      fteSavings: 4.1,
      useCases: [
        { name: 'Autonomous close & reporting', impact: 'Continuous close vs. monthly' },
        { name: 'AI CFO co-pilot for scenario modeling', impact: 'Real-time what-if analysis on demand' },
        { name: 'AI HR business partner for managers', impact: 'Performance insights, comp benchmarking' },
      ]
    }
  }
];

export default function AIRoadmapTable() {
  return (
    <div className="space-y-6">
      {/* Phase Overview */}
      <div className="bg-surface border border-border rounded-xl p-6 backdrop-blur-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
        <h3 className="text-base font-semibold text-text-primary mb-4 uppercase">Implementation Approach by Phase</h3>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Conservative Phase */}
          <div className="space-y-2 p-4 border-r border-border">
            <div className="flex items-center gap-2">
              <div className="text-sm font-bold text-accent-blue uppercase">Conservative</div>
              <div className="text-xs text-text-tertiary">0-3 months</div>
            </div>
            <div className="text-sm text-text-secondary">
              Quick wins using existing vendor features. Minimal process change, low risk. Focus on enabling built-in AI capabilities in current tools.
            </div>
          </div>

          {/* Moderate Phase */}
          <div className="space-y-2 p-4 border-r border-border">
            <div className="flex items-center gap-2">
              <div className="text-sm font-bold text-accent-green uppercase">Moderate</div>
              <div className="text-xs text-text-tertiary">6-9 months</div>
            </div>
            <div className="text-sm text-text-secondary">
              Integrated workflows and cross-functional pilots. Some process redesign, moderate investment. Deploy AI agents for specific use cases.
            </div>
          </div>

          {/* Aggressive Phase */}
          <div className="space-y-2 p-4">
            <div className="flex items-center gap-2">
              <div className="text-sm font-bold uppercase" style={{ color: 'var(--synaptic-orange)' }}>Aggressive</div>
              <div className="text-xs text-text-tertiary">12-15 months</div>
            </div>
            <div className="text-sm text-text-secondary">
              AI-native operations with autonomous agents. Significant restructure, higher investment. Transform to AI-first operating model.
            </div>
          </div>
        </div>
      </div>

      {roadmapData.map((dept) => {
        const deptColor = getDepartmentColor(dept.dept.toLowerCase().includes('customer') ? 'css' :
                                             dept.dept.toLowerCase().includes('r&d') ? 'rd' :
                                             dept.dept.toLowerCase().includes('sales') ? 'sales' :
                                             dept.dept.toLowerCase().includes('marketing') ? 'marketing' : 'ga');

        return (
          <div key={dept.dept} className="bg-surface border border-border rounded-xl overflow-hidden backdrop-blur-xl"
               style={{ boxShadow: 'var(--shadow-card)', borderLeft: `4px solid ${deptColor}` }}>
            {/* Department Header */}
            <div className="p-4 border-b border-border" style={{ background: `${deptColor}15` }}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-text-primary">{dept.dept}</h3>
                  <div className="text-xs text-text-secondary">{dept.spend} annual spend | {dept.ftes} FTEs</div>
                </div>
              </div>
            </div>

            {/* 3-Column Scenarios */}
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Conservative */}
              <div className="p-4 border-r border-border">
                <div className="mb-3">
                  <div className="flex items-baseline gap-2">
                    <div className="text-lg font-bold text-accent-blue">{dept.conservative.savings}</div>
                    <div className="text-xs text-text-secondary">
                      ≈ {dept.conservative.fteSavings.toFixed(1)} FTE
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {dept.conservative.useCases.map((uc, idx) => (
                    <div key={idx} className="text-xs">
                      <div className="font-medium text-text-primary">{idx + 1}. {uc.name}</div>
                      <div className="text-accent-blue ml-4">→ {uc.impact}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Moderate */}
              <div className="p-4 border-r border-border">
                <div className="mb-3">
                  <div className="flex items-baseline gap-2">
                    <div className="text-lg font-bold text-accent-green">{dept.moderate.savings}</div>
                    <div className="text-xs text-text-secondary">
                      ≈ {dept.moderate.fteSavings.toFixed(1)} FTE
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {dept.moderate.useCases.map((uc, idx) => (
                    <div key={idx} className="text-xs">
                      <div className="font-medium text-text-primary">{idx + 1}. {uc.name}</div>
                      <div className="text-accent-green ml-4">→ {uc.impact}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aggressive */}
              <div className="p-4">
                <div className="mb-3">
                  <div className="flex items-baseline gap-2">
                    <div className="text-lg font-bold" style={{ color: 'var(--synaptic-orange)' }}>
                      {dept.aggressive.savings}
                    </div>
                    <div className="text-xs text-text-secondary">
                      ≈ {dept.aggressive.fteSavings.toFixed(1)} FTE
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {dept.aggressive.useCases.map((uc, idx) => (
                    <div key={idx} className="text-xs">
                      <div className="font-medium text-text-primary">{idx + 1}. {uc.name}</div>
                      <div className="ml-4" style={{ color: 'var(--synaptic-orange)' }}>→ {uc.impact}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Totals Summary */}
      <div className="bg-surface border-2 border-border-strong rounded-xl backdrop-blur-xl overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
        <div className="grid grid-cols-3">
          <div className="text-center p-4 border-r border-border">
            <div className="text-xs text-text-tertiary mb-1">CONSERVATIVE TOTALS</div>
            <div className="text-xl font-bold text-accent-blue">$2.3M (12%)</div>
            <div className="text-xs text-text-secondary mt-1">≈ 8.8 FTE equivalent</div>
            <div className="text-xs text-text-secondary">Investment: $380K</div>
            <div className="text-xs text-text-tertiary">Timeline: 0-3 months</div>
          </div>
          <div className="text-center p-4 border-r border-border">
            <div className="text-xs text-text-tertiary mb-1">MODERATE TOTALS</div>
            <div className="text-xl font-bold text-accent-green">$6.0M (32%)</div>
            <div className="text-xs text-text-secondary mt-1">≈ 22.6 FTE equivalent</div>
            <div className="text-xs text-text-secondary">Investment: $950K</div>
            <div className="text-xs text-text-tertiary">Timeline: 6-9 months</div>
          </div>
          <div className="text-center p-4">
            <div className="text-xs text-text-tertiary mb-1">AGGRESSIVE TOTALS</div>
            <div className="text-xl font-bold" style={{ color: 'var(--synaptic-orange)' }}>$10.0M (53%)</div>
            <div className="text-xs text-text-secondary mt-1">≈ 37.2 FTE equivalent</div>
            <div className="text-xs text-text-secondary">Investment: $1.9M</div>
            <div className="text-xs text-text-tertiary">Timeline: 12-15 months</div>
          </div>
        </div>
      </div>
    </div>
  );
}
