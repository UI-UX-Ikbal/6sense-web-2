"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { ContactFormContent } from "@/content/contact";
import { buttonClasses } from "@/components/ui/Button";
import { FilledField } from "@/components/ui/FilledField";
import { type ContactFormValues, contactSchema } from "@/lib/contact";

type Status = "idle" | "success" | "error";

const defaultValues: ContactFormValues = {
  fullName: "",
  email: "",
  company: "",
  phone: "",
  message: "",
  source: "",
  website: "",
};

const linkClasses =
  "text-fg underline transition-colors duration-200 hover:text-brand motion-reduce:transition-none";

type ContactFormProps = {
  content: ContactFormContent;
};

/**
 * "Get started" form (Figma 12404:4228 / 12412:4339).
 * react-hook-form + zod, inline errors on blur then on change; posts to the `/api/contact` stub.
 */
export function ContactForm({ content }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const successRef = useRef<HTMLHeadingElement>(null);
  const { fields } = content;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: "onTouched",
  });

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const onSubmit = handleSubmit(async (values) => {
    setStatus("idle");
    try {
      const response = await fetch(content.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok)
        throw new Error(`Contact request failed: ${response.status}`);
      reset(defaultValues);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  });

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4">
        <h3
          ref={successRef}
          tabIndex={-1}
          className="text-xl font-semibold text-brand lg:text-2xl"
        >
          {content.success.heading}
        </h3>
        <p className="text-base text-fg-subtle lg:text-lg">
          {content.success.body}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={buttonClasses("outline")}
        >
          {content.success.restart}
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-busy={isSubmitting || undefined}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <FilledField
          id="contact-full-name"
          required
          label={fields.fullName.label}
          placeholder={fields.fullName.placeholder}
          autoComplete={fields.fullName.autoComplete}
          registration={register("fullName")}
          error={errors.fullName?.message}
        />
        <FilledField
          id="contact-email"
          required
          type="email"
          label={fields.email.label}
          placeholder={fields.email.placeholder}
          autoComplete={fields.email.autoComplete}
          registration={register("email")}
          error={errors.email?.message}
        />
        <FilledField
          id="contact-company"
          required
          label={fields.company.label}
          placeholder={fields.company.placeholder}
          autoComplete={fields.company.autoComplete}
          registration={register("company")}
          error={errors.company?.message}
        />
        <FilledField
          id="contact-phone"
          type="tel"
          label={fields.phone.label}
          placeholder={fields.phone.placeholder}
          autoComplete={fields.phone.autoComplete}
          registration={register("phone")}
          error={errors.phone?.message}
        />
        <FilledField
          kind="textarea"
          id="contact-message"
          required
          label={fields.message.label}
          placeholder={fields.message.placeholder}
          registration={register("message")}
          error={errors.message?.message}
        />
        <FilledField
          kind="select"
          id="contact-source"
          required
          label={fields.source.label}
          placeholder={fields.source.placeholder}
          options={fields.source.options}
          caretIcon={content.caretIcon}
          registration={register("source")}
          error={errors.source?.message}
        />

        {/* Honeypot: off-screen and hidden from assistive tech. */}
        <div aria-hidden className="sr-only">
          <label htmlFor="contact-website">{fields.website.label}</label>
          <input
            id="contact-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>
      </div>

      {status === "error" ? (
        <p role="alert" className="text-sm text-danger lg:text-base">
          {content.failure.body}{" "}
          <a href={`mailto:${content.failure.email}`} className="underline">
            {content.failure.email}
          </a>
          .
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className={buttonClasses(
          "primary",
          "w-full disabled:cursor-wait disabled:opacity-70 lg:w-auto lg:self-start",
        )}
      >
        {isSubmitting ? content.submit.pending : content.submit.idle}
      </button>

      <p className="text-sm text-muted lg:text-base">
        {content.consent.before}{" "}
        <Link href={content.consent.terms.href} className={linkClasses}>
          {content.consent.terms.label}
        </Link>{" "}
        {content.consent.and}{" "}
        <Link href={content.consent.privacy.href} className={linkClasses}>
          {content.consent.privacy.label}
        </Link>
        .
      </p>
    </form>
  );
}
