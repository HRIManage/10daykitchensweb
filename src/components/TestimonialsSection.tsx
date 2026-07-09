"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import { ease } from "@/lib/motion";

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
    <section className="bg-[#1C1C1C] py-24 md:py-32 section-pad">
      <div className="site-container grid gap-16 lg:grid-cols-12 lg:gap-20">
        {/* LEFT — eyebrow + heading + dash nav */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="lg:col-span-4"
        >
          <p className="eyebrow" style={{ color: 'rgba(93,187,70,0.7)' }}>
            What Clients Say
          </p>
          <h2
            style={{
              fontSize: 'clamp(34px,3.5vw,48px)',
              color: 'white',
              marginTop: '1rem',
            }}
          >
            Customer Reviews
          </h2>

          <div className="mt-10 flex items-center gap-3">
            {reviews.map((review, i) => (
              <button
                key={review.author}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View testimonial from ${review.author}`}
                className={`h-[3px] cursor-pointer rounded-full transition-all duration-500 ${
                  i === active ? "w-12 bg-[#5DBB46]" : "w-6 bg-white/15 hover:bg-white/30"
                }`}
              />
            ))}
          </div>
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-white/35">
            {active + 1} / {reviews.length}
          </p>
        </motion.div>

        {/* RIGHT — giant quote mark + rotating review */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="relative lg:col-span-8 lg:border-l lg:border-white/10 lg:pl-16"
        >
          <div
            aria-hidden="true"
            className="select-none leading-none text-[#5DBB46]/[0.16] -ml-1 mb-1"
            style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(4.5rem,9vw,7rem)" }}
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
              <div className="flex gap-1 mb-6">
                {Array.from({ length: starCount }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-white/60 text-xs uppercase tracking-widest mb-6">{r.label}</p>

              <blockquote
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: 'white',
                  fontSize: 'clamp(1.2rem,2vw,1.4rem)',
                  fontWeight: 400,
                  lineHeight: 1.65,
                }}
              >
                &ldquo;{r.quote}&rdquo;
              </blockquote>

              <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-7">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#5DBB46] font-bold text-sm text-white">
                  {r.author.charAt(0)}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{r.author}</p>
                  <p className="text-white/40 text-xs uppercase tracking-wider mt-1">{r.tag}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
