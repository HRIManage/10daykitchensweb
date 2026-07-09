import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck, Sparkles } from "lucide-react";
import InteriorHero from "@/components/InteriorHero";
import PageCta from "@/components/PageCta";
import { CONTAINER, SECTION } from "@/components/layout";
import { FadeIn, SectionHeader } from "@/components/shared";
import ImageReveal from "@/components/ImageReveal";
import { createServiceSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Bathroom Remodel Lacey WA | Olympia & Tacoma",
  description:
    "Full bathroom remodels across Pierce & Thurston Counties — tile showers, vanities, flooring, and fixtures with one clear schedule and a 5-year warranty.",
};

const processSteps = [
  { num: "01", title: "Consultation", desc: "Your goals, style, and must-haves — vanities, tile, fixtures, storage." },
  { num: "02", title: "Design & Contract", desc: "A clear plan and contract, so there are no surprises." },
  { num: "03", title: "Materials", desc: "Every item ordered and inspected before installation begins." },
  { num: "04", title: "Installation", desc: "Completed in approximately 10 business days." },
  { num: "05", title: "Walkthrough", desc: "We review every detail with you before close-out." },
];

const highlights = [
  { icon: Clock, label: "≈10 business days" },
  { icon: ShieldCheck, label: "5-year warranty" },
  { icon: Sparkles, label: "Guided selections" },
];

const galleryImages = [
  { src: "/images/gallery-luxury-bath.png", alt: "Luxury bathroom with freestanding tub", caption: "Primary Bath" },
  { src: "/images/gallery-essential-white-bath.jpg", alt: "Bright white bathroom remodel", caption: "Essential White" },
  { src: "/images/gallery-bath-view2.jpg", alt: "Tile shower with glass enclosure", caption: "Walk-In Shower" },
  { src: "/images/gallery-oslo-white-bath.jpg", alt: "Oslo white vanity bathroom", caption: "Oslo White" },
  { src: "/images/gallery-metropolitan-walnut.jpg", alt: "Walnut vanity bathroom", caption: "Metropolitan Walnut" },
  { src: "/images/ba-after-bath.jpg", alt: "Completed modern bathroom remodel", caption: "Classic Modern" },
];

export default function BathroomRemodelPage() {
  const jsonLd = createServiceSchema({
    name: "Bathroom Remodel",
    description:
      "Full bathroom remodeling in Lacey, Olympia, Tacoma, Pierce County, and Thurston County with tile showers, vanities, flooring, fixtures, and guided selections.",
    url: "https://10daykitchens.com/bathroom-remodel",
    serviceType: [
      "Bathroom Remodel",
      "Bathroom Renovation",
      "Shower Remodel",
      "Vanity and Fixture Installation",
    ],
  });

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <InteriorHero
        image="/images/Full Master Bathroom Suite.png"
        imageAlt="Bright remodeled bathroom with double vanity"
        eyebrow="Bathroom Remodeling · Pierce & Thurston Counties"
        title={
          <>
            A bathroom you love,
            <br />
            <em>without the long remodel.</em>
          </>
        }
        body="Tile showers, vanities, flooring, and fixtures — planned around one clear schedule from first visit to final walkthrough."
        cta={{ label: "Schedule Free Consultation", href: "/contact" }}
        secondaryCta={{ label: "See recent baths", href: "#gallery" }}
      />

      {/* Intro split — photo-forward, minimal copy */}
      <section className={`${SECTION} bg-cream`}>
        <div className={`${CONTAINER} grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16`}>
          <div className="relative">
            <ImageReveal className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/Modern Spa Sanctuary.png"
                alt="Luxury bathroom remodel with freestanding tub"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
            </ImageReveal>
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 -z-10 hidden h-full w-full border border-brand/30 lg:block"
            />
          </div>
          <div>
            <SectionHeader
              label="Expert Bath Remodeling"
              title={
                <>
                  Your dream bathroom, <em className="font-medium italic text-brand-dark">done right.</em>
                </>
              }
              body="A process that respects your time, your home, and your investment — on schedule, on budget, and stress-free."
            />
            <FadeIn delay={0.1} className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {highlights.map((h) => (
                <span key={h.label} className="flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.14em] text-ink">
                  <h.icon className="size-4 text-brand" />
                  {h.label}
                </span>
              ))}
            </FadeIn>
            <FadeIn delay={0.15} className="mt-9">
              <Link
                href="/contact"
                className="btn btn-solid inline-flex h-12 items-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(93,187,70,0.32)]"
              >
                Schedule Free Consultation
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Process — compact editorial row */}
      <section className={`${SECTION} bg-sand`}>
        <div className={CONTAINER}>
          <div className="mx-auto mb-12 max-w-2xl text-center [&>div]:mx-auto">
            <SectionHeader label="Our Process" title="From consultation to completion." />
          </div>
          <div className="grid border-y border-line md:grid-cols-5 md:divide-x md:divide-line">
            {processSteps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.06} className="flex flex-col border-b border-line p-7 last:border-b-0 md:border-b-0">
                <span className="mb-5 block font-condensed text-6xl font-semibold leading-none text-brand/25">
                  {step.num}
                </span>
                <h3 className="mb-2 text-[13px] font-bold uppercase tracking-[0.12em] text-ink">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft/80">{step.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery — photography does the selling */}
      <section id="gallery" className={`${SECTION} bg-cream`}>
        <div className={CONTAINER}>
          <div className="mx-auto mb-12 max-w-2xl text-center [&>div]:mx-auto">
            <SectionHeader
              label="Bath Gallery"
              title={
                <>
                  Recent bathrooms, <em className="font-medium italic text-brand-dark">real homes.</em>
                </>
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {galleryImages.map((img, i) => (
              <ImageReveal key={img.src} delay={(i % 3) * 0.07} className="group relative aspect-[4/3] overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                    {img.caption} · 10 business days
                  </p>
                </div>
              </ImageReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fast Bath cross-sell */}
      <section className="bg-cream pb-14 sm:pb-16 lg:pb-20">
        <div className={CONTAINER}>
          <FadeIn className="grid gap-8 border border-line bg-paper p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">
            <div>
              <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.24em] text-brand">
                Need a faster refresh?
              </p>
              <h2 className="font-display text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.015em] text-ink sm:text-[2.3rem]">
                Fast Bath may be the better fit.
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft/80">
                Tub-to-shower conversions, shower replacements, vanity upgrades, and targeted refreshes — without a full renovation.
              </p>
            </div>
            <Link
              href="/fast-bath"
              className="group inline-flex h-12 items-center justify-center gap-2 border border-ink/25 px-6 text-[12px] font-bold uppercase tracking-[0.14em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/50"
            >
              Explore Fast Bath
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <PageCta
        eyebrow="Serving Pierce & Thurston Counties"
        title="Plan a bathroom remodel that feels calm from day one."
        body="Lacey, Olympia, Tacoma, Chehalis, and communities across the South Sound."
        primaryLabel="Get Your Free Quote"
        watermark="Bath"
      />
    </main>
  );
}
