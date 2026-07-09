import { groq } from "@sanity/client";

export const landingPageBySlugQuery = groq`
  *[_type == "landingPage" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    "slug": slug.current,
    heroImage{
      alt,
      asset->{
        _id,
        url,
        metadata{
          dimensions,
          lqip
        }
      }
    },
    bodyText,
    features[]{
      _key,
      title,
      description,
      icon
    },
    seo{
      metaTitle,
      metaDescription
    }
  }
`;

export const pageSlugsQuery = groq`
  *[_type == "landingPage" && defined(slug.current)][]{
    "slug": slug.current
  }
`;
