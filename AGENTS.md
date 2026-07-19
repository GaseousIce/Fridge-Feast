# Fridge Feast — Agent Guide

## Setup & commands

- **Package manager: Bun only.** No npm/yarn/pnpm lockfiles exist.
- **`bun run dev`**: Starts the dev server on port **9002** (not 3000): `next dev --turbopack -p 9002`.
- **`bun run build`**: Production build (runs ESLint + `tsc --noEmit` + Next build; all must pass).
- **`bun run start`**: Starts the Next.js production server: `next start`.
- **`bun run lint`**: Runs ESLint checks: `eslint .`.
- **`bun run typecheck`**: Runs TypeScript type checking: `tsc --noEmit` (separate from build).
- **`bun run test`**: Runs unit tests: `vitest run` (no Vitest config file; uses defaults).
- **`bun run format:check`**: Verifies code formatting: `prettier --check .`.
- **`bun run format:write`**: Auto-formats files: `prettier --write .`.

## Required env

`GOOGLE_GENAI_API_KEY` in `.env` (gitignored). Without it, recipe generation will fail at runtime.

## Architecture

- Single Next.js 15 App Router app (not a monorepo).
- Path alias `@/*` → `./src/*`.
- **Entrypoints:** `src/app/page.tsx` (home), `src/app/layout.tsx` (root layout), `src/ai/flows/generate-recipe.ts` (recipe generation endpoint).
- **Recipe generation** uses `@google/genai` SDK with Gemini 1.5 Flash.
- **Two theme toggle components** exist (`animated-theme-toggle.tsx`, `theme-toggle-switch.tsx`); only `AnimatedThemeToggle` is wired up.

## Testing

- Vitest tests live in two places: co-located (`src/**/*.test.ts`) and in `tests/`. No enforced convention.
- Two tests exist: `src/lib/utils.test.ts`, `tests/hooks/use-toast.test.ts`.

## Post-Job Workflow & Quality Checks

Before concluding any task or job, always ensure the codebase is clean, formatted, and error-free by running the following commands:

- **Formatting**: Run `bun run format:write` to format files, then `bun run format:check` to verify.
- **Linting**: Run `bun run lint` to catch ESLint errors.
- **Type Checking**: Run `bun run typecheck` to verify TypeScript compiler happiness.
- **Unit Tests**: Run `bun run test` to verify Vitest tests.
- **Production Build**: Run `bun run build` to confirm the entire project builds successfully (Next.js build checks ESLint + TS compilation).

## Commits

- **Do not commit changes** unless explicitly asked/instructed by the user.
- Use [Conventional Commits](https://www.conventionalcommits.org/):

- Format: `<type>(<scope>): <subject>`
- Types: `feat`, `fix`, `test`, `refactor`, `docs`, `chore`, `style`, `perf`
- Scope (optional): e.g. `ui`, `recipe`, `ai`, `theme`
- Body description in bullet points for readability
- Before committing: `git status`, `git diff`, `git log --oneline -10` — stage only intended files

## Notable

- No CI, no pre-commit hooks. Prettier is used for formatting.
- shadcn/ui components are committed (33 of them). Do not regenerate via CLI.
- Catppuccin theme via CSS variables in `tailwind.config.ts` (latte light / mocha dark). `globals.css` includes GPU-accelerated theme transitions (`transform: translateZ(0)`, etc.).
- Build fails on any TS or ESLint error (`next.config.ts`: `ignoreBuildErrors: false`, `ignoreDuringBuilds: false`).
