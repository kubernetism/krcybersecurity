import { useId } from "react";

/**
 * Original motif: a bug hunter's specimen. A beetle seen from above, drawn as a
 * flat silhouette with circuit traces cut into its wing cases. Only the right
 * half is authored; the left half is its mirror image.
 */
const TRACES = [
  "M548 640V850l34 34V1090",
  "M590 620V790l44 44V1010l-22 22V1170",
  "M640 612V740l46 46V960",
  "M690 640V740l36 36V880",
];
const VIAS: Array<[number, number]> = [
  [548, 640],
  [582, 1090],
  [590, 620],
  [612, 1170],
  [640, 612],
  [686, 960],
  [690, 640],
  [726, 880],
];
const LEGS = [
  "M690 470 806 402 846 262 906 196 950 110",
  "M782 700 918 640 1010 716 1090 690",
  "M792 880 930 924 1000 1086 1082 1170",
];
const ANTENNA = "M552 268 616 214 642 128 700 72 712 8";

export function SpecimenBeetle({ className }: { className?: string }) {
  const id = useId();
  const shell = `${id}-shell`;
  const half = `${id}-half`;

  return (
    <svg viewBox="-110 0 1220 1300" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={shell} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1300">
          <stop offset="0" stopColor="#7f8b9d" />
          <stop offset="0.3" stopColor="#c3ccd9" />
          <stop offset="0.62" stopColor="#f2f6fb" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <g id={half}>
          <g fill="none" stroke={`url(#${shell})`} strokeLinejoin="miter" strokeMiterlimit="6">
            <path d={ANTENNA} strokeWidth="9" />
            {LEGS.map((leg) => (
              <path key={leg} d={leg} strokeWidth="17" />
            ))}
          </g>
          {/* Heavier upper leg segments. */}
          <g fill={`url(#${shell})`}>
            <path d="M676 452 812 378 826 410 700 500Z" />
            <path d="M770 672 924 618 930 656 790 728Z" />
            <path d="M782 852 940 900 930 948 790 910Z" />
            {/* Tibia spurs. */}
            <path d="M846 262 878 292 836 300Z" />
            <path d="M1010 716 1020 760 978 724Z" />
            <path d="M1000 1086 1046 1096 1002 1126Z" />
          </g>
          {/* Mandible. */}
          <path
            d="M528 252C566 228 586 188 566 136 600 170 616 226 590 268 574 288 548 286 528 276Z"
            fill={`url(#${shell})`}
          />
          {/* Head. */}
          <path d="M500 246H548L584 286 576 336 544 368H500Z" fill={`url(#${shell})`} />
          {/* Pronotum. */}
          <path
            d="M500 378H566C640 378 694 404 712 456L724 526C726 566 700 590 656 594H500Z"
            fill={`url(#${shell})`}
          />
          {/* Wing case. */}
          <path
            d="M508 604H664C736 606 782 656 798 744 824 908 800 1076 700 1186 628 1262 548 1282 508 1286Z"
            fill={`url(#${shell})`}
          />
          {/* Eye and cuts. */}
          <path d="M556 290 578 296 570 322 548 314Z" fill="#0a3a94" />
          <path d="M500 480H620L668 520" fill="none" stroke="#0a3a94" strokeWidth="4" />
          <g fill="none" stroke="#0a3a94" strokeWidth="4" strokeLinejoin="miter">
            {TRACES.map((trace) => (
              <path key={trace} d={trace} />
            ))}
          </g>
          <g fill="#0a3a94">
            {VIAS.map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="8" />
            ))}
          </g>
        </g>
      </defs>
      <use href={`#${half}`} />
      <use href={`#${half}`} transform="matrix(-1 0 0 1 1000 0)" />
      {/* Chip on the pronotum, seam and scutellum on the centre line. */}
      <rect x="456" y="412" width="88" height="88" fill="#0a3a94" />
      <rect x="474" y="430" width="52" height="52" fill="#cfe5ff" />
      <path d="M500 604V1286" stroke="#0a3a94" strokeWidth="5" fill="none" />
      <path d="M452 604H548L500 690Z" fill="#0a3a94" />
    </svg>
  );
}
