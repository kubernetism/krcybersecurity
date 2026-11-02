# KR Cybersecurity

Portfolio and blog of Khalil Ur Rehman, Cyber Security Researcher. Built with Next.js 16, React 19,
Tailwind CSS 4 and framer-motion. Every page is static: no database, CMS or auth.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000, shows drafts
npm run build      # production build, excludes drafts
npm run lint
npm run typecheck
npm test           # unit tests for parsing and helpers
```

Set `NEXT_PUBLIC_SITE_URL` (for example `https://example.com`) in the hosting environment so metadata,
the sitemap, robots and RSS use the real domain. Without it they fall back to the Vercel production
URL when deployed on Vercel, or to `http://localhost:3000`. Copy `.env.example` to start.

## How it is organised

| Layer | Where | What |
| --- | --- | --- |
| Content | `content/` | Typed data files. Update facts here, no component changes needed |
| Tokens | `app/globals.css` | Colours, type and gradients in the Tailwind 4 theme |
| UI primitives | `components/ui/` | Button, Panel, Chip, StatCard, SectionHeader, EmptyState |
| Motion | `components/motion/` | Reveal, Stagger, WordmarkLetters and other small client components |
| Motifs | `components/motifs/` | Original SVG and decorative text |
| Sections | `components/sections/` | Hero, CapabilityCards, SkillsGrid, Nav, Footer and so on |
| Pages | `app/` | Thin routes that compose sections |

The hero's terminal text and thumbprint animation are decorative. Their lines are generated from
`content/` by `lib/terminal-lines.ts`, the print is synthetic (`lib/thumbprint.ts`), and a unit test
rejects IP addresses, CVE identifiers, URLs, scores and claimed results in that text.

## Updating content

- **Profile, skills, certifications, experience:** edit the matching file in `content/`. Optional fields
  such as a certification's `issued` and `verifyUrl`, or an experience area's `period`, appear on the
  site as soon as they are filled in.
- **A project or case study:** add an object to the `projects` array in `content/projects.ts`. That
  publishes a card on `/projects` and a page at `/projects/<slug>`.
- **Organizations (home page logo marquee):** edit `content/organizations.ts`. Add a logo file to
  `public/logos/`, then add or replace an entry. The current entries are **sample data, not real
  clients**: replace them with real organizations, with permission to use their names and logos,
  before going live. The "Sample data" label disappears once no entry has `sample: true`. An entry's
  `detail` text is what the screen shows when someone points at its logo. The current "Sample CVE" text
  is invented, so never attach it to a real organization (a test rejects that): remove `detail` from
  real entries unless the text is true and you have permission to publish it.
- **Contact details:** add `email` or an entry in `links` in `content/contact.ts`. They appear on
  `/contact` and in the footer. Nothing renders until a real value exists.

### Sample logo sources

The files in `public/logos/` are placeholders. These licenses cover the artwork only and grant no
trademark rights or permission to imply a relationship with the brand.

| Logos | Source | License |
| --- | --- | --- |
| Apple (white), Microsoft, YouTube, Google, Meta, Netflix (black tile removed), Adobe, Spotify, Slack, Intel (white wordmark), LinkedIn | [gilbarbara/logos](https://github.com/gilbarbara/logos), via `@iconify-json/logos` | CC0-1.0 |
| Amazon (recoloured white) | [CoreUI Icons](https://github.com/coreui/coreui-icons), via `@iconify-json/cib` | CC0-1.0 |

## Writing a blog post

Posts are plain MDX files in `content/blog/`, and pushing to GitHub publishes them through your normal
deployment.

1. Copy `content/blog/post-template.mdx` to `content/blog/<post-slug>.mdx`. The file name is the URL, so
   use lowercase letters, numbers and hyphens.
2. Fill in the frontmatter:

   ```yaml
   ---
   title: "Post title"
   date: "2026-01-31" # YYYY-MM-DD
   summary: "One or two sentences for the index, search results and social cards."
   tags:
     - forensics
   draft: true # set to false to publish
   ---
   ```

3. Write in Markdown. Use `##` and lower for headings, since the page title is the top heading. Put the
   language after a code fence to get syntax highlighting (` ```python `). Reading time is calculated
   for you.
4. Put images in `public/blog/<post-slug>/` and reference them with an absolute path:

   ```md
   ![Describe the image](/blog/post-slug/figure-1.png "Optional caption")
   ```

   Size and responsive loading are handled automatically. The build stops with a clear message if the
   alt text or the file is missing, or if the image is outside `public/blog/`.

5. Preview with `npm run dev` (drafts show up there with a Draft label, refresh to see edits). Set
   `draft: false`, run `npm run build`, then commit and push.

Posts with `draft: true` never appear in production builds, the sitemap or RSS.
`post-template.mdx` is a template and should stay a draft.

### Check before publishing

Anything pushed to a public repository stays in its Git history, even after you delete it. Before each
publish:

- [ ] Check every screenshot for IP addresses, hostnames, client names, tokens, session cookies and API
      keys, and redact them by painting over them. Blurring can sometimes be reversed.
- [ ] Check code samples and logs for the same.
- [ ] Strip image metadata (EXIF and GPS), for example with `exiftool -all= public/blog/<post-slug>/*`.
- [ ] Confirm you have permission to disclose anything about a target or client.

## Later: a Git-based CMS

Post files are deliberately plain (YAML frontmatter plus MDX, one file per post, images under `public/`),
so a Git-based CMS such as Keystatic can be pointed at `content/blog/` later without restructuring.
