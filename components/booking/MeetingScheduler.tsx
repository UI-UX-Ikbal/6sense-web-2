"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import type { SchedulerContent } from "@/content/book-a-meeting";
import { CalendarGrid } from "@/components/ui/CalendarGrid";
import { TextField } from "@/components/ui/TextField";
import { TimeSlotPicker } from "@/components/ui/TimeSlotPicker";
import {
  availableDates,
  type BookingFormValues,
  bookingSchema,
  slotEnd,
  timeSlots,
} from "@/lib/booking";
import {
  type DateKey,
  formatLongDate,
  formatTimeLabel,
  toDateKey,
  toMonthKey,
} from "@/lib/calendar";
import { useClientValue } from "@/lib/hooks";
import { buttonClasses } from "@/components/ui/Button";
import { TimeZoneSelect } from "./TimeZoneSelect";

type Step = "date" | "time" | "details" | "success";

const ERROR_IDS = { date: "booking-date-error", time: "booking-time-error" };

const readToday = () => toDateKey(new Date());
const readTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

const defaultValues: BookingFormValues = {
  date: "",
  time: "",
  timeZone: "",
  name: "",
  email: "",
  company: "",
  notes: "",
};

type MeetingSchedulerProps = {
  content: SchedulerContent;
};

/**
 * Booking flow inside the hero card (Figma "image 53"): pick a day → pick a time → details.
 * react-hook-form + zod; posts to the `/api/book-meeting` stub.
 */
export function MeetingScheduler({ content }: MeetingSchedulerProps) {
  const today = useClientValue(readToday);
  const browserTimeZone = useClientValue(readTimeZone);
  const [step, setStep] = useState<Step>("date");
  const [submitFailed, setSubmitFailed] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  /** False until the visitor changes step, so the first render doesn't steal focus. */
  const [hasNavigated, setHasNavigated] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues,
    mode: "onTouched",
  });

  const [date, time, timeZone] = useWatch({
    control,
    name: ["date", "time", "timeZone"],
  });

  useEffect(() => {
    if (browserTimeZone && !getValues("timeZone")) {
      setValue("timeZone", browserTimeZone);
    }
  }, [browserTimeZone, getValues, setValue]);

  // Move focus to the new step's heading so keyboard and screen-reader users follow along.
  useEffect(() => {
    if (hasNavigated) headingRef.current?.focus();
  }, [step, hasNavigated]);

  function goTo(next: Step) {
    setHasNavigated(true);
    setSubmitFailed(false);
    setStep(next);
  }

  async function continueToDetails() {
    if (await trigger("time")) goTo("details");
  }

  const onSubmit = handleSubmit(
    async (values) => {
      setSubmitFailed(false);
      try {
        const response = await fetch(content.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error(`Booking failed: ${response.status}`);
        goTo("success");
      } catch {
        setSubmitFailed(true);
      }
    },
    (fieldErrors) => {
      if (fieldErrors.date) goTo("date");
      else if (fieldErrors.time) goTo("time");
    },
  );

  const available = today ? availableDates(today) : null;
  const lastAvailable = available ? [...available].at(-1) : undefined;
  const slotSummary =
    date && time
      ? `${formatLongDate(date)}, ${formatTimeLabel(time)} – ${formatTimeLabel(slotEnd(time))}${timeZone ? ` (${timeZone})` : ""}`
      : "";

  const heading =
    step === "success" ? content.success.heading : content.steps[step].heading;

  return (
    <div className="flex min-h-scheduler-sm flex-col bg-inverse px-4 py-8 shadow-scheduler sm:px-8 lg:min-h-scheduler lg:py-10">
      <form
        noValidate
        onSubmit={onSubmit}
        aria-labelledby="booking-step-heading"
        className="mx-auto flex w-full max-w-scheduler-body flex-col gap-6"
      >
        <div className="relative flex items-center justify-center">
          {step === "time" || step === "details" ? (
            <BackButton
              label={content.back}
              onClick={() => goTo(step === "time" ? "date" : "time")}
            />
          ) : null}
          <h2
            id="booking-step-heading"
            ref={headingRef}
            tabIndex={-1}
            className="px-12 text-center text-xl font-semibold text-brand outline-none"
          >
            {heading}
          </h2>
        </div>

        {step === "date" ? (
          <div className="flex flex-col gap-6">
            {today && available ? (
              <CalendarGrid
                today={today}
                selected={date || null}
                isAvailable={(day: DateKey) => available.has(day)}
                onSelect={(day) => {
                  setValue("date", day, { shouldValidate: true });
                  setValue("time", "");
                  goTo("time");
                }}
                minMonth={toMonthKey(today)}
                maxMonth={toMonthKey(lastAvailable ?? today)}
                labels={content.calendar}
                errorId={errors.date ? ERROR_IDS.date : undefined}
              />
            ) : (
              <p
                role="status"
                className="py-24 text-center text-sm text-fg-subtle"
              >
                {content.calendar.loading}
              </p>
            )}
            {errors.date ? (
              <p id={ERROR_IDS.date} className="text-sm text-danger">
                {errors.date.message}
              </p>
            ) : null}
            <TimeZoneSelect
              label={content.timeZoneLabel}
              value={timeZone}
              onChange={(zone) =>
                setValue("timeZone", zone, { shouldValidate: true })
              }
            />
          </div>
        ) : null}

        {step === "time" ? (
          <div className="flex flex-col gap-4">
            <p className="text-center text-base text-fg-subtle">
              {date ? formatLongDate(date) : null}
            </p>
            <TimeSlotPicker
              legend={content.steps.time.heading}
              slots={timeSlots()}
              registration={register("time")}
              error={errors.time?.message}
              errorId={ERROR_IDS.time}
            />
            <button
              type="button"
              onClick={continueToDetails}
              className={buttonClasses("primary", "w-full")}
            >
              {content.next}
            </button>
          </div>
        ) : null}

        {step === "details" ? (
          <div className="flex flex-col gap-4">
            <p className="text-center text-base text-fg-subtle">
              {slotSummary}
            </p>
            <TextField
              id="booking-name"
              label={content.fields.name.label}
              autoComplete={content.fields.name.autoComplete}
              required
              registration={register("name")}
              error={errors.name?.message}
            />
            <TextField
              id="booking-email"
              type="email"
              label={content.fields.email.label}
              autoComplete={content.fields.email.autoComplete}
              required
              registration={register("email")}
              error={errors.email?.message}
            />
            <TextField
              id="booking-company"
              label={content.fields.company.label}
              optionalLabel={content.fields.optional}
              autoComplete={content.fields.company.autoComplete}
              registration={register("company")}
              error={errors.company?.message}
            />
            <TextField
              id="booking-notes"
              multiline
              label={content.fields.notes.label}
              hint={content.fields.notes.hint}
              optionalLabel={content.fields.optional}
              registration={register("notes")}
              error={errors.notes?.message}
            />
            {submitFailed ? (
              <div
                role="alert"
                className="rounded-chip border border-danger p-4 text-sm"
              >
                <p className="font-semibold text-danger">
                  {content.failure.heading}
                </p>
                <p className="text-fg">{content.failure.body}</p>
              </div>
            ) : null}
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting || undefined}
              className={buttonClasses(
                "primary",
                "w-full disabled:cursor-progress disabled:opacity-70",
              )}
            >
              {isSubmitting ? content.submit.pending : content.submit.idle}
            </button>
          </div>
        ) : null}

        {step === "success" ? (
          <div
            role="status"
            className="flex flex-col items-center gap-4 text-center"
          >
            <Image
              src={content.success.icon.src}
              alt=""
              width={content.success.icon.width}
              height={content.success.icon.height}
              className="size-12"
            />
            <p className="text-base text-fg">
              {content.success.body} <strong>{slotSummary}</strong>.{" "}
              {content.success.followUp}
            </p>
            <button
              type="button"
              onClick={() => {
                reset({ ...defaultValues, timeZone });
                goTo("date");
              }}
              className={buttonClasses("outline")}
            >
              {content.success.restart}
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
}

function BackButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="absolute left-0 flex size-10 items-center justify-center rounded-full border border-brand-muted transition-colors duration-200 hover:bg-lime motion-reduce:transition-none"
    >
      <Image
        src="/icons/chevron-down-24.svg"
        alt=""
        width={24}
        height={24}
        className="rotate-90"
      />
    </button>
  );
}
