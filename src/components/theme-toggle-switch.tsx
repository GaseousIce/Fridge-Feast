
'use client';

import type { SVGProps } from 'react';
import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';

export function ThemeToggleSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme(); // Use resolvedTheme for system
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering on server or until theme is known to prevent hydration mismatch
  // and layout shift. The placeholder should match the dimensions of the switch.
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
        isDarkMode ? 'bg-primary' : 'bg-muted' // Track background
      )}
    >
      <span className="sr-only">Toggle between dark and light theme</span>
      {/* Thumb */}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none relative inline-block h-6 w-6 transform rounded-full bg-background shadow-lg ring-0 transition-transform duration-200 ease-in-out',
          // Button width w-[3.75rem] (60px). Padding p-0.5 (2px each side). Thumb w-6 (24px).
          // Space for thumb movement: 60px - 4px (total horizontal padding) - 24px (thumb width) = 32px.
          // Tailwind class for 32px is `translate-x-8`.
          isDarkMode ? 'translate-x-8' : 'translate-x-0'
        )}
      >
        {/* Icons inside the thumb, one visible at a time */}
        <span
          className={cn(
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
            isDarkMode ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in'
          )}
          aria-hidden="true"
        >
          <Sun className="h-4 w-4 text-muted-foreground" />
        </span>
        <span
          className={cn(
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
            isDarkMode ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out'
          )}
          aria-hidden="true"
        >
          <Moon className="h-4 w-4 text-primary-foreground" />
        </span>
      </span>
    </button>
  );
}
