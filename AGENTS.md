# Fridge Feast — Agent Guide

## Setup & commands

- **Package manager: Bun only.** No npm/yarn/pnpm lockfiles exist.
- **Dev server** runs on port **9002** (not 3000): `bun run dev`
- **`bun run build`** runs ESLint + `tsc --noEmit` + Next build (all must pass).
- **`bun run test`** = `vitest run` (no vitest config file; use defaults).
- **`bun run typecheck`** = `tsc --noEmit` (separate from build).

## Required env

`GOOGLE_GENAI_API_KEY` in `.env` (gitignored). Without it, recipe generation will fail at runtime.

## Architecture

- Single Next.js 15 App Router app (not a monorepo).
- Path alias `@/*` → `./src/*`.
- **Entrypoints:** `src/app/page.tsx` (home), `src/app/layout.tsx` (root layout), `src/ai/flows/generate-recipe.ts` (GenKit server action), `src/ai/genkit.ts` (model init).
- **Recipe generation** is a GenKit flow in `src/ai/flows/` using Gemini 2.0 Flash.
- **Two theme toggle components** exist (`animated-theme-toggle.tsx`, `theme-toggle-switch.tsx`); only `AnimatedThemeToggle` is wired up.

## Testing

- Vitest tests live in two places: co-located (`src/**/*.test.ts`) and in `tests/`. No enforced convention.
- Two tests exist: `src/lib/utils.test.ts`, `tests/hooks/use-toast.test.ts`.

## GenKit dev

`bun run genkit:dev` starts the GenKit flow runner via `tsx src/ai/dev.ts` (loads dotenv, imports flow).

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

- Format: `<type>(<scope>): <subject>`
- Types: `feat`, `fix`, `test`, `refactor`, `docs`, `chore`, `style`, `perf`
- Scope (optional): e.g. `ui`, `recipe`, `ai`, `theme`
- Body description in bullet points for readability
- Before committing: `git status`, `git diff`, `git log --oneline -10` — stage only intended files

## Notable

- No CI, no pre-commit hooks, no formatter (Prettier) configured.
- shadcn/ui components are committed (33 of them). Do not regenerate via CLI.
- Catppuccin theme via CSS variables in `tailwind.config.ts` (latte light / mocha dark). `globals.css` includes GPU-accelerated theme transitions (`transform: translateZ(0)`, etc.).
- Build fails on any TS or ESLint error (`next.config.ts`: `ignoreBuildErrors: false`, `ignoreDuringBuilds: false`).
