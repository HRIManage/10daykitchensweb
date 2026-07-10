import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageCta from "@/components/PageCta";
import { blogPosts, getBlogPost } from "@/lib/blog";

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
    alternates: { canonical: `${BASE_URL}/resources/blog/${post.slug}` },
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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription,
    image: `${BASE_URL}${post.img}`,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "10 Day Kitchens",
    },
    publisher: {
      "@type": "Organization",
      name: "10 Day Kitchens",
    },
    mainEntityOfPage: `${BASE_URL}/resources/blog/${post.slug}`,
  };

  return (
    <main className="bg-paper text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <section className="bg-paper pt-[158px] sm:pt-[176px]">
        <div className="site-container max-w-5xl pb-12">
          <p className="eyebrow mb-4 block">{post.tag}</p>
          <h1 className="max-w-4xl text-[clamp(2.4rem,4.7vw,4.6rem)] leading-[1.04] text-ink">{post.title}</h1>
          <p className="mt-6 max-w-3xl text-[1rem] leading-8 text-ink-soft">{post.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-[12px] font-bold uppercase tracking-[0.12em] text-ink-soft">
            <span>{post.date}</span>
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
          <div className="space-y-6 text-[1.02rem] leading-8 text-ink-soft">
            {post.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 border-t border-line pt-6">
            <Link href="/resources/blog" className="text-[12px] font-bold uppercase tracking-[0.14em] text-brand-dark hover:text-brand">
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
