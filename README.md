# Nova Core — AI Hardware Hub

A fictional product landing page for "Nova Core," a next-generation AI hardware
hub. The page introduces the product with a hero section, a Three.js-powered
3D interactive core, a features grid, a technology breakdown, a specs table,
and a call-to-action section.

## What the webpage is about

Nova Core is presented as an on-device AI hub that keeps inference, memory,
and context on local hardware instead of the cloud. The page walks a visitor
through what the product does (hero), why it matters (features), how it works
(technology), what it's made of (specs), and ends with a call to action.

## Which AI tool I used

Claude (Anthropic).

## How AI helped me create/improve the webpage

- Generated the initial HTML structure, CSS design system, and the Three.js
  animation for the 3D core.
- Diagnosed a bug where the 3D core wasn't rendering (a script load failure)
  by walking through the browser console/network tab step by step.
- Refactored the first draft into a more production-ready version: fixed a
  broken CSS color value, added accessibility features (skip link, focus
  states, semantic HTML, a working mobile navigation menu), and cleaned up
  the JavaScript (debounced resize, paused animation on hidden tabs,
  respected `prefers-reduced-motion`).
- Reworked the visual design to read less like a generic AI template —
  removing decorative numbering that implied a false sequence, dropping
  arrow icons on buttons, using sentence case instead of tracked-out capital
  labels, and pairing a distinct display typeface with the body font.
- Found and fixed a second real bug where a mobile navigation panel was
  showing on all screen sizes instead of only appearing when the menu button
  was tapped.

## Design system

**Color palette**

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#05070a` | Page background |
| `--cyan` | `#22d3ee` | Primary accent (buttons, links, glow effects) |
| `--cyan-bright` | `#67e8f9` | Accent hover state, gradient highlight |
| `--cyan-pale` | `#a5f3fc` | Secondary highlight, inner core wireframe |
| `--indigo` | `#6366f1` | Secondary accent (second orbit ring) |
| `--text` | `#f4f7fa` | Primary text |
| `--text-soft` | `#a7b4c2` | Body copy, descriptions |
| `--muted` | `#718091` | Labels, captions |
| `--border` | `rgba(148, 163, 184, 0.11)` | Card and panel borders |

**Typography**

- Display / headings: Space Grotesk (600–700 weight) — a geometric sans that
  reads as more technical/hardware-appropriate than a default body font.
- Body text: Inter (400–600 weight).

**Layout**

- Max content width: 1180px, centered.
- Border radius scale: 10px (buttons/small), 16px (cards), 24–30px (large
  panels/hero elements).
- Motion: a single continuous 3D core animation as the signature moment,
  restrained hover states elsewhere, and full support for
  `prefers-reduced-motion`.

## Files

- `index.html` — page structure and content
- `styles.css` — design system and layout
- `script.js` — mobile navigation and the Three.js 3D core animation