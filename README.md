# @terrahq/design-system

[![npm](https://img.shields.io/npm/v/@terrahq/design-system)](https://www.npmjs.com/package/@terrahq/design-system)

Terra CSS classes for building demos and prototypes outside our regular ecosystem: the same colors, type scale, radius and spacing as Terra's sites, as plain classes you can write straight in your HTML.

> **Experimental.** This project is a work in progress: class names, options and docs may still change. Not intended for production projects. For those, use Terra's own setup.

## Install

**From a CDN (nothing to install):**

```html
<link rel="stylesheet" href="https://unpkg.com/@terrahq/design-system@latest/dist/style.css">
```

Pin a version instead of `latest` if the page must never change: `@terrahq/design-system@0.1.0`.

**From npm:**

```bash
npm i @terrahq/design-system
```

```js
import '@terrahq/design-system' // resolves to dist/style.css
```

## Use it

```html
<article class="f--background-b f--radius-c f--shadow-a u--p-4 u--display-flex u--flex-direction-column u--gap-2">
  <span class="f--background-d f--color-a f--font-f u--px-2 f--radius-full">new</span>
  <h3 class="f--font-c u--font-bold">Project Atlas</h3>
  <p class="f--font-e">Built only with classes.</p>
</article>
```

## Two layers

| Layer | What it is | Examples |
|---|---|---|
| `f--` **foundation** | Terra's design decisions. Several properties per class, responsive included. They don't change between versions. | `f--font-c`, `f--color-a`, `f--background-d`, `f--radius-c`, `f--shadow-a`, `f--row`, `f--col-6` |
| `u--` **utilities** | One property per class, with a variant per breakpoint. | `u--p-4`, `u--p-mobile-2`, `u--display-flex`, `u--border-a` |

If a foundation class already covers something, there is no utility for it. To tweak one detail of a foundation class, add a utility: `f--font-c u--font-bold`. Utilities load after foundation, so they win.

**Breakpoints** (`max-width`): `desktop` 1700 · `laptop` 1570 · `tabletl` 1300 · `tabletm` 1024 · `tablets` 810 · `mobile` 580. Utilities take the name in the middle: `u--p-mobile-2`.

**Typography.** `f--font-a` to `f--font-f` use Uncut Sans, then `system-ui`. The package does **not** ship the font files; load Uncut Sans yourself or the browser falls back to `system-ui`.

All classes are listed in the [class reference](docs/CLASSES.md).

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
  colors: { a: '#0f0f0f', b: '#fefefe', j: '#ff00aa' }, // replaces the palette; "a" and "b" are required
  backgrounds: ['a', 'b', 'j'],                          // which colors get f--background-*
  spacing: [0, 1, 2, 4, 8],                              // replaces the u--p-*, u--m-*, u--gap-* steps (x 8px)
  font: "'Uncut Sans', system-ui, sans-serif",           // font-family of f--font-*
  radius: { a: '4px', full: '999px' },                   // replaces f--radius-*
  output: 'public/terra.css',
}
```

Every key is optional. "Replaces" means what you don't list is not generated, which also makes the file smaller (about 77 kB with five spacing steps, against 108 kB by default). Breakpoints, grid and shadows are not configurable yet.

## What's new in 0.2.0

- **States:** `u--hover-background-*`, `u--hover-color-*`, `u--hover-border-*`, `u--focus-ring`, `u--active-scale-90|95|98`, `u--disabled-opacity-25|50|75`, and `u--group` with `u--group-hover-*` for children of a hovered parent. Hover only applies on devices that can hover. States have no breakpoint variants.
- **Motion:** `u--transition-all|colors|opacity|transform`, `u--duration-a|b|c` (0.1s, 0.3s, 0.6s), `u--ease-standard|entrance|exit-a|b`, and the animations `u--animation-fade-in`, `fade-up`, `spin` and `pulse`, which respect `prefers-reduced-motion`.
- Everything is additive: every 0.1.0 rule is unchanged.

## What's new in 0.1.0

- **`terra-ds build`** and `terra.config.js` to configure palette, spacing, radius and font.
- **New foundation classes:** `f--radius-*`, `f--shadow-*`.
- **New utilities:** `u--border-*`, `u--px/py/mx/my`, `u--gap`, `u--row-gap`, `u--col-gap`, `u--mx-auto`, and spacing steps 6, 9 and 12.
- **Changed default:** `f--font-*` now uses Uncut Sans (with `system-ui` as fallback) instead of Arial. Every other existing class is unchanged.

## More

- [Class reference](docs/CLASSES.md)
- [How Terra works](TERRA.md): colors, type, shape, motion and voice
- [Contributing](CONTRIBUTING.md)
