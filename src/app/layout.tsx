import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "10 Day Kitchens | Kitchen & Bath Remodeling in Lacey & Olympia, WA",
  description:
    "Transform your home with 10 Day Kitchens. Expert kitchen and bathroom remodeling in Lacey, Olympia, Tacoma and surrounding areas — completed in just 10 business days. Get your free consultation today.",
  keywords: "kitchen remodeling, bathroom remodeling, Lacey WA, Olympia WA, 10 day kitchens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full antialiased bg-sage text-ink">{children}</body>
    </html>
  );
}
