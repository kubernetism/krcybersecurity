import { LiftLink } from "@/components/motion/lift";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { projects } from "@/content/projects";

/** Project cards, or an honest empty state until `content/projects.ts` has entries. */
export function ProjectList() {
  return (
    <section aria-label="Projects" className="py-3 pb-16 md:pb-28">
      <Container>
        {projects.length === 0 ? (
          <EmptyState command="ls projects/" output="total 0" title="No case studies published yet">
            <p>Projects and case studies will be listed here once they are published.</p>
          </EmptyState>
        ) : (
          <Stagger className="grid gap-3 md:grid-cols-2">
            {projects.map((project) => (
              <StaggerItem key={project.slug} className="h-full">
                <LiftLink href={`/projects/${project.slug}`} className="block h-full">
                  <Panel as="article" className="h-full p-5 transition-colors duration-300 hover:border-accent md:p-7">
                    {project.year ? <p className="type-label text-fg-muted">{project.year}</p> : null}
                    <h2 className="type-poster mt-3 text-[clamp(2.25rem,4vw,4rem)] text-fg">{project.title}</h2>
                    <p className="mt-4 max-w-[52ch] leading-relaxed text-fg-muted">{project.summary}</p>
                    {project.tags.length > 0 ? (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <li key={tag}>
                            <Chip>{tag}</Chip>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </Panel>
                </LiftLink>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </Container>
    </section>
  );
}
