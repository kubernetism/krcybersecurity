/**
 * Experience areas. Only `name` is known today. The optional fields render
 * automatically once filled in, so employers, dates or notes can be added here
 * without touching a component.
 */
export type ExperienceArea = {
  id: string;
  name: string;
  /** Optional, for example an employer or "Independent". */
  organisation?: string;
  /** Optional, free text, for example "2023 to present". */
  period?: string;
  /** Optional short factual notes. */
  highlights?: string[];
};

export const experienceAreas: ExperienceArea[] = [
  { id: "forensics", name: "Forensics" },
  { id: "bug-hunting", name: "Bug Hunting" },
];
