import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Page-width wrapper shared by every section. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[100rem] px-gutter", className)}>{children}</div>;
}
