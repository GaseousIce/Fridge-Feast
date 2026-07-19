"use client";

import { useState } from "react";
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
  const [animateIn] = useState(true);

  return (
    <Card
      className={`shadow-lg transition-all duration-500 ease-out ${
        animateIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-balance">{recipe.recipeName}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onSave}
            className="shrink-0"
            aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
          >
            {isSaved ? (
              <BookmarkCheck className="h-5 w-5 text-primary" />
            ) : (
              <Bookmark className="h-5 w-5 text-muted-foreground" />
            )}
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {recipe.cookTime && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {recipe.cookTime}
            </Badge>
          )}
          {recipe.servings > 0 && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {recipe.servings} {recipe.servings === 1 ? "serving" : "servings"}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <h3 className="mb-2 flex items-center gap-1.5 text-lg font-semibold">
            <ChefHat className="h-4 w-4 text-muted-foreground" />
            Ingredients
          </h3>
          <ul className="space-y-1">
            {recipe.ingredients.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="mb-2 text-lg font-semibold">Instructions</h3>
          <ol className="space-y-3">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-foreground/90">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      </CardContent>
    </Card>
  );
}
