# Agent Instructions

## Project Goal

Build a visual-first creative portfolio for Trần Hiến Chương, a beginner frontend developer focused on colorful UI, responsive layouts, and frontend animation.

The portfolio should look premium and highly interactive, but it must remain honest. Do not invent fake clients, fake companies, or fake production projects.

## Design Direction

Style:
- Dark neon
- Glassmorphism
- Cyber gradient
- Glow effects
- Soft blur
- Large expressive typography
- Subtle noise
- Smooth scroll
- Micro-interactions

Main colors:
- Background: near-black
- Accent 1: cyan
- Accent 2: purple
- Accent 3: pink/fuchsia
- Text: white and soft gray

## Required Sections

1. LoadingScreen
2. HeroSection
3. AboutSection
4. SkillsSection
5. ExperimentsSection
6. ProcessSection
7. ContactSection

## Content Rules

Use honest labels:
- UI Concept
- Practice Project
- Personal Experiment
- In Progress

Avoid:
- Fake client work
- Fake metrics
- Fake company names
- Fake testimonials

## Code Rules

- Use TypeScript.
- Use Tailwind CSS.
- Keep components small.
- Put reusable UI in components/ui.
- Put section components in components/sections.
- Put visual effects in components/effects.
- Put editable content in data files.
- Avoid hardcoding repeated content inside JSX.
- Keep animations reusable.
- Clean up GSAP effects correctly.
- Support prefers-reduced-motion.

## Quality Rules

Before finishing, check:
- Mobile layout
- Tablet layout
- Desktop layout
- Text contrast
- Hover states
- Focus states
- Reduced motion
- No hydration errors
- No console errors
- No unused imports