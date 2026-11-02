import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/ui/container";
import { StatCard } from "@/components/ui/stat-card";
import { certifications } from "@/content/certifications";
import { experienceAreas } from "@/content/experience";
import { profile } from "@/content/profile";

/** Facts only: every card restates a value from `content/`. */
export function StatsRow() {
  const facts = [
    ...certifications.map((certification) => ({
      value: certification.abbreviation,
      label: `${certification.name}, ${certification.issuer}`,
    })),
    { value: profile.location, label: "Location" },
    ...experienceAreas.map((area) => ({ value: area.name, label: "Experience area" })),
  ];

  return (
    <section aria-label="Key facts" className="bg-ink-950 py-3">
      <Container>
        <Stagger className="grid grid-cols-1 gap-3 xs:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <StaggerItem key={fact.value} className="h-full">
              <StatCard value={fact.value} label={fact.label} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
