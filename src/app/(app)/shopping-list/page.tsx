"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRecipeStorage } from "@/hooks/use-recipe-storage";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ShoppingCart, ChefHat, Trash2, List } from "lucide-react";

export default function ShoppingListPage() {
  const { recipes, shoppingItems, toggleShoppingItem, clearCheckedShoppingItems } =
    useRecipeStorage();
  const { toast } = useToast();

  const handleClearChecked = () => {
    const checkedItemCount = shoppingItems.filter((shoppingItem) => shoppingItem.checked).length;
    clearCheckedShoppingItems();
    toast({
      title: "Shopping list updated",
      description: `Cleared ${checkedItemCount} checked item${checkedItemCount !== 1 ? "s" : ""}.`,
    });
  };

  const grouped = useMemo(() => {
    const shoppingGroupsByRecipeId = new Map<
      string,
      { recipeName: string; items: typeof shoppingItems }
    >();
    for (const item of shoppingItems) {
      if (!item || !item.recipeId) continue;
      if (!shoppingGroupsByRecipeId.has(item.recipeId)) {
        const savedRecipe = recipes.find((recipe) => recipe.id === item.recipeId);
        shoppingGroupsByRecipeId.set(item.recipeId, {
          recipeName: savedRecipe?.recipeName ?? "Unknown recipe",
          items: [],
        });
      }
      shoppingGroupsByRecipeId.get(item.recipeId)!.items.push(item);
    }
    return Array.from(shoppingGroupsByRecipeId.entries());
  }, [shoppingItems, recipes]);

  const pendingCount = shoppingItems.filter((shoppingItem) => !shoppingItem.checked).length;

  if (!recipes.length) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center py-16 text-center">
        <div
          className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 animate-fade-in-up stagger-delay"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          <ShoppingCart className="h-8 w-8 text-primary" />
        </div>
        <h2
          className="mb-2 text-xl font-semibold animate-fade-in-up stagger-delay"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          Your shopping list is empty
        </h2>
        <p
          className="mb-6 text-sm text-muted-foreground animate-fade-in-up stagger-delay"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          Save a recipe and its ingredients will appear here automatically.
        </p>
        <div
          className="animate-fade-in-up stagger-delay"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <Button asChild>
            <Link href="/">
              <ChefHat className="mr-2 h-4 w-4" />
              Generate a recipe
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!shoppingItems.length) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center py-16 text-center">
        <div
          className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 animate-fade-in-up stagger-delay"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          <ShoppingCart className="h-8 w-8 text-primary" />
        </div>
        <h2
          className="mb-2 text-xl font-semibold text-balance animate-fade-in-up stagger-delay"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          Nothing to shop for yet
        </h2>
        <p
          className="mb-6 text-sm text-muted-foreground max-w-sm text-balance animate-fade-in-up stagger-delay"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          Ingredients from your saved recipes will appear here so you can shop for them.
        </p>
        <div
          className="flex flex-wrap justify-center gap-3 animate-fade-in-up stagger-delay"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <Button asChild variant="outline">
            <Link href="/recipes">
              <List className="mr-2 h-4 w-4" />
              View Saved Recipes
            </Link>
          </Button>
          <Button asChild>
            <Link href="/">
              <ChefHat className="mr-2 h-4 w-4" />
              Generate a recipe
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex items-start justify-between gap-3 sm:mb-6 sm:items-center">
        <div>
          <h2
            className="text-xl font-bold tracking-tight text-balance sm:text-2xl animate-fade-in-up stagger-delay"
            style={{ "--i": 0 } as React.CSSProperties}
          >
            Shopping List
          </h2>
          <p
            className="text-sm text-muted-foreground animate-fade-in-up stagger-delay"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {pendingCount} item{pendingCount !== 1 ? "s" : ""} to buy
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearChecked}
          disabled={!shoppingItems.some((shoppingItem) => shoppingItem.checked)}
          className="shrink-0 animate-fade-in-up stagger-delay min-h-[36px]"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          <Trash2 className="mr-1 h-3 w-3" />
          Clear checked
        </Button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {grouped.map(([recipeId, { recipeName, items }], index) => (
          <Card
            key={recipeId}
            className="shadow-none border border-border animate-fade-in-up stagger-delay"
            style={{ "--i": index + 3 } as React.CSSProperties}
          >
            <CardHeader className="pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-sm sm:text-base font-medium">
                <Link
                  href={`/recipes/${recipeId}`}
                  className="hover:text-primary transition-colors"
                >
                  {recipeName}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 pb-3 sm:px-6 sm:pb-6">
              <ul className="space-y-0.5 sm:space-y-1">
                {items.map((item) => (
                  <li key={item.id}>
                    <label
                      className={`flex cursor-pointer items-center gap-3 rounded-md px-2 py-3 sm:py-2.5 text-sm transition-all duration-200 hover:bg-secondary/40 active:bg-secondary/60 touch-target ${
                        item.checked
                          ? "text-muted-foreground line-through opacity-70"
                          : "text-foreground"
                      }`}
                    >
                      <Checkbox
                        checked={item.checked}
                        onCheckedChange={() => toggleShoppingItem(item.id)}
                        className="h-5 w-5 sm:h-4 sm:w-4"
                      />
                      <span className="break-words">{item.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
