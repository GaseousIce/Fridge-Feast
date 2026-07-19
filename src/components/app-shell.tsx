"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FridgeFeastLogo } from "@/components/icons/fridge-feast-logo";
import { AnimatedThemeToggle } from "@/components/animated-theme-toggle";
import { ChefHat, List, ShoppingCart } from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: ChefHat },
  { href: "/recipes", label: "My Recipes", icon: List },
  { href: "/shopping-list", label: "Shopping List", icon: ShoppingCart },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-4 px-4 sm:px-6">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 text-primary transition-opacity hover:opacity-80"
          >
            <FridgeFeastLogo className="h-7 w-7" />
            <span className="hidden font-bold tracking-tight sm:inline">Fridge Feast</span>
          </Link>

          <nav className="flex flex-1 items-center justify-center gap-1">
            {links.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <AnimatedThemeToggle />
        </div>
      </header>

      <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</main>

      <footer className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Fridge Feast</p>
      </footer>
    </div>
  );
}
