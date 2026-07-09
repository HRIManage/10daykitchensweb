# 10 Day Kitchens Website

Next.js website for 10 Day Kitchens, including service pages, portfolio content, contact flows, financing, FAQ, and local location landing pages.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Claude Code Easy Edit

Give your coworker this repo URL:

```txt
https://github.com/HRIManage/10daykitchensweb.git
```

Recommended coworker flow:

```bash
git clone https://github.com/HRIManage/10daykitchensweb.git
cd 10daykitchensweb
npm install
npm run dev
```

Then open the folder in Claude Code and ask for the exact change they want, for example:

```txt
Update the homepage hero copy and run npm run typecheck and npm run build before you finish.
```

Before sharing changes back:

```bash
npm run typecheck
npm run build
git status
git add .
git commit -m "Describe the change"
git push
```

## Common Edit Locations

- Homepage: `src/app/page.tsx`
- Main layout and metadata: `src/app/layout.tsx`
- Global styles: `src/app/globals.css`
- Shared page sections: `src/components/`
- Kitchen page: `src/app/kitchen-remodel/page.tsx`
- Bathroom page: `src/app/bathroom-remodel/page.tsx`
- Portfolio page: `src/app/portfolio/page.tsx`
- Contact page: `src/app/contact/page.tsx`
- Local location pages: `src/app/locations/[slug]/page.tsx`
- Images and logos: `public/images/`

## Important Notes

- This project uses a code-first architecture and no longer uses Sanity or any headless CMS.
- Location page content is stored directly in `src/app/locations/[slug]/page.tsx`.
- Do not commit `.env.local`, build output, or generated folders such as `.next/`.
- Prefer editing existing components before adding new dependencies.
- After visual changes, check mobile and desktop layouts.

## Scripts

```bash
npm run dev        # Start local dev server
npm run build      # Production build
npm run lint       # ESLint check
npm run typecheck  # TypeScript check
npm run check      # Lint, typecheck, and build
```

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Vercel deployment
- Code-first architecture, no headless CMS

## Project Structure

```txt
src/
  app/          Next.js App Router pages
  components/   Shared React sections and UI
  lib/          Utilities
public/
  images/       Site images and visual assets
docs/
  research/     Project research notes
```
