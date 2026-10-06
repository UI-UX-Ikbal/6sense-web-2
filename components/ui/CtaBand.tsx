import Image from "next/image";
import type { ImageAsset, LinkItem, OrbitLayer } from "@/content/types";
import { ButtonLink } from "@/components/ui/Button";
import { IconOrbit } from "@/components/ui/IconOrbit";
import { Reveal } from "@/components/ui/Reveal";

type CtaBandProps = {
  id: string;
  heading: string;
  body: string;
  link: LinkItem;
  image: ImageAsset;
  mobileImage: ImageAsset;
  orbitStates?: readonly (readonly OrbitLayer[])[];
};

/**
 * Closing call-to-action band (Figma "CTA" 12113:3889 at 1440, 12113:4312 at 390):
 * photo card with heading, copy, one button and the decorative icon cluster.
 */
export function CtaBand({
  id,
  heading,
  body,
  link,
  image,
  mobileImage,
  orbitStates,
}: CtaBandProps) {
  return (
    <section aria-labelledby={id} className="bg-sage section-y">
      <div className="container-site">
        <Reveal>
          <div className="relative isolate flex h-cta-band-mobile flex-col gap-6 overflow-hidden rounded-panel p-8 lg:h-cta-band lg:p-16">
            <Image
              src={mobileImage.src}
              alt={mobileImage.alt}
              fill
              sizes="100vw"
              className="-z-10 object-cover object-bottom md:hidden"
            />
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1304px) 1240px, 100vw"
              className="-z-10 hidden object-cover object-bottom md:block"
            />

            <div className="flex flex-col gap-3 text-fg lg:w-cta-copy">
              <h2 id={id} className="text-3xl font-semibold lg:text-4xl">
                {heading}
              </h2>
              <p className="text-base lg:text-lg">{body}</p>
            </div>
            <ButtonLink
              href={link.href}
              className="w-full lg:w-auto lg:self-start"
            >
              {link.label}
            </ButtonLink>

            {orbitStates ? (
              <IconOrbit
                states={orbitStates}
                className="absolute right-7 bottom-10.25 lg:right-10.75"
              />
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
