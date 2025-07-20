'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import anime from 'animejs/lib/anime.es.js';

export function AnimatedThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const isDarkMode = resolvedTheme === 'dark';
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);

    const sun = document.querySelector('.sun');
    const moon = document.querySelector('.moon');

    anime({
      targets: sun,
      translateY: isDarkMode ? [0, -40] : [-40, 0],
      opacity: isDarkMode ? [1, 0] : [0, 1],
      duration: 500,
      easing: 'easeInOutQuad',
    });

    anime({
      targets: moon,
      translateY: isDarkMode ? [40, 0] : [0, 40],
      opacity: isDarkMode ? [0, 1] : [1, 0],
      duration: 500,
      easing: 'easeInOutQuad',
    });
  };

  if (!mounted) {
    return <div className="h-10 w-10" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="sun absolute inset-0 flex items-center justify-center">
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
      <div className="moon absolute inset-0 flex items-center justify-center">
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
