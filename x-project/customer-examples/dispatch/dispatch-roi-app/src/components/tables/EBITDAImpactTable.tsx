'use client';

import { getProjectedOutcomes, getEnterpriseValueImpact } from '@/lib/data';
import { formatCurrency, formatPercent, formatMultiple } from '@/lib/utils/formatters';
import type { Scenario } from '@/lib/types';

const scenarios: { id: Scenario; label: string; color: string }[] = [
  { id: 'conservative', label: 'Incremental', color: '#00D4FF' },
  { id: 'moderate', label: 'Moderate', color: '#10B981' },
  { id: 'transformed', label: 'Aggressive', color: '#FB4100' },
];

export default function EBITDAImpactTable() {
  const outcomes = getProjectedOutcomes();
  const evImpact = getEnterpriseValueImpact();

  const metrics = [
    { key: 'investment', label: 'AI Investment', formatter: formatCurrency, section: 'roi', baselineKey: null },
    { key: 'netBenefit', label: 'Net Annual Benefit', formatter: formatCurrency, section: 'roi', baselineKey: null },
    { key: 'roiMultiple', label: 'ROI Multiple', formatter: formatMultiple, section: 'roi', baselineKey: null },

    { key: 'newEbitda', label: 'EBITDA', formatter: formatCurrency, section: 'ebitda', highlight: true, baselineKey: 'ebitda' },
    { key: 'newEbitdaMargin', label: 'EBITDA Margin', formatter: formatPercent, section: 'ebitda', baselineKey: 'ebitdaMargin' },
    { key: 'newRuleOf40', label: 'Rule of 40', formatter: formatPercent, section: 'ebitda', baselineKey: 'ruleOf40' },
  ];

  return (
    <div className="space-y-6">
      {/* Financial Metrics Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-border-strong">
              <th className="text-left py-2 px-4 font-semibold text-text-secondary">Metric</th>
              <th className="text-right py-2 px-4 font-semibold text-text-secondary">Current</th>
              <th className="text-right py-2 px-4 font-semibold text-accent-blue">Incremental</th>
              <th className="text-right py-2 px-4 font-semibold text-accent-green">Moderate</th>
              <th className="text-right py-2 px-4 font-semibold" style={{ color: 'var(--synaptic-orange)' }}>Aggressive</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => {
              const baseline = metric.baselineKey
                ? outcomes.scenarios.baseline[metric.baselineKey as keyof typeof outcomes.scenarios.baseline]
                : null;

              return (
                <tr
                  key={metric.key}
                  className={`border-b border-border ${metric.highlight ? 'bg-surface/30' : ''}`}
                >
                  <td className="py-2 px-4 font-medium text-text-primary">{metric.label}</td>
                  <td className="text-right py-2 px-4 text-text-secondary font-semibold">
                    {baseline ? metric.formatter(baseline as any) : '-'}
                  </td>
                  {scenarios.map(({ id }) => {
                    const value = outcomes.scenarios[id][metric.key as keyof typeof outcomes.scenarios.conservative];
                    return (
                      <td
                        key={id}
                        className="text-right py-2 px-4 font-semibold text-text-primary"
                      >
                        {metric.formatter(value as any)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Enterprise Value Scenarios */}
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-3">Enterprise Value Scenarios</h3>

        {[8, 10, 12].map((multiple) => (
          <div key={multiple} className="mb-4">
            <div className="text-xs text-text-tertiary mb-2">EV @ {multiple}x EBITDA</div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-1 px-4 text-xs font-medium text-text-tertiary">Metric</th>
                    <th className="text-right py-1 px-4 text-xs font-medium text-text-tertiary">Current</th>
                    <th className="text-right py-1 px-4 text-xs font-medium text-accent-blue">Incremental</th>
                    <th className="text-right py-1 px-4 text-xs font-medium text-accent-green">Moderate</th>
                    <th className="text-right py-1 px-4 text-xs font-medium" style={{ color: 'var(--synaptic-orange)' }}>Aggressive</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-1 px-4 text-text-secondary">Enterprise Value</td>
                    <td className="text-right py-1 px-4 text-text-secondary font-semibold">
                      {formatCurrency(evImpact.baselineEbitda * multiple)}
                    </td>
                    {scenarios.map(({ id }) => {
                      const evKey = `ev${multiple}x` as 'ev8x' | 'ev10x' | 'ev12x';
                      const value = evImpact.evByScenario[id][evKey];
                      return (
                        <td key={id} className="text-right py-1 px-4 font-semibold text-text-primary">
                          {formatCurrency(value)}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="py-1 px-4 text-text-secondary">EV Gain</td>
                    <td className="text-right py-1 px-4 text-text-secondary">-</td>
                    {scenarios.map(({ id, color }) => {
                      const evKey = `ev${multiple}x` as 'ev8x' | 'ev10x' | 'ev12x';
                      const newEV = evImpact.evByScenario[id][evKey];
                      const baselineEV = evImpact.baselineEbitda * multiple;
                      const gain = newEV - baselineEV;
                      return (
                        <td key={id} className="text-right py-1 px-4 font-bold" style={{ color }}>
                          {formatCurrency(gain)}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
