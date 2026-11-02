import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { mdxComponents } from "@/components/blog/mdx-components";
import { formatPostDate } from "@/lib/blog/format";
import type { Post } from "@/lib/blog/posts";
import { compilePost } from "@/lib/blog/render";

/** A post: metadata rail on the left, reading column on the right. */
export async function PostArticle({ post }: { post: Post }) {
  const Content = await compilePost(post.body);

  return (
    <section aria-label="Article" className="py-10 pb-16 md:py-16 md:pb-28">
      <Container className="md:grid md:grid-cols-12">
        <aside className="md:col-span-3">
          <div className="type-label space-y-1 text-fg-muted">
            <time dateTime={post.date} className="block">
              {formatPostDate(post.date)}
            </time>
            <p>{post.readingMinutes} min read</p>
          </div>
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
        </aside>
        <article className="mt-8 min-w-0 md:col-span-8 md:col-start-5 md:mt-0 lg:col-span-7 lg:col-start-5">
          <Content components={mdxComponents} />
          <div className="mt-12">
            <Button href="/blog" variant="ghost">
              All posts
            </Button>
          </div>
        </article>
      </Container>
    </section>
  );
}
