# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Production marketing website for **10 Day Kitchens**, a kitchen and bath remodeler in Lacey, WA serving Pierce & Thurston Counties.

- Repo: `https://github.com/HRIManage/10daykitchensweb` · Main branch: `main` · Deploys from `main` on Vercel.
- Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · Framer Motion + GSAP.
- **Code-first, no CMS.** Content is hardcoded in TypeScript data modules under `src/lib/`. Do not reintroduce Sanity, GROQ, CMS schemas, or fetch helpers unless explicitly asked.
- Node `>=24` (see `.nvmrc`). `npm run dev` uses the Webpack dev server (`next dev --webpack`), not Turbopack.

## Commands

```bash
npm run dev        # Local dev server (http://localhost:3000)
npm run build      # Production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run check      # lint + typecheck + build (run before finishing / committing)
```

There is no test suite. "Verification" means `npm run typecheck` and `npm run build` pass. Lint may emit pre-existing `<img>` warnings; warnings are fine, new errors are not.

## Architecture

**Content lives in `src/lib/`, not in the page components.** Pages are thin: they import typed data and map over it. To change site copy, business facts, locations, or blog posts, edit the data module — not the JSX.

- `src/lib/site.ts` — business facts (`site`: phone, email, address, hours, license) plus `services`, `processPhases`, `testimonials`. Referenced across nearly every page and in metadata.
- `src/lib/cities.ts` — the `cities: City[]` array that drives **all location landing pages**. Each entry has `intro`, `neighborhoods`, `localContext`, `faqs`, metadata, `heroImage`, and `nearbySlugs`. `getCity(slug)` and `getPublishedCities()` are the accessors.
- `src/lib/blog.ts` — `blogPosts: BlogPost[]` and `getBlogPost(slug)`. Post bodies are arrays of paragraph strings.
- `src/lib/seo.ts` — JSON-LD schema factories (`createLocalBusinessSchema`, `createServiceSchema`). Pages inject structured data via `<script type="application/ld+json" dangerouslySetInnerHTML={...}>`; city pages build Service/FAQPage/BreadcrumbList schema inline.
- `src/lib/motion.tsx` — shared motion utilities (e.g. `CountUp`). `src/lib/honeybook.ts` — HoneyBook booking-widget config. `src/lib/utils.ts` — `cn()` class merge.

**Location pages are dynamic and statically generated.** Route: `src/app/kitchen-remodel/[city]/page.tsx` → URLs like `/kitchen-remodel/tacoma`. `generateStaticParams()` builds one page per published city from `cities.ts`; `generateMetadata()` and the page read `getCity(slug)` and call `notFound()` for unknown slugs. **To add a location, add an entry to the `cities` array in `src/lib/cities.ts`** — do not create a new file or route. (Note: there is no `locationsBySlug` map or `src/app/locations/` directory.)

**Homepage composition.** `src/app/page.tsx` imports named section components from the `src/components/home.tsx` barrel (`EditorialHero`, `ServicesEditorial`, `TrustedPartners`, `StatementSection`, `RecentProjectsHover`, `ProcessEditorial`, `TransformationSection`, `CustomerReviews`, `ClosingCTA`) and stacks them. Several of these (e.g. `TrustedPartners`, `TransformationSection`) are reused on city pages.

**Global shell.** `src/app/layout.tsx` loads the three Google fonts, sets default/OpenGraph metadata, and wraps every page with `<Navbar>`, `<ScrollRevealProvider>`, `{children}`, `<Footer>`. `src/app/template.tsx` runs a per-navigation GSAP fade+rise (App Router has no native exit animations), gated by the reduced-motion hook.

**Design tokens (`src/app/globals.css`).** Tailwind v4 `@theme inline` defines the palette and fonts as tokens — use the utility classes, not raw hex:
- Colors: `brand` / `brand-dark` / `brand-light` (green), `ink` / `ink-soft` / `ink-muted` (text), `cream` / `paper` / `sand` (surfaces), `line` (borders), `forest*` (dark sections).
- Fonts: `font-sans` (Manrope, body), `font-display` (Cormorant Garamond, headings), `font-condensed` (Barlow Condensed, uppercase eyebrows).
- `body` uses `overflow-x: clip` (not `hidden`) intentionally, so `position: sticky` keeps working — don't change it.

**Shared UI primitives — reuse, don't redeclare per page.**
- `src/components/shared.tsx`: `FadeIn` (standard scroll reveal), `Label` (eyebrow), `SectionHeader` (eyebrow + display heading + body), and `ease` (the single easing curve).
- `src/components/layout.ts`: `CONTAINER` (`site-container` class) and `SECTION` spacing. Safe to import from Server Components.
- `src/components/motion/`: `useReducedMotion` hook plus reveal helpers; respect reduced motion in any new animation.

**Server vs Client.** Pages/layouts are Server Components by default. Files with animation, state, or hooks start with `"use client"` (e.g. `home.tsx`, `template.tsx`, `shared.tsx`). Keep data modules (`layout.ts`, `site.ts`, etc.) client-safe so both worlds can import them.

**Route inventory.** Service pages (`kitchen-remodel`, `bathroom-remodel`, `fast-bath`, `financing`), `portfolio`, `about`, `contact`, `faq`, `appointments`, `collections`, `10businessdaykitchenprogram`, blog under both `blog/[slug]` and `resources/blog/[slug]`, plus the `kitchen-remodel/[city]` location pages. Images and logos live in `public/images/`.

## Editing Workflow

1. Read the target page/component/data module before editing.
2. Prefer editing `src/lib/` data over hardcoding copy in JSX; reuse existing components, tokens, and spacing.
3. Keep changes scoped — no broad refactors while doing content or design edits. Don't introduce new dependencies unless asked.
4. For visual changes, check desktop and mobile.
5. Run `npm run typecheck` and `npm run build` before finishing; mention any command you couldn't run.

## Code Style

- TypeScript strict; avoid `any`. PascalCase components, camelCase values, named exports for reusable pieces.
- Use existing Tailwind tokens/utility classes and real imagery from `public/images/` (no placeholders).
- Keep copy clear, local, and conversion-focused.

## Git & Safety

- Before committing: `git status`, then `npm run check`. Commit only files related to the request.
- Never run destructive git (`reset --hard`, `clean`, force-push) or revert user changes unless explicitly asked.
- Never commit `.env*`, `.next/`, `node_modules/`, or generated output.
- If a request is ambiguous, make the smallest reasonable change and state the assumption.

> Windows note: some `public/images/` filenames are very long. If a clone or checkout fails with "Filename too long", enable long paths for the operation: `git -c core.longpaths=true clone …`.

---

# 10 Day Kitchens — Content Editing Guide

This section is specifically for handling requests from a non-technical team member making content updates.

## Business context

Kitchen & bath remodeling company, Lacey/Olympia/Tacoma WA (Pierce & Thurston Counties). Brand promise: full remodel in 10 business days. Brand colors: green `#5DBB46`, fonts Manrope (headings) / Barlow (body).

## Site sections (as of last check)

- Hero / homepage intro
- "What Sets Us Apart"
- 5-step process: In-home visit → Rendering & contract → Materials ordered → Crew on site → Final walkthrough
- Testimonials
- Portfolio / project gallery
- Contact / consultation CTA
- Service area list (Lacey, Olympia, Tacoma, Chehalis, + surrounding Pierce/Thurston County cities)
- There is also a location landing page system for individual city pages — confirm with Ben before adding a new one, since these follow SEO conventions.

## Rules for content-only edits

1. Make the edit locally, then show it to the user running on localhost (`npm run dev` → http://localhost:3000). Only after the user explicitly approves what they see, commit and push directly to `main` (which auto-deploys to production on Vercel). No feature branch or PR is required unless the user asks for one.
2. Only touch content — visible text, image files/references, phone numbers, addresses, testimonial text. Do not modify `package.json`, config files, anything in a `lib/`, `api/`, or `middleware` folder, or anything that looks like a build/deploy script.
3. New photos: save into the images folder `/init` identifies (likely under `public/images/` or similar) using descriptive lowercase-hyphenated filenames (e.g. `lacey-kitchen-remodel-03.jpg`), then reference the new file in the relevant gallery/section component. Keep image file sizes reasonable — compress before adding if a photo is over ~2MB.
4. Phone number / address: these are likely repeated in a header and footer component, and possibly in layout files, JSON-LD/schema markup, and a Contact section. Update every instance you find, and search the codebase for the old number/address string to make sure nothing was missed.
5. After any change, tell the user in plain English what changed and show it to them on the localhost preview (http://localhost:3000). Don't reference git, branches, or commits in that summary.
6. If a request is ambiguous ("update the phone number" without specifying which one, when there may be a general line and a specific location's line), ask which one before editing.

## What NOT to do

- Don't change layout, spacing, colors, or fonts unless explicitly asked.
- Don't add or remove entire sections/pages without confirming with Ben first.
- Don't touch anything related to the HoneyBook embed (PID `698386a789407f0007b175e0`) or SEO/schema markup unless specifically asked.
