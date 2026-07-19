"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRecipeStorage } from "@/hooks/use-recipe-storage";
import { useToast } from "@/hooks/use-toast";
import { RecipeResultCard } from "@/components/recipe/recipe-result-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChefHat } from "lucide-react";

export default function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getRecipe, deleteRecipe } = useRecipeStorage();
  const recipe = getRecipe(id);
  const router = useRouter();
  const { toast } = useToast();

  if (!recipe) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center py-16 text-center">
        <div
          className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary animate-fade-in-up stagger-delay"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          <ChefHat className="h-8 w-8 text-primary animate-pulse" />
        </div>
        <h2
          className="mb-2 text-xl font-semibold text-balance animate-fade-in-up stagger-delay"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          Recipe not found
        </h2>
        <p
          className="mb-6 text-sm text-muted-foreground text-balance animate-fade-in-up stagger-delay"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          It may have been removed or the link may be broken.
        </p>
        <div
          className="animate-fade-in-up stagger-delay"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <Button asChild>
            <Link href="/recipes">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to My Recipes
            </Link>
          </Button>
        </div>
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
      <div
        className="mb-4 flex animate-fade-in-up stagger-delay"
        style={{ "--i": 0 } as React.CSSProperties}
      >
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
        onSave={() => {
          deleteRecipe(id);
          toast({
            title: "Recipe removed",
            description: `"${recipe.recipeName}" has been removed from your saved recipes.`,
          });
          router.push("/recipes");
        }}
        className="stagger-delay"
        style={{ "--i": 1 } as React.CSSProperties}
      />
    </div>
  );
}
