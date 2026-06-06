# Trần Hiến Chương — Creative Frontend Portfolio

A colorful, visual-first portfolio built with Next.js, TypeScript, Tailwind CSS, Motion, and Lenis. It showcases real projects, legal-tech research, mobile prototypes, UI experiments, and interactive frontend presentation.

## Features

- Dark neon visual system
- Glassmorphism project cards
- Responsive layout
- Smooth scrolling
- Motion-based reveal animations
- Featured legal-tech case study
- Dynamic project detail pages
- Accessible links and semantic sections
- Honest project presentation

## Featured Projects

### Vietnamese Labor Law AI Assistant

- AI / LegalTech / Thesis Project
- RAG / GraphRAG
- Legal-information assistant, not legal advice
- GitHub: https://github.com/tranhienchuong/vietnamese-labor-law-ai-assistant

### Gia Phả Việt

- Android / Kotlin / AI Studio prototype
- Mobile app experiment
- Prototype / in progress
- GitHub: https://github.com/tranhienchuong/gia-pha-viet

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Motion
- Lenis

## Project Structure

```text
app/                  App Router pages, layout, and project detail routes
components/           Shared React components
components/sections/  Homepage and content sections
components/ui/        Reusable UI primitives
components/effects/   Static background and optional cursor effects
components/providers/ App-level providers
lib/                  Portfolio data, helpers, and shared utilities
public/               Static icons, manifest, and public assets
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Build for production:

```bash
npm run build
```

Start the production build:

```bash
npm run start
```

Run lint checks:

```bash
npm run lint
```

## Content Honesty

- Project descriptions avoid fake clients, users, revenue, awards, and production metrics.
- Vietnamese Labor Law AI Assistant is presented as a legal-information/research project, not professional legal advice.
- Gia Phả Việt is presented as an early-stage prototype, not a finished production app.

## Performance Note

The portfolio keeps the dark neon identity with a static CSS background, Motion-based reveal animations, and guarded desktop-only enhancements. The background does not use a canvas or a continuous animation loop.

## Deployment

This project can be deployed on Vercel or any Next.js-compatible hosting provider.

Set `GROQ_API_KEY` in the deployment environment to enable the AI assistant. Without it, the portfolio still works and the assistant returns a clear configuration message.

## License

No license is specified.

## Author

Trần Hiến Chương

GitHub: https://github.com/tranhienchuong

Email: tranhienchuong03062004@gmail.com
