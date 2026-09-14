---
name: GameCraft
description: Original Hollow Knight-inspired wayfinding for a bilingual university game-development event.
colors:
  void: "#070a12"
  deep: "#0e1628"
  navy: "#172640"
  surface: "#111c31"
  surface-raised: "#16243d"
  input-well: "#0b1324"
  ivory: "#f1ecdf"
  muted: "#b8c7d5"
  input-placeholder: "#93a6b7"
  ink: "#10182b"
  wayfinding-blue: "#9ddbf5"
  wayfinding-blue-dim: "#5b9fc1"
  cavern-violet: "#8b7bae"
  lantern-gold: "#d8b46c"
  danger: "#f0a8a3"
typography:
  display:
    fontFamily: "Estedad, Vazirmatn, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 900
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Estedad, Vazirmatn, sans-serif"
    fontSize: "1rem"
  label:
    fontFamily: "Estedad, Vazirmatn, sans-serif"
    fontWeight: 750
rounded:
  pill: "999px"
  compact: "12px"
  card: "14px"
  surface: "16px"
spacing:
  compact: "0.5rem"
  control: "1rem"
  panel: "1.25rem"
  page-mobile: "2.5rem"
  page: "clamp(2.5rem, 6vw, 6rem)"
components:
  button-primary:
    backgroundColor: "{colors.wayfinding-blue}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "40px"
  button-secondary:
    backgroundColor: "rgba(14, 22, 40, .3)"
    textColor: "{colors.ivory}"
    rounded: "{rounded.pill}"
    height: "40px"
  card-public:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.card}"
  panel-dashboard:
    backgroundColor: "rgba(13, 21, 39, .96)"
    textColor: "{colors.ivory}"
    rounded: "{rounded.surface}"
    padding: "{spacing.panel}"
---

# Design System: GameCraft

## Overview

**Creative North Star: "The Subterranean Wayfinder Atelier"**

GameCraft is an original, Hollow Knight-inspired world for a bilingual university game-development event. It evokes a quiet illuminated underworld through vaulted arches, route lines, signal nodes, deep layered blue-black space, and rare pools of pale light. It borrows atmosphere and spatial feeling, never Hollow Knight characters, logos, maps, screenshots, or other game assets.

The public experience is a cinematic procession through a subterranean atelier; the authenticated dashboard keeps that atmospheric perimeter but places work on solid, legible task surfaces. Persian and English are first-class: Estedad and Vazirmatn provide a unified, highly readable voice in either direction.

**Key Characteristics:**
- Deep, cool architectural darkness balanced by warm ivory reading surfaces.
- Bioluminescent blue is the interaction signal and navigational thread.
- Arched linework, not borrowed imagery, carries the Hollow Knight-inspired mood.
- Rounded, high-contrast controls make the fantasy operational rather than ornamental.

## Colors

The palette is nocturnal and mineral: near-black depths establish scale, ivory restores readability, and blue light marks routes, actions, and points of attention.

### Primary
- **Wayfinding Blue:** The active signal for primary calls to action, key icons, active navigation, and luminous borders.
- **Dim Signal Blue:** The quieter companion for gradients, route lines, and ambient glows.

### Secondary
- **Cavern Violet:** A low-volume atmospheric counterpoint in background light, never a competing action color.
- **Lantern Gold:** The legacy light-theme action color; reserve it for the non-wayfinder public shell where its existing token applies.

### Neutral
- **Void:** The deepest public and authenticated-world backdrop.
- **Deep:** The blue-black transitional ground between void and surfaces.
- **Navy:** A structural mid-depth for gradients and layered spaces.
- **Raised Surface:** The solid dashboard card and task surface.
- **Input Well:** The dark, recessed field background used for dashboard data entry.
- **Ivory:** Primary text and bright points of light against dark environments.
- **Muted Mist:** Secondary text in the dashboard.
- **Placeholder Mist:** The intentionally subdued input hint color.
- **Ink:** Dark text on the luminous primary button.

**The Signal-Not-Fill Rule.** Wayfinding Blue guides actions and geometry; it must stay sparse enough that a new blue element is immediately meaningful.

## Typography

**Display Font:** Estedad, with Vazirmatn and sans-serif fallbacks.
**Body Font:** Estedad, with Vazirmatn and sans-serif fallbacks.

**Character:** Heavy, tightly tracked display headings feel carved into the environment, while the Persian-capable text stack keeps programme information and dashboard tasks calm and direct.

### Hierarchy
- **Display** (900, `clamp(2.5rem, 6vw, 5rem)`, 0.98): Major route and page titles; use the tighter `clamp(3.4rem, 16vw, 5rem)` mobile homepage treatment only where already established.
- **Headline** (900): Section-level event and dashboard headings.
- **Title** (800): Card titles, names, and compact section labels.
- **Body** (400, 1rem): Explanatory and programme copy; public home copy stays within 70ch.
- **Label** (750): Buttons and compact interactive controls.

**The Carved Title Rule.** Large headings are short, dense, and high contrast; never substitute decorative display fonts or excessive letter spacing that harms Persian legibility.

## Layout

Public pages use a centered 1180px maximum content measure with `clamp(2.5rem, 6vw, 6rem)` vertical breathing room and 1.5rem outer gutters; mobile narrows this to 1rem gutters and 2.5rem vertical padding. Major public sections form a procession of full-width dark gradients, with subtle arch frames and route marks connecting them.

The desktop dashboard is a two-part vestibule: a navigation column capped at 298px beside a large content surface. At 991px and below, the content becomes full width; at 600px, panel padding contracts while hierarchy remains intact. Use responsive space to preserve reading and tapping room, not to cram more decoration into the viewport.

## Elevation & Depth

Depth comes from tonal layering first: void, deep field, navy structure, then raised task surface. Public panels receive diffuse black shadow to sit in the cavern; dashboard cards stay flatter and rely on blue-tinted borders so task UI is steady rather than floaty. Radial glows are ambient light, not a substitute for contrast.

### Shadow Vocabulary
- **Public card lift** (`0 19px 42px rgba(0, 0, 0, .2)`): Gives public content a soft separation from the atmospheric field.
- **Archive/panel lift** (`0 24px 54px rgba(0, 0, 0, .23)`): Anchors large public panels.
- **Dashboard frame** (`0 24px 55px rgba(0, 0, 0, .24)`): Separates the navigation and content vessels from the background.
- **Signal glow** (`0 0 24px rgba(91, 159, 193, .2)`): Reserved for waymarks, sigils, and a small number of interactive indicators.

**The Quiet Work Surface Rule.** Dashboard task cards do not acquire dramatic shadows on hover; their borders and hierarchy stay stable so users can operate confidently.

## Shapes

Controls are pill-shaped, compact cards use gentle 14px corners, and major surfaces use 16px corners. The signature silhouette is a flattened vault: a rounded top that resolves to a square base (`50% 50% 0 0 / ...`), repeated in frames, artwork placeholders, and sigils. Circular nodes and avatars are only for explicit wayfinding points or people.

## Components

### Buttons
- **Character:** Precise luminous controls that read as route choices.
- **Shape:** Full pill (`999px`), at least 40px tall, with strong 750-weight labels.
- **Primary:** Wayfinding Blue surface with Ink text; in the legacy light shell, Lantern Gold remains the established primary action.
- **Hover / Focus:** Public primary controls can lift 1px; secondary controls sharpen their blue border. Every keyboard focus uses a 3px high-contrast outline with a 3px offset.
- **Secondary / Ghost:** Ivory text over a translucent Deep field with a blue-tinted border. Do not flatten them to bare text links when the action matters.

### Cards / Containers
- **Character:** Solid waystations in a larger dark world.
- **Corner Style:** 14px for cards; 16px for main panels.
- **Background:** Public cards use Surface; dashboard tasks use Raised Surface inside a Deep panel.
- **Shadow Strategy:** Soft lift for public cards, almost no inner-card shadow in the dashboard.
- **Border:** Fine translucent blue (`rgba(157, 219, 245, .18-.2)`) establishes structure without visual noise.
- **Internal Padding:** Usually 1.25rem, reduced on small screens.

### Inputs / Fields
- **Style:** A dark recessed fill, ivory text, and a translucent blue border.
- **Focus:** Use the global high-contrast visible focus outline; active dropzones may strengthen to Wayfinding Blue.
- **Error / Disabled:** Error uses the established pale coral danger color; never rely on color alone to convey a field state.

### Navigation
- **Character:** A compact route ledger rather than a generic menu.
- **Style:** Dashboard navigation is a Deep framed panel; entries are full-width, left/start aligned, and muted at rest.
- **Active state:** A blue-tinted fill, strengthened border, and a small glowing circular waymark identify the current route.
- **Mobile treatment:** The dashboard route ledger moves into a dark drawer; public navigation switches to a round menu control.

### Wayfinding Artwork
- **Style:** Abstract SVG vaults, dashed route lines, nodes, and a sigil form the owned substitute for environmental art while final artwork is unavailable.
- **Rule:** Keep all illustration original and abstract; label planned artwork accessibly rather than implying that it has loaded.

## Do's and Don'ts

### Do:
- **Do** use Void, Deep, and Raised Surface in that order to create navigable depth.
- **Do** let Wayfinding Blue identify the primary next action, active route, focus treatment, or meaningful geometry.
- **Do** preserve Estedad/Vazirmatn and test both RTL Persian and LTR English layouts.
- **Do** use original arched geometry, route lines, and light nodes to sustain the subterranean mood.
- **Do** respect reduced-motion preferences; the existing arch breath and route drift are optional atmosphere.

### Don't:
- **Don't** use Hollow Knight characters, logos, maps, screenshots, or copied game assets.
- **Don't** turn every card, divider, and icon blue; blue is a scarce navigation signal.
- **Don't** replace solid dashboard task surfaces with cinematic transparency that weakens text and form contrast.
- **Don't** use hard square controls or arbitrary corner radii outside the established pill, 14px, and 16px vocabulary.
- **Don't** add decorative imagery that competes with programme information, enrolment, or account tasks.
