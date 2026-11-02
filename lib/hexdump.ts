export type HexRow = { offset: string; bytes: string; ascii: string };

/** Formats text as `hexdump -C` style rows. Used for decorative motifs only. */
export function toHexDump(text: string, width = 8): HexRow[] {
  const bytes = Array.from(new TextEncoder().encode(text));
  const rows: HexRow[] = [];

  for (let start = 0; start < bytes.length; start += width) {
    const chunk = bytes.slice(start, start + width);
    rows.push({
      offset: start.toString(16).padStart(8, "0"),
      bytes: chunk.map((byte) => byte.toString(16).padStart(2, "0")).join(" "),
      ascii: chunk
        .map((byte) => (byte >= 0x20 && byte < 0x7f ? String.fromCharCode(byte) : "."))
        .join(""),
    });
  }

  return rows;
}
