"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Site-wide layout rhythm — import these, never redeclare per page. */
/** The one easing curve used for every reveal on the site. */
export const ease = [0.22, 1, 0.36, 1] as const;

/** Default scroll reveal: fade + 16px rise, once, on entering the viewport. */
export function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.55, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Barlow Condensed uppercase eyebrow above section headings. */
export function Label({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`mb-4 text-[13px] font-bold uppercase tracking-[0.24em] ${
        dark ? "text-brand-light" : "text-brand"
      }`}
    >
      {children}
    </p>
  );
}

/** Standard section opener: eyebrow + display heading + optional body. */
export function SectionHeader({
  label,
  title,
  body,
  dark = false,
}: {
  label: string;
  title: ReactNode;
  body?: string;
  dark?: boolean;
}) {
  return (
    <FadeIn className="max-w-2xl">
      <Label dark={dark}>{label}</Label>
      <h2
        className={`font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {body ? (
        <p className={`mt-5 text-[16px] leading-relaxed ${dark ? "text-cream/68" : "text-ink-soft/70"}`}>
          {body}
        </p>
      ) : null}
    </FadeIn>
  );
}
