export type DrillCategory =
  | 'putting'
  | 'distance-control'
  | 'grip-setup'
  | 'chipping'
  | 'full-swing'
  | 'alignment';

export type DrillLocation = 'home' | 'range' | 'putting-green' | 'course';

export interface Drill {
  id: string;
  name: string;
  description: string;
  category: DrillCategory;
  difficulty: 1 | 2 | 3;
  estimatedMinutes: number;
  equipment: string[];
  location: DrillLocation;
  steps: string[];
  successCriteria: string;
  illustration: string;
  relatedSwingType?: string;
}

export const CATEGORY_LABELS: Record<DrillCategory, string> = {
  putting: 'Putting',
  'distance-control': 'Distance Control',
  'grip-setup': 'Grip & Setup',
  chipping: 'Chipping',
  'full-swing': 'Full Swing',
  alignment: 'Alignment',
};

export const LOCATION_LABELS: Record<DrillLocation, string> = {
  home: 'Home',
  range: 'Range',
  'putting-green': 'Putting Green',
  course: 'Course',
};

export const LOCATION_ICONS: Record<DrillLocation, string> = {
  home: '\u{1F3E0}',
  range: '\u{1F3AF}',
  'putting-green': '\u{1F6A9}',
  course: '\u26F3',
};

export const DIFFICULTY_LABELS: Record<1 | 2 | 3, string> = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Advanced',
};

export const drills: Drill[] = [
  // === PUTTING (3) ===
  {
    id: 'gate-drill',
    name: 'Gate Drill',
    description:
      'Place two tees just wider than your putter head and practice putting through the gate. This trains a square putter face at impact for straighter putts.',
    category: 'putting',
    difficulty: 1,
    estimatedMinutes: 10,
    equipment: ['Putter', '3 golf balls', '4 tees'],
    location: 'putting-green',
    steps: [
      'Place two tees in the ground about 1 inch wider than your putter head, roughly 2 feet in front of a hole.',
      'Set up with a ball behind the tee gate.',
      'Make a smooth putting stroke, sending the ball cleanly through the gate.',
      'Focus on keeping the putter face square through impact.',
      'Repeat with each ball. If you hit a tee, slow down and focus on your stroke path.',
      'Once comfortable, move the gate closer together to tighten your accuracy.',
    ],
    successCriteria:
      'Putt 10 consecutive balls through the gate without hitting either tee.',
    illustration: '\u{1F3CC}\uFE0F Putter gliding through a gate of two tees',
    relatedSwingType: 'putting-stroke',
  },
  {
    id: 'distance-ladder',
    name: 'Distance Ladder',
    description:
      'Putt to targets at increasing distances to develop feel for pace and distance control on the greens.',
    category: 'putting',
    difficulty: 2,
    estimatedMinutes: 15,
    equipment: ['Putter', '5 golf balls', '4 tees as markers'],
    location: 'putting-green',
    steps: [
      'Place tee markers at 3 feet, 6 feet, 10 feet, and 15 feet from your starting position.',
      'Start with all 5 balls at the closest distance (3 feet). Putt each one.',
      'Move to the 6-foot marker and putt all 5 balls.',
      'Continue to the 10-foot and 15-foot markers.',
      'Focus on consistent backswing length for each distance rather than hitting harder.',
      'After completing the ladder forward, work backwards from 15 feet to 3 feet.',
    ],
    successCriteria:
      'Get at least 3 out of 5 putts within 1 foot of the target at each distance.',
    illustration: '\u{1F4CF} Balls rolling to markers at increasing distances',
  },
  {
    id: 'clock-drill',
    name: 'Clock Drill',
    description:
      'Place 12 balls around the hole at 3 feet like clock positions. Make all 12 to build confidence and read subtle breaks from every angle.',
    category: 'putting',
    difficulty: 3,
    estimatedMinutes: 20,
    equipment: ['Putter', '12 golf balls'],
    location: 'putting-green',
    steps: [
      'Find a relatively flat area on the putting green with a hole.',
      'Place 12 balls evenly spaced around the hole at 3-foot distance, like clock positions.',
      'Start at the 12 o\'clock position and putt.',
      'Move clockwise to the 1 o\'clock ball and continue around.',
      'If you miss any putt, start over from the beginning.',
      'Pay attention to how the ball breaks differently from each position.',
    ],
    successCriteria:
      'Make all 12 putts in a row without missing. If you miss, start over.',
    illustration: '\u{1F55B} 12 balls arranged in a clock pattern around the hole',
  },

  // === DISTANCE CONTROL (3) ===
  {
    id: 'half-swing-drill',
    name: 'Half-Swing Drill',
    description:
      'Hit shots using only a half backswing to learn how swing length controls distance. Great for building a consistent base swing.',
    category: 'distance-control',
    difficulty: 1,
    estimatedMinutes: 15,
    equipment: ['7-iron', 'Range balls'],
    location: 'range',
    steps: [
      'Set up to a ball with your 7-iron in your normal stance.',
      'Take the club back only to waist height (arms parallel to the ground).',
      'Swing through to a matching finish position (waist height on follow-through).',
      'Note where the ball lands. This is your half-swing distance.',
      'Hit 10 more balls trying to land them all in the same area.',
      'Focus on keeping the same tempo and length for every swing.',
    ],
    successCriteria:
      'Land 7 out of 10 balls within a 10-yard radius of each other.',
    illustration: '\u{1F3CC}\uFE0F Club stopping at waist height on backswing',
    relatedSwingType: 'iron-swing',
  },
  {
    id: 'tempo-counter',
    name: 'Tempo Counter',
    description:
      'Count "1" on the backswing and "2" on the downswing to build smooth, consistent rhythm. Tempo is one of the most important fundamentals.',
    category: 'distance-control',
    difficulty: 1,
    estimatedMinutes: 10,
    equipment: ['Any iron', 'Range balls'],
    location: 'range',
    steps: [
      'Address the ball with your chosen iron.',
      'Begin your backswing while saying "one" out loud (or in your head).',
      'Start the downswing on "two" and swing through to the finish.',
      'The "one" should take about twice as long as the "two" (a 2:1 ratio).',
      'Hit 10 balls focusing solely on this rhythm, not on where the ball goes.',
      'Gradually increase swing speed while maintaining the same 1-2 count.',
    ],
    successCriteria:
      'Maintain a consistent 1-2 count for 10 consecutive swings with solid contact.',
    illustration: '\u{1F3B5} Musical notes flowing with a swing arc',
    relatedSwingType: 'iron-swing',
  },
  {
    id: 'target-zone',
    name: 'Target Zone',
    description:
      'Pick targets at 50, 75, and 100 yards and try to land shots within a 10-yard radius. Develops precision with your wedges.',
    category: 'distance-control',
    difficulty: 2,
    estimatedMinutes: 20,
    equipment: ['Pitching wedge', 'Sand wedge', 'Range balls'],
    location: 'range',
    steps: [
      'Identify targets on the range at approximately 50, 75, and 100 yards.',
      'Start with the 50-yard target. Hit 5 balls with your sand wedge trying to land within 10 yards.',
      'Move to the 75-yard target. Adjust your club or swing length accordingly.',
      'Finally, aim for the 100-yard target with your pitching wedge.',
      'Track how many balls land in the target zone at each distance.',
      'Repeat the cycle, trying to beat your previous score.',
    ],
    successCriteria:
      'Land at least 3 out of 5 balls within the 10-yard target zone at each distance.',
    illustration: '\u{1F3AF} Concentric circles at different yardage markers',
  },

  // === GRIP & SETUP (3) ===
  {
    id: 'grip-pressure-drill',
    name: 'Grip Pressure Drill',
    description:
      'Learn the proper grip pressure of 4 out of 10. Most beginners grip far too tightly, which restricts the swing and causes tension.',
    category: 'grip-setup',
    difficulty: 1,
    estimatedMinutes: 5,
    equipment: ['Any club'],
    location: 'home',
    steps: [
      'Hold the club with maximum pressure (10 out of 10). Notice how your forearms tense up.',
      'Now hold it so loosely it almost falls out of your hands (1 out of 10).',
      'Find the middle ground at about 4 out of 10 pressure - firm enough to control the club but relaxed enough that your wrists are free.',
      'With this light pressure, make gentle waggle motions back and forth.',
      'Check that you can still feel the weight of the clubhead swinging.',
      'Practice gripping the club at this pressure 10 times until it feels natural.',
    ],
    successCriteria:
      'Grip the club 10 times in a row at 4/10 pressure where your forearms feel relaxed but the club feels secure.',
    illustration: '\u270B Hand holding club with a relaxed, light grip',
    relatedSwingType: 'grip',
  },
  {
    id: 'alignment-stick-drill',
    name: 'Alignment Stick Drill',
    description:
      'Use alignment sticks or spare clubs on the ground to ensure your feet, hips, and shoulders are all aligned parallel to the target line.',
    category: 'grip-setup',
    difficulty: 1,
    estimatedMinutes: 10,
    equipment: ['2 alignment sticks or extra clubs'],
    location: 'range',
    steps: [
      'Pick a target on the range.',
      'Lay one alignment stick on the ground pointing directly at the target (this is your target line).',
      'Place the second stick parallel to the first, about 2 feet closer to you (this is your foot line).',
      'Set up with your toes along the foot line stick.',
      'Check that your knees, hips, and shoulders are also parallel to the sticks.',
      'Hit balls while keeping your body aligned with the sticks. Glance down to verify alignment before each shot.',
    ],
    successCriteria:
      'Set up correctly 10 times in a row with body aligned parallel to the target line without needing to adjust.',
    illustration: '\u2702\uFE0F Two parallel lines on the ground with feet aligned',
    relatedSwingType: 'setup',
  },
  {
    id: 'mirror-posture-check',
    name: 'Mirror Posture Check',
    description:
      'Practice your address position in front of a mirror to build muscle memory for proper posture, spine angle, and knee flex.',
    category: 'grip-setup',
    difficulty: 1,
    estimatedMinutes: 5,
    equipment: ['Any club', 'Full-length mirror'],
    location: 'home',
    steps: [
      'Stand sideways to a full-length mirror with your club.',
      'Take your address position as if you were about to hit a ball.',
      'Check your spine angle - it should tilt forward from the hips about 30 degrees.',
      'Verify your knees have a slight flex, like you are about to sit on a tall stool.',
      'Arms should hang naturally from your shoulders, not reaching or tucked in.',
      'Hold the position for 10 seconds, relax, then set up again. Repeat 10 times.',
    ],
    successCriteria:
      'Achieve a consistent address position 10 times that matches the checkpoints: spine tilt, knee flex, and natural arm hang.',
    illustration: '\u{1FA9E} Golfer checking posture in a mirror',
    relatedSwingType: 'setup',
  },

  // === CHIPPING (3) ===
  {
    id: 'landing-zone-targets',
    name: 'Landing Zone Targets',
    description:
      'Place a towel on the green as a landing zone and chip balls onto it. This teaches you to focus on where the ball lands, not where it ends up.',
    category: 'chipping',
    difficulty: 1,
    estimatedMinutes: 15,
    equipment: ['Wedge', '10 golf balls', 'Towel'],
    location: 'putting-green',
    steps: [
      'Place a towel on the green about 6-10 feet from the fringe.',
      'Set up just off the green with your wedge and 10 balls.',
      'Pick a landing spot on the towel and chip each ball to land on it.',
      'Focus on a short backswing with a firm wrist through impact.',
      'Watch how the ball rolls out after landing. This helps you learn the relationship between landing spot and final position.',
      'Move the towel to different positions and repeat.',
    ],
    successCriteria:
      'Land at least 6 out of 10 chips on the towel from 10 yards away.',
    illustration: '\u{1F9FA} Towel on green with balls landing on it',
    relatedSwingType: 'chipping',
  },
  {
    id: 'up-and-down-challenge',
    name: 'Up-and-Down Challenge',
    description:
      'Chip and putt from 5 different spots around the green, counting total strokes. A realistic practice game that simulates on-course pressure.',
    category: 'chipping',
    difficulty: 2,
    estimatedMinutes: 20,
    equipment: ['Wedge', 'Putter', '5 golf balls'],
    location: 'putting-green',
    steps: [
      'Choose 5 different spots around the edge of the green with varying lies and distances.',
      'From spot 1, chip the ball onto the green toward the hole.',
      'Putt out. Count total strokes (chip + putts) for that spot.',
      'Move to spot 2 and repeat. Continue through all 5 spots.',
      'Add up your total strokes for all 5 spots. Par is 10 (2 strokes per spot).',
      'Try to beat your score each time you play this game.',
    ],
    successCriteria:
      'Complete all 5 up-and-downs in 12 or fewer total strokes (averaging 2.4 or less per spot).',
    illustration: '\u26F3 Ball arcing from fringe to hole with putter nearby',
    relatedSwingType: 'chipping',
  },
  {
    id: 'bump-and-run',
    name: 'Bump and Run Practice',
    description:
      'Use a 7-iron to chip with a low trajectory and let the ball roll to the hole. A reliable shot when you have green to work with.',
    category: 'chipping',
    difficulty: 2,
    estimatedMinutes: 15,
    equipment: ['7-iron', '10 golf balls'],
    location: 'putting-green',
    steps: [
      'Set up just off the green with your 7-iron. Place the ball back in your stance (toward your right foot for right-handers).',
      'Grip down on the club about 2 inches for more control.',
      'Make a short, putting-like stroke. The ball should fly low and roll like a putt.',
      'Aim to land the ball just onto the green and let it roll to the hole.',
      'Hit 10 balls to a hole about 30 feet away, focusing on consistent contact.',
      'Experiment with different landing spots to see how the ball rolls out.',
    ],
    successCriteria:
      'Get 7 out of 10 bump-and-run shots to finish within 6 feet of the hole.',
    illustration: '\u{1F3CC}\uFE0F Low ball flight with a rolling trajectory arrow',
    relatedSwingType: 'chipping',
  },

  // === FULL SWING (3) ===
  {
    id: 'slow-motion-swings',
    name: 'Slow Motion Swings',
    description:
      'Take 10-second swings in slow motion, pausing at each key position. This builds awareness of your swing path and body positions.',
    category: 'full-swing',
    difficulty: 1,
    estimatedMinutes: 10,
    equipment: ['Any club'],
    location: 'home',
    steps: [
      'Take your address position with any club.',
      'Begin your backswing extremely slowly, taking about 4 seconds to reach the top.',
      'Pause at the top for 2 seconds. Check your position: weight on back foot, shoulders turned, club pointing at target.',
      'Start down slowly (2 seconds) feeling your weight shift to the front foot.',
      'Continue through impact and up to the finish (2 seconds).',
      'Hold the finish position for 3 seconds. You should be balanced on your front foot.',
      'Repeat 10 times, gradually getting more comfortable with each position.',
    ],
    successCriteria:
      'Complete 10 slow-motion swings maintaining balance throughout and holding the finish for 3 seconds each time.',
    illustration: '\u{1F400}\u27A1\uFE0F\u{1F422} Fast to slow motion arrows along swing path',
    relatedSwingType: 'full-swing',
  },
  {
    id: 'feet-together-drill',
    name: 'Feet Together Drill',
    description:
      'Hit balls with your feet touching to develop balance and rhythm. If you can hit it solid with feet together, your normal swing will improve.',
    category: 'full-swing',
    difficulty: 2,
    estimatedMinutes: 15,
    equipment: ['7-iron', 'Range balls'],
    location: 'range',
    steps: [
      'Set up to the ball with your feet together (touching or nearly touching).',
      'Make a half to three-quarter swing. Do not try to swing full power.',
      'Focus on making solid contact and maintaining balance throughout the swing.',
      'If you stumble or lose balance, your swing is too fast or too long.',
      'Hit 15-20 balls this way, noting how centered the contact feels.',
      'After the drill, return to your normal stance and notice how much more stable you feel.',
    ],
    successCriteria:
      'Hit 10 consecutive balls with feet together without losing balance, making clean contact each time.',
    illustration: '\u{1F9CD} Golfer with feet together making a compact swing',
    relatedSwingType: 'full-swing',
  },
  {
    id: 'pause-at-top-drill',
    name: 'Pause at Top Drill',
    description:
      'Make a full backswing, pause for 2 seconds at the top, then swing through. Eliminates rushing and promotes a smooth transition.',
    category: 'full-swing',
    difficulty: 2,
    estimatedMinutes: 15,
    equipment: ['Any iron', 'Range balls'],
    location: 'range',
    steps: [
      'Take your normal stance and address position.',
      'Make a full backswing at normal speed.',
      'At the top of your backswing, STOP completely. Hold the position for a full 2-second count.',
      'After the pause, start your downswing smoothly. Do not rush from the stop.',
      'Swing through to a full finish position.',
      'Hit 15 balls this way. You may mis-hit the first few until you get used to the pause.',
    ],
    successCriteria:
      'Hit 10 out of 15 balls with solid contact while maintaining a full 2-second pause at the top of the backswing.',
    illustration: '\u23F8\uFE0F Club paused at the top of backswing with a timer icon',
    relatedSwingType: 'full-swing',
  },

  // === ALIGNMENT (3) ===
  {
    id: 'railroad-tracks',
    name: 'Railroad Tracks',
    description:
      'Lay two clubs on the ground in parallel lines to create "railroad tracks" for your feet and target line. A classic alignment drill.',
    category: 'alignment',
    difficulty: 1,
    estimatedMinutes: 10,
    equipment: ['2 extra clubs'],
    location: 'range',
    steps: [
      'Pick a specific target on the range.',
      'Lay one club on the ground pointing at the target. This represents the target line (where the ball should go).',
      'Lay the second club parallel to the first, about shoulder-width apart. This is your body line.',
      'Step into your stance with your toes along the body line club.',
      'Hit shots while checking that your body stays parallel to the target line, like train tracks that never converge.',
      'After every 5 shots, step away and re-check that the clubs are still pointing at your target.',
    ],
    successCriteria:
      'Hit 15 balls while maintaining proper parallel alignment, with at least 10 starting on or near the target line.',
    illustration: '\u{1F6E4}\uFE0F Two parallel lines like railroad tracks with a golfer standing between them',
    relatedSwingType: 'setup',
  },
  {
    id: 'intermediate-target',
    name: 'Intermediate Target',
    description:
      'Pick a spot on the ground 3 feet in front of your ball on the target line and aim over it. This is how the pros align every shot.',
    category: 'alignment',
    difficulty: 1,
    estimatedMinutes: 10,
    equipment: ['Any club', 'Range balls'],
    location: 'range',
    steps: [
      'Stand behind the ball and pick your distant target.',
      'Draw an imaginary line from the target back to the ball.',
      'Find a spot on that line about 3 feet in front of the ball (a divot, leaf, or discolored grass).',
      'Set up to the ball and aim the clubface over your intermediate target.',
      'Align your body parallel to the target line (perpendicular to the clubface).',
      'Hit the shot over the intermediate target. Repeat with 10 balls, choosing a new intermediate target each time.',
    ],
    successCriteria:
      'Successfully use an intermediate target for 10 consecutive shots, with at least 7 starting on or near the intended line.',
    illustration: '\u{1F441}\uFE0F Eye looking down a line from ball to intermediate spot to distant target',
    relatedSwingType: 'setup',
  },
  {
    id: 'body-alignment-check',
    name: 'Body Alignment Check',
    description:
      'At address, lay a club across your thighs and then your shoulders to visually check they are aimed correctly. A quick diagnostic drill.',
    category: 'alignment',
    difficulty: 1,
    estimatedMinutes: 5,
    equipment: ['2 clubs'],
    location: 'range',
    steps: [
      'Set up to a ball in your normal address position with one club.',
      'Without moving your feet, hold the second club across the front of your thighs.',
      'Look down and see where the club points. It should point parallel to your target line, not at the target itself.',
      'Now hold the club across the front of your shoulders and check the same thing.',
      'If either is aimed right or left of parallel, adjust your stance.',
      'Repeat this check 5 times, building awareness of your natural tendencies.',
    ],
    successCriteria:
      'Correctly identify and fix any alignment issues in your thighs and shoulders during 5 consecutive setup checks.',
    illustration: '\u{1F4D0} Club held across shoulders showing alignment angle',
    relatedSwingType: 'setup',
  },
];
