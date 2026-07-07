"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Check,
  MapPinned,
  Phone,
  Star,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { processPhases, site, testimonials } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;
const heroSlideEase = [0.87, 0, 0.13, 1] as const;
const CONTAINER = "mx-auto w-full max-w-[1220px] px-5 sm:px-8 lg:px-10";
const SECTION = "py-12 sm:py-16 lg:py-20";

const heroImages = [
  "/images/project-forest-kitchen.jpg",
  "/images/modern master bathroom with nice shower and double vanity.jpg",
] as const;

const categories = [
  {
    title: "Kitchen Remodeling",
    note: "Innovative design and superior craftsmanship to create the kitchen of your dreams.",
    image: "/images/project-forest-kitchen.jpg",
    href: "/kitchen-remodel",
  },
  {
    title: "10 Day Kitchen Program",
    note: "Our signature pre-planned kitchen remodel, installed in just 10 business days.",
    image: "/images/Kitchen - Industry Chalk High Gloss with Metropolitan Walnu 1t.jpg",
    href: "/10businessdaykitchenprogram",
  },
  {
    title: "Bathroom Remodeling",
    note: "Spa-like bathrooms designed around how you actually live, built to last.",
    image: "/images/modern master bathroom with nice shower and double vanity.jpg",
    href: "/bathroom-remodel",
  },
  {
    title: "Bathroom Upgrade",
    note: "Focused bathroom improvements for a fresher, more functional space without a full remodel.",
    image: "/images/gallery-luxury-bath.png",
    href: "/bathroom-remodel",
  },
] as const;

const projects = [
  {
    title: "Forest Kitchen",
    location: "Olympia, WA",
    category: "Kitchen Remodel",
    image: "/images/project-forest-kitchen.jpg",
    summary: "Warm cabinetry, practical storage, and durable surfaces planned around daily family use.",
  },
  {
    title: "University Place Remodel",
    location: "University Place, WA",
    category: "Full Home Update",
    image: "/images/project-university-place.png",
    summary: "A cleaner layout with elevated finishes and a calmer, more usable kitchen experience.",
  },
  {
    title: "Midnight Blue Kitchen",
    location: "South Sound, WA",
    category: "Custom Kitchen",
    image: "/images/project-midnight-blue.jpg",
    summary: "A bold cabinet palette balanced with simple lines, bright counters, and thoughtful workflow.",
  },
] as const;

const brandNames = [
  "KCD Cabinetry",
  "Merit Cabinetry",
  "Showplace",
  "MSI Surfaces",
  "Cambria",
  "Caesarstone",
] as const;

const partnerLogos = [
  { name: "KCD Cabinetry", src: "/images/kcd.png" },
  { name: "Merit Kitchens", src: "/images/Merit logo.png" },
  { name: "Showplace Cabinetry", src: "/images/showplce logo.jpg" },
  { name: "J. Aaron Custom Wood Countertops", src: "/images/J-Aaron-Logo1.png" },
  { name: "Jeffrey Alexander", src: "/images/JEFFREY ALEXANDER logo.png" },
  { name: "MSI Surfaces", src: "/images/MSI logo.png" },
  { name: "Cambria", src: "/images/CAMBRIA logo.png" },
  { name: "Caesarstone", src: "/images/CAESARSTONE logo.png" },
  { name: "Vicostone", src: "/images/VICOSTONE logo.png" },
] as const;

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.55, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Label({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] ${
        dark ? "text-brand-light" : "text-brand"
      }`}
    >
      {children}
    </p>
  );
}

function SectionHeader({
  label,
  title,
  body,
  dark = false,
}: {
  label: string;
  title: ReactNode;
  body?: string;
  dark?: boolean;
}) {
  return (
    <FadeIn className="max-w-2xl">
      <Label dark={dark}>{label}</Label>
      <h2
        className={`font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {body ? (
        <p className={`mt-5 text-[16px] leading-relaxed ${dark ? "text-cream/68" : "text-ink-soft/70"}`}>
          {body}
        </p>
      ) : null}
    </FadeIn>
  );
}

function BeforeAfterSlider() {
  const [position, setPosition] = useState(52);
  const [hovering, setHovering] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const rect = slider.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(96, Math.max(4, next)));
  }, []);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    updatePosition(event.clientX);
  };

  return (
    <div
      ref={sliderRef}
      className="group relative aspect-[16/11] overflow-hidden bg-line shadow-[0_24px_80px_rgba(43,39,35,0.12)] select-none lg:aspect-[3/2]"
      onPointerMove={onPointerMove}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      role="slider"
      aria-label="Before and after kitchen transformation"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") setPosition((value) => Math.max(4, value - 4));
        if (event.key === "ArrowRight") setPosition((value) => Math.min(96, value + 4));
      }}
    >
      <Image
        src="/images/ba-after-chehalis.jpg"
        alt="Kitchen after remodel"
        fill
        sizes="(max-width: 1024px) 100vw, 72vw"
        className="object-cover"
        draggable={false}
      />
      <Image
        src="/images/ba-before-chehalis.jpg"
        alt="Kitchen before remodel"
        fill
        sizes="(max-width: 1024px) 100vw, 72vw"
        className="object-cover"
        draggable={false}
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      />
      <div
        className="absolute inset-y-0 w-px bg-white shadow-[0_0_24px_rgba(0,0,0,0.45)]"
        style={{ left: `${position}%` }}
      />
      <div
        className={`absolute top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-white/65 bg-white/90 text-ink shadow-[0_14px_40px_rgba(0,0,0,0.22)] transition ${
          hovering ? "scale-105" : ""
        }`}
        style={{ left: `${position}%` }}
      >
        <ChevronLeft className="size-4" />
        <ChevronRight className="size-4" />
      </div>
      <span className="absolute bottom-5 left-5 bg-white/88 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink backdrop-blur">
        Before
      </span>
      <span className="absolute bottom-5 right-5 bg-brand px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
        After
      </span>
    </div>
  );
}

export function EditorialHero() {
  const [active, setActive] = useState(0);
  const [snapToStart, setSnapToStart] = useState(false);
  const heroSlides = [...heroImages, heroImages[0]];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSnapToStart(false);
      setActive((current) => current + 1);
    }, 14800);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (active !== heroImages.length) return;
    const reset = window.setTimeout(() => {
      setSnapToStart(true);
      setActive(0);
    }, 7000);
    return () => window.clearTimeout(reset);
  }, [active]);

  return (
    <section className="relative isolate min-h-[94dvh] overflow-hidden bg-forest pt-32 text-white">
      <motion.div
        aria-hidden
        className="absolute inset-0 flex"
        initial={false}
        animate={{ x: `-${active * 100}%` }}
        transition={snapToStart ? { duration: 0 } : { duration: 6.85, ease: heroSlideEase }}
      >
        {heroSlides.map((image, index) => (
          <div key={`${image}-${index}`} className="relative h-full w-full shrink-0">
            <Image
              src={image}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover brightness-[0.68] saturate-[0.95] contrast-[1.04]"
            />
          </div>
        ))}
      </motion.div>
      <div className="absolute inset-0 bg-[rgba(12,16,10,0.48)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.08),rgba(0,0,0,0.38)_74%)]" />

      <div className={`${CONTAINER} relative z-10 flex min-h-[calc(94dvh-8rem)] items-center justify-center pb-8 pt-14 lg:pt-16`}>
        <div className="mx-auto max-w-5xl translate-y-8 text-center lg:translate-y-10">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.32em] text-brand-light sm:text-[12px]">
            Local Kitchen & Bath Remodeling
          </p>
          <h1 className="font-display text-[clamp(2.45rem,5vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.022em] text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.42)]">
            Your dream kitchen and bath,
            <br />
            done in 10 business days.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] font-medium leading-relaxed text-white/86 sm:text-[17px]">
            High-quality craftsmanship, guided selections, and a streamlined process for homeowners across Pierce and Thurston Counties.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn btn-solid">
              Schedule Free Consultation
            </Link>
            <Link href="/portfolio" className="btn btn-ghost">
              View Our Work
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-7 flex justify-center gap-2" aria-hidden="true">
            {heroImages.map((image, index) => (
              <span
                key={image}
                className={`h-px w-10 transition-colors duration-500 ${
                  active % heroImages.length === index ? "bg-brand-light" : "bg-white/35"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustedPartners() {
  const logos = [...partnerLogos, ...partnerLogos];

  return (
    <section className="partner-track overflow-hidden border-b border-line bg-[#fffefa]">
      <div className={`${CONTAINER} py-6`}>
        <div className="mb-4 flex items-center justify-between gap-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-soft/50">
            Trusted Partners
          </p>
          <div className="h-px flex-1 bg-line" />
        </div>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#fffefa] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#fffefa] to-transparent" />
          <div className="marquee-track items-center gap-14 pr-14">
            {logos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex h-16 min-w-[190px] shrink-0 items-center justify-center"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={240}
                  height={90}
                  className="max-h-14 w-auto max-w-[190px] object-contain opacity-90 transition duration-300 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesEditorial() {
  return (
    <section id="services" className={`${SECTION} bg-[#fffefa]`}>
      <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16`}>
        <div>
          <SectionHeader
            label="Welcome to 10 Day Kitchens"
            title="Kitchen and bath remodeling in Lacey, Olympia, and the South Sound."
            body="10 Day Kitchens helps homeowners remodel kitchens and bathrooms with thoughtful design guidance, quality cabinetry, countertops, tile, and finishes, plus a streamlined 10 business day kitchen remodeling process built around your home and schedule."
          />
          <div className="mt-8 space-y-3 text-sm text-ink-soft/70">
            <p className="flex gap-3">
              <Check className="mt-0.5 size-4 shrink-0 text-brand" />
              Family owned kitchen and bath remodeler serving Lacey, Olympia, Tacoma, Pierce County, and Thurston County.
            </p>
            <p className="flex gap-3">
              <Check className="mt-0.5 size-4 shrink-0 text-brand" />
              Over 35+ years of remodeling experience with kitchens, bathrooms, cabinetry, counters, and finish selections.
            </p>
            <p className="flex gap-3">
              <Check className="mt-0.5 size-4 shrink-0 text-brand" />
              Licensed, insured, and backed by a 5-year workmanship warranty.
            </p>
          </div>
        </div>

        <div className="relative min-h-[420px]">
          <div className="absolute right-0 top-0 h-[78%] w-[82%] overflow-hidden bg-line">
          <Image
            src="/images/Kitchen - Prairie School Flat in Custom Grey Colour with Custom Plate Rack (1).jpg"
            alt="Finished kitchen cabinetry"
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
          </div>
          <div className="absolute bottom-0 left-0 h-[48%] w-[48%] overflow-hidden border-[10px] border-[#fffefa] bg-line">
            <Image
              src="/images/modern master bathroom with nice shower and double vanity.jpg"
              alt="Finished bathroom vanity and shower"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatementSection() {
  return (
    <section className="bg-[#fafaf8]">
      <div className={`${CONTAINER} py-12 sm:py-14`}>
        <div className="mb-8 max-w-2xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
            Services We Offer
          </p>
          <h2 className="font-display text-[clamp(1.9rem,3.2vw,3.1rem)] font-medium leading-[1.06] text-ink">
            Remodeling options built around your home, timeline, and budget.
          </h2>
        </div>
        <div className="grid gap-px bg-line md:grid-cols-2 lg:grid-cols-4">
          {categories.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group bg-[#fafaf8] p-4 transition duration-500 hover:-translate-y-1 hover:bg-[#fffefa] hover:shadow-[0_18px_42px_rgba(43,39,35,0.08)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-line">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.06] group-hover:brightness-[1.02]"
                />
              </div>
              <div className="pt-5 transition-transform duration-500 group-hover:translate-x-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand transition-colors group-hover:text-brand-dark">
                  Explore
                </p>
                <h3 className="mt-2 font-display text-2xl font-medium text-ink transition-colors group-hover:text-brand-dark">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft/68">
                  {item.note}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RecentProjectsHover() {
  return (
    <section id="portfolio" className="bg-[#fffefa] py-12 text-ink sm:py-16 lg:py-20">
      <div className={CONTAINER}>
        <div className="mb-8 max-w-2xl lg:mb-12">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
            Our Projects
          </p>
          <h2 className="max-w-xl font-display text-[clamp(1.85rem,3vw,3.6rem)] font-medium leading-[1.04] text-ink">
            A quieter approach
            <br />
            to remodeling.
          </h2>
        </div>

        <div className="space-y-8 lg:space-y-14">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="sticky top-28 grid min-h-[58vh] gap-8 bg-[#fffefa] py-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-14 lg:py-8"
              style={{ zIndex: index + 1 }}
            >
              <Link href="/portfolio" className="group relative aspect-[16/10] overflow-hidden bg-line lg:aspect-[1.72]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.035]"
                />
              </Link>

              <div className="max-w-md">
                <p className="font-display text-[clamp(1.65rem,2.8vw,2.7rem)] font-medium italic leading-[1.1] text-ink">
                  {project.title}
                </p>
                <p className="mt-8 text-[15px] leading-relaxed text-ink-soft/78">
                  {project.summary}
                </p>
                <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                  {project.category} | {project.location}
                </p>
              </div>
            </article>
          ))}
        </div>

        <Link
          href="/portfolio"
          className="mt-10 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition hover:text-brand lg:mt-16"
        >
          View All Projects
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}

export function ProcessEditorial() {
  return (
    <section id="process" className="bg-[#1b2318] py-12 text-cream sm:py-16 lg:py-20">
      <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16`}>
        <div className="lg:sticky lg:top-40 lg:self-start">
          <SectionHeader
            label="How it works"
            title="A 10-day install starts with careful planning."
            body="Selections, measurements, materials, and scheduling are handled before demolition starts, so the installation can move with purpose once we begin."
            dark
          />
          <div className="mt-8 hidden border-l border-brand/50 pl-5 text-sm leading-relaxed text-cream/68 lg:block">
            Every phase is staged before installation begins, so your home is not waiting on late selections, missing materials, or unclear next steps.
          </div>
        </div>

        <div className="divide-y divide-white/12 border-y border-white/12">
          {processPhases.slice(0, 5).map((phase) => (
            <div
              key={phase.step}
              className="group grid gap-4 py-6 sm:grid-cols-[5rem_1fr] lg:py-8"
            >
              <p className="font-display text-2xl font-medium text-brand-light">{phase.step}</p>
              <div>
                <h3 className="font-display text-[clamp(1.35rem,2vw,2rem)] font-medium text-white transition-colors duration-300 group-hover:text-brand-light">
                  {phase.title}
                </h3>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-cream/78">{phase.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CustomerReviews() {
  const [reviewIndex, setReviewIndex] = useState(0);
  const review = testimonials[reviewIndex];
  const prevReview = () => setReviewIndex((value) => (value - 1 + testimonials.length) % testimonials.length);
  const nextReview = () => setReviewIndex((value) => (value + 1) % testimonials.length);

  return (
    <section className={`${SECTION} bg-cream`}>
      <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start`}>
        <SectionHeader
          label="Word of mouth"
          title="Trusted by homeowners across the South Sound."
          body="Clear communication, professional crews, and thoughtful follow-through are part of the work."
        />

        <FadeIn className="relative bg-[#fffefa] p-5 shadow-[0_24px_70px_rgba(43,39,35,0.08)] sm:p-7">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex gap-1 text-brand">
              {Array.from({ length: review.rating }).map((_, index) => (
                <Star key={index} className="size-4 fill-current" />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevReview}
                aria-label="Previous review"
                className="flex size-9 items-center justify-center border border-line bg-white text-ink transition hover:border-brand hover:text-brand"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={nextReview}
                aria-label="Next review"
                className="flex size-9 items-center justify-center border border-line bg-white text-ink transition hover:border-brand hover:text-brand"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
          <blockquote className="max-w-3xl font-display text-[clamp(1.1rem,1.7vw,1.6rem)] font-medium leading-[1.25] text-ink">
            &ldquo;{review.quote}&rdquo;
          </blockquote>
          <p className="mt-5 text-sm font-semibold text-ink">{review.name}</p>
          <p className="mt-1 text-sm text-ink-soft/60">{review.location}</p>
        </FadeIn>
      </div>
    </section>
  );
}

export function TransformationSection() {
  return (
    <section className={`${SECTION} bg-[#fffefa]`}>
      <div className={`${CONTAINER} max-w-[1120px]`}>
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[clamp(2.15rem,3.8vw,3.7rem)] font-medium leading-[1.02] tracking-[-0.028em] text-ink">
            See what 10 days can do.
          </h2>
        </FadeIn>

        <FadeIn className="mt-10">
          <div className="mx-auto grid max-w-4xl gap-8">
            <BeforeAfterSlider />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function ClosingCTA() {
  return (
    <section id="contact" className="bg-[#fffefa] text-ink">
      <div className={`${CONTAINER} py-14 sm:py-18 lg:py-20`}>
        <FadeIn>
          <div className="relative overflow-hidden border border-white/12 bg-[#1b2318] px-10 py-11 shadow-[0_18px_50px_rgba(43,39,35,0.16)] sm:px-12 sm:py-12 lg:px-14 lg:py-14">
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(93,187,70,0.35),transparent)]" />
            <div className="grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
              <div>
                <Label dark>Want to experience the process?</Label>
                <h2 className="max-w-3xl font-display text-[clamp(2.05rem,3.3vw,3.45rem)] font-medium leading-[1.02] tracking-[-0.03em] text-white">
                  Start with a conversation at the Lacey showroom.
                </h2>
                <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-cream/76">
                  Bring your goals, measurements, or inspiration. We will walk through your options, timeline, and next practical step.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/contact" className="btn btn-solid">
                    Schedule Free Consultation
                  </Link>
                  <a href={site.phoneHref} className="btn btn-ghost">
                    <Phone className="size-4" />
                    {site.phone}
                  </a>
                </div>
              </div>

              <div className="border-l border-white/12 pl-0 lg:pl-12">
                <div className="space-y-8 text-sm text-cream/72">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-light">Showroom</p>
                    <a
                      href={site.mapsHref}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block max-w-xs text-base leading-relaxed text-white transition-colors duration-200 hover:text-brand-light"
                    >
                      {site.address}
                    </a>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-light">Hours</p>
                    <div className="mt-3 space-y-2.5">
                      {site.showroomHours.map((item) => (
                        <div key={item.day} className="flex items-baseline justify-between gap-4">
                          <span className="text-white/90">{item.day}</span>
                          <span className="whitespace-nowrap text-white/62">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-light">Service Area</p>
                    <p className="mt-2 max-w-sm leading-relaxed text-white/66">
                      Lacey, Olympia, Tacoma, Chehalis, Pierce County, and Thurston County.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
