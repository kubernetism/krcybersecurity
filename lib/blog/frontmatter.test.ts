import assert from "node:assert/strict";
import { test } from "node:test";
import {
  isValidSlug,
  isVisible,
  parseFrontmatter,
  readingMinutes,
  splitFrontmatter,
} from "./frontmatter.ts";

const valid = {
  title: "A title",
  date: "2026-02-03",
  summary: "A summary.",
  tags: ["forensics"],
  draft: false,
};

test("splits YAML frontmatter from the MDX body and keeps dates as strings", () => {
  const { data, body } = splitFrontmatter("---\ntitle: Hi\ndate: 2026-02-03\n---\n\n# Body\n", "x.mdx");
  assert.deepEqual(data, { title: "Hi", date: "2026-02-03" });
  assert.equal(body, "\n# Body\n");
});

test("rejects a file with no frontmatter", () => {
  assert.throws(() => splitFrontmatter("# Body", "x.mdx"), /x\.mdx: missing frontmatter/);
});

test("accepts complete frontmatter", () => {
  assert.deepEqual(parseFrontmatter(valid, "x.mdx"), valid);
});

test("defaults tags to empty and draft to false when absent", () => {
  const { title, date, summary } = valid;
  const parsed = parseFrontmatter({ title, date, summary }, "x.mdx");
  assert.deepEqual(parsed.tags, []);
  assert.equal(parsed.draft, false);
});

test("rejects missing titles, impossible dates and non-boolean drafts", () => {
  assert.throws(() => parseFrontmatter({ ...valid, title: "" }, "x.mdx"), /"title"/);
  assert.throws(() => parseFrontmatter({ ...valid, date: "2026-02-31" }, "x.mdx"), /"date"/);
  assert.throws(() => parseFrontmatter({ ...valid, date: "March 2026" }, "x.mdx"), /"date"/);
  assert.throws(() => parseFrontmatter({ ...valid, draft: "yes" }, "x.mdx"), /"draft"/);
  assert.throws(() => parseFrontmatter({ ...valid, tags: "forensics" }, "x.mdx"), /"tags"/);
});

test("reading time rounds up and never drops below one minute", () => {
  assert.equal(readingMinutes(""), 1);
  assert.equal(readingMinutes("word ".repeat(200)), 1);
  assert.equal(readingMinutes("word ".repeat(201)), 2);
});

test("slugs allow lowercase, digits and single hyphens only", () => {
  assert.equal(isValidSlug("post-template-2"), true);
  assert.equal(isValidSlug("Post"), false);
  assert.equal(isValidSlug("../secret"), false);
  assert.equal(isValidSlug("a--b"), false);
});

test("drafts appear only in development", () => {
  assert.equal(isVisible({ draft: true }, "production"), false);
  assert.equal(isVisible({ draft: true }, "development"), true);
  assert.equal(isVisible({ draft: true }, undefined), false);
  assert.equal(isVisible({ draft: false }, "production"), true);
});
