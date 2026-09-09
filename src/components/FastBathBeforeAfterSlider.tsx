"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

/**
 * Before/after reveal. The handle follows the pointer directly (no click-drag).
 * The reveal position is written to a CSS custom property on the container via a
 * ref, so pointer moves never trigger a React render — it stays smooth at 60fps.
 * A small piece of state is kept only for the accessible value + keyboard control.
 */
export default function FastBathBeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [ariaValue, setAriaValue] = useState(50);

  const apply = useCallback((pct: number) => {
    const clamped = Math.min(100, Math.max(0, pct));
    containerRef.current?.style.setProperty("--pos", `${clamped}%`);
    return clamped;
  }, []);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const el = containerRef.current;
      if (!el) return;
      const bounds = el.getBoundingClientRect();
      const pct = ((event.clientX - bounds.left) / bounds.width) * 100;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => apply(pct));
    },
    [apply],
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    const step = event.shiftKey ? 10 : 4;
    let next = ariaValue;
    if (event.key === "ArrowLeft") next = Math.max(0, ariaValue - step);
    else if (event.key === "ArrowRight") next = Math.min(100, ariaValue + step);
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 100;
    else return;
    event.preventDefault();
    setAriaValue(apply(next));
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setAriaValue(apply(50))}
      style={{ "--pos": "50%" } as React.CSSProperties}
      className="group relative aspect-[4/5] w-full touch-pan-y select-none overflow-hidden border border-line bg-paper shadow-[0_28px_80px_rgba(43,39,35,0.14)]"
    >
      {/* After — full frame */}
      <Image
        src="/images/ba-after-bath.jpg"
        alt="Bathroom after a Fast Bath tub-to-shower conversion"
        fill
        sizes="(min-width: 1024px) 46vw, 100vw"
        className="object-cover"
      />

      {/* Before — clipped to the handle position */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: "inset(0 calc(100% - var(--pos)) 0 0)" }}
      >
        <Image
          src="/images/ba-before-bath.jpg"
          alt="Bathroom before a Fast Bath tub-to-shower conversion"
          fill
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="object-cover"
        />
      </div>

      <span className="pointer-events-none absolute left-4 top-4 bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
        Before
      </span>
      <span className="pointer-events-none absolute right-4 top-4 bg-brand-dark px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
        After
      </span>

      {/* Divider */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(43,39,35,0.18)]"
        style={{ left: "var(--pos)" }}
      />

      {/* Handle — the accessible control */}
      <div
        role="slider"
        aria-label="Drag or use arrow keys to compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(ariaValue)}
        tabIndex={0}
        onKeyDown={onKeyDown}
        style={{ left: "var(--pos)" }}
        className="absolute top-1/2 z-20 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-brand-dark text-white shadow-[0_14px_34px_rgba(43,39,35,0.3)] transition-transform duration-200 group-hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
      >
        <MoveHorizontal className="size-5" aria-hidden />
      </div>
    </div>
  );
}
