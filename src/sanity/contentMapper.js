import { PortableText } from "@portabletext/react";

const portableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-4 text-[1rem] leading-8 text-ink-soft">{children}</p>,
    h2: ({ children }) => <h2 className="mt-10 text-[clamp(2rem,4vw,3.5rem)] leading-[1.06] text-ink">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 text-[1.45rem] leading-tight text-ink">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-brand pl-5 text-[1.05rem] italic leading-8 text-ink">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-5 text-[1rem] leading-8 text-ink-soft">{children}</ul>,
    number: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-5 text-[1rem] leading-8 text-ink-soft">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const external = href.startsWith("http");

      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className="font-semibold text-brand-dark underline underline-offset-4 transition hover:text-brand"
        >
          {children}
        </a>
      );
    },
  },
};

export function renderPortableBlocks(blocks, components = portableTextComponents) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;
  return <PortableText value={blocks} components={components} />;
}

export function mapLandingPageToProps(page) {
  if (!page) {
    return {
      seo: null,
      hero: null,
      sections: [],
    };
  }

  return {
    seo: {
      title: page.seo?.metaTitle || page.title || "",
      description: page.seo?.metaDescription || "",
      slug: page.slug || "",
    },
    hero: {
      title: page.title || "",
      image: page.heroImage?.asset?.url || null,
      imageAlt: page.heroImage?.alt || page.title || "",
      body: renderPortableBlocks(page.bodyText),
    },
    sections: [
      {
        type: "features",
        items: Array.isArray(page.features)
          ? page.features.map((feature) => ({
              id: feature._key,
              title: feature.title || "",
              body: feature.description || "",
              icon: feature.icon || null,
            }))
          : [],
      },
    ],
    raw: page,
  };
}

export { portableTextComponents };
