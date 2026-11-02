import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** A small mono tag. */
export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "type-label inline-flex items-center border border-line-strong bg-ink-800 px-2.5 py-1.5 text-fg",
        className,
      )}
    >
      {children}
    </span>
  );
}
