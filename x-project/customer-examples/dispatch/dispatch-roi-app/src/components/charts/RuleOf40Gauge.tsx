'use client';

import { useScenario } from '@/lib/hooks/useScenario';
import { getProjectedOutcomes } from '@/lib/data';
import { formatPercent } from '@/lib/utils/formatters';
import { getRuleOf40Color } from '@/lib/utils/colors';
import AnimatedNumber from '@/components/shared/AnimatedNumber';

export default function RuleOf40Gauge() {
  const { scenario } = useScenario();
  const outcomes = getProjectedOutcomes();
  const current = outcomes.scenarios[scenario];
  const baseline = outcomes.scenarios.baseline;

  const value = current.newRuleOf40;
  const target = 0.40;
  const max = 0.70;

  // Calculate angle for semi-circle (180 degrees = 0% to 70%)
  const angle = (value / max) * 180;
  const targetAngle = (target / max) * 180;

  const color = getRuleOf40Color(value);

  return (
    <div className="relative flex flex-col items-center justify-center py-8">
      {/* SVG Gauge */}
      <svg width="300" height="180" viewBox="0 0 300 180" className="mb-4">
        {/* Background arc */}
        <path
          d="M 30 150 A 120 120 0 0 1 270 150"
          fill="none"
          stroke="rgba(139, 164, 196, 0.1)"
          strokeWidth="20"
          strokeLinecap="round"
        />

        {/* Color zones */}
        {/* Red zone: 0-30% */}
        <path
          d="M 30 150 A 120 120 0 0 1 102 52"
          fill="none"
          stroke="rgba(239, 68, 68, 0.2)"
          strokeWidth="20"
          strokeLinecap="round"
        />
        {/* Yellow zone: 30-40% */}
        <path
          d="M 102 52 A 120 120 0 0 1 150 30"
          fill="none"
          stroke="rgba(245, 158, 11, 0.2)"
          strokeWidth="20"
          strokeLinecap="round"
        />
        {/* Green zone: 40-70% */}
        <path
          d="M 150 30 A 120 120 0 0 1 270 150"
          fill="none"
          stroke="rgba(16, 185, 129, 0.2)"
          strokeWidth="20"
          strokeLinecap="round"
        />

        {/* Progress arc */}
        <path
          d={`M 30 150 A 120 120 0 ${angle > 90 ? '1' : '0'} 1 ${150 + 120 * Math.cos((180 - angle) * Math.PI / 180)} ${150 - 120 * Math.sin((180 - angle) * Math.PI / 180)}`}
          fill="none"
          stroke={color}
          strokeWidth="20"
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 8px ${color}60)`,
            transition: 'd 0.6s ease-out'
          }}
        />

        {/* Target line at 40% */}
        <line
          x1="150"
          y1="150"
          x2={150 + 120 * Math.cos((180 - targetAngle) * Math.PI / 180)}
          y2={150 - 120 * Math.sin((180 - targetAngle) * Math.PI / 180)}
          stroke="var(--accent-blue)"
          strokeWidth="2"
          strokeDasharray="4 4"
          opacity="0.5"
        />

        {/* Center labels */}
        <text x="150" y="130" textAnchor="middle" className="text-4xl font-bold" fill={color}>
          {(value * 100).toFixed(1)}%
        </text>
        <text x="150" y="150" textAnchor="middle" className="text-xs" fill="#8BA4C4">
          Rule of 40
        </text>
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-red opacity-40" />
          <span className="text-text-tertiary">0-30%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-yellow opacity-40" />
          <span className="text-text-tertiary">30-40%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-green opacity-40" />
          <span className="text-text-tertiary">40-70%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-px h-4 bg-accent-blue" />
          <span className="text-accent-blue text-xs">40% Target</span>
        </div>
      </div>

      {/* Context */}
      <div className="mt-4 text-center text-sm text-text-secondary">
        Improvement from baseline: <span className="text-accent-green font-semibold">+{formatPercent(value - baseline.ruleOf40)}</span>
      </div>
    </div>
  );
}
