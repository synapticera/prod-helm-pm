'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList } from 'recharts';
import { getProjectedOutcomes } from '@/lib/data';
import { formatCurrency } from '@/lib/utils/formatters';

export default function EBITDAProgressionChart() {
  const outcomes = getProjectedOutcomes();

  const data = [
    { scenario: 'Current', ebitda: outcomes.scenarios.baseline.ebitda / 1000000 },
    { scenario: 'Incremental', ebitda: outcomes.scenarios.conservative.newEbitda / 1000000 },
    { scenario: 'Moderate', ebitda: outcomes.scenarios.moderate.newEbitda / 1000000 },
    { scenario: 'Aggressive', ebitda: outcomes.scenarios.transformed.newEbitda / 1000000 },
  ];

  const maxValue = Math.max(...data.map(d => d.ebitda));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 10 }}>
        <defs>
          <linearGradient id="ebitda-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#00D4FF" stopOpacity={0.2} />
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
          tickFormatter={(v) => `$${v.toFixed(1)}M`}
          axisLine={{ stroke: 'rgba(139, 164, 196, 0.2)' }}
          domain={[0, maxValue]}
          ticks={[0, maxValue / 4, maxValue / 2, (maxValue * 3) / 4, maxValue]}
        />
        <Area
          type="monotone"
          dataKey="ebitda"
          stroke="#00D4FF"
          fill="url(#ebitda-gradient)"
          strokeWidth={2}
        >
          <LabelList
            dataKey="ebitda"
            position="top"
            formatter={(value) => formatCurrency(Number(value) * 1000000)}
            style={{ fill: '#F0F6FC', fontSize: 11, fontWeight: '600' }}
          />
        </Area>
      </AreaChart>
    </ResponsiveContainer>
  );
}
