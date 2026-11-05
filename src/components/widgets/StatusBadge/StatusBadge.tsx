import type { HTMLAttributes } from 'react';
import './StatusBadge.css';

interface StatusBadgeProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  variant?: 'live' | 'neutral' | 'accent';
  className?: string;
}

export const StatusBadge = ({
  label,
  variant = 'neutral',
  className = '',
  ...props
}: StatusBadgeProps) => {
  return (
    <div className={`status-badge-pill badge-${variant} ${className}`} {...props}>
      <span className="badge-label">{label}</span>
    </div>
  );
};
