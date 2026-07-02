"use client";

import { MapPin, Phone, Mail, ShieldCheck } from "lucide-react";
import HoneyBookWidget from "@/components/HoneyBookWidget";
import Reveal from "@/components/motion/Reveal";

const contactDetails = [
  {
    icon: MapPin,
    label: "Visit Our Showroom",
    value: "8695 Martin Way E STE 101, Lacey, WA 98516",
    href: "https://maps.google.com/?q=8695+Martin+Way+E+STE+101,+Lacey,+WA+98516",
    external: true,
  },
  {
    icon: Phone,
    label: "Call or Text",
    value: "360-557-3444",
    href: "tel:+13605573444",
    external: false,
  },
  {
    icon: Mail,
    label: "Email",
    value: "office@10daykitchens.com",
    href: "mailto:office@10daykitchens.com",
    external: false,
  },
  {
    icon: ShieldCheck,
    label: "Licensed & Insured",
    value: "LIC #10DAYDK757O5 · Family Owned · 5-Year Warranty",
    href: null,
    external: false,
  },
] as const;

export default function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div className="container section-pad relative z-10">

        {/* Section header — centered */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
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
              design consultation or reach out directly — we&rsquo;re here to
              help every step of the way.
            </p>
          </Reveal>
        </div>

        {/* Two-column: contact info left, form right */}
        <div className="grid grid-cols-1 lg:grid-cols-[38%_62%] gap-12 lg:gap-20 items-start">

          {/* LEFT — clean inline contact info */}
          <div className="flex flex-col gap-8">
            {contactDetails.map((item, i) => {
              const row = (
                <div className="flex items-start gap-4 group">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF4EB] text-[#5DBB46] transition-all duration-300 group-hover:bg-[#5DBB46] group-hover:text-white">
                    <item.icon className="h-4.5 w-4.5" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#5DBB46] mb-1">
                      {item.label}
                    </p>
                    <p
                      className="text-sm font-semibold text-[#111111] group-hover:text-[#5DBB46] transition-colors duration-300 leading-snug"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              );

              return (
                <Reveal key={item.label} delay={i * 70}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="block focus:outline-none"
                      {...(item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {row}
                    </a>
                  ) : (
                    <div>{row}</div>
                  )}
                </Reveal>
              );
            })}

            {/* Trust line */}
            <Reveal delay={320}>
              <p className="text-[11px] text-[#999999] leading-relaxed mt-2">
                ✓ Free Consultation &middot; ✓ No Obligation &middot; ✓ Responds within 48hrs
                <br />
                <span className="italic">
                  Serving Lacey, Olympia, Tacoma, Chehalis &amp; communities throughout Pierce &amp; Thurston Counties.
                </span>
              </p>
            </Reveal>
          </div>

          {/* RIGHT — borderless form area */}
          <Reveal delay={120}>
            <div className="w-full">
              <span className="text-[#5DBB46] text-[10px] font-bold uppercase tracking-wider block mb-2">
                Consultation Request
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-2 tracking-tight">
                Start Your Project
              </h3>
              <p
                className="text-xs sm:text-sm text-[#777777] mb-8 max-w-sm leading-relaxed"
                style={{ fontFamily: "var(--font-manrope)" }}
              >
                Fill out the form below and our local design team will be in
                touch within 48 hours.
              </p>

              {/* HoneyBook widget — loaded via useEffect so it never blocks render */}
              <HoneyBookWidget className="w-full" />
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
