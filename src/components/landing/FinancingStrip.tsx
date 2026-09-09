import Link from "next/link";
import { CONTAINER } from "@/components/layout";

export default function FinancingStrip() {
  return (
    <section className="bg-sand">
      <div
        className={`${CONTAINER} flex flex-col gap-3 py-12 md:flex-row md:items-center md:justify-between`}
      >
        <div className="max-w-2xl">
          <h2 className="font-display text-[clamp(1.6rem,2.8vw,2.4rem)] font-medium leading-tight text-ink">
            Spread the cost of your new bathroom.
          </h2>
          <p className="mt-3 text-[1rem] leading-7 text-ink-soft">
            Monthly payment plans are available through GreenSky, along with 0% promotional
            options for qualifying projects. We will walk you through every path during your
            consultation.
          </p>
          <p className="mt-3 text-[12px] leading-5 text-ink-muted">
            This information is for general purposes only and is not financial advice. Please
            consult a qualified financial advisor before making financial decisions.
          </p>
        </div>
        <Link
          href="/financing"
          className="shrink-0 self-start text-[13px] font-bold uppercase tracking-[0.14em] text-brand-dark underline underline-offset-4 hover:text-ink"
        >
          See financing options
        </Link>
      </div>
    </section>
  );
}
