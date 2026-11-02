import { certifications } from "../content/certifications.ts";
import { experienceAreas } from "../content/experience.ts";
import { profile } from "../content/profile.ts";
import { site } from "../content/site.ts";
import { skills } from "../content/skills.ts";
import { toHexDump } from "./hexdump.ts";

/**
 * Text for the hero's decorative terminal. Every line restates a fact from
 * `content/`, so it can never claim a finding, target, CVE or result. Add lines by
 * adding content, not by inventing output here.
 */
export type TerminalEntry = { command: string; output: string[] };

/** A step of the thumbprint animation that plays once its row has appeared. */
export type ScannerScene = "scan" | "minutiae" | "align" | "match";

export type ScannerRow = { kind: "command" | "output"; text: string; scene?: ScannerScene };

function toSlug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export const TERMINAL_DISCLAIMER = "# decorative animation, not a real scan";

/**
 * The script for the thumbprint panel. It runs on a synthetic sample print and
 * reports no scores: "match" here describes the animation, not a real comparison.
 */
export function getScannerRows(): ScannerRow[] {
  return [
    { kind: "command", text: "thumbprint scan --demo" },
    { kind: "output", text: "reading ridges", scene: "scan" },
    { kind: "output", text: "mapping minutiae", scene: "minutiae" },
    { kind: "command", text: "thumbprint match --demo" },
    { kind: "output", text: "comparing to sample print", scene: "align" },
    { kind: "output", text: "match: sample print", scene: "match" },
    { kind: "command", text: "whoami" },
    { kind: "output", text: toSlug(profile.name) },
  ];
}

export function getTerminalEntries(): TerminalEntry[] {
  return [
    { command: "whoami", output: [toSlug(profile.name)] },
    { command: "thumbprint scan --demo", output: ["reading ridges", "mapping minutiae"] },
    { command: "thumbprint match --demo", output: ["comparing to sample print", "match: sample print"] },
    { command: "cat title.txt", output: [profile.title.toLowerCase()] },
    { command: "cat location.txt", output: [profile.location.toLowerCase()] },
    { command: "ls focus/", output: experienceAreas.map((area) => toSlug(area.name)) },
    { command: "ls skills/", output: skills.map((skill) => toSlug(skill.name)) },
    {
      command: "cat certification.txt",
      output: certifications.map(
        (certification) =>
          `${certification.name} (${certification.abbreviation}), ${certification.issuer}`.toLowerCase(),
      ),
    },
    {
      command: "hexdump -C wordmark.txt",
      output: toHexDump(site.wordmark).map(
        (row) => `${row.offset}  ${row.bytes.padEnd(23)}  |${row.ascii}|`,
      ),
    },
  ];
}

/** Flattens entries into plain lines, starting `offset` lines in, for scrolling columns. */
export function getTerminalLines(offset = 0): string[] {
  const lines = [
    TERMINAL_DISCLAIMER,
    ...getTerminalEntries().flatMap((entry) => [`$ ${entry.command}`, ...entry.output]),
  ];
  const start = offset % lines.length;
  return [...lines.slice(start), ...lines.slice(0, start)];
}
