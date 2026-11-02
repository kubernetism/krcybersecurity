import { cn } from "@/lib/cn";

/** Decorative plus-sign grid. Position and fade it with `className`. */
export function PlusGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("plus-grid pointer-events-none absolute inset-0", className)}
    />
  );
}
