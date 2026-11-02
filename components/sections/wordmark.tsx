import { WordmarkLetters } from "@/components/motion/wordmark-letters";
import type { EntranceTrigger } from "@/components/motion/entrance";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

/** Splits "KR Cybersecurity" so it can stack on phones and sit inline above. */
const LINES = site.wordmark.split(" ");

type WordmarkProps = {
  trigger?: EntranceTrigger;
  className?: string;
};

/** The giant wordmark. Decorative: pair it with a real heading where one is needed. */
export function Wordmark({ trigger = "load", className }: WordmarkProps) {
  return (
    <span className={cn("wordmark block", className)}>
      <WordmarkLetters lines={LINES} trigger={trigger} />
    </span>
  );
}
