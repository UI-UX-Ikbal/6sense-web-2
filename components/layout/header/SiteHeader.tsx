"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { headerContent, navItems } from "@/content/navigation";
import {
  useBodyScrollLock,
  useFocusTrap,
  useMediaQueryChange,
} from "@/lib/hooks";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

const DRAWER_ID = "mobile-navigation";
const DESKTOP_QUERY = "(width >= 1024px)"; // matches --breakpoint-nav

/** Sticky site header — 96px, content 1240 inside 1440 (Figma 12215:2980 / 11995:44829). */
export function SiteHeader() {
  const pathname = usePathname();
  // The drawer state is tied to the path it was opened on, so navigation closes it.
  const [drawerPath, setDrawerPath] = useState<string | null>(null);
  const drawerOpen = drawerPath === pathname;

  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeDrawer = useCallback(() => setDrawerPath(null), []);
  const toggleDrawer = () => setDrawerPath(drawerOpen ? null : pathname);

  useBodyScrollLock(drawerOpen);
  useFocusTrap(headerRef, drawerOpen);
  useMediaQueryChange(DESKTOP_QUERY, closeDrawer);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      closeDrawer();
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen, closeDrawer]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-cream">
      <div className="container-site flex h-header items-center justify-between">
        <Logo onNavigate={closeDrawer} />

        <DesktopNav items={navItems} />

        <div className="flex items-center gap-4">
          <ButtonLink
            href={headerContent.primaryCta.href}
            onClick={closeDrawer}
          >
            {headerContent.primaryCta.label}
          </ButtonLink>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={drawerOpen}
            aria-controls={DRAWER_ID}
            aria-label={
              drawerOpen
                ? headerContent.closeMenuLabel
                : headerContent.openMenuLabel
            }
            onClick={toggleDrawer}
            className="flex cursor-pointer items-center justify-center rounded-full border border-brand p-[10px] backdrop-blur-button transition-colors duration-200 hover:bg-mint motion-reduce:transition-none nav:hidden"
          >
            <Image
              src={
                drawerOpen
                  ? headerContent.icons.close
                  : headerContent.icons.menu
              }
              alt=""
              width={24}
              height={24}
              className="size-6"
            />
          </button>
        </div>
      </div>

      {drawerOpen && (
        <MobileNav id={DRAWER_ID} items={navItems} onNavigate={closeDrawer} />
      )}
    </header>
  );
}
