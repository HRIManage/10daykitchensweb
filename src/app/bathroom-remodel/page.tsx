const processSteps = [
  {
    num: "01",
    title: "Initial Consultation",
    desc: "We discuss your goals, style preferences, and must-haves — vanities, tile, fixtures, and storage.",
  },
  {
    num: "02",
    title: "Contract & Design",
    desc: "Clear contract and detailed design plan so you know exactly what to expect. No surprises.",
  },
  {
    num: "03",
    title: "Supplies & Materials",
    desc: "We meticulously order and inspect all materials for quality assurance before installation begins.",
  },
  {
    num: "04",
    title: "Delivery & Installation",
    desc: "Our crew delivers materials and completes your remodel in approximately 10 business days.",
  },
  {
    num: "05",
    title: "Final Walkthrough",
    desc: "We walk through every detail with you. We won't close out until it's exactly what you envisioned.",
  },
];

const galleryImages = [
  { src: "/images/gallery-luxury-bath.png", alt: "Luxury bathroom" },
  { src: "/images/gallery-essential-white-bath.jpg", alt: "Essential white bathroom" },
  { src: "/images/gallery-bath-view2.jpg", alt: "Bathroom view 2" },
  { src: "/images/gallery-oslo-white-bath.jpg", alt: "Oslo white bathroom" },
  { src: "/images/gallery-metropolitan-walnut.jpg", alt: "Metropolitan walnut bathroom" },
  { src: "/images/ba-after-bath.jpg", alt: "Before and after bathroom" },
];

export default function BathroomRemodelPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-[90px] bg-[#1C1C1C] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/bath-remodel.png"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C]/60 to-[#1C1C1C]" />
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-16 py-24">
          <span className="eyebrow text-[#5DBB46]/70 mb-4 block">
            Bathroom Remodeling · Pierce &amp; Thurston Counties
          </span>
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
            Bathroom
            <br />
            Remodel
          </h1>
          <p className="text-white/60 text-lg max-w-xl mt-6 leading-relaxed">
            Remodel your bathroom without the hassle. Expert craftsmanship, seamless process, and stress-free
            renovation from initial planning to final installation.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-block bg-[#5DBB46] text-white rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-[#4aa836] transition-all"
          >
            Schedule Free Consultation
          </a>
        </div>
      </section>

      {/* Intro Split */}
      <section className="bg-white py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 max-w-screen-xl mx-auto px-16 gap-16 items-center">
          <div className="rounded-2xl overflow-hidden aspect-[4/3]">
            <img
              src="/images/gallery-luxury-bath.png"
              alt="Luxury bathroom remodel"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="eyebrow block mb-4">Expert Bath Remodeling</span>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "48px",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "#111111",
                lineHeight: 1.08,
              }}
            >
              Your Dream Bathroom, Done Right
            </h2>
            <p
              style={{
                fontSize: "17px",
                color: "#777777",
                lineHeight: 1.7,
                marginTop: "1rem",
              }}
            >
              At 10 Day Kitchens, we&apos;ve built a process that respects your time, your home, and your investment.
              From the first conversation to the final walkthrough, every bathroom project is kept on schedule, on
              budget, and stress-free.
            </p>
            <a
              href="/contact"
              className="mt-8 inline-block bg-[#5DBB46] text-white rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-[#4aa836] transition-all"
            >
              Schedule Free Consultation
            </a>
          </div>
        </div>
      </section>

      {/* 5-Step Process */}
      <section className="bg-[#EEF4EB] py-24 px-16">
        <div className="text-center mb-12">
          <span className="eyebrow block mb-4">Our Process</span>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(36px,3.5vw,52px)",
              letterSpacing: "-0.02em",
              fontWeight: 500,
              color: "#111111",
            }}
          >
            From Consultation to Completion
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[rgba(17,17,17,0.08)] border-y border-[rgba(17,17,17,0.08)]">
          {processSteps.map((step) => (
            <div key={step.num} className="p-8 flex flex-col bg-white md:bg-transparent">
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

      {/* Bath Gallery */}
      <section className="bg-white py-24 px-16">
        <div className="text-center mb-12">
          <span className="eyebrow block mb-4">Bath Gallery</span>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(36px,3.5vw,52px)",
              letterSpacing: "-0.02em",
              fontWeight: 500,
              color: "#111111",
            }}
          >
            Recent Bathrooms
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

      {/* Service Area CTA */}
      <section className="bg-[#1C1C1C] py-16 px-16">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "32px",
                fontWeight: 500,
                color: "white",
                letterSpacing: "-0.02em",
              }}
            >
              Serving Pierce &amp; Thurston Counties
            </h3>
            <p className="text-white/60 text-sm mt-2">
              Lacey, Olympia, Tacoma, Chehalis and communities throughout Pierce &amp; Thurston Counties.
            </p>
          </div>
          <a
            href="/contact"
            className="bg-[#5DBB46] text-white rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-[#4aa836] transition-all whitespace-nowrap"
          >
            Get Your Free Quote
          </a>
        </div>
      </section>
    </main>
  );
}
