"use client";

import { inView, stagger, steps, useAnimate, useReducedMotionConfig } from "framer-motion";
import { useEffect, useId } from "react";
import { ThumbprintLayers } from "@/components/motifs/thumbprint-layers";
import type { ScannerRow, ScannerScene } from "@/lib/terminal-lines";
import type { Thumbprint } from "@/lib/thumbprint";
import { EASE_OUT_EXPO } from "./entrance";

const SECONDS_PER_CHARACTER = 0.04;
const SCAN_SECONDS = 1.9;
const HOLD_SECONDS = 5;

const CORNERS = [
  "left-0 top-0 border-l border-t",
  "right-0 top-0 border-r border-t",
  "bottom-0 left-0 border-b border-l",
  "bottom-0 right-0 border-b border-r",
];

type ThumbprintScannerProps = {
  print: Thumbprint;
  rows: ScannerRow[];
  disclaimer: string;
};

/**
 * Decorative terminal and thumbprint, driven by one timeline so they stay in sync:
 * typing a command starts each stage of the scan and match. Only opacity and
 * transform change and every element keeps its space, so nothing shifts. The server
 * renders the finished state, which reduced-motion and no-JS visitors keep.
 */
export function ThumbprintScanner({ print, rows, disclaimer }: ThumbprintScannerProps) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reducedMotion = useReducedMotionConfig();
  const idPrefix = useId();

  useEffect(() => {
    const root = scope.current;
    if (!root || reducedMotion) return;

    const select = (selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector));
    const caret = root.querySelector<HTMLElement>("[data-caret]");
    const beam = root.querySelector<HTMLElement>("[data-beam]");
    const reference = root.querySelector<HTMLElement>("[data-reference]");
    const ridges = select("[data-ridge]");
    const minutiae = select("[data-minutia]");
    const matched = select("[data-matched]");
    const rowElements = select("[data-row]");
    const typed = select("[data-char], [data-output]");
    if (!caret || !beam || !reference) return;

    let isCancelled = false;
    let isVisible = true;
    let resume: (() => void) | null = null;

    const stopWatching = inView(root, () => {
      isVisible = true;
      resume?.();
      resume = null;
      return () => {
        isVisible = false;
      };
    });

    const wait = (seconds: number) =>
      new Promise<void>((done) => {
        window.setTimeout(done, seconds * 1000);
      });

    const untilVisible = () =>
      isVisible
        ? Promise.resolve()
        : new Promise<void>((done) => {
            resume = done;
          });

    const scenes: Record<ScannerScene, () => Promise<void>> = {
      scan: async () => {
        await Promise.all([
          animate(beam, { opacity: [1, 1, 0], y: ["0%", "100%", "100%"] }, { duration: SCAN_SECONDS, ease: "easeInOut", times: [0, 0.96, 1] }),
          animate(ridges, { opacity: 1 }, { duration: 0.2, delay: stagger(SCAN_SECONDS / ridges.length) }),
        ]);
      },
      minutiae: async () => {
        await animate(minutiae, { opacity: [0, 1], scale: [2.8, 1] }, { duration: 0.32, ease: EASE_OUT_EXPO, delay: stagger(0.13) });
      },
      align: async () => {
        await animate(
          reference,
          { opacity: [0, 0.85], x: [20, 0], y: [-14, 0], rotate: [9, 0] },
          { duration: 1.25, ease: EASE_OUT_EXPO },
        );
      },
      match: async () => {
        await Promise.all([
          animate(minutiae, { scale: [1, 1.7, 1] }, { duration: 0.42, delay: stagger(0.03) }),
          animate(matched, { opacity: 1, scale: [1.14, 1] }, { duration: 0.34, ease: EASE_OUT_EXPO }),
          animate(reference, { opacity: 0 }, { duration: 0.6, delay: 0.3 }),
        ]);
      },
    };

    const typeRow = async (row: HTMLElement) => {
      const characters = Array.from(row.querySelectorAll<HTMLElement>("[data-char]"));
      await animate(caret, { opacity: 1, y: row.offsetTop }, { duration: 0 });
      await Promise.all([
        animate(characters, { opacity: 1 }, { duration: 0.001, delay: stagger(SECONDS_PER_CHARACTER) }),
        animate(
          caret,
          { x: ["0ch", `${characters.length}ch`] },
          { duration: characters.length * SECONDS_PER_CHARACTER, ease: steps(Math.max(characters.length, 1)) },
        ),
      ]);
      await wait(0.25);
    };

    const showOutput = async (row: HTMLElement) => {
      await animate(caret, { opacity: 0 }, { duration: 0 });
      await animate(row, { opacity: 1 }, { duration: 0.16 });
      await wait(0.1);
    };

    const reset = (duration: number) =>
      Promise.all([
        animate(typed, { opacity: 0 }, { duration }),
        animate(ridges, { opacity: 0 }, { duration }),
        animate(minutiae, { opacity: 0 }, { duration }),
        animate(matched, { opacity: 0 }, { duration }),
        animate(reference, { opacity: 0 }, { duration }),
        animate(caret, { opacity: 0 }, { duration }),
      ]);

    const play = async () => {
      await reset(0);

      while (!isCancelled) {
        for (const [index, element] of rowElements.entries()) {
          await untilVisible();
          if (isCancelled) return;

          const row = rows[index];
          if (row?.kind === "command") await typeRow(element);
          else await showOutput(element);

          if (row?.scene) await scenes[row.scene]();
        }

        await animate(caret, { opacity: 1 }, { duration: 0 });
        await wait(HOLD_SECONDS);
        if (isCancelled) return;
        await reset(0.4);
        await wait(0.5);
      }
    };

    void play();

    return () => {
      isCancelled = true;
      resume?.();
      stopWatching();
    };
  }, [animate, reducedMotion, rows, scope]);

  return (
    <div
      ref={scope}
      aria-hidden="true"
      className="frame-ticks relative border border-line-strong bg-ink-950/90 p-3 font-mono text-[0.6875rem] leading-[1.125rem] text-fg"
    >
      <p className="truncate text-fg-muted">{disclaimer}</p>
      <div className="mt-2 flex gap-3">
        <div className="relative w-[clamp(5rem,26vw,7.25rem)] shrink-0 self-start">
          <div className="relative aspect-[200/260] overflow-clip">
            <ThumbprintLayers print={print} idPrefix={idPrefix} />
            <div className="pointer-events-none absolute inset-0">
              <div data-beam className="h-full border-t-2 border-accent-pale opacity-0" />
            </div>
          </div>
          {CORNERS.map((corner) => (
            <span key={corner} data-matched className={`absolute h-3 w-3 border-accent-soft ${corner}`} />
          ))}
        </div>
        <div className="relative min-w-0 flex-1">
          <span
            data-caret
            className="absolute left-0 top-0 h-[1.125rem] w-[1ch] bg-accent-pale opacity-0"
          />
          {rows.map((row) =>
            row.kind === "command" ? (
              <p key={row.text} data-row className="whitespace-pre text-accent-pale">
                {Array.from(`$ ${row.text}`).map((character, index) => (
                  <span key={index} data-char>
                    {character}
                  </span>
                ))}
              </p>
            ) : (
              <p key={row.text} data-row data-output className="whitespace-pre">
                {row.text}
              </p>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
