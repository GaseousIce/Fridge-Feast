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

| Command                | Description                                                                    |
| ---------------------- | ------------------------------------------------------------------------------ |
| `bun run dev`          | Start development server on port **9002** (with Turbopack)                     |
| `bun run build`        | Production build (runs ESLint + `tsc --noEmit` + Next.js build; all must pass) |
| `bun run start`        | Start production Next.js server                                                |
| `bun run lint`         | Run ESLint checks                                                              |
| `bun run typecheck`    | Run TypeScript compilation check                                               |
| `bun run test`         | Run Vitest unit tests                                                          |
| `bun run format:check` | Verify code formatting with Prettier                                           |
| `bun run format:write` | Auto-format all code files with Prettier                                       |
| `bun run genkit:dev`   | Start GenKit Developer UI / Flow Runner                                        |
| `bun run genkit:watch` | Start GenKit Developer UI / Flow Runner with auto-reload (watch mode)          |

## Project Structure

```
src/
├── ai/
│   ├── flows/
│   │   └── generate-recipe.ts      # AI recipe generation flow (GenKit flow)
│   ├── dev.ts                       # GenKit dev runner entry point
│   └── genkit.ts                    # GenKit model initialization (Gemini 2.0 Flash)
├── app/
│   ├── (app)/                       # Application routes group
│   │   ├── recipes/                 # Saved recipes routes
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx         # Detailed saved recipe view
│   │   │   └── page.tsx             # List of all saved recipes
│   │   ├── shopping-list/
│   │   │   └── page.tsx             # Shopping list page (aggregated ingredients)
│   │   ├── layout.tsx               # App shell layout (header/footer/navigation)
│   │   └── page.tsx                 # Home page (Recipe Generator UI)
│   ├── favicon.ico
│   ├── globals.css                  # Catppuccin-themed global styles
│   └── layout.tsx                   # Root HTML/Body layout with theme and toast providers
├── components/
│   ├── recipe/
│   │   ├── recipe-generator-lazy.tsx # Dynamic import wrapper for generator component
│   │   ├── recipe-generator.tsx      # Main recipe generator form and logic
│   │   └── recipe-result-card.tsx    # Card displaying generated recipe output
│   ├── animated-theme-toggle.tsx     # Custom Anime.js circular overlay theme toggle
│   ├── app-shell.tsx                 # Base page shell with navigation layout
│   └── ui/                           # Committed shadcn/ui base components (33)
├── hooks/
│   ├── use-mobile.tsx                # Mobile breakpoint detection hook
│   ├── use-recipe-storage.ts         # localStorage management hook for recipes & shopping list
│   └── use-toast.ts                  # shadcn/ui toast notifications hook
└── lib/
    ├── types.ts                      # Core TypeScript definitions (SavedRecipe, ShoppingItem, etc.)
    ├── utils.test.ts                 # Unit tests for helper utilities
    └── utils.ts                      # Tailwind CSS class merger utility (cn)
```

## Key Files

- **`src/app/(app)/page.tsx`** — Main application landing and recipe generation page
- **`src/components/recipe/recipe-generator.tsx`** — Recipe generator form component
- **`src/hooks/use-recipe-storage.ts`** — LocalStorage management hook for recipes and shopping items
- **`src/ai/flows/generate-recipe.ts`** — AI recipe generation flow (using Gemini 2.0 Flash)
- **`src/ai/genkit.ts`** — GenKit initialization and model configuration

## Testing

The project uses [Vitest](https://vitest.dev) for testing:

```bash
bun run test
```

Tests cover the `cn()` utility and the toast notification hooks.

## Built With

- **Framework:** Next.js 15 (with Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, shadcn/ui, Catppuccin theme (Latte light & Mocha dark)
- **AI:** GenKit, Google Gemini 2.0 Flash
- **Forms:** react-hook-form, Zod validation
- **Animation:** Anime.js
- **State/Storage:** React State, Browser LocalStorage
- **Testing:** Vitest
- **Dev Tools:** GenKit CLI, ESLint, Prettier

## Feedback

Have feedback or suggestions?  
Feel free to [open an issue](https://github.com/GaseousIce/Fridge-Feast/issues) or start a [discussion](https://github.com/GaseousIce/Fridge-Feast/discussions) on GitHub!
