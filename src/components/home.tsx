"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Check,
  Phone,
  Star,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { processPhases, site, testimonials } from "@/lib/site";
import { CountUp } from "@/lib/motion";
import { CONTAINER, SECTION } from "@/components/layout";
import { ease, FadeIn, SectionHeader } from "@/components/shared";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import HeadingReveal from "@/components/motion/HeadingReveal";

const heroImages = [
  {
    src: "/images/hero-kitchen-custom.png",
    caption: "Forest Kitchen — Olympia, WA · Installed in 10 business days",
  },
  {
    src: "/images/hero-bathroom-custom.png",
    caption: "Marble Counter Kitchen — South Sound, WA · Installed in 10 business days",
  },
] as const;

const heroTrustItems = [
  "35+ Years Experience",
  "Family Owned",
  "5-Year Warranty",
  "Licensed & Bonded",
] as const;

const categories = [
  {
    title: "Kitchen Remodeling",
    note: "Innovative design and superior craftsmanship to create the kitchen of your dreams.",
    image: "/images/Completed Modern Kitchen.png",
    href: "/kitchen-remodel",
  },
  {
    title: "10 Day Kitchen Program",
    note: "Our signature pre-planned kitchen remodel, installed in just 10 business days.",
    image: "/images/welcome-kitchen-subway-tile.jpg",
    href: "/10businessdaykitchenprogram",
  },
  {
    title: "Bathroom Remodeling",
    note: "Spa-like bathrooms designed around how you actually live, built to last.",
    image: "/images/white-oak-spa-bathroom-service.png",
    href: "/bathroom-remodel",
  },
  {
    title: "Fast Bath",
    note: "A simpler bathroom upgrade for showers, tubs, vanities, and cleaner everyday function without a full remodel.",
    image: "/images/fast-bath-simple-service.png",
    href: "/fast-bath",
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

/* Homepage-only entrance choreography — deliberately distinct from the
   site-wide FadeIn/img-wipe: the glass card materializes (blur → focus,
   scale settle) while its contents cascade, then a light sheen sweeps the
   glass once; the trust band springs up from the bottom edge with its
   items rising in sequence. */
const heroCardV = {
  hidden: { opacity: 0, y: 36, scale: 0.95, filter: "blur(14px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease, when: "beforeChildren", delayChildren: 0.4, staggerChildren: 0.13 },
  },
} as const;

const heroItemV = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
} as const;

const trustBandV = {
  hidden: { opacity: 0, y: 56 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 16, delay: 1.0, when: "beforeChildren", staggerChildren: 0.09 },
  },
} as const;

export function EditorialHero() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();

  // The card fades out first (0–420px of scroll), the photo stands alone and
  // cross-fades to the second image, and only then does the next section ride
  // up over the pinned hero.
  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 420], [1, 0]);
  const contentScale = useTransform(scrollY, [0, 420], [1, 0.96]);
  const contentY = useTransform(scrollY, [0, 420], [0, 30]);

  // Past the card fade, scroll (not the timer) owns the slideshow, so the
  // second photo is always seen before the panel covers it.
  const [pastFold, setPastFold] = useState(false);
  useMotionValueEvent(scrollY, "change", (value) => setPastFold(value > 440));
  const shown = pastFold && !reducedMotion ? 1 : active;

  useEffect(() => {
    if (reducedMotion || pastFold) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % heroImages.length);
    }, 9000);
    return () => window.clearInterval(timer);
  }, [reducedMotion, pastFold]);

  return (
    <div className="relative z-0 h-[195svh]">
    <section className="sticky top-0 h-[100svh] overflow-hidden bg-cream pt-[8.5rem] lg:pt-40">
      {/* Full-bleed rotating photography — cross-fade + slow Ken Burns drift */}
      <div className="absolute inset-0" aria-hidden="true">
        {heroImages.map((image, index) => (
          <motion.div
            key={image.src}
            className="absolute inset-0"
            initial={false}
            animate={
              reducedMotion
                ? { opacity: index === 0 ? 1 : 0 }
                : { opacity: index === shown ? 1 : 0, scale: index === shown ? 1.07 : 1 }
            }
            transition={{
              opacity: { duration: 1.6, ease: "easeInOut" },
              scale: { duration: 10, ease: "linear" },
            }}
          >
            <Image
              src={image.src}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        ))}
        {/* Airy white veil — soft behind the copy, photo opens up quickly to the right */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,250,248,0.58)_0%,rgba(250,250,248,0.32)_22%,rgba(250,250,248,0.08)_38%,transparent_50%)]" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-cream to-transparent" />
      </div>

      <motion.div
        style={reducedMotion ? undefined : { opacity: contentOpacity, scale: contentScale, y: contentY }}
        className={`${CONTAINER} relative z-10 flex h-[calc(100svh-8.5rem)] origin-top flex-col justify-center pb-24 pt-6 lg:h-[calc(100svh-10rem)]`}
      >
        {/* Liquid-glass card — materializes from blur, contents cascade */}
        <motion.div
          variants={heroCardV}
          initial={reducedMotion ? "show" : "hidden"}
          animate="show"
          className="relative w-full max-w-[680px] rounded-3xl border border-white/55 bg-white/30 p-8 shadow-[0_24px_80px_rgba(43,39,35,0.1)] backdrop-blur-md sm:p-9 lg:-ml-10 lg:p-11"
        >
          {/* Soft white light source behind the card */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-12 -z-10 rounded-[3.5rem] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.6),rgba(255,255,255,0.28)_55%,transparent_78%)] blur-2xl"
          />
          {/* Glass top-edge highlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent"
          />
          {/* One-time light sheen sweeping across the glass after it settles */}
          {!reducedMotion ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
            >
              <motion.span
                className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                initial={{ x: "-180%" }}
                animate={{ x: "460%" }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 1.5 }}
              />
            </span>
          ) : null}

          <motion.p variants={heroItemV} className="mb-6 text-[11.5px] font-bold uppercase tracking-[0.28em] text-brand-dark">
            Kitchen &amp; Bath Remodeling · Lacey, WA
          </motion.p>

          <motion.div variants={heroItemV}>
            <HeadingReveal
              as="h1"
              className="text-balance font-display text-[2.4rem] font-bold leading-[1.06] tracking-[-0.022em] text-ink sm:text-[2.9rem] lg:text-[3.25rem]"
            >
              Your dream kitchen &amp; bath,
              <br />
              <em className="font-semibold italic text-brand-dark">
                installed in 10 business days.
              </em>
            </HeadingReveal>
          </motion.div>

          <motion.p variants={heroItemV} className="mt-6 max-w-md text-[15.5px] font-medium leading-relaxed text-ink-soft">
            Lacey kitchen and bath remodeling with guided design, quality craftsmanship, and a pre-planned process across Pierce and Thurston Counties.
          </motion.p>

          <motion.div variants={heroItemV} className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="btn btn-solid inline-flex h-12 items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(93,187,70,0.32)]"
            >
              Schedule Free Consultation
            </Link>
            <Link
              href="/portfolio"
              className="group inline-flex h-12 items-center justify-center gap-2 border border-ink/25 px-5 text-[12.5px] font-bold uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/50 hover:bg-white/50"
            >
              View our work
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </motion.div>

          {/* Day 1 → Day 10 rule, filling in on load */}
          <div className="hidden" aria-hidden="true">
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/72 [text-shadow:0_3px_12px_rgba(0,0,0,0.24)]">
              Day 1
            </span>
            <span className="relative h-px flex-1 overflow-hidden bg-white/20">
              <motion.span
                className="absolute inset-y-0 left-0 w-full origin-left bg-brand-light"
                initial={reducedMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.8, ease, delay: 0.8 }}
              />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-light [text-shadow:0_3px_12px_rgba(0,0,0,0.24)]">
              Day 10
            </span>
          </div>

          <div className="hidden">
            <span>35+ Years Experience</span>
            <span className="text-white/25" aria-hidden="true">·</span>
            <span>Family Owned</span>
            <span className="text-white/25" aria-hidden="true">·</span>
            <span>5-Year Warranty</span>
            <span className="text-white/25" aria-hidden="true">·</span>
            <span>Licensed &amp; Bonded</span>
          </div>
        </motion.div>

        <div className="absolute bottom-32 right-5 z-10 flex flex-col items-end gap-2.5 sm:right-8 lg:right-10">
          <div className="flex gap-1.5" aria-hidden="true">
            {heroImages.map((image, index) => (
              <span
                key={image.src}
                className={`h-[2px] w-9 transition-colors duration-500 ${
                  index === shown ? "bg-brand-dark" : "bg-ink/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Glass trust band — springs up from the bottom edge, items cascade */}
        <div className="absolute inset-x-5 bottom-8 sm:inset-x-8 lg:inset-x-10">
          <motion.div
            variants={trustBandV}
            initial={reducedMotion ? "show" : "hidden"}
            animate="show"
            className="grid grid-cols-2 divide-x divide-white/40 overflow-hidden rounded-2xl border border-white/50 bg-white/25 shadow-[0_18px_60px_rgba(43,39,35,0.12)] backdrop-blur-md lg:grid-cols-4"
          >
            {heroTrustItems.map((item) => (
              <div
                key={item}
                className="overflow-hidden px-4 py-4.5 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-ink transition duration-300 hover:scale-[1.04] hover:bg-white/14 hover:text-brand sm:px-6 sm:text-[12px]"
              >
                <motion.span variants={heroItemV} className="block">
                  {item}
                </motion.span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
    </div>
  );
}

export function TrustedPartners() {
  const logos = [...partnerLogos, ...partnerLogos];

  return (
    <section className="partner-track overflow-hidden border-b border-line bg-[#fffefa]">
      <div className={`${CONTAINER} py-6`}>
        <div className="mb-4 flex items-center justify-between gap-6">
          <p className="text-[13px] font-bold uppercase tracking-[0.24em] text-brand">
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
          <div className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-3 sm:gap-10">
            <div className="min-w-0">
              <p className="font-display text-[clamp(2.55rem,4.8vw,3.95rem)] font-medium leading-none text-ink">
                <CountUp value={35} suffix="+" />
              </p>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-soft/78">
                Years experience
              </p>
            </div>
            <div className="min-w-0">
              <p className="font-display text-[clamp(2.55rem,4.8vw,3.95rem)] font-medium leading-none text-ink">
                <CountUp value={800} suffix="+" />
              </p>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-soft/78">
                Projects completed
              </p>
            </div>
            <div className="min-w-0">
              <p className="font-display text-[clamp(2.55rem,4.8vw,3.95rem)] font-medium leading-none text-ink">
                <CountUp value={5} /> <span className="text-[0.46em] font-medium">year</span>
              </p>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-soft/78">
                Warranty
              </p>
            </div>
          </div>
        </div>

        <div className="relative min-h-[420px]">
          <div className="absolute right-0 top-0 h-[78%] w-[82%] overflow-hidden bg-line">
          <Image
            src="/images/welcome-kitchen-subway-tile.jpg"
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
          <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.24em] text-brand">
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
                <p className="text-[13px] font-bold uppercase tracking-[0.22em] text-brand transition-colors group-hover:text-brand-dark">
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
          <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.24em] text-brand">
            Our Projects
          </p>
          <h2 className="max-w-xl font-display text-[clamp(1.85rem,3vw,3.6rem)] font-medium italic leading-[1.04] text-ink">
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
          className="mt-10 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.22em] text-brand transition hover:text-brand-dark lg:mt-16"
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
    <section id="process" className="bg-[#2A2A2A] py-12 text-cream sm:py-16 lg:py-20">
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
    <section className="bg-[#fffefa] pb-16 pt-4 sm:pb-20 sm:pt-6 lg:pb-24 lg:pt-8">
      <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start`}>
        <FadeIn className="max-w-2xl">
          <h2 className="font-display text-[clamp(1.95rem,3vw,3rem)] font-medium leading-[1.06] tracking-[-0.02em] text-ink">
            Trusted by homeowners across the South Sound.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-ink-soft/72">
            Clear communication, professional crews, and thoughtful follow-through are part of the work.
          </p>
        </FadeIn>

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
    <section className="bg-[#fffefa] pb-8 pt-12 sm:pb-10 sm:pt-16 lg:pb-12 lg:pt-20">
      <div className={CONTAINER}>
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[clamp(2.15rem,3.8vw,3.7rem)] font-medium italic leading-[1.02] tracking-[-0.028em] text-ink">
            See what 10 days can do.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-ink-soft/72">
            Thoughtful design, transparent communication, and proven craftsmanship behind every kitchen and bath remodel.
          </p>
        </FadeIn>

        <FadeIn className="mt-12">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.3fr_0.9fr] lg:items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease }}
              whileHover={{ y: -6 }}
              className="border border-line bg-white p-6 transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(43,39,35,0.08)] sm:p-7"
            >
              <p className="font-display text-[clamp(2.4rem,4.2vw,4rem)] font-medium leading-none text-brand">
                <CountUp value={800} suffix="+" />
              </p>
              <p className="mt-8 text-[13px] font-bold uppercase tracking-[0.14em] text-brand">
                Projects completed
              </p>
              <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-ink-soft/72">
                From focused upgrades to full kitchen and bath transformations across the South Sound.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.08, ease }}
              className="flex items-center justify-center"
            >
              <div className="w-full max-w-[520px] transition-transform duration-500 hover:-translate-y-1">
                <BeforeAfterSlider />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, delay: 0.14, ease }}
              whileHover={{ y: -6 }}
              className="border border-line bg-white p-6 transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(43,39,35,0.08)] sm:p-7"
            >
              <p className="font-display text-[clamp(2.4rem,4.2vw,4rem)] font-medium leading-none text-brand">
                <CountUp value={35} suffix="+" />
              </p>
              <p className="mt-8 text-[13px] font-bold uppercase tracking-[0.14em] text-brand">
                Years experience
              </p>
              <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-ink-soft/72">
                Decades of remodeling experience, refined into a process built for speed, clarity, and quality.
              </p>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function ClosingCTA() {
  return (
    <section id="contact" className="bg-[#fffefa] text-ink">
      <div className={`${CONTAINER} py-16 sm:py-20 lg:py-24`}>
        <FadeIn>
          <div className="grid gap-10 lg:grid-cols-[1.16fr_0.84fr] lg:items-start lg:gap-12">
            <div className="min-w-0">
              <p className="text-[13px] font-bold uppercase tracking-[0.32em] text-brand">
                READY TO START PLANNING?
              </p>
              <h2 className="mt-5 max-w-[11ch] font-display text-[clamp(2.5rem,6.2vw,4.6rem)] font-medium leading-[0.97] tracking-[-0.045em] text-ink">
                VISIT OUR
                <br />
                <span className="italic text-brand-dark">SHOWROOM</span>
              </h2>
              <p className="mt-7 max-w-[640px] text-[17px] leading-[1.85] text-ink-soft/86">
                Book a free consultation to talk through your kitchen or bath remodel, visit our
                Lacey showroom, and get clear guidance on options, budget, and timing. We respond
                quickly and keep the next step simple.
              </p>

              <div className="mt-14 grid gap-10 border-t border-line pt-10 sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)] sm:gap-14 lg:gap-20">
                <div className="min-w-0">
                  <p className="text-[13px] font-bold uppercase tracking-[0.24em] text-brand">
                    Address
                  </p>
                  <a
                    href={site.mapsHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 block max-w-[260px] text-[17px] leading-[1.9] text-ink transition-colors duration-200 hover:text-brand-dark"
                  >
                    8695 Martin Way E #101
                    <br />
                    Lacey, WA 98516
                  </a>
                </div>

                <div className="min-w-0">
                  <p className="text-[13px] font-bold uppercase tracking-[0.24em] text-brand">
                    Hours
                  </p>
                  <div className="mt-4 space-y-3 text-[17px] leading-[1.9] text-ink-soft/84">
                    <p>Mon - Fri: 9:00 AM - 5:30 PM</p>
                    <p>Sat: By appointment only</p>
                    <p>Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden border border-white/12 bg-[#2A2A2A] px-8 py-9 text-white shadow-[0_28px_70px_rgba(43,39,35,0.18)] sm:px-10 sm:py-10 lg:mt-4 lg:px-11 lg:py-11">
              <div className="absolute inset-x-0 top-0 h-1 bg-brand" />
              <div className="relative">
                <h3 className="mt-7 font-display text-[clamp(2rem,3vw,2.55rem)] font-medium leading-[1.04] tracking-[-0.03em] text-white">
                  Book a consultation
                </h3>
                <p className="mt-5 max-w-md text-[17px] leading-[1.85] text-white/76">
                  Meet with our team in the showroom or by phone. We&apos;ll review your project,
                  answer questions, and help map out the best next step.
                </p>

                <div className="mt-8 space-y-0 border-y border-white/10 py-6">
                  <div>
                    <div className="flex items-start gap-3 py-3 text-[16px] leading-relaxed text-white/82">
                      <Check className="mt-1 size-4 shrink-0 text-brand-light" />
                      <span>Free consultation with no commitment</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-3 py-3 text-[16px] leading-relaxed text-white/82">
                      <Check className="mt-1 size-4 shrink-0 text-brand-light" />
                      <span>In-person showroom visit or phone call</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-3 py-3 text-[16px] leading-relaxed text-white/82">
                      <Check className="mt-1 size-4 shrink-0 text-brand-light" />
                      <span>Free estimates and fast follow-up from our local team</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center bg-brand px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.22em] text-ink transition duration-200 hover:bg-brand-dark hover:text-white"
                  >
                    Schedule Now
                  </Link>
                  <a
                    href={site.phoneHref}
                    className="inline-flex w-full items-center justify-center gap-2 border border-white/20 px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.22em] text-white transition duration-200 hover:border-brand-light hover:text-brand-light"
                  >
                    <Phone className="size-4" />
                    {site.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
