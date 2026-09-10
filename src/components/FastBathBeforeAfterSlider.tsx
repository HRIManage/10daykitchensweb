"use client";

import { useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * A native range input powers the comparison so drag, touch, and keyboard
 * behavior stay reliable without rerendering React on every pointer move.
 */
export default function FastBathBeforeAfterSlider() {
  const frameRef = useRef<HTMLDivElement>(null);

  const updateReveal = useCallback((value: string) => {
    frameRef.current?.style.setProperty("--reveal", `${value}%`);
  }, []);

  return (
    <figure>
      <div
        ref={frameRef}
        className="relative aspect-[4/5] touch-none overflow-hidden rounded-xl border border-line bg-ink [--reveal:50%] shadow-[0_24px_70px_rgba(43,39,35,0.12)]"
      >
        <div
          className="absolute inset-0 bg-[url('/images/fast-bath-before-after.jpg')] bg-[length:200%_auto] bg-right bg-center bg-no-repeat"
          role="img"
          aria-label="Finished Fast Bath tub to shower conversion"
        />
        <div
          className="absolute inset-0 bg-[url('/images/fast-bath-before-after.jpg')] bg-[length:200%_auto] bg-left bg-center bg-no-repeat [clip-path:inset(0_calc(100%_-_var(--reveal))_0_0)]"
          role="img"
          aria-label="Bathroom before the Fast Bath tub to shower conversion"
        />

        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(43,39,35,0.18)]"
          style={{ left: "var(--reveal)" }}
        />
        <div
          className="pointer-events-none absolute top-1/2 z-20 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-[0_12px_30px_rgba(43,39,35,0.2)]"
          style={{ left: "var(--reveal)" }}
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          <ChevronRight className="size-4" aria-hidden="true" />
        </div>

        <input
          type="range"
          min="0"
          max="100"
          defaultValue="50"
          aria-label="Show more of the before or after bathroom"
          onInput={(event) => updateReveal(event.currentTarget.value)}
          className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0 focus:opacity-0"
        />
      </div>
      <figcaption className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
        <span>Before</span>
        <span className="font-medium normal-case tracking-normal text-ink-muted">Drag or use arrow keys</span>
        <span className="text-right text-brand-dark">After</span>
      </figcaption>
    </figure>
  );
}
