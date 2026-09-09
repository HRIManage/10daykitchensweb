"use client";

import { useEffect, useRef, useState } from "react";
import { HOME_CONSULT_URL } from "@/lib/honeybook";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function SchedulerEmbed({ id = "book" }: { id?: string }) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShow(true);
          window.gtag?.("event", "schedule_view", { form: "fast-bath-embed" });
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [show]);

  return (
    <section id={id} className="scroll-mt-24 bg-paper py-12 sm:py-16 lg:py-20">
      <div className="site-container max-w-3xl">
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-dark">
          Book your visit
        </p>
        <h2 className="mt-3 font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-tight text-ink">
          Pick a time that works for you.
        </h2>
        <p className="mt-4 text-[1rem] leading-7 text-ink-soft">
          A 45&ndash;60 minute in-home visit. We look at the space, walk through materials, and
          leave you with a firm quote.
        </p>

        <div
          ref={sentinelRef}
          className="mt-8 min-h-[640px] border border-line bg-white lg:min-h-[720px]"
        >
          {show ? (
            <iframe
              src={HOME_CONSULT_URL}
              title="Book a free in-home consultation"
              loading="lazy"
              className="h-[640px] w-full border-0 lg:h-[720px]"
            />
          ) : (
            <div className="flex h-[640px] w-full items-center justify-center lg:h-[720px]">
              <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                Loading available times&hellip;
              </span>
            </div>
          )}
        </div>

        <p className="mt-4 text-[13px] text-ink-soft">
          Trouble loading?{" "}
          <a
            href={HOME_CONSULT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-dark underline underline-offset-2"
          >
            Open the scheduler in a new tab
          </a>
          .
        </p>
      </div>
    </section>
  );
}
