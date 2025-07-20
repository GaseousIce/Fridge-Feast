import { RecipeGenerator } from "@/components/recipe/recipe-generator";
import { FridgeFeastLogo } from "@/components/icons/fridge-feast-logo"; // Changed import back to FridgeFeastLogo
import { AnimatedThemeToggle } from "@/components/animated-theme-toggle";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center min-h-screen bg-background text-foreground p-4 sm:p-8">
      <div className="absolute top-4 right-4">
        <AnimatedThemeToggle />
      </div>
      <header className="flex flex-col items-center mb-10 text-center">
        <FridgeFeastLogo className="h-16 w-16 mb-4 text-primary" /> {/* Using FridgeFeastLogo which now contains the chef hat SVG */}
        <h1 className="text-5xl font-bold tracking-tight text-primary">
          Fridge Feast
        </h1>
        <p className="mt-3 text-lg text-foreground/80 max-w-xl">
          Turn your leftover ingredients into delicious meals. Just tell us what you have!
        </p>
      </header>

      <main className="w-full flex justify-center">
        <RecipeGenerator />
      </main>

      <footer className="mt-auto pt-10 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Fridge Feast. All rights reserved.</p>
      </footer>
    </div>
  );
}
