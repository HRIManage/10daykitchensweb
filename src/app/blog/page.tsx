export const metadata = {
  title: "Blog & Advice | 10 Day Kitchens",
  description:
    "Expert remodeling insights from the 10 Day Kitchens team. Kitchen design tips, financing guides, and real project stories to help you plan your perfect remodel.",
};

const featured = {
  tag: "Project Story",
  title: "The 10-Day Black & White Kitchen: A Chehalis Transformation",
  excerpt:
    "A family in Chehalis reached out after watching their kitchen age for 15 years. Outdated cabinets, worn countertops, and a layout that no longer worked for how they lived. Here's exactly what happened over 10 business days — and the stunning result.",
  img: "/images/ba-after-chehalis.jpg",
  date: "March 10, 2026",
  readTime: "5 min read",
};

const posts = [
  {
    tag: "Design Tips",
    title: "How to Choose the Right Cabinet Color for Your Kitchen",
    excerpt:
      "Cabinet color sets the entire mood of your kitchen. We break down the most popular palettes — and what they say about how you live.",
    img: "/images/kitchen-ethos-walnut.jpg",
    date: "February 28, 2026",
    readTime: "4 min read",
    slug: "choosing-cabinet-colors",
  },
  {
    tag: "Financing",
    title: "HELOC vs. Cash-Out Refi: Which Is Right for Your Remodel?",
    excerpt:
      "Tapping into home equity is one of the smartest ways to fund a renovation. Here's how to decide between a HELOC and a cash-out refinance.",
    img: "/images/cta-bg.jpg",
    date: "February 14, 2026",
    readTime: "6 min read",
    slug: "heloc-vs-cash-out-refi",
  },
  {
    tag: "Materials",
    title: "Quartz vs. Granite: Which Countertop Is Right for You?",
    excerpt:
      "Both are beautiful, but they behave very differently over time. We help you make the call based on how your family actually uses the kitchen.",
    img: "/images/gallery-marble-countertop.jpg",
    date: "January 30, 2026",
    readTime: "5 min read",
    slug: "quartz-vs-granite",
  },
  {
    tag: "Kitchen Tips",
    title: "5 Signs It's Time to Remodel Your Kitchen",
    excerpt:
      "Worn cabinets and outdated layouts aren't just cosmetic problems — they affect how you use your home every single day. Here's when to act.",
    img: "/images/gallery-whistler-frost.jpg",
    date: "January 15, 2026",
    readTime: "3 min read",
    slug: "signs-time-to-remodel",
  },
  {
    tag: "Process",
    title: "What to Expect During Your 10-Day Kitchen Remodel",
    excerpt:
      "Day-by-day, here's exactly what happens from the moment our crew arrives to the final walkthrough — and how we keep your home livable throughout.",
    img: "/images/gallery-butcher-block.jpg",
    date: "December 20, 2025",
    readTime: "7 min read",
    slug: "what-to-expect-10-day-remodel",
  },
  {
    tag: "Bath Tips",
    title: "Small Bathroom, Big Impact: Design Strategies That Work",
    excerpt:
      "Limited square footage doesn't mean limited style. These layout and material choices can make any bathroom feel twice as large.",
    img: "/images/gallery-luxury-bath.png",
    date: "December 5, 2025",
    readTime: "4 min read",
    slug: "small-bathroom-design-tips",
  },
];

export default function BlogPage() {
  return (
    <main>
      {/* ─── Section 1: Hero ─────────────────────────────────────────── */}
      <section className="bg-[#1C1C1C] pt-[90px] py-20 px-16">
        <p className="eyebrow" style={{ color: "rgba(93,187,70,0.70)" }}>
          Tips, Advice &amp; Inspiration
        </p>
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "72px",
            fontWeight: 500,
            color: "#ffffff",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginTop: "0.75rem",
          }}
        >
          Blog &amp; Advice
        </h1>
        <p
          className="max-w-xl mt-4"
          style={{ color: "rgba(255,255,255,0.60)", fontSize: "1rem", lineHeight: 1.7 }}
        >
          Expert remodeling insights from the 10 Day Kitchens team. Kitchen design tips,
          financing guides, and real project stories to help you plan your perfect remodel.
        </p>
      </section>

      {/* ─── Section 2: Featured Post ────────────────────────────────── */}
      <section className="bg-[#F7FAF5] pt-20 pb-8 px-16">
        <p className="eyebrow text-center mb-8">Featured Article</p>

        <div className="max-w-6xl mx-auto bg-white rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-[0_4px_40px_rgba(0,0,0,0.08)]">
          {/* Image */}
          <div className="relative">
            <img
              src={featured.img}
              alt={featured.title}
              className="w-full h-full object-cover"
              style={{ minHeight: "350px" }}
            />
          </div>

          {/* Content */}
          <div className="p-10 flex flex-col justify-center">
            <span className="inline-block bg-[#5DBB46]/10 text-[#5DBB46] text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4 self-start">
              {featured.tag}
            </span>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "32px",
                fontWeight: 500,
                color: "#111111",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
              }}
            >
              {featured.title}
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "#777777" }}
            >
              {featured.excerpt}
            </p>
            <a
              href="/blog/chehalis-kitchen-transformation"
              className="inline-block bg-[#111111] text-white rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-[#5DBB46] transition-all self-start"
            >
              Read the Story
            </a>
            <p className="text-xs mt-4" style={{ color: "#aaaaaa" }}>
              {featured.date} · {featured.readTime}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Section 3: All Posts Grid ───────────────────────────────── */}
      <section className="bg-[#F7FAF5] py-8 px-16 pb-24">
        <p className="eyebrow text-center mb-10">All Articles</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl overflow-hidden border border-[rgba(17,17,17,0.07)] hover:shadow-lg transition-shadow duration-300 flex flex-col group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-white/90 text-[#111] text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  {post.tag}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.15rem",
                    fontWeight: 500,
                    color: "#111111",
                    marginBottom: "0.75rem",
                    lineHeight: 1.4,
                  }}
                >
                  {post.title}
                </h3>
                <p className="text-[#777] text-sm leading-relaxed flex-1">{post.excerpt}</p>
                <div className="flex justify-between items-center mt-5 pt-4 border-t border-[rgba(17,17,17,0.06)]">
                  <p className="text-xs text-[#aaa]">
                    {post.date} · {post.readTime}
                  </p>
                  <a
                    href={`/blog/${post.slug}`}
                    className="text-xs font-semibold text-[#5DBB46] uppercase tracking-wider hover:underline"
                  >
                    Read →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ─── Section 4: CTA ──────────────────────────────────────────── */}
      <section className="bg-[#1C1C1C] py-16 px-16 text-center">
        <p className="eyebrow" style={{ color: "rgba(255,255,255,0.50)" }}>
          Ready to Start?
        </p>
        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "40px",
            fontWeight: 500,
            color: "#ffffff",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginTop: "0.5rem",
          }}
        >
          Turn Inspiration Into Reality
        </h2>
        <p
          className="text-base max-w-lg mx-auto mt-4"
          style={{ color: "rgba(255,255,255,0.60)", lineHeight: 1.7 }}
        >
          Schedule a free consultation and we&rsquo;ll help you plan your perfect kitchen or bath
          transformation.
        </p>
        <a
          href="/contact"
          className="mt-6 inline-block bg-[#5DBB46] text-white rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-[#4aa836] transition-all"
        >
          Schedule Free Consultation
        </a>
      </section>
    </main>
  );
}
