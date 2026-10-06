import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { placeholderHrefs, placeholderLabel } from "@/lib/placeholders";

/** Catch-all for nav links without a page yet. `/services/<slug>` is handled by `app/services/[slug]`. */
const catchAllHrefs = placeholderHrefs.filter(
  (href) => !/^\/services\/[^/]+$/.test(href),
);

type PageProps = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return catchAllHrefs.map((href) => ({ slug: href.slice(1).split("/") }));
}

export const dynamicParams = false;

function resolveTitle(slug: string[]) {
  return placeholderLabel(`/${slug.join("/")}`);
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
