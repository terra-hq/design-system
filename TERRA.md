# Terra — how the design works

> Reference for Terra's *Interface* register (the same font, shapes and colour rules as terrahq.com at a denser, calmer size). It comes from the Terra Agents DESIGN.md, sections 1–10. Section 11 of that document (Vue components, Tailwind recipes) is specific to that app and is not included here.
>
> This package (`@terrahq/design-system`) uses the class-naming convention of Terra's sites: `f--` foundation and `u--` utility. See [CONTRIBUTING.md](CONTRIBUTING.md) to decide where something new goes.

**Token names.** In this document colors are called `color-a…i`. In the package they are `$color-a…i`, and the classes are `f--color-*` and `f--background-*`.

---

## 1. Brand essence

Terra is a digital marketing and creative agency: *work with an ally, not an agency*. The design should feel like a sharp, friendly team — confident, fast, a little playful, never corporate.

Four moves make something look like Terra:

1. **Ink and paper.** A near-black `#0f0f0f` and near-whites `#fefefe` / `#f7f8f4` carry almost every surface. Never pure black or pure white.
2. **One warm sans.** Uncut Sans does every job, from 80px headlines to 12px captions.
3. **Bright accents as fills.** Lime, forest, sky, amber, coral and pink show up as pills, dots, blocks and highlights, always with ink text on top.
4. **Soft, rounded shapes.** Containers have generous corners, everything you can click or tag is a capsule, and small artwork and icon buttons are circles.

And a voice to match: lowercase headlines, plain verbs, short sentences with a wink.

---

## 2. Color

### Palette

| Token | Hex | Name | Main role |
|---|---|---|---|
| `color-a` | `#0f0f0f` | Ink | Text, dark surfaces, primary actions |
| `color-b` | `#fefefe` | Paper | Raised surfaces, text on ink |
| `color-c` | `#f7f8f4` | Fog | Page background, quiet sections |
| `color-d` | `#7ce55e` | Lime | Signature accent, success, "on" |
| `color-e` | `#189b5c` | Forest | Success emphasis |
| `color-f` | `#3d9dd8` | Sky | Information |
| `color-g` | `#ffb41d` | Amber | In progress, warning |
| `color-h` | `#f96e43` | Coral | Danger, failure, destructive |
| `color-i` | `#f78bd8` | Pink | Identity, illustration |

### The two rules

**Accents are fills; ink is the text on top.** Every accent passes with ink text (5.4–12.1:1) and none passes as text on a light background (1.6–3.5:1). A lime pill with an ink label is right; lime words on white are not. When an accent has to be text on a light surface, use its `-text` shade (below).

**Large backgrounds are ink, paper, fog or lime.** Full sections, hero blocks and big panels use only those four. The other accents live in smaller pieces: pills, dots, toasts, charts, illustrations.

### Surface and text roles

Interfaces use roles instead of raw colors, so dark mode is just a second set of values.

| Role | Light | Dark | Use |
|---|---|---|---|
| `page` | `#f7f8f4` | `#131410` | Page background |
| `raised` | `#fefefe` | `#1d1e1a` | Cards, menus, modals, inputs, toasts |
| `sunk` | `#eeefe9` | `#0c0d0a` | Table headers, chips, control tracks, modal footers |
| `edge` | `#e3e4dd` | `#2a2b26` | Borders, dividers, table rules |
| `edge-strong` | `#8a8b83` | `#74756d` | Input and checkbox borders |
| `ink` | `#0f0f0f` | `#f7f8f4` | Primary text and primary fills |
| `soft` | `#2a2a28` | `#dcddd6` | Secondary text |
| `mute` | `#5a5b55` | `#9a9b93` | Descriptions, captions, inactive items |
| `faint` | `#8a8b83` | `#65665f` | Placeholders and disabled text only |
| `on-ink` | `#fefefe` | `#131410` | Text on an ink fill |

Accent fills stay the same in both modes, and the text on them is always ink `#0f0f0f`.

### States

| State | Fill (ink text on top) | Text on light | Text on dark |
|---|---|---|---|
| Success | Lime `#7ce55e` | `#137a49` | `#7ce55e` |
| Info | Sky `#3d9dd8` | `#2070a1` | `#3d9dd8` |
| Warning / in progress | Amber `#ffb41d` | `#916100` | `#ffb41d` |
| Danger / failed | Coral `#f96e43` | `#c73406` | `#f96e43` |

Every text shade reaches at least 4.6:1 on its backgrounds. Tinted alert backgrounds use the fill at 18% over `raised`.

### Accent usage

- **Lime** is the signature: highlight blocks, success, selected and "on" states, the hover of primary buttons.
- **Coral** means danger. It is never decoration and never "click here".
- **Pink** is for identity and illustration, rarely for state.
- **Identity colors** (clients, categories, people): lime, sky, amber, pink, forest, shown as an 8px dot next to an ink label.
- **Charts:** series in the order lime, sky, amber, pink, forest, ink; coral only for negative values. Bars and areas use fills; thin lines on light backgrounds use the `-text` shades.

---

## 3. Typography

### Families

```css
--font-sans: 'Uncut Sans', 'Uncut Sans Fallback', system-ui, sans-serif;
--font-mono: 'IBM Plex Mono', ui-monospace, monospace;
```

**Uncut Sans** (Kasper Nordkvist, SIL OFL 1.1) in 300, 400, 500 and 700. Self-host it (the `@fontsource/uncut-sans` package has the files). Headlines and titles use 500; 700 is rare; 600 isn't part of the set.

**IBM Plex Mono** only for literal strings people copy or type: IDs, slugs, keys, domains, file paths, code. Never for captions, metadata or decoration.

### Case

- **Lowercase** for headlines, page and section titles, navigation, buttons, tabs, pills and captions.
- **Sentence case** for body text, labels, help text, messages, table headers and card titles.
- **Names keep their own casing.** A client called "NY Bone & Joint" or a report called "Weekly SEO report" is never lowercased.
- **No all-caps,** no letter-spaced labels.

### Expressive scale

In this package: `f--font-a…f`.

| Style | Desktop | Tablet and below | Line height | Weight |
|---|---|---|---|---|
| `font-a` · hero | 80px | 64px | 1.1 | 500 |
| `font-b` · section headline | 56px | 40px | 1.3 | 500 |
| `font-c` · sub-headline | 32px | 26px | 1.3 | 500 |
| `font-d` · lead | 24px | 20px | 1.4 | 400 |
| `font-e` · body | 16px | 16px | 1.4 | 400 |
| `font-f` · meta | 12px | 12px | 1.4 | 400 |

Large headlines are set tight (−0.02 to −0.035em) and can carry images inline between words.

### Interface scale

| Style | Size / line | Weight | Tracking |
|---|---|---|---|
| `hero` | 36/40 → 48/52 on wide screens | 500 | −0.02em |
| `page-title` | 30/36 | 500 | −0.02em |
| `title` (card, modal) | 18/28 | 500 | −0.01em |
| `callout` | 15/22 | 400 | 0 |
| `body` (default) | 14/20 | 400, 500 for emphasis | 0 |
| `small` | 12/16 | 400–500 | 0 |
| `micro` (hints) | 11/16 | 400 | 0 |
| `caption` (section label) | 12/16 | 500, mute | 0 |
| `mono` | 12/16 – 13/20 | 400 | 0 |

Anything above 18px inside an interface is a page title. Numbers in tables and stats use tabular figures.

---

## 4. Shape and depth

### Radius

| Token | Expressive | Interface | Use |
|---|---|---|---|
| `radius-sm` | — | 8px | Menu items, small inner elements |
| `radius-md` | — | 12px | Inputs, selects, textareas, code blocks |
| `radius-lg` | 20px | 16px | Cards, panels, menus, toasts |
| `radius-xl` | 20px | 20px | Modals, large feature panels |
| `radius-full` | 25–65px | 999px | Buttons, pills, tags, tabs, toggles |
| `radius-round` | 50% | 50% | Avatars, icon buttons, dots, artwork |

In this package: `f--radius-a` (8) · `b` (12) · `c` (16) · `d` (20) · `full` · `round`.

Checkboxes are the one small exception at 6px. Nothing interactive has square corners; image tiles in a grid and table cells are the only flat-cornered pieces.

### Elevation

Flat by default: borders separate, shadows only lift things that float above the page.

| Token | Value | Use |
|---|---|---|
| — | `1px solid edge` | Cards and panels |
| `float-sm` | `0 1px 2px rgb(15 15 15/.06), 0 4px 16px rgb(15 15 15/.08)` | Toasts, tooltips, active segment |
| `float-md` | `0 2px 4px rgb(15 15 15/.06), 0 12px 32px rgb(15 15 15/.12)` | Menus, popovers |
| `float-lg` | `0 24px 64px rgb(15 15 15/.2)` | Modals |

In this package: `f--shadow-a` (float-sm) · `b` (float-md) · `c` (float-lg).

No drop shadows on cards, no gradients, no textures.

---

## 5. Layout and spacing

- **Grid:** 12 columns, 32px gutter, mobile-first.
- **Breakpoints:** `tablets` 580 · `tabletm` 810 · `tabletl` 1024 · `laptop` 1300 · `desktop` 1570 · `wide` 1700.
- **Expressive spacing** is built on 8px: blocks 80px apart (56 on tablet), groups 56 (32), elements 32 (24), tight stacks 24. Sections use 120px or 80px of padding (80/56 on tablet). Container 1300px.
- **Interface spacing** is built on 4px: working set 6, 8, 12, 16, 20, 24, 32, 40. Card padding 24px, gutter 24px (40px from 1024px), content max-width 1240px, header 64px.
- Left-align text. Center only short, standalone moments (an empty state, a hero line).

---

## 6. Motion

| Token | Value | Use |
|---|---|---|
| `time-a` | 0.1s | Hover, press, toggles |
| `time-b` | 0.3s | Menus, toasts, expanding panels |
| `time-c` | 0.6s | Overlays, page transitions |
| `ease-standard-a` | `cubic-bezier(0.2, 0, 0.38, 0.9)` | Interfaces (productive) |
| `ease-standard-b` | `cubic-bezier(0, 0, 0.3, 1)` | Marketing (expressive) |
| `ease-entrance` | `cubic-bezier(0, 0, 0.38, 0.9)` | Things appearing |
| `ease-exit` | `cubic-bezier(0.2, 0, 1, 0.9)` | Things leaving |

Motion answers what people do. On marketing pages, spend it on one orchestrated moment (a hero reveal, a page transition) rather than effects on every section. Always respect `prefers-reduced-motion`.

---

## 7. Components

### Button

Capsule, lowercase label, weight 500. Heights are fixed, not derived from padding.

| Size | Height | Padding | Text |
|---|---|---|---|
| Small | 28px | 12px | 12px |
| Medium | 32px | 14px | 14px |
| Field | 38px | 16px | 14px — beside a 38px input |
| Large (marketing) | 52px | 24px | 16px |

| Variant | Look | Hover | When |
|---|---|---|---|
| Primary | Ink fill, on-ink label | Lime fill, ink label | The main action; one per section |
| Secondary | Raised fill, edge-strong border, ink label | Sunk fill | Everything else |
| Ghost | No fill, soft label | Sunk fill, ink label | Toolbars, low emphasis |
| Accent | Lime fill, ink label | Ink fill, on-ink label | Marketing CTAs on light or ink |
| Danger | Coral fill, ink label | Slightly darker | Only to confirm a destructive action |
| Link | Ink, underlined | Thicker underline | Inline in text |

Disabled buttons use a sunk fill and faint label. Loading keeps the width and swaps the label for a spinner. Icon buttons are circles at the same heights with an accessible name. Don't append arrows; use `↗` only for links that leave the product.

### Pill and tag

Capsule, 22–24px high, 12px weight 500, lowercase, accent fill with ink text. Used for categories, statuses and filters. Removable tags add a small × that turns danger-text on hover; tags holding literal values (domains, keys) use Plex Mono.

### Text field, select, textarea

- Label 14px 500 ink above the control (6px gap); "(optional)" in mute.
- Control 38px, raised fill, 1px edge-strong border, 12px radius, 12px padding, placeholder in faint.
- Hover: border soft. Focus: ink border plus a 4px lime glow at 45%.
- Help text 12px mute below. Error: danger-text border and message, replacing the help text.
- Disabled: sunk fill, faint text.
- Selects draw their own chevron, inset like the text. Textareas start at 96px.

### Checkbox, radio, toggle

- Checkbox 16px, 6px radius, edge-strong border; checked is an ink fill with an on-ink tick.
- Radio 16px circle; selected is an ink ring with an ink dot.
- Toggle 32×20 capsule; off is an edge-strong track, on is an ink track with an on-ink knob.

### Tabs and segmented control

- **Segmented** (switching views of the same content): sunk capsule track with a 3px inset; options are 28px capsules; the active one is raised with ink text and `float-sm`.
- **Tabs** (switching sections): lowercase text items; active is an ink capsule with on-ink text, inactive mute, hover sunk.

### Card

Raised, 1px edge, 16px radius (20px on marketing pages), 24px padding. Title 18px 500 sentence case, description in mute, meta row at the bottom. A list of cards can have one lime highlight. No colored top strips, no tinted icon tiles, no full pink/coral/sky backgrounds.

### Menu and tooltip

- Menu: raised, 16px radius, `float-md`, 6px padding; 32px items with 8px radius and a sunk hover; destructive items last, in danger-text, after a divider.
- Tooltip: ink fill, on-ink 12px text, 8px radius, appears after 300ms.

### Header and navigation

64px tall on page, 1px edge below. Logo on the left, lowercase items in mute with the active one in ink on a sunk capsule, circular icon buttons and the account menu on the right. On marketing sites the header is airier, with sticker-style icons next to the items.

### Status

| Status | Pill |
|---|---|
| Running / in progress | Amber fill |
| Succeeded / live | Lime fill |
| Failed | Coral fill |
| Partial | Sunk fill, ink text, coral dot |
| Queued / draft | Sunk fill, soft text |
| Cancelled / skipped | Sunk fill, mute text |

### Toast

Bottom right, up to 400px wide, raised, 16px radius, `float-sm`, 14px ink text with an 8px state dot. Success and info leave after 5 seconds; warnings and errors stay until dismissed. Messages say what happened and, for errors, how to fix it.

### Alert and callout

- **Alert** (inline message): state tint background, 12px radius, ink text, a dot or icon. No side or top stripes.
- **Callout row** (something that needs attention): raised row, 1px edge, 16px radius, callout text and a count pill on the right; the whole row is the link.

### Modal and confirmation

Raised, 20px radius, `float-lg`, up to 480px wide, 24px padding. Title 18px 500. Footer on sunk with secondary "cancel" and the main action. Destructive actions always go through a confirmation modal (never a browser dialog), explain what's lost and what stays, and confirm with the specific verb ("delete client"). For important objects, ask people to type the name.

### Empty state

A raised panel with a 1px edge and 16px radius, 32px padding: a short title, one mute sentence about what will appear here and how, and at most one action.

### Loading

Skeleton blocks in sunk with the shape and radius of what's coming, gently pulsing. Spinners only inside buttons and small inline areas.

### Table

Inside a raised card with 1px edge and 16px radius, scrolling horizontally within the card. Header row on sunk, 12px 500 soft text. Rows at least 44px with 1px edge rules; numbers right-aligned in tabular figures; literals in Plex Mono. Positive and negative deltas keep their sign and use success-text / danger-text.

### Code and literals

Inline literals in Plex Mono 12–13px on sunk with 8px radius. Code blocks on sunk, 12px radius, 16px padding, with a copy button as a ghost icon button.

### Avatar

Circles: 24px in lists, 32px in headers. Ink fill with on-ink initials, or a photo.

---

## 8. Patterns

**Hero (expressive).** A very large lowercase statement with images or GIFs placed between words, a shorter sentence below, one primary action.

**Work wall (expressive).** A dense grid of square image tiles, edge to edge or nearly.

**Color block (expressive).** A lime or ink section with a big lowercase headline and one action; the main way to break the rhythm of a long page.

**Page header (interface).** A lowercase caption, the page title, a mute description up to ~72 characters wide, and actions aligned right. On child pages, breadcrumbs (`flows / Weekly SEO report`) replace the caption.

**Stat strip (interface).** One card split into cells by 1px rules; label 12px mute, value 18px 500 with tabular figures.

**Settings section (interface).** A card with a title and description, fields stacked 16px apart, and a primary save action at the bottom right.

---

## 9. Voice

- Short, confident and a little playful. Puns when they're clear ("Winning brands don't wing it.").
- Speak as an ally: "we", "you", plain verbs.
- Buttons say exactly what happens ("start a chat", "delete client"), and the result uses the same verb ("Client deleted.").
- Errors explain what happened and how to fix it, without apologizing. Empty screens invite one action.

---

## 10. Do and don't

**Do**

- Keep ink and paper dominant and let one accent lead each section.
- Put ink text on every accent fill.
- Make every interactive element a capsule and round every container.
- Set headlines big, tight and lowercase.
- Use role tokens in interfaces so dark mode comes for free.
- Use Plex Mono only for literal strings.
- Separate with 1px rules and save shadows for floating layers.

**Don't**

- Use pure black or white, or colors outside the palette (no stock grays, reds or greens).
- Put accent-colored text on light backgrounds, or white text on an accent.
- Use coral for anything but danger.
- Use square corners, all-caps labels or letter-spacing on labels.
- Use weights 600/700 for titles, or a second display typeface.
- Add colored top strips, tinted icon tiles, textures, gradients or shadows on cards.
- Use browser dialogs for destructive actions.

---

## Known differences with the package

The package code is the source of truth until decided otherwise. These differences are detected and **have not been changed**, so existing projects keep working.

| Topic | Package | This document |
|---|---|---|
| `color-e` | `#2d9f66` | `#189b5c` |
| `color-f` | `#429ed6` | `#3d9dd8` |
| `color-g` | `#fdb335` | `#ffb41d` |
| `color-h` | `#f76e4a` | `#f96e43` |
| Breakpoint names | `mobile` 580 · `tablets` 810 · `tabletm` 1024 · `tabletl` 1300 · `laptop` 1570 · `desktop` 1700 | `tablets` 580 · `tabletm` 810 · `tabletl` 1024 · `laptop` 1300 · `desktop` 1570 · `wide` 1700 |
| Typography | Uncut Sans by default since 0.1.0 (configurable with `font` in `terra.config.js`); the package does not ship the font files. Weight 400 | Uncut Sans, weight 500 on headlines |
| Spacing scale | 8px steps | Interface on 4px |
