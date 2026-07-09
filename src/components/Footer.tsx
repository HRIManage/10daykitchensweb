import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-[#fffefa] text-ink">
      <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-10">
        <div>
          <Link href="/" aria-label={site.name}>
            <Image
              src="/images/logo.webp"
              alt={site.name}
              width={124}
              height={52}
              className="h-16 w-auto object-contain"
            />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-soft/68">
            {site.tagline}
          </p>
        </div>

        <div className="grid gap-8 border-t border-line pt-8 text-sm text-ink-soft/70 sm:grid-cols-2 lg:border-t-0 lg:pt-0">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">Showroom</p>
            <p className="mt-2 max-w-xs leading-relaxed">{site.address}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">Contact</p>
            <a href={site.phoneHref} className="mt-2 block transition hover:text-brand">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="mt-1 block transition hover:text-brand">
              {site.email}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-2 px-5 py-5 text-xs text-ink-soft/52 sm:flex-row sm:justify-between sm:px-8 lg:px-10">
          <p>© 2026 10 Day Kitchens LLC</p>
          <p>{site.license} | Licensed and insured</p>
        </div>
      </div>
    </footer>
  );
}
