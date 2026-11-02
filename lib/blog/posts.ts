import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import {
  isValidSlug,
  isVisible,
  parseFrontmatter,
  readingMinutes,
  splitFrontmatter,
  type PostFrontmatter,
} from "./frontmatter.ts";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type PostSummary = PostFrontmatter & {
  slug: string;
  readingMinutes: number;
};

export type Post = PostSummary & { body: string };

const readPosts = cache(async (): Promise<Post[]> => {
  const files = await readdir(POSTS_DIR);

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file): Promise<Post> => {
        const slug = file.replace(/\.mdx$/, "");
        const location = `content/blog/${file}`;
        if (!isValidSlug(slug)) {
          throw new Error(`${location}: file names must use lowercase letters, numbers and hyphens.`);
        }

        const raw = await readFile(path.join(POSTS_DIR, file), "utf8");
        const { data, body } = splitFrontmatter(raw, location);
        return {
          ...parseFrontmatter(data, location),
          slug,
          body,
          readingMinutes: readingMinutes(body),
        };
      }),
  );

  return posts
    .filter((post) => isVisible(post, process.env.NODE_ENV))
    .sort((a, b) => b.date.localeCompare(a.date));
});

/** Posts visible in this environment, newest first, without their bodies. */
export async function getPostSummaries(): Promise<PostSummary[]> {
  const posts = await readPosts();
  return posts.map((post): PostSummary => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    summary: post.summary,
    tags: post.tags,
    draft: post.draft,
    readingMinutes: post.readingMinutes,
  }));
}

export async function getPost(slug: string): Promise<Post | null> {
  const posts = await readPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
