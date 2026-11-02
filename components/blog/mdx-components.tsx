import type { MDXComponents } from "mdx/types";
import { MdxImage } from "./mdx-image";

/** Maps Markdown output to the site's type styles. */
export const mdxComponents: MDXComponents = {
  h1: (props) => <h2 className="type-headline mb-4 mt-12 text-3xl text-fg md:text-4xl" {...props} />,
  h2: (props) => <h2 className="type-headline mb-4 mt-12 text-2xl text-fg md:text-3xl" {...props} />,
  h3: (props) => <h3 className="mb-3 mt-8 text-xl font-semibold text-fg" {...props} />,
  h4: (props) => <h4 className="mb-2 mt-6 font-mono text-base font-medium text-fg" {...props} />,
  p: (props) => <p className="my-5 text-lg leading-relaxed text-fg-muted" {...props} />,
  a: (props) => (
    <a className="text-accent-soft underline underline-offset-4 transition-colors hover:text-accent-pale" {...props} />
  ),
  strong: (props) => <strong className="font-semibold text-fg" {...props} />,
  ul: (props) => <ul className="my-5 list-disc space-y-2 pl-6 text-lg text-fg-muted marker:text-accent-soft" {...props} />,
  ol: (props) => <ol className="my-5 list-decimal space-y-2 pl-6 text-lg text-fg-muted marker:text-accent-soft" {...props} />,
  blockquote: (props) => <blockquote className="my-6 border-l-2 border-accent pl-5 text-fg" {...props} />,
  hr: () => <hr className="my-10 border-line" />,
  code: ({ className, ...props }) =>
    // Fenced blocks are already styled by rehype-pretty-code through data attributes.
    "data-language" in props || className ? (
      <code className={className} {...props} />
    ) : (
      <code className="border border-line bg-ink-850 px-1.5 py-0.5 font-mono text-[0.85em] text-accent-pale" {...props} />
    ),
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-left text-fg-muted" {...props} />
    </div>
  ),
  th: (props) => <th className="border border-line bg-ink-850 px-3 py-2 font-mono text-sm font-medium text-fg" {...props} />,
  td: (props) => <td className="border border-line px-3 py-2" {...props} />,
  img: MdxImage,
};
