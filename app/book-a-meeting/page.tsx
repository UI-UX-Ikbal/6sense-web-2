import type { Metadata } from "next";
import { bookMeetingContent } from "@/content/book-a-meeting";
import { BookingHero } from "@/components/book-a-meeting/BookingHero";
import { HostsSection } from "@/components/ui/HostsSection";
import { TestimonialsSection } from "@/components/ui/TestimonialsSection";

const { meta, route } = bookMeetingContent;

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

/** Book a meeting — Figma 12266:732 (1440) / 12266:1316 (390). */
export default function BookAMeetingPage() {
  return (
    <>
      <BookingHero />
      <HostsSection content={bookMeetingContent.hosts} />
      <TestimonialsSection content={bookMeetingContent.testimonials} />
    </>
  );
}
