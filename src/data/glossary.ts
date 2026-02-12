export type TermCategory =
  | 'Scoring'
  | 'Course Features'
  | 'Shot Types'
  | 'Equipment'
  | 'Game Formats'
  | 'General';

export interface GlossaryTerm {
  id: string;
  term: string;
  pronunciation: string;
  definition: string;
  example: string;
  category: TermCategory;
  relatedTerms: string[];
}

export const CATEGORIES: TermCategory[] = [
  'Scoring',
  'Course Features',
  'Shot Types',
  'Equipment',
  'Game Formats',
  'General',
];

export const glossaryTerms: GlossaryTerm[] = [
  // ── Scoring ──────────────────────────────────────────────
  {
    id: 'ace',
    term: 'Ace',
    pronunciation: 'AYS',
    definition:
      'A hole-in-one; when the ball is sunk in the cup with a single stroke from the tee.',
    example: 'She hit an ace on the 145-yard par 3, and the whole course erupted in cheers.',
    category: 'Scoring',
    relatedTerms: ['eagle', 'albatross', 'par'],
  },
  {
    id: 'albatross',
    term: 'Albatross',
    pronunciation: 'AL-buh-tross',
    definition:
      'A score of three strokes under par on a single hole. Also known as a double eagle.',
    example: 'He holed out from 220 yards for an incredible albatross on the par 5.',
    category: 'Scoring',
    relatedTerms: ['eagle', 'birdie', 'par'],
  },
  {
    id: 'birdie',
    term: 'Birdie',
    pronunciation: 'BUR-dee',
    definition: 'A score of one stroke under par on a single hole.',
    example: 'She sank a 15-foot putt for birdie on the 18th to win the tournament.',
    category: 'Scoring',
    relatedTerms: ['eagle', 'par', 'bogey'],
  },
  {
    id: 'bogey',
    term: 'Bogey',
    pronunciation: 'BOH-gee',
    definition: 'A score of one stroke over par on a single hole.',
    example: 'After finding the bunker, he settled for a bogey on the difficult par 4.',
    category: 'Scoring',
    relatedTerms: ['double-bogey', 'triple-bogey', 'par'],
  },
  {
    id: 'double-bogey',
    term: 'Double Bogey',
    pronunciation: 'DUH-bul BOH-gee',
    definition: 'A score of two strokes over par on a single hole.',
    example: 'The water hazard cost her a double bogey on the 12th hole.',
    category: 'Scoring',
    relatedTerms: ['bogey', 'triple-bogey', 'par'],
  },
  {
    id: 'triple-bogey',
    term: 'Triple Bogey',
    pronunciation: 'TRIP-ul BOH-gee',
    definition: 'A score of three strokes over par on a single hole.',
    example: 'After two shots into the rough, he walked away with a painful triple bogey.',
    category: 'Scoring',
    relatedTerms: ['bogey', 'double-bogey', 'par'],
  },
  {
    id: 'eagle',
    term: 'Eagle',
    pronunciation: 'EE-gul',
    definition: 'A score of two strokes under par on a single hole.',
    example: 'His long approach shot rolled into the cup for a spectacular eagle.',
    category: 'Scoring',
    relatedTerms: ['birdie', 'albatross', 'par'],
  },
  {
    id: 'par',
    term: 'Par',
    pronunciation: 'PAR',
    definition:
      'The predetermined number of strokes an expert golfer is expected to need to complete a hole or course.',
    example: 'This course plays to a par of 72 over 18 holes.',
    category: 'Scoring',
    relatedTerms: ['birdie', 'bogey', 'stroke'],
  },
  {
    id: 'stroke',
    term: 'Stroke',
    pronunciation: 'STROHK',
    definition:
      'Any forward swing of the club made with the intent to hit the ball. Each stroke counts as one point toward the score.',
    example: 'She completed the hole in just four strokes, one under par.',
    category: 'Scoring',
    relatedTerms: ['par', 'stroke-play', 'net-score'],
  },
  {
    id: 'under-par-over-par',
    term: 'Under Par / Over Par',
    pronunciation: 'UN-der PAR / OH-ver PAR',
    definition:
      'Under par means fewer strokes than par; over par means more strokes than par. These describe a player\'s cumulative score relative to the course par.',
    example: 'At five under par through 16 holes, she was leading the field by three shots.',
    category: 'Scoring',
    relatedTerms: ['par', 'net-score', 'gross-score'],
  },
  {
    id: 'net-score',
    term: 'Net Score',
    pronunciation: 'NET SKOR',
    definition:
      'A player\'s total score after their handicap strokes have been subtracted from the gross score.',
    example: 'His gross score was 90, but with a 15 handicap his net score was 75.',
    category: 'Scoring',
    relatedTerms: ['gross-score', 'handicap', 'stroke'],
  },
  {
    id: 'gross-score',
    term: 'Gross Score',
    pronunciation: 'GROHS SKOR',
    definition:
      'The total number of strokes taken during a round without any handicap adjustment.',
    example: 'Her gross score of 78 was the lowest of the day before handicaps were applied.',
    category: 'Scoring',
    relatedTerms: ['net-score', 'handicap', 'par'],
  },

  // ── Course Features ──────────────────────────────────────
  {
    id: 'fairway',
    term: 'Fairway',
    pronunciation: 'FAIR-way',
    definition:
      'The closely mown area of the course between the tee box and the green, providing the ideal path to the hole.',
    example: 'Her drive landed right in the center of the fairway, setting up an easy approach.',
    category: 'Course Features',
    relatedTerms: ['rough', 'green', 'tee-box'],
  },
  {
    id: 'rough',
    term: 'Rough',
    pronunciation: 'RUHF',
    definition:
      'The longer grass bordering the fairway. Hitting from the rough makes controlling the ball more difficult.',
    example: 'His tee shot drifted right and ended up in the thick rough.',
    category: 'Course Features',
    relatedTerms: ['fairway', 'fringe', 'hazard'],
  },
  {
    id: 'green',
    term: 'Green',
    pronunciation: 'GREEN',
    definition:
      'The smooth, closely mown area surrounding the hole where putting takes place.',
    example: 'She landed her approach shot on the green, just 10 feet from the pin.',
    category: 'Course Features',
    relatedTerms: ['fringe', 'pin', 'fairway'],
  },
  {
    id: 'bunker',
    term: 'Bunker',
    pronunciation: 'BUNK-er',
    definition:
      'A depression filled with sand, designed as an obstacle. Bunkers can be found near greens (greenside) or along fairways (fairway bunkers).',
    example: 'She blasted out of the greenside bunker and landed the ball within three feet of the cup.',
    category: 'Course Features',
    relatedTerms: ['sand-trap', 'hazard', 'green'],
  },
  {
    id: 'sand-trap',
    term: 'Sand Trap',
    pronunciation: 'SAND TRAP',
    definition:
      'An informal term for a bunker. Though widely used by casual golfers, "bunker" is the official term.',
    example: 'Watch out for the sand trap on the left side of the fairway.',
    category: 'Course Features',
    relatedTerms: ['bunker', 'hazard', 'fairway'],
  },
  {
    id: 'tee-box',
    term: 'Tee Box',
    pronunciation: 'TEE BOKS',
    definition:
      'The designated starting area for each hole, marked by tee markers. Different tees (forward, middle, back) offer varying distances.',
    example: 'He placed his ball on a tee in the tee box and prepared for his opening drive.',
    category: 'Course Features',
    relatedTerms: ['tee-shot', 'fairway', 'drive'],
  },
  {
    id: 'dogleg',
    term: 'Dogleg',
    pronunciation: 'DAWG-leg',
    definition:
      'A hole where the fairway bends to the left or right between the tee and the green.',
    example: 'The 7th hole is a sharp dogleg left, so you need a well-placed tee shot to cut the corner.',
    category: 'Course Features',
    relatedTerms: ['fairway', 'lay-up', 'drive'],
  },
  {
    id: 'water-hazard',
    term: 'Water Hazard',
    pronunciation: 'WAH-ter HAZ-erd',
    definition:
      'Any body of water on the course (pond, lake, stream, or ditch) that serves as an obstacle. Hitting into one usually results in a penalty stroke.',
    example: 'She cleared the water hazard with a well-struck 7-iron.',
    category: 'Course Features',
    relatedTerms: ['hazard', 'lateral-hazard', 'out-of-bounds'],
  },
  {
    id: 'out-of-bounds',
    term: 'Out of Bounds',
    pronunciation: 'OWT uhv BOWNDZ',
    definition:
      'Areas beyond the boundaries of the course, typically marked by white stakes or lines. Hitting OB results in a stroke-and-distance penalty.',
    example: 'His slice carried the ball out of bounds, forcing him to re-tee with a penalty.',
    category: 'Course Features',
    relatedTerms: ['water-hazard', 'provisional-ball', 'hazard'],
  },
  {
    id: 'fringe',
    term: 'Fringe',
    pronunciation: 'FRINJ',
    definition:
      'The closely mown collar of grass surrounding the green. Also called the apron, it is cut shorter than the fairway but longer than the green.',
    example: 'Her ball stopped just on the fringe, so she could choose to putt or chip.',
    category: 'Course Features',
    relatedTerms: ['green', 'rough', 'fairway'],
  },
  {
    id: 'pin',
    term: 'Pin',
    pronunciation: 'PIN',
    definition:
      'The flagstick placed in the cup on the green to indicate the hole location. Also called the flag or flagstick.',
    example: 'The pin was tucked in the back-left corner of the green today.',
    category: 'Course Features',
    relatedTerms: ['green', 'approach-shot', 'fringe'],
  },
  {
    id: 'cart-path',
    term: 'Cart Path',
    pronunciation: 'KART PATH',
    definition:
      'A paved or gravel path on the course for golf carts. Players get free relief if their ball or stance is on a cart path.',
    example: 'His ball landed on the cart path, so he took a free drop to the nearest point of relief.',
    category: 'Course Features',
    relatedTerms: ['fairway', 'lie', 'out-of-bounds'],
  },
  {
    id: 'hazard',
    term: 'Hazard',
    pronunciation: 'HAZ-erd',
    definition:
      'Any bunker or water feature on the course designated as an obstacle. Special rules apply when a ball is in a hazard.',
    example: 'She avoided the hazard by aiming to the right side of the fairway.',
    category: 'Course Features',
    relatedTerms: ['bunker', 'water-hazard', 'lateral-hazard'],
  },
  {
    id: 'lateral-hazard',
    term: 'Lateral Hazard',
    pronunciation: 'LAT-er-ul HAZ-erd',
    definition:
      'A water hazard that runs alongside the line of play, marked by red stakes or lines. Drop options differ from regular water hazards.',
    example: 'The creek running along the left side of the hole is marked as a lateral hazard.',
    category: 'Course Features',
    relatedTerms: ['water-hazard', 'hazard', 'out-of-bounds'],
  },

  // ── Shot Types ───────────────────────────────────────────
  {
    id: 'drive',
    term: 'Drive',
    pronunciation: 'DRYV',
    definition:
      'The first shot on a hole, typically hit with a driver (the longest club) from the tee box for maximum distance.',
    example: 'His drive carried 280 yards down the center of the fairway.',
    category: 'Shot Types',
    relatedTerms: ['tee-shot', 'tee-box', 'fairway'],
  },
  {
    id: 'draw',
    term: 'Draw',
    pronunciation: 'DRAW',
    definition:
      'A controlled shot that curves gently from right to left for a right-handed golfer. Considered a desirable ball flight.',
    example: 'She hit a beautiful draw around the dogleg that added 20 yards of roll.',
    category: 'Shot Types',
    relatedTerms: ['fade', 'hook', 'slice'],
  },
  {
    id: 'fade',
    term: 'Fade',
    pronunciation: 'FAYD',
    definition:
      'A controlled shot that curves gently from left to right for a right-handed golfer. Often used for accuracy.',
    example: 'He played a fade to avoid the bunker on the left side of the fairway.',
    category: 'Shot Types',
    relatedTerms: ['draw', 'slice', 'hook'],
  },
  {
    id: 'slice',
    term: 'Slice',
    pronunciation: 'SLYS',
    definition:
      'An unintentional shot that curves sharply from left to right for a right-handed golfer, often caused by an open clubface.',
    example: 'His slice sent the ball into the trees on the right side of the hole.',
    category: 'Shot Types',
    relatedTerms: ['fade', 'hook', 'draw'],
  },
  {
    id: 'hook',
    term: 'Hook',
    pronunciation: 'HOOK',
    definition:
      'An unintentional shot that curves sharply from right to left for a right-handed golfer, usually caused by a closed clubface.',
    example: 'She hit a nasty hook off the tee that ended up in the left rough.',
    category: 'Shot Types',
    relatedTerms: ['draw', 'slice', 'fade'],
  },
  {
    id: 'shank',
    term: 'Shank',
    pronunciation: 'SHANGK',
    definition:
      'A mishit where the ball strikes the hosel (neck) of the club, sending it sharply to the right. Considered one of the worst shots in golf.',
    example: 'He shanked his approach shot, and the ball flew sideways into the adjacent fairway.',
    category: 'Shot Types',
    relatedTerms: ['chunk', 'top', 'sweet-spot'],
  },
  {
    id: 'chunk',
    term: 'Chunk',
    pronunciation: 'CHUNK',
    definition:
      'A mishit where the club strikes the ground well behind the ball, resulting in a short, heavy shot. Also called a fat shot.',
    example: 'She chunked her wedge shot and the ball barely made it to the front of the green.',
    category: 'Shot Types',
    relatedTerms: ['shank', 'top', 'divot'],
  },
  {
    id: 'top',
    term: 'Top',
    pronunciation: 'TOP',
    definition:
      'A mishit where the club strikes the upper half of the ball, causing it to roll or bounce along the ground instead of becoming airborne.',
    example: 'He topped his 3-wood and the ball rolled only 50 yards down the fairway.',
    category: 'Shot Types',
    relatedTerms: ['chunk', 'shank', 'drive'],
  },
  {
    id: 'punch',
    term: 'Punch',
    pronunciation: 'PUNCH',
    definition:
      'A low, controlled shot played with a shortened backswing and follow-through, useful for hitting under tree branches or into wind.',
    example: 'She played a punch shot under the branches to get back onto the fairway.',
    category: 'Shot Types',
    relatedTerms: ['lay-up', 'approach-shot', 'flop-shot'],
  },
  {
    id: 'flop-shot',
    term: 'Flop Shot',
    pronunciation: 'FLOP shot',
    definition:
      'A high, soft shot played with an open clubface that lands gently with little roll. Used to clear obstacles near the green.',
    example: 'He hit a perfect flop shot over the bunker that stopped two feet from the hole.',
    category: 'Shot Types',
    relatedTerms: ['punch', 'approach-shot', 'loft'],
  },
  {
    id: 'lay-up',
    term: 'Lay Up',
    pronunciation: 'LAY up',
    definition:
      'A strategically shorter shot played to avoid a hazard rather than attempting to reach the green in one shot.',
    example: 'With water guarding the green, she chose to lay up to 80 yards for a safer approach.',
    category: 'Shot Types',
    relatedTerms: ['approach-shot', 'punch', 'hazard'],
  },
  {
    id: 'approach-shot',
    term: 'Approach Shot',
    pronunciation: 'uh-PROHCH shot',
    definition:
      'A shot intended to land the ball on or near the green, typically the second or third shot on a hole.',
    example: 'Her approach shot with a 7-iron landed pin-high and set up a birdie putt.',
    category: 'Shot Types',
    relatedTerms: ['pin', 'green', 'lay-up'],
  },
  {
    id: 'tee-shot',
    term: 'Tee Shot',
    pronunciation: 'TEE shot',
    definition:
      'The first shot played on each hole, hit from the tee box. Not always hit with a driver; players choose the club based on hole strategy.',
    example: 'On the short par 4, she chose a 3-iron for her tee shot to stay short of the bunker.',
    category: 'Shot Types',
    relatedTerms: ['drive', 'tee-box', 'fairway'],
  },

  // ── Equipment ────────────────────────────────────────────
  {
    id: 'loft',
    term: 'Loft',
    pronunciation: 'LAWFT',
    definition:
      'The angle of the clubface relative to vertical. Higher loft produces a higher, shorter shot; lower loft produces a lower, longer shot.',
    example: 'A pitching wedge typically has about 46 degrees of loft.',
    category: 'Equipment',
    relatedTerms: ['clubhead', 'lie-angle', 'flop-shot'],
  },
  {
    id: 'lie-angle',
    term: 'Lie Angle',
    pronunciation: 'LY ANG-gul',
    definition:
      'The angle between the shaft and the ground when the club is soled properly. An incorrect lie angle can cause shots to veer left or right.',
    example: 'After a fitting session, the pro adjusted her lie angle two degrees upright.',
    category: 'Equipment',
    relatedTerms: ['loft', 'shaft-flex', 'clubhead'],
  },
  {
    id: 'shaft-flex',
    term: 'Shaft Flex',
    pronunciation: 'SHAFT FLEKS',
    definition:
      'The measure of how much a club shaft bends during a swing. Common flexes range from Ladies to Extra Stiff, matching different swing speeds.',
    example: 'With his fast swing speed, the fitter recommended a stiff shaft flex.',
    category: 'Equipment',
    relatedTerms: ['lie-angle', 'clubhead', 'sweet-spot'],
  },
  {
    id: 'sweet-spot',
    term: 'Sweet Spot',
    pronunciation: 'SWEET spot',
    definition:
      'The ideal point on the clubface for striking the ball, producing maximum distance and accuracy with minimal vibration.',
    example: 'You can tell he hit the sweet spot by the pure sound the club made at impact.',
    category: 'Equipment',
    relatedTerms: ['clubhead', 'grooves', 'shank'],
  },
  {
    id: 'grooves',
    term: 'Grooves',
    pronunciation: 'GROOVZ',
    definition:
      'The horizontal lines cut into the clubface that create spin on the ball, helping with control and stopping power on the green.',
    example: 'Keeping your grooves clean helps maintain spin on approach shots.',
    category: 'Equipment',
    relatedTerms: ['clubhead', 'sweet-spot', 'loft'],
  },
  {
    id: 'offset',
    term: 'Offset',
    pronunciation: 'AWF-set',
    definition:
      'A club design where the leading edge of the clubface is set back from the hosel. Offset helps reduce slicing and promotes a straighter ball flight.',
    example: 'Beginner irons often feature more offset to help with common mishits.',
    category: 'Equipment',
    relatedTerms: ['clubhead', 'lie-angle', 'slice'],
  },
  {
    id: 'clubhead',
    term: 'Clubhead',
    pronunciation: 'CLUB-hed',
    definition:
      'The weighted end of the golf club that strikes the ball. Clubheads vary in size and shape depending on the type of club.',
    example: 'Modern driver clubheads can be up to 460cc in volume for maximum forgiveness.',
    category: 'Equipment',
    relatedTerms: ['loft', 'sweet-spot', 'grooves'],
  },
  {
    id: 'grip',
    term: 'Grip',
    pronunciation: 'GRIP',
    definition:
      'The rubber or leather covering on the handle end of a club that the golfer holds. Also refers to the way a golfer holds the club.',
    example: 'Worn grips can cause the club to slip, so replace them at least once a year.',
    category: 'Equipment',
    relatedTerms: ['shaft-flex', 'clubhead', 'stance'],
  },

  // ── Game Formats ─────────────────────────────────────────
  {
    id: 'stroke-play',
    term: 'Stroke Play',
    pronunciation: 'STROHK play',
    definition:
      'The most common format where the total number of strokes over the entire round (or tournament) determines the winner. Lowest total wins.',
    example: 'Most professional tournaments use stroke play over four rounds.',
    category: 'Game Formats',
    relatedTerms: ['match-play', 'net-score', 'gross-score'],
  },
  {
    id: 'match-play',
    term: 'Match Play',
    pronunciation: 'MATCH play',
    definition:
      'A format where two players or teams compete hole by hole. The player with the lower score wins the hole; most holes won wins the match.',
    example: 'In match play, she was 3 up with 4 holes to play and closed out the match on 17.',
    category: 'Game Formats',
    relatedTerms: ['stroke-play', 'skins', 'four-ball'],
  },
  {
    id: 'scramble',
    term: 'Scramble',
    pronunciation: 'SKRAM-bul',
    definition:
      'A team format where all players hit from the tee, the best shot is selected, and everyone plays their next shot from that spot. Repeats until holed.',
    example: 'The charity scramble was a great way to enjoy golf with friends of all skill levels.',
    category: 'Game Formats',
    relatedTerms: ['best-ball', 'four-ball', 'alternate-shot'],
  },
  {
    id: 'best-ball',
    term: 'Best Ball',
    pronunciation: 'BEST bawl',
    definition:
      'A team format where each player plays their own ball for the entire hole, and the lowest individual score among the team counts as the team score.',
    example: 'In our best-ball match, my partner\'s birdie saved us on the 14th hole.',
    category: 'Game Formats',
    relatedTerms: ['scramble', 'four-ball', 'match-play'],
  },
  {
    id: 'stableford',
    term: 'Stableford',
    pronunciation: 'STAY-bul-ford',
    definition:
      'A scoring system where points are awarded based on the number of strokes taken relative to par on each hole. Higher points win instead of lower strokes.',
    example: 'In Stableford, a birdie earns 3 points, a par earns 2, and a bogey earns 1.',
    category: 'Game Formats',
    relatedTerms: ['stroke-play', 'par', 'handicap'],
  },
  {
    id: 'skins',
    term: 'Skins',
    pronunciation: 'SKINZ',
    definition:
      'A format where each hole has a set value (a "skin"). The player with the lowest score on a hole wins the skin; ties carry over to the next hole.',
    example: 'By the 15th hole, four skins had carried over, making it worth $20.',
    category: 'Game Formats',
    relatedTerms: ['match-play', 'stroke-play', 'scramble'],
  },
  {
    id: 'four-ball',
    term: 'Four-Ball',
    pronunciation: 'FOR-bawl',
    definition:
      'A match-play format where two teams of two compete. Each player plays their own ball, and the lower score of the two partners counts for each hole.',
    example: 'In four-ball, communication with your partner about strategy is key.',
    category: 'Game Formats',
    relatedTerms: ['best-ball', 'match-play', 'alternate-shot'],
  },
  {
    id: 'alternate-shot',
    term: 'Alternate Shot',
    pronunciation: 'AWL-ter-nit shot',
    definition:
      'A format where two partners take turns hitting the same ball on each shot. Also called foursomes.',
    example: 'In alternate shot, she teed off on even holes while her partner took the odd ones.',
    category: 'Game Formats',
    relatedTerms: ['four-ball', 'scramble', 'match-play'],
  },

  // ── General ──────────────────────────────────────────────
  {
    id: 'handicap',
    term: 'Handicap',
    pronunciation: 'HAN-dee-kap',
    definition:
      'A numerical measure of a golfer\'s ability used to level the playing field. A lower handicap indicates a better player.',
    example: 'With a handicap of 12, she receives 12 strokes over the course of a round.',
    category: 'General',
    relatedTerms: ['net-score', 'gross-score', 'stroke-play'],
  },
  {
    id: 'tee-time',
    term: 'Tee Time',
    pronunciation: 'TEE tym',
    definition:
      'The scheduled time for a player or group to begin their round at the first tee.',
    example: 'Our tee time is 8:30 AM, so we should arrive at the course by 8:00.',
    category: 'General',
    relatedTerms: ['tee-box', 'tee-shot', 'fore'],
  },
  {
    id: 'fore',
    term: 'Fore',
    pronunciation: 'FOR',
    definition:
      'A warning shout used to alert other players that a ball is headed in their direction. Always yell "Fore!" if your shot might hit someone.',
    example: 'He yelled "Fore!" as his slice headed toward the group on the adjacent fairway.',
    category: 'General',
    relatedTerms: ['slice', 'out-of-bounds', 'drive'],
  },
  {
    id: 'mulligan',
    term: 'Mulligan',
    pronunciation: 'MUL-ih-gun',
    definition:
      'An informal do-over shot, not recognized by official rules. Common in casual rounds among friends.',
    example: 'After dunking his tee shot in the lake, his buddies let him take a mulligan.',
    category: 'General',
    relatedTerms: ['gimme', 'provisional-ball', 'tee-shot'],
  },
  {
    id: 'gimme',
    term: 'Gimme',
    pronunciation: 'GIM-ee',
    definition:
      'A putt so short that other players concede it, allowing the golfer to count it as holed without putting. Not allowed in formal competition.',
    example: 'With the ball just six inches from the cup, his opponent said, "That\'s a gimme."',
    category: 'General',
    relatedTerms: ['mulligan', 'green', 'match-play'],
  },
  {
    id: 'divot',
    term: 'Divot',
    pronunciation: 'DIV-ut',
    definition:
      'A piece of turf displaced by the clubhead during a shot. Proper etiquette requires replacing or filling divots.',
    example: 'She replaced her divot and pressed it down after hitting her iron shot.',
    category: 'General',
    relatedTerms: ['chunk', 'fairway', 'approach-shot'],
  },
  {
    id: 'lie',
    term: 'Lie',
    pronunciation: 'LY',
    definition:
      'The position and condition of the ball on the ground. A good lie means the ball is sitting up cleanly; a bad lie means it is buried or on uneven ground.',
    example: 'The ball had a terrible lie in the thick rough, making the next shot very difficult.',
    category: 'General',
    relatedTerms: ['rough', 'fairway', 'stance'],
  },
  {
    id: 'address',
    term: 'Address',
    pronunciation: 'uh-DRES',
    definition:
      'The position a golfer takes before making a swing, including stance, grip, and club placement behind the ball.',
    example: 'He took his address, waggled the club twice, and made a smooth swing.',
    category: 'General',
    relatedTerms: ['stance', 'grip', 'backswing'],
  },
  {
    id: 'stance',
    term: 'Stance',
    pronunciation: 'STANS',
    definition:
      'The position of a golfer\'s feet at address. Stance width and alignment affect balance and shot direction.',
    example: 'For a driver, widen your stance to about shoulder width for better stability.',
    category: 'General',
    relatedTerms: ['address', 'backswing', 'grip'],
  },
  {
    id: 'backswing',
    term: 'Backswing',
    pronunciation: 'BAK-swing',
    definition:
      'The initial phase of the golf swing where the club is taken back and away from the ball to build power.',
    example: 'A smooth, controlled backswing sets the foundation for a powerful downswing.',
    category: 'General',
    relatedTerms: ['follow-through', 'stance', 'address'],
  },
  {
    id: 'follow-through',
    term: 'Follow-Through',
    pronunciation: 'FAH-loh-throo',
    definition:
      'The continuation of the swing after the ball has been struck. A complete follow-through indicates proper technique and balance.',
    example: 'Her balanced follow-through with the club finishing over her left shoulder showed excellent form.',
    category: 'General',
    relatedTerms: ['backswing', 'stance', 'drive'],
  },
  {
    id: 'provisional-ball',
    term: 'Provisional Ball',
    pronunciation: 'pruh-VIH-zhun-ul bawl',
    definition:
      'A second ball played when a golfer believes their original ball may be lost or out of bounds. It saves time by avoiding a return trip to the tee.',
    example: 'Unsure if his drive cleared the trees, he hit a provisional ball just in case.',
    category: 'General',
    relatedTerms: ['out-of-bounds', 'mulligan', 'stroke'],
  },
];

/** Map of term ID to GlossaryTerm for quick lookups */
export const glossaryMap = new Map<string, GlossaryTerm>(
  glossaryTerms.map((t) => [t.id, t])
);
