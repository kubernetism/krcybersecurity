"use client";

import { m, useAnimationControls, useReducedMotionConfig, type Variants } from "framer-motion";
import { useLayoutEffect, type ReactNode } from "react";
import { EASE_OUT_EXPO, hasSettled } from "./entrance";

const variants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT_EXPO } },
};

/**
 * Enter-only page transition, mounted from `app/template.tsx`. Exit animations
 * are deliberately left out: AnimatePresence needs the outgoing route to stay
 * mounted, which the App Router does not support without private internals.
 * Skipped on first load, so server-rendered pages are never hidden.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const controls = useAnimationControls();
  const reducedMotion = useReducedMotionConfig();

  useLayoutEffect(() => {
    if (reducedMotion || !hasSettled()) return;
    controls.set("hidden");
    void controls.start("visible");
  }, [controls, reducedMotion]);

  return (
    <m.div data-reveal variants={variants} initial={false} animate={controls}>
      {children}
    </m.div>
  );
}
