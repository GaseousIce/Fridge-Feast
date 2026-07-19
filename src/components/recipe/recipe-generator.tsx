"use client";

import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateRecipe, type GenerateRecipeOutput } from "@/ai/flows/generate-recipe";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles, AlertTriangle, RefreshCw, WifiOff } from "lucide-react";
import { RecipeResultCard } from "@/components/recipe/recipe-result-card";
import { useRecipeStorage } from "@/hooks/use-recipe-storage";
import type { SavedRecipe, ShoppingItem } from "@/lib/types";

const formSchema = z.object({
  ingredients: z.string().trim().min(3, {
    message: "Please list at least one ingredient.",
  }),
  dietaryRestrictions: z.string().trim().optional(),
  cuisine: z.string().trim().optional(),
  difficulty: z.string().optional(),
});

export function RecipeGenerator() {
  const [recipe, setRecipe] = useState<GenerateRecipeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const { saveRecipe, addShoppingItems, recipes } = useRecipeStorage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredients: "",
      dietaryRestrictions: "",
      cuisine: "",
      difficulty: "",
    },
  });
  const getValues = form.getValues;

  const isSaved = recipe ? recipes.some((r) => r.recipeName === recipe.recipeName) : false;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial check
    setIsOffline(!navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!navigator.onLine) {
      setError("You are offline. Recipe generation requires an active internet connection.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    try {
      const result = await generateRecipe({
        ingredients: values.ingredients,
        dietaryRestrictions: values.dietaryRestrictions || undefined,
        cuisine: values.cuisine || undefined,
        difficulty: values.difficulty || undefined,
      });
      if (result.success) {
        setRecipe(result.data);
      } else {
        setError(result.error);
      }
    } catch (e) {
      console.error(e);
      setError("Failed to generate recipe due to a network or server issue. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSave = useCallback(() => {
    if (!recipe) return;
    const id = crypto.randomUUID();
    const saved: SavedRecipe = {
      id,
      recipeName: recipe.recipeName,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      cookTime: recipe.cookTime,
      servings: recipe.servings,
      inputIngredients: getValues("ingredients"),
      savedAt: new Date().toISOString(),
    };
    saveRecipe(saved);
    const shopping: ShoppingItem[] = recipe.ingredients.map((item) => ({
      id: `${id}-${crypto.randomUUID()}`,
      label: item,
      recipeId: id,
      recipeName: recipe.recipeName,
      checked: false,
    }));
    addShoppingItems(shopping);
  }, [recipe, getValues, saveRecipe, addShoppingItems]);

  return (
    <div className="w-full max-w-2xl space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">What&apos;s in your fridge?</CardTitle>
          <CardDescription>
            List your available ingredients, separated by commas, and let our AI chef whip up a
            recipe for you!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="ingredients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="ingredients-input" className="text-lg">
                      Ingredients{" "}
                      <span className="text-destructive" aria-hidden="true">
                        *
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="ingredients-input"
                        placeholder="e.g., chicken breast, broccoli, soy sauce, garlic"
                        className="min-h-[100px] resize-y"
                        onKeyDown={handleKeyDown}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dietaryRestrictions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Dietary Restrictions (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., vegetarian, gluten-free" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="cuisine"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Cuisine (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Italian, Mexican" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Difficulty (Optional)</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {isOffline && (
                <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
                  <WifiOff className="h-4 w-4" />
                  <AlertTitle>You are offline</AlertTitle>
                  <AlertDescription>
                    Recipe generation requires an active internet connection. Please check your
                    network.
                  </AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading || isOffline}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : isOffline ? (
                  <>
                    <WifiOff className="mr-2 h-4 w-4" />
                    Offline
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Recipe
                    <kbd className="ml-2 hidden rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:inline-block">
                      <span className="text-xs">⌘</span> Enter
                    </kbd>
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div aria-live="polite" className="sr-only">
        {isLoading && "Generating recipe, please wait."}
        {error && `Error: ${error}`}
        {recipe && "Recipe generated successfully. Results are below."}
      </div>

      {isLoading && (
        <Card className="shadow-lg">
          <CardContent className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm">Cooking up something delicious...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Alert variant="destructive" className="shadow-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex flex-col gap-3">
            <span>{error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => form.handleSubmit(onSubmit)()}
              className="w-fit"
            >
              <RefreshCw className="mr-1 h-3 w-3" />
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {recipe && !isLoading && (
        <RecipeResultCard
          recipe={recipe}
          inputIngredients={getValues("ingredients")}
          isSaved={isSaved}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
