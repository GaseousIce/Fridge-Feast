export interface SavedRecipe {
  id: string;
  recipeName: string;
  ingredients: string[];
  steps: string[];
  cookTime: string;
  servings: number;
  inputIngredients: string;
  savedAt: string;
}

export interface ShoppingItem {
  id: string;
  label: string;
  recipeId: string;
  recipeName: string;
  checked: boolean;
}
