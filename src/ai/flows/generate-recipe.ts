"use server";

import OpenAI from "openai";
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

const recipeSchema = {
  type: "object",
  properties: {
    recipeName: { type: "string", description: "The name of the recipe." },
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
    cookTime: { type: "string", description: "The estimated cook time for the recipe." },
    servings: { type: "number", description: "Number of servings the recipe yields." },
  },
  required: ["recipeName", "ingredients", "steps", "cookTime", "servings"],
};

export async function generateRecipe(input: GenerateRecipeInput): Promise<GenerateRecipeResult> {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("Groq API key is not configured. Please add GROQ_API_KEY to your .env file.");
    }

    const client = new OpenAI({
      apiKey,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const systemPrompt = `You are a world class chef. Generate a recipe based on the ingredients and preferences provided. Respond in JSON.`;

    const userPrompt = `Generate a recipe with the following:
Ingredients: ${input.ingredients}
${input.dietaryRestrictions ? `Dietary Restrictions: ${input.dietaryRestrictions}` : ""}
${input.cuisine ? `Cuisine: ${input.cuisine}` : ""}
${input.difficulty ? `Difficulty: ${input.difficulty}` : ""}`;

    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "recipe",
          schema: recipeSchema,
        },
      } as any,
    });

    const rawResponseText = response.choices[0]?.message?.content;
    if (!rawResponseText) {
      throw new Error("No response content received from Groq model.");
    }

    const parsedJson = JSON.parse(rawResponseText);
    const validatedData = GenerateRecipeOutputSchema.parse(parsedJson);

    return { success: true, data: validatedData };
  } catch (caughtError: any) {
    console.error("Error generating recipe:", caughtError);
    let errorMessage = "An unexpected error occurred while generating the recipe.";
    if (caughtError instanceof Error) {
      const errorMessageLower = caughtError.message.toLowerCase();
      if (
        errorMessageLower.includes("api_key") ||
        errorMessageLower.includes("api key") ||
        errorMessageLower.includes("apikey")
      ) {
        errorMessage = "Groq API key is not configured. Please add GROQ_API_KEY to your .env file.";
      } else if (
        errorMessageLower.includes("fetch") ||
        errorMessageLower.includes("network") ||
        errorMessageLower.includes("enotfound") ||
        errorMessageLower.includes("dns") ||
        errorMessageLower.includes("connect")
      ) {
        errorMessage =
          "Could not connect to the Groq API. Please check your server's internet connection.";
      } else if (
        errorMessageLower.includes("quota") ||
        errorMessageLower.includes("limit") ||
        errorMessageLower.includes("rate") ||
        errorMessageLower.includes("429")
      ) {
        errorMessage =
          "Groq API quota or rate limit exceeded. Please wait a moment before trying again.";
      } else {
        errorMessage = caughtError.message;
      }
    }
    return { success: false, error: errorMessage };
  }
}
