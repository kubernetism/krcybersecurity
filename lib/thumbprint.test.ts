import assert from "node:assert/strict";
import { test } from "node:test";
import { createThumbprint } from "./thumbprint.ts";

test("is deterministic, so server and client output match", () => {
  assert.deepEqual(createThumbprint(), createThumbprint());
});

test("produces ridges and a modest number of markers", () => {
  const { ridges, minutiae } = createThumbprint();
  assert.ok(ridges.length >= 23, `ridges: ${ridges.length}`);
  assert.ok(minutiae.length >= 5 && minutiae.length <= 9, `minutiae: ${minutiae.length}`);
});

test("keeps markers inside the print and apart from each other", () => {
  const { width, height, minutiae } = createThumbprint();
  for (const point of minutiae) {
    assert.ok(point.x > 0 && point.x < width && point.y > 0 && point.y < height);
  }
  for (const [index, a] of minutiae.entries()) {
    for (const b of minutiae.slice(index + 1)) {
      assert.ok(Math.hypot(a.x - b.x, a.y - b.y) >= 24);
    }
  }
});

test("orders ridges top to bottom for the scan reveal", () => {
  const firstY = (path: string) => Number(path.match(/^M[\d.]+ ([\d.]+)/)?.[1]);
  const { ridges } = createThumbprint();
  const first = firstY(ridges[0] ?? "");
  const last = firstY(ridges.at(-1) ?? "");
  assert.ok(first < last, `${first} should be above ${last}`);
});
