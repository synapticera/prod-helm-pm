'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList } from 'recharts';
import { getEnterpriseValueImpact } from '@/lib/data';
import { formatCurrency } from '@/lib/utils/formatters';

export default function EVGrowthChart({ multiple = 10 }: { multiple?: 8 | 10 | 12 }) {
  const evImpact = getEnterpriseValueImpact();
  const evKey = `ev${multiple}x` as 'ev8x' | 'ev10x' | 'ev12x';

  const data = [
    { scenario: 'Current', ev: (evImpact.baselineEbitda * multiple) / 1000000 },
    { scenario: 'Incremental', ev: evImpact.evByScenario.conservative[evKey] / 1000000 },
    { scenario: 'Moderate', ev: evImpact.evByScenario.moderate[evKey] / 1000000 },
    { scenario: 'Aggressive', ev: evImpact.evByScenario.transformed[evKey] / 1000000 },
  ];

  const maxValue = Math.max(...data.map(d => d.ev));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 10 }}>
        <defs>
          <linearGradient id="ev-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FB4100" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#FB4100" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 164, 196, 0.1)" />
        <XAxis
          dataKey="scenario"
          tick={{ fill: '#8BA4C4', fontSize: 11 }}
          axisLine={{ stroke: 'rgba(139, 164, 196, 0.2)' }}
        />
        <YAxis
          tick={{ fill: '#8BA4C4', fontSize: 11 }}
          tickFormatter={(v) => `$${v.toFixed(0)}M`}
          axisLine={{ stroke: 'rgba(139, 164, 196, 0.2)' }}
          domain={[0, maxValue]}
          ticks={[0, maxValue / 4, maxValue / 2, (maxValue * 3) / 4, maxValue]}
        />
        <Area
          type="monotone"
          dataKey="ev"
          stroke="#FB4100"
          fill="url(#ev-gradient)"
          strokeWidth={2}
        >
          <LabelList
            dataKey="ev"
            position="top"
            formatter={(value) => formatCurrency(Number(value) * 1000000)}
            style={{ fill: '#F0F6FC', fontSize: 11, fontWeight: '600' }}
          />
        </Area>
      </AreaChart>
    </ResponsiveContainer>
  );
}
