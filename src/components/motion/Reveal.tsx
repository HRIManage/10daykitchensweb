"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Stagger delay in ms, applied as a CSS transition-delay. */
  delay?: number;
  threshold?: number;
}

/**
 * Scroll-triggered fade + slide-in, the default reveal used across the site.
 * Server-renders its full content; motion is progressive enhancement only —
 * an IntersectionObserver toggles a class, nothing is hidden from crawlers
 * or users with JS disabled (the `.reveal` CSS only hides under
 * prefers-reduced-motion: no-preference).
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  style,
  delay = 0,
  threshold = 0.15,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [intersected, setIntersected] = useState(false);
  const reducedMotion = useReducedMotion();
  const visible = reducedMotion || intersected;

  useEffect(() => {
    if (reducedMotion) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersected(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion, threshold]);

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? " reveal-in" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
    >
      {children}
    </Tag>
  );
}
