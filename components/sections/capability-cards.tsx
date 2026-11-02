import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Hexdump } from "@/components/motifs/hexdump";
import { Reticle } from "@/components/motifs/reticle";
import { SpecimenBeetle } from "@/components/motifs/specimen-beetle";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { PlusGrid } from "@/components/ui/plus-grid";
import { SectionHeader } from "@/components/ui/section-header";
import { experienceAreas } from "@/content/experience";

function CapabilityVisual({ areaId, name }: { areaId: string; name: string }) {
  if (areaId === "bug-hunting") {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Reticle className="absolute h-[92%] max-w-full" />
        <SpecimenBeetle className="relative h-[72%] rotate-[-14deg]" />
      </div>
    );
  }
  return (
    <div className="absolute inset-0 flex items-center p-5 md:p-8">
      <Hexdump
        text={`${name} ${name} ${name} ${name}`}
        className="overflow-hidden text-[clamp(0.72rem,1.55vw,1.4rem)] text-accent-soft"
      />
    </div>
  );
}

/** Experience areas as two unequal panels. Each visual is decorative. */
export function CapabilityCards({ index }: { index: string }) {
  return (
    <section aria-labelledby="capabilities-heading" className="pb-16 md:pb-28">
      <Container>
        <SectionHeader
          index={index}
          label="Experience"
          title={experienceAreas.map((area) => area.name).join(" and ")}
          id="capabilities-heading"
        />
        <Stagger className="mt-8 grid gap-3 md:mt-12 md:grid-cols-12">
          {experienceAreas.map((area, position) => (
            <StaggerItem
              key={area.id}
              className={position % 2 === 0 ? "md:col-span-7" : "md:col-span-5"}
            >
              <Panel as="article" className="flex h-full flex-col transition-colors duration-300 hover:border-accent">
                <div className="relative min-h-64 flex-1 overflow-clip border-b border-line bg-ink-850 md:min-h-[26rem]">
                  <PlusGrid className="opacity-[0.14]" />
                  <CapabilityVisual areaId={area.id} name={area.name} />
                </div>
                <div className="flex items-baseline justify-between gap-4 p-4 md:p-5">
                  <h3 className="type-poster text-[clamp(2rem,4vw,3.75rem)] text-fg">{area.name}</h3>
                  <span aria-hidden="true" className="type-label text-accent-soft">
                    {String.fromCharCode(65 + position)})
                  </span>
                </div>
              </Panel>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
