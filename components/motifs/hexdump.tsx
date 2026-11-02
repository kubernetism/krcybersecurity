import { toHexDump } from "@/lib/hexdump";
import { cn } from "@/lib/cn";

/**
 * Decorative `hexdump -C` of the given text, never a real artefact. The bytes
 * are simply the text itself.
 */
export function Hexdump({ text, className }: { text: string; className?: string }) {
  return (
    <pre aria-hidden="true" className={cn("font-mono leading-relaxed", className)}>
      {toHexDump(text)
        .map((row) => `${row.offset}  ${row.bytes.padEnd(23)}  |${row.ascii}|`)
        .join("\n")}
    </pre>
  );
}
