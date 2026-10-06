import { aboutContent } from "@/content/about";
import { homeContent } from "@/content/home";
import { footerContent, routes } from "@/content/navigation";
import type { ImageAsset, LinkItem } from "@/content/types";

/**
 * "Book a meeting" copy, links and imagery.
 * Figma: desktop 12266:732, mobile 12266:1316.
 */

export type BadgeIcon = { src: string; width: number; height: number };

/** Host / duration chip above the scheduler (Figma "Frame 1000002579/81"). */
export type MeetingDetail = {
  title: string;
  caption: string;
  icon: BadgeIcon & { alt: string };
};

const CHECK_BADGE: BadgeIcon = {
  src: "/book-a-meeting/check-badge.svg",
  width: 32,
  height: 32,
};

const contactEmail = footerContent.contact.email;

const [nasif, ahsan] = aboutContent.people.items;

export const bookMeetingContent = {
  meta: {
    title: "Book a meeting",
    description:
      "Book a 30-minute technical review with 6sense HQ. Bring your stack and the problem you're stuck on, and leave with a clear next step.",
  },

  // Hero — 12266:767 (1440) / 12266:1968 (390)
  hero: {
    /** Figma breaks the line after "About" at both widths. */
    heading: ["Let’s Talk About", "What You’re Building"],
    description:
      "Book a 30-minute technical review. Bring your stack so that you have a straight read on what to build, what to fix, and what to leave alone. and the problem you're stuck on and we’ll help you figure out the next step.",
    pointsIntro: "What you'll get from the 30 minutes is",
    pointIcon: CHECK_BADGE,
    points: [
      "Clarity on the real constraint. Understand what is actually blocking the system, rather than spending more time fixing symptoms.",
      "A clearer technical path. Know which approach is worth pursuing, what can stay as-is, and where unnecessary rebuilds or cost can be avoided.",
      "A concrete next move. Leave with a defined direction for what to investigate, scope, fix, or build next.",
    ],
    details: [
      {
        title: "Nasif Sid (Host)",
        caption: "CEO, 6sense HQ",
        icon: {
          src: "/book-a-meeting/host-avatar.png",
          alt: "",
          width: 64,
          height: 63,
        },
      },
      {
        title: "30 Minutes",
        caption: "Duration",
        icon: {
          src: "/book-a-meeting/hourglass-badge.svg",
          alt: "",
          width: 32,
          height: 32,
        },
      },
    ] satisfies MeetingDetail[],
  },

  /**
   * Scheduler (Figma "image 53": a Calendly "Select a Day" screenshot, rebuilt as our own form).
   * TODO(content): only "Select a Day" and "Time zone" appear in Figma; the remaining labels,
   * errors and confirmation copy are placeholders pending approval.
   */
  scheduler: {
    endpoint: "/api/book-meeting",
    durationMinutes: 30,
    steps: {
      date: { heading: "Select a Day" },
      time: { heading: "Select a Time" },
      details: { heading: "Enter Details" },
    },
    calendar: {
      previousMonth: "Previous month",
      nextMonth: "Next month",
      available: "available",
      unavailable: "unavailable",
      today: "today",
      loading: "Loading available days…",
    },
    timeZoneLabel: "Time zone",
    back: "Back",
    next: "Next",
    fields: {
      name: { label: "Name", autoComplete: "name" },
      email: { label: "Email", autoComplete: "email" },
      company: { label: "Company", autoComplete: "organization" },
      notes: {
        label: "What are you building?",
        hint: "Share your stack and the problem you're stuck on.",
      },
      optional: "(optional)",
    },
    errors: {
      date: "Choose a day.",
      time: "Choose a time.",
      timeZone: "Choose a time zone.",
      name: "Enter your name.",
      email: "Enter a valid email address.",
      company: "Keep this under 120 characters.",
      notes: "Keep this under 1000 characters.",
    },
    submit: { idle: "Schedule meeting", pending: "Scheduling…" },
    failure: {
      heading: "We couldn't book that slot.",
      body: `Please try again, or email us at ${contactEmail}.`,
    },
    success: {
      heading: "You're booked",
      icon: CHECK_BADGE,
      body: "Thanks — we've received your request for",
      followUp: "A calendar invite will follow by email.",
      restart: "Book another time",
    },
  },

  // Where we plug in — 12266:844 (1440) / 12280:3075 (390)
  hosts: {
    heading: "Speak directly with the people who can help shape the next move",
    link: {
      label: "See all testimonials",
      href: "/reviews",
    } satisfies LinkItem,
    followLabel: aboutContent.people.followLabel,
    /** Same people, photos and crops as the About page; Figma shows the role only. */
    items: [nasif, ahsan].map(({ name, role, portrait, crop, socials }) => ({
      name,
      role,
      portrait: portrait satisfies ImageAsset,
      crop,
      socials,
    })),
  },

  // Words from our clients — 12280:2953 (1440) / 12280:3119 (390); same reviews as the homepage.
  testimonials: homeContent.testimonials,

  route: routes.bookAMeeting,
} as const;

export type BookMeetingContent = typeof bookMeetingContent;
export type SchedulerContent = BookMeetingContent["scheduler"];
