import { useState, useCallback } from 'react';
import { useUser } from '../context/UserContext';
import { Card, Button, Modal, Tabs } from '../components/ui';
import { NewRoundForm } from '../components/scoring/NewRoundForm';
import { Scorecard } from '../components/scoring/Scorecard';
import { RangeSessionForm } from '../components/scoring/RangeSessionForm';
import { RoundHistory } from '../components/scoring/RoundHistory';
import { badges } from '../data/badges';
import type { HoleScore, Round } from '../types';

type ViewMode = 'round' | 'range';
type TrackerState = 'idle' | 'new-round-form' | 'scoring' | 'range-form';

interface ActiveRound {
  date: string;
  courseName: string;
  holes: 9 | 18;
  coursePar: number;
  scores: HoleScore[];
}

function buildInitialScores(holes: 9 | 18, coursePar: number): HoleScore[] {
  const defaultPar = Math.round(coursePar / holes);
  return Array.from({ length: holes }, (_, i) => ({
    hole: i + 1,
    par: defaultPar >= 3 && defaultPar <= 5 ? defaultPar : 4,
    score: 0,
    putts: 0,
    fairwayHit: defaultPar === 3 ? null : false,
  }));
}

export function ScoreTracker() {
  const { user, addRound, deleteRound, addRangeSession } = useUser();
  const [viewMode, setViewMode] = useState<ViewMode>('round');
  const [state, setState] = useState<TrackerState>('idle');
  const [activeRound, setActiveRound] = useState<ActiveRound | null>(null);
  const [viewingRound, setViewingRound] = useState<Round | null>(null);
  const [newBadgeNames, setNewBadgeNames] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const checkNewBadges = useCallback(
    (rounds: Round[], rangeSessions: typeof user.rangeSessions) => {
      const newlyEarned: string[] = [];
      badges.forEach((badge) => {
        const alreadyEarned = user.earnedBadges.some((eb) => eb.badgeId === badge.id);
        if (!alreadyEarned && badge.criteria(rounds, rangeSessions)) {
          newlyEarned.push(badge.name);
        }
      });
      return newlyEarned;
    },
    [user.earnedBadges]
  );

  const handleStartRound = (data: {
    date: string;
    courseName: string;
    holes: 9 | 18;
    coursePar: number;
  }) => {
    setActiveRound({
      ...data,
      scores: buildInitialScores(data.holes, data.coursePar),
    });
    setState('scoring');
  };

  const handleSaveRound = () => {
    if (!activeRound) return;
    const scores = activeRound.scores;
    const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
    const totalPutts = scores.reduce((sum, s) => sum + s.putts, 0);
    const fairwayHoles = scores.filter((s) => s.fairwayHit !== null);
    const fairwaysHit = fairwayHoles.filter((s) => s.fairwayHit === true).length;

    const newRound: Omit<Round, 'id'> = {
      date: activeRound.date,
      courseName: activeRound.courseName,
      holes: activeRound.holes,
      coursePar: activeRound.coursePar,
      scores,
      totalScore,
      totalPutts,
      fairwaysHit,
      fairwaysPossible: fairwayHoles.length,
    };

    addRound(newRound);

    const updatedRounds = [...user.rounds, { ...newRound, id: 'temp' }] as Round[];
    const earned = checkNewBadges(updatedRounds, user.rangeSessions);
    if (earned.length > 0) {
      setNewBadgeNames(earned);
      setShowCelebration(true);
    }

    setActiveRound(null);
    setState('idle');
  };

  const handleSaveRangeSession = (session: {
    date: string;
    ballsHit: number;
    focusArea: string;
    notes: string;
  }) => {
    addRangeSession(session);

    const updatedSessions = [...user.rangeSessions, { ...session, id: 'temp' }];
    const earned = checkNewBadges(user.rounds, updatedSessions);
    if (earned.length > 0) {
      setNewBadgeNames(earned);
      setShowCelebration(true);
    }

    setState('idle');
  };

  const tabs = [
    { id: 'round', label: 'New Round' },
    { id: 'range', label: 'Range Session' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Score Tracker</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Log rounds and practice sessions</p>
      </div>

      {state === 'idle' && (
        <>
          <Tabs
            tabs={tabs}
            activeTab={viewMode}
            onChange={(id) => setViewMode(id as ViewMode)}
          />

          {viewMode === 'round' && (
            <div className="space-y-4">
              <Button onClick={() => setState('new-round-form')} className="w-full" size="lg">
                + New Round
              </Button>
              <Card>
                <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Past Rounds</h2>
                <RoundHistory
                  rounds={user.rounds}
                  onView={(round) => setViewingRound(round)}
                  onDelete={(id) => deleteRound(id)}
                />
              </Card>
            </div>
          )}

          {viewMode === 'range' && (
            <div className="space-y-4">
              <Button onClick={() => setState('range-form')} className="w-full" size="lg">
                + Log Range Session
              </Button>
              <Card>
                <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Past Range Sessions</h2>
                {user.rangeSessions.length === 0 ? (
                  <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-6">
                    No range sessions yet
                  </p>
                ) : (
                  <div className="space-y-2">
                    {[...user.rangeSessions]
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((session) => (
                        <div
                          key={session.id}
                          className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-700"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                              {session.focusArea} - {session.ballsHit} balls
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                              {new Date(session.date).toLocaleDateString()}
                              {session.notes && ` - ${session.notes}`}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </Card>
            </div>
          )}
        </>
      )}

      {state === 'new-round-form' && (
        <Card>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Start New Round</h2>
          <NewRoundForm
            onStart={handleStartRound}
            onCancel={() => setState('idle')}
          />
        </Card>
      )}

      {state === 'scoring' && activeRound && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {activeRound.courseName}
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {activeRound.holes} holes &middot; Par {activeRound.coursePar}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => { setActiveRound(null); setState('idle'); }}>
              Cancel
            </Button>
          </div>

          <Scorecard
            scores={activeRound.scores}
            onChange={(scores) => setActiveRound({ ...activeRound, scores })}
            coursePar={activeRound.coursePar}
          />

          <Button onClick={handleSaveRound} className="w-full" size="lg">
            Save Round
          </Button>
        </div>
      )}

      {state === 'range-form' && (
        <Card>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Log Range Session</h2>
          <RangeSessionForm
            onSave={handleSaveRangeSession}
            onCancel={() => setState('idle')}
          />
        </Card>
      )}

      {/* View round modal */}
      <Modal
        open={viewingRound !== null}
        onClose={() => setViewingRound(null)}
        title={viewingRound?.courseName ?? 'Round Details'}
      >
        {viewingRound && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(viewingRound.date).toLocaleDateString()} &middot;{' '}
              {viewingRound.holes} holes &middot; Par {viewingRound.coursePar}
            </p>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">Score</p>
                <p className="text-lg font-bold">{viewingRound.totalScore}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">vs Par</p>
                <p className="text-lg font-bold">
                  {viewingRound.totalScore - viewingRound.coursePar > 0 ? '+' : ''}
                  {viewingRound.totalScore - viewingRound.coursePar}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">Putts</p>
                <p className="text-lg font-bold">{viewingRound.totalPutts}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">FW</p>
                <p className="text-lg font-bold">
                  {viewingRound.fairwaysPossible > 0
                    ? Math.round((viewingRound.fairwaysHit / viewingRound.fairwaysPossible) * 100) + '%'
                    : '-'}
                </p>
              </div>
            </div>

            <div className="mt-3">
              <div className="grid grid-cols-5 gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase px-1">
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
                        diff < 0 ? 'bg-green-50 dark:bg-green-900/30' : diff > 1 ? 'bg-red-50 dark:bg-red-900/30' : ''
                      }`}
                    >
                      <div className="font-medium text-gray-600 dark:text-gray-400">{s.hole}</div>
                      <div className="text-gray-500 dark:text-gray-400">{s.par}</div>
                      <div className={`font-semibold ${diff < 0 ? 'text-green-700 dark:text-green-400' : diff > 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-gray-200'}`}>
                        {s.score || '-'}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">{s.putts || '-'}</div>
                      <div className="text-gray-600 dark:text-gray-400">
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
            <p key={name} className="text-lg font-bold text-green-800 dark:text-green-300">
              {name}
            </p>
          ))}
          <p className="text-sm text-gray-500 dark:text-gray-400">Congratulations on your achievement!</p>
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
