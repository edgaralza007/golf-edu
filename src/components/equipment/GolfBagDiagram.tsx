import { useState } from 'react';
import { Card } from '../ui';
import { categoryColors, categoryLabels, type ClubCategory } from '../../data/equipment';

interface BagSection {
  id: ClubCategory;
  label: string;
  clubs: string[];
  x: number;
  y: number;
  width: number;
  height: number;
  rx: number;
}

const bagSections: BagSection[] = [
  {
    id: 'wood',
    label: 'Woods',
    clubs: ['Driver', '3-Wood', '5-Wood'],
    x: 65,
    y: 30,
    width: 170,
    height: 60,
    rx: 12,
  },
  {
    id: 'hybrid',
    label: 'Hybrids',
    clubs: ['4-Hybrid'],
    x: 65,
    y: 100,
    width: 170,
    height: 45,
    rx: 10,
  },
  {
    id: 'iron',
    label: 'Irons',
    clubs: ['5-Iron', '6-Iron', '7-Iron', '8-Iron', '9-Iron'],
    x: 65,
    y: 155,
    width: 170,
    height: 80,
    rx: 10,
  },
  {
    id: 'wedge',
    label: 'Wedges',
    clubs: ['PW', 'SW', 'LW'],
    x: 65,
    y: 245,
    width: 120,
    height: 55,
    rx: 10,
  },
  {
    id: 'putter',
    label: 'Putter',
    clubs: ['Putter'],
    x: 195,
    y: 245,
    width: 40,
    height: 55,
    rx: 10,
  },
];

export function GolfBagDiagram() {
  const [activeSection, setActiveSection] = useState<ClubCategory | null>(null);
  const active = bagSections.find((s) => s.id === activeSection);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">What Goes in Your Bag</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          A golf bag holds up to 14 clubs. Tap a section to learn what goes where.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="mx-auto">
          <svg
            viewBox="0 0 300 340"
            className="w-full max-w-[280px]"
            role="img"
            aria-label="Top-down view of a golf bag showing club sections"
          >
            {/* Bag outline */}
            <rect
              x="40"
              y="10"
              width="220"
              height="320"
              rx="30"
              fill="#F3F4F6"
              stroke="#D1D5DB"
              strokeWidth="3"
            />

            {/* Bag label */}
            <text x="150" y="335" textAnchor="middle" className="text-[10px]" fill="#9CA3AF">
              Top-Down View
            </text>

            {/* Sections */}
            {bagSections.map((section) => {
              const isActive = activeSection === section.id;
              const color = categoryColors[section.id];
              return (
                <g
                  key={section.id}
                  onClick={() =>
                    setActiveSection(isActive ? null : section.id)
                  }
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label={`${section.label}: ${section.clubs.join(', ')}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveSection(isActive ? null : section.id);
                    }
                  }}
                >
                  <rect
                    x={section.x}
                    y={section.y}
                    width={section.width}
                    height={section.height}
                    rx={section.rx}
                    fill={isActive ? color : `${color}30`}
                    stroke={color}
                    strokeWidth={isActive ? 3 : 2}
                    className="transition-all duration-200"
                  />
                  <text
                    x={section.x + section.width / 2}
                    y={section.y + section.height / 2 + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isActive ? '#FFFFFF' : color}
                    className="text-[13px] font-semibold pointer-events-none select-none"
                  >
                    {section.label}
                  </text>
                  <text
                    x={section.x + section.width / 2}
                    y={section.y + section.height / 2 + 16}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isActive ? '#FFFFFFCC' : `${color}99`}
                    className="text-[10px] pointer-events-none select-none"
                  >
                    {section.clubs.length} club{section.clubs.length !== 1 ? 's' : ''}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Info panel */}
        <div className="flex-1 min-w-0 w-full">
          {active ? (
            <Card className="border-l-4" style={{ borderLeftColor: categoryColors[active.id] }}>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-1">
                {categoryLabels[active.id]}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {active.clubs.length} club{active.clubs.length !== 1 ? 's' : ''} in this section
              </p>
              <div className="flex flex-wrap gap-2">
                {active.clubs.map((club) => (
                  <span
                    key={club}
                    className="inline-block px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  >
                    {club}
                  </span>
                ))}
              </div>
              {active.id === 'wood' && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                  Woods go in the back of the bag. They are your longest clubs and have the biggest heads.
                </p>
              )}
              {active.id === 'iron' && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                  Irons occupy the middle section. They are your most versatile clubs for approach shots.
                </p>
              )}
              {active.id === 'wedge' && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                  Wedges go in the front with the putter. They handle short game shots around the green.
                </p>
              )}
              {active.id === 'hybrid' && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                  Hybrids sit between woods and irons. They replace hard-to-hit long irons.
                </p>
              )}
              {active.id === 'putter' && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                  The putter has its own slot, typically in the front. You will use it more than any other club.
                </p>
              )}
            </Card>
          ) : (
            <Card className="bg-gray-50 dark:bg-gray-900 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 py-4">
                Tap a section in the bag diagram to see what clubs go there.
              </p>
            </Card>
          )}

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-3">
            {bagSections.map((section) => (
              <div key={section.id} className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: categoryColors[section.id] }}
                />
                <span className="text-xs text-gray-600 dark:text-gray-400">{section.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
