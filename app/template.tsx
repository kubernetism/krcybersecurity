import { PageTransition } from "@/components/motion/page-transition";

/** Remounts per navigation, which drives the enter-only page transition. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
