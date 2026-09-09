import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CONTAINER } from "@/components/layout";

type CtaBandProps = {
  eyebrow: string;
  headline: string;
  buttonLabel: string;
  href?: string;
};

export default function CtaBand({ eyebrow, headline, buttonLabel, href = "#book" }: CtaBandProps) {
  return (
    <section className="bg-forest text-white">
      <div
        className={`${CONTAINER} flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between`}
      >
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-light">{eyebrow}</p>
          <p className="mt-2 max-w-xl font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium leading-tight">
            {headline}
          </p>
        </div>
        <Link
          href={href}
          className="inline-flex min-h-[52px] shrink-0 items-center gap-2 bg-white px-7 text-[13px] font-bold uppercase tracking-[0.12em] text-ink transition hover:bg-brand-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light"
        >
          {buttonLabel}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
