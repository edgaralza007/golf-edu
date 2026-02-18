import type { ReactNode } from 'react';

interface OnboardingStepProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  isActive: boolean;
  direction: 'enter-left' | 'enter-right' | 'exit-left' | 'exit-right' | 'active';
}

export function OnboardingStep({ title, subtitle, children, isActive, direction }: OnboardingStepProps) {
  if (!isActive && direction === 'active') return null;

  const animationClass = {
    'active': 'translate-x-0 opacity-100',
    'enter-left': '-translate-x-full opacity-0',
    'enter-right': 'translate-x-full opacity-0',
    'exit-left': '-translate-x-full opacity-0',
    'exit-right': 'translate-x-full opacity-0',
  }[direction];

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center px-4 transition-all duration-500 ease-in-out ${animationClass}`}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-green-200 text-center mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-green-700 dark:text-green-400 text-center mb-8 text-base md:text-lg max-w-md">
          {subtitle}
        </p>
      )}
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
