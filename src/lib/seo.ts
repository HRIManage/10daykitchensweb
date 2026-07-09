import { site } from "@/lib/site";

type LocalBusinessOptions = {
  url: string;
  description?: string;
};

type ServiceSchemaOptions = {
  name: string;
  description: string;
  url: string;
  serviceType: string | string[];
  areaServed?: string[];
};

export function createLocalBusinessSchema({ url, description }: LocalBusinessOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": url,
    name: site.name,
    url,
    telephone: site.phone,
    email: site.email,
    image: "https://10daykitchens.com/images/hero-kitchen.png",
    description: description ?? site.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: "8695 Martin Way E STE 101",
      addressLocality: "Lacey",
      addressRegion: "WA",
      postalCode: "98516",
      addressCountry: "US",
    },
    areaServed: [
      "Lacey, WA",
      "Olympia, WA",
      "Tacoma, WA",
      "Thurston County, WA",
      "Pierce County, WA",
    ],
  };
}

export function createServiceSchema({
  name,
  description,
  url,
  serviceType,
  areaServed,
}: ServiceSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    serviceType,
    provider: createLocalBusinessSchema({ url: "https://10daykitchens.com", description: site.tagline }),
    areaServed: areaServed ?? [
      "Lacey, WA",
      "Olympia, WA",
      "Tacoma, WA",
      "Thurston County, WA",
      "Pierce County, WA",
    ],
  };
}
