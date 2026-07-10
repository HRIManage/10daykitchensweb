import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Bath,
  Check,
  Clock3,
  CreditCard,
  Home,
  MapPin,
  PanelsTopLeft,
  ShieldCheck,
  ShowerHead,
  Sparkles,
  Wrench,
} from "lucide-react";
import { CONTAINER } from "@/components/layout";
import { CustomerReviews } from "@/components/home";
import FastBathBeforeAfterSlider from "@/components/FastBathBeforeAfterSlider";
import PageCta from "@/components/PageCta";
import { getServiceAreaCities, type City } from "@/lib/cities";
import { site } from "@/lib/site";

const SECTION = "py-14 sm:py-[4.5rem] lg:py-24";

export const metadata: Metadata = {
  title: "Fast Bath Lacey WA | Bathroom Upgrades, Walk-In Showers & Tub Conversions",
  description:
    "Fast Bath by 10 Day Kitchens provides bathroom upgrades in Lacey, Olympia, Tacoma, Tumwater, DuPont, University Place, Lakewood, Thurston County, and Pierce County. Tub to shower conversions, shower replacements, wall panels, vanities, fixtures, and more.",
  keywords: [
    "Bathroom Remodel Lacey WA",
    "Bathroom Remodeling Olympia",
    "Bathroom Remodeling Tacoma",
    "Bathroom Upgrades",
    "Bathroom Renovation",
    "Tub to Shower Conversion",
    "Shower Replacement",
    "Walk-In Shower Installation",
    "Bathroom Vanity Replacement",
    "Shower Wall Panels",
    "One-Day Bathroom Remodel",
    "Fast Bathroom Remodel",
    "Bathroom Remodel Near Me",
  ],
  alternates: {
    canonical: "https://10daykitchens.com/fast-bath",
  },
  openGraph: {
    title: "Fast Bath Lacey WA | Bathroom Upgrades by 10 Day Kitchens",
    description:
      "Fast Bath bathroom upgrades in Lacey, Olympia, Tacoma, Thurston County, and Pierce County, including tub to shower conversions, wall panels, vanities, and fixtures.",
    url: "https://10daykitchens.com/fast-bath",
  },
};

const trustBadges = ["Fast turnaround", "Licensed & insured", "Family owned", "Financing available"];

const benefits = [
  {
    icon: Clock3,
    title: "Fast turnaround",
    body: "Refresh the parts of your bathroom you use most without committing to a complete renovation.",
  },
  {
    icon: ShieldCheck,
    title: "Minimal disruption",
    body: "Keep the general layout intact whenever possible so your home stays cleaner and the process feels easier.",
  },
  {
    icon: PanelsTopLeft,
    title: "Premium materials",
    body: "Modern shower wall systems, waterproof panels, fixtures, vanities, counters, and accessories selected to last.",
  },
  {
    icon: BadgeCheck,
    title: "Professional install",
    body: "Experienced local installers, clear communication, clean job sites, and a finished bathroom you can trust.",
  },
];

const serviceCards = [
  { icon: ShowerHead, title: "Tub to Shower Conversion", body: "Replace an underused tub with a cleaner, easier walk-in shower." },
  { icon: ShowerHead, title: "Shower Replacement", body: "Upgrade the shower area with new walls, fixtures, glass, and accessories." },
  { icon: Bath, title: "Bathtub Replacement", body: "Swap an old tub for a fresh, comfortable, easier-to-clean replacement." },
  { icon: Sparkles, title: "Walk-In Shower", body: "Create a more open shower experience with modern surfaces and fixtures." },
  { icon: Wrench, title: "Vanity Upgrade", body: "Replace vanities, countertops, sinks, faucets, mirrors, and lighting." },
  { icon: Home, title: "Bathroom Refresh", body: "A focused update for fixtures, toilet, hardware, accessories, and finishes." },
  { icon: PanelsTopLeft, title: "Shower Wall Systems", body: "Waterproof wall panels for a clean look without a full custom tile project." },
  { icon: BadgeCheck, title: "Fixtures & Hardware", body: "Faucets, shower trim, towel bars, mirrors, lighting, and finishing details." },
];

const process = [
  {
    step: "01",
    title: "Free consultation",
    body: "We look at your bathroom, listen to your goals, and confirm whether Fast Bath or a full remodel fits best.",
  },
  {
    step: "02",
    title: "Design and selections",
    body: "Choose wall systems, fixtures, vanity options, counters, accessories, and finishes with guided support.",
  },
  {
    step: "03",
    title: "Professional installation",
    body: "Our team prepares the space, installs the selected upgrades, protects your home, and keeps the site clean.",
  },
  {
    step: "04",
    title: "Final walkthrough",
    body: "We review the finished upgrade with you and make sure the details are ready for everyday use.",
  },
];

const chooseUs = [
  "Fast bathroom remodel options for qualified projects",
  "High-quality craftsmanship and premium products",
  "Experienced installers who respect your home",
  "Locally owned team based in Lacey",
  "Licensed, insured, and backed by a workmanship warranty",
  "Clear communication and clean job sites",
];

const faqs = [
  {
    question: "How long does Fast Bath installation take?",
    answer:
      "Timing depends on the scope, materials, and site conditions, but Fast Bath is designed to be much faster and less disruptive than a full custom bathroom renovation.",
  },
  {
    question: "Can I keep my existing bathroom layout?",
    answer:
      "Yes. Fast Bath is built around keeping the general layout intact whenever possible. If you need plumbing moved, electrical relocated, or structural changes, our full bathroom remodel service is the better fit.",
  },
  {
    question: "Do I need permits?",
    answer:
      "Some upgrades may not require permits, while work involving plumbing, electrical, or code requirements may. We will review that during your consultation.",
  },
  {
    question: "What is included in a Fast Bath upgrade?",
    answer:
      "Common upgrades include tub to shower conversions, shower replacements, bathtub replacements, walk-in showers, wall panels, vanities, counters, sinks, faucets, toilets, lighting, mirrors, accessories, and hardware.",
  },
  {
    question: "Do you offer financing?",
    answer:
      "Yes. Financing options are available so qualified homeowners can plan a bathroom upgrade around a monthly payment.",
  },
  {
    question: "Do you install walk-in showers and shower wall panels?",
    answer:
      "Yes. Walk-in shower installation and waterproof shower wall panels are core Fast Bath services.",
  },
  {
    question: "Can you replace only my vanity?",
    answer:
      "Yes. Fast Bath can focus on a vanity replacement, countertop, sink, faucet, mirror, lighting, or other targeted bathroom upgrades.",
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

export default function FastBathPage() {
  const serviceCities = getServiceAreaCities();
  const counties = groupByCounty(serviceCities);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Fast Bath",
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      telephone: site.phone,
      email: site.email,
      address: site.address,
    },
    areaServed: serviceCities.map((city) => `${city.name}, WA`),
    serviceType: [
      "Bathroom Upgrades",
      "Tub to Shower Conversion",
      "Shower Replacement",
      "Walk-In Shower Installation",
      "Bathroom Vanity Replacement",
      "Shower Wall Panels",
    ],
    url: "https://10daykitchens.com/fast-bath",
  };

  return (
    <main className="bg-paper text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-paper pt-[158px] sm:pt-[176px]">
        <div className={`${CONTAINER} grid min-h-[620px] gap-10 pb-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:pb-18`}>
          <div className="max-w-2xl">
            <Eyebrow>Fast Bath Lacey, WA</Eyebrow>
            <h1 className="max-w-3xl text-[clamp(2.55rem,4.7vw,4.75rem)] leading-[1.02] text-ink">
              A faster bathroom upgrade without a full renovation.
            </h1>
            <p className="mt-6 max-w-xl text-[1rem] leading-8 text-ink-soft">
              Fast Bath is for homeowners who want a beautiful bathroom transformation with professional installation,
              premium materials, and less disruption than a complete custom remodel.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href="/contact">Schedule free consultation</PrimaryButton>
              <OutlineButton href="/contact">Get free estimate</OutlineButton>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-4">
              {trustBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-ink-soft">
                  <Check className="size-4 text-brand" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[440px] lg:mx-0 lg:ml-auto">
            <div className="relative aspect-[1.12/1] overflow-hidden border border-line bg-white shadow-[0_26px_80px_rgba(43,39,35,0.12)]">
              <Image
                src="/images/fast-bath-before-after-screenshot.png"
                alt="Fast Bath before and after shower upgrade comparison"
                fill
                priority
                sizes="(min-width: 1024px) 440px, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 left-6 right-6 bg-[#2A2A2A] p-6 text-white shadow-[0_20px_60px_rgba(43,39,35,0.18)] sm:left-10 sm:right-auto sm:w-[420px]">
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-light">Fast Bath is best for</p>
              <p className="mt-3 text-[0.96rem] font-semibold leading-7 text-white/82">
                Tub conversions, shower replacements, wall panels, vanities, fixtures, and targeted bathroom refreshes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${SECTION} bg-paper`}>
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-center`}>
          <div>
            <Eyebrow>Why Fast Bath?</Eyebrow>
            <h2 className="font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em]">
              A smarter path when the whole bathroom does not need to come apart.
            </h2>
          </div>
          <div className="space-y-5 text-[1rem] leading-8 text-ink-soft">
            <p>
              Not every bathroom needs a full demolition, custom tile shower, plumbing relocation, or layout redesign.
              Fast Bath focuses on the high-impact upgrades that can make the room feel cleaner, safer, and more modern.
            </p>
            <p>
              It is ideal for homeowners searching for bathroom upgrades, tub to shower conversion, shower replacement,
              walk-in shower installation, or a fast bathroom remodel near me.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className={`${CONTAINER} grid grid-cols-1 border-y border-line md:grid-cols-4`}>
          {benefits.map((benefit) => (
            <div key={benefit.title} className="group border-b border-line py-8 md:border-b-0 md:border-r md:px-7 md:last:border-r-0">
              <benefit.icon className="mb-7 size-6 text-brand transition-transform duration-300 group-hover:-translate-y-1" />
              <h3 className="text-[1.65rem] leading-tight transition-colors group-hover:text-brand-dark">{benefit.title}</h3>
              <p className="mt-4 text-sm leading-7 text-ink-soft">{benefit.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${SECTION} bg-paper`}>
        <div className={`${CONTAINER}`}>
          <div className="max-w-3xl">
            <Eyebrow>Services included</Eyebrow>
            <h2 className="font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em]">
              Focused upgrades with a finished-room feel.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCards.map((service) => (
              <div
                key={service.title}
                className="group border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/45 hover:shadow-[0_18px_54px_rgba(43,39,35,0.08)]"
              >
                <service.icon className="mb-8 size-6 text-brand" />
                <h3 className="text-[1.55rem] leading-tight transition-colors group-hover:text-brand-dark">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-ink-soft">{service.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${SECTION} bg-white`}>
        <div className={`${CONTAINER} grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center`}>
          <FastBathBeforeAfterSlider />
          <div className="bg-sand p-7 sm:p-10">
            <Eyebrow>Before and after gallery</Eyebrow>
            <h2 className="font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em]">
              Big visual change without rebuilding the entire bathroom.
            </h2>
            <p className="mt-5 text-base leading-8 text-ink-soft">
              Use this section for Fast Bath project photography: tub to shower conversions, shower replacements,
              new wall panels, updated vanities, fixtures, mirrors, and accessories.
            </p>
            <div className="mt-8">
              <PrimaryButton href="/portfolio">View more projects</PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      <section className={`${SECTION} bg-paper`}>
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[0.82fr_1fr] lg:items-start`}>
          <div className="lg:sticky lg:top-36">
            <Eyebrow>Our process</Eyebrow>
            <h2 className="font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em]">
              Simple, guided, and built to reduce stress.
            </h2>
            <p className="mt-6 max-w-md text-base leading-8 text-ink-soft">
              You get clear expectations, guided selections, professional installation, and a walkthrough before the
              project is complete.
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

      <section className={`${SECTION} bg-paper`}>
        <div className={`${CONTAINER} grid gap-10 border border-line bg-white p-7 shadow-[0_24px_70px_rgba(43,39,35,0.08)] sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center`}>
          <div>
            <Eyebrow>Need a full custom bathroom renovation?</Eyebrow>
            <h2 className="font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em] text-ink">
              Choose Bathroom Remodel when the layout, tile, or plumbing needs to change.
            </h2>
          </div>
          <div>
            <p className="text-base leading-8 text-ink-soft">
              If your project involves complete demolition, custom tile showers, tile flooring, waterproofing, moved
              plumbing, relocated electrical, layout changes, or luxury redesign, the full Bathroom Remodel page is
              the better path.
            </p>
            <div className="mt-8">
              <PrimaryButton href="/bathroom-remodel">View full bathroom remodel</PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      <section className={`${SECTION} bg-paper`}>
        <div className={`${CONTAINER} grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center`}>
          <div className="relative aspect-[1.38/1] overflow-hidden border border-line bg-white">
            <Image
              src="/images/luxury-master-bath-montage.png"
              alt="Luxury bathroom remodel montage with shower, vanity, and premium finishes"
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="bg-white p-7 shadow-[0_18px_70px_rgba(43,39,35,0.08)] sm:p-10">
            <Eyebrow>Why choose Fast Bath?</Eyebrow>
            <h2 className="font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em]">
              Local installers. Premium products. A cleaner path to a better bathroom.
            </h2>
            <div className="mt-8 grid gap-4">
              {chooseUs.map((item) => (
                <div key={item} className="flex gap-3 border-t border-line pt-4 text-[0.98rem] leading-7 text-ink-soft">
                  <Check className="mt-1 size-4 flex-none text-brand" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${SECTION} bg-white`}>
        <div className={`${CONTAINER}`}>
          <div className="grid gap-10 bg-[#2A2A2A] p-7 text-white shadow-[0_30px_90px_rgba(43,39,35,0.22)] sm:p-10 lg:grid-cols-[0.82fr_1fr] lg:items-center lg:p-12">
            <div>
              <div className="mb-8 flex size-14 items-center justify-center border border-white/15 bg-white/8 text-brand-light">
                <CreditCard className="size-7" />
              </div>
              <Eyebrow className="text-brand-light">Financing available</Eyebrow>
              <h2 className="font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em] text-white">
                Start your bathroom upgrade without waiting years.
              </h2>
            </div>
            <div>
              <p className="max-w-2xl text-base leading-8 text-white/76">
                Fast Bath is already a more focused path than a full custom renovation. Financing can make the project
                easier to plan by spreading the investment into a payment that fits your household.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {["Simple application", "Clear project scope", "No full remodel required"].map((item) => (
                  <div key={item} className="border border-white/12 bg-white/[0.04] px-4 py-3 text-[12px] font-bold uppercase tracking-[0.13em] text-white/86">
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href="/financing">Explore financing</PrimaryButton>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[54px] items-center justify-center border border-white/26 px-6 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:scale-[1.03] hover:border-brand hover:text-brand-light"
                >
                  Get free estimate
                  <ArrowRight className="ml-3 size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CustomerReviews />

      <section className={`${SECTION} bg-white`}>
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[0.7fr_1fr]`}>
          <div>
            <Eyebrow>Fast Bath FAQs</Eyebrow>
            <h2 className="font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em]">
              Answers before you start.
            </h2>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-xl font-bold text-ink">
                  {faq.question}
                  <span className="text-brand transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-3xl text-[0.96rem] leading-8 text-ink-soft">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={`${SECTION} bg-cream`}>
        <div className={CONTAINER}>
          <div className="mb-12">
            <Eyebrow>Where We Work</Eyebrow>
            <h2 className="max-w-3xl font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em]">
              Fast bathroom upgrades across the <em className="font-medium italic text-brand-dark">South Sound.</em>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-ink-soft">
              Based in Lacey and serving homeowners throughout Thurston County, Pierce County, Lewis County, and nearby South Sound communities.
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
                        className="group flex items-center gap-2 rounded-full border border-brand/35 bg-paper py-2.5 pl-3.5 pr-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:shadow-[0_10px_24px_rgba(93,187,70,0.25)]"
                      >
                        <MapPin className="size-4 flex-none text-brand transition-colors group-hover:text-white" />
                        <span className="font-display text-[15px] font-semibold text-ink transition-colors group-hover:text-white">
                          {city.name}
                        </span>
                      </Link>
                    ) : (
                      <span
                        key={city.slug}
                        className="flex items-center gap-2 rounded-full border border-line bg-paper/60 py-2.5 pl-3.5 pr-5"
                      >
                        <MapPin className="size-4 flex-none text-ink-soft/35" />
                        <span className="font-display text-[15px] font-semibold text-ink-soft/55">{city.name}</span>
                      </span>
                    )
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

      <PageCta
        eyebrow="Start your bathroom transformation today"
        title="Ready for a cleaner, brighter, easier bathroom?"
        body="Tell us what you want to upgrade, and we will help you choose between Fast Bath and a full custom bathroom renovation."
        primaryLabel="Schedule your free consultation"
        secondaryLabel={`Call ${site.phone}`}
        secondaryHref={site.phoneHref}
        watermark="Fast Bath"
      />
    </main>
  );
}
