"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";

/** Locks page scroll while `active` (keeps scrollbar gutter to avoid layout shift). */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const { documentElement: html } = document;
    const previous = {
      overflow: html.style.overflow,
      scrollbarGutter: html.style.scrollbarGutter,
    };
    html.style.scrollbarGutter = "stable";
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous.overflow;
      html.style.scrollbarGutter = previous.scrollbarGutter;
    };
  }, [active]);
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Keeps Tab / Shift+Tab focus inside `containerRef` while `active`. */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!active || !container) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusables = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = document.activeElement;

      if (
        event.shiftKey &&
        (current === first || !container.contains(current))
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (current === last || !container.contains(current))
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [containerRef, active]);
}

/** Calls `onMatch` when the media query starts matching (e.g. resizing to desktop). */
export function useMediaQueryChange(query: string, onMatch: () => void) {
  useEffect(() => {
    const mql = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => {
      if (event.matches) onMatch();
    };
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, [query, onMatch]);
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/** True when the user asks for reduced motion (false during SSR). */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

/** Steps an index 0…length-1 every `intervalMs`; holds at 0 under reduced motion. */
export function useAutoCycle(length: number, intervalMs: number) {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion || length < 2) return;
    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % length),
      intervalMs,
    );
    return () => window.clearInterval(id);
  }, [reducedMotion, length, intervalMs]);

  return reducedMotion ? 0 : index;
}

const noSubscription = () => () => {};

/**
 * Client-only value: `null` while server rendering and hydrating, then `read()`.
 * For values that differ per visitor (today's date, time zone) on statically rendered pages.
 */
export function useClientValue<T extends string>(read: () => T): T | null {
  return useSyncExternalStore(noSubscription, read, () => null);
}
