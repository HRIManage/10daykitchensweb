"use client";

import { HOME_CONSULT_URL } from "@/lib/honeybook";

export default function ScheduleStep({ onBack }: { onBack: () => void }) {
  return (
    <div className="mx-auto max-w-3xl">
      <button
        type="button"
        onClick={onBack}
        className="text-[12px] font-bold uppercase tracking-[0.12em] text-brand-dark underline underline-offset-4"
      >
        Back to estimate
      </button>
      <h2 className="mt-4 font-display text-[1.9rem] font-medium text-ink">
        Schedule your free in-home consultation
      </h2>
      <p className="mt-3 text-[0.95rem] leading-7 text-ink-soft">
        A 45&ndash;60 minute visit. We look at the space, walk through materials, and leave you with
        a firm quote.
      </p>
      <div className="mt-6 min-h-[640px] border border-line bg-white lg:min-h-[720px]">
        <iframe
          src={HOME_CONSULT_URL}
          title="Book a free in-home consultation"
          loading="lazy"
          className="h-[640px] w-full border-0 lg:h-[720px]"
        />
      </div>
    </div>
  );
}
