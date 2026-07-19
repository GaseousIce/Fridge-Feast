"use client";

import Link from "next/link";
import { useRecipeStorage } from "@/hooks/use-recipe-storage";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ChefHat, Trash2, ArrowRight, BookOpen } from "lucide-react";

export default function MyRecipesPage() {
  const { recipes, deleteRecipe } = useRecipeStorage();
  const { toast } = useToast();

  const handleDelete = (id: string, name: string) => {
    deleteRecipe(id);
    toast({
      title: "Recipe deleted",
      description: `"${name}" has been removed from your saved recipes.`,
    });
  };

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
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-balance animate-fade-in-up">
        My Recipes
      </h2>
      <div className="space-y-3">
        {recipes.map((recipe, index) => (
          <Card
            key={recipe.id}
            className="relative overflow-hidden border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:bg-secondary/20 hover:border-border/80 group animate-fade-in-up stagger-delay"
            style={{ "--i": index } as React.CSSProperties}
          >
            <div className="flex items-center gap-4 p-4 sm:p-6">
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <Link
                  href={`/recipes/${recipe.id}`}
                  className="text-lg font-semibold text-foreground hover:text-primary transition-colors truncate after:absolute after:inset-0 after:z-0 after:content-['']"
                >
                  {recipe.recipeName || "Untitled Recipe"}
                </Link>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  {recipe.cookTime && (
                    <Badge className="bg-accent text-accent-foreground border-transparent flex items-center gap-1 text-[10px] py-0.5 px-2">
                      <Clock className="h-3 w-3" />
                      <span className="break-words">{recipe.cookTime}</span>
                    </Badge>
                  )}
                  <span>
                    {Array.isArray(recipe.ingredients) ? recipe.ingredients.length : 0} ingredients
                  </span>
                  {recipe.savedAt &&
                    (() => {
                      const d = new Date(recipe.savedAt);
                      if (isNaN(d.getTime())) return null;
                      return (
                        <>
                          <span className="select-none text-muted-foreground/50" aria-hidden="true">
                            •
                          </span>
                          <span>Saved {d.toLocaleDateString()}</span>
                        </>
                      );
                    })()}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <div className="relative z-10 pointer-events-none flex h-10 w-10 items-center justify-center text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 ease-out-quart">
                  <ArrowRight className="h-5 w-5" />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(recipe.id, recipe.recipeName)}
                  aria-label="Delete recipe"
                  className="relative z-10 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
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
