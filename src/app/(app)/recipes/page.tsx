"use client";

import Link from "next/link";
import { useRecipeStorage } from "@/hooks/use-recipe-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ChefHat, Trash2, ArrowRight, BookOpen } from "lucide-react";

export default function MyRecipesPage() {
  const { recipes, deleteRecipe } = useRecipeStorage();

  if (!recipes.length) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <BookOpen className="h-8 w-8 text-primary" />
        </div>
        <h2 className="mb-2 text-xl font-semibold">No saved recipes yet</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Generate your first recipe and save it here so you never lose a good idea.
        </p>
        <Button asChild>
          <Link href="/">
            <ChefHat className="mr-2 h-4 w-4" />
            Generate a recipe
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-6 text-2xl font-bold tracking-tight">My Recipes</h2>
      <div className="space-y-3">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center gap-4 p-4 sm:p-6">
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <Link
                  href={`/recipes/${recipe.id}`}
                  className="text-lg font-semibold text-foreground hover:text-primary transition-colors truncate"
                >
                  {recipe.recipeName}
                </Link>
                <div className="flex flex-wrap items-center gap-2">
                  {recipe.cookTime && (
                    <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                      <Clock className="h-3 w-3" />
                      {recipe.cookTime}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {recipe.ingredients.length} ingredients
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Saved {new Date(recipe.savedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/recipes/${recipe.id}`} aria-label="View recipe">
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteRecipe(recipe.id)}
                  aria-label="Delete recipe"
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
