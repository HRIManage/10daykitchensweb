import type { Metadata, Viewport } from "next";
import { Barlow, Manrope, Playfair_Display } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// TODO(typography sweep): Playfair Display is still referenced inline by
// pages not yet migrated to the Barlow display face. Remove once the full
// sweep across inner pages is complete.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://10daykitchens.com";
const SITE_DESCRIPTION =
  "Expert kitchen and bathroom remodeling in Lacey, Olympia, Tacoma and the South Sound — completed in just 10 business days. Family-owned, 35+ years, licensed & insured, with a 5-year warranty. Book your free consultation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "10 Day Kitchens | Kitchen & Bath Remodeling in Lacey & Olympia, WA",
    template: "%s | 10 Day Kitchens",
  },
  description: SITE_DESCRIPTION,
  applicationName: "10 Day Kitchens",
  authors: [{ name: "10 Day Kitchens" }],
  creator: "10 Day Kitchens",
  publisher: "10 Day Kitchens",
  keywords: [
    "kitchen remodeling",
    "bathroom remodeling",
    "kitchen remodel Lacey WA",
    "bath remodel Olympia WA",
    "10 day kitchen remodel",
    "cabinet installation",
    "countertops",
    "Tacoma remodeling",
    "South Sound remodeling",
    "Pierce County",
    "Thurston County",
  ],
  category: "Home Improvement",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "10 Day Kitchens",
    title: "10 Day Kitchens | Kitchen & Bath Remodeling Done in 10 Business Days",
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "A completed 10 Day Kitchens remodel in the South Sound",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "10 Day Kitchens | Kitchen & Bath Remodeling in 10 Business Days",
    description: SITE_DESCRIPTION,
    images: ["/images/hero-bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#5DBB46",
  colorScheme: "light",
};

/**
 * Structured data for search engines and AI answer engines.
 * HomeAndConstructionBusiness carries the NAP, service area, rating and
 * credentials; WebSite enables sitelinks. Kept in the server-rendered
 * <head>-adjacent body so crawlers see it without executing JS.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": `${SITE_URL}/#business`,
      name: "10 Day Kitchens",
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      telephone: "+1-360-557-3444",
      email: "office@10daykitchens.com",
      image: `${SITE_URL}/images/hero-bg.jpg`,
      logo: `${SITE_URL}/images/logo.webp`,
      priceRange: "$$",
      foundingDate: "1990",
      slogan: "Your dream kitchen & bath, done in 10 business days.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "8695 Martin Way E STE 101",
        addressLocality: "Lacey",
        addressRegion: "WA",
        postalCode: "98516",
        addressCountry: "US",
      },
      geo: { "@type": "GeoCoordinates", latitude: 47.0343, longitude: -122.7846 },
      areaServed: [
        "Lacey, WA",
        "Olympia, WA",
        "Tacoma, WA",
        "Chehalis, WA",
        "Pierce County, WA",
        "Thurston County, WA",
      ],
      knowsAbout: [
        "Kitchen remodeling",
        "Bathroom remodeling",
        "Custom cabinetry",
        "Countertop installation",
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "17:00",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "127",
        bestRating: "5",
      },
      sameAs: ["https://www.instagram.com", "https://www.facebook.com"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "10 Day Kitchens",
      publisher: { "@id": `${SITE_URL}/#business` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${barlow.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full antialiased bg-[#F7FAF5] text-[#111111]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <MotionConfig reducedMotion="user">
          <Navbar />
          {children}
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
