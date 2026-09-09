import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bath,
  BadgeCheck,
  Calculator,
  Check,
  Clock3,
  ClipboardList,
  Home,
  MapPin,
  PackageCheck,
  PanelsTopLeft,
  Phone,
  ShowerHead,
  Sparkles,
  Wrench,
} from "lucide-react";
import { CONTAINER, SECTION } from "@/components/layout";
import { CustomerReviews } from "@/components/home";
import FastBathBeforeAfterSlider from "@/components/FastBathBeforeAfterSlider";
import FinancingStrip from "@/components/landing/FinancingStrip";
import LeadForm from "@/components/landing/LeadForm";
import StickyCtaBar from "@/components/landing/StickyCtaBar";
import { getServiceAreaCities, type City } from "@/lib/cities";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fast Bath: A New Bathroom in as Fast as 3 Days | Lacey, WA",
  description:
    "Fast Bath by 10 Day Kitchens — tub-to-shower conversions, shower replacements, and vanity updates installed in as fast as 3 days. Book a free in-home consultation in Lacey, Olympia, Tacoma, and the South Sound.",
  alternates: {
    canonical: "https://10daykitchens.com/fast-bath",
  },
  openGraph: {
    title: "Fast Bath: A New Bathroom in as Fast as 3 Days",
    description:
      "Tub-to-shower conversions, shower replacements, and vanity updates installed in as fast as 3 days. Free in-home consultation.",
    url: "https://10daykitchens.com/fast-bath",
    images: [{ url: "/images/fast-bath-hero-ba.jpg", alt: "Fast Bath before and after" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fast Bath: A New Bathroom in as Fast as 3 Days",
    description: "Tub-to-shower conversions and shower replacements installed in as fast as 3 days.",
    images: ["/images/fast-bath-hero-ba.jpg"],
  },
};

const heroTrust = [
  "Family-owned since 2004",
  "Licensed & bonded",
  "Premium materials",
  "Free in-home consultation",
];

const heroStats = [
  { value: "3 days", label: "Typical install" },
  { value: "5 years", label: "Workmanship warranty" },
  { value: "35+ yrs", label: "In the trade" },
  { value: "$0", label: "For your quote" },
];

const sectionLinks = [
  { label: "Before & after", href: "#before-after" },
  { label: "What's included", href: "#services" },
  { label: "How it works", href: "#process" },
  { label: "Reviews", href: "#reviews" },
  { label: "Full remodel?", href: "#compare" },
  { label: "Financing", href: "#financing" },
  { label: "FAQs", href: "#faqs" },
  { label: "Book a visit", href: "#book" },
];

const serviceCards = [
  { icon: ShowerHead, title: "Tub-to-shower conversion", body: "Replace an underused tub with a cleaner, easier walk-in shower." },
  { icon: ShowerHead, title: "Shower replacement", body: "New walls, fixtures, glass, and accessories in the existing footprint." },
  { icon: Bath, title: "Bathtub replacement", body: "Swap an old tub for a fresh, comfortable, easier-to-clean one." },
  { icon: Sparkles, title: "Walk-in shower", body: "A more open shower with modern surfaces and fixtures." },
  { icon: Wrench, title: "Vanity upgrade", body: "Vanities, countertops, sinks, faucets, mirrors, and lighting." },
  { icon: Home, title: "Bathroom refresh", body: "Fixtures, toilet, hardware, accessories, and finishes." },
  { icon: PanelsTopLeft, title: "Shower wall systems", body: "Waterproof panels for a clean look without a full tile project." },
  { icon: BadgeCheck, title: "Fixtures & hardware", body: "Faucets, shower trim, towel bars, mirrors, and lighting." },
];

const steps = [
  {
    icon: ClipboardList,
    title: "Free in-home consultation",
    body: "We look at your bathroom, listen to your goals, and confirm whether Fast Bath or a full remodel fits. You leave with a firm quote.",
  },
  {
    icon: PackageCheck,
    title: "We finalize selections and stage every material",
    body: "Wall systems, fixtures, vanity, counters, and finishes are chosen and ordered before install day, so nothing slows the crew down.",
  },
  {
    icon: Sparkles,
    title: "Install in as fast as 3 days",
    body: "Our local installers prepare the space, install your upgrades, protect your home, keep the site clean, and walk you through the finished room.",
  },
];

const chooseUs = [
  "Fast bathroom upgrades for qualified same-layout projects",
  "High-quality craftsmanship and premium products",
  "Experienced installers who respect your home",
  "Locally owned team based in Lacey",
  "Licensed, insured, and backed by a 5-year workmanship warranty",
  "Clear communication and clean job sites",
];

const faqs = [
  {
    question: "How is Fast Bath different from a full bathroom remodel?",
    answer:
      "Fast Bath focuses on the shower, tub, vanity, and fixtures within your existing layout — no moving plumbing or walls. That is what makes the fast install window possible. A full bathroom remodel replaces everything and can change the footprint.",
  },
  {
    question: "How much does a Fast Bath cost?",
    answer:
      "It depends on scope — a shower or tub update, a full refresh, or a primary suite are different projects. We give you a firm quote after an in-home visit, with no hidden costs. See our bathroom cost guide for how pricing works.",
  },
  {
    question: "Is “as fast as 3 days” realistic?",
    answer:
      "For qualified projects, yes. The speed comes from finalizing every selection and staging all materials before install day, so the crew works a tight, planned schedule instead of waiting on decisions or deliveries.",
  },
  {
    question: "Can I keep my existing bathroom layout?",
    answer:
      "Yes — Fast Bath is built around keeping the layout intact. If you need plumbing moved, electrical relocated, or structural changes, our full bathroom remodel service is the better fit.",
  },
  {
    question: "Do you handle permits?",
    answer:
      "When a project needs one — usually for plumbing or electrical changes — we manage the application and inspections. Most same-layout shower and tub replacements do not require a permit.",
  },
  {
    question: "Do you offer financing?",
    answer:
      "Yes. Monthly payment plans are available through GreenSky, with 0% promotional options for qualifying projects. We review the paths with you during your consultation.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "Lacey, Olympia, Tumwater, Tacoma, Lakewood, and the wider South Sound, from our showroom in Lacey.",
  },
];

function groupByCounty(cities: City[]) {
  const groups = new Map<string, City[]>();
  for (const city of cities) {
    const list = groups.get(city.county) ?? [];
    list.push(city);
    groups.set(city.county, list);
  }
  return [...groups.entries()];
}

export default function FastBathPage() {
  const serviceCities = getServiceAreaCities();
  const counties = groupByCounty(serviceCities);

  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Fast Bath",
      description:
        "Tub-to-shower conversions, shower replacements, wall panels, and vanity updates installed in as fast as 3 days for homes in Lacey, Olympia, Tacoma, and the South Sound.",
      provider: {
        "@type": "LocalBusiness",
        name: site.name,
        telephone: site.phone,
        email: site.email,
        address: site.address,
      },
      areaServed: serviceCities.map((city) => `${city.name}, WA`),
      serviceType: [
        "Tub to Shower Conversion",
        "Shower Replacement",
        "Walk-In Shower Installation",
        "Bathroom Vanity Replacement",
        "Shower Wall Panels",
      ],
      url: "https://10daykitchens.com/fast-bath",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <main className="bg-paper text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <StickyCtaBar />

      {/* Hero */}
      <section className="bg-paper pt-[150px] pb-14 sm:pt-[172px]">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[1fr_0.92fr] lg:items-start`}>
          <div className="max-w-2xl">
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-dark">
              Fast Bath &middot; Lacey, WA
            </p>
            <h1 className="mt-4 text-[clamp(2.5rem,4.7vw,4.7rem)] font-medium leading-[1.02] tracking-[-0.02em] text-ink">
              A new bathroom in{" "}
              <span className="whitespace-nowrap italic text-brand-dark">as few as 3 days.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-8 text-ink-soft">
              Professional installation and premium materials with far less disruption than a full
              remodel &mdash; tub-to-shower conversions, shower replacements, wall panels, and
              vanities.
            </p>
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {heroTrust.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-1.5 border border-line bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-ink"
                >
                  <Check className="size-3.5 text-brand-dark" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <div className="relative mt-9 hidden aspect-[1.28/1] w-full overflow-hidden border border-line bg-white shadow-[0_28px_80px_rgba(43,39,35,0.14)] lg:block">
              <Image
                src="/images/fast-bath-hero-ba.jpg"
                alt="Real Fast Bath tub-to-shower conversion — dated tub and shower curtain replaced with a walk-in glass shower"
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:pt-2">
            <LeadForm />
            <p className="mt-4 text-center text-[13px] text-ink-soft">
              Prefer a number first?{" "}
              <Link
                href="/bathroom-estimate"
                className="font-semibold text-brand-dark underline underline-offset-2"
              >
                Get an instant estimate
              </Link>
            </p>
            <div className="relative mt-6 aspect-[1.3/1] w-full overflow-hidden border border-line bg-white shadow-[0_20px_50px_rgba(43,39,35,0.12)] lg:hidden">
              <Image
                src="/images/fast-bath-hero-ba.jpg"
                alt="Real Fast Bath tub-to-shower conversion, before and after"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Estimator CTA + stat band */}
      <section className="relative overflow-hidden bg-forest text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 size-[380px] rounded-full bg-brand/10 blur-3xl"
        />
        <div className={`${CONTAINER} relative py-14 sm:py-16`}>
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="inline-flex items-center gap-2 border border-brand-light/40 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-light">
                <Calculator className="size-3.5" aria-hidden />
                Free instant estimate
              </p>
              <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,3.6vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
                What will <em className="not-italic text-brand-light">your</em> bathroom cost?
              </h2>
              <p className="mt-4 max-w-lg text-[1.02rem] leading-8 text-white/72">
                Answer six quick questions about your space and get a real price range in about two
                minutes. No phone call required, no obligation.
              </p>
            </div>

            <div className="border border-white/15 bg-white/[0.04] p-7 backdrop-blur-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
                A recent Fast Bath estimate
              </p>
              <p className="mt-2 font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-none text-white">
                $9,700 <span className="text-white/40">&ndash;</span> $12,400
              </p>
              <p className="mt-2 text-[13px] text-white/55">
                Standard bath &middot; tub-to-shower &middot; premium finishes
              </p>
              <Link
                href="/bathroom-estimate"
                className="mt-6 flex min-h-[56px] w-full items-center justify-center gap-2 bg-brand-light px-6 text-[13px] font-bold uppercase tracking-[0.12em] text-forest transition hover:bg-white"
              >
                Get my instant estimate
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <p className="mt-3 text-center text-[11px] text-white/45">
                Takes about 2 minutes &middot; 100% free
              </p>
            </div>
          </div>
        </div>

        <div className={`${CONTAINER} relative grid grid-cols-2 divide-x divide-white/12 border-t border-white/12 md:grid-cols-4`}>
          {heroStats.map((stat) => (
            <div key={stat.label} className="px-4 py-8 text-center">
              <p className="font-display text-[clamp(1.7rem,3vw,2.4rem)] font-semibold leading-none text-brand-light">
                {stat.value}
              </p>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Jump nav */}
      <nav aria-label="Page sections" className="border-b border-line bg-white">
        <div className={`${CONTAINER} flex gap-1 overflow-x-auto py-1`}>
          {sectionLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap px-4 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-ink-soft transition hover:text-brand-dark"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Before / after — the proof, up front */}
      <section id="before-after" className={`${SECTION} scroll-mt-24 bg-paper`}>
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center`}>
          <div className="order-2 lg:order-1">
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-dark">
              Before &amp; after
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,3.3vw,3.2rem)] font-medium leading-[1.06] tracking-[-0.02em]">
              Same footprint. A completely different room.
            </h2>
            <p className="mt-5 max-w-md text-base leading-8 text-ink-soft">
              This one was a tired tub with a shower curtain and a dark vanity. Ten days later:
              a walk-in glass shower, white cabinetry, and a hex-tile floor &mdash; no walls moved,
              no plumbing relocated. Drag the handle to see it.
            </p>
            <Link
              href="/portfolio"
              className="mt-8 inline-flex min-h-[52px] items-center gap-2 bg-brand-dark px-7 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-ink"
            >
              See more projects
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="order-1 lg:order-2">
            <div className="mx-auto w-full max-w-[420px] lg:ml-auto lg:mr-0">
              <FastBathBeforeAfterSlider />
            </div>
          </div>
        </div>
      </section>

      {/* Two ways to start */}
      <section className="scroll-mt-24 bg-forest py-16 text-white sm:py-20">
        <div className={CONTAINER}>
          <div className="max-w-2xl">
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-light">
              Ready to start?
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,3.6vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
              Two ways to get your Fast Bath moving.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="flex flex-col border border-white/15 bg-white/[0.04] p-8">
              <Clock3 className="size-7 text-brand-light" aria-hidden />
              <h3 className="mt-5 font-display text-[1.5rem] font-medium">Book a free in-home visit</h3>
              <p className="mt-2 flex-1 text-[0.98rem] leading-7 text-white/70">
                45&ndash;60 minutes. We measure the space, walk through materials, and leave you
                with a firm, written quote. No pressure, no cost.
              </p>
              <Link
                href="#book"
                className="mt-6 inline-flex min-h-[54px] items-center justify-center gap-2 bg-brand-light px-6 text-[13px] font-bold uppercase tracking-[0.12em] text-forest transition hover:bg-white"
              >
                Pick a time
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <div className="flex flex-col border border-white/15 bg-white/[0.04] p-8">
              <Calculator className="size-7 text-brand-light" aria-hidden />
              <h3 className="mt-5 font-display text-[1.5rem] font-medium">Get an instant estimate</h3>
              <p className="mt-2 flex-1 text-[0.98rem] leading-7 text-white/70">
                Six quick questions, about two minutes, and you get a real price range on screen
                &mdash; before you ever talk to anyone.
              </p>
              <Link
                href="/bathroom-estimate"
                className="mt-6 inline-flex min-h-[54px] items-center justify-center gap-2 border border-white px-6 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-forest"
              >
                Start the estimate
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
          <p className="mt-8 text-[0.95rem] text-white/60">
            Or just call us &mdash;{" "}
            <a href={site.phoneHref} className="font-semibold text-brand-light hover:text-white">
              {site.phone}
            </a>
            , Monday to Friday.
          </p>
        </div>
      </section>

      {/* What Fast Bath covers */}
      <section id="services" className={`${SECTION} scroll-mt-24 bg-sand`}>
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-dark">
              What Fast Bath covers
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,3.3vw,3.2rem)] font-medium leading-[1.06] tracking-[-0.02em]">
              Focused upgrades with a finished-room feel.
            </h2>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {serviceCards.map((service) => (
              <div key={service.title} className="flex flex-col bg-white p-6">
                <service.icon className="mb-6 size-6 text-brand-dark" aria-hidden />
                <h3 className="text-[1.15rem] font-semibold leading-tight text-ink">{service.title}</h3>
                <p className="mt-2.5 flex-1 text-[0.9rem] leading-7 text-ink-soft">{service.body}</p>
                <Link
                  href="/bathroom-estimate"
                  className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-dark transition hover:gap-2.5 hover:text-ink"
                >
                  Price this
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[0.95rem] text-ink-soft">
            Not sure which one you need?{" "}
            <Link
              href="/bathroom-estimate"
              className="font-semibold text-brand-dark underline underline-offset-4"
            >
              Answer six questions and we&rsquo;ll price it for you
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 3-step process — dark for contrast */}
      <section id="process" className="scroll-mt-24 bg-forest py-16 text-white sm:py-20 lg:py-24">
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-light">
              How it works
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,3.3vw,3.2rem)] font-medium leading-[1.06] tracking-[-0.02em]">
              Three steps, no drift.
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="border-t-2 border-brand-light/40 pt-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-[3.2rem] font-semibold leading-none text-brand-light">
                    {i + 1}
                  </span>
                  <step.icon className="size-5 text-brand-light" aria-hidden />
                </div>
                <h3 className="mt-4 text-[1.2rem] font-semibold leading-snug text-white">{step.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-7 text-white/70">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="reviews" className="scroll-mt-24">
        <CustomerReviews />
      </div>

      {/* Fast Bath vs full remodel */}
      <section id="compare" className={`${SECTION} scroll-mt-24 bg-white`}>
        <div
          className={`${CONTAINER} grid gap-10 border border-line bg-paper p-7 shadow-[0_24px_70px_rgba(43,39,35,0.08)] sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center`}
        >
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-dark">
              Need a full custom renovation?
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em] text-ink">
              Choose a full Bathroom Remodel when the layout, tile, or plumbing needs to change.
            </h2>
          </div>
          <div>
            <p className="text-base leading-8 text-ink-soft">
              If your project involves complete demolition, custom tile showers, tile flooring,
              waterproofing, moved plumbing, relocated electrical, layout changes, or a luxury
              redesign, the full Bathroom Remodel path is the better fit.
            </p>
            <ul className="mt-6 grid gap-3">
              {chooseUs.map((item) => (
                <li key={item} className="flex gap-3 border-t border-line pt-3 text-[0.96rem] leading-7 text-ink-soft">
                  <Check className="mt-1 size-4 flex-none text-brand-dark" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="/bathroom-remodel"
                className="inline-flex min-h-[52px] items-center gap-2 border border-line bg-white px-7 text-[13px] font-bold uppercase tracking-[0.12em] text-ink transition hover:border-brand-dark hover:text-brand-dark"
              >
                View full bathroom remodel
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div id="financing" className="scroll-mt-24">
        <FinancingStrip />
      </div>

      {/* Showroom / visit us */}
      <section className={`${SECTION} bg-white`}>
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center`}>
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-dark">
              Visit the showroom
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,3.3vw,3.2rem)] font-medium leading-[1.06] tracking-[-0.02em]">
              See and touch it before you decide.
            </h2>
            <p className="mt-5 max-w-md text-base leading-8 text-ink-soft">
              Cabinet doors, quartz slabs, tile, and fixture finishes are all in one place in Lacey.
              Most homeowners finish their selections in a single visit.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
            <div className="bg-paper p-6">
              <MapPin className="mb-4 size-5 text-brand-dark" aria-hidden />
              <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-ink">Showroom</p>
              <p className="mt-2 text-[0.95rem] leading-7 text-ink-soft">{site.address}</p>
              <a
                href={site.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-[12px] font-bold uppercase tracking-[0.12em] text-brand-dark underline underline-offset-4"
              >
                Get directions
              </a>
            </div>
            <div className="bg-paper p-6">
              <Clock3 className="mb-4 size-5 text-brand-dark" aria-hidden />
              <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-ink">Hours</p>
              <div className="mt-2 space-y-1 text-[0.95rem] leading-7 text-ink-soft">
                {site.showroomHours.map((entry) => (
                  <p key={entry.day}>
                    <span className="font-semibold text-ink">{entry.day}:</span> {entry.time}
                  </p>
                ))}
              </div>
            </div>
            <div className="bg-paper p-6 sm:col-span-2">
              <Phone className="mb-4 size-5 text-brand-dark" aria-hidden />
              <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-ink">
                Prefer to talk it through?
              </p>
              <a
                href={site.phoneHref}
                className="mt-2 inline-block font-display text-[1.6rem] font-semibold text-brand-dark hover:text-ink"
              >
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section id="faqs" className={`${SECTION} scroll-mt-24 bg-paper`}>
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[0.7fr_1fr]`}>
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-dark">Fast Bath FAQs</p>
            <h2 className="mt-3 font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em]">
              Answers before you book.
            </h2>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[1.05rem] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="text-xl leading-none text-brand-dark transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-[0.96rem] leading-7 text-ink-soft">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>


      {/* Service area */}
      <section className={`${SECTION} bg-cream`}>
        <div className={CONTAINER}>
          <div className="mb-12">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-dark">Where we work</p>
            <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em]">
              Fast bathroom upgrades across the{" "}
              <em className="font-medium italic text-brand-dark">South Sound.</em>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-ink-soft">
              Based in Lacey and serving homeowners throughout Thurston County, Pierce County, Lewis
              County, and nearby South Sound communities.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            {counties.map(([county, countyCities]) => (
              <div key={county}>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-ink-muted">{county}</p>
                <div className="flex flex-wrap gap-3">
                  {countyCities.map((city) =>
                    city.published ? (
                      <Link
                        key={city.slug}
                        href={`/kitchen-remodel/${city.slug}`}
                        className="group flex items-center gap-2 rounded-full border border-brand/35 bg-paper py-2.5 pl-3.5 pr-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-dark hover:bg-brand-dark"
                      >
                        <MapPin className="size-4 flex-none text-brand-dark transition-colors group-hover:text-white" aria-hidden />
                        <span className="font-display text-[15px] font-semibold text-ink transition-colors group-hover:text-white">
                          {city.name}
                        </span>
                      </Link>
                    ) : (
                      <span
                        key={city.slug}
                        className="flex items-center gap-2 rounded-full border border-line bg-paper/60 py-2.5 pl-3.5 pr-5"
                      >
                        <MapPin className="size-4 flex-none text-ink-soft/35" aria-hidden />
                        <span className="font-display text-[15px] font-semibold text-ink-soft/55">{city.name}</span>
                      </span>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-[14.5px] leading-relaxed text-ink-soft/70">
            Don&apos;t see your city listed? We often serve homeowners just outside these areas. Call{" "}
            <a href={site.phoneHref} className="font-semibold text-brand-dark hover:underline">
              {site.phone}
            </a>{" "}
            and we&apos;ll let you know right away.
          </p>
        </div>
      </section>

      {/* Closing CTA — repeat the form */}
      <section id="book" className="scroll-mt-24 bg-forest py-16 text-white sm:py-20 lg:py-24">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[1fr_0.92fr] lg:items-center`}>
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-light">
              Last step
            </p>
            <h2 className="mt-3 max-w-xl font-display text-[clamp(2.1rem,4vw,3.8rem)] font-medium leading-[1.02] tracking-[-0.02em]">
              A new bathroom is closer than you think.
            </h2>
            <p className="mt-5 max-w-md text-[1.05rem] leading-8 text-white/72">
              Book your free in-home consultation. We bring the plan, the materials, and a firm
              quote &mdash; you decide from there.
            </p>
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {heroTrust.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-1.5 border border-white/20 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white/85"
                >
                  <Check className="size-3.5 text-brand-light" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={site.phoneHref}
              className="mt-8 inline-flex items-center gap-2.5 font-display text-[1.7rem] font-semibold text-brand-light transition hover:text-white"
            >
              <Phone className="size-5" aria-hidden />
              {site.phone}
            </a>
          </div>
          <div>
            <LeadForm
              variant="section"
              heading="Book your free consultation"
              sublabel="We'll confirm a time that works and bring everything to your door."
            />
          </div>
        </div>
      </section>
    </main>
  );
}
