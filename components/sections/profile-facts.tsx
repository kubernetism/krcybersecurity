import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/ui/container";
import { certifications } from "@/content/certifications";
import { profile } from "@/content/profile";

/** The record: name, title, location and certification as labelled columns. */
export function ProfileFacts() {
  const facts = [
    { label: "Name", value: profile.name },
    { label: "Title", value: profile.title },
    { label: "Location", value: profile.location },
    ...certifications.map((certification) => ({
      label: "Certification",
      value: `${certification.name} (${certification.abbreviation}), ${certification.issuer}`,
    })),
  ];

  return (
    <section aria-label="Profile details" className="pt-3">
      <Container>
        <Stagger interval={0.06}>
          <dl className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <StaggerItem key={fact.label} className="bg-ink-900 p-4 md:p-5">
                <dt className="type-label text-accent-soft">{fact.label}</dt>
                <dd className="mt-3 font-mono text-sm leading-snug text-fg md:text-base">{fact.value}</dd>
              </StaggerItem>
            ))}
          </dl>
        </Stagger>
      </Container>
    </section>
  );
}
