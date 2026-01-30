'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getDepartments, getAIScenarios } from '@/lib/data';
import { calculateDepartmentSavings } from '@/lib/utils/calculations';
import { getDepartmentColor } from '@/lib/utils/colors';
import { formatCurrency } from '@/lib/utils/formatters';
import type { Scenario } from '@/lib/types';

const scenarios: { id: Scenario; label: string }[] = [
  { id: 'conservative', label: 'Incremental' },
  { id: 'moderate', label: 'Moderate' },
  { id: 'transformed', label: 'Aggressive' },
];

export default function SpendByDepartmentChart() {
  const departments = getDepartments().filter(d => d.aiOpportunity);
  const aiScenarios = getAIScenarios();

  const data = [
    { scenario: 'Current', ...departments.reduce((acc, dept) => ({
      ...acc, [dept.id]: dept.annualSpend / 1000000
    }), {}) },
    ...scenarios.map(({ id, label }) => {
      const row: any = { scenario: label };
      departments.forEach(dept => {
        const savings = calculateDepartmentSavings(dept, id, aiScenarios);
        row[dept.id] = (dept.annualSpend - savings) / 1000000;
      });
      return row;
    }),
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        <defs>
          {departments.map(dept => (
            <linearGradient key={dept.id} id={`spend-${dept.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={getDepartmentColor(dept.id)} stopOpacity={0.8} />
              <stop offset="95%" stopColor={getDepartmentColor(dept.id)} stopOpacity={0.3} />
            </linearGradient>
          ))}
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
        />
        <Tooltip
          contentStyle={{
            background: 'rgba(19, 34, 56, 0.95)',
            border: '1px solid rgba(139, 164, 196, 0.3)',
            borderRadius: '6px',
            padding: '8px',
            fontSize: '11px'
          }}
          labelStyle={{ color: '#F0F6FC', fontWeight: '600', fontSize: '11px' }}
          formatter={(value, name) => {
            const dept = departments.find(d => d.id === name);
            return [`$${(Number(value)).toFixed(1)}M`, dept?.name || String(name)];
          }}
        />
        {[...departments].reverse().map(dept => (
          <Area
            key={dept.id}
            type="monotone"
            dataKey={dept.id}
            stackId="1"
            stroke={getDepartmentColor(dept.id)}
            fill={`url(#spend-${dept.id})`}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
