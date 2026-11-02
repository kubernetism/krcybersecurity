import { CapabilityCards } from "@/components/sections/capability-cards";
import { CredentialBand } from "@/components/sections/credential-band";
import { HomeHero } from "@/components/sections/home-hero";
import { OrganizationsMarquee } from "@/components/sections/organizations-marquee";
import { ProfileStatement } from "@/components/sections/profile-statement";
import { SkillsGrid } from "@/components/sections/skills-grid";
import { StatsRow } from "@/components/sections/stats-row";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <StatsRow />
      <ProfileStatement index="01" moreHref="/about" />
      <CapabilityCards index="02" />
      <SkillsGrid index="03" />
      <OrganizationsMarquee index="04" />
      <CredentialBand index="05" />
    </>
  );
}
