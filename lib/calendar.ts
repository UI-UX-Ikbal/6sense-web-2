/**
 * Calendar date helpers built on "YYYY-MM-DD" day keys and "YYYY-MM" month keys,
 * so dates compare as strings and never shift with the viewer's time zone.
 */

export type DateKey = string;
export type MonthKey = string;

const pad = (value: number) => String(value).padStart(2, "0");

/** Local calendar date → day key. */
export function toDateKey(date: Date): DateKey {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Day key → local Date at noon (noon keeps DST shifts from changing the day). */
export function fromDateKey(key: DateKey): Date {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

export function addDays(key: DateKey, amount: number): DateKey {
  const date = fromDateKey(key);
  date.setDate(date.getDate() + amount);
  return toDateKey(date);
}

export function toMonthKey(key: DateKey): MonthKey {
  return key.slice(0, 7);
}

export function addMonths(month: MonthKey, amount: number): MonthKey {
  const [year, monthIndex] = month.split("-").map(Number);
  const date = new Date(year, monthIndex - 1 + amount, 1, 12);
  return toMonthKey(toDateKey(date));
}

/** Clamps a day into `month` (e.g. Jan 31 + 1 month → Feb 28). */
export function sameDayInMonth(key: DateKey, month: MonthKey): DateKey {
  const [year, monthIndex] = month.split("-").map(Number);
  const lastDay = new Date(year, monthIndex, 0).getDate();
  const day = Math.min(Number(key.slice(8)), lastDay);
  return `${month}-${pad(day)}`;
}

/** 0 = Monday … 6 = Sunday (the calendar starts weeks on Monday, as in Figma). */
export function weekdayIndex(key: DateKey): number {
  return (fromDateKey(key).getDay() + 6) % 7;
}

/** Weeks of the month, Monday first; `null` pads days outside the month. */
export function monthGrid(month: MonthKey): (DateKey | null)[][] {
  const first = `${month}-01`;
  const lastDay = Number(sameDayInMonth(`${month}-31`, month).slice(8));
  const cells: (DateKey | null)[] = Array.from(
    { length: weekdayIndex(first) },
    () => null,
  );
  for (let day = 1; day <= lastDay; day += 1)
    cells.push(`${month}-${pad(day)}`);
  while (cells.length % 7) cells.push(null);

  const weeks: (DateKey | null)[][] = [];
  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7));
  }
  return weeks;
}

const LOCALE = "en-US";

export function formatMonth(month: MonthKey): string {
  return new Intl.DateTimeFormat(LOCALE, {
    month: "long",
    year: "numeric",
  }).format(fromDateKey(`${month}-01`));
}

export function formatLongDate(key: DateKey): string {
  return new Intl.DateTimeFormat(LOCALE, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(fromDateKey(key));
}

/** Monday-first weekday names, short ("Mon") and long ("Monday"). */
export function weekdayNames(): { short: string; long: string }[] {
  // 2024-01-01 was a Monday.
  return Array.from({ length: 7 }, (_, index) => {
    const date = fromDateKey(`2024-01-${pad(index + 1)}`);
    return {
      short: new Intl.DateTimeFormat(LOCALE, { weekday: "short" }).format(date),
      long: new Intl.DateTimeFormat(LOCALE, { weekday: "long" }).format(date),
    };
  });
}

/** "09:30" + 30 → "10:00" (wraps past midnight). */
export function addMinutes(time: string, amount: number): string {
  const [hours, minutes] = time.split(":").map(Number);
  const total = (((hours * 60 + minutes + amount) % 1440) + 1440) % 1440;
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
}

/** "09:30" → "9:30am" (Calendly-style 12-hour label). */
export function formatTimeLabel(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours < 12 ? "am" : "pm";
  return `${hours % 12 || 12}:${pad(minutes)}${suffix}`;
}

/** "Asia/Dhaka" → "Asia/Dhaka (10:53am)", the current time in that zone. */
export function formatTimeZoneLabel(timeZone: string, now: Date): string {
  const parts = new Intl.DateTimeFormat(LOCALE, {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const hour = parts.find((part) => part.type === "hour")?.value ?? "0";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "00";
  return `${timeZone} (${formatTimeLabel(`${hour}:${minute}`)})`;
}
