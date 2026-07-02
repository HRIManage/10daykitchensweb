import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections | Materials & Brands | 10 Day Kitchens",
  description:
    "Five material categories. Brands we believe in. Cabinetry, countertops, tile & stone, fixtures & hardware, and shower & bath — every sample available before you decide.",
};

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
