import { parse as parseYaml } from "yaml";

export type PostFrontmatter = {
  title: string;
  /** Publication date as YYYY-MM-DD. */
  date: string;
  summary: string;
  tags: string[];
  draft: boolean;
};

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const WORDS_PER_MINUTE = 200;

/** Splits a post file into its raw YAML data and its MDX body. */
export function splitFrontmatter(raw: string, file: string): { data: unknown; body: string } {
  const match = FRONTMATTER.exec(raw);
  if (!match) throw new Error(`${file}: missing frontmatter block at the top of the file.`);
  return { data: parseYaml(match[1] ?? ""), body: raw.slice(match[0].length) };
}

function fail(file: string, message: string): never {
  throw new Error(`${file}: ${message}`);
}

function requireText(record: Record<string, unknown>, key: string, file: string): string {
  const value = record[key];
  if (typeof value !== "string" || value.trim() === "") {
    fail(file, `frontmatter "${key}" must be a non-empty string.`);
  }
  return value.trim();
}

function isRealDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(value);
}

/**
 * Validates frontmatter so a typo fails the build with a clear message instead
 * of publishing a broken post. `draft` defaults to false only when absent.
 */
export function parseFrontmatter(data: unknown, file: string): PostFrontmatter {
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    fail(file, "frontmatter must be a YAML mapping.");
  }
  const record = data as Record<string, unknown>;

  const date = requireText(record, "date", file);
  if (!isRealDate(date)) fail(file, `frontmatter "date" must be a real date as YYYY-MM-DD.`);

  const tags = record.tags ?? [];
  if (!Array.isArray(tags) || !tags.every((tag) => typeof tag === "string")) {
    fail(file, `frontmatter "tags" must be a list of strings.`);
  }

  const draft = record.draft ?? false;
  if (typeof draft !== "boolean") fail(file, `frontmatter "draft" must be true or false.`);

  return {
    title: requireText(record, "title", file),
    date,
    summary: requireText(record, "summary", file),
    tags,
    draft,
  };
}

/** Estimated reading time in whole minutes, never below one. */
export function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** Slugs come from file names and become URLs. */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

/** Drafts are visible in `next dev` for previewing and excluded everywhere else. */
export function isVisible(frontmatter: Pick<PostFrontmatter, "draft">, nodeEnv: string | undefined): boolean {
  return !frontmatter.draft || nodeEnv === "development";
}
