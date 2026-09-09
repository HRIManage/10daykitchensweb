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
