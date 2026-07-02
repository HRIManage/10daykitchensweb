import DayByDayTimeline from "@/components/DayByDayTimeline";

const pricingCards = [
  {
    tier: "Small Kitchen",
    price: "$30,000 – $45,000+",
    desc: "Perfect for galley kitchens and compact layouts. Full 10-Day transformation with all premium inclusions.",
    img: "/images/gallery-quartz-backsplash.jpg",
    featured: false,
  },
  {
    tier: "Medium Kitchen",
    price: "$45,000 – $65,000",
    desc: "Our most popular package. Ideal for standard family kitchens with open-concept potential.",
    img: "/images/kitchen-ethos-walnut.jpg",
    featured: true,
  },
  {
    tier: "Large Kitchen",
    price: "$65,000 – $80,000+",
    desc: "For expansive kitchens with islands, custom storage, and premium material selections.",
    img: "/images/gallery-marble-countertop.jpg",
    featured: false,
  },
];

const processSteps = [
  { num: "01", title: "Vision & Consultation", desc: "In-home visit. We listen to your goals and must-haves." },
  { num: "02", title: "3D Design & Fixed Quote", desc: "Full rendering and binding contract before anything starts." },
  { num: "03", title: "Precision Pre-Staging", desc: "Every material ordered and inspected before Day 1." },
  { num: "04", title: "The 10-Day Build", desc: "Our crew on site every day. Clean progress, no delays." },
  { num: "05", title: "Final Walkthrough", desc: "We don't close until you've approved every detail." },
];

const galleryImages = [
  { src: "/images/gallery-whistler-frost.jpg", alt: "Whistler Frost kitchen" },
  { src: "/images/kitchen-ethos-walnut.jpg", alt: "Ethos walnut kitchen" },
  { src: "/images/gallery-quartz-backsplash.jpg", alt: "Quartz backsplash kitchen" },
  { src: "/images/gallery-marble-countertop.jpg", alt: "Marble countertop kitchen" },
  { src: "/images/gallery-butcher-block.jpg", alt: "Butcher block kitchen" },
  { src: "/images/project-forest-kitchen.jpg", alt: "Forest kitchen project" },
];

export default function KitchenRemodelPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-[90px] bg-[#1C1C1C] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/kitchen-ethos-walnut.jpg"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C]/60 to-[#1C1C1C]" />
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-16 py-24">
          <span className="eyebrow text-[#5DBB46]/70 mb-4 block">Kitchen Remodeling · Lacey, WA</span>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(48px,5vw,80px)",
              color: "white",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Kitchen
            <br />
            Remodel
          </h1>
          <p className="text-white/60 text-lg max-w-xl mt-6 leading-relaxed">
            Transform your kitchen with our expert remodeling services. Innovative design combined with superior
            craftsmanship — seamless from planning to final installation.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-block bg-[#5DBB46] text-white rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-[#4aa836] transition-all"
          >
            Schedule Free Consultation
          </a>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="bg-white py-24 px-16">
        <div className="text-center">
          <span className="eyebrow block mb-4">10-Day Package</span>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(36px,3.5vw,52px)",
              letterSpacing: "-0.02em",
              fontWeight: 500,
              color: "#111111",
            }}
          >
            Choose Your Kitchen
          </h2>
          <p className="text-[#777777] text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            All packages include: Packout · Demo · Semi-custom cabinetry · Quartz countertops · LVP flooring · New
            appliances · Installation in just 10 business days!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
          {pricingCards.map((card) => (
            <div
              key={card.tier}
              className={`rounded-2xl overflow-hidden border ${
                card.featured
                  ? "border-[#5DBB46] shadow-[0_0_0_2px_#5DBB46]"
                  : "border-[rgba(17,17,17,0.08)]"
              } bg-white flex flex-col`}
            >
              <div className="h-48 overflow-hidden">
                <img src={card.img} alt={card.tier} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 flex flex-col flex-1">
                {card.featured && <span className="eyebrow text-[#5DBB46] mb-2">Most Popular</span>}
                <h3
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.5rem",
                    fontWeight: 500,
                    color: "#111111",
                    marginBottom: "0.5rem",
                  }}
                >
                  {card.tier}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.75rem",
                    color: "#5DBB46",
                    fontWeight: 500,
                    marginBottom: "1rem",
                  }}
                >
                  {card.price}
                </p>
                <p className="text-[#777777] text-sm leading-relaxed flex-1">{card.desc}</p>
                <a
                  href="/contact"
                  className="mt-6 inline-block text-center bg-[#111111] text-white rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-[#5DBB46] transition-all"
                >
                  Get a Quote
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-[#777777] mt-6 italic">
          *Not all kitchens qualify for the 10 Day Package.{" "}
          <a href="/10businessdaykitchenprogram" className="text-[#5DBB46] hover:underline">
            View eligibility requirements.
          </a>
        </p>

        {/* Executive Remodel Box */}
        <div className="mt-12 max-w-5xl mx-auto bg-[#1C1C1C] rounded-2xl p-10 flex justify-between items-center flex-wrap gap-8">
          <div>
            <h3
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "28px",
                fontWeight: 500,
                color: "white",
                marginBottom: "0.5rem",
              }}
            >
              Executive Remodel Program
            </h3>
            <p className="text-white/60 text-sm max-w-lg leading-relaxed">
              Starting at $70,000+ · For projects beyond the scope of a 10-Day Remodel: custom cabinetry, luxury
              finishes, structural changes, layout changes, extensive electrical &amp; plumbing.
            </p>
          </div>
          <a
            href="/contact"
            className="bg-[#5DBB46] text-white rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-[#4aa836] transition-all whitespace-nowrap"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* 10-Day Timeline */}
      <DayByDayTimeline />

      {/* Process */}
      <section className="bg-white py-24 px-16">
        <div className="text-center mb-12">
          <span className="eyebrow block mb-4">Our Process</span>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(36px,3.5vw,52px)",
              letterSpacing: "-0.02em",
              fontWeight: 500,
              color: "#111111",
              marginBottom: "1rem",
            }}
          >
            How It Works
          </h2>
          <p className="text-[#777777] text-[17px] max-w-xl mx-auto leading-relaxed">
            We respect your time. Whether you choose our 10-Day Package or an Executive Remodel, our structured
            approach ensures a stress-free transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[rgba(17,17,17,0.08)] border-y border-[rgba(17,17,17,0.08)]">
          {processSteps.map((step) => (
            <div key={step.num} className="p-8 flex flex-col">
              <span
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "4.5rem",
                  lineHeight: 1,
                  color: "rgba(93,187,70,0.15)",
                  fontWeight: 500,
                  display: "block",
                  marginBottom: "1.5rem",
                }}
              >
                {step.num}
              </span>
              <h3 className="text-sm font-bold uppercase tracking-wide text-[#111111] mb-3 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm text-[#777777] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-[#F7FAF5] py-24 px-16">
        <div className="text-center mb-12">
          <span className="eyebrow block mb-4">Kitchen Gallery</span>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(36px,3.5vw,52px)",
              letterSpacing: "-0.02em",
              fontWeight: 500,
              color: "#111111",
            }}
          >
            Our Work
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {galleryImages.map((img) => (
            <div key={img.src} className="rounded-xl overflow-hidden aspect-[4/3]">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
