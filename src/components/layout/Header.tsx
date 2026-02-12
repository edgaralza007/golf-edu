import { useUser } from '../../context/UserContext';
import { ProgressBar } from '../ui/ProgressBar';

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { user } = useUser();

  const totalLessonsCompleted = user.moduleProgress.reduce(
    (sum, m) => sum + m.lessonsCompleted.length,
    0
  );
  const totalLessons = user.moduleProgress.reduce((sum, m) => sum + m.totalLessons, 0);

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 h-16 px-4 bg-white border-b border-gray-200">
      <button
        onClick={onMenuToggle}
        className="md:hidden p-2 -ml-2 text-gray-500 hover:text-gray-700"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex items-center gap-2 md:hidden">
        <div className="w-7 h-7 rounded-full bg-green-700 flex items-center justify-center">
          <span className="text-white font-bold text-xs">G</span>
        </div>
        <span className="font-bold text-green-800">GolfEdu</span>
      </div>

      <div className="ml-auto flex items-center gap-4">
        {totalLessons > 0 && (
          <ProgressBar
            value={totalLessonsCompleted}
            max={totalLessons}
            showPercentage
            className="hidden sm:block w-40"
          />
        )}
      </div>
    </header>
  );
}
