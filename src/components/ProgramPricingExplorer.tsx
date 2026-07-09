"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const packageTiers = [
  {
    name: "Small Kitchen",
    price: "$45,000 - $55,000+",
    detail: "Compact layouts and galley kitchens that keep the same footprint.",
    image: "/images/pricing-small-kitchen.png",
    alt: "Small 10 day kitchen remodel example with bright premium finishes",
  },
  {
    name: "Medium Kitchen",
    price: "$55,000 - $70,000+",
    detail: "Standard family kitchens with approved cabinets, counters, flooring, and finishes.",
    image: "/images/pricing-medium-kitchen.png",
    alt: "Medium kitchen remodel with modern cabinetry, counters, and open workflow",
  },
  {
    name: "Large Kitchen",
    price: "$70,000 - $85,000+",
    detail: "Larger same-layout kitchens with more cabinetry, surface area, and finish scope.",
    image: "/images/pricing-large-kitchen.png",
    alt: "Large kitchen remodel with island, premium cabinetry, and bright natural light",
  },
] as const;

export default function ProgramPricingExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTier = packageTiers[activeIndex];

  return (
    <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
      <div className="bg-white p-7 shadow-[0_18px_70px_rgba(43,39,35,0.08)] sm:p-10">
        <span className="eyebrow mb-4 block text-[0.82rem] font-bold">Package pricing</span>
        <h2 className="text-[clamp(2rem,3.4vw,3.4rem)] leading-[1.06]">
          Clear starting ranges for qualified kitchens.
        </h2>
        <p className="mt-5 text-base leading-8 text-ink-soft">
          Hover each package to see the type of kitchen that typically fits the range. Final pricing depends on
          measurements, selections, site conditions, and scope.
        </p>

        <div className="mt-8 grid gap-3">
          {packageTiers.map((tier, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={tier.name}
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`group w-full border p-5 text-left transition-all duration-300 ${
                  isActive
                    ? "border-brand bg-brand/5 shadow-[0_18px_46px_rgba(43,39,35,0.08)]"
                    : "border-line bg-white hover:-translate-y-0.5 hover:border-brand/45"
                }`}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className={`text-[1.55rem] leading-tight transition-colors ${isActive ? "text-brand-dark" : "text-ink group-hover:text-brand-dark"}`}>
                    {tier.name}
                  </h3>
                  <p className="font-serif-alt text-[1.8rem] leading-none text-brand-dark">{tier.price}</p>
                </div>
                <div className="mt-3 flex items-start justify-between gap-5">
                  <p className="max-w-lg text-sm leading-7 text-ink-soft">{tier.detail}</p>
                  <ArrowRight className={`mt-1 size-4 flex-none transition-all duration-300 ${isActive ? "translate-x-1 text-brand" : "text-ink/25 group-hover:translate-x-1 group-hover:text-brand"}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative min-h-[420px] overflow-hidden border border-line bg-white shadow-[0_24px_70px_rgba(43,39,35,0.10)]">
        {packageTiers.map((tier, index) => (
          <Image
            key={tier.image}
            src={tier.image}
            alt={tier.alt}
            fill
            sizes="(min-width: 1024px) 56vw, 100vw"
            className={`object-cover transition-all duration-700 ease-out ${
              index === activeIndex ? "scale-100 opacity-100" : "scale-[1.035] opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/58 to-transparent p-6 text-white sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-light">Currently viewing</p>
          <p className="mt-2 font-serif-alt text-[clamp(2rem,3vw,3.25rem)] leading-none">{activeTier.name}</p>
          <p className="mt-2 text-sm font-semibold text-white/82">{activeTier.price}</p>
        </div>
      </div>
    </div>
  );
}
