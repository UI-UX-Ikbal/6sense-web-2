import { iotServiceContent } from "@/content/services/iot";
import {
  ServicePageTemplate,
  servicePageMetadata,
} from "@/components/services/ServicePageTemplate";

export const metadata = servicePageMetadata(iotServiceContent);

/** Service - IoT Software Development — Figma 12110:419 (1440) / 12110:831 (390). */
export default function IotServicePage() {
  return <ServicePageTemplate content={iotServiceContent} />;
}
