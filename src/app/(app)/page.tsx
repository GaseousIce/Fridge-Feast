import { RecipeGenerator } from "@/components/recipe/recipe-generator";
import { FridgeFeastLogo } from "@/components/icons/fridge-feast-logo";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center">
      <header className="mb-8 flex flex-col items-center text-center sm:mb-10">
        <div
          className="animate-fade-in-up stagger-delay"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          <FridgeFeastLogo className="mb-3 h-10 w-10 text-primary sm:mb-4 sm:h-14 sm:w-14" />
        </div>
        <h1
          className="text-[clamp(2rem,8vw,3.5rem)] font-bold tracking-tight text-balance text-primary leading-[1.1] animate-fade-in-up stagger-delay"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          Fridge Feast
        </h1>
        <p
          className="mt-3 max-w-xl text-balance text-sm text-foreground/80 sm:text-base lg:text-lg animate-fade-in-up stagger-delay"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          Turn your leftover ingredients into delicious meals. Just tell us what you have!
        </p>
      </header>

      <div
        className="flex w-full justify-center animate-fade-in-up stagger-delay"
        style={{ "--i": 3 } as React.CSSProperties}
      >
        <RecipeGenerator />
      </div>
    </div>
  );
}
