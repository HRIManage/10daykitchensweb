"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { ease } from "@/lib/motion";
import Reveal from "@/components/motion/Reveal";

const reviews = [
  {
    quote: "Highly recommend. Very happy with the outcome of our kitchen. Everyone was professional, friendly and accommodating. Responded immediately to phone calls.",
    author: "Cathy Sorem",
    tag: "Kitchen Remodel · Lacey, WA",
    stars: 5,
    label: "Highly Recommended",
  },
  {
    quote: "What we really appreciated was how much they genuinely cared. It wasn't just about the job — they checked in, made sure we were comfortable, and seemed invested in our happiness.",
    author: "Bennett",
    tag: "Kitchen Remodel · South Sound, WA",
    stars: 5,
    label: "Beyond Expectations",
  },
  {
    quote: "From design to install, everything was seamless. Our bathroom looks like something out of a magazine. Completed in 10 days exactly as promised.",
    author: "Sarah M.",
    tag: "Bath Remodel · Olympia, WA",
    stars: 5,
    label: "Absolutely Stunning",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const r = reviews[active];

  return (
    <section className="py-24 md:py-32 section-pad">
      <div className="container">
        {/* Header */}
        <Reveal className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 eyebrow">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5DBB46]" />
            What Clients Say
          </span>
          <h2
            className="mt-4 font-extrabold tracking-tight text-[#111111]"
            style={{ fontSize: "clamp(34px,3.5vw,52px)" }}
          >
            Real Words from Real Clients
          </h2>
        </Reveal>

        {/* Big feature card */}
        <Reveal delay={100}>
          <div className="relative overflow-hidden rounded-2xl bg-[#1B3320] px-8 py-12 md:px-16 md:py-16 shadow-xl">
            {/* Decorative green glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, #5DBB46 0%, transparent 70%)" }}
            />
            {/* Big quote icon */}
            <Quote
              className="absolute top-8 right-8 md:top-12 md:right-12 opacity-10 text-[#5DBB46]"
              style={{ width: 80, height: 80 }}
              aria-hidden="true"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.45, ease }}
                className="relative z-10"
              >
                {/* Stars + label */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex gap-1">
                    {Array.from({ length: r.stars }).map((_, s) => (
                      <Star key={s} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center bg-[#5DBB46]/20 text-[#7ADB5E] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {r.label}
                  </span>
                </div>

                {/* Quote */}
                <blockquote
                  className="text-white/90 font-light leading-relaxed mb-10"
                  style={{ fontSize: "clamp(1.2rem,2.2vw,1.5rem)", maxWidth: "56rem" }}
                >
                  &ldquo;{r.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#5DBB46] text-white font-bold text-base">
                    {r.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{r.author}</p>
                    <p className="text-white/50 text-xs uppercase tracking-wider mt-0.5">{r.tag}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dot navigation */}
            <div className="relative z-10 flex items-center gap-3 mt-10">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`rounded-full transition-all duration-500 cursor-pointer ${
                    i === active
                      ? "w-8 h-2 bg-[#5DBB46]"
                      : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
              <span className="ml-2 text-white/30 text-xs font-semibold">
                {active + 1} / {reviews.length}
              </span>
            </div>
          </div>
        </Reveal>

        {/* Bottom trust strip */}
        <Reveal delay={200} className="mt-10 text-center">
          <p className="text-[#777777] text-sm">
            <span className="font-semibold text-[#111111]">800+</span> projects completed across Pierce &amp; Thurston Counties · Average <span className="font-semibold text-[#111111]">4.9★</span> rating
          </p>
        </Reveal>
      </div>
    </section>
  );
}
