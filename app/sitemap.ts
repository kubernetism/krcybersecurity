import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { getPostSummaries } from "@/lib/blog/posts";
import { siteUrl } from "@/lib/site-url";

const STATIC_PATHS = ["", "/about", "/skills", "/projects", "/blog", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPostSummaries();

  return [
    ...STATIC_PATHS.map((pathname) => ({ url: `${siteUrl}${pathname}` })),
    ...projects.map((project) => ({ url: `${siteUrl}/projects/${project.slug}` })),
    ...posts.map((post) => ({ url: `${siteUrl}/blog/${post.slug}`, lastModified: post.date })),
  ];
}
