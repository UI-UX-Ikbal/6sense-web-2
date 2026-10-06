import { aboutContent } from "@/content/about";
import { PersonQuoteCard } from "@/components/ui/PersonQuoteCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const HEADING_ID = "about-people-heading";

/** "The people behind 6sense HQ" (Figma 12293:4078 at 1440, 12263:2387 at 390). */
export function PeopleSection() {
  const { people } = aboutContent;

  return (
    <section aria-labelledby={HEADING_ID} className="bg-surface section-y">
      <div className="container-site flex flex-col gap-9">
        <Reveal>
          <SectionHeading
            id={HEADING_ID}
            title={people.heading}
            subheading={people.subheading}
            tone="brand"
            size="large"
            titleClassName="lg:w-about-heading"
          />
        </Reveal>

        <Reveal delay={120}>
          <ul className="grid gap-9 lg:grid-cols-2">
            {people.items.map((person) => (
              <PersonQuoteCard
                key={person.name}
                person={person}
                followLabel={people.followLabel}
              />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
