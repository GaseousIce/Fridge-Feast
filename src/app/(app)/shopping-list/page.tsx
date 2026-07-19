"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRecipeStorage } from "@/hooks/use-recipe-storage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ShoppingCart, ChefHat, Trash2 } from "lucide-react";

export default function ShoppingListPage() {
  const { recipes, shoppingItems, toggleShoppingItem, clearCheckedShoppingItems } =
    useRecipeStorage();

  const grouped = useMemo(() => {
    const map = new Map<string, { recipeName: string; items: typeof shoppingItems }>();
    for (const item of shoppingItems) {
      if (!item || !item.recipeId) continue;
      if (!map.has(item.recipeId)) {
        const recipe = recipes.find((r) => r.id === item.recipeId);
        map.set(item.recipeId, {
          recipeName: recipe?.recipeName ?? "Unknown recipe",
          items: [],
        });
      }
      map.get(item.recipeId)!.items.push(item);
    }
    return Array.from(map.entries());
  }, [shoppingItems, recipes]);

  const pendingCount = shoppingItems.filter((i) => !i.checked).length;

  if (!recipes.length) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <ShoppingCart className="h-8 w-8 text-primary" />
        </div>
        <h2 className="mb-2 text-xl font-semibold">Your shopping list is empty</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Save a recipe and its ingredients will appear here automatically.
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

  if (!shoppingItems.length) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center py-16 text-center">
        <ShoppingCart className="mb-4 h-12 w-12 text-muted-foreground" />
        <h2 className="mb-2 text-xl font-semibold">Nothing to shop for yet</h2>
        <p className="text-sm text-muted-foreground">
          Ingredients from your saved recipes will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Shopping List</h2>
          <p className="text-sm text-muted-foreground">
            {pendingCount} item{pendingCount !== 1 ? "s" : ""} to buy
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={clearCheckedShoppingItems}
          disabled={!shoppingItems.some((i) => i.checked)}
        >
          <Trash2 className="mr-1 h-3 w-3" />
          Clear checked
        </Button>
      </div>

      <div className="space-y-4">
        {grouped.map(([recipeId, { recipeName, items }]) => (
          <Card key={recipeId} className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                <Link
                  href={`/recipes/${recipeId}`}
                  className="hover:text-primary transition-colors"
                >
                  {recipeName}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item.id}>
                    <label
                      className={`flex cursor-pointer items-center gap-3 rounded-md px-2 py-2.5 text-sm transition-colors hover:bg-accent/50 ${
                        item.checked ? "text-muted-foreground line-through" : ""
                      }`}
                    >
                      <Checkbox
                        checked={item.checked}
                        onCheckedChange={() => toggleShoppingItem(item.id)}
                      />
                      {item.label}
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
