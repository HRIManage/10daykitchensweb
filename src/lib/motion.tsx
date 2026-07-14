"use client";

import { motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

/** Premium easing curve shared by every ported animation. */
export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

/**
 * Text that slides up from behind an overflow-hidden mask as it enters view.
 * The signature hero-headline treatment ported from the reference design.
 */
export function MaskLine({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) {
    return <span className={`block ${className}`}>{children}</span>;
  }
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Animated integer that counts up from 0 once scrolled into view. */
export function CountUp({
  value,
  suffix = "",
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reducedMotion, value, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/**
 * Scroll-linked parallax drift for a full-bleed background image.
 * Framer-motion replacement for the GSAP ParallaxImage — disabled under
 * prefers-reduced-motion, matching the existing GSAP version's behavior.
 */
export function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={wrapperRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        style={reducedMotion ? undefined : { y }}
        className="absolute inset-x-0 -inset-y-[6%]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={`w-full h-full object-cover ${imgClassName}`} />
      </motion.div>
    </div>
  );
}
