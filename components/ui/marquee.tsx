import type { CSSProperties, ReactNode } from "react";
import { MarqueeInspector } from "@/components/motion/marquee-inspector";
import { getMarqueeTiming } from "@/lib/marquee";

export type MarqueeItem = {
  id: string;
  content: ReactNode;
  /** Approximate width in px, used for speed and copy count. See lib/marquee.ts. */
  estimatedWidth: number;
  /** Optional text for the screen MarqueeInspector opens on this item. */
  detail?: { title: string; note?: string };
};

type MarqueeProps = {
  items: MarqueeItem[];
  /** Accessible name for the list. */
  label: string;
};

type MarqueeStyle = CSSProperties & Record<`--marquee-${string}`, string | number>;

/**
 * Endless horizontal row, animated by a CSS keyframe so it can run on the compositor
 * and needs no JavaScript. Only the first set reaches assistive technology; the
 * clones exist only to fill the row. Styles live in globals.css. Under reduced motion
 * the row stops and wraps, showing every item once. Items with `detail` open a screen.
 */
function ItemContent({ item, isClone }: { item: MarqueeItem; isClone: boolean }) {
  if (!item.detail) return item.content;

  const data = {
    "data-marquee-trigger": "",
    "data-marquee-id": item.id,
    "data-marquee-title": item.detail.title,
    "data-marquee-note": item.detail.note,
  };

  // Clones respond to the pointer but stay out of the tab order and accessibility tree.
  if (isClone) {
    return (
      <div className="marquee__trigger" {...data}>
        {item.content}
      </div>
    );
  }

  return (
    <button type="button" className="marquee__trigger" {...data}>
      {item.content}
      <span className="sr-only">
        {item.detail.title}. {item.detail.note}
      </span>
    </button>
  );
}

export function Marquee({ items, label }: MarqueeProps) {
  const { copies, durationWide, durationNarrow } = getMarqueeTiming(
    items.map((item) => item.estimatedWidth),
  );

  const style: MarqueeStyle = {
    "--marquee-copies": copies,
    "--marquee-duration-wide": `${durationWide.toFixed(2)}s`,
    "--marquee-duration-narrow": `${durationNarrow.toFixed(2)}s`,
  };

  return (
    <div className="marquee" style={style}>
      <MarqueeInspector>
        <div className="marquee__viewport">
          <div className="marquee__track">
            {Array.from({ length: copies }, (_, copy) => (
              <ul
                key={copy}
                className="marquee__set"
                aria-hidden={copy > 0 ? "true" : undefined}
                aria-label={copy === 0 ? label : undefined}
                data-marquee-clone={copy > 0 ? "" : undefined}
              >
                {items.map((item) => (
                  <li key={item.id} className="marquee__item">
                    <ItemContent item={item} isClone={copy > 0} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </MarqueeInspector>

      {/* WCAG 2.2.2: moving content needs a way to stop it. A checkbox keeps this CSS-only. */}
      <label className="marquee__toggle type-label">
        <input type="checkbox" className="marquee__toggle-input sr-only" aria-label="Pause logo animation" />
        <span aria-hidden="true" className="marquee__toggle-pause">
          Pause
        </span>
        <span aria-hidden="true" className="marquee__toggle-paused">
          Paused
        </span>
      </label>
    </div>
  );
}
