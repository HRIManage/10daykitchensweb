# Fast Bath Conversion Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/fast-bath` as a lead-capture landing page with reusable conversion components, keeping the site's visual language and indexability.

**Architecture:** Six new presentational/interactive components under `src/components/landing/`. The page composes them around refitted existing content sections. Lead capture happens on-page via a styled form that hands off to the existing HoneyBook in-home-consultation scheduler; a second capture point embeds that scheduler inline. No backend, no new dependencies.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript (strict), Tailwind CSS v4, `lucide-react`, `next/image`, `next/link`. No test framework — verification is `npm run check` (ESLint + `tsc --noEmit` + `next build`) plus a local `next start` visual check.

## Global Constraints

- TypeScript strict; no `any`. Named exports for utilities, default export for React components. PascalCase components, camelCase functions/vars.
- Tailwind utility classes + existing design tokens only. Tokens available: `brand` `#5dbb46`, `brand-dark` `#3a8a2e`, `brand-light` `#8fd47e`, `brand-tint` `#ecebe8`, `ink` `#2b2723`, `ink-soft` `#4a443d`, `ink-muted` `#8a8a86`, `line` `#ddd8d0`, `cream` `#fafaf8`, `sand` `#f2f0ea`, `paper` `#fffefa`, `forest` `#211e1a`. Font: `font-display` = Cormorant.
- **Accessibility:** all new small-text / label / solid-button color must use `brand-dark` (not `brand`) so this page passes WCAG AA contrast. Real `<label>`s, `aria-invalid` + `aria-describedby` on invalid fields, visible `:focus-visible`, `prefers-reduced-motion` respected for any motion.
- `CONTAINER` = `"site-container"` and `SECTION` = `"py-12 sm:py-16 lg:py-20"` are exported from `@/components/layout`.
- `site` (`@/lib/site`) provides `site.phone` (display) and `site.phoneHref` (`tel:` URL).
- HoneyBook scheduler URL: `HOME_CONSULT_URL` from `@/lib/honeybook`. It returns 200 with unknown query params (safe to append prefill) and sends no `X-Frame-Options` / CSP `frame-ancestors` (safe to iframe).
- The claim "as fast as 3 days" is used verbatim with the words "as fast as" — never as a guarantee ("in 3 days", "3-day install").
- Each task ends with `npm run check` passing and one `git commit`.
- Every commit message ends with:
  `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`

---

## File Structure

**New:**
| File | Responsibility |
|------|----------------|
| `src/components/landing/TrustBar.tsx` | server; full-width strip of 4 icon+label trust items |
| `src/components/landing/CtaBand.tsx` | server; dark full-width band, eyebrow + headline + one button |
| `src/components/landing/FinancingStrip.tsx` | server; light strip, financing message + link + disclaimer |
| `src/components/landing/LeadForm.tsx` | client; name/phone/email/zip form → validate → analytics event → redirect to HoneyBook scheduler |
| `src/components/landing/SchedulerEmbed.tsx` | client; lazy `IntersectionObserver` iframe of the HoneyBook scheduler + fallback link |
| `src/components/landing/StickyCtaBar.tsx` | client; mobile-only fixed bottom bar (Call + Book), visible after hero |

**Modified:**
| File | Change |
|------|--------|
| `src/lib/honeybook.ts` | add `buildConsultUrl(fields)` helper |
| `src/app/fast-bath/page.tsx` | full rebuild around the new components; existing content sections refitted |

**Untouched:** every other route, `sitemap.ts`, `robots.ts`, all other content.

---

## Task 1: Presentational components (TrustBar, CtaBand, FinancingStrip)

Three server components with no state or effects. Grouped: a reviewer would accept or reject them as a set.

**Files:**
- Create: `src/components/landing/TrustBar.tsx`
- Create: `src/components/landing/CtaBand.tsx`
- Create: `src/components/landing/FinancingStrip.tsx`

**Interfaces:**
- Consumes: `CONTAINER` from `@/components/layout`; icons from `lucide-react`; `Link` from `next/link`.
- Produces:
  - `TrustBar` — default export, `default function TrustBar({ items?: TrustItem[] })`. `type TrustItem = { icon: LucideIcon; label: string }` (exported).
  - `CtaBand` — default export, `default function CtaBand({ eyebrow: string; headline: string; buttonLabel: string; href?: string })`. `href` default `"#book"`.
  - `FinancingStrip` — default export, `default function FinancingStrip()`, no props.

- [ ] **Step 1: Create `src/components/landing/TrustBar.tsx`**

```tsx
import type { LucideIcon } from "lucide-react";
import { CalendarCheck, Gem, Hammer, ShieldCheck } from "lucide-react";
import { CONTAINER } from "@/components/layout";

export type TrustItem = { icon: LucideIcon; label: string };

const DEFAULT_ITEMS: TrustItem[] = [
  { icon: CalendarCheck, label: "Free in-home design consultation" },
  { icon: Gem, label: "Premium materials" },
  { icon: Hammer, label: "Professional installation" },
  { icon: ShieldCheck, label: "5-year workmanship warranty" },
];

export default function TrustBar({ items = DEFAULT_ITEMS }: { items?: TrustItem[] }) {
  return (
    <section className="border-y border-line bg-white">
      <div className={`${CONTAINER} grid grid-cols-2 gap-x-6 gap-y-5 py-7 md:grid-cols-4`}>
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <Icon className="size-5 shrink-0 text-brand-dark" aria-hidden />
            <span className="text-[13px] font-semibold leading-snug text-ink">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/landing/CtaBand.tsx`**

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CONTAINER } from "@/components/layout";

type CtaBandProps = {
  eyebrow: string;
  headline: string;
  buttonLabel: string;
  href?: string;
};

export default function CtaBand({ eyebrow, headline, buttonLabel, href = "#book" }: CtaBandProps) {
  return (
    <section className="bg-forest text-white">
      <div className={`${CONTAINER} flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between`}>
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-light">{eyebrow}</p>
          <p className="mt-2 max-w-xl font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium leading-tight">
            {headline}
          </p>
        </div>
        <Link
          href={href}
          className="inline-flex min-h-[52px] shrink-0 items-center gap-2 bg-white px-7 text-[13px] font-bold uppercase tracking-[0.12em] text-ink transition hover:bg-brand-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light"
        >
          {buttonLabel}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `src/components/landing/FinancingStrip.tsx`**

```tsx
import Link from "next/link";
import { CONTAINER } from "@/components/layout";

export default function FinancingStrip() {
  return (
    <section className="bg-sand">
      <div className={`${CONTAINER} flex flex-col gap-3 py-12 md:flex-row md:items-center md:justify-between`}>
        <div className="max-w-2xl">
          <h2 className="font-display text-[clamp(1.6rem,2.8vw,2.4rem)] font-medium leading-tight text-ink">
            Spread the cost of your new bathroom.
          </h2>
          <p className="mt-3 text-[1rem] leading-7 text-ink-soft">
            Monthly payment plans are available through GreenSky, along with 0% promotional
            options for qualifying projects. We will walk you through every path during your
            consultation.
          </p>
          <p className="mt-3 text-[12px] leading-5 text-ink-muted">
            This information is for general purposes only and is not financial advice. Please
            consult a qualified financial advisor before making financial decisions.
          </p>
        </div>
        <Link
          href="/financing"
          className="shrink-0 self-start text-[13px] font-bold uppercase tracking-[0.14em] text-brand-dark underline underline-offset-4 hover:text-ink"
        >
          See financing options
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify `npm run check`**

Run: `rm -rf .next && npm run check`
Expected: ESLint 0 errors (pre-existing `<img>` warnings in unrelated files are fine), `tsc` clean, `next build` completes. The three components are not imported yet, so they will not appear in the route table — that is expected.

- [ ] **Step 5: Commit**

```bash
git add src/components/landing/TrustBar.tsx src/components/landing/CtaBand.tsx src/components/landing/FinancingStrip.tsx
git commit -m "$(cat <<'EOF'
Add landing presentational components: TrustBar, CtaBand, FinancingStrip

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: HoneyBook prefill helper + LeadForm

**Files:**
- Modify: `src/lib/honeybook.ts` (append the helper after `HOME_CONSULT_URL`)
- Create: `src/components/landing/LeadForm.tsx`

**Interfaces:**
- Consumes: `HOME_CONSULT_URL` from `@/lib/honeybook`.
- Produces:
  - `buildConsultUrl` — named export from `@/lib/honeybook`:
    `export function buildConsultUrl(fields: { name?: string; email?: string; phone?: string }): string`
  - `LeadForm` — default export:
    `default function LeadForm({ variant?: "hero" | "section"; heading?: string; sublabel?: string })`.
    `variant` default `"hero"`. Renders a `<form>` with fields First name, Last name, Phone, Email, ZIP and a submit button. On valid submit: calls `window.gtag?.("event", "generate_lead", { form: "fast-bath-" + variant })`, then sets `window.location.href = buildConsultUrl(...)`.

- [ ] **Step 1: Add `buildConsultUrl` to `src/lib/honeybook.ts`**

Append after the `HOME_CONSULT_URL` export:

```ts
/**
 * Appends contact fields to the in-home consultation scheduler URL as best-effort
 * prefill. HoneyBook returns 200 for unknown params, so extra keys are harmless.
 */
export function buildConsultUrl(fields: { name?: string; email?: string; phone?: string }): string {
  const params = new URLSearchParams();
  if (fields.name?.trim()) params.set("full_name", fields.name.trim());
  if (fields.email?.trim()) params.set("email", fields.email.trim());
  if (fields.phone?.trim()) params.set("phone", fields.phone.trim());
  const query = params.toString();
  return query ? `${HOME_CONSULT_URL}?${query}` : HOME_CONSULT_URL;
}
```

- [ ] **Step 2: Create `src/components/landing/LeadForm.tsx`**

```tsx
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { buildConsultUrl } from "@/lib/honeybook";

type Fields = "firstName" | "lastName" | "phone" | "email" | "zip";
type Errors = Partial<Record<Fields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Record<Fields, string>): Errors {
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
  const [values, setValues] = useState<Record<Fields, string>>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    zip: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (field: Fields) => (event: { target: { value: string } }) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
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
    name: Fields,
    label: string,
    type: string,
    autoComplete: string,
    half = false,
  ) => (
    <div className={half ? "sm:col-span-1" : "sm:col-span-2"}>
      <label htmlFor={`lf-${variant}-${name}`} className="block text-[12px] font-bold uppercase tracking-[0.1em] text-ink">
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
        <p id={`lf-${variant}-${name}-err`} className="mt-1 text-[12px] font-semibold text-[#b0402a]">
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
          className="sm:col-span-2 inline-flex min-h-[54px] items-center justify-center bg-brand-dark px-6 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-ink disabled:opacity-70"
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
```

- [ ] **Step 3: Verify `npm run check`**

Run: `rm -rf .next && npm run check`
Expected: clean (component not imported yet).

- [ ] **Step 4: Commit**

```bash
git add src/lib/honeybook.ts src/components/landing/LeadForm.tsx
git commit -m "$(cat <<'EOF'
Add LeadForm + buildConsultUrl HoneyBook prefill helper

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: SchedulerEmbed

**Files:**
- Create: `src/components/landing/SchedulerEmbed.tsx`

**Interfaces:**
- Consumes: `HOME_CONSULT_URL` from `@/lib/honeybook`.
- Produces: `SchedulerEmbed` — default export, `default function SchedulerEmbed({ id?: string })`. `id` default `"book"`. Renders a `<section id={id}>` containing a bordered card; the card holds a skeleton until the section nears the viewport, then an `<iframe src={HOME_CONSULT_URL}>`, plus a permanent fallback link below.

- [ ] **Step 1: Create `src/components/landing/SchedulerEmbed.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { HOME_CONSULT_URL } from "@/lib/honeybook";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function SchedulerEmbed({ id = "book" }: { id?: string }) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShow(true);
          window.gtag?.("event", "schedule_view", { form: "fast-bath-embed" });
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [show]);

  return (
    <section id={id} className="scroll-mt-24 bg-paper py-12 sm:py-16 lg:py-20">
      <div className="site-container max-w-3xl">
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-dark">Book your visit</p>
        <h2 className="mt-3 font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-tight text-ink">
          Pick a time that works for you.
        </h2>
        <p className="mt-4 text-[1rem] leading-7 text-ink-soft">
          A 45&ndash;60 minute in-home visit. We look at the space, walk through materials,
          and leave you with a firm quote.
        </p>

        <div ref={sentinelRef} className="mt-8 min-h-[640px] border border-line bg-white lg:min-h-[720px]">
          {show ? (
            <iframe
              src={HOME_CONSULT_URL}
              title="Book a free in-home consultation"
              loading="lazy"
              className="h-[640px] w-full border-0 lg:h-[720px]"
            />
          ) : (
            <div className="flex h-[640px] w-full items-center justify-center lg:h-[720px]">
              <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                Loading available times&hellip;
              </span>
            </div>
          )}
        </div>

        <p className="mt-4 text-[13px] text-ink-soft">
          Trouble loading?{" "}
          <a
            href={HOME_CONSULT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-dark underline underline-offset-2"
          >
            Open the scheduler in a new tab
          </a>
          .
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify `npm run check`**

Run: `rm -rf .next && npm run check`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/SchedulerEmbed.tsx
git commit -m "$(cat <<'EOF'
Add SchedulerEmbed: lazy-loaded HoneyBook scheduler iframe

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: StickyCtaBar

**Files:**
- Create: `src/components/landing/StickyCtaBar.tsx`

**Interfaces:**
- Consumes: `site` from `@/lib/site` (`site.phone`, `site.phoneHref`).
- Produces: `StickyCtaBar` — default export, `default function StickyCtaBar()`, no props. Renders a `position: fixed` bottom bar, `lg:hidden`, hidden until `window.scrollY > 600`. Two links: Call (`site.phoneHref`) and Book (`#book`).

- [ ] **Step 1: Create `src/components/landing/StickyCtaBar.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { Phone, CalendarCheck } from "lucide-react";
import { site } from "@/lib/site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function StickyCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-line bg-white transition-transform lg:hidden motion-reduce:transition-none ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={site.phoneHref}
        onClick={() => window.gtag?.("event", "contact", { method: "phone", from: "fast-bath-sticky" })}
        className="flex min-h-[56px] items-center justify-center gap-2 border-r border-line text-[13px] font-bold uppercase tracking-[0.1em] text-ink"
      >
        <Phone className="size-4" aria-hidden />
        {site.phone}
      </a>
      <a
        href="#book"
        className="flex min-h-[56px] items-center justify-center gap-2 bg-brand-dark text-[13px] font-bold uppercase tracking-[0.1em] text-white"
      >
        <CalendarCheck className="size-4" aria-hidden />
        Book free visit
      </a>
    </div>
  );
}
```

- [ ] **Step 2: Verify `npm run check`**

Run: `rm -rf .next && npm run check`
Expected: clean. If `site.phone` / `site.phoneHref` do not exist, open `src/lib/site.ts`, find the phone fields (Footer.tsx uses `site.phone` and `site.phoneHref`), and use those exact names.

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/StickyCtaBar.tsx
git commit -m "$(cat <<'EOF'
Add StickyCtaBar: mobile-only fixed call/book bar

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Rebuild `src/app/fast-bath/page.tsx`

Assemble the page. Read the current file first — it holds the scope list, the projects data, the comparison content, the FAQ, and the service-area section that are being carried over. Preserve that data; replace the layout and hero.

**Files:**
- Modify: `src/app/fast-bath/page.tsx` (full rewrite of the component body and metadata; keep/relocate the existing content data)

**Interfaces:**
- Consumes: `LeadForm`, `SchedulerEmbed`, `StickyCtaBar`, `TrustBar`, `CtaBand`, `FinancingStrip` from `@/components/landing/*`; `CustomerReviews` from `@/components/home`; `FastBathBeforeAfterSlider` from `@/components/FastBathBeforeAfterSlider` (confirm the export name by opening the file); `PageCta`; existing `createServiceSchema` from `@/lib/seo`.
- Produces: the `/fast-bath` route. No exported symbols other than `metadata` and the default page component.

- [ ] **Step 1: Read the current page and note what to keep**

Run: `cat src/app/fast-bath/page.tsx`
Note the data for: the scope/"what Fast Bath covers" items, the projects array used in the gallery, the comparison (Fast Bath vs full remodel) content, the FAQ items, the service-area city list usage. These move into the rebuilt file largely unchanged.

- [ ] **Step 2: Rebuild metadata**

Replace the `metadata` export with:

```tsx
export const metadata: Metadata = {
  title: "Fast Bath: A New Bathroom in as Fast as 3 Days | Lacey, WA",
  description:
    "Fast Bath by 10 Day Kitchens — tub-to-shower conversions, shower replacements, and vanity updates installed in as fast as 3 days. Book a free in-home consultation in Lacey, Olympia, Tacoma, and the South Sound.",
  alternates: { canonical: "https://10daykitchens.com/fast-bath" },
  openGraph: {
    title: "Fast Bath: A New Bathroom in as Fast as 3 Days",
    description:
      "Tub-to-shower conversions, shower replacements, and vanity updates installed in as fast as 3 days. Free in-home consultation.",
    url: "https://10daykitchens.com/fast-bath",
    images: [{ url: "/images/fast-bath-before-after-screenshot.png", alt: "Fast Bath before and after" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fast Bath: A New Bathroom in as Fast as 3 Days",
    description: "Tub-to-shower conversions and shower replacements installed in as fast as 3 days.",
    images: ["/images/fast-bath-before-after-screenshot.png"],
  },
};
```

- [ ] **Step 3: Add review constants and the FAQ array near the top of the file**

```tsx
// Placeholder trust numbers — replace with the Google Business Profile rating/count
// once the profile is live and has reviews.
const REVIEW_RATING = "4.9";
const REVIEW_COUNT = "40+";

const FAQS: { q: string; a: string }[] = [
  {
    q: "How is Fast Bath different from a full bathroom remodel?",
    a: "Fast Bath focuses on the shower, tub, vanity, and fixtures within your existing layout — no moving plumbing or walls. That is what makes the fast install window possible. A full bathroom remodel replaces everything and can change the footprint.",
  },
  {
    q: "How much does a Fast Bath cost?",
    a: "It depends on scope — a shower or tub update, a full refresh, or a primary suite are different projects. We give you a firm quote after an in-home visit, with no hidden costs. See our bathroom cost guide for how pricing works.",
  },
  {
    q: "Is “as fast as 3 days” realistic?",
    a: "For qualified projects, yes. The speed comes from finalizing every selection and staging all materials before install day, so the crew works a tight, planned schedule instead of waiting on decisions or deliveries.",
  },
  {
    q: "Do you handle permits?",
    a: "When a project needs one — usually for plumbing or electrical changes — we manage the application and inspections. Most same-layout shower and tub replacements do not require a permit.",
  },
  {
    q: "What areas do you serve?",
    a: "Lacey, Olympia, Tumwater, Tacoma, Lakewood, and the wider South Sound, from our showroom in Lacey.",
  },
];
```

- [ ] **Step 4: Rebuild the component body**

The returned JSX, in order. Keep the existing `createServiceSchema(...)` call; add a `FAQPage` node and render both as one `<script>` (same pattern as `src/app/blog/[slug]/page.tsx`):

```tsx
const jsonLd: object[] = [
  createServiceSchema({
    name: "Fast Bath",
    description:
      "Tub-to-shower conversions, shower replacements, wall panels, and vanity updates installed in as fast as 3 days for homes in Lacey, Olympia, Tacoma, and the South Sound.",
    url: "https://10daykitchens.com/fast-bath",
    serviceType: [
      "Tub to Shower Conversion",
      "Shower Replacement",
      "Walk-In Shower Installation",
      "Bathroom Vanity Replacement",
      "Shower Wall Panels",
    ],
  }),
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  },
];
```

Body structure (write real JSX for each; reuse existing section content/data where the spec says "keep"):

1. `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />`
2. `<StickyCtaBar />`
3. **Hero** `<section className="bg-paper pt-[150px] pb-14 sm:pt-[172px]">` → `${CONTAINER}` grid `lg:grid-cols-[1fr_0.92fr]` gap-12:
   - Left column:
     - eyebrow `<p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-dark">Fast Bath · Lacey, WA</p>`
     - `<h1 className="mt-4 max-w-2xl text-[clamp(2.5rem,4.6vw,4.6rem)] leading-[1.03] text-ink">A new bathroom in as fast as 3 days.</h1>`
     - subhead `<p className="mt-6 max-w-xl text-[1.05rem] leading-8 text-ink-soft">`: "Fast Bath gives you professional installation and premium materials with far less disruption than a full remodel. Tub-to-shower conversions, shower replacements, wall panels, and vanities."
     - trust row: a flex-wrap row of four `<span>`s separated by a dot, e.g. `★ {REVIEW_RATING} ({REVIEW_COUNT} reviews)`, `Family-owned since 2004`, `Licensed & bonded`, `5-year warranty`, each `text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-soft`.
   - Right column: `<LeadForm />`
   - Below the grid on mobile, the before/after image can sit under the form; on desktop keep it in the left column under the trust row OR drop it (the form is the priority). Choose: put the image in the left column, below the trust row, `<Image src="/images/fast-bath-before-after-screenshot.png" alt="Fast Bath tub-to-shower conversion, before and after" width={560} height={420} className="mt-9 w-full border border-line object-cover" />`.
4. `<TrustBar />`
5. **Rating + quotes** `<section className={`${SECTION} bg-white`}>`: big `★ {REVIEW_RATING}` headline + `{REVIEW_COUNT} homeowner reviews`, then 2–3 short quotes. Pull quote text + names from the existing reviews data in `@/components/home` `CustomerReviews` if accessible; otherwise write 3 short generic-but-honest quotes and mark them with a code comment `/* TODO: replace with real review quotes */`. Prefer reusing real data.
6. **What Fast Bath covers** `<section className={`${SECTION} bg-paper`}>`: keep the existing scope list content, presented as a simple grid of items with a check icon.
7. **3-step process** `<section className={`${SECTION} bg-white`}>`: three numbered steps — "Free in-home consultation" / "We finalize selections and stage every material" / "Install in as fast as 3 days". Reuse any existing process copy.
8. **Before/after gallery** `<section className={`${SECTION} bg-paper`}>`: reuse `FastBathBeforeAfterSlider` and/or the existing projects grid + a `PrimaryButton`-style link to `/portfolio`.
9. `<CtaBand eyebrow="Ready for a better bathroom?" headline="Book your free in-home consultation." buttonLabel="Pick a time" />`
10. **Fast Bath vs. full remodel** `<section className={`${SECTION} bg-white`}>`: keep the existing comparison content.
11. `<FinancingStrip />`
12. `<SchedulerEmbed />`
13. **FAQ** `<section className={`${SECTION} bg-paper`}>`: `<h2>` + map `FAQS` into `<details>` accordions (same markup as `src/app/blog/[slug]/page.tsx` FAQ block — copy that pattern).
14. **Service area** `<section className={`${SECTION} bg-cream`}>`: keep the existing light service-area section (city links + phone line).
15. `<PageCta eyebrow="Start your bathroom transformation" title={<>A new bathroom, sooner than you think.</>} body="Book a free in-home consultation and we will bring the plan, the materials, and a firm quote." primaryLabel="Book free consultation" primaryHref="#book" />`

Remove the old local `PrimaryButton` / `OutlineButton` / `Eyebrow` helpers if they are no longer used, or keep whichever the carried-over sections still need.

- [ ] **Step 5: Verify build + route**

Run: `rm -rf .next && npm run check`
Expected: ESLint 0 errors, `tsc` clean, `next build` completes, `/fast-bath` still `○ (Static)` in the route table.

- [ ] **Step 6: Visual check (desktop + mobile)**

```bash
(npx next start -p 3210 &) && sleep 5 && curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3210/fast-bath
```

Open `http://localhost:3210/fast-bath` in the browser tool. Verify:
- Hero: headline, trust row, lead form all visible above the fold on desktop (1280px)
- Form: entering nothing and clicking submit shows 5 inline errors; entering valid data redirects to `10daykitchens.hbportal.co`
- `TrustBar`, rating, scope, process, gallery, CtaBand, comparison, FinancingStrip all render
- `SchedulerEmbed`: scroll to it — the HoneyBook calendar iframe loads
- FAQ accordions open/close
- Resize to 390px: `StickyCtaBar` appears at the bottom after scrolling; hero form stacks; no horizontal scroll
- `#book` links (CtaBand button, sticky "Book free visit", PageCta button) scroll to the scheduler

Kill the server: `pkill -f "next start"`

- [ ] **Step 7: Commit**

```bash
git add src/app/fast-bath/page.tsx
git commit -m "$(cat <<'EOF'
Rebuild /fast-bath as a lead-capture landing page

Hero lead form + embedded HoneyBook scheduler, sticky mobile call/book
bar, trust bar, repeated CTA bands, financing strip. Existing scope,
process, gallery, comparison, FAQ, and service-area content refitted.
Adds FAQPage schema and OpenGraph image.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Final verification & PR

**Files:** none (verification + PR only)

- [ ] **Step 1: Full check from clean**

Run: `rm -rf .next node_modules/.cache && npm run check`
Expected: ESLint 0 errors, `tsc` clean, `next build` completes.

- [ ] **Step 2: Confirm the sitemap and other routes are untouched**

Run: `grep -c '<loc>' .next/server/app/sitemap.xml.body`
Expected: 44 (unchanged). `/fast-bath` still present.

- [ ] **Step 3: Push and open PR**

```bash
git push -u origin fast-bath-landing
gh pr create --base main --head fast-bath-landing \
  --title "Rebuild /fast-bath as a lead-capture landing page" \
  --body "$(cat <<'EOF'
## Summary

Rebuilds `/fast-bath` from a content page into a conversion landing page, per `docs/superpowers/specs/2026-09-09-fast-bath-landing-page-design.md` (Approach C).

**New reusable components** (`src/components/landing/`): `LeadForm`, `SchedulerEmbed`, `StickyCtaBar`, `TrustBar`, `CtaBand`, `FinancingStrip` — built to be reused on `/bathroom-remodel` and `/kitchen-remodel` later.

**Page:** hero with an inline lead form that hands off to the HoneyBook in-home-consult scheduler (fields carried as prefill params); the same scheduler embedded live lower down; sticky mobile call/book bar; trust bar; repeated CTA bands; financing strip. Existing scope, 3-step process, project gallery, Fast-Bath-vs-full-remodel comparison, FAQ, and service-area content refitted into the new layout.

**SEO:** stays indexable, keeps canonical + `Service` schema, adds `FAQPage` schema + OpenGraph image, new H1 leads with "as fast as 3 days".

**No new dependencies. No backend.** `npm run check` passes.

## Review before merge

- Preview on **mobile and desktop**
- `REVIEW_RATING` / `REVIEW_COUNT` in `src/app/fast-bath/page.tsx` are placeholders (4.9 / 40+) — swap in your real Google Business Profile numbers
- Test the hero form → confirm it lands you on the HoneyBook scheduler
- Confirm you're comfortable with every claim on the page ("as fast as 3 days", financing wording, warranty)

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 4: Report the PR URL and the Vercel preview status to the user.**

---

## Self-Review

**Spec coverage:**
- Sticky mobile bar → Task 4 ✓
- Hero + inline form → Task 2 (LeadForm) + Task 5 step 4 ✓
- Trust bar → Task 1 ✓
- Rating + quotes → Task 5 step 3 + step 4 §5 ✓
- Scope / process / gallery / comparison / service area (keep existing) → Task 5 step 1 + step 4 ✓
- CTA bands → Task 1 (CtaBand) + Task 5 ✓
- Financing strip → Task 1 ✓
- Embedded scheduler → Task 3 ✓
- FAQ + FAQPage schema → Task 5 steps 3–4 ✓
- SEO (canonical, Service schema, OG, title) → Task 5 step 2 + step 4 ✓
- Analytics events (`generate_lead`, `contact`, `schedule_view`) → Tasks 2, 3, 4 ✓
- A11y (labels, aria, focus, reduced-motion, brand-dark) → global constraints + Tasks 2, 4 ✓
- `buildConsultUrl` helper → Task 2 ✓
- Reusable components for other pages → all in `src/components/landing/` ✓
- Open items (review count placeholder, prefill best-effort, "as fast as" wording) → Task 5 step 3 + PR body + global constraints ✓

**Placeholder scan:** `REVIEW_RATING`/`REVIEW_COUNT` are deliberate, documented placeholders. The review-quotes step allows a `TODO` comment only as a fallback when real review data cannot be reused — acceptable and flagged. No other placeholders.

**Type consistency:** `buildConsultUrl(fields: { name?; email?; phone? })` — defined Task 2 step 1, consumed Task 2 step 2. `LeadForm` props `{ variant?; heading?; sublabel? }` — consistent. `SchedulerEmbed({ id? })`, `CtaBand` props, `TrustItem` type — all consistent between definition and use. `window.gtag` declared in each client component that uses it (TS merges the ambient declarations).
