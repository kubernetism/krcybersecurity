import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { ProjectList } from "@/components/sections/project-list";

export const metadata: Metadata = {
  title: "Projects and case studies",
  description: "Projects and case studies by Khalil Ur Rehman.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero label="Projects // Case studies" title="Projects and case studies" />
      <ProjectList />
    </>
  );
}
