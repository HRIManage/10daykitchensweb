import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { getServiceAreaCities } from "@/lib/cities";

function FacebookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current">
      <path d="M14.2 8.3V6.9c0-.7.5-.9.9-.9h2.3V2.2L14.2 2c-3.6 0-4.4 2.1-4.4 4.2v2.1H7v3.9h2.8V22h4.2v-9.8h3.1l.5-3.9h-3.4Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-2">
      <rect width="16" height="16" x="4" y="4" rx="4" />
      <circle cx="12" cy="12" r="3.2" />
      <path d="M17.4 6.8h.01" />
    </svg>
  );
}

const serviceLinks = [
  { label: "Kitchen Remodel", href: "/kitchen-remodel" },
  { label: "10 Day Kitchens Program", href: "/10businessdaykitchenprogram" },
  { label: "Bathroom Remodel", href: "/bathroom-remodel" },
  { label: "Fast Bath", href: "/fast-bath" },
  { label: "Our Projects", href: "/portfolio" },
] as const;

const exploreLinks = [
  { label: "About", href: "/about" },
  { label: "Collections", href: "/resources/catalog" },
  { label: "Blog / Advice", href: "/resources/blog" },
  { label: "Financing", href: "/financing" },
  { label: "FAQs", href: "/faq-1" },
  { label: "Contact Us", href: "/contact-1" },
] as const;

export default function Footer() {
  const serviceCities = getServiceAreaCities();

  return (
    <footer className="border-t border-line bg-paper text-ink">
      <div className="site-container py-14 sm:py-16 lg:py-20">
        <div className="grid gap-10 border-b border-line pb-12 lg:grid-cols-[1.15fr_0.72fr_0.72fr_0.95fr] lg:gap-12">
          <div className="max-w-md">
            <Link href="/" aria-label={site.name} className="inline-flex">
              <Image
                src="/images/logo.webp"
                alt={site.name}
                width={150}
                height={66}
                className="h-[74px] w-auto object-contain"
              />
            </Link>
            <p className="mt-5 max-w-sm text-[16px] italic leading-8 text-ink-soft">
              Kitchen and bath remodeling based in Lacey, serving the South Sound.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact-1"
                className="inline-flex min-h-[50px] items-center justify-center gap-3 bg-brand px-6 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_14px_30px_rgba(93,187,70,0.24)]"
              >
                Contact Us
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={site.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[50px] items-center justify-center border border-line bg-white px-6 text-[12px] font-bold uppercase tracking-[0.14em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand-dark"
              >
                Get Directions
              </a>
            </div>

            <div className="mt-7 flex items-center gap-5 text-brand">
              <a
                href={site.facebookHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition hover:text-brand-dark"
              >
                <FacebookIcon />
              </a>
              <a
                href={site.instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition hover:text-brand-dark"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand">Services</p>
            <ul className="mt-5 space-y-3.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[15px] leading-7 text-ink-soft transition hover:text-brand-dark">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand">Explore</p>
            <ul className="mt-5 space-y-3.5">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[15px] leading-7 text-ink-soft transition hover:text-brand-dark">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-line pt-8 lg:border-t-0 lg:pt-0">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand">Showroom</p>
            <a
              href={site.mapsHref}
              target="_blank"
              rel="noreferrer"
              className="mt-5 block text-[15px] leading-7 text-ink-soft transition hover:text-brand-dark"
            >
              8695 Martin Way E STE 101
              <br />
              Lacey, WA 98516
            </a>

            <div className="mt-6 space-y-2 text-[15px] leading-7 text-ink-soft">
              {site.showroomHours.map((entry) => (
                <p key={entry.day}>
                  <span className="font-semibold text-ink">{entry.day}:</span> {entry.time}
                </p>
              ))}
            </div>

            <div className="mt-6 space-y-2.5">
              <a href={site.phoneHref} className="block text-[15px] leading-7 text-ink-soft transition hover:text-brand-dark">
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="block text-[15px] leading-7 text-ink-soft transition hover:text-brand-dark"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <div className="grid gap-4 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-8">
            <p className="pt-1 text-[12px] font-bold uppercase tracking-[0.2em] text-brand">Service Area</p>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {serviceCities.map((city) => (
                <Link
                  key={city.slug}
                  href={city.published ? `/kitchen-remodel/${city.slug}` : "/contact-1"}
                  className="text-[14.5px] font-semibold text-ink-soft transition hover:text-brand-dark"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="site-container flex flex-col gap-2 py-5 text-[15px] font-bold text-ink sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 10 Day Kitchens LLC</p>
          <p>{site.license} | Licensed and insured</p>
        </div>
      </div>
    </footer>
  );
}
