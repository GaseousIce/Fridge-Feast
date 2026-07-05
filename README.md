# Fridge Feast

Fridge Feast is a Next.js application that helps you generate delicious recipes based on the ingredients you have on hand. Say goodbye to food waste and hello to creativity in your kitchen!

## Core Features

- **AI Recipe Generation:** Get unique recipe names and step-by-step instructions tailored to your available ingredients using Google Gemini via GenKit.
- **Ingredient Input:** Easily list the ingredients you have in a simple textarea.
- **Recipe Display:** View the generated recipe clearly, including the name, detailed instructions, and estimated cook time.
- **Customization:** Optionally specify dietary restrictions, preferred cuisine, and difficulty level to get more personalized recipes.
- **Dark/Light Theme:** Catppuccin-themed UI with a smooth animated theme toggle.
- **Keyboard Shortcuts:** Press `Cmd+Enter` or `Ctrl+Enter` to generate a recipe quickly.
- **Accessibility:** Screen-reader-friendly live regions and ARIA-compliant interactive elements.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (package manager)
- A Google AI API key (for recipe generation) — set it as `GOOGLE_GENAI_API_KEY` in a `.env` file.

### Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/GaseousIce/Fridge-Feast.git
    cd Fridge-Feast
    ```
2.  **Install dependencies:**
    ```bash
    bun install
    ```
3.  **Set up environment variables:**
    ```bash
    cp .env.example .env
    ```
    Then add your `GOOGLE_GENAI_API_KEY` to `.env`.

4.  **Run the development server:**
    ```bash
    bun run dev
    ```
    The app runs on [http://localhost:9002](http://localhost:9002).

### Other Commands

| Command | Description |
|---------|-------------|
| `bun run build` | Production build (with ESLint + TypeScript checks) |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run typecheck` | Run TypeScript type checking |
| `bun run test` | Run Vitest test suite |
| `bun run genkit:dev` | Start GenKit flow runner for AI development |

## Project Structure

```
src/
├── ai/
│   ├── flows/
│   │   └── generate-recipe.ts   # AI recipe generation flow (server action)
│   ├── dev.ts                    # GenKit dev entry point
│   └── genkit.ts                 # GenKit initialization (Gemini 2.0 Flash)
├── app/
│   ├── globals.css                # Catppuccin-themed global styles
│   ├── layout.tsx                 # Root layout (fonts, ThemeProvider, Toaster)
│   └── page.tsx                   # Home page (logo, tagline, RecipeGenerator)
├── components/
│   ├── recipe/
│   │   └── recipe-generator.tsx   # Main form (react-hook-form + Zod validation)
│   ├── animated-theme-toggle.tsx   # Circular-overlay theme toggle (animejs)
│   ├── theme-toggle-switch.tsx     # Simple slide-toggle component
│   └── ui/                         # shadcn/ui components (30+)
├── hooks/
│   ├── use-mobile.tsx              # Mobile breakpoint detection
│   └── use-toast.ts                # Toast notification system
└── lib/
    └── utils.ts                    # cn() utility (clsx + tailwind-merge)
```

## Key Files

- **`src/app/page.tsx`** — Main application entry point
- **`src/components/recipe/recipe-generator.tsx`** — Recipe generation form and result display
- **`src/ai/flows/generate-recipe.ts`** — AI recipe generation logic (GenKit flow)
- **`src/ai/genkit.ts`** — GenKit initialization and model configuration

## Testing

The project uses [Vitest](https://vitest.dev) for testing:

```bash
bun run test
```

Tests cover the `cn()` utility and the toast notification reducer.

## Built With

- **Framework:** Next.js 15 (with Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, shadcn/ui, Catppuccin theme
- **AI:** GenKit, Google Gemini 2.0 Flash
- **Forms:** react-hook-form, Zod
- **Animation:** animejs
- **State:** TanStack Query, Firebase
- **Testing:** Vitest
- **Dev Tools:** GenKit CLI, ESLint

## Feedback

Have feedback or suggestions?  
Feel free to [open an issue](https://github.com/GaseousIce/Fridge-Feast/issues) or start a [discussion](https://github.com/GaseousIce/Fridge-Feast/discussions) on GitHub!
