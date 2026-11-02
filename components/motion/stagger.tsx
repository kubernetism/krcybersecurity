"use client";

import { m, useAnimationControls, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { EASE_OUT_EXPO, useEntrance, type EntranceTrigger } from "./entrance";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Seconds between children. */
  interval?: number;
  /** Seconds before the first child. */
  delay?: number;
  trigger?: EntranceTrigger;
};

/** Wraps StaggerItems so they enter one after another. */
export function Stagger({
  children,
  className,
  interval = 0.08,
  delay = 0,
  trigger = "scroll",
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  useEntrance(ref, controls, { trigger, amount: 0.1 });

  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: interval, delayChildren: delay } },
  };

  return (
    <m.div
      ref={ref}
      className={cn(trigger === "load" && "entrance-failsafe", className)}
      variants={variants}
      initial={false}
      animate={controls}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div data-reveal className={className} variants={itemVariants}>
      {children}
    </m.div>
  );
}
