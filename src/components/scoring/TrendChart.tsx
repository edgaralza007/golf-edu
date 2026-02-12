interface DataPoint {
  label: string;
  value: number;
}

interface TrendChartProps {
  data: DataPoint[];
  title: string;
  referenceLine?: number;
  referenceLabel?: string;
  color?: string;
}

export function TrendChart({
  data,
  title,
  referenceLine,
  referenceLabel,
  color = '#15803d',
}: TrendChartProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
        <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
          No data yet
        </div>
      </div>
    );
  }

  const width = 400;
  const height = 200;
  const padding = { top: 20, right: 20, bottom: 40, left: 45 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const values = data.map((d) => d.value);
  const allValues = referenceLine != null ? [...values, referenceLine] : values;
  const minVal = Math.min(...allValues) - 2;
  const maxVal = Math.max(...allValues) + 2;
  const range = maxVal - minVal || 1;

  const xScale = (i: number) =>
    padding.left + (data.length === 1 ? chartW / 2 : (i / (data.length - 1)) * chartW);
  const yScale = (v: number) =>
    padding.top + chartH - ((v - minVal) / range) * chartH;

  const points = data.map((d, i) => ({ x: xScale(i), y: yScale(d.value) }));
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

  const yTicks = 5;
  const yTickValues = Array.from({ length: yTicks }, (_, i) =>
    Math.round(minVal + (range * i) / (yTicks - 1))
  );

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ minWidth: 300 }}>
          {/* Y-axis grid lines and labels */}
          {yTickValues.map((v) => (
            <g key={v}>
              <line
                x1={padding.left}
                y1={yScale(v)}
                x2={width - padding.right}
                y2={yScale(v)}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
              <text
                x={padding.left - 8}
                y={yScale(v) + 4}
                textAnchor="end"
                className="text-[10px]"
                fill="#9ca3af"
              >
                {v}
              </text>
            </g>
          ))}

          {/* Reference line */}
          {referenceLine != null && (
            <g>
              <line
                x1={padding.left}
                y1={yScale(referenceLine)}
                x2={width - padding.right}
                y2={yScale(referenceLine)}
                stroke="#f59e0b"
                strokeWidth={1.5}
                strokeDasharray="6 3"
              />
              {referenceLabel && (
                <text
                  x={width - padding.right}
                  y={yScale(referenceLine) - 6}
                  textAnchor="end"
                  className="text-[10px]"
                  fill="#f59e0b"
                  fontWeight="600"
                >
                  {referenceLabel}
                </text>
              )}
            </g>
          )}

          {/* Data line */}
          <path d={linePath} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

          {/* Data points */}
          {points.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={4} fill="white" stroke={color} strokeWidth={2} />
              {/* X-axis labels */}
              <text
                x={p.x}
                y={height - padding.bottom + 16}
                textAnchor="middle"
                className="text-[9px]"
                fill="#9ca3af"
                transform={`rotate(-30, ${p.x}, ${height - padding.bottom + 16})`}
              >
                {data[i].label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
