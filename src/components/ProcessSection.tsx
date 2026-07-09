"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

const steps = [
  { num: '01', title: 'Vision & Consultation', desc: 'In-home visit. We listen to your goals and must-haves.' },
  { num: '02', title: '3D Design & Fixed Quote', desc: 'Full rendering and binding contract before anything starts.' },
  { num: '03', title: 'Precision Pre-Staging', desc: 'Every material ordered and inspected before Day 1.' },
  { num: '04', title: 'The 10-Day Build', desc: 'Our crew on site every day. Clean progress, no delays.' },
  { num: '05', title: 'Final Walkthrough', desc: "We don't close until you've approved every detail." },
];

export default function ProcessSection() {
  return (
    <section id="process" className="bg-white border-y border-[rgba(17,17,17,0.08)] py-24 md:py-32 section-pad">
      <div className="container grid gap-16 lg:grid-cols-12 lg:gap-16">
        {/* LEFT — sticky heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start"
        >
          <p className="eyebrow">How We Work</p>
          <h2
            style={{
              fontSize: 'clamp(34px,3.5vw,52px)',
              color: '#111111',
              marginTop: '1rem',
            }}
          >
            Our 5-Step Process
          </h2>
          <p style={{ fontSize: '17px', color: '#777777', maxWidth: '30rem', marginTop: '1.25rem' }}>
            We respect your time and investment. Our structured approach ensures a stress-free transformation — from the first call to the final walkthrough.
          </p>
        </motion.div>

        {/* RIGHT — always-visible numbered steps, hover slide-right */}
        <div className="flex flex-col lg:col-span-7">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.1 }}
              className="group flex items-start gap-6 border-b border-[rgba(93,187,70,0.2)] py-8 transition-transform duration-300 ease-out hover:translate-x-2 md:gap-8 md:py-9"
            >
              <span
                className="stat-num mt-0.5 shrink-0 transition-colors duration-300 group-hover:text-[#4aa836]"
                style={{ fontSize: '2rem', color: 'rgba(93,187,70,0.5)' }}
              >
                {step.num}
              </span>
              <div className="flex-1">
                <h3 className="text-base font-bold uppercase tracking-[0.06em] text-[#111111] mb-2.5 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-[#777777] leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
