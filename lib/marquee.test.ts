import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { imageSize } from "image-size";
import { organizations } from "../content/organizations.ts";
import {
  estimateItemWidth,
  fitLogo,
  getMarqueeTiming,
  MARQUEE_GAP_WIDE,
  MARQUEE_SPEED,
} from "./marquee.ts";

test("an item is as wide as its larger part", () => {
  assert.equal(estimateItemWidth("Go", 40), 40);
  assert.ok(estimateItemWidth("TypeScript", 40) > 40);
});

test("duration gives the same speed whatever the data", () => {
  for (const widths of [[50, 50], Array.from({ length: 30 }, () => 80)]) {
    const { durationWide } = getMarqueeTiming(widths);
    const distance = widths.reduce((sum, width) => sum + width + MARQUEE_GAP_WIDE, 0);
    assert.equal(distance / durationWide, MARQUEE_SPEED);
  }
});

test("renders enough copies to overfill ultra-wide screens, however few items", () => {
  for (const widths of [[40], [40, 40, 40], Array.from({ length: 12 }, () => 60)]) {
    const { copies } = getMarqueeTiming(widths);
    const one = widths.reduce((sum, width) => sum + width + MARQUEE_GAP_WIDE, 0);
    assert.ok((copies - 1) * one >= 5760, `${widths.length} items: ${copies} copies`);
  }
});

test("organization entries are unique and point at real logo files", () => {
  const names = organizations.map((organization) => organization.name);
  assert.equal(new Set(names).size, names.length);
  for (const { name, logo } of organizations) {
    assert.match(logo, /^\/logos\//, name);
    assert.ok(existsSync(path.join("public", logo)), `${name}: ${logo} missing`);
  }
});

test("no orphan logo files are left behind", () => {
  const used = new Set(organizations.map(({ logo }) => path.basename(logo)));
  for (const file of readdirSync("public/logos")) assert.ok(used.has(file), file);
});

test("fits logos to the row and rejects unusable dimensions", () => {
  assert.deepEqual(fitLogo({ width: 256, height: 256 }, 40, 112), { width: 40, height: 40 });
  assert.deepEqual(fitLogo({ width: 512, height: 64 }, 40, 112), { width: 112, height: 14 });
  assert.equal(fitLogo({ height: 315 }, 40, 112), null);
  assert.equal(fitLogo({ width: Number.NaN, height: 10 }, 40, 112), null);
});

// Runs the real files through real sizing. A logo with bad dimensions once produced a
// NaN duration, and the browser silently dropped the whole animation.
test("every organization logo yields a real size and a valid animation timing", () => {
  const widths = organizations.map(({ name, logo }) => {
    const size = fitLogo(imageSize(readFileSync(path.join("public", logo))), 40, 112);
    assert.ok(size, `${name}: ${logo} has no usable size`);
    return estimateItemWidth(name, size.width);
  });
  const timing = getMarqueeTiming(widths);
  assert.ok(Number.isFinite(timing.durationWide) && timing.durationWide > 0);
  assert.ok(Number.isFinite(timing.durationNarrow) && timing.durationNarrow > 0);
  assert.ok(Number.isInteger(timing.copies) && timing.copies >= 2);
});

test("the invented CVE-style text appears only on sample entries, labelled as sample", () => {
  for (const { name, sample, detail } of organizations) {
    if (!detail) continue;
    assert.equal(sample, true, `${name}: detail text is only allowed on sample entries`);
    assert.match(detail, /^Sample /, name);
    // Real identifiers look like CVE-2024-12345. Sample text must never take that form.
    assert.doesNotMatch(detail, /CVE-\d{4}-\d{4,}/, name);
  }
});
