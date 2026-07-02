"use client";

import HoneyBookWidget from "@/components/HoneyBookWidget";
import Reveal from "@/components/motion/Reveal";

export default function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div className="container section-pad relative z-10">

        {/* Section header — centered */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5DBB46]" />
              Get In Touch
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="text-[#111111] mt-4 mb-5 tracking-tight font-extrabold leading-tight"
              style={{ fontSize: "clamp(34px,3.4vw,52px)" }}
            >
              Let&rsquo;s talk about your project.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-[#777777] text-base leading-relaxed">
              Ready to transform your home? Schedule a complimentary in-home
              design consultation — we&rsquo;re here to help every step of the way.
            </p>
          </Reveal>
        </div>

        {/* Centered form */}
        <Reveal delay={180}>
          <div className="max-w-2xl mx-auto">
            <HoneyBookWidget className="w-full" />
            <p className="text-center text-[11px] text-[#aaaaaa] mt-6 leading-relaxed">
              ✓ Free Consultation &middot; ✓ No Obligation &middot; ✓ Responds within 48hrs
              <br />
              <span className="italic">
                Serving Lacey, Olympia, Tacoma, Chehalis &amp; communities throughout Pierce &amp; Thurston Counties.
              </span>
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
