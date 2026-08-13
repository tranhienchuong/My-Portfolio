# Tran Hien Chuong — Portfolio

An English-first portfolio for an Applied AI Engineer, built with React, TypeScript, Vite, Tailwind CSS, and Radix-based UI primitives.

## Run locally

```powershell
npm install
Copy-Item .env.example .env.local
# Add your DEEPSEEK_API_KEY to .env.local
npm run dev
```

The floating `Ask My AI` widget uses the official `deepseek-v4-flash` model. The
API key stays server-side: Vite serves `/api/ai-assistant` during local development,
and `api/ai-assistant.ts` provides the same Node function seam for production hosts
that support serverless functions (including Vercel).

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
- `src/components/ai-assistant/ai-assistant-widget.tsx` — the complete floating chat interface.
- `tokens/design-tokens.json` — primitive, semantic, and component tokens.
- `server/ai-assistant.ts` — validation, DeepSeek integration, and safe HTTP responses.
- `server/portfolio-assistant-prompt.ts` — grounded public facts, commands, voice, and guardrails.
- `api/ai-assistant.ts` — production serverless adapter.
- `scripts/build-tokens.mjs` — generates CSS variables while preserving aliases.
- `docs/design-system.md` — visual, accessibility, and component rules.
- `docs/architecture.md` — module boundaries and extension guidance.

## Deploy to Vercel

The repository includes `vercel.json` for the Vite build, SPA routing, and the
serverless `/api/ai-assistant` endpoint. After pushing `main`, run the guided
setup from Git Bash or WSL:

```bash
bash scripts/setup-vercel.sh
```

The wizard opens the relevant DeepSeek and Vercel pages, saves local values to
the Git-ignored `.env.local`, and walks through the production smoke test. In
Vercel, configure these variables for Production, Preview, and Development:

- `DEEPSEEK_API_KEY` — the private API key; mark it Sensitive.
- `DEEPSEEK_MODEL` — `deepseek-v4-flash`.
- `DEEPSEEK_API_BASE` — `https://api.deepseek.com`.

Set the Vercel production branch to `main`. Environment variable changes apply
to new deployments, so redeploy the latest commit after changing them.
