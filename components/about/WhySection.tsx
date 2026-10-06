import Image from "next/image";
import { aboutContent } from "@/content/about";
import { IconPoint } from "@/components/ui/IconPoint";
import { Reveal } from "@/components/ui/Reveal";

const HEADING_ID = "about-why-heading";

/**
 * "Why 6sense HQ exists" (Figma 12263:1828 at 1440, 12263:2457 at 390): dark band with the
 * arch-cropped forest photo and bold icon points; the pair is centred in the 1240 row.
 */
export function WhySection() {
  const { why } = aboutContent;

  return (
    <section aria-labelledby={HEADING_ID} className="bg-brand-deep section-y">
      <div className="container-site grid gap-12 text-inverse lg:grid-cols-[minmax(0,var(--container-feature-media))_minmax(0,var(--container-why-copy))] lg:justify-center">
        <Reveal className="flex flex-col gap-12">
          <h2 id={HEADING_ID} className="text-3xl font-semibold lg:text-4xl">
            {why.heading}
          </h2>
          <div className="relative aspect-arch w-full overflow-hidden rounded-tr-arch md:max-w-arch-media">
            <Image
              src={why.image.src}
              alt={why.image.alt}
              fill
              sizes="(min-width: 1024px) 430px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={120} className="flex flex-col gap-4.5 pt-4">
          <p className="text-lg lg:text-xl">{why.lead}</p>
          <ul className="flex flex-col gap-6 text-lg font-bold lg:text-xl">
            {why.points.map((point) => (
              <IconPoint key={point} icon={why.icon}>
                {point}
              </IconPoint>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
