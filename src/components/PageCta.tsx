import Link from "next/link";
import type { ReactNode } from "react";

type PageCtaProps = {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  watermark?: string;
};

export default function PageCta({
  eyebrow,
  title,
  body,
  primaryLabel = "Schedule Free Consultation",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
  watermark = "10 Day",
}: PageCtaProps) {
  return (
    <section className="page-cta-section">
      <div className="page-cta-watermark" aria-hidden="true">
        {watermark}
      </div>
      <div className="page-cta-content">
        <div>
          <span className="eyebrow mb-5 block text-brand-light">{eyebrow}</span>
          <h2 className="font-display text-[clamp(2.7rem,6vw,6rem)] font-medium leading-[1.02] tracking-[-0.03em] text-white">
            {title}
          </h2>
          {body ? (
            <p className="mt-7 max-w-[560px] text-[17px] leading-[1.8] text-white/68">
              {body}
            </p>
          ) : null}
        </div>
        <div className="page-cta-btn-card">
          <Link className="btn btn-solid pulse-shimmer-btn" href={primaryHref}>
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref ? (
            <Link className="btn btn-solid" href={secondaryHref}>
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
