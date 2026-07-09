"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import gsap from "gsap";

/**
 * Per-navigation entry transition. Next.js remounts this on every route
 * change (it's keyed by segment), so a fresh fade+rise runs on each page —
 * the lightest possible "the site feels considered" signal without owning
 * exit animations, which Next's App Router doesn't support natively.
 */
export default function Template({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 8,
        duration: 0.4,
        ease: "power2.out",
      });
    });
    return () => ctx.revert();
  }, [reducedMotion]);

  return <div ref={ref}>{children}</div>;
}
