"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import { ease } from "@/lib/motion";
import Reveal from "@/components/motion/Reveal";

const reviews = [
  {
    quote: 'Highly recommend. Very happy with the outcome of our kitchen. Everyone was professional, friendly and accommodating. Responded immediately to phone calls.',
    author: 'Cathy Sorem',
    tag: 'Kitchen Remodel · Lacey, WA',
    rating: '★★★★★',
    label: 'Highly Recommended',
  },
  {
    quote: "What we really appreciated was how much they genuinely cared. It wasn't just about the job — they checked in, made sure we were comfortable, and seemed invested in our happiness.",
    author: 'Bennett',
    tag: 'Kitchen Remodel · South Sound, WA',
    rating: '★★★★★',
    label: 'Beyond Expectations',
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const r = reviews[active];
  const starCount = (r.rating.match(/★/g) || []).length;

  return (
    <section className="bg-white py-24 md:py-32 section-pad">
      <div className="container grid gap-12 lg:grid-cols-12 lg:gap-20">
        
        {/* LEFT — eyebrow + heading + dash nav */}
        <Reveal
          className="lg:col-span-4 flex flex-col justify-center"
        >
          <span className="inline-flex items-center gap-1.5 eyebrow">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5DBB46]"></span>
            What Clients Say
          </span>
          <h2
            style={{
              fontSize: 'clamp(34px,3.5vw,48px)',
              color: '#111111',
              marginTop: '1rem',
            }}
          >
            Customer Reviews
          </h2>

          <div className="mt-8 flex items-center gap-3">
            {reviews.map((review, i) => (
              <button
                key={review.author}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View testimonial from ${review.author}`}
                className={`h-[4px] cursor-pointer rounded-full transition-all duration-500 ${
                  i === active ? "w-12 bg-[#5DBB46]" : "w-6 bg-neutral-200 hover:bg-neutral-300"
                }`}
              />
            ))}
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#777777]">
            {active + 1} / {reviews.length}
          </p>
        </Reveal>

        {/* RIGHT — flat quote container */}
        <Reveal
          delay={100}
          className="relative lg:col-span-8 lg:border-l lg:border-[rgba(17,17,17,0.08)] lg:pl-16 flex flex-col justify-center"
        >
          <div
            aria-hidden="true"
            className="select-none leading-none text-[#5DBB46]/[0.08] absolute right-4 top-2 pointer-events-none"
            style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(6rem,12vw,9rem)" }}
          >
            &ldquo;
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.4, ease }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: starCount }).map((_, s) => (
                  <Star key={s} className="h-4.5 w-4.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="inline-flex items-center bg-[#EEF4EB] text-[#5DBB46] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-6">
                {r.label}
              </span>

              <blockquote
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: '#111111',
                  fontSize: 'clamp(1.15rem,2vw,1.3rem)',
                  fontWeight: 400,
                  lineHeight: 1.65,
                }}
              >
                &ldquo;{r.quote}&rdquo;
              </blockquote>

              <div className="mt-8 flex items-center gap-4 border-t border-[rgba(17,17,17,0.08)] pt-7">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#EEF4EB] text-[#5DBB46] font-bold text-sm">
                  {r.author.charAt(0)}
                </div>
                <div>
                  <p className="text-[#111111] text-sm font-semibold">{r.author}</p>
                  <p className="text-[#777777] text-xs uppercase tracking-wider mt-1">{r.tag}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
