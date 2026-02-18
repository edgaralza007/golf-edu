import type { OnboardingData } from '../../types';
import { Button } from '../ui/Button';

interface OnboardingCompleteProps {
  data: OnboardingData;
  onFinish: () => void;
}

const experienceLabels: Record<string, string> = {
  'never': 'Complete Beginner',
  'few-times': 'Casual Player',
  'regularly': 'Regular Player',
};

const clubLabels: Record<string, string> = {
  'no': 'No clubs yet',
  'borrowing': 'Borrowing clubs',
  'starter-set': 'Starter set',
  'full-set': 'Full set',
};

const goalLabels: Record<string, string> = {
  'fun-social': 'Fun & Social',
  'fitness-outdoors': 'Fitness & Outdoors',
  'competition-improvement': 'Competition & Improvement',
};

const moduleLabels: Record<string, string> = {
  'golf-basics': 'Golf Basics & Etiquette',
  'equipment-guide': 'Equipment Guide',
  'swing-fundamentals': 'Swing Fundamentals',
  'course-navigation': 'Course Navigation',
  'practice-drills': 'Practice Drills',
  'rules-etiquette': 'Rules & Etiquette',
  'scoring-tracking': 'Score Tracking',
  'fitness-conditioning': 'Fitness & Conditioning',
  'mental-game': 'Mental Game',
  'competitive-play': 'Competitive Play',
};

export function OnboardingComplete({ data, onFinish }: OnboardingCompleteProps) {
  return (
    <div className="flex flex-col items-center text-center px-4">
      <div className="text-5xl mb-4">🎯</div>
      <h2 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-green-200 mb-2">
        Your Golf Journey Awaits!
      </h2>
      <p className="text-green-700 dark:text-green-400 mb-6 max-w-md">
        Based on your answers, we've created a personalized learning path just for you.
      </p>

      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl border-2 border-green-100 dark:border-green-800 p-5 mb-6 text-left">
        <h3 className="font-semibold text-green-800 dark:text-green-300 text-lg mb-3">Your Profile</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Experience</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{experienceLabels[data.experience] || data.experience}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Equipment</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{clubLabels[data.hasClubs] || data.hasClubs}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Goal</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{goalLabels[data.goal] || data.goal}</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md bg-green-50 dark:bg-green-900/30 rounded-xl border-2 border-green-200 dark:border-green-800 p-5 mb-8 text-left">
        <h3 className="font-semibold text-green-800 dark:text-green-300 text-lg mb-1">Recommended Starting Point</h3>
        <p className="text-green-900 dark:text-green-200 font-medium mb-3">
          {moduleLabels[data.recommendedStart] || data.recommendedStart}
        </p>
        <h4 className="font-semibold text-green-800 dark:text-green-300 text-sm mb-2">Focus Areas</h4>
        <div className="flex flex-wrap gap-2">
          {data.emphasisAreas.map((area) => (
            <span
              key={area}
              className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium px-3 py-1 rounded-full"
            >
              {moduleLabels[area] || area}
            </span>
          ))}
        </div>
      </div>

      <Button size="lg" className="w-full max-w-md" onClick={onFinish}>
        Start My Learning Path
      </Button>
    </div>
  );
}
