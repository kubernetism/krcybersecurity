/**
 * Public contact details. Both are empty on purpose: nothing has been published
 * yet. Add an email or a link here and it appears on /contact and in the footer.
 *
 * Example:
 * export const contact: Contact = {
 *   email: "name@example.com",
 *   links: [{ label: "GitHub", href: "https://github.com/username" }],
 * };
 */
export type ContactLink = { label: string; href: string };

export type Contact = {
  email?: string;
  links: ContactLink[];
};

export const contact: Contact = {
  links: [],
};
