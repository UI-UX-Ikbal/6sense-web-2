import Image from "next/image";
import type { CapabilityGridContent } from "@/content/services/types";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Heading + subheading over a grid of icon cards (EV & Mobility "Where we plug in" 12167:452 at
 * 1440, 12167:1361 at 390). Three columns from 1024, two from 768, one below.
 */
export function CapabilityGridSection({
  content,
}: {
  content: CapabilityGridContent;
}) {
  const headingId = `${content.id}-heading`;
  const compact = content.compactText;

  return (
    <section
      id={content.id}
      aria-labelledby={headingId}
      className="bg-surface section-y"
    >
      <div className="container-site flex flex-col gap-9">
        <Reveal className="flex flex-col gap-3 lg:flex-row lg:gap-12">
          <h2
            id={headingId}
            className="text-4xl font-semibold text-brand lg:w-split-media"
          >
            {content.heading}
          </h2>
          {content.subheading ? (
            <p className="text-lg text-brand lg:max-w-capability-sub lg:self-center lg:pt-4">
              {content.subheading}
            </p>
          ) : null}
        </Reveal>

        <Reveal
          delay={120}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {content.items.map((item) => (
            <article
              key={item.title}
              className="flex flex-col items-start gap-8 bg-sage p-8"
            >
              <Image
                src={item.icon.src}
                alt=""
                width={item.icon.width}
                height={item.icon.height}
                className="size-13 shrink-0"
              />
              <div className="flex flex-col gap-2">
                <h3
                  className={`text-fg ${compact ? "text-lg lg:text-xl" : "text-xl"}`}
                >
                  {item.title}
                </h3>
                <p
                  className={`whitespace-pre-line text-muted ${compact ? "text-sm lg:text-base" : "text-base"}`}
                >
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
