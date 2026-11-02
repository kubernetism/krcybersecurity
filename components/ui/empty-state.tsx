import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { PlusGrid } from "./plus-grid";

type EmptyStateProps = {
  /** Shell command shown as a decorative line, naming what was looked up. */
  command: string;
  /** What the command prints, which must be literally true of the data. */
  output: string;
  title: string;
  children: ReactNode;
};

/** An honest, designed placeholder for a section with no content yet. */
export function EmptyState({ command, output, title, children }: EmptyStateProps) {
  return (
    <Reveal>
      <div className="relative overflow-clip border border-dashed border-line-strong bg-ink-900 px-5 py-14 md:px-10 md:py-24">
        <PlusGrid className="opacity-[0.12] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="relative max-w-2xl">
          <p aria-hidden="true" className="font-mono text-sm text-fg-muted">
            <span className="text-accent-soft">$</span> {command}
            <br />
            {output}
            <span className="ml-1 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] bg-accent-soft" />
          </p>
          <h2 className="type-headline mt-8 text-[clamp(1.5rem,3.4vw,2.75rem)] text-fg">{title}</h2>
          <div className="mt-4 max-w-[52ch] text-base leading-relaxed text-fg-muted md:text-lg">
            {children}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
