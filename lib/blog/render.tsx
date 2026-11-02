import "server-only";
import { evaluate } from "@mdx-js/mdx";
import type { MDXContent } from "mdx/types";
import * as runtime from "react/jsx-runtime";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { codeTheme } from "./code-theme.ts";

/** Compiles a post body with GFM and syntax highlighting. Runs at build time. */
export async function compilePost(body: string): Promise<MDXContent> {
  const { default: Content } = await evaluate(body, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, { theme: codeTheme, keepBackground: false }]],
  });
  return Content;
}
