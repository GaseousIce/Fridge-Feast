"use server";
/**
 * @fileOverview Recipe generation AI agent.
 *
 * - generateRecipe - A function that handles the recipe generation process.
 * - GenerateRecipeInput - The input type for the generateRecipe function.
 * - GenerateRecipeOutput - The return type for the generateRecipe function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const GenerateRecipeInputSchema = z.object({
  ingredients: z.string().describe("A comma separated list of ingredients available."),
  dietaryRestrictions: z
    .string()
    .optional()
    .describe("Optional dietary restrictions (e.g., vegetarian, vegan, gluten-free)."),
  cuisine: z
    .string()
    .optional()
    .describe("Optional preferred cuisine (e.g., Italian, Mexican, Asian)."),
  difficulty: z
    .string()
    .optional()
    .describe("Optional preferred difficulty level (e.g., easy, medium, hard)."),
});
export type GenerateRecipeInput = z.infer<typeof GenerateRecipeInputSchema>;

const GenerateRecipeOutputSchema = z.object({
  recipeName: z.string().describe("The name of the recipe."),
  ingredients: z
    .array(z.string())
    .describe("List of ingredients with quantities, one per item."),
  steps: z
    .array(z.string())
    .describe("Step-by-step cooking instructions, each step as a separate string."),
  cookTime: z.string().describe("The estimated cook time for the recipe."),
  servings: z.number().describe("Number of servings the recipe yields."),
});
export type GenerateRecipeOutput = z.infer<typeof GenerateRecipeOutputSchema>;

export async function generateRecipe(input: GenerateRecipeInput): Promise<GenerateRecipeOutput> {
  return generateRecipeFlow(input);
}

const prompt = ai.definePrompt({
  name: "generateRecipePrompt",
  input: { schema: GenerateRecipeInputSchema },
  output: { schema: GenerateRecipeOutputSchema },
  prompt: `You are a world class chef.

You will generate a recipe based on the ingredients available.

Ingredients: {{{ingredients}}}
{{#if dietaryRestrictions}}Dietary Restrictions: {{{dietaryRestrictions}}}{{/if}}
{{#if cuisine}}Cuisine: {{{cuisine}}}{{/if}}
{{#if difficulty}}Difficulty: {{{difficulty}}}{{/if}}

Return a JSON object with the following fields:
- recipeName: the name of the recipe
- ingredients: array of ingredient strings with quantities
- steps: array of step-by-step instruction strings
- cookTime: estimated cook time as a string (e.g. "25 min")
- servings: number of servings

Recipe:`,
});

const generateRecipeFlow = ai.defineFlow(
  {
    name: "generateRecipeFlow",
    inputSchema: GenerateRecipeInputSchema,
    outputSchema: GenerateRecipeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  },
);
