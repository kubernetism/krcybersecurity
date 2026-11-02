/**
 * The owner's public profile. Everything on the site that describes the person
 * reads from here, so correcting a fact is a one-line edit.
 */
export type Profile = {
  name: string;
  title: string;
  location: string;
  /** Short factual biography. Keep it to verifiable statements. */
  bio: string;
};

export const profile: Profile = {
  name: "Khalil Ur Rehman",
  title: "Cyber Security Researcher",
  location: "Peshawar",
  bio: "Khalil Ur Rehman is a Cyber Security Researcher based in Peshawar, with experience in forensics and bug hunting. Certified Ethical Hacker (CEH) from EC-Council.",
};
