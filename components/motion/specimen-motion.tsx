"use client";

import { inView, useAnimate, useReducedMotionConfig } from "framer-motion";
import { useEffect, type ReactNode } from "react";

/** Slowly turns the targeting reticle. Static under reduced motion, paused off screen. */
export function SpecimenMotion({ reticle, children }: { reticle: ReactNode; children: ReactNode }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reducedMotion = useReducedMotionConfig();

  useEffect(() => {
    const ring = scope.current;
    if (!ring || reducedMotion) return;

    const spin = animate(ring, { rotate: 360 }, { duration: 90, ease: "linear", repeat: Infinity });
    spin.pause();

    const stopWatching = inView(ring, () => {
      spin.play();
      return () => spin.pause();
    });

    return () => {
      stopWatching();
      spin.stop();
    };
  }, [animate, reducedMotion, scope]);

  return (
    <div className="relative h-full w-full">
      {children}
      <div ref={scope} className="pointer-events-none absolute inset-[6%_4%_auto_4%] aspect-square">
        {reticle}
      </div>
    </div>
  );
}
