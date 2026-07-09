import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { sanityFetch } from "@/lib/sanity";

type PortableTextChild = {
  _key: string;
  _type: "span";
  text?: string;
  marks?: string[];
};

type PortableTextBlock = {
  _key: string;
  _type: "block";
  style?: "normal" | "h2" | "h3" | "h4" | "blockquote";
  children?: PortableTextChild[];
};

type LocationImage = {
  _key?: string;
  url: string;
  alt: string | null;
};

type LocationPageData = {
  name: string;
  heading: string;
  body: PortableTextBlock[];
  metaTitle: string | null;
  metaDescription: string | null;
  mainImage: LocationImage | null;
  images: LocationImage[];
};

type LocationPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const locationPageQuery = `*[_type == "location" && slug.current == $slug][0]{
  name,
  heading,
  body,
  metaTitle,
  metaDescription,
  "mainImage": mainImage{
    "url": asset->url,
    "alt": coalesce(alt, asset->originalFilename)
  },
  "images": images[]{
    _key,
    "url": asset->url,
    "alt": coalesce(alt, caption, asset->originalFilename)
  }
}`;

async function getLocationBySlug(slug: string) {
  return sanityFetch<LocationPageData | null, { slug: string }>({
    query: locationPageQuery,
    params: { slug },
  });
}

function renderChildren(children: PortableTextChild[] = []) {
  return children.map((child) => {
    const text = child.text ?? "";

    if (child.marks?.includes("strong")) {
      return <strong key={child._key}>{text}</strong>;
    }

    if (child.marks?.includes("em")) {
      return <em key={child._key}>{text}</em>;
    }

    return <span key={child._key}>{text}</span>;
  });
}

function PortableText({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="space-y-6 text-[#555555] text-lg leading-relaxed">
      {value.map((block) => {
        if (block.style === "h2") {
          return (
            <h2 key={block._key} className="text-3xl font-semibold text-[#111111] pt-6">
              {renderChildren(block.children)}
            </h2>
          );
        }

        if (block.style === "h3") {
          return (
            <h3 key={block._key} className="text-2xl font-semibold text-[#111111] pt-4">
              {renderChildren(block.children)}
            </h3>
          );
        }

        if (block.style === "blockquote") {
          return (
            <blockquote key={block._key} className="border-l-4 border-[#5DBB46] pl-5 italic text-[#333333]">
              {renderChildren(block.children)}
            </blockquote>
          );
        }

        return <p key={block._key}>{renderChildren(block.children)}</p>;
      })}
    </div>
  );
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = await getLocationBySlug(slug);

  if (!location) {
    return {};
  }

  return {
    title: location.metaTitle ?? location.heading,
    description: location.metaDescription ?? undefined,
    openGraph: {
      title: location.metaTitle ?? location.heading,
      description: location.metaDescription ?? undefined,
      images: location.mainImage?.url
        ? [
            {
              url: location.mainImage.url,
              alt: location.mainImage.alt ?? location.heading,
            },
          ]
        : undefined,
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = await getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  return (
    <main className="bg-white">
      <section className="px-6 pt-32 pb-20 md:px-16">
        <div className="mx-auto max-w-4xl">
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(42px,5vw,72px)",
              color: "#111111",
              fontWeight: 500,
              lineHeight: 1.05,
            }}
          >
            {location.heading}
          </h1>
        </div>
      </section>

      {location.mainImage?.url && (
        <section className="px-6 pb-16 md:px-16">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-lg">
            <img
              src={location.mainImage.url}
              alt={location.mainImage.alt ?? location.heading}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        </section>
      )}

      <section className="px-6 pb-24 md:px-16">
        <article className="mx-auto max-w-4xl">
          <PortableText value={location.body ?? []} />
        </article>
      </section>

      {location.images?.length > 0 && (
        <section className="bg-[#F7FAF5] px-6 py-20 md:px-16">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
            {location.images.map((image, index) => (
              <img
                key={image._key ?? image.url}
                src={image.url}
                alt={image.alt ?? `${location.name} project image ${index + 1}`}
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
