'use client';

import { useScenario } from '@/lib/hooks/useScenario';
import { getProjectedOutcomes, getEnterpriseValueImpact } from '@/lib/data';
import { formatCurrency, formatPercent, formatMultiple } from '@/lib/utils/formatters';
import { useState } from 'react';
import Card from '@/components/shared/Card';
import AnimatedNumber from '@/components/shared/AnimatedNumber';
import ProgressBar from '@/components/shared/ProgressBar';
import { Target, DollarSign, TrendingUp } from 'lucide-react';

export default function HeroSummary() {
  const { scenario } = useScenario();
  const outcomes = getProjectedOutcomes();
  const evImpact = getEnterpriseValueImpact();
  const [evMultiple] = useState<8 | 10 | 12>(10);

  const baseline = outcomes.scenarios.baseline;
  const current = outcomes.scenarios[scenario];
  const evKey = `ev${evMultiple}x` as 'ev8x' | 'ev10x' | 'ev12x';
  const evGain = evImpact.evByScenario[scenario][evKey] - (evImpact.baselineEbitda * evMultiple);

  return (
    <section className="space-y-6 mb-12">
      {/* Section Header */}
      <div>
        <h2 className="text-3xl font-bold text-text-primary mb-2">
          Executive Summary
        </h2>
        <p className="text-text-secondary">
          AI transformation potential in the <span className="text-accent-blue font-semibold">{scenario}</span> scenario
        </p>
      </div>

      {/* 3-Column KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* KPI 1: Rule of 40 Progress */}
        <Card>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{
                background: 'var(--synaptic-teal-subtle)',
                border: '1px solid var(--synaptic-teal)'
              }}>
                <Target className="w-5 h-5" style={{ color: 'var(--synaptic-teal-bright)' }} />
              </div>
              <div>
                <div className="text-sm text-text-secondary">Rule of 40 Progress</div>
                <div className="text-2xl font-bold text-text-primary">
                  <AnimatedNumber
                    value={current.newRuleOf40 * 100}
                    formatter={(v) => `${v.toFixed(1)}%`}
                  />
                </div>
              </div>
            </div>

            <ProgressBar
              current={current.newRuleOf40}
              target={0.70}
              showPercentage={false}
            />

            <div className="flex justify-between text-xs text-text-tertiary">
              <span>Baseline: {formatPercent(baseline.ruleOf40)}</span>
              <span>Target: 40%</span>
            </div>
          </div>
        </Card>

        {/* KPI 2: Total Opportunity */}
        <Card>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid #10B981'
              }}>
                <TrendingUp className="w-5 h-5 text-accent-green" />
              </div>
              <div>
                <div className="text-sm text-text-secondary">Annual Savings</div>
                <div className="text-3xl font-bold text-accent-green">
                  <AnimatedNumber
                    value={current.totalSavings}
                    formatter={formatCurrency}
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-text-tertiary">Investment</span>
                <span className="text-text-primary font-semibold">{formatCurrency(current.investment)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-tertiary">Net Benefit</span>
                <span className="text-accent-green font-bold">{formatCurrency(current.netBenefit)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-tertiary">ROI</span>
                <span className="text-accent-blue font-bold">{formatMultiple(current.roiMultiple)}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* KPI 3: Enterprise Value Gain */}
        <Card>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{
                background: 'var(--synaptic-orange-subtle)',
                border: '1px solid var(--synaptic-orange)',
                boxShadow: 'var(--glow-orange-sm)'
              }}>
                <DollarSign className="w-5 h-5" style={{ color: 'var(--synaptic-orange)' }} />
              </div>
              <div>
                <div className="text-sm text-text-secondary">Enterprise Value Gain</div>
                <div className="text-3xl font-bold" style={{ color: 'var(--synaptic-orange)' }}>
                  <AnimatedNumber
                    value={evGain}
                    formatter={formatCurrency}
                  />
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg" style={{
              background: 'var(--synaptic-orange-subtle)',
              border: '1px solid var(--synaptic-orange)'
            }}>
              <div className="text-xs text-text-secondary mb-1">At {evMultiple}x EBITDA multiple</div>
              <div className="text-sm font-bold" style={{ color: 'var(--synaptic-orange)' }}>
                Every $1 invested → ${(evGain / current.investment).toFixed(0)} in EV
              </div>
            </div>

            <div className="text-xs text-text-tertiary">
              {formatMultiple(current.roiMultiple)} ROI in {current.paybackPeriod}
            </div>
          </div>
        </Card>

      </div>
    </section>
  );
}
