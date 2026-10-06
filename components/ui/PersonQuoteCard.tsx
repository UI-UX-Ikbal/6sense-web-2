import Image from "next/image";
import Link from "next/link";
import type { Person } from "@/content/about";
import { CroppedImage } from "@/components/ui/CroppedImage";

type PersonQuoteCardProps = {
  person: Person;
  followLabel: string;
};

/**
 * Quote card with portrait, name, role and social links (Figma 12293:4084 at 1440, 12293:4457 at 390).
 * <1024: quote on top, portrait row below. ≥1024: portrait column on the left, quote beside it.
 */
export function PersonQuoteCard({ person, followLabel }: PersonQuoteCardProps) {
  return (
    <li className="rounded-card bg-sage p-3">
      <figure className="flex flex-col gap-6 lg:flex-row-reverse">
        <blockquote className="text-quote-sm font-semibold text-fg lg:min-w-0 lg:flex-1 lg:text-3xl">
          <p>{person.quote}</p>
        </blockquote>

        <figcaption className="flex items-center gap-3 lg:w-portrait lg:shrink-0 lg:flex-col lg:items-start">
          <CroppedImage
            image={person.portrait}
            crop={person.crop}
            sizes="(min-width: 1024px) 113px, 157px"
            className="size-portrait-sm rounded-thumb lg:size-portrait"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold text-brand lg:text-xl">
                {person.name}
              </p>
              <p className="text-sm text-fg-subtle lg:text-base">
                {person.role}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-fg-subtle">{followLabel}</p>
              <ul className="flex gap-2">
                {person.socials.map((social) => (
                  <li key={social.label}>
                    <Link
                      href={social.href}
                      aria-label={social.label}
                      className="block rounded-full transition-opacity duration-200 hover:opacity-80 motion-reduce:transition-none"
                    >
                      <Image
                        src={social.icon}
                        alt=""
                        width={52}
                        height={52}
                        className="size-13"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </figcaption>
      </figure>
    </li>
  );
}
