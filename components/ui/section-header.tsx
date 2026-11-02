import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  /** Two-digit section number. */
  index: string;
  label: string;
  title?: string;
  id?: string;
  className?: string;
  /** Use "onBlue" on the electric-blue band. */
  tone?: "default" | "onBlue";
};

/** The `01 // SECTION` header with an optional mono uppercase headline. */
export function SectionHeader({ index, label, title, id, className, tone = "default" }: SectionHeaderProps) {
  const isOnBlue = tone === "onBlue";
  const heading = (
    <span className={cn("type-label flex items-center gap-3", isOnBlue ? "text-fg" : "text-fg-muted")}>
      <span className={isOnBlue ? "text-accent-pale" : "text-accent-soft"}>{index}</span>
      <span aria-hidden="true">{"//"}</span>
      <span>{label}</span>
    </span>
  );

  return (
    <header className={cn("border-t pt-3", isOnBlue ? "border-accent-pale/40" : "border-line", className)}>
      {title ? (
        <>
          {heading}
          <h2
            id={id}
            className="type-headline mt-6 max-w-[22ch] text-[clamp(1.75rem,4vw,3.5rem)] text-fg"
          >
            {title}
          </h2>
        </>
      ) : (
        <h2 id={id}>{heading}</h2>
      )}
    </header>
  );
}
