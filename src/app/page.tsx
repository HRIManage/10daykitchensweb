import type { Metadata } from "next";
import {
  EditorialHero,
  TrustedPartners,
  ServicesEditorial,
  StatementSection,
  RecentProjectsHover,
  ProcessEditorial,
  CustomerReviews,
  TransformationSection,
  ClosingCTA,
} from "@/components/home";
import { createLocalBusinessSchema, createServiceSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kitchen & Bath Remodeling in Lacey, Olympia & Tacoma",
  description:
    "Kitchen and bath remodeling from Lacey, WA with a 10 business day program, full custom remodels, Fast Bath upgrades, and in-person showroom selections.",
  alternates: {
    canonical: "https://10daykitchens.com",
  },
  openGraph: {
    title: `${site.name} - Kitchen & Bath Remodeling in Lacey, Olympia and Tacoma`,
    description:
      "Kitchen and bath remodeling from Lacey, WA with a 10 business day program, custom remodels, Fast Bath upgrades, and showroom selections.",
    url: "https://10daykitchens.com",
  },
};

export default function Home() {
  const jsonLd = [
    createLocalBusinessSchema({
      url: "https://10daykitchens.com",
      description:
        "Kitchen and bath remodeling based in Lacey, serving Olympia, Tacoma, and the South Sound with full custom remodels, fast bath upgrades, and a 10 business day kitchen program.",
    }),
    createServiceSchema({
      name: "Kitchen and Bath Remodeling",
      description:
        "Kitchen and bath remodeling in Lacey, Olympia, Tacoma, and the South Sound, including full custom kitchen remodels, bathroom remodels, Fast Bath upgrades, and the 10 Day Kitchens Program.",
      url: "https://10daykitchens.com",
      serviceType: [
        "Kitchen Remodeling",
        "Bathroom Remodeling",
        "10 Business Day Kitchen Remodel",
        "Fast Bath Upgrades",
      ],
    }),
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Sticky hero - the content panel below rises up and over it on scroll */}
      <EditorialHero />
      <div className="relative z-10 rounded-t-[1.75rem] bg-cream shadow-[0_-28px_60px_-24px_rgba(43,39,35,0.35)]">
        <ServicesEditorial />
        <TrustedPartners />
        <StatementSection />
        <RecentProjectsHover />
        <ProcessEditorial />
        <TransformationSection />
        <CustomerReviews />
        <ClosingCTA />
      </div>
    </main>
  );
}
