import type { HTMLInputTypeAttribute } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

type TextFieldProps = {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  hint?: string;
  /** Shown after the label for optional fields, e.g. "(optional)". */
  optionalLabel?: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
  multiline?: boolean;
};

const controlClasses =
  "w-full rounded-chip border bg-inverse px-4 py-3 text-base text-fg transition-colors duration-200 placeholder:text-muted hover:border-brand motion-reduce:transition-none aria-invalid:border-danger";

/** Labelled input / textarea with hint and inline error, wired to react-hook-form. */
export function TextField({
  id,
  label,
  registration,
  error,
  hint,
  optionalLabel,
  required = false,
  type = "text",
  autoComplete,
  multiline = false,
}: TextFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const shared = {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    "aria-required": required || undefined,
    className: `${controlClasses} ${error ? "border-danger" : "border-subtle"}`,
    ...registration,
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-fg">
        {label}
        {optionalLabel ? (
          <span className="font-normal text-fg-subtle"> {optionalLabel}</span>
        ) : null}
      </label>
      {hint ? (
        <p id={hintId} className="text-sm text-fg-subtle">
          {hint}
        </p>
      ) : null}
      {multiline ? (
        <textarea
          rows={4}
          {...shared}
          className={`${shared.className} resize-y`}
        />
      ) : (
        <input type={type} autoComplete={autoComplete} {...shared} />
      )}
      {error ? (
        <p id={errorId} className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
