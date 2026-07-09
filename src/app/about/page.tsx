import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import InteriorHero from "@/components/InteriorHero";
import PageCta from "@/components/PageCta";
import { CONTAINER, SECTION } from "@/components/layout";
import { FadeIn, SectionHeader } from "@/components/shared";
import ImageReveal from "@/components/ImageReveal";
import { CountUp } from "@/lib/motion";
import { getServiceAreaCities, type City } from "@/lib/cities";

export const metadata: Metadata = {
  title: "About Us | Family-Owned Remodelers in Lacey, WA",
  description:
    "Locally owned and operated in Lacey, WA since 2004. 800+ homes remodeled across Pierce & Thurston Counties, every project backed by a 5-year warranty.",
  alternates: {
    canonical: "https://10daykitchens.com/about",
  },
};

const stats = [
  { num: 800, suffix: "+", label: "Homes Remodeled" },
  { num: 35, suffix: "+", label: "Years Experience" },
  { num: 5, suffix: "-Year", label: "Warranty on Every Project" },
  { num: 100, suffix: "%", label: "Satisfaction Guarantee" },
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

const values = [
  {
    title: "Trust & Respect",
    desc: "Clear communication and kept promises — you depend on our knowledge to navigate your project smoothly.",
  },
  {
    title: "Accountability",
    desc: "Every decision communicated clearly. You always know where your project stands — no surprises.",
  },
  {
    title: "Schedules That Hold",
    desc: "Realistic timelines we stick to. Your time and money are investments we take seriously.",
  },
  {
    title: "Your Home, Protected",
    desc: "Clean jobsite, careful handling, and a respectful crew — every single day.",
  },
];

export default function AboutPage() {
  const serviceCities = getServiceAreaCities();
  const counties = groupByCounty(serviceCities);

  return (
    <main>
      <InteriorHero
        image="/images/Design Review Meeting.png"
        imageAlt="Completed kitchen remodel in Olympia"
        eyebrow="About 10 Day Kitchens · Lacey, WA"
        title={
          <>
            Your neighbors.
            <br />
            <em>Your remodeling experts.</em>
          </>
        }
        body="Locally owned and operated since 2004 — high-quality kitchen and bath transformations for South Sound families, in just 10 business days."
        cta={{ label: "Work With Us", href: "/contact" }}
        secondaryCta={{ label: "See our projects", href: "/portfolio" }}
      />

      {/* Stats — quiet editorial band, counters animate in */}
      <section className="border-b border-line bg-paper">
        <div className={`${CONTAINER} grid grid-cols-2 divide-x divide-line lg:grid-cols-4`}>
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.07} className="px-6 py-10 text-center">
              <p className="font-display text-[2.6rem] font-semibold leading-none text-ink">
                <CountUp value={s.num} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-muted">{s.label}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Story — one tight paragraph, photo does the rest */}
      <section className={`${SECTION} bg-cream`}>
        <div className={`${CONTAINER} grid items-center gap-12 lg:grid-cols-2 lg:gap-16`}>
          <div>
            <SectionHeader
              label="Our Story"
              title={
                <>
                  Built on one promise: <em className="font-medium italic text-brand-dark">10 business days.</em>
                </>
              }
              body="We're a family-owned team of designers, project managers, and craftsmen who believe a remodel shouldn't take over your life. Everything is planned, ordered, and inspected before day one — so installation is focused, clean, and finished to perfection."
            />
            <FadeIn delay={0.12} className="mt-9">
              <Link
                href="/contact"
                className="btn btn-solid inline-flex h-12 items-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(93,187,70,0.32)]"
              >
                Work With Us
              </Link>
            </FadeIn>
          </div>
          <div className="relative">
            <ImageReveal delay={0.08} className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/project-coastal-calm.jpg"
                alt="Coastal calm kitchen remodel in Steilacoom"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
            </ImageReveal>
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -left-4 -z-10 hidden h-full w-full border border-brand/30 lg:block"
            />
            <p className="mt-4 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-ink-soft/55">
              Coastal Calm Kitchen — Steilacoom, WA · 10 business days
            </p>
          </div>
        </div>
      </section>

      {/* Values — editorial two-column list, no icon soup */}
      <section className={`${SECTION} bg-sand`}>
        <div className={CONTAINER}>
          <div className="mx-auto mb-12 max-w-2xl text-center [&>div]:mx-auto">
            <SectionHeader label="Our Values" title="What we stand for." />
          </div>
          <div className="grid gap-px border border-line bg-line md:grid-cols-2">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={(i % 2) * 0.07} className="bg-paper p-8 lg:p-10">
                <span className="mb-4 block font-condensed text-5xl font-semibold leading-none text-brand/25">
                  0{i + 1}
                </span>
                <h3 className="font-display text-2xl font-semibold text-ink">{v.title}</h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft/80">{v.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Service area — grouped by county, linked once a city's page is live */}
      <section id="service-area" className={`${SECTION} bg-cream`}>
        <div className={CONTAINER}>
          <div className="mb-12">
            <SectionHeader
              label="Where We Work"
              title={
                <>
                  Serving the <em className="font-medium italic text-brand-dark">South Sound.</em>
                </>
              }
              body="From our Lacey showroom, we serve homeowners south to Chehalis, north to Federal Way, and west to Gig Harbor — every project installed in 10 business days."
            />
          </div>

          <div className="flex flex-col gap-10">
            {counties.map(([county, countyCities], i) => (
              <FadeIn key={county} delay={i * 0.06}>
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
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.1} className="mt-10 max-w-2xl">
            <p className="text-[14.5px] leading-relaxed text-ink-soft/70">
              Don&apos;t see your city listed? We often serve homeowners just outside these areas — call{" "}
              <a href="tel:3605573444" className="font-semibold text-brand-dark hover:underline">
                360-557-3444
              </a>{" "}
              and we&apos;ll let you know right away.
            </p>
          </FadeIn>
        </div>
      </section>

      <PageCta
        eyebrow="Join the Family"
        title="Start your project with a free consultation."
        primaryLabel="Contact Us"
        watermark="Family"
      />
    </main>
  );
}
