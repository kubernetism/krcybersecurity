"use client";

import { AnimatePresence, m, useReducedMotionConfig, type Variants } from "framer-motion";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

const PANEL_WIDTH = 416;
const PANEL_MARGIN = 16;
const CLOSE_DELAY_MS = 140;
const EASE = [0.16, 1, 0.3, 1] as const;

type Inspection = {
  id: string;
  title: string;
  note: string;
  left: number;
  top: number;
  width: number;
  /** Where the connector meets the panel, relative to the panel's left edge. */
  anchor: number;
  /** The copy to highlight. Null highlights every copy, since a clone may be what shows. */
  element: HTMLElement | null;
};

const screenVariants: Variants = {
  closed: { opacity: 0, transition: { duration: 0.14 } },
  open: { opacity: 1, transition: { duration: 0.1, staggerChildren: 0.1 } },
};

const connectorVariants: Variants = {
  closed: { scaleY: 0, transition: { duration: 0.1 } },
  open: { scaleY: 1, transition: { duration: 0.14, ease: "linear" } },
};

const shutterVariants: Variants = {
  closed: { scaleY: 0.012, scaleX: 0.12, transition: { duration: 0.14, ease: "easeIn" } },
  open: {
    scaleY: 1,
    scaleX: 1,
    transition: {
      scaleX: { duration: 0.22, ease: EASE },
      scaleY: { duration: 0.34, delay: 0.2, ease: EASE },
      delayChildren: 0.38,
      staggerChildren: 0.018,
    },
  },
};

const revealVariants: Variants = {
  closed: { opacity: 0, transition: { duration: 0.08 } },
  open: { opacity: 1, transition: { duration: 0.001 } },
};

const noteVariants: Variants = {
  closed: { opacity: 0, transition: { duration: 0.08 } },
  open: { opacity: 1, transition: { duration: 0.25, delay: 0.3 } },
};

const scanVariants: Variants = {
  closed: { y: "0%", opacity: 0, transition: { duration: 0.08 } },
  open: {
    y: "100%",
    opacity: [0, 1, 1, 0],
    transition: { duration: 0.85, delay: 0.42, ease: "easeInOut" },
  },
};

const CORNERS = [
  "left-0 top-0 border-l-2 border-t-2",
  "right-0 top-0 border-r-2 border-t-2",
  "bottom-0 left-0 border-b-2 border-l-2",
  "bottom-0 right-0 border-b-2 border-r-2",
];

function findTrigger(target: EventTarget | null): HTMLElement | null {
  return target instanceof Element ? target.closest<HTMLElement>("[data-marquee-trigger]") : null;
}

/**
 * Adds the "screen opening" to a Marquee, which stays a server component. Pointing at
 * an item stops the row and opens the screen; so does keyboard focus or a tap. It stays
 * open while the pointer is on it, and Escape dismisses it. Only transform and opacity
 * animate. Without JavaScript the row still stops on hover, by CSS.
 */
export function MarqueeInspector({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const reducedMotion = useReducedMotionConfig();
  const [inspection, setInspection] = useState<Inspection | null>(null);

  const cancelClose = useCallback(() => window.clearTimeout(closeTimer.current), []);
  const close = useCallback(() => {
    cancelClose();
    setInspection(null);
  }, [cancelClose]);
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setInspection(null), CLOSE_DELAY_MS);
  }, [cancelClose]);

  const open = useCallback(
    (trigger: HTMLElement, center: number, highlightAllCopies = false) => {
      const root = rootRef.current;
      const { marqueeId, marqueeTitle, marqueeNote } = trigger.dataset;
      if (!root || !marqueeId || !marqueeTitle) return;

      cancelClose();
      const rootBox = root.getBoundingClientRect();
      const triggerBox = trigger.getBoundingClientRect();
      const width = Math.min(PANEL_WIDTH, rootBox.width - PANEL_MARGIN * 2);
      const left = Math.max(PANEL_MARGIN, Math.min(center - width / 2, rootBox.width - width - PANEL_MARGIN));

      setInspection({
        id: marqueeId,
        title: marqueeTitle,
        note: marqueeNote ?? "",
        width,
        left,
        top: triggerBox.bottom - rootBox.top,
        anchor: center - left,
        element: highlightAllCopies ? null : trigger,
      });
    },
    [cancelClose],
  );

  const centerOf = (element: Element) => {
    const box = element.getBoundingClientRect();
    return box.left + box.width / 2 - (rootRef.current?.getBoundingClientRect().left ?? 0);
  };

  const onPointerOver = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const target = event.target;
    if (target instanceof Element && target.closest("[data-marquee-screen]")) {
      cancelClose();
      return;
    }
    const trigger = findTrigger(target);
    if (trigger) open(trigger, centerOf(trigger));
    else scheduleClose();
  };

  const onPointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") scheduleClose();
  };

  // Touch has no hover: a tap toggles the screen, and tapping elsewhere closes it.
  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    const trigger = findTrigger(event.target);
    if (!trigger) {
      close();
      return;
    }
    if (inspection?.id === trigger.dataset.marqueeId && event.detail > 0 && !trigger.matches(":hover")) close();
    else open(trigger, centerOf(trigger));
  };

  const onFocus = (event: FocusEvent<HTMLDivElement>) => {
    const trigger = findTrigger(event.target);
    if (!trigger || !event.target.matches(":focus-visible")) return;

    // The focused button may be scrolled out of the row, so bring its position to the
    // centre. A clone may be what shows there, so the highlight follows the item's id.
    const root = rootRef.current;
    const track = root?.querySelector<HTMLElement>(".marquee__track");
    const animation = track?.getAnimations()[0];
    const set = track?.firstElementChild;
    if (root && track && animation && set && !reducedMotion) {
      const duration = Number(animation.effect?.getComputedTiming().duration);
      const trackBox = track.getBoundingClientRect();
      const triggerBox = trigger.getBoundingClientRect();
      const speed = set.getBoundingClientRect().width / duration;
      const fromStart = triggerBox.left + triggerBox.width / 2 - trackBox.left;
      const target = (fromStart - root.getBoundingClientRect().width / 2) / speed;
      animation.currentTime = ((target % duration) + duration) % duration;
    }
    requestAnimationFrame(() => {
      const center = root && !reducedMotion ? root.getBoundingClientRect().width / 2 : centerOf(trigger);
      open(trigger, center, true);
    });
  };

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (findTrigger(event.target) && !event.target.matches(":hover")) close();
  };

  useEffect(() => {
    if (!inspection) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    // A tap anywhere outside closes the screen on touch devices, which have no hover to leave.
    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [close, inspection]);

  const activeId = inspection?.id;
  const activeElement = inspection?.element;
  useLayoutEffect(() => {
    const triggers = rootRef.current?.querySelectorAll<HTMLElement>("[data-marquee-trigger]");
    triggers?.forEach((trigger) => {
      const isActive = activeElement ? trigger === activeElement : trigger.dataset.marqueeId === activeId;
      trigger.toggleAttribute("data-active", isActive);
    });
  }, [activeElement, activeId]);

  useEffect(() => cancelClose, [cancelClose]);

  return (
    // Hover, focus and tap handlers delegate to the triggers inside.
    <div
      ref={rootRef}
      className="marquee-inspector relative"
      data-inspecting={inspection ? "" : undefined}
      onPointerOver={onPointerOver}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {children}

      <AnimatePresence>
        {inspection ? (
          <m.div
            key={inspection.id}
            data-marquee-screen
            aria-hidden="true"
            className="absolute z-30"
            style={{ left: inspection.left, top: inspection.top, width: inspection.width }}
            variants={screenVariants}
            // Reduced motion skips the opening sequence: the finished screen just appears.
            initial={reducedMotion ? false : "closed"}
            animate="open"
            exit="closed"
          >
            <m.span
              className="block h-4 w-px origin-top bg-accent-soft"
              style={{ marginLeft: inspection.anchor }}
              variants={connectorVariants}
            />
            <m.div
              className="relative origin-top overflow-clip border border-accent bg-ink-950 p-5"
              variants={shutterVariants}
            >
              <div className="plus-grid pointer-events-none absolute inset-0 opacity-15" />
              {CORNERS.map((corner) => (
                <span key={corner} className={`absolute h-3 w-3 border-accent-pale ${corner}`} />
              ))}
              <div className="pointer-events-none absolute inset-0 motion-reduce:hidden">
                <m.div className="h-full border-t border-accent-pale" variants={scanVariants} />
              </div>
              <p className="relative">
                {Array.from(inspection.title).map((character, index) => (
                  <m.span
                    key={index}
                    variants={revealVariants}
                    className="type-poster inline-block whitespace-pre text-[clamp(1.45rem,7.2vw,2.15rem)] text-fg"
                  >
                    {character}
                  </m.span>
                ))}
              </p>
              {inspection.note ? (
                <m.p variants={noteVariants} className="relative mt-3 font-mono text-xs text-accent-pale">
                  {inspection.note}
                </m.p>
              ) : null}
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
