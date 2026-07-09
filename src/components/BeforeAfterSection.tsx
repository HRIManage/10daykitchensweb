"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

function SliderPanel({
  before,
  after,
  beforeAlt,
  afterAlt,
  name,
  location,
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  name: string;
  location: string;
}) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    isDown.current = true;
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDown.current) return;
    setFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    isDown.current = false;
    setDragging(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={ref}
        className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-col-resize touch-none select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        role="slider"
        aria-label={`Before and after comparison — ${name}`}
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
          if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
        }}
      >
        <img src={after} alt={afterAlt} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        <img
          src={before}
          alt={beforeAlt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          draggable={false}
        />
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none"
          style={{ left: `${pos}%` }}
        />
        <div
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center pointer-events-none transition-transform duration-200 ${
            dragging ? "scale-110" : "group-hover:scale-105"
          }`}
          style={{ left: `${pos}%` }}
        >
          <ChevronLeft className="h-4 w-4 -mr-0.5 text-[#111111]" />
          <ChevronRight className="h-4 w-4 -ml-0.5 text-[#111111]" />
        </div>
        <span className="absolute bottom-4 left-4 bg-white/90 text-[#111111] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
          Before
        </span>
        <span className="absolute bottom-4 right-4 bg-[#5DBB46] text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
          After
        </span>
      </div>
      <div className="text-center">
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, color: "#111111" }}>
          {name}
        </p>
        <p className="text-xs text-[#777777] uppercase tracking-wider mt-1">{location} · ← Drag →</p>
      </div>
    </div>
  );
}

const pairs = [
  {
    name: "The 10-Day Black & White Kitchen",
    location: "Chehalis, WA",
    before: "/images/ba-before-chehalis.jpg",
    after: "/images/ba-after-chehalis.jpg",
    beforeAlt: "Before: Chehalis kitchen",
    afterAlt: "After: Black and white kitchen",
  },
  {
    name: "The Classic Modern Bath",
    location: "University Place, WA",
    before: "/images/ba-before-bath.jpg",
    after: "/images/ba-after-bath.jpg",
    beforeAlt: "Before: bathroom",
    afterAlt: "After: modern bath",
  },
];

export default function BeforeAfterSection() {
  return (
    <section id="transformations" className="bg-[#F7FAF5] py-24 section-pad">
      <Reveal className="mb-16 text-center">
        <span className="eyebrow">Before &amp; After</span>
        <h2
          style={{
            fontSize: "clamp(34px,3.5vw,52px)",
            color: "#111111",
            marginTop: "1rem",
            textAlign: "center",
          }}
        >
          Real Transformations
        </h2>
        <p
          className="max-w-xl mx-auto mt-4"
          style={{ fontSize: "17px", color: "#777777" }}
        >
          Drag the slider to reveal the transformation. Every project completed in 10 business days.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {pairs.map((pair, i) => (
          <Reveal key={pair.name} delay={i * 110}>
            <SliderPanel
              before={pair.before}
              after={pair.after}
              beforeAlt={pair.beforeAlt}
              afterAlt={pair.afterAlt}
              name={pair.name}
              location={pair.location}
            />
          </Reveal>
        ))}
      </div>

      <Reveal as="blockquote" delay={120} className="text-center max-w-2xl mx-auto mt-16">
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "1.35rem",
            color: "#111111",
            lineHeight: 1.6,
          }}
        >
          &ldquo;Beautiful, functional spaces built around your timeline — completed in 10 business days.&rdquo;
        </p>
      </Reveal>
    </section>
  );
}
