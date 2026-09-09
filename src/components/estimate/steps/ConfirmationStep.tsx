import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function ConfirmationStep() {
  return (
    <div className="mx-auto max-w-md text-center">
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-dark/10 text-brand-dark">
        <CheckCircle2 className="size-8" aria-hidden />
      </div>
      <h2 className="mt-6 font-display text-[2rem] font-medium text-ink">You&rsquo;re all set!</h2>
      <p className="mt-3 text-[0.98rem] leading-7 text-ink-soft">
        Your estimate is on its way to your inbox. We&rsquo;ll be in touch to confirm your
        consultation.
      </p>
      <Link
        href="/fast-bath"
        className="mt-8 inline-flex min-h-[52px] items-center justify-center border border-line bg-white px-6 text-[13px] font-bold uppercase tracking-[0.12em] text-ink transition hover:border-brand-dark"
      >
        Back to Fast Bath
      </Link>
    </div>
  );
}
