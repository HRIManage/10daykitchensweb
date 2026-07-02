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
  const [hovering, setHovering] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerMove = (e: React.PointerEvent) => {
    setFromClientX(e.clientX);
  };

  const onPointerEnter = () => {
    setHovering(true);
  };

  const onPointerLeave = () => {
    setHovering(false);
  };

  return (
    <div className="flex flex-col gap-4 group">
      <div
        ref={ref}
        className="relative rounded-md overflow-hidden aspect-[4/3] cursor-col-resize touch-none select-none"
        onPointerMove={onPointerMove}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
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
            hovering ? "scale-110" : "group-hover:scale-105"
          }`}
          style={{ left: `${pos}%` }}
        >
          <ChevronLeft className="h-4 w-4 -mr-0.5 text-[#111111]" />
          <ChevronRight className="h-4 w-4 -ml-0.5 text-[#111111]" />
        </div>
        <span className="absolute bottom-4 left-4 bg-white/95 text-[#111111] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
          Before
        </span>
        <span className="absolute bottom-4 right-4 bg-[#5DBB46] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
          After
        </span>
      </div>
      <div className="pt-2 px-1">
        <p className="font-semibold text-lg text-[#111111] group-hover:text-[#5DBB46] transition-colors duration-300">
          {name}
        </p>
        <p className="text-xs text-[#777777] uppercase tracking-wider mt-1.5">{location} · ← Move Mouse to Reveal →</p>
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
    <section id="transformations" className="bg-gradient-to-b from-white via-[#F4F9F2] to-white py-24 md:py-32 section-pad">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white/70 backdrop-blur-md rounded-xl border border-white p-8 md:p-12 shadow-[0_10px_40px_rgba(93,187,70,0.03)]">
          <Reveal className="mb-16 text-center">
            <span className="inline-flex items-center gap-1.5 eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5DBB46]"></span>
              Before &amp; After
            </span>
            <h2
              style={{
                fontSize: "clamp(34px,3.5vw,52px)",
                color: "#111111",
                marginTop: "1rem",
                textAlign: "center",
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              Real Transformations
            </h2>
            <p style={{ fontSize: '17px', color: '#777777', marginTop: '1rem', textAlign: 'center' }}>
              See what we accomplish in as little as 10 business days.
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {pairs.map((p) => (
              <SliderPanel key={p.name} {...p} />
            ))}
          </div>
        </div>
      </div>

      <Reveal as="blockquote" delay={100} className="text-center max-w-2xl mx-auto mt-20">
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
