# 10 Day Kitchens — $50k Premium Redesign Plan

**Date:** 2026-07-01
**Base branch:** `worktree-premium-redesign` (the built 11-page site — NOT the scaffold)
**Hard constraints:** Keep ALL existing content and copy verbatim. Brand colors: black, white, green (`#5DBB46`) to match the logo. Clean, high-end, motion-rich.

---

## 1. Design Direction

**Chosen direction: "Cinematic Editorial"** — alternating deep-black and warm-white full-bleed sections, oversized Playfair Display headlines, photography treated as the hero asset, green used only as the ignition color (eyebrows, CTAs, hover states, progress lines — never as a background wash).

Alternatives considered:
- *Light-first (current sage)* — least work, but sage reads "friendly local contractor," not "$50k custom."
- *Full dark-mode luxury* — photos pop, but an all-black remodeling site suppresses trust/conversion for homeowners. Rejected.
- *Cinematic alternating (chosen)* — black anchors the brand, white keeps it clean and readable, and the section-to-section contrast creates natural scroll rhythm.

### Color rebalance (globals.css)
- `--color-ink` `#111111` → promoted from text-only to **section background** role (`--color-black-section: #0E0E0E`, with `#1C1C1C` charcoal cards on it).
- Sage (`#F7FAF5`) retired as global background → replaced by `--color-warm-white: #FAFAF8` for light sections.
- Green `#5DBB46` unchanged; add `--color-green-soft: rgba(93,187,70,0.12)` for tints on dark.
- On-dark text tokens: `#F5F5F3` primary, `rgba(245,245,243,0.64)` muted.

### Typography scale
- Display: Playfair Display, tighten to `clamp(2.75rem, 6vw, 5.5rem)` for h1, `-0.03em` tracking. Italic Playfair for one accent word per headline (e.g. "*10 Days*").
- Body: Manrope unchanged. Eyebrow style kept (green, 0.18em tracking, uppercase).
- New utility: `.display-outline` — transparent fill + 1px stroke headline for the marquee/CTA band.

---

## 2. Motion System (site-wide rules)

One system, applied everywhere — this is what makes it feel expensive:

- **Easing:** existing `ease = [0.22, 1, 0.36, 1]` for entrances; `[0.76, 0, 0.24, 1]` for exits/transitions. No other curves.
- **Durations:** 0.6–0.9s entrances, 0.4s exits, 1.2s+ only for scroll-linked effects.
- **Smooth scroll:** add Lenis (`lenis` package), synced to GSAP ScrollTrigger. Disabled under `prefers-reduced-motion` (hook already exists).
- **Page transitions:** Next.js `template.tsx` + Framer Motion — outgoing page fades/slides up 20px, incoming content mask-reveals; a thin green progress line sweeps across the top during route change. ~0.5s total, never blocking.
- **Scroll reveals:** existing `Reveal`/`MaskLine`/`stagger` primitives reused everywhere; images get a `clip-path: inset()` wipe reveal (new `ImageReveal` component) instead of plain fade.
- **Micro-interactions:** magnetic CTA buttons (subtle 4–6px pull), link underlines that draw left→right, cards lift 4px + image scales 1.04 on hover, custom "View →" cursor badge over portfolio items (desktop only).
- **Reduced motion:** every effect goes through the existing `useReducedMotion` / `MotionConfig` path — static but complete layout.

---

## 3. Homepage — Section by Section

Order stays the same as current (`HeroSection → ServicesSection → GalleryStrip → CtaBand → PortfolioGrid → ProcessSection → TestimonialsSection → BeforeAfterSection → ContactSection`). All copy unchanged.

### 3.1 Navbar (frame)
- Transparent over hero → frosted-glass white bar (blur + 90% opacity) after 80px scroll, with a slide-down entrance. Hides on scroll-down, returns on scroll-up.
- Logo swaps light/dark variant per section context. Links: draw-in underline hover in green. CTA button: solid green, magnetic.
- Mobile: full-screen black overlay menu, links stagger in with MaskLine, green index numbers (01–08).

### 3.2 Hero — full-bleed cinematic (BLACK)
- Full-viewport kitchen photo (`hero-bg.jpg`) with slow Ken Burns scale (1.0→1.08 over 12s) + black gradient scrim from bottom-left.
- Existing MaskLine headline treatment kept ("Your Dream / Kitchen & Bath / **Done in 10 Days.**" — last line green, italic Playfair).
- Guarantee badge: pulsing green dot kept. CTA: magnetic green button + ghost white secondary ("View Our Work").
- Trust stats (35+ years, 5-year warranty, etc.) move to a slim bottom strip inside the hero, CountUp on load, hairline dividers that draw in.
- Scroll cue: thin vertical line that animates downward on loop.

### 3.3 Services (WHITE)
- Two oversized editorial cards (Kitchen / Bathroom) — 60/40 asymmetric split that alternates. Each: full-card photo with ImageReveal wipe, Playfair title, copy unchanged, "Explore →" link with draw underline.
- Hover: photo scales 1.05, green tint overlay fades in at 10%, arrow translates.
- Enters with staggered rise; section eyebrow + headline use MaskLine.

### 3.4 Gallery Strip → Horizontal Scroll Gallery (BLACK)
- Upgrade the marquee to a GSAP ScrollTrigger **pinned horizontal scroll**: section pins, vertical scroll drives the film-strip of gallery images sideways. Images at varying heights (editorial rhythm), each with a small white caption.
- Progress: thin green line under the strip fills as you traverse. Mobile fallback: native swipe carousel (no pin).

### 3.5 CTA Band (GREEN — the one green moment)
- Full-bleed green band with the existing CTA copy, oversized outline-text marquee ("Free Consultation · 10 Business Days ·") drifting slowly behind solid black headline text. Black button on green (logo inversion).

### 3.6 Portfolio Grid (WHITE)
- Masonry-style 2/3-column grid, staggered vertical offsets (middle column starts 80px lower — scroll-parallax between columns via GSAP).
- Cards: ImageReveal on enter; hover = scale + charcoal gradient + project name rises in; custom cursor "View" badge on desktop.

### 3.7 10-Day Process Timeline (BLACK — signature section)
- The differentiator gets the flagship treatment: a vertical **SVG line that draws itself** down the section as you scroll (stroke-dashoffset linked to ScrollTrigger), day markers ignite green as the line passes, day cards alternate left/right and rise in.
- Day number oversized in outline Playfair behind each card. Existing DayByDayTimeline copy reused verbatim.

### 3.8 Testimonials (WHITE)
- Large-format single testimonial: oversized Playfair quote with word-level stagger reveal, giant green quotation mark watermark. Auto-advance crossfade every 7s + manual arrows; thin progress ring on the active dot.

### 3.9 Before/After (BLACK)
- Existing slider upgraded: spring-physics drag handle (green circle, white arrows), "BEFORE/AFTER" labels that fade based on handle position, handle nudges 10% on first view to teach interaction.

### 3.10 Contact + Footer (BLACK, continuous)
- Contact: split layout — left, Playfair headline + contact details with icon hover states; right, the form (HoneyBook widget kept) on a charcoal card with green focus rings, labels that float on focus.
- Footer: oversized wordmark ("10 DAY KITCHENS") in outline type spanning full width, revealed with MaskLine on scroll; link columns stagger in; green top hairline draws across; back-to-top magnetic button.

---

## 4. Interior Pages (shared system, then specifics)

All 10 interior pages get: page transition, a consistent **compact black hero** (breadcrumb eyebrow, MaskLine headline, optional full-bleed image with scrim), and Reveal-driven sections. Specific upgrades:

- **kitchen-remodel / bathroom-remodel:** hero image parallax; feature lists become alternating image/text bands with ImageReveal; sticky "Get a Quote" side CTA on desktop.
- **10businessdaykitchenprogram:** reuse the flagship timeline component full-page.
- **collections / portfolio:** filterable grid with FLIP layout animation (Framer Motion `layout` prop) when filters change.
- **about:** team/story with scroll-triggered image reveals; stats CountUp band.
- **financing / faq:** FAQ accordions with smooth height spring + rotating chevron; green active state.
- **contact / appointments:** match homepage contact treatment.
- **blog:** editorial card list, hover lift, large serif titles.

---

## 5. Implementation Phases

Work happens on a branch cut **from `worktree-premium-redesign`** (e.g. `redesign/cinematic-v2`).

1. **Phase 0 — Foundation (½ day):** cut branch; add `lenis`; rework `globals.css` tokens (dark-section palette, display scale, `.display-outline`); add `template.tsx` page transitions; build `ImageReveal`, `MagneticButton`, `DrawLine` primitives in `src/components/motion/`.
2. **Phase 1 — Frame (½ day):** Navbar (glass/hide-reveal/mobile overlay), Footer (oversized wordmark), page-transition polish.
3. **Phase 2 — Hero + flagship (1 day):** cinematic hero, 10-day SVG timeline, horizontal gallery. These three carry the "$50k" impression.
4. **Phase 3 — Remaining home sections (1 day):** services, CTA band, portfolio, testimonials, before/after, contact.
5. **Phase 4 — Interior pages (1 day):** shared hero/transition rollout, page-specific upgrades above.
6. **Phase 5 — Polish + QA (½ day):** convert `<img>` → `next/image` with priority on LCP hero; verify reduced-motion path on every section; mobile pass at 375px; Lighthouse ≥ 90 performance; `npm run check`; cross-check every page's copy against the original to confirm zero content drift.

## 6. Non-negotiables / guardrails
- No copy edits, no placeholder content, no removed sections.
- Green never used as large background except the single CTA band.
- Every scroll effect must degrade gracefully: reduced-motion, mobile (no pinning on touch), JS-off (content visible by default, animations are enhancements).
- Existing components refactored in place — don't fork parallel versions.
