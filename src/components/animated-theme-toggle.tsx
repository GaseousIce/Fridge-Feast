"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { animate as anime } from "animejs";
import { flushSync } from "react-dom";

export function AnimatedThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const createSwwwCenterTransition = (centerX: number, centerY: number, isDarkToLight: boolean) => {
    // Add body class to prevent interactions during transition
    document.body.classList.add("theme-transitioning");

    // Use actual theme background colors matching globals.css
    const targetBackground = isDarkToLight ? "hsl(229 27% 96%)" : "hsl(220 36% 24%)";

    // Create overlay that will be the "new" theme background
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: ${targetBackground};
      z-index: 99999;
      pointer-events: none;
      transition: clip-path 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out;
      transform: translateZ(0);
      opacity: 1;
    `;

    // Calculate the maximum radius needed to cover the entire screen from the center point
    const maxRadius = Math.sqrt(
      Math.pow(Math.max(centerX, window.innerWidth - centerX), 2) +
        Math.pow(Math.max(centerY, window.innerHeight - centerY), 2),
    );

    // Set initial clip-path as a small circle at the click point
    overlay.style.clipPath = `circle(0px at ${centerX}px ${centerY}px)`;

    document.body.appendChild(overlay);

    // Start the expansion animation
    requestAnimationFrame(() => {
      overlay.style.clipPath = `circle(${maxRadius + 50}px at ${centerX}px ${centerY}px)`;
    });

    // Return the timing for theme change (after expansion is complete)
    return 500; // Theme changes when expansion is done
  };

  const toggleTheme = () => {
    const isDarkMode = resolvedTheme === "dark";
    const newTheme = isDarkMode ? "light" : "dark";

    // Get click position relative to viewport
    const rect = buttonRef.current?.getBoundingClientRect();
    const centerX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const centerY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. If user prefers reduced motion, skip transitions
    if (prefersReducedMotion) {
      setTheme(newTheme);
      return;
    }

    // 2. Use View Transitions API if supported
    if (typeof document !== "undefined" && (document as any).startViewTransition) {
      const maxRadius = Math.hypot(
        Math.max(centerX, window.innerWidth - centerX),
        Math.max(centerY, window.innerHeight - centerY)
      );

      document.documentElement.style.setProperty("--x", `${centerX}px`);
      document.documentElement.style.setProperty("--y", `${centerY}px`);
      document.documentElement.style.setProperty("--r", `${maxRadius}px`);

      (document as any).startViewTransition(() => {
        flushSync(() => {
          setTheme(newTheme);
        });
      });

      // Scale bounce click feedback
      if (buttonRef.current) {
        anime(buttonRef.current, {
          scale: [1, 1.15, 1],
          duration: 300,
          easing: "easeOutQuart",
          complete: () => {
            if (buttonRef.current) {
              buttonRef.current.style.transform = "";
            }
          },
        });
      }
      return;
    }

    // 3. Fallback: Custom manual transition
    const themeChangeDelay = createSwwwCenterTransition(centerX, centerY, isDarkMode);

    // Change theme at the perfect timing (when overlay expansion is complete)
    setTimeout(() => {
      setTheme(newTheme);

      // Start fade out after theme change
      setTimeout(() => {
        const overlays = document.querySelectorAll('div[style*="z-index: 99999"]');
        overlays.forEach((overlay) => {
          (overlay as HTMLElement).style.opacity = "0";
        });

        // Clean up after fade out
        setTimeout(() => {
          overlays.forEach((overlay) => {
            if (overlay.parentNode) {
              overlay.parentNode.removeChild(overlay);
            }
          });
          document.body.classList.remove("theme-transitioning");
        }, 300); // Wait for fade out
      }, 50); // Small delay after theme change
    }, themeChangeDelay);

    // Button animation for fallback
    if (buttonRef.current) {
      anime(buttonRef.current, {
        scale: [1, 1.15, 1],
        duration: 300,
        easing: "easeOutQuart",
        complete: () => {
          if (buttonRef.current) {
            buttonRef.current.style.transform = "";
          }
        },
      });
    }
  };

  if (!mounted) {
    return <div className="h-10 w-10" />;
  }

  const isDarkMode = resolvedTheme === "dark";

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:scale-110 transition-transform duration-200"
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} theme`}
      aria-checked={isDarkMode}
      role="switch"
    >
      <div
        className={`sun absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
          isDarkMode ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 rotate-180"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-yellow-500"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      </div>
      <div
        className={`moon absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
          isDarkMode ? "opacity-0 scale-50 rotate-180" : "opacity-100 scale-100 rotate-0"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-slate-400"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>
    </button>
  );
}
