# 10 Day Kitchens — Site-Wide Restyle Plan
*Benchmark: the approved homepage (`src/components/home.tsx` + `src/app/page.tsx`). PM: Fable 5. Status: awaiting approval — no implementation started.*

---

## 1. Design system as it exists in code (audited, not assumed)

### Color tokens — `src/app/globals.css` `@theme` block
| Token | Value | Role |
|---|---|---|
| `--color-brand` | `#5DBB46` | CTAs, progress rules, small accents ONLY |
| `--color-brand-dark` / `-light` / `-tint` | `#3A8A2E` / `#8FD47E` / `#ECEBE8` | hover, on-photo text, tint |
| `--color-ink` / `-soft` / `-muted` | `#2B2723` / `#4A443D` / `#8A8A86` | text hierarchy |
| `--color-cream` / `-sand` / `-paper` | `#FAFAF8` / `#F2F0EA` / `#FFFEFA` | surfaces |
| `--color-line` | `#DDD8D0` | hairline rules/borders |
| `--color-forest` (+`-soft`,`-line`) | `#211E1A` … | dark sections |

**Rule:** pages must use Tailwind token classes (`text-ink`, `bg-cream`, `border-line`…). Raw hex in JSX is a defect. Current audit found **72 legacy hex occurrences across 10 page files**.

### Typography — `src/app/layout.tsx` (next/font) + `@theme`
- **Cormorant Garamond** (`--font-display`, weights 300–700 + italic) — all display headings. Benchmark h1: fixed sizes `text-[2.4rem] sm:text-[2.9rem] lg:text-[3.25rem]`, `font-bold`, `leading-[1.06]`, `tracking-[-0.022em]`, italic accent line in `text-brand-dark font-semibold`. Section h2 (via `SectionHeader`): `clamp(1.85rem,3.1vw,3rem)`, `font-medium`.
- **Manrope** (`--font-sans`) — body/UI. Body: 15.5–16px, `leading-relaxed`, `text-ink-soft` (or `/70–/85`).
- **Barlow Condensed** (`--font-condensed`) — uppercase eyebrows: 11–13px, `font-bold`, `tracking-[0.24em–0.28em]`, `text-brand` (light bg) or `text-brand-dark` (glass).
- **No viewport-scaling (`vw`) font sizes on heroes** — fixed breakpoint sizes are the standard (13"→30" consistency decision).

### Layout rhythm
- Container: `CONTAINER = "mx-auto w-full max-w-[1220px] px-5 sm:px-8 lg:px-10"`
- Section padding: `SECTION = "py-12 sm:py-16 lg:py-20"` (kitchen-remodel uses a taller variant — normalize to one)
- Hairline `border-line` separators; asymmetric heading/content layouts; rounded-2xl/3xl only on glass surfaces, sharp edges elsewhere.

### Component & motion patterns (benchmark vocabulary — reuse, don't invent)
| Pattern | Where defined | Notes |
|---|---|---|
| `FadeIn` (whileInView fade+16px rise, 0.55s, ease `[0.22,1,0.36,1]`) | `home.tsx` (local) | **needs extraction to shared** |
| `SectionHeader` (Label + display h2 + body) | `home.tsx` (local) | **needs extraction** |
| `HeadingReveal` (SplitText masked line reveal) | `components/motion/HeadingReveal.tsx` | shared already |
| Liquid-glass card | `home.tsx` hero | `rounded-3xl border-white/55 bg-white/30 backdrop-blur-md` + radial white glow behind + top-edge highlight |
| Glass trust band | `home.tsx` hero | `divide-x divide-white/40 rounded-2xl bg-white/25 backdrop-blur-md` |
| Buttons | `globals.css` `.btn`, `.btn-solid`, `.btn-ghost` | hover = **lift** (`-translate-y-0.5` + shadow bloom), never scale-up |
| `card-hover` | `globals.css` | −4px lift + shadow |
| Scroll-overlap | `page.tsx` + hero | sticky hero in 195svh track; card+band fade 0–420px; photo-solo beat w/ scroll-owned crossfade at 440px; content panel `rounded-t-[1.75rem] bg-cream z-10` rides over |
| Route transitions | `app/template.tsx` | 400ms fade+rise, already global |
| Reduced motion | `useReducedMotion` hook | every animation must gate on it |
| Motion stack | **framer-motion is primary**; GSAP only for SplitText/DrawSVG/ScrollTrigger pins | do not add new GSAP where framer patterns exist |

### Reusable components pages SHOULD use but don't
`FadeIn`/`SectionHeader` (locked in home.tsx), `HeadingReveal`, `.btn` classes, token classes. Also **dead/duplicate components to resolve**: `HeroSection.tsx`, `BeforeAfterSection.tsx`, `ProcessSection.tsx`, `ServicesSection.tsx`, `GalleryStrip.tsx`, `CtaBand.tsx`, `PortfolioGrid.tsx`, `ContactSection.tsx`, `motion/ParallaxImage.tsx` vs `lib/motion.tsx` ParallaxImage (two implementations), `components/motion/Reveal.tsx` vs `FadeIn` (two reveal systems). `TestimonialsSection.tsx` used only by /appointments; `DayByDayTimeline.tsx`/`MasonryGallery.tsx` used only by /kitchen-remodel.

---

## 2. Page-by-page audit

| Page | Current state | Gap vs benchmark | Verdict | Priority |
|---|---|---|---|---|
| `/` | Benchmark | — | — | — |
| `/kitchen-remodel` | Newest interior page: uses CONTAINER/SECTION, token-aware, good metadata | 12 hex literals; old `DayByDayTimeline` (stale spine design, pending rebuild); MasonryGallery lint bug fixed; hero not glass pattern | **Restyle (light)** | P1 |
| `/bathroom-remodel` | Mid-era | 6 hex; no glass hero; mixed reveals | **Restyle** | P1 |
| `/10businessdaykitchenprogram` | Mid-era | 3 hex; signature program page deserves timeline set piece | **Restyle + timeline** | P1 |
| `/about` | Old era: `#1C1C1C` dark hero, inline style objects, fixed `px-16`, raw `<img>` | Full visual era mismatch | **Rebuild sections** | P2 |
| `/portfolio` | Old era | 6 hex; cards not benchmark `card-hover`; captions missing city tags | **Restyle** | P2 |
| `/faq` | Old era | 5 hex; needs editorial accordion + FAQPage JSON-LD later | **Restyle** | P2 |
| `/financing` | Old era | 7 hex | **Restyle** | P2 |
| `/contact` | Old era, 10 hex, HoneyBook embed | Restyle around widget — **do not touch HoneyBook internals** | **Restyle (careful)** | P3 |
| `/appointments` | Old era, 6 hex, uses orphan TestimonialsSection | Merge-or-restyle question: near-duplicate of /contact | **Restyle + consolidation decision** | P3 |
| `/blog` | Old era, 6 hex, placeholder content | Restyle shell only | P3 |
| `/collections` | Custom GSAP editorial page, own aesthetic | Closest to benchmark spirit; align tokens/buttons only | **Restyle (light)** | P3 |

### New pages needed (do not exist)
| Page | Purpose | Status |
|---|---|---|
| `/service-area` | Hub linking all city pages (SEO master plan Phase 2) | Spec exists in master plan — build |
| `/kitchen-remodel/[city]` ×12 Tier 1 | City landing system (Lacey, Olympia, Tumwater, DuPont, Lakewood, University Place, Tacoma, Fife, Puyallup, Gig Harbor, Federal Way, Chehalis) | Spec + 301 map exist — build after restyle phases |
| **Landing page(s) — NEEDS CONFIRMATION** | Bennett: is "landing page" (a) the city SEO pages above, or (b) a paid-ads/campaign lander (Google LSA/Meta)? Structure differs completely (ad landers: no nav, single CTA, form above fold) | **Blocked on answer** |
| **Bathroom Upgrade page — NEEDS CONFIRMATION** | Homepage card "Bathroom Upgrade" currently links to /bathroom-remodel; dedicated page or intentional? | **Blocked on answer** |

---

## 3. Phased task list

**Global acceptance criteria (every task):** zero raw hex in JSX (token classes only); Cormorant/Manrope/Barlow only; `FadeIn`/`HeadingReveal` for reveals (no new animation vocab); buttons via `.btn` classes; `next/image` everywhere; reduced-motion safe; `npm run check` clean; composition identical at 1280/1920/2560; mobile clean at 375px.

### Phase 0 — Shared foundation (blocks everything)
| # | Task | Owner | Why | Acceptance |
|---|---|---|---|---|
| 0.1 | Extract `FadeIn`, `SectionHeader`, `Label`, `CONTAINER`, `SECTION` from home.tsx → `src/components/shared.tsx`; re-import in home.tsx unchanged | **Fable 5** | Touches the benchmark file every page depends on | Homepage pixel-identical after refactor; check passes |
| 0.2 | Build `InteriorHero` shared component: shorter (60–70svh) glass-card-on-photo hero for interior pages (photo, eyebrow, display h1, optional body/CTA), same veil/glow recipe as homepage | **Fable 5** | New shared pattern = design judgment | Used by ≥1 pilot page; matches homepage glass recipe; fixed font sizes |
| 0.3 | Dead-component purge: delete `HeroSection`, `BeforeAfterSection` (old), `ProcessSection`, `ServicesSection`, `GalleryStrip`, `CtaBand`, `PortfolioGrid`, `ContactSection`, duplicate `ParallaxImage`; decide `Reveal` vs `FadeIn` (keep FadeIn) | **Fable 5 review, Codex execute** | Deletion list needs judgment; deletion itself mechanical | No unused component files; check passes; no page imports removed items |
| 0.4 | Normalize SECTION spacing constant across pages (one value) | Codex | Literal find/replace | All pages import shared SECTION |

### Phase 1 — Service pages (revenue pages first)
| # | Task | Owner | Why | Acceptance |
|---|---|---|---|---|
| 1.1 | **Pilot:** restyle `/bathroom-remodel` — InteriorHero, token sweep (6 hex), FadeIn reveals, `.btn` buttons, `card-hover` cards | Codex | Well-specified pattern application; pilot calibrates all later specs | Global criteria + Fable 5 screenshot review before Phase 1 continues |
| 1.2 | Restyle `/kitchen-remodel` — token sweep (12 hex), InteriorHero, keep content/metadata | Codex | Structure already good | Global criteria |
| 1.3 | Rebuild `DayByDayTimeline` to benchmark motion language (ScrollTrigger-pinned days 1–10, green progress rule, oversized Barlow numerals, stacked fallback) — used by /kitchen-remodel + /10businessdaykitchenprogram | **Fable 5** | Signature shared component, pinning across breakpoints is high-risk | Pins desktop only; reduced-motion/mobile fallback; used on both pages |
| 1.4 | Restyle `/10businessdaykitchenprogram` incl. new timeline placement | Codex | Pattern application after 1.3 lands | Global criteria |

### Phase 2 — Trust pages
| # | Task | Owner | Why | Acceptance |
|---|---|---|---|---|
| 2.1 | Rebuild `/about` sections (dark hero → InteriorHero; inline styles → tokens; stats → CountUp row; values → editorial two-column) | Codex (tight spec) | Big but fully specified by benchmark patterns | Global criteria; no inline `style` objects for type |
| 2.2 | Restyle `/portfolio` (+ every image captioned "scope, City — 10 business days" where known) | Codex | Mechanical + caption data provided | Global criteria; captions on all known projects |
| 2.3 | Restyle `/faq` as editorial accordion (content in HTML, not JS-gated) | Codex | Pattern application | Global criteria; content visible in raw HTML |
| 2.4 | Restyle `/financing` | Codex | Mechanical | Global criteria |

### Phase 3 — Conversion + remaining
| # | Task | Owner | Why | Acceptance |
|---|---|---|---|---|
| 3.1 | Restyle `/contact` around HoneyBook embed | Codex, **Fable 5/human review** | Lead capture = revenue-critical; embed fragile | Test submission reaches HoneyBook; global criteria |
| 3.2 | Decide /appointments vs /contact (merge w/ 301 or differentiate), then restyle | **Fable 5 decision**, Codex execute | Information-architecture call | One clear conversion path; no near-duplicate pages |
| 3.3 | Restyle `/blog` shell + `/collections` token/button alignment | Codex | Light touch | Global criteria |

### Phase 4 — New pages
| # | Task | Owner | Why | Acceptance |
|---|---|---|---|---|
| 4.1 | `/service-area` hub + `City` data model + `/kitchen-remodel/[city]` template (per master-plan spec: answer-first intro, neighborhoods, local context, 5 FAQs, Service/FAQPage/Breadcrumb JSON-LD, nearby-cities links) | **Fable 5** architecture + template; Codex wires cities | Template built once from shared components = born in new design | Pilot Tacoma renders; JSON-LD validates; copy in raw HTML |
| 4.2 | City copy ×12 | Sonnet (per master-plan prompt), metas by **Haiku** | Content, no design judgment | Unique per city; no cross-page duplicate sentences |
| 4.3 | Ad landing page(s) | **BLOCKED — needs Bennett's confirmation** of traffic source + offer | Structure depends on channel | — |

### Phase 5 — Content & metadata sweep
| # | Task | Owner |
|---|---|---|
| 5.1 | Unique meta title/description for every route (several pages missing/weak) | **Haiku** |
| 5.2 | Alt-text audit on all images | **Haiku** |
| 5.3 | Copy polish pass on restyled pages (voice: confident, plainspoken, specific) | **Haiku**, Fable 5 spot-check |

### Phase 6 — QA gate (before any deploy)
Fable 5 + human: screenshot walkthrough of all routes at 375/1280/1920/2560; reduced-motion pass; keyboard nav; Lighthouse ≥95/100 on 3 representative pages; HoneyBook end-to-end test lead; `npm run check` clean.

---

## 4. Do this first (today)
1. **Confirm the two blockers** (Bennett): what "landing page" means (ad lander vs city pages), and whether Bathroom Upgrade gets its own page. Unblocks Phase 4 planning.
2. **Task 0.1 — extract the shared kit** (Fable 5). Every downstream Codex task imports from it; doing this first prevents 10 pages of copy-pasted local duplicates.
3. **Task 0.2 — InteriorHero** (Fable 5). It's the visual signature every interior page leads with.
4. **Task 1.1 — bathroom-remodel pilot** (Codex). One page proves the spec quality before mass delegation.
5. **Task 0.3 — dead-component purge.** Cheap, removes the trap of Codex "reusing" stale components.
