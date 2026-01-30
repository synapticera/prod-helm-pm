'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { getDepartments, getAIScenarios } from '@/lib/data';
import { calculateDepartmentSavings } from '@/lib/utils/calculations';
import { getDepartmentColor } from '@/lib/utils/colors';
import type { Scenario } from '@/lib/types';

const scenarios: { id: Scenario; label: string }[] = [
  { id: 'conservative', label: 'Incremental' },
  { id: 'moderate', label: 'Moderate' },
  { id: 'transformed', label: 'Aggressive' },
];

export default function SavingsPercentageChart() {
  const departments = getDepartments().filter(d => d.aiOpportunity);
  const aiScenarios = getAIScenarios();

  // Calculate 100% stacked data
  const data = scenarios.map(({ id, label }) => {
    const row: any = { scenario: label };
    let total = 0;

    // Calculate total savings for this scenario
    departments.forEach(dept => {
      const savings = calculateDepartmentSavings(dept, id, aiScenarios);
      total += savings;
    });

    // Calculate percentage for each department
    departments.forEach(dept => {
      const savings = calculateDepartmentSavings(dept, id, aiScenarios);
      row[dept.id] = total > 0 ? (savings / total) * 100 : 0;
    });

    return row;
  });

  // Calculate label positions for Aggressive scenario (rightmost column)
  const aggressiveData = data[2];
  const reversedDepts = [...departments].reverse();
  // Calibrated chart plotting area based on Y-axis tick positions
  // 100% is at ~y=18, 0% is at ~y=255 (adjusted to center labels better)
  const chartTop = 18;
  const chartHeight = 237; // Adjusted for better vertical centering
  const labels: Array<{ yPixels: number; text: string }> = [];

  if (aggressiveData) {
    let cumulative = 0;

    reversedDepts.forEach(dept => {
      const value = aggressiveData[dept.id] || 0;
      if (value > 2) {
        const bandCenter = cumulative + value / 2; // Center in percentage space (0-100)
        // Convert: 0% at bottom (y=chartTop+chartHeight), 100% at top (y=chartTop)
        const yPixels = chartTop + chartHeight * (1 - bandCenter / 100);
        labels.push({
          yPixels,
          text: `${value.toFixed(0)}%`
        });
      }
      cumulative += value;
    });
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 40, left: 10, bottom: 10 }}>
          <defs>
            {departments.map(dept => (
              <linearGradient key={dept.id} id={`pct-${dept.id}`} x1="0" y1="0" x2="0" y2="1">
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
            tickFormatter={(value) => `${value}%`}
            axisLine={{ stroke: 'rgba(139, 164, 196, 0.2)' }}
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
          />

          {/* Render areas - 100% stacked */}
          {[...departments].reverse().map((dept) => (
            <Area
              key={dept.id}
              type="monotone"
              dataKey={dept.id}
              stackId="1"
              stroke={getDepartmentColor(dept.id)}
              fill={`url(#pct-${dept.id})`}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>

      {/* Overlay labels using absolute positioning */}
      {labels.map((label, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            right: '46px',
            top: `${label.yPixels}px`,
            transform: 'translateY(-50%)',
            color: '#F0F6FC',
            fontSize: '10px',
            fontWeight: 600,
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          {label.text}
        </div>
      ))}
    </div>
  );
}
