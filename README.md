# 10 Day Kitchens

Next.js website for 10 Day Kitchens, including service pages, portfolio content, contact flows, and Sanity-powered local location landing pages.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Sanity CMS for dynamic location landing pages
- Vercel deployment

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Environment Variables

Create a local `.env.local` file using `.env.example` as a guide:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your-sanity-api-read-token
```

Do not commit `.env.local` or any file containing real API tokens.

## Sanity Location Pages

Dynamic location pages live at:

```txt
/locations/[slug]
```

Example:

```txt
/locations/lacey-wa
```

The page fetches a Sanity document where:

```groq
_type == "location" && slug.current == $slug
```

The Sanity `location` schema includes:

- Location name
- Slug
- Meta title
- Meta description
- Main heading / H1
- Main image
- Body content
- Image gallery

## Scripts

```bash
npm run dev        # Start local dev server
npm run build      # Production build
npm run lint       # ESLint check
npm run typecheck  # TypeScript check
npm run check      # Lint, typecheck, and build
```

## Deployment

Deploy with Vercel from the `main` branch.

In Vercel, add these environment variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your-sanity-api-read-token
```

After adding or changing environment variables, redeploy the site.

## Project Structure

```txt
src/
  app/                 Next.js App Router pages
  app/locations/[slug] Sanity-powered location landing pages
  components/          React components
  lib/                 Utilities and Sanity fetch helper
  sanity/schemas/      Sanity schema definitions
public/
  images/              Site images and visual assets
docs/
  research/            Project research notes
```
# 10daykitchensweb
