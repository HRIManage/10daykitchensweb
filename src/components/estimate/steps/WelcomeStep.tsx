import Image from "next/image";
import { CalendarCheck, Gauge, Wallet } from "lucide-react";

const POINTS = [
  { icon: Gauge, title: "Instant estimate", body: "A realistic price range in minutes." },
  { icon: Wallet, title: "Based on real projects", body: "Priced from actual jobs in your area." },
  { icon: CalendarCheck, title: "100% free", body: "No obligation, ever." },
];

export default function WelcomeStep({ onStart }: { onStart: () => void }) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div>
        <h1 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-tight text-ink">
          Bathroom remodel, made simple.
        </h1>
        <p className="mt-4 text-[1.05rem] leading-8 text-ink-soft">
          Answer a few quick questions and get a rough estimate for your project. Takes about two
          minutes.
        </p>
        <ul className="mt-8 grid gap-5">
          {POINTS.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-3">
              <Icon className="mt-0.5 size-5 shrink-0 text-brand-dark" aria-hidden />
              <span>
                <span className="block text-[0.95rem] font-semibold text-ink">{title}</span>
                <span className="block text-[0.9rem] text-ink-soft">{body}</span>
              </span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onStart}
          className="mt-9 inline-flex min-h-[54px] items-center justify-center bg-brand-dark px-8 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-ink"
        >
          Get started
        </button>
        <p className="mt-3 text-[12px] text-ink-muted">This is a rough estimate, not a quote.</p>
      </div>
      <div className="relative hidden aspect-[1.2/1] overflow-hidden border border-line bg-white lg:block">
        <Image
          src="/images/modern master bathroom with nice shower and double vanity.jpg"
          alt="Finished bathroom remodel"
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
