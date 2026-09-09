"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, Phone } from "lucide-react";
import { site } from "@/lib/site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function StickyCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-line bg-white transition-transform motion-reduce:transition-none lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={site.phoneHref}
        onClick={() => window.gtag?.("event", "contact", { method: "phone", from: "fast-bath-sticky" })}
        className="flex min-h-[56px] items-center justify-center gap-2 border-r border-line text-[13px] font-bold uppercase tracking-[0.1em] text-ink"
      >
        <Phone className="size-4" aria-hidden />
        {site.phone}
      </a>
      <a
        href="#book"
        className="flex min-h-[56px] items-center justify-center gap-2 bg-brand-dark text-[13px] font-bold uppercase tracking-[0.1em] text-white"
      >
        <CalendarCheck className="size-4" aria-hidden />
        Book free visit
      </a>
    </div>
  );
}
