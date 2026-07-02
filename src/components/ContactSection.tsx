import { MapPin, Phone, Mail, ShieldCheck } from "lucide-react";
// import HoneyBookWidget removed
import Reveal from "@/components/motion/Reveal";

const contactDetails = [
  {
    icon: MapPin,
    label: "Visit Our Showroom",
    value: "8695 Martin Way E STE 101\nLacey, WA 98516",
    href: "https://maps.google.com/?q=8695+Martin+Way+E+STE+101,+Lacey,+WA+98516",
    external: true,
  },
  {
    icon: Phone,
    label: "Call or Text",
    value: "360-557-3444",
    href: "tel:+13605573444",
    external: false,
  },
  {
    icon: Mail,
    label: "Email",
    value: "office@10daykitchens.com",
    href: "mailto:office@10daykitchens.com",
    external: false,
  },
  {
    icon: ShieldCheck,
    label: "Licensed & Insured",
    value: "LIC #10DAYDK757O5 · Family Owned · 5-Year Warranty",
    href: null,
    external: false,
  },
] as const;

export default function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#E8F5E9] py-24 md:py-32">
      <div className="container section-pad relative z-10 grid grid-cols-1 gap-14 lg:grid-cols-[44%_56%] lg:gap-16 items-start">
        
        {/* LEFT — headline + interactive 2x2 hover card grid */}
        <div className="flex flex-col justify-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-white text-[#5DBB46] text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-6 border border-[rgba(17,17,17,0.06)] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5DBB46]" />
              Get In Touch
            </div>
          </Reveal>
          
          <Reveal delay={60}>
            <h2 className="text-[#111111] mb-5 tracking-tight font-extrabold leading-tight" style={{ fontSize: "clamp(36px,3.4vw,56px)" }}>
              Let&rsquo;s talk about your project.
            </h2>
          </Reveal>
          
          <Reveal delay={120}>
            <p className="text-[#777777] text-sm sm:text-base leading-relaxed max-w-md mb-10" style={{ fontFamily: "var(--font-manrope)" }}>
              Ready to transform your home? Schedule a complimentary in-home design consultation, visit our local showroom in Lacey, or give us a call directly. We&rsquo;re here to help you every step of the way.
            </p>
          </Reveal>

          {/* 2x2 Grid of Contact Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactDetails.map((item, i) => {
              const cardContent = (
                <div className="h-full bg-white/70 hover:bg-white rounded-md border border-[rgba(17,17,17,0.06)] hover:border-[#5DBB46]/30 p-6 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.03)] group flex flex-col h-full">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#EEF4EB] text-[#5DBB46] border border-[#5DBB46]/10 mb-4 transition-all duration-300 group-hover:bg-[#5DBB46] group-hover:text-white group-hover:scale-105 shrink-0 shadow-sm">
                    <item.icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 eyebrow mb-2 !text-[#777777] !text-[9px]">
                    <span className="w-1 h-1 rounded-full bg-[#5DBB46]"></span>
                    {item.label}
                  </span>
                  <span
                    className="block text-sm font-semibold text-[#111111] transition-colors duration-300 group-hover:text-[#5DBB46] mt-auto"
                    style={{ whiteSpace: "pre-line", fontFamily: "var(--font-manrope)", lineHeight: 1.45 }}
                  >
                    {item.value}
                  </span>
                </div>
              );

              return (
                <Reveal key={item.label} delay={200 + i * 80} className="h-full">
                  {item.href ? (
                    <a
                      href={item.href}
                      className="block h-full cursor-pointer focus:outline-none"
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {cardContent}
                    </a>
                  ) : (
                    <div className="h-full">{cardContent}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* RIGHT — minimalist form card */}
        <Reveal delay={150} className="lg:py-2 w-full">
          <div className="relative overflow-hidden rounded-md bg-white p-8 sm:p-12 border border-[rgba(17,17,17,0.07)] shadow-[0_8px_30px_rgba(0,0,0,0.03)] w-full">
            {/* Green accent edge along the card top */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1"
              style={{
                background: "linear-gradient(90deg, #5DBB46 0%, #4aa836 60%, rgba(93,187,70,0.2) 100%)",
              }}
            />
            
            <span className="text-[#5DBB46] text-[10px] font-bold uppercase tracking-wider block mb-2">
              Consultation Request
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-3 tracking-tight">
              Start Your Project
            </h3>
            <p className="text-xs sm:text-sm text-[#777777] mb-8 max-w-sm leading-relaxed" style={{ fontFamily: "var(--font-manrope)" }}>
              Submit your details below. Our local design team will follow up within 48 hours to schedule your complimentary in-home consult.
            </p>

            <div className="mt-4">
              {/* HoneyBook form */}
              <img height="1" width="1" style={{ display: "none" }} src="https://www.honeybook.com/p.png?pid=698386a789407f0007b175e0" loading="lazy" alt="" />
              <script dangerouslySetInnerHTML={{__html: `(function(h,b,s,n,i,p,e,t){
                  h._HB_=h._HB_||{};h._HB_.pid=i;
                  t=b.createElement(s);t.type='text/javascript';t.async=true;t.src=n;
                  e=b.getElementsByTagName(s)[0];e.parentNode.insertBefore(t,e);
                })(window,document,'script','https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js','698386a789407f0007b175e0');`}} />
            </div>

            <div className="border-t border-[rgba(17,17,17,0.06)] pt-6 mt-6 flex flex-col gap-2">
              <p className="text-center text-[10px] uppercase tracking-wider font-semibold text-[#777777]">
                ✓ Free Consultation &middot; ✓ No Obligation &middot; ✓ Responds within 48hrs
              </p>
              <p className="text-center text-[9px] italic text-[#999999] leading-relaxed max-w-xs mx-auto mt-2">
                Serving Lacey, Olympia, Tacoma, Chehalis and communities throughout Pierce &amp; Thurston Counties.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
