import { RecipeGenerator } from "@/components/recipe/recipe-generator-lazy";
import { FridgeFeastLogo } from "@/components/icons/fridge-feast-logo";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center">
      <header className="mb-10 flex flex-col items-center text-center">
        <FridgeFeastLogo className="mb-4 h-12 w-12 text-primary sm:h-14 sm:w-14" />
        <h1 className="text-4xl font-bold tracking-tight text-balance text-primary sm:text-5xl">
          Fridge Feast
        </h1>
        <p className="mt-3 max-w-xl text-balance text-base text-foreground/80 sm:text-lg">
          Turn your leftover ingredients into delicious meals. Just tell us what you have!
        </p>
      </header>

      <div className="w-full flex justify-center">
        <RecipeGenerator />
      </div>
    </div>
  );
}
