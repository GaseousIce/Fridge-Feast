"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateRecipe, type GenerateRecipeOutput } from "@/ai/flows/generate-recipe";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, AlertTriangle } from "lucide-react";

const formSchema = z.object({
  ingredients: z.string().min(3, {
    message: "Please list at least one ingredient.",
  }),
});

export function RecipeGenerator() {
  const [recipe, setRecipe] = useState<GenerateRecipeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredients: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    try {
      const result = await generateRecipe({ ingredients: values.ingredients });
      setRecipe(result);
    } catch (e) {
      console.error(e);
      setError("Failed to generate recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">What's in your fridge?</CardTitle>
          <CardDescription>
            List your available ingredients, separated by commas, and let our AI chef whip up a recipe for you!
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
                    <FormLabel htmlFor="ingredients-input" className="text-lg">Ingredients</FormLabel>
                    <FormControl>
                      <Textarea
                        id="ingredients-input"
                        placeholder="e.g., chicken breast, broccoli, soy sauce, garlic"
                        className="min-h-[100px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Recipe
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="shadow-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recipe && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{recipe.recipeName}</CardTitle>
            {recipe.cookTime && (
               <Badge variant="secondary" className="w-fit bg-accent text-accent-foreground">
                 Cook Time: {recipe.cookTime}
               </Badge>
            )}
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold mb-2">Instructions:</h3>
            <p className="whitespace-pre-wrap text-foreground/90">{recipe.instructions}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
