"use client";

import { m, useAnimationControls, type Variants } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { EASE_OUT_EXPO, useEntrance, type EntranceTrigger } from "./entrance";

const lineVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.028, delayChildren: 0.05 } },
};

const letterVariants: Variants = {
  hidden: { y: "108%" },
  visible: { y: 0, transition: { duration: 0.95, ease: EASE_OUT_EXPO } },
};

/** Letters rise out of a clipped baseline, one after another. */
export function WordmarkLetters({
  lines,
  trigger = "load",
  className,
}: {
  lines: string[];
  trigger?: EntranceTrigger;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const controls = useAnimationControls();
  useEntrance(ref, controls, { trigger, amount: 0.2 });

  return (
    <m.span
      ref={ref}
      aria-hidden="true"
      className={cn(
        "wordmark__text type-poster",
        trigger === "load" && "entrance-failsafe",
        className,
      )}
      variants={lineVariants}
      initial={false}
      animate={controls}
    >
      {lines.map((line) => (
        <span key={line} className="wordmark__line">
          {Array.from(line).map((letter, letterIndex) => (
            <m.span key={`${letter}-${letterIndex}`} className="wordmark__letter" variants={letterVariants}>
              {letter}
            </m.span>
          ))}
        </span>
      ))}
    </m.span>
  );
}
