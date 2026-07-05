"use client";

import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";

const LazyRecipeGenerator = dynamic(
  () =>
    import("@/components/recipe/recipe-generator").then((m) => ({
      default: m.RecipeGenerator,
    })),
  {
    loading: () => (
      <Card className="w-full max-w-2xl shadow-lg">
        <CardContent className="p-8 text-center text-muted-foreground">
          Loading recipe generator...
        </CardContent>
      </Card>
    ),
  },
);

export { LazyRecipeGenerator as RecipeGenerator };
