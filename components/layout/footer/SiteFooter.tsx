import Image from "next/image";
import Link from "next/link";
import { footerContent } from "@/content/navigation";

const linkHover =
  "rounded-sm underline-offset-4 transition-colors duration-200 hover:underline motion-reduce:transition-none";

function ContactBlock() {
  const { contact, socials, socialNavLabel } = footerContent;
  return (
    <div className="flex w-full flex-col gap-4 lg:w-footer-contact lg:shrink-0">
      <address className="flex flex-col gap-2 font-contact text-contact not-italic">
        <p className="flex items-start gap-2">
          <span className="flex shrink-0 items-center py-1">
            <Image
              src={contact.icons.address}
              alt=""
              width={14}
              height={14}
              className="size-3.5"
            />
          </span>
          <span>
            {contact.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <span className="flex shrink-0 items-center py-1">
            <Image
              src={contact.icons.email}
              alt=""
              width={14}
              height={14}
              className="size-3.5"
            />
          </span>
          <a href={`mailto:${contact.email}`} className={linkHover}>
            {contact.email}
          </a>
        </p>
      </address>

      <nav aria-label={socialNavLabel}>
        <ul className="flex items-center gap-3">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                aria-label={social.label}
                className="block rounded-sm transition-opacity duration-200 hover:opacity-80 motion-reduce:transition-none"
              >
                <Image
                  src={social.icon}
                  alt=""
                  width={24}
                  height={24}
                  className="size-6"
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function LinkColumns() {
  return (
    <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:contents">
      {footerContent.columns.map((column) => (
        <nav
          key={column.heading}
          aria-labelledby={`footer-${column.heading}`}
          className="flex min-w-0 flex-col gap-2 lg:flex-1"
        >
          <h2 id={`footer-${column.heading}`} className="text-sm font-normal">
            {column.heading}
          </h2>
          <ul className="flex flex-col gap-2 text-base">
            {column.links.map((link) => (
              <li key={link.href + link.label}>
                <Link href={link.href} className={linkHover}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>
  );
}

function Badges() {
  const { clutch, basis } = footerContent.badges;
  return (
    <div className="flex h-[49px] w-fit shrink-0 items-center gap-6 rounded-full bg-inverse px-4 py-2">
      <Image
        src={clutch.src}
        alt={clutch.alt}
        width={clutch.width}
        height={clutch.height}
        className="h-8 w-[131px] object-cover"
      />
      {/* Figma crops the BASIS logo inside a 90×33 frame. */}
      <div className="relative h-[33px] w-[90px] overflow-hidden">
        <Image
          src={basis.src}
          alt={basis.alt}
          width={750}
          height={451}
          className="absolute top-[-47.62%] left-[-9.9%] h-[195.24%] w-[119.81%] max-w-none"
        />
      </div>
    </div>
  );
}

/** Site footer — Figma 11995:44751 (1440) and 11995:45749 (390). */
export function SiteFooter() {
  const { copyright, wordmark } = footerContent;

  return (
    <footer className="relative overflow-hidden bg-brand pt-16 text-inverse md:bg-brand-deep md:pt-16 md:pb-8 lg:pt-28">
      <div className="container-site lg:py-24">
        <div className="flex flex-col gap-8 md:gap-4">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-6">
            <ContactBlock />
            <LinkColumns />
          </div>
          <div className="flex flex-col-reverse gap-8 md:flex-row md:items-center md:gap-1.5">
            <p className="min-w-0 flex-1 text-sm">{copyright}</p>
            <Badges />
          </div>
        </div>

        {/* Reserves room for the oversized wordmark (140px at 1440). */}
        <div
          aria-hidden="true"
          className="hidden md:mt-6 md:block md:h-[calc(var(--footer-wordmark-size)*0.636)]"
        />
      </div>

      {/* Oversized "6SenseHQ" wordmark — decorative; text at ≥768, outlined SVG at 390. */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[calc(var(--footer-wordmark-size)*-0.3955)] left-1/2 hidden h-[1.359em] w-max -translate-x-1/2 text-center text-[length:var(--footer-wordmark-size)] leading-[1.2] font-bold whitespace-nowrap text-inverse opacity-50 select-none md:block"
      >
        {wordmark.text}
      </p>
      <div aria-hidden="true" className="mt-[43px] md:hidden">
        <Image
          src={wordmark.mobile.src}
          alt=""
          width={wordmark.mobile.width}
          height={wordmark.mobile.height}
          className="block h-auto w-full"
        />
      </div>
    </footer>
  );
}
