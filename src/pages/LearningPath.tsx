import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { modules, getTotalEstimatedMinutes } from '../data/modules';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

function isModuleUnlocked(
  moduleIndex: number,
  moduleProgress: { moduleId: string; lessonsCompleted: string[] }[],
): boolean {
  if (moduleIndex === 0) return true;
  const prevModule = modules[moduleIndex - 1];
  const prevProgress = moduleProgress.find((p) => p.moduleId === prevModule.id);
  if (!prevProgress) return false;
  return prevProgress.lessonsCompleted.length >= prevModule.lessons.length;
}

export function LearningPath() {
  const { user } = useUser();
  const { moduleProgress, onboardingComplete, preferences } = user;

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = moduleProgress.reduce(
    (sum, p) => sum + p.lessonsCompleted.length,
    0,
  );

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        {onboardingComplete && preferences.experienceLevel ? (
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            Your Learning Path
          </h1>
        ) : (
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            Learning Path
          </h1>
        )}
        <p className="text-gray-600 dark:text-gray-400">
          Master golf fundamentals one step at a time. Complete each module to
          unlock the next.
        </p>
      </div>

      {/* Overall Progress */}
      <Card className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Overall Progress
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {completedLessons} / {totalLessons} lessons
          </span>
        </div>
        <ProgressBar value={completedLessons} max={totalLessons} showPercentage />
      </Card>

      {/* Module Timeline */}
      <div className="relative">
        {modules.map((mod, index) => {
          const unlocked = isModuleUnlocked(index, moduleProgress);
          const progress = moduleProgress.find((p) => p.moduleId === mod.id);
          const lessonsComplete = progress?.lessonsCompleted.length ?? 0;
          const totalModuleLessons = mod.lessons.length;
          const isComplete = lessonsComplete >= totalModuleLessons;
          const estMinutes = getTotalEstimatedMinutes(mod);
          const isLast = index === modules.length - 1;

          return (
            <div key={mod.id} className="relative flex gap-4">
              {/* Timeline connector */}
              <div className="flex flex-col items-center">
                {/* Node */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 border-2 transition-colors ${
                    isComplete
                      ? 'bg-green-600 border-green-600 text-white'
                      : unlocked
                        ? 'bg-white dark:bg-gray-800 border-green-600 text-green-700 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {isComplete ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span className="text-sm font-bold">{index + 1}</span>
                  )}
                </div>
                {/* Line */}
                {!isLast && (
                  <div
                    className={`w-0.5 flex-1 min-h-[2rem] ${
                      isComplete ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-600'
                    }`}
                  />
                )}
              </div>

              {/* Card */}
              <div className="pb-6 flex-1 min-w-0">
                {unlocked ? (
                  <Link
                    to={`/learning-path/${mod.id}`}
                    className="block group"
                  >
                    <Card className="transition-shadow group-hover:shadow-md">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl leading-none">{mod.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-green-700 dark:hover:text-green-400 transition-colors">
                              {mod.title}
                            </h3>
                            {isComplete && (
                              <Badge variant="green">Complete</Badge>
                            )}
                            {!isComplete && lessonsComplete > 0 && (
                              <Badge variant="amber">In Progress</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {mod.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <span>{totalModuleLessons} lessons</span>
                            <span>{estMinutes} min</span>
                          </div>
                          {lessonsComplete > 0 && (
                            <ProgressBar
                              value={lessonsComplete}
                              max={totalModuleLessons}
                              showPercentage
                              className="mt-3"
                            />
                          )}
                        </div>
                      </div>
                    </Card>
                  </Link>
                ) : (
                  <Card className="opacity-60">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl leading-none grayscale">
                        {mod.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-gray-400 dark:text-gray-500">
                            {mod.title}
                          </h3>
                          <Badge variant="gray">Locked</Badge>
                        </div>
                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                          {mod.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400 dark:text-gray-500">
                          <span>{totalModuleLessons} lessons</span>
                          <span>{estMinutes} min</span>
                        </div>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 italic">
                          Complete &ldquo;{modules[index - 1].title}&rdquo; to
                          unlock
                        </p>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
