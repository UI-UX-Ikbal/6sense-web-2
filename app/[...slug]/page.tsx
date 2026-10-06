import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { homePlaceholderRoutes } from "@/content/home";
import { footerContent, navItems, routes } from "@/content/navigation";
import { allNavHrefs } from "@/lib/navigation";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

/**
 * Placeholder routes so every Header/Footer link resolves (and active states can be checked)
 * until the real pages exist. Specific routes added later take precedence over this catch-all.
 */
const labelsByHref = new Map<string, string>();
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

/** Routes with real pages; the catch-all must not generate them. */
const implementedHrefs: ReadonlySet<string> = new Set([
  routes.home,
  routes.about,
  routes.bookAMeeting,
  routes.contact,
  routes.servicesIot,
]);

const placeholderHrefs = [
  ...new Set([...allNavHrefs(navItems), ...labelsByHref.keys()]),
].filter((href) => href.startsWith("/") && !implementedHrefs.has(href));

type PageProps = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return placeholderHrefs.map((href) => ({ slug: href.slice(1).split("/") }));
}

export const dynamicParams = false;

function resolveTitle(slug: string[]) {
  return labelsByHref.get(`/${slug.join("/")}`);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const title = resolveTitle((await params).slug);
  return title ? { title, openGraph: { title } } : {};
}

export default async function PlaceholderPage({ params }: PageProps) {
  const title = resolveTitle((await params).slug);
  if (!title) notFound();
  return <PagePlaceholder title={title} />;
}
