export interface Lesson {
  id: string;
  title: string;
  content: string[];
  tips: string[];
  keyTakeaways: string[];
  estimatedMinutes: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
}

export const modules: Module[] = [
  {
    id: 'module-1',
    title: 'Equipment Basics',
    description: 'Learn about the essential clubs, balls, and gear every beginner needs to get started on the course.',
    icon: '\u{1F3CC}\uFE0F',
    lessons: [
      {
        id: 'lesson-1-1',
        title: 'Types of Golf Clubs',
        estimatedMinutes: 5,
        content: [
          'Golf clubs come in several categories, each designed for specific situations on the course. Understanding the differences will help you feel confident when selecting a club for each shot.',
          'Woods are the largest clubs in your bag and are used for long-distance shots. The driver (1-wood) is what you will typically use off the tee on par-4 and par-5 holes. Fairway woods (3-wood, 5-wood) are versatile clubs that can be used from the tee or the fairway when you need good distance.',
          'Irons are numbered from 1 through 9, with lower numbers producing longer, lower shots and higher numbers producing shorter, higher shots. Most beginners will use irons from the 5-iron through 9-iron. They are your go-to clubs for approach shots toward the green.',
          'Wedges are specialized irons designed for short-distance, high-accuracy shots. The pitching wedge, sand wedge, and lob wedge help you get out of tricky situations like bunkers or when you need to clear an obstacle close to the green.',
          'The putter is arguably the most important club in your bag. It is used on the green to roll the ball into the hole. Putters come in many shapes and styles, so try a few to see which feels comfortable for your stroke.',
        ],
        tips: [
          'You do not need a full set of 14 clubs to start. A half set (driver, 5-iron, 7-iron, 9-iron, pitching wedge, sand wedge, and putter) is plenty for beginners.',
          'Higher-numbered irons are easier to hit, so start practicing with a 7-iron or 9-iron before moving to longer clubs.',
          'Try clubs in person before buying. Many golf shops and driving ranges offer demo clubs you can test.',
        ],
        keyTakeaways: [
          'Woods are for distance, irons for approach shots, wedges for short game, and the putter for the green.',
          'Club numbers indicate loft: lower numbers go farther with less height, higher numbers go shorter with more height.',
          'A half set of clubs is all a beginner needs to learn and enjoy the game.',
        ],
      },
      {
        id: 'lesson-1-2',
        title: "What's in a Starter Bag",
        estimatedMinutes: 4,
        content: [
          'Building your first golf bag does not have to be expensive or complicated. A smart starter set will cover all the situations you will encounter on the course without overwhelming you with choices.',
          'A recommended beginner bag includes: a driver for tee shots, a fairway wood or hybrid for long shots from the fairway, a 7-iron and 9-iron for mid-range shots, a pitching wedge and sand wedge for short shots, and a putter for the green. This gives you seven clubs total, well under the 14-club maximum allowed by the rules.',
          'Hybrid clubs are a great addition for beginners. They combine the best features of woods and irons, making them easier to hit than long irons. Many golfers replace their 3-iron, 4-iron, and 5-iron with hybrids.',
          'You can build a starter bag affordably by buying a pre-made beginner set or shopping for used clubs. Many experienced golfers upgrade their equipment regularly, so the used market is full of quality clubs at great prices.',
        ],
        tips: [
          'Pre-made beginner sets often come with a bag included and are the most cost-effective way to start.',
          'If buying used clubs, check the grips. Worn grips are inexpensive to replace and make a big difference in feel.',
          'Consider adding clubs gradually as your game improves rather than buying everything at once.',
        ],
        keyTakeaways: [
          'A starter bag of 7 clubs covers all on-course situations without overcomplicating things.',
          'Hybrids are beginner-friendly alternatives to long irons.',
          'Pre-made sets and used clubs are smart, budget-friendly ways to get started.',
        ],
      },
      {
        id: 'lesson-1-3',
        title: 'Golf Balls, Tees & Accessories',
        estimatedMinutes: 4,
        content: [
          'Beyond clubs, there are several essential accessories that every golfer needs in their bag. Knowing what to bring will ensure you are prepared for any round.',
          'Golf balls vary in construction and performance. As a beginner, choose affordable, durable balls since you will inevitably lose some in the rough, water, or woods. Two-piece balls (a solid core with a durable cover) offer great distance and are very forgiving, making them ideal for new golfers.',
          'Tees are small pegs that elevate the ball for your first shot on each hole. Wooden tees are traditional and inexpensive, while plastic tees are more durable. Standard-length tees work for irons, and longer tees are used with the driver.',
          'Other essentials include: a golf glove (worn on your lead hand to improve grip), ball markers (small coins or markers to mark your ball position on the green), a divot repair tool (to fix marks on the green), and a towel to keep your clubs and hands clean.',
        ],
        tips: [
          'Buy golf balls in bulk or look for recycled/lake balls to save money while you are learning.',
          'Keep at least 6-10 balls in your bag for a round. Beginners tend to lose a few per round and that is perfectly normal.',
          'A golf glove should fit snugly like a second skin. Try them on before buying to find the right size.',
        ],
        keyTakeaways: [
          'Two-piece golf balls are the best choice for beginners: durable, affordable, and forgiving.',
          'Essential accessories include tees, a glove, ball markers, a divot tool, and a towel.',
          'Stock up on balls and tees since losing a few is a normal part of learning the game.',
        ],
      },
      {
        id: 'lesson-1-4',
        title: 'Choosing the Right Equipment',
        estimatedMinutes: 5,
        content: [
          'With so many options available, choosing golf equipment can feel overwhelming. The good news is that as a beginner, you do not need the latest or most expensive gear to enjoy the game and improve.',
          'The most important factor when choosing clubs is that they fit your body and your swing. Club fitting considers your height, arm length, hand size, and swing speed to recommend the right club length, lie angle, and shaft flex. Many golf shops offer basic fitting for free.',
          'Shaft flex matters more than most beginners realize. Shafts come in regular, stiff, and senior flex options. Most beginners benefit from regular flex, which provides more whip and helps generate distance even with slower swing speeds.',
          'Do not overlook the importance of comfortable golf shoes. You will walk several miles during a round, so shoes with good support and traction are essential. Spikeless golf shoes have become popular for their comfort and versatility.',
          'Finally, invest in a good golf bag that is comfortable to carry or fits well on a cart. Stand bags are great for walking, while cart bags are designed to sit securely on a golf cart.',
        ],
        tips: [
          'Take advantage of free club fitting at golf shops. Even a basic fitting makes a noticeable difference.',
          'For your first set, comfort and forgiveness are more important than brand names.',
          'Try on golf shoes at the end of the day when your feet are slightly larger, just as they will be after walking several holes.',
        ],
        keyTakeaways: [
          'Club fitting ensures your equipment matches your body, making the game easier from day one.',
          'Regular flex shafts work well for most beginners.',
          'Comfortable shoes and a functional bag are just as important as clubs.',
        ],
      },
    ],
  },
  {
    id: 'module-2',
    title: 'Grip & Stance',
    description: 'Master the fundamentals of how to hold the club and position your body for consistent, powerful shots.',
    icon: '\u{1F91D}',
    lessons: [
      {
        id: 'lesson-2-1',
        title: 'The Three Basic Grips',
        estimatedMinutes: 5,
        content: [
          'How you hold the golf club is one of the most fundamental aspects of the game. A good grip promotes a square clubface at impact, which means straighter shots. There are three main grip styles used by golfers worldwide.',
          'The Interlocking Grip links the pinky finger of your trailing hand with the index finger of your lead hand. This grip is popular among golfers with smaller hands and was famously used by Jack Nicklaus and Tiger Woods. It creates a strong connection between both hands.',
          'The Overlapping (Vardon) Grip places the pinky of your trailing hand on top of the gap between the index and middle finger of your lead hand. This is the most common grip among professional golfers and works well for those with larger hands.',
          'The Ten-Finger (Baseball) Grip has all ten fingers on the club, similar to holding a baseball bat. This grip is the most natural for beginners and provides maximum leverage. It is a great starting point while you develop hand strength and coordination.',
          'Regardless of which grip you choose, proper pressure is essential. Grip the club firmly enough to maintain control, but not so tightly that your forearms tense up. Many instructors describe the ideal pressure as similar to holding a tube of toothpaste without squeezing any out.',
        ],
        tips: [
          'Start with the ten-finger grip if you are brand new to golf. It feels the most natural and you can transition to interlocking or overlapping later.',
          'Check your grip pressure regularly. Tension in the hands and forearms is one of the most common causes of inconsistent shots.',
          'Your lead hand (left hand for right-handed golfers) should show two to three knuckles when you look down at address.',
        ],
        keyTakeaways: [
          'The three grip styles are interlocking, overlapping, and ten-finger. All three are valid choices.',
          'Grip pressure should be firm but relaxed, like holding a tube of toothpaste.',
          'The ten-finger grip is the most beginner-friendly starting point.',
        ],
      },
      {
        id: 'lesson-2-2',
        title: 'Proper Stance & Ball Position',
        estimatedMinutes: 5,
        content: [
          'Your stance is the foundation of every golf swing. Getting it right from the start saves you from developing bad habits that are hard to fix later.',
          'For a standard iron shot, your feet should be shoulder-width apart. This provides a stable base while allowing your hips to rotate freely during the swing. Wider stances are used for driver shots, and narrower stances for short chips and pitches.',
          'Ball position changes depending on the club you are using. For short irons (8-iron, 9-iron, wedges), the ball should be in the center of your stance. For mid-irons (5-iron through 7-iron), move it slightly forward of center. For the driver, position the ball just inside your lead foot.',
          'Your weight should be distributed evenly between both feet, or slightly favoring the balls of your feet rather than your heels. This athletic posture helps maintain balance throughout the swing.',
          'Knee flex is important but often overdone. A slight bend in the knees, similar to a ready position in other sports, is all you need. Think of how you would stand if someone were about to toss you a ball.',
        ],
        tips: [
          'Practice your stance in front of a mirror at home. It helps to see what your body is doing versus what it feels like.',
          'Place a club on the ground along your toe line to check that your feet are aligned properly.',
          'If you feel off-balance at the end of your swing, your stance width may need adjustment.',
        ],
        keyTakeaways: [
          'Feet shoulder-width apart for irons, wider for driver, narrower for chips.',
          'Ball position moves forward in your stance as the club gets longer.',
          'Even weight distribution and slight knee flex create a balanced, athletic posture.',
        ],
      },
      {
        id: 'lesson-2-3',
        title: 'Alignment & Aim',
        estimatedMinutes: 4,
        content: [
          'Proper alignment is one of the most overlooked fundamentals in golf. Even a perfect swing will miss the target if your body is aimed in the wrong direction. Learning to align correctly is a skill that separates consistent golfers from frustrated ones.',
          'Think of alignment like railroad tracks. Your target line (where you want the ball to go) is one rail, and your body line (feet, hips, shoulders) is the parallel rail. Your body should be aligned parallel to the target, not pointed directly at it.',
          'To aim properly, first stand behind the ball and pick a target. Then find an intermediate target, like a leaf or divot mark, a few feet in front of your ball that is on the line to your target. Align your clubface to this intermediate target, then set your body parallel to the target line.',
          'A common mistake is aiming your body directly at the target. Because you stand to the side of the ball, this actually causes you to aim to the right (for right-handed golfers). Remember: body parallel, clubface at the target.',
        ],
        tips: [
          'Use alignment sticks or clubs laid on the ground during practice sessions to train your eye for proper alignment.',
          'The intermediate target technique used by professionals makes aiming much easier. A target 3 feet away is much easier to align to than one 200 yards away.',
          'Check your alignment by placing a club along your toes and stepping back. It should point parallel to your target line.',
        ],
        keyTakeaways: [
          'Alignment works like railroad tracks: body line parallel to target line, not pointed at the target.',
          'Use an intermediate target a few feet ahead to simplify aiming.',
          'Misalignment is a common cause of consistently off-target shots.',
        ],
      },
      {
        id: 'lesson-2-4',
        title: 'Pre-Shot Routine',
        estimatedMinutes: 4,
        content: [
          'A pre-shot routine is a consistent sequence of actions you perform before every shot. It helps you focus, reduces anxiety, and promotes consistency. Every professional golfer has one, and developing yours early will benefit your game enormously.',
          'A good pre-shot routine typically includes: standing behind the ball to visualize the shot, selecting a specific target, taking one or two practice swings to feel the motion, approaching the ball and setting up your alignment, taking one last look at the target, and then swinging.',
          'The key is consistency. Your routine should take the same amount of time and include the same steps for every shot. This creates a mental trigger that tells your body it is time to perform. Over time, the routine becomes automatic and helps calm nerves during pressure situations.',
          'Keep your routine relatively short, around 20-30 seconds from start to finish. A routine that is too long can lead to overthinking and slow down play for everyone on the course.',
        ],
        tips: [
          'Start building your pre-shot routine on the practice range so it becomes second nature before you take it to the course.',
          'Include a deep breath somewhere in your routine. It helps relax your muscles and focus your mind.',
          'If you step into your shot and something feels off, step back and restart your routine. It is better to reset than to hit a shot you are not committed to.',
        ],
        keyTakeaways: [
          'A pre-shot routine builds consistency and reduces anxiety over shots.',
          'Keep your routine to 20-30 seconds with the same steps every time.',
          'Practice your routine on the range until it becomes automatic.',
        ],
      },
    ],
  },
  {
    id: 'module-3',
    title: 'Swing Mechanics',
    description: 'Break down the full golf swing into manageable parts and learn how each phase contributes to a powerful, accurate shot.',
    icon: '\u{1F4AA}',
    lessons: [
      {
        id: 'lesson-3-1',
        title: 'The Swing Plane',
        estimatedMinutes: 5,
        content: [
          'The swing plane is an imaginary flat surface that describes the path your club travels during the swing. Understanding the swing plane helps you visualize and produce consistent ball striking.',
          'Imagine a large pane of glass resting on your shoulders and angling down to the ball. An on-plane swing keeps the club shaft roughly along this surface throughout the swing. When the club moves above or below this plane, it can lead to slices, hooks, and inconsistent contact.',
          'A flatter swing plane (more horizontal) tends to produce a draw or hook, while a more upright plane (more vertical) tends to produce a fade or slice. Neither is inherently better; many great players have used both. The goal is to find a plane that is natural for your body type and repeatable.',
          'The simplest way to check your swing plane is with video. Have a friend record your swing from behind (down the line) and from the front. You can then see if the club is tracking consistently or moving off-plane during different parts of the swing.',
        ],
        tips: [
          'Do not obsess over having a "perfect" swing plane. Consistency matters more than textbook form.',
          'Record your swing regularly with your phone. Slow-motion video reveals things you cannot feel during the swing.',
          'Many free and paid apps can draw swing plane lines on your video to help you analyze your swing.',
        ],
        keyTakeaways: [
          'The swing plane is the path the club travels, visualized as an angled flat surface from your shoulders to the ball.',
          'Staying on-plane promotes consistent, solid contact.',
          'Use video analysis to check your swing plane rather than relying on feel alone.',
        ],
      },
      {
        id: 'lesson-3-2',
        title: 'Backswing Fundamentals',
        estimatedMinutes: 5,
        content: [
          'The backswing sets the stage for everything that follows. A good backswing puts the club in the right position and creates the stored energy needed for a powerful downswing.',
          'Start the backswing with a one-piece takeaway: your hands, arms, and shoulders move together as a unit while the lower body stays relatively stable. The club should move straight back and slightly inside the target line. Avoid picking the club up steeply or rolling it far to the inside.',
          'As the backswing continues, your wrists will naturally begin to hinge, adding the wrist cock that is a key power source. By the time your hands reach about waist height, the club shaft should be roughly parallel to the ground and parallel to your target line.',
          'At the top of the backswing, your back should be turned toward the target, creating a coil between your upper and lower body. Your lead arm (left arm for right-handed golfers) should be relatively straight but not rigid. The club shaft ideally points roughly toward the target at the top.',
          'Maintaining your spine angle throughout the backswing is crucial. Avoid standing up, swaying sideways, or dipping down. A helpful thought is to keep your head at the same height from start to finish of the backswing.',
        ],
        tips: [
          'Practice the takeaway in slow motion. Getting the first 18 inches right makes the rest of the backswing much easier.',
          'A slight pause at the top of the backswing helps with timing and prevents rushing the transition.',
          'Your backswing does not need to be long. A shorter, controlled backswing beats a long, loose one for consistency.',
        ],
        keyTakeaways: [
          'The one-piece takeaway starts the swing smoothly with hands, arms, and shoulders moving together.',
          'The backswing creates a coil between upper and lower body that stores energy for the downswing.',
          'Maintain your spine angle and keep the backswing controlled rather than overly long.',
        ],
      },
      {
        id: 'lesson-3-3',
        title: 'The Downswing & Impact',
        estimatedMinutes: 6,
        content: [
          'The downswing is where all the stored energy from the backswing is released into the ball. It happens in less than a third of a second, so it must be trained through repetition rather than conscious thought during the swing.',
          'The downswing should be initiated by the lower body. Your hips begin to rotate toward the target while your arms and club drop into the slot. This sequence, often called the kinetic chain, transfers energy from the ground up through your legs, hips, torso, arms, and finally the clubhead.',
          'One of the most common mistakes among beginners is starting the downswing with the arms and shoulders (called "coming over the top"). This move cuts across the ball and produces weak slices. Focus on starting with your lower body and letting the arms follow.',
          'At impact, the goal is to have the clubface square to your target line, with your hands slightly ahead of the clubhead. This forward shaft lean compresses the ball against the clubface, producing the solid feeling and penetrating ball flight that experienced golfers achieve.',
          'Impact position looks very different from your address position. Your hips should be open (rotated toward the target), your weight shifted to your lead foot, and your head behind the ball. Do not try to lift the ball into the air. The loft of the club does that work for you.',
        ],
        tips: [
          'Practice the bump drill: at the top of your backswing, feel like your lead hip bumps slightly toward the target before anything else moves.',
          "Trust that the club's loft will get the ball airborne. Trying to scoop or lift the ball leads to thin and topped shots.",
          'A good impact position feels like you are hitting through the ball, not at it.',
        ],
        keyTakeaways: [
          'The downswing starts from the ground up: hips first, then torso, arms, and club.',
          'Forward shaft lean at impact compresses the ball for solid contact.',
          'Let the club loft do the work of getting the ball into the air.',
        ],
      },
      {
        id: 'lesson-3-4',
        title: 'Follow-Through & Finish',
        estimatedMinutes: 4,
        content: [
          'The follow-through might happen after the ball is struck, but it is a vital indicator of what happened during the swing. A balanced, complete finish is the hallmark of a well-executed swing.',
          'After impact, allow your arms to extend fully toward the target. This extension through the ball promotes straight shots and solid contact. Think of reaching toward your target with the clubhead as it passes through the impact zone.',
          'Your finish position should feel natural and balanced. Your weight should be almost entirely on your lead foot, your belt buckle facing the target, and the club wrapped around your body behind your lead shoulder. You should be able to hold this position for several seconds without falling off balance.',
          'If you find yourself falling forward, backward, or to the side, it usually indicates a problem earlier in the swing, such as an overly aggressive move, poor weight transfer, or loss of posture. The finish is a diagnostic tool as much as it is a part of the swing.',
        ],
        tips: [
          'Practice holding your finish for a count of three after every swing. This trains balance and reveals swing issues.',
          'Your finish should face the target. If it does not, your body may not be rotating fully through the shot.',
          'Watch professional golfers and notice how they all hold a balanced, poised finish. Model that image in your mind.',
        ],
        keyTakeaways: [
          'A balanced finish is a sign of a good swing and helps diagnose problems.',
          'Extend through the ball toward the target for straight, solid shots.',
          'Hold your finish for three seconds to build balance and consistency.',
        ],
      },
      {
        id: 'lesson-3-5',
        title: 'Common Swing Faults & Fixes',
        estimatedMinutes: 7,
        content: [
          'Every golfer encounters swing problems. The key is learning to identify what is going wrong and knowing the right fix. Here are the most common faults and practical solutions for each.',
          'The Slice is the most common miss for beginners. The ball curves dramatically from left to right (for right-handers). This is caused by an open clubface at impact, often combined with an out-to-in swing path. To fix it, strengthen your grip (rotate both hands slightly away from the target), and focus on swinging more from the inside by starting the downswing with your hips.',
          'The Hook curves sharply from right to left and is caused by a closed clubface with an in-to-out path. Weaken your grip slightly (rotate both hands toward the target), and ensure your body rotation does not stall through impact.',
          'Topping the Ball happens when you hit the top half of the ball, producing a low, rolling shot. This is usually caused by lifting your body during the downswing or trying to scoop the ball. Focus on maintaining your spine angle and trust the club loft.',
          'Fat Shots (hitting the ground before the ball) occur when the low point of your swing is behind the ball. Shift your weight to your lead side earlier in the downswing and focus on making contact with the ball first, then the turf.',
          'The Shank is when the ball shoots off the hosel (the joint between the clubhead and shaft) and goes sharply to the right. It is often caused by standing too close to the ball or the arms extending away from the body during the downswing. Check your distance from the ball and focus on keeping your hands closer to your body through impact.',
        ],
        tips: [
          'Work on one fix at a time. Trying to correct multiple things simultaneously leads to confusion and frustration.',
          'Most swing faults trace back to grip, alignment, or ball position. Check these basics before looking for complicated fixes.',
          'Consider a lesson with a PGA professional if a fault persists. A trained eye can identify the root cause quickly.',
        ],
        keyTakeaways: [
          'The slice is the most common beginner fault, fixed by strengthening grip and improving swing path.',
          'Most faults originate from fundamentals: grip, stance, alignment, or ball position.',
          'Fix one thing at a time and consider professional instruction for persistent problems.',
        ],
      },
    ],
  },
  {
    id: 'module-4',
    title: 'Short Game',
    description: 'Develop the finesse shots around the green that will save you the most strokes and lower your scores fastest.',
    icon: '\u{26F3}',
    lessons: [
      {
        id: 'lesson-4-1',
        title: 'Putting Basics',
        estimatedMinutes: 5,
        content: [
          'Putting accounts for nearly half of all strokes in a round of golf. Improving your putting is the fastest way to lower your scores, and the good news is that it requires touch and practice rather than strength or athleticism.',
          'The putting stroke is a pendulum motion controlled by the shoulders, with the wrists remaining quiet and stable. Your arms and the putter should move as a single unit, rocking from the shoulders. This produces the consistent speed and direction control needed for accurate putting.',
          'Reading the green is the art of determining which way a putt will curve (break) based on the slope of the green. Stand behind your ball and look at the overall contour of the green. Water always drains downhill, so imagine where water would flow to identify the break.',
          'Speed control is more important than line. A putt with the right speed that is slightly off-line will still end up close to the hole. A putt with the right line but wrong speed can roll far past or stop well short. Practice lag putting (long putts focused on getting the ball close) to develop distance control.',
          'A consistent setup is crucial in putting. Your eyes should be directly over the ball or slightly inside the ball-to-target line. Position the ball slightly forward of center in your stance and let your arms hang naturally.',
        ],
        tips: [
          'Practice the 3-foot circle drill: place balls in a circle 3 feet from the hole and make them all. This builds confidence on short putts.',
          'For distance control, practice putting to a tee stuck in the green at various distances rather than always putting to a hole.',
          'Keep your head still during the stroke. Peeking too early to see where the ball is going causes mishits.',
        ],
        keyTakeaways: [
          'Putting is a shoulder-controlled pendulum stroke with quiet wrists.',
          'Speed control matters more than perfect line on most putts.',
          'Eyes over the ball and a consistent setup create reliable putting.',
        ],
      },
      {
        id: 'lesson-4-2',
        title: 'Chipping Technique',
        estimatedMinutes: 5,
        content: [
          'Chipping is a short, low shot played from just off the green. The goal is to get the ball rolling on the green as quickly as possible and let it roll to the hole like a putt. Think of a chip as a putt with a little loft to carry over the fringe.',
          'The chip shot setup is compact: narrow stance (feet close together), ball positioned slightly back of center, weight favoring your lead foot (about 60/40). Your hands should be ahead of the ball at address, and they should stay ahead through impact.',
          'Use a putting-like stroke with minimal wrist action. The backswing and follow-through should be roughly the same length. There is no need to take a big swing. The loft of the club and the length of your stroke determine how far the ball travels.',
          'Club selection matters in chipping. Use a less-lofted club (like a 7 or 8-iron) when you have lots of green to work with, and a more-lofted club (sand wedge, lob wedge) when you need the ball to stop quickly. The rule of thumb: get the ball on the ground and rolling as soon as possible.',
        ],
        tips: [
          'Practice the "one-third carry, two-thirds roll" rule with a pitching wedge. This ratio helps you judge landing spots.',
          'Pick a specific spot on the green where you want the ball to land, not just the hole. Chips are about controlling the landing spot.',
          'For a simple chip, use the same stroke you would use for a long putt. This simplifies the motion.',
        ],
        keyTakeaways: [
          'Chips are short, low shots designed to get the ball rolling on the green quickly.',
          'Set up with weight forward, ball back, and hands ahead. Use a putting-like stroke.',
          'Choose your club based on how much green you have: less loft for more green, more loft for less green.',
        ],
      },
      {
        id: 'lesson-4-3',
        title: 'Pitching & Lob Shots',
        estimatedMinutes: 5,
        content: [
          'Pitch shots travel higher and farther than chips, typically ranging from 20 to 60 yards. They are used when you need the ball to carry over an obstacle or stop quickly on the green. Mastering the pitch shot adds versatility to your short game.',
          'The pitch shot uses a larger swing than a chip, incorporating wrist hinge and body rotation. Set up with a slightly wider stance than for a chip, the ball positioned in the center of your stance, and allow your wrists to hinge naturally during the backswing.',
          'Distance control on pitch shots comes from the length of your backswing, not from swinging harder or softer. Practice three backswing lengths: hands to hip height (short pitch), hands to chest height (medium pitch), and hands to shoulder height (full pitch). Each produces a predictable distance with a given club.',
          'The lob shot is a specialized high pitch that lands softly with minimal roll. It requires an open clubface (aimed slightly right for right-handers) and a full swing that slides the club under the ball. This is an advanced shot, so focus on standard pitches first and add the lob to your repertoire later.',
        ],
        tips: [
          'Practice your three backswing lengths on the range with a sand wedge. Note the distance each produces and you have a reliable distance system.',
          'Accelerate through the ball on pitch shots. Decelerating is the number one cause of chunked or bladed pitches.',
          'The lob shot is a confidence shot. Only attempt it when you have practiced it enough to trust it.',
        ],
        keyTakeaways: [
          'Pitch shots are higher and longer than chips, used to carry obstacles and stop the ball quickly.',
          'Control distance by varying backswing length, not swing speed.',
          'Master standard pitches before attempting the advanced lob shot.',
        ],
      },
      {
        id: 'lesson-4-4',
        title: 'Bunker Play Basics',
        estimatedMinutes: 5,
        content: [
          'Bunkers (sand traps) can intimidate beginners, but the greenside bunker shot is actually one of the most forgiving in golf once you understand the technique. Unlike every other shot, you do not want to hit the ball first.',
          'The greenside bunker shot is the only standard shot where you intentionally hit behind the ball. Open the clubface of your sand wedge (aim it right of target), aim your body slightly left of target, and swing along your body line. The club enters the sand about 1-2 inches behind the ball and slides underneath it. The sand lifts the ball out.',
          'Set up with a wide stance and dig your feet into the sand for stability (this also lowers the bottom of your swing). Play the ball slightly forward in your stance. The swing should be full and committed. The biggest mistake in bunkers is quitting on the swing or trying to help the ball out.',
          'The amount of sand you take determines distance. More sand between the club and ball produces a shorter, softer shot. Less sand produces a longer shot that runs out more. With practice, you can control bunker shot distances quite effectively.',
        ],
        tips: [
          'Practice drawing a line in the sand 1-2 inches behind the ball and focus on hitting that line, not the ball.',
          'Commit to a full, confident swing. The sand slows the club down significantly, so you need more swing speed than you might expect.',
          'If your course allows it, spend extra practice time in the bunker. Bunker shots improve rapidly with dedicated practice.',
        ],
        keyTakeaways: [
          'Bunker shots hit the sand behind the ball, not the ball itself.',
          'Open the clubface, aim your body left, and make a full, committed swing.',
          'The amount of sand between club and ball controls the distance.',
        ],
      },
    ],
  },
  {
    id: 'module-5',
    title: 'Course Etiquette & Rules',
    description: 'Understand the essential rules, scoring, and etiquette that make golf enjoyable for everyone on the course.',
    icon: '\u{1F4D6}',
    lessons: [
      {
        id: 'lesson-5-1',
        title: 'Golf Etiquette Essentials',
        estimatedMinutes: 5,
        content: [
          'Golf etiquette is the set of unwritten (and sometimes written) rules that ensure everyone on the course has an enjoyable experience. Following good etiquette shows respect for fellow golfers, the course, and the game itself.',
          'On the tee box, stand still and remain quiet when others are hitting. Position yourself out of the hitter\'s peripheral vision, ideally behind them. The person with the lowest score on the previous hole traditionally hits first (called having "honors"), though in casual play, "ready golf" (whoever is ready hits first) is encouraged to keep the pace moving.',
          'On the fairway and approach shots, the player farthest from the hole hits first. Be aware of your shadow and make sure it does not cross another player\'s line or fall in their field of vision. Replace any divots you make by placing the chunk of turf back in the hole or filling it with the sand/seed mixture provided on carts.',
          'On the green, the most etiquette rules apply. Do not walk on the line between another player\'s ball and the hole. Mark your ball when asked. Repair ball marks (dents in the green) using your divot repair tool. Remove the flagstick carefully without damaging the edge of the hole. Do not drag your feet on the green.',
          'General course care includes raking bunkers after use, keeping carts on designated paths, and not littering. Treat the course like you want to find it the next time you play.',
        ],
        tips: [
          'When in doubt, observe what more experienced golfers in your group do and follow their lead.',
          'Always repair at least two ball marks on each green: yours and one other. This keeps the greens smooth for everyone.',
          'Turn your phone to silent mode before the round. Unexpected rings or notifications can distract players mid-swing.',
        ],
        keyTakeaways: [
          'Stay still and quiet when others are hitting. Position yourself out of their line of sight.',
          'Repair divots on the fairway and ball marks on the green.',
          'Treat the course with care: rake bunkers, follow cart rules, and pick up after yourself.',
        ],
      },
      {
        id: 'lesson-5-2',
        title: 'Basic Rules of Golf',
        estimatedMinutes: 6,
        content: [
          'Golf has a comprehensive rulebook, but as a beginner, you only need to know a handful of rules to play your first rounds confidently and correctly. The rest you can learn as situations arise.',
          'Play the ball as it lies. This is the most fundamental rule. You must hit the ball from where it lands without moving it, improving your lie, or removing natural obstacles (like rocks or twigs in certain areas). There are exceptions, such as on the tee box and when rules allow relief.',
          'Out of Bounds (OB) is marked by white stakes along the course boundary. If your ball goes OB, you take a one-stroke penalty and replay the shot from the original position. The practical result is called "stroke and distance." Many courses offer a local rule allowing you to drop near where the ball went OB with a two-stroke penalty to speed up play.',
          'Water hazards (now called penalty areas) are marked by yellow or red stakes. Yellow penalty areas give you two options: replay from the original spot (stroke and distance) or drop behind the hazard keeping the point where the ball crossed the margin between you and the hole. Red penalty areas add a third option: drop within two club lengths of where the ball crossed the margin, no closer to the hole. All options carry a one-stroke penalty.',
          'Unplayable lies can be declared anywhere on the course (except in penalty areas). If your ball is in a position you cannot play, take a one-stroke penalty and choose from: drop within two club lengths no closer to the hole, go back as far as you want on a line from the hole through where the ball lay, or replay from the original position.',
          'In casual rounds, many groups use "gimme putts" (conceding very short putts), mulligans (do-over shots, usually on the first tee), and maximum scores per hole (like double par) to keep the game fun and moving. These are not in the official rules but are widely accepted in friendly play.',
        ],
        tips: [
          'Carry a small rules card or bookmark the USGA rules app on your phone for quick reference during a round.',
          'If you are unsure about a rule during a casual round, play two balls: one as you think is correct and one with the alternative. Sort it out after the round.',
          'Do not stress about knowing every rule. Focus on the basics and learn new rules as you encounter situations.',
        ],
        keyTakeaways: [
          'Play the ball as it lies is the foundational rule of golf.',
          'Out of bounds, penalty areas, and unplayable lies all carry a one-stroke penalty with specific relief options.',
          'In casual play, common courtesies like gimmes and maximum scores keep the game enjoyable.',
        ],
      },
      {
        id: 'lesson-5-3',
        title: 'Scoring & Handicaps',
        estimatedMinutes: 5,
        content: [
          'Understanding how golf is scored helps you set goals, track improvement, and compete with golfers of all skill levels through the handicap system.',
          'Each hole has a par, which is the expected number of strokes for a skilled golfer to complete the hole. Par-3 holes are short, par-4 holes are medium, and par-5 holes are long. A typical 18-hole course has a total par of around 72 (usually four par-3s, ten par-4s, and four par-5s).',
          'Scoring terms are based on your relation to par for a hole: a birdie is one under par, a par is even, a bogey is one over, a double bogey is two over, and so on. Most beginners regularly shoot bogeys and double bogeys, which is completely normal and expected. Celebrate your pars and enjoy the journey.',
          'Your handicap is a number that represents your potential ability relative to par. A 20-handicap golfer, for example, typically shoots around 92 on a par-72 course. The handicap system allows golfers of different abilities to compete fairly by adjusting scores.',
          'To establish a handicap, you need to submit scores from multiple rounds (usually at least 3 to 5) through an official handicap service. Your handicap is calculated based on your best recent scores, not your average, reflecting your potential rather than your typical performance.',
        ],
        tips: [
          'Do not worry about your score in your first several rounds. Focus on learning, having fun, and developing good habits.',
          'Track your scores hole by hole, even in casual rounds. This data helps you identify which parts of your game need the most work.',
          'Set up a handicap through your local golf association or the USGA GHIN system. It makes competitive play much more fun.',
        ],
        keyTakeaways: [
          'Par is the expected number of strokes for a skilled golfer. Bogey golf (one over per hole) is a great beginner goal.',
          'The handicap system lets golfers of all levels compete fairly by adjusting scores.',
          'Track your scores consistently to measure improvement and establish a handicap.',
        ],
      },
      {
        id: 'lesson-5-4',
        title: 'Pace of Play',
        estimatedMinutes: 4,
        content: [
          'Pace of play refers to how long it takes to complete a round. Slow play is one of the biggest complaints in golf, and being mindful of your pace shows respect for everyone on the course.',
          'An 18-hole round should take about 4 to 4.5 hours for a foursome. To maintain good pace, be ready to hit when it is your turn. Start thinking about your next shot, selecting your club, and planning while others are playing. This is called "ready golf" and is encouraged in all but the most formal competitions.',
          'If your group falls behind the group ahead, look for ways to speed up. Walk briskly between shots, limit practice swings to one or two, and be efficient on the green. If the group behind you is waiting, let them play through (allow them to pass your group) at the next par-3 or when there is a natural opening.',
          'When searching for a lost ball, the rules allow three minutes. If you do not find it within that time, take the appropriate penalty and drop a ball to continue play. Spending extra time searching holds up everyone behind you.',
        ],
        tips: [
          'Play "ready golf" in casual rounds: whoever is ready hits first, regardless of who is farthest from the hole.',
          'If you are having a rough hole and your score is already high, consider picking up your ball and moving to the next hole to keep the pace moving.',
          'Arrive at the course with enough time to warm up so you are ready to go when your tee time arrives.',
        ],
        keyTakeaways: [
          'Target 4 to 4.5 hours for 18 holes. Being mindful of pace respects everyone on the course.',
          'Ready golf, limiting practice swings, and being efficient on the green are the biggest pace helpers.',
          'Let faster groups play through when you fall behind. Limit ball searches to three minutes.',
        ],
      },
    ],
  },
  {
    id: 'module-6',
    title: 'Playing Your First Round',
    description: 'Put it all together and feel confident stepping onto the course for your very first round of golf.',
    icon: '\u{1F3C6}',
    lessons: [
      {
        id: 'lesson-6-1',
        title: 'Before You Go - Preparation',
        estimatedMinutes: 5,
        content: [
          'Proper preparation makes your first round of golf much more enjoyable and less stressful. Taking care of logistics ahead of time lets you focus on playing and having fun.',
          'Book a tee time in advance, especially on weekends. Many courses offer online booking. For your first round, consider playing during off-peak times (weekday afternoons) when the course is less crowded and you will feel less pressure.',
          'Pack your bag the night before. Essentials include: clubs, golf balls (bring plenty, at least a dozen), tees, a glove, ball markers, a divot repair tool, a towel, sunscreen, a water bottle, and a small snack. Check the weather forecast and dress in layers if needed.',
          'Arrive at the course 30-45 minutes before your tee time. This gives you time to check in at the pro shop, warm up on the putting green and driving range, and get settled. Rushing to the first tee sets a stressful tone for the round.',
          'Consider playing a par-3 course or an executive course (shorter holes) for your very first round. These courses are less intimidating, rounds are shorter, and they are designed to be beginner-friendly.',
        ],
        tips: [
          'Tell the pro shop staff that you are a beginner when you check in. They can pair you with patient players or suggest the best time to play.',
          'Bring a rangefinder or download a free GPS golf app to know distances to the green. It helps with club selection.',
          'Eat a light meal before your round. Golf takes 4+ hours, and low energy leads to poor focus in the later holes.',
        ],
        keyTakeaways: [
          'Book tee times during off-peak hours for a less pressured first experience.',
          'Arrive 30-45 minutes early to warm up and check in without rushing.',
          'Pack your bag the night before with all essentials plus plenty of extra balls.',
        ],
      },
      {
        id: 'lesson-6-2',
        title: 'On the First Tee',
        estimatedMinutes: 4,
        content: [
          'The first tee can feel nerve-wracking, even for experienced golfers. Having a plan and keeping things simple will help you start your round with confidence.',
          'Before hitting, take a moment to observe the hole. Look at where the fairway is, where the trouble spots are (bunkers, water, trees), and pick a conservative target. Your goal on the first tee is not to hit a perfect drive; it is to get the ball in play.',
          'Consider using a fairway wood or hybrid off the first tee instead of the driver. These clubs are shorter and easier to control, giving you a higher chance of a good shot when nerves are at their peak. There is no rule that says you must hit driver off the tee.',
          'Run through your pre-shot routine just as you practiced. Take a deep breath, visualize the shot, make one or two easy practice swings, and commit to your target. Do not worry about distance. A shorter shot in the fairway is far better than a long shot in the trees.',
          'If you hit a poor first shot, no worries. Take a breath, accept it, and move on. One shot does not define your round. Every golfer, from beginners to professionals, has hit bad shots on the first tee. The round is 18 holes long, and there is plenty of time to find your rhythm.',
        ],
        tips: [
          'Tee the ball lower than normal for your first shot. This encourages a more controlled, sweeping swing.',
          'Focus on making smooth contact rather than swinging hard. An easy 80% swing produces better results than an anxious full swing.',
          'Smile and introduce yourself to your playing partners. A friendly atmosphere makes the whole round more enjoyable.',
        ],
        keyTakeaways: [
          'Use a fairway wood or hybrid off the first tee for more control when nerves are high.',
          'Pick a conservative target and focus on getting the ball in play, not hitting it far.',
          'A bad first shot is normal. Breathe, move on, and enjoy the round.',
        ],
      },
      {
        id: 'lesson-6-3',
        title: 'Navigating the Course',
        estimatedMinutes: 5,
        content: [
          'Once you are past the first tee, it is time to settle into the flow of the round. Course management, meaning making smart decisions about where to aim and which shots to play, is just as important as swing technique.',
          'Play to your strengths and away from trouble. If there is water on the left side of the fairway, aim to the right side. If there is a bunker guarding the front of the green, club up and aim for the middle or back of the green. The goal is to avoid big numbers by staying out of penalty situations.',
          'Know your distances. If you hit your 7-iron 120 yards and the pin is 150 yards away, use a longer club. Many beginners try to hit a club harder to cover the distance rather than simply using the correct club. Swinging easy with the right club always beats swinging hard with the wrong one.',
          'When you find yourself in trouble (thick rough, behind trees, bad lie), resist the temptation to hit a heroic recovery shot. Instead, take your medicine: pitch the ball back to the fairway and give yourself a clean shot to the green. This mindset prevents one bad shot from becoming a disastrous hole.',
          'Pay attention to the flow of the course: uphill holes play longer, downhill holes play shorter, wind affects ball flight, and wet conditions reduce roll. These factors all influence your club selection and strategy.',
        ],
        tips: [
          'Aim for the center of every green. Pin-hunting (aiming at the flag) often leads to missing the green entirely.',
          'After each shot, immediately think about your next shot. What club will you need? Where should you aim? This keeps you mentally engaged and ready.',
          'Keep a simple mental scorecard: fairway hit or missed, green in regulation or not, and number of putts. This tells you where to focus your practice.',
        ],
        keyTakeaways: [
          'Course management means making smart decisions: aim away from trouble and play to your strengths.',
          'Use the right club for the distance rather than swinging harder with the wrong club.',
          'When in trouble, take your medicine and pitch back to safety rather than attempting hero shots.',
        ],
      },
      {
        id: 'lesson-6-4',
        title: 'Post-Round - What to Do After',
        estimatedMinutes: 3,
        content: [
          'What you do after your round matters for your development as a golfer and for building good habits. Take a few minutes to reflect, practice, and take care of the social aspects of the game.',
          'After holing out on the 18th green, shake hands with your playing partners, thank them for the round, and remove your hat or cap as a sign of respect. This tradition is one of the things that makes golf special.',
          'Take a few minutes to reflect on your round. What went well? What needs improvement? Many golfers find it helpful to jot down quick notes while the round is fresh: holes where they played well, recurring mistakes, and areas to practice. This reflection accelerates improvement.',
          'If the course has a practice area, spend 15-20 minutes working on whatever gave you the most trouble during the round. Was it putting? Spend time on the practice green. Struggling with tee shots? Hit a small bucket on the range. This targeted practice after a round is extremely effective because the feelings and situations are fresh in your mind.',
          'Finally, enjoy the "19th hole," the clubhouse or restaurant where golfers gather after a round to socialize, share stories, and relax. Golf is a social game, and some of the best memories happen off the course. Whether it is a cold drink, a meal, or just conversation, take time to enjoy the community.',
        ],
        tips: [
          'Record your score in a tracking app or notebook after every round, even the rough ones. Data drives improvement.',
          'Clean your clubs after the round. A damp towel and a brush keep grooves clear for the next time out.',
          'Schedule your next round or practice session before you leave the course. Momentum keeps you improving.',
        ],
        keyTakeaways: [
          'Shake hands with playing partners and reflect on your round while it is fresh.',
          'Targeted post-round practice on your weakest area is highly effective.',
          'Enjoy the social side of golf. Building connections on the course enhances the whole experience.',
        ],
      },
    ],
  },
];

export function getModule(moduleId: string): Module | undefined {
  return modules.find((m) => m.id === moduleId);
}

export function getLesson(moduleId: string, lessonId: string): Lesson | undefined {
  return getModule(moduleId)?.lessons.find((l) => l.id === lessonId);
}

export function getAdjacentLessons(
  moduleId: string,
  lessonId: string
): { prev: { moduleId: string; lessonId: string } | null; next: { moduleId: string; lessonId: string } | null } {
  const flatLessons: { moduleId: string; lessonId: string }[] = [];
  for (const mod of modules) {
    for (const lesson of mod.lessons) {
      flatLessons.push({ moduleId: mod.id, lessonId: lesson.id });
    }
  }
  const idx = flatLessons.findIndex((l) => l.moduleId === moduleId && l.lessonId === lessonId);
  return {
    prev: idx > 0 ? flatLessons[idx - 1] : null,
    next: idx < flatLessons.length - 1 ? flatLessons[idx + 1] : null,
  };
}

export function getTotalEstimatedMinutes(mod: Module): number {
  return mod.lessons.reduce((sum, l) => sum + l.estimatedMinutes, 0);
}
