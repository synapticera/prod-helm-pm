'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
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

export default function SavingsCompositionChart() {
  const departments = getDepartments().filter(d => d.aiOpportunity);
  const aiScenarios = getAIScenarios();

  // Build chart data
  const data = scenarios.map(({ id, label }) => {
    const row: any = { scenario: label };
    departments.forEach(dept => {
      const savings = calculateDepartmentSavings(dept, id, aiScenarios);
      row[dept.id] = savings / 1000000; // Convert to millions
    });
    return row;
  });

  // Calculate max value across all scenarios for Y-axis
  const maxValue = Math.max(...data.map(d =>
    departments.reduce((sum, dept) => sum + (d[dept.id] || 0), 0)
  ));

  // Calculate label positions for Aggressive scenario (rightmost column)
  const aggressiveData = data[2];
  const reversedDepts = [...departments].reverse();
  // Calibrated chart plotting area based on Y-axis tick positions
  // 100% (max) is at ~y=25, 0% (min) is at ~y=255
  const chartTop = 25;
  const chartHeight = 230; // From visual inspection of Y-axis ticks
  const labels: Array<{ yPixels: number; text: string }> = [];

  if (aggressiveData) {
    let cumulative = 0;
    const totalStack = reversedDepts.reduce((sum, d) => sum + (aggressiveData[d.id] || 0), 0);

    reversedDepts.forEach(dept => {
      const value = aggressiveData[dept.id] || 0;
      if (value > 0.2) {
        const bandCenter = cumulative + value / 2;
        // Convert from data value to pixel position
        // bandCenter/totalStack gives 0-1 where 0 is bottom, 1 is top
        // Invert for pixel coords where 0 is top
        const yPixels = chartTop + chartHeight * (1 - bandCenter / totalStack);
        labels.push({
          yPixels,
          text: formatCurrency(value * 1000000)
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
              <linearGradient key={dept.id} id={`color-${dept.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={getDepartmentColor(dept.id)} stopOpacity={0.8} />
                <stop offset="95%" stopColor={getDepartmentColor(dept.id)} stopOpacity={0.2} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 164, 196, 0.1)" />
          <XAxis
            dataKey="scenario"
            tick={{ fill: '#8BA4C4', fontSize: 12 }}
            axisLine={{ stroke: 'rgba(139, 164, 196, 0.2)' }}
          />
          <YAxis
            tick={{ fill: '#8BA4C4', fontSize: 11 }}
            tickFormatter={(value) => `$${value.toFixed(1)}M`}
            axisLine={{ stroke: 'rgba(139, 164, 196, 0.2)' }}
            domain={[0, maxValue]}
            ticks={[0, maxValue / 4, maxValue / 2, (maxValue * 3) / 4, maxValue]}
          />

          {/* Render areas in reverse order so highest-impact dept is on top */}
          {[...departments].reverse().map((dept) => (
            <Area
              key={dept.id}
              type="monotone"
              dataKey={dept.id}
              stackId="1"
              stroke={getDepartmentColor(dept.id)}
              fill={`url(#color-${dept.id})`}
              fillOpacity={1}
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
