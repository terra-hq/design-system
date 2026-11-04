# @terrahq/design-system

[![npm](https://img.shields.io/npm/v/@terrahq/design-system)](https://www.npmjs.com/package/@terrahq/design-system)

Terra CSS classes for building demos and prototypes outside our regular ecosystem: the same colors, type scale, radius and spacing as Terra's sites, as plain classes you can write straight in your HTML.

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

<!-- card: the wrapper is the box, put anything inside. Variant b has no padding, for an image at the edge -->
<article class="c--card-wrapper-a">
  <span class="c--tag-a">new</span>
  <h3 class="f--font-c u--font-medium">project atlas</h3>
  <p class="f--font-e">Anything goes inside the wrapper.</p>
</article>
```

| Component | Classes |
|---|---|
| Button | `c--btn-a`, `c--btn-b`, `c--btn-c` + `--small`, `--medium`, `--large` |
| Card | `c--card-wrapper-a`, `c--card-wrapper-b` |
| Tag | `c--tag-a` |
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

Icons: `arrow-right`, `arrow-left`, `check`, `close`, `plus`, `search`, `chevron-down`, `external`, `download`, `copy`, `mail`, `info`, `menu` (an initial set). Terraforms: `forma`, `diana`, `stanley`, `mistyk`, `melos`, `prismo`, `mendia`, `boba`, `ebb`, `gollum`, `punky`, `infinito`.

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
export default {
  colors: { a: '#0f0f0f', b: '#ffffff', j: '#ff00aa' }, // replaces the palette; "a" and "b" are required
  backgrounds: ['a', 'b', 'j'],                          // which colors get f--background-*
  spacing: [0, 1, 2, 4, 8],                              // replaces the u--p-*, u--m-*, u--gap-* steps (x 8px)
  font: "'Uncut Sans', system-ui, sans-serif",           // font-family of f--font-*
  radius: { a: '4px', full: '999px' },                   // replaces f--radius-*
  output: 'public/terra.css',
}
```

Every key is optional. "Replaces" means what you don't list is not generated, which also makes the file smaller (about 80 kB with this config, against 113 kB by default). Breakpoints, grid and shadows are not configurable yet.

## What's new

**0.3.0** adds components (`c--btn-*`, `c--card-wrapper-*`, `c--tag-a`, `c--icon-a`, `c--terraform-a`, `c--terraform-trio-a`), the extra files `icons.css` and `terraforms.css`, `u--order-last`, `u--order-none` and `u--order-2` to `-12`, `u--text-decoration-*`, and the animations `scale-in`, `slide-left`, `shake` and `shimmer`. Everything is additive: every 0.2.1 rule is unchanged. The default CSS grows from 113 kB to 123 kB (15 kB gzipped).

**0.2.0** adds states (`u--hover-*`, `u--focus-ring`, `u--active-scale-*`, `u--disabled-opacity-*`, `u--group-hover-*`) and motion (`u--transition-*`, `u--duration-*`, `u--ease-*`, `u--animation-*`). Everything is additive: every 0.1.0 rule is unchanged.

**0.1.0** added `terra-ds build` and `terra.config.js`, the `f--radius-*` and `f--shadow-*` foundations, `u--border-*`, `u--px/py/mx/my`, `u--gap`, `u--row-gap`, `u--col-gap`, `u--mx-auto`, and spacing steps 6, 9 and 12. The default `f--font-*` typeface changed from Arial to Uncut Sans.

## More

- [Class reference](https://github.com/terra-hq/design-system/blob/HEAD/docs/CLASSES.md)
- [Contributing](https://github.com/terra-hq/design-system/blob/HEAD/CONTRIBUTING.md)
