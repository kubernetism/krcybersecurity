import Link from "next/link";
import { Hexdump } from "@/components/motifs/hexdump";
import { Container } from "@/components/ui/container";
import { PlusGrid } from "@/components/ui/plus-grid";
import { certifications } from "@/content/certifications";
import { contact } from "@/content/contact";
import { experienceAreas } from "@/content/experience";
import { profile } from "@/content/profile";
import { primaryNav, site } from "@/content/site";
import { getContactChannels } from "@/lib/contact-channels";
import { Wordmark } from "./wordmark";

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="type-label text-accent-soft">{title}</h2>
      <div className="mt-3 space-y-1.5 text-sm text-fg-muted">{children}</div>
    </div>
  );
}

export function SiteFooter() {
  const channels = getContactChannels(contact);

  return (
    <footer className="relative isolate overflow-clip border-t border-line bg-ink-950">
      <PlusGrid className="-z-10 opacity-[0.08]" />
      <Container className="pt-10 md:pt-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-12">
          <div className="col-span-2 md:col-span-3">
            <FooterColumn title={site.wordmark}>
              <p className="text-fg">{profile.name}</p>
              <p>{profile.title}</p>
              <p>{profile.location}</p>
            </FooterColumn>
          </div>
          <div className="md:col-span-2">
            <FooterColumn title="Pages">
              <ul className="space-y-0.5">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="inline-block py-1 transition-colors hover:text-fg">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          </div>
          <div className="md:col-span-2">
            <FooterColumn title="Experience">
              {experienceAreas.map((area) => (
                <p key={area.id}>{area.name}</p>
              ))}
            </FooterColumn>
          </div>
          <div className="col-span-2 sm:col-span-1 md:col-span-2">
            <FooterColumn title="Certification">
              {certifications.map((certification) => (
                <p key={certification.id}>
                  {certification.abbreviation}, {certification.issuer}
                </p>
              ))}
            </FooterColumn>
          </div>
          {channels.length > 0 ? (
            <div className="col-span-2 sm:col-span-1 md:col-span-3">
              <FooterColumn title="Connect">
                <ul className="space-y-0.5">
                  {channels.map((channel) => (
                    <li key={channel.href}>
                      <a
                        href={channel.href}
                        {...(channel.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="inline-block py-1 transition-colors hover:text-fg"
                      >
                        {channel.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            </div>
          ) : (
            <div className="hidden md:col-span-3 md:block">
              <Hexdump text={site.wordmark} className="text-right text-xs text-fg-dim" />
            </div>
          )}
        </div>
      </Container>
      {/* Oversized and cropped by the page edge, purely as a sign-off. */}
      <Container className="mt-10 md:mt-16">
        <div aria-hidden="true" className="mb-[-3%] h-auto overflow-clip">
          <Wordmark trigger="scroll" />
        </div>
      </Container>
    </footer>
  );
}
