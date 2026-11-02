import { Reveal } from "@/components/motion/reveal";
import { ScrollRail } from "@/components/motion/scroll-rail";
import { Hexdump } from "@/components/motifs/hexdump";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { experienceAreas } from "@/content/experience";

/**
 * Experience as an indexed list beside a scroll-linked rail. No dates are known,
 * so it is ordered by area, and optional fields render only when present.
 */
export function ExperienceTimeline({ index }: { index: string }) {
  return (
    <section aria-labelledby="experience-heading" className="pb-16 md:pb-28">
      <Container>
        <SectionHeader index={index} label="Experience" id="experience-heading" />
        <div className="relative mt-8 md:mt-12 md:grid md:grid-cols-12">
          <ol aria-hidden="true" className="type-label sticky top-6 hidden self-start md:col-span-2 md:block">
            {experienceAreas.map((area, position) => (
              <li key={area.id} className="flex gap-4 py-1 text-fg-muted">
                <span className="text-accent-soft">{String.fromCharCode(65 + position)})</span>
                {area.name}
              </li>
            ))}
          </ol>
          <div className="relative pl-5 md:col-span-10 md:col-start-3 md:pl-10">
            <ScrollRail className="absolute inset-y-0 left-0 w-px" />
            <ul>
              {experienceAreas.map((area) => (
                <li key={area.id} className="border-b border-line py-8 first:pt-0 last:border-b-0 md:py-14">
                  <Reveal>
                    <h3 className="type-poster text-[clamp(3rem,10vw,9rem)] text-fg">{area.name}</h3>
                    {area.organisation || area.period ? (
                      <p className="mt-4 font-mono text-sm text-fg-muted">
                        {[area.organisation, area.period].filter(Boolean).join(", ")}
                      </p>
                    ) : null}
                    {area.highlights?.length ? (
                      <ul className="mt-5 max-w-[60ch] list-disc space-y-2 pl-5 text-fg-muted">
                        {area.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    ) : null}
                    <Hexdump text={area.name} className="mt-6 overflow-hidden text-xs text-accent-soft/80 md:text-sm" />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
