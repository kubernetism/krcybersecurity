import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/ui/container";
import { PlusGrid } from "@/components/ui/plus-grid";
import { SectionHeader } from "@/components/ui/section-header";
import { skills } from "@/content/skills";
import { cn } from "@/lib/cn";

/** Column spans and surfaces repeat in this order, so any number of skills works. */
const CELLS = [
  { span: "lg:col-span-3", surface: "plain" },
  { span: "lg:col-span-5", surface: "blue" },
  { span: "lg:col-span-4", surface: "grid" },
  { span: "lg:col-span-3", surface: "grid" },
  { span: "lg:col-span-4", surface: "plain" },
  { span: "lg:col-span-5", surface: "plain" },
] as const;

/** Skills as an asymmetric grid of named cells. */
export function SkillsGrid({ index, label = "Toolkit" }: { index: string; label?: string }) {
  return (
    <section aria-labelledby="skills-heading" className="pb-16 md:pb-28">
      <Container>
        <SectionHeader index={index} label={label} id="skills-heading" />
        <Stagger interval={0.06} className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-12">
          {skills.map((skill, position) => {
            const cell = CELLS[position % CELLS.length] ?? CELLS[0];
            return (
              <StaggerItem key={skill.name} className={cn("h-full", cell.span)}>
                <div
                  className={cn(
                    "frame-ticks relative flex h-full min-h-40 flex-col justify-between gap-8 overflow-clip border p-4 transition-colors duration-300 md:min-h-56 md:p-5",
                    cell.surface === "blue"
                      ? "border-accent [background:var(--gradient-cell)]"
                      : "border-line bg-ink-900 hover:border-accent",
                  )}
                >
                  {cell.surface === "grid" ? (
                    <PlusGrid className="opacity-[0.14] [mask-image:linear-gradient(to_top_right,transparent_30%,black)]" />
                  ) : null}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "type-label relative",
                      cell.surface === "blue" ? "text-accent-pale" : "text-accent-soft",
                    )}
                  >
                    {String(position + 1).padStart(2, "0")}
                  </span>
                  <p className="type-poster relative text-[clamp(2.5rem,4.4vw,4.5rem)] text-fg">{skill.name}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
