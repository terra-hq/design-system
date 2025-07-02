# @terrahq/design-system

This package is a small helper for building demos or small projects outside of our regular ecosystem.

You can include the following stylesheet in your project:

```
<link rel="stylesheet" href="https://unpkg.com/@terrahq/design-system@latest/dist/style.css">

```

### Features

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

- **Background:** Terra Brand Colors `.f--bg-#{letter}`
  - Examples: `.f--bg-a`, `.f--bg-b`, `.f--bg-e`

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
  - Examples: `.u--overflow-hidden`, `.u--overflow-auto`, `.u--overflow-tablets-scroll`

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

**With breakpoints:** `.u--mb-desktop-2`, `.u--p-mobile-4`, `.u--mt-tablets-1`, etc.

- **Text-align** `.u--text-align-#{$name}` or `.u--text-align-#{$breakpoint-name}-#{$name}`

| Value | Class | CSS Property |
|-------|-------|--------------|
| left | `.u--text-align-left` | `text-align: left` |
| center | `.u--text-align-center` | `text-align: center` |
| right | `.u--text-align-right` | `text-align: right` |
| justify | `.u--text-align-justify` | `text-align: justify` |

**With breakpoints:** `.u--text-align-desktop-center`, `.u--text-align-mobile-left`, etc.

<br>
Note: This is not intended for use in ongoing projects.
