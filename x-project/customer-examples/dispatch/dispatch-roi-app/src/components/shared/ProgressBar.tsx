'use client';

import { getRuleOf40Color } from '@/lib/utils/colors';

interface ProgressBarProps {
  current: number;
  target: number;
  label?: string;
  showPercentage?: boolean;
}

export default function ProgressBar({ current, target, label, showPercentage = true }: ProgressBarProps) {
  const percentage = (current / target) * 100;
  const cappedPercentage = Math.min(percentage, 100);
  const color = getRuleOf40Color(current);

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between items-baseline">
          <span className="text-sm font-medium text-text-secondary">{label}</span>
          {showPercentage && (
            <span className="text-sm font-bold text-text-primary">
              {(current * 100).toFixed(1)}% / {(target * 100).toFixed(0)}%
            </span>
          )}
        </div>
      )}
      <div className="relative h-3 bg-surface-elevated rounded-full overflow-hidden border border-border">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-600"
          style={{
            width: `${cappedPercentage}%`,
            background: color,
            boxShadow: `0 0 10px ${color}40`,
          }}
        />
      </div>
    </div>
  );
}
