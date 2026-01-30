'use client';

import { getDepartments, getAIScenarios } from '@/lib/data';
import { formatCurrency, formatPercent } from '@/lib/utils/formatters';
import { calculateDepartmentSavings } from '@/lib/utils/calculations';
import { getDepartmentColor } from '@/lib/utils/colors';

export default function CoreDataTable() {
  const departments = getDepartments().filter(d => d.aiOpportunity);
  const aiScenarios = getAIScenarios();
  const totalCurrentSpend = departments.reduce((sum, d) => sum + d.annualSpend, 0);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          {/* Main header row */}
          <tr className="border-b border-border">
            <th className="text-left py-2 px-4 font-semibold text-text-secondary">Department</th>
            <th className="text-center py-2 px-4 font-semibold text-text-secondary" colSpan={2}>Current Spend</th>
            <th className="text-center py-2 px-4 font-semibold text-text-secondary">vs Market Median</th>
            <th className="text-center py-2 px-4 font-semibold text-text-secondary border-l-2 border-border-strong" colSpan={6}>
              AI Cost Savings Program
            </th>
          </tr>
          {/* Sub-header row */}
          <tr className="border-b-2 border-border-strong text-xs">
            <th></th>
            <th className="text-right py-1 text-text-tertiary" style={{ paddingRight: '4px' }}>Amount</th>
            <th className="text-right py-1 text-text-tertiary" style={{ paddingLeft: '4px', paddingRight: '16px' }}>% of Total</th>
            <th></th>
            <th className="text-right py-1 px-2 text-text-tertiary border-l-2 border-border-strong">Savings $</th>
            <th className="text-right py-1 px-1 text-text-tertiary">Savings %</th>
            <th className="text-right py-1 px-2 text-text-tertiary pl-4">Savings $</th>
            <th className="text-right py-1 px-1 text-text-tertiary">Savings %</th>
            <th className="text-right py-1 px-2 text-text-tertiary pl-4">Savings $</th>
            <th className="text-right py-1 px-1 text-text-tertiary">Savings %</th>
          </tr>
          <tr className="border-b border-border">
            <th></th>
            <th></th>
            <th></th>
            <th className="py-2 px-4">
              <div className="flex items-center justify-center gap-2">
                <span className="w-12"></span>
                <div className="relative w-20 flex justify-center">
                  <span className="text-text-tertiary text-[10px] font-normal">median</span>
                </div>
              </div>
            </th>
            <th className="px-4 font-semibold text-accent-blue border-l-2 border-border-strong uppercase text-sm" colSpan={2} style={{ textAlign: 'center', paddingLeft: '35px', paddingTop: '10px', paddingBottom: '10px' }}>Incremental</th>
            <th className="px-4 font-semibold text-accent-green uppercase text-sm" colSpan={2} style={{ textAlign: 'center', paddingLeft: '45px', paddingTop: '10px', paddingBottom: '10px' }}>Moderate</th>
            <th className="px-4 font-semibold uppercase text-sm" colSpan={2} style={{ color: 'var(--synaptic-orange)', textAlign: 'center', paddingLeft: '45px', paddingTop: '10px', paddingBottom: '10px' }}>Aggressive</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => {
            const deptColor = getDepartmentColor(dept.id);
            const pctOfTotal = (dept.annualSpend / totalCurrentSpend);

            const conservativeSavings = calculateDepartmentSavings(dept, 'conservative', aiScenarios);
            const moderateSavings = calculateDepartmentSavings(dept, 'moderate', aiScenarios);
            const aggressiveSavings = calculateDepartmentSavings(dept, 'transformed', aiScenarios);

            const conservativePct = aiScenarios.departmentImpact[dept.id]?.conservative || 0;
            const moderatePct = aiScenarios.departmentImpact[dept.id]?.moderate || 0;
            const aggressivePct = aiScenarios.departmentImpact[dept.id]?.transformed || 0;

            const currentPct = dept.percentOfRevenue;
            const medianPct = dept.benchmark.median;
            const delta = currentPct - medianPct;
            const isAboveMedian = delta > 0;

            const maxDelta = 0.10;
            const position = 50 + (delta / maxDelta) * 50;
            const cappedPosition = Math.max(0, Math.min(100, position));

            return (
              <tr
                key={dept.id}
                className="border-b border-border hover:bg-surface-hover/50 transition-colors"
                style={{ borderLeft: `3px solid ${deptColor}` }}
              >
                {/* Department Name */}
                <td className="py-2 px-4 font-medium text-text-primary">{dept.name}</td>

                {/* Current Spend - Amount */}
                <td className="text-right py-2 font-bold text-text-primary" style={{ paddingRight: '4px' }}>
                  {formatCurrency(dept.annualSpend)}
                </td>

                {/* Current Spend - % of Total */}
                <td className="text-right py-2 text-text-secondary" style={{ paddingLeft: '4px', paddingRight: '16px' }}>
                  {formatPercent(pctOfTotal)}
                </td>

                {/* vs Median - DOT with percentage on left */}
                <td className="py-2 px-4">
                  <div className="flex items-center justify-center gap-2">
                    {/* Percentage label - left side */}
                    <span
                      className={`text-xs font-medium whitespace-nowrap w-12 text-left ${isAboveMedian ? 'text-accent-red' : 'text-accent-green'}`}
                    >
                      {isAboveMedian ? '+' : ''}{formatPercent(delta)}
                    </span>
                    {/* Graphic */}
                    <div className="relative h-6 w-20 bg-surface-elevated rounded flex items-center">
                      {/* Median line (center) - lighter gray */}
                      <div
                        className="absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2"
                        style={{ backgroundColor: 'rgba(139, 164, 196, 0.3)', zIndex: 0 }}
                      />
                      {/* Current position dot - half width (w-1.5 instead of w-3) */}
                      <div
                        className="absolute top-1/2 w-1.5 h-1.5 rounded-full"
                        style={{
                          left: `${cappedPosition}%`,
                          transform: 'translate(-50%, -50%)',
                          background: isAboveMedian ? '#EF4444' : '#10B981',
                          boxShadow: `0 0 4px ${isAboveMedian ? '#EF444480' : '#10B98180'}`,
                          zIndex: 10
                        }}
                      />
                    </div>
                  </div>
                </td>

                {/* Incremental - Savings $ */}
                <td className="text-right py-2 pl-2 font-semibold text-accent-blue border-l-2 border-border-strong" style={{ paddingRight: '0px' }}>
                  {formatCurrency(conservativeSavings)}
                </td>
                {/* Incremental - Savings % */}
                <td className="text-right py-2 pr-4 text-text-tertiary" style={{ paddingLeft: '0px' }}>
                  {formatPercent(conservativePct)}
                </td>

                {/* Moderate - Savings $ */}
                <td className="text-right py-2 pl-2 font-semibold text-accent-green" style={{ paddingRight: '0px' }}>
                  {formatCurrency(moderateSavings)}
                </td>
                {/* Moderate - Savings % */}
                <td className="text-right py-2 pr-4 text-text-tertiary" style={{ paddingLeft: '0px' }}>
                  {formatPercent(moderatePct)}
                </td>

                {/* Aggressive - Savings $ */}
                <td className="text-right py-2 pl-2 font-semibold" style={{ color: 'var(--synaptic-orange)', paddingRight: '0px' }}>
                  {formatCurrency(aggressiveSavings)}
                </td>
                {/* Aggressive - Savings % */}
                <td className="text-right py-2 pr-2 text-text-tertiary" style={{ paddingLeft: '0px' }}>
                  {formatPercent(aggressivePct)}
                </td>
              </tr>
            );
          })}

          {/* Totals Row */}
          {(() => {
            const totalConservativeSavings = departments.reduce((sum, d) =>
              sum + calculateDepartmentSavings(d, 'conservative', aiScenarios), 0
            );
            const totalModerateSavings = departments.reduce((sum, d) =>
              sum + calculateDepartmentSavings(d, 'moderate', aiScenarios), 0
            );
            const totalAggressiveSavings = departments.reduce((sum, d) =>
              sum + calculateDepartmentSavings(d, 'transformed', aiScenarios), 0
            );

            // Calculate overall deviation from median
            const totalCurrentPct = departments.reduce((sum, d) => sum + d.percentOfRevenue, 0);
            const totalMedianPct = departments.reduce((sum, d) => sum + d.benchmark.median, 0);
            const totalDelta = totalCurrentPct - totalMedianPct;
            const isAboveMedian = totalDelta > 0;

            return (
              <tr className="border-t-2 border-border-strong bg-surface/50 font-bold">
                <td className="py-3 px-4 text-text-primary">TOTAL</td>
                <td className="text-right py-3 text-text-primary" style={{ paddingRight: '4px' }}>
                  {formatCurrency(totalCurrentSpend)}
                </td>
                <td className="text-right py-3 text-text-secondary" style={{ paddingLeft: '4px', paddingRight: '16px' }}>100%</td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className={`text-xs font-bold whitespace-nowrap w-12 text-left ${isAboveMedian ? 'text-accent-red' : 'text-accent-green'}`}>
                      {isAboveMedian ? '+' : ''}{formatPercent(totalDelta)}
                    </span>
                    <div className="relative h-6 w-20 bg-surface-elevated rounded flex items-center">
                      {/* Median line (center) */}
                      <div
                        className="absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2"
                        style={{ backgroundColor: 'rgba(139, 164, 196, 0.3)', zIndex: 0 }}
                      />
                      {/* Current position dot */}
                      {(() => {
                        const maxDelta = 0.10;
                        const position = 50 + (totalDelta / maxDelta) * 50;
                        const cappedPosition = Math.max(0, Math.min(100, position));
                        return (
                          <div
                            className="absolute top-1/2 w-1.5 h-1.5 rounded-full"
                            style={{
                              left: `${cappedPosition}%`,
                              transform: 'translate(-50%, -50%)',
                              background: isAboveMedian ? '#EF4444' : '#10B981',
                              boxShadow: `0 0 4px ${isAboveMedian ? '#EF444480' : '#10B98180'}`,
                              zIndex: 10
                            }}
                          />
                        );
                      })()}
                    </div>
                  </div>
                </td>

                <td className="text-right py-3 pr-1 pl-2 text-accent-blue border-l-2 border-border-strong">
                  {formatCurrency(totalConservativeSavings)}
                </td>
                <td className="text-right py-3 pl-1 pr-4 text-accent-blue">
                  {formatPercent(totalConservativeSavings / totalCurrentSpend)}
                </td>

                <td className="text-right py-3 pr-1 pl-2 text-accent-green">
                  {formatCurrency(totalModerateSavings)}
                </td>
                <td className="text-right py-3 pl-1 pr-4 text-accent-green">
                  {formatPercent(totalModerateSavings / totalCurrentSpend)}
                </td>

                <td className="text-right py-3 pr-1 pl-2" style={{ color: 'var(--synaptic-orange)' }}>
                  {formatCurrency(totalAggressiveSavings)}
                </td>
                <td className="text-right py-3 pl-1 pr-2" style={{ color: 'var(--synaptic-orange)' }}>
                  {formatPercent(totalAggressiveSavings / totalCurrentSpend)}
                </td>
              </tr>
            );
          })()}
        </tbody>
      </table>

      {/* Legend */}
      <div className="mt-3 flex items-center gap-4 text-xs text-text-tertiary px-4">
        <span className="font-medium text-text-secondary">Benchmark:</span>
        <div className="flex items-center gap-1">
          <div className="w-0.5 h-3" style={{ backgroundColor: 'rgba(139, 164, 196, 0.3)' }} />
          <span>Median</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-green" />
          <span>Below (efficient)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-red" />
          <span>Above (opportunity)</span>
        </div>
      </div>
    </div>
  );
}
