import { ReactNode } from 'react';

interface MetricDisplayProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
}

export default function MetricDisplay({
  label,
  value,
  subtext,
  icon,
  trend,
  size = 'md',
}: MetricDisplayProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
  };

  const trendColors = {
    up: 'text-accent-green',
    down: 'text-accent-red',
    neutral: 'text-text-primary',
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        {icon && <div className="text-text-tertiary">{icon}</div>}
        <span className="text-sm font-medium text-text-secondary">{label}</span>
      </div>

      <div
        className={`
          ${sizeClasses[size]} font-bold
          ${trend ? trendColors[trend] : 'text-text-primary'}
        `}
      >
        {value}
      </div>

      {subtext && (
        <div className="text-sm text-text-tertiary">{subtext}</div>
      )}
    </div>
  );
}
