import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PanelProps = {
  children: ReactNode;
  className?: string;
  /** Corner registration marks. */
  ticks?: boolean;
  as?: "div" | "article" | "section";
};

/** A framed surface with a 1px border. */
export function Panel({ children, className, ticks = true, as: Tag = "div" }: PanelProps) {
  return (
    <Tag
      className={cn(
        "relative border border-line bg-ink-900",
        ticks && "frame-ticks",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
