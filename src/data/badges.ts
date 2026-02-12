import type { BadgeDef, Round, RangeSession } from '../types';

export const badges: BadgeDef[] = [
  {
    id: 'first-round',
    name: 'First Round',
    description: 'Log your first round',
    icon: '\u{1F3CC}\uFE0F',
    criteria: (rounds: Round[]) => rounds.length >= 1,
  },
  {
    id: 'range-rat',
    name: 'Range Rat',
    description: 'Log 5 range sessions',
    icon: '\u{1F3AF}',
    criteria: (_rounds: Round[], rangeSessions: RangeSession[]) => rangeSessions.length >= 5,
  },
  {
    id: 'broke-120',
    name: 'Broke 120',
    description: 'Score under 120 on 18 holes',
    icon: '\u{1F4AF}',
    criteria: (rounds: Round[]) =>
      rounds.some((r) => r.holes === 18 && r.totalScore < 120),
  },
  {
    id: 'broke-110',
    name: 'Broke 110',
    description: 'Score under 110 on 18 holes',
    icon: '\u{1F525}',
    criteria: (rounds: Round[]) =>
      rounds.some((r) => r.holes === 18 && r.totalScore < 110),
  },
  {
    id: 'broke-100',
    name: 'Broke 100',
    description: 'Score under 100 on 18 holes',
    icon: '\u2B50',
    criteria: (rounds: Round[]) =>
      rounds.some((r) => r.holes === 18 && r.totalScore < 100),
  },
  {
    id: 'double-digits',
    name: 'Double Digits',
    description: 'Score under 100 (18 holes) or under 50 (9 holes)',
    icon: '\u{1F3C6}',
    criteria: (rounds: Round[]) =>
      rounds.some(
        (r) =>
          (r.holes === 18 && r.totalScore < 100) ||
          (r.holes === 9 && r.totalScore < 50)
      ),
  },
  {
    id: 'putting-pro',
    name: 'Putting Pro',
    description: 'Average under 36 putts per 18 holes (3+ rounds)',
    icon: '\u{1F3B3}',
    criteria: (rounds: Round[]) => {
      const eighteenHoleRounds = rounds.filter((r) => r.holes === 18);
      if (eighteenHoleRounds.length < 3) return false;
      const avgPutts =
        eighteenHoleRounds.reduce((sum, r) => sum + r.totalPutts, 0) /
        eighteenHoleRounds.length;
      return avgPutts < 36;
    },
  },
  {
    id: 'consistent-player',
    name: 'Consistent Player',
    description: 'Log 10 rounds',
    icon: '\u{1F4CA}',
    criteria: (rounds: Round[]) => rounds.length >= 10,
  },
  {
    id: 'first-birdie',
    name: 'First Birdie',
    description: 'Score a birdie (1 under par) on any hole',
    icon: '\u{1F985}',
    criteria: (rounds: Round[]) =>
      rounds.some((r) =>
        r.scores.some((s) => s.score > 0 && s.score === s.par - 1)
      ),
  },
  {
    id: 'improving',
    name: 'Improving',
    description: 'Last 3 rounds show decreasing scores',
    icon: '\u{1F4C8}',
    criteria: (rounds: Round[]) => {
      if (rounds.length < 3) return false;
      const sorted = [...rounds].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      const last3 = sorted.slice(-3);
      return last3[0].totalScore > last3[1].totalScore && last3[1].totalScore > last3[2].totalScore;
    },
  },
];
