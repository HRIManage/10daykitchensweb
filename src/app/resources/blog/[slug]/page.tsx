import type { Metadata } from "next";
export { default, generateStaticParams } from "../../../blog/[slug]/page";
import { getBlogPost } from "@/lib/blog";

const BASE_URL = "https://10daykitchens.com";

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
