import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections | Materials & Brands",
  description:
    "Explore cabinetry, countertops, tile and stone, fixtures, hardware, and shower and bath materials at the 10 Day Kitchens showroom in Lacey, WA.",
  alternates: {
    canonical: "https://10daykitchens.com/collections",
  },
};

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
