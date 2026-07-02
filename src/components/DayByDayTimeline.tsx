"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

const days = [
  { day: "DAY 1", label: "PACK-OUT & DEMO", desc: "White-glove packing followed by precision demolition." },
  { day: "DAY 2", label: "PREP & REPAIRS", desc: "Expert drywall and plumbing adjustments." },
  { day: "DAY 3", label: "CABINET BASE", desc: "Leveling and installation of high-end base cabinetry." },
  { day: "DAY 4", label: "UPPERS & TEMPLATES", desc: "Upper mounting and countertop templating." },
  { day: "DAY 5", label: "CABINET DETAIL", desc: "Alignment, hardware, and structural securement." },
  { day: "DAY 6", label: "FLOORING & TRIM", desc: "Premium flooring surfaces and custom trim work." },
  { day: "DAY 7", label: "STONE & TILE", desc: "Countertop placement and backsplash installation." },
  { day: "DAY 8", label: "FIXTURES & FLOW", desc: "Appliance integration and plumbing/electrical trim-out." },
  { day: "DAY 9", label: "FINE-TUNING", desc: "Addressing small details that make a space feel complete." },
  { day: "DAY 10", label: "UNVEILING", desc: "Final walkthrough and professional cleaning." },
] as const;

export default function DayByDayTimeline() {
  return (
    <section className="bg-white py-24 md:py-32 px-6 sm:px-10 lg:px-16">
      <div className="text-center mb-16 md:mb-20">
        <span className="eyebrow block mb-4">The 10-Day Transformation</span>
        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(36px,3.5vw,52px)",
            letterSpacing: "-0.02em",
            fontWeight: 500,
            color: "#111111",
          }}
        >
          Day by Day
        </h2>
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Spine — connects every day, the visual thread of the build */}
        <div
          className="absolute left-[27px] sm:left-[31px] top-2 bottom-2 w-[2px]"
          style={{ background: "linear-gradient(to bottom, rgba(93,187,70,0.08), rgba(93,187,70,0.5) 6%, rgba(93,187,70,0.5) 94%, rgba(93,187,70,0.08))" }}
          aria-hidden="true"
        />

        <div className="flex flex-col gap-12 md:gap-14">
          {days.map((d, i) => (
            <motion.div
              key={d.day}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px", amount: 0.6 }}
              transition={{ duration: 0.8, ease, delay: (i % 5) * 0.1 }}
              className="relative flex gap-6 sm:gap-8 items-start pl-[0px]"
            >
              {/* Spine node */}
              <span className="relative z-10 flex-none flex h-[56px] w-[56px] sm:h-[62px] sm:w-[62px] items-center justify-center rounded-full border-2 border-[#5DBB46] bg-white">
                <span
                  className="stat-num text-[#5DBB46]"
                  style={{ fontSize: "1.1rem" }}
                >
                  {i + 1}
                </span>
              </span>

              <div className="pt-2">
                <span className="inline-flex items-center rounded-full border border-[rgba(93,187,70,0.35)] px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[#5DBB46] mb-3">
                  {d.day}
                </span>
                <h3
                  className="text-lg sm:text-xl font-bold uppercase tracking-wide text-[#111111] mb-2 leading-snug"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {d.label}
                </h3>
                <p className="text-[#777777] text-base leading-relaxed max-w-md">
                  {d.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
