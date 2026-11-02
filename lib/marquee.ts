/**
 * Timing for the CSS marquee. Distance is always exactly one set of items, so the
 * loop is seamless by construction. These numbers only set speed and how many
 * copies are needed, so a small error in estimated widths cannot cause a visible jump.
 */

/** CSS px per second, measured from the reference recording (63 device px/s at 2x). */
export const MARQUEE_SPEED = 31.5;
/** Space between items, matching `--marquee-gap` in globals.css. */
export const MARQUEE_GAP_WIDE = 106;
export const MARQUEE_GAP_NARROW = 64;
/** The row must overfill this width while one set scrolls away. */
const COVERAGE_WIDTH = 5760;
/** Average width of one label character at 14px Archivo medium, measured in a browser. */
const LABEL_CHARACTER_WIDTH = 7.1;

export type Size = { width: number; height: number };

/** Scales a logo to the row height, and narrower if it would be too wide. */
export function fitLogo(natural: Partial<Size>, maxHeight: number, maxWidth: number): Size | null {
  const { width, height } = natural;
  if (!width || !height || !Number.isFinite(width) || !Number.isFinite(height)) return null;

  const scale = Math.min(maxHeight / height, maxWidth / width);
  return { width: Math.round(width * scale), height: Math.round(height * scale) };
}

export type MarqueeTiming = {
  /** How many identical sets to render, including the original. */
  copies: number;
  durationWide: number;
  durationNarrow: number;
};

/** An item is as wide as the larger of its visual and its label. */
export function estimateItemWidth(label: string, visualWidth: number): number {
  return Math.max(visualWidth, label.length * LABEL_CHARACTER_WIDTH);
}

function setWidth(itemWidths: number[], gap: number): number {
  return itemWidths.reduce((total, width) => total + width + gap, 0);
}

export function getMarqueeTiming(itemWidths: number[]): MarqueeTiming {
  const wide = setWidth(itemWidths, MARQUEE_GAP_WIDE);
  const narrow = setWidth(itemWidths, MARQUEE_GAP_NARROW);
  return {
    // One extra set is what scrolls away while the rest still fill the viewport.
    copies: wide > 0 ? Math.ceil(COVERAGE_WIDTH / wide) + 1 : 1,
    durationWide: wide / MARQUEE_SPEED,
    durationNarrow: narrow / MARQUEE_SPEED,
  };
}
