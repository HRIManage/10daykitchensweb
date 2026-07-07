"use client";

import { useState } from "react";

const categories = [
  {
    name: "Kitchen Remodeling",
    faqs: [
      {
        q: "How long does a kitchen remodel take?",
        a: "Our signature 10-Day Package is completed in just 10 business days from start to finish. For Executive Remodel projects that involve structural changes or extensive custom work, timelines vary and are communicated upfront in your contract.",
      },
      {
        q: "Why is the 10-Day Package limited to 10 business days?",
        a: "We pre-order and stage all materials before Day 1 — there are no delays waiting for deliveries. Our dedicated crew works on your project daily, and our streamlined process eliminates the downtime that plagues traditional remodeling.",
      },
      {
        q: "Can I stay in my home during a renovation?",
        a: "Yes, most homeowners stay in their homes during the remodel. We work efficiently to minimize disruption to your daily life. The kitchen will be unavailable during the 10 days, but we set up clean and safe working conditions throughout.",
      },
      {
        q: "Do I need a permit for my kitchen remodel?",
        a: "It depends on the scope of work. Standard cabinet and countertop replacements typically do not require permits. Structural changes, moving plumbing, or adding electrical circuits may require permits. We handle this assessment during your consultation.",
      },
      {
        q: "What countertop materials do you recommend?",
        a: "We specialize in quartz countertops, which offer the beauty of natural stone with superior durability and low maintenance. We can also source granite, marble, and other materials based on your preferences and budget.",
      },
    ],
  },
  {
    name: "Bath Remodeling",
    faqs: [
      {
        q: "How long does a bathroom remodel take?",
        a: "Most bathroom remodels are completed in approximately 10 business days as part of our standard package. Complex projects involving layout changes may take longer, which we communicate clearly upfront.",
      },
      {
        q: "What is the best flooring for a high-moisture bathroom?",
        a: "Porcelain tile is our top recommendation for bathroom floors — it's water-resistant, durable, and available in countless styles. Luxury vinyl plank (LVP) is another excellent option that provides warmth and is fully waterproof.",
      },
      {
        q: "Can you convert my bathtub into a walk-in shower?",
        a: "Absolutely. Tub-to-shower conversions are one of our most popular bath upgrades. We handle all plumbing adjustments, waterproofing, tile work, and fixture installation as part of the project.",
      },
      {
        q: "How do I make a small bathroom feel bigger?",
        a: "Large-format tiles with minimal grout lines, frameless glass shower enclosures, floating vanities, and strategic lighting all create a sense of spaciousness. We incorporate these principles into every small bathroom design.",
      },
    ],
  },
  {
    name: "Investment & Pricing",
    faqs: [
      {
        q: "What is the average cost of a kitchen remodel?",
        a: "Our 10-Day Package ranges from $30,000 for small kitchens up to $80,000+ for large kitchens. Executive Remodels start at $70,000. All pricing is transparent — you receive a binding quote before any work begins.",
      },
      {
        q: "Do you provide a warranty on your remodeling work?",
        a: "Yes. Every project comes with a 5-year warranty on our workmanship. Material warranties from manufacturers are passed through to you as well.",
      },
      {
        q: "How do I get started with a kitchen or bathroom remodel?",
        a: "Simply contact us to schedule a free in-home consultation. We'll assess your space, discuss your goals, and provide a transparent quote — typically within a few days of your consultation.",
      },
      {
        q: "What makes 10 Day Kitchens different from other contractors?",
        a: "Three things: speed, transparency, and quality. We complete most remodels in 10 business days with no hidden costs. Every client receives a 3D design rendering and a binding contract before work begins. Our crew is dedicated — we don't split attention across multiple job sites.",
      },
    ],
  },
  {
    name: "Process & Trust",
    faqs: [
      {
        q: "Does 10 Day Kitchens handle both design and installation?",
        a: "Yes, we are a full design-build firm. From the initial consultation and 3D design through material selection and final installation, one team manages your entire project. No hand-offs, no miscommunication.",
      },
      {
        q: "What happens if something goes wrong during the remodel?",
        a: "We address issues immediately and transparently. Our project managers are on-site daily and communicate proactively. Our 5-year workmanship warranty backs up every installation we complete.",
      },
      {
        q: "Are you licensed and insured?",
        a: "Yes. 10 Day Kitchens is fully licensed (LIC #10DAYDK757O5) and insured in the state of Washington. We carry general liability and workers' compensation insurance on every project.",
      },
    ],
  },
];

export default function FaqPage() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <main>
      <section className="bg-[#1C1C1C] pt-[90px] py-24 px-16">
        <span className="eyebrow text-[#5DBB46]/70 mb-4 block">Got Questions?</span>
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "72px",
            color: "white",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          Frequently Asked<br />Questions
        </h1>
        <p className="text-white/60 max-w-xl mt-6">
          Get answers to all your questions. Don&rsquo;t see yours? Contact us today.
        </p>
        <a
          href="/contact"
          className="mt-8 inline-block bg-[#5DBB46] text-white rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-[#4aa836] transition-all"
        >
          Ask a Question
        </a>
      </section>

      <section className="bg-[#F7FAF5] py-24 px-16">
        <div className="max-w-4xl mx-auto">
          {categories.map((cat, catIdx) => (
            <div key={cat.name} className="mb-12">
              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.5rem",
                  color: "#111111",
                  fontWeight: 500,
                  marginBottom: "1rem",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px solid rgba(17,17,17,0.1)",
                }}
              >
                {cat.name}
              </h2>
              <div className="flex flex-col">
                {cat.faqs.map((faq, i) => {
                  const key = `${catIdx}-${i}`;
                  const isOpen = openKey === key;
                  return (
                    <div key={key} className="border-b border-[rgba(17,17,17,0.08)]">
                      <button
                        onClick={() => setOpenKey(isOpen ? null : key)}
                        className="w-full text-left py-5 flex justify-between items-start gap-4"
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-manrope)",
                            fontSize: "1rem",
                            fontWeight: 600,
                            color: "#111111",
                          }}
                        >
                          {faq.q}
                        </span>
                        <span
                          className={`text-[#5DBB46] text-xl flex-none transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                        >
                          +
                        </span>
                      </button>
                      {isOpen && (
                        <p className="text-[#777777] text-sm leading-relaxed pb-5">{faq.a}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#5DBB46] py-16 px-16 text-center">
        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "36px",
            color: "white",
            fontWeight: 500,
          }}
        >
          Still Have Questions?
        </h2>
        <p className="text-white/80 text-lg mt-4">
          Our team is here to help. Schedule a free consultation and we&rsquo;ll walk you through every detail.
        </p>
        <a
          href="/contact"
          className="mt-8 inline-block bg-white text-[#111111] rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-[#EEF4EB] transition-all"
        >
          Contact Us
        </a>
      </section>
    </main>
  );
}
