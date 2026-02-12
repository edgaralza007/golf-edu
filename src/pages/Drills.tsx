import { useState, useMemo, useCallback } from 'react';
import { drills } from '../data/drills';
import { DrillCard } from '../components/drills/DrillCard';
import { DrillFilters, type DrillFilterState } from '../components/drills/DrillFilters';
import { QuickPractice } from '../components/drills/QuickPractice';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const FAVORITES_KEY = 'golf-edu-drill-favorites';

export function Drills() {
  const [filters, setFilters] = useState<DrillFilterState>({
    category: 'all',
    difficulty: 'all',
    maxMinutes: 'all',
    location: 'all',
    sortBy: 'difficulty',
    searchQuery: '',
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickPracticeOpen, setQuickPracticeOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() =>
    loadFromStorage<string[]>(FAVORITES_KEY, [])
  );

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      saveToStorage(FAVORITES_KEY, next);
      return next;
    });
  }, []);

  const filtered = useMemo(() => {
    let result = [...drills];

    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.equipment.some((e) => e.toLowerCase().includes(q))
      );
    }

    if (filters.category !== 'all') {
      result = result.filter((d) => d.category === filters.category);
    }
    if (filters.difficulty !== 'all') {
      result = result.filter((d) => d.difficulty === filters.difficulty);
    }
    if (filters.maxMinutes !== 'all') {
      result = result.filter((d) => d.estimatedMinutes <= Number(filters.maxMinutes));
    }
    if (filters.location !== 'all') {
      result = result.filter((d) => d.location === filters.location);
    }

    result.sort((a, b) => {
      if (filters.sortBy === 'difficulty') return a.difficulty - b.difficulty;
      if (filters.sortBy === 'time') return a.estimatedMinutes - b.estimatedMinutes;
      return a.category.localeCompare(b.category);
    });

    return result;
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Practice Drills</h1>
          <p className="text-gray-500 mt-1">
            {filtered.length} drill{filtered.length !== 1 ? 's' : ''} to improve your game
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuickPracticeOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-700 text-white text-sm font-medium hover:bg-green-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Quick Practice
          </button>
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="md:hidden inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
          </button>
        </div>
      </div>

      {/* Main content with sidebar */}
      <div className="flex gap-6">
        <DrillFilters
          filters={filters}
          onChange={setFilters}
          mobileOpen={mobileFiltersOpen}
          onMobileClose={() => setMobileFiltersOpen(false)}
        />

        {/* Drill grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <svg
                className="w-16 h-16 mx-auto text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No drills found</h3>
              <p className="text-gray-500 text-sm">
                Try adjusting your filters or search query.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((drill) => (
                <DrillCard
                  key={drill.id}
                  drill={drill}
                  isFavorite={favorites.includes(drill.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Practice modal */}
      <QuickPractice open={quickPracticeOpen} onClose={() => setQuickPracticeOpen(false)} />
    </div>
  );
}
