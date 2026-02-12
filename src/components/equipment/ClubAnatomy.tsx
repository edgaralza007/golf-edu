import { useState } from 'react';
import { Card } from '../ui';
import { clubParts } from '../../data/equipment';

export function ClubAnatomy() {
  const [activePart, setActivePart] = useState<string | null>(null);
  const active = clubParts.find((p) => p.id === activePart);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Anatomy of a Golf Club</h2>
        <p className="text-sm text-gray-600">
          Understanding your club's parts helps you communicate with pros and pick the right equipment.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Club diagram */}
        <div className="mx-auto lg:mx-0">
          <svg
            viewBox="0 0 300 520"
            className="w-full max-w-[280px]"
            role="img"
            aria-label="Side view of a golf club with labeled parts"
          >
            {/* Grip */}
            <g
              className="cursor-pointer"
              onClick={() => setActivePart(activePart === 'grip' ? null : 'grip')}
            >
              <rect
                x="140" y="20" width="20" height="120" rx="10"
                fill={activePart === 'grip' ? '#16A34A' : '#4B5563'}
                className="transition-colors"
              />
              {/* Grip texture lines */}
              {[40, 55, 70, 85, 100, 115].map((y) => (
                <line key={y} x1="143" y1={y} x2="157" y2={y} stroke="#FFFFFF40" strokeWidth="1" />
              ))}
              <line x1="165" y1="70" x2="220" y2="70" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4 2" />
              <text x="225" y="74" className="text-[12px] font-medium" fill={activePart === 'grip' ? '#16A34A' : '#6B7280'}>
                Grip
              </text>
            </g>

            {/* Shaft */}
            <g
              className="cursor-pointer"
              onClick={() => setActivePart(activePart === 'shaft' ? null : 'shaft')}
            >
              <rect
                x="146" y="140" width="8" height="250" rx="4"
                fill={activePart === 'shaft' ? '#3B82F6' : '#9CA3AF'}
                className="transition-colors"
              />
              <line x1="160" y1="265" x2="220" y2="265" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4 2" />
              <text x="225" y="269" className="text-[12px] font-medium" fill={activePart === 'shaft' ? '#3B82F6' : '#6B7280'}>
                Shaft
              </text>
            </g>

            {/* Hosel */}
            <g
              className="cursor-pointer"
              onClick={() => setActivePart(activePart === 'hosel' ? null : 'hosel')}
            >
              <rect
                x="144" y="385" width="12" height="30" rx="3"
                fill={activePart === 'hosel' ? '#8B5CF6' : '#6B7280'}
                className="transition-colors"
              />
              <line x1="160" y1="400" x2="220" y2="400" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4 2" />
              <text x="225" y="404" className="text-[12px] font-medium" fill={activePart === 'hosel' ? '#8B5CF6' : '#6B7280'}>
                Hosel
              </text>
            </g>

            {/* Clubhead */}
            <g
              className="cursor-pointer"
              onClick={() => setActivePart(activePart === 'clubhead' ? null : 'clubhead')}
            >
              <path
                d="M 80 415 Q 75 440 85 465 Q 100 485 150 480 Q 155 470 155 415 Z"
                fill={activePart === 'clubhead' ? '#F59E0B' : '#D1D5DB'}
                stroke={activePart === 'clubhead' ? '#D97706' : '#9CA3AF'}
                strokeWidth="2"
                className="transition-colors"
              />
              <line x1="75" y1="450" x2="30" y2="450" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4 2" />
              <text x="5" y="444" className="text-[11px] font-medium" fill={activePart === 'clubhead' ? '#F59E0B' : '#6B7280'}>
                Club
              </text>
              <text x="5" y="458" className="text-[11px] font-medium" fill={activePart === 'clubhead' ? '#F59E0B' : '#6B7280'}>
                Head
              </text>
            </g>

            {/* Face / Grooves (on the clubhead) */}
            <g
              className="cursor-pointer"
              onClick={() => setActivePart(activePart === 'face' ? null : 'face')}
            >
              <line x1="150" y1="420" x2="145" y2="475" stroke={activePart === 'face' ? '#EF4444' : '#9CA3AF'} strokeWidth="3" className="transition-colors" />
              {/* Grooves */}
              {[430, 438, 446, 454, 462].map((y) => (
                <line
                  key={y}
                  x1="130" y1={y} x2="148" y2={y + 2}
                  stroke={activePart === 'grooves' || activePart === 'face' ? '#EF4444' : '#B0B0B0'}
                  strokeWidth="1"
                  className="transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePart(activePart === 'grooves' ? null : 'grooves');
                  }}
                />
              ))}
              <line x1="155" y1="435" x2="220" y2="435" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4 2" />
              <text x="225" y="433" className="text-[11px] font-medium" fill={activePart === 'face' ? '#EF4444' : '#6B7280'}>
                Face &
              </text>
              <text x="225" y="446" className="text-[11px] font-medium" fill={activePart === 'grooves' ? '#EF4444' : '#6B7280'}>
                Grooves
              </text>
            </g>

            {/* Toe */}
            <g
              className="cursor-pointer"
              onClick={() => setActivePart(activePart === 'toe' ? null : 'toe')}
            >
              <circle
                cx="83" cy="465" r="5"
                fill={activePart === 'toe' ? '#EC4899' : '#E5E7EB'}
                stroke={activePart === 'toe' ? '#BE185D' : '#9CA3AF'}
                strokeWidth="1.5"
                className="transition-colors"
              />
              <line x1="78" y1="470" x2="30" y2="490" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4 2" />
              <text x="8" y="498" className="text-[12px] font-medium" fill={activePart === 'toe' ? '#EC4899' : '#6B7280'}>
                Toe
              </text>
            </g>

            {/* Heel */}
            <g
              className="cursor-pointer"
              onClick={() => setActivePart(activePart === 'heel' ? null : 'heel')}
            >
              <circle
                cx="150" cy="480" r="5"
                fill={activePart === 'heel' ? '#7C3AED' : '#E5E7EB'}
                stroke={activePart === 'heel' ? '#5B21B6' : '#9CA3AF'}
                strokeWidth="1.5"
                className="transition-colors"
              />
              <line x1="155" y1="484" x2="220" y2="498" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4 2" />
              <text x="225" y="502" className="text-[12px] font-medium" fill={activePart === 'heel' ? '#7C3AED' : '#6B7280'}>
                Heel
              </text>
            </g>

            {/* Sole indicator */}
            <g
              className="cursor-pointer"
              onClick={() => setActivePart(activePart === 'sole' ? null : 'sole')}
            >
              <line
                x1="85" y1="482" x2="148" y2="482"
                stroke={activePart === 'sole' ? '#0EA5E9' : '#B0B0B0'}
                strokeWidth="2.5"
                strokeDasharray="6 3"
                className="transition-colors"
              />
              <line x1="120" y1="486" x2="120" y2="508" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4 2" />
              <text x="100" y="516" className="text-[12px] font-medium" fill={activePart === 'sole' ? '#0EA5E9' : '#6B7280'}>
                Sole
              </text>
            </g>

            {/* Leading edge */}
            <g
              className="cursor-pointer"
              onClick={() => setActivePart(activePart === 'leading-edge' ? null : 'leading-edge')}
            >
              <path
                d="M 85 478 Q 115 485 145 478"
                fill="none"
                stroke={activePart === 'leading-edge' ? '#F97316' : '#C0C0C0'}
                strokeWidth="2"
                className="transition-colors"
              />
            </g>
          </svg>
        </div>

        {/* Info panel + part list */}
        <div className="flex-1 min-w-0 w-full space-y-4">
          {active ? (
            <Card className="border-l-4 border-l-green-600">
              <h3 className="font-bold text-gray-900 text-lg">{active.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{active.description}</p>
            </Card>
          ) : (
            <Card className="bg-gray-50 text-center">
              <p className="text-sm text-gray-500 py-2">
                Tap a part on the club diagram to learn about it.
              </p>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-2">
            {clubParts.map((part) => (
              <button
                key={part.id}
                onClick={() => setActivePart(activePart === part.id ? null : part.id)}
                className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  activePart === part.id
                    ? 'bg-green-100 text-green-800 font-medium'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {part.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loft comparison */}
      <Card>
        <h3 className="font-bold text-gray-900 mb-3">How Loft Affects Ball Flight</h3>
        <p className="text-sm text-gray-600 mb-4">
          Loft is the angle of the clubface. Less loft = lower, farther shots. More loft = higher, shorter shots.
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Low loft - Driver */}
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-700 mb-2 text-center">Driver (~10&deg;)</p>
            <svg viewBox="0 0 240 100" className="w-full max-w-[240px] mx-auto">
              {/* Ground */}
              <line x1="10" y1="85" x2="230" y2="85" stroke="#D1D5DB" strokeWidth="2" />
              {/* Ball trajectory - low arc, far */}
              <path
                d="M 20 80 Q 80 20 220 80"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2.5"
                strokeDasharray="6 3"
              />
              {/* Ball */}
              <circle cx="20" cy="80" r="5" fill="#3B82F6" />
              {/* Landing */}
              <circle cx="220" cy="80" r="4" fill="#3B82F660" />
              {/* Distance label */}
              <text x="120" y="98" textAnchor="middle" className="text-[11px]" fill="#6B7280">
                200-230 yds
              </text>
              {/* Loft angle indicator */}
              <line x1="20" y1="80" x2="40" y2="80" stroke="#9CA3AF" strokeWidth="1" />
              <line x1="20" y1="80" x2="38" y2="73" stroke="#3B82F6" strokeWidth="1.5" />
              <path d="M 32 80 A 12 12 0 0 0 34 76" fill="none" stroke="#3B82F6" strokeWidth="1" />
              <text x="40" y="74" className="text-[9px]" fill="#3B82F6">10&deg;</text>
            </svg>
          </div>

          {/* High loft - Sand Wedge */}
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-700 mb-2 text-center">Sand Wedge (~56&deg;)</p>
            <svg viewBox="0 0 240 100" className="w-full max-w-[240px] mx-auto">
              {/* Ground */}
              <line x1="10" y1="85" x2="230" y2="85" stroke="#D1D5DB" strokeWidth="2" />
              {/* Ball trajectory - high arc, short */}
              <path
                d="M 20 80 Q 60 -30 120 80"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2.5"
                strokeDasharray="6 3"
              />
              {/* Ball */}
              <circle cx="20" cy="80" r="5" fill="#F59E0B" />
              {/* Landing */}
              <circle cx="120" cy="80" r="4" fill="#F59E0B60" />
              {/* Distance label */}
              <text x="70" y="98" textAnchor="middle" className="text-[11px]" fill="#6B7280">
                60-80 yds
              </text>
              {/* Loft angle indicator */}
              <line x1="20" y1="80" x2="40" y2="80" stroke="#9CA3AF" strokeWidth="1" />
              <line x1="20" y1="80" x2="28" y2="62" stroke="#F59E0B" strokeWidth="1.5" />
              <path d="M 30 80 A 10 10 0 0 0 26 68" fill="none" stroke="#F59E0B" strokeWidth="1" />
              <text x="35" y="66" className="text-[9px]" fill="#F59E0B">56&deg;</text>
            </svg>
          </div>
        </div>
      </Card>
    </div>
  );
}
