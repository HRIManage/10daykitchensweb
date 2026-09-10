import type { Metadata } from "next";
import BathroomEstimator from "@/components/BathroomEstimator";

export const metadata: Metadata = {
  title: "Free Bathroom Remodel Estimate",
  description:
    "Build a bathroom remodel plan and get a free instant planning estimate from 10 Day Kitchens.",
  alternates: { canonical: "https://10daykitchens.com/bathroom-estimator" },
  robots: { index: false, follow: true },
};

export default function BathroomEstimatePage() {
  return <BathroomEstimator />;
}
