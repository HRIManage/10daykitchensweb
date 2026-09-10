import Link from "next/link";
import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import LeadForm from "@/components/landing/LeadForm";
import { CONTAINER } from "@/components/layout";
import { FadeIn } from "@/components/shared";
import { PHONE_CONSULT_URL } from "@/lib/honeybook";
import { site } from "@/lib/site";

type Fallback = { prompt: string; label: string; href: string };

type PageCtaProps = {
  eyebrow: string;
  /** Wrap the closing phrase in <em> to get the italic green accent. */
  title: ReactNode;
  body?: ReactNode;
  /** Page name for the lead form's analytics label, e.g. "kitchen-remodel". */
  source: string;
  /** Low-commitment option under the form. Defaults to booking a phone call. */
  fallback?: Fallback;
};

/** What happens after someone books — a real sequence, so it is numbered. */
const steps = [
  { title: "Send your details", body: "Takes about a minute, then you pick a time on our calendar." },
  { title: "We come to you", body: "We measure the space and walk you through materials, finishes, and options." },
  { title: "Get a clear plan", body: "A written plan and contract before work starts, so there are no surprises." },
];

const phoneCallFallback: Fallback = {
  prompt: "Not ready for a home visit?",
  label: "Book a free 15-minute phone call",
  href: PHONE_CONSULT_URL,
};

const fallbackLinkClass =
  "font-bold text-brand-light underline underline-offset-4 transition hover:text-white";

/**
 * Sitewide closing CTA: the headline and next steps sit beside the consultation
 * form, so booking from the bottom of any page takes no extra click.
 */
export default function PageCta({ eyebrow, title, body, source, fallback = phoneCallFallback }: PageCtaProps) {
  return (
    <section
      id="consultation"
      className="relative scroll-mt-24 overflow-hidden border-t border-brand/35 bg-forest py-20 text-white sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_85%_45%,rgba(93,187,70,0.13),transparent_70%)]"
      />
      <div className={`${CONTAINER} relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16`}>
        <FadeIn>
          <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-brand-light">{eyebrow}</p>
          <h2 className="mt-5 font-display text-[clamp(2.5rem,5vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.03em] [&_em]:font-medium [&_em]:italic [&_em]:text-brand-light">
            {title}
          </h2>
          {body ? <p className="mt-6 max-w-xl text-[16px] leading-8 text-white/68">{body}</p> : null}

          <ol className="mt-10 border-l border-white/15">
            {steps.map((step, i) => (
              <li key={step.title} className="relative pb-7 pl-8 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute -left-[13px] top-0 flex size-[26px] items-center justify-center rounded-full border border-brand-light/50 bg-forest font-display text-[15px] leading-none text-brand-light"
                >
                  {i + 1}
                </span>
                <h3 className="font-sans text-[15px] font-bold text-white">{step.title}</h3>
                <p className="mt-1 text-[15px] leading-7 text-white/65">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/12 pt-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2.5 text-[15px] font-bold text-white transition hover:text-brand-light"
            >
              <Phone className="size-4 text-brand-light" aria-hidden="true" />
              Prefer to talk? {site.phone}
            </a>
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-white/50">
              Fast turnaround by experts · 5-year warranty · Licensed &amp; insured
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <LeadForm
            variant="section"
            source={source}
            heading="Book your free consultation"
            sublabel="Free, no pressure, and right in your home."
          />
          <p className="mt-5 text-center text-[14px] text-white/65 lg:text-left">
            {fallback.prompt}{" "}
            {fallback.href.startsWith("http") ? (
              <a href={fallback.href} target="_blank" rel="noopener noreferrer" className={fallbackLinkClass}>
                {fallback.label}
              </a>
            ) : (
              <Link href={fallback.href} className={fallbackLinkClass}>
                {fallback.label}
              </Link>
            )}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
