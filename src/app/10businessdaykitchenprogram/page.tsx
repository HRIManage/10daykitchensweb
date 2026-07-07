const sections = [
  {
    num: "1",
    title: "Layout Requirements",
    items: [
      "Kitchen must remain the same basic footprint and layout.",
      "No relocation of plumbing, gas lines, appliances, load-bearing walls, or structural components.",
      "Cabinet configuration must match existing layout.",
    ],
  },
  {
    num: "2",
    title: "Countertops & Backsplash",
    items: [
      "Countertops must be solid surface material (quartz, granite, or approved solid surface product).",
      "Backsplash must be solid surface.",
      "Specialty tile, intricate patterns, or extended cure-time materials are excluded.",
    ],
  },
  {
    num: "3",
    title: "Electrical",
    items: [
      "No electrical changes permitted.",
      "No new circuits, panel upgrades, fixture relocations, or added outlets.",
      "Existing electrical must be code compliant at time of project start.",
    ],
  },
  {
    num: "4",
    title: "Plumbing",
    items: [
      "No plumbing relocation.",
      "Replacement of fixtures allowed only in existing locations.",
      "Existing plumbing must be functional and code compliant.",
    ],
  },
  {
    num: "5",
    title: "Flooring",
    items: [
      "Flooring must be Luxury Vinyl Plank (LVP) only.",
      "Subfloor must be level and in serviceable condition.",
      "Tile, hardwood, or specialty flooring systems are excluded.",
    ],
  },
  {
    num: "6",
    title: "Homeowner Cooperation & Site Access",
    items: [
      "Full access to the home during agreed work hours.",
      "Kitchen area must remain vacated during work hours.",
      "No minor children may be home alone during construction hours.",
      "Pets must be secured away from work zones.",
      "Driveway access required for deliveries and debris removal.",
    ],
  },
  {
    num: "7",
    title: "Selections & Materials",
    items: [
      "All selections must be finalized prior to contract execution.",
      "All materials must be ordered, delivered, inspected, and in Contractor possession prior to project start date.",
      "No mid-project material or design changes permitted.",
    ],
  },
  {
    num: "8",
    title: "Permits & Inspections",
    items: [
      "Required permits must be secured prior to project start.",
      "Inspection scheduling must not delay workflow.",
      "Delays caused by third-party agencies extend the timeline accordingly.",
    ],
  },
  {
    num: "9",
    title: "Scope Limitations",
    items: [
      "Painting limited to kitchen walls and ceiling only.",
      "No custom carpentry or built-ins.",
      "Appliances must be on site if being replaced.",
      "Structural modifications are excluded.",
    ],
  },
  {
    num: "10",
    title: "Interior Passage Doors & Base Trim",
    items: [
      "Replacement or installation may be included where feasible.",
      "Not guaranteed to be completed within the 10-business-day timeline package.",
      "Considered secondary finish components.",
      "May be completed immediately following the 10-day kitchen completion milestone without constituting delay.",
    ],
  },
  {
    num: "11",
    title: "Dry Rot, Hidden Damage & Hazardous Materials Disclaimer",
    items: [
      "Timeline contingent upon no discovery of dry rot, concealed damage, mold, pest damage, or structural deterioration.",
      "Additional time and cost apply if hidden conditions are discovered.",
      "Timeline contingent upon absence of asbestos-containing materials or hazardous substances.",
      "(As part of our preliminary process, we test for asbestos prior to beginning the project.)",
      "Licensed abatement required if hazardous materials are identified.",
      "Any abatement or clearance delays extend the timeline.",
    ],
    note: "Commitment to Efficiency: Contractor will maintain high efficiency, coordination, and workforce allocation to minimize delays once corrective work is completed.",
  },
  {
    num: "12",
    title: "Payment Terms",
    items: [
      "Progress payments must be made according to contract schedule.",
      "Payment delays may result in schedule delays.",
      "Timeline guarantee contingent upon timely payments.",
    ],
  },
];

export const metadata = {
  title: "10 Business Day Kitchen Program | 10 Day Kitchens",
  description:
    "Terms, conditions, and eligibility requirements for the 10 Business Day Kitchen Program. Learn what qualifies and how our 10-day guarantee works.",
};

export default function TenDayProgramPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#EEF4EB] pt-[90px] pb-12 px-8 text-center">
        <div className="max-w-3xl mx-auto py-12">
          <span className="eyebrow mb-4 block">Kitchen Remodel Program</span>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 500,
              color: "#111111",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            10 Business Day Kitchen Program
          </h1>
          <p
            className="mt-4 text-[#777777] text-lg"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Terms &amp; Conditions
          </p>
          <p className="mt-6 text-[#444444] text-base leading-relaxed max-w-xl mx-auto">
            Not all kitchens qualify for the 10 Business Day Package. The
            following terms define what is required for a kitchen to be eligible
            and what is included within the 10-day timeline guarantee.
          </p>
        </div>
      </section>

      {/* Terms list */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-12">
            {sections.map((s) => (
              <div key={s.num} className="border-b border-[rgba(17,17,17,0.08)] pb-12 last:border-0">
                <h2
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.5rem",
                    fontWeight: 500,
                    color: "#5DBB46",
                    marginBottom: "1rem",
                  }}
                >
                  {s.num}. {s.title}
                </h2>
                <ul className="flex flex-col gap-2.5">
                  {s.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-[#444444] text-[15px] leading-relaxed">
                      <span className="text-[#5DBB46] font-bold mt-0.5 flex-none">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {s.note && (
                  <p className="mt-5 text-[13px] text-[#777777] italic leading-relaxed border-l-2 border-[#5DBB46]/30 pl-4">
                    {s.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Definition + Commitment callout */}
      <section className="bg-[#EEF4EB] py-20 px-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-12">
          <div>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "2rem",
                fontWeight: 500,
                color: "#5DBB46",
                marginBottom: "1rem",
              }}
            >
              Definition of 10-Day Completion
            </h2>
            <p className="text-[#444444] text-[15px] leading-relaxed">
              The 10-business-day timeline applies to completion of a functional kitchen consistent with
              the agreed scope. Items outside defined scope, material delays, hidden conditions,
              third-party inspection delays, or homeowner-caused delays extend the completion timeline
              accordingly.
            </p>
          </div>
          <div>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "2rem",
                fontWeight: 500,
                color: "#5DBB46",
                marginBottom: "1rem",
              }}
            >
              Our Commitment
            </h2>
            <p className="text-[#444444] text-[15px] leading-relaxed">
              At 10 Day Kitchens, our mission is simple: build your dream kitchen quickly, efficiently,
              and with minimal disruption to your life. Our accelerated scheduling, coordinated trades,
              and disciplined workflow are all designed around that promise.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1C1C1C] py-24 px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="eyebrow text-[#5DBB46]/70 mb-4 block">Ready to Get Started?</span>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(32px,4vw,52px)",
              fontWeight: 500,
              color: "white",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            10 Business Days to a
            <br />
            Brand New Kitchen.
          </h2>
          <p className="text-white/60 text-base mt-6 leading-relaxed">
            Build a space you&rsquo;ll love without the long-term renovation stress.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-block bg-[#5DBB46] text-white rounded-full px-10 py-5 text-sm font-bold uppercase tracking-wider hover:bg-[#4aa836] transition-all shadow-[0_4px_20px_rgba(93,187,70,0.35)]"
          >
            Book a Free Consultation Today
          </a>
          <p className="text-white/30 text-xs mt-6">
            Not sure if your kitchen qualifies?{" "}
            <a href="/contact" className="text-[#5DBB46]/70 hover:text-[#5DBB46] underline transition-colors">
              Contact us and we&rsquo;ll assess your project for free.
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
