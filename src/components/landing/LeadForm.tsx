"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { buildConsultUrl } from "@/lib/honeybook";

type Field = "firstName" | "lastName" | "phone" | "email" | "zip";
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (!values.firstName.trim()) errors.firstName = "Enter your first name";
  if (!values.lastName.trim()) errors.lastName = "Enter your last name";
  if (values.phone.replace(/\D/g, "").length < 10) errors.phone = "Enter a 10-digit phone number";
  if (!EMAIL_RE.test(values.email)) errors.email = "Enter a valid email address";
  if (values.zip.replace(/\D/g, "").length < 5) errors.zip = "Enter your 5-digit ZIP code";
  return errors;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function LeadForm({
  variant = "hero",
  heading = "Book your free in-home consultation",
  sublabel = "We measure, show you materials, and give you a firm quote — no pressure, no cost.",
}: {
  variant?: "hero" | "section";
  heading?: string;
  sublabel?: string;
}) {
  const [values, setValues] = useState<Record<Field, string>>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    zip: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (field: Field) => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    window.gtag?.("event", "generate_lead", { form: `fast-bath-${variant}` });
    window.location.href = buildConsultUrl({
      name: `${values.firstName} ${values.lastName}`.trim(),
      email: values.email,
      phone: values.phone,
    });
  };

  const field = (
    name: Field,
    label: string,
    type: string,
    autoComplete: string,
    half = false,
  ) => (
    <div className={half ? "sm:col-span-1" : "sm:col-span-2"}>
      <label
        htmlFor={`lf-${variant}-${name}`}
        className="block text-[12px] font-bold uppercase tracking-[0.1em] text-ink"
      >
        {label}
      </label>
      <input
        id={`lf-${variant}-${name}`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={values[name]}
        onChange={set(name)}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={errors[name] ? `lf-${variant}-${name}-err` : undefined}
        className="mt-1.5 w-full border border-line bg-white px-3.5 py-2.5 text-[0.95rem] text-ink outline-none focus-visible:border-brand-dark focus-visible:ring-2 focus-visible:ring-brand-dark/30"
      />
      {errors[name] ? (
        <p
          id={`lf-${variant}-${name}-err`}
          className="mt-1 text-[12px] font-semibold text-[#b0402a]"
        >
          {errors[name]}
        </p>
      ) : null}
    </div>
  );

  return (
    <div className="border border-line bg-cream p-6 shadow-[0_20px_60px_rgba(43,39,35,0.10)] sm:p-7">
      <p className="font-display text-[1.5rem] font-medium leading-tight text-ink">{heading}</p>
      <p className="mt-2 text-[0.9rem] leading-6 text-ink-soft">{sublabel}</p>
      <form onSubmit={onSubmit} noValidate className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {field("firstName", "First name", "text", "given-name", true)}
        {field("lastName", "Last name", "text", "family-name", true)}
        {field("phone", "Phone", "tel", "tel", true)}
        {field("zip", "ZIP code", "text", "postal-code", true)}
        {field("email", "Email", "email", "email")}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-[54px] items-center justify-center bg-brand-dark px-6 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-ink disabled:opacity-70 sm:col-span-2"
        >
          {submitting ? "Taking you to the calendar…" : "Book my free consultation"}
        </button>
      </form>
      <p className="mt-3 text-[11px] leading-5 text-ink-muted">
        Next you will pick a time on our calendar. By submitting you agree we may contact you
        about your project.
      </p>
    </div>
  );
}
