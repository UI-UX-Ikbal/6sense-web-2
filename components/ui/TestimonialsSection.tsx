"use client";

import { useState } from "react";
import type { TestimonialsContent } from "@/content/types";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "./TestimonialCard";

const HEADING_ID = "testimonials-heading";

type TestimonialsSectionProps = {
  content: TestimonialsContent;
};

/**
 * "Words from our clients" (Figma 11995:46701 at 1440, 11995:45440 at 390; also Book a meeting 12280:2953).
 * ≥1024: hovering or focusing a card expands it (states 11995:46628 / 11995:47654);
 * at 390 both cards are shown expanded.
 */
export function TestimonialsSection({
  content: testimonials,
}: TestimonialsSectionProps) {
  const [active, setActive] = useState(0);

  return (
    <section aria-labelledby={HEADING_ID} className="bg-brand-deep section-y">
      <div className="container-site flex flex-col gap-9">
        <Reveal>
          <SectionHeading
            id={HEADING_ID}
            tone="inverse"
            title={testimonials.heading}
            titleClassName="lg:w-heading-title"
          />
        </Reveal>

        <Reveal delay={120}>
          <ul className="flex flex-col gap-9 lg:h-testimonials lg:flex-row">
            {testimonials.items.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.quote}
                testimonial={testimonial}
                labels={testimonials}
                expanded={index === active}
                onActivate={() => setActive(index)}
              />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
