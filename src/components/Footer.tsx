import Link from "next/link";

const navColumns = [
  {
    heading: "Services",
    links: [
      { label: "Kitchen Remodel", href: "/kitchen-remodel" },
      { label: "Bath Remodel", href: "/bathroom-remodel" },
      { label: "Our Projects", href: "/portfolio" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "FAQs", href: "/faq" },
      { label: "Financing", href: "/financing" },
      { label: "Blog / Advice", href: "/blog" },
      { label: "Collections", href: "/collections" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Book a Consultation", href: "/appointments" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#F7FAF5] border-t border-[rgba(0,0,0,0.06)] overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="flex justify-between items-start gap-12 flex-wrap">
          <div>
            <Link href="/">
              <img
                src="/images/logo.webp"
                alt="10 Day Kitchens"
                className="h-20 w-auto"
              />
            </Link>
            <p className="text-[#777777] text-sm mt-4 max-w-xs leading-relaxed">
              Beautiful, functional spaces built around your timeline.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-8 sm:gap-x-16">
            {navColumns.map((col) => (
              <div key={col.heading}>
                <p className="inline-flex items-center gap-1.5 text-[#5DBB46] text-xs uppercase tracking-widest font-semibold mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5DBB46]"></span>
                  {col.heading}
                </p>
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-[#444444] hover:text-[#111111] transition-colors mb-2.5"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[rgba(0,0,0,0.06)] mt-12 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-[#777777] text-sm">(360) 557-3444 · office@10daykitchens.com</p>
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#777777] hover:text-[#111111] text-sm transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#777777] hover:text-[#111111] text-sm transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>

        <div className="border-t border-[rgba(0,0,0,0.06)] mt-8 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-[#aaaaaa] text-xs">
            &copy; 2025 10 Day Kitchens LLC · LIC #10DAYDK757O5 · Licensed &amp; Insured
          </p>
          <p className="text-[#aaaaaa] text-xs">Lacey, WA · Kitchen &amp; Bath Remodeling</p>
        </div>
      </div>
    </footer>
  );
}
