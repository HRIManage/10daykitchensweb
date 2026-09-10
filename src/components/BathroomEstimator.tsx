"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Droplets,
  Fan,
  Grid2X2,
  LampCeiling,
  Paintbrush,
  Phone,
  Ruler,
  ShieldCheck,
  ShowerHead,
  Sparkles,
  Toilet,
  Wrench,
} from "lucide-react";
import {
  calculateEstimate,
  type BathroomSize,
  type County,
  type EstimateInput,
  type FinishLevel,
  type ProjectType,
  type Upgrade,
} from "@/lib/estimate";

type Step = 1 | 2 | 3 | 4 | 5;
type Finish = FinishLevel;

const sizeOptions = [
  { id: "powder", label: "Powder bath", detail: "Up to 40 sq ft", image: "/images/estimator/size-powder-bath.jpg" },
  { id: "small", label: "Small bathroom", detail: "40 to 80 sq ft", image: "/images/estimator/size-small-bathroom.jpg" },
  { id: "standard", label: "Standard bathroom", detail: "80 to 120 sq ft", image: "/images/estimator/size-standard-bathroom.jpg" },
  { id: "primary", label: "Primary bathroom", detail: "120 to 180 sq ft", image: "/images/estimator/size-primary-bathroom.jpg" },
  { id: "large", label: "Large luxury bath", detail: "180+ sq ft", image: "/images/estimator/size-large-luxury-bath.jpg" },
] as const;

const projectOptions = [
  { id: "refresh", label: "Simple refresh", detail: "Cosmetic updates and fixtures", image: "/images/estimator/project-simple-refresh.jpg", Icon: Sparkles },
  { id: "conversion", label: "Tub-to-shower conversion", detail: "Replace a tub with a walk-in shower", image: "/images/estimator/project-tub-to-shower.jpg", Icon: ShowerHead },
  { id: "shower", label: "Shower upgrade", detail: "New shower system and enclosure", image: "/images/estimator/project-shower-upgrade.jpg", Icon: Droplets },
  { id: "vanity", label: "Vanity and countertop", detail: "New vanity, sink, top, and faucet", image: "/images/estimator/project-vanity-countertop.jpg", Icon: Grid2X2 },
  { id: "surfaces", label: "Flooring and fixtures", detail: "New room finishes and fixtures", image: "/images/estimator/project-flooring-fixtures.jpg", Icon: Ruler },
  { id: "full", label: "Full bathroom remodel", detail: "A complete transformation", image: "/images/estimator/project-full-remodel.jpg", Icon: Bath },
] as const;

const upgrades = [
  { id: "shower", label: "Shower", Icon: ShowerHead },
  { id: "tub", label: "Tub", Icon: Bath },
  { id: "vanity", label: "Vanity", Icon: Grid2X2 },
  { id: "countertop", label: "Countertop", Icon: Sparkles },
  { id: "flooring", label: "Flooring", Icon: Ruler },
  { id: "toilet", label: "Toilet", Icon: Toilet },
  { id: "lighting", label: "Lighting", Icon: LampCeiling },
  { id: "fan", label: "Exhaust fan", Icon: Fan },
  { id: "paint", label: "Paint", Icon: Paintbrush },
  { id: "fixtures", label: "Fixtures", Icon: Droplets },
  { id: "plumbing", label: "Plumbing updates", Icon: Wrench },
  { id: "glass", label: "Glass shower door", Icon: ShowerHead },
] as const;

const detailQuestions = [
  { id: "secondFloor", label: "Is the bathroom on the second floor?" },
  { id: "waterDamage", label: "Is there existing water damage?" },
  { id: "olderHome", label: "Is your home older than 1980?" },
  { id: "ceiling", label: "Do you want tile to the ceiling?" },
  { id: "movePlumbing", label: "Are you moving plumbing?" },
  { id: "permits", label: "Will permits be needed?" },
] as const;

/**
 * The wizard's option ids are friendly slugs; `src/lib/estimate.ts` is the
 * single source of truth for the numbers. These maps translate a completed
 * wizard into an `EstimateInput`, so the range shown here and the range the
 * `/api/bathroom-estimate` route recomputes server-side always agree.
 */
const SIZE_TO_INPUT: Record<string, BathroomSize> = {
  powder: "powder",
  small: "small",
  standard: "standard",
  primary: "primary",
  large: "luxury",
};
const PROJECT_TO_INPUT: Record<string, ProjectType> = {
  refresh: "refresh",
  conversion: "tub_to_shower",
  shower: "shower_upgrade",
  vanity: "vanity_counter",
  surfaces: "flooring_fixture",
  full: "full_remodel",
};
const UPGRADE_TO_INPUT: Record<string, Upgrade> = {
  shower: "shower",
  tub: "tub",
  vanity: "vanity",
  countertop: "countertop",
  flooring: "flooring",
  toilet: "toilet",
  lighting: "lighting",
  fan: "exhaust_fan",
  paint: "paint",
  fixtures: "fixtures",
  plumbing: "plumbing",
  glass: "glass_door",
};
const COUNTY_TO_INPUT: Record<string, County> = {
  "Thurston County": "thurston",
  "Pierce County": "pierce",
  "Lewis County": "lewis",
  "Mason County": "other",
  "Other nearby area": "other",
};

function buildEstimateInput(args: {
  size: string;
  project: string;
  selectedUpgrades: string[];
  details: Record<string, boolean>;
  finish: Finish;
  county: string;
}): EstimateInput | null {
  const mappedSize = SIZE_TO_INPUT[args.size];
  const mappedProject = PROJECT_TO_INPUT[args.project];
  const mappedCounty = COUNTY_TO_INPUT[args.county];
  if (!mappedSize || !mappedProject || !mappedCounty) return null;
  return {
    size: mappedSize,
    projectType: mappedProject,
    upgrades: args.selectedUpgrades
      .map((id) => UPGRADE_TO_INPUT[id])
      .filter((value): value is Upgrade => Boolean(value)),
    finish: args.finish,
    county: mappedCounty,
    secondFloor: Boolean(args.details.secondFloor),
    waterDamage: Boolean(args.details.waterDamage),
    builtBefore1980: Boolean(args.details.olderHome),
    ceilingToo: Boolean(args.details.ceiling),
    movingPlumbing: Boolean(args.details.movePlumbing),
    movingWalls: false,
    permitsNeeded: Boolean(args.details.permits),
  };
}

const stepNames = ["Welcome", "Project", "Contact", "Calculate", "Estimate"];

function PrimaryButton({ children, onClick, type = "button", disabled = false }: { children: React.ReactNode; onClick?: () => void; type?: "button" | "submit"; disabled?: boolean }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex min-h-13 items-center justify-center gap-3 rounded-md bg-brand px-7 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_12px_30px_rgba(93,187,70,0.22)] transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-45"
    >
      {children}
    </button>
  );
}

function Progress({ step }: { step: Step }) {
  return (
    <div className="border-b border-line bg-white px-5 py-5 sm:px-8">
      <div className="mx-auto flex max-w-5xl items-center" aria-label={`Step ${step} of 5`}>
        {stepNames.map((name, index) => {
          const number = index + 1;
          const active = number === step;
          const complete = number < step;
          return (
            <div key={name} className={`flex items-center ${index < stepNames.length - 1 ? "flex-1" : ""}`}>
              <div className="flex min-w-10 flex-col items-center gap-2 sm:min-w-16">
                <span className={`flex size-8 items-center justify-center rounded-full border text-[11px] font-bold ${active || complete ? "border-brand bg-brand text-white" : "border-line bg-white text-ink-muted"}`}>
                  {complete ? <Check className="size-4" /> : number}
                </span>
                <span className={`hidden text-[9px] font-bold uppercase tracking-[0.1em] sm:block ${active ? "text-brand-dark" : "text-ink-muted"}`}>{name}</span>
              </div>
              {index < stepNames.length - 1 && <span className={`mx-2 h-px flex-1 ${complete ? "bg-brand" : "bg-line"}`} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex min-h-12 items-center gap-2 rounded-md border border-line bg-white px-5 text-sm font-bold text-ink transition hover:border-brand hover:text-brand-dark">
      <ArrowLeft className="size-4" /> Back
    </button>
  );
}

export default function BathroomEstimator() {
  const [step, setStep] = useState<Step>(1);
  const [size, setSize] = useState("");
  const [project, setProject] = useState("");
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);
  const [details, setDetails] = useState<Record<string, boolean>>({});
  const [finish, setFinish] = useState<Finish>("standard");
  const [county, setCounty] = useState("");
  const [contact, setContact] = useState({ firstName: "", lastName: "", email: "", phone: "", city: "", zip: "", timeline: "" });
  const [showErrors, setShowErrors] = useState(false);
  const sentRef = useRef(false);
  const topRef = useRef<HTMLDivElement>(null);

  const projectComplete = Boolean(size && project && county);
  const contactComplete = Boolean(contact.firstName && contact.lastName && contact.email && contact.phone && contact.zip);

  const selectedProject = projectOptions.find((option) => option.id === project);
  const selectedSize = sizeOptions.find((option) => option.id === size);

  const estimateInput = useMemo(
    () => buildEstimateInput({ size, project, selectedUpgrades, details, finish, county }),
    [size, project, selectedUpgrades, details, finish, county],
  );

  const estimate = useMemo(
    () =>
      estimateInput
        ? calculateEstimate(estimateInput)
        : { low: 0, high: 0, midpoint: 0, confidence: 0 },
    [estimateInput],
  );

  function goTo(next: Step) {
    setStep(next);
    setShowErrors(false);
    window.setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 20);
  }

  function continueProject() {
    if (!projectComplete) {
      setShowErrors(true);
      return;
    }
    goTo(3);
  }

  function calculate() {
    if (!contactComplete || !estimateInput) {
      setShowErrors(true);
      return;
    }
    if (!sentRef.current) {
      sentRef.current = true;
      // Deliver the lead. The route recomputes the range server-side and emails
      // office@; a failure here never blocks the estimate the visitor sees.
      void fetch("/api/bathroom-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: estimateInput, contact }),
      }).catch(() => {});
    }
    goTo(4);
  }

  useEffect(() => {
    if (step !== 4) return;
    const timer = window.setTimeout(() => goTo(5), 1800);
    return () => window.clearTimeout(timer);
  }, [step]);

  function toggleUpgrade(id: string) {
    setSelectedUpgrades((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <main ref={topRef} className="bg-[#f6f5f2] pt-[148px] text-ink sm:pt-[162px]">
      <div className="border-y border-line bg-[#f6f5f2] px-4 py-7 sm:px-6 lg:py-10">
        <div className="mx-auto max-w-[1240px] overflow-hidden rounded-xl border border-line bg-white shadow-[0_24px_70px_rgba(43,39,35,0.09)]">
          <Progress step={step} />

          {step === 1 && (
            <section className="grid min-h-[650px] lg:grid-cols-[0.88fr_1.12fr]">
              <div className="flex items-center px-7 py-12 sm:px-12 lg:px-16">
                <div className="max-w-xl">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-dark">Free bathroom planning estimate</p>
                  <h1 className="mt-5 font-display text-[clamp(3rem,5vw,4.7rem)] font-medium leading-[0.94] tracking-[-0.03em]">Bathroom remodel, made simple.</h1>
                  <p className="mt-6 max-w-lg text-base leading-8 text-ink-soft">Choose the room size, project type, and upgrades you have in mind. We will build a personalized planning range in about two minutes.</p>
                  <div className="mt-8 grid gap-4 text-sm sm:grid-cols-3 lg:grid-cols-1">
                    {[
                      [Clock3, "Fast", "A guided five-step experience"],
                      [CircleDollarSign, "Clear", "See a planning range instantly"],
                      [ShieldCheck, "No obligation", "Review your options first"],
                    ].map(([Icon, title, body]) => {
                      const ItemIcon = Icon as typeof Clock3;
                      return <div key={String(title)} className="flex gap-4"><span className="flex size-10 flex-none items-center justify-center rounded-full bg-brand/10 text-brand-dark"><ItemIcon className="size-5" /></span><span><strong className="block">{String(title)}</strong><span className="text-ink-soft">{String(body)}</span></span></div>;
                    })}
                  </div>
                  <div className="mt-9"><PrimaryButton onClick={() => goTo(2)}>Get started <ArrowRight className="size-4" /></PrimaryButton></div>
                </div>
              </div>
              <div className="relative min-h-[420px] lg:min-h-full">
                <Image src="/images/hero-bathroom-custom.png" alt="Bright remodeled bathroom with a glass shower, freestanding tub, and double vanity" fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                <div className="absolute inset-x-5 bottom-5 rounded-lg bg-white/92 p-5 shadow-xl backdrop-blur sm:inset-x-auto sm:bottom-8 sm:left-8 sm:max-w-xs">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-dark">Designed for your home</p>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">Visual choices make it easy to build a starting plan before your consultation.</p>
                </div>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="px-5 py-9 sm:px-8 lg:px-12 lg:py-12">
              <div className="max-w-3xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-dark">Step 2 of 5</p>
                <h1 className="mt-3 font-display text-[clamp(2.4rem,4vw,3.6rem)] leading-none">Build your bathroom plan.</h1>
                <p className="mt-4 text-base leading-7 text-ink-soft">Make your selections below. These four sections stay together so it is easy to compare and adjust.</p>
              </div>

              <div className="mt-10 space-y-12">
                <fieldset>
                  <legend className="font-display text-3xl">1. Bathroom size</legend>
                  <p className="mt-2 text-sm text-ink-soft">Choose the closest match.</p>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {sizeOptions.map((option) => {
                      const active = size === option.id;
                      return <button key={option.id} type="button" aria-pressed={active} onClick={() => setSize(option.id)} className={`group overflow-hidden rounded-lg border bg-white text-left transition ${active ? "border-brand ring-2 ring-brand/20" : "border-line hover:border-brand/70"}`}>
                        <span className="relative block aspect-[4/3] overflow-hidden"><Image src={option.image} alt="" fill sizes="240px" className="object-cover transition duration-500 group-hover:scale-[1.03]" /><span className={`absolute right-3 top-3 flex size-7 items-center justify-center rounded-full ${active ? "bg-brand text-white" : "bg-white/90 text-transparent"}`}><Check className="size-4" /></span></span>
                        <span className="block p-4"><strong className="block text-sm">{option.label}</strong><span className="mt-1 block text-xs text-ink-soft">{option.detail}</span></span>
                      </button>;
                    })}
                  </div>
                  {showErrors && !size && <p className="mt-3 text-sm font-bold text-red-700">Choose a bathroom size to continue.</p>}
                </fieldset>

                <fieldset className="border-t border-line pt-10">
                  <legend className="font-display text-3xl">2. Project type</legend>
                  <p className="mt-2 text-sm text-ink-soft">Select the option that best fits your goal.</p>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {projectOptions.map((option) => {
                      const active = project === option.id;
                      return <button key={option.id} type="button" aria-pressed={active} onClick={() => setProject(option.id)} className={`relative flex min-h-44 flex-col items-center justify-center rounded-lg border bg-white px-5 py-6 text-center transition ${active ? "border-brand bg-brand/5 ring-2 ring-brand/20" : "border-line hover:border-brand/70"}`}>
                        <span className={`flex size-12 items-center justify-center rounded-full ${active ? "bg-brand text-white" : "bg-sand text-ink"}`}><option.Icon className="size-6" strokeWidth={1.6} /></span>
                        {active && <span className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full bg-brand text-white"><Check className="size-4" /></span>}
                        <strong className="mt-5 block text-sm">{option.label}</strong><span className="mt-2 block text-xs leading-5 text-ink-soft">{option.detail}</span>
                      </button>;
                    })}
                  </div>
                  {showErrors && !project && <p className="mt-3 text-sm font-bold text-red-700">Choose a project type to continue.</p>}
                </fieldset>

                <fieldset className="border-t border-line pt-10">
                  <legend className="font-display text-3xl">3. Upgrades</legend>
                  <p className="mt-2 text-sm text-ink-soft">Choose everything you would like to include.</p>
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    {upgrades.map(({ id, label, Icon }) => {
                      const active = selectedUpgrades.includes(id);
                      return <button key={id} type="button" aria-pressed={active} onClick={() => toggleUpgrade(id)} className={`relative flex min-h-28 flex-col items-center justify-center gap-3 rounded-lg border px-3 py-4 text-center text-xs font-bold transition ${active ? "border-brand bg-brand/8 text-brand-dark ring-2 ring-brand/15" : "border-line bg-white hover:border-brand/70"}`}>
                        {active && <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-brand text-white"><Check className="size-3" /></span>}
                        <Icon className="size-7" strokeWidth={1.6} />{label}
                      </button>;
                    })}
                  </div>
                </fieldset>

                <fieldset className="border-t border-line pt-10">
                  <legend className="font-display text-3xl">4. Project details</legend>
                  <p className="mt-2 text-sm text-ink-soft">A few details help make the range more useful.</p>
                  <div className="mt-5 grid gap-3 lg:grid-cols-2">
                    {detailQuestions.map((question) => (
                      <div key={question.id} className="flex min-h-16 items-center justify-between gap-4 rounded-lg border border-line bg-white px-4 py-3">
                        <span className="text-sm font-semibold">{question.label}</span>
                        <div className="flex rounded-md bg-sand p-1">
                          {[true, false].map((value) => <button key={String(value)} type="button" onClick={() => setDetails((current) => ({ ...current, [question.id]: value }))} className={`min-h-9 rounded px-3 text-xs font-bold ${details[question.id] === value ? "bg-white text-brand-dark shadow-sm" : "text-ink-muted"}`}>{value ? "Yes" : "No"}</button>)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <label className="text-sm font-bold">Finish level
                      <select value={finish} onChange={(event) => setFinish(event.target.value as Finish)} className="mt-2 min-h-12 w-full rounded-md border border-line bg-white px-4 font-normal">
                        <option value="standard">Standard finishes</option><option value="premium">Premium finishes</option><option value="luxury">Luxury finishes</option>
                      </select>
                    </label>
                    <label className="text-sm font-bold">Project county
                      <select value={county} onChange={(event) => setCounty(event.target.value)} className="mt-2 min-h-12 w-full rounded-md border border-line bg-white px-4 font-normal">
                        <option value="">Select county</option><option>Thurston County</option><option>Pierce County</option><option>Lewis County</option><option>Mason County</option><option>Other nearby area</option>
                      </select>
                    </label>
                  </div>
                  {showErrors && !county && <p className="mt-3 text-sm font-bold text-red-700">Choose your project county to continue.</p>}
                </fieldset>
              </div>

              <div className="mt-12 flex flex-col-reverse justify-between gap-3 border-t border-line pt-7 sm:flex-row">
                <BackButton onClick={() => goTo(1)} />
                <PrimaryButton onClick={continueProject}>Continue <ArrowRight className="size-4" /></PrimaryButton>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="grid min-h-[620px] lg:grid-cols-[1fr_0.75fr]">
              <form className="px-6 py-10 sm:px-10 lg:px-14 lg:py-14" onSubmit={(event) => { event.preventDefault(); calculate(); }} noValidate>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-dark">Step 3 of 5</p>
                <h1 className="mt-3 font-display text-[clamp(2.4rem,4vw,3.6rem)] leading-none">Almost finished.</h1>
                <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft">Enter your details to see the planning range. We&rsquo;ll send a copy to our team and follow up about a free in-home consultation &mdash; no obligation.</p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {[
                    ["firstName", "First name", "First name", "text"], ["lastName", "Last name", "Last name", "text"], ["email", "Email", "you@example.com", "email"], ["phone", "Phone", "(360) 123-4567", "tel"], ["city", "City", "Lacey", "text"], ["zip", "ZIP code", "98503", "text"],
                  ].map(([key, label, placeholder, type]) => <label key={key} className="text-sm font-bold">{label}<input type={type} value={contact[key as keyof typeof contact]} onChange={(event) => setContact((current) => ({ ...current, [key]: event.target.value }))} placeholder={placeholder} className="mt-2 min-h-12 w-full rounded-md border border-line bg-white px-4 font-normal" /></label>)}
                  <label className="text-sm font-bold">When are you planning to start?
                    <select value={contact.timeline} onChange={(event) => setContact((current) => ({ ...current, timeline: event.target.value }))} className="mt-2 min-h-12 w-full rounded-md border border-line bg-white px-4 font-normal"><option value="">Select timeline</option><option>As soon as possible</option><option>1 to 3 months</option><option>3 to 6 months</option><option>Just researching</option></select>
                  </label>
                </div>
                {showErrors && !contactComplete && <p className="mt-4 text-sm font-bold text-red-700">Complete your name, email, phone, and ZIP code to continue.</p>}
                <div className="mt-9 flex flex-col-reverse justify-between gap-3 sm:flex-row"><BackButton onClick={() => goTo(2)} /><PrimaryButton type="submit">Show my estimate <ChevronRight className="size-4" /></PrimaryButton></div>
              </form>
              <div className="relative hidden lg:block"><Image src="/images/modern master bathroom with shower.jpg" alt="Modern bathroom remodel with a walk-in shower" fill sizes="40vw" className="object-cover" /></div>
            </section>
          )}

          {step === 4 && (
            <section className="flex min-h-[560px] items-center justify-center px-6 py-16 text-center">
              <div className="max-w-lg">
                <span className="mx-auto flex size-24 items-center justify-center rounded-full bg-brand/10 text-brand-dark"><CircleDollarSign className="size-11" /></span>
                <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-dark">Step 4 of 5</p>
                <h1 className="mt-3 font-display text-4xl">Calculating your estimate...</h1>
                <p className="mt-4 text-sm leading-7 text-ink-soft">We are combining your room size, project type, selected upgrades, and finish level.</p>
                <div className="mx-auto mt-8 h-2 max-w-sm overflow-hidden rounded-full bg-sand"><span className="block h-full w-full origin-left animate-pulse rounded-full bg-brand" /></div>
              </div>
            </section>
          )}

          {step === 5 && (
            <section className="grid min-h-[630px] lg:grid-cols-[1fr_0.92fr]">
              <div className="flex items-center px-6 py-10 sm:px-10 lg:px-14">
                <div className="max-w-xl">
                  <span className="flex size-12 items-center justify-center rounded-full bg-brand/10 text-brand-dark"><CheckCircle2 className="size-7" /></span>
                  <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-dark">Your planning estimate</p>
                  <h1 className="mt-3 font-display text-[clamp(2.5rem,4vw,3.8rem)] leading-none">${estimate.low.toLocaleString()} to ${estimate.high.toLocaleString()}</h1>
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-2 text-xs font-bold text-brand-dark"><ShieldCheck className="size-4" /> Preliminary range</div>
                  <p className="mt-6 text-sm leading-7 text-ink-soft">This is a starting range based on your selections. Final pricing may vary after an in-home consultation, measurements, material selections, and project review.</p>
                  <div className="mt-7 rounded-lg border border-line bg-sand p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-dark">Your project</p>
                    <p className="mt-2 font-bold">{selectedSize?.label} · {selectedProject?.label}</p>
                    <p className="mt-1 text-sm text-ink-soft">{finish[0].toUpperCase() + finish.slice(1)} finishes · {selectedUpgrades.length} selected upgrades · {county}</p>
                  </div>
                  <p className="mt-5 text-xs leading-5 text-ink-muted">Based on recent South Sound project pricing. A firm quote follows an in-home measure and material selection.</p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link href="/contact?service=bathroom-remodel&intent=consultation" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-md bg-brand px-7 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-brand-dark">Schedule free consultation <ArrowRight className="size-4" /></Link>
                    <button type="button" onClick={() => goTo(2)} className="inline-flex min-h-13 items-center justify-center rounded-md border border-line bg-white px-6 text-sm font-bold hover:border-brand">Edit selections</button>
                  </div>
                </div>
              </div>
              <div className="relative min-h-[390px] lg:min-h-full">
                <Image src={selectedProject?.image ?? "/images/hero-bathroom-custom.png"} alt="Bathroom design inspiration based on the selected project type" fill sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" />
                <div className="absolute inset-x-5 bottom-5 rounded-lg bg-white/92 p-5 shadow-lg backdrop-blur sm:inset-x-auto sm:bottom-8 sm:left-8 sm:max-w-xs">
                  <p className="text-xs font-bold uppercase tracking-[0.13em] text-brand-dark">Inspiration image</p>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">Your consultation turns these selections into a measured, material-specific plan.</p>
                </div>
              </div>
            </section>
          )}
        </div>
        <div className="mx-auto mt-5 flex max-w-[1240px] flex-col justify-between gap-3 text-xs text-ink-muted sm:flex-row">
          <span>Planning estimate only. No obligation.</span>
          <Link href="/contact" className="inline-flex items-center gap-2 font-bold text-ink-soft hover:text-brand-dark"><Phone className="size-3.5" /> Prefer to talk? Contact our team</Link>
        </div>
      </div>
    </main>
  );
}
