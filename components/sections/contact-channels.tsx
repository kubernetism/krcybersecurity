import { LiftLink } from "@/components/motion/lift";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import { contact } from "@/content/contact";
import { getContactChannels } from "@/lib/contact-channels";

/** Contact details from `content/contact.ts`, or an honest empty state. */
export function ContactChannels() {
  const channels = getContactChannels(contact);

  return (
    <section aria-label="Contact details" className="py-3 pb-16 md:pb-28">
      <Container>
        {channels.length === 0 ? (
          <EmptyState command="cat contact.txt" output="(empty)" title="Contact details are not listed yet">
            <p>They will appear on this page when they are published.</p>
          </EmptyState>
        ) : (
          <Stagger className="grid gap-3 md:grid-cols-2">
            {channels.map((channel) => (
              <StaggerItem key={channel.href}>
                <LiftLink
                  href={channel.href}
                  {...(channel.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="block"
                >
                  <Panel className="p-5 transition-colors duration-300 hover:border-accent md:p-7">
                    <p className="type-label text-accent-soft">{channel.label}</p>
                    <p className="mt-3 break-words font-mono text-lg text-fg md:text-2xl">{channel.display}</p>
                  </Panel>
                </LiftLink>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </Container>
    </section>
  );
}
