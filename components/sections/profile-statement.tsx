import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { profile } from "@/content/profile";

type ProfileStatementProps = {
  index: string;
  /** Link onward, omitted on the page it would point to. */
  moreHref?: string;
};

/** The biography set as one large statement, offset from a narrow label column. */
export function ProfileStatement({ index, moreHref }: ProfileStatementProps) {
  return (
    <section aria-labelledby="profile-heading" className="py-16 md:py-28">
      <Container>
        <SectionHeader index={index} label="Profile" id="profile-heading" />
        <div className="mt-8 md:mt-12 md:grid md:grid-cols-12">
          <Reveal className="md:col-span-9 md:col-start-4">
            <p className="text-pretty text-[clamp(1.5rem,3.3vw,3rem)] font-medium leading-[1.14] tracking-[-0.015em] text-fg">
              {profile.bio}
            </p>
            {moreHref ? (
              <Button href={moreHref} variant="ghost" className="mt-8">
                About and experience
              </Button>
            ) : null}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
