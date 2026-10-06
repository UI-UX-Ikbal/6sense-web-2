import { aiAutomationServiceContent } from "./ai-automation";
import { energySoftwareContent } from "./energy-software";
import { evMobilityServiceContent } from "./ev-mobility";
import { iotServiceContent } from "./iot";
import type { ServicePageContent } from "./types";

/** Every service page built on `ServicePageTemplate`; the slug is the last segment of `path`. */
const serviceContents: readonly ServicePageContent[] = [
  energySoftwareContent,
  iotServiceContent,
  evMobilityServiceContent,
  aiAutomationServiceContent,
];

const SERVICES_PREFIX = "/services/";

export const serviceSlug = (content: ServicePageContent) =>
  content.path.slice(SERVICES_PREFIX.length);

export const servicePaths: readonly string[] = serviceContents.map(
  (content) => content.path,
);

export function getServiceContent(slug: string) {
  return serviceContents.find((content) => serviceSlug(content) === slug);
}

export const serviceSlugs: readonly string[] = serviceContents.map(serviceSlug);
