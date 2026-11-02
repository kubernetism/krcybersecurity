"use client";

import { m, useReducedMotionConfig, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

/** Drifts its children slower than the page as the hero scrolls away. */
export function HeroParallax({ children, className }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotionConfig();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, reducedMotion ? 0 : 110]);

  return (
    <m.div className={className} style={{ y }}>
      {children}
    </m.div>
  );
}
