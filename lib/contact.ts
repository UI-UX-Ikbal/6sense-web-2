import { z } from "zod";
import { contactContent } from "@/content/contact";

const { errors, fields } = contactContent.form;

const sourceValues = fields.source.options.map((option) => option.value);

/** Digits with optional leading +, spaces, dots, dashes and brackets; 7–20 characters. */
const PHONE_PATTERN = /^\+?[\d\s().-]{7,20}$/;

/** Shared by the contact form and the `/api/contact` route handler. */
export const contactSchema = z.object({
  fullName: z.string().trim().min(2, errors.fullName).max(100, errors.fullName),
  email: z.email(errors.email),
  company: z.string().trim().min(1, errors.company).max(120, errors.company),
  phone: z
    .string()
    .trim()
    .refine((value) => value === "" || PHONE_PATTERN.test(value), errors.phone),
  message: z.string().trim().min(10, errors.message).max(2000, errors.message),
  source: z
    .string()
    .refine((value) => sourceValues.includes(value), errors.source),
  /** Honeypot — must stay empty; checked server-side. */
  website: z.string(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
