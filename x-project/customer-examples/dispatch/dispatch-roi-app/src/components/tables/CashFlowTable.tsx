'use client';

import { getCompanyData } from '@/lib/data';
import { formatCurrency, formatPercent, formatAccounting } from '@/lib/utils/formatters';

export default function CashFlowTable() {
  const company = getCompanyData();
  const baseRevenue = company.metrics.totalRevenue; // $25,686,093

  // Key assumptions from spreadsheet
  const growthRate = 0.0; // 0% - flat revenue (harvest mode)
  const discountRate = 0.12; // 12% WACC
  const terminalGrowthRate = 0.0; // 0% terminal growth
  const taxRate = 0.25; // 25%
  const dna = 1500000; // $1.5M D&A
  const capex = 500000; // $500K CapEx

  // 7-year cash flow projection - Aggressive scenario
  const projections = [
    { year: 0, revenue: 25686093, revenueGrowth: null, ebitdaMargin: 0.157, ebitda: 4032717, lessDA: -1500000, ebit: 2532717, taxes: -633179, plusDA: 1500000, capex: -500000, investment: -1900779, fcf: 998759 },
    { year: 1, revenue: 25686093, revenueGrowth: 0.0, ebitdaMargin: 0.51, ebitda: 13099867, lessDA: -1500000, ebit: 11599867, taxes: -2899967, plusDA: 1500000, capex: -500000, investment: 0, fcf: 9699900 },
    { year: 2, revenue: 25686093, revenueGrowth: 0.0, ebitdaMargin: 0.51, ebitda: 13099867, lessDA: -1500000, ebit: 11599867, taxes: -2899967, plusDA: 1500000, capex: -500000, investment: 0, fcf: 9699900 },
    { year: 3, revenue: 25686093, revenueGrowth: 0.0, ebitdaMargin: 0.51, ebitda: 13099867, lessDA: -1500000, ebit: 11599867, taxes: -2899967, plusDA: 1500000, capex: -500000, investment: 0, fcf: 9699900 },
    { year: 4, revenue: 25686093, revenueGrowth: 0.0, ebitdaMargin: 0.51, ebitda: 13099867, lessDA: -1500000, ebit: 11599867, taxes: -2899967, plusDA: 1500000, capex: -500000, investment: 0, fcf: 9699900 },
    { year: 5, revenue: 25686093, revenueGrowth: 0.0, ebitdaMargin: 0.51, ebitda: 13099867, lessDA: -1500000, ebit: 11599867, taxes: -2899967, plusDA: 1500000, capex: -500000, investment: 0, fcf: 9699900 },
    { year: 6, revenue: 25686093, revenueGrowth: 0.0, ebitdaMargin: 0.51, ebitda: 13099867, lessDA: -1500000, ebit: 11599867, taxes: -2899967, plusDA: 1500000, capex: -500000, investment: 0, fcf: 9699900 },
    { year: 7, revenue: 25686093, revenueGrowth: 0.0, ebitdaMargin: 0.51, ebitda: 13099867, lessDA: -1500000, ebit: 11599867, taxes: -2899967, plusDA: 1500000, capex: -500000, investment: 0, fcf: 9699900 },
  ];

  const terminalValue = 80832500;

  // DCF Valuation data
  const discountFactors = [1.00, 0.89, 0.80, 0.71, 0.64, 0.57, 0.51, 0.45];
  const presentValues = [998759, 8660625, 7732701, 6904197, 6164462, 5504073, 4914351, 4387813];
  const pvTerminal = 36548438;
  const pvCashFlows = 45266981;
  const enterpriseValueDCF = 81815419;

  // Cumulative cash flow
  const cumulativeCashFlow = [998759, 10698659, 20398559, 30098459, 39798359, 49498259, 59198159, 68898059];

  return (
    <div className="space-y-6">
      {/* Cash Flow Projection Table */}
      <div className="bg-surface border border-border rounded-xl p-4 backdrop-blur-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
        <h3 className="text-sm font-semibold text-text-primary mb-3">7-Year Cash Flow Projection - Aggressive Scenario</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="border-b-2 border-border-strong">
                <th className="text-left py-2 px-3 font-semibold text-text-secondary">Year</th>
                {projections.map((p) => (
                  <th key={p.year} className="text-right py-2 px-3 font-semibold text-text-secondary">
                    {p.year}
                  </th>
                ))}
                <th className="text-right py-2 px-3 font-semibold text-text-secondary">Terminal</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 px-3 font-medium text-text-primary">Revenue</td>
                {projections.map((p) => (
                  <td key={p.year} className="text-right py-2 px-3 text-text-primary">
                    {formatCurrency(p.revenue)}
                  </td>
                ))}
                <td className="text-right py-2 px-3 text-text-primary">{formatCurrency(projections[7].revenue)}</td>
              </tr>

              <tr className="border-b border-border">
                <td className="py-2 px-3 text-text-secondary">Revenue Growth</td>
                {projections.map((p) => (
                  <td key={p.year} className="text-right py-2 px-3 text-text-secondary">
                    {p.revenueGrowth !== null ? formatPercent(p.revenueGrowth) : '-'}
                  </td>
                ))}
                <td className="text-right py-2 px-3 text-text-secondary">{formatPercent(0)}</td>
              </tr>

              <tr className="border-b border-border">
                <td className="py-2 px-3 text-text-secondary">EBITDA Margin</td>
                {projections.map((p) => (
                  <td key={p.year} className="text-right py-2 px-3 text-text-secondary">
                    {formatPercent(p.ebitdaMargin)}
                  </td>
                ))}
                <td className="text-right py-2 px-3 text-text-secondary">{formatPercent(0.51)}</td>
              </tr>

              <tr className="border-b border-border bg-surface/20">
                <td className="py-2 px-3 font-medium text-text-primary">EBITDA</td>
                {projections.map((p) => (
                  <td key={p.year} className="text-right py-2 px-3 font-semibold text-accent-green">
                    {formatCurrency(p.ebitda)}
                  </td>
                ))}
                <td className="text-right py-2 px-3 font-semibold text-accent-green">{formatCurrency(projections[7].ebitda)}</td>
              </tr>

              <tr className="border-b border-border">
                <td className="py-2 px-3 text-text-secondary pl-4">Less: D&A</td>
                {projections.map((p) => {
                  const formatted = formatAccounting(p.lessDA);
                  return (
                    <td key={p.year} className={`text-right py-2 px-3 ${formatted.isNegative ? 'text-accent-red' : 'text-text-secondary'}`}>
                      {formatted.text}
                    </td>
                  );
                })}
                <td className="text-right py-2 px-3 text-accent-red">{formatAccounting(-1500000).text}</td>
              </tr>

              <tr className="border-b border-border">
                <td className="py-2 px-3 font-medium text-text-primary">EBIT</td>
                {projections.map((p) => (
                  <td key={p.year} className="text-right py-2 px-3 text-text-primary">
                    {formatCurrency(p.ebit)}
                  </td>
                ))}
                <td className="text-right py-2 px-3 text-text-primary">{formatCurrency(projections[7].ebit)}</td>
              </tr>

              <tr className="border-b border-border">
                <td className="py-2 px-3 text-text-secondary pl-4">Less: Taxes (25%)</td>
                {projections.map((p) => {
                  const formatted = formatAccounting(p.taxes);
                  return (
                    <td key={p.year} className={`text-right py-2 px-3 ${formatted.isNegative ? 'text-accent-red' : 'text-text-secondary'}`}>
                      {formatted.text}
                    </td>
                  );
                })}
                <td className="text-right py-2 px-3 text-accent-red">{formatAccounting(projections[7].taxes).text}</td>
              </tr>

              <tr className="border-b border-border">
                <td className="py-2 px-3 text-text-secondary pl-4">Plus: D&A</td>
                {projections.map((p) => (
                  <td key={p.year} className="text-right py-2 px-3 text-text-secondary">
                    {formatCurrency(p.plusDA)}
                  </td>
                ))}
                <td className="text-right py-2 px-3 text-text-secondary">{formatCurrency(1500000)}</td>
              </tr>

              <tr className="border-b border-border">
                <td className="py-2 px-3 text-text-secondary pl-4">Less: CapEx</td>
                {projections.map((p) => {
                  const formatted = formatAccounting(p.capex);
                  return (
                    <td key={p.year} className={`text-right py-2 px-3 ${formatted.isNegative ? 'text-accent-red' : 'text-text-secondary'}`}>
                      {formatted.text}
                    </td>
                  );
                })}
                <td className="text-right py-2 px-3 text-accent-red">{formatAccounting(-500000).text}</td>
              </tr>

              <tr className="border-b border-border">
                <td className="py-2 px-3 text-accent-red pl-4">AI Investment</td>
                {projections.map((p) => {
                  if (p.investment === 0) {
                    return <td key={p.year} className="text-right py-2 px-3 text-text-tertiary">-</td>;
                  }
                  const formatted = formatAccounting(p.investment);
                  return (
                    <td key={p.year} className={`text-right py-2 px-3 ${formatted.isNegative ? 'text-accent-red' : 'text-text-secondary'}`}>
                      {formatted.text}
                    </td>
                  );
                })}
                <td className="text-right py-2 px-3 text-text-tertiary">-</td>
              </tr>

              <tr className="border-t-2 border-border-strong bg-surface/30 font-bold">
                <td className="py-2 px-3 text-accent-green">Free Cash Flow</td>
                {projections.map((p) => (
                  <td key={p.year} className="text-right py-2 px-3 text-accent-green">
                    {formatCurrency(p.fcf)}
                  </td>
                ))}
                <td className="text-right py-2 px-3 font-bold" style={{ color: 'var(--synaptic-orange)' }}>
                  {formatCurrency(terminalValue)}
                </td>
              </tr>

              <tr className="border-b border-border bg-surface/10">
                <td className="py-2 px-3 font-medium text-text-primary">Cumulative Cash Flow</td>
                {cumulativeCashFlow.map((cf, idx) => (
                  <td key={idx} className="text-right py-2 px-3 text-text-primary">
                    {formatCurrency(cf)}
                  </td>
                ))}
                <td className="text-right py-2 px-3 text-text-tertiary">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Assumptions and DCF Valuation side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Key Assumptions */}
        <div className="bg-surface border border-border rounded-xl p-3 backdrop-blur-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
          <h3 className="text-sm font-semibold text-text-primary mb-2">Key Assumptions</h3>
          <div className="grid grid-cols-3 gap-x-4 gap-y-2 text-xs">
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
              <div className="text-text-tertiary">Terminal Growth Rate</div>
              <div className="font-semibold text-text-primary">{formatPercent(terminalGrowthRate)}</div>
            </div>
            <div>
              <div className="text-text-tertiary">Projection Period</div>
              <div className="font-semibold text-text-primary">7 years</div>
            </div>
            <div>
              <div className="text-text-tertiary">Tax Rate</div>
              <div className="font-semibold text-text-primary">{formatPercent(taxRate)}</div>
            </div>
            <div>
              <div className="text-text-tertiary">D&A (non-cash)</div>
              <div className="font-semibold text-text-primary">{formatCurrency(dna)}</div>
            </div>
            <div>
              <div className="text-text-tertiary">CapEx (maintenance)</div>
              <div className="font-semibold text-text-primary">{formatCurrency(capex)}</div>
            </div>
          </div>
        </div>

        {/* DCF Valuation */}
        <div className="bg-surface border border-border rounded-xl p-3 backdrop-blur-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
          <h3 className="text-sm font-semibold text-text-primary mb-2">DCF Valuation</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border-b-2 border-border-strong">
                  <th className="text-left py-2 px-2 font-semibold text-text-secondary"></th>
                  {projections.map((p) => (
                    <th key={p.year} className="text-right py-2 px-1 font-semibold text-text-secondary text-[10px]">
                      {p.year}
                    </th>
                  ))}
                  <th className="text-right py-2 px-1 font-semibold text-text-secondary text-[10px]">Term</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2 px-2 text-text-secondary">Discount Factor</td>
                  {discountFactors.map((df, idx) => (
                    <td key={idx} className="text-right py-2 px-1 text-text-secondary text-[10px]">
                      {df.toFixed(2)}
                    </td>
                  ))}
                  <td className="text-right py-2 px-1 text-text-secondary text-[10px]">0.45</td>
                </tr>

                <tr className="border-b border-border bg-surface/20">
                  <td className="py-2 px-2 font-semibold text-accent-green">PV of FCF</td>
                  {presentValues.map((pv, idx) => (
                    <td key={idx} className="text-right py-2 px-1 font-semibold text-accent-green text-[10px]">
                      ${(pv / 1000000).toFixed(1)}M
                    </td>
                  ))}
                  <td className="text-right py-2 px-1 font-semibold text-[10px]" style={{ color: 'var(--synaptic-orange)' }}>
                    ${(pvTerminal / 1000000).toFixed(1)}M
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Valuation Summary and Key Insights side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Valuation Summary */}
        <div className="bg-surface border border-border rounded-xl p-4 backdrop-blur-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
          <h3 className="text-sm font-semibold text-text-primary mb-3">Valuation Summary</h3>
          <table className="w-full text-xs">
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 text-text-secondary">PV of 7-Year Cash Flows</td>
                <td className="py-2 text-right font-semibold text-text-primary">{formatCurrency(pvCashFlows)}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 text-text-secondary">PV of Terminal Value</td>
                <td className="py-2 text-right font-semibold text-text-primary">{formatCurrency(pvTerminal)}</td>
              </tr>
              <tr className="bg-surface/30">
                <td className="py-2 font-semibold text-accent-blue">Enterprise Value (DCF)</td>
                <td className="py-2 text-right font-bold text-accent-blue">{formatCurrency(enterpriseValueDCF)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Key Insights */}
        <div className="bg-surface border border-border rounded-xl p-4 backdrop-blur-xl" style={{ boxShadow: 'var(--shadow-card)' }}>
          <h3 className="text-sm font-semibold text-text-primary mb-3">Key Insights</h3>
          <ol className="list-decimal list-inside space-y-2 text-xs text-text-secondary">
            <li>7-Year Cumulative Cash: <span className="font-semibold text-text-primary">$69M</span> (undiscounted)</li>
            <li>DCF Value: <span className="font-semibold text-text-primary">$82M</span> at 12% discount rate</li>
            <li>Multiples imply premium: 8x = +28%, 10x = +60%, 12x = +92% vs DCF</li>
            <li>AI Investment (<span className="text-accent-red">$1.9M</span>) paid back in Year 1 from increased cash flow</li>
            <li>With flat revenue, Aggressive AI yields <span className="font-semibold text-accent-green">~$9.7M</span> annual FCF</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
