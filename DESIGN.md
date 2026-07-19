---
name: Fridge Feast
description: AI-powered recipe generation from available ingredients
colors:
  primary-lavender: "#b4befe"
  primary-lavender-hover: "#9f9ff5"
  primary-lavender-text: "#dce0e8"
  accent-mauve: "#cba6f7"
  accent-mauve-hover: "#b48ff5"
  accent-mauve-text: "#dce0e8"
  destructive-rose: "#f38ba8"
  text-body: "#4c4f69"
  text-subtle: "#6c6f85"
  text-muted: "#9ca0b0"
  bg-page: "#eff1f5"
  bg-card: "#ccd0da"
  bg-surface-subtle: "#bcc0cc"
  border-light: "#bcc0cc"
  input-bg: "#ccd0da"
  ring-blue: "#89b4fa"
  dark-text-body: "#cdd6f4"
  dark-text-subtle: "#a6adc8"
  dark-text-muted: "#6c7086"
  dark-bg-page: "#1e1e2e"
  dark-bg-card: "#313244"
  dark-bg-surface-subtle: "#45475a"
  dark-border-light: "#45475a"
  dark-input-bg: "#313244"
typography:
  display:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontWeight: 700
  headline:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontWeight: 600
  title:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontWeight: 500
  body:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontWeight: 400
  label:
    fontFamily: "Geist Variable, system-ui, sans-serif"
    fontWeight: 500
  mono:
    fontFamily: "Geist Mono Variable, monospace"
    fontWeight: 400
rounded:
  sm: "calc(0.5rem - 4px)"
  md: "calc(0.5rem - 2px)"
  lg: "0.5rem"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "40px"
components:
  button-primary:
    backgroundColor: "{colors.primary-lavender}"
    textColor: "{colors.primary-lavender-text}"
    rounded: "{rounded.lg}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-lavender-hover}"
    textColor: "{colors.primary-lavender-text}"
    rounded: "{rounded.lg}"
    padding: "16px 24px"
  card:
    backgroundColor: "{colors.bg-card}"
    rounded: "{rounded.lg}"
    padding: "24px"
  input:
    backgroundColor: "{colors.input-bg}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
---

# Design System: Fridge Feast

## 1. Overview

**Creative North Star: "The Pantry"**

Fridge Feast's visual system is a pantry: calm, cool-toned wood and stone shelves (the Catppuccin Latte/Mocha base) holding small jars of warm color — peach, rosewater, yellow, green — each one an ingredient waiting to become a meal. The palette is restrained by default and accent-warm by intent, never decorative for its own sake.

The system rests on a cool neutral body background (Latte's `#eff1f5`, Mocha's `#1e1e2e`) and uses the pastel accent range only where it carries meaning: the primary CTA, the chef-hat logo, the badge on a recipe result. Color rarity is the point; on most screens, accent covers less than 10% of the surface area. This is the Pantry's "low-saturation shelf, high-saturation ingredient" doctrine.

What this system explicitly rejects: sterile white meal-plan dashboards, dark "pro chef" apps, glassmorphism, gradient text, the SaaS card-grid-everywhere template, and any aesthetic that signals "AI" before it signals "kitchen."

**Key Characteristics:**
- Cool-toned neutral canvas with warm pastel accents used sparingly
- Light mode (Latte) and dark mode (Mocha) are equal citizens, switched via a circular-reveal "swww-style" transition
- Catppuccin's signature pastel palette is the accent range — peach, rosewater, mauve, lavender, green — each with a named role
- Typography: single-family (Geist Variable), expressive through weight and size rather than stacking faces
- Cards and containers use tonal layering (surface0/surface1/surface2) instead of heavy shadows
- Motion is purposeful: the theme toggle is a statement, everything else is quiet state transitions

## 2. Colors

The palette is the Catppuccin system, split across Latte (light) and Mocha (dark). The cool neutral base (hue ~220-229) is the canvas; the warm-to-cool pastel accents are the ingredients.

### Light Mode (Catppuccin Latte)

**Background** (`#eff1f5`): The page. A cool, very light gray-tinted white — not cream, not paper. Reads as clean and calm, never sterile.
**Card/Container** (`#ccd0da`): surface0. Subtly deeper than the page, enough to separate content without a stroke.
**Surface-subtle** (`#bcc0cc`): surface1. For secondary containers, collapsible sections.

**Primary — Lavender** (`#b4befe`): CTAs, logo, interactive highlights. A soft blue-purple that sits cool on the palette but reads as friendly. Never aggressive.
**Accent — Mauve** (`#cba6f7`): Secondary buttons, badges, decorative accents. Purpler than lavender; used sparingly.
**Destructive — Rose** (`#f38ba8`): Error states, destructive actions. A desaturated pink-red that signals without alarming.

**Body Text** (`#4c4f69`): ~7.5:1 contrast on background.
**Subtle Text** (`#6c6f85`): Secondary information, metadata.
**Muted Text** (`#9ca0b0`): Placeholder text, disabled states. 5.5:1 on background — meets AA.

**Border** (`#bcc0cc`): Hairline separators, input strokes. As light as possible while staying visible.
**Ring** (`#89b4fa`): Focus indicators. A distinct blue that doesn't blend with lavender primary.

### Dark Mode (Catppuccin Mocha)

**Background** (`#1e1e2e`): Deep cool navy-gray. Warm candlelight of the accent colors glows against it.
**Card** (`#313244`): surface0.
**Surface-subtle** (`#45475a`): surface1.

**Body Text** (`#cdd6f4`): Soft off-white. ~12:1 on background.
**Subtle Text** (`#a6adc8`): Still legible at 7.5:1.
**Muted Text** (`#6c7086`): Placeholder text, ~4.5:1.

**Border** (`#45475a`): Same as surface1.
**Ring** (`#89b4fa`): Same blue, works identically on dark.

### Accent Color Family (both modes)

Catppuccin's full accent palette is available via `ctp-*` Tailwind classes and CSS variables. These are the ingredients:

- **Rosewater** (`#f5e0dc`): Gentle warmth, background-level accent tone
- **Flamingo** (`#f2cdcd`): Slightly deeper rosewater
- **Pink** (`#f5c2e7`): Playful, rare
- **Mauve** (`#cba6f7`): The named accent (see above)
- **Red** (`#f38ba8`): Destructive (see above)
- **Maroon** (`#eba0ac`): Warm error alternative
- **Peach** (`#fab387`): The warm accent for highlights, badges, "warm" states
- **Yellow** (`#f9e2af`): Soft emphasis, attention without alarm
- **Green** (`#a6e3a1`): Success states, dietary tags
- **Teal** (`#94e2d5`): Cool alternative accent
- **Sky** (`#89dceb`): Info badges, helper hints
- **Sapphire** (`#74c7ec`): Link color
- **Blue** (`#89b4fa`): Ring/focus (see above)
- **Lavender** (`#b4befe`): Primary (see above)

**Named Rules:**

**The Ingredient Rule.** Accent colors cover ≤10% of any given screen. Their rarity is the point. When every element has a pastel background, nothing is accented.

**The Cool Shelf Rule.** The body background is always the cool-neutral Catppuccin base. Warm tints on the page bg are prohibited — warmth lives in the accents, not the canvas.

## 3. Typography

**Display/Body Font:** Geist Variable (with system-ui, sans-serif fallback)
**Label/Mono Font:** Geist Mono Variable (with monospace fallback)

A single geometric sans-serif family, used expressively through weight and tracking rather than by stacking faces. Geist at 700 for headlines reads confident but not loud; its variable axis lets intermediate weights (450, 550) exist where an extra face would once have gone. The pairing is Geist + Geist Mono — same DNA, different width.

**Character:** Calm and capable. No serif warmth, no humanist curve. The typeface knows it's a tool, but a well-made one. It does not compete with the food imagery; it frames it.

### Hierarchy

- **Display** (700, `clamp(2rem, 5vw, 3.5rem)`, 1.1): Product name, hero moments. `text-wrap: balance`. Used only on the app title and potential campaign headlines.
- **Headline** (600, `clamp(1.25rem, 3vw, 1.75rem)`, 1.2): Card titles, section headers. `text-wrap: balance`.
- **Title** (500, `1rem`, 1.4): Form section labels, recipe names in cards.
- **Body** (400, `0.938rem`, 1.6): All prose, recipe instructions, descriptions. Max width 70ch.
- **Label** (500, `0.875rem`, normal): Form labels, button text, metadata.
- **Caption / Mono** (400, `0.813rem`, 1.4): Keyboard shortcuts, secondary metadata, timestamps.

### Named Rules

**The Single Family Rule.** Every text role uses Geist or Geist Mono. No serif, no humanist, no display face. Distinction comes from weight, size, and letter-spacing, not family.

## 4. Elevation

The system uses tonal layering as its primary depth cue, not shadows. Containers sit at different lightness levels of the same hue (base → surface0 → surface1 → surface2), creating a stacked-paper feel without drop shadows. This is Catppuccin's native approach and carries through unchanged.

Shadows exist only as interaction feedback: hover states on buttons, focus rings on inputs. They are shallow (`0 4px 6px -1px rgb(0 0 0 / 0.1)`) and subtle. The theme toggle's circular-reveal overlay uses no shadow at all — depth is the clip-path expansion.

### Shadow Vocabulary

- **Interaction Shadow** (`box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)`): Button and card hover states only.
- **Card Shadow** (`box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1)`): Visible in the "shadow-lg" utility on recipe input and result cards. Modest, never aggressive.

### Named Rules

**The Flat-Back Rule.** Background surfaces (page, card, surface) never carry shadows. Shadows belong only to interactive or elevated elements. A card that's just a container has no shadow; a card that's clickable does.

## 5. Components

### Buttons

- **Shape:** Gently rounded (0.5rem / `rounded-lg`)
- **Primary (Generate Recipe, Submit):** Lavender bg (`#b4befe` light / `#b4befe` dark), crust text (`#dce0e8` light / `#11111b` dark). Hover: darkens via opacity/scale. Width: full-width on mobile, auto on desktop.
- **Secondary (Reset, Cancel):** surface1 bg, text-body text. No shadow at rest.
- **States:** Hover: `scale(1.02)` + shadow interaction. Focus: ring-blue (`#89b4fa`). Disabled: muted text, no interaction. Active: `scale(0.98)`.
- **Loading:** Replaces icon + label with spinner + "Generating..." — same dimensions, no layout shift.

### Cards

- **Corner Style:** Rounded (0.5rem / `rounded-lg`)
- **Background:** surface0 (`#ccd0da` light / `#313244` dark)
- **Shadow Strategy:** `shadow-lg` on actionable cards (recipe form, recipe result), no shadow on decorative containers
- **Border:** None at rest. Hairline border (`border`) on form cards.
- **Internal Padding:** 24px (`p-6`)
- **Header/Content split:** CardHeader (title + description) is flush top; CardContent holds the form or result.

### Inputs / Fields

- **Style:** surface0 background (`#ccd0da` / `#313244`), surface1 border (`#bcc0cc` / `#45475a`), round-lg corners (0.5rem)
- **Focus:** Blue ring (`#89b4fa`) with 2px offset
- **Placeholder:** overlay0 muted text (`#9ca0b0` / `#6c7086`)
- **Textarea:** Minimum height 100px, `resize-y` vertically
- **Error:** Red border + ring + FormMessage below

### Select (Difficulty)

- **Trigger:** Matches input style (same bg, border, radius)
- **Dropdown:** Popover bg (`surface0`), text-body items
- **Item states:** Hover/focus on surface1, selected on accent

### Badge (Cook Time)

- **Style:** Accent bg (mauve `#cba6f7`), accent-foreground text, `w-fit` inline
- **Radius:** `rounded-full` or `rounded-md` depending on context

### Theme Toggle

- **Style:** Circular (rounded-full), 40x40px, border-2 transparent
- **Icon:** Sun (yellow-500) / Moon (slate-400) SVG inline, crossfade on state change
- **Interaction:** Scale bounce on click, circular clip-path expansion (swww-style center transition) covering the full viewport. 800ms expansion → theme switch → 400ms overlay fade-out
- **Reduced motion:** Skips the clip-path animation, does a direct theme switch

### Recipe Result Card

- **Header:** Recipe name as h2 (`text-2xl`, font-bold), cook time badge nested
- **Content:** Instructions as `whitespace-pre-wrap` body text (`text-foreground/90`)

## 6. Do's and Don'ts

### Do:

- **Do** use the Catppuccin cool-neutral base (`#eff1f5` / `#1e1e2e`) as the page background. Warm tints on the body are forbidden.
- **Do** limit accent colors to ≤10% of any given screen. One lavender button, one mauve badge — not a rainbow panel.
- **Do** use tonal layering (base → surface0 → surface1 → surface2) for depth instead of shadows.
- **Do** reserve shadows for interactive states (hover, focus) and actionable cards only.
- **Do** use Geist Variable at various weights for all text. No font-stacking.
- **Do** use `text-wrap: balance` on h1–h3 and `text-wrap: pretty` on long recipe instructions.
- **Do** respect `prefers-reduced-motion`: skip the circular-reveal theme transition, skip card entrance animations.
- **Do** keep body text contrast at ≥4.5:1. `text-foreground/80` on `--background` is ~7:1 in both modes; verify any custom overlay.
- **Do** cap body line length at 70ch for recipe instructions.

### Don't:

- **Don't** use gradient text (`background-clip: text` with gradient). Solid colors only.
- **Don't** use glassmorphism (frosted glass, backdrop-blur as decoration).
- **Don't** use border-left or border-right as a colored accent stripe on cards or alerts. Full borders or nothing.
- **Don't** stack cards inside cards. A card's content area is flat.
- **Don't** use the hero-metric pattern (big number, small label, gradient line). It has no place in a recipe tool.
- **Don't** use uppercase tracked eyebrows ("ABOUT", "INGREDIENTS", "RECIPE") above every section. One deliberate kicker is voice; every section is AI grammar.
- **Don't** default to muted gray for placeholder text (`#9ca0b0` / `#6c7086` hits 5.5:1, which is the floor, not a target); bump to subtext0 if readability needs it.
- **Don't** use numbered section markers (01 / 02 / 03) as default scaffolding.
- **Don't** animate CSS layout properties (width, height, position, margin). Stick to transform and opacity.
- **Don't** let text overflow its container at any breakpoint. Clamp down heading sizes first; rewrite copy second.
- **Don't** gate content visibility behind JS-triggered reveal animations. Content must render before it animates.
- **Don't** use the SaaS card-grid template: identical cards with icon + heading + text, repeated in a 3-column row. Fridge Feast is not a B2B dashboard.
