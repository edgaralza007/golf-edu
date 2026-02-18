import { Card } from '../ui';

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
}

export function StatCard({ label, value, subtitle, icon }: StatCardProps) {
  return (
    <Card padding="md" className="flex flex-col items-center text-center min-w-[140px]">
      {icon && <span className="text-2xl mb-1">{icon}</span>}
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{label}</p>
      <p className="text-2xl font-bold text-green-800 dark:text-green-300 mt-1">{value}</p>
      {subtitle && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{subtitle}</p>}
    </Card>
  );
}
