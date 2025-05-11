
'use client';

import type { SVGProps } from 'react';
import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';

export function ThemeToggleSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-8 w-[3.75rem] rounded-full bg-muted" aria-hidden="true" />;
  }

  const isDarkMode = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDarkMode}
      aria-label="Toggle theme"
      className={cn(
        'relative inline-flex h-8 w-[3.75rem] flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent p-0.5 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        isDarkMode ? 'bg-primary' : 'bg-muted'
      )}
    >
      <span className="sr-only">Toggle between dark and light theme</span>
      {/* Thumb container - now primarily for positioning and animation of the icon */}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none relative inline-block h-6 w-6 transform rounded-full ring-0 transition-transform duration-200 ease-in-out flex items-center justify-center', // Added flex for centering
          // Removed bg-background and shadow-lg to make icon the thumb's visual
          isDarkMode ? 'translate-x-8' : 'translate-x-0'
        )}
      >
        {/* Light mode icon (Sun) */}
        <span
          className={cn(
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
            isDarkMode ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in'
          )}
          aria-hidden="true"
        >
          <Sun className="h-5 w-5 text-[hsl(var(--ctp-text))]" /> {/* Icon is larger and uses theme text color */}
        </span>
        {/* Dark mode icon (Moon) */}
        <span
          className={cn(
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
            isDarkMode ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out'
          )}
          aria-hidden="true"
        >
          <Moon className="h-5 w-5 text-[hsl(var(--ctp-text))]" /> {/* Icon is larger and uses theme text color */}
        </span>
      </span>
    </button>
  );
}

