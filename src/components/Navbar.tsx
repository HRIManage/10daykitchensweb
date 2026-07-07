"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

type DropdownItem = { label: string; href: string };
type NavItem = { label: string; href?: string; children?: DropdownItem[] };

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    children: [
      { label: "Kitchen Remodel", href: "/kitchen-remodel" },
      { label: "Bath Remodel", href: "/bathroom-remodel" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Our Projects", href: "/portfolio" },
  {
    label: "Resources",
    children: [
      { label: "FAQs", href: "/faq" },
      { label: "Financing", href: "/financing" },
      { label: "Blog / Advice", href: "/blog" },
      { label: "Collections", href: "/collections" },
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

export default function Navbar() {
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

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-brand/25 bg-[#181d16] text-brand-light">
        <div className="mx-auto flex min-h-11 w-full max-w-[1240px] items-center justify-between gap-4 px-5 text-[14px] font-bold sm:px-8 lg:px-10">
          <div className="flex min-w-0 items-center gap-4 text-brand-light/88">
            <a href={site.phoneHref} className="flex items-center gap-1.5 transition hover:text-white">
              <Phone className="size-3.5" />
              <span>{site.phone}</span>
            </a>
            <a href={`mailto:${site.email}`} className="flex min-w-0 items-center gap-1.5 transition hover:text-white">
              <Mail className="size-3.5" />
              <span className="hidden truncate sm:inline">{site.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-3 text-brand-light/88">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition hover:text-white">
              <FacebookIcon />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition hover:text-white">
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>

      <nav
        className={`border-b border-black/10 bg-[#fffefa]/95 backdrop-blur-md transition-shadow ${
          scrolled ? "shadow-[0_10px_30px_rgba(0,0,0,0.06)]" : ""
        }`}
      >
        <div className="mx-auto flex h-[104px] w-full max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link href="/" aria-label={`${site.name} home`} onClick={() => setMobileOpen(false)}>
            <Image
              src="/images/logo.webp"
              alt={site.name}
              width={264}
              height={112}
              priority
              className="h-[88px] w-auto object-contain"
            />
          </Link>

          <ul className="hidden items-center gap-6 md:flex">
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
                    className="text-[14px] font-bold uppercase tracking-[0.11em] text-ink-soft transition hover:text-brand"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="flex items-center gap-1 text-[14px] font-bold uppercase tracking-[0.11em] text-ink-soft transition hover:text-brand"
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-3 transition-transform ${openMenu === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                )}

                {item.children && openMenu === item.label ? (
                  <div className="absolute left-1/2 top-full min-w-[210px] -translate-x-1/2 pt-3">
                    <div className="overflow-hidden border border-black/10 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block border-b border-black/5 px-5 py-3 text-sm text-ink-soft transition last:border-0 hover:bg-[#f7f7f4] hover:text-ink"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden min-h-11 items-center bg-brand px-5 text-[13px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-brand-dark md:inline-flex"
            >
              Contact Us
            </Link>
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((value) => !value)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
            >
              <span className={`h-[2px] w-6 bg-ink transition ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`h-[2px] w-6 bg-ink transition ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`h-[2px] w-6 bg-ink transition ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-b border-black/10 bg-[#fffefa] transition-[max-height,opacity] duration-300 md:hidden ${
          mobileOpen ? "max-h-[82vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="max-h-[80vh] overflow-y-auto px-5 py-4">
          {navItems.map((item) => (
            <div key={item.label} className="border-b border-black/10 py-3 last:border-0">
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
                  <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.12em] text-brand">
                    {item.label}
                  </p>
                  <div className="grid gap-2">
                    {item.children?.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="text-[14px] font-bold text-ink-soft"
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
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-5 block bg-brand px-6 py-3 text-center text-[13px] font-bold uppercase tracking-[0.12em] text-white"
          >
            Book Your Free Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}
