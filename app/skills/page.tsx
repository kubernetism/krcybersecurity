import type { Metadata } from "next";
import { CertificationList } from "@/components/sections/certification-list";
import { PageHero } from "@/components/sections/page-hero";
import { SkillsGrid } from "@/components/sections/skills-grid";
import { certifications } from "@/content/certifications";
import { skills } from "@/content/skills";

export const metadata: Metadata = {
  title: "Skills and certifications",
  description: `${skills.map((skill) => skill.name).join(", ")}. ${certifications
    .map((certification) => `${certification.name} (${certification.abbreviation}), ${certification.issuer}`)
    .join(". ")}.`,
};

export default function SkillsPage() {
  return (
    <>
      <PageHero label="Skills // Certifications" title="Skills and certifications" />
      <div className="pt-12 md:pt-20">
        <SkillsGrid index="01" label="Skills" />
      </div>
      <CertificationList index="02" />
    </>
  );
}
