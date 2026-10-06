import { z } from "zod";
import { bookMeetingContent } from "@/content/book-a-meeting";
import {
  addDays,
  addMinutes,
  type DateKey,
  weekdayIndex,
} from "@/lib/calendar";

const { errors, durationMinutes } = bookMeetingContent.scheduler;

/** Shared by the scheduler form and the `/api/book-meeting` route handler. */
export const bookingSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, errors.date),
  time: z.string().regex(/^\d{2}:\d{2}$/, errors.time),
  timeZone: z.string().min(1, errors.timeZone),
  name: z.string().trim().min(2, errors.name).max(100, errors.name),
  email: z.email(errors.email),
  company: z.string().trim().max(120, errors.company),
  notes: z.string().trim().max(1000, errors.notes),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

/*
 * Availability stub.
 * TODO(booking): replace with the host's real calendar availability (e.g. a GET endpoint
 * backed by the scheduling provider) once it exists. Until then: weekdays from tomorrow
 * through the next three weeks, 30-minute slots 09:00–17:00 in the visitor's time zone.
 */
const BOOKING_WINDOW_DAYS = 21;
const FIRST_SLOT_MINUTES = 9 * 60;
const LAST_SLOT_END_MINUTES = 17 * 60;

export function availableDates(today: DateKey): ReadonlySet<DateKey> {
  const dates = new Set<DateKey>();
  for (let offset = 1; offset <= BOOKING_WINDOW_DAYS; offset += 1) {
    const day = addDays(today, offset);
    if (weekdayIndex(day) < 5) dates.add(day);
  }
  return dates;
}

export function timeSlots(): readonly string[] {
  const slots: string[] = [];
  for (
    let start = FIRST_SLOT_MINUTES;
    start + durationMinutes <= LAST_SLOT_END_MINUTES;
    start += durationMinutes
  ) {
    slots.push(addMinutes("00:00", start));
  }
  return slots;
}

export function slotEnd(time: string): string {
  return addMinutes(time, durationMinutes);
}
