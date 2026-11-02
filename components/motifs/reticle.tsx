const TICK_ANGLES = Array.from({ length: 36 }, (_, index) => index * 10);

/** Targeting ring that frames the specimen. */
export function Reticle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke="#cfe5ff" strokeWidth="0.6">
        <circle cx="200" cy="200" r="196" opacity="0.55" strokeDasharray="1 5" />
        <circle cx="200" cy="200" r="176" opacity="0.4" />
        {TICK_ANGLES.map((angle) => (
          <line
            key={angle}
            x1="200"
            y1={angle % 90 === 0 ? 12 : 18}
            x2="200"
            y2="24"
            opacity="0.8"
            transform={`rotate(${angle} 200 200)`}
          />
        ))}
      </g>
    </svg>
  );
}
