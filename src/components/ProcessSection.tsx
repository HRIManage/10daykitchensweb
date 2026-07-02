"use client";

// import { motion } from "framer-motion"; // removed
import Reveal from "@/components/motion/Reveal";

const steps = [
  {
    num: "01",
    title: "Vision & Consultation",
    desc: "We begin with a detailed, in-home consultation. Our design specialists listen to your daily routines, aesthetic tastes, and layout challenges. We take precision measurements and discuss the full potential of your space.",
    deliverables: [
      "In-home layout measurement",
      "Style & design direction alignment",
      "Scope of work & budget definition",
    ],
  },
  {
    num: "02",
    title: "3D Design & Fixed Quote",
    desc: "Our design team creates high-fidelity 3D photographic renderings of your new space. You will see exactly how your cabinets, countertops, lighting, and layout look. We present a fixed-price contract—no hidden fees, no changes.",
    deliverables: [
      "Photorealistic 3D virtual model",
      "Itemized premium material selection",
      "Guaranteed binding fixed-price quote",
    ],
  },
  {
    num: "03",
    title: "Precision Pre-Staging",
    desc: "Before a single hammer swings, we order, inspect, and store every item for your project in our warehouse—from custom cabinets to matching grout. This guarantees Day 1 starts with zero supply chain delays.",
    deliverables: [
      "100% materials pre-ordered & verified",
      "Permits and building approvals secured",
      "Dedicated installation dates locked",
    ],
  },
  {
    num: "04",
    title: "The Guaranteed 10-Day Build",
    desc: "Our crew arrives on Day 1 with all materials and a detailed schedule. We work consecutive business days. Our project supervisor oversees every trade (demo, plumbing, electrical, tile) for zero down-time.",
    deliverables: [
      "Consecutive daily progress",
      "Daily dust barrier & site cleaning",
      "Dedicated lead supervisor on site",
    ],
  },
  {
    num: "05",
    title: "Final Walkthrough & Warranty",
    desc: "We perform a thorough walkthrough with you to inspect every corner, cabinet alignment, and finish. Once you approve, we sign off and register your 5-year warranty. Your dream kitchen or bath is ready to enjoy.",
    deliverables: [
      "Detailed multi-point quality checklist",
      "Care, cleaning & maintenance guide",
      "5-Year brand warranty registration",
    ],
  },
] as const;

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 md:py-32 section-pad">
      <div className="container grid gap-16 lg:grid-cols-12 lg:gap-16 items-start">
        
        {/* LEFT — sticky heading & description */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5DBB46]"></span>
              How We Work
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2
              style={{
                fontSize: 'clamp(34px,3.5vw,52px)',
                color: '#111111',
                marginTop: '1rem',
              }}
            >
              Our 5-Step Process
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p style={{ fontSize: '17px', color: '#777777', maxWidth: '30rem', marginTop: '1.25rem', lineHeight: 1.6 }}>
              We respect your time and investment. Our structured, 3D scroll-revealed approach ensures a transparent, stress-free transformation — from the first call to the final walkthrough.
            </p>
          </Reveal>
        </div>

        {/* RIGHT — Vertical Scroll Reveal Timeline */}
        <div className="lg:col-span-7 w-full relative pl-4 sm:pl-8">
          
          <div className="flex flex-col gap-20 w-full">
            {steps.map((step, i) => (
              <div key={step.num} className="flex gap-6 sm:gap-8 items-start relative z-10 w-full">
                
                {/* Timeline node */}
                <div className="flex-shrink-0">
                  <span className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#EEF4EB] border-2 border-[#5DBB46] font-bold text-xs sm:text-sm text-[#5DBB46] shadow-sm">
                    {step.num}
                  </span>
                </div>
                
                {/* Step Content Card with 3D Tilt Scroll Reveal */}
                <Reveal delay={i * 80} className="flex-1 w-full">
                  <div className="relative overflow-hidden w-full">
                    
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] mb-4 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-[#777777] text-xs sm:text-sm leading-relaxed mb-6">
                      {step.desc}
                    </p>
                    
                    <div className="border-t border-[rgba(17,17,17,0.06)] pt-5 mt-4">
                      <h4 className="text-[9px] font-bold uppercase tracking-widest text-[#111111] mb-3">
                        Deliverables & Milestones:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4">
                        {step.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-[11px] text-[#444444] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#5DBB46] shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
