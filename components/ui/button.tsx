"use client";

import { m, type Variants } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const MotionLink = m.create(Link);

const buttonVariants: Variants = {
  rest: { y: 0 },
  active: { y: -2 },
  pressed: { y: 0, scale: 0.98 },
};

const arrowVariants: Variants = {
  rest: { x: 0, y: 0 },
  active: { x: 3, y: -3 },
};

const spring = { type: "spring", stiffness: 420, damping: 28 } as const;

const styles = {
  primary: "bg-accent text-on-accent border-accent hover:bg-accent-soft hover:border-accent-soft",
  ghost: "bg-ink-950 text-fg border-line-strong hover:border-accent-soft",
} as const;

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof styles;
  className?: string;
};

export function Button({ href, children, variant = "primary", className }: ButtonProps) {
  return (
    <MotionLink
      href={href}
      className={cn(
        "type-label inline-flex min-h-11 items-center gap-3 whitespace-nowrap border px-4 font-medium transition-colors duration-200",
        styles[variant],
        className,
      )}
      variants={buttonVariants}
      initial="rest"
      animate="rest"
      whileHover="active"
      whileFocus="active"
      whileTap="pressed"
      transition={spring}
    >
      <span>{children}</span>
      <m.span aria-hidden="true" variants={arrowVariants} transition={spring} className="inline-block">
        ↗
      </m.span>
    </MotionLink>
  );
}
