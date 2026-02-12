interface SwingAnimationProps {
  phase: number;
  className?: string;
}

interface FigurePosition {
  headX: number;
  headY: number;
  shoulderX: number;
  shoulderY: number;
  hipX: number;
  hipY: number;
  frontKneeX: number;
  frontKneeY: number;
  frontFootX: number;
  frontFootY: number;
  backKneeX: number;
  backKneeY: number;
  backFootX: number;
  backFootY: number;
  handsX: number;
  handsY: number;
  elbowX: number;
  elbowY: number;
  clubEndX: number;
  clubEndY: number;
}

const positions: FigurePosition[] = [
  // Setup
  {
    headX: 150, headY: 55,
    shoulderX: 150, shoulderY: 85,
    hipX: 150, hipY: 140,
    frontKneeX: 130, frontKneeY: 175,
    frontFootX: 125, frontFootY: 210,
    backKneeX: 170, backKneeY: 175,
    backFootX: 175, backFootY: 210,
    handsX: 140, handsY: 125,
    elbowX: 145, elbowY: 105,
    clubEndX: 140, clubEndY: 210,
  },
  // Backswing
  {
    headX: 155, headY: 55,
    shoulderX: 155, shoulderY: 85,
    hipX: 152, hipY: 140,
    frontKneeX: 130, frontKneeY: 175,
    frontFootX: 125, frontFootY: 210,
    backKneeX: 172, backKneeY: 175,
    backFootX: 178, backFootY: 210,
    handsX: 195, handsY: 55,
    elbowX: 178, elbowY: 72,
    clubEndX: 185, clubEndY: 15,
  },
  // Downswing
  {
    headX: 148, headY: 55,
    shoulderX: 148, shoulderY: 85,
    hipX: 145, hipY: 140,
    frontKneeX: 128, frontKneeY: 175,
    frontFootX: 123, frontFootY: 210,
    backKneeX: 168, backKneeY: 175,
    backFootX: 175, backFootY: 210,
    handsX: 155, handsY: 95,
    elbowX: 160, elbowY: 82,
    clubEndX: 170, clubEndY: 55,
  },
  // Impact
  {
    headX: 145, headY: 55,
    shoulderX: 143, shoulderY: 85,
    hipX: 140, hipY: 140,
    frontKneeX: 125, frontKneeY: 172,
    frontFootX: 120, frontFootY: 210,
    backKneeX: 165, backKneeY: 178,
    backFootX: 172, backFootY: 210,
    handsX: 130, handsY: 120,
    elbowX: 135, elbowY: 100,
    clubEndX: 130, clubEndY: 210,
  },
  // Follow-through
  {
    headX: 142, headY: 58,
    shoulderX: 140, shoulderY: 88,
    hipX: 138, hipY: 140,
    frontKneeX: 122, frontKneeY: 172,
    frontFootX: 118, frontFootY: 210,
    backKneeX: 160, backKneeY: 178,
    backFootX: 165, backFootY: 213,
    handsX: 105, handsY: 48,
    elbowX: 118, elbowY: 68,
    clubEndX: 95, clubEndY: 8,
  },
];

export function SwingAnimation({ phase, className = '' }: SwingAnimationProps) {
  const p = positions[phase] ?? positions[0];

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 300 230"
        className="w-full max-w-xs"
        role="img"
        aria-label={`Golfer in phase ${phase + 1} position`}
      >
        {/* Ground line */}
        <line x1="60" y1="212" x2="240" y2="212" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="6 3" />

        {/* Ball */}
        <circle cx="140" cy="208" r="4" fill="#f9fafb" stroke="#6b7280" strokeWidth="1" />

        {/* Tee (small) */}
        <line x1="140" y1="210" x2="140" y2="214" stroke="#d97706" strokeWidth="1.5" />

        {/* Club */}
        <line
          x1={p.handsX} y1={p.handsY}
          x2={p.clubEndX} y2={p.clubEndY}
          stroke="#6b7280"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
        {/* Club head */}
        <line
          x1={p.clubEndX} y1={p.clubEndY}
          x2={p.clubEndX + 8} y2={p.clubEndY + 2}
          stroke="#374151"
          strokeWidth="4"
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />

        {/* Back leg: hip -> back knee -> back foot */}
        <line
          x1={p.hipX} y1={p.hipY}
          x2={p.backKneeX} y2={p.backKneeY}
          stroke="#1f2937"
          strokeWidth="3"
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
        <line
          x1={p.backKneeX} y1={p.backKneeY}
          x2={p.backFootX} y2={p.backFootY}
          stroke="#1f2937"
          strokeWidth="3"
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />

        {/* Front leg: hip -> front knee -> front foot */}
        <line
          x1={p.hipX} y1={p.hipY}
          x2={p.frontKneeX} y2={p.frontKneeY}
          stroke="#1f2937"
          strokeWidth="3"
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
        <line
          x1={p.frontKneeX} y1={p.frontKneeY}
          x2={p.frontFootX} y2={p.frontFootY}
          stroke="#1f2937"
          strokeWidth="3"
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />

        {/* Body: shoulder -> hip */}
        <line
          x1={p.shoulderX} y1={p.shoulderY}
          x2={p.hipX} y2={p.hipY}
          stroke="#1f2937"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />

        {/* Upper arm: shoulder -> elbow */}
        <line
          x1={p.shoulderX} y1={p.shoulderY}
          x2={p.elbowX} y2={p.elbowY}
          stroke="#1f2937"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
        {/* Forearm: elbow -> hands */}
        <line
          x1={p.elbowX} y1={p.elbowY}
          x2={p.handsX} y2={p.handsY}
          stroke="#1f2937"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />

        {/* Head */}
        <circle
          cx={p.headX} cy={p.headY}
          r="14"
          fill="#fef3c7"
          stroke="#1f2937"
          strokeWidth="2"
          className="transition-all duration-500 ease-in-out"
        />

        {/* Cap visor */}
        <line
          x1={p.headX - 8} y1={p.headY - 5}
          x2={p.headX - 18} y2={p.headY - 3}
          stroke="#15803d"
          strokeWidth="3"
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />

        {/* Shoes */}
        <ellipse
          cx={p.frontFootX} cy={p.frontFootY + 2}
          rx="8" ry="3"
          fill="#1f2937"
          className="transition-all duration-500 ease-in-out"
        />
        <ellipse
          cx={p.backFootX} cy={p.backFootY + 2}
          rx="8" ry="3"
          fill="#1f2937"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
    </div>
  );
}
