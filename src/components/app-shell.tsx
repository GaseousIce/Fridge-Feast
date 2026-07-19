"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FridgeFeastLogo } from "@/components/icons/fridge-feast-logo";
import { AnimatedThemeToggle } from "@/components/animated-theme-toggle";
import { ChefHat, List, ShoppingCart } from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: ChefHat },
  { href: "/recipes", label: "My Recipes", icon: List },
  { href: "/shopping-list", label: "Shopping List", icon: ShoppingCart },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pill, setPill] = useState<{
    left: number;
    width: number;
    ready: boolean;
  }>({ left: 0, width: 0, ready: false });

  const activeIndex = links.findIndex((link) =>
    link.href === "/" ? pathname === "/" : pathname.startsWith(link.href),
  );

  useEffect(() => {
    const activeEl = linkRefs.current[activeIndex];
    const navEl = navRef.current;
    if (!activeEl || !navEl) return;

    const navRect = navEl.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();

    setPill((prev) => ({
      left: elRect.left - navRect.left,
      width: elRect.width,
      // snap on first measurement so the pill doesn't fly in from 0
      ready: prev.ready ? true : false,
    }));

    // Defer "ready" by one frame so the first position is painted before
    // we turn on the CSS transition
    const animationFrameId = requestAnimationFrame(() => {
      setPill((prev) => ({ ...prev, ready: true }));
    });
    return () => cancelAnimationFrame(animationFrameId);
  }, [activeIndex, pathname]);

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

          {/* Sliding pill nav */}
          <nav ref={navRef} className="relative flex flex-1 items-center justify-center gap-1">
            {/* The shared sliding background pill */}
            {activeIndex !== -1 && (
              <span
                aria-hidden="true"
                className="nav-pill pointer-events-none absolute inset-y-0 my-auto h-[32px] rounded-md bg-primary/10"
                style={{
                  left: pill.left,
                  width: pill.width,
                  transition: pill.ready
                    ? "left 0.3s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                    : "none",
                }}
              />
            )}

            {links.map((link, linkIndex) => {
              const isActive = activeIndex === linkIndex;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(linkEl) => {
                    linkRefs.current[linkIndex] = linkEl;
                  }}
                  style={{ "--i": linkIndex } as React.CSSProperties}
                  className={[
                    "nav-link",
                    "group relative z-10 flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium",
                    "transition-colors duration-200 ease-out-quart",
                    "outline-none",
                    "focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  <Icon
                    className={[
                      "h-4 w-4",
                      "transition-transform duration-200 ease-out-quart",
                      "group-hover:-translate-y-px group-hover:scale-110",
                    ].join(" ")}
                  />
                  <span className="hidden transition-transform duration-200 ease-out-quart group-hover:-translate-y-px sm:inline">
                    {link.label}
                  </span>
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
