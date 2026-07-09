import { Award, Home, ShieldCheck, BadgeCheck } from "lucide-react";
import { MaskLine, CountUp } from "@/lib/motion";
import Reveal from "@/components/motion/Reveal";

const trustItems = [
  { icon: Award, num: "35+", label: "Years Experience", count: 35, suffix: "+" },
  { icon: Home, num: "Family", label: "Owned & Operated", count: null, suffix: "" },
  { icon: ShieldCheck, num: "5-Year", label: "Warranty", count: 5, suffix: "-Year" },
  { icon: BadgeCheck, num: "Licensed", label: "& Bonded", count: null, suffix: "" },
] as const;

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F7FAF5]">
      {/* Soft brand glows — depth behind the hero content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 h-[34rem] w-[34rem] rounded-full bg-[#5DBB46]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[#5DBB46]/[0.06] blur-3xl"
      />

      <div className="relative z-10 section-pad pt-36 pb-16 md:pt-44 md:pb-20 max-w-screen-xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — copy */}
          <div>
            <Reveal className="mb-6">
              <span className="guarantee-badge">
                <span className="dot" aria-hidden="true" />
                <span className="label">
                  Completed in <strong>10 business days</strong> — guaranteed
                </span>
              </span>
            </Reveal>

            <Reveal as="span" className="eyebrow text-[#5DBB46] mb-5 block">
              Local Kitchen &amp; Bath Remodeling · Pierce &amp; Thurston Counties
            </Reveal>

            <h1 className="display-xl" style={{ color: "#111111", marginBottom: "1.5rem" }}>
              <MaskLine delay={0.1}>Your Dream</MaskLine>
              <MaskLine delay={0.2}>Kitchen &amp; Bath</MaskLine>
              <MaskLine delay={0.3}>
                <span style={{ color: "#5DBB46" }}>Done in 10 Days.</span>
              </MaskLine>
            </h1>

            <Reveal
              as="p"
              delay={180}
              className="text-[#444444] text-lg leading-relaxed max-w-lg mb-10"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              We help homeowners create beautiful, functional kitchens and baths with high-quality
              craftsmanship — completed in just 10 business days.
            </Reveal>

            <Reveal delay={270}>
              <a
                href="#contact"
                className="btn btn-solid"
                style={{ boxShadow: "0 4px 24px rgba(93,187,70,0.35)" }}
              >
                Schedule Free Consultation
              </a>
            </Reveal>
          </div>

          {/* RIGHT — hero photo in a rounded frame */}
          <Reveal delay={150} className="relative">
            <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/hero-bg.jpg"
                alt="A beautifully remodeled modern kitchen by 10 Day Kitchens"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Trust bar */}
      <div className="relative z-10 border-t border-[rgba(17,17,17,0.08)] bg-white">
        <Reveal
          delay={360}
          className="max-w-screen-xl mx-auto section-pad py-8 grid grid-cols-2 md:grid-cols-4 gap-y-8 md:divide-x md:divide-[rgba(17,17,17,0.08)]"
        >
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3 md:px-6 first:md:pl-0">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#EEF4EB] text-[#5DBB46]">
                <item.icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <div>
                <p className="stat-num text-[#111111]" style={{ fontSize: "1.3rem" }}>
                  {item.count !== null ? <CountUp value={item.count} suffix={item.suffix} /> : item.num}
                </p>
                <p className="text-[#777777] text-[11px] uppercase tracking-[0.12em] mt-0.5">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
