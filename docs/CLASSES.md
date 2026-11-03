# Class reference

Every class the package generates. For how to load it, configure it and what each layer means, see the [README](../README.md).

### breakpoints names
```
desktop: 1700px;
laptop: 1570px;
tabletl: 1300px;
tabletm: 1024px;
tablets: 810px;
mobile: 580px;
```

### colors

```
/* Core Colors */
$color-a: #0f0f0f;
$color-b: #fefefe;
$color-c: #f7f8f4;

/* Accent Color */
$color-d: #7ce55e;
$color-e: #2d9f66;
$color-f: #429ed6;
$color-g: #fdb335;
$color-h: #f76e4a;
$color-i: #f58dd7;
```
<br><br>

#### Foundation

- **Grid System:**
  - **Container:** `.f--container`, `.f--container--fluid`, `.f--container--tabletm-fluid`
    - Examples: `.f--container` (max-width), `.f--container--fluid` (full-width)
  
  - **Row:** `.f--row`, `.f--row--remove-gutter`
    - Examples: `.f--row` (with gutter), `.f--row--remove-gutter` (no spacing)
  
  - **Columns:** `.f--col-#{$i}` (1 to 12) or `.f--col-#{$size}-#{$i}`
    - Examples: `.f--col-6`, `.f--col-12`, `.f--col-desktop-8`, `.f--col-mobile-4`
  
  - **Offset:** `.f--offset-#{$i}` (0 to 11) or `.f--offset-#{$size}-#{$i}`
    - Examples: `.f--offset-2`, `.f--offset-desktop-3`, `.f--offset-mobile-1`

- **Color:** Terra Branded colors `.f--color-#{letter}`
  - Examples: `.f--color-a`, `.f--color-d`, `.f--color-i`

- **Background:** Terra brand colors `.f--background-#{letter}`
  - Letters `a` to `e` by default (extend it with `backgrounds` in `terra.config.js`)
  - Examples: `.f--background-a`, `.f--background-b`, `.f--background-e`

- **Typography:** `.f--font-#{letter}` (`a` to `f`). Sets family, size, line height, weight 400 and the responsive size. Add `.u--font-*` to change only the weight.
  - One breakpoint, 810px: `a` 80px → 64px, `b` 56px → 40px, `c` 32px → 26px, `d` 24px → 20px. `e` (16px) and `f` (12px) never change.
  - Family: Uncut Sans, system-ui, sans-serif. The package does not ship the font files.

- **Row spacing:** `.f--sp-#{letter}` (margin-bottom with a responsive step).

- **Radius:** `.f--radius-#{name}`

| Class | Value |
|-------|-------|
| `.f--radius-a` | 8px |
| `.f--radius-b` | 12px |
| `.f--radius-c` | 16px |
| `.f--radius-d` | 20px |
| `.f--radius-full` | 999px |
| `.f--radius-round` | 50% |

- **Shadow:** `.f--shadow-a` (small, toasts and tooltips), `.f--shadow-b` (medium, menus), `.f--shadow-c` (large, modals)

- **Section:** `.f--section-#{letter}`
  - Examples: `.f--section-a`, `.f--section-c`, `.f--section-f`

- **Gap:** `.f--gap-#{letter}`
  - Examples: `.f--gap-a`, `.f--gap-b`, `.f--gap-d`

#### Utilities

- **Align Items** `.u--align-items-#{$name}` or `.u--align-items-#{$breakpoint-name}-#{$name}`

| Value | Class | CSS Property |
|-------|-------|--------------|
| baseline | `.u--align-items-baseline` | `align-items: baseline` |
| flex-start | `.u--align-items-flex-start` | `align-items: flex-start` |
| flex-end | `.u--align-items-flex-end` | `align-items: flex-end` |
| center | `.u--align-items-center` | `align-items: center` |

**With breakpoints:** `.u--align-items-desktop-center`, `.u--align-items-mobile-flex-start`, etc.

- **Display** `.u--display-#{$name}` or `.u--display-#{$breakpoint-name}-#{$name}`

| Value | Class | CSS Property |
|-------|-------|--------------|
| block | `.u--display-block` | `display: block` |
| none | `.u--display-none` | `display: none` |
| inline-block | `.u--display-inline-block` | `display: inline-block` |
| inline | `.u--display-inline` | `display: inline` |
| flex | `.u--display-flex` | `display: flex` |
| inline-flex | `.u--display-inline-flex` | `display: inline-flex` |

**With breakpoints:** `.u--display-desktop-flex`, `.u--display-mobile-block`, etc.

- **Flex-wrap** `.u--flex-wrap-#{$name}` or `.u--flex-wrap-#{$breakpoint-name}-#{$name}`
  - Examples: `.u--flex-wrap-wrap`, `.u--flex-wrap-nowrap`, `.u--flex-wrap-tablets-wrap`

- **Font Style** `.u--font-style-#{$name}` or `.u--font-style-#{$breakpoint-name}-#{$name}`
  - Examples: `.u--font-style-italic`, `.u--font-style-normal`, `.u--font-style-mobile-italic`

- **Font Weight** `.u--font-#{$name}` or `.u--font-#{$breakpoint-name}-#{$name}`

| Value | Class | CSS Property |
|-------|-------|--------------|
| thin | `.u--font-thin` | `font-weight: 100` |
| extralight | `.u--font-extralight` | `font-weight: 200` |
| light | `.u--font-light` | `font-weight: 300` |
| regular | `.u--font-regular` | `font-weight: 400` |
| medium | `.u--font-medium` | `font-weight: 500` |
| semibold | `.u--font-semibold` | `font-weight: 600` |
| bold | `.u--font-bold` | `font-weight: 700` |
| extrabold | `.u--font-extrabold` | `font-weight: 800` |
| black | `.u--font-black` | `font-weight: 900` |

**With breakpoints:** `.u--font-desktop-bold`, `.u--font-mobile-light`, etc.

- **Justify Content** `.u--justify-content-#{$name}` or `.u--justify-content-#{$breakpoint-name}-#{$name}`

| Value | Class | CSS Property |
|-------|-------|--------------|
| space-between | `.u--justify-content-space-between` | `justify-content: space-between` |
| space-around | `.u--justify-content-space-around` | `justify-content: space-around` |
| space-evenly | `.u--justify-content-space-evenly` | `justify-content: space-evenly` |
| flex-start | `.u--justify-content-flex-start` | `justify-content: flex-start` |
| flex-end | `.u--justify-content-flex-end` | `justify-content: flex-end` |
| center | `.u--justify-content-center` | `justify-content: center` |

**With breakpoints:** `.u--justify-content-desktop-center`, `.u--justify-content-mobile-flex-start`, etc.

- **Overflow** `.u--overflow-#{$name}` or `.u--overflow-#{$breakpoint-name}-#{$name}`
  - Examples: `.u--overflow-hidden`, `.u--overflow-auto`, `.u--overflow-tablets-auto`

- **Position** `.u--position-#{$name}` or `.u--position-#{$breakpoint-name}-#{$name}`
  - Examples: `.u--position-relative`, `.u--position-absolute`, `.u--position-desktop-fixed`

- **Aspect Ratio** `.u--ar-#{$name}` or `.u--ar-#{$breakpoint-name}-#{$name}`

| Value | Class | CSS Property | Ratio |
|-------|-------|--------------|-------|
| a | `.u--ar-a` | `aspect-ratio: 1.77777777` | 16:9 |
| b | `.u--ar-b` | `aspect-ratio: 1.33333333` | 4:3 |
| c | `.u--ar-c` | `aspect-ratio: 1.5` | 3:2 |
| d | `.u--ar-d` | `aspect-ratio: 1` | 1:1 |
| e | `.u--ar-e` | `aspect-ratio: 0.75` | 3:4 |
| f | `.u--ar-f` | `aspect-ratio: 0.33333333` | 1:3 |

**With breakpoints:** `.u--ar-desktop-a`, `.u--ar-mobile-d`, etc.

- **Spacing** `.u--#{$attr-short}-#{$value}` or `.u--#{$attr-short}-#{$breakpoint-name}-#{$value}`

Steps are multiplied by 8px (`u--p-4` = 32px). Default steps: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15. Replace them with `spacing` in `terra.config.js`.

| Property | Prefix | Values | Example Classes |
|----------|--------|--------|-----------------|
| padding | `p` | 0, 1, 2, 3, 4, 5, 7, 8, 10, 15 | `.u--p-2`, `.u--p-5` |
| padding-top | `pt` | 0, 1, 2, 3, 4, 5, 7, 8, 10, 15 | `.u--pt-1`, `.u--pt-4` |
| padding-right | `pr` | 0, 1, 2, 3, 4, 5, 7, 8, 10, 15 | `.u--pr-2`, `.u--pr-8` |
| padding-bottom | `pb` | 0, 1, 2, 3, 4, 5, 7, 8, 10, 15 | `.u--pb-3`, `.u--pb-10` |
| padding-left | `pl` | 0, 1, 2, 3, 4, 5, 7, 8, 10, 15 | `.u--pl-1`, `.u--pl-15` |
| margin | `m` | 0, 1, 2, 3, 4, 5, 7, 8, 10, 15 | `.u--m-2`, `.u--m-7` |
| margin-top | `mt` | 0, 1, 2, 3, 4, 5, 7, 8, 10, 15 | `.u--mt-1`, `.u--mt-5` |
| margin-right | `mr` | 0, 1, 2, 3, 4, 5, 7, 8, 10, 15 | `.u--mr-3`, `.u--mr-8` |
| margin-bottom | `mb` | 0, 1, 2, 3, 4, 5, 7, 8, 10, 15 | `.u--mb-2`, `.u--mb-10` |
| margin-left | `ml` | 0, 1, 2, 3, 4, 5, 7, 8, 10, 15 | `.u--ml-4`, `.u--ml-15` |

Also available: `px` / `py` (padding on an axis), `mx` / `my` (margin on an axis), `gap`, `row-gap`, `col-gap`, and `.u--mx-auto`.

**With breakpoints:** `.u--mb-desktop-2`, `.u--p-mobile-4`, `.u--mt-tablets-1`, `.u--gap-mobile-2`, etc.

- **Border** `.u--border-#{letter}`: a 1px solid border in a palette color. Examples: `.u--border-a`, `.u--border-e`

- **Text-align** `.u--text-align-#{$name}` or `.u--text-align-#{$breakpoint-name}-#{$name}`

| Value | Class | CSS Property |
|-------|-------|--------------|
| left | `.u--text-align-left` | `text-align: left` |
| center | `.u--text-align-center` | `text-align: center` |
| right | `.u--text-align-right` | `text-align: right` |
| justify | `.u--text-align-justify` | `text-align: justify` |

**With breakpoints:** `.u--text-align-desktop-center`, `.u--text-align-mobile-left`, etc.

<br>

#### States (0.2.0)

Hover only applies on devices that can hover. States have no breakpoint variants.

- **Hover:** `.u--hover-background-#{letter}` (letters `a` to `e`), `.u--hover-color-#{letter}`, `.u--hover-border-#{letter}` (`a` to `i`)
- **Group:** `.u--group` on the parent; `.u--group-hover-background-#{letter}`, `.u--group-hover-color-#{letter}`, `.u--group-hover-border-#{letter}` on its children
- **Focus:** `.u--focus-ring` (2px ring in color `a`, keyboard focus only)
- **Active:** `.u--active-scale-90`, `.u--active-scale-95`, `.u--active-scale-98`
- **Disabled:** `.u--disabled-opacity-25`, `.u--disabled-opacity-50`, `.u--disabled-opacity-75` (on `:disabled` and `[aria-disabled="true"]`)

#### Motion (0.2.0)

- **Transition:** `.u--transition-all`, `.u--transition-colors`, `.u--transition-opacity`, `.u--transition-transform` (0.1s, productive curve by default)
- **Duration:** `.u--duration-a` (0.1s), `.u--duration-b` (0.3s), `.u--duration-c` (0.6s)
- **Easing:** `.u--ease-standard-a`, `.u--ease-standard-b`, `.u--ease-entrance-a`, `.u--ease-entrance-b`, `.u--ease-exit-a`, `.u--ease-exit-b` (`a` productive, `b` expressive)
- **Animation:** `.u--animation-fade-in`, `.u--animation-fade-up`, `.u--animation-spin`, `.u--animation-pulse`. All of them respect `prefers-reduced-motion`.
