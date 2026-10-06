import Image from "next/image";
import Link from "next/link";
import type { Person } from "@/content/about";
import { CroppedImage } from "@/components/ui/CroppedImage";

type PersonContactCardProps = {
  person: Pick<Person, "name" | "role" | "portrait" | "crop" | "socials">;
  followLabel: string;
};

/**
 * Portrait, name, role and social links (Figma 12280:3028 at 1440, 12280:3081 at 390).
 * Photo 169px / radius 20 below 1024, 195px / radius 16 from 1024.
 */
export function PersonContactCard({
  person,
  followLabel,
}: PersonContactCardProps) {
  return (
    <li className="flex items-start gap-6 rounded-panel bg-sage p-3">
      <CroppedImage
        image={person.portrait}
        crop={person.crop}
        sizes="(min-width: 1024px) 195px, 169px"
        className="size-host-portrait-sm rounded-media lg:size-host-portrait lg:rounded-card"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-brand lg:text-2xl">
            {person.name}
          </h3>
          <p className="text-sm text-fg-subtle lg:text-base">{person.role}</p>
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
    </li>
  );
}
