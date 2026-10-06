import { bookMeetingContent } from "@/content/book-a-meeting";
import { footerContent, routes } from "@/content/navigation";
import type {
  HostsContent,
  SelectOption,
  TestimonialsContent,
} from "@/content/types";

/**
 * "Contact us" copy, links and imagery.
 * Figma: desktop 12404:3717, mobile 12404:3964.
 */

export type ContactPoint = { title: string; description: string };

export const contactContent = {
  meta: {
    title: "Contact us",
    description:
      "Talk to an automation engineer at 6sense HQ. Tell us about your operational goals and an engineer will get back to you within 24 hours.",
  },

  // Hero — 12404:3752 (1440) / 12404:3987 (390)
  hero: {
    heading: "Talk to an Automation Engineer",
    pointIcon: {
      src: "/book-a-meeting/check-badge.svg",
      width: 32,
      height: 32,
    },
    points: [
      {
        title: "Get a custom architecture review with an automation engineer.",
        description:
          "Review your current workflows, bottlenecks, and manual handoffs directly with the team that builds the software.",
      },
      {
        title: "Map out your workflows and automation opportunities.",
        description:
          "Identify high-volume, repetitive processes ready for production-grade AI and deterministic business rules.",
      },
      {
        title: "Scope your integration roadmap with a clear proof of concept.",
        description:
          "Evaluate scope, risk controls, and system integrations before moving into production execution.",
      },
    ] satisfies ContactPoint[],
  },

  // Form card — 12404:3781 (1440) / 12412:4335 (390)
  form: {
    endpoint: "/api/contact",
    heading: "Get started",
    description:
      "We’d love to hear from you! Tell us about your operational goals and an engineer will get back to you within 24 hours.",
    caretIcon: "/icons/caret-down.svg",
    fields: {
      fullName: {
        label: "Full Name",
        placeholder: "e.g., John Smith",
        autoComplete: "name",
      },
      email: {
        label: "Email Address",
        placeholder: "e.g., john@company.com",
        autoComplete: "email",
      },
      company: {
        label: "Company Name",
        placeholder: "e.g., Enterprise Solutions Inc.",
        autoComplete: "organization",
      },
      phone: {
        label: "Phone Number (Optional)",
        placeholder: "e.g., +1 (555) 000-0000",
        autoComplete: "tel",
      },
      message: {
        label: "How are you looking to automate your workflows?",
        placeholder:
          "e.g., We need to automate document extraction, ERP reconciliation, or manual data handoffs between systems...",
      },
      source: {
        label: "How did you hear about 6sense HQ?",
        placeholder: "Select",
        /** TODO(content): Figma shows only the "Select" placeholder — options pending approval. */
        options: [
          { value: "search", label: "Search engine" },
          { value: "linkedin", label: "LinkedIn" },
          { value: "clutch", label: "Clutch" },
          { value: "referral", label: "Referral" },
          { value: "event", label: "Event or conference" },
          { value: "other", label: "Other" },
        ] satisfies SelectOption[],
      },
      /** Honeypot: hidden from people and assistive tech; bots that fill it are dropped. */
      website: { label: "Website" },
    },
    /** TODO(content): validation, pending, success and failure copy is not in Figma. */
    errors: {
      fullName: "Enter your full name.",
      email: "Enter a valid email address.",
      company: "Enter your company name.",
      phone: "Enter a valid phone number.",
      message: "Tell us a little about what you want to automate.",
      source: "Choose an option.",
    },
    submit: { idle: "Submit Request", pending: "Submitting…" },
    failure: {
      body: "We couldn’t send your request. Please try again, or email us at",
      email: footerContent.contact.email,
    },
    success: {
      heading: "Thanks — your request is in.",
      body: "An engineer will get back to you within 24 hours.",
      restart: "Send another request",
    },
    consent: {
      before: "Clicking Submit means you agree to 6sense HQ’s",
      terms: { label: "Terms", href: routes.terms },
      and: "and",
      privacy: { label: "Privacy Policy", href: routes.privacyPolicy },
    },
  },

  // Where we plug in — 12404:3796 (1440) / 12404:4031 (390): same people and link as Book a meeting.
  hosts: bookMeetingContent.hosts satisfies HostsContent,

  // Words from our clients — 12404:3840 (1440) / 12404:4075 (390); same reviews as the homepage.
  testimonials: bookMeetingContent.testimonials satisfies TestimonialsContent,

  route: routes.contact,
} as const;

export type ContactContent = typeof contactContent;
export type ContactFormContent = ContactContent["form"];
