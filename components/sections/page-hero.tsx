import { Reveal } from "@/components/motion/reveal";
import { Reticle } from "@/components/motifs/reticle";
import { Container } from "@/components/ui/container";
import { PlusGrid } from "@/components/ui/plus-grid";
import { cn } from "@/lib/cn";

type PageHeroProps = {
  label: string;
  title: string;
  /** Short line under the title. */
  lede?: string;
  /** Smaller, looser setting for long titles such as post names. */
  compact?: boolean;
};

/** Header for inner pages: a poster title on the black-to-blue gradient. */
export function PageHero({ label, title, lede, compact = false }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-clip [background:var(--gradient-page)]">
      <PlusGrid className="-z-10 opacity-20 [mask-image:linear-gradient(to_bottom,transparent,black_75%)]" />
      <Reticle className="absolute -right-[7%] top-1/2 -z-10 hidden h-[135%] -translate-y-1/2 lg:block" />
      <Container className="pb-8 pt-10 md:pb-12 md:pt-24">
        <p className="type-label text-accent-pale">{label}</p>
        <Reveal y={28} duration={0.95}>
          <h1
            className={cn(
              "type-poster mt-5 text-balance text-fg",
              compact
                ? "max-w-[20ch] text-[clamp(2.75rem,7vw,7.5rem)] leading-[0.95]"
                : "text-[clamp(3.25rem,12.5vw,13rem)]",
            )}
          >
            {title}
          </h1>
          {lede ? <p className="mt-6 max-w-[56ch] font-mono text-sm text-fg md:text-base">{lede}</p> : null}
        </Reveal>
      </Container>
    </section>
  );
}
