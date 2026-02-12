export interface ChecklistItemData {
  id: string;
  label: string;
  tip: string;
}

export interface ChecklistSectionData {
  id: string;
  title: string;
  icon: string;
  items: ChecklistItemData[];
}

export const checklistSections: ChecklistSectionData[] = [
  {
    id: 'what-to-bring',
    title: 'What to Bring',
    icon: '\uD83C\uDF92',
    items: [
      {
        id: 'bring-clubs',
        label: 'Golf clubs (minimum: driver, 7-iron, pitching wedge, putter)',
        tip: "You don't need a full set! 4-6 clubs is plenty to start. Consider borrowing or renting.",
      },
      {
        id: 'bring-balls',
        label: 'Golf balls (6-12 for beginners)',
        tip: 'Buy used/recycled balls to save money. You WILL lose some!',
      },
      {
        id: 'bring-tees',
        label: 'Tees (wooden or plastic)',
        tip: "Grab a handful, they're cheap and you'll break some.",
      },
      {
        id: 'bring-markers',
        label: 'Ball markers (coin works fine)',
        tip: 'A quarter or dime works perfectly as a ball marker on the green.',
      },
      {
        id: 'bring-divot-tool',
        label: 'Divot repair tool',
        tip: 'Many courses give these away for free. Ask at the pro shop.',
      },
      {
        id: 'bring-water',
        label: 'Water bottle',
        tip: 'Stay hydrated! A round takes 3-4 hours. Bring at least 32oz.',
      },
      {
        id: 'bring-sunscreen',
        label: 'Sunscreen',
        tip: 'Apply before you start and reapply at the turn (after 9 holes).',
      },
      {
        id: 'bring-towel',
        label: 'Towel',
        tip: 'Clip it to your bag. Use it to clean clubs and balls.',
      },
      {
        id: 'bring-snacks',
        label: 'Snacks',
        tip: "Granola bars, trail mix, or fruit. You'll burn 800-1200 calories walking 18.",
      },
    ],
  },
  {
    id: 'what-to-wear',
    title: 'What to Wear',
    icon: '\uD83D\uDC55',
    items: [
      {
        id: 'wear-shirt',
        label: 'Collared shirt or golf polo',
        tip: 'Most courses require collared shirts. A clean polo from any brand works.',
      },
      {
        id: 'wear-pants',
        label: 'Golf pants, shorts, or skort (no jeans)',
        tip: 'Khakis, golf shorts, or athletic wear. Avoid denim, cargo shorts, and athletic shorts at nicer courses.',
      },
      {
        id: 'wear-shoes',
        label: 'Golf shoes or clean athletic shoes',
        tip: 'Golf shoes are ideal but clean sneakers work for public/casual courses.',
      },
      {
        id: 'wear-hat',
        label: 'Hat or visor',
        tip: 'Highly recommended for sun protection during a 4-hour round.',
      },
      {
        id: 'wear-jacket',
        label: 'Light jacket or pullover (check weather)',
        tip: 'Mornings can be cool even in summer. Layers are your friend.',
      },
      {
        id: 'wear-rain',
        label: 'Rain gear (if forecast uncertain)',
        tip: "A light rain jacket that doesn't restrict your swing.",
      },
    ],
  },
  {
    id: 'book-tee-time',
    title: 'How to Book a Tee Time',
    icon: '\uD83D\uDCDE',
    items: [
      {
        id: 'book-course',
        label: 'Choose a beginner-friendly course (public/municipal)',
        tip: 'Look for shorter courses, executive courses, or par-3 courses for your first time.',
      },
      {
        id: 'book-online',
        label: 'Book online or call the pro shop',
        tip: "GolfNow, TeeOff, or the course website. Mention you're new - they may suggest quieter times.",
      },
      {
        id: 'book-time',
        label: 'Pick a weekday afternoon or twilight time',
        tip: 'Weekday afternoons are less crowded and often cheaper. Twilight rates start 2-3 hours before sunset.',
      },
      {
        id: 'book-budget',
        label: 'Budget $20-80 for greens fees',
        tip: 'Municipal courses: $20-40. Public courses: $30-60. Ask about beginner/twilight discounts.',
      },
      {
        id: 'book-cart',
        label: 'Decide: walking or riding cart',
        tip: 'Riding is easier for beginners but walking is great exercise. Some courses require carts.',
      },
      {
        id: 'book-arrive',
        label: 'Arrive 30 minutes early',
        tip: 'Check in at the pro shop, get a scorecard, hit the range/putting green to warm up.',
      },
    ],
  },
  {
    id: 'range-warmup',
    title: 'Range Warm-Up Routine',
    icon: '\uD83C\uDFCB\uFE0F',
    items: [
      {
        id: 'warmup-putting',
        label: 'Putting practice (10 min)',
        tip: 'Start with 3-foot putts, then work to 10-15 feet. Focus on pace, not perfection.',
      },
      {
        id: 'warmup-wedge',
        label: 'Short iron/wedge warm-up (10 min)',
        tip: 'Start with your pitching wedge. Half swings, then full. Focus on contact.',
      },
      {
        id: 'warmup-iron',
        label: 'Mid iron practice (5 min)',
        tip: 'Hit 8-10 balls with your 7-iron. Nice smooth swings.',
      },
      {
        id: 'warmup-driver',
        label: 'A few driver swings (5 min)',
        tip: "Just 5-6 drives to loosen up. Don't try to crush it.",
      },
      {
        id: 'warmup-final',
        label: 'Final putting to build confidence',
        tip: 'End on the putting green. Make a few short putts to feel good before teeing off.',
      },
    ],
  },
  {
    id: 'on-course',
    title: 'On-Course Survival Tips',
    icon: '\u26F3',
    items: [
      {
        id: 'course-forward-tees',
        label: 'Play from the forward tees',
        tip: 'No shame! Forward tees make the course shorter and more fun for beginners.',
      },
      {
        id: 'course-ready-golf',
        label: "Use 'ready golf' - play when ready",
        tip: "Don't wait for strict order. If you're ready and it's safe, hit your shot.",
      },
      {
        id: 'course-pick-up',
        label: 'Pick up after double par',
        tip: 'If you reach double par on a hole (e.g., 8 on a par 4), pick up your ball and move on. This keeps pace of play.',
      },
      {
        id: 'course-lost-balls',
        label: "Don't search for lost balls too long",
        tip: 'Limit ball searches to 2 minutes. Drop a new ball and keep playing.',
      },
      {
        id: 'course-phone',
        label: 'Keep your phone on silent',
        tip: "Or use it only for scoring. No calls during other players' shots.",
      },
      {
        id: 'course-repair',
        label: 'Repair ball marks & divots',
        tip: 'Fix your marks on the green, replace divots on the fairway. Leave the course better than you found it.',
      },
      {
        id: 'course-fun',
        label: "Have fun and don't keep strict score",
        tip: 'Your first few rounds are about learning, not scoring. Enjoy being outside!',
      },
    ],
  },
];
