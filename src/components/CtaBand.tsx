"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

export default function CtaBand() {
  return (
    <section className="bg-[#1C1C1C] relative overflow-hidden">
      <img
        src="/images/cta-bg.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.06] pointer-events-none"
      />
      <div className="relative z-10 container section-pad py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="eyebrow text-[#5DBB46]/70">Ready to Start?</span>
          <h2
            style={{
              fontSize: "clamp(34px,3.5vw,54px)",
              color: "white",
              marginTop: "1rem",
              marginBottom: "1.5rem",
              lineHeight: 1.08,
            }}
          >
            Your Dream Kitchen
            <br />
            In Just 10 Business Days.
          </h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-md">
            Expert craftsmanship and guaranteed timelines. Schedule your free
            consultation to start your transformation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease, delay: 0.12 }}
          className="flex flex-col items-start gap-6 lg:items-end"
        >
          <a
            href="#contact"
            className="btn btn-solid"
            style={{ boxShadow: "0 4px 24px rgba(93,187,70,0.35)" }}
          >
            Schedule Free Consultation
          </a>
          <a href="#portfolio" className="link-arrow" style={{ color: "rgba(255,255,255,0.6)" }}>
            View Our Work <span className="arrow">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
