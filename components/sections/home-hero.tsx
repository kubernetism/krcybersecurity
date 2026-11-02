import { HeroParallax } from "@/components/motion/hero-parallax";
import { Reveal } from "@/components/motion/reveal";
import { SpecimenMotion } from "@/components/motion/specimen-motion";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { TerminalBackdrop } from "@/components/motion/terminal-backdrop";
import { ThumbprintScanner } from "@/components/motion/thumbprint-scanner";
import { Reticle } from "@/components/motifs/reticle";
import { SpecimenBeetle } from "@/components/motifs/specimen-beetle";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { PlusGrid } from "@/components/ui/plus-grid";
import { certifications } from "@/content/certifications";
import { experienceAreas } from "@/content/experience";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { getScannerRows, getTerminalLines, TERMINAL_DISCLAIMER } from "@/lib/terminal-lines";
import { createThumbprint } from "@/lib/thumbprint";
import { Wordmark } from "./wordmark";

/** Offsets stop the columns lining up; differing speeds keep them from feeding in step. */
const BACKDROP_COLUMNS = [
  { lines: getTerminalLines(0), secondsPerLine: 1.5 },
  { lines: getTerminalLines(9), secondsPerLine: 2.3 },
  { lines: getTerminalLines(17), secondsPerLine: 1.8, className: "max-md:hidden" },
  { lines: getTerminalLines(24), secondsPerLine: 2.7, className: "max-lg:hidden" },
];

const THUMBPRINT = createThumbprint();
const SCANNER_ROWS = getScannerRows();

/** The home hero: wordmark, specimen motif, identity panel, chips and a decorative terminal. */
export function HomeHero() {
  const chips = [
    ...certifications.map((certification) => `${certification.abbreviation} certified`),
    ...experienceAreas.map((area) => area.name),
  ];

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-clip [background:var(--gradient-hero)]"
    >
      <PlusGrid className="-z-10 opacity-25 [mask-image:linear-gradient(to_bottom,transparent_8%,black_45%,transparent_96%)]" />
      <TerminalBackdrop
        columns={BACKDROP_COLUMNS}
        className="-z-10 opacity-30 [mask-image:linear-gradient(to_bottom,transparent_4%,black_26%,black_58%,transparent_80%)]"
      />

      <Container className="relative flex flex-col pb-5 pt-4 md:min-h-[calc(100svh-4.75rem)] md:pt-6">
        <h1 id="hero-title" className="relative z-10">
          <span className="sr-only">{site.wordmark}</span>
          <Wordmark />
        </h1>

        {/* Specimen motif: in flow on phones, placed off-centre on larger screens. */}
        <HeroParallax className="pointer-events-none relative z-20 mx-auto mt-[-3%] aspect-[1220/1300] w-[92%] max-w-md md:absolute md:bottom-[-22%] md:left-[52%] md:mt-0 md:h-[108%] md:w-auto md:max-w-none md:-translate-x-1/2">
          <Reveal trigger="load" delay={0.25} y={70} duration={1.3} className="h-full rotate-[9deg]">
            <SpecimenMotion reticle={<Reticle className="h-full w-full" />}>
              <SpecimenBeetle className="h-full w-full" />
            </SpecimenMotion>
          </Reveal>
        </HeroParallax>

        {/* Identity panel and chips. */}
        <div className="relative z-30 order-2 -mt-16 flex flex-col gap-3 md:mt-auto md:flex-row md:items-end md:justify-between">
          <Reveal trigger="load" delay={0.4} className="md:w-[min(30rem,42%)]">
            <Panel className="p-5 md:p-6">
              <p className="type-headline text-[clamp(1.75rem,3.2vw,2.75rem)] text-fg">{profile.name}</p>
              <p className="mt-3 font-mono text-sm text-fg-muted md:text-base">
                {profile.title}, {profile.location}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button href="/about">About</Button>
                <Button href="/skills" variant="ghost">
                  Skills
                </Button>
              </div>
            </Panel>
          </Reveal>
          <Stagger
            trigger="load"
            delay={0.75}
            interval={0.12}
            className="flex flex-wrap gap-2 md:max-w-xs md:flex-col md:items-end"
          >
            {chips.map((chip) => (
              <StaggerItem key={chip}>
                <Chip className="bg-ink-950">{chip}</Chip>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Decorative scanner: follows the identity panel up to tablet, floats on desktop. */}
        <Reveal
          trigger="load"
          delay={0.6}
          className="relative z-30 order-3 mt-3 md:w-[21.5rem] md:self-end lg:absolute lg:right-gutter lg:top-[27%] lg:mt-0"
        >
          <ThumbprintScanner print={THUMBPRINT} rows={SCANNER_ROWS} disclaimer={TERMINAL_DISCLAIMER} />
        </Reveal>
      </Container>
    </section>
  );
}
