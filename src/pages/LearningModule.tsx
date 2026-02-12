import { useParams, Link, Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { modules, getModule, getTotalEstimatedMinutes } from '../data/modules';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

function isModuleUnlocked(
  moduleId: string,
  moduleProgress: { moduleId: string; lessonsCompleted: string[] }[],
): boolean {
  const idx = modules.findIndex((m) => m.id === moduleId);
  if (idx <= 0) return true;
  const prevModule = modules[idx - 1];
  const prevProgress = moduleProgress.find((p) => p.moduleId === prevModule.id);
  if (!prevProgress) return false;
  return prevProgress.lessonsCompleted.length >= prevModule.lessons.length;
}

export function LearningModule() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { user } = useUser();

  const mod = moduleId ? getModule(moduleId) : undefined;
  if (!mod) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Module Not Found</h1>
        <p className="text-gray-600 mb-6">This module does not exist.</p>
        <Link to="/learning-path">
          <Button>Back to Learning Path</Button>
        </Link>
      </div>
    );
  }

  const unlocked = isModuleUnlocked(mod.id, user.moduleProgress);
  if (!unlocked) {
    return <Navigate to="/learning-path" replace />;
  }

  const progress = user.moduleProgress.find((p) => p.moduleId === mod.id);
  const completedLessons = progress?.lessonsCompleted ?? [];
  const totalLessons = mod.lessons.length;
  const estMinutes = getTotalEstimatedMinutes(mod);
  const isComplete = completedLessons.length >= totalLessons;

  const moduleIndex = modules.findIndex((m) => m.id === mod.id);
  const nextModule = moduleIndex < modules.length - 1 ? modules[moduleIndex + 1] : null;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <Link to="/learning-path" className="text-green-700 hover:text-green-800">
          Learning Path
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-600">{mod.title}</span>
      </nav>

      {/* Module Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{mod.icon}</span>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {mod.title}
            </h1>
          </div>
        </div>
        <p className="text-gray-600 mt-2">{mod.description}</p>
        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
          <span>{totalLessons} lessons</span>
          <span>{estMinutes} min total</span>
          {isComplete && <Badge variant="green">Complete</Badge>}
        </div>
        <ProgressBar
          value={completedLessons.length}
          max={totalLessons}
          label="Module Progress"
          showPercentage
          className="mt-4"
        />
      </div>

      {/* Lesson List */}
      <div className="space-y-3">
        {mod.lessons.map((lesson, idx) => {
          const done = completedLessons.includes(lesson.id);
          return (
            <Link
              key={lesson.id}
              to={`/learning-path/${mod.id}/${lesson.id}`}
              className="block group"
            >
              <Card className="transition-shadow group-hover:shadow-md" padding="sm">
                <div className="flex items-center gap-3">
                  {/* Checkbox indicator */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${
                      done
                        ? 'bg-green-600 border-green-600 text-white'
                        : 'border-gray-300 text-transparent group-hover:border-green-400'
                    }`}
                  >
                    {done ? (
                      <svg
                        className="w-4 h-4"
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
                      <span className="text-xs font-medium text-gray-400">
                        {idx + 1}
                      </span>
                    )}
                  </div>

                  {/* Lesson info */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-medium transition-colors ${
                        done
                          ? 'text-gray-500'
                          : 'text-gray-900 group-hover:text-green-700'
                      }`}
                    >
                      {lesson.title}
                    </h3>
                    <span className="text-xs text-gray-400">
                      {lesson.estimatedMinutes} min
                    </span>
                  </div>

                  {/* Arrow */}
                  <svg
                    className="w-5 h-5 text-gray-300 group-hover:text-green-600 transition-colors shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Next Module prompt */}
      {isComplete && nextModule && (
        <Card className="mt-8 bg-green-50 border-green-200">
          <div className="text-center">
            <p className="text-green-800 font-medium mb-2">
              Great job completing this module!
            </p>
            <p className="text-green-700 text-sm mb-4">
              You have unlocked the next module: {nextModule.icon}{' '}
              {nextModule.title}
            </p>
            <Link to={`/learning-path/${nextModule.id}`}>
              <Button>Continue to Next Module</Button>
            </Link>
          </div>
        </Card>
      )}

      {isComplete && !nextModule && (
        <Card className="mt-8 bg-green-50 border-green-200">
          <div className="text-center">
            <p className="text-green-800 font-medium mb-2">
              Congratulations! You have completed the entire learning path!
            </p>
            <p className="text-green-700 text-sm mb-4">
              You now have a solid foundation in golf fundamentals. Time to hit
              the course!
            </p>
            <Link to="/learning-path">
              <Button>Back to Learning Path</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}
