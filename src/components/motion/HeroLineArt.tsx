"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(DrawSVGPlugin);

/**
 * A sparse kitchen-elevation line drawing that draws itself in over the hero
 * photo, then fades away — "the plan resolving into the real kitchen."
 * Purely decorative (aria-hidden) and never blocks the photo beneath it from
 * being visible, so it doesn't cost anything on LCP. Renders nothing under
 * reduced motion.
 */
export default function HeroLineArt({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !svgRef.current) return;
    const paths = svgRef.current.querySelectorAll("path, line, rect, circle");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.set(paths, { drawSVG: "0%" })
        .to(paths, {
          drawSVG: "100%",
          duration: 1.1,
          ease: "power2.out",
          stagger: 0.045,
        })
        .to(svgRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        });
    });
    return () => ctx.revert();
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      viewBox="0 0 900 320"
      preserveAspectRatio="xMidYMax slice"
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-[38%] w-full opacity-70 ${className}`}
      fill="none"
      stroke="rgba(255,255,255,0.55)"
      strokeWidth="1.25"
    >
      {/* Countertop line */}
      <line x1="40" y1="210" x2="860" y2="210" />
      {/* Upper cabinet run */}
      <rect x="60" y="40" width="180" height="90" />
      <rect x="260" y="40" width="180" height="90" />
      <line x1="150" y1="40" x2="150" y2="130" />
      <line x1="350" y1="40" x2="350" y2="130" />
      {/* Range hood */}
      <path d="M 480 40 L 560 40 L 545 95 L 495 95 Z" />
      <line x1="520" y1="95" x2="520" y2="130" />
      {/* Window */}
      <rect x="620" y="45" width="150" height="120" />
      <line x1="695" y1="45" x2="695" y2="165" />
      <line x1="620" y1="105" x2="770" y2="105" />
      {/* Lower cabinet run */}
      <rect x="60" y="210" width="140" height="90" />
      <line x1="130" y1="210" x2="130" y2="300" />
      {/* Sink basin */}
      <rect x="230" y="225" width="90" height="45" rx="4" />
      {/* Range / cooktop */}
      <rect x="480" y="210" width="90" height="90" />
      <circle cx="505" cy="235" r="9" />
      <circle cx="545" cy="235" r="9" />
      <circle cx="505" cy="270" r="9" />
      <circle cx="545" cy="270" r="9" />
      {/* Island */}
      <rect x="620" y="230" width="220" height="70" />
      <line x1="730" y1="230" x2="730" y2="300" />
    </svg>
  );
}
