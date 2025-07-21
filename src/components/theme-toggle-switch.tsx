
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
        'relative inline-flex h-8 w-[3.75rem] flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'transition-colors duration-300 ease-in-out',
        isDarkMode ? 'bg-primary' : 'bg-muted' // Track color
      )}
    >
      <span className="sr-only">Toggle between dark and light theme</span>
      {/* Thumb - This will be the visible sliding circle */}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-background shadow-lg ring-0',
          'transition-transform duration-300 ease-in-out',
          // Parent width: w-[3.75rem] (60px). Border: 2px each side. Padding: p-0.5 (2px each side).
          // Inner content box width = 60px - 2*2px (border) - 2*2px (padding) = 52px.
          // Thumb width: w-6 (24px).
          // Max translation distance for thumb's left edge = Inner content box width - Thumb width = 52px - 24px = 28px.
          // 28px is 1.75rem.
          isDarkMode ? 'translate-x-[1.75rem]' : 'translate-x-0'
        )}
      >
        {/* Sun Icon - Visible in light mode */}
        <Sun
          className={cn(
            'h-4 w-4 text-ctp-peach',
            'transition-opacity duration-300 ease-in-out',
            isDarkMode ? 'opacity-0' : 'opacity-100'
          )}
        />
        {/* Moon Icon - Visible in dark mode, positioned absolutely to overlap Sun */}
        <Moon
          className={cn(
            'absolute h-4 w-4 text-ctp-sky',
            'transition-opacity duration-300 ease-in-out',
            isDarkMode ? 'opacity-100' : 'opacity-0'
          )}
        />
      </span>
    </button>
  );
}

