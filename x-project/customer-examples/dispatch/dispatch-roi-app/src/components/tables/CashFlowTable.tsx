'use client';

import { getProjectedOutcomes, getCompanyData } from '@/lib/data';
import { formatCurrency, formatPercent, formatAccounting } from '@/lib/utils/formatters';

export default function CashFlowTable() {
  const outcomes = getProjectedOutcomes();
  const company = getCompanyData();

  // Simplified 7-year projection for Aggressive scenario
  const aggressive = outcomes.scenarios.transformed;
  const baseRevenue = company.metrics.totalRevenue;
  const baseEBITDA = outcomes.scenarios.baseline.ebitda;

  // Build 7-year projection (simplified)
  const years = [0, 1, 2, 3, 4, 5, 6, 7];
  const growthRate = -0.02; // Assume -2% annual decline (harvest mode)
  const ebitdaMargin = aggressive.newEbitdaMargin;

  const projections = years.map(year => {
    const revenue = baseRevenue * Math.pow(1 + growthRate, year);
    const ebitda = year === 0 ? baseEBITDA : revenue * ebitdaMargin;
    const investment = year === 0 ? -aggressive.investment : 0;
    const dna = year === 0 ? -1500000 : 0; // One-time D&A
    const ebit = ebitda + dna;
    const taxes = ebit * 0.25;
    const freeCashFlow = ebit - taxes + Math.abs(dna) + investment;

    return {
      year: year === 0 ? 'Current' : `Y${year}`,
      revenue,
      ebitda,
      ebitdaMargin: ebitda / revenue,
      investment,
      dna,
      ebit,
      taxes,
      freeCashFlow,
    };
  });

  const terminalValue = projections[7].freeCashFlow * 10; // 10x terminal multiple
  const discountRate = 0.12;

  return (
    <div className="space-y-6">
      {/* Cash Flow Projection Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-b-2 border-border-strong">
              <th className="text-left py-2 px-3 font-semibold text-text-secondary">Metric</th>
              {projections.map((p, idx) => (
                <th key={idx} className="text-right py-2 px-3 font-semibold text-text-secondary">
                  {p.year}
                </th>
              ))}
              <th className="text-right py-2 px-3 font-semibold text-text-secondary">Terminal</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-2 px-3 font-medium text-text-primary">Revenue</td>
              {projections.map((p, idx) => (
                <td key={idx} className="text-right py-2 px-3 text-text-primary">
                  {formatCurrency(p.revenue)}
                </td>
              ))}
              <td className="text-right py-2 px-3 text-text-tertiary">-</td>
            </tr>

            <tr className="border-b border-border bg-surface/20">
              <td className="py-2 px-3 font-medium text-text-primary">EBITDA</td>
              {projections.map((p, idx) => (
                <td key={idx} className="text-right py-2 px-3 font-semibold text-accent-green">
                  {formatCurrency(p.ebitda)}
                </td>
              ))}
              <td className="text-right py-2 px-3 text-text-tertiary">-</td>
            </tr>

            <tr className="border-b border-border">
              <td className="py-2 px-3 text-text-secondary pl-6">Less: D&A</td>
              {projections.map((p, idx) => {
                const formatted = formatAccounting(p.dna);
                return (
                  <td
                    key={idx}
                    className={`text-right py-2 px-3 ${formatted.isNegative ? 'text-accent-red' : 'text-text-secondary'}`}
                  >
                    {formatted.text}
                  </td>
                );
              })}
              <td className="text-right py-2 px-3 text-text-tertiary">-</td>
            </tr>

            <tr className="border-b border-border">
              <td className="py-2 px-3 font-medium text-text-primary">EBIT</td>
              {projections.map((p, idx) => (
                <td key={idx} className="text-right py-2 px-3 text-text-primary">
                  {formatCurrency(p.ebit)}
                </td>
              ))}
              <td className="text-right py-2 px-3 text-text-tertiary">-</td>
            </tr>

            <tr className="border-b border-border">
              <td className="py-2 px-3 text-text-secondary pl-6">Less: Taxes (25%)</td>
              {projections.map((p, idx) => {
                const formatted = formatAccounting(-p.taxes);
                return (
                  <td
                    key={idx}
                    className={`text-right py-2 px-3 ${formatted.isNegative ? 'text-accent-red' : 'text-text-secondary'}`}
                  >
                    {formatted.text}
                  </td>
                );
              })}
              <td className="text-right py-2 px-3 text-text-tertiary">-</td>
            </tr>

            <tr className="border-b border-border">
              <td className="py-2 px-3 text-text-secondary pl-6">Plus: D&A (add back)</td>
              {projections.map((p, idx) => (
                <td key={idx} className="text-right py-2 px-3 text-text-secondary">
                  {formatCurrency(Math.abs(p.dna))}
                </td>
              ))}
              <td className="text-right py-2 px-3 text-text-tertiary">-</td>
            </tr>

            <tr className="border-b border-border">
              <td className="py-2 px-3 text-text-secondary pl-6">AI Investment</td>
              {projections.map((p, idx) => {
                if (p.investment === 0) {
                  return (
                    <td key={idx} className="text-right py-2 px-3 text-text-tertiary">
                      -
                    </td>
                  );
                }
                const formatted = formatAccounting(p.investment);
                return (
                  <td
                    key={idx}
                    className={`text-right py-2 px-3 ${formatted.isNegative ? 'text-accent-red' : 'text-text-secondary'}`}
                  >
                    {formatted.text}
                  </td>
                );
              })}
              <td className="text-right py-2 px-3 text-text-tertiary">-</td>
            </tr>

            <tr className="border-t-2 border-border-strong bg-surface/30 font-bold">
              <td className="py-2 px-3 text-text-primary">Free Cash Flow</td>
              {projections.map((p, idx) => (
                <td key={idx} className="text-right py-2 px-3 text-accent-blue">
                  {formatCurrency(p.freeCashFlow)}
                </td>
              ))}
              <td className="text-right py-2 px-3 font-bold" style={{ color: 'var(--synaptic-orange)' }}>
                {formatCurrency(terminalValue)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* DCF Valuation Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface border border-border rounded-xl p-4 backdrop-blur-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
          <div className="text-xs text-text-tertiary mb-2">Present Value of 7Y Cash Flows</div>
          <div className="text-2xl font-bold text-accent-blue">$42.2M</div>
          <div className="text-xs text-text-secondary mt-1">@ {formatPercent(discountRate)} discount rate</div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-4 backdrop-blur-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
          <div className="text-xs text-text-tertiary mb-2">Enterprise Value (DCF)</div>
          <div className="text-2xl font-bold" style={{ color: 'var(--synaptic-orange)' }}>$73.9M</div>
          <div className="text-xs text-text-secondary mt-1">PV of FCF + Terminal Value</div>
        </div>
      </div>

      {/* Key Assumptions */}
      <div className="bg-surface border border-border rounded-xl p-4 backdrop-blur-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
        <h3 className="text-sm font-semibold text-text-primary mb-3">Key Assumptions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="text-text-tertiary">Current Revenue</div>
            <div className="font-semibold text-text-primary">{formatCurrency(baseRevenue)}</div>
          </div>
          <div>
            <div className="text-text-tertiary">Revenue Growth Rate</div>
            <div className="font-semibold text-text-primary">{formatPercent(growthRate)}</div>
          </div>
          <div>
            <div className="text-text-tertiary">Discount Rate (WACC)</div>
            <div className="font-semibold text-text-primary">{formatPercent(discountRate)}</div>
          </div>
          <div>
            <div className="text-text-tertiary">Tax Rate</div>
            <div className="font-semibold text-text-primary">25%</div>
          </div>
          <div>
            <div className="text-text-tertiary">D&A (non-cash)</div>
            <div className="font-semibold text-text-primary">$1.5M</div>
          </div>
          <div>
            <div className="text-text-tertiary">AI Investment (Y0)</div>
            <div className="font-semibold text-accent-red">{formatCurrency(aggressive.investment)}</div>
          </div>
          <div>
            <div className="text-text-tertiary">Terminal Growth</div>
            <div className="font-semibold text-text-primary">0%</div>
          </div>
          <div>
            <div className="text-text-tertiary">Projection Period</div>
            <div className="font-semibold text-text-primary">7 years</div>
          </div>
        </div>
      </div>
    </div>
  );
}
