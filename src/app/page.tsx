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

export default function Home() {
  return (
      <main>
      <EditorialHero />
      <TrustedPartners />
      <ServicesEditorial />
      <StatementSection />
      <RecentProjectsHover />
      <ProcessEditorial />
      <CustomerReviews />
      <TransformationSection />
      <ClosingCTA />
    </main>
  );
}
