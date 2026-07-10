import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Check, Clock3, PackageCheck, Ruler, ShieldCheck, X } from "lucide-react";
import { CONTAINER } from "@/components/layout";
import { CustomerReviews } from "@/components/home";
import PageCta from "@/components/PageCta";
import { createServiceSchema } from "@/lib/seo";
import { site } from "@/lib/site";
import DayByDayTimeline from "@/components/DayByDayTimeline";
import ProgramPricingExplorer from "@/components/ProgramPricingExplorer";

const SECTION = "py-14 sm:py-[4.5rem] lg:py-24";

export const metadata: Metadata = {
  title: "10 Day Kitchens Program | Fast Kitchen Remodel Lacey WA",
  description:
    "A streamlined 10 business day kitchen remodel program for qualified existing-layout kitchens in Lacey, Olympia, Tacoma, Thurston County, and Pierce County.",
  alternates: {
    canonical: "https://10daykitchens.com/10businessdaykitchenprogram",
  },
  openGraph: {
    title: "10 Day Kitchens Program | Fast Kitchen Remodel Lacey WA",
    description:
      "A streamlined 10 business day kitchen remodel program for qualified same-layout kitchens in Lacey, Olympia, Tacoma, Thurston County, and Pierce County.",
    url: "https://10daykitchens.com/10businessdaykitchenprogram",
  },
};

const qualifies = [
  "The kitchen keeps the same basic footprint and layout",
  "Cabinet configuration matches the existing layout",
  "Plumbing, gas lines, appliances, and electrical locations stay in place",
  "No load-bearing walls, structural components, or major layout changes are required",
  "Selections are finalized before the contract and all materials are staged before day one",
];

const benefits = [
  {
    icon: Clock3,
    title: "Faster install",
    body: "A disciplined 10 business day workflow for qualified kitchens, with materials ordered before the start date.",
  },
  {
    icon: PackageCheck,
    title: "Pre-planned selections",
    body: "Approved cabinetry, solid surface counters and backsplash, LVP flooring, and finish choices keep the schedule focused.",
  },
  {
    icon: Ruler,
    title: "Existing layout",
    body: "The footprint stays familiar while cabinets, counters, flooring, fixtures, and finishes get a cleaner new look.",
  },
  {
    icon: ShieldCheck,
    title: "Less disruption",
    body: "A faster kitchen remodel means less time living around construction and more confidence before work begins.",
  },
];

const process = [
  {
    step: "01",
    title: "Qualification review",
    body: "We confirm your current kitchen layout, plumbing, electrical, flooring conditions, site access, and material goals.",
  },
  {
    step: "02",
    title: "Design and selections",
    body: "You choose from approved cabinet and material selections. Everything is finalized before the project moves forward.",
  },
  {
    step: "03",
    title: "Material staging",
    body: "Materials are ordered, delivered, inspected, and in our possession before the 10 business day schedule begins.",
  },
  {
    step: "04",
    title: "10 business day install",
    body: "Our coordinated crew works through the planned scope without mid-project design changes or avoidable delays.",
  },
  {
    step: "05",
    title: "Functional completion",
    body: "The goal is a functional kitchen completed to the agreed scope, followed by final review and any eligible finish details.",
  },
];

const included = [
  "Same-footprint cabinet replacement and installation",
  "Approved solid surface countertops and solid surface backsplash",
  "Luxury Vinyl Plank flooring when subfloor conditions qualify",
  "Fixture replacement in existing locations",
  "Painting limited to kitchen walls and ceiling",
  "Coordinated project schedule and final walkthrough",
];

const notIncluded = [
  "Moving plumbing, gas lines, appliances, or electrical",
  "New circuits, panel upgrades, fixture relocations, or added outlets",
  "Load-bearing wall changes, structural modifications, or layout redesigns",
  "Specialty tile, hardwood, intricate patterns, or extended cure-time materials",
  "Custom carpentry, built-ins, or mid-project design changes",
  "Hidden damage, hazardous materials, or third-party delays within the 10-day timeline",
];

const faqs = [
  {
    question: "Is every kitchen eligible for a 10 day kitchen remodel?",
    answer:
      "No. The program is for qualified existing-layout kitchens only. If the project requires moved plumbing, relocated electrical, structural work, custom carpentry, or major layout changes, it belongs in our full custom kitchen remodel service.",
  },
  {
    question: "What does 10 business day completion mean?",
    answer:
      "It means completion of a functional kitchen consistent with the agreed scope. Items outside the defined scope, hidden conditions, material issues, third-party inspection delays, or homeowner-caused delays can extend the timeline.",
  },
  {
    question: "Can I choose my materials?",
    answer:
      "Yes, but selections must come from approved program materials and must be finalized before contract execution. Mid-project material or design changes are not part of the 10 business day workflow.",
  },
  {
    question: "What if my kitchen needs layout changes?",
    answer:
      "That is exactly why we also offer full custom kitchen remodeling. We can help you compare both options and choose the right service for your goals, budget, and timeline.",
  },
];

function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`mb-4 block text-[13px] font-bold uppercase tracking-[0.24em] text-brand ${className}`}>
      {children}
    </span>
  );
}

function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex h-[52px] items-center justify-center gap-3 bg-brand px-7 text-[12px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-brand-dark hover:shadow-[0_16px_34px_rgba(93,187,70,0.3)]"
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

function OutlineButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-[52px] items-center justify-center border border-line bg-white/55 px-7 text-[12px] font-bold uppercase tracking-[0.15em] text-ink transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:text-brand-dark"
    >
      {children}
    </Link>
  );
}

export default function TenDayProgramPage() {
  const jsonLd = createServiceSchema({
    name: "10 Day Kitchens Program",
    description:
      "A fast kitchen remodel program for qualified existing-layout kitchens in Lacey, Olympia, Tacoma, Thurston County, and Pierce County, installed in 10 business days with approved selections.",
    url: "https://10daykitchens.com/10businessdaykitchenprogram",
    serviceType: [
      "10 Day Kitchen Remodel",
      "Fast Kitchen Remodel",
      "Same Layout Kitchen Remodel",
    ],
  });

  return (
    <main className="bg-paper text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-paper pt-[158px] sm:pt-[176px]">
        <div className={`${CONTAINER} grid min-h-[610px] gap-10 pb-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:pb-18`}>
          <div className="max-w-2xl">
            <Eyebrow>10 Day Kitchen Remodel</Eyebrow>
            <h1 className="max-w-3xl text-[clamp(2.55rem,4.7vw,4.75rem)] leading-[1.02] text-ink">
              A faster kitchen remodel for the right home.
            </h1>
            <p className="mt-6 max-w-xl text-[1rem] leading-8 text-ink-soft">
              The 10 Day Kitchens Program is a streamlined, lower-disruption path for qualified kitchens in Lacey,
              Olympia, Tacoma, Thurston County, and Pierce County that keep the existing layout.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href="/contact">Check if you qualify</PrimaryButton>
              <OutlineButton href="/kitchen-remodel">Need custom instead?</OutlineButton>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[1.18/1] overflow-hidden border border-line bg-white shadow-[0_26px_80px_rgba(43,39,35,0.12)]">
              <Image
                src="/images/Completed Modern Kitchen.png"
                alt="Completed 10 day kitchen remodel with white cabinets and subway tile"
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 left-6 right-6 bg-[#2A2A2A] p-6 text-white shadow-[0_20px_60px_rgba(43,39,35,0.18)] sm:left-10 sm:right-auto sm:w-[430px]">
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-light">Program snapshot</p>
              <div className="mt-5 grid grid-cols-3 border-y border-white/14 py-4 text-center">
                <div>
                  <p className="font-serif-alt text-4xl leading-none text-white">10</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/68">Business days</p>
                </div>
                <div className="border-x border-white/14">
                  <p className="font-serif-alt text-4xl leading-none text-white">$</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/68">Lower cost path</p>
                </div>
                <div>
                  <p className="font-serif-alt text-4xl leading-none text-white">5</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/68">Year warranty</p>
                </div>
              </div>
              <p className="mt-4 text-sm font-semibold leading-7 text-white/76">
                Best for homeowners who want a high-quality kitchen renovation without moving the bones of the room.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-14 sm:py-18 lg:py-24">
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end`}>
          <div>
            <Eyebrow>Built for the right kitchen</Eyebrow>
            <h2 className="max-w-3xl font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em]">
              Keep the layout. Upgrade the experience.
            </h2>
            <p className="mt-6 max-w-xl text-[1.04rem] leading-8 text-ink-soft">
              The 10 Day Kitchens Program is for homeowners who already have the right footprint, but want a
              cleaner, faster path to new cabinets, counters, flooring, fixtures, and finishes.
            </p>
          </div>

          <div className="grid gap-5 border-y border-line py-6 sm:grid-cols-2">
            <div>
              <p className="font-serif-alt text-[clamp(3.5rem,7vw,6.2rem)] leading-none text-brand-dark">10</p>
              <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.18em] text-ink">Business day install</p>
            </div>
            <div className="space-y-4 text-base leading-8 text-ink-soft">
              <p>
                Speed comes from planning the entire remodel before day one, then protecting the schedule from
                avoidable layout changes and material delays.
              </p>
              <Link href="#program-fit" className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-brand-dark">
                See if it fits <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="program-fit" className="bg-white py-14 sm:py-18 lg:py-24">
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[0.78fr_1fr] lg:items-start`}>
          <div className="lg:sticky lg:top-32">
            <Eyebrow>Quick qualification check</Eyebrow>
            <h2 className="max-w-xl font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em]">
              This works when the room&apos;s bones stay in place.
            </h2>
            <p className="mt-5 max-w-md text-base leading-8 text-ink-soft">
              If one of these items does not fit your project, we can move you into the full custom remodel path
              instead.
            </p>
          </div>

          <div className="grid gap-x-8 gap-y-0 border-y border-line sm:grid-cols-2">
            {qualifies.map((item, index) => (
              <div key={item} className="group flex gap-4 border-b border-line py-6 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0">
                <span className="mt-1 flex size-8 flex-none items-center justify-center border border-brand/45 text-[12px] font-bold text-brand-dark transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
                  {index + 1}
                </span>
                <p className="text-[0.98rem] font-semibold leading-7 text-ink-soft transition-colors group-hover:text-ink">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-12 sm:py-16">
        <div className={`${CONTAINER} grid gap-6 lg:grid-cols-4`}>
          {benefits.map((benefit, index) => (
            <div key={benefit.title} className="group border-t border-line pt-6">
              <div className="mb-8 flex items-center justify-between">
                <benefit.icon className="size-6 text-brand transition-transform duration-300 group-hover:-translate-y-1" />
                <span className="font-serif-alt text-5xl leading-none text-ink/12">0{index + 1}</span>
              </div>
              <h3 className="text-[1.55rem] leading-tight transition-colors group-hover:text-brand-dark">{benefit.title}</h3>
              <p className="mt-4 text-[0.94rem] leading-7 text-ink-soft">{benefit.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${SECTION} bg-white`}>
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start`}>
          <div className="lg:sticky lg:top-36">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em]">
              Planned before day one.
            </h2>
            <p className="mt-6 max-w-md text-base leading-8 text-ink-soft">
              The speed comes from discipline: qualify the project, finalize decisions, stage the materials, then
              install without unnecessary changes.
            </p>
          </div>
          <div className="grid gap-0 border-y border-line">
            {process.map((item) => (
              <div key={item.step} className="group grid gap-5 border-b border-line py-7 last:border-b-0 sm:grid-cols-[76px_1fr]">
                <span className="font-serif-alt text-5xl leading-none text-brand/28">{item.step}</span>
                <div>
                  <h3 className="text-[1.65rem] leading-tight transition-colors group-hover:text-brand-dark">{item.title}</h3>
                  <p className="mt-3 max-w-2xl text-[0.96rem] leading-8 text-ink-soft">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DayByDayTimeline />

      <section className={`${SECTION} bg-paper`}>
        <div className={`${CONTAINER} grid gap-8 lg:grid-cols-2`}>
          <div className="border border-line bg-white p-7 sm:p-10">
            <Eyebrow>What is included</Eyebrow>
            <div className="mt-6 grid gap-4">
              {included.map((item) => (
                <div key={item} className="flex gap-3 border-t border-line pt-4 text-[0.98rem] leading-7 text-ink-soft">
                  <Check className="mt-1 size-4 flex-none text-brand" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-line bg-white p-7 sm:p-10">
            <Eyebrow>What is not included</Eyebrow>
            <div className="mt-6 grid gap-4">
              {notIncluded.map((item) => (
                <div key={item} className="flex gap-3 border-t border-line pt-4 text-[0.98rem] leading-7 text-ink-soft">
                  <X className="mt-1 size-4 flex-none text-brand-dark" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${SECTION} bg-paper pt-0`}>
        <div className={CONTAINER}>
          <ProgramPricingExplorer />
        </div>
      </section>

      <section className={`${SECTION} bg-paper`}>
        <div className={`${CONTAINER} grid gap-10 border border-line bg-white p-7 shadow-[0_24px_70px_rgba(43,39,35,0.08)] sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center`}>
          <div>
            <Eyebrow>Need a fully customized kitchen instead?</Eyebrow>
            <h2 className="font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em] text-ink">
              Choose the custom remodel path when the layout needs to change.
            </h2>
          </div>
          <div>
            <p className="text-base leading-8 text-ink-soft">
              If your kitchen remodel near me search is really about removing walls, relocating plumbing, adding
              electrical, or redesigning the footprint, our custom kitchen remodel service is built for that scope.
            </p>
            <div className="mt-8">
              <PrimaryButton href="/kitchen-remodel">View custom kitchen remodels</PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      <CustomerReviews />

      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[0.72fr_1fr] lg:items-start`}>
          <div className="lg:sticky lg:top-32">
            <Eyebrow>Program FAQs</Eyebrow>
            <h2 className="max-w-xl font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em]">Questions homeowners ask before they commit.</h2>
            <p className="mt-6 max-w-md text-base leading-8 text-ink-soft">
              The program is intentionally specific. These answers help you understand whether the 10 day path is
              the right fit before we ever start ordering materials.
            </p>
          </div>
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border border-line bg-paper px-5 py-5 transition-all duration-300 open:bg-white open:shadow-[0_18px_60px_rgba(43,39,35,0.07)] sm:px-7">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[1.15rem] font-bold leading-7 text-ink">
                  {faq.question}
                  <span className="flex size-8 flex-none items-center justify-center border border-brand/35 text-brand transition-all group-open:rotate-45 group-open:bg-brand group-open:text-white">+</span>
                </summary>
                <p className="mt-4 max-w-3xl text-[0.96rem] leading-8 text-ink-soft">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Ready to start planning?"
        title="Let's see if your kitchen can move faster."
        body="We will review your current layout, photos, selections, and timeline so you know whether the 10 Day Kitchens Program or a full custom kitchen remodel is the better fit."
        secondaryLabel={site.phone}
        secondaryHref={site.phoneHref}
        watermark="10 Days"
      />
    </main>
  );
}
