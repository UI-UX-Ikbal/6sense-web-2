"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { flushSync } from "react-dom";
import { headerContent, type NavItem } from "@/content/navigation";
import { isNavItemActive } from "@/lib/navigation";
import { MegaMenuContent } from "./MegaMenuContent";

const HOVER_CLOSE_DELAY_MS = 120;

type OpenState = { id: string; pathname: string } | null;

type DesktopNavProps = {
  items: NavItem[];
};

const itemBase =
  "relative flex h-full items-center gap-1.5 px-3 py-1 text-base whitespace-nowrap text-ink transition-colors duration-200 motion-reduce:transition-none";
/** 2px accent bar flush with the header's bottom edge (open + active state). */
const indicator =
  "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-accent after:transition-opacity after:duration-200 motion-reduce:after:transition-none";

export function DesktopNav({ items }: DesktopNavProps) {
  const pathname = usePathname();
  const [openState, setOpenState] = useState<OpenState>(null);
  // Closing on route change: an open state only applies to the path it was opened on.
  const openId = openState?.pathname === pathname ? openState.id : null;

  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const openedByClick = useRef(false);

  const clearCloseTimer = () => window.clearTimeout(closeTimer.current);

  const open = useCallback(
    (id: string) => setOpenState({ id, pathname }),
    [pathname],
  );
  const close = useCallback(() => {
    openedByClick.current = false;
    setOpenState(null);
  }, []);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  // Click / tap outside closes the menu.
  useEffect(() => {
    if (!openId) return;
    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openId, close]);

  const topLevelFocusables = () =>
    Array.from(
      navRef.current?.querySelectorAll<HTMLElement>("[data-nav-top]") ?? [],
    );

  const panelLinks = (id: string) =>
    Array.from(
      navRef.current?.querySelectorAll<HTMLElement>(
        `#${panelId(id)} a[href]`,
      ) ?? [],
    );

  const focusTrigger = (id: string) =>
    navRef.current
      ?.querySelector<HTMLElement>(`[data-nav-top="${id}"]`)
      ?.focus();

  const onPointerEnter = (event: PointerEvent, id: string) => {
    if (event.pointerType !== "mouse") return;
    clearCloseTimer();
    if (openId !== id) {
      openedByClick.current = false;
      open(id);
    }
  };

  const onPointerLeave = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || openedByClick.current) return;
    clearCloseTimer();
    closeTimer.current = window.setTimeout(close, HOVER_CLOSE_DELAY_MS);
  };

  const onTriggerClick = (id: string) => {
    clearCloseTimer();
    if (openId === id && openedByClick.current) {
      close();
      return;
    }
    openedByClick.current = true;
    open(id);
  };

  const onTopLevelKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    item: NavItem,
  ) => {
    const focusables = topLevelFocusables();
    const index = focusables.indexOf(event.currentTarget);
    const move = (to: number) => {
      event.preventDefault();
      focusables[(to + focusables.length) % focusables.length]?.focus();
    };

    switch (event.key) {
      case "ArrowRight":
        return move(index + 1);
      case "ArrowLeft":
        return move(index - 1);
      case "Home":
        return move(0);
      case "End":
        return move(focusables.length - 1);
      case "ArrowDown":
        if (!item.menu) return;
        event.preventDefault();
        openedByClick.current = true;
        // Commit synchronously so the panel is visible (focusable) before moving focus.
        flushSync(() => open(item.id));
        panelLinks(item.id)[0]?.focus();
        return;
      case "Escape":
        if (openId) {
          event.preventDefault();
          close();
        }
        return;
    }
  };

  const onPanelKeyDown = (event: KeyboardEvent<HTMLElement>, id: string) => {
    const links = panelLinks(id);
    const index = links.indexOf(document.activeElement as HTMLElement);
    switch (event.key) {
      case "Escape":
        event.preventDefault();
        close();
        focusTrigger(id);
        return;
      case "ArrowDown":
        event.preventDefault();
        links[(index + 1) % links.length]?.focus();
        return;
      case "ArrowUp":
        event.preventDefault();
        if (index <= 0) focusTrigger(id);
        else links[index - 1]?.focus();
        return;
    }
  };

  // Focus leaving the nav entirely (e.g. Tab past the last link) closes the menu.
  const onBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      close();
    }
  };

  return (
    <nav
      ref={navRef}
      aria-label={headerContent.primaryNavLabel}
      onBlur={onBlur}
      className="hidden h-full min-w-0 flex-1 nav:flex"
    >
      <ul className="flex h-full items-stretch px-4">
        {items.map((item) => {
          const active = isNavItemActive(pathname, item);
          const isOpen = openId === item.id;

          if (!item.menu) {
            return (
              <li key={item.id} className="flex h-full">
                <Link
                  href={item.href}
                  data-nav-top={item.id}
                  aria-current={active ? "page" : undefined}
                  onKeyDown={(event) => onTopLevelKeyDown(event, item)}
                  onPointerEnter={() => openId && close()}
                  className={`${itemBase} ${indicator} justify-center hover:after:opacity-100 ${
                    active ? "after:opacity-100" : "after:opacity-0"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          return (
            <li
              key={item.id}
              className="flex h-full"
              onPointerEnter={(event) => onPointerEnter(event, item.id)}
              onPointerLeave={onPointerLeave}
            >
              <button
                type="button"
                data-nav-top={item.id}
                aria-expanded={isOpen}
                aria-controls={panelId(item.id)}
                onClick={() => onTriggerClick(item.id)}
                onKeyDown={(event) => onTopLevelKeyDown(event, item)}
                className={`${itemBase} ${indicator} cursor-pointer ${
                  isOpen || active ? "after:opacity-100" : "after:opacity-0"
                }`}
              >
                {item.label}
                <Image
                  src={
                    isOpen
                      ? headerContent.icons.chevronActive
                      : headerContent.icons.chevron
                  }
                  alt=""
                  width={16}
                  height={16}
                  className="size-4"
                />
              </button>

              <div
                id={panelId(item.id)}
                onKeyDown={(event) => onPanelKeyDown(event, item.id)}
                className={`absolute inset-x-0 top-full bg-inverse duration-200 motion-reduce:transition-none ${
                  // Visibility flips instantly on open (so focus can move in) and is
                  // only animated on close, letting the fade-out finish first.
                  isOpen
                    ? "visible opacity-100 transition-opacity"
                    : "invisible opacity-0 transition-[opacity,visibility]"
                }`}
              >
                <div
                  className={`container-site flex flex-col py-12 ${
                    item.menu.howWeHelp
                      ? ""
                      : "min-h-menu-compact justify-center"
                  }`}
                >
                  <MegaMenuContent
                    menu={item.menu}
                    layout="desktop"
                    onNavigate={close}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function panelId(id: string) {
  return `mega-menu-${id}`;
}
