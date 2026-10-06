import { contactContent } from "@/content/contact";
import { IconPoint } from "@/components/ui/IconPoint";
import { ContactForm } from "./ContactForm";

const HEADING_ID = "contact-hero-heading";
const FORM_HEADING_ID = "contact-form-heading";

/**
 * Hero with the contact form (Figma 12404:3752 at 1440, 12404:3987 at 390).
 * <1024: points stacked above the form card, 48px apart. ≥1024: two equal columns.
 */
export function ContactHero() {
  const { hero, form } = contactContent;

  return (
    <section aria-labelledby={HEADING_ID} className="bg-surface py-12 lg:py-20">
      <div className="container-site flex flex-col gap-12 lg:flex-row lg:items-start">
        <div className="flex flex-col gap-6 pr-13 lg:min-w-0 lg:flex-1">
          <h1
            id={HEADING_ID}
            className="text-3xl font-semibold text-brand lg:text-4xl"
          >
            {hero.heading}
          </h1>
          <ul className="flex flex-col gap-6 text-fg">
            {hero.points.map((point) => (
              <IconPoint key={point.title} icon={hero.pointIcon}>
                <span className="flex flex-col gap-2">
                  <span className="text-base font-semibold lg:text-lg">
                    {point.title}
                  </span>
                  <span className="text-sm lg:text-base">
                    {point.description}
                  </span>
                </span>
              </IconPoint>
            ))}
          </ul>
        </div>

        <div
          role="region"
          aria-labelledby={FORM_HEADING_ID}
          className="flex flex-col gap-6 rounded-panel bg-cream p-4 lg:min-w-0 lg:flex-1 lg:p-6"
        >
          <div className="flex flex-col gap-2">
            <h2
              id={FORM_HEADING_ID}
              className="text-xl font-semibold text-brand lg:text-2xl"
            >
              {form.heading}
            </h2>
            <p className="text-base text-fg-subtle lg:text-lg">
              {form.description}
            </p>
          </div>
          <ContactForm content={form} />
        </div>
      </div>
    </section>
  );
}
