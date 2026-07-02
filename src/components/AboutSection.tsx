"use client";

import Image from "next/image";
import { AnimatedNumber } from "@/lib/motion";
import Reveal from "@/components/motion/Reveal";

const trustItems = [
  { num: "35+", label: "Years of experience", count: 35, suffix: "+" },
  { num: "800+", label: "Projects Completed", count: 800, suffix: "+" },
  { num: "10", label: "Business Day Install", count: 10, suffix: "" },
  { num: "5-Year", label: "Warranty", count: 5, suffix: "-Year" },
] as const;

const brands = [
  { label: "Cambria", imgSrc: "/images/CAMBRIA logo.png" },
  { label: "Caesarstone", imgSrc: "/images/CAESARSTONE logo.png" },
  { label: "MSI Surfaces", imgSrc: "/images/MSI logo.png" },
  { label: "KCD Distributors", imgSrc: "/images/kcd.png" },
  { label: "Lectus Cabinetry", imgSrc: "/images/luctus.png" },
  { label: "Merit Cabinetry", imgSrc: "/images/Merit logo.png" },
  { label: "Vicostone", imgSrc: "/images/VICOSTONE logo.png" },
  { label: "Showplace Cabinetry", imgSrc: "/images/showplce logo.jpg" },
  { label: "J-Aaron Wood", imgSrc: "/images/J-Aaron-Logo1.png" },
  { label: "Jeffrey Alexander", imgSrc: "/images/JEFFREY ALEXANDER logo.png" },
];

export default function AboutSection() {
  return (
    <section className="py-20 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT COLUMN — Who We Are Pill & Image */}
          <div className="lg:col-span-5 flex flex-col items-start w-full">
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-[#F7FAF5] text-[#5DBB46] text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5DBB46]" />
                Who We Are
              </div>
            </Reveal>

            <Reveal delay={100} className="w-full">
              <div className="relative overflow-hidden rounded-md aspect-[4/3] lg:aspect-[1/1] w-full">
                <Image
                  src="/images/about-kitchen.png"
                  alt="Warm minimalist kitchen with premium wood cabinets"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-w-7xl) 100vw, 500px"
                />
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN — Copy, Button & Stats */}
          <div className="lg:col-span-7 flex flex-col justify-center w-full lg:pt-4">
            <Reveal delay={150}>
              <p
                className="text-[#111111] leading-relaxed mb-8 font-medium"
                style={{
                  fontFamily: "var(--font-manrope)",
                  fontSize: "clamp(1.15rem, 2vw, 1.35rem)",
                  lineHeight: 1.6,
                  letterSpacing: "-0.01em",
                }}
              >
                We design and build kitchens balancing aesthetics and speed, delivering elegant, functional, and lasting spaces. Our work blends custom design, premium cabinetry, and a revolutionary 10-business-day installation process to create environments that truly elevate everyday living.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-[#5DBB46] hover:bg-[#4aa836] text-white text-[11px] font-bold uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-300 mb-12 shadow-[0_2px_12px_rgba(93,187,70,0.30)]"
              >
                More About Us <span className="ml-2 font-light">↗</span>
              </a>
            </Reveal>

            {/* Stats Block */}
            <Reveal delay={250}>
              <div className="pt-10">
                <ul className="list-none p-0 m-0 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 sm:gap-8">
                  {trustItems.map((item) => (
                    <li key={item.label} className="flex flex-col">
                      <p className="stat-num text-3xl sm:text-4xl font-extrabold text-[#111111] mb-1 tracking-tight">
                        <AnimatedNumber value={item.count} />
                        <span className="text-[#5DBB46] ml-0.5">{item.suffix}</span>
                      </p>
                      <p className="text-[10px] sm:text-[11px] font-medium uppercase leading-tight tracking-[0.05em] text-[#777777]">
                        {item.label}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

        </div>

        {/* Brand logo marquee row */}
        <div className="mt-20 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 pt-10 w-full overflow-hidden">
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#777777] flex-shrink-0 select-none">
            Our Trusted Partners
          </span>
          <div className="relative overflow-hidden flex-1 select-none w-full">
            {/* Soft gradient masks on left and right edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
            
            {/* Sliding Marquee Track */}
            <div className="marquee-track flex items-center gap-16 py-1 min-w-[200%]">
              {[...brands, ...brands].map((b, i) => (
                <div key={i} className="flex-shrink-0 transition-all duration-300">
                  <img
                    src={b.imgSrc}
                    alt={b.label}
                    className="h-8 md:h-9 w-auto object-contain opacity-80 hover:opacity-100 transition-all duration-300"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
