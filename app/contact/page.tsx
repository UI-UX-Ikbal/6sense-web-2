import type { Metadata } from "next";
import { contactContent } from "@/content/contact";
import { ContactHero } from "@/components/contact/ContactHero";
import { HostsSection } from "@/components/ui/HostsSection";
import { TestimonialsSection } from "@/components/ui/TestimonialsSection";

const { meta, route } = contactContent;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: route },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: route,
  },
};

/** Contact us — Figma 12404:3717 (1440) / 12404:3964 (390). */
export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <HostsSection content={contactContent.hosts} />
      <TestimonialsSection content={contactContent.testimonials} />
    </>
  );
}
