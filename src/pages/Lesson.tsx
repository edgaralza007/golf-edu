import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { modules, getModule, getLesson, getAdjacentLessons } from '../data/modules';
import { Card } from '../components/ui/Card';
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

export function Lesson() {
  const { moduleId, lessonId } = useParams<{
    moduleId: string;
    lessonId: string;
  }>();
  const { user, updateModuleProgress } = useUser();
  const navigate = useNavigate();

  const mod = moduleId ? getModule(moduleId) : undefined;
  const lesson =
    moduleId && lessonId ? getLesson(moduleId, lessonId) : undefined;

  if (!mod || !lesson) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Lesson Not Found
        </h1>
        <p className="text-gray-600 mb-6">This lesson does not exist.</p>
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
  const isCompleted = progress?.lessonsCompleted.includes(lesson.id) ?? false;
  const { prev, next } = getAdjacentLessons(mod.id, lesson.id);

  const handleCompleteAndNext = () => {
    if (!isCompleted) {
      updateModuleProgress(mod.id, lesson.id, mod.lessons.length);
    }
    if (next) {
      navigate(`/learning-path/${next.moduleId}/${next.lessonId}`);
    } else {
      navigate(`/learning-path/${mod.id}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <Link
          to="/learning-path"
          className="text-green-700 hover:text-green-800"
        >
          Learning Path
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link
          to={`/learning-path/${mod.id}`}
          className="text-green-700 hover:text-green-800"
        >
          {mod.title}
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-600">{lesson.title}</span>
      </nav>

      {/* Lesson Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {lesson.title}
        </h1>
        <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
          <span>{lesson.estimatedMinutes} min read</span>
          {isCompleted && (
            <span className="inline-flex items-center gap-1 text-green-700 font-medium">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Completed
            </span>
          )}
        </div>
      </div>

      {/* Content Paragraphs */}
      <div className="space-y-4 mb-8">
        {lesson.content.map((paragraph, idx) => (
          <p key={idx} className="text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Tips Callout */}
      {lesson.tips.length > 0 && (
        <div className="mb-8 rounded-lg border-2 border-green-200 bg-green-50 p-5">
          <h2 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5.002 5.002 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            Tips
          </h2>
          <ul className="space-y-2">
            {lesson.tips.map((tip, idx) => (
              <li key={idx} className="flex gap-2 text-green-900 text-sm">
                <span className="text-green-600 shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Key Takeaways */}
      {lesson.keyTakeaways.length > 0 && (
        <Card className="mb-8 bg-gray-50 border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Key Takeaways
          </h2>
          <ul className="space-y-2">
            {lesson.keyTakeaways.map((takeaway, idx) => (
              <li
                key={idx}
                className="flex gap-2 text-gray-700 text-sm"
              >
                <span className="text-green-600 shrink-0 mt-0.5 font-bold">
                  {idx + 1}.
                </span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Mark Complete */}
      <div className="mb-8 text-center">
        {isCompleted ? (
          <Button variant="outline" onClick={handleCompleteAndNext}>
            {next ? 'Next Lesson' : 'Back to Module'}
          </Button>
        ) : (
          <Button size="lg" onClick={handleCompleteAndNext}>
            {next ? 'Mark Complete & Continue' : 'Mark Complete'}
          </Button>
        )}
      </div>

      {/* Prev / Next Navigation */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        {prev ? (
          <Link
            to={`/learning-path/${prev.moduleId}/${prev.lessonId}`}
            className="flex items-center gap-2 text-sm text-green-700 hover:text-green-800 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous Lesson
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            to={`/learning-path/${next.moduleId}/${next.lessonId}`}
            className="flex items-center gap-2 text-sm text-green-700 hover:text-green-800 transition-colors"
          >
            Next Lesson
            <svg
              className="w-4 h-4"
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
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
