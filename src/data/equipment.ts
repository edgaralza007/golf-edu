export type ClubCategory = 'wood' | 'hybrid' | 'iron' | 'wedge' | 'putter';
export type Difficulty = 'easy' | 'moderate' | 'hard';
export type BudgetTier = 'starter' | 'intermediate' | 'premium';

export interface ClubType {
  id: string;
  name: string;
  category: ClubCategory;
  description: string;
  usage: string;
  beginnerDistance: string;
  difficulty: Difficulty;
  loftDegrees: number;
  tip: string;
}

export interface BudgetRecommendation {
  tier: BudgetTier;
  label: string;
  price: string;
  clubs: string[];
  extras: string[];
  summary: string;
  bestFor: string;
}

export interface ClubPart {
  id: string;
  name: string;
  description: string;
}

export const clubTypes: ClubType[] = [
  {
    id: 'driver',
    name: 'Driver',
    category: 'wood',
    description: 'The biggest club in the bag, designed for maximum distance off the tee.',
    usage: 'Tee shots on par-4s and par-5s',
    beginnerDistance: '200-230 yds',
    difficulty: 'moderate',
    loftDegrees: 10,
    tip: 'Tee the ball high so half the ball sits above the clubhead at address.',
  },
  {
    id: '3-wood',
    name: '3-Wood',
    category: 'wood',
    description: 'A smaller-headed wood useful off the fairway or tee when accuracy matters more than max distance.',
    usage: 'Fairway shots or tee shots on tight holes',
    beginnerDistance: '180-210 yds',
    difficulty: 'hard',
    loftDegrees: 15,
    tip: 'Beginners should focus on sweeping the ball rather than hitting down on it.',
  },
  {
    id: '5-wood',
    name: '5-Wood',
    category: 'wood',
    description: 'Higher-lofted wood that is easier to hit than a 3-wood. Great for long approach shots.',
    usage: 'Fairway or tee shots',
    beginnerDistance: '170-200 yds',
    difficulty: 'moderate',
    loftDegrees: 18,
    tip: 'A 5-wood is often more forgiving than a 3-wood -- consider making it your go-to fairway club.',
  },
  {
    id: '4-hybrid',
    name: '4-Hybrid',
    category: 'hybrid',
    description: 'Combines the best of irons and woods. Easier to hit from rough and tight lies.',
    usage: 'Versatile long approach shots',
    beginnerDistance: '160-180 yds',
    difficulty: 'easy',
    loftDegrees: 22,
    tip: 'Hybrids are much more forgiving than long irons. Swing them like an iron, not a wood.',
  },
  {
    id: '5-iron',
    name: '5-Iron',
    category: 'iron',
    description: 'A mid-long iron for approach shots into par-4s and par-5s.',
    usage: 'Long approach shots',
    beginnerDistance: '140-160 yds',
    difficulty: 'hard',
    loftDegrees: 27,
    tip: 'Many beginners replace the 5-iron with a 5-hybrid for more forgiveness.',
  },
  {
    id: '6-iron',
    name: '6-Iron',
    category: 'iron',
    description: 'A mid-iron that bridges the gap between long and short irons.',
    usage: 'Mid-range approach shots',
    beginnerDistance: '130-150 yds',
    difficulty: 'moderate',
    loftDegrees: 30,
    tip: 'Focus on making solid contact in the center of the clubface rather than swinging hard.',
  },
  {
    id: '7-iron',
    name: '7-Iron',
    category: 'iron',
    description: 'The quintessential mid-iron. Most beginners learn to swing with a 7-iron first.',
    usage: 'Mid-range approach shots',
    beginnerDistance: '120-140 yds',
    difficulty: 'moderate',
    loftDegrees: 34,
    tip: 'The 7-iron is the best club to practice with as a beginner -- it teaches good fundamentals.',
  },
  {
    id: '8-iron',
    name: '8-Iron',
    category: 'iron',
    description: 'A short iron with more loft, producing higher shots that stop faster on the green.',
    usage: 'Short approach shots',
    beginnerDistance: '110-130 yds',
    difficulty: 'easy',
    loftDegrees: 38,
    tip: 'Let the club loft do the work. No need to try to scoop the ball into the air.',
  },
  {
    id: '9-iron',
    name: '9-Iron',
    category: 'iron',
    description: 'High-lofted short iron for precise approach shots.',
    usage: 'Short approach shots',
    beginnerDistance: '100-120 yds',
    difficulty: 'easy',
    loftDegrees: 42,
    tip: 'A great club for controlled, higher shots into the green.',
  },
  {
    id: 'pw',
    name: 'Pitching Wedge',
    category: 'wedge',
    description: 'The workhorse wedge for short approach shots and chipping around the green.',
    usage: 'Short approach shots and chipping',
    beginnerDistance: '90-110 yds',
    difficulty: 'easy',
    loftDegrees: 46,
    tip: 'Use a putting-style stroke with your pitching wedge for simple chips from just off the green.',
  },
  {
    id: 'sw',
    name: 'Sand Wedge',
    category: 'wedge',
    description: 'Designed with a wide sole to glide through sand. Essential for bunker play.',
    usage: 'Bunker shots and short pitches',
    beginnerDistance: '60-80 yds',
    difficulty: 'moderate',
    loftDegrees: 56,
    tip: 'In bunkers, aim to hit the sand 1-2 inches behind the ball -- let the sand lift the ball out.',
  },
  {
    id: 'lw',
    name: 'Lob Wedge',
    category: 'wedge',
    description: 'The highest-lofted wedge for extreme situations -- getting over obstacles or stopping quickly.',
    usage: 'High, short shots over obstacles',
    beginnerDistance: '40-60 yds',
    difficulty: 'hard',
    loftDegrees: 60,
    tip: 'Beginners should avoid the lob wedge until comfortable with the sand wedge. It is easy to skull.',
  },
  {
    id: 'putter',
    name: 'Putter',
    category: 'putter',
    description: 'Used on the green to roll the ball into the hole. The most-used club in every round.',
    usage: 'On and around the green',
    beginnerDistance: 'N/A',
    difficulty: 'easy',
    loftDegrees: 3,
    tip: 'Keep your eyes directly over the ball and make a pendulum stroke with your shoulders, not your wrists.',
  },
];

export const budgetRecommendations: BudgetRecommendation[] = [
  {
    tier: 'starter',
    label: '$150 Budget',
    price: '$150',
    clubs: ['Driver', '5-Wood', '5-Iron', '7-Iron', '9-Iron', 'Pitching Wedge', 'Putter'],
    extras: ['Dozen used golf balls', 'Pack of tees', 'Used or borrowed bag'],
    summary: 'A used starter set is the best value if you are trying golf for the first time. Check local pro shops, garage sales, and online marketplaces.',
    bestFor: 'Best for trying golf without a big commitment',
  },
  {
    tier: 'intermediate',
    label: '$300 Budget',
    price: '$300',
    clubs: ['Driver', '3-Wood', '5-Hybrid', '6-Iron', '7-Iron', '8-Iron', '9-Iron', 'Pitching Wedge', 'Sand Wedge', 'Putter'],
    extras: ['Carry or stand bag included', 'Headcovers for woods', 'Dozen new golf balls'],
    summary: 'A new box set like the Callaway Strata or Wilson SGI gives you everything you need in one purchase. Solid quality for learning.',
    bestFor: 'Good if you are committed to learning the game',
  },
  {
    tier: 'premium',
    label: '$500+ Budget',
    price: '$500+',
    clubs: ['Driver', '3-Wood', '5-Wood', '4-Hybrid', '5-Iron through 9-Iron', 'Pitching Wedge', 'Sand Wedge', 'Lob Wedge', 'Putter'],
    extras: ['Quality stand or cart bag', 'Custom fitting recommended', 'Premium golf balls', 'Glove and accessories'],
    summary: 'Mix new mid-range clubs or find a lightly used name-brand set. At this price, a basic club fitting helps ensure the right shaft flex and lie angle for your swing.',
    bestFor: 'For players who want to invest in quality equipment',
  },
];

export const clubParts: ClubPart[] = [
  { id: 'grip', name: 'Grip', description: 'The rubber or synthetic handle where you hold the club. Replace when worn smooth.' },
  { id: 'shaft', name: 'Shaft', description: 'The long tube connecting the grip to the head. Comes in steel (heavier, more control) or graphite (lighter, more speed).' },
  { id: 'hosel', name: 'Hosel', description: 'The socket where the shaft connects to the clubhead. The angle here affects the lie of the club.' },
  { id: 'clubhead', name: 'Clubhead', description: 'The weighted bottom of the club that strikes the ball. Larger heads are more forgiving.' },
  { id: 'face', name: 'Club Face', description: 'The flat striking surface of the clubhead. The angle of the face (loft) determines how high and far the ball goes.' },
  { id: 'grooves', name: 'Grooves', description: 'The horizontal lines on the club face that create spin and channel away moisture for consistent contact.' },
  { id: 'toe', name: 'Toe', description: 'The outer end of the clubhead, farthest from the shaft. Hits here tend to go right (for right-handers).' },
  { id: 'heel', name: 'Heel', description: 'The inner end of the clubhead, closest to the shaft. Hits here tend to go left (for right-handers).' },
  { id: 'sole', name: 'Sole', description: 'The bottom of the clubhead that rests on the ground. A wider sole helps the club glide and prevents digging.' },
  { id: 'leading-edge', name: 'Leading Edge', description: 'The front bottom edge of the clubface where it meets the sole. Important for clean contact with the ball.' },
];

export const categoryColors: Record<ClubCategory, string> = {
  wood: '#3B82F6',
  hybrid: '#8B5CF6',
  iron: '#10B981',
  wedge: '#F59E0B',
  putter: '#EF4444',
};

export const categoryLabels: Record<ClubCategory, string> = {
  wood: 'Woods',
  hybrid: 'Hybrids',
  iron: 'Irons',
  wedge: 'Wedges',
  putter: 'Putter',
};

export const difficultyColors: Record<Difficulty, string> = {
  easy: 'green',
  moderate: 'amber',
  hard: 'navy',
};
