import Image from "next/image";
import type { EstimateResult } from "@/lib/estimate";

export default function EstimateStep({
  result,
  onSchedule,
  onSummary,
}: {
  result: EstimateResult;
  onSchedule: () => void;
  onSummary: () => void;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div>
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand-dark">
          Your estimated investment
        </p>
        <p className="mt-3 font-display text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-none text-ink">
          ${result.low.toLocaleString()} – ${result.high.toLocaleString()}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-dark/10 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.1em] text-brand-dark">
          {result.confidence >= 85 ? "High confidence" : "Estimated"} · {result.confidence}%
        </span>
        <p className="mt-5 max-w-md text-[0.95rem] leading-7 text-ink-soft">
          This is a starting estimate based on your selections. Final pricing may vary after an
          in-home consultation, measurements, and material selections. It is not a quote.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onSchedule}
            className="inline-flex min-h-[52px] items-center justify-center bg-brand-dark px-6 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-ink"
          >
            Schedule free consultation
          </button>
          <button
            type="button"
            onClick={onSummary}
            className="inline-flex min-h-[52px] items-center justify-center border border-line bg-white px-6 text-[13px] font-bold uppercase tracking-[0.12em] text-ink transition hover:border-brand-dark"
          >
            See project summary
          </button>
        </div>
      </div>
      <div className="relative aspect-[1.3/1] overflow-hidden border border-line bg-white">
        <Image
          src="/images/modern master bathroom with nice shower and double vanity.jpg"
          alt="Finished bathroom remodel"
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
