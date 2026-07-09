import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import HoneyBookWidget from "@/components/HoneyBookWidget";
import { HOME_CONSULT_URL, PHONE_CONSULT_URL } from "@/lib/honeybook";
import { createLocalBusinessSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact 10 Day Kitchens | Lacey Showroom & Consultations",
  description:
    "Contact 10 Day Kitchens for kitchen remodeling, bath remodeling, showroom visits, and free consultations in Lacey, Olympia, Tacoma, and the South Sound.",
  alternates: {
    canonical: "https://10daykitchens.com/contact",
  },
};

type InfoItem = {
  label: string;
  lines: {
    text: string;
    href?: string;
  }[];
};

type BookingOption = {
  badge?: string;
  title: string;
  duration: string;
  bestFor: string;
  details: string;
  cta: string;
  href?: string;
  available: boolean;
};

const infoColumns: InfoItem[] = [
  {
    label: "Address",
    lines: [
      { text: "8695 Martin Way E STE 101", href: site.mapsHref },
      { text: "Lacey, WA 98516", href: site.mapsHref },
    ],
  },
  {
    label: "Hours",
    lines: [
      { text: "Mon - Fri: 9:00 AM - 5:30 PM" },
      { text: "Sat: By appointment only" },
      { text: "Sun: Closed" },
    ],
  },
  {
    label: "Contact",
    lines: [
      { text: "(360) 557-3444", href: site.phoneHref },
      { text: "office@10daykitchens.com", href: `mailto:${site.email}` },
    ],
  },
];

const bookingOptions: BookingOption[] = [
  {
    title: "Book a Discovery Call",
    duration: "15 Minutes",
    bestFor: "Best for",
    details: "Quick questions about pricing, project fit, or whether the 10 Day process is right for your home.",
    cta: "Book Discovery Call",
    href: PHONE_CONSULT_URL,
    available: true,
  },
  {
    badge: "Recommended",
    title: "Book In-Home Consultation",
    duration: "45-60 Minutes",
    bestFor: "Best for",
    details: "Homeowners ready for measurements, a firmer project path, and material guidance based on the actual space.",
    cta: "Book In-Home Consultation",
    href: HOME_CONSULT_URL,
    available: true,
  },
  {
    title: "Showroom Consultation",
    duration: "Coming Soon",
    bestFor: "Best for",
    details: "A guided material and finish appointment in our Lacey showroom once this booking path opens.",
    cta: "Coming Soon",
    available: false,
  },
];

function ContactInfoGrid() {
  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {infoColumns.map((item) => (
        <div key={item.label}>
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand">{item.label}</p>
          <div className="mt-3 space-y-2.5">
            {item.lines.map((line) =>
              line.href ? (
                <a
                  key={`${item.label}-${line.text}`}
                  href={line.href}
                  target={line.href.startsWith("https") ? "_blank" : undefined}
                  rel={line.href.startsWith("https") ? "noreferrer" : undefined}
                  className="block text-[0.98rem] leading-7 text-ink transition hover:text-brand-dark"
                >
                  {line.text}
                </a>
              ) : (
                <p key={`${item.label}-${line.text}`} className="text-[0.98rem] leading-7 text-ink">
                  {line.text}
                </p>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ContactPage() {
  const jsonLd = [
    createLocalBusinessSchema({
      url: "https://10daykitchens.com/contact",
      description:
        "Contact 10 Day Kitchens for kitchen remodeling, bath remodeling, showroom visits, and free consultations in Lacey, Olympia, Tacoma, and the South Sound.",
    }),
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact 10 Day Kitchens",
      url: "https://10daykitchens.com/contact",
      mainEntity: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: site.phone,
        email: site.email,
        areaServed: ["Lacey, WA", "Olympia, WA", "Tacoma, WA", "South Sound, WA"],
        availableLanguage: "English",
      },
    },
  ];

  return (
    <main className="bg-paper text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-paper pt-[158px] sm:pt-[176px]">
        <div className="site-container grid min-h-[680px] gap-10 pb-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pb-18">
          <div className="max-w-2xl">
            <span className="eyebrow mb-5 block">Get Started</span>
            <h1 className="max-w-3xl text-[clamp(2.9rem,6vw,6.2rem)] leading-[0.96] text-ink">
              Ready to plan
              <br />
              <em className="font-medium italic text-brand-dark">something beautiful?</em>
            </h1>
            <p className="mt-7 max-w-xl text-[1.02rem] leading-8 text-ink-soft">
              Book a free consultation to discuss your vision, visit our showroom to experience materials in person,
              or send us a message below. We&apos;ll help you choose the right service path and next step.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact-form"
                className="group inline-flex h-[54px] items-center justify-center gap-3 bg-brand px-7 text-[12px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-brand-dark hover:shadow-[0_16px_34px_rgba(93,187,70,0.3)]"
              >
                Start Your Project
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#appointment-options"
                className="inline-flex h-[54px] items-center justify-center border border-line bg-white/60 px-7 text-[12px] font-bold uppercase tracking-[0.15em] text-ink transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:text-brand-dark"
              >
                View Appointments
              </a>
            </div>

          </div>

          <div className="relative">
            <div className="relative ml-auto aspect-[1.1/0.92] w-full max-w-[760px] overflow-hidden border border-line bg-white shadow-[0_26px_80px_rgba(43,39,35,0.12)]">
              <Image
                src="/images/Material Selection Boards.png"
                alt="Kitchen and bath material selection boards in the showroom"
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-10 left-0 z-10 w-[46%] min-w-[220px] overflow-hidden border-[8px] border-paper bg-white shadow-[0_22px_60px_rgba(43,39,35,0.18)]">
              <div className="relative aspect-[0.94/1]">
                <Image
                  src="/images/Design Review Meeting.png"
                  alt="Design consultation and planning meeting"
                  fill
                  sizes="(min-width: 1024px) 18vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="absolute bottom-7 right-7 max-w-[340px] bg-[#2A2A2A] p-6 text-white shadow-[0_24px_60px_rgba(43,39,35,0.18)] sm:p-7">
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-light">Book a Consultation</p>
              <p className="mt-4 text-[1.5rem] leading-tight text-white">
                Free project guidance before you commit to a remodel path.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/76">
                Discovery call, in-home consultation, or soon a dedicated showroom appointment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact-form" className="bg-paper py-14 sm:py-[4.5rem] lg:py-24">
        <div className="site-container grid gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-start">
          <div className="relative overflow-hidden bg-white px-7 py-8 shadow-[0_24px_70px_rgba(43,39,35,0.07)] sm:px-10 sm:py-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-[-8%] top-[18%] text-[clamp(8rem,18vw,15rem)] font-display italic leading-none text-brand/[0.05]"
            >
              Hello
            </div>

            <span className="eyebrow mb-5 block">Get Started</span>
            <h2 className="max-w-3xl text-[clamp(2.8rem,6vw,6rem)] leading-[0.96] text-ink">
              Visit our
              <br />
              <em className="font-medium italic text-brand-dark">showroom.</em>
            </h2>
            <p className="mt-7 max-w-2xl text-[1.02rem] leading-8 text-ink-soft">
              Book a free consultation to discuss your vision, compare service paths, and get clear next steps for
              your kitchen or bath remodel. We&apos;ll help you figure out whether you need a custom remodel, the 10 Day
              Kitchens Program, or a focused Fast Bath upgrade.
            </p>

            <div className="mt-10 border-t border-line pt-8">
              <ContactInfoGrid />
            </div>
          </div>

          <div className="overflow-hidden border-t-2 border-brand bg-[#2A2A2A] p-7 text-white shadow-[0_28px_80px_rgba(43,39,35,0.18)] sm:p-9">
            <div className="flex items-center gap-3 text-brand-light">
              <div className="flex size-11 items-center justify-center border border-white/14 bg-white/6">
                <CalendarDays className="size-5" />
              </div>
              <span className="text-[12px] font-bold uppercase tracking-[0.2em]">01 / Contact Form</span>
            </div>

            <h3 className="mt-7 text-[clamp(2rem,4vw,3rem)] leading-[1.04] text-white">Send us your project details.</h3>
            <p className="mt-5 max-w-xl text-[0.98rem] leading-8 text-white/76">
              Share what you want to change, and we&apos;ll help route you to the right appointment, service path, and
              timeline.
            </p>

            <div className="mt-7 border-t border-white/12 pt-7">
              <HoneyBookWidget />
            </div>

            <div className="mt-7 flex items-center gap-3 border-t border-white/12 pt-6 text-[12px] font-bold uppercase tracking-[0.14em] text-white/74">
              <Phone className="size-4 text-brand-light" />
              <a href={site.phoneHref} className="transition hover:text-brand-light">
                {site.phone}
              </a>
              <span className="text-white/28">|</span>
              <Mail className="size-4 text-brand-light" />
              <a href={`mailto:${site.email}`} className="transition hover:text-brand-light">
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="appointment-options" className="bg-[#eef4eb] py-14 sm:py-[4.5rem] lg:py-24">
        <div className="site-container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow mb-4 block">Appointment Options</span>
            <h2 className="text-[clamp(2.2rem,4vw,4rem)] leading-[1.04] text-ink">
              Book the conversation that fits where you are.
            </h2>
            <p className="mt-5 text-[1rem] leading-8 text-ink-soft">
              Choose a quick discovery call, an in-home consultation, or get ready for future showroom appointment
              scheduling.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {bookingOptions.map((option) => (
              <div
                key={option.title}
                className={`relative flex flex-col overflow-hidden bg-white shadow-[0_18px_48px_rgba(43,39,35,0.08)] ${
                  option.badge ? "border-2 border-brand" : "border border-line"
                }`}
              >
                {option.badge ? (
                  <span className="absolute right-6 top-6 bg-brand px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                    {option.badge}
                  </span>
                ) : null}

                <div className="p-7 sm:p-8">
                  <div className="flex size-11 items-center justify-center bg-[#eef4eb] text-brand">
                    {option.available ? <CalendarDays className="size-5" /> : <Clock3 className="size-5" />}
                  </div>
                  <h3 className="mt-6 text-[1.9rem] leading-tight text-ink">{option.title}</h3>
                  <div className="mt-4 inline-flex items-center gap-2 bg-[#eef4eb] px-3 py-2 text-[12px] font-bold uppercase tracking-[0.12em] text-brand-dark">
                    <Clock3 className="size-3.5" />
                    {option.duration}
                  </div>
                </div>

                <div className="flex flex-1 flex-col border-t border-line p-7 sm:p-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">{option.bestFor}</p>
                  <p className="mt-3 text-[0.98rem] leading-8 text-ink-soft">{option.details}</p>

                  <ul className="mt-6 space-y-3">
                    <li className="flex items-start gap-2.5 text-[0.98rem] leading-7 text-ink">
                      <Check className="mt-1 size-4 text-brand" />
                      Free and no commitment
                    </li>
                    <li className="flex items-start gap-2.5 text-[0.98rem] leading-7 text-ink">
                      <Check className="mt-1 size-4 text-brand" />
                      Clear next-step guidance
                    </li>
                    <li className="flex items-start gap-2.5 text-[0.98rem] leading-7 text-ink">
                      <Check className="mt-1 size-4 text-brand" />
                      Designed around your project stage
                    </li>
                  </ul>
                </div>

                <div className="border-t border-line p-7 sm:p-8">
                  {option.available && option.href ? (
                    <a
                      href={option.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex min-h-[56px] w-full items-center justify-center gap-3 px-6 text-[12px] font-bold uppercase tracking-[0.14em] transition-all duration-300 ${
                        option.badge
                          ? "bg-brand text-white hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_16px_34px_rgba(93,187,70,0.28)]"
                          : "border border-brand text-brand-dark hover:-translate-y-0.5 hover:bg-brand hover:text-white"
                      }`}
                    >
                      {option.cta}
                      <ArrowRight className="size-4" />
                    </a>
                  ) : (
                    <span className="inline-flex min-h-[56px] w-full items-center justify-center border border-line bg-[#f6f5f1] px-6 text-[12px] font-bold uppercase tracking-[0.14em] text-ink-soft">
                      {option.cta}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="showroom-map" className="bg-paper py-14 sm:py-[4.5rem] lg:py-24">
        <div className="site-container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow mb-4 block">Visit The Showroom</span>
            <h2 className="text-[clamp(2.2rem,4vw,4rem)] leading-[1.04] text-ink">
              See cabinets, counters, fixtures, and finish combinations in person.
            </h2>
            <p className="mt-5 text-[1rem] leading-8 text-ink-soft">8695 Martin Way E STE 101, Lacey, WA 98516</p>
          </div>

          <div className="mt-10 overflow-hidden border border-line bg-white shadow-[0_28px_90px_rgba(43,39,35,0.10)]">
            <div className="grid gap-0 lg:grid-cols-[0.34fr_0.66fr]">
              <div className="bg-[#2A2A2A] p-7 text-white sm:p-8">
                <div className="flex size-12 items-center justify-center border border-white/16 bg-white/6 text-brand-light">
                  <MapPin className="size-6" />
                </div>
                <h3 className="mt-6 text-[1.7rem] leading-tight">10 Day Kitchens Showroom</h3>
                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-white/78">
                  {"8695 Martin Way E STE 101\nLacey, WA 98516"}
                </p>
                <a
                  href={site.mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex min-h-[52px] items-center justify-center border border-white/24 px-6 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:border-brand hover:text-brand-light"
                >
                  Open in Google Maps
                </a>
              </div>

              <div className="relative min-h-[420px]">
                <iframe
                  title="10 Day Kitchens showroom map"
                  src="https://maps.google.com/maps?q=8695%20Martin%20Way%20E%20STE%20101%2C%20Lacey%2C%20WA%2098516&z=15&output=embed"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
