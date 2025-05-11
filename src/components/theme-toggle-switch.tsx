
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
          // Button width: w-[3.75rem] (60px). Padding p-0.5 (1px each side for border effectively). Inner track for thumb = 60px - 2px = 58px.
          // Thumb width: w-6 (24px).
          // Max translation distance = 58px - 24px = 34px.
          // 34px is approx 2.125rem. Tailwind's 'translate-x-8' is 2rem. We need slightly more.
          // Let's use calc: w-[3.75rem] - w-6 - p-0.5*2 => 3.75rem - 1.5rem - 0.25rem = 2rem
          // The padding on the parent is 0.5 (2px). Thumb is 24px. Parent is 60px.
          // Space for thumb to travel: 60px (parent width) - 2*2px (parent padding) - 24px (thumb width) = 32px = 2rem.
          isDarkMode ? 'translate-x-[2rem]' : 'translate-x-0' // translate-x-8 (2rem)
        )}
      >
        {/* Sun Icon - Visible in light mode */}
        <Sun
          className={cn(
            'h-4 w-4 text-amber-600 transition-opacity duration-200 ease-in-out', // Changed to amber-600 for better visibility
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
