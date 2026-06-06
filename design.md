# Portfolio Design and Performance Guide

## 1. Purpose

This file defines the design and performance direction for the Trần Hiến Chương portfolio.

The portfolio should keep its current dark neon, glassy, cyber-inspired identity, but the next improvements should focus on making the app feel smoother, lighter, and more stable.

The goal is not to remove all effects. The goal is to keep only the effects that make the site feel premium without hurting scroll performance, mobile usability, or readability.

## 2. Core Product Feeling

The portfolio should feel:

- dark-mode first
- colorful but controlled
- futuristic but readable
- interactive but smooth
- expressive but not chaotic
- premium but not fake corporate
- honest and student-developer friendly
- polished enough to be a portfolio project itself

The visual language should say:

> I am a beginner developer, but I care about UI quality, motion, structure, and product presentation.

## 3. Current Visual DNA

The existing portfolio identity is built from:

- near-black background
- neon cyan, purple, and pink accents
- glassmorphism cards
- soft glow
- gradient typography
- cyber/flicker text accents
- animated star background
- custom cursor
- smooth scrolling
- motion reveal animations
- case-study style project presentation
- AI assistant widget
- honest project labels

Keep this identity, but reduce anything that makes the site feel laggy.

## 4. Performance Direction

The current stack includes several animation/performance-sensitive features:

- Motion
- GSAP / ScrollTrigger
- Lenis
- canvas background
- custom cursor
- backdrop blur
- glow shadows
- infinite CSS animations

This is visually strong, but it can become heavy.

From now on, prioritize:

1. fewer animation systems fighting each other
2. fewer always-running animation loops
3. lighter blur and glow
4. smoother mobile scrolling
5. fewer layout-triggering animations
6. smaller client bundle
7. stable hydration

## 5. Reduced Motion Rule

Reduced motion is not optional.

If `prefers-reduced-motion: reduce` is active, disable or heavily simplify:

- GSAP scroll animations
- Lenis smooth scrolling
- canvas animation
- custom cursor animation
- repeated CSS animation
- decorative infinite loops

Recommended code pattern:

```ts
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (prefersReducedMotion) {
  return undefined;
}
```

In React, run browser checks inside `useEffect` or a client-only path. Do not read `window` during server render.

## 6. requestAnimationFrame Rule

Any component that uses `requestAnimationFrame` must cancel it during cleanup.

Required pattern:

```ts
let frameId = 0;

const loop = (time: number) => {
  // animation work
  frameId = requestAnimationFrame(loop);
};

frameId = requestAnimationFrame(loop);

return () => {
  cancelAnimationFrame(frameId);
};
```

This applies especially to:

- canvas background
- custom cursor
- Lenis raf loop
- any future visual effect loop

Never leave a `requestAnimationFrame` loop running after unmount.

## 7. Animation Strategy

### Preferred default

Use **Motion** as the main animation tool for React components.

Use Motion for:

- hero reveal
- section fade-up
- card hover
- simple viewport animations
- small UI transitions

Use CSS for:

- tiny flicker effects
- gradient text movement
- subtle button transitions
- small decorative loops

Use GSAP only when:

- the animation genuinely needs scroll choreography
- Motion cannot do it cleanly
- the effect is isolated
- cleanup is correct
- the same element is not also controlled by Motion

### Avoid animation conflicts

Do not animate the same element with both GSAP and Motion unless there is a clear reason.

Bad pattern:

- GSAP controls card opacity/transform on scroll
- Motion controls the same card hover transform

Better pattern:

- Motion handles card reveal and hover
- GSAP is removed
- or GSAP targets a wrapper while Motion targets a separate inner element

### Viewport animation rule

Prefer one-time reveals.

Use:

```tsx
viewport={{ once: true, amount: 0.2 }}
```

Avoid repeated scroll-triggered reverse animations unless they are essential.

### Animation property rule

Animate only:

- `transform`
- `opacity`
- sometimes `filter` if used sparingly

Avoid animating:

- `top`
- `left`
- `right`
- `bottom`
- `width`
- `height`
- `margin`
- `padding`
- layout-heavy properties

## 8. GSAP Optimization Plan

The project currently uses GSAP mainly in selected sections such as `Process` and `Experiments`.

Recommended direction:

### Option A: Best for smoothness

Replace GSAP scroll reveals in `Process` and `Experiments` with the existing `FadeUp` / Motion pattern.

Benefits:

- fewer animation libraries active on the page
- less bundle weight
- simpler mental model
- less chance of transform conflicts
- easier reduced-motion behavior

After fully removing GSAP usage:

```bash
npm uninstall gsap
```

Then remove GSAP from `package.json` and `package-lock.json`.

### Option B: If keeping GSAP

Keep GSAP isolated.

Use:

```ts
const context = gsap.context(() => {
  // animations
}, sectionRef);

return () => context.revert();
```

Avoid:

```ts
toggleActions: "play none none reverse"
```

when repeated animation is not needed.

Prefer:

```ts
toggleActions: "play none none none"
```

Skip GSAP entirely when reduced motion is active:

```ts
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (prefersReducedMotion) {
  return undefined;
}
```

## 9. Lenis Smooth Scroll Rule

Lenis should be disabled on touch devices.

Native scrolling on iOS and Android is already optimized. Custom smooth scrolling on touch devices can add overhead and make the page feel worse.

Recommended pattern inside `SmoothScrollProvider`:

```ts
useEffect(() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isTouchDevice = window.matchMedia("(hover: none)").matches;

  if (prefersReducedMotion || isTouchDevice) {
    return undefined;
  }

  const lenis = new Lenis({
    duration: 0.45,
    easing: (time) => 1 - Math.pow(1 - time, 3),
    smoothWheel: true,
    wheelMultiplier: 1.25,
  });

  let frameId = 0;

  const raf = (time: number) => {
    lenis.raf(time);
    frameId = requestAnimationFrame(raf);
  };

  frameId = requestAnimationFrame(raf);

  return () => {
    cancelAnimationFrame(frameId);
    lenis.destroy();
  };
}, []);
```

Desktop can keep Lenis if it feels good. Mobile/touch should use native scroll.

## 10. Glassmorphism Rules

Glassmorphism is part of the design, but blur is expensive.

Use glass cards carefully.

Recommended default:

```tsx
backdrop-blur-sm sm:backdrop-blur-md
```

Avoid using this across many cards:

```tsx
backdrop-blur-xl
```

Avoid full-screen large blur layers unless very subtle.

A good `GlassCard` should feel:

- translucent
- readable
- softly elevated
- not too blurry
- not too glowing

Use stronger glow only for:

- hero portrait card
- primary CTA
- selected highlights
- tiny accent details

Do not use strong glow on every card.

## 11. Background Animation Rules

The animated background should support the page, not dominate it.

For `AnimatedBackground`:

- reduce particle count if scrolling feels laggy
- reduce shadow blur on particles
- avoid too many active shooting stars
- disable or simplify on small screens if needed
- respect `prefers-reduced-motion`
- cancel `requestAnimationFrame` on cleanup
- avoid adding more canvas layers

Suggested particle budget:

```ts
const particleCount = width < 640 ? 0 : width < 1024 ? 24 : 40;
```

If mobile feels too plain, use a static gradient background instead of animated particles.

## 12. Custom Cursor Rules

The custom cursor should be treated as a desktop-only enhancement.

Rules:

- enable only on pointer-fine devices
- disable on touch devices
- disable for reduced motion
- keep transform-only updates
- cancel `requestAnimationFrame` on cleanup
- avoid heavy box-shadow changes every frame if performance drops
- never make forms or text selection harder

If the site feels laggy, the cursor is one of the first effects to simplify.

## 13. Image Rules

Use `next/image` for important images.

For hero/profile images:

- use `priority` only if above the fold
- set accurate `sizes`
- compress the source file
- avoid loading a huge image for a small card
- use `object-cover` when needed

For non-critical images:

- do not use `priority`
- lazy loading is preferred
- avoid oversized PNGs if WebP/AVIF/JPEG would be smaller

## 14. Client Bundle Rules

Keep the client bundle as small as practical.

Avoid:

- adding new UI libraries
- adding a new animation library
- adding chart libraries unless needed
- importing heavy code into root layout
- making every component `"use client"`

Prefer:

- server components by default
- client components only when needed
- dynamic import for heavy below-the-fold components
- removing unused dependencies
- shared small UI primitives

Good candidates for dynamic import if needed:

- AI assistant widget
- heavy visual effects
- non-critical below-the-fold sections

### Optional bundle analyzer

Use this only when diagnosing bundle size:

```bash
npm install --save-dev @next/bundle-analyzer
ANALYZE=true npm run build
```

Do not add analyzer tooling unless you plan to inspect the result.

## 15. Mobile-First Rules

Mobile smoothness matters.

On mobile:

- disable Lenis
- reduce animation intensity
- reduce blur
- reduce particles
- avoid hover-only interactions
- keep buttons large enough
- keep cards scannable
- stack layouts cleanly
- keep text readable
- avoid excessive fixed overlays
- test real scrolling, not just desktop responsive mode

Mobile should feel lighter than desktop.

## 16. Color System

Use the existing color idea:

- background: near-black / dark navy
- foreground: soft white
- muted text: cool gray / blue-gray
- primary accent: cyan
- secondary accent: purple
- emotional accent: pink/fuchsia
- borders: subtle white/cyan transparency
- surfaces: translucent dark panels

Rules:

- cyan is best for focus and primary interactive cues
- purple and pink are best for depth and secondary emphasis
- avoid neon text on neon background
- avoid too many bright colors in one small area
- keep body text calm and readable

## 17. Typography Rules

Use a modern sans-serif style.

Hero typography can be expressive.

Body copy should be:

- short
- readable
- practical
- not too dense

Use gradient text only for:

- name
- key phrase
- hero emphasis

Use flicker/glitch text sparingly for:

- labels
- section eyebrows
- cyber accents

Do not apply glitch/flicker to long text.

## 18. Component Rules

Recommended component roles:

- `Container`: layout width and padding
- `SectionHeading`: consistent section intro
- `GlassCard`: reusable elevated surface
- `GlowButton`: primary/secondary CTA
- `GradientText`: important visual text
- `FlickerText`: small cyber label effect
- `FadeUp`: default reveal animation
- `AnimatedBackground`: decorative background only
- `CyberCursor`: optional desktop enhancement
- `AiAssistantWidget`: portfolio assistant only

Rules:

- reuse components before creating new ones
- keep props simple
- keep components readable
- avoid duplicated card styles
- avoid giant JSX files
- keep data in `lib/portfolio.ts`

## 19. AI Assistant UX Rules

The assistant should feel helpful but not dominant.

Rules:

- do not cover core content aggressively
- make loading state clear
- make errors friendly
- handle missing API keys gracefully
- keep API keys server-side
- do not give legal advice
- do not overclaim correctness
- keep responses about the portfolio and projects
- allow the portfolio to remain usable if AI fails

## 20. Content Tone

The copy should be:

- honest
- clear
- confident
- student-developer friendly
- practical
- not fake corporate
- not exaggerated

Good wording:

- “Research Project”
- “Mobile Prototype”
- “Personal Project”
- “UI Concept”
- “In Progress”
- “This project explores...”
- “This prototype demonstrates...”

Avoid:

- “trusted by thousands”
- “enterprise-grade”
- “used by companies”
- “production-ready”
- “industry-leading”
- any claim that is not true

## 21. Accessibility Rules

Mandatory rules:

- use semantic HTML
- use meaningful alt text
- preserve visible focus states
- keep contrast readable
- do not rely only on color
- support keyboard navigation
- respect reduced motion
- avoid layout shifts
- avoid unreadable glass overlays
- do not hide essential content behind hover

Focus rings should be visible against dark backgrounds.

## 22. Recommended Optimization Phases

### Phase 1: Animation cleanup

Goal: reduce animation conflict.

Tasks:

- inspect all GSAP usage
- replace simple GSAP reveal animations with Motion/FadeUp where possible
- avoid repeated scroll reverse animations
- keep reduced motion behavior
- remove GSAP dependency if no longer used

### Phase 2: Blur and glow reduction

Goal: reduce paint/GPU cost.

Tasks:

- reduce `GlassCard` blur from large blur to small/medium blur
- reduce heavy full-screen blur layers
- reduce shadow intensity on repeated cards
- keep glow only for important accents

### Phase 3: Background/cursor/smooth-scroll tuning

Goal: reduce always-running work.

Tasks:

- disable Lenis on touch devices
- reduce canvas particle count
- simplify shooting stars
- disable particles on mobile if needed
- cancel all rAF loops on unmount
- simplify cursor shadow updates if needed

### Phase 4: Bundle and loading optimization

Goal: reduce JS cost.

Tasks:

- remove unused dependencies
- dynamic import non-critical heavy UI if needed
- avoid unnecessary `"use client"`
- check image sizes
- optionally use `@next/bundle-analyzer`
- run build and inspect warnings

### Phase 5: QA and polish

Goal: keep the site beautiful after optimization.

Tasks:

- check mobile layout
- check desktop layout
- test real scrolling
- check hover/focus states
- check reduced motion
- check console
- check build
- verify content honesty

## 23. Performance Checklist

Before finishing performance work:

- [ ] Lenis is disabled on touch devices
- [ ] no unnecessary animation library remains
- [ ] no simple reveal animation depends on GSAP
- [ ] no repeated scroll reverse animation unless intentional
- [ ] every `requestAnimationFrame` loop is cancelled on cleanup
- [ ] reduced motion disables major decorative animation
- [ ] blur is not excessive on repeated cards
- [ ] mobile effects are lighter than desktop effects
- [ ] canvas background is not too busy
- [ ] custom cursor is desktop-only
- [ ] images have correct `sizes`
- [ ] no obvious layout shifts
- [ ] no console errors
- [ ] no hydration errors
- [ ] `npm run build` passes

## 24. Visual Checklist

Before finishing design work:

- [ ] main screen has a clear visual hook
- [ ] primary CTA is obvious
- [ ] sections have clear hierarchy
- [ ] cards are readable
- [ ] body text is not too long
- [ ] colors feel controlled
- [ ] glow is used selectively
- [ ] mobile spacing feels comfortable
- [ ] focus states are visible
- [ ] the site still feels personal and memorable

## 25. Final Direction

The portfolio should remain:

- dark
- colorful
- glassy
- polished
- interactive
- honest
- mobile-friendly
- portfolio-worthy

But the optimization rule is:

> Keep the magic, remove the weight.
