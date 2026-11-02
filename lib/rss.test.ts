import assert from "node:assert/strict";
import { test } from "node:test";
import { buildRss } from "./rss.ts";

test("produces an empty but valid channel with no posts", () => {
  const xml = buildRss({ title: "T", description: "D", url: "https://x.test/blog", items: [] });
  assert.match(xml, /<channel>/);
  assert.doesNotMatch(xml, /<item>/);
});

test("escapes markup in post fields", () => {
  const xml = buildRss({
    title: "T",
    description: "D",
    url: "https://x.test/blog",
    items: [{ title: "A <b> & C", url: "https://x.test/blog/a", summary: "'quoted'", date: "2026-02-03" }],
  });
  assert.match(xml, /<title>A &lt;b&gt; &amp; C<\/title>/);
  assert.match(xml, /&apos;quoted&apos;/);
  assert.match(xml, /Tue, 03 Feb 2026 00:00:00 GMT/);
});
