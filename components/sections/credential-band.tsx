import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PlusGrid } from "@/components/ui/plus-grid";
import { SectionHeader } from "@/components/ui/section-header";
import { certifications } from "@/content/certifications";

/** Full-width electric-blue statement of the primary certification. */
export function CredentialBand({ index }: { index: string }) {
  const certification = certifications[0];
  if (!certification) return null;

  return (
    <section
      aria-labelledby="credential-heading"
      className="relative isolate overflow-clip [background:var(--gradient-band)]"
    >
      <PlusGrid className="-z-10 opacity-30" />
      <Container className="py-14 md:py-24">
        <SectionHeader index={index} label="Credential" id="credential-heading" tone="onBlue" />
        <Reveal className="mt-10 grid gap-6 md:mt-16 md:grid-cols-12 md:items-end">
          <p className="type-poster text-[clamp(7rem,30vw,27rem)] leading-[0.78] text-fg md:col-span-7">
            {certification.abbreviation}
          </p>
          <div className="flex flex-col items-start gap-5 md:col-span-5">
            <p className="type-headline text-[clamp(1.5rem,2.7vw,2.5rem)] text-on-accent [font-weight:400]">
              {certification.name}
              <br />
              {certification.issuer}
            </p>
            <Button href="/skills#certifications" variant="ghost">
              Skills and certifications
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
