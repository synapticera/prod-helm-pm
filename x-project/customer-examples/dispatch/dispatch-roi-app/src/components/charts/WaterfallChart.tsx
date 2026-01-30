'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { formatCurrency } from '@/lib/utils/formatters';

interface WaterfallChartProps {
  baseline: number;
  savings: number;
  investment: number;
  result: number;
}

export default function WaterfallChart({ baseline, savings, investment, result }: WaterfallChartProps) {
  const data = [
    {
      name: 'Current EBITDA',
      value: baseline,
      start: 0,
      color: '#8BA4C4',
    },
    {
      name: 'Savings',
      value: savings,
      start: baseline,
      color: '#10B981',
    },
    {
      name: 'Investment',
      value: Math.abs(investment),
      start: baseline + savings - Math.abs(investment),
      color: '#EF4444',
      isNegative: true,
    },
    {
      name: 'New EBITDA',
      value: result,
      start: 0,
      color: '#00D4FF',
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 40, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 164, 196, 0.1)" />
        <XAxis
          dataKey="name"
          tick={{ fill: '#8BA4C4', fontSize: 12 }}
          axisLine={{ stroke: 'rgba(139, 164, 196, 0.2)' }}
        />
        <YAxis
          tick={{ fill: '#8BA4C4', fontSize: 12 }}
          tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
          axisLine={{ stroke: 'rgba(139, 164, 196, 0.2)' }}
        />
        <Tooltip
          contentStyle={{
            background: 'rgba(19, 34, 56, 0.95)',
            border: '1px solid rgba(139, 164, 196, 0.3)',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)',
          }}
          labelStyle={{ color: '#F0F6FC' }}
          formatter={(value) => [formatCurrency(Number(value)), '']}
        />

        {/* Transparent spacer bars to position actual bars */}
        <Bar dataKey="start" stackId="a" fill="transparent" />

        {/* Actual value bars */}
        <Bar dataKey="value" stackId="a" radius={[8, 8, 0, 0]}>
          <LabelList
            dataKey="value"
            position="top"
            formatter={(value: any) => formatCurrency(Number(value))}
            style={{ fill: '#F0F6FC', fontSize: 14, fontWeight: 'bold' }}
          />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
