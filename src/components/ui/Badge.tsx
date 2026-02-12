import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'green' | 'navy' | 'gray' | 'amber';
  className?: string;
}

const variantClasses: Record<string, string> = {
  green: 'bg-green-100 text-green-800',
  navy: 'bg-blue-100 text-blue-900',
  gray: 'bg-gray-100 text-gray-700',
  amber: 'bg-amber-100 text-amber-800',
};

export function Badge({ children, variant = 'green', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
