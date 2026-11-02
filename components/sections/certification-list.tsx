import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { PlusGrid } from "@/components/ui/plus-grid";
import { SectionHeader } from "@/components/ui/section-header";
import { certifications } from "@/content/certifications";

/** Certifications as framed plates. Date and verification link render when present. */
export function CertificationList({ index }: { index: string }) {
  return (
    <section id="certifications" aria-labelledby="certifications-heading" className="pb-16 md:pb-28">
      <Container>
        <SectionHeader index={index} label="Certifications" id="certifications-heading" />
        <div className="mt-8 grid gap-3 md:mt-12">
          {certifications.map((certification) => (
            <Reveal key={certification.id}>
              <Panel as="article" className="overflow-clip md:grid md:grid-cols-12">
                <div className="relative border-b border-line p-5 [background:var(--gradient-cell)] md:col-span-5 md:border-b-0 md:border-r md:p-8">
                  <PlusGrid className="opacity-30" />
                  <p className="type-poster relative text-[clamp(5rem,15vw,14rem)] leading-[0.8] text-fg">
                    {certification.abbreviation}
                  </p>
                </div>
                <div className="flex flex-col justify-end p-5 md:col-span-7 md:p-8">
                  <h3 className="type-headline text-[clamp(1.5rem,3vw,2.75rem)] text-fg">{certification.name}</h3>
                  <p className="mt-3 font-mono text-base text-fg-muted">{certification.issuer}</p>
                  {certification.issued ? (
                    <p className="mt-1 font-mono text-sm text-fg-muted">{certification.issued}</p>
                  ) : null}
                  {certification.verifyUrl ? (
                    <a
                      href={certification.verifyUrl}
                      className="mt-4 font-mono text-sm text-accent-soft underline underline-offset-4"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Verify certification
                    </a>
                  ) : null}
                </div>
              </Panel>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
