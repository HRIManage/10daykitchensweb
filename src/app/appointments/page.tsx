import type { Metadata } from "next";
import TestimonialsSection from "@/components/TestimonialsSection";
import { HOME_CONSULT_URL, PHONE_CONSULT_URL } from "@/lib/honeybook";

export const metadata: Metadata = {
  title: "Book a Consultation | 10 Day Kitchens",
  description:
    "Schedule a free discovery call or in-home consultation with 10 Day Kitchens — kitchen and bathroom remodeling in Lacey, Olympia and the South Sound.",
};

const options = [
  {
    name: "Free Discovery Call",
    duration: "15 minutes",
    badge: "Free · No commitment · 15 min",
    bestFor: "Quick questions about our 10-Day process, rough pricing, or checking our availability.",
    features: [
      "Phone call with our design team",
      "Ballpark pricing for your project",
      "Overview of the 10-Day process",
      "No home visit needed",
    ],
    cta: "Book a Discovery Call",
    href: PHONE_CONSULT_URL,
    recommended: false,
  },
  {
    name: "Free In-Home Consultation",
    duration: "45–60 minutes",
    badge: "Free · No commitment · Serving South Sound",
    bestFor: "Homeowners ready to move forward — get a firm quote and professional layout advice.",
    features: [
      "In-home measurements",
      "Firm, binding quote",
      "Material recommendations",
      "Custom layout advice",
    ],
    cta: "Book In-Home Consultation",
    href: HOME_CONSULT_URL,
    recommended: true,
  },
];

const faqs = [
  {
    q: "How do I get started with a kitchen or bathroom remodel?",
    a: "Simply contact us to schedule a free in-home consultation. We'll assess your space, discuss your goals, and provide a transparent quote — typically within a few days of your consultation.",
  },
  {
    q: "What is the average cost of a kitchen remodel?",
    a: "Our 10-Day Package ranges from $30,000 for small kitchens up to $80,000+ for large kitchens. Executive Remodels start at $70,000. All pricing is transparent — you receive a binding quote before any work begins.",
  },
  {
    q: "Do you provide a warranty on your remodeling work?",
    a: "Yes. Every project comes with a 5-year warranty on our workmanship. Material warranties from manufacturers are passed through to you as well.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. 10 Day Kitchens is fully licensed (LIC #10DAYDK757O5) and insured in the state of Washington. We carry general liability and workers' compensation insurance on every project.",
  },
];

export default function AppointmentsPage() {
  return (
    <main>
      <section className="bg-[#1C1C1C] pt-[90px] py-24 px-16">
        <span className="eyebrow text-[#5DBB46]/70 mb-4 block">Book a Consultation</span>
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(40px,5vw,72px)",
            color: "white",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          Start Your Dream Kitchen
          <br />
          the Right Way
        </h1>
        <p className="text-white/60 max-w-xl mt-6 leading-relaxed">
          Every great remodel starts with an honest conversation — not a bill. Choose the
          consultation format that fits where you are in the process and we&rsquo;ll take it from there.
        </p>
      </section>

      <section className="bg-[#F7FAF5] py-24 px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {options.map((opt) => (
            <div
              key={opt.name}
              className={`relative bg-white rounded-3xl p-10 flex flex-col ${
                opt.recommended
                  ? "border-2 border-[#5DBB46] shadow-[0_8px_40px_rgba(93,187,70,0.18)]"
                  : "border border-[rgba(17,17,17,0.08)] shadow-[0_2px_40px_rgba(0,0,0,0.05)]"
              }`}
            >
              {opt.recommended && (
                <span className="absolute -top-3.5 left-10 bg-[#5DBB46] text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
                  Recommended
                </span>
              )}
              <p className="eyebrow mb-3">{opt.duration}</p>
              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.75rem",
                  color: "#111111",
                  fontWeight: 500,
                }}
              >
                {opt.name}
              </h2>
              <p className="text-[#777777] text-sm mt-4 leading-relaxed">{opt.bestFor}</p>
              <ul className="mt-6 flex flex-col gap-2.5 flex-1">
                {opt.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[#444444]">
                    <span className="text-[#5DBB46] mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={opt.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full text-center bg-[#5DBB46] text-white rounded-full py-4 text-sm font-bold uppercase tracking-wider hover:bg-[#4aa836] transition-all"
              >
                {opt.cta} &rarr;
              </a>
              <p className="text-center text-xs text-[#aaa] mt-3">{opt.badge}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#EEF4EB] py-20 px-16">
        <div className="max-w-3xl mx-auto">
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.5rem",
              color: "#111111",
              fontWeight: 500,
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            Common Questions
          </h2>
          <div className="flex flex-col">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-[rgba(17,17,17,0.08)] py-6">
                <p className="font-semibold text-[#111111] text-base mb-2">{faq.q}</p>
                <p className="text-[#777777] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
    </main>
  );
}
