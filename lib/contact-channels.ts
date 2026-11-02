import type { Contact } from "../content/contact.ts";

export type ContactChannel = {
  label: string;
  href: string;
  display: string;
  isExternal: boolean;
};

/** Normalises the contact data into one list for the page and the footer. */
export function getContactChannels(contact: Contact): ContactChannel[] {
  const channels: ContactChannel[] = [];

  if (contact.email) {
    channels.push({
      label: "Email",
      href: `mailto:${contact.email}`,
      display: contact.email,
      isExternal: false,
    });
  }

  for (const link of contact.links) {
    channels.push({
      label: link.label,
      href: link.href,
      display: link.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
      isExternal: true,
    });
  }

  return channels;
}
