import Image from "next/image";
import type { StepsContent } from "@/content/services/types";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Numbered process on a timeline (IoT "The Right Way" 12110:2347 at 1440, 12110:3524 at 390).
 * ≥1024: three columns on a horizontal rule that runs off the right edge. Below: stacked steps on a
 * vertical rule that runs to the bottom of the section.
 */
export function StepsSection({ content }: { content: StepsContent }) {
  const headingId = `${content.id}-heading`;

  return (
    <section
      id={content.id}
      aria-labelledby={headingId}
      className="overflow-hidden bg-surface section-y"
    >
      <div className="container-site flex flex-col gap-8 lg:gap-12">
        <Reveal>
          <SectionHeading
            id={headingId}
            title={content.heading}
            subheading={content.subheading}
            tone="brand"
            titleClassName="lg:w-split-media"
          />
        </Reveal>

        <Reveal delay={120}>
          <ol className="relative flex flex-col gap-12 lg:flex-row">
            <span
              aria-hidden
              className="absolute top-0 -bottom-section-sm left-5.5 w-0.5 bg-rule lg:top-6.25 lg:bottom-auto lg:left-0 lg:h-0.5 lg:w-screen"
            />
            {content.steps.map((step) => (
              <li
                key={step.title}
                className="relative flex flex-1 items-start gap-3 lg:flex-col"
              >
                <Image
                  src={step.icon.src}
                  alt=""
                  width={step.icon.width}
                  height={step.icon.height}
                  className="size-12 shrink-0"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <h3 className="text-lg font-semibold text-fg lg:text-xl">
                    {step.title}
                  </h3>
                  <p className="text-sm text-fg-subtle lg:text-base">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
