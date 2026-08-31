import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogContent from "@/components/BlogContent";
import PageCta from "@/components/PageCta";
import { blogPosts, formatBlogDate, getBlogPost } from "@/lib/blog";

const BASE_URL = "https://10daykitchens.com";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: { absolute: post.seoTitle },
    description: post.seoDescription,
    alternates: { canonical: `${BASE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      images: [{ url: post.img }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.seoDescription,
      image: `${BASE_URL}${post.img}`,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        "@type": "Organization",
        name: "10 Day Kitchens",
      },
      publisher: {
        "@type": "Organization",
        name: "10 Day Kitchens",
      },
      mainEntityOfPage: `${BASE_URL}/blog/${post.slug}`,
    },
  ];

  if (post.faqs?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    });
  }

  return (
    <main className="bg-paper text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-paper pt-[158px] sm:pt-[176px]">
        <div className="site-container max-w-5xl pb-12">
          <p className="eyebrow mb-4 block">{post.tag}</p>
          <h1 className="max-w-4xl text-[clamp(2.4rem,4.7vw,4.6rem)] leading-[1.04] text-ink">{post.title}</h1>
          <p className="mt-6 max-w-3xl text-[1rem] leading-8 text-ink-soft">{post.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-[12px] font-bold uppercase tracking-[0.12em] text-ink-soft">
            <span>{formatBlogDate(post.date)}</span>
            <span>|</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      <section className="bg-white pb-12">
        <div className="site-container max-w-5xl">
          <div className="relative aspect-[1.7/1] overflow-hidden border border-line bg-paper shadow-[0_24px_70px_rgba(43,39,35,0.10)]">
            <Image
              src={post.img}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 1024px) 80vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-paper py-14 sm:py-[4.5rem] lg:py-24">
        <div className="site-container max-w-3xl">
          <BlogContent body={post.body} />

          {post.faqs?.length ? (
            <div className="mt-14 border-t border-line pt-10">
              <h2 className="text-[1.9rem] leading-tight text-ink">Frequently asked questions</h2>
              <div className="mt-6">
                {post.faqs.map((faq) => (
                  <details key={faq.q} className="group border-b border-line">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                      <h3 className="text-[1.05rem] font-semibold text-ink transition-colors group-hover:text-brand-dark">
                        {faq.q}
                      </h3>
                      <span className="mt-1 text-xl leading-none text-brand-dark transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="max-w-2xl pb-6 text-[1rem] leading-relaxed text-ink-soft">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-10 border-t border-line pt-6">
            <Link href="/blog" className="text-[12px] font-bold uppercase tracking-[0.14em] text-brand-dark hover:text-brand">
              Back to blog
            </Link>
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Ready to Start?"
        title="Talk through your project with us."
        body="Schedule a free consultation and we will help you figure out the right remodel path, timeline, and next step."
        watermark="Advice"
      />
    </main>
  );
}
