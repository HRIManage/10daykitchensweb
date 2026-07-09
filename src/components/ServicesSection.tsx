"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white">
      <div className="section-pad pt-24 pb-16">
        <motion.span
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="eyebrow block"
        >
          What We Do
        </motion.span>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
        >
          <h2
            style={{
              fontSize: "clamp(34px,3.5vw,54px)",
              color: "#111111",
              marginTop: "1rem",
            }}
          >
            Kitchen &amp; Bath Remodeling Done Right
          </h2>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease }}
        className="flex flex-col md:flex-row min-h-[420px] md:h-[520px] w-full border-t border-[rgba(17,17,17,0.08)]"
      >
        <div className="md:w-[55%] flex-none relative overflow-hidden h-64 md:h-auto">
          <img
            src="/images/kitchen-ethos-walnut.jpg"
            alt="Custom kitchen remodel walnut cabinets"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center section-pad py-12">
          <span className="inline-block bg-[#EEF4EB] text-[#111111] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-8 w-fit">
            Kitchen Remodel
          </span>
          <h3
            style={{
              fontSize: "40px",
              color: "#111111",
              marginBottom: "1rem",
            }}
          >
            Kitchen Remodel
          </h3>
          <p className="text-[#777777] text-base leading-relaxed max-w-md mb-8">
            Transform your kitchen with our expert design-build process — from
            consultation to completion in as little as 10 business days. Custom
            and stock cabinets, countertops, backsplash, and more.
          </p>
          <a href="#contact" className="link-arrow w-fit">
            Explore Kitchen Remodels <span className="arrow">→</span>
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease }}
        className="flex flex-col md:flex-row-reverse min-h-[420px] md:h-[520px] w-full border-t border-[rgba(17,17,17,0.08)]"
      >
        <div className="md:w-[55%] flex-none relative overflow-hidden h-64 md:h-auto">
          <img
            src="/images/bath-remodel.png"
            alt="Modern bathroom remodel"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center section-pad py-12">
          <span className="inline-block bg-[#EEF4EB] text-[#111111] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-8 w-fit">
            Bath Remodel
          </span>
          <h3
            style={{
              fontSize: "40px",
              color: "#111111",
              marginBottom: "1rem",
            }}
          >
            Bath Remodel
          </h3>
          <p className="text-[#777777] text-base leading-relaxed max-w-md mb-8">
            Elevate your bathroom with high-quality materials and a streamlined
            remodel process designed for speed and precision. Vanities, tile,
            fixtures, and full installation.
          </p>
          <a href="#contact" className="link-arrow w-fit">
            Explore Bath Remodels <span className="arrow">→</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
