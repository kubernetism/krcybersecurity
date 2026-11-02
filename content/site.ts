/** Site-wide identity and navigation. */
export type NavItem = { label: string; href: string };

export const site = {
  wordmark: "KR Cybersecurity",
  description:
    "Khalil Ur Rehman, Cyber Security Researcher based in Peshawar. Forensics and bug hunting. Certified Ethical Hacker (CEH) from EC-Council.",
} as const;

export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
