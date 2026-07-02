const stats = [
  { num: '35+', label: 'Years of Experience' },
  { num: '10', label: 'Business Day Install' },
  { num: '5yr', label: 'Warranty on Every Project' },
  { num: '100%', label: 'Satisfaction Guarantee' },
];

const projects = [
  {
    title: 'Coastal Calm Kitchen in Steilacoom',
    location: 'Steilacoom, WA',
    type: 'Kitchen Remodel',
    img: '/images/project-coastal-calm.jpg',
    alt: 'Light blue coastal kitchen',
    desc: 'Soft coastal blues and crisp whites transform a dated kitchen into a serene, light-filled space.',
  },
  {
    title: 'The Modern Forest-Inspired Kitchen',
    location: 'Olympia, WA',
    type: 'Kitchen Remodel',
    img: '/images/project-forest-kitchen.jpg',
    alt: 'Forest-inspired dark kitchen',
    desc: 'Deep, nature-inspired tones with custom cabinetry bring drama and warmth to this Olympia home.',
  },
  {
    title: 'Midnight Blue Kitchen',
    location: 'South Sound, WA',
    type: 'Kitchen Remodel',
    img: '/images/project-midnight-blue.jpg',
    alt: 'Midnight blue navy kitchen',
    desc: 'Bold midnight blue cabinetry with gold hardware creates a striking, high-end aesthetic.',
  },
  {
    title: 'University Place Kitchen & Baths',
    location: 'University Place, WA',
    type: 'Kitchen & Bath',
    img: '/images/project-university-place.png',
    alt: 'White shaker kitchen',
    desc: 'A full home transformation — bright white shaker cabinets and quartz countertops throughout.',
  },
  {
    title: 'Heritage Woods Kitchen',
    location: 'DuPont, WA',
    type: 'Kitchen Remodel',
    img: '/images/project-heritage-woods.png',
    alt: 'Wood tone heritage kitchen',
    desc: 'Warm wood tones and natural finishes celebrate the heritage of this DuPont family home.',
  },
  {
    title: 'The 10-Day Black & White Kitchen',
    location: 'Chehalis, WA',
    type: 'Kitchen Remodel',
    img: '/images/ba-after-chehalis.jpg',
    alt: 'Black and white kitchen transformation',
    desc: 'A dramatic before-and-after: from dated to stunning in exactly 10 business days.',
  },
  {
    title: 'The Classic Modern Bath',
    location: 'University Place, WA',
    type: 'Bath Remodel',
    img: '/images/ba-after-bath.jpg',
    alt: 'Modern bathroom remodel',
    desc: 'Clean lines, bright tile work, and a frameless shower create a spa-worthy retreat.',
  },
];

export default function PortfolioPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-[90px] bg-[#1C1C1C] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/project-midnight-blue.jpg"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C]/60 to-[#1C1C1C]" />
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-16 py-24">
          <span className="eyebrow text-[#5DBB46]/70 mb-4 block">Our Work</span>
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
            Real Kitchens.<br />Real Results.
          </h1>
          <p className="text-white/60 text-lg max-w-xl mt-6 leading-relaxed">
            Most projects completed in 10 business days. Browse our kitchen and bath transformations
            from Pierce, Thurston, and Lewis Counties.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#5DBB46] py-8">
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

      {/* Projects grid */}
      <section className="bg-[#F7FAF5] py-24 px-16">
        <div className="text-center mb-12">
          <span className="eyebrow mb-4 block">Browse All Projects</span>
          <h2
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: '48px',
              fontWeight: 500,
              color: '#111111',
            }}
          >
            Our Portfolio
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl overflow-hidden bg-white border border-[rgba(17,17,17,0.07)] hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 right-4 bg-white/90 text-[#111111] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">
                  {p.type}
                </span>
              </div>
              <div className="p-6">
                <p className="text-[#777777] text-xs uppercase tracking-wider mb-2">
                  {p.location}
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontSize: '1.15rem',
                    fontWeight: 500,
                    color: '#111111',
                    marginBottom: '0.5rem',
                  }}
                >
                  {p.title}
                </h3>
                <p className="text-[#777777] text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1C1C1C] py-20 px-16 text-center">
        <span className="eyebrow text-white/50 mb-4 block">Ready to Start?</span>
        <h2
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: '48px',
            fontWeight: 500,
            color: 'white',
          }}
        >
          Your Transformation<br />Awaits
        </h2>
        <p className="text-white/60 text-lg max-w-xl mx-auto mt-4">
          Join hundreds of South Sound homeowners who&apos;ve trusted 10 Day Kitchens with their
          most important space.
        </p>
        <a
          href="/contact"
          className="mt-8 inline-block bg-[#5DBB46] text-white rounded-full px-10 py-5 text-sm font-bold uppercase tracking-wider hover:bg-[#4aa836] transition-all"
        >
          Schedule Free Consultation
        </a>
      </section>
    </main>
  );
}
