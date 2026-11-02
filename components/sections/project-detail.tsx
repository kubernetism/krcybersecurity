import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import type { Project } from "@/content/projects";

/** A case study rendered entirely from its entry in `content/projects.ts`. */
export function ProjectDetail({ project }: { project: Project }) {
  return (
    <section aria-label="Case study" className="py-10 pb-16 md:py-16 md:pb-28">
      <Container className="md:grid md:grid-cols-12">
        <aside className="md:col-span-3">
          {project.year ? <p className="type-label text-fg-muted">{project.year}</p> : null}
          {project.tags.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag}>
                  <Chip>{tag}</Chip>
                </li>
              ))}
            </ul>
          ) : null}
        </aside>
        <div className="mt-8 md:col-span-8 md:col-start-5 md:mt-0">
          {project.sections?.map((section) => (
            <Reveal key={section.heading} className="mb-10">
              <h2 className="type-headline text-[clamp(1.5rem,2.6vw,2.25rem)] text-fg">{section.heading}</h2>
              <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-fg-muted">{section.body}</p>
            </Reveal>
          ))}
          {project.links?.length ? (
            <ul className="mb-10 flex flex-wrap gap-2">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="type-label inline-flex min-h-11 items-center border border-line-strong px-4 hover:border-accent-soft"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          <Button href="/projects" variant="ghost">
            All projects
          </Button>
        </div>
      </Container>
    </section>
  );
}
