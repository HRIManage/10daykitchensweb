"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-black py-28 sm:py-36 text-center w-full">
      {/* Full-bleed background image */}
      <Image
        src="/images/cta-bg.jpg"
        alt="Dream kitchen and bathroom renovation design"
        fill
        className="absolute inset-0 object-cover pointer-events-none"
        sizes="100vw"
        priority
      />
      {/* Lighter dark overlay with subtle blur to keep the kitchen visible but make text pop */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px] z-0" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease }}
          className="inline-flex items-center gap-1.5 bg-[#5DBB46]/30 text-white text-[10px] font-bold uppercase tracking-[0.12em] px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#5DBB46]"></span>
          Lacey, Olympia, & Thurston County Kitchen & Bath Specialists
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease, delay: 0.05 }}
          className="text-white font-extrabold mb-6 tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
            lineHeight: 1.15,
          }}
        >
          Let&rsquo;s co-create your dream kitchen or bathroom.
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="text-white text-base sm:text-lg font-medium leading-relaxed mb-10 max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
        >
          Schedule a high-intent, complimentary design consultation with our local design-build specialists. We specialize in custom cabinets, premium countertops, and a guaranteed 10-business-day installation timeline for both kitchens and baths.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center bg-[#5DBB46] hover:bg-[#4aa836] text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 w-full sm:w-auto shadow-[0_4px_20px_rgba(93,187,70,0.30)] hover:scale-[1.02]"
          >
            Book Design Appointment <span className="ml-2">↗</span>
          </a>
          <a
            href="tel:3605573444"
            className="inline-flex items-center justify-center border border-white/20 hover:border-white/40 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 w-full sm:w-auto hover:scale-[1.02]"
          >
            Call (360) 557-3444
          </a>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2, ease, delay: 0.2 }}
          className="text-white/40 text-[10px] uppercase tracking-[0.1em] font-semibold mt-10"
        >
          ✓ 10-Business-Day Kitchen & Bath Completion Guarantee &middot; ✓ Licensed, Bonded, & Insured local contractors
        </motion.p>
      </div>
    </section>
  );
}
