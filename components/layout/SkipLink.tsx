import { headerContent } from "@/content/navigation";

export const MAIN_CONTENT_ID = "main-content";

/** First focusable element on every page; visible only on keyboard focus. */
export function SkipLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="sr-only rounded-full bg-brand px-5 py-[11px] text-button text-inverse focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60]"
    >
      {headerContent.skipLinkLabel}
    </a>
  );
}
