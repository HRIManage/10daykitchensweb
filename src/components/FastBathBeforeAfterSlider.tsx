"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FastBathBeforeAfterSlider() {
  const [position, setPosition] = useState(52);
  const sliderRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const bounds = slider.getBoundingClientRect();
    const nextPosition = ((clientX - bounds.left) / bounds.width) * 100;
    setPosition(Math.min(82, Math.max(18, nextPosition)));
  }, []);

  return (
    <div
      ref={sliderRef}
      className="group relative aspect-[1.2/1] overflow-hidden border border-line bg-paper shadow-[0_24px_70px_rgba(43,39,35,0.10)]"
      onMouseMove={(event) => updatePosition(event.clientX)}
      onTouchMove={(event) => updatePosition(event.touches[0].clientX)}
    >
      <Image
        src="/images/ba-after-bath.jpg"
        alt="Finished Fast Bath upgrade with brighter vanity, shower, and flooring"
        fill
        priority={false}
        sizes="(min-width: 1024px) 48vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image
          src="/images/ba-before-bath.jpg"
          alt="Bathroom before Fast Bath upgrade"
          fill
          priority={false}
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute left-4 top-4 bg-white/94 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-ink shadow-[0_10px_24px_rgba(43,39,35,0.10)]">
        Before
      </div>
      <div className="absolute right-4 top-4 bg-brand px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(97,193,66,0.22)]">
        After
      </div>

      <div className="absolute inset-y-0 z-10 w-px bg-white shadow-[0_0_0_1px_rgba(43,39,35,0.12)]" style={{ left: `${position}%` }} />
      <div
        className="absolute top-1/2 z-20 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-white/80 bg-white/92 text-ink shadow-[0_16px_36px_rgba(43,39,35,0.18)] transition-transform duration-300 group-hover:scale-110"
        style={{ left: `${position}%` }}
        aria-hidden="true"
      >
        <ChevronLeft className="size-4" />
        <ChevronRight className="size-4" />
      </div>
    </div>
  );
}
