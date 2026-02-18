interface OptionCardProps {
  label: string;
  description: string;
  icon: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionCard({ label, description, icon, selected, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer ${
        selected
          ? 'border-green-600 bg-green-50 dark:bg-green-900/30 shadow-md ring-2 ring-green-200 dark:ring-green-800'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-green-300 dark:hover:border-green-700 hover:bg-green-50/50 dark:hover:bg-green-900/30'
      }`}
    >
      <span className="text-3xl flex-shrink-0" role="img">{icon}</span>
      <div className="min-w-0">
        <div className={`font-semibold text-lg ${selected ? 'text-green-800 dark:text-green-300' : 'text-gray-900 dark:text-gray-100'}`}>
          {label}
        </div>
        <div className={`text-sm ${selected ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
          {description}
        </div>
      </div>
      {selected && (
        <div className="ml-auto flex-shrink-0">
          <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </button>
  );
}
