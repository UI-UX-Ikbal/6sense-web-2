import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import {
  ServicePageTemplate,
  servicePageMetadata,
} from "@/components/services/ServicePageTemplate";
import { getServiceContent, serviceSlugs } from "@/content/services";
import { placeholderLabel, servicePlaceholderSlugs } from "@/lib/placeholders";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [...serviceSlugs, ...servicePlaceholderSlugs].map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getServiceContent(slug);
  if (content) return servicePageMetadata(content);
  const title = placeholderLabel(`/services/${slug}`);
  return title ? { title, openGraph: { title } } : {};
}

/**
 * `/services/<slug>`: a service page built from `content/services/*` with `ServicePageTemplate`,
 * or a placeholder for nav links whose page does not exist yet.
 */
export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const content = getServiceContent(slug);
  if (content) return <ServicePageTemplate content={content} />;
  const title = placeholderLabel(`/services/${slug}`);
  if (!title) notFound();
  return <PagePlaceholder title={title} />;
}
