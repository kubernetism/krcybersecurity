"use client";

import { m, useAnimationControls, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { EASE_OUT_EXPO, useEntrance, type EntranceTrigger } from "./entrance";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds before the entrance begins. */
  delay?: number;
  /** Starting vertical offset in pixels. */
  y?: number;
  duration?: number;
  /** `load` is for hero elements and pairs with a CSS failsafe. */
  trigger?: EntranceTrigger;
};

/** Fades and lifts its children into place when they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  duration = 0.8,
  trigger = "scroll",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  useEntrance(ref, controls, { trigger });

  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0, transition: { duration, delay, ease: EASE_OUT_EXPO } },
  };

  return (
    <m.div
      ref={ref}
      data-reveal
      className={cn(trigger === "load" && "entrance-failsafe", className)}
      variants={variants}
      initial={false}
      animate={controls}
    >
      {children}
    </m.div>
  );
}
