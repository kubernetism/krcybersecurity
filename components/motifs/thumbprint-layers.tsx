import type { Thumbprint } from "@/lib/thumbprint";

/** Clips the generated ridges to the shape of a thumb. */
function ThumbSvg({ print, clipId, children, className }: { print: Thumbprint; clipId: string; children: React.ReactNode; className?: string }) {
  return (
    <svg viewBox={`0 0 ${print.width} ${print.height}`} className={className} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={clipId}>
          <ellipse cx={print.width / 2} cy={print.height / 2} rx={print.width / 2 - 2} ry={print.height / 2 - 2} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
        {children}
      </g>
    </svg>
  );
}

const STACKED = "absolute inset-0 h-full w-full";

/**
 * The print as stacked layers, each animated separately by ThumbprintScanner:
 * faint base ridges, bright ridges lit by the scan, a reference print that aligns
 * onto it, and the minutiae markers. The default render is the finished state.
 */
export function ThumbprintLayers({ print, idPrefix }: { print: Thumbprint; idPrefix: string }) {
  const allRidges = print.ridges.map((ridge) => <path key={ridge} d={ridge} />);

  return (
    <>
      <ThumbSvg print={print} clipId={`${idPrefix}-base`} className={`${STACKED} text-accent-pale/20`}>
        {allRidges}
      </ThumbSvg>
      <ThumbSvg print={print} clipId={`${idPrefix}-lit`} className={`${STACKED} text-accent-pale`}>
        {print.ridges.map((ridge) => (
          <path key={ridge} d={ridge} data-ridge />
        ))}
      </ThumbSvg>
      <div data-reference className={`${STACKED} opacity-0`}>
        <ThumbSvg print={print} clipId={`${idPrefix}-reference`} className="h-full w-full text-accent">
          {allRidges}
        </ThumbSvg>
      </div>
      <svg viewBox={`0 0 ${print.width} ${print.height}`} className={STACKED} aria-hidden="true" focusable="false">
        {print.minutiae.map((point) => (
          <rect
            key={`${point.x}-${point.y}`}
            data-minutia
            x={point.x - 6}
            y={point.y - 6}
            width="12"
            height="12"
            fill="none"
            stroke="var(--color-accent-soft)"
            strokeWidth="2.6"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}
      </svg>
    </>
  );
}
