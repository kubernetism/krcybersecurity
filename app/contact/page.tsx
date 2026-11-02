import type { Metadata } from "next";
import { ContactChannels } from "@/components/sections/contact-channels";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact details for Khalil Ur Rehman, Cyber Security Researcher.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero label="Contact // Details" title="Contact" />
      <ContactChannels />
    </>
  );
}
