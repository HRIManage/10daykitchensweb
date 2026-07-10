import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Check, Ruler, ShieldCheck, Sparkles, Wrench, X } from "lucide-react";
import { CONTAINER } from "@/components/layout";
import { CustomerReviews } from "@/components/home";
import PageCta from "@/components/PageCta";
import { createServiceSchema } from "@/lib/seo";

const SECTION = "py-14 sm:py-[4.5rem] lg:py-24";

export const metadata: Metadata = {
  title: "Custom Kitchen Remodel Lacey WA | Olympia & Tacoma",
  description:
    "Full custom kitchen remodels in Lacey, Olympia, Tacoma, Thurston County, and Pierce County. Layout changes, structural work, custom cabinetry, plumbing, electrical, and premium kitchen renovation planning.",
  alternates: {
    canonical: "https://10daykitchens.com/kitchen-remodel",
  },
  openGraph: {
    title: "Custom Kitchen Remodel Lacey WA | 10 Day Kitchens",
    description:
      "Full custom kitchen remodels in Lacey, Olympia, Tacoma, Thurston County, and Pierce County with layout changes, premium cabinetry, and guided planning.",
    url: "https://10daykitchens.com/kitchen-remodel",
  },
};

const benefits = [
  {
    icon: Ruler,
    title: "Layout freedom",
    body: "Rework the kitchen around how you cook, gather, store, and move through the home.",
  },
  {
    icon: Wrench,
    title: "Trade coordination",
    body: "Plumbing, electrical, structural, cabinetry, counters, flooring, and finish work are planned together.",
  },
  {
    icon: Sparkles,
    title: "Custom selections",
    body: "Choose cabinetry, surfaces, hardware, lighting, tile, appliances, and details beyond a fixed package.",
  },
  {
    icon: ShieldCheck,
    title: "Built with confidence",
    body: "Licensed, insured, and backed by our 5-year workmanship warranty for long-term peace of mind.",
  },
];

const process = [
  {
    step: "01",
    title: "Design consultation",
    body: "We study your kitchen, goals, wish list, budget range, timeline, and whether your remodel needs layout, trade, or structural changes.",
  },
  {
    step: "02",
    title: "Scope and feasibility",
    body: "We clarify what is possible, what needs engineering or permitting, and whether the project fits a full custom remodel or the 10 Day Kitchens Program.",
  },
  {
    step: "03",
    title: "Selections and planning",
    body: "Cabinetry, counters, flooring, backsplash, fixtures, lighting, and finishes are organized before construction begins.",
  },
  {
    step: "04",
    title: "Construction schedule",
    body: "Our team coordinates trades, deliveries, site prep, demolition, installation, and inspections around a realistic custom remodel timeline.",
  },
  {
    step: "05",
    title: "Final walkthrough",
    body: "We review the finished kitchen with you, confirm details, and close the project only after the work is ready to enjoy.",
  },
];

const included = [
  "Kitchen design guidance and finish planning",
  "Custom cabinetry and storage solutions",
  "Countertops, backsplash, flooring, fixtures, and hardware",
  "Plumbing and electrical coordination when required",
  "Wall removal, layout changes, and structural coordination when approved",
  "Project management, scheduling, installation, and final walkthrough",
];

const notIncluded = [
  "A guaranteed 10 business day completion timeline",
  "Pricing based on a fixed package before scope is defined",
  "Skipping permits, inspections, or engineering when required",
  "Mid-project changes without schedule and cost review",
];

const faqs = [
  {
    question: "What makes this different from the 10 Day Kitchens Program?",
    answer:
      "A full custom kitchen remodel is for projects that change the layout, move plumbing or electrical, remove walls, add structural work, or require fully customized selections. The 10 Day Kitchens Program is for qualified kitchens that keep the same footprint and use approved selections.",
  },
  {
    question: "Do custom kitchen remodels take longer than 10 business days?",
    answer:
      "Usually, yes. Custom remodels often involve trade coordination, permits, inspections, custom cabinetry, and larger construction scopes. We create a realistic schedule once the design and scope are clear.",
  },
  {
    question: "Do you serve Olympia and Tacoma?",
    answer:
      "Yes. We provide kitchen remodeling in Lacey, Olympia, Tacoma, Thurston County, Pierce County, and nearby South Sound communities.",
  },
  {
    question: "Can you help me decide which kitchen service fits?",
    answer:
      "Yes. During the consultation, we look at your layout, goals, budget, and timeline to determine whether you need a full custom kitchen remodel or qualify for the faster 10 Day Kitchens Program.",
  },
];

function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`mb-4 block text-[13px] font-bold uppercase tracking-[0.24em] text-brand ${className}`}>
      {children}
    </span>
  );
}

function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-[52px] items-center justify-center gap-2 bg-brand px-4 py-3 text-center text-[11px] font-bold uppercase tracking-[0.11em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-brand-dark hover:shadow-[0_16px_34px_rgba(93,187,70,0.3)] sm:gap-3 sm:px-7 sm:text-[12px] sm:tracking-[0.15em]"
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

function OutlineButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-[52px] items-center justify-center border border-line bg-white/55 px-4 py-3 text-center text-[11px] font-bold uppercase tracking-[0.11em] text-ink transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:text-brand-dark sm:px-7 sm:text-[12px] sm:tracking-[0.15em]"
    >
      {children}
    </Link>
  );
}

export default function KitchenRemodelPage() {
  const jsonLd = createServiceSchema({
    name: "Full Custom Kitchen Remodel",
    description:
      "Full custom kitchen remodeling in Lacey, Olympia, Tacoma, Thurston County, and Pierce County for projects that include layout changes, moved plumbing or electrical, structural work, and custom cabinetry.",
    url: "https://10daykitchens.com/kitchen-remodel",
    serviceType: [
      "Custom Kitchen Remodel",
      "Kitchen Renovation",
      "Kitchen Design",
      "Kitchen Construction",
    ],
  });

  return (
    <main className="bg-paper text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-paper pt-[158px] sm:pt-[176px]">
        <div className={`${CONTAINER} grid gap-10 pb-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-center xl:min-h-[610px] xl:pb-18`}>
          <div className="max-w-2xl">
            <Eyebrow>Custom Kitchen Remodel Lacey, WA</Eyebrow>
            <h1 className="max-w-3xl text-[clamp(2.55rem,4.7vw,4.75rem)] leading-[1.02] text-ink">
              Full custom kitchen remodels for homes ready to change.
            </h1>
            <p className="mt-6 max-w-xl text-[1rem] leading-8 text-ink-soft">
              Premium kitchen remodeling in Lacey, Olympia, Tacoma, Thurston County, and Pierce County for projects
              that need layout changes, custom cabinetry, electrical, plumbing, or structural planning.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href="/contact">Schedule free consultation</PrimaryButton>
              <OutlineButton href="/10businessdaykitchenprogram">Compare 10 day program</OutlineButton>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[1.18/1] overflow-hidden border border-line bg-white shadow-[0_26px_80px_rgba(43,39,35,0.12)]">
              <Image
                src="/images/Premium White Oak Showcase Kitchen (1).png"
                alt="Full custom kitchen remodel with white cabinetry and island"
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative bg-[#2A2A2A] p-5 text-white shadow-[0_20px_60px_rgba(43,39,35,0.18)] sm:absolute sm:-bottom-8 sm:left-10 sm:w-[390px] sm:p-6">
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-light">Best fit for</p>
              <p className="mt-3 text-[0.96rem] font-semibold leading-7 text-white/82">
                Layout changes, moved trades, custom cabinetry, and larger kitchen renovation scopes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${SECTION} bg-paper`}>
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-center`}>
          <div>
            <Eyebrow>Premium custom service</Eyebrow>
            <h2 className="font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em]">
              When your kitchen needs more than a refresh.
            </h2>
          </div>
          <div className="space-y-5 text-[1rem] leading-8 text-ink-soft">
            <p>
              Some kitchens can be transformed quickly by keeping the same footprint. Others need a deeper plan.
              Our full custom kitchen remodel service is built for homeowners who want to change how the kitchen
              lives, not just how it looks.
            </p>
            <p>
              If your project includes moving plumbing, relocating electrical, removing walls, changing the layout,
              or building a custom cabinet plan, this is the right kitchen remodel path.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className={`${CONTAINER} grid grid-cols-1 border-y border-line md:grid-cols-4`}>
          {benefits.map((benefit) => (
            <div key={benefit.title} className="group border-b border-line py-8 md:border-b-0 md:border-r md:px-7 md:last:border-r-0">
              <benefit.icon className="mb-7 size-6 text-brand transition-transform duration-300 group-hover:-translate-y-1" />
              <h3 className="text-[1.65rem] leading-tight transition-colors group-hover:text-brand-dark">{benefit.title}</h3>
              <p className="mt-4 text-sm leading-7 text-ink-soft">{benefit.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${SECTION} bg-paper`}>
        <div className={`${CONTAINER} grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center`}>
          <div className="relative aspect-[1.45/1] overflow-hidden border border-line bg-white">
            <Image
              src="/images/Fluted Wood Kitchen.png"
              alt="Completed custom kitchen remodel with island seating"
              fill
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="bg-white p-7 shadow-[0_18px_70px_rgba(43,39,35,0.08)] sm:p-10">
            <Eyebrow>Full-service remodel</Eyebrow>
            <h2 className="font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em]">
              A kitchen plan built around your home, not a package.
            </h2>
            <p className="mt-5 text-base leading-8 text-ink-soft">
              We use the consultation to separate design ideas from construction realities, then build a custom scope
              that matches your layout, materials, schedule, and investment.
            </p>
          </div>
        </div>
      </section>

      <section className={`${SECTION} bg-paper`}>
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start`}>
          <div className="lg:sticky lg:top-36">
            <Eyebrow>How custom kitchen remodeling works</Eyebrow>
            <h2 className="font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em]">A clear path for complex projects.</h2>
            <p className="mt-6 max-w-md text-base leading-8 text-ink-soft">
              Custom work needs tighter planning, not more guesswork. We define the scope early so your remodel can
              move with confidence.
            </p>
          </div>
          <div className="grid gap-0 border-y border-line">
            {process.map((item) => (
              <div key={item.step} className="group grid gap-5 border-b border-line py-7 last:border-b-0 sm:grid-cols-[76px_1fr]">
                <span className="font-serif-alt text-5xl leading-none text-brand/28">{item.step}</span>
                <div>
                  <h3 className="text-[1.65rem] leading-tight transition-colors group-hover:text-brand-dark">{item.title}</h3>
                  <p className="mt-3 max-w-2xl text-[0.96rem] leading-8 text-ink-soft">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${SECTION} bg-white`}>
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-2`}>
          <div>
            <Eyebrow>What is included</Eyebrow>
            <h2 className="font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em]">Designed around your actual scope.</h2>
            <div className="mt-8 grid gap-4">
              {included.map((item) => (
                <div key={item} className="flex gap-3 border-t border-line pt-4 text-[0.98rem] leading-7 text-ink-soft">
                  <Check className="mt-1 size-4 flex-none text-brand" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-sand p-8 sm:p-10">
            <Eyebrow>What is not included</Eyebrow>
            <h3 className="text-[2rem] leading-tight">Not a fixed 10 day package.</h3>
            <p className="mt-5 text-base leading-8 text-ink-soft">
              Custom kitchen remodeling gives you more design freedom, but the timeline depends on the scope,
              materials, permits, inspections, and trade work required.
            </p>
            <div className="mt-8 grid gap-4">
              {notIncluded.map((item) => (
                <div key={item} className="flex gap-3 border-t border-line pt-4 text-[0.95rem] leading-7 text-ink-soft">
                  <X className="mt-1 size-4 flex-none text-brand-dark" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${SECTION} bg-paper`}>
        <div className={`${CONTAINER} grid gap-10 border border-line bg-white p-7 shadow-[0_24px_70px_rgba(43,39,35,0.08)] sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center`}>
          <div>
            <Eyebrow>Looking for a faster kitchen remodel?</Eyebrow>
            <h2 className="font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em] text-ink">
              Your kitchen may qualify for the 10 Day Kitchens Program.
            </h2>
          </div>
          <div>
            <p className="text-base leading-8 text-ink-soft">
              If you love your current kitchen layout and do not need plumbing, electrical, appliances, walls, or
              structural components moved, our 10 Day Kitchens Program may be the faster, more affordable path.
            </p>
            <div className="mt-8">
              <PrimaryButton href="/10businessdaykitchenprogram">Explore the program</PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      <section className={`${SECTION} bg-paper`}>
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[0.7fr_1fr]`}>
          <div>
            <Eyebrow>Kitchen remodel FAQs</Eyebrow>
            <h2 className="font-display text-[clamp(1.85rem,3.1vw,3rem)] font-medium leading-[1.08] tracking-[-0.015em]">Clear answers before you remodel.</h2>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-xl font-bold text-ink">
                  {faq.question}
                  <span className="text-brand transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-3xl text-[0.96rem] leading-8 text-ink-soft">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CustomerReviews />

      <PageCta
        eyebrow="Ready to plan your kitchen remodel?"
        title="Visit our Lacey showroom or book a consultation."
        body="Tell us what you want to change, and we will help you choose the service path that fits your home, timeline, and investment."
        watermark="Kitchen"
      />
    </main>
  );
}
