"use client";

import { m, type Variants } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const MotionLink = m.create(Link);

const underlineVariants: Variants = {
  rest: { scaleX: 0 },
  active: { scaleX: 1 },
};

/** Primary navigation link with a current-page state and a drawn underline. */
export function NavLink({ href, label, className }: { href: string; label: string; className?: string }) {
  const pathname = usePathname();
  const isCurrent = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <MotionLink
      href={href}
      aria-current={isCurrent ? "page" : undefined}
      initial="rest"
      animate={isCurrent ? "active" : "rest"}
      whileHover="active"
      whileFocus="active"
      className={cn(
        "type-label relative flex min-h-11 items-center justify-center px-1 transition-colors duration-200 hover:text-fg sm:px-3",
        isCurrent ? "text-fg" : "text-fg-muted",
        className,
      )}
    >
      {label}
      <m.span
        aria-hidden="true"
        variants={underlineVariants}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-x-1 bottom-1.5 h-px origin-left bg-accent-soft sm:inset-x-3"
      />
    </MotionLink>
  );
}
