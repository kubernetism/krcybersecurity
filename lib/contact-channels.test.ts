import assert from "node:assert/strict";
import { test } from "node:test";
import { getContactChannels } from "./contact-channels.ts";

test("returns nothing when no details are published", () => {
  assert.deepEqual(getContactChannels({ links: [] }), []);
});

test("lists email first, then links with a tidy display value", () => {
  const channels = getContactChannels({
    email: "name@example.com",
    links: [{ label: "GitHub", href: "https://www.github.com/name/" }],
  });

  assert.deepEqual(channels, [
    { label: "Email", href: "mailto:name@example.com", display: "name@example.com", isExternal: false },
    { label: "GitHub", href: "https://www.github.com/name/", display: "github.com/name", isExternal: true },
  ]);
});
