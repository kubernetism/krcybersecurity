import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { PageHero } from "@/components/sections/page-hero";
import { ProfileFacts } from "@/components/sections/profile-facts";
import { ProfileStatement } from "@/components/sections/profile-statement";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "About and experience",
  description: profile.bio,
};

export default function AboutPage() {
  return (
    <>
      <PageHero label="About // Experience" title="About and experience" lede={`${profile.name}, ${profile.title}`} />
      <ProfileFacts />
      <ProfileStatement index="01" />
      <ExperienceTimeline index="02" />
    </>
  );
}
