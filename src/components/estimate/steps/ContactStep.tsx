import { useState } from "react";
import type { ChangeEvent } from "react";

export type ContactValue = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  zip: string;
  timeline: string;
};

type Field = keyof ContactValue;
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TIMELINES = [
  "As soon as possible",
  "1–3 months",
  "3–6 months",
  "6+ months",
  "Just researching",
];

function validate(v: ContactValue): Errors {
  const e: Errors = {};
  if (!v.firstName.trim()) e.firstName = "Required";
  if (!v.lastName.trim()) e.lastName = "Required";
  if (!EMAIL_RE.test(v.email)) e.email = "Enter a valid email";
  if (v.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a 10-digit phone number";
  if (v.zip.replace(/\D/g, "").length < 5) e.zip = "Enter your ZIP code";
  if (!v.timeline) e.timeline = "Pick a timeline";
  return e;
}

export default function ContactStep({
  value,
  onChange,
  onSubmit,
  onBack,
  submitting,
}: {
  value: ContactValue;
  onChange: (patch: Partial<ContactValue>) => void;
  onSubmit: () => void;
  onBack: () => void;
  submitting: boolean;
}) {
  const [errors, setErrors] = useState<Errors>({});

  const set =
    (field: Field) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      onChange({ [field]: e.target.value } as Partial<ContactValue>);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const submit = () => {
    const found = validate(value);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit();
  };

  const text = (field: Field, label: string, type = "text", autoComplete = "", required = true) => (
    <div>
      <label
        htmlFor={`c-${field}`}
        className="block text-[12px] font-bold uppercase tracking-[0.1em] text-ink"
      >
        {label}
        {!required ? <span className="text-ink-muted"> (optional)</span> : null}
      </label>
      <input
        id={`c-${field}`}
        type={type}
        autoComplete={autoComplete}
        value={value[field]}
        onChange={set(field)}
        aria-invalid={errors[field] ? true : undefined}
        className="mt-1.5 w-full border border-line bg-white px-3.5 py-2.5 text-[0.95rem] text-ink outline-none focus-visible:border-brand-dark focus-visible:ring-2 focus-visible:ring-brand-dark/30"
      />
      {errors[field] ? (
        <p className="mt-1 text-[12px] font-semibold text-[#b0402a]">{errors[field]}</p>
      ) : null}
    </div>
  );

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="font-display text-[1.9rem] font-medium text-ink">Almost finished</h2>
      <p className="mt-2 text-[0.95rem] text-ink-soft">Enter your information to see your estimate.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {text("firstName", "First name", "text", "given-name")}
        {text("lastName", "Last name", "text", "family-name")}
        {text("email", "Email", "email", "email")}
        {text("phone", "Phone", "tel", "tel")}
        {text("city", "City", "text", "address-level2", false)}
        {text("zip", "ZIP code", "text", "postal-code")}
        <div className="sm:col-span-2">
          <label
            htmlFor="c-timeline"
            className="block text-[12px] font-bold uppercase tracking-[0.1em] text-ink"
          >
            When are you planning to start?
          </label>
          <select
            id="c-timeline"
            value={value.timeline}
            onChange={set("timeline")}
            aria-invalid={errors.timeline ? true : undefined}
            className="mt-1.5 w-full border border-line bg-white px-3 py-2.5 text-[0.95rem] text-ink"
          >
            <option value="">Select a timeline</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.timeline ? (
            <p className="mt-1 text-[12px] font-semibold text-[#b0402a]">{errors.timeline}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-[13px] font-bold uppercase tracking-[0.12em] text-ink-soft"
        >
          &larr; Back
        </button>
        <button
          type="button"
          onClick={submit}
          disabled={submitting}
          className="inline-flex min-h-[52px] items-center bg-brand-dark px-7 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-ink disabled:opacity-60"
        >
          {submitting ? "Calculating…" : "Show my estimate"}
        </button>
      </div>
      <p className="mt-3 text-[11px] text-ink-muted">
        We&rsquo;ll email you the estimate and may contact you about your project. Rough estimate,
        not a quote.
      </p>
    </div>
  );
}
