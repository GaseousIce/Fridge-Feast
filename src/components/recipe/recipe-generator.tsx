"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateRecipe, type GenerateRecipeOutput } from "@/ai/flows/generate-recipe";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input"; // Import Input component
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Import Select components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, AlertTriangle } from "lucide-react";

const formSchema = z.object({
  ingredients: z.string().min(3, {
    message: "Please list at least one ingredient.",
  }),
  dietaryRestrictions: z.string().optional(),
  cuisine: z.string().optional(),
  difficulty: z.string().optional(),
});

export function RecipeGenerator() {
  const [recipe, setRecipe] = useState<GenerateRecipeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredients: "",
      dietaryRestrictions: "",
      cuisine: "",
      difficulty: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    try {
      const result = await generateRecipe({
        ingredients: values.ingredients,
        dietaryRestrictions: values.dietaryRestrictions || undefined, // Pass undefined if empty string
        cuisine: values.cuisine || undefined,
        difficulty: values.difficulty || undefined,
      });
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
          <CardTitle className="text-2xl">What&apos;s in your fridge?</CardTitle>
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

              {/* New Fields for Customization */}
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

              <FormField
                control={form.control}
                name="cuisine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Cuisine (Optional)</FormLabel>
                    <FormControl>
                       <Input placeholder="e.g., Italian, Mexican, Asian" {...field} />
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
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* End New Fields */}

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
