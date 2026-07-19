"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck, ChefHat, Clock, Users } from "lucide-react";
import type { GenerateRecipeOutput } from "@/ai/flows/generate-recipe";

interface RecipeResultCardProps {
  recipe: GenerateRecipeOutput;
  inputIngredients: string;
  isSaved: boolean;
  onSave: () => void;
}

export function RecipeResultCard({
  recipe,
  inputIngredients,
  isSaved,
  onSave,
}: RecipeResultCardProps) {
  return (
    <Card className="shadow-lg animate-fade-in-up">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-balance break-words">
            {recipe.recipeName || "Untitled Recipe"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onSave}
            className="shrink-0 transition-transform active:scale-95 duration-100"
            aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
          >
            {isSaved ? (
              <BookmarkCheck key="saved" className="h-5 w-5 text-primary animate-scale-pop" />
            ) : (
              <Bookmark key="unsaved" className="h-5 w-5 text-muted-foreground animate-scale-pop" />
            )}
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {recipe.cookTime && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span className="break-words">{recipe.cookTime}</span>
            </Badge>
          )}
          {typeof recipe.servings === "number" &&
            recipe.servings > 0 &&
            !isNaN(recipe.servings) && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>
                  {recipe.servings} {recipe.servings === 1 ? "serving" : "servings"}
                </span>
              </Badge>
            )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 && (
          <section>
            <h3
              className="mb-2 flex items-center gap-1.5 text-lg font-semibold animate-fade-in-up stagger-delay"
              style={{ "--i": 0 } as React.CSSProperties}
            >
              <ChefHat className="h-4 w-4 text-muted-foreground" />
              Ingredients
            </h3>
            <ul className="space-y-1">
              {recipe.ingredients.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-foreground/90 animate-fade-in-up stagger-delay"
                  style={{ "--i": i + 1 } as React.CSSProperties}
                >
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="break-words">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {Array.isArray(recipe.steps) && recipe.steps.length > 0 && (
          <section>
            <h3
              className="mb-2 text-lg font-semibold animate-fade-in-up stagger-delay"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              Instructions
            </h3>
            <ol className="space-y-3">
              {recipe.steps.map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-foreground/90 animate-fade-in-up stagger-delay"
                  style={{ "--i": i + 3, "--stagger-ms": "40ms" } as React.CSSProperties}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary mt-0.5">
                    {i + 1}
                  </span>
                  <span className="break-words">{step}</span>
                </li>
              ))}
            </ol>
          </section>
        )}
      </CardContent>
    </Card>
  );
}
