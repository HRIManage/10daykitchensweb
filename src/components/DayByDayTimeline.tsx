"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { CONTAINER } from "@/components/layout";
import { ease, FadeIn, SectionHeader } from "@/components/shared";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

const days = [
  {
    day: "DAY 1",
    label: "Pack-Out & Demo",
    desc: "White-glove packing followed by precision demolition.",
    image: "/images/timeline/day-01-demo.png",
  },
  {
    day: "DAY 2",
    label: "Prep & Repairs",
    desc: "Expert drywall and plumbing adjustments.",
    image: "/images/timeline/day-02-prep.png",
  },
  {
    day: "DAY 3",
    label: "Cabinet Base",
    desc: "Leveling and installation of high-end base cabinetry.",
    image: "/images/timeline/day-03-base-cabinets.png",
  },
  {
    day: "DAY 4",
    label: "Uppers & Templates",
    desc: "Upper mounting and countertop templating.",
    image: "/images/timeline/day-04-uppers-template.png",
  },
  {
    day: "DAY 5",
    label: "Cabinet Detail",
    desc: "Alignment, hardware, and structural securement.",
    image: "/images/timeline/day-05-cabinet-detail.png",
  },
  {
    day: "DAY 6",
    label: "Flooring & Trim",
    desc: "Premium flooring surfaces and custom trim work.",
    image: "/images/timeline/day-06-flooring-trim.png",
  },
  {
    day: "DAY 7",
    label: "Stone & Tile",
    desc: "Countertop placement and backsplash installation.",
    image: "/images/timeline/day-07-stone-tile.png",
  },
  {
    day: "DAY 8",
    label: "Fixtures & Flow",
    desc: "Appliance integration and plumbing/electrical trim-out.",
    image: "/images/timeline/day-08-fixtures-flow.png",
  },
  {
    day: "DAY 9",
    label: "Fine-Tuning",
    desc: "Addressing small details that make a space feel complete.",
    image: "/images/timeline/day-09-fine-tuning.png",
  },
  {
    day: "DAY 10",
    label: "Unveiling",
    desc: "Final walkthrough and professional cleaning.",
    image: "/images/timeline/day-10-final-walkthrough.png",
  },
] as const;

/** Simple stacked timeline — mobile and reduced-motion rendering. */
function StackedDays() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col">
      {days.map((d, i) => (
        <FadeIn
          key={d.day}
          delay={(i % 4) * 0.05}
          className="flex items-start gap-6 border-b border-line py-7 last:border-0"
        >
          <span className="w-16 flex-none text-right font-condensed text-5xl font-semibold leading-none text-brand-dark">
            {i + 1}
          </span>
          <div className="min-w-0">
            <div className="relative mb-5 aspect-[16/10] overflow-hidden border border-line bg-white shadow-[0_18px_50px_rgba(42,42,42,0.08)]">
              <Image
                src={d.image}
                alt={`${d.day} ${d.label} kitchen remodel timeline`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 640px"
              />
            </div>
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-muted">{d.day}</p>
            <h3 className="font-display text-xl font-semibold text-ink">{d.label}</h3>
            <p className="mt-1.5 max-w-md text-[15px] leading-relaxed text-ink-soft/80">{d.desc}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

/** Scroll-pinned timeline — desktop. Days advance as the user scrolls the tall track. */
function PinnedDays() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(days.length - 1, Math.max(0, Math.floor(p * days.length))));
  });

  const d = days[active];

  return (
    <div ref={trackRef} className="relative h-[350vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className={`${CONTAINER} grid grid-cols-[1.15fr_auto_0.95fr] items-center gap-14`}>
          {/* Oversized numeral — the brand device */}
          <div className="relative h-[430px] overflow-hidden border border-white/70 bg-white shadow-[0_30px_90px_rgba(42,42,42,0.13)]">
            {days.map((item, i) => (
              <motion.div
                key={item.day}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.035 }}
                transition={{ duration: 0.55, ease }}
                aria-hidden={i !== active}
              >
                <Image
                  src={item.image}
                  alt={`${item.day} ${item.label} kitchen remodel timeline`}
                  fill
                  className="object-cover"
                  priority={i === 0}
                  sizes="(min-width: 1024px) 48vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/28 via-transparent to-white/10" />
              </motion.div>
            ))}
            {days.map((item, i) => (
              <span
                key={`${item.day}-number`}
                className={`absolute bottom-7 left-7 font-condensed text-[7.5rem] font-semibold leading-none tracking-tight text-white drop-shadow-[0_10px_28px_rgba(0,0,0,0.32)] transition-opacity duration-500 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            ))}
          </div>

          {/* Vertical progress rule, filling brand green with scroll */}
          <div className="flex h-[52vh] flex-col items-center gap-3" aria-hidden="true">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink-muted">Day 1</span>
            <span className="relative w-px flex-1 overflow-hidden bg-line">
              <motion.span
                className="absolute inset-x-0 top-0 h-full origin-top bg-brand"
                style={{ scaleY: scrollYProgress }}
              />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-dark">Day 10</span>
          </div>

          {/* Active day copy — crossfades on change */}
          <div className="min-h-[180px]">
            <motion.div
              key={d.day}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease }}
            >
              <p className="mb-3 text-[11.5px] font-bold uppercase tracking-[0.24em] text-brand-dark">{d.day}</p>
              <h3 className="font-display text-[2.4rem] font-semibold leading-[1.08] tracking-[-0.015em] text-ink">
                {d.label}
              </h3>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink-soft/80">{d.desc}</p>
            </motion.div>

            {/* Day markers */}
            <div className="mt-9 flex gap-1.5" aria-hidden="true">
              {days.map((item, i) => (
                <span
                  key={item.day}
                  className={`h-[2px] w-7 transition-colors duration-300 ${
                    i <= active ? "bg-brand" : "bg-line"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelinePreview() {
  const previewDays = [days[0], days[2], days[6], days[9]];

  return (
    <div className={`${CONTAINER} grid gap-4 pb-10 pt-7 sm:grid-cols-2 lg:grid-cols-4`}>
      {previewDays.map((d, i) => (
        <FadeIn key={d.day} delay={i * 0.06} className="group bg-white">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={d.image}
              alt={`${d.day} ${d.label} kitchen remodel timeline`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <span className="absolute left-4 top-4 bg-white/92 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-ink shadow-[0_10px_24px_rgba(0,0,0,0.12)]">
              {d.day}
            </span>
          </div>
          <div className="border border-t-0 border-line p-5">
            <h3 className="font-display text-[1.25rem] font-semibold leading-tight text-ink">{d.label}</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft/75">{d.desc}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

export default function DayByDayTimeline({ variant = "full" }: { variant?: "full" | "compact" }) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-paper">
      <div className={`${CONTAINER} ${variant === "compact" ? "pt-12 sm:pt-14 lg:pt-16" : "pt-16 sm:pt-20 lg:pt-24"}`}>
        <div className="mx-auto max-w-2xl text-center [&>div]:mx-auto">
          <SectionHeader
            label="The 10-Day Transformation"
            title={
              <>
                Day by day, <em className="font-medium italic text-brand-dark">plan to done.</em>
              </>
            }
          />
        </div>
      </div>

      {/* Mobile + reduced motion: stacked. Desktop: scroll-pinned. */}
      {variant === "compact" ? (
        <TimelinePreview />
      ) : reducedMotion ? (
        <div className={`${CONTAINER} pb-16 pt-10 sm:pb-20`}>
          <StackedDays />
        </div>
      ) : (
        <>
          <div className={`${CONTAINER} pb-16 pt-10 sm:pb-20 lg:hidden`}>
            <StackedDays />
          </div>
          <div className="hidden lg:block">
            <PinnedDays />
          </div>
        </>
      )}
    </section>
  );
}
