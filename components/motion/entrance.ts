"use client";

import { inView, useReducedMotionConfig, type LegacyAnimationControls } from "framer-motion";
import { useLayoutEffect, type RefObject } from "react";

/**
 * The entrance rule shared by every animated component.
 *
 * The server always renders content visible, so it survives slow or failed
 * JavaScript. Animation is layered on after hydration, in a layout effect, which
 * runs before the browser paints the change:
 *
 *  - On first load, anything already on screen stays put (the reader has seen
 *    it), and anything below the fold is hidden and revealed when scrolled to.
 *  - After a client-side navigation nothing has been painted yet, so everything
 *    can animate in.
 *  - `load` elements (the hero) are hidden by CSS with a timed failsafe, then
 *    armed here. If hydration comes after the failsafe has started, they are
 *    left alone.
 */
export type EntranceTrigger = "scroll" | "load";

/** Matches the `.entrance-failsafe` animation delay in globals.css. */
const FAILSAFE_DELAY_MS = 900;
const SETTLE_DELAY_MS = 250;

let settled = false;

/** Called once by MotionProvider. After this, mounts come from navigation. */
export function scheduleSettled(): () => void {
  const timer = window.setTimeout(() => {
    settled = true;
  }, SETTLE_DELAY_MS);
  return () => window.clearTimeout(timer);
}

export function hasSettled(): boolean {
  return settled;
}

function isOnScreen(element: Element): boolean {
  const { top, bottom } = element.getBoundingClientRect();
  return top < window.innerHeight && bottom > 0;
}

type EntranceOptions = {
  trigger?: EntranceTrigger;
  /** Fraction of the element that must be visible before it reveals. */
  amount?: number;
};

export function useEntrance(
  ref: RefObject<HTMLElement | null>,
  controls: LegacyAnimationControls,
  { trigger = "scroll", amount = 0.15 }: EntranceOptions = {},
): void {
  const reducedMotion = useReducedMotionConfig();

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion) return;

    if (trigger === "load") {
      if (!hasSettled() && performance.now() > FAILSAFE_DELAY_MS) return;
      element.dataset.armed = "true";
      controls.set("hidden");
      void controls.start("visible");
      return;
    }

    if (!hasSettled() && isOnScreen(element)) return;

    controls.set("hidden");
    return inView(
      element,
      () => {
        void controls.start("visible");
      },
      { amount },
    );
  }, [ref, controls, trigger, amount, reducedMotion]);
}

/** Long, soft deceleration used by all entrances. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
