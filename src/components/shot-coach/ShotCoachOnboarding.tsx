import { useState } from 'react';
import { Button, Card } from '../ui';
import type { ClubDistances, MissTendency, PlayStyle, ShotCoachProfile } from '../../types';
import { saveToStorage } from '../../utils/storage';
import { SHOT_COACH_PROFILE_KEY } from '../../utils/shotCoach';

interface ShotCoachOnboardingProps {
  onComplete: (profile: ShotCoachProfile) => void;
}

const CLUBS: Array<{ key: keyof ClubDistances; label: string; placeholder: string }> = [
  { key: 'driver', label: 'Driver', placeholder: '230' },
  { key: 'wood3', label: '3-Wood', placeholder: '200' },
  { key: 'iron5', label: '5-Iron', placeholder: '170' },
  { key: 'iron7', label: '7-Iron', placeholder: '150' },
  { key: 'iron9', label: '9-Iron', placeholder: '130' },
  { key: 'pw', label: 'Pitching Wedge', placeholder: '110' },
];

export function ShotCoachOnboarding({ onComplete }: ShotCoachOnboardingProps) {
  const [distances, setDistances] = useState<Partial<ClubDistances>>({});
  const [missTendency, setMissTendency] = useState<MissTendency>('straight');
  const [playStyle, setPlayStyle] = useState<PlayStyle>('conservative');
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = () => {
    const newErrors: string[] = [];
    CLUBS.forEach(({ key, label }) => {
      const val = distances[key];
      if (val === undefined || val <= 0) newErrors.push(`${label} distance is required`);
    });

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const profile: ShotCoachProfile = {
      clubDistances: distances as ClubDistances,
      missTendency,
      playStyle,
    };

    saveToStorage<ShotCoachProfile>(SHOT_COACH_PROFILE_KEY, profile);
    onComplete(profile);
  };

  return (
    <div className="max-w-lg mx-auto pb-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-700 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Set Up Your Caddie</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed">
          Your AI caddie needs your distances to make smart club recommendations. You can always update this later.
        </p>
      </div>

      {/* Club distances */}
      <Card className="mb-4">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Club Distances <span className="text-gray-400 font-normal">(yards)</span>
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {CLUBS.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {label}
              </label>
              <input
                type="number"
                min={1}
                max={400}
                placeholder={placeholder}
                value={distances[key] ?? ''}
                onChange={(e) =>
                  setDistances((prev) => ({
                    ...prev,
                    [key]: e.target.value !== '' ? Number(e.target.value) : undefined,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Miss tendency */}
      <Card className="mb-4">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Typical Miss Direction
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {(['straight', 'fade', 'draw'] as MissTendency[]).map((t) => (
            <button
              key={t}
              onClick={() => setMissTendency(t)}
              className={`py-2.5 px-3 rounded-lg text-sm font-medium border-2 transition-colors capitalize ${
                missTendency === t
                  ? 'border-green-700 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                  : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Card>

      {/* Play style */}
      <Card className="mb-6">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Play Style
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              {
                value: 'conservative' as PlayStyle,
                title: 'Conservative',
                desc: 'Safety first, avoid big numbers',
              },
              {
                value: 'aggressive' as PlayStyle,
                title: 'Aggressive',
                desc: 'Attack flags, go for it',
              },
            ] as const
          ).map(({ value, title, desc }) => (
            <button
              key={value}
              onClick={() => setPlayStyle(value)}
              className={`py-3 px-4 rounded-lg text-left border-2 transition-colors ${
                playStyle === value
                  ? 'border-green-700 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                  : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className="text-sm font-semibold">{title}</div>
              <div className="text-xs mt-0.5 opacity-70">{desc}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <ul className="text-sm text-red-700 dark:text-red-400 space-y-0.5">
            {errors.map((e) => (
              <li key={e}>• {e}</li>
            ))}
          </ul>
        </div>
      )}

      <Button onClick={handleSubmit} size="lg" className="w-full">
        Save & Start Getting Advice
      </Button>
    </div>
  );
}
