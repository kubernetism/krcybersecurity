/** Certifications. `issued` and `verifyUrl` render only when present. */
export type Certification = {
  id: string;
  name: string;
  abbreviation: string;
  issuer: string;
  /** Optional, free text, for example "2025". */
  issued?: string;
  /** Optional public verification link. */
  verifyUrl?: string;
};

export const certifications: Certification[] = [
  {
    id: "ceh",
    name: "Certified Ethical Hacker",
    abbreviation: "CEH",
    issuer: "EC-Council",
  },
];
