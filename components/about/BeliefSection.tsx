import Image from "next/image";
import { aboutContent } from "@/content/about";
import { IconPoint } from "@/components/ui/IconPoint";
import { Reveal } from "@/components/ui/Reveal";

const HEADING_ID = "about-belief-heading";

/**
 * "We believe" (Figma 12263:1725 at 1440, 12263:2354 at 390): right-aligned title over the
 * leaf-shaped photo, lead line and icon points beside it from 1024.
 */
export function BeliefSection() {
  const { belief } = aboutContent;

  return (
    <section aria-labelledby={HEADING_ID} className="bg-surface section-y">
      <div className="container-site grid gap-8 lg:grid-cols-[minmax(0,var(--container-about-heading))_minmax(0,var(--container-believe-copy))] lg:gap-12">
        <Reveal className="flex flex-col items-end gap-12 lg:gap-3">
          <h2
            id={HEADING_ID}
            className="text-right text-4xl font-semibold text-brand"
          >
            {belief.heading}
          </h2>
          <Image
            src={belief.image.src}
            alt={belief.image.alt}
            width={belief.image.width}
            height={belief.image.height}
            sizes="(min-width: 1024px) 435px, 100vw"
            className="h-auto w-full md:max-w-feature-media"
          />
        </Reveal>

        <Reveal delay={120} className="flex flex-col gap-6 lg:pt-4">
          <p className="text-base text-ink-green lg:text-lg">{belief.lead}</p>
          <ul className="flex flex-col gap-6 text-sm text-fg lg:text-base">
            {belief.points.map((point) => (
              <IconPoint key={point} icon={belief.icon}>
                {point}
              </IconPoint>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
