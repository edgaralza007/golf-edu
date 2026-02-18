import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'green' | 'navy' | 'gray' | 'amber';
  className?: string;
}

const variantClasses: Record<string, string> = {
  green: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
  navy: 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300',
  gray: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
  amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300',
};

export function Badge({ children, variant = 'green', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
