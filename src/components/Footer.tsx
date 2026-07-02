import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

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
    <footer className="bg-[#1A2E1A] text-white overflow-hidden">
      {/* Top bar — green accent */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #5DBB46 0%, #4aa836 50%, rgba(93,187,70,0.15) 100%)" }} />

      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-14 mb-14">

          {/* Brand column */}
          <div>
            <Link href="/">
              <img src="/images/logo.webp" alt="10 Day Kitchens" className="h-16 w-auto brightness-0 invert" />
            </Link>
            <p className="text-white/60 text-sm mt-5 max-w-xs leading-relaxed">
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
                className="flex items-start gap-3 text-white/60 hover:text-[#5DBB46] transition-colors text-sm"
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
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 hover:border-[#5DBB46] hover:text-[#5DBB46] transition-all duration-200"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {navColumns.map((col) => (
              <div key={col.heading}>
                <p className="text-[#5DBB46] text-[10px] uppercase tracking-widest font-bold mb-5">
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-white/50 hover:text-white transition-colors text-sm leading-snug"
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
        <div className="border-t border-white/10 pt-8 flex flex-wrap gap-4 mb-8">
          {["Free Consultation", "10-Day Guarantee", "5-Year Warranty", "Licensed & Insured", "Family Owned"].map((badge) => (
            <span key={badge} className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/55">
              <span className="w-1 h-1 rounded-full bg-[#5DBB46]" />
              {badge}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-white/25 text-xs">
            &copy; {new Date().getFullYear()} 10 Day Kitchens LLC · LIC #10DAYDK757O5
          </p>
          <p className="text-white/40 text-xs">Lacey, WA · Kitchen &amp; Bath Remodeling</p>
        </div>
      </div>
    </footer>
  );
}
