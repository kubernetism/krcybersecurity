import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { Marquee, type MarqueeItem } from "@/components/ui/marquee";
import { SectionHeader } from "@/components/ui/section-header";
import { organizations, type Organization } from "@/content/organizations";
import { estimateItemWidth, fitLogo, type Size } from "@/lib/marquee";

const LOGO_HEIGHT = 40;
const LOGO_MAX_WIDTH = 112;
const SAMPLE_NOTE = "Sample data. Not a real vulnerability.";

function getLogoSize({ name, logo }: Organization): Size {
  if (!logo.startsWith("/logos/")) {
    throw new Error(`Organization "${name}": logo must be a path under public/logos/.`);
  }

  let natural: Partial<Size>;
  try {
    natural = imageSize(readFileSync(path.join(process.cwd(), "public", logo)));
  } catch {
    throw new Error(`Organization "${name}": could not read ${logo} in public/.`);
  }

  const size = fitLogo(natural, LOGO_HEIGHT, LOGO_MAX_WIDTH);
  if (!size) throw new Error(`Organization "${name}": ${logo} has no usable width and height.`);
  return size;
}

function toMarqueeItem(organization: Organization): MarqueeItem {
  const { width, height } = getLogoSize(organization);

  return {
    id: organization.name,
    estimatedWidth: estimateItemWidth(organization.name, width),
    // The screen deliberately omits the organization's name beside the sample text.
    detail: organization.detail
      ? { title: organization.detail, note: organization.sample ? SAMPLE_NOTE : undefined }
      : undefined,
    content: (
      <>
        <span className="flex h-10 items-center">
          {/* The visible name is the text alternative, so the image itself is decorative. */}
          <Image src={organization.logo} alt="" width={width} height={height} loading="eager" unoptimized />
        </span>
        <span className="mt-[1.125rem] whitespace-nowrap text-sm font-medium text-fg">{organization.name}</span>
      </>
    ),
  };
}

/** Logo marquee. Renders nothing until `content/organizations.ts` has entries. */
export function OrganizationsMarquee({ index }: { index: string }) {
  if (organizations.length === 0) return null;

  const hasSampleEntries = organizations.some((organization) => organization.sample);

  return (
    <section aria-labelledby="organizations-heading" className="relative z-10 pb-16 md:pb-28">
      <Container>
        <SectionHeader
          index={index}
          label="Organizations"
          title="Organizations that use our services"
          id="organizations-heading"
        />
        {hasSampleEntries ? (
          <Reveal className="mt-5">
            <Chip className="border-accent text-accent-pale">Sample data, not real clients</Chip>
          </Reveal>
        ) : null}
      </Container>
      <div className="mt-8 md:mt-12">
        <Marquee
          items={organizations.map(toMarqueeItem)}
          label={hasSampleEntries ? "Sample organizations" : "Organizations"}
        />
      </div>
    </section>
  );
}
