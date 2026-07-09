import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Phone, Plus, ShieldCheck, Sparkles } from "lucide-react";
import CityServicesTabs from "@/components/CityServicesTabs";
import DayByDayTimeline from "@/components/DayByDayTimeline";
import { CONTAINER } from "@/components/layout";
import PageCta from "@/components/PageCta";
import { TransformationSection, TrustedPartners } from "@/components/home";
import { FadeIn, SectionHeader } from "@/components/shared";
import ImageReveal from "@/components/ImageReveal";
import { getCity, getPublishedCities } from "@/lib/cities";
import { CountUp } from "@/lib/motion";
import { site } from "@/lib/site";

const BASE_URL = "https://10daykitchens.com";

const serviceHighlights = [
  {
    icon: Clock,
    title: "Fast remodel path",
    body: "Qualified same-layout kitchens can move through a planned 10 business day install.",
  },
  {
    icon: Sparkles,
    title: "Kitchen and bath scope",
    body: "Cabinetry, counters, flooring, bathrooms, fixtures, and finish selections through one team.",
  },
  {
    icon: ShieldCheck,
    title: "Built with confidence",
    body: "A licensed and insured remodeler with a 5-year workmanship warranty.",
  },
];

const galleryImages = [
  { src: "/images/project-forest-kitchen.jpg", alt: "Forest-inspired kitchen remodel", caption: "Olympia" },
  { src: "/images/project-university-place.png", alt: "White shaker kitchen remodel", caption: "University Place" },
  { src: "/images/ba-after-chehalis.jpg", alt: "Black and white kitchen transformation", caption: "Chehalis" },
];

export function generateStaticParams() {
  return getPublishedCities().map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};

  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: { canonical: `${BASE_URL}/kitchen-remodel/${city.slug}` },
    openGraph: { title: city.metaTitle, description: city.metaDescription },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const nearby = city.nearbySlugs
    .map((s) => getCity(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const provider = {
    "@type": "GeneralContractor",
    name: site.name,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "8695 Martin Way E STE 101",
      addressLocality: "Lacey",
      addressRegion: "WA",
      postalCode: "98516",
    },
    url: BASE_URL,
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Kitchen Remodeling in ${city.name}, WA`,
      serviceType: "Kitchen remodeling",
      areaServed: { "@type": "City", name: `${city.name}, WA` },
      provider,
      url: `${BASE_URL}/kitchen-remodel/${city.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Bathroom Remodeling in ${city.name}, WA`,
      serviceType: "Bathroom remodeling",
      areaServed: { "@type": "City", name: `${city.name}, WA` },
      provider,
      url: `${BASE_URL}/kitchen-remodel/${city.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: city.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Kitchen Remodel", item: `${BASE_URL}/kitchen-remodel` },
        { "@type": "ListItem", position: 3, name: city.name, item: `${BASE_URL}/kitchen-remodel/${city.slug}` },
      ],
    },
  ];

  return (
    <main className="bg-paper text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-paper pt-[138px] sm:pt-[152px]">
        <div className={`${CONTAINER} grid gap-10 pb-10 lg:grid-cols-[0.96fr_1.04fr] lg:items-center lg:pb-14`}>
          <div className="max-w-2xl">
            <p className="eyebrow mb-4 block text-[0.82rem] font-bold">
              Kitchen &amp; Bath Remodeling {city.name}, WA
            </p>
            <h1 className="max-w-3xl text-[clamp(2.65rem,4.55vw,4.45rem)] leading-[1.03] text-ink">
              Kitchen and bath remodeling in {city.name}, installed in 10 business days.
            </h1>
            <p className="mt-6 max-w-xl text-[1rem] leading-8 text-ink-soft">{city.intro}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={site.phoneHref}
                className="group inline-flex h-[52px] items-center justify-center gap-3 bg-brand px-7 text-[12px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-brand-dark hover:shadow-[0_16px_34px_rgba(93,187,70,0.3)]"
              >
                <Phone className="size-4" />
                Call {site.phone}
              </a>
              <Link
                href="/contact"
                className="group inline-flex h-[52px] items-center justify-center gap-3 border border-line bg-white/55 px-7 text-[12px] font-bold uppercase tracking-[0.15em] text-ink transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:text-brand-dark"
              >
                Schedule Free Consultation
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-5 border-t border-line pt-6">
              <div>
                <p className="font-serif-alt text-[clamp(2.65rem,5vw,4.2rem)] leading-none text-ink">
                  <CountUp value={35} suffix="+" />
                </p>
                <p className="mt-2 text-[14px] leading-snug text-ink-soft">Years experience</p>
              </div>
              <div>
                <p className="font-serif-alt text-[clamp(2.65rem,5vw,4.2rem)] leading-none text-ink">
                  <CountUp value={10} />
                </p>
                <p className="mt-2 text-[14px] leading-snug text-ink-soft">Business days</p>
              </div>
              <div>
                <p className="font-serif-alt text-[clamp(2.65rem,5vw,4.2rem)] leading-none text-ink">
                  <CountUp value={5} />
                  <span className="ml-1 text-[0.42em]">yr</span>
                </p>
                <p className="mt-2 text-[14px] leading-snug text-ink-soft">Warranty</p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[390px] lg:min-h-[520px]">
            <div className="absolute right-0 top-0 w-[86%] overflow-hidden border border-line bg-white shadow-[0_28px_90px_rgba(43,39,35,0.12)]">
              <div className="relative aspect-[1.33/1]">
                <Image
                  src={city.heroImage}
                  alt={`Kitchen remodeling in ${city.name}, WA`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 48vw, 92vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-[58%] overflow-hidden border-[10px] border-paper bg-white shadow-[0_24px_70px_rgba(43,39,35,0.14)] sm:border-[14px]">
              <div className="relative aspect-[1.22/1]">
                <Image
                  src="/images/modern master bathroom with nice shower and double vanity.jpg"
                  alt={`Bathroom remodeling in ${city.name}, WA`}
                  fill
                  sizes="(min-width: 1024px) 30vw, 70vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute bottom-7 right-6 hidden w-[220px] border border-line bg-white/92 p-5 shadow-[0_18px_60px_rgba(43,39,35,0.12)] backdrop-blur-sm sm:block">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-dark">South Sound remodeler</p>
              <p className="mt-3 text-sm leading-6 text-ink-soft">
                About {city.driveTime} from our Lacey showroom.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrustedPartners />

      <section className="bg-paper py-14 sm:py-[4.5rem] lg:py-24">
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-center`}>
          <div>
            <SectionHeader
              label={`Serving ${city.name}`}
              title={
                <>
                  Choose the right remodel path, <em className="font-medium italic text-brand-dark">without guessing.</em>
                </>
              }
            />
          </div>
          <div className="space-y-5 text-[1rem] leading-8 text-ink-soft">
            <p>
              {city.name} homeowners call us for fast kitchen remodels, full custom kitchen redesigns, bathroom
              remodels, and focused bath upgrades. The first consultation helps decide which path fits the room, the
              timeline, and the amount of construction your home actually needs.
            </p>
            <p>
              If the existing kitchen layout stays in place, your project may qualify for the 10 Day Kitchens Program.
              If walls, plumbing, electrical, or layout changes are involved, we build a custom remodel scope instead.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-8 shadow-[0_0_0_1px_rgba(43,39,35,0.06)]">
        <div className={`${CONTAINER} grid grid-cols-1 border-y border-line md:grid-cols-3`}>
          {serviceHighlights.map((item) => (
            <div key={item.title} className="group border-b border-line py-8 md:border-b-0 md:border-r md:px-7 md:last:border-r-0">
              <item.icon className="mb-7 size-6 text-brand transition-transform duration-300 group-hover:-translate-y-1" />
              <h3 className="text-[1.65rem] leading-tight transition-colors group-hover:text-brand-dark">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-ink-soft">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper py-14 sm:py-[4.5rem] lg:py-24">
        <div className={CONTAINER}>
          <CityServicesTabs cityName={city.name} />
        </div>
      </section>

      <section className="bg-cream py-14 sm:py-[4.5rem] lg:py-24">
        <div className={CONTAINER}>
          <div className="mb-10">
            <SectionHeader
              label={`${city.name} Neighborhoods`}
              title={
                <>
                  We know <em className="font-medium italic text-brand-dark">{city.name} homes.</em>
                </>
              }
            />
          </div>
          <div className="grid gap-px border border-line bg-line md:grid-cols-3">
            {city.neighborhoods.map((n, i) => (
              <FadeIn key={n.name} delay={i * 0.07} className="bg-paper p-8">
                <h3 className="font-display text-[1.4rem] font-semibold leading-tight text-ink">{n.name}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft/85">{n.note}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand py-14 sm:py-[4.5rem] lg:py-24">
        <div className={`${CONTAINER} grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center`}>
          <ImageReveal className="relative aspect-[1.45/1] overflow-hidden border border-line bg-white">
            <Image
              src="/images/full kitchen with marble cpuntertop.jpg"
              alt="Completed kitchen remodel with marble countertop"
              fill
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover"
            />
          </ImageReveal>
          <div className="bg-white p-7 shadow-[0_18px_70px_rgba(43,39,35,0.08)] sm:p-10">
            <SectionHeader label="Local Knowledge" title={`Remodeling in ${city.name}`} />
            <p className="mt-6 text-base leading-8 text-ink-soft">{city.localContext}</p>
          </div>
        </div>
      </section>

      <DayByDayTimeline />

      <section className="bg-cream py-14 sm:py-[4.5rem] lg:py-24">
        <div className={CONTAINER}>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <SectionHeader label="Recent Work" title="Nearby projects." />
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:text-brand-dark"
            >
              View all projects
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {galleryImages.map((img, i) => (
              <ImageReveal key={img.src} delay={i * 0.07} className="group relative aspect-[4/3] overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                    {img.caption} project
                  </p>
                </div>
              </ImageReveal>
            ))}
          </div>
        </div>
      </section>

      <TransformationSection />

      <section className="border-t border-line bg-paper py-14 sm:py-[4.5rem] lg:py-24">
        <div className={`${CONTAINER} mx-auto max-w-4xl`}>
          <div className="mb-8">
            <SectionHeader
              label="Questions"
              title={
                <>
                  Remodeling in {city.name}, <em className="font-medium italic text-brand-dark">answered.</em>
                </>
              }
            />
          </div>
          {city.faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="text-[15.5px] font-semibold text-ink transition-colors group-hover:text-brand-dark">
                  {faq.question}
                </h3>
                <Plus className="mt-0.5 size-5 flex-none text-brand transition-transform duration-200 group-open:rotate-45" />
              </summary>
              <p className="max-w-3xl pb-6 text-[15px] leading-relaxed text-ink-soft/85">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {city.testimonial ? (
        <section className="border-t border-line bg-cream">
          <div className={`${CONTAINER} py-14 lg:py-16`}>
            <FadeIn className="mx-auto max-w-3xl text-center">
              <blockquote className="font-display text-[1.6rem] font-medium leading-snug text-ink sm:text-[1.9rem]">
                &ldquo;{city.testimonial.quote}&rdquo;
              </blockquote>
              <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.18em] text-brand-dark">
                {city.testimonial.name} | {city.testimonial.project}
              </p>
            </FadeIn>
          </div>
        </section>
      ) : null}

      {nearby.length > 0 ? (
        <section className="border-t border-line bg-cream">
          <div className={`${CONTAINER} py-10`}>
            <p className="mb-4 text-[11.5px] font-bold uppercase tracking-[0.24em] text-ink-muted">
              Also serving nearby
            </p>
            <div className="flex flex-wrap gap-x-7 gap-y-3">
              {nearby.map((n) => (
                <Link
                  key={n.slug}
                  href={`/kitchen-remodel/${n.slug}`}
                  className="text-[14px] font-semibold text-ink underline-offset-4 transition-colors hover:text-brand-dark hover:underline"
                >
                  Kitchen Remodel {n.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <PageCta
        eyebrow={`${city.name} Free Consultation`}
        title={`Your ${city.name} kitchen or bath, planned clearly from day one.`}
        body="Call now or schedule online. We will bring the plan, the schedule, and a binding quote."
        secondaryLabel={site.phone}
        secondaryHref={site.phoneHref}
        watermark={city.name}
      />
    </main>
  );
}
