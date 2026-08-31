import type { MetadataRoute } from "next";
import { getPublishedCities } from "@/lib/cities";
import { blogPosts } from "@/lib/blog";

const BASE_URL = "https://10daykitchens.com";

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

const staticRoutes: { path: string; priority: number; changeFrequency: ChangeFrequency }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/kitchen-remodel", priority: 0.9, changeFrequency: "monthly" },
  { path: "/bathroom-remodel", priority: 0.9, changeFrequency: "monthly" },
  { path: "/10-day-kitchen-program", priority: 0.8, changeFrequency: "monthly" },
  { path: "/fast-bath", priority: 0.7, changeFrequency: "monthly" },
  { path: "/portfolio", priority: 0.7, changeFrequency: "monthly" },
  { path: "/financing", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/appointments", priority: 0.6, changeFrequency: "yearly" },
  { path: "/about", priority: 0.5, changeFrequency: "yearly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/collections", priority: 0.5, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const cityEntries: MetadataRoute.Sitemap = getPublishedCities().map((city) => ({
    url: `${BASE_URL}/kitchen-remodel/${city.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => {
    const parsed = new Date(post.date);
    return {
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: Number.isNaN(parsed.getTime()) ? now : parsed,
      changeFrequency: "yearly",
      priority: 0.5,
    };
  });

  return [...staticEntries, ...cityEntries, ...blogEntries];
}
