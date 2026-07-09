# 10 Day Kitchens Website Agent Guide

## Project Overview

This is the production website for 10 Day Kitchens. It is a Next.js 16 App Router project using React 19, TypeScript, Tailwind CSS v4, Framer Motion, and static/local content.

This project no longer uses Sanity or any headless CMS. Do not add Sanity code, Sanity environment variables, GROQ queries, or CMS fetch helpers unless the owner explicitly asks to reintroduce a CMS.

## Commands

- `npm run dev` - Start the local development server
- `npm run build` - Production build
- `npm run lint` - ESLint check
- `npm run typecheck` - TypeScript check
- `npm run check` - Run lint, typecheck, and build

## Editing Workflow

1. Read the existing page or component before editing.
2. Keep edits scoped to the requested change.
3. Reuse existing components, assets, spacing, and color patterns.
4. For visual changes, verify desktop and mobile layouts.
5. Run `npm run typecheck` and `npm run build` before finishing.
6. Mention any command that could not be run.

## Common Files

- Homepage: `src/app/page.tsx`
- Root layout and metadata: `src/app/layout.tsx`
- Global styles: `src/app/globals.css`
- Shared sections: `src/components/`
- Kitchen remodel page: `src/app/kitchen-remodel/page.tsx`
- Bathroom remodel page: `src/app/bathroom-remodel/page.tsx`
- Portfolio page: `src/app/portfolio/page.tsx`
- Contact page: `src/app/contact/page.tsx`
- Location pages: `src/app/locations/[slug]/page.tsx`
- Images and logos: `public/images/`

## Content Model

Most site content is currently hardcoded in page/component files. Location page content lives in the `locationsBySlug` map in `src/app/locations/[slug]/page.tsx`.

When adding a new location page:

1. Add a new entry to `locationsBySlug`.
2. Use a clean URL slug such as `olympia` or `university-place`.
3. Use existing images from `public/images/` unless the owner provides new assets.
4. Keep metadata specific to the city or service area.

## Code Style

- TypeScript strict mode.
- Avoid `any`.
- Use named exports for reusable components/utilities.
- Use PascalCase for React components.
- Use camelCase for variables and functions.
- Prefer Tailwind utility classes and existing design tokens.
- Keep components readable and focused.
- Do not introduce broad refactors while making small content or design edits.

## Design Direction

This is a contractor/remodeling website. The design should feel polished, trustworthy, practical, and conversion-focused.

- Keep content clear and scannable.
- Use real project imagery from `public/images/`.
- Keep forms and calls to action easy to find.
- Preserve responsive behavior.
- Avoid generic placeholder text.

## Git Safety

- Do not run destructive git commands unless explicitly requested.
- Do not revert user changes.
- Check `git status` before committing.
- Commit only files related to the requested change.

## Next.js 16 Note

This project uses Next.js 16, which may differ from older Next.js conventions. If changing framework-specific behavior, check the installed docs in `node_modules/next/dist/docs/` after dependencies are installed.
