import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { UserState, UserPreferences, ScoreEntry, UserContextValue, OnboardingData, Round, RangeSession } from '../types';
import { loadUser, saveUser } from '../utils/storage';

const defaultState: UserState = {
  onboardingComplete: false,
  onboarding: {
    experience: '',
    hasClubs: '',
    goal: '',
    recommendedStart: '',
    emphasisAreas: [],
  },
  preferences: {
    experienceLevel: '',
    goals: [],
    practiceFrequency: '',
    handedness: '',
  },
  moduleProgress: [],
  scores: [],
  drillProgress: [],
  rounds: [],
  rangeSessions: [],
  earnedBadges: [],
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserState>(() => {
    const loaded = loadUser(defaultState);
    return {
      ...defaultState,
      ...loaded,
      rounds: loaded.rounds ?? [],
      rangeSessions: loaded.rangeSessions ?? [],
      earnedBadges: loaded.earnedBadges ?? [],
    };
  });

  useEffect(() => {
    saveUser(user);
  }, [user]);

  const completeOnboarding = useCallback((data: OnboardingData) => {
    setUser((prev) => ({ ...prev, onboardingComplete: true, onboarding: data }));
  }, []);

  const updatePreferences = useCallback((prefs: Partial<UserPreferences>) => {
    setUser((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, ...prefs },
    }));
  }, []);

  const updateModuleProgress = useCallback(
    (moduleId: string, lessonId: string, totalLessons: number) => {
      setUser((prev) => {
        const existing = prev.moduleProgress.find((m) => m.moduleId === moduleId);
        if (existing) {
          const lessonsCompleted = existing.lessonsCompleted.includes(lessonId)
            ? existing.lessonsCompleted
            : [...existing.lessonsCompleted, lessonId];
          return {
            ...prev,
            moduleProgress: prev.moduleProgress.map((m) =>
              m.moduleId === moduleId
                ? { ...m, lessonsCompleted, totalLessons, lastAccessedAt: new Date().toISOString() }
                : m
            ),
          };
        }
        return {
          ...prev,
          moduleProgress: [
            ...prev.moduleProgress,
            { moduleId, lessonsCompleted: [lessonId], totalLessons, lastAccessedAt: new Date().toISOString() },
          ],
        };
      });
    },
    []
  );

  const addScore = useCallback((score: Omit<ScoreEntry, 'id'>) => {
    setUser((prev) => ({
      ...prev,
      scores: [...prev.scores, { ...score, id: crypto.randomUUID() }],
    }));
  }, []);

  const updateDrillProgress = useCallback((drillId: string) => {
    setUser((prev) => {
      const existing = prev.drillProgress.find((d) => d.drillId === drillId);
      if (existing) {
        return {
          ...prev,
          drillProgress: prev.drillProgress.map((d) =>
            d.drillId === drillId
              ? { ...d, completedCount: d.completedCount + 1, lastPracticedAt: new Date().toISOString() }
              : d
          ),
        };
      }
      return {
        ...prev,
        drillProgress: [
          ...prev.drillProgress,
          { drillId, completedCount: 1, lastPracticedAt: new Date().toISOString() },
        ],
      };
    });
  }, []);

  const addRound = useCallback((round: Omit<Round, 'id'>) => {
    setUser((prev) => ({
      ...prev,
      rounds: [...prev.rounds, { ...round, id: crypto.randomUUID() }],
    }));
  }, []);

  const deleteRound = useCallback((roundId: string) => {
    setUser((prev) => ({
      ...prev,
      rounds: prev.rounds.filter((r) => r.id !== roundId),
    }));
  }, []);

  const addRangeSession = useCallback((session: Omit<RangeSession, 'id'>) => {
    setUser((prev) => ({
      ...prev,
      rangeSessions: [...prev.rangeSessions, { ...session, id: crypto.randomUUID() }],
    }));
  }, []);

  const deleteRangeSession = useCallback((sessionId: string) => {
    setUser((prev) => ({
      ...prev,
      rangeSessions: prev.rangeSessions.filter((s) => s.id !== sessionId),
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setUser(defaultState);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        completeOnboarding,
        updatePreferences,
        updateModuleProgress,
        addScore,
        updateDrillProgress,
        addRound,
        deleteRound,
        addRangeSession,
        deleteRangeSession,
        resetProgress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
}
