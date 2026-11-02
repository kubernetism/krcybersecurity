export type RssItem = { title: string; url: string; summary: string; date: string };

export type RssFeed = { title: string; description: string; url: string; items: RssItem[] };

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

/** Builds an RSS 2.0 document. All text is escaped. */
export function buildRss({ title, description, url, items }: RssFeed): string {
  const entries = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid>${escapeXml(item.url)}</guid>
      <description>${escapeXml(item.summary)}</description>
      <pubDate>${new Date(`${item.date}T00:00:00Z`).toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(url)}</link>
    <description>${escapeXml(description)}</description>
${entries}
  </channel>
</rss>
`;
}
