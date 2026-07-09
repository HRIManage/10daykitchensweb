"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Reveal from "@/components/motion/Reveal";
import { CountUp, ease } from "@/lib/motion";

const galleryImages = [
  { src: "/images/gallery-whistler-frost.jpg", alt: "Whistler frost kitchen" },
  { src: "/images/kitchen-ethos-walnut.jpg", alt: "Ethos walnut kitchen" },
  { src: "/images/gallery-metropolitan-walnut.jpg", alt: "Metropolitan walnut kitchen" },
  { src: "/images/gallery-quartz-backsplash.jpg", alt: "Quartz backsplash kitchen" },
  { src: "/images/gallery-marble-countertop.jpg", alt: "Marble countertop kitchen" },
  { src: "/images/gallery-butcher-block.jpg", alt: "Butcher block kitchen" },
  { src: "/images/gallery-luxury-bath.png", alt: "Luxury bathroom remodel" },
  { src: "/images/gallery-essential-white-bath.jpg", alt: "Essential white bathroom" },
  { src: "/images/gallery-bath-view2.jpg", alt: "Bathroom remodel view" },
  { src: "/images/gallery-oslo-white-bath.jpg", alt: "Oslo white bathroom" },
];

const stats = [
  { num: "35+", label: "Years Experience", count: 35, suffix: "+" },
  { num: "500+", label: "Projects Completed", count: 500, suffix: "+" },
  { num: "10", label: "Business Day Install", count: 10, suffix: "" },
];

const loopedImages = [...galleryImages, ...galleryImages];

export default function GalleryStrip() {
  // Detection happens on an unclipped ref — some browsers treat a
  // clip-path'd element as having zero visible area, which would
  // deadlock whileInView if it observed the clipped node directly.
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInView = useInView(marqueeRef, { once: true, margin: "-60px" });

  return (
    <section id="about" className="bg-[#F7FAF5] overflow-hidden">
      <div className="section-pad py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center container">
          <Reveal>
            <span className="eyebrow">About 10 Day Kitchens</span>
            <h2
              style={{
                fontSize: "clamp(34px,3.5vw,54px)",
                color: "#111111",
                marginTop: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              Your Neighbors.
              <br />
              Your Experts.
            </h2>
            <p
              className="text-[#777777] leading-relaxed max-w-md"
              style={{ fontSize: "17px" }}
            >
              Based in Lacey, WA, we&apos;ve spent over 35 years building
              beautiful, functional spaces for families across Pierce and
              Thurston Counties. Every project gets the same care — your home,
              your timeline, our best work.
            </p>
          </Reveal>

          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-[rgba(17,17,17,0.07)] p-6 text-center"
              >
                <div className="stat-num" style={{ fontSize: "3rem", color: "#5DBB46" }}>
                  <CountUp value={stat.count} suffix={stat.suffix} />
                </div>
                <div className="text-xs uppercase tracking-widest text-[#777777] mt-2 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div ref={marqueeRef} className="overflow-hidden mt-8 h-72">
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={marqueeInView ? { clipPath: "inset(0 0 0% 0)" } : undefined}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full"
        >
          <div className="marquee-track flex gap-4 py-4">
            {loopedImages.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                className="w-64 h-64 flex-none object-cover rounded-xl"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
