import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { PostList } from "@/components/sections/post-list";
import { getPostSummaries } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Posts by Khalil Ur Rehman, Cyber Security Researcher.",
};

export default async function BlogPage() {
  const posts = await getPostSummaries();

  return (
    <>
      <PageHero label="Blog // Posts" title="Blog" />
      <PostList posts={posts} />
    </>
  );
}
