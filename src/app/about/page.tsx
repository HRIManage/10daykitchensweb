const stats = [
  { num: '800+', label: 'Homes Remodeled' },
  { num: '35+', label: 'Years Experience' },
  { num: '5-Year', label: 'Warranty on Every Project' },
  { num: '100%', label: 'Satisfaction Guarantee' },
];

const values = [
  {
    title: 'Trust & Respect',
    desc: "We believe in maintaining clear communication and fulfilling our promises. As experts in home renovations, we understand that you depend on our knowledge to navigate your project smoothly.",
  },
  {
    title: 'Accountability & Communication',
    desc: "Every decision is communicated clearly. You'll always know where your project stands — no surprises, no excuses.",
  },
  {
    title: 'Schedules & Budgets Matter',
    desc: "We set realistic timelines and stick to them. Your time and money are investments we take seriously.",
  },
  {
    title: 'Protect Your Living Space',
    desc: "We treat your home with the same care we'd want for our own. Clean jobsite, careful handling, and respectful crew every day.",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-[90px] bg-[#1C1C1C] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/project-forest-kitchen.jpg"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C]/60 to-[#1C1C1C]" />
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-16 py-24">
          <span className="eyebrow text-[#5DBB46]/70 mb-4 block">About 10 Day Kitchens</span>
          <h1
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(48px,5vw,80px)',
              color: 'white',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
            }}
          >
            Your Neighbors.<br />Your Experts.
          </h1>
          <p className="text-white/60 text-lg max-w-xl mt-6 leading-relaxed">
            Locally owned and operated in Lacey, WA, proudly serving the community since 2004.
            Dedicated to providing families with high-quality home transformations in just 10 days.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#5DBB46] py-10">
        <div className="flex justify-center gap-16 flex-wrap max-w-4xl mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="text-center px-8">
              <p
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: '3rem',
                  color: 'white',
                  fontWeight: 500,
                }}
              >
                {s.num}
              </p>
              <p className="text-white/80 text-xs uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-white py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-screen-xl mx-auto px-16">
          <div>
            <span className="eyebrow mb-4 block">Our Story</span>
            <h2
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: '48px',
                color: '#111111',
                fontWeight: 500,
              }}
            >
              10 Day Kitchens
            </h2>
            <p className="text-[#777777] leading-relaxed mt-4 mb-6" style={{ fontSize: '17px' }}>
              10 Day Kitchens is a revolutionary home renovation service that specializes in
              transforming your space in just 10 days. We understand that a home is where your heart
              is, and we&apos;re here to make your home both beautiful and functional.
            </p>
            <p className="text-[#777777] leading-relaxed mb-6" style={{ fontSize: '17px' }}>
              Whether you&apos;re dreaming of a sleek, modern design or a cozy, traditional space,
              we provide high-quality, customized solutions that cater to your specific needs and
              style.
            </p>
            <p className="text-[#777777] leading-relaxed" style={{ fontSize: '17px' }}>
              Our team of experienced designers, project managers, and skilled craftsmen work
              efficiently to deliver stunning results in a fraction of the time it typically takes
              for a remodel. With a focus on excellent customer service, transparency, and
              craftsmanship, we ensure your home renovation is hassle-free, fast, and finished to
              perfection.
            </p>
            <a
              href="/contact"
              className="mt-8 inline-block bg-[#5DBB46] text-white rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-[#4aa836] transition-all"
            >
              Work With Us
            </a>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3]">
            <img
              src="/images/project-coastal-calm.jpg"
              alt="Coastal calm kitchen"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#EEF4EB] py-24 px-16">
        <div className="text-center mb-16">
          <span className="eyebrow mb-4 block">Our Values</span>
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: '48px',
              fontWeight: 500,
              color: '#111111',
            }}
          >
            What We Stand For
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white rounded-2xl p-8 border border-[rgba(17,17,17,0.07)]"
            >
              <div className="w-10 h-10 bg-[#5DBB46]/10 rounded-full flex items-center justify-center mb-4">
                <div className="w-3 h-3 bg-[#5DBB46] rounded-full" />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: '22px',
                  fontWeight: 500,
                  color: '#111111',
                  marginBottom: '0.75rem',
                }}
              >
                {v.title}
              </h3>
              <p className="text-[#777777] text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team CTA */}
      <section className="bg-[#1C1C1C] py-24 px-16 text-center">
        <span className="eyebrow text-white/50 mb-4 block">Join the Family</span>
        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: '48px',
            fontWeight: 500,
            color: 'white',
          }}
        >
          Start Your Project
        </h2>
        <p className="text-white/60 text-lg max-w-xl mx-auto mt-4">
          Interested in working together? Provide a few details about your project and we&apos;ll
          reach out shortly to discuss your vision.
        </p>
        <a
          href="/contact"
          className="mt-8 inline-block bg-[#5DBB46] text-white rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-[#4aa836] transition-all"
        >
          Contact Us
        </a>
      </section>
    </main>
  );
}
