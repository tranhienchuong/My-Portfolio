# Portfolio architecture

## Deep module

The portfolio is exposed through a small route interface (`/`, `/work/:slug`, `/resume`) while layout, navigation, responsive behavior, and content composition stay behind that interface.

## Content seam

`src/portfolio/content.ts` is the single content seam. It exports a typed `PortfolioContent` object consumed by every page. This keeps verified claims, project ownership, metrics, screenshots, and public links local to one module.

There is no adapter layer because the current content source is static and in-process. If the content later moves to a CMS, the CMS mapper should implement `PortfolioContent` at this seam without leaking CMS fields into page components.

## Component boundaries

- `pages/*` owns route-level information architecture.
- `components/site/*` owns cross-route behavior.
- `components/portfolio/*` owns repeated portfolio patterns.
- `components/ui/*` owns accessible visual primitives.
- `tokens/*` owns design decisions shared across every layer.

The content object is the primary test surface for project data. UI components should not fetch repositories or infer claims at render time.

## Adding a project

1. Extend the `PortfolioProject["slug"]` union.
2. Add one verified project object to `portfolioContent.projects`.
3. Use images with explicit alt text and measurable claims with source evidence.
4. The homepage, case-study route, résumé, and next-project navigation update from the same object.
