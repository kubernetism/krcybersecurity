import assert from "node:assert/strict";
import { test } from "node:test";
import { getScannerRows, getTerminalEntries, getTerminalLines, TERMINAL_DISCLAIMER } from "./terminal-lines.ts";

test("states that it is decorative", () => {
  assert.ok(getTerminalLines().includes(TERMINAL_DISCLAIMER));
});

test("restates known facts", () => {
  const text = getTerminalLines().join("\n");
  for (const fact of ["khalil-ur-rehman", "peshawar", "forensics", "bug-hunting", "rats-engineering", "ec-council"]) {
    assert.ok(text.includes(fact), `expected "${fact}"`);
  }
});

test("never looks like a real finding, target or credential", () => {
  const text = getTerminalLines().join("\n");
  assert.doesNotMatch(text, /CVE-\d/i, "no CVE identifiers");
  assert.doesNotMatch(text, /\b\d{1,3}(?:\.\d{1,3}){3}\b/, "no IP addresses");
  assert.doesNotMatch(text, /https?:\/\/|\bwww\./i, "no URLs");
  assert.doesNotMatch(text, /vulnerable|exploited|compromised|breach|pwned|access granted|root@/i, "no claimed results");
});

test("rotating by an offset keeps every line", () => {
  const lines = getTerminalLines();
  const rotated = getTerminalLines(5);
  assert.equal(rotated[0], lines[5]);
  assert.deepEqual([...rotated].sort(), [...lines].sort());
  assert.deepEqual(getTerminalLines(lines.length), lines);
});

test("each entry has output", () => {
  for (const entry of getTerminalEntries()) assert.ok(entry.output.length > 0, entry.command);
});

test("the thumbprint script is a labelled demo with no scores", () => {
  const rows = getScannerRows();
  const text = rows.map((row) => row.text).join("\n");
  assert.match(text, /--demo/);
  assert.match(text, /sample print/);
  assert.doesNotMatch(text, /\d\s*%|confidence|score|accuracy|verified/i);
  assert.deepEqual(
    rows.flatMap((row) => row.scene ?? []),
    ["scan", "minutiae", "align", "match"],
  );
});
