# 10 Day Kitchens - Claude Code Rules

## Project

This is the production website for 10 Day Kitchens.

- GitHub repo: `https://github.com/HRIManage/10daykitchensweb`
- Clone URL: `https://github.com/HRIManage/10daykitchensweb.git`
- Main branch: `main`
- Framework: Next.js 16 App Router
- Runtime: React 19
- Styling: Tailwind CSS v4
- Deployment: Vercel

This project is code-first. It does not use Sanity or any headless CMS.

## Core Role

Act as an autonomous website editor for this project. Update website text, images, service details, portfolio content, contact details, and location pages while preserving the existing architecture.

Do not rewrite the app structure, add a CMS, change the design system, or introduce new dependencies unless the user explicitly asks.

## Common Edit Locations

- Homepage: `src/app/page.tsx`
- Site metadata/layout: `src/app/layout.tsx`
- Global styles: `src/app/globals.css`
- Shared homepage sections: `src/components/`
- Navigation: `src/components/Navbar.tsx`
- Footer: `src/components/Footer.tsx`
- Services section: `src/components/ServicesSection.tsx`
- Kitchen remodel page: `src/app/kitchen-remodel/page.tsx`
- Bathroom remodel page: `src/app/bathroom-remodel/page.tsx`
- Portfolio page: `src/app/portfolio/page.tsx`
- Contact page: `src/app/contact/page.tsx`
- FAQ page: `src/app/faq/page.tsx`
- Financing page: `src/app/financing/page.tsx`
- Location pages: `src/app/locations/[slug]/page.tsx`
- Images and logos: `public/images/`

## Location Pages

Location content lives in the `locationsBySlug` map inside:

```txt
src/app/locations/[slug]/page.tsx
```

When adding a new location:

1. Add a new entry to `locationsBySlug`.
2. Use a clean slug such as `olympia`, `tacoma`, or `university-place`.
3. Use existing images from `public/images/` unless new assets are provided.
4. Write a specific `heading`, `metaTitle`, and `metaDescription`.
5. Keep the existing object structure intact.

## Editing Workflow

When given a content or page update:

1. Inspect the relevant existing file first.
2. Modify only the requested content, image references, or closely related layout.
3. Keep the same TypeScript structures and styling patterns.
4. Avoid broad refactors.
5. Run verification before finishing:

```bash
npm run typecheck
npm run build
```

Use `npm run lint` when the change touches React/TypeScript code. Lint may show existing warnings about `<img>` usage; warnings are acceptable unless new errors are introduced.

## Git Workflow

Before committing:

```bash
git status
npm run typecheck
npm run build
```

If checks pass:

```bash
git add .
git commit -m "Describe the change"
git push origin main
```

Do not run destructive git commands such as `git reset --hard`, `git clean`, or force pushes unless the user explicitly requests them.

## Deployment

The site deploys from the `main` branch on Vercel. After pushing to GitHub, Vercel should redeploy automatically if the GitHub/Vercel connection is active.

If deployment fails, check:

1. `npm run build`
2. Vercel build logs
3. Missing environment variables
4. TypeScript errors

There are currently no Sanity environment variables required.

## Code Style

- TypeScript strict mode.
- Avoid `any`.
- Use PascalCase for components.
- Use camelCase for variables and functions.
- Prefer existing components before creating new ones.
- Use Tailwind utility classes and existing color/spacing patterns.
- Keep copy clear, local, and conversion-focused.
- Use real images from `public/images/`; avoid placeholders.

## Safety Rules

- Do not reintroduce Sanity, GROQ, CMS schemas, or CMS fetch helpers.
- Do not commit `.env`, `.env.local`, `.next/`, `node_modules/`, or local generated output.
- Do not remove existing user content unless the request clearly asks for it.
- If a requested edit is ambiguous, make the smallest reasonable change and explain the assumption.
