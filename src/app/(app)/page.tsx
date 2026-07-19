import { RecipeGenerator } from "@/components/recipe/recipe-generator-lazy";
import { FridgeFeastLogo } from "@/components/icons/fridge-feast-logo";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center">
      <header className="mb-8 flex flex-col items-center text-center sm:mb-10">
        <FridgeFeastLogo className="mb-3 h-12 w-12 text-primary sm:h-14 sm:w-14" />
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Fridge Feast
        </h1>
        <p className="mt-2 max-w-xl text-base text-foreground/80 sm:text-lg">
          Turn your leftover ingredients into delicious meals. Just tell us what you have!
        </p>
      </header>

      <div className="w-full flex justify-center">
        <RecipeGenerator />
      </div>
    </div>
  );
}
