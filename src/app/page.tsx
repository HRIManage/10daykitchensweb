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
    <main style={{
      background: "linear-gradient(to bottom, #ffffff 0%, #ffffff 18%, #F4FAF1 25%, #ffffff 35%, #ffffff 52%, #F6FBF4 60%, #ffffff 70%, #ffffff 85%, #F4FAF1 93%, #F0F9EC 100%)"
    }}>
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
