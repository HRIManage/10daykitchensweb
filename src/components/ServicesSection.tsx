"use client";

import Reveal from "@/components/motion/Reveal";

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-16 mb-12">
        <Reveal>
          <span className="inline-flex items-center gap-1.5 eyebrow">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5DBB46]"></span>
            What We Do
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2
            style={{
              fontSize: "clamp(34px,3.5vw,54px)",
              color: "#111111",
              marginTop: "1rem",
            }}
          >
            Kitchen &amp; Bath Remodeling Done Right
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto max-w-screen-xl px-6 sm:px-10 lg:px-16 flex flex-col">
        {/* Kitchen Remodel Flat Section */}
        <Reveal className="flex flex-col md:flex-row gap-8 md:gap-16 py-12 md:py-16 border-b border-[rgba(17,17,17,0.08)] group">
          <div className="md:w-[48%] flex-none relative overflow-hidden h-64 md:h-96 rounded-md">
            <img
              src="/images/kitchen-ethos-walnut.jpg"
              alt="Custom kitchen remodel walnut cabinets"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center py-4">
            <span className="inline-flex items-center gap-1.5 bg-[#EEF4EB] text-[#5DBB46] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-6 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5DBB46]"></span>
              Kitchen Remodel
            </span>
            <h3
              style={{
                fontSize: "32px",
                color: "#111111",
                marginBottom: "1rem",
              }}
            >
              Kitchen Remodel
            </h3>
            <p className="text-[#777777] text-base leading-relaxed max-w-md mb-8">
              Transform your kitchen with our expert design-build process — from
              consultation to completion in as little as 10 business days. Custom
              and stock cabinets, countertops, backsplash, and more.
            </p>
            <a href="#contact" className="link-arrow w-fit">
              Explore Kitchen Remodels <span className="arrow">→</span>
            </a>
          </div>
        </Reveal>

        {/* Bath Remodel Flat Section */}
        <Reveal delay={100} className="flex flex-col md:flex-row-reverse gap-8 md:gap-16 py-12 md:py-16 group">
          <div className="md:w-[48%] flex-none relative overflow-hidden h-64 md:h-96 rounded-md">
            <img
              src="/images/bath-remodel.png"
              alt="Modern bathroom remodel"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center py-4 text-left md:pl-16">
            <span className="inline-flex items-center gap-1.5 bg-[#EEF4EB] text-[#5DBB46] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-6 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5DBB46]"></span>
              Bath Remodel
            </span>
            <h3
              style={{
                fontSize: "32px",
                color: "#111111",
                marginBottom: "1rem",
              }}
            >
              Bath Remodel
            </h3>
            <p className="text-[#777777] text-base leading-relaxed max-w-md mb-8">
              Elevate your bathroom with high-quality materials and a streamlined
              remodel process designed for speed and precision. Vanities, tile,
              fixtures, and full installation.
            </p>
            <a href="#contact" className="link-arrow w-fit">
              Explore Bath Remodels <span className="arrow">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
