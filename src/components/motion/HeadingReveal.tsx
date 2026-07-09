"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface HeadingRevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}

/**
 * Per-line masked reveal for display headings, driven by GSAP SplitText.
 * Splits on real line breaks (post-wrap), so it works on any heading length
 * without manual <MaskLine> wrapping. Server-renders the full text; the split
 * and animation are progressive enhancement, reverted on unmount/resize.
 */
export default function HeadingReveal({
  children,
  as: Tag = "h2",
  className = "",
  delay = 0,
}: HeadingRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const node = ref.current;
    if (!node) return;

    const ctx = gsap.context(() => {
      const split = SplitText.create(node, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      });

      gsap.from(split.lines, {
        yPercent: 115,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        delay: delay / 1000,
        scrollTrigger: {
          trigger: node,
          start: "top 85%",
          once: true,
        },
      });

      return () => split.revert();
    }, node);

    return () => ctx.revert();
  }, [reducedMotion, delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
