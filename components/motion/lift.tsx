"use client";

import { m } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

const MotionLink = m.create(Link);

const gesture = { y: -4 };
const spring = { type: "spring", stiffness: 320, damping: 26 } as const;

type LiftLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

/** A link card with hover and focus feedback. Reduced motion drops the transform. */
export function LiftLink(props: LiftLinkProps) {
  return <MotionLink {...props} whileHover={gesture} whileFocus={gesture} transition={spring} />;
}
