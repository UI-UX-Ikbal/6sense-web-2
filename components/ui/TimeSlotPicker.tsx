import type { UseFormRegisterReturn } from "react-hook-form";
import { formatTimeLabel } from "@/lib/calendar";

type TimeSlotPickerProps = {
  legend: string;
  slots: readonly string[];
  registration: UseFormRegisterReturn;
  error?: string;
  errorId: string;
};

/** Time slots as a native radio group (arrow keys move between options). */
export function TimeSlotPicker({
  legend,
  slots,
  registration,
  error,
  errorId,
}: TimeSlotPickerProps) {
  return (
    <fieldset
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? errorId : undefined}
      className="flex flex-col gap-3"
    >
      <legend className="sr-only">{legend}</legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {slots.map((slot) => (
          <label key={slot} className="relative">
            <input
              type="radio"
              value={slot}
              {...registration}
              className="peer absolute inset-0 appearance-none rounded-chip"
            />
            <span className="flex h-11 cursor-pointer items-center justify-center rounded-chip border border-brand-muted text-base font-semibold text-brand transition-colors duration-200 peer-checked:border-brand peer-checked:bg-brand peer-checked:text-inverse peer-hover:border-brand motion-reduce:transition-none">
              {formatTimeLabel(slot)}
            </span>
          </label>
        ))}
      </div>
      {error ? (
        <p id={errorId} className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
