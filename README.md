# @terrahq/design-system

[![npm](https://img.shields.io/npm/v/@terrahq/design-system)](https://www.npmjs.com/package/@terrahq/design-system)

Terra CSS classes for building demos and prototypes outside our regular ecosystem: the same colors, type scale, radius and spacing as Terra's sites, as plain classes you can write straight in your HTML.

**Documentation:** guides, live examples and the design reference are in [Terra Docs](https://dev.terrahq.com/design-system). It is internal, so you need a Terra account to open it; without one, this README and the [class reference](https://github.com/terra-hq/design-system/blob/HEAD/docs/CLASSES.md) cover everything the package does.

> **Experimental.** This project is a work in progress: class names, options and docs may still change. Not intended for production projects. For those, use Terra's own setup.

## Install

**From a CDN (nothing to install):**

```html
<link rel="stylesheet" href="https://unpkg.com/@terrahq/design-system@latest/dist/style.css">
```

Pin a version instead of `latest` if the page must never change: `@terrahq/design-system@0.3.0`.

**From npm:**

```bash
npm i @terrahq/design-system
```

```js
import '@terrahq/design-system' // resolves to dist/style.css
```

## Use it

A white card with a 1px border, an outlined pill and a title at weight 500:

```html
<article class="f--background-b f--radius-c u--border-a u--p-4 u--display-flex u--flex-direction-column u--gap-2">
  <span class="f--font-f u--font-medium u--px-2 f--radius-full u--border-f" style="align-self:flex-start">new</span>
  <h3 class="f--font-c u--font-medium">project atlas</h3>
  <p class="f--font-e">Built only with classes.</p>
</article>
```

## Three layers

| Layer | What it is | Examples |
|---|---|---|
| `f--` **foundation** | Terra's design decisions. Several properties per class, responsive included. They don't change between versions. | `f--font-c`, `f--color-a`, `f--background-b`, `f--radius-c`, `f--shadow-a`, `f--row`, `f--col-6` |
| `u--` **utilities** | One property per class, with a variant per breakpoint. | `u--p-4`, `u--p-mobile-2`, `u--display-flex`, `u--border-a` |
| `c--` **components** | Ready-made pieces with several properties and states. Variants are letters; sizes, icon types and Terraform shapes are modifiers. | `c--btn-a`, `c--card-wrapper-a`, `c--icon-a--check` |

If a foundation class already covers something, there is no utility for it. To tweak one detail of a foundation class, add a utility: `f--font-c u--font-medium`. Utilities load after foundation, so they win.

**Breakpoints** (`max-width`): `desktop` 1700 · `laptop` 1570 · `tabletl` 1300 · `tabletm` 1024 · `tablets` 810 · `mobile` 580. Utilities take the name in the middle: `u--p-mobile-2`.

**Typography.** `f--font-a` to `f--font-f` use Uncut Sans, then `system-ui`. The package does **not** ship the font files; load Uncut Sans yourself or the browser falls back to `system-ui`. Titles use weight 500: add `u--font-medium`.

## Components

Components are named `c--name-variant--modifier`. They follow `terra.config.js` (palette, radius, time and easing) like everything else.

```html
<!-- buttons: a primary, b secondary, c tertiary. Sizes: --small, --medium (default), --large -->
<button class="c--btn-a">save</button>
<button class="c--btn-b c--btn-b--small">cancel</button>

<!-- card: the wrapper is the box, put anything inside. Variant b has no padding, for an image at the edge. The element decides the hover: <a href> and <button> cards react (border turns Noche, pointer, focus ring); <div>, <article>, <aside> and <section> cards do nothing -->
<article class="c--card-wrapper-a">
  <span class="c--tag-a">new</span>
  <h3 class="f--font-c u--font-medium">project atlas</h3>
  <p class="f--font-e">Anything goes inside the wrapper.</p>
</article>
```

| Component | Classes |
|---|---|
| Button | `c--btn-a`, `c--btn-b`, `c--btn-c`, `c--btn-d` (on Noche: white fill for dark sections), `c--btn-e` (on Noche: no fill, white text) + `--small`, `--medium`, `--large` |
| Card | `c--card-wrapper-a`, `c--card-wrapper-b` |
| Tag | `c--tag-a` + color `--d`, `--e`, `--g`, `--h`, `--i` (the default is cielo) |
| Icon | `c--icon-a` + size (`--small` 16px, `--medium` 24px, `--large` 32px) + type (`--check`, `--arrow-right`…) |
| Terraform | `c--terraform-a` + size (`--small` 32px, `--medium` 64px, `--large` 128px) + shape (`--forma`, `--diana`…) |
| Terraform trio | `c--terraform-trio-a` around three terraforms |

**Icons and Terraforms** are CSS masks painted with the text color, so `f--color-*` tints them. Their types and shapes are in two extra files, so you only pay for what you use:

```html
<link rel="stylesheet" href="https://unpkg.com/@terrahq/design-system@0.3.0/dist/style.css">
<link rel="stylesheet" href="https://unpkg.com/@terrahq/design-system@0.3.0/dist/icons.css">
<link rel="stylesheet" href="https://unpkg.com/@terrahq/design-system@0.3.0/dist/terraforms.css">
```

```js
import '@terrahq/design-system/icons.css'
import '@terrahq/design-system/terraforms.css'
```

```html
<i class="c--icon-a c--icon-a--large c--icon-a--search f--color-f"></i>
<i class="c--terraform-a c--terraform-a--forma f--color-d"></i>
```

Icons: `arrow-right`, `arrow-left`, `check`, `close`, `plus`, `search`, `chevron-down`, `chevron-right`, `chevron-left`, `external`, `download`, `copy`, `mail`, `info`, `menu`, `trash`, `pencil` (an initial set). Terraforms: `forma`, `diana`, `stanley`, `mistyk`, `melos`, `prismo`, `mendia`, `boba`, `ebb`, `gollum`, `punky`, `infinito`.

A Terraform is used **alone or in a trio**: three different shapes in three different colors. Never two, and never the same shape or color twice in a trio.

`c--` is also the prefix projects use for their own components. If a project defines its own `c--btn-a`, it will clash with this one.

## Brand use

When you build something that carries the Terra brand:

- **Backgrounds** are only `a` (Noche), `b` (white) or `c` (Morning Haze): `f--background-a`, `-b`, `-c`.
- **Text** is only `a` or `b`: `f--color-a`, `f--color-b`. Never color text.
- **Accents** (`d` to `i`) are outlines and dots, not fills: `u--border-d` … `u--border-i`.
- **Shape.** Everything you click or tag is a capsule (`f--radius-full`); cards use `f--radius-c` with a 1px border and no shadow.

The package still ships a few default values that differ slightly from the brand (`b`, `e`, `f`, `g`, `h`, `i`). Until they are updated, set the brand palette in a `terra.config.js` (next section):

```js
colors: {
  a: '#0f0f0f', b: '#ffffff', c: '#f7f8f4',
  d: '#7ce55e', e: '#189b5c', f: '#3d9dd8', g: '#ffb41d', h: '#f96e43', i: '#f78bd8',
},
```

## States and motion

State lives in the class name, with no colons. Hover only applies on devices that can hover, and states have no breakpoint variants.

```html
<button class="u--transition-colors u--duration-a u--hover-background-a u--hover-color-b u--focus-ring u--active-scale-95 u--disabled-opacity-50 f--radius-full u--border-a u--px-3 u--py-1">
  save
</button>
```

| What | Classes |
|---|---|
| Hover | `u--hover-background-*`, `u--hover-color-*`, `u--hover-border-*` |
| Group | `u--group` on the parent, `u--group-hover-*` on its children |
| Focus, press, disabled | `u--focus-ring`, `u--active-scale-90\|95\|98`, `u--disabled-opacity-25\|50\|75` |
| Transitions | `u--transition-all\|colors\|opacity\|transform`, `u--duration-a\|b\|c` (0.1s, 0.3s, 0.6s), `u--ease-standard\|entrance\|exit-a\|b` |
| Animations | `u--animation-fade-in`, `fade-up`, `scale-in`, `slide-left`, `shake`, `shimmer`, `spin`, `pulse` (all respect `prefers-reduced-motion`) |

## Configure your own build

The CDN file is the same for everyone. To change the palette, spacing, radius or font, describe it in a `terra.config.js` and generate your own CSS (needs Node 18+):

```bash
npm i @terrahq/design-system
cp node_modules/@terrahq/design-system/terra.config.example.js terra.config.js
npx terra-ds build
```

```js
// terra.config.js
// Every key is optional: what you leave out keeps the value Terra ships with, shown here as a comment.
export default {
  // Palette and type
  colors: { a: '#0f0f0f', b: '#ffffff' },        // replaces the palette; "a" and "b" are required
  backgrounds: ['a', 'b'],                         // which colors also get f--background-* (default a to e)
  font: "'Uncut Sans', system-ui, sans-serif",    // font-family of f--font-* (this is the default)

  // Shape and depth
  radius: { a: '4px', full: '999px' },             // replaces f--radius-* (default a 8px, b 12px, c 16px, d 20px, full, round)
  shadows: { a: '0 1px 2px rgb(15 15 15 / .06), 0 4px 16px rgb(15 15 15 / .08)' }, // f--shadow-* (default a, b, c)

  // Scales of the utilities (each step is a class)
  spacing: [0, 1, 2, 4, 8],                        // u--padding-*, u--margin-*, u--gap-* (x 8px; default 0 to 10, 12 and 15)
  sizes: [2, 4, 5, 6, 8],                          // u--height-*, u--width-* (x 8px; default 2, 3, 4, 5, 6, 8, 10, 12)
  minWidth: [10, 20, 30, 40],                      // u--min-width-* (x 8px; this is the default)
  opacity: { 100: 1, 85: 0.85, 70: 0.7, 50: 0.5 }, // u--opacity-* (this is the default)
  zIndex: [0, 10, 20, 40],                         // u--z-index-* (this is the default)
  offsets: { 0: '0', 100: '100%' },                // u--top-*, u--right-*, u--bottom-*, u--left-* (this is the default)

  // Motion
  time: { a: '0.1s', b: '0.3s', c: '0.6s' },       // micro-interactions, expansion, background dimming (this is the default)
  ease: { 'standard-a': 'cubic-bezier(0.2, 0, 0.38, 0.9)' }, // also standard-b, entrance-a/b, exit-a/b

  output: 'public/terra.css',                      // where the CSS is written
}
```

Every key is optional. "Replaces" means what you don't list is not generated, which also makes the file smaller (about 80 kB with this config, against 113 kB by default). Breakpoints and the grid are not configurable yet.

## What's new

**0.4.0** makes `f--font-a`, `f--font-b` and `f--font-c` (32px and up) weight 700 by default; add `u--font-regular` to get the old 400. It also adds `u--opacity-*`, `u--flex-1`, `u--flex-none`, `u--min-width-0`, `u--divide-edge` the tag colors `c--tag-a--d|e|g|h|i` and the button `c--btn-d` for dark sections. Everything is additive: the frozen 0.0.9 rules are unchanged.

**0.4.1** adds `u--min-height-screen` (at least the height of the viewport, for full-screen pages such as a login). Additive.

**0.4.2** adds `u--top|right|bottom|left-0|100`, `u--z-index-0|10|20|40`, `u--min-width-{n}` (n x 8px, steps set with `minWidth` in `terra.config.js`), `u--flex-grow-1`, and the button modifiers of Terra: `c--btn-a--second|third|fourth|fifth` (the letters `c--btn-b` to `c--btn-e` stay as aliases). Additive.

**0.11.0** writes the states in the same grammar as Punky's breakpoints, `u--{property}-[breakpoint]-[state]-{value}`: `u--hover-background-c` is now `u--background-hover-c`, `u--hover-color-a` is `u--color-hover-a`, `u--hover-border-d` is `u--border-hover-d`, `u--group-hover-color-a` is `u--color-group-hover-a`, `u--focus-ring` is `u--outline-focus-a` (any color letter), `u--active-scale-95` is `u--transform-active-scale-95` and `u--disabled-opacity-50` is `u--opacity-disabled-50`. The hover of color, border and background also exists with a breakpoint: `u--background-tablets-hover-c`. Not additive: replace the old names.

**0.9.0** adds the icon `c--icon-a--pencil` and removes `u--hover-tint-*` (and the `tint` option), which was named after an effect and not after a CSS property. A quiet button is now an outline plus the hover utilities that already exist.

**0.8.0** renames the spacing classes so they read like the CSS property, and the short names are gone (this is the one release that is not additive, while the package is still in development): `u--p-4` is now `u--padding-4`, `u--pt-4` is `u--padding-top-4`, `u--px-4` is `u--padding-x-4`, `u--py-4` is `u--padding-y-4`, and the same for `u--margin-*`. `u--mx-auto`, `u--my-auto` and `u--m-auto` are `u--margin-x-auto`, `u--margin-y-auto` and `u--margin-auto`, and `u--col-gap-*` is `u--column-gap-*`. Breakpoint versions follow: `u--p-mobile-4` is `u--padding-mobile-4`. To migrate, replace the names in your HTML; the frozen 0.0.9 rules were renamed with them, nothing else changed.

**0.7.0** adds what a button needs to be built from utilities alone: `u--height-{n}` and `u--width-{n}` (a fixed height or width of n x 8px). It also opens more of the package to `terra.config.js`: `sizes`, `shadows`, `opacity`, `zIndex`, `offsets`, `time` and `ease` (every one optional, with Terra's values as the default; see `terra.config.example.js`). Spacing classes also exist with the name of the CSS property: `u--padding-y-4` is `u--py-4`, `u--margin-x-auto` is `u--mx-auto` (the short names are unchanged). Additive.

**0.6.1** adds the icon `c--icon-a--trash` (in `icons.css`) and the button `c--btn-a--sixth` for dangerous actions such as delete (rojizo text, a faint tint on hover). Additive.

**0.6.0** adds `c--diff-a` (on a `<pre>`, with `c--diff-a__same`, `__add`, `__del`, `__skip` and `__mark`) for review screens, and `u--cursor-pointer`. Additive.

**0.5.1** fixes `c--modal-a`: the package reset (`margin: 0` on everything) removed the auto margin of a modal dialog, so it opened in the top left corner. It is centered again. Also adds `u--my-auto` and `u--m-auto` next to `u--mx-auto`.

**0.5.0** adds the form system and two more components. Forms follow the Terra pattern (a wrapper with `__item`): `c--group-a`, `c--label-a`, `c--legend-a`, `c--input-a`, `c--textarea-a`, `c--select-a`, `c--checkbox-a`, `c--radio-a` and `c--error-a`, with the states `--error`, `--valid` and `--disabled` on the wrapper. Also `c--table-a` (on `<table>`) and `c--modal-a` (on a native `<dialog>`; `c--modal-a--second` is wider). Additive.

**0.4.3** adds `minWidth` to `terra.config.js` (the steps of `u--min-width-{n}`) and fixes the hover of `c--btn-a--fifth` (the text turned Noche on a dark bar). Additive.

**0.3.2** aligns six palette colors with the Terra Brand Guide.

**0.3.1** adds the link to the documentation in Terra Docs. The CSS is the same as 0.3.0.

**0.3.0** adds components (`c--btn-*`, `c--card-wrapper-*`, `c--tag-a`, `c--icon-a`, `c--terraform-a`, `c--terraform-trio-a`), the extra files `icons.css` and `terraforms.css`, `u--order-last`, `u--order-none` and `u--order-2` to `-12`, `u--text-decoration-*`, and the animations `scale-in`, `slide-left`, `shake` and `shimmer`. Everything is additive: every 0.2.1 rule is unchanged. The default CSS grows from 113 kB to 123 kB (15 kB gzipped).

**0.2.0** adds states (`u--hover-*`, `u--focus-ring`, `u--active-scale-*`, `u--disabled-opacity-*`, `u--group-hover-*`) and motion (`u--transition-*`, `u--duration-*`, `u--ease-*`, `u--animation-*`). Everything is additive: every 0.1.0 rule is unchanged.

**0.1.0** added `terra-ds build` and `terra.config.js`, the `f--radius-*` and `f--shadow-*` foundations, `u--border-*`, `u--px/py/mx/my`, `u--gap`, `u--row-gap`, `u--col-gap`, `u--mx-auto`, and spacing steps 6, 9 and 12. The default `f--font-*` typeface changed from Arial to Uncut Sans.

## More

- [Documentation in Terra Docs](https://dev.terrahq.com/design-system) (Terra account needed)
- [Class reference](https://github.com/terra-hq/design-system/blob/HEAD/docs/CLASSES.md)
- [Contributing](https://github.com/terra-hq/design-system/blob/HEAD/CONTRIBUTING.md)
