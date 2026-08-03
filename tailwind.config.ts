import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: "2rem",
  		screens: {
  			"2xl": "1400px",
  		}
  	},
  	extend: {
  		colors: {
  			border: "hsl(var(--border))",
  			input: "hsl(var(--input))",
  			ring: "hsl(var(--ring))",
  			background: "hsl(var(--background))",
  			foreground: "hsl(var(--foreground))",
  			primary: {
  				DEFAULT: "hsl(var(--primary))",
  				foreground: "hsl(var(--primary-foreground))",
  			},
  			secondary: {
  				DEFAULT: "hsl(var(--secondary))",
  				foreground: "hsl(var(--secondary-foreground))",
  			},
  			destructive: {
  				DEFAULT: "hsl(var(--destructive))",
  				foreground: "hsl(var(--destructive-foreground))",
  			},
  			muted: {
  				DEFAULT: "hsl(var(--muted))",
  				foreground: "hsl(var(--muted-foreground))",
  			},
  			accent: {
  				DEFAULT: "hsl(var(--accent))",
  				foreground: "hsl(var(--accent-foreground))",
  			},
  			popover: {
  				DEFAULT: "hsl(var(--popover))",
  				foreground: "hsl(var(--popover-foreground))",
  			},
  			card: {
  				DEFAULT: "hsl(var(--card))",
  				foreground: "hsl(var(--card-foreground))",
  			},
        // Catppuccin Colors
        ctp:
         {
           rosewater: "#f5e0dc",
           flamingo: "#f2cdcd",
           pink: "#f5c2e7",
           mauve: "#cba6f7",
           red: "#f38ba8",
           maroon: "#eba0ac",
           peach: "#fab387",
           yellow: "#f9e2af",
           green: "#a6e3a1",
           teal: "#94e2d5",
           sky: "#89dceb",
           sapphire: "#74c7ec",
           blue: "#89b4fa",
           lavender: "#b4befe",
           text: "#4c4f69", // latte
           subtext1: "#5c5f77", // latte
           subtext0: "#6c6f85", // latte
           overlay2: "#7c7f93", // latte
           overlay1: "#8c8fa1", // latte
           overlay0: "#9ca0b0", // latte
           surface2: "#acb0be", // latte
           surface1: "#bcc0cc", // latte
           surface0: "#ccd0da", // latte
           base: "#eff1f5", // latte
           mantle: "#e6e9ef", // latte
           crust: "#dce0e8", // latte

           // mocha
           m_rosewater: "#f5e0dc",
           m_flamingo: "#f2cdcd",
           m_pink: "#f5c2e7",
           m_mauve: "#cba6f7",
           m_red: "#f38ba8",
           m_maroon: "#eba0ac",
           m_peach: "#fab387",
           m_yellow: "#f9e2af",
           m_green: "#a6e3a1",
           m_teal: "#94e2d5",
           m_sky: "#89dceb",
           m_sapphire: "#74c7ec",
           m_blue: "#89b4fa",
           m_lavender: "#b4befe",
           m_text: "#cdd6f4",
           m_subtext1: "#bac2de",
           m_subtext0: "#a6adc8",
           m_overlay2: "#9399b2",
           m_overlay1: "#7f849c",
           m_overlay0: "#6c7086",
           m_surface2: "#585b70",
           m_surface1: "#45475a",
           m_surface0: "#313244",
           m_base: "#1e1e2e",
           m_mantle: "#181825",
           m_crust: "#11111b",
         },
  		},
  		borderRadius: {
  			lg: "var(--radius)",
  			md: "calc(var(--radius) - 2px)",
  			sm: "calc(var(--radius) - 4px)",
  		},
  		keyframes: {
  			"accordion-down": {
  				from: { height: "0" },
  				to: { height: "var(--radix-accordion-content-height)" },
  			},
  			"accordion-up": {
  				from: { height: "var(--radix-accordion-content-height)" },
  				to: { height: "0" },
  			},
  		},
  		animation: {
  			"accordion-down": "accordion-down 0.2s ease-out",
  			"accordion-up": "accordion-up 0.2s ease-out",
  		},
  	},
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
