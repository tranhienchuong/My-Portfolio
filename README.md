# Tran Hien Chuong — Portfolio

An English-first portfolio for an Applied AI Engineer, built with React, TypeScript, Vite, Tailwind CSS, and Radix-based UI primitives.

## Run locally

```bash
npm install
npm run dev
```

The main routes are:

- `/` — reference-led educational neo-brutalist portfolio homepage
- `/work/labor-law-ai` — Vietnamese Labor Law AI Assistant case study
- `/work/traffic-rl` — Multi-Agent Traffic Signal Control case study
- `/resume` — printable engineering résumé

## Update portfolio content

All personal copy, project evidence, images, and external links live in one typed content seam:

`src/portfolio/content.ts`

Public Gmail, phone, Facebook, and GitHub destinations are defined under `links`; updating them there refreshes the homepage, footer, and résumé together.

## Quality checks

```bash
npm run build:tokens
npm run validate:tokens
npm run lint
npm run build
```

## Architecture

- `src/portfolio/content.ts` — the stable content interface and its current static implementation.
- `src/pages` — route-level composition for the homepage, case studies, résumé, and 404.
- `src/components/site` — navigation, footer, and route-level behavior.
- `src/components/ui` — reusable shadcn-style primitives.
- `src/components/portfolio` — portfolio-specific composition patterns.
- `tokens/design-tokens.json` — primitive, semantic, and component tokens.
- `scripts/build-tokens.mjs` — generates CSS variables while preserving aliases.
- `docs/design-system.md` — visual, accessibility, and component rules.
- `docs/architecture.md` — module boundaries and extension guidance.

For clean client-side routes in production, configure the host to rewrite unknown paths to `index.html`.
