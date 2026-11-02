"use client";

import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { scheduleSettled } from "./entrance";

/**
 * Root motion context. `reducedMotion="user"` makes every motion component honour
 * the visitor's system setting, and LazyMotion with `m` keeps the bundle small.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => scheduleSettled(), []);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
