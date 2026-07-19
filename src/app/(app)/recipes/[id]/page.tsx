"use client";

import { use } from "react";
import Link from "next/link";
import { useRecipeStorage } from "@/hooks/use-recipe-storage";
import { RecipeResultCard } from "@/components/recipe/recipe-result-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChefHat } from "lucide-react";

export default function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getRecipe, saveRecipe } = useRecipeStorage();
  const recipe = getRecipe(id);

  if (!recipe) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <ChefHat className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="mb-2 text-xl font-semibold">Recipe not found</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          It may have been removed or the link may be broken.
        </p>
        <Button asChild>
          <Link href="/recipes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Recipes
          </Link>
        </Button>
      </div>
    );
  }

  const output = {
    recipeName: recipe.recipeName || "Untitled Recipe",
    ingredients: recipe.ingredients || [],
    steps: recipe.steps || [],
    cookTime: recipe.cookTime || "",
    servings: recipe.servings || 0,
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex">
        <Button variant="ghost" asChild className="-ml-1 text-muted-foreground">
          <Link href="/recipes">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to My Recipes
          </Link>
        </Button>
      </div>

      <RecipeResultCard
        recipe={output}
        inputIngredients={recipe.inputIngredients}
        isSaved={true}
        onSave={() => {}}
      />
    </div>
  );
}
