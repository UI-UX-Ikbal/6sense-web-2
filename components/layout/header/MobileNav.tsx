"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { headerContent, type NavItem } from "@/content/navigation";
import { isNavItemActive } from "@/lib/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { MegaMenuContent } from "./MegaMenuContent";

type MobileNavProps = {
  id: string;
  items: NavItem[];
  onNavigate: () => void;
};

const rowLabel = "min-w-0 flex-1 text-left text-base text-ink";

/** Drawer under the header (390 frames 12215:1676 / 2793 / 3254 / 4112). */
export function MobileNav({ id, items, onNavigate }: MobileNavProps) {
  const pathname = usePathname();
  // Only one section is expanded at a time, as in every Figma state.
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div
      id={id}
      className="fixed inset-x-0 top-header bottom-0 z-40 flex flex-col gap-3 bg-inverse px-4 pt-4 pb-8 shadow-drawer motion-safe:animate-drawer-in nav:hidden"
    >
      <nav
        aria-label={headerContent.mobileNavLabel}
        className="-mx-4 min-h-0 flex-1 overflow-y-auto overscroll-contain px-4"
      >
        <ul className="mx-auto flex w-full max-w-content flex-col gap-3">
          {items.map((item) => {
            const active = isNavItemActive(pathname, item);

            if (!item.menu) {
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={`flex h-[46px] items-center rounded-sm ${rowLabel} ${
                      active ? "font-semibold text-brand" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }

            const expanded = expandedId === item.id;
            const sectionId = `${id}-${item.id}`;

            return (
              <li
                key={item.id}
                className={
                  expanded
                    ? "flex flex-col gap-2 border-b-2 border-accent pb-3"
                    : undefined
                }
              >
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={sectionId}
                  onClick={() => setExpandedId(expanded ? null : item.id)}
                  className="flex w-full cursor-pointer items-center gap-1.5 rounded-full"
                >
                  <span
                    className={`${rowLabel} ${active ? "font-semibold text-brand" : ""}`}
                  >
                    {item.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`flex shrink-0 items-center justify-center rounded-full border p-[10px] backdrop-blur-button ${
                      expanded ? "border-brand-muted" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={headerContent.icons.chevronMobile}
                      alt=""
                      width={24}
                      height={24}
                      className={`size-6 transition-transform duration-200 motion-reduce:transition-none ${
                        expanded ? "-scale-y-100" : ""
                      }`}
                    />
                  </span>
                </button>
                <div id={sectionId} hidden={!expanded} className="px-3">
                  <MegaMenuContent
                    menu={item.menu}
                    layout="mobile"
                    onNavigate={onNavigate}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </nav>

      <ButtonLink
        href={headerContent.primaryCta.href}
        onClick={onNavigate}
        className="mx-auto w-full max-w-content shrink-0"
      >
        {headerContent.primaryCta.label}
      </ButtonLink>
    </div>
  );
}
