'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { animate } from 'animejs';

export function AnimatedThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const createSwwwCenterTransition = (centerX: number, centerY: number, isDarkToLight: boolean) => {
    // Add body class to prevent interactions during transition
    document.body.classList.add('theme-transitioning');
    
    // Create overlay that will be the "new" theme background
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: ${isDarkToLight ? 'hsl(var(--background))' : 'hsl(var(--background))'};
      z-index: 9999;
      pointer-events: none;
      will-change: clip-path;
    `;

    // Calculate the maximum radius needed to cover the entire screen from the center point
    const maxRadius = Math.sqrt(
      Math.pow(Math.max(centerX, window.innerWidth - centerX), 2) +
      Math.pow(Math.max(centerY, window.innerHeight - centerY), 2)
    );

    // Set initial clip-path as a small circle at the click point
    overlay.style.clipPath = `circle(0px at ${centerX}px ${centerY}px)`;
    
    document.body.appendChild(overlay);

    // Create a more sophisticated animation object for smooth interpolation
    const animation = {
      radius: 0,
      opacity: 1
    };

    animate(animation, {
      radius: maxRadius + 100, // Extra padding for complete coverage
      duration: 900,
      easing: 'cubicBezier(0.25, 0.46, 0.45, 0.94)', // Custom easing similar to swww
      update: () => {
        overlay.style.clipPath = `circle(${animation.radius}px at ${centerX}px ${centerY}px)`;
      },
      complete: () => {
        // Remove overlay and restore interactions
        setTimeout(() => {
          if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
          }
          document.body.classList.remove('theme-transitioning');
        }, 150);
      }
    });

    // Add a subtle shadow/glow effect that follows the circle expansion
    const shadowOverlay = document.createElement('div');
    shadowOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9998;
      pointer-events: none;
      background: radial-gradient(circle at ${centerX}px ${centerY}px, 
        ${isDarkToLight ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 0%, 
        transparent 30%);
      opacity: 0;
    `;
    
    document.body.appendChild(shadowOverlay);

    animate(shadowOverlay, {
      opacity: [0, 0.5, 0],
      duration: 900,
      easing: 'easeInOutQuad',
      complete: () => shadowOverlay.remove()
    });

    // Add small particles effect around the expansion point
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      const angle = (i / 12) * Math.PI * 2;
      const distance = 30 + Math.random() * 20;
      
      particle.style.cssText = `
        position: fixed;
        left: ${centerX + Math.cos(angle) * distance}px;
        top: ${centerY + Math.sin(angle) * distance}px;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: ${isDarkToLight ? 'hsl(var(--primary))' : 'hsl(var(--primary))'};
        border-radius: 50%;
        z-index: 10001;
        pointer-events: none;
        opacity: 0.7;
      `;
      
      document.body.appendChild(particle);
      
      animate(particle, {
        translateX: Math.cos(angle) * (distance + 100),
        translateY: Math.sin(angle) * (distance + 100),
        scale: [1, 0],
        opacity: [0.7, 0],
        duration: 800,
        delay: Math.random() * 200,
        easing: 'easeOutQuad',
        complete: () => particle.remove()
      });
    }
  };

  const toggleTheme = () => {
    const isDarkMode = resolvedTheme === 'dark';
    const newTheme = isDarkMode ? 'light' : 'dark';
    
    // Get click position relative to viewport
    const rect = buttonRef.current?.getBoundingClientRect();
    const centerX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const centerY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    // Start the swww-style center transition
    createSwwwCenterTransition(centerX, centerY, isDarkMode);

    // Animate button icons with a more dramatic effect
    const sun = document.querySelector('.sun');
    const moon = document.querySelector('.moon');

    if (sun) {
      animate(sun, {
        translateY: isDarkMode ? [0, -60] : [-60, 0],
        opacity: isDarkMode ? [1, 0] : [0, 1],
        scale: isDarkMode ? [1, 0.5] : [0.5, 1],
        rotate: isDarkMode ? [0, 180] : [180, 0],
        duration: 600,
        easing: 'easeOutBack(1.7)',
      });
    }

    if (moon) {
      animate(moon, {
        translateY: isDarkMode ? [60, 0] : [0, 60],
        opacity: isDarkMode ? [0, 1] : [1, 0],
        scale: isDarkMode ? [0.5, 1] : [1, 0.5],
        rotate: isDarkMode ? [180, 0] : [0, 180],
        duration: 600,
        easing: 'easeOutBack(1.7)',
      });
    }

    // Animate the button itself
    if (buttonRef.current) {
      animate(buttonRef.current, {
        scale: [1, 1.3, 1],
        rotate: [0, 360],
        duration: 600,
        easing: 'easeOutBack(1.7)'
      });
    }

    // Change theme with timing that matches the visual transition
    setTimeout(() => {
      setTheme(newTheme);
    }, 300); // Change theme halfway through the animation
  };

  if (!mounted) {
    return <div className="h-10 w-10" />;
  }

  const isDarkMode = resolvedTheme === 'dark';

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:scale-110 transition-transform duration-200"
    >
      <div 
        className="sun absolute inset-0 flex items-center justify-center"
        style={{ opacity: isDarkMode ? 0 : 1 }}
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
        className="moon absolute inset-0 flex items-center justify-center"
        style={{ opacity: isDarkMode ? 1 : 0 }}
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
