"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [heroHeight, setHeroHeight] = useState(() => typeof window !== "undefined" ? window.innerHeight * 1.55 : 1200);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handler = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 80);
      setScrollY(currentScrollY);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setHeroHeight(window.innerHeight * 1.55);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // The hero is now a light section (not a full-bleed dark photo), so the
  // nav is always in its solid/dark-on-light state — only the shadow reacts
  // to scroll now.
  const solidNav = true;

  // Compute header styling for scroll hiding on homepage
  let headerStyle: React.CSSProperties = {};
  if (isHome) {
    if (scrollY > 40 && scrollY < heroHeight) {
      headerStyle = {
        opacity: 0,
        transform: "translateY(-100%)",
        pointerEvents: "none",
      };
    } else if (scrollY >= heroHeight) {
      if (visible) {
        headerStyle = {
          opacity: 1,
          transform: "translateY(0)",
        };
      } else {
        headerStyle = {
          opacity: 0,
          transform: "translateY(-100%)",
          pointerEvents: "none",
        };
      }
    }
  } else {
    if (visible) {
      headerStyle = {
        opacity: 1,
        transform: "translateY(0)",
      };
    } else {
      headerStyle = {
        opacity: 0,
        transform: "translateY(-100%)",
        pointerEvents: "none",
      };
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out" style={headerStyle}>
      {/* Utility bar — transparent over the hero, solidifies on scroll */}
      <div
        className={`h-11 flex justify-between items-center px-5 sm:px-8 transition-colors duration-300 ${
          scrolled ? "bg-[#F7FAF5]" : "bg-transparent"
        }`}
      >
        <a
          href="tel:+13605573444"
          className="text-[13px] sm:text-[14px] transition-colors duration-200"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          <span className="text-[#5DBB46] hover:text-[#4aa836] font-extrabold">(360) 557-3444</span>
          <span className="hidden sm:inline text-[#222222] font-semibold"> · office@10daykitchens.com</span>
        </a>
        <div className="flex gap-6 sm:gap-8">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#222222] hover:text-[#5DBB46] text-[13px] sm:text-[14px] font-bold transition-colors duration-200"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#222222] hover:text-[#5DBB46] text-[13px] sm:text-[14px] font-bold transition-colors duration-200"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Facebook
          </a>
        </div>
      </div>

      <nav
        className={`flex justify-between items-center py-4 px-5 sm:px-8 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.08)]"
            : "bg-transparent"
        }`}
      >
        <Link
          href="/"
          aria-label="10 Day Kitchens — home"
          className="group inline-flex items-center"
          onClick={() => setMobileOpen(false)}
        >
          <img
            src="/images/logo.webp"
            alt="10 Day Kitchens — Kitchen & Bath Remodeling"
            width={1500}
            height={1000}
            className={`w-auto origin-left transition-all duration-500 ease-out group-hover:scale-[1.03] ${
              scrolled ? "h-16 sm:h-20" : "h-20 sm:h-24"
            }`}
            style={{
              filter: "none",
            }}
          />
        </Link>

        <ul className="hidden md:flex gap-8 list-none m-0 p-0 items-center">
          {navItems.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              {item.href ? (
                <a
                  href={item.href}
                  className={`text-[14px] font-bold uppercase tracking-[0.11em] transition-colors duration-300 ${
                    solidNav ? "text-[#111111]/80 hover:text-[#5DBB46]" : "text-white/85 hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {item.label}
                </a>
              ) : (
                <button
                  className={`text-[14px] font-bold uppercase tracking-[0.11em] transition-colors duration-300 flex items-center gap-1.5 bg-transparent border-0 p-0 cursor-pointer ${
                    solidNav ? "text-[#111111]/80 hover:text-[#5DBB46]" : "text-white/85 hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {item.label}
                  <svg
                    className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${openMenu === item.label ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}

              {item.children && openMenu === item.label && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 min-w-[220px]">
                  <div className="bg-white rounded-xl shadow-[0_12px_48px_rgba(0,0,0,0.12)] overflow-hidden border border-[rgba(0,0,0,0.06)]">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block px-6 py-3.5 text-[14px] font-bold text-[#111111]/80 hover:text-[#5DBB46] hover:bg-[#F7FAF5] transition-colors border-b border-[rgba(0,0,0,0.05)] last:border-0"
                        style={{ fontFamily: "var(--font-manrope)" }}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="/contact"
            className="hidden md:inline-block bg-[#5DBB46] text-white rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-[#4aa836] transition-all shadow-[0_2px_12px_rgba(93,187,70,0.30)]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Contact Us
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-transparent"
          >
            <span
              className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${
                solidNav ? "bg-[#111111]" : "bg-white"
              } ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${
                solidNav ? "bg-[#111111]" : "bg-white"
              } ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-[2px] w-6 rounded-full transition-all duration-300 ${
                solidNav ? "bg-[#111111]" : "bg-white"
              } ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden overflow-hidden bg-white border-t border-[rgba(0,0,0,0.06)] transition-[max-height,opacity] duration-400 ease-out ${
          mobileOpen ? "max-h-[80vh] opacity-100 shadow-[0_20px_40px_rgba(0,0,0,0.12)]" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-5 py-4 overflow-y-auto max-h-[calc(80vh-1rem)]">
          <ul className="list-none m-0 p-0 flex flex-col">
            {navItems.map((item) => (
              <li key={item.label} className="border-b border-[rgba(0,0,0,0.06)] last:border-0">
                {item.href ? (
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-[#111111]"
                    style={{ fontFamily: "var(--font-manrope)" }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <div className="py-3.5">
                    <p
                      className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5DBB46] mb-2"
                      style={{ fontFamily: "var(--font-manrope)" }}
                    >
                      {item.label}
                    </p>
                    <div className="flex flex-col gap-1">
                      {item.children?.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-1.5 text-sm font-medium text-[#444444]"
                          style={{ fontFamily: "var(--font-manrope)" }}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <a
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-5 block text-center bg-[#5DBB46] text-white rounded-full px-6 py-3.5 text-xs font-semibold uppercase tracking-wider shadow-[0_2px_12px_rgba(93,187,70,0.30)]"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Book Your Free Consultation
          </a>
        </nav>
      </div>
    </header>
  );
}
