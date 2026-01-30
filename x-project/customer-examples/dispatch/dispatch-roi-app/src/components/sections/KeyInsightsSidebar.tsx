'use client';

import { getProjectedOutcomes } from '@/lib/data';
import { formatCurrency, formatPercent, formatMultiple } from '@/lib/utils/formatters';

export default function KeyInsightsSidebar() {
  const outcomes = getProjectedOutcomes();
  const aggressive = outcomes.scenarios.transformed;

  return (
    <div className="space-y-4">
      {/* Total Opportunity */}
      <div className="bg-surface border border-border rounded-xl p-4 backdrop-blur-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
        <div className="text-xs text-text-tertiary mb-2">Total Savings Potential</div>
        <div className="text-2xl font-bold" style={{ color: 'var(--synaptic-orange)' }}>
          {formatCurrency(aggressive.totalSavings)}
        </div>
        <div className="text-xs text-text-secondary mt-1">Aggressive scenario</div>
      </div>

      {/* Best ROI */}
      <div className="bg-surface border border-border rounded-xl p-4 backdrop-blur-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
        <div className="text-xs text-text-tertiary mb-2">Best ROI</div>
        <div className="text-2xl font-bold text-accent-blue">
          {formatMultiple(outcomes.scenarios.conservative.roiMultiple)}
        </div>
        <div className="text-xs text-text-secondary mt-1">Conservative: {outcomes.scenarios.conservative.paybackPeriod}</div>
      </div>

      {/* Rule of 40 Target */}
      <div className="bg-surface border border-border rounded-xl p-4 backdrop-blur-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
        <div className="text-xs text-text-tertiary mb-2">Reaches Rule of 40</div>
        <div className="text-2xl font-bold text-accent-green">
          {formatPercent(outcomes.scenarios.moderate.newRuleOf40)}
        </div>
        <div className="text-xs text-text-secondary mt-1">Moderate scenario</div>
      </div>

      {/* FTE Impact */}
      <div className="bg-surface border border-border rounded-xl p-4 backdrop-blur-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
        <div className="text-xs text-text-tertiary mb-2">Capacity Freed</div>
        <div className="text-2xl font-bold text-text-primary">
          {aggressive.fteEquivalent} FTEs
        </div>
        <div className="text-xs text-text-secondary mt-1">Aggressive scenario</div>
      </div>
    </div>
  );
}
