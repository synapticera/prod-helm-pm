import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-surface border border-border rounded-xl p-6
        backdrop-blur-xl
        ${hover ? 'card-hover cursor-pointer' : ''}
        ${className}
      `}
      style={{
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {children}
    </div>
  );
}
