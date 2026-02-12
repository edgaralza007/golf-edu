export interface Scenario {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const scenarios: Scenario[] = [
  {
    id: 's1',
    question:
      'Your ball lands in a water hazard marked with red stakes. What do you do?',
    options: [
      'Drop within 2 club lengths of where the ball crossed the hazard edge, with 1 penalty stroke',
      'Play from where the ball entered the water with no penalty',
      'Return to the tee and hit again with no penalty',
      'The ball must be played from the water or you are disqualified',
    ],
    correctIndex: 0,
    explanation:
      'Red stakes mark a lateral penalty area. You may drop within 2 club lengths of the point where the ball last crossed the edge of the penalty area, no nearer the hole, with a 1-stroke penalty. You can also play it from the water if possible (no penalty), or use back-on-the-line relief.',
  },
  {
    id: 's2',
    question:
      "You hit your tee shot and can't find your ball after searching. What is the proper procedure?",
    options: [
      'Keep searching until you find it, there is no time limit',
      'Drop a new ball where you think it landed, no penalty',
      'Search for up to 3 minutes, then return to the tee and play again with a 1-stroke penalty',
      'Place a ball at the nearest fairway point and add 2 penalty strokes',
    ],
    correctIndex: 2,
    explanation:
      'You have 3 minutes to search for a lost ball. If not found, you must take stroke-and-distance relief: return to where you last played and hit again, adding 1 penalty stroke. This is why hitting a provisional ball is so important.',
  },
  {
    id: 's3',
    question:
      'A group behind you is playing noticeably faster and catching up. What should you do?',
    options: [
      'Ignore them and play at your own pace',
      'Speed up by skipping holes',
      'Wave them through and let them play ahead of you',
      'Tell them to stop rushing',
    ],
    correctIndex: 2,
    explanation:
      'Good etiquette says you should let faster groups play through. When there is a gap in front of you, wave the group behind to go ahead. Step aside at the next tee or green and let them pass.',
  },
  {
    id: 's4',
    question:
      'You take a shot on the fairway and create a divot (a chunk of turf). What is the proper action?',
    options: [
      'Leave it, the groundskeeper will fix it',
      'Replace the turf back into the divot hole or fill it with sand/seed mix',
      'Kick the loose dirt back into the hole',
      'Place your ball on top of it as a tee',
    ],
    correctIndex: 1,
    explanation:
      'Always repair your divots. Replace the chunk of turf and press it down with your foot, or use the sand/seed mix provided on the cart to fill the hole. This helps the course recover quickly.',
  },
  {
    id: 's5',
    question:
      "You're on the green and your ball is the closest to the hole. What should you do?",
    options: [
      'Always putt first since you are closest',
      'Tend or remove the flagstick for others, or mark and putt out if asked',
      'Leave the green and wait until everyone else has putted',
      'Pick up your ball, it counts as holed',
    ],
    correctIndex: 1,
    explanation:
      "When closest to the hole, you can tend the flagstick for others (hold it and remove as their putt approaches), remove it entirely, or mark your ball and wait. You may also putt out if it won't disturb others. Communication with your playing partners is key.",
  },
  {
    id: 's6',
    question:
      'Your ball lands directly behind a large tree and you cannot swing. What are your options?',
    options: [
      'Move the tree, it is a loose impediment',
      'Declare an unplayable lie: take 1 penalty stroke and choose from 3 relief options',
      'You must play it as it lies, no exceptions',
      'Kick the ball out from behind the tree when no one is looking',
    ],
    correctIndex: 1,
    explanation:
      'You can always declare an unplayable lie (except in a penalty area). With 1 penalty stroke, your options are: (1) go back to where you last played, (2) drop on a line behind the ball keeping it between you and the hole, or (3) drop within 2 club lengths, no nearer the hole.',
  },
  {
    id: 's7',
    question:
      'You hit a shot that is heading directly toward another group of golfers. What do you yell?',
    options: [
      '"Watch out!"',
      '"Heads up!"',
      '"FORE!"',
      'Nothing, just hope for the best',
    ],
    correctIndex: 2,
    explanation:
      '"FORE!" is the universal warning in golf that a ball is heading toward someone. Shout it immediately and as loudly as possible. This gives people time to protect themselves. It is a critical safety courtesy.',
  },
  {
    id: 's8',
    question: 'Where should you park the golf cart when approaching a green?',
    options: [
      'Drive it onto the green for convenience',
      'Park it on the tee box of the current hole',
      'Park near the cart path on the side closest to the next tee, off greens and tees',
      'Leave it in the middle of the fairway',
    ],
    correctIndex: 2,
    explanation:
      'Never drive a cart onto greens, tee boxes, or their surrounds. Park on the cart path or the designated area near the green, on the side closest to the next tee so your group can move quickly to the next hole.',
  },
  {
    id: 's9',
    question:
      'A player in your group is lining up to putt. What should you do?',
    options: [
      'Keep talking quietly to another playing partner',
      'Stand still, stay quiet, and avoid standing in their putting line',
      'Walk to the next tee to save time',
      'Stand directly behind them so you can watch the putt',
    ],
    correctIndex: 1,
    explanation:
      "When someone is putting, stand still and be completely quiet. Don't stand in their putting line (the imaginary line from their ball to the hole, extended behind the ball). Position yourself where you won't distract them.",
  },
  {
    id: 's10',
    question:
      'You hit your tee shot out of bounds (past the white stakes). How many penalty strokes do you receive, and what do you hit next?',
    options: [
      '0 penalty strokes, just drop a new ball where it went out',
      '1 penalty stroke, hitting your 3rd shot from the tee (stroke and distance)',
      '2 penalty strokes, hitting your 4th shot from the tee',
      '1 penalty stroke, drop where the ball went OB',
    ],
    correctIndex: 1,
    explanation:
      'Out of bounds uses stroke-and-distance penalty: 1 penalty stroke and you must replay from the original spot. Your tee shot was stroke 1, the penalty is stroke 2, so you are now hitting stroke 3 from the tee. Some courses have a local rule allowing a 2-stroke drop near where the ball went OB.',
  },
  {
    id: 's11',
    question:
      'You hit a shot from a bunker (sand trap). What should you do after your shot?',
    options: [
      'Walk out quickly to save time',
      'Rake the bunker to smooth out your footprints and the area where you hit',
      'Leave it, bunkers are supposed to be uneven',
      'Fill in the hole with extra sand from outside the bunker',
    ],
    correctIndex: 1,
    explanation:
      'Always rake the bunker after your shot. Smooth out your footprints, the divot from your shot, and any disturbed sand. Leave the rake outside the bunker with the handle parallel to the fairway. This ensures a fair lie for the next player.',
  },
  {
    id: 's12',
    question:
      'While searching for your ball in the rough, you accidentally move it with your foot. What happens?',
    options: [
      '1 penalty stroke, play it from the new position',
      '2 penalty strokes, play it from where it stopped',
      'Replace the ball to its original spot, no penalty',
      'You must take an unplayable lie',
    ],
    correctIndex: 2,
    explanation:
      'Under the current rules (since 2019), if you accidentally move your ball while searching for it, simply replace it at its original spot with no penalty. This rule was changed to be more forgiving since it is easy to accidentally kick a ball in thick rough.',
  },
];
