import type { Metadata } from "next";
import { Phone } from "lucide-react";
import InteriorHero from "@/components/InteriorHero";
import PageCta from "@/components/PageCta";
import { CONTAINER, SECTION } from "@/components/layout";
import { FadeIn, SectionHeader } from "@/components/shared";

export const metadata: Metadata = {
  title: "Remodel Financing Options | Lacey, WA",
  description:
    "Flexible ways to finance your kitchen or bath remodel — HELOC, cash-out refinance, renovation loans, and our preferred lender GreenSky. Free consultation in Lacey, WA.",
};

const options = [
  {
    title: "Home Equity Line of Credit",
    desc: "Borrow against your home's equity with a flexible line of credit — draw funds as needed and pay interest only on what you use.",
  },
  {
    title: "Cash-Out Refinance",
    desc: "Refinance for more than you owe and take the difference in cash. Strong option if you have significant equity and a favorable rate.",
  },
  {
    title: "Renovation Loan",
    desc: "Built for home improvement: funds are based on your home's value after the remodel, so you don't need substantial existing equity.",
  },
  {
    title: "Alternative Options",
    desc: "Personal loans, promotional 0% APR cards for smaller updates, or other paths — we'll point you to a qualified advisor.",
  },
];

export default function FinancingPage() {
  return (
    <main>
      <InteriorHero
        image="/images/Design Review Meeting.png"
        imageAlt="Remodeled kitchen with butcher block island"
        eyebrow="Financing · Make It Happen"
        title={
          <>
            Your remodel,
            <br />
            <em>more affordable than you think.</em>
          </>
        }
        body="The right financing turns a significant investment into a manageable one. We'll walk you through every option."
        cta={{ label: "Schedule Free Consultation", href: "/contact" }}
      />

      {/* Preferred lender band */}
      <section className="border-b border-line bg-paper">
        <div className={`${CONTAINER} flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center`}>
          <div>
            <p className="mb-2 text-[11.5px] font-bold uppercase tracking-[0.24em] text-brand">Preferred Lender</p>
            <h2 className="font-display text-[2rem] font-semibold leading-none text-ink">GreenSky</h2>
            <p className="mt-2 text-sm text-ink-soft">Project financing designed for home improvement.</p>
          </div>
          <a
            href="tel:8669360602"
            className="btn btn-solid inline-flex h-12 flex-none items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(93,187,70,0.32)]"
          >
            <Phone className="size-4" />
            866-936-0602
          </a>
        </div>
      </section>

      {/* Options — numbered editorial grid */}
      <section className={`${SECTION} bg-cream`}>
        <div className={CONTAINER}>
          <div className="mx-auto mb-12 max-w-2xl text-center [&>div]:mx-auto">
            <SectionHeader
              label="Financing Options"
              title={
                <>
                  Four ways to <em className="font-medium italic text-brand-dark">fund your remodel.</em>
                </>
              }
            />
          </div>
          <div className="grid gap-px border border-line bg-line md:grid-cols-2">
            {options.map((opt, i) => (
              <FadeIn key={opt.title} delay={(i % 2) * 0.07} className="bg-paper p-8 lg:p-10">
                <span className="mb-4 block font-condensed text-5xl font-semibold leading-none text-brand/25">
                  0{i + 1}
                </span>
                <h3 className="font-display text-2xl font-semibold text-ink">{opt.title}</h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft/80">{opt.desc}</p>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.1} className="mx-auto mt-10 max-w-3xl">
            <p className="text-xs italic leading-relaxed text-ink-muted">
              Financial disclaimer: this information is for general purposes only and is not financial advice.
              Please consult a qualified financial advisor before making financial decisions.
            </p>
          </FadeIn>
        </div>
      </section>

      <PageCta
        eyebrow="Ready to begin?"
        title="Find the right financing path for your remodel."
        body="Schedule a free consultation and we will help you find the right path forward."
        watermark="Finance"
      />
    </main>
  );
}
