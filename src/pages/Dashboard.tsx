import { useMemo, useState, useEffect, useCallback } from 'react';
import { useUser } from '../context/UserContext';
import { Card, Modal, Button } from '../components/ui';
import { StatCard } from '../components/scoring/StatCard';
import { TrendChart } from '../components/scoring/TrendChart';
import { BadgeDisplay } from '../components/scoring/BadgeDisplay';
import { RoundHistory } from '../components/scoring/RoundHistory';
import { badges } from '../data/badges';
import type { Round } from '../types';

export function Dashboard() {
  const { user, deleteRound } = useUser();
  const { rounds, rangeSessions, earnedBadges } = user;
  const [viewingRound, setViewingRound] = useState<Round | null>(null);
  const [newBadgeNames, setNewBadgeNames] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  // Check for newly earned badges not yet in earnedBadges
  const checkAndShowBadges = useCallback(() => {
    const newlyEarned: string[] = [];
    badges.forEach((badge) => {
      const alreadyEarned = earnedBadges.some((eb) => eb.badgeId === badge.id);
      if (!alreadyEarned && badge.criteria(rounds, rangeSessions)) {
        newlyEarned.push(badge.name);
      }
    });
    if (newlyEarned.length > 0) {
      setNewBadgeNames(newlyEarned);
      setShowCelebration(true);
    }
  }, [rounds, rangeSessions, earnedBadges]);

  useEffect(() => {
    checkAndShowBadges();
  }, [checkAndShowBadges]);

  const stats = useMemo(() => {
    if (rounds.length === 0) {
      return {
        totalRounds: 0,
        avgScore: '-',
        bestScore: '-',
        avgPutts: '-',
        fairwayPct: '-',
      };
    }

    const totalScore = rounds.reduce((sum, r) => sum + r.totalScore, 0);
    const totalPutts = rounds.reduce((sum, r) => sum + r.totalPutts, 0);
    const totalFW = rounds.reduce((sum, r) => sum + r.fairwaysHit, 0);
    const totalFWPossible = rounds.reduce((sum, r) => sum + r.fairwaysPossible, 0);
    const best = Math.min(...rounds.map((r) => r.totalScore));

    return {
      totalRounds: rounds.length,
      avgScore: Math.round(totalScore / rounds.length),
      bestScore: best,
      avgPutts: Math.round(totalPutts / rounds.length),
      fairwayPct: totalFWPossible > 0 ? Math.round((totalFW / totalFWPossible) * 100) + '%' : '-',
    };
  }, [rounds]);

  const scoreTrendData = useMemo(() => {
    const sorted = [...rounds].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    return sorted.map((r) => ({
      label: new Date(r.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      value: r.totalScore,
    }));
  }, [rounds]);

  const puttsTrendData = useMemo(() => {
    const sorted = [...rounds].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    return sorted.map((r) => ({
      label: new Date(r.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      value: r.totalPutts,
    }));
  }, [rounds]);

  const avgCoursePar = useMemo(() => {
    if (rounds.length === 0) return undefined;
    return Math.round(rounds.reduce((sum, r) => sum + r.coursePar, 0) / rounds.length);
  }, [rounds]);

  // Combine earned badges with those that meet criteria now
  const allEarned = useMemo(() => {
    const result = [...earnedBadges];
    badges.forEach((badge) => {
      if (!result.some((eb) => eb.badgeId === badge.id) && badge.criteria(rounds, rangeSessions)) {
        result.push({ badgeId: badge.id, earnedAt: new Date().toISOString() });
      }
    });
    return result;
  }, [rounds, rangeSessions, earnedBadges]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Your golf progress at a glance</p>
      </div>

      {/* Stat cards row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        <StatCard label="Total Rounds" value={stats.totalRounds} icon="" />
        <StatCard label="Avg Score" value={stats.avgScore} />
        <StatCard label="Best Score" value={stats.bestScore} />
        <StatCard label="Avg Putts" value={stats.avgPutts} subtitle="per round" />
        <StatCard label="Fairway %" value={stats.fairwayPct} />
      </div>

      {/* Trend charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TrendChart
          data={scoreTrendData}
          title="Score Trend"
          referenceLine={avgCoursePar}
          referenceLabel="Par"
          color="#15803d"
        />
        <TrendChart
          data={puttsTrendData}
          title="Putts Per Round"
          color="#0369a1"
        />
      </div>

      {/* Badge showcase */}
      <Card>
        <BadgeDisplay
          rounds={rounds}
          rangeSessions={rangeSessions}
          earnedBadges={allEarned}
        />
      </Card>

      {/* Recent rounds */}
      <Card>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Recent Rounds</h2>
        <RoundHistory
          rounds={rounds.slice(-10)}
          onView={(round) => setViewingRound(round)}
          onDelete={(id) => deleteRound(id)}
        />
      </Card>

      {/* View round modal */}
      <Modal
        open={viewingRound !== null}
        onClose={() => setViewingRound(null)}
        title={viewingRound?.courseName ?? 'Round Details'}
      >
        {viewingRound && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">
              {new Date(viewingRound.date).toLocaleDateString()} &middot;{' '}
              {viewingRound.holes} holes &middot; Par {viewingRound.coursePar}
            </p>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-gray-500">Score</p>
                <p className="text-lg font-bold">{viewingRound.totalScore}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-gray-500">vs Par</p>
                <p className="text-lg font-bold">
                  {viewingRound.totalScore - viewingRound.coursePar > 0 ? '+' : ''}
                  {viewingRound.totalScore - viewingRound.coursePar}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-gray-500">Putts</p>
                <p className="text-lg font-bold">{viewingRound.totalPutts}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-gray-500">FW</p>
                <p className="text-lg font-bold">
                  {viewingRound.fairwaysPossible > 0
                    ? Math.round((viewingRound.fairwaysHit / viewingRound.fairwaysPossible) * 100) + '%'
                    : '-'}
                </p>
              </div>
            </div>

            <div className="mt-3">
              <div className="grid grid-cols-5 gap-1 text-xs font-semibold text-gray-500 uppercase px-1">
                <div className="text-center">Hole</div>
                <div className="text-center">Par</div>
                <div className="text-center">Score</div>
                <div className="text-center">Putts</div>
                <div className="text-center">FW</div>
              </div>
              <div className="max-h-60 overflow-y-auto mt-1 space-y-0.5">
                {viewingRound.scores.map((s) => {
                  const diff = s.score - s.par;
                  return (
                    <div
                      key={s.hole}
                      className={`grid grid-cols-5 gap-1 text-sm text-center py-1 rounded ${
                        diff < 0 ? 'bg-green-50' : diff > 1 ? 'bg-red-50' : ''
                      }`}
                    >
                      <div className="font-medium text-gray-600">{s.hole}</div>
                      <div className="text-gray-500">{s.par}</div>
                      <div className={`font-semibold ${diff < 0 ? 'text-green-700' : diff > 0 ? 'text-red-600' : 'text-gray-800'}`}>
                        {s.score || '-'}
                      </div>
                      <div className="text-gray-600">{s.putts || '-'}</div>
                      <div className="text-gray-600">
                        {s.fairwayHit === null ? '-' : s.fairwayHit ? 'Y' : 'N'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Celebration modal */}
      <Modal
        open={showCelebration}
        onClose={() => setShowCelebration(false)}
        title="Badge Unlocked!"
      >
        <div className="text-center space-y-4 py-4">
          <div className="relative inline-block">
            <div className="celebration-confetti" />
            <span className="text-6xl block animate-bounce">
              {badges.find((b) => b.name === newBadgeNames[0])?.icon ?? ''}
            </span>
          </div>
          {newBadgeNames.map((name) => (
            <p key={name} className="text-lg font-bold text-green-800">
              {name}
            </p>
          ))}
          <p className="text-sm text-gray-500">Congratulations on your achievement!</p>
          <Button onClick={() => setShowCelebration(false)}>Continue</Button>
        </div>
        <style>{`
          .celebration-confetti {
            position: absolute;
            inset: -40px;
            pointer-events: none;
          }
          .celebration-confetti::before,
          .celebration-confetti::after {
            content: '';
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            animation: confetti-fall 1.5s ease-out forwards;
          }
          .celebration-confetti::before {
            background: #22c55e;
            left: 20%;
            animation-delay: 0s;
          }
          .celebration-confetti::after {
            background: #f59e0b;
            right: 20%;
            animation-delay: 0.2s;
          }
          @keyframes confetti-fall {
            0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(60px) rotate(720deg); opacity: 0; }
          }
        `}</style>
      </Modal>
    </div>
  );
}
