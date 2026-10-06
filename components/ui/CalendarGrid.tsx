"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import {
  addDays,
  addMonths,
  type DateKey,
  formatLongDate,
  formatMonth,
  type MonthKey,
  monthGrid,
  sameDayInMonth,
  toMonthKey,
  weekdayIndex,
  weekdayNames,
} from "@/lib/calendar";

export type CalendarLabels = {
  previousMonth: string;
  nextMonth: string;
  available: string;
  unavailable: string;
  today: string;
};

type CalendarGridProps = {
  today: DateKey;
  selected: DateKey | null;
  isAvailable: (day: DateKey) => boolean;
  onSelect: (day: DateKey) => void;
  /** Months the visitor can page between (inclusive). */
  minMonth: MonthKey;
  maxMonth: MonthKey;
  labels: CalendarLabels;
  /** id of the inline error, if any. */
  errorId?: string;
};

const WEEKDAYS = weekdayNames();
const CHEVRON = "/icons/chevron-down-24.svg";

const clampMonth = (month: MonthKey, min: MonthKey, max: MonthKey) =>
  month < min ? min : month > max ? max : month;

/**
 * Month date picker following the WAI-ARIA date-grid pattern: one tab stop, arrows move by
 * day / week, Home / End to week start / end, Page Up / Down by month, Enter / Space selects.
 * Unavailable days stay focusable (aria-disabled) so the grid reads as a calendar.
 */
export function CalendarGrid({
  today,
  selected,
  isAvailable,
  onSelect,
  minMonth,
  maxMonth,
  labels,
  errorId,
}: CalendarGridProps) {
  const headingId = useId();
  const initialFocus =
    selected ?? firstAvailableFrom(today, isAvailable) ?? today;
  const [focused, setFocused] = useState<DateKey>(initialFocus);
  const [month, setMonth] = useState<MonthKey>(
    clampMonth(toMonthKey(initialFocus), minMonth, maxMonth),
  );
  const moveFocusRef = useRef(false);
  const gridRef = useRef<HTMLTableElement>(null);

  const weeks = useMemo(() => monthGrid(month), [month]);
  // The roving tab stop must be a day shown in the current month.
  const tabStop = toMonthKey(focused) === month ? focused : `${month}-01`;

  useEffect(() => {
    if (!moveFocusRef.current) return;
    moveFocusRef.current = false;
    gridRef.current
      ?.querySelector<HTMLButtonElement>(`[data-day="${tabStop}"]`)
      ?.focus();
  }, [tabStop]);

  function focusDay(day: DateKey) {
    const target = toMonthKey(day);
    if (target < minMonth || target > maxMonth) return;
    moveFocusRef.current = true;
    setFocused(day);
    setMonth(target);
  }

  function changeMonth(amount: number) {
    const target = clampMonth(addMonths(month, amount), minMonth, maxMonth);
    setMonth(target);
    setFocused(sameDayInMonth(tabStop, target));
  }

  function onKeyDown(event: KeyboardEvent<HTMLTableElement>) {
    const moves: Record<string, () => DateKey> = {
      ArrowLeft: () => addDays(tabStop, -1),
      ArrowRight: () => addDays(tabStop, 1),
      ArrowUp: () => addDays(tabStop, -7),
      ArrowDown: () => addDays(tabStop, 7),
      Home: () => addDays(tabStop, -weekdayIndex(tabStop)),
      End: () => addDays(tabStop, 6 - weekdayIndex(tabStop)),
      PageUp: () => sameDayInMonth(tabStop, addMonths(month, -1)),
      PageDown: () => sameDayInMonth(tabStop, addMonths(month, 1)),
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    focusDay(move());
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-6">
        <MonthButton
          direction="previous"
          label={labels.previousMonth}
          disabled={month <= minMonth}
          onClick={() => changeMonth(-1)}
        />
        <h3
          id={headingId}
          aria-live="polite"
          className="min-w-40 text-center text-base font-semibold text-brand"
        >
          {formatMonth(month)}
        </h3>
        <MonthButton
          direction="next"
          label={labels.nextMonth}
          disabled={month >= maxMonth}
          onClick={() => changeMonth(1)}
        />
      </div>

      <table
        ref={gridRef}
        role="grid"
        aria-labelledby={headingId}
        aria-describedby={errorId}
        onKeyDown={onKeyDown}
        className="w-full table-fixed border-separate border-spacing-y-1"
      >
        <thead>
          <tr>
            {WEEKDAYS.map((weekday) => (
              <th
                key={weekday.long}
                scope="col"
                abbr={weekday.long}
                className="pb-2 text-xs font-semibold text-fg-subtle"
              >
                {weekday.short}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) =>
                day ? (
                  <DayCell
                    key={day}
                    day={day}
                    isToday={day === today}
                    isSelected={day === selected}
                    isAvailable={isAvailable(day)}
                    isTabStop={day === tabStop}
                    labels={labels}
                    onSelect={() => {
                      setFocused(day);
                      onSelect(day);
                    }}
                  />
                ) : (
                  <td key={`pad-${dayIndex}`} />
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function firstAvailableFrom(
  today: DateKey,
  isAvailable: (day: DateKey) => boolean,
): DateKey | null {
  for (let offset = 0; offset < 62; offset += 1) {
    const day = addDays(today, offset);
    if (isAvailable(day)) return day;
  }
  return null;
}

type DayCellProps = {
  day: DateKey;
  isToday: boolean;
  isSelected: boolean;
  isAvailable: boolean;
  isTabStop: boolean;
  labels: CalendarLabels;
  onSelect: () => void;
};

function DayCell({
  day,
  isToday,
  isSelected,
  isAvailable,
  isTabStop,
  labels,
  onSelect,
}: DayCellProps) {
  const state = isSelected
    ? "bg-brand font-semibold text-inverse"
    : isAvailable
      ? "bg-lime font-semibold text-brand hover:bg-brand hover:text-inverse"
      : "cursor-default text-fg-subtle";
  const description = [
    isToday ? labels.today : null,
    isAvailable ? labels.available : labels.unavailable,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <td aria-selected={isSelected} className="text-center">
      <button
        type="button"
        data-day={day}
        tabIndex={isTabStop ? 0 : -1}
        aria-disabled={!isAvailable || undefined}
        aria-label={`${formatLongDate(day)}, ${description}`}
        aria-current={isToday ? "date" : undefined}
        onClick={isAvailable ? onSelect : undefined}
        className={`relative mx-auto flex size-day items-center justify-center rounded-full text-base transition-colors duration-200 motion-reduce:transition-none ${state}`}
      >
        {Number(day.slice(8))}
        {isToday ? (
          <span
            aria-hidden
            className={`absolute bottom-1.5 size-1 rounded-full ${isSelected ? "bg-inverse" : "bg-brand"}`}
          />
        ) : null}
      </button>
    </td>
  );
}

type MonthButtonProps = {
  direction: "previous" | "next";
  label: string;
  disabled: boolean;
  onClick: () => void;
};

function MonthButton({
  direction,
  label,
  disabled,
  onClick,
}: MonthButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex size-9 items-center justify-center rounded-full transition-colors duration-200 enabled:hover:bg-lime disabled:opacity-30 motion-reduce:transition-none"
    >
      <Image
        src={CHEVRON}
        alt=""
        width={24}
        height={24}
        className={direction === "previous" ? "rotate-90" : "-rotate-90"}
      />
    </button>
  );
}
