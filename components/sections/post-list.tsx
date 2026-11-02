import { LiftLink } from "@/components/motion/lift";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { formatPostDate } from "@/lib/blog/format";
import type { PostSummary } from "@/lib/blog/posts";

/** Blog index: post cards, or an honest empty state. */
export function PostList({ posts }: { posts: PostSummary[] }) {
  return (
    <section aria-label="Posts" className="py-3 pb-16 md:pb-28">
      <Container>
        {posts.length === 0 ? (
          <EmptyState command="ls blog/" output="total 0" title="No posts published yet">
            <p>New posts will appear here when they are published.</p>
          </EmptyState>
        ) : (
          <Stagger className="grid gap-3">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <LiftLink href={`/blog/${post.slug}`} className="block">
                  <Panel as="article" className="grid gap-4 p-5 transition-colors duration-300 hover:border-accent md:grid-cols-12 md:p-7">
                    <div className="type-label flex flex-wrap items-center gap-x-3 gap-y-1 text-fg-muted md:col-span-3 md:block md:space-y-1">
                      <time dateTime={post.date} className="block">
                        {formatPostDate(post.date)}
                      </time>
                      <span className="block">{post.readingMinutes} min read</span>
                    </div>
                    <div className="md:col-span-9">
                      <h2 className="type-poster text-[clamp(2rem,4.5vw,4.5rem)] text-fg">{post.title}</h2>
                      <p className="mt-3 max-w-[62ch] leading-relaxed text-fg-muted">{post.summary}</p>
                      {post.tags.length > 0 || post.draft ? (
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {post.draft ? (
                            <li>
                              <Chip className="border-accent text-accent-soft">Draft</Chip>
                            </li>
                          ) : null}
                          {post.tags.map((tag) => (
                            <li key={tag}>
                              <Chip>{tag}</Chip>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
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
