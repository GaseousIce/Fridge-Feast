# Fridge Feast

Fridge Feast is a Next.js application that helps you generate delicious recipes based on the ingredients you have on hand. Say goodbye to food waste and hello to creativity in your kitchen!

## Core Features

*   **Recipe Generation:** Get unique recipe names and step-by-step instructions tailored to your available ingredients. The AI considers relevant techniques and instructions based on your input.
*   **Ingredient Input:** Easily list the ingredients you have in a simple input field.
*   **Recipe Display:** View the generated recipe clearly, including the name, detailed instructions, and estimated cook time.
*   **Customization:** Optionally specify dietary restrictions, preferred cuisine, and difficulty level to get more personalized recipes.

## Getting Started

This project is a Next.js starter.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/GaseousIce/Fridge-Feast.git
    cd Fridge-Feast
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The app should be running on port 9002 (or the port configured in your `package.json`).

To explore the application code, start by looking at `src/app/page.tsx`.

The AI recipe generation logic can be found in `src/ai/flows/generate-recipe.ts`.

## Built with

*   Next.js
*   React
*   Tailwind CSS
*   GenKit (for AI recipe generation)

## Feedback

Have feedback or suggestions?  
Feel free to [open an issue](https://github.com/GaseousIce/Fridge-Feast/issues) or start a [discussion](https://github.com/GaseousIce/Fridge-Feast/discussions) on GitHub!
