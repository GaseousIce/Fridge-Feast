"use server";
/**
 * @fileOverview Recipe generation AI agent using the official @google/genai SDK.
 */

import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

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
  ingredients: z.array(z.string()).describe("List of ingredients with quantities, one per item."),
  steps: z
    .array(z.string())
    .describe("Step-by-step cooking instructions, each step as a separate string."),
  cookTime: z.string().describe("The estimated cook time for the recipe."),
  servings: z.number().describe("Number of servings the recipe yields."),
});
export type GenerateRecipeOutput = z.infer<typeof GenerateRecipeOutputSchema>;

export type GenerateRecipeResult =
  { success: true; data: GenerateRecipeOutput } | { success: false; error: string };

const recipeResponseSchema = {
  type: "object",
  properties: {
    recipeName: {
      type: "string",
      description: "The name of the recipe.",
    },
    ingredients: {
      type: "array",
      items: { type: "string" },
      description: "List of ingredients with quantities, one per item.",
    },
    steps: {
      type: "array",
      items: { type: "string" },
      description: "Step-by-step cooking instructions, each step as a separate string.",
    },
    cookTime: {
      type: "string",
      description: "The estimated cook time for the recipe.",
    },
    servings: {
      type: "number",
      description: "Number of servings the recipe yields.",
    },
  },
  required: ["recipeName", "ingredients", "steps", "cookTime", "servings"],
};

export async function generateRecipe(input: GenerateRecipeInput): Promise<GenerateRecipeResult> {
  try {
    const apiKey = process.env.GOOGLE_GENAI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "Gemini API key is not configured. Please add GOOGLE_GENAI_API_KEY to your .env file.",
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const promptText = `You are a world class chef.

You will generate a recipe based on the ingredients available.

Ingredients: ${input.ingredients}
${input.dietaryRestrictions ? `Dietary Restrictions: ${input.dietaryRestrictions}` : ""}
${input.cuisine ? `Cuisine: ${input.cuisine}` : ""}
${input.difficulty ? `Difficulty: ${input.difficulty}` : ""}

Return a JSON object with the following fields:
- recipeName: the name of the recipe
- ingredients: array of ingredient strings with quantities
- steps: array of step-by-step instruction strings
- cookTime: estimated cook time as a string (e.g. "25 min")
- servings: number of servings

Recipe:`;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeResponseSchema as any,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response content received from Gemini model.");
    }

    const data = JSON.parse(text);
    const validatedData = GenerateRecipeOutputSchema.parse(data);

    return { success: true, data: validatedData };
  } catch (e: any) {
    console.error("Error generating recipe:", e);
    let errorMessage = "An unexpected error occurred while generating the recipe.";
    if (e instanceof Error) {
      const msg = e.message.toLowerCase();
      if (msg.includes("api_key") || msg.includes("api key") || msg.includes("apikey")) {
        errorMessage =
          "Gemini API key is not configured. Please add GOOGLE_GENAI_API_KEY to your .env file.";
      } else if (
        msg.includes("fetch") ||
        msg.includes("network") ||
        msg.includes("enotfound") ||
        msg.includes("dns") ||
        msg.includes("connect")
      ) {
        errorMessage =
          "Could not connect to the Gemini API. Please check your server's internet connection.";
      } else if (
        msg.includes("quota") ||
        msg.includes("limit") ||
        msg.includes("rate") ||
        msg.includes("429")
      ) {
        errorMessage =
          "Gemini API quota or rate limit exceeded. Please wait a moment before trying again.";
      } else {
        errorMessage = e.message;
      }
    }
    return { success: false, error: errorMessage };
  }
}
