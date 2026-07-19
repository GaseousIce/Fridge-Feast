"use client";

import { useState, useEffect, useCallback } from "react";
import type { SavedRecipe, ShoppingItem } from "@/lib/types";

const STORAGE_KEY = "ff-saved-recipes";
const SHOPPING_KEY = "ff-shopping-items";

function readRecipes(): SavedRecipe[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SavedRecipe[]) : [];
  } catch {
    return [];
  }
}

function writeRecipes(recipes: SavedRecipe[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  } catch {
    /* storage full or unavailable */
  }
}

function readShoppingItems(): ShoppingItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SHOPPING_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ShoppingItem[]) : [];
  } catch {
    return [];
  }
}

function writeShoppingItems(items: ShoppingItem[]) {
  try {
    localStorage.setItem(SHOPPING_KEY, JSON.stringify(items));
  } catch {
    /* storage full or unavailable */
  }
}

export function useRecipeStorage() {
  const [recipes, setRecipes] = useState<SavedRecipe[]>(() => readRecipes());
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>(() => readShoppingItems());

  useEffect(() => {
    writeRecipes(recipes);
  }, [recipes]);

  useEffect(() => {
    writeShoppingItems(shoppingItems);
  }, [shoppingItems]);

  const saveRecipe = useCallback((recipe: SavedRecipe) => {
    if (!recipe || !recipe.id) return;
    setRecipes((prevRecipes) => {
      if (prevRecipes.some((existingRecipe) => existingRecipe.id === recipe.id)) return prevRecipes;
      return [recipe, ...prevRecipes];
    });
  }, []);

  const deleteRecipe = useCallback((id: string) => {
    if (!id) return;
    setRecipes((prevRecipes) => {
      const remainingRecipes = prevRecipes.filter((recipe) => recipe.id !== id);
      return remainingRecipes;
    });
    setShoppingItems((prevItems) =>
      prevItems.filter((shoppingItem) => shoppingItem.recipeId !== id),
    );
  }, []);

  const getRecipe = useCallback(
    (id: string): SavedRecipe | undefined => {
      if (!id) return undefined;
      return recipes.find((existingRecipe) => existingRecipe.id === id);
    },
    [recipes],
  );

  const addShoppingItems = useCallback((items: ShoppingItem[]) => {
    if (!Array.isArray(items)) return;
    setShoppingItems((prevItems) => {
      const existingItemIds = new Set(prevItems.map((shoppingItem) => shoppingItem.id));
      const newItems = items.filter(
        (shoppingItem) => shoppingItem && shoppingItem.id && !existingItemIds.has(shoppingItem.id),
      );
      return [...prevItems, ...newItems];
    });
  }, []);

  const toggleShoppingItem = useCallback((id: string) => {
    if (!id) return;
    setShoppingItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)),
    );
  }, []);

  const clearCheckedShoppingItems = useCallback(() => {
    setShoppingItems((prev) => prev.filter((item) => !item.checked));
  }, []);

  return {
    recipes,
    shoppingItems,
    saveRecipe,
    deleteRecipe,
    getRecipe,
    addShoppingItems,
    toggleShoppingItem,
    clearCheckedShoppingItems,
  };
}
