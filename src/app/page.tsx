import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import GalleryStrip from "@/components/GalleryStrip";
import CtaBand from "@/components/CtaBand";
import PortfolioGrid from "@/components/PortfolioGrid";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <BeforeAfterSection />
      <ProcessSection />
      <PortfolioGrid />
      <TestimonialsSection />
      <GalleryStrip />
      <CtaBand />
      <ContactSection />
    </main>
  );
}
