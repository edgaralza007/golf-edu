export interface RuleItem {
  id: string;
  title: string;
  icon: string;
  summary: string;
  details: string[];
  penaltyStrokes?: number;
  tip?: string;
}

export interface EtiquetteItem {
  id: string;
  title: string;
  icon: string;
  summary: string;
  details: string[];
  tip?: string;
}

export const rules: RuleItem[] = [
  {
    id: 'scoring',
    title: 'Scoring Basics',
    icon: '\ud83c\udfd3',
    summary:
      'How golf scoring works: par, birdies, bogeys, and counting strokes.',
    details: [
      'Par is the expected number of strokes for a skilled golfer to complete a hole. Par 3 holes are short (under ~250 yards), Par 4 holes are medium (250\u2013470 yards), and Par 5 holes are long (471+ yards).',
      'Your score is counted as strokes relative to par: Birdie = 1 under par (-1), Eagle = 2 under par (-2), Ace (hole in one) = completing the hole in a single stroke.',
      'Over par scores: Bogey = 1 over par (+1), Double Bogey = 2 over par (+2), Triple Bogey = 3 over par (+3).',
      'Count every stroke, including penalty strokes. A whiff (swing and miss) counts as a stroke. Practice swings do not count.',
      'At the end of the round, add up all strokes across 18 holes. A typical course par is 72, so a score of 90 means you shot 18 over par.',
    ],
    tip: 'As a beginner, don\'t worry about your total score. Focus on improving one hole at a time. Many courses offer a "max score" rule to keep pace: pick up after double par.',
  },
  {
    id: 'out-of-bounds',
    title: 'Out of Bounds (White Stakes)',
    icon: '\ud83d\udea9',
    summary:
      'What happens when your ball goes past the white stakes or boundary lines.',
    details: [
      'Out of bounds (OB) is marked by white stakes or white lines. Your ball is OB when the entire ball lies beyond the boundary.',
      'Traditional penalty: Stroke-and-distance. Go back to where you played the original shot, add 1 penalty stroke, and play again. If you hit your tee shot OB, you are now hitting your 3rd stroke from the tee.',
      'Local rule alternative (commonly used): Drop near where the ball went OB, within 2 club lengths of the fairway edge no nearer the hole, and add 2 penalty strokes. This speeds up play.',
      'Always check with the course whether they use the local OB rule before your round.',
    ],
    penaltyStrokes: 1,
    tip: 'If you think your ball might be OB, hit a provisional ball from the same spot. This saves time if you can\'t find the original.',
  },
  {
    id: 'water-hazards',
    title: 'Water Hazards (Penalty Areas)',
    icon: '\ud83d\udca7',
    summary:
      'Yellow stakes and red stakes mark different types of penalty areas with different relief options.',
    details: [
      'Yellow penalty areas (yellow stakes/lines): You can replay from where you last played, or drop behind the hazard keeping the point where the ball crossed the hazard edge between you and the hole. 1 penalty stroke.',
      'Red penalty areas (red stakes/lines): In addition to the yellow hazard options, you can drop within 2 club lengths of where the ball last crossed the hazard edge, no nearer the hole. 1 penalty stroke.',
      'You are always allowed to play the ball from inside the penalty area without penalty if you can reach it.',
      'When dropping, the ball must be dropped from knee height and land within the relief area.',
    ],
    penaltyStrokes: 1,
    tip: 'Red stakes offer more relief options than yellow. When you see water, identify the stake color first so you know your options.',
  },
  {
    id: 'lost-ball',
    title: 'Lost Ball',
    icon: '\ud83d\udd0d',
    summary:
      'What to do when you cannot find your ball and how provisional balls work.',
    details: [
      'You have 3 minutes to search for your ball. After that, it is officially lost.',
      'If your ball is lost (outside a penalty area), the penalty is the same as out of bounds: stroke and distance. Return to where you last played and add 1 penalty stroke.',
      'Provisional ball: If you think your ball might be lost or OB, announce "I\'m hitting a provisional" and play another ball from the same spot. If you find your original, pick up the provisional. If the original is lost, continue with the provisional (which is now your ball in play with the penalty included).',
      'A provisional saves a trip back to the original spot. Always hit one when in doubt.',
    ],
    penaltyStrokes: 1,
    tip: 'Always carry a spare ball in your pocket so you can quickly hit a provisional without searching your bag.',
  },
  {
    id: 'unplayable-lie',
    title: 'Unplayable Lie',
    icon: '\ud83c\udf33',
    summary:
      'When your ball is in a position where you cannot or do not want to play it.',
    details: [
      'You can declare your ball unplayable anywhere on the course except in a penalty area. This costs 1 penalty stroke.',
      'Option 1 (stroke and distance): Go back to where you played the previous shot and play from there.',
      'Option 2 (back-on-the-line): Keep the point where the ball lies between you and the hole, go as far back as you want on that line, and drop.',
      'Option 3 (lateral relief): Drop within 2 club lengths of where the ball lies, no nearer the hole.',
      'Choose the option that gives you the best next shot. Sometimes going back is better than a lateral drop.',
    ],
    penaltyStrokes: 1,
    tip: 'If your ball is stuck behind a tree, the lateral relief option (2 club lengths) often gives you the best angle for your next shot.',
  },
  {
    id: 'drop-procedures',
    title: 'Drop Procedures',
    icon: '\u2b07\ufe0f',
    summary:
      'How to properly drop a ball when taking relief from hazards or unplayable lies.',
    details: [
      'Hold the ball at knee height with an outstretched arm and let it fall. The ball must be dropped from knee height (the height of your knee when standing).',
      'The ball must come to rest within the designated relief area. If it rolls outside the relief area, drop again. If it rolls out a second time, place the ball where it hit the ground on the second drop.',
      'The relief area is typically 1 or 2 club lengths from a reference point (depending on the rule), no nearer the hole.',
      'You can use any club in your bag to measure club lengths. Most golfers use their driver for the longest measurement.',
    ],
    tip: 'Practice the knee-height drop at home so it feels natural on the course. It replaced the old shoulder-height rule in 2019.',
  },
];

export const etiquette: EtiquetteItem[] = [
  {
    id: 'pace-of-play',
    title: 'Pace of Play',
    icon: '\u23f1\ufe0f',
    summary:
      'Keep play moving to be courteous to everyone on the course.',
    details: [
      'A round of 18 holes should take about 4 hours to 4 hours 30 minutes. Slower play backs up the entire course.',
      'Play "ready golf": whoever is ready first should hit, rather than strictly following "farthest from the hole plays first" (except on the green).',
      'Be prepared before your turn: select your club, assess your shot, and take your practice swing while others are playing (safely away from them).',
      'If your group falls behind and there is a gap in front of you, let faster groups play through. Signal them by waving.',
      'Limit yourself to one practice swing, then hit. Save extended warm-ups for the range.',
    ],
    tip: 'A simple test: if there is an open hole in front of you, your group should be playing faster or letting others through.',
  },
  {
    id: 'divot-repair',
    title: 'Divot & Ball Mark Repair',
    icon: '\ud83e\ude78',
    summary:
      'Repair the course as you go: fix divots on the fairway and ball marks on the green.',
    details: [
      'Fairway divots: Replace the chunk of turf back into the divot hole and press it down with your foot. If the course provides sand/seed mix on the carts, fill the divot with that instead.',
      'Ball marks on the green: Use a divot repair tool (or a tee). Insert it at the edges of the ball mark at an angle pointing toward the center. Gently push the turf inward from all sides. Do NOT pry upward, as this tears the roots.',
      'Smooth the repaired area with your putter head.',
      'Repair your own marks and at least one other while you wait for your turn to putt. This keeps greens in top condition for everyone.',
    ],
    tip: 'A properly repaired ball mark heals in 2\u20133 days. An unrepaired mark can take 2\u20133 weeks and leaves a scar on the putting surface.',
  },
  {
    id: 'flagstick',
    title: 'Flagstick & Green Etiquette',
    icon: '\u26f3',
    summary:
      'How to handle the flagstick and conduct yourself on the putting green.',
    details: [
      'Under current rules (since 2019), you may leave the flagstick in the hole while putting. There is no penalty for hitting it.',
      'If another player asks you to tend the flagstick (hold it and remove it as their ball approaches), do so. Stand to the side so your shadow does not cross their line.',
      'Remove the flagstick once everyone is on the green if the group prefers it out. Place it gently on the green, not tossing it.',
      'Never step on the line between another player\'s ball and the hole. Walk around.',
      'Mark your ball on the green with a coin or marker behind it. Lift and clean if needed. Replace it precisely before putting.',
    ],
    tip: 'Studies suggest leaving the flagstick in can help on long putts, as the stick can act as a backstop.',
  },
  {
    id: 'cart-rules',
    title: 'Cart Rules',
    icon: '\ud83d\ude97',
    summary:
      'Where and how to drive the golf cart on the course.',
    details: [
      '"Cart path only" (CPO): On wet days or when signs indicate, keep the cart on the paved path at all times. Walk to your ball with a few clubs.',
      '90-degree rule: Drive on the cart path until you are even with your ball, then turn 90 degrees onto the fairway, go to your ball, hit, and return the same way.',
      'Never drive carts onto tee boxes, greens, or within the marked "no cart" zones around greens.',
      'Park the cart to the side of the green nearest the next tee, so you can quickly move on after finishing the hole.',
      'Set the parking brake when stopped on slopes. Keep your speed reasonable.',
    ],
    tip: 'When the course is on "cart path only," bring 3\u20134 clubs with you to your ball so you only need one trip.',
  },
  {
    id: 'on-course-behavior',
    title: 'On-Course Behavior',
    icon: '\ud83e\udd2b',
    summary:
      'How to conduct yourself during play: quiet, positioning, bunkers, and more.',
    details: [
      'Stand still and be quiet when someone is making a stroke. No talking, rustling, or movement in their peripheral vision.',
      'Position yourself to the side and slightly behind the player, never directly behind or in front of them.',
      'If your ball is heading toward other players, shout "FORE!" immediately and loudly. This is a safety warning, not optional.',
      'After hitting from a bunker, rake the sand smooth. Rake footprints, divots, and the area around your shot. Leave the rake outside the bunker (handle parallel to the fairway).',
      'Leave the course in better shape than you found it: pick up broken tees, fill divots, repair ball marks.',
    ],
    tip: 'If you hear "FORE!" cover your head with your arms and turn away from the direction of the shout. Do not look up to find the ball.',
  },
  {
    id: 'dress-code',
    title: 'Dress Code',
    icon: '\ud83d\udc55',
    summary:
      'What to wear on the golf course to meet typical dress code requirements.',
    details: [
      'Most courses require a collared shirt (polo). Some upscale courses require tucked-in shirts.',
      'Pants, chinos, or golf shorts are standard. Denim / jeans are typically not allowed.',
      'Golf shoes with soft spikes are preferred. Many courses do not allow metal spikes. Athletic shoes may be acceptable at public courses.',
      'Hats are welcome, but wear them forward-facing. Remove hats indoors (clubhouse).',
      'Avoid tank tops, swimwear, cut-offs, and flip-flops. When in doubt, check the course\'s website before your round.',
    ],
    tip: 'A safe default outfit: collared polo, khaki shorts or pants, belt, and athletic golf shoes. This works at nearly every course.',
  },
];
