# Agent Instructions

## Project Goal

This repository is the personal creative portfolio for **Trần Hiến Chương**.

The goal is to make the portfolio look visually memorable, polished, colorful, and interactive while staying smooth, responsive, and honest. The site should present a beginner frontend developer through real projects, research work, prototypes, UI concepts, and visual experiments.

The portfolio itself should feel like a strong frontend project, but it must not fake credibility.

Do not invent:

- fake clients
- fake companies
- fake testimonials
- fake production metrics
- fake awards
- fake job experience
- fake user numbers
- fake revenue
- fake case-study outcomes

## Current Project Shape

This is a **Next.js App Router** project.

Current stack:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Motion
- GSAP / ScrollTrigger in selected existing sections
- Lenis for smooth scrolling
- Groq SDK for the AI assistant
- centralized editable portfolio data in `lib/portfolio.ts`

Important folders:

- `app/` - routes, layout, global styles, metadata
- `components/sections/` - homepage and case-study sections
- `components/ui/` - reusable UI primitives
- `components/effects/` - visual effects such as background, cursor, and text effects
- `components/providers/` - app-level providers such as smooth scrolling
- `components/ai-assistant/` - portfolio assistant UI
- `lib/` - profile data, project data, motion variants, utilities
- `image/` and `public/` - static visual assets

## Actual Homepage Structure

Do not blindly add template sections such as `LoadingScreen`, `AboutSection`, or duplicate hero/about blocks unless the user explicitly asks.

The current homepage order is:

1. `Hero`
2. `Projects`
3. `FeaturedCaseStudy`
4. `Skills`
5. `Experiments`
6. `Process`
7. `Experience`
8. `Contact`

The root layout also includes:

- `AnimatedBackground`
- `SiteHeader`
- `SiteFooter`
- `AiAssistantWidget`
- `CyberCursor`
- `SmoothScrollProvider`

## Main Direction Now

The project should keep the dark neon identity, but the priority is now:

1. smoother performance
2. less animation conflict
3. lighter blur/glow
4. better mobile experience
5. no hydration errors
6. no unnecessary client bundle weight
7. honest content

Visual polish matters, but smoothness matters more.

## Design Identity

Keep the existing visual direction:

- near-black background
- cyan, purple, and pink/fuchsia accents
- glass cards
- thin borders
- soft glow
- cyber gradient details
- expressive typography
- tasteful flicker/glitch accents
- animated background, but lightweight
- responsive, mobile-first layout

The site should feel futuristic, colorful, interactive, and portfolio-worthy, but not chaotic or heavy.

## Content Rules

Use honest project labels and statuses such as:

- Featured Project
- Research Project
- Mobile Prototype
- Personal Project
- UI Concept
- Personal Experiment
- Practice Project
- In Progress
- Concept

Avoid:

- fake client work
- fake production metrics
- fake company names
- fake testimonials
- fake awards
- claiming prototypes are finished production apps
- overstating AI accuracy

For the Vietnamese Labor Law AI Assistant, keep the disclaimer clear:

> This project is a legal-information assistant and research project. It is not a replacement for professional legal advice.

## Code Rules

- Use TypeScript.
- Use Tailwind CSS.
- Keep components small and readable.
- Reuse existing UI primitives before creating new ones.
- Keep reusable UI in `components/ui/`.
- Keep section components in `components/sections/`.
- Keep visual effects in `components/effects/`.
- Keep providers in `components/providers/`.
- Keep editable profile/project content in `lib/portfolio.ts`.
- Avoid hardcoding repeated project/profile content inside JSX.
- Use the existing `cn` helper for conditional classes.
- Preserve semantic HTML.
- Preserve focus states and keyboard usability.
- Do not rewrite the whole app unless explicitly asked.
- Do not add major dependencies without a clear reason.

## Performance-First Animation Rules

The project already has several motion sources:

- Motion
- GSAP / ScrollTrigger
- Lenis smooth scrolling
- canvas background animation
- custom cursor animation
- CSS keyframe effects

Be very careful before adding more animation.

Prefer:

- Motion for React reveal/hover animations
- CSS transitions/keyframes for tiny decorative effects
- `transform` and `opacity` for animation
- one-time viewport reveal animations
- `prefers-reduced-motion` support
- lighter effects on mobile
- no animation when it does not improve the experience

Avoid:

- adding a new animation library
- animating `top`, `left`, `width`, `height`, `margin`, or layout-heavy properties
- overusing `backdrop-filter`
- large blur on many cards
- stacking GSAP and Motion on the same element
- infinite animations that distract from reading
- extra `requestAnimationFrame` loops
- heavy effects on mobile
- motion that triggers layout/recalculate style repeatedly

## Required Motion Guards

Browser-only animation code must check reduced motion inside `useEffect` or a client-only path.

Recommended pattern:

```ts
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (prefersReducedMotion) {
  return undefined;
}
```

Any feature using `requestAnimationFrame` must cancel it on cleanup:

```ts
let frameId = requestAnimationFrame(loop);

return () => {
  cancelAnimationFrame(frameId);
};
```

If a loop creates nested or repeated animation frames, keep the latest frame id and cancel it during unmount.

## Lenis Rule

Disable Lenis on touch devices. Do not merely “consider” it.

Native mobile scroll is usually smoother and cheaper than custom smooth scroll.

Recommended guard inside `SmoothScrollProvider`:

```ts
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const isTouchDevice = window.matchMedia("(hover: none)").matches;

if (prefersReducedMotion || isTouchDevice) {
  return undefined;
}
```

Only initialize Lenis after these checks pass.

## Current Optimization Priority

When optimizing this project, follow this order:

### 1. Reduce animation conflicts

Prefer using **Motion** as the main React animation system.

If touching `Process` or `Experiments`, consider replacing GSAP scroll animations with the existing `FadeUp` / Motion pattern.

If GSAP remains:

- keep it isolated
- clean up with `context.revert()`
- avoid reverse/re-trigger loops unless intended
- avoid animating the same element with both GSAP and Motion

### 2. Reduce glass blur cost

If touching `GlassCard`, prefer:

- `backdrop-blur-sm`
- `sm:backdrop-blur-md`

Avoid using `sm:backdrop-blur-xl` across many cards.

Use glow and blur as accents, not as default heavy treatment.

### 3. Simplify always-running effects

Be careful with:

- `AnimatedBackground`
- `SmoothScrollProvider`
- `CyberCursor`

These can each create continuous animation work. Avoid adding more loops.

When possible:

- disable Lenis on touch devices
- disable animation for reduced motion
- simplify heavy effects on mobile
- reduce particle counts
- reduce shadow blur
- avoid full-screen heavy blur layers
- cancel all `requestAnimationFrame` loops on cleanup

### 4. Keep images optimized

For important images:

- use `next/image`
- set correct `sizes`
- use `priority` only for above-the-fold images
- compress oversized source images
- avoid loading large images for small display areas

### 5. Keep client bundle smaller

Prefer:

- server components when interactivity is not needed
- dynamic import for non-critical heavy UI
- no unused dependencies
- no large new libraries for tiny effects

Optional diagnostic tool:

```bash
npm install --save-dev @next/bundle-analyzer
ANALYZE=true npm run build
```

Use bundle analyzer only when diagnosing bundle size. Do not add it just for decoration.

## UI Rules

- Mobile first.
- Use generous spacing.
- Keep text readable above animated backgrounds.
- Keep glass cards readable.
- Keep CTAs obvious.
- Do not hide important information behind hover only.
- Use hover effects as enhancement, not required interaction.
- Keep project cards scannable.
- Avoid neon-on-neon text combinations.
- Keep headings expressive but body text practical.

## AI Assistant Rules

The AI assistant should only help with portfolio-related questions.

- Keep API keys server-side.
- Handle missing environment variables gracefully.
- Do not expose secrets.
- Do not provide legal advice.
- Do not claim the assistant is always correct.
- Keep responses scoped and honest.
- Preserve usable loading, error, and empty states.
- Do not let the assistant block the rest of the portfolio.

## Accessibility Rules

Before finishing UI work, check:

- mobile layout
- tablet layout
- desktop layout
- color contrast
- readable text over glass/background effects
- visible focus states
- hover, active, and disabled states
- keyboard navigation
- reduced motion behavior
- meaningful `alt` text for images
- no essential information hidden behind hover only

## Build and Quality Checks

When possible, run:

```bash
npm run lint
npm run build
```

For bundle diagnosis, optionally run:

```bash
ANALYZE=true npm run build
```

Before considering work complete, check for:

- no hydration errors
- no console errors
- no unused imports
- no broken links
- no layout shift from images or client-only effects
- no fake or exaggerated copy
- no unnecessary dependencies
- acceptable scroll smoothness on mobile and desktop

## Working Style for AI Coding Agents

- Read `AGENTS.md` and `design.md` before UI changes.
- Inspect existing files before editing.
- Work in small phases.
- Preserve current functionality.
- Prefer targeted edits over large rewrites.
- Reuse existing components before creating new ones.
- Explain what changed and what the user should test.
- Keep the site visually strong, but prioritize performance, readability, and honesty.

## Final Rule

This project should remain dark, colorful, polished, interactive, and personal.

But from now on, never sacrifice smoothness for decoration.
