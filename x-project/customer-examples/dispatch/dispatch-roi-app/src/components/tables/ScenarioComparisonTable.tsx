'use client';

import { useScenario } from '@/lib/hooks/useScenario';
import { getProjectedOutcomes } from '@/lib/data';
import { formatCurrency, formatPercent, formatMultiple } from '@/lib/utils/formatters';
import { getScenarioColor } from '@/lib/utils/colors';
import type { Scenario } from '@/lib/types';
import AnimatedNumber from '@/components/shared/AnimatedNumber';

const scenarios: { id: Scenario; label: string }[] = [
  { id: 'conservative', label: 'Incremental' },
  { id: 'moderate', label: 'Moderate' },
  { id: 'aggressive', label: 'Aggressive' },
  { id: 'transformed', label: 'Transformed' },
];

export default function ScenarioComparisonTable() {
  const { scenario: selectedScenario } = useScenario();
  const outcomes = getProjectedOutcomes();

  const metrics = [
    { key: 'totalSavings', label: 'Total Savings', formatter: formatCurrency as (v: any) => string },
    { key: 'investment', label: 'Investment Required', formatter: formatCurrency as (v: any) => string },
    { key: 'netBenefit', label: 'Net Annual Benefit', formatter: formatCurrency as (v: any) => string },
    { key: 'roiMultiple', label: 'ROI Multiple', formatter: formatMultiple as (v: any) => string },
    { key: 'paybackPeriod', label: 'Payback Period', formatter: (v: any) => v as string },
    { key: 'fteEquivalent', label: 'FTE Capacity Freed', formatter: (v: any) => `${v} FTEs` },
    { key: 'newEbitda', label: 'New EBITDA', formatter: formatCurrency as (v: any) => string },
    { key: 'newEbitdaMargin', label: 'EBITDA Margin', formatter: formatPercent as (v: any) => string },
    { key: 'newRuleOf40', label: 'Rule of 40 Score', formatter: formatPercent as (v: any) => string },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2" style={{ borderColor: 'var(--border-strong)' }}>
            <th className="text-left py-4 px-6 text-sm font-semibold text-text-secondary sticky left-0 bg-background">
              Metric
            </th>
            {scenarios.map(({ id, label }) => (
              <th
                key={id}
                className={`text-right py-4 px-6 text-sm font-semibold transition-all ${
                  selectedScenario === id ? 'text-accent-blue' : 'text-text-secondary'
                }`}
                style={selectedScenario === id ? {
                  background: 'var(--synaptic-teal-subtle)',
                  borderLeft: '2px solid var(--synaptic-teal)',
                  borderRight: '2px solid var(--synaptic-teal)',
                  boxShadow: 'var(--glow-teal-sm)'
                } : {}}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric, idx) => (
            <tr key={metric.key} className="border-b border-border hover:bg-surface-hover">
              <td className="py-3 px-6 text-sm font-medium text-text-primary sticky left-0 bg-background">
                {metric.label}
              </td>
              {scenarios.map(({ id }) => {
                const value = outcomes.scenarios[id][metric.key as keyof typeof outcomes.scenarios.conservative];
                const isSelected = selectedScenario === id;

                return (
                  <td
                    key={id}
                    className={`text-right py-3 px-6 text-sm font-semibold transition-all ${
                      isSelected ? 'text-accent-blue' : 'text-text-primary'
                    }`}
                    style={isSelected ? {
                      background: 'var(--synaptic-teal-subtle)',
                      borderLeft: '2px solid var(--synaptic-teal)',
                      borderRight: '2px solid var(--synaptic-teal)',
                    } : {}}
                  >
                    {typeof value === 'number' ? (
                      <AnimatedNumber value={value} formatter={metric.formatter as (v: number) => string} />
                    ) : (
                      metric.formatter(value)
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
