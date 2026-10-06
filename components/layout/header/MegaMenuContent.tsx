import Image from "next/image";
import Link from "next/link";
import type {
  HelpStep,
  MegaMenu,
  MenuLinkGroup,
  ProvenWorkItem,
} from "@/content/navigation";
import { headerContent } from "@/content/navigation";
import { ButtonLink } from "@/components/ui/Button";

export type MenuLayout = "desktop" | "mobile";

type LayoutProps = {
  layout: MenuLayout;
  onNavigate?: () => void;
};

const linkHover =
  "rounded-sm transition-colors duration-200 hover:text-brand hover:underline underline-offset-4 motion-reduce:transition-none";

function LinkGroup({
  group,
  layout,
  onNavigate,
}: LayoutProps & { group: MenuLinkGroup }) {
  const desktop = layout === "desktop";
  return (
    <div
      className={
        desktop
          ? "flex w-menu-column flex-col gap-4"
          : "flex w-full flex-col gap-2"
      }
    >
      {group.heading && (
        <p className="text-sm font-semibold text-muted">{group.heading}</p>
      )}
      <ul
        className={
          desktop
            ? "flex flex-col gap-3 text-xl font-semibold text-fg"
            : "flex flex-col gap-2 text-lg font-semibold text-fg"
        }
      >
        {group.links.map((link) => (
          <li key={link.href + link.label}>
            <Link href={link.href} onClick={onNavigate} className={linkHover}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Steps({
  heading,
  steps,
  layout,
}: {
  heading: string;
  steps: HelpStep[];
  layout: MenuLayout;
}) {
  const desktop = layout === "desktop";
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="text-sm font-semibold text-muted">{heading}</p>
      <ol
        className={desktop ? "flex w-full gap-8" : "flex w-full flex-col gap-3"}
      >
        {steps.map((step, index) => (
          <li
            key={step.title}
            className={`flex gap-2 ${desktop ? "min-w-0 flex-1" : "w-full"}`}
          >
            <span
              aria-hidden="true"
              className="relative flex size-8 shrink-0 items-center justify-center text-xl font-semibold text-brand"
            >
              <Image
                src={headerContent.icons.stepCircle}
                alt=""
                width={32}
                height={32}
                className="absolute inset-0 size-8"
              />
              <span className="relative">{index + 1}</span>
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p className={desktop ? "text-lg text-fg" : "text-base text-fg"}>
                {step.title}
              </p>
              <p className="text-sm text-muted">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ProvenWorkCard({
  item,
  layout,
  onNavigate,
}: LayoutProps & { item: ProvenWorkItem }) {
  const desktop = layout === "desktop";
  return (
    <li
      className={`flex flex-col gap-2.5 rounded-card bg-mint p-4 ${
        desktop ? "w-proven-card" : "w-full"
      }`}
    >
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-muted">{item.client}</p>
        <p className={desktop ? "text-lg text-fg" : "text-base text-fg"}>
          {item.summary}
        </p>
      </div>
      <Link
        href={item.link.href}
        onClick={onNavigate}
        className="flex h-11 w-fit items-center rounded-sm text-base text-brand underline decoration-from-font underline-offset-[3px] hover:decoration-2"
      >
        {item.link.label}
        <span className="sr-only">: {item.client}</span>
      </Link>
    </li>
  );
}

/** Body of a mega menu — shared by the desktop popover and the mobile accordion. */
export function MegaMenuContent({
  menu,
  layout,
  onNavigate,
}: LayoutProps & { menu: MegaMenu }) {
  const desktop = layout === "desktop";
  const hasDetails = Boolean(menu.howWeHelp || menu.provenWork);

  return (
    <div
      className={
        desktop ? "flex w-full flex-col gap-8" : "flex w-full flex-col gap-6"
      }
    >
      <div
        className={desktop ? "flex w-full gap-8" : "flex w-full flex-col gap-6"}
      >
        {menu.groups.map((group, index) => (
          <LinkGroup
            key={group.heading ?? index}
            group={group}
            layout={layout}
            onNavigate={onNavigate}
          />
        ))}
      </div>

      {menu.cta && (
        <ButtonLink
          href={menu.cta.href}
          variant="outline"
          onClick={onNavigate}
          className={desktop ? "w-fit" : "w-full"}
        >
          {menu.cta.label}
        </ButtonLink>
      )}

      {desktop && hasDetails && (
        <hr className="w-full border-0 border-t border-subtle" />
      )}

      {menu.howWeHelp && (
        <Steps
          heading={menu.howWeHelp.heading}
          steps={menu.howWeHelp.steps}
          layout={layout}
        />
      )}

      {menu.provenWork && (
        <div className={`flex w-full flex-col ${desktop ? "gap-3" : "gap-2"}`}>
          <p className="text-sm font-semibold text-muted">
            {menu.provenWork.heading}
          </p>
          <ul
            className={
              desktop
                ? "flex w-full items-center gap-3"
                : "flex w-full flex-col gap-3"
            }
          >
            {menu.provenWork.items.map((item) => (
              <ProvenWorkCard
                key={item.client}
                item={item}
                layout={layout}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
