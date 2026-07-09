import Link from "next/link";
import InteriorHero from "@/components/InteriorHero";
import PageCta from "@/components/PageCta";
import { blogPosts, featuredPost } from "@/lib/blog";

export const metadata = {
  title: "Blog & Advice",
  description:
    "Expert remodeling insights from the 10 Day Kitchens team. Kitchen design tips, financing guides, and real project stories to help you plan your perfect remodel.",
  alternates: {
    canonical: "https://10daykitchens.com/resources/blog",
  },
};

export default function BlogPage() {
  const articles = blogPosts.filter((post) => post.slug !== featuredPost.slug);

  return (
    <main>
      <InteriorHero
        image="/images/Material Selection Boards.png"
        imageAlt="Kitchen and bath material selection boards"
        eyebrow="Tips, Advice & Inspiration"
        title="Blog & Advice"
        body="Expert remodeling insights from the 10 Day Kitchens team. Kitchen design tips, financing guides, and real project stories to help you plan your remodel."
        cta={{ label: "Read featured article", href: "#featured-article" }}
      />

      <section id="featured-article" className="bg-[#F7FAF5] pb-8 pt-20">
        <div className="site-container">
          <p className="eyebrow mb-8 text-center">Featured Article</p>

          <div className="mx-auto grid max-w-6xl grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-[0_4px_40px_rgba(0,0,0,0.08)] lg:grid-cols-2">
            <div className="relative">
              <img
                src={featuredPost.img}
                alt={featuredPost.title}
                className="h-full min-h-[350px] w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-10">
              <span className="mb-4 inline-block self-start rounded-full bg-[#5DBB46]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#5DBB46]">
                {featuredPost.tag}
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "32px",
                  fontWeight: 500,
                  color: "#111111",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  marginBottom: "1rem",
                }}
              >
                {featuredPost.title}
              </h2>
              <p className="mb-6 text-base leading-relaxed text-[#777777]">{featuredPost.excerpt}</p>
              <Link
                href={`/resources/blog/${featuredPost.slug}`}
                className="inline-block self-start rounded-full bg-[#111111] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-[#5DBB46]"
              >
                Read the Story
              </Link>
              <p className="mt-4 text-xs text-[#aaaaaa]">
                {featuredPost.date} | {featuredPost.readTime}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7FAF5] pb-24 pt-8">
        <div className="site-container">
          <p className="eyebrow mb-10 text-center">All Articles</p>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[rgba(17,17,17,0.07)] bg-white transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#111]">
                    {post.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.15rem",
                      fontWeight: 500,
                      color: "#111111",
                      marginBottom: "0.75rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {post.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-[#777]">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-[rgba(17,17,17,0.06)] pt-4">
                    <p className="text-xs text-[#aaa]">
                      {post.date} | {post.readTime}
                    </p>
                    <Link
                      href={`/resources/blog/${post.slug}`}
                      className="text-xs font-semibold uppercase tracking-wider text-[#5DBB46] hover:underline"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Ready to Start?"
        title="Turn inspiration into reality."
        body="Schedule a free consultation and we will help you plan your perfect kitchen or bath transformation."
        watermark="Advice"
      />
    </main>
  );
}
