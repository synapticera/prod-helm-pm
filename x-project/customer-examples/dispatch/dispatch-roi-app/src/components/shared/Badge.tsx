import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'info' | 'danger' | 'default';
  className?: string;
}

const variantStyles = {
  success: 'bg-accent-green/10 text-accent-green border-accent-green/20',
  warning: 'bg-accent-yellow/10 text-accent-yellow border-accent-yellow/20',
  info: 'bg-accent-blue/10 text-accent-blue border-accent-blue/20',
  danger: 'bg-accent-red/10 text-accent-red border-accent-red/20',
  default: 'bg-surface text-text-secondary border-border',
};

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
