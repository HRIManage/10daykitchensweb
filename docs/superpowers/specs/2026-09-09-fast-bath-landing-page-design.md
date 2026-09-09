# Fast Bath Conversion Landing Page — Design

**Date:** 2026-09-09
**Route:** `/fast-bath` (rebuild in place)
**Reference:** rebath.com's direct-response layout, adapted to the 10 Day Kitchens premium/editorial brand.

## Goal

Turn `/fast-bath` from a content page (all CTAs link out to `/contact`) into a
conversion-optimized landing page that captures leads on the page itself, while
keeping the site's restrained visual language and staying indexable as a real
service page.

Primary conversion action: **book a free in-home consultation** via the existing
HoneyBook scheduler (`HOME_CONSULT_URL` in `src/lib/honeybook.ts`).

## Non-goals

- No new backend, email service, or CRM integration. HoneyBook remains the
  capture system.
- No redesign of `/bathroom-remodel` or `/kitchen-remodel` now — but the new
  conversion components are built to be reused there later.
- Not a throwaway PPC landing page: stays in the sitemap, keeps canonical and
  `Service` schema, keeps real content.
- No contrast/brand-color sweep of the rest of the site (W11) — but this page's
  own new markup uses AA-passing colors.

## Approach

Approach **C** from brainstorming: build the conversion machinery as reusable
components, then refit the existing strong content sections into that shell.
Keep: the real project gallery, the 3-step process, the Fast-Bath-vs-full-remodel
comparison, reviews, FAQ, service area. Rewrite: the hero, section order, and CTA
treatment.

## Page structure (top → bottom)

| # | Section | Source |
|---|---------|--------|
| — | Sticky mobile CTA bar | new — `StickyCtaBar` |
| 1 | Hero: headline + trust row + inline lead form + before/after image | rewrite; `LeadForm` is new |
| 2 | Trust bar (4 items) | new — `TrustBar` |
| 3 | Rating stat + 2–3 review quotes | new wrapper around existing review data |
| 4 | What Fast Bath covers (scope) | keep existing content, tighten |
| 5 | 3-step process (Free consult → we plan & stage materials → install) | reuse existing process copy, re-present as 3 icon steps |
| 6 | Before/after gallery | keep — reuse `FastBathBeforeAfterSlider` + project data |
| 7 | CTA band → scrolls to scheduler | new — `CtaBand` |
| 8 | Fast Bath vs. full remodel comparison | keep existing |
| 9 | Financing strip | new — `FinancingStrip` |
| 10 | "Book your visit" — embedded HoneyBook scheduler | new — `SchedulerEmbed` |
| 11 | FAQ (expanded) + `FAQPage` schema | keep + expand |
| 12 | Service area (light) + final CTA | keep existing + `PageCta` or final `CtaBand` |

Rationale for order: proof (rating, scope, process, gallery) comes before the
qualifying comparison; the live scheduler sits near the bottom as the second
capture point after the visitor has the context to book.

## New components — `src/components/landing/`

Each is small, single-purpose, and prop-driven so the other service pages can
reuse it.

### `LeadForm.tsx` (client)
- **Purpose:** hero lead form; the on-page capture entry point.
- **Fields:** `firstName`, `lastName`, `phone`, `email`, `zip` — all required.
- **Validation:** inline, on blur + on submit. Email regex; phone reduced to
  digits, require 10. Show one error line per field, no layout shift.
- **Submit behavior:**
  1. `window.gtag?.("event", "generate_lead", { form: "fast-bath-hero" })`
     (no-op until GA4 exists).
  2. Redirect to `HOME_CONSULT_URL` with query params appended:
     `?full_name=<first last>&email=<email>&phone=<digits>` (best-effort
     prefill; HoneyBook returns 200 with unknown params, does not reject).
  3. While redirecting, show a "Taking you to the calendar…" state.
- **Props:** `variant?: "hero" | "section"`, `heading?: string`,
  `sublabel?: string` (so a second instance can be dropped elsewhere later).
- **Depends on:** `HOME_CONSULT_URL`; nothing else.
- **A11y:** real `<label>`s, `aria-invalid`, `aria-describedby` for errors,
  visible focus ring, `autocomplete` attributes (`given-name`, `family-name`,
  `tel`, `email`, `postal-code`).

### `SchedulerEmbed.tsx` (client)
- **Purpose:** render the HoneyBook in-home consult scheduler inline so the
  calendar is visible without a click.
- **Behavior:** lazy via `IntersectionObserver` — render a skeleton card until
  the section is ~600px from the viewport, then swap in the `<iframe>` and keep
  it. No click required (matches the "calendar visible without a click" goal);
  keeps the 3rd-party iframe off the initial load so LCP stays clean.
- **iframe:** `src={HOME_CONSULT_URL}`, `title="Book a free in-home consultation"`,
  `loading="lazy"`, `min-height: 640px` (mobile) / `720px` (desktop),
  width 100%, `border: 0`. Scheduler has no `X-Frame-Options` / CSP
  `frame-ancestors`, so it embeds. Container has a bordered card style matching
  the site.
- **Props:** `id` (for anchor links from CTA bands).
- **Fallback:** below the iframe, a plain link "Trouble loading? Open the
  scheduler in a new tab" → `HOME_CONSULT_URL`.

### `StickyCtaBar.tsx` (client)
- **Purpose:** persistent mobile conversion bar.
- **Behavior:** `position: fixed; bottom: 0`, `lg:hidden`. Hidden until the user
  has scrolled past the hero (`IntersectionObserver` on a sentinel at the end of
  the hero, or `scrollY > 600`). Respects `prefers-reduced-motion` (no slide, just
  toggle). Adds `padding-bottom` to `<body>` on mount so it never covers the
  footer's last row — or simpler, the page's last section gets bottom padding on
  mobile.
- **Content:** two equal buttons — `Call` (`href={site.phoneHref}`, fires
  `gtag` `"contact"` event) and `Book Free Visit` (`href="#book"` → scrolls to
  `SchedulerEmbed`).
- **Props:** none (reads `site` from `@/lib/site`).

### `TrustBar.tsx` (server)
- Full-width strip. 4 items, each an icon + short label:
  Free in-home design · Premium materials · Professional installation ·
  5-year workmanship warranty. Icons from `lucide-react` (already a dep).
- **Props:** `items?: { icon; label }[]` with the above as default.

### `CtaBand.tsx` (server)
- Dark (`bg-ink` or the existing dark section token) full-width band:
  eyebrow + short headline + one button.
- **Props:** `eyebrow`, `headline`, `buttonLabel`, `href` (default `#book`).

### `FinancingStrip.tsx` (server)
- Light strip: headline "Spread the cost of your new bathroom", one sentence —
  "Monthly payment plans through GreenSky, plus 0% promotional options for
  qualifying projects." — and a link to `/financing`. Includes the same
  "not financial advice" disclaimer line already used on `/financing`.
- **Props:** none (copy is fixed; no specific APR/$ figure — none is published).

## Content / copy

- **H1:** "A new bathroom in as fast as 3 days." (phrased "as fast as", never a
  guarantee — user-confirmed claim).
- **Hero subhead:** existing Fast Bath positioning, tightened: professional
  installation, premium materials, far less disruption than a full remodel.
- **Trust row (hero):** `★ 4.9` · `Family-owned since 2004` · `Licensed & bonded` ·
  `5-year warranty`. The rating number and review count are **placeholders**
  (`REVIEW_RATING`, `REVIEW_COUNT` consts near the top of the page file) — see
  Open items.
- **Scope, process, comparison, gallery, service area:** carry over existing copy
  and data from the current `src/app/fast-bath/page.tsx` largely unchanged.
- **FAQ:** keep existing questions, add: "How is Fast Bath different from a full
  bathroom remodel?", "How much does a Fast Bath cost?" (answer: quote-only for
  now, per the bathroom-pricing decision — link to
  `/blog/bathroom-remodel-cost-south-sound`), "Do you handle permits?",
  "Is 3 days realistic?".

## SEO / schema / analytics

- Keep `alternates.canonical = https://10daykitchens.com/fast-bath`.
- Keep the existing `Service` JSON-LD; update its `description` to match the new
  H1 hook.
- Add `FAQPage` JSON-LD built from the FAQ array (same pattern as the blog
  `[slug]` page and city pages).
- Add `openGraph` with an image (`/images/fast-bath-before-after-screenshot.png`
  or a finished-bath photo) and `twitter: summary_large_image`.
- Update `<title>` / meta description to lead with the 3-day hook and "free
  in-home consultation".
- `/fast-bath` stays in `sitemap.ts` (already there).
- Analytics events (all no-op until GA4 lands): `generate_lead` on form submit,
  `contact` on sticky-bar call tap, `schedule_view` when `SchedulerEmbed`
  loads.

## Accessibility

- New markup uses `text-brand-dark` (not `text-brand`) for small labels and
  `bg-brand-dark` for solid buttons, so this page passes the WCAG AA contrast
  check that the rest of the site currently fails (W11). Not a sitewide fix.
- Form: labels, `aria-invalid`, error association, focus-visible, keyboard order.
- Sticky bar: not a focus trap; buttons are real links/buttons.
- `prefers-reduced-motion` respected for the sticky bar and any scroll animation.

## Performance

- No 3rd-party iframe on initial load — `SchedulerEmbed` lazy-loads on scroll.
- Hero image keeps `priority`; everything below stays lazy.
- No new fonts or libraries. `lucide-react`, `next/image`, `next/link` only.

## Files

**New:**
- `src/components/landing/LeadForm.tsx`
- `src/components/landing/SchedulerEmbed.tsx`
- `src/components/landing/StickyCtaBar.tsx`
- `src/components/landing/TrustBar.tsx`
- `src/components/landing/CtaBand.tsx`
- `src/components/landing/FinancingStrip.tsx`

**Modified:**
- `src/app/fast-bath/page.tsx` — rebuilt around the new components; existing
  content sections refitted.
- `src/lib/honeybook.ts` — possibly add a helper `buildConsultUrl({name, email, phone})`.

**Untouched:** every other route, `sitemap.ts`, `robots.ts`, all kitchen content.

## Open items (need the owner)

1. **Review rating + count** for the hero trust row. Default to a conservative
   real number from on-site testimonials; owner swaps in the Google Business
   Profile rating/count once that's live. Tracked as `REVIEW_RATING` /
   `REVIEW_COUNT` consts.
2. **HoneyBook prefill** — confirmed the scheduler accepts unknown query params
   without erroring; not confirmed the param names actually populate the fields.
   Acceptable either way (HoneyBook is the capture; worst case is light
   re-entry). Owner can check after deploy.
3. **"As fast as 3 days"** — owner-confirmed. Used only with "as fast as".

## Rollout

Own PR (`fast-bath-landing`), Vercel preview, owner reviews the live preview on
desktop and mobile before merge.
