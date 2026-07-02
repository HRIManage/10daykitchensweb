import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const navColumns = [
  {
    heading: "Services",
    links: [
      { label: "Kitchen Remodel", href: "/kitchen-remodel" },
      { label: "Bath Remodel", href: "/bathroom-remodel" },
      { label: "Our Projects", href: "/portfolio" },
      { label: "Collections", href: "/collections" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "How We Work", href: "/#process" },
      { label: "FAQs", href: "/faq" },
      { label: "Financing", href: "/financing" },
    ],
  },
  {
    heading: "Get Started",
    links: [
      { label: "Book a Consultation", href: "/appointments" },
      { label: "Contact Us", href: "/contact" },
      { label: "Blog / Advice", href: "/blog" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#F4FAF1] text-[#111111] overflow-hidden border-t border-[rgba(0,0,0,0.06)]">
      {/* Top bar — green accent */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #5DBB46 0%, #4aa836 50%, rgba(93,187,70,0.15) 100%)" }} />

      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-14 mb-14">

          {/* Brand column */}
          <div>
            <Link href="/">
              <img src="/images/logo.webp" alt="10 Day Kitchens" className="h-16 w-auto" />
            </Link>
            <p className="text-[#555555] text-sm mt-5 max-w-xs leading-relaxed">
              Beautiful, functional spaces built around your timeline — kitchens &amp; bathrooms completed in as little as 10 business days.
            </p>

            {/* Contact info inline */}
            <div className="mt-8 flex flex-col gap-3">
              <a href="tel:+13605573444" className="flex items-center gap-3 text-white/60 hover:text-[#5DBB46] transition-colors text-sm group">
                <Phone className="h-4 w-4 text-[#5DBB46]" strokeWidth={2} />
                360-557-3444
              </a>
              <a href="mailto:office@10daykitchens.com" className="flex items-center gap-3 text-white/60 hover:text-[#5DBB46] transition-colors text-sm group">
                <Mail className="h-4 w-4 text-[#5DBB46]" strokeWidth={2} />
                office@10daykitchens.com
              </a>
              <a
                href="https://maps.google.com/?q=8695+Martin+Way+E+STE+101,+Lacey,+WA+98516"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-[#555555] hover:text-[#5DBB46] transition-colors text-sm"
              >
                <MapPin className="h-4 w-4 text-[#5DBB46] mt-0.5 shrink-0" strokeWidth={2} />
                8695 Martin Way E STE 101, Lacey, WA 98516
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-4 mt-8">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 hover:border-[#5DBB46] hover:text-[#5DBB46] transition-all duration-200"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 hover:border-[#5DBB46] hover:text-[#5DBB46] transition-all duration-200"
              >
                {/* Facebook inline SVG */}
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {navColumns.map((col) => (
              <div key={col.heading}>
                <p className="text-[#5DBB46] text-[10px] uppercase tracking-widest font-bold mb-5" >
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[#555555] hover:text-[#111111] transition-colors text-sm leading-snug"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges row */}
        <div className="border-t border-[rgba(0,0,0,0.08)] pt-8 flex flex-wrap gap-4 mb-8">
          {["Free Consultation", "10-Day Guarantee", "5-Year Warranty", "Licensed & Insured", "Family Owned"].map((badge) => (
            <span key={badge} className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#777777]">
              <span className="w-1 h-1 rounded-full bg-[#5DBB46]" />
              {badge}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(0,0,0,0.08)] pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-[#aaaaaa] text-xs">
            &copy; {new Date().getFullYear()} 10 Day Kitchens LLC · LIC #10DAYDK757O5
          </p>
          <p className="text-[#aaaaaa] text-xs">Lacey, WA · Kitchen &amp; Bath Remodeling</p>
        </div>
      </div>
    </footer>
  );
}
