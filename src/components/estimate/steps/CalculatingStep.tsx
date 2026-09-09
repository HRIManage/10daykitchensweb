import { Calculator } from "lucide-react";

export default function CalculatingStep() {
  return (
    <div className="mx-auto max-w-md text-center">
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-dark/10 text-brand-dark">
        <Calculator className="size-7" aria-hidden />
      </div>
      <p className="mt-6 font-display text-[1.6rem] font-medium text-ink">Calculating your estimate…</p>
      <p className="mt-2 text-[0.95rem] text-ink-soft">
        We analyze thousands of real projects to give you the most accurate range possible.
      </p>
      <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-sand">
        <div className="h-full w-1/3 animate-pulse rounded-full bg-brand-dark" />
      </div>
    </div>
  );
}
