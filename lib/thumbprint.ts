/**
 * Generates an original, entirely synthetic thumbprint: a whorl core inside nested
 * loops, above sweeping lower ridges. It is deterministic and belongs to nobody.
 * Ridge breaks produce the minutiae, so markers land on real ridge endings.
 */
export type Point = { x: number; y: number };

export type Thumbprint = {
  width: number;
  height: number;
  /** SVG path data, ordered top to bottom so a scan can reveal them in sequence. */
  ridges: string[];
  minutiae: Point[];
};

const WIDTH = 200;
const HEIGHT = 260;
const CENTRE: Point = { x: 100, y: 128 };
const WHORL_COUNT = 6;
const LOOP_COUNT = 15;
const LOOP_STEPS = 26;
const LOWER_COUNT = 8;
const LOWER_STEPS = 18;
const MINUTIAE_LIMIT = 9;

/** Stable pseudo-random value in [0, 1) for a given seed. */
function noise(seed: number): number {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function round(value: number): number {
  return Math.round(value * 10) / 10;
}

function toPath(points: Point[]): string {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"}${round(point.x)} ${round(point.y)}`)
    .join("");
}

function isInsideThumb({ x, y }: Point, margin: number): boolean {
  const dx = (x - WIDTH / 2) / (WIDTH / 2);
  const dy = (y - HEIGHT / 2) / (HEIGHT / 2);
  return dx * dx + dy * dy < margin;
}

function loopRidge(index: number): Point[] {
  const radius = 7 + index * 6.4;
  const points: Point[] = [];

  // Inner ridges close into the whorl. Outer ones sweep over the top, open at the bottom.
  const isClosed = index < WHORL_COUNT;
  const startDegrees = isClosed ? -90 : -48;
  const sweepDegrees = isClosed ? 360 : 276;

  for (let step = 0; step <= LOOP_STEPS; step += 1) {
    const angle = ((startDegrees + (step / LOOP_STEPS) * sweepDegrees) * Math.PI) / 180;
    const wobble =
      1 + 0.045 * Math.sin(3 * angle + index * 0.7) + 0.022 * Math.sin(7 * angle + index * 1.3);
    points.push({
      x: CENTRE.x + radius * wobble * 0.86 * Math.cos(angle),
      y: CENTRE.y - radius * wobble * 1.2 * Math.sin(angle),
    });
  }

  return points;
}

function lowerRidge(index: number): Point[] {
  const baseline = 196 + index * 9;
  const points: Point[] = [];

  for (let step = 0; step <= LOWER_STEPS; step += 1) {
    const x = 4 + (step / LOWER_STEPS) * 192;
    const offset = (x - WIDTH / 2) / (WIDTH / 2);
    points.push({
      x,
      y: baseline - 26 * offset * offset + 2.2 * Math.sin(offset * 4 + index),
    });
  }

  return points;
}

/** Cuts a seeded gap into a ridge. Returns the pieces and the new ridge endings. */
function breakRidge(points: Point[], seed: number): { pieces: Point[][]; endings: Point[] } {
  if (noise(seed) < 0.35) return { pieces: [points], endings: [] };

  const cut = 3 + Math.floor(noise(seed + 1) * (points.length - 8));
  const gap = 2;
  const before = points.slice(0, cut + 1);
  const after = points.slice(cut + gap);
  const endings = [before.at(-1), after[0]].filter((point): point is Point => point !== undefined);

  return { pieces: [before, after], endings };
}

function averageY(points: Point[]): number {
  return points.reduce((sum, point) => sum + point.y, 0) / points.length;
}

export function createThumbprint(): Thumbprint {
  const pieces: Point[][] = [];
  const endings: Point[] = [];

  const ridges = [
    ...Array.from({ length: LOOP_COUNT }, (_, index) => loopRidge(index)),
    ...Array.from({ length: LOWER_COUNT }, (_, index) => lowerRidge(index)),
  ];

  ridges.forEach((ridge, index) => {
    const result = breakRidge(ridge, index + 1);
    pieces.push(...result.pieces);
    endings.push(...result.endings);
  });

  // Keep endings well inside the thumb, then thin them out so markers do not crowd.
  const minutiae: Point[] = [];
  for (const ending of endings) {
    if (minutiae.length >= MINUTIAE_LIMIT) break;
    if (!isInsideThumb(ending, 0.62)) continue;
    const isCrowded = minutiae.some((point) => Math.hypot(point.x - ending.x, point.y - ending.y) < 24);
    if (!isCrowded) minutiae.push({ x: round(ending.x), y: round(ending.y) });
  }

  return {
    width: WIDTH,
    height: HEIGHT,
    ridges: pieces
      .sort((a, b) => averageY(a) - averageY(b))
      .map(toPath),
    minutiae,
  };
}
