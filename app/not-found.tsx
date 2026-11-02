import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PlusGrid } from "@/components/ui/plus-grid";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-clip [background:var(--gradient-page)]">
      <PlusGrid className="-z-10 opacity-20" />
      <Container className="py-16 md:py-28">
        <p aria-hidden="true" className="font-mono text-sm text-fg-muted">
          <span className="text-accent-pale">$</span> cat page
          <br />
          cat: page: No such file or directory
        </p>
        <h1 className="type-poster mt-6 text-[clamp(6rem,30vw,28rem)] leading-[0.8] text-fg">404</h1>
        <p className="mt-6 max-w-[50ch] text-lg text-fg-muted">This page does not exist.</p>
        <Button href="/" className="mt-6">
          Home
        </Button>
      </Container>
    </section>
  );
}
