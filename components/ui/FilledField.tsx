import Image from "next/image";
import type { HTMLInputTypeAttribute } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import type { SelectOption } from "@/content/types";

type BaseProps = {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  required?: boolean;
};

type InputProps = BaseProps & {
  kind?: "input";
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
};

type TextareaProps = BaseProps & {
  kind: "textarea";
  placeholder: string;
};

type SelectProps = BaseProps & {
  kind: "select";
  placeholder: string;
  options: readonly SelectOption[];
  caretIcon: string;
};

export type FilledFieldProps = InputProps | TextareaProps | SelectProps;

/** 14/21 at 390, 16/24 from 1024 (Figma "M (16px)/reg"). */
const controlClasses =
  "w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-subtle lg:text-base";

/**
 * Filled form field with the label inside the box (Contact form, Figma 12404:4231):
 * 12px muted label over the control on a field-coloured, 12px-radius panel.
 */
export function FilledField(props: FilledFieldProps) {
  const { id, label, registration, error, required = false } = props;
  const errorId = error ? `${id}-error` : undefined;
  const shared = {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": errorId,
    "aria-required": required || undefined,
    ...registration,
  };

  return (
    <div className="flex flex-col gap-1">
      <div
        className={`relative flex flex-col gap-1.5 rounded-thumb bg-field p-3 ring-1 transition-shadow duration-200 ring-inset focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent motion-reduce:transition-none ${error ? "ring-danger" : "ring-transparent hover:ring-sage-line"}`}
      >
        <label htmlFor={id} className="text-xs text-muted">
          {label}
        </label>
        {props.kind === "textarea" ? (
          <textarea
            rows={2}
            placeholder={props.placeholder}
            {...shared}
            className={`${controlClasses} field-sizing-content max-h-[10lh] min-h-[3lh] resize-none lg:min-h-[2lh]`}
          />
        ) : props.kind === "select" ? (
          <>
            <select
              {...shared}
              className={`${controlClasses} cursor-pointer appearance-none pr-7 has-[option[value='']:checked]:text-fg-subtle`}
            >
              <option value="" disabled hidden>
                {props.placeholder}
              </option>
              {props.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Image
              src={props.caretIcon}
              alt=""
              width={20}
              height={20}
              className="pointer-events-none absolute right-3 bottom-3 size-5 lg:bottom-3.5"
            />
          </>
        ) : (
          <input
            type={props.type ?? "text"}
            autoComplete={props.autoComplete}
            placeholder={props.placeholder}
            {...shared}
            className={controlClasses}
          />
        )}
      </div>
      {error ? (
        <p id={errorId} className="px-3 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
