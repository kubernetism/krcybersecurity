"use client";

import { m, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

/**
 * Vertical progress rail that fills as its parent section scrolls past. The fill
 * is hidden by CSS under reduced motion, so server and client markup always match.
 */
export function ScrollRail({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <div ref={ref} aria-hidden="true" className={className}>
      <div className="absolute inset-0 bg-line" />
      <m.div className="absolute inset-0 origin-top bg-accent motion-reduce:hidden" style={{ scaleY }} />
    </div>
  );
}
