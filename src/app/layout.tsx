import type { Metadata } from "next";
import { Manrope, Barlow_Condensed, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";
import { site } from "@/lib/site";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  weight: ["500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://10daykitchens.com"),
  title: {
    default: `${site.name} - Kitchen & Bath Remodeling in ${site.serviceAreaShort}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Beautiful, functional kitchen and bath remodels installed in just 10 business days. Family owned since 2004, 35+ years of experience, 5-year warranty. Serving Pierce and Thurston Counties.",
  keywords: [
    "kitchen remodel",
    "bathroom remodel",
    "Lacey WA remodeling",
    "Olympia kitchen remodel",
    "Tacoma bathroom remodel",
    "10 day kitchens",
  ],
  openGraph: {
    title: `${site.name} - Dream Kitchens & Baths in 10 Days`,
    description:
      "Beautiful, functional kitchen and bath remodels installed in just 10 business days. Family owned since 2004.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${barlowCondensed.variable} ${cormorant.variable} h-full`}
    >
      <body className="min-h-full bg-[#f0efee] text-[#2b2723] antialiased">
        <Navbar />
        <ScrollRevealProvider />
        {children}
        <Footer />
      </body>
    </html>
  );
}
