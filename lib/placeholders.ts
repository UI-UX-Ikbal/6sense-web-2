import { homePlaceholderRoutes } from "@/content/home";
import { footerContent, navItems, routes } from "@/content/navigation";
import { servicePaths } from "@/content/services";
import { allNavHrefs } from "@/lib/navigation";

/**
 * Placeholder routes so every Header/Footer link resolves (and active states can be checked)
 * until the real pages exist. Real service pages come from `content/services`.
 */
export const labelsByHref = new Map<string, string>();
for (const item of navItems) {
  if (item.href) labelsByHref.set(item.href, item.label);
  for (const group of item.menu?.groups ?? []) {
    for (const link of group.links) labelsByHref.set(link.href, link.label);
  }
  if (item.menu?.cta) labelsByHref.set(item.menu.cta.href, item.menu.cta.label);
  for (const work of item.menu?.provenWork?.items ?? []) {
    labelsByHref.set(work.link.href, work.client);
  }
}
for (const column of footerContent.columns) {
  for (const link of column.links) {
    if (!labelsByHref.has(link.href)) labelsByHref.set(link.href, link.label);
  }
}
for (const link of homePlaceholderRoutes) {
  if (!labelsByHref.has(link.href)) labelsByHref.set(link.href, link.label);
}

/** Routes with their own page file; no placeholder is generated for them. */
const REAL_PAGE_HREFS: ReadonlySet<string> = new Set([
  routes.home,
  routes.about,
  routes.bookAMeeting,
  routes.contact,
]);

const servicePathSet: ReadonlySet<string> = new Set(servicePaths);

/** Hrefs with no real page yet (service pages built from content are excluded). */
export const placeholderHrefs: readonly string[] = [
  ...new Set([...allNavHrefs(navItems), ...labelsByHref.keys()]),
].filter(
  (href) =>
    href.startsWith("/") &&
    !servicePathSet.has(href) &&
    !REAL_PAGE_HREFS.has(href),
);

/** Single-segment `/services/<slug>` placeholders, served by `app/services/[slug]`. */
export const servicePlaceholderSlugs: readonly string[] = placeholderHrefs
  .filter((href) => /^\/services\/[^/]+$/.test(href))
  .map((href) => href.slice("/services/".length));

export const placeholderLabel = (href: string) => labelsByHref.get(href);
