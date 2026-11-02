/**
 * Projects and case studies. Adding an object to `projects` publishes a card on
 * /projects and a detail page at /projects/<slug>. Nothing else needs editing.
 *
 * Example:
 * {
 *   slug: "example-case-study",
 *   title: "Example case study",
 *   summary: "One or two factual sentences.",
 *   tags: ["Forensics"],
 *   year: "2026",
 *   links: [{ label: "Write-up", href: "https://example.com/write-up" }],
 *   sections: [{ heading: "Approach", body: "What was done and why." }],
 * }
 */
export type ProjectLink = { label: string; href: string };
export type ProjectSection = { heading: string; body: string };

export type Project = {
  /** Lowercase letters, numbers and hyphens. Becomes the URL. */
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  year?: string;
  links?: ProjectLink[];
  sections?: ProjectSection[];
};

export const projects: Project[] = [];
