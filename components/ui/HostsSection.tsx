import type { HostsContent } from "@/content/types";
import { ButtonLink } from "@/components/ui/Button";
import { PersonContactCard } from "@/components/ui/PersonContactCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const HEADING_ID = "hosts-heading";

type HostsSectionProps = {
  content: HostsContent;
};

/**
 * "Speak directly with the people…" (Book a meeting 12266:844 / 12280:3075; Contact 12404:3796 / 12404:4031).
 * The link sits beside the heading from 1024 and full width under the cards below that.
 */
export function HostsSection({ content: hosts }: HostsSectionProps) {
  const link = (className: string) => (
    <ButtonLink
      href={hosts.link.href}
      variant="outline-dark"
      className={className}
    >
      {hosts.link.label}
    </ButtonLink>
  );

  return (
    <section aria-labelledby={HEADING_ID} className="bg-surface section-y">
      <div className="container-site flex flex-col gap-9">
        <Reveal className="flex items-end justify-between gap-12">
          <SectionHeading
            id={HEADING_ID}
            title={hosts.heading}
            tone="brand"
            titleClassName="lg:w-hosts-heading"
          />
          {link("max-lg:hidden")}
        </Reveal>

        <Reveal delay={120}>
          <ul className="grid gap-6 lg:grid-cols-2 lg:gap-9">
            {hosts.items.map((person) => (
              <PersonContactCard
                key={person.name}
                person={person}
                followLabel={hosts.followLabel}
              />
            ))}
          </ul>
        </Reveal>

        {link("w-full lg:hidden")}
      </div>
    </section>
  );
}
