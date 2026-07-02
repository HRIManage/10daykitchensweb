"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";


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

const loopedImages = [...galleryImages, ...galleryImages];

export default function GalleryStrip() {
  // Detection happens on an unclipped ref — some browsers treat a
  // clip-path'd element as having zero visible area, which would
  // deadlock whileInView if it observed the clipped node directly.
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInView = useInView(marqueeRef, { once: true, margin: "-60px" });

  return (
    <section className="bg-white overflow-hidden py-12 border-b border-[rgba(17,17,17,0.06)]">
      <div ref={marqueeRef} className="overflow-hidden h-72">
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={marqueeInView ? { clipPath: "inset(0 0 0% 0)" } : undefined}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full"
        >
          <div className="marquee-track flex gap-4 py-4" style={{ animationDuration: "85s" }}>
            {loopedImages.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                className="w-64 h-64 flex-none object-cover rounded-md"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
