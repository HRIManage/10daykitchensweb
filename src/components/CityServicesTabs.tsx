"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Bath, Check, Clock3, CookingPot, ShowerHead, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Kitchen Remodeling",
    icon: CookingPot,
    description:
      "Custom kitchen remodeling for homeowners who want a full redesign, layout changes, premium cabinetry, counters, flooring, and finish selections.",
    price: "Custom quote",
    timeline: "Planned by scope",
    href: "/kitchen-remodel",
    image: "/images/Completed Modern Kitchen.png",
    features: ["Custom kitchen design", "Cabinetry & countertops", "Layout changes", "Premium finishes"],
  },
  {
    title: "10 Day Kitchen Program",
    icon: Clock3,
    description:
      "A faster kitchen remodel for qualified homes that keep the existing footprint, use approved selections, and are planned completely before day one.",
    price: "$30k+ ranges",
    timeline: "10 business days",
    href: "/10businessdaykitchenprogram",
    image: "/images/welcome-kitchen-subway-tile.jpg",
    features: ["Same footprint", "Approved materials", "Less disruption", "5-year warranty"],
  },
  {
    title: "Bathroom Remodeling",
    icon: Bath,
    description:
      "Full bathroom remodels designed around comfort, storage, better fixtures, durable surfaces, and a calmer daily routine.",
    price: "Custom quote",
    timeline: "Planned by scope",
    href: "/bathroom-remodel",
    image: "/images/white-oak-spa-bathroom-service.png",
    features: ["Full bath remodel", "Vanity & storage", "Tile & surfaces", "Fixtures & lighting"],
  },
  {
    title: "Fast Bath",
    icon: ShowerHead,
    description:
      "A simpler bathroom upgrade for homeowners who want a cleaner shower, tub, vanity, or fixture refresh without a full bathroom renovation.",
    price: "Focused scope",
    timeline: "Faster upgrade",
    href: "/fast-bath",
    image: "/images/fast-bath-simple-service.png",
    features: ["Simple bath upgrade", "Tub-to-shower", "Fixture refresh", "Lower disruption"],
  },
] as const;

export default function CityServicesTabs({ cityName }: { cityName: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = services[activeIndex];
  const Icon = active.icon;

  return (
    <div className="w-full text-ink">
      <div>
        <div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-2 block text-[0.82rem] font-bold text-brand-dark">Services we offer</p>
              <h2 className="max-w-2xl text-[clamp(1.85rem,3.1vw,3rem)] leading-[1.08]">
                Choose the right remodel path in {cityName}.
              </h2>
            </div>
            <p className="max-w-xs text-[13px] font-semibold leading-6 text-ink-soft">
              Four ways to improve the rooms you use every day, all planned through one local team.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const TabIcon = service.icon;
              const isActive = index === activeIndex;

              return (
                <button
                  key={service.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "group flex h-[48px] items-center justify-center gap-2 border px-3 text-[11.5px] font-bold transition-all duration-300",
                    isActive
                      ? "border-white bg-white text-ink shadow-[0_14px_34px_rgba(43,39,35,0.08)]"
                      : "border-line bg-[#fbfbfa] text-ink-soft hover:-translate-y-0.5 hover:border-brand/40 hover:text-ink"
                  )}
                  aria-pressed={isActive}
                >
                  <TabIcon className={cn("size-4 transition-colors", isActive ? "text-brand" : "text-ink/28 group-hover:text-brand")} />
                  <span className="truncate">{service.title}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 grid overflow-hidden border border-line bg-white shadow-[0_14px_50px_rgba(43,39,35,0.08)] lg:grid-cols-[0.98fr_1.02fr]">
            <div className="flex min-h-[310px] flex-col justify-between p-5 sm:p-6 lg:p-7">
              <div>
                <div className="mb-5 flex size-10 items-center justify-center bg-brand/10 text-brand-dark">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-[clamp(1.65rem,2.4vw,2.35rem)] leading-[1.05]">{active.title}</h3>
                <p className="mt-4 max-w-xl text-[0.94rem] leading-7 text-ink-soft">{active.description}</p>
              </div>

              <div className="mt-6">
                <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                  <div className="bg-white p-3.5">
                    <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                      <Wallet className="size-4 text-brand" />
                      Investment
                    </div>
                    <p className="text-sm font-bold text-ink">{active.price}</p>
                  </div>
                  <div className="bg-white p-3.5">
                    <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                      <Clock3 className="size-4 text-brand" />
                      Timeline
                    </div>
                    <p className="text-sm font-bold text-ink">{active.timeline}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {active.features.map((feature) => (
                    <span key={feature} className="inline-flex items-center gap-1.5 bg-paper px-2.5 py-1.5 text-[11.5px] font-semibold text-ink-soft">
                      <Check className="size-3.5 text-brand" />
                      {feature}
                    </span>
                  ))}
                </div>

                <Link
                  href={active.href}
                  className="mt-5 inline-flex h-[44px] items-center justify-center gap-3 bg-brand px-5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-brand-dark hover:shadow-[0_14px_28px_rgba(93,187,70,0.24)]"
                >
                  Explore service
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="relative min-h-[260px] overflow-hidden lg:min-h-[380px]">
              <Image
                key={active.image}
                src={active.image}
                alt={`${active.title} service for ${cityName} homeowners`}
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
