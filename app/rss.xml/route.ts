import { site } from "@/content/site";
import { getPostSummaries } from "@/lib/blog/posts";
import { buildRss } from "@/lib/rss";
import { siteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export async function GET() {
  const posts = await getPostSummaries();

  const xml = buildRss({
    title: `${site.wordmark} blog`,
    description: site.description,
    url: `${siteUrl}/blog`,
    items: posts.map((post) => ({
      title: post.title,
      url: `${siteUrl}/blog/${post.slug}`,
      summary: post.summary,
      date: post.date,
    })),
  });

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
