"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { CONTAINER } from "@/components/layout";
import { ease } from "@/components/shared";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import HeadingReveal from "@/components/motion/HeadingReveal";

interface InteriorHeroProps {
  image: string;
  imageAlt?: string;
  eyebrow: string;
  title: ReactNode;
  body?: string;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export default function InteriorHero({
  image,
  imageAlt = "",
  eyebrow,
  title,
  body,
  cta,
  secondaryCta,
}: InteriorHeroProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-paper pt-[158px] sm:pt-[176px]">
      <div className={`${CONTAINER} grid min-h-[610px] gap-10 pb-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:pb-18`}>
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="max-w-2xl"
        >
          <p className="eyebrow mb-4 block text-[0.82rem] font-bold">{eyebrow}</p>

          <HeadingReveal
            as="h1"
            className="max-w-3xl text-[clamp(2.55rem,4.7vw,4.75rem)] leading-[1.02] text-ink [&_em]:font-medium [&_em]:italic [&_em]:text-brand-dark"
          >
            {title}
          </HeadingReveal>

          {body ? <p className="mt-6 max-w-xl text-[1rem] leading-8 text-ink-soft">{body}</p> : null}

          {cta || secondaryCta ? (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {cta ? (
                <Link
                  href={cta.href}
                  className="group inline-flex h-[52px] items-center justify-center gap-3 bg-brand px-7 text-[12px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-brand-dark hover:shadow-[0_16px_34px_rgba(93,187,70,0.3)]"
                >
                  {cta.label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex h-[52px] items-center justify-center border border-line bg-white/55 px-7 text-[12px] font-bold uppercase tracking-[0.15em] text-ink transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:text-brand-dark"
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          ) : null}
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.18 }}
          className="relative"
        >
          <div className="relative aspect-[1.18/1] overflow-hidden border border-line bg-white shadow-[0_26px_80px_rgba(43,39,35,0.12)]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
