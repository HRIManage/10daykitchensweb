"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

type DropdownItem = { label: string; href: string; description?: string };
type NavItem = { label: string; href?: string; children?: DropdownItem[] };

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    children: [
      { label: "Kitchen Remodel", href: "/kitchen-remodel", description: "Full custom layouts, trades, and finishes" },
      { label: "10 Day Kitchens Program", href: "/10businessdaykitchenprogram", description: "Fast existing-layout kitchen remodels" },
      { label: "Bath Remodel", href: "/bathroom-remodel", description: "Showers, vanities, flooring, and fixtures" },
      { label: "Fast Bath", href: "/fast-bath", description: "Tub conversions, showers, and bath upgrades" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Our Projects", href: "/portfolio" },
  {
    label: "Resources",
    children: [
      { label: "FAQs", href: "/faq-1", description: "Answers before you remodel" },
      { label: "Financing", href: "/financing", description: "Project payment options" },
      { label: "Blog / Advice", href: "/resources/blog", description: "Planning tips and remodel guidance" },
      { label: "Collections", href: "/resources/catalog", description: "Cabinet and surface inspiration" },
    ],
  },
];

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

/** Editorial nav link with an origin-aware underline reveal. */
const navLinkClass =
  "relative inline-flex h-12 items-center text-[14.5px] font-bold uppercase tracking-[0.13em] transition-colors duration-200 " +
  "after:absolute after:inset-x-0 after:bottom-1.5 after:h-px after:origin-right after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 after:ease-out " +
  "hover:after:origin-left hover:after:scale-x-100";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setOpenMenu(null);
      setMobileOpen(false);
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Promo bar — the promise, not just contact info */}
      <div
        className={`hidden overflow-hidden border-white/10 bg-[#2A2A2A] text-cream transition-all duration-300 sm:block ${
          scrolled ? "max-h-0 border-b-0 opacity-0" : "max-h-16 border-b opacity-100"
        }`}
      >
        <div className="site-container flex min-h-12 items-center justify-between gap-3">
          <p className="min-w-0 truncate text-[11px] font-bold tracking-[0.08em] text-cream/85 sm:text-[12.5px] sm:tracking-[0.12em]">
            <span className="uppercase text-brand-light">Coming Soon</span>
            <span className="mx-2 text-cream/45">|</span>
            <span>Our showroom in Lacey is opening soon.</span>
          </p>
          <div className="flex flex-none items-center gap-4">
            <a
              href={site.phoneHref}
              className="flex flex-none items-center gap-2 text-[13px] font-bold tracking-[0.04em] text-brand-light transition hover:text-white sm:text-[13.5px] sm:tracking-[0.06em]"
            >
              <Phone className="size-4" />
              <span className="hidden min-[390px]:inline">{site.phone}</span>
            </a>
            <span className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden="true" />
            <div className="hidden items-center gap-4 text-brand-light sm:flex">
              <a
                href={site.facebookHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition hover:text-white"
              >
                <FacebookIcon />
              </a>
              <a
                href={site.instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition hover:text-white"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav — slimmer, editorial */}
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-white/45 bg-paper/72 shadow-[0_12px_40px_rgba(43,39,35,0.08),inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-2xl"
            : "border-b border-white/30 bg-white/25 backdrop-blur-md"
        }`}
      >
        <div className="site-container flex h-[76px] items-center justify-between gap-4 xl:h-[108px] xl:gap-6">
          <Link href="/" aria-label={`${site.name} home`} onClick={() => setMobileOpen(false)} className="relative flex-none">
            <Image
              src="/images/logo.webp"
              alt={site.name}
              width={264}
              height={112}
              priority
              className="h-[68px] w-auto object-contain xl:h-[100px]"
            />
          </Link>

          <ul className="hidden items-center gap-6 xl:flex">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={() => setOpenMenu(null)}
                    className={`${navLinkClass} text-ink hover:text-brand-dark`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    aria-expanded={openMenu === item.label}
                    aria-haspopup="menu"
                    onClick={() => setOpenMenu(item.label)}
                    className={`${navLinkClass} gap-1.5 text-ink hover:text-brand-dark`}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={`mt-px size-3.5 stroke-[2.4] transition-transform duration-200 ${
                        openMenu === item.label ? "rotate-180 text-brand-dark" : ""
                      }`}
                    />
                  </button>
                )}

                {item.children && openMenu === item.label ? (
                  <div className="absolute left-1/2 top-full min-w-[286px] -translate-x-1/2 pt-3">
                    <div className="relative animate-in overflow-hidden border border-white/70 bg-paper/92 shadow-[0_26px_70px_rgba(43,39,35,0.18),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-[56px] backdrop-saturate-150 fade-in slide-in-from-top-1 duration-200">
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.86),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.42),rgba(255,255,255,0.16)_48%,rgba(93,187,70,0.07))]" />
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/85" />
                      <div className="relative h-1 bg-brand/80" />
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setOpenMenu(null)}
                          className="group relative block border-b border-line/70 px-5 py-4 transition last:border-0 hover:bg-white/68"
                        >
                          <span className="flex items-center justify-between gap-6 text-[13px] font-bold uppercase tracking-[0.12em] text-ink transition group-hover:text-brand-dark">
                            {child.label}
                            <span className="h-px w-6 bg-line transition group-hover:w-9 group-hover:bg-brand" />
                          </span>
                          {child.description ? (
                            <span className="mt-1.5 block text-[13px] font-medium leading-5 tracking-normal text-ink-soft/82">
                              {child.description}
                            </span>
                          ) : null}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="flex flex-none items-center gap-3">
            <Link
              href="/contact-1"
              onClick={() => setOpenMenu(null)}
              className="hidden h-11 items-center bg-brand px-5 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_10px_28px_rgba(93,187,70,0.35)] xl:inline-flex"
            >
              Contact Us
            </Link>
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((value) => !value)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] xl:hidden"
            >
              <span className={`h-[2px] w-6 bg-ink transition ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`h-[2px] w-6 bg-ink transition ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`h-[2px] w-6 bg-ink transition ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-b border-line bg-paper transition-[max-height,opacity] duration-300 xl:hidden ${
          mobileOpen ? "max-h-[82vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="max-h-[calc(100dvh-124px)] overflow-y-auto px-5 py-4">
          {navItems.map((item) => (
            <div key={item.label} className="border-b border-line py-3 last:border-0">
              {item.href ? (
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-[14px] font-bold uppercase tracking-[0.11em] text-ink"
                >
                  {item.label}
                </Link>
              ) : (
                <>
                  <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.14em] text-brand-dark">
                    {item.label}
                  </p>
                  <div className="grid gap-2">
                    {item.children?.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="text-[14px] font-semibold text-ink-soft"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
          <Link
            href="/contact-1"
            onClick={() => setMobileOpen(false)}
            className="mt-5 block bg-brand px-6 py-3.5 text-center text-[13px] font-bold uppercase tracking-[0.14em] text-white"
          >
            Book Your Free Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}
