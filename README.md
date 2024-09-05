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
    - .f--container
    - .f--row || .f--row--remove-gutter
    - .f--col-#{$i} 1 to 12 (columns) or f--col-#{$size}-#{$i}
    - .f--offset-#{$i} 0 to 12 (columns) or f--offset-#{$size}-#{$i}

- Color: Terra Branded colors .f--color-a/i
- Background: Terra Brand Colors .f--color-a/e
- Aspect Ratio (1.7 - 1 - 1.3 - 0.75)
- Spacing .f--#{$attr-short}-#{$value} or .f--#{$attr-short}-#{$breakpoint-name}-#{$value}
- Section .f--section-#{letter}
- Gap .f--gap-#{letter}

#### Utilities

- Align Items .u--align-items-#{$name} or u--align-items-#{$breakpoint-name}-#{$name}
- Display .u--display-#{$name} or .u--display-#{$breakpoint-name}-#{$name}
- Flex-wrap .u--flex-wrap-#{$name} or .u--flex-wrap-#{$breakpoint-name}-#{$name}
- Font Style .u--font-style-#{$name} or .u--font-style-#{$breakpoint-name}-#{$name}
- Font Weight .u--font-weight-#{$name} or .u--font-weight-#{$breakpoint-name}-#{$name}
- Justify Content .u--justify-content-#{$name} or .u--justify-content-#{$breakpoint-name}-#{$name}
- Overflow .u--overflow-#{$name} or .u--overflow-#{$breakpoint-name}-#{$name}
- Position .u--position-#{$name} or .u--position-#{$breakpoint-name}-#{$name}
- Text-align .u--text-align-#{$name} or .u--position-#{$breakpoint-name}-#{$name}

<br>
Note: This is not intended for use in ongoing projects.

