import assert from "node:assert/strict";
import { test } from "node:test";
import { toHexDump } from "./hexdump.ts";

test("formats offsets, bytes and ascii in fixed-width rows", () => {
  assert.deepEqual(toHexDump("KR Cybersecurity"), [
    { offset: "00000000", bytes: "4b 52 20 43 79 62 65 72", ascii: "KR Cyber" },
    { offset: "00000008", bytes: "73 65 63 75 72 69 74 79", ascii: "security" },
  ]);
});

test("keeps a short final row and replaces non-printable bytes", () => {
  assert.deepEqual(toHexDump("A\n"), [{ offset: "00000000", bytes: "41 0a", ascii: "A." }]);
});
