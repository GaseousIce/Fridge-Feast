
'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';

export function ThemeToggleSwitch() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Placeholder to avoid hydration mismatch and match dimensions
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
        isDarkMode ? 'bg-primary' : 'bg-muted' // Track color
      )}
    >
      <span className="sr-only">Toggle between dark and light theme</span>
      {/* Thumb - This will be the visible sliding circle */}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-background shadow-lg ring-0 transition-transform duration-200 ease-in-out',
          // Calculate translation:
          // Button width: w-[3.75rem] (60px). Padding p-0.5 (2px each side). Inner track for thumb = 60px - 4px = 56px.
          // Thumb width: w-6 (24px).
          // Max translation distance = 56px - 24px = 32px.
          // 32px is 2rem, so 'translate-x-8' (since Tailwind's default spacing unit is 0.25rem).
          isDarkMode ? 'translate-x-[calc(3.75rem-1.5rem-0.25rem-0.25rem)]' : 'translate-x-0' // Adjusted for precise movement within bounds. 3.75rem (parent) - 1.5rem (thumb) - 0.125rem*2 (paddings if any on track for thumb visual)
        )}
      >
        {/* Sun Icon - Visible in light mode */}
        <Sun
          className={cn(
            'h-4 w-4 text-[#FFEB3B] transition-opacity duration-200 ease-in-out', // Changed color to #FFEB3B for better visibility
            isDarkMode ? 'opacity-0' : 'opacity-100'
          )}
        />
        {/* Moon Icon - Visible in dark mode, positioned absolutely to overlap Sun */}
        <Moon
          className={cn(
            'absolute h-4 w-4 text-[hsl(var(--ctp-sky))] transition-opacity duration-200 ease-in-out',
            isDarkMode ? 'opacity-100' : 'opacity-0'
          )}
        />
      </span>
    </button>
  );
}

