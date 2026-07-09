import type { Metadata } from "next";
import { Plus } from "lucide-react";
import InteriorHero from "@/components/InteriorHero";
import PageCta from "@/components/PageCta";
import { CONTAINER, SECTION } from "@/components/layout";

export const metadata: Metadata = {
  title: "FAQ | Kitchen & Bath Remodeling Questions",
  description:
    "How long does a kitchen remodel take? What does it cost? Answers about our 10-business-day process, pricing ($30k–$80k+), permits, warranty, and more.",
};

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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: categories.flatMap((cat) =>
    cat.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    }))
  ),
};

export default function FaqPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <InteriorHero
        image="/images/Inspection and Punch List.png"
        imageAlt="Bright two-tone kitchen remodel"
        eyebrow="Got Questions?"
        title={
          <>
            Answers, <em>before you remodel.</em>
          </>
        }
        body="The questions every homeowner asks — timelines, pricing, permits, and process. Don't see yours? Ask us directly."
        cta={{ label: "Ask a Question", href: "/contact" }}
      />

      <section className={`${SECTION} bg-cream`}>
        <div className={`${CONTAINER} mx-auto max-w-4xl`}>
          {categories.map((cat) => (
            <div key={cat.name} className="mb-14 last:mb-0">
              <div className="mb-2 flex items-baseline justify-between gap-6 border-b border-line pb-4">
                <h2 className="font-display text-[1.7rem] font-semibold tracking-[-0.01em] text-ink">{cat.name}</h2>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-muted">
                  {cat.faqs.length} questions
                </span>
              </div>
              {cat.faqs.map((faq) => (
                <details key={faq.q} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                    <span className="text-[15.5px] font-semibold text-ink transition-colors group-hover:text-brand-dark">
                      {faq.q}
                    </span>
                    <Plus className="mt-0.5 size-5 flex-none text-brand transition-transform duration-200 group-open:rotate-45" />
                  </summary>
                  <p className="max-w-3xl pb-6 text-[15px] leading-relaxed text-ink-soft/85">{faq.a}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </section>

      <PageCta
        eyebrow="Still have questions?"
        title="Let us walk you through every detail."
        body="Schedule a free consultation and we will help you understand scope, timeline, pricing, and next steps."
        primaryLabel="Contact Us"
        watermark="FAQ"
      />
    </main>
  );
}
