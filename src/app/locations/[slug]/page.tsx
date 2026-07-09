import type { Metadata } from "next";
import { notFound } from "next/navigation";

type LocationImage = {
  url: string;
  alt: string;
};

type LocationPageData = {
  name: string;
  heading: string;
  body: string[];
  metaTitle: string;
  metaDescription: string;
  mainImage: LocationImage;
  images: LocationImage[];
};

type LocationPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const defaultLocation: LocationPageData = {
  name: "South Sound",
  heading: "Kitchen and Bathroom Remodeling in the South Sound",
  metaTitle: "South Sound Kitchen and Bathroom Remodeling | 10 Day Kitchens",
  metaDescription:
    "Cabinetry, countertops, kitchen remodeling, and bathroom remodeling for South Sound homeowners.",
  mainImage: {
    url: "/images/project-university-place.png",
    alt: "Bright remodeled kitchen with white cabinetry",
  },
  body: [
    "10 Day Kitchens helps homeowners plan and complete focused kitchen and bathroom upgrades with clear scheduling, practical selections, and polished installation.",
    "Our work includes cabinetry, countertops, bath updates, project coordination, and finish details for homes across the South Sound.",
    "Every project starts with the existing space, the homeowner's priorities, and a plan that keeps the remodel moving without unnecessary complexity.",
  ],
  images: [
    {
      url: "/images/project-forest-kitchen.jpg",
      alt: "Kitchen with dark cabinetry and warm wood accents",
    },
    {
      url: "/images/project-coastal-calm.jpg",
      alt: "Light coastal kitchen remodel",
    },
    {
      url: "/images/project-heritage-woods.png",
      alt: "Kitchen with heritage wood cabinetry",
    },
  ],
};

const locationsBySlug: Record<string, LocationPageData> = {
  "south-sound": defaultLocation,
  olympia: {
    ...defaultLocation,
    name: "Olympia",
    heading: "Kitchen and Bathroom Remodeling in Olympia",
    metaTitle: "Olympia Kitchen and Bathroom Remodeling | 10 Day Kitchens",
    metaDescription:
      "Kitchen cabinets, countertops, and bathroom remodeling services for Olympia homeowners.",
  },
  "university-place": {
    ...defaultLocation,
    name: "University Place",
    heading: "Kitchen and Bathroom Remodeling in University Place",
    metaTitle: "University Place Kitchen and Bathroom Remodeling | 10 Day Kitchens",
    metaDescription:
      "Cabinetry, countertop, kitchen, and bathroom remodeling services in University Place.",
  },
  dupont: {
    ...defaultLocation,
    name: "DuPont",
    heading: "Kitchen and Bathroom Remodeling in DuPont",
    metaTitle: "DuPont Kitchen and Bathroom Remodeling | 10 Day Kitchens",
    metaDescription:
      "Kitchen and bathroom remodel planning, cabinetry, and countertops for DuPont homes.",
  },
};

function getLocationBySlug(slug: string) {
  return locationsBySlug[slug] ?? null;
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return {};
  }

  return {
    title: location.metaTitle,
    description: location.metaDescription,
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      images: [
        {
          url: location.mainImage.url,
          alt: location.mainImage.alt,
        },
      ],
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

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

      <section className="px-6 pb-16 md:px-16">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-lg">
          <img
            src={location.mainImage.url}
            alt={location.mainImage.alt}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      </section>

      <section className="px-6 pb-24 md:px-16">
        <article className="mx-auto max-w-4xl space-y-6 text-lg leading-relaxed text-[#555555]">
          {location.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
      </section>

      {location.images.length > 0 && (
        <section className="bg-[#F7FAF5] px-6 py-20 md:px-16">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
            {location.images.map((image) => (
              <img
                key={image.url}
                src={image.url}
                alt={image.alt}
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
