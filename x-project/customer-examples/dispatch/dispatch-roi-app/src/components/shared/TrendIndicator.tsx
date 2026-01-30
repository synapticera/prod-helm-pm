import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TrendIndicatorProps {
  value: number;
  format?: (val: number) => string;
  direction?: 'up' | 'down' | 'neutral';
}

export default function TrendIndicator({ value, format, direction }: TrendIndicatorProps) {
  const absValue = Math.abs(value);
  const displayValue = format ? format(absValue) : absValue.toFixed(1);

  const autoDirection = direction || (value > 0 ? 'up' : value < 0 ? 'down' : 'neutral');

  const Icon = autoDirection === 'up' ? TrendingUp : autoDirection === 'down' ? TrendingDown : Minus;
  const color = autoDirection === 'up' ? 'text-accent-green' : autoDirection === 'down' ? 'text-accent-red' : 'text-text-tertiary';

  return (
    <div className={`inline-flex items-center gap-1 text-sm ${color}`}>
      <Icon className="w-4 h-4" />
      <span className="font-medium">{displayValue}</span>
    </div>
  );
}
