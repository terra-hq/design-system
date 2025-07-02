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
- Grid: 
    - .f--container || .f--container--fluid
    - .f--row || .f--row--remove-gutter
    - .f--col-#{$i} 1 to 12 (columns) or f--col-#{$size}-#{$i}
    - .f--offset-#{$i} 0 to 12 (columns) or f--offset-#{$size}-#{$i}

- Color: Terra Branded colors .f--color-a/i
- Background: Terra Brand Colors .f--color-a/e
- Aspect Ratio (1.7 - 1 - 1.3 - 0.75)
- Section .f--section-#{letter}
- Gap .f--gap-#{letter}

#### Utilities

- **Align Items** `.u--align-items-#{$name}` or `.u--align-items-#{$breakpoint-name}-#{$name}`
  - Examples: `.u--align-items-center`, `.u--align-items-flex-start`, `.u--align-items-mobile-center`

- **Display** `.u--display-#{$name}` or `.u--display-#{$breakpoint-name}-#{$name}`
  - Examples: `.u--display-flex`, `.u--display-none`, `.u--display-desktop-block`

- **Flex-wrap** `.u--flex-wrap-#{$name}` or `.u--flex-wrap-#{$breakpoint-name}-#{$name}`
  - Examples: `.u--flex-wrap-wrap`, `.u--flex-wrap-nowrap`, `.u--flex-wrap-tablets-wrap`

- **Font Style** `.u--font-style-#{$name}` or `.u--font-style-#{$breakpoint-name}-#{$name}`
  - Examples: `.u--font-style-italic`, `.u--font-style-normal`, `.u--font-style-mobile-italic`

- **Font Weight** `.u--font-#{$name}` or `.u--font-#{$breakpoint-name}-#{$name}`
  - Examples: `.u--font-bold`, `.u--font-light`, `.u--font-desktop-medium`

- **Justify Content** `.u--justify-content-#{$name}` or `.u--justify-content-#{$breakpoint-name}-#{$name}`
  - Examples: `.u--justify-content-center`, `.u--justify-content-space-between`, `.u--justify-content-mobile-flex-start`

- **Overflow** `.u--overflow-#{$name}` or `.u--overflow-#{$breakpoint-name}-#{$name}`
  - Examples: `.u--overflow-hidden`, `.u--overflow-auto`, `.u--overflow-tablets-scroll`

- **Position** `.u--position-#{$name}` or `.u--position-#{$breakpoint-name}-#{$name}`
  - Examples: `.u--position-relative`, `.u--position-absolute`, `.u--position-desktop-fixed`

- **Spacing** `.u--#{$attr-short}-#{$value}` or `.u--#{$attr-short}-#{$breakpoint-name}-#{$value}`
  - Examples: `.u--mb-2`, `.u--p-4`, `.u--mt-mobile-1`, `.u--pl-desktop-3`

- **Text-align** `.u--text-align-#{$name}` or `.u--text-align-#{$breakpoint-name}-#{$name}`
  - Examples: `.u--text-align-center`, `.u--text-align-right`, `.u--text-align-mobile-left`

<br>
Note: This is not intended for use in ongoing projects.
