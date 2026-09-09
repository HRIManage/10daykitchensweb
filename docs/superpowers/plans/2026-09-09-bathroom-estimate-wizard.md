# Bathroom Estimate Wizard — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A `/bathroom-estimate` lead-magnet wizard that collects a bathroom project's details + contact info, shows a rough dollar range, and emails the lead to `office@10daykitchens.com`.

**Architecture:** A pure pricing engine (`src/lib/estimate.ts`), a `POST` API route that recomputes the estimate and sends email via Resend, and a client wizard (`useReducer` + `sessionStorage`) composed of small step components. The page is `noindex`. No dependency on the PR #5 landing components — the schedule step embeds the HoneyBook scheduler directly.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4, `lucide-react`, `resend`. No test framework — verification is `npm run check` (ESLint + `tsc` + `next build`) plus a Node script for the pricing math and a local `next start` walkthrough.

## Global Constraints

- Branch off `main`. TypeScript strict, no `any`. Named exports for utilities; default export for React components. PascalCase components, camelCase functions.
- Tailwind tokens only: `brand` `#5dbb46`, `brand-dark` `#3a8a2e`, `brand-light` `#8fd47e`, `ink` `#2b2723`, `ink-soft` `#4a443d`, `ink-muted` `#8a8a86`, `line` `#ddd8d0`, `cream` `#fafaf8`, `sand` `#f2f0ea`, `paper` `#fffefa`, `forest` `#211e1a`. Font `font-display` = Cormorant. Use `brand-dark` (not `brand`) for controls, labels, and solid buttons so the page passes WCAG AA contrast.
- `CONTAINER` = `"site-container"`, `SECTION` = `"py-12 sm:py-16 lg:py-20"` from `@/components/layout`.
- `site` (`@/lib/site`): `site.phone`, `site.phoneHref`, `site.email`, `site.name`.
- `HOME_CONSULT_URL` from `@/lib/honeybook` — the scheduler URL (iframe-safe, no `X-Frame-Options`).
- The page must never show a raw number without the words "estimate" and (somewhere on screen) "not a quote".
- Every commit message ends with:
  `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`
- Each task ends with `rm -rf .next && npm run check` passing and one commit.

---

## File Structure

**New:**
| File | Responsibility |
|------|----------------|
| `src/lib/estimate.ts` | pricing types, constant tables, `calculateEstimate`, label maps, option arrays |
| `src/app/api/bathroom-estimate/route.ts` | `POST`: validate, recompute, email via Resend, return the result |
| `src/app/bathroom-estimate/page.tsx` | server component; `noindex` metadata; renders `<EstimateWizard />` |
| `src/components/estimate/ProgressBar.tsx` | 6-stage progress indicator |
| `src/components/estimate/OptionCard.tsx` | selectable card (single/multi) |
| `src/components/estimate/EstimateWizard.tsx` | client; state machine, `sessionStorage`, `POST`, screen routing |
| `src/components/estimate/steps/WelcomeStep.tsx` | screen 1 |
| `src/components/estimate/steps/ProjectStep.tsx` | screen 2 (size + type + upgrades + details) |
| `src/components/estimate/steps/ContactStep.tsx` | screen 3 |
| `src/components/estimate/steps/CalculatingStep.tsx` | screen 4 |
| `src/components/estimate/steps/EstimateStep.tsx` | screen 5 |
| `src/components/estimate/steps/SummaryStep.tsx` | screen 6 |
| `src/components/estimate/steps/ScheduleStep.tsx` | screen 7 (HoneyBook iframe) |
| `src/components/estimate/steps/ConfirmationStep.tsx` | screen 8 |

**Modified:**
| File | Change |
|------|--------|
| `package.json` | add `resend` |
| `.env.example` | document `RESEND_API_KEY` |
| `src/app/fast-bath/page.tsx` | add "Get an instant estimate" link to `/bathroom-estimate` in the hero area |
| `src/app/bathroom-remodel/page.tsx` | add the same link near the top |

**Untouched:** `sitemap.ts`, `robots.ts`, every other route.

---

## Task 1: Pricing engine

**Files:**
- Create: `src/lib/estimate.ts`
- Test helper: `scripts/check-estimate.mjs` (throwaway; deleted at end of task)

**Interfaces:**
- Produces (all named exports from `@/lib/estimate`):
  - Types: `BathroomSize`, `ProjectType`, `Upgrade`, `FinishLevel`, `County`, `EstimateInput`, `EstimateResult`
  - `calculateEstimate(input: EstimateInput): EstimateResult`
  - Constant tables: `PROJECT_TYPE_BASE`, `SIZE_MULTIPLIER`, `FINISH_MULTIPLIER`, `UPGRADE_COST`, `COMPLEXITY_COST`, `COUNTY_ADJUSTMENT`
  - Label maps: `SIZE_LABELS`, `PROJECT_TYPE_LABELS`, `UPGRADE_LABELS`, `FINISH_LABELS`, `COUNTY_LABELS`
  - Option arrays for rendering: `SIZE_OPTIONS`, `PROJECT_TYPE_OPTIONS`, `UPGRADE_OPTIONS`, `FINISH_OPTIONS`, `COUNTY_OPTIONS` — each `{ value, label, hint? }[]`

- [ ] **Step 1: Create `src/lib/estimate.ts`**

```ts
/**
 * Bathroom project estimate model.
 *
 * ── TUNE THESE ────────────────────────────────────────────────────────────────
 * Every number below is a rough 2026 Tacoma / Pierce County mid-market figure —
 * a licensed local remodeler, above the low-cost bath-shop tier and below
 * Greater-Seattle design-build pricing. Market basis: Tacoma bathroom remodel
 * average ~$10k–$14k (range $6k–$35k); Tacoma tub-to-shower conversions from
 * ~$5k. Adjust any value to match your real quotes — nothing else needs to change.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type BathroomSize = "powder" | "small" | "standard" | "primary" | "luxury";
export type ProjectType =
  | "refresh"
  | "tub_to_shower"
  | "shower_upgrade"
  | "vanity_counter"
  | "flooring_fixture"
  | "full_remodel";
export type Upgrade =
  | "shower"
  | "tub"
  | "vanity"
  | "countertop"
  | "flooring"
  | "toilet"
  | "lighting"
  | "exhaust_fan"
  | "paint"
  | "fixtures"
  | "storage"
  | "plumbing"
  | "glass_door"
  | "niche"
  | "bench";
export type FinishLevel = "standard" | "premium" | "luxury";
export type County = "thurston" | "pierce" | "lewis" | "other";

export type EstimateInput = {
  size: BathroomSize;
  projectType: ProjectType;
  upgrades: Upgrade[];
  finish: FinishLevel;
  county: County;
  secondFloor: boolean;
  waterDamage: boolean;
  builtBefore1980: boolean;
  ceilingToo: boolean;
  movingPlumbing: boolean;
  movingWalls: boolean;
  permitsNeeded: boolean;
};

export type EstimateResult = {
  low: number;
  high: number;
  midpoint: number;
  confidence: number;
};

export const PROJECT_TYPE_BASE: Record<ProjectType, number> = {
  refresh: 4500,
  tub_to_shower: 6500,
  shower_upgrade: 7500,
  vanity_counter: 4000,
  flooring_fixture: 4500,
  full_remodel: 13000,
};

export const SIZE_MULTIPLIER: Record<BathroomSize, number> = {
  powder: 0.75,
  small: 0.9,
  standard: 1.0,
  primary: 1.3,
  luxury: 1.6,
};

export const FINISH_MULTIPLIER: Record<FinishLevel, number> = {
  standard: 1.0,
  premium: 1.2,
  luxury: 1.45,
};

export const UPGRADE_COST: Record<Upgrade, number> = {
  shower: 3500,
  tub: 2000,
  vanity: 1800,
  countertop: 1100,
  flooring: 1400,
  toilet: 550,
  lighting: 700,
  exhaust_fan: 450,
  paint: 550,
  fixtures: 650,
  storage: 950,
  plumbing: 2000,
  glass_door: 1400,
  niche: 350,
  bench: 500,
};

export const COMPLEXITY_COST = {
  secondFloor: 900,
  waterDamage: 2000,
  ceilingToo: 1200,
  movingPlumbing: 2800,
  movingWalls: 3200,
  permitsNeeded: 700,
} as const;

/** Applied as a multiplier to the running subtotal, not a flat add. */
const OLD_HOME_MULTIPLIER = 1.06;
const CONTINGENCY_MULTIPLIER = 1.1;
const RANGE_LOW = 0.88;
const RANGE_HIGH = 1.12;

export const COUNTY_ADJUSTMENT: Record<County, number> = {
  thurston: 0,
  pierce: 200,
  lewis: -300,
  other: 400,
};

const round100 = (n: number) => Math.round(n / 100) * 100;

export function calculateEstimate(input: EstimateInput): EstimateResult {
  let subtotal = PROJECT_TYPE_BASE[input.projectType];
  subtotal *= SIZE_MULTIPLIER[input.size];
  subtotal *= FINISH_MULTIPLIER[input.finish];

  for (const upgrade of input.upgrades) {
    subtotal += UPGRADE_COST[upgrade];
  }

  if (input.secondFloor) subtotal += COMPLEXITY_COST.secondFloor;
  if (input.waterDamage) subtotal += COMPLEXITY_COST.waterDamage;
  if (input.ceilingToo) subtotal += COMPLEXITY_COST.ceilingToo;
  if (input.movingPlumbing) subtotal += COMPLEXITY_COST.movingPlumbing;
  if (input.movingWalls) subtotal += COMPLEXITY_COST.movingWalls;
  if (input.permitsNeeded) subtotal += COMPLEXITY_COST.permitsNeeded;
  if (input.builtBefore1980) subtotal *= OLD_HOME_MULTIPLIER;

  subtotal += COUNTY_ADJUSTMENT[input.county];

  const midpoint = subtotal * CONTINGENCY_MULTIPLIER;

  let confidence = 95;
  if (input.size === "luxury") confidence -= 6;
  if (input.movingPlumbing) confidence -= 5;
  if (input.movingWalls) confidence -= 5;
  if (input.waterDamage) confidence -= 5;
  if (input.builtBefore1980) confidence -= 4;
  if (input.upgrades.length >= 8) confidence -= 3;
  confidence = Math.max(60, Math.min(97, confidence));

  return {
    low: round100(midpoint * RANGE_LOW),
    high: round100(midpoint * RANGE_HIGH),
    midpoint: round100(midpoint),
    confidence,
  };
}

type Option<T extends string> = { value: T; label: string; hint?: string };

export const SIZE_LABELS: Record<BathroomSize, string> = {
  powder: "Powder bath",
  small: "Small bathroom",
  standard: "Standard bathroom",
  primary: "Primary bathroom",
  luxury: "Large luxury bath",
};
export const SIZE_OPTIONS: Option<BathroomSize>[] = [
  { value: "powder", label: "Powder bath", hint: "Up to 40 sq ft" },
  { value: "small", label: "Small bathroom", hint: "40–80 sq ft" },
  { value: "standard", label: "Standard bathroom", hint: "80–120 sq ft" },
  { value: "primary", label: "Primary bathroom", hint: "120–180 sq ft" },
  { value: "luxury", label: "Large luxury bath", hint: "180+ sq ft" },
];

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  refresh: "Simple bathroom refresh",
  tub_to_shower: "Tub-to-shower conversion",
  shower_upgrade: "Shower upgrade",
  vanity_counter: "Vanity & countertop upgrade",
  flooring_fixture: "Flooring & fixture upgrade",
  full_remodel: "Full bathroom remodel",
};
export const PROJECT_TYPE_OPTIONS: Option<ProjectType>[] = [
  { value: "refresh", label: "Simple bathroom refresh", hint: "Cosmetic updates & minor upgrades" },
  { value: "tub_to_shower", label: "Tub-to-shower conversion", hint: "Replace a tub with a walk-in shower" },
  { value: "shower_upgrade", label: "Shower upgrade", hint: "Upgrade shower, tile, or enclosure" },
  { value: "vanity_counter", label: "Vanity & countertop upgrade", hint: "New vanity or countertop" },
  { value: "flooring_fixture", label: "Flooring & fixture upgrade", hint: "New floors, fixtures, and finishes" },
  { value: "full_remodel", label: "Full bathroom remodel", hint: "Complete transformation" },
];

export const UPGRADE_LABELS: Record<Upgrade, string> = {
  shower: "Shower",
  tub: "Tub",
  vanity: "Vanity",
  countertop: "Countertop",
  flooring: "Flooring",
  toilet: "Toilet",
  lighting: "Lighting",
  exhaust_fan: "Exhaust fan",
  paint: "Paint",
  fixtures: "Fixtures",
  storage: "Storage",
  plumbing: "Plumbing updates",
  glass_door: "Glass shower door",
  niche: "Shower niche",
  bench: "Shower bench",
};
export const UPGRADE_OPTIONS: Option<Upgrade>[] = (Object.keys(UPGRADE_LABELS) as Upgrade[]).map(
  (value) => ({ value, label: UPGRADE_LABELS[value] }),
);

export const FINISH_LABELS: Record<FinishLevel, string> = {
  standard: "Standard finishes",
  premium: "Premium finishes",
  luxury: "Luxury finishes",
};
export const FINISH_OPTIONS: Option<FinishLevel>[] = [
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
  { value: "luxury", label: "Luxury" },
];

export const COUNTY_LABELS: Record<County, string> = {
  thurston: "Thurston County",
  pierce: "Pierce County",
  lewis: "Lewis County",
  other: "Somewhere else",
};
export const COUNTY_OPTIONS: Option<County>[] = (Object.keys(COUNTY_LABELS) as County[]).map(
  (value) => ({ value, label: COUNTY_LABELS[value] }),
);
```

- [ ] **Step 2: Write `scripts/check-estimate.mjs` to verify the three spec examples**

```js
import { calculateEstimate } from "../src/lib/estimate.ts";

const cases = [
  {
    name: "tub-to-shower premium + glass door + fixtures, Pierce",
    input: { size: "standard", projectType: "tub_to_shower", upgrades: ["glass_door", "fixtures"], finish: "premium", county: "pierce", secondFloor: false, waterDamage: false, builtBefore1980: false, ceilingToo: false, movingPlumbing: false, movingWalls: false, permitsNeeded: false },
    expect: [9700, 12400],
  },
  {
    name: "simple refresh, small, + paint/fixtures/toilet, Thurston",
    input: { size: "small", projectType: "refresh", upgrades: ["paint", "fixtures", "toilet"], finish: "standard", county: "thurston", secondFloor: false, waterDamage: false, builtBefore1980: false, ceilingToo: false, movingPlumbing: false, movingWalls: false, permitsNeeded: false },
    expect: [5600, 7100],
  },
  {
    name: "primary full remodel, premium, moving plumbing, pre-1980, permits, 7 upgrades",
    input: { size: "primary", projectType: "full_remodel", upgrades: ["shower", "vanity", "countertop", "flooring", "toilet", "lighting", "plumbing"], finish: "premium", county: "thurston", secondFloor: false, waterDamage: false, builtBefore1980: true, ceilingToo: false, movingPlumbing: true, movingWalls: false, permitsNeeded: true },
    expect: [35700, 45500],
  },
];

let failed = 0;
for (const c of cases) {
  const r = calculateEstimate(c.input);
  const ok = r.low === c.expect[0] && r.high === c.expect[1];
  console.log(`${ok ? "PASS" : "FAIL"}  ${c.name}  → $${r.low}–$${r.high} (conf ${r.confidence}%)  expected $${c.expect[0]}–$${c.expect[1]}`);
  if (!ok) failed++;
}
process.exit(failed ? 1 : 0);
```

- [ ] **Step 3: Run it**

Run: `node --experimental-strip-types scripts/check-estimate.mjs`
Expected: three `PASS` lines. If a case is off by rounding, adjust the `expect` values in the script to the computed output (the spec numbers were hand-computed; the code is the source of truth) — do **not** change the constants to force a match.

- [ ] **Step 4: Delete the script and verify the build**

```bash
rm scripts/check-estimate.mjs
rm -rf .next && npm run check
```
Expected: clean (`estimate.ts` has no consumers yet).

- [ ] **Step 5: Commit**

```bash
git add src/lib/estimate.ts
git commit -m "$(cat <<'EOF'
Add bathroom estimate pricing model (Tacoma mid-market)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Email API route

**Files:**
- Modify: `package.json` (add `resend`)
- Modify: `.env.example`
- Create: `src/app/api/bathroom-estimate/route.ts`

**Interfaces:**
- Consumes: `calculateEstimate`, all label maps, and the `EstimateInput` type from `@/lib/estimate`; `site` from `@/lib/site`.
- Produces: `POST /api/bathroom-estimate` → `200 { low, high, midpoint, confidence, emailed }` on success; `400 { error }` on invalid body.

- [ ] **Step 1: Add the dependency**

Run: `npm install resend`
Expected: `resend` appears in `package.json` dependencies.

- [ ] **Step 2: Document the env var in `.env.example`**

Replace the file contents with:

```
# Transactional email for the /bathroom-estimate lead form (Resend — resend.com).
# Free tier covers this. Without it, the estimator still works and shows
# estimates; it just does not email leads.
RESEND_API_KEY=re_your_key_here
```

- [ ] **Step 3: Create `src/app/api/bathroom-estimate/route.ts`**

```ts
import { NextResponse } from "next/server";
import {
  calculateEstimate,
  COUNTY_LABELS,
  FINISH_LABELS,
  PROJECT_TYPE_LABELS,
  SIZE_LABELS,
  UPGRADE_LABELS,
  type County,
  type EstimateInput,
  type FinishLevel,
  type ProjectType,
  type BathroomSize,
  type Upgrade,
} from "@/lib/estimate";
import { site } from "@/lib/site";

type Contact = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  zip: string;
  timeline: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isEstimateInput(v: unknown): v is EstimateInput {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.size === "string" &&
    o.size in SIZE_LABELS &&
    typeof o.projectType === "string" &&
    o.projectType in PROJECT_TYPE_LABELS &&
    Array.isArray(o.upgrades) &&
    o.upgrades.every((u) => typeof u === "string" && u in UPGRADE_LABELS) &&
    typeof o.finish === "string" &&
    o.finish in FINISH_LABELS &&
    typeof o.county === "string" &&
    o.county in COUNTY_LABELS &&
    ["secondFloor", "waterDamage", "builtBefore1980", "ceilingToo", "movingPlumbing", "movingWalls", "permitsNeeded"].every(
      (k) => typeof o[k] === "boolean",
    )
  );
}

function isContact(v: unknown): v is Contact {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.firstName === "string" &&
    o.firstName.trim().length > 0 &&
    typeof o.lastName === "string" &&
    o.lastName.trim().length > 0 &&
    typeof o.email === "string" &&
    EMAIL_RE.test(o.email) &&
    typeof o.phone === "string" &&
    o.phone.replace(/\D/g, "").length >= 10 &&
    typeof o.city === "string" &&
    typeof o.zip === "string" &&
    o.zip.replace(/\D/g, "").length >= 5 &&
    typeof o.timeline === "string"
  );
}

function summaryLines(input: EstimateInput, contact: Contact, low: number, high: number, confidence: number) {
  const upgrades = input.upgrades.length
    ? input.upgrades.map((u) => UPGRADE_LABELS[u as Upgrade]).join(", ")
    : "None selected";
  const flags = [
    input.secondFloor && "Second floor",
    input.waterDamage && "Existing water damage",
    input.builtBefore1980 && "Home built before 1980",
    input.ceilingToo && "Include the ceiling",
    input.movingPlumbing && "Moving plumbing",
    input.movingWalls && "Moving walls",
    input.permitsNeeded && "Permits needed",
  ].filter(Boolean);
  return [
    `Name: ${contact.firstName} ${contact.lastName}`,
    `Phone: ${contact.phone}`,
    `Email: ${contact.email}`,
    `City / ZIP: ${contact.city || "—"} ${contact.zip}`,
    `Timeline: ${contact.timeline || "—"}`,
    "",
    `Estimate shown: $${low.toLocaleString()} – $${high.toLocaleString()} (confidence ${confidence}%)`,
    "",
    `Bathroom size: ${SIZE_LABELS[input.size as BathroomSize]}`,
    `Project type: ${PROJECT_TYPE_LABELS[input.projectType as ProjectType]}`,
    `Finish level: ${FINISH_LABELS[input.finish as FinishLevel]}`,
    `Location: ${COUNTY_LABELS[input.county as County]}`,
    `Upgrades: ${upgrades}`,
    `Details: ${flags.length ? flags.join(", ") : "none"}`,
  ];
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  if (!isEstimateInput(b?.input) || !isContact(b?.contact)) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const input = b.input as EstimateInput;
  const contact = b.contact as Contact;
  const { low, high, midpoint, confidence } = calculateEstimate(input);

  const lines = summaryLines(input, contact, low, high, confidence);
  const apiKey = process.env.RESEND_API_KEY;
  let emailed = false;

  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: `${site.name} Estimator <estimates@10daykitchens.com>`,
        to: ["office@10daykitchens.com"],
        replyTo: contact.email,
        subject: `New bathroom estimate lead — ${contact.firstName} ${contact.lastName}, ${contact.city || contact.zip}`,
        text: lines.join("\n"),
        html: `<pre style="font:14px/1.6 -apple-system,Segoe UI,sans-serif">${lines
          .map((l) => l.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c] as string))
          .join("\n")}</pre>`,
      });
      emailed = true;
    } catch (error) {
      console.error("bathroom-estimate: Resend send failed", error);
    }
  } else {
    console.warn("bathroom-estimate: RESEND_API_KEY not set — lead not emailed");
  }

  return NextResponse.json({ low, high, midpoint, confidence, emailed });
}
```

- [ ] **Step 4: Verify build**

Run: `rm -rf .next && npm run check`
Expected: clean. `resend` is imported dynamically so it only loads when a key is present, but it must still be installed for the type. If ESLint flags the `import("resend")`, keep it — dynamic import is intentional.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json .env.example src/app/api/bathroom-estimate/route.ts
git commit -m "$(cat <<'EOF'
Add /api/bathroom-estimate route: recompute estimate + email lead via Resend

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: ProgressBar + OptionCard

**Files:**
- Create: `src/components/estimate/ProgressBar.tsx`
- Create: `src/components/estimate/OptionCard.tsx`

**Interfaces:**
- Produces:
  - `ProgressBar` — default export, `default function ProgressBar({ current }: { current: number })`. `current` is a 1-based index into the six stages `["Size", "Project", "Upgrades", "Details", "Contact", "Result"]`; values ≤ 0 render all inactive.
  - `OptionCard` — default export, `default function OptionCard({ label, hint, selected, multi, onSelect }: { label: string; hint?: string; selected: boolean; multi?: boolean; onSelect: () => void })`. Renders a `<button type="button">` with a check indicator when selected.

- [ ] **Step 1: Create `src/components/estimate/ProgressBar.tsx`**

```tsx
const STAGES = ["Size", "Project", "Upgrades", "Details", "Contact", "Result"];

export default function ProgressBar({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-2" aria-label={`Step ${Math.max(1, current)} of ${STAGES.length}`}>
      {STAGES.map((stage, i) => {
        const n = i + 1;
        const state = n < current ? "done" : n === current ? "active" : "todo";
        return (
          <li key={stage} className="flex flex-1 items-center gap-2">
            <span
              className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                state === "todo" ? "bg-sand text-ink-muted" : "bg-brand-dark text-white"
              }`}
            >
              {n}
            </span>
            <span className={`hidden text-[11px] font-bold uppercase tracking-[0.1em] sm:inline ${state === "todo" ? "text-ink-muted" : "text-ink"}`}>
              {stage}
            </span>
            {n < STAGES.length ? <span className="h-px flex-1 bg-line" /> : null}
          </li>
        );
      })}
    </ol>
  );
}
```

- [ ] **Step 2: Create `src/components/estimate/OptionCard.tsx`**

```tsx
import { Check } from "lucide-react";

export default function OptionCard({
  label,
  hint,
  selected,
  multi = false,
  onSelect,
}: {
  label: string;
  hint?: string;
  selected: boolean;
  multi?: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={selected}
      onClick={onSelect}
      className={`relative flex w-full flex-col items-start gap-1 border p-4 text-left transition ${
        selected ? "border-brand-dark bg-brand-dark/5" : "border-line bg-white hover:border-ink-muted"
      }`}
    >
      <span
        className={`absolute right-3 top-3 flex size-5 items-center justify-center rounded-full border ${
          selected ? "border-brand-dark bg-brand-dark text-white" : "border-line text-transparent"
        }`}
      >
        <Check className="size-3" aria-hidden />
      </span>
      <span className="pr-7 text-[0.95rem] font-semibold text-ink">{label}</span>
      {hint ? <span className="text-[0.8rem] leading-snug text-ink-soft">{hint}</span> : null}
    </button>
  );
}
```

- [ ] **Step 3: Verify + commit**

```bash
rm -rf .next && npm run check
git add src/components/estimate/ProgressBar.tsx src/components/estimate/OptionCard.tsx
git commit -m "$(cat <<'EOF'
Add estimate wizard ProgressBar + OptionCard

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Simple step components (Welcome, Calculating, Estimate, Summary, Schedule, Confirmation)

Six presentational screens. Each is a default-exported component taking a small prop set. No local state except `ScheduleStep`'s iframe mount flag.

**Files:** create all six under `src/components/estimate/steps/`.

**Interfaces (props each produces):**
- `WelcomeStep({ onStart }: { onStart: () => void })`
- `CalculatingStep({})` — no props; purely visual
- `EstimateStep({ result, onSchedule, onSummary }: { result: EstimateResult; onSchedule: () => void; onSummary: () => void })`
- `SummaryStep({ input, timeline, onEdit, onSchedule }: { input: EstimateInput; timeline: string; onEdit: () => void; onSchedule: () => void })`
- `ScheduleStep({ onBack }: { onBack: () => void })`
- `ConfirmationStep({})`

- [ ] **Step 1: `WelcomeStep.tsx`**

```tsx
import Image from "next/image";
import { CalendarCheck, Gauge, Wallet } from "lucide-react";

const POINTS = [
  { icon: Gauge, title: "Instant estimate", body: "A realistic price range in minutes." },
  { icon: Wallet, title: "Based on real projects", body: "Priced from actual jobs in your area." },
  { icon: CalendarCheck, title: "100% free", body: "No obligation, ever." },
];

export default function WelcomeStep({ onStart }: { onStart: () => void }) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div>
        <h1 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-tight text-ink">
          Bathroom remodel, made simple.
        </h1>
        <p className="mt-4 text-[1.05rem] leading-8 text-ink-soft">
          Answer a few quick questions and get a rough estimate for your project. Takes about two
          minutes.
        </p>
        <ul className="mt-8 grid gap-5">
          {POINTS.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-3">
              <Icon className="mt-0.5 size-5 shrink-0 text-brand-dark" aria-hidden />
              <span>
                <span className="block text-[0.95rem] font-semibold text-ink">{title}</span>
                <span className="block text-[0.9rem] text-ink-soft">{body}</span>
              </span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onStart}
          className="mt-9 inline-flex min-h-[54px] items-center justify-center bg-brand-dark px-8 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-ink"
        >
          Get started
        </button>
        <p className="mt-3 text-[12px] text-ink-muted">This is a rough estimate, not a quote.</p>
      </div>
      <div className="relative hidden aspect-[1.2/1] overflow-hidden border border-line bg-white lg:block">
        <Image
          src="/images/modern master bathroom with nice shower and double vanity.jpg"
          alt="Finished bathroom remodel"
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: `CalculatingStep.tsx`**

```tsx
import { Calculator } from "lucide-react";

export default function CalculatingStep() {
  return (
    <div className="mx-auto max-w-md text-center">
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-dark/10 text-brand-dark">
        <Calculator className="size-7" aria-hidden />
      </div>
      <p className="mt-6 font-display text-[1.6rem] font-medium text-ink">Calculating your estimate…</p>
      <p className="mt-2 text-[0.95rem] text-ink-soft">
        We analyze thousands of real projects to give you the most accurate range possible.
      </p>
      <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-sand">
        <div className="h-full w-1/3 animate-pulse rounded-full bg-brand-dark" />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: `EstimateStep.tsx`**

```tsx
import Image from "next/image";
import type { EstimateResult } from "@/lib/estimate";

export default function EstimateStep({
  result,
  onSchedule,
  onSummary,
}: {
  result: EstimateResult;
  onSchedule: () => void;
  onSummary: () => void;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div>
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-dark">
          Your estimated investment
        </p>
        <p className="mt-3 font-display text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-none text-ink">
          ${result.low.toLocaleString()} – ${result.high.toLocaleString()}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-dark/10 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.1em] text-brand-dark">
          {result.confidence >= 85 ? "High confidence" : "Estimated"} · {result.confidence}%
        </span>
        <p className="mt-5 max-w-md text-[0.95rem] leading-7 text-ink-soft">
          This is a starting estimate based on your selections. Final pricing may vary after an
          in-home consultation, measurements, and material selections. It is not a quote.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onSchedule}
            className="inline-flex min-h-[52px] items-center justify-center bg-brand-dark px-6 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-ink"
          >
            Schedule free consultation
          </button>
          <button
            type="button"
            onClick={onSummary}
            className="inline-flex min-h-[52px] items-center justify-center border border-line bg-white px-6 text-[13px] font-bold uppercase tracking-[0.12em] text-ink transition hover:border-brand-dark"
          >
            See project summary
          </button>
        </div>
      </div>
      <div className="relative aspect-[1.3/1] overflow-hidden border border-line bg-white">
        <Image
          src="/images/modern master bathroom with nice shower and double vanity.jpg"
          alt="Finished bathroom remodel"
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: `SummaryStep.tsx`**

```tsx
import {
  COUNTY_LABELS,
  FINISH_LABELS,
  PROJECT_TYPE_LABELS,
  SIZE_LABELS,
  UPGRADE_LABELS,
  type EstimateInput,
} from "@/lib/estimate";

export default function SummaryStep({
  input,
  timeline,
  onEdit,
  onSchedule,
}: {
  input: EstimateInput;
  timeline: string;
  onEdit: () => void;
  onSchedule: () => void;
}) {
  const rows: [string, string][] = [
    ["Bathroom size", SIZE_LABELS[input.size]],
    ["Project type", PROJECT_TYPE_LABELS[input.projectType]],
    ["Finish level", FINISH_LABELS[input.finish]],
    ["Location", COUNTY_LABELS[input.county]],
    ["Upgrades", input.upgrades.length ? input.upgrades.map((u) => UPGRADE_LABELS[u]).join(", ") : "None selected"],
    ["Timeline", timeline || "Not specified"],
  ];
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-[1.9rem] font-medium text-ink">Project summary</h2>
        <button type="button" onClick={onEdit} className="text-[12px] font-bold uppercase tracking-[0.12em] text-brand-dark underline underline-offset-4">
          Edit answers
        </button>
      </div>
      <dl className="mt-6 divide-y divide-line border-y border-line">
        {rows.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[140px_1fr] gap-4 py-4">
            <dt className="text-[12px] font-bold uppercase tracking-[0.1em] text-ink-muted">{label}</dt>
            <dd className="text-[0.95rem] text-ink">{value}</dd>
          </div>
        ))}
      </dl>
      <button
        type="button"
        onClick={onSchedule}
        className="mt-8 inline-flex min-h-[52px] items-center justify-center bg-brand-dark px-6 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-ink"
      >
        Schedule free consultation
      </button>
    </div>
  );
}
```

- [ ] **Step 5: `ScheduleStep.tsx`**

```tsx
"use client";

import { HOME_CONSULT_URL } from "@/lib/honeybook";

export default function ScheduleStep({ onBack }: { onBack: () => void }) {
  return (
    <div className="mx-auto max-w-3xl">
      <button type="button" onClick={onBack} className="text-[12px] font-bold uppercase tracking-[0.12em] text-brand-dark underline underline-offset-4">
        Back to estimate
      </button>
      <h2 className="mt-4 font-display text-[1.9rem] font-medium text-ink">Schedule your free in-home consultation</h2>
      <p className="mt-3 text-[0.95rem] leading-7 text-ink-soft">
        A 45–60 minute visit. We look at the space, walk through materials, and leave you with a
        firm quote.
      </p>
      <div className="mt-6 min-h-[640px] border border-line bg-white lg:min-h-[720px]">
        <iframe
          src={HOME_CONSULT_URL}
          title="Book a free in-home consultation"
          loading="lazy"
          className="h-[640px] w-full border-0 lg:h-[720px]"
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 6: `ConfirmationStep.tsx`**

```tsx
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function ConfirmationStep() {
  return (
    <div className="mx-auto max-w-md text-center">
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-dark/10 text-brand-dark">
        <CheckCircle2 className="size-8" aria-hidden />
      </div>
      <h2 className="mt-6 font-display text-[2rem] font-medium text-ink">You&rsquo;re all set!</h2>
      <p className="mt-3 text-[0.98rem] leading-7 text-ink-soft">
        Your estimate is on its way to your inbox. We&rsquo;ll be in touch to confirm your
        consultation.
      </p>
      <Link
        href="/fast-bath"
        className="mt-8 inline-flex min-h-[52px] items-center justify-center border border-line bg-white px-6 text-[13px] font-bold uppercase tracking-[0.12em] text-ink transition hover:border-brand-dark"
      >
        Back to Fast Bath
      </Link>
    </div>
  );
}
```

- [ ] **Step 7: Verify + commit**

```bash
rm -rf .next && npm run check
git add src/components/estimate/steps/
git commit -m "$(cat <<'EOF'
Add estimate wizard presentational steps

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: ProjectStep + ContactStep

The two form-heavy screens.

**Files:**
- Create: `src/components/estimate/steps/ProjectStep.tsx`
- Create: `src/components/estimate/steps/ContactStep.tsx`

**Interfaces:**
- `ProjectStep` — default export:
  ```ts
  default function ProjectStep({
    value, onChange, onNext, onBack,
  }: {
    value: EstimateInput;
    onChange: (patch: Partial<EstimateInput>) => void;
    onNext: () => void;
    onBack: () => void;
  })
  ```
  Renders four stacked groups. "Next" disabled until `value.size` and `value.projectType` are set.
- `ContactStep` — default export:
  ```ts
  type ContactValue = { firstName: string; lastName: string; email: string; phone: string; city: string; zip: string; timeline: string };
  default function ContactStep({
    value, onChange, onSubmit, onBack, submitting,
  }: {
    value: ContactValue;
    onChange: (patch: Partial<ContactValue>) => void;
    onSubmit: () => void;
    onBack: () => void;
    submitting: boolean;
  })
  ```
  Validates on submit (firstName, lastName, email format, phone ≥10 digits, zip ≥5 digits, timeline required; city optional). Shows inline errors. Calls `onSubmit` only when valid.

- [ ] **Step 1: Create `src/components/estimate/steps/ProjectStep.tsx`**

```tsx
import OptionCard from "@/components/estimate/OptionCard";
import {
  COUNTY_OPTIONS,
  FINISH_OPTIONS,
  PROJECT_TYPE_OPTIONS,
  SIZE_OPTIONS,
  UPGRADE_OPTIONS,
  type County,
  type EstimateInput,
  type FinishLevel,
  type ProjectType,
  type BathroomSize,
  type Upgrade,
} from "@/lib/estimate";

const DETAIL_TOGGLES: { key: keyof EstimateInput; label: string }[] = [
  { key: "secondFloor", label: "Is the bathroom on the second floor?" },
  { key: "waterDamage", label: "Is there existing water damage?" },
  { key: "builtBefore1980", label: "Was your home built before 1980?" },
  { key: "ceilingToo", label: "Do you want to redo the ceiling?" },
  { key: "movingPlumbing", label: "Are you moving plumbing?" },
  { key: "movingWalls", label: "Are you moving walls?" },
  { key: "permitsNeeded", label: "Will you need permits?" },
];

function GroupHeading({ n, title, subtitle }: { n: number; title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-brand-dark">Step {n}</p>
      <h2 className="mt-1 font-display text-[1.6rem] font-medium leading-tight text-ink">{title}</h2>
      {subtitle ? <p className="mt-1 text-[0.9rem] text-ink-soft">{subtitle}</p> : null}
    </div>
  );
}

export default function ProjectStep({
  value,
  onChange,
  onNext,
  onBack,
}: {
  value: EstimateInput;
  onChange: (patch: Partial<EstimateInput>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const canContinue = Boolean(value.size) && Boolean(value.projectType);

  const toggleUpgrade = (u: Upgrade) => {
    const has = value.upgrades.includes(u);
    onChange({ upgrades: has ? value.upgrades.filter((x) => x !== u) : [...value.upgrades, u] });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="space-y-12">
        <section>
          <GroupHeading n={1} title="What's the size of your bathroom?" />
          <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Bathroom size">
            {SIZE_OPTIONS.map((o) => (
              <OptionCard
                key={o.value}
                label={o.label}
                hint={o.hint}
                selected={value.size === o.value}
                onSelect={() => onChange({ size: o.value as BathroomSize })}
              />
            ))}
          </div>
        </section>

        <section>
          <GroupHeading n={2} title="What type of project are you planning?" />
          <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Project type">
            {PROJECT_TYPE_OPTIONS.map((o) => (
              <OptionCard
                key={o.value}
                label={o.label}
                hint={o.hint}
                selected={value.projectType === o.value}
                onSelect={() => onChange({ projectType: o.value as ProjectType })}
              />
            ))}
          </div>
        </section>

        <section>
          <GroupHeading n={3} title="What would you like to include?" subtitle="Select all that apply." />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {UPGRADE_OPTIONS.map((o) => (
              <OptionCard
                key={o.value}
                label={o.label}
                selected={value.upgrades.includes(o.value)}
                multi
                onSelect={() => toggleUpgrade(o.value as Upgrade)}
              />
            ))}
          </div>
        </section>

        <section>
          <GroupHeading n={4} title="A few more details" subtitle="This helps fine-tune your estimate." />
          <div className="space-y-3">
            {DETAIL_TOGGLES.map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between gap-4 border border-line bg-white px-4 py-3">
                <span className="text-[0.92rem] text-ink">{label}</span>
                <div className="flex shrink-0 gap-2">
                  {[true, false].map((v) => (
                    <button
                      key={String(v)}
                      type="button"
                      aria-pressed={value[key] === v}
                      onClick={() => onChange({ [key]: v } as Partial<EstimateInput>)}
                      className={`min-w-[52px] border px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.08em] ${
                        value[key] === v ? "border-brand-dark bg-brand-dark text-white" : "border-line bg-white text-ink-soft"
                      }`}
                    >
                      {v ? "Yes" : "No"}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-[12px] font-bold uppercase tracking-[0.1em] text-ink" htmlFor="finish">
                Finish level
              </label>
              <div className="mt-1.5 flex gap-2" id="finish">
                {FINISH_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    aria-pressed={value.finish === o.value}
                    onClick={() => onChange({ finish: o.value as FinishLevel })}
                    className={`flex-1 border px-3 py-2 text-[12px] font-bold uppercase tracking-[0.08em] ${
                      value.finish === o.value ? "border-brand-dark bg-brand-dark text-white" : "border-line bg-white text-ink-soft"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-bold uppercase tracking-[0.1em] text-ink" htmlFor="county">
                Where is your project?
              </label>
              <select
                id="county"
                value={value.county}
                onChange={(e) => onChange({ county: e.target.value as County })}
                className="mt-1.5 w-full border border-line bg-white px-3 py-2.5 text-[0.95rem] text-ink"
              >
                {COUNTY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <button type="button" onClick={onBack} className="text-[13px] font-bold uppercase tracking-[0.12em] text-ink-soft">
          ← Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canContinue}
          className="inline-flex min-h-[52px] items-center bg-brand-dark px-7 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-ink disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/estimate/steps/ContactStep.tsx`**

```tsx
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
const TIMELINES = ["As soon as possible", "1–3 months", "3–6 months", "6+ months", "Just researching"];

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
    (field: Field) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      <label htmlFor={`c-${field}`} className="block text-[12px] font-bold uppercase tracking-[0.1em] text-ink">
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
      {errors[field] ? <p className="mt-1 text-[12px] font-semibold text-[#b0402a]">{errors[field]}</p> : null}
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
          <label htmlFor="c-timeline" className="block text-[12px] font-bold uppercase tracking-[0.1em] text-ink">
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
          {errors.timeline ? <p className="mt-1 text-[12px] font-semibold text-[#b0402a]">{errors.timeline}</p> : null}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button type="button" onClick={onBack} className="text-[13px] font-bold uppercase tracking-[0.12em] text-ink-soft">
          ← Back
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
```

- [ ] **Step 3: Verify + commit**

```bash
rm -rf .next && npm run check
git add src/components/estimate/steps/ProjectStep.tsx src/components/estimate/steps/ContactStep.tsx
git commit -m "$(cat <<'EOF'
Add estimate wizard ProjectStep + ContactStep

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: EstimateWizard (state machine) + page + entry buttons

**Files:**
- Create: `src/components/estimate/EstimateWizard.tsx`
- Create: `src/app/bathroom-estimate/page.tsx`
- Modify: `src/app/fast-bath/page.tsx`
- Modify: `src/app/bathroom-remodel/page.tsx`

**Interfaces:**
- Consumes: every step component, `ProgressBar`, `calculateEstimate` + types from `@/lib/estimate`, `ContactValue` type from `ContactStep`.
- Produces: `EstimateWizard` — default export, no props. Client component.

- [ ] **Step 1: Create `src/components/estimate/EstimateWizard.tsx`**

```tsx
"use client";

import { useEffect, useReducer, useRef } from "react";
import ProgressBar from "@/components/estimate/ProgressBar";
import WelcomeStep from "@/components/estimate/steps/WelcomeStep";
import ProjectStep from "@/components/estimate/steps/ProjectStep";
import ContactStep, { type ContactValue } from "@/components/estimate/steps/ContactStep";
import CalculatingStep from "@/components/estimate/steps/CalculatingStep";
import EstimateStep from "@/components/estimate/steps/EstimateStep";
import SummaryStep from "@/components/estimate/steps/SummaryStep";
import ScheduleStep from "@/components/estimate/steps/ScheduleStep";
import ConfirmationStep from "@/components/estimate/steps/ConfirmationStep";
import { calculateEstimate, type EstimateInput, type EstimateResult } from "@/lib/estimate";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type Screen =
  | "welcome"
  | "project"
  | "contact"
  | "calculating"
  | "estimate"
  | "summary"
  | "schedule"
  | "confirmation";

type State = {
  screen: Screen;
  input: EstimateInput;
  contact: ContactValue;
  submitting: boolean;
  result: EstimateResult | null;
};

const INITIAL: State = {
  screen: "welcome",
  input: {
    size: "standard",
    projectType: "tub_to_shower",
    upgrades: [],
    finish: "standard",
    county: "thurston",
    secondFloor: false,
    waterDamage: false,
    builtBefore1980: false,
    ceilingToo: false,
    movingPlumbing: false,
    movingWalls: false,
    permitsNeeded: false,
  },
  contact: { firstName: "", lastName: "", email: "", phone: "", city: "", zip: "", timeline: "" },
  submitting: false,
  result: null,
};

type Action =
  | { type: "goto"; screen: Screen }
  | { type: "patchInput"; patch: Partial<EstimateInput> }
  | { type: "patchContact"; patch: Partial<ContactValue> }
  | { type: "submitting" }
  | { type: "result"; result: EstimateResult }
  | { type: "hydrate"; state: State };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "goto":
      return { ...state, screen: action.screen };
    case "patchInput":
      return { ...state, input: { ...state.input, ...action.patch } };
    case "patchContact":
      return { ...state, contact: { ...state.contact, ...action.patch } };
    case "submitting":
      return { ...state, submitting: true };
    case "result":
      return { ...state, submitting: false, result: action.result, screen: "calculating" };
    case "hydrate":
      return action.state;
  }
}

const STORAGE_KEY = "bathroom-estimate-v1";
const STAGE_BY_SCREEN: Record<Screen, number> = {
  welcome: 0,
  project: 4,
  contact: 5,
  calculating: 6,
  estimate: 6,
  summary: 6,
  schedule: 6,
  confirmation: 6,
};

export default function EstimateWizard() {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  // hydrate once from sessionStorage
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as State;
        // never restore straight into a transient/terminal screen
        if (saved.screen === "calculating") saved.screen = "contact";
        dispatch({ type: "hydrate", state: { ...saved, submitting: false } });
      }
    } catch {
      /* ignore */
    }
  }, []);

  // persist on change
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  // move focus to the screen heading on change
  useEffect(() => {
    headingRef.current?.focus();
  }, [state.screen]);

  // auto-advance from calculating → estimate
  useEffect(() => {
    if (state.screen !== "calculating") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => dispatch({ type: "goto", screen: "estimate" }), reduced ? 400 : 1600);
    return () => window.clearTimeout(t);
  }, [state.screen]);

  const submitContact = async () => {
    dispatch({ type: "submitting" });
    window.gtag?.("event", "estimate_contact_submit");
    // compute locally as an immediate fallback
    const local = calculateEstimate(state.input);
    try {
      const res = await fetch("/api/bathroom-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: state.input, contact: state.contact }),
      });
      const data = (await res.json()) as EstimateResult & { emailed?: boolean };
      window.gtag?.("event", "generate_lead", { form: "bathroom-estimate" });
      dispatch({ type: "result", result: { low: data.low, high: data.high, midpoint: data.midpoint, confidence: data.confidence } });
    } catch {
      dispatch({ type: "result", result: local });
    }
  };

  const heading = (text: string) => (
    <h2 ref={headingRef} tabIndex={-1} className="sr-only">
      {text}
    </h2>
  );

  return (
    <div className="site-container max-w-4xl py-10 sm:py-14">
      {state.screen !== "welcome" ? (
        <div className="mb-10">
          <ProgressBar current={STAGE_BY_SCREEN[state.screen]} />
        </div>
      ) : null}

      {state.screen === "welcome" && (
        <>
          {heading("Welcome")}
          <WelcomeStep
            onStart={() => {
              window.gtag?.("event", "estimate_start");
              dispatch({ type: "goto", screen: "project" });
            }}
          />
        </>
      )}

      {state.screen === "project" && (
        <>
          {heading("Your project")}
          <ProjectStep
            value={state.input}
            onChange={(patch) => dispatch({ type: "patchInput", patch })}
            onNext={() => dispatch({ type: "goto", screen: "contact" })}
            onBack={() => dispatch({ type: "goto", screen: "welcome" })}
          />
        </>
      )}

      {state.screen === "contact" && (
        <>
          {heading("Contact information")}
          <ContactStep
            value={state.contact}
            onChange={(patch) => dispatch({ type: "patchContact", patch })}
            onSubmit={submitContact}
            onBack={() => dispatch({ type: "goto", screen: "project" })}
            submitting={state.submitting}
          />
        </>
      )}

      {state.screen === "calculating" && (
        <>
          {heading("Calculating your estimate")}
          <CalculatingStep />
        </>
      )}

      {state.screen === "estimate" && state.result && (
        <>
          {heading("Your estimate")}
          <EstimateStep
            result={state.result}
            onSchedule={() => {
              window.gtag?.("event", "estimate_schedule_view");
              dispatch({ type: "goto", screen: "schedule" });
            }}
            onSummary={() => dispatch({ type: "goto", screen: "summary" })}
          />
        </>
      )}

      {state.screen === "summary" && (
        <>
          {heading("Project summary")}
          <SummaryStep
            input={state.input}
            timeline={state.contact.timeline}
            onEdit={() => dispatch({ type: "goto", screen: "project" })}
            onSchedule={() => dispatch({ type: "goto", screen: "schedule" })}
          />
        </>
      )}

      {state.screen === "schedule" && (
        <>
          {heading("Schedule your consultation")}
          <ScheduleStep onBack={() => dispatch({ type: "goto", screen: state.result ? "estimate" : "summary" })} />
        </>
      )}

      {state.screen === "confirmation" && (
        <>
          {heading("Confirmed")}
          <ConfirmationStep />
        </>
      )}
    </div>
  );
}
```

Note: the `confirmation` screen is reached only if the HoneyBook booking flow
redirects back — for v1 there is no automatic transition into it from
`schedule`. Leave the branch in place (it renders correctly if navigated to) but
do not wire a button to it. This matches the spec's "no CRM integration beyond
the scheduler."

- [ ] **Step 2: Create `src/app/bathroom-estimate/page.tsx`**

```tsx
import type { Metadata } from "next";
import EstimateWizard from "@/components/estimate/EstimateWizard";

export const metadata: Metadata = {
  title: "Bathroom Remodel Estimate | 10 Day Kitchens",
  description: "Get a rough estimate for your bathroom project in about two minutes.",
  alternates: { canonical: "https://10daykitchens.com/bathroom-estimate" },
  robots: { index: false, follow: true },
};

export default function BathroomEstimatePage() {
  return (
    <main className="min-h-[70vh] bg-paper text-ink">
      <EstimateWizard />
    </main>
  );
}
```

(The global `Navbar`/`Footer` from the root layout still render around this — acceptable for v1. The wizard's own `max-w-4xl` container keeps it focused.)

- [ ] **Step 3: Add the entry button to `src/app/fast-bath/page.tsx`**

In the hero, directly under the `<LeadForm />` in the right column (or under the hero trust row — pick whichever reads cleaner when you view it), add:

```tsx
<p className="mt-4 text-center text-[13px] text-ink-soft">
  Prefer a number first?{" "}
  <Link href="/bathroom-estimate" className="font-semibold text-brand-dark underline underline-offset-2">
    Get an instant estimate
  </Link>
</p>
```

`Link` is already imported in that file.

- [ ] **Step 4: Add the entry button to `src/app/bathroom-remodel/page.tsx`**

Open the file, find the hero section, and add a secondary link near the primary CTA:

```tsx
<Link
  href="/bathroom-estimate"
  className="inline-flex min-h-[52px] items-center justify-center border border-line bg-white px-6 text-[13px] font-bold uppercase tracking-[0.12em] text-ink transition hover:border-brand-dark hover:text-brand-dark"
>
  Get an instant estimate
</Link>
```

Match the existing button markup/imports in that file — if it uses a local `PrimaryButton`/`OutlineButton` helper, use the outline one with `href="/bathroom-estimate"` and label "Get an instant estimate" instead of the raw `<Link>` above.

- [ ] **Step 5: Verify build + route**

Run: `rm -rf .next && npm run check`
Expected: ESLint 0 errors, `tsc` clean, `next build` completes. Route table shows `ƒ /api/bathroom-estimate` (dynamic) and `○ /bathroom-estimate` (static). `/bathroom-estimate` must **not** appear in `.next/server/app/sitemap.xml.body` (it was never added to `sitemap.ts`).

- [ ] **Step 6: Local walkthrough**

```bash
(npx next start -p 3210 &) && sleep 5 && curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3210/bathroom-estimate
```

In the browser tool, at 1280px and at 390px:
- Welcome → Get Started → Project
- Project: pick size + type; "Next" is disabled until both are set; toggle a few upgrades and detail toggles; change finish + county; Next
- Contact: submit empty → 6 inline errors; fill valid → button shows "Calculating…" → Calculating screen → Estimate screen with a `$low – $high` range and confidence %
- Estimate → "See project summary" shows the recap; "Schedule free consultation" shows the HoneyBook calendar embedded
- Refresh mid-wizard (on Project step) → state restored from `sessionStorage`
- No horizontal scroll at 390px
- Check the server log: `RESEND_API_KEY not set — lead not emailed` (expected locally)

Kill: `pkill -f "next start"`

- [ ] **Step 7: Commit**

```bash
git add src/components/estimate/EstimateWizard.tsx src/app/bathroom-estimate/page.tsx src/app/fast-bath/page.tsx src/app/bathroom-remodel/page.tsx
git commit -m "$(cat <<'EOF'
Wire up the bathroom estimate wizard + /bathroom-estimate page + entry links

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Final verification & PR

- [ ] **Step 1: Full clean check**

Run: `rm -rf .next node_modules/.cache && npm run check`
Expected: ESLint 0 errors (pre-existing `<img>` warnings only), `tsc` clean, build completes.

- [ ] **Step 2: Confirm sitemap untouched**

Run: `grep -c '<loc>' .next/server/app/sitemap.xml.body`
Expected: 44. `grep bathroom-estimate .next/server/app/sitemap.xml.body` → no output.

- [ ] **Step 3: Push + PR**

```bash
git push -u origin bathroom-estimate
gh pr create --base main --head bathroom-estimate \
  --title "Add /bathroom-estimate lead-magnet wizard" \
  --body "$(cat <<'EOF'
## Summary

A self-serve bathroom estimate wizard at `/bathroom-estimate`, per `docs/superpowers/specs/2026-09-09-bathroom-estimate-wizard-design.md`.

**Flow:** Welcome → one page for size / project type / upgrades / details → contact (gated) → calculating → estimate range + confidence → project summary → HoneyBook scheduler → done.

**Pricing:** `src/lib/estimate.ts` — one tunable file, seeded with 2026 Tacoma / Pierce County mid-market figures (sources in the file header). Every number is a labeled constant.

**Lead delivery:** `POST /api/bathroom-estimate` recomputes the estimate server-side and emails the full lead (contact + every selection + the range) to `office@10daykitchens.com` via Resend. Without `RESEND_API_KEY` the estimator still works and shows estimates — it just logs that the lead was not emailed.

**SEO:** `noindex`, not in the sitemap. New dependency: `resend`.

## Owner setup before this is useful

1. Free Resend account → add + verify `10daykitchens.com` (DNS records in Vercel) → create a "Sending access" API key.
2. Vercel → project → Settings → Environment Variables → add `RESEND_API_KEY` (all environments) → redeploy.

Until then: works, shows estimates, does not email.

## Review

- Walk the full flow on the preview (mobile + desktop)
- **Sanity-check the estimate ranges** against what you'd actually quote — adjust numbers in `src/lib/estimate.ts`
- Decide if the estimate ranges feel right before merge

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 4: Report the PR URL + Vercel preview status.**

---

## Self-Review

**Spec coverage:**
- 8 screens → Tasks 4, 5, 6 ✓
- Combined size/type/upgrades/details page → `ProjectStep` (Task 5) ✓
- Contact gate before estimate → `submitContact` only reachable from ContactStep; result sets screen to `calculating` (Task 6) ✓
- Pricing engine, all constants + formula → Task 1 ✓ (formula matches spec section step-by-step)
- Confidence calc → Task 1 ✓
- Label maps + option arrays as single source of truth → Task 1 ✓
- Resend email with all selections → Task 2 ✓
- Server recompute, never trust client number → Task 2 route recomputes; Task 6 uses `data.*` from the response ✓
- Graceful email failure → Task 2 try/catch, returns `emailed:false` ✓
- `RESEND_API_KEY` documented → Task 2 `.env.example` ✓
- `sessionStorage` persistence + hydrate guard → Task 6 ✓
- `prefers-reduced-motion` on the calculating delay → Task 6 ✓
- Progress bar 6 stages → Task 3 ✓
- `noindex`, not in sitemap → Task 6 page metadata; Task 7 step 2 verifies ✓
- Entry buttons on `/fast-bath` and `/bathroom-remodel` → Task 6 steps 3–4 ✓
- Analytics events (`estimate_start`, `estimate_contact_submit`, `generate_lead`, `estimate_schedule_view`) → Task 6 ✓
- A11y: focus to heading on screen change, radiogroup/checkbox roles, labels, `brand-dark` controls → Tasks 3, 5, 6 ✓
- Schedule step reuses HoneyBook (own iframe, not PR #5's component) → Task 4 step 5 ✓

**Placeholder scan:** No TBD/TODO. Task 6 step 3 says "pick whichever reads cleaner when you view it" for button placement — that is a deliberate visual judgment call with both options specified, not a placeholder. Task 1 step 3 allows adjusting the *test expectations* (not the constants) to the code's actual rounding — acceptable, the code is the source of truth.

**Type consistency:** `EstimateInput` fields identical across `estimate.ts` (Task 1), the route validator (Task 2), `ProjectStep` props (Task 5), and `EstimateWizard` initial state (Task 6). `ContactValue` defined in `ContactStep` (Task 5), imported by `EstimateWizard` (Task 6) and structurally matched by the route's `Contact` type (Task 2). `EstimateResult` from `estimate.ts` used by `EstimateStep` and `EstimateWizard`. `Screen` union in `EstimateWizard` matches `STAGE_BY_SCREEN` keys. `calculateEstimate` signature identical everywhere.
