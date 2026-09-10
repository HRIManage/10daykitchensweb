import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Accessibility,
  ArrowRight,
  BadgeCheck,
  Check,
  Clock3,
  CreditCard,
  House,
  MapPin,
  PanelsTopLeft,
  Phone,
  ShieldCheck,
  ShowerHead,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { CONTAINER } from "@/components/layout";
import { CustomerReviews } from "@/components/home";
import FastBathBeforeAfterSlider from "@/components/FastBathBeforeAfterSlider";
import { getServiceAreaCities, type City } from "@/lib/cities";
import { site } from "@/lib/site";

const SECTION = "py-16 sm:py-20 lg:py-28";
const HEADING = "font-display text-[clamp(2.15rem,4vw,4rem)] font-medium leading-[1.02] tracking-[-0.025em]";

export const metadata: Metadata = {
  title: "Fast Bath Lacey WA | Bathroom Upgrades, Walk-In Showers & Tub Conversions",
  description:
    "Fast Bath by 10 Day Kitchens provides bathroom upgrades in Lacey, Olympia, Tacoma, Tumwater, DuPont, University Place, Lakewood, Thurston County, and Pierce County. Tub to shower conversions, shower replacements, wall panels, vanities, fixtures, and more.",
  alternates: { canonical: "https://10daykitchens.com/fast-bath" },
  openGraph: {
    title: "Fast Bath Lacey WA | Bathroom Upgrades by 10 Day Kitchens",
    description:
      "Fast Bath bathroom upgrades in Lacey, Olympia, Tacoma, Thurston County, and Pierce County, including tub to shower conversions, wall panels, vanities, and fixtures.",
    url: "https://10daykitchens.com/fast-bath",
    images: [{ url: "/images/fast-bath-before-after.jpg", alt: "Fast Bath bathroom before and after" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/fast-bath-before-after.jpg"],
  },
};

const trustItems = [
  { icon: Clock3, title: "Fast turnaround", body: "Focused upgrades with less disruption." },
  { icon: PanelsTopLeft, title: "Quality materials", body: "Waterproof systems and durable finishes." },
  { icon: Wrench, title: "Professional install", body: "Local installers who respect your home." },
  { icon: ShieldCheck, title: "Workmanship warranty", body: "Licensed, insured, and backed locally." },
];

type ServiceGroup = {
  /** Anchor id, so ads and other pages can link straight to the card. */
  id?: string;
  eyebrow?: string;
  /** Short label pinned to the photo. */
  badge?: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  items: string[];
  icon: LucideIcon;
  cta?: { label: string; href: string };
};

// The third card renders full-width, so the service we most want to feature goes last.
const serviceGroups: ServiceGroup[] = [
  {
    title: "Tub and shower updates",
    body: "Replace the hardest-working part of your bathroom while keeping the existing footprint whenever possible.",
    image: "/images/fast-bath-simple-service.png",
    imageAlt: "Bright bathroom with a tub, wood vanity, and modern black fixtures",
    items: ["Tub to shower conversion", "Shower replacement", "Bathtub replacement", "Shower wall systems"],
    icon: ShowerHead,
  },
  {
    title: "A complete room refresh",
    body: "Bring the rest of the bathroom up to date with coordinated surfaces, storage, lighting, and finishing details.",
    image: "/images/hero-bathroom-custom.png",
    imageAlt: "Finished bathroom with double vanity, glass shower, and freestanding tub",
    items: ["Vanity upgrade", "Counters and sinks", "Fixtures and hardware", "Mirrors, lighting, and accessories"],
    icon: Sparkles,
  },
  {
    id: "accessible-bathrooms",
    eyebrow: "Safer, easier bathing",
    badge: "ADA-compliant design",
    title: "Accessible bathroom remodel services",
    body: "An ADA-compliant, beautifully designed bathroom that delivers peace of mind. Every grab bar, seat, and threshold is planned around how you use the room, so it feels safe without looking clinical.",
    image: "/images/white-oak-spa-bathroom-service.png",
    imageAlt: "Spacious bathroom with a low-threshold glass walk-in shower and open floor space",
    items: [
      "Low-threshold walk-in showers",
      "Grab bars and shower seats",
      "Comfort-height toilets",
      "Slip-resistant flooring",
      "Handheld showerheads",
      "Lever-style faucets and handles",
    ],
    icon: Accessibility,
    cta: { label: "Plan an accessible bathroom", href: "/contact" },
  },
];

const process = [
  {
    title: "Build your estimate",
    body: "Choose your room size, project type, and preferred upgrades in about two minutes.",
  },
  {
    title: "Free in-home consultation",
    body: "We measure your bathroom, listen to your goals, and confirm whether Fast Bath or a full remodel fits best.",
  },
  {
    title: "Design and selections",
    body: "Choose wall systems, fixtures, vanity options, counters, accessories, and finishes with guided support.",
  },
  {
    title: "Professional installation",
    body: "Our team protects your home, installs the selected upgrades, keeps the site clean, and completes a final walkthrough.",
  },
];

const chooseUs = [
  "Fast bathroom options for qualified projects",
  "High-quality craftsmanship and premium products",
  "Experienced installers who respect your home",
  "Locally owned team based in Lacey",
  "Licensed, insured, and backed by a workmanship warranty",
  "Clear communication and clean job sites",
];

// Same terms as the sitewide FinancingStrip, so the page never promises more than /financing does.
const financingPoints = [
  { term: "Monthly payment plans", detail: "Available through GreenSky." },
  { term: "0% promotional options", detail: "For qualifying projects." },
  { term: "No surprises", detail: "Scope and pricing explained before work begins." },
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
      "Yes. Fast Bath is built around keeping the general layout intact whenever possible. If plumbing, electrical, or walls need to move, our full bathroom remodel service is usually the better fit.",
  },
  {
    question: "Can you make my bathroom more accessible?",
    answer:
      "Yes. We install low-threshold walk-in showers, grab bars, shower seats, comfort-height toilets, and slip-resistant flooring, planned to ADA accessibility guidelines. If you need wider doorways or relocated plumbing, our full bathroom remodel service is the better fit.",
  },
  {
    question: "What is included in a Fast Bath upgrade?",
    answer:
      "Common upgrades include tub to shower conversions, shower and bathtub replacements, wall panels, vanities, counters, sinks, faucets, toilets, lighting, mirrors, accessories, and hardware.",
  },
  {
    question: "Do you offer financing?",
    answer:
      "Yes. Financing options are available so qualified homeowners can plan a bathroom upgrade around a monthly payment.",
  },
  {
    question: "Do you handle permits?",
    answer:
      "Requirements depend on the work involved. We review plumbing, electrical, structural, and local code needs with you during the consultation.",
  },
];

function groupByCounty(cities: City[]) {
  const groups = new Map<string, City[]>();
  for (const city of cities) groups.set(city.county, [...(groups.get(city.county) ?? []), city]);
  return [...groups.entries()];
}

function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-13 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-brand px-7 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_14px_34px_rgba(93,187,70,0.28)] active:translate-y-px"
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}

function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-13 items-center justify-center whitespace-nowrap rounded-full border border-ink/25 bg-paper px-7 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-ink transition duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand-dark active:translate-y-px"
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
      "Accessible Bathroom Remodel",
    ],
    url: "https://10daykitchens.com/fast-bath",
  };

  return (
    <main className="overflow-clip bg-paper text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="pt-[78px] sm:pt-[127px] xl:pt-[158px]">
        <div className="grid min-h-[650px] bg-white lg:grid-cols-[minmax(0,1fr)_410px]">
          <div className="relative flex min-h-[590px] items-end overflow-hidden px-6 py-14 sm:px-10 lg:min-h-[650px] lg:px-[max(5vw,64px)] lg:py-16">
            <Image
              src="/images/hero-bathroom-custom.png"
              alt="Bright completed bathroom remodel with a glass shower, freestanding tub, and double vanity"
              fill
              priority
              sizes="(min-width: 1024px) calc(100vw - 410px), 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#182116]/94 via-[#182116]/62 to-[#182116]/25 lg:bg-gradient-to-r lg:from-[#182116]/90 lg:via-[#182116]/55 lg:to-transparent" />
            <div className="relative max-w-[690px] text-white">
              <p className="mb-5 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-light">Fast Bath in Lacey, WA</p>
              <h1 className="font-display text-[clamp(3.3rem,5.6vw,5.7rem)] font-medium leading-[0.92] tracking-[-0.035em]">
                A better bathroom, made easy.
              </h1>
              <p className="mt-7 max-w-[560px] text-[1.05rem] leading-8 text-white/90">
                Focused bathroom upgrades planned and installed by your local South Sound remodeling team.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href="/bathroom-estimator">Free instant estimate</PrimaryButton>
                <Link href={site.phoneHref} className="inline-flex min-h-13 items-center justify-center whitespace-nowrap rounded-full border border-white/70 bg-white/10 px-7 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition hover:bg-white hover:text-ink">
                  Call {site.phone}
                </Link>
              </div>
            </div>
          </div>

          <aside className="flex items-center bg-white px-7 py-12 sm:px-10 lg:px-9">
            <div className="w-full">
              <h2 className="font-sans text-[2rem] font-bold leading-[1.04] tracking-[-0.035em] text-ink">Start your free bathroom estimate</h2>
              <p className="mt-4 text-sm leading-7 text-ink-soft">See a preliminary project range before scheduling your in-home consultation.</p>
              <div className="mt-7 space-y-5">
                {[
                  [Clock3, "Takes about two minutes"],
                  [Sparkles, "Visual project choices"],
                  [CreditCard, "Instant planning range"],
                  [ShieldCheck, "No obligation"],
                ].map(([Icon, label]) => {
                  const ItemIcon = Icon as typeof Clock3;
                  return (
                    <div key={String(label)} className="flex items-center gap-4 border-b border-line pb-5 last:border-0 last:pb-0">
                      <span className="flex size-10 flex-none items-center justify-center rounded-full bg-brand/10 text-brand-dark"><ItemIcon className="size-5" aria-hidden="true" /></span>
                      <span className="text-sm font-bold">{String(label)}</span>
                    </div>
                  );
                })}
              </div>
              <Link href="/bathroom-estimator" className="group mt-8 inline-flex min-h-14 w-full items-center justify-center gap-3 whitespace-nowrap rounded-full bg-brand px-6 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-brand-dark active:translate-y-px">
                Get my estimate <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <p className="mt-4 text-center text-xs leading-5 text-ink-muted">A final quote follows an in-home measure and material review.</p>
            </div>
          </aside>
        </div>
      </section>

      <nav aria-label="Fast Bath page sections" className="sticky top-[77px] z-20 xl:top-[109px] border-y border-line bg-paper/95 backdrop-blur-md">
        <div className={`${CONTAINER} flex min-h-14 items-center gap-7 overflow-x-auto text-[11px] font-bold uppercase tracking-[0.14em] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}>
          <a href="#services" className="whitespace-nowrap transition hover:text-brand-dark">Services</a>
          <a href="#process" className="whitespace-nowrap transition hover:text-brand-dark">How it works</a>
          <a href="#results" className="whitespace-nowrap transition hover:text-brand-dark">Before and after</a>
          <a href="#financing" className="whitespace-nowrap transition hover:text-brand-dark">Financing</a>
          <a href="#faqs" className="whitespace-nowrap transition hover:text-brand-dark">FAQs</a>
          <a href="#service-area" className="whitespace-nowrap transition hover:text-brand-dark">Service area</a>
          <Link href="/bathroom-estimator" className="ml-auto hidden whitespace-nowrap text-brand-dark lg:block">Get started</Link>
        </div>
      </nav>

      <section aria-label="Why choose Fast Bath" className="border-b border-line bg-white">
        <div className={`${CONTAINER} grid sm:grid-cols-2 lg:grid-cols-4`}>
          {trustItems.map((item) => (
            <div key={item.title} className="flex gap-4 border-b border-line py-7 sm:px-6 lg:border-b-0 lg:border-r lg:last:border-r-0">
              <item.icon className="mt-1 size-5 flex-none text-brand" aria-hidden="true" />
              <div>
                <h2 className="text-[0.92rem] font-bold">{item.title}</h2>
                <p className="mt-1 text-sm leading-6 text-ink-soft">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className={`${SECTION} scroll-mt-48`}>
        <div className={CONTAINER}>
          <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.22em] text-brand-dark">Bathroom remodeling options</p>
          <h2 className={`${HEADING} max-w-3xl`}>Update what matters most.</h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-ink-soft">
            Keep the general layout and focus your budget on the shower, tub, vanity, and finishes you use every day.
          </p>

          <div className="mt-12 grid gap-5 lg:grid-cols-12">
            {serviceGroups.map((service, index) => {
              const wide = index === 2;
              return (
                <article
                  key={service.title}
                  id={service.id}
                  className={`group scroll-mt-48 overflow-hidden border border-line bg-white ${index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-12 lg:grid lg:grid-cols-[0.9fr_1.1fr]"}`}
                >
                  <div className={`relative overflow-hidden ${wide ? "min-h-[320px]" : "aspect-[16/10]"}`}>
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes={wide ? "(min-width: 1024px) 45vw, 100vw" : "(min-width: 1024px) 55vw, 100vw"}
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                    />
                    {service.badge ? (
                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink shadow-[0_8px_24px_rgba(43,39,35,0.14)]">
                        {service.badge}
                      </span>
                    ) : null}
                  </div>
                  <div className={`p-7 sm:p-9 ${wide ? "lg:flex lg:flex-col lg:justify-center lg:p-12" : ""}`}>
                    <service.icon className="mb-6 size-7 text-brand" aria-hidden="true" />
                    {service.eyebrow ? (
                      <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-dark">{service.eyebrow}</p>
                    ) : null}
                    <h3 className="font-display text-[2rem] font-medium leading-tight">{service.title}</h3>
                    <p className="mt-4 max-w-xl text-[0.96rem] leading-7 text-ink-soft">{service.body}</p>
                    <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                      {service.items.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm font-semibold">
                          <Check className="size-4 flex-none text-brand" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {service.cta ? (
                      <div className="mt-8">
                        <PrimaryButton href={service.cta.href}>{service.cta.label}</PrimaryButton>
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="process" className={`${SECTION} scroll-mt-48 border-y border-line bg-white`}>
        <div className={CONTAINER}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className={HEADING}>One team, one simple process.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-ink-soft">From your first online estimate through installation, our local team keeps every decision clear.</p>
          </div>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {process.map((item, index) => (
              <li key={item.title} className="bg-white p-7 sm:p-8">
                <span className="flex size-11 items-center justify-center rounded-full bg-brand text-sm font-bold text-white" aria-hidden="true">{index + 1}</span>
                <h3 className="mt-7 font-sans text-lg font-bold leading-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{item.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-9 text-center"><PrimaryButton href="/bathroom-estimator">Free instant estimate</PrimaryButton></div>
        </div>
      </section>

      <section id="results" className={`${SECTION} scroll-mt-48`}>
        <div className={CONTAINER}>
          <div className="max-w-3xl">
            <h2 className={HEADING}>See the change for yourself.</h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-ink-soft">
              Drag the handle to compare a focused bathroom upgrade. The control also works with touch and arrow keys.
            </p>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="mx-auto w-full max-w-[620px]"><FastBathBeforeAfterSlider /></div>
            <div className="bg-white p-7 shadow-[0_20px_60px_rgba(43,39,35,0.08)] sm:p-10">
              <h3 className="font-display text-[2rem] font-medium leading-tight">Big impact, focused scope.</h3>
              <p className="mt-5 text-base leading-8 text-ink-soft">
                Fast Bath is ideal when the room needs a brighter, cleaner, easier-to-use shower, tub, vanity, or finish update.
              </p>
              <div className="mt-8">
                <SecondaryButton href="/portfolio">View more projects</SecondaryButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${SECTION} border-y border-line bg-white`}>
        <div className={`${CONTAINER} grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center`}>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/luxury-master-bath-montage.png"
              alt="Bathroom remodel with shower, vanity, and coordinated premium finishes"
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="lg:pl-8">
            <h2 className={HEADING}>Local work, handled with care.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {chooseUs.map((item) => (
                <div key={item} className="flex gap-3 border-t border-line pt-4 text-[0.95rem] leading-7 text-ink-soft">
                  <BadgeCheck className="mt-1 size-5 flex-none text-brand" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-9 border-l-4 border-brand bg-sand p-6">
              <h3 className="font-display text-2xl font-medium">Need layout, tile, or plumbing changes?</h3>
              <p className="mt-3 text-sm leading-7 text-ink-soft">A full custom Bathroom Remodel is the better path for structural changes and complete redesigns.</p>
              <Link href="/bathroom-remodel" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-dark hover:underline">
                View full bathroom remodel <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Financing — the page's one dark band, so its CTA is the loudest thing mid-scroll */}
      <section id="financing" className="relative scroll-mt-48 overflow-hidden bg-forest pb-10 pt-16 text-white sm:pb-12 sm:pt-20 lg:pb-14 lg:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_88%_50%,rgba(93,187,70,0.16),transparent_70%)]"
        />
        <div className={`${CONTAINER} relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16`}>
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-brand-light">Financing</p>
            <h2 className={`${HEADING} mt-4 max-w-2xl`}>
              A project plan that fits your home and{" "}
              <em className="font-medium italic text-brand-light">budget.</em>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/70">
              Financing options are available for qualified homeowners. We explain the scope, selections, and payment options clearly before work begins.
            </p>
            <dl className="mt-9 grid gap-6 border-t border-white/12 pt-7 sm:grid-cols-3">
              {financingPoints.map((point) => (
                <div key={point.term}>
                  <dt className="text-[13px] font-bold text-white">{point.term}</dt>
                  <dd className="mt-1 text-[13px] leading-6 text-white/55">{point.detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="border border-white/15 border-t-2 border-t-brand bg-white/[0.05] p-7 shadow-[0_28px_80px_rgba(0,0,0,0.28)] sm:p-9">
            <p className="font-display text-[1.9rem] font-medium leading-tight">Start with your price range.</p>
            <p className="mt-3 text-[15px] leading-7 text-white/65">
              Get a free planning estimate in about two minutes. We&rsquo;ll walk you through payment options at your consultation.
            </p>
            {/* Forest text on brand green is 6.9:1 — white on it would fail WCAG AA. */}
            <Link
              href="/bathroom-estimator"
              className="group mt-7 flex min-h-[60px] w-full items-center justify-center gap-3 rounded-full bg-brand px-7 text-[13px] font-bold uppercase tracking-[0.14em] text-forest transition duration-300 hover:-translate-y-0.5 hover:bg-brand-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-light motion-safe:animate-[shimmer-pulse_2.6s_ease-in-out_infinite]"
            >
              Get my free estimate
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/financing"
              className="mt-5 flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-white/80 transition hover:text-brand-light"
            >
              Explore financing options
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <p className={`${CONTAINER} relative mt-10 text-[11px] leading-5 text-white/40`}>
          This information is for general purposes only and is not financial advice. Please consult a qualified financial advisor before making financial decisions.
        </p>
      </section>

      <CustomerReviews />

      <section id="faqs" className={`${SECTION} scroll-mt-48 border-y border-line bg-white`}>
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[0.7fr_1.3fr]`}>
          <div>
            <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.22em] text-brand-dark">Fast Bath FAQs</p>
            <h2 className={HEADING}>Answers before you start.</h2>
          </div>
          <div className="border-t border-line">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-line py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[1.05rem] font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
                  {faq.question}
                  <span className="text-2xl font-normal text-brand transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-4 max-w-3xl pr-10 text-[0.96rem] leading-8 text-ink-soft">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="service-area" className={`${SECTION} scroll-mt-48`}>
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <MapPin className="mb-6 size-8 text-brand" aria-hidden="true" />
              <h2 className={HEADING}>Fast Bath across the South Sound.</h2>
              <p className="mt-6 max-w-md text-base leading-8 text-ink-soft">
                Based in Lacey and serving homeowners throughout Thurston, Pierce, Lewis, and nearby communities.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              {counties.map(([county, countyCities]) => (
                <div key={county} className="border-t border-line pt-5">
                  <h3 className="text-[12px] font-bold uppercase tracking-[0.16em] text-ink">{county}</h3>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-3">
                    {countyCities.map((city) =>
                      city.published ? (
                        <Link key={city.slug} href={`/kitchen-remodel/${city.slug}`} className="text-sm text-ink-soft transition hover:text-brand-dark hover:underline">
                          {city.name}
                        </Link>
                      ) : (
                        <span key={city.slug} className="text-sm text-ink-muted">{city.name}</span>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-sand py-16 sm:py-20">
        <div className={`${CONTAINER} grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center`}>
          <div>
            <div className="flex items-center gap-3 text-brand-dark">
              <House className="size-5" aria-hidden="true" />
              <span className="text-[12px] font-bold uppercase tracking-[0.18em]">Start your bathroom transformation</span>
            </div>
            <h2 className={`${HEADING} mt-5 max-w-3xl`}>Ready for a cleaner, brighter bathroom?</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-ink-soft">Tell us what you want to update. We will help you choose the right remodeling path.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <PrimaryButton href="/bathroom-estimator">Free instant estimate</PrimaryButton>
            <Link href={site.phoneHref} className="inline-flex min-h-13 items-center justify-center gap-3 px-5 text-sm font-bold text-ink hover:text-brand-dark">
              <Phone className="size-4" aria-hidden="true" /> Call {site.phone}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
