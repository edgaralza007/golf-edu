export type Experience = 'never' | 'few-times' | 'regularly' | '';
export type ClubOwnership = 'no' | 'borrowing' | 'starter-set' | 'full-set' | '';
export type GolfGoal = 'fun-social' | 'fitness-outdoors' | 'competition-improvement' | '';

export interface OnboardingData {
  experience: Experience;
  hasClubs: ClubOwnership;
  goal: GolfGoal;
  recommendedStart: string;
  emphasisAreas: string[];
}

export interface UserPreferences {
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | '';
  goals: string[];
  practiceFrequency: string;
  handedness: 'right' | 'left' | '';
}

export interface ModuleProgress {
  moduleId: string;
  lessonsCompleted: string[];
  totalLessons: number;
  lastAccessedAt: string;
}

export interface ScoreEntry {
  id: string;
  date: string;
  course: string;
  holes: number;
  score: number;
  par: number;
  notes: string;
}

export interface DrillProgress {
  drillId: string;
  completedCount: number;
  lastPracticedAt: string;
}

export interface HoleScore {
  hole: number;
  par: number;
  score: number;
  putts: number;
  fairwayHit: boolean | null;
}

export interface Round {
  id: string;
  date: string;
  courseName: string;
  holes: 9 | 18;
  coursePar: number;
  scores: HoleScore[];
  totalScore: number;
  totalPutts: number;
  fairwaysHit: number;
  fairwaysPossible: number;
}

export interface RangeSession {
  id: string;
  date: string;
  ballsHit: number;
  focusArea: string;
  notes: string;
}

export interface BadgeDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: (rounds: Round[], rangeSessions: RangeSession[]) => boolean;
}

export interface UserState {
  onboardingComplete: boolean;
  onboarding: OnboardingData;
  preferences: UserPreferences;
  moduleProgress: ModuleProgress[];
  scores: ScoreEntry[];
  drillProgress: DrillProgress[];
  rounds: Round[];
  rangeSessions: RangeSession[];
  earnedBadges: { badgeId: string; earnedAt: string }[];
}

export interface UserContextValue {
  user: UserState;
  completeOnboarding: (data: OnboardingData) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  updateModuleProgress: (moduleId: string, lessonId: string, totalLessons: number) => void;
  addScore: (score: Omit<ScoreEntry, 'id'>) => void;
  updateDrillProgress: (drillId: string) => void;
  addRound: (round: Omit<Round, 'id'>) => void;
  deleteRound: (roundId: string) => void;
  addRangeSession: (session: Omit<RangeSession, 'id'>) => void;
  deleteRangeSession: (sessionId: string) => void;
  resetProgress: () => void;
}
