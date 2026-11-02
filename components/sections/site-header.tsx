import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { certifications } from "@/content/certifications";
import { primaryNav, site } from "@/content/site";
import { NavLink } from "./nav-link";

/**
 * Sticky header. On phones it pins with a negative offset, so the brand row scrolls
 * away and only the one-line nav stays, keeping the screen usable.
 */
export function SiteHeader() {
  const primaryCertification = certifications[0];

  return (
    <header className="sticky -top-14 z-40 bg-ink-950 pb-2 pt-3 md:top-0">
      <Container>
        <div className="frame-ticks relative flex flex-wrap items-stretch border border-line bg-ink-900 md:flex-nowrap">
          <Link
            href="/"
            className="type-label flex min-h-11 flex-1 items-center px-3 font-medium text-fg md:flex-none md:px-4"
          >
            {site.wordmark}
          </Link>
          <nav
            aria-label="Primary"
            className="flex w-full justify-between border-t border-line px-1 md:ml-auto md:w-auto md:border-t-0 md:px-0"
          >
            {primaryNav.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>
          {primaryCertification ? (
            <div className="hidden p-1 md:ml-3 md:block">
              <Button href="/skills#certifications" className="min-h-9">
                {primaryCertification.abbreviation}
              </Button>
            </div>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
