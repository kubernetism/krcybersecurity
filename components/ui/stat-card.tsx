import { Panel } from "./panel";

/** A framed fact: a large value above a mono caption. */
export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <Panel className="relative h-full overflow-clip p-4 transition-colors duration-300 hover:border-accent md:p-5">
      <div
        aria-hidden="true"
        className="plus-grid absolute inset-y-0 right-0 w-2/3 opacity-20 [mask-image:linear-gradient(to_left,black,transparent)]"
      />
      <p className="relative">
        <span className="type-poster block text-[clamp(2.25rem,3.7vw,3.5rem)] text-fg">{value}</span>
        <span className="mt-3 block font-mono text-xs leading-snug text-fg-muted md:text-sm">
          {label}
        </span>
      </p>
    </Panel>
  );
}
