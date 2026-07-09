import type { Metadata } from "next";
import InteriorHero from "@/components/InteriorHero";
import TestimonialsSection from "@/components/TestimonialsSection";
import { HOME_CONSULT_URL, PHONE_CONSULT_URL } from "@/lib/honeybook";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Schedule a free discovery call or in-home consultation with 10 Day Kitchens, kitchen and bathroom remodeling in Lacey, Olympia and the South Sound.",
  alternates: {
    canonical: "https://10daykitchens.com/appointments",
  },
};

const options = [
  {
    name: "Free Discovery Call",
    duration: "15 minutes",
    badge: "Free. No commitment. 15 min",
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
    duration: "45-60 minutes",
    badge: "Free. No commitment. Serving South Sound",
    bestFor: "Homeowners ready to move forward, get a firm quote and professional layout advice.",
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
    a: "Simply contact us to schedule a free in-home consultation. We'll assess your space, discuss your goals, and provide a transparent quote, typically within a few days of your consultation.",
  },
  {
    q: "What is the average cost of a kitchen remodel?",
    a: "Our 10-Day Package ranges from $30,000 for small kitchens up to $80,000+ for large kitchens. Executive Remodels start at $70,000. All pricing is transparent, and you receive a binding quote before any work begins.",
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
      <InteriorHero
        image="/images/Design Review Meeting.png"
        imageAlt="Premium kitchen remodel with large island"
        eyebrow="Book a Consultation"
        title={
          <>
            Start your dream kitchen
            <br />
            the right way.
          </>
        }
        body="Every great remodel starts with an honest conversation, not a bill. Choose the consultation format that fits where you are in the process."
        cta={{ label: "Choose Consultation", href: "#consultation-options" }}
      />

      <section id="consultation-options" className="bg-[#F7FAF5] py-24">
        <div className="site-container grid grid-cols-1 gap-8 md:grid-cols-2">
          {options.map((opt) => (
            <div
              key={opt.name}
              className={`relative flex flex-col rounded-3xl bg-white p-10 ${
                opt.recommended
                  ? "border-2 border-[#5DBB46] shadow-[0_8px_40px_rgba(93,187,70,0.18)]"
                  : "border border-[rgba(17,17,17,0.08)] shadow-[0_2px_40px_rgba(0,0,0,0.05)]"
              }`}
            >
              {opt.recommended ? (
                <span className="absolute -top-3.5 left-10 rounded-full bg-[#5DBB46] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                  Recommended
                </span>
              ) : null}
              <p className="eyebrow mb-3">{opt.duration}</p>
              <h2 className="font-display text-[1.75rem] font-medium text-[#111111]">{opt.name}</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#777777]">{opt.bestFor}</p>
              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {opt.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-[#444444]">
                    <span className="mt-0.5 text-[#5DBB46]">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={opt.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full rounded-full bg-[#5DBB46] py-4 text-center text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[#4aa836]"
              >
                {opt.cta} →
              </a>
              <p className="mt-3 text-center text-xs text-[#aaa]">{opt.badge}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#EEF4EB] py-20">
        <div className="site-container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center font-display text-2xl font-medium text-[#111111]">
              Common Questions
            </h2>
            <div className="flex flex-col">
              {faqs.map((faq) => (
                <div key={faq.q} className="border-b border-[rgba(17,17,17,0.08)] py-6">
                  <p className="mb-2 text-base font-semibold text-[#111111]">{faq.q}</p>
                  <p className="text-sm leading-relaxed text-[#777777]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />
    </main>
  );
}
