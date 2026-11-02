"use client";

import { inView, steps, useAnimate, useReducedMotionConfig } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/cn";

/** Sets of lines per column. Enough to overfill the tallest hero while one set scrolls away. */
const REPEATS = 5;

type TerminalColumnProps = {
  lines: string[];
  /** Seconds each line stays before the next line feed. */
  secondsPerLine: number;
  className?: string;
};

/**
 * One column of terminal output that feeds upward a line at a time. Only `transform`
 * animates, and it loops seamlessly by moving exactly one set of lines. Static under
 * reduced motion, and paused while off screen.
 */
function TerminalColumn({ lines, secondsPerLine, className }: TerminalColumnProps) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reducedMotion = useReducedMotionConfig();

  useEffect(() => {
    const element = scope.current;
    if (!element || reducedMotion) return;

    const feed = animate(
      element,
      { y: ["0%", `${-100 / REPEATS}%`] },
      {
        duration: lines.length * secondsPerLine,
        ease: steps(lines.length),
        repeat: Infinity,
      },
    );
    feed.pause();

    const stopWatching = inView(element.parentElement ?? element, () => {
      feed.play();
      return () => feed.pause();
    });

    return () => {
      stopWatching();
      feed.stop();
    };
  }, [animate, lines.length, reducedMotion, scope, secondsPerLine]);

  return (
    <div className={cn("min-w-0 overflow-clip", className)}>
      <div ref={scope} className="will-change-transform">
        {Array.from({ length: REPEATS }, (_, set) =>
          lines.map((line, index) => (
            <p key={`${set}-${index}`} className="h-5 truncate whitespace-pre leading-5">
              {line}
            </p>
          )),
        )}
      </div>
    </div>
  );
}

export type TerminalBackdropColumn = { lines: string[]; secondsPerLine: number; className?: string };

/** Full-bleed, decorative terminal texture behind the hero content. */
export function TerminalBackdrop({ columns, className }: { columns: TerminalBackdropColumn[]; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 select-none overflow-clip", className)}>
      <div className="grid h-full grid-cols-2 gap-6 px-gutter font-mono text-[0.6875rem] text-accent-pale md:grid-cols-3 lg:grid-cols-4 lg:gap-10">
        {columns.map((column, index) => (
          <TerminalColumn key={index} {...column} />
        ))}
      </div>
    </div>
  );
}
