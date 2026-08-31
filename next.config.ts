import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      // --- Canonical URL cleanup (remove cloning artifacts) ---
      {
        source: "/contact-1",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/faq-1",
        destination: "/faq",
        permanent: true,
      },
      {
        source: "/10businessdaykitchenprogram",
        destination: "/10-day-kitchen-program",
        permanent: true,
      },
      {
        source: "/resources/blog",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/resources/blog/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },

      // --- Legacy URLs from the previous site ---
      {
        source: "/washington/thurston-county/lacey",
        destination: "/kitchen-remodel/lacey",
        permanent: true,
      },
      {
        source: "/services/kitchen-remodel",
        destination: "/kitchen-remodel",
        permanent: true,
      },
      {
        source: "/washington",
        destination: "/",
        permanent: true,
      },
      {
        source: "/services/cabinet-wholesale",
        destination: "/resources/catalog",
        permanent: true,
      },
      {
        source: "/home-renovation/12-kitchen-remodel-design-ideas",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/",
        permanent: true,
      },
      {
        source: "/services/custom-kitchen-cabinets",
        destination: "/kitchen-remodel",
        permanent: true,
      },
      {
        source: "/washington/thurston-county/tumwater",
        destination: "/kitchen-remodel/tumwater",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/portfolio",
        permanent: true,
      },
      {
        source: "/home-renovation/winter-kitchen-remodel",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/washington/pierce-county/university-place",
        destination: "/kitchen-remodel/university-place",
        permanent: true,
      },
      {
        source: "/home-renovation",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/washington/lewis-county/chehalis",
        destination: "/kitchen-remodel/chehalis",
        permanent: true,
      },
      {
        source: "/services/home-office-remodel",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/services/bathroom-remodeling",
        destination: "/bathroom-remodel",
        permanent: true,
      },
      {
        source: "/washington/thurston-county/olympia",
        destination: "/kitchen-remodel/olympia",
        permanent: true,
      },
      {
        source: "/washington/pierce-county/lakewood",
        destination: "/kitchen-remodel/lakewood",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
