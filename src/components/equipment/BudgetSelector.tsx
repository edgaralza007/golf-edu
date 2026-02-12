import { useState } from 'react';
import { Card, Badge } from '../ui';
import type { BudgetTier, BudgetRecommendation } from '../../data/equipment';
import { budgetRecommendations } from '../../data/equipment';

const tierIcons: Record<BudgetTier, string> = {
  starter: '$',
  intermediate: '$$',
  premium: '$$$',
};

const tierColors: Record<BudgetTier, string> = {
  starter: 'bg-green-100 text-green-800 border-green-300',
  intermediate: 'bg-blue-100 text-blue-800 border-blue-300',
  premium: 'bg-amber-100 text-amber-800 border-amber-300',
};

const tierActiveColors: Record<BudgetTier, string> = {
  starter: 'bg-green-700 text-white border-green-700',
  intermediate: 'bg-blue-700 text-white border-blue-700',
  premium: 'bg-amber-600 text-white border-amber-600',
};

function BudgetCard({ rec, isActive }: { rec: BudgetRecommendation; isActive: boolean }) {
  return (
    <Card className={`transition-all ${isActive ? 'ring-2 ring-green-500 shadow-md' : ''}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-900">{rec.label}</h3>
        <Badge variant={rec.tier === 'starter' ? 'green' : rec.tier === 'intermediate' ? 'navy' : 'amber'}>
          {rec.bestFor}
        </Badge>
      </div>

      <p className="text-sm text-gray-600 mb-4">{rec.summary}</p>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Clubs Included</h4>
          <div className="flex flex-wrap gap-1.5">
            {rec.clubs.map((club) => (
              <span
                key={club}
                className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md"
              >
                {club}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Also Includes</h4>
          <ul className="space-y-1">
            {rec.extras.map((extra) => (
              <li key={extra} className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {extra}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

export function BudgetSelector() {
  const [activeTier, setActiveTier] = useState<BudgetTier>('starter');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">What Should You Spend?</h2>
        <p className="text-sm text-gray-600">
          You do not need expensive clubs to enjoy golf. Pick a budget that matches your commitment level.
        </p>
      </div>

      <div className="flex gap-2">
        {budgetRecommendations.map((rec) => (
          <button
            key={rec.tier}
            onClick={() => setActiveTier(rec.tier)}
            className={`flex-1 px-3 py-2.5 rounded-lg border-2 text-sm font-semibold transition-colors ${
              activeTier === rec.tier
                ? tierActiveColors[rec.tier]
                : tierColors[rec.tier]
            }`}
          >
            <span className="block text-lg">{tierIcons[rec.tier]}</span>
            <span className="block mt-0.5">{rec.price}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {budgetRecommendations
          .filter((rec) => rec.tier === activeTier)
          .map((rec) => (
            <BudgetCard key={rec.tier} rec={rec} isActive />
          ))}
      </div>

      {/* Visual comparison */}
      <Card className="bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Comparison</h3>
        <div className="space-y-3">
          {budgetRecommendations.map((rec) => (
            <div key={rec.tier} className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-500 w-16">{rec.price}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    rec.tier === 'starter'
                      ? 'bg-green-500'
                      : rec.tier === 'intermediate'
                        ? 'bg-blue-500'
                        : 'bg-amber-500'
                  }`}
                  style={{
                    width:
                      rec.tier === 'starter'
                        ? '54%'
                        : rec.tier === 'intermediate'
                          ? '77%'
                          : '100%',
                  }}
                />
              </div>
              <span className="text-xs text-gray-500 w-20 text-right">
                {rec.clubs.length} clubs
              </span>
            </div>
          ))}
        </div>
      </Card>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-900">
          <span className="font-semibold">Pro Tip:</span> Do not buy new clubs until you have taken a few lessons or played several rounds.
          Your swing will change a lot as you learn, and you may find a used set is all you need for the first season.
        </p>
      </div>
    </div>
  );
}
