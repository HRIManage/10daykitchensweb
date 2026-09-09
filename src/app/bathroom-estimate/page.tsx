import type { Metadata } from "next";
import EstimateWizard from "@/components/estimate/EstimateWizard";

export const metadata: Metadata = {
  title: "Bathroom Remodel Estimate | 10 Day Kitchens",
  description: "Get a rough estimate for your bathroom project in about two minutes.",
  alternates: { canonical: "https://10daykitchens.com/bathroom-estimate" },
  robots: { index: false, follow: true },
};

export default function BathroomEstimatePage() {
  return (
    <main className="min-h-[70vh] bg-paper pt-[140px] text-ink sm:pt-[160px]">
      <EstimateWizard />
    </main>
  );
}
