import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { imageSize } from "image-size";
import Image from "next/image";
import type { ComponentProps } from "react";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const BLOG_IMAGES = path.join(PUBLIC_DIR, "blog");

/**
 * Renders a Markdown image through next/image. Dimensions are read from the file
 * at build time so authors can write plain `![alt](/blog/slug/file.png)` and never
 * cause layout shift. Broken references fail the build with a clear message.
 *
 * Output uses spans because Markdown places images inside a paragraph.
 */
export async function MdxImage({ src, alt, title }: ComponentProps<"img">) {
  if (typeof src !== "string" || !src.startsWith("/blog/")) {
    throw new Error(`MDX image "${String(src)}": images must live in public/blog/<post-slug>/ and use an absolute path.`);
  }
  if (!alt) throw new Error(`MDX image "${src}": alt text is required.`);

  const file = path.join(PUBLIC_DIR, src);
  if (!file.startsWith(`${BLOG_IMAGES}${path.sep}`)) {
    throw new Error(`MDX image "${src}": path escapes public/blog/.`);
  }

  const buffer = await readFile(file).catch(() => {
    throw new Error(`MDX image "${src}": file not found in public/.`);
  });
  const { width, height } = imageSize(buffer);

  return (
    <span className="my-8 block">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 1024px) 58vw, (min-width: 768px) 66vw, 100vw"
        unoptimized={src.endsWith(".svg") || src.endsWith(".gif")}
        className="h-auto w-full border border-line"
      />
      {title ? <span className="mt-2 block font-mono text-xs text-fg-muted">{title}</span> : null}
    </span>
  );
}
