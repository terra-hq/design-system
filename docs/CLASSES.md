# Class reference

Every base class the package generates, by family (this file lists the names; every class also has a variant per breakpoint, except states). It is made from the class catalog of the docs site (`src/lib/design-system-classes.ts`, generated from the CSS of 0.21.0), which also publishes the version with examples at `/design-system/classes`. For how to load it, configure it and what each layer means, see the [README](../README.md).

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
$color-b: #ffffff;
$color-c: #f7f8f4;

/* Accent Color */
$color-d: #7ce55e;
$color-e: #189b5c;
$color-f: #3d9dd8;
$color-g: #ffb41d;
$color-h: #f96e43;
$color-i: #f78bd8;
```
<br><br>

## Foundation

### Container

Wraps the page content; fluid variants span the full width.

`f--container` `f--container--fluid`

### Row

A flex row of columns with a 32px gutter.

`f--row` `f--row--remove-gutter`

### Columns

12 columns. Mobile-first, like Punky: f--col-12 is the base and f--col-tabletl-6 applies from 1024px up.

`f--col-1` `f--col-2` `f--col-3` `f--col-4` `f--col-5` `f--col-6` `f--col-7` `f--col-8` `f--col-9` `f--col-10` `f--col-11` `f--col-12`

### Offset

Pushes a column right by N columns.

`f--offset-0` `f--offset-1` `f--offset-2` `f--offset-3` `f--offset-4` `f--offset-5` `f--offset-6` `f--offset-7` `f--offset-8` `f--offset-9` `f--offset-10` `f--offset-11`

### Order

The order of a column. Add a breakpoint for a variant: f--order-tabletm-1.

`f--order-1`

### Text color

Only a (Noche) and b (white) are text colors for brand work.

`f--color-a` `f--color-b` `f--color-c` `f--color-d` `f--color-e` `f--color-f` `f--color-g` `f--color-h` `f--color-i` `f--color-j` `f--color-k` `f--color-l` `f--color-m` `f--color-n` `f--color-o` `f--color-p`

### Background

Only a, b and c (Noche, white, Morning Haze) are backgrounds for brand work.

`f--background-a` `f--background-b` `f--background-c` `f--background-d` `f--background-e` `f--background-j` `f--background-k` `f--background-l` `f--background-m` `f--background-n` `f--background-o` `f--background-p`

### Typography

Family, size, line height, weight and the responsive step. a, b and c are 700; d, e and f are 400.

`f--font-a` `f--font-b` `f--font-c` `f--font-d` `f--font-e` `f--font-f`

### Radius

Corners, named with letters.

`f--radius-a` `f--radius-b` `f--radius-c` `f--radius-d` `f--radius-full` `f--radius-round`

### Shadow

Elevation for things that float.

`f--shadow-a` `f--shadow-b` `f--shadow-c`

### Section

Vertical padding of a section.

`f--section-a` `f--section-b` `f--section-c` `f--section-d` `f--section-e` `f--section-f`

### Gap

Space between groups.

`f--gap-a` `f--gap-b` `f--gap-c` `f--gap-d`

### Stack

Space between stacked elements (bottom margin).

`f--sp-a` `f--sp-b` `f--sp-c` `f--sp-d`

## Utilities

### Display

`u--display-grid` `u--display-block` `u--display-none` `u--display-inline-block` `u--display-inline` `u--display-table` `u--display-table-cell` `u--display-table-row` `u--display-flex` `u--display-inline-flex`

### Flex

Direction, wrap and grow: u--flex-1 takes the free space, u--flex-grow-1 grows from its own size, u--flex-none keeps its size.

`u--flex-direction-row` `u--flex-direction-row-reverse` `u--flex-direction-column-reverse` `u--flex-direction-column` `u--flex-wrap-wrap` `u--flex-wrap-nowrap` `u--flex-1` `u--flex-grow-1` `u--flex-none`

### Grid

A grid of equal columns: u--display-grid with u--grid-cols-1 to 12 (u--grid-cols-7 is a week). u--place-items-center and u--justify-items-center centre what is inside each cell.

`u--grid-cols-1` `u--grid-cols-2` `u--grid-cols-3` `u--grid-cols-4` `u--grid-cols-5` `u--grid-cols-6` `u--grid-cols-7` `u--grid-cols-8` `u--grid-cols-9` `u--grid-cols-10` `u--grid-cols-11` `u--grid-cols-12` `u--justify-items-center` `u--place-items-center`

### Align items

`u--align-items-baseline` `u--align-items-stretch` `u--align-items-flex-start` `u--align-items-flex-end` `u--align-items-center`

### Justify content

`u--justify-content-space-between` `u--justify-content-space-around` `u--justify-content-space-evenly` `u--justify-content-flex-start` `u--justify-content-flex-end` `u--justify-content-center`

### Position

`u--position-relative` `u--position-absolute` `u--position-fixed` `u--position-sticky` `u--position-inherit` `u--position-unset`

### Offsets

top, right, bottom and left at 0 or 100%, for positioned elements.

`u--top-0` `u--top-100` `u--right-0` `u--right-100` `u--bottom-0` `u--bottom-100` `u--left-0` `u--left-100`

### Z index

Stacking order: 20 for sticky bars, 40 for dropdowns over them.

`u--z-index-0` `u--z-index-10` `u--z-index-20` `u--z-index-40`

### Cursor

The hand cursor for a clickable row that is not a link or a button.

`u--cursor-pointer`

### Overflow

`u--overflow-hidden` `u--overflow-visible` `u--overflow-auto` `u--overflow-clip`

### Order

`u--order-first` `u--order-last` `u--order-none` `u--order-1` `u--order-2` `u--order-3` `u--order-4` `u--order-5` `u--order-6` `u--order-7` `u--order-8` `u--order-9` `u--order-10` `u--order-11` `u--order-12`

### Width

u--min-width-0 lets a flex child shrink below its content; u--min-width-10 to 40 set a floor of n x 0.5rem.

`u--width-100` `u--width-75` `u--width-50` `u--width-25` `u--width-auto` `u--min-width-0` `u--min-width-10` `u--min-width-20` `u--min-width-30` `u--min-width-40` `u--width-2` `u--width-3` `u--width-4` `u--width-5` `u--width-6` `u--width-8` `u--width-10` `u--width-12`

### Height

`u--height-100` `u--height-75` `u--height-50` `u--height-25` `u--height-auto` `u--min-height-screen` `u--height-2` `u--height-3` `u--height-4` `u--height-5` `u--height-6` `u--height-8` `u--height-10` `u--height-12`

### Aspect ratio

`u--ar` `u--ar-a` `u--ar-b` `u--ar-c` `u--ar-d` `u--ar-e` `u--ar-f`

### Text align

Written like Punky: u--text-center. Add a breakpoint for a variant: u--text-tablets-left.

`u--text-left` `u--text-center` `u--text-right` `u--text-justify`

### Text transform

`u--text-uppercase`

### Text decoration

No breakpoint variants.

`u--text-decoration-underline` `u--text-decoration-line-through` `u--text-decoration-none`

### Font style

`u--font-style-italic` `u--font-style-normal`

### Font weight

f--font-a, b and c are 700 by default; add one of these to change it.

`u--font-thin` `u--font-extralight` `u--font-light` `u--font-regular` `u--font-medium` `u--font-semibold` `u--font-bold` `u--font-extrabold` `u--font-black`

### Hover

Written like the breakpoints of Punky: u--background-hover-c. With a breakpoint it comes first: u--background-tablets-hover-c. u--radius-hover-a is the corners on hover (pair it with u--transition-all u--duration-b). Only on devices that can hover.

`u--color-hover-a` `u--border-hover-a` `u--color-hover-b` `u--border-hover-b` `u--color-hover-c` `u--border-hover-c` `u--color-hover-d` `u--border-hover-d` `u--color-hover-e` `u--border-hover-e` `u--color-hover-f` `u--border-hover-f` `u--color-hover-g` `u--border-hover-g` `u--color-hover-h` `u--border-hover-h` `u--color-hover-i` `u--border-hover-i` `u--color-hover-j` `u--border-hover-j` `u--color-hover-k` `u--border-hover-k` `u--color-hover-l` `u--border-hover-l` `u--color-hover-m` `u--border-hover-m` `u--color-hover-n` `u--border-hover-n` `u--color-hover-o` `u--border-hover-o` `u--color-hover-p` `u--border-hover-p` `u--background-hover-a` `u--background-hover-b` `u--background-hover-c` `u--background-hover-d` `u--background-hover-e` `u--background-hover-j` `u--background-hover-k` `u--background-hover-l` `u--background-hover-m` `u--background-hover-n` `u--background-hover-o` `u--background-hover-p`

### Group hover

Put u--group on the parent and u--color-group-hover-* on its children.

`u--color-group-hover-a` `u--border-group-hover-a` `u--color-group-hover-b` `u--border-group-hover-b` `u--color-group-hover-c` `u--border-group-hover-c` `u--color-group-hover-d` `u--border-group-hover-d` `u--color-group-hover-e` `u--border-group-hover-e` `u--color-group-hover-f` `u--border-group-hover-f` `u--color-group-hover-g` `u--border-group-hover-g` `u--color-group-hover-h` `u--border-group-hover-h` `u--color-group-hover-i` `u--border-group-hover-i` `u--color-group-hover-j` `u--border-group-hover-j` `u--color-group-hover-k` `u--border-group-hover-k` `u--color-group-hover-l` `u--border-group-hover-l` `u--color-group-hover-m` `u--border-group-hover-m` `u--color-group-hover-n` `u--border-group-hover-n` `u--color-group-hover-o` `u--border-group-hover-o` `u--color-group-hover-p` `u--border-group-hover-p` `u--background-group-hover-a` `u--background-group-hover-b` `u--background-group-hover-c` `u--background-group-hover-d` `u--background-group-hover-e` `u--background-group-hover-j` `u--background-group-hover-k` `u--background-group-hover-l` `u--background-group-hover-m` `u--background-group-hover-n` `u--background-group-hover-o` `u--background-group-hover-p` `u--group`

### Focus

A 2px outline in that color, only for keyboard focus.

`u--outline-focus-a` `u--outline-focus-b` `u--outline-focus-c` `u--outline-focus-d` `u--outline-focus-e` `u--outline-focus-f` `u--outline-focus-g` `u--outline-focus-h` `u--outline-focus-i` `u--outline-focus-j` `u--outline-focus-k` `u--outline-focus-l` `u--outline-focus-m` `u--outline-focus-n` `u--outline-focus-o` `u--outline-focus-p`

### Active

Pressed: transform scale.

`u--transform-active-scale-90` `u--transform-active-scale-95` `u--transform-active-scale-98`

### Disabled

On :disabled and [aria-disabled="true"].

`u--opacity-disabled-25` `u--opacity-disabled-50` `u--opacity-disabled-75`

### Border

A 1px solid border in a palette color.

`u--border-a` `u--border-b` `u--border-c` `u--border-d` `u--border-e` `u--border-f` `u--border-g` `u--border-h` `u--border-i` `u--border-j` `u--border-k` `u--border-l` `u--border-m` `u--border-n` `u--border-o` `u--border-p`

### Divide

A 1px rule (Noche at 14%) between the children, not before the first.

`u--divide-edge`

### Opacity

Strength of the element. Use it for secondary text.

`u--opacity-100` `u--opacity-85` `u--opacity-70` `u--opacity-50`

### Transition

Properties to animate. Default 0.1s with the productive curve.

`u--transition-all` `u--transition-colors` `u--transition-opacity` `u--transition-transform`

### Duration

a 0.1s, b 0.3s, c 0.6s.

`u--duration-a` `u--duration-b` `u--duration-c`

### Easing

a productive, b expressive.

`u--ease-standard-a` `u--ease-standard-b` `u--ease-entrance-a` `u--ease-entrance-b` `u--ease-exit-a` `u--ease-exit-b`

### Animation

All of them respect prefers-reduced-motion.

`u--animation-fade-in` `u--animation-fade-up` `u--animation-spin` `u--animation-pulse` `u--animation-scale-in` `u--animation-slide-left` `u--animation-shake` `u--animation-shimmer`

### Spacing

Steps are multiplied by 8px: u--p-4 is 32px. Mobile-first, like Punky: add a breakpoint for a variant, u--p-tablets-4 applies from 580px up.

`u--p-0` `u--p-1` `u--p-2` `u--p-3` `u--p-4` `u--p-5` `u--p-6` `u--p-7` `u--p-8` `u--p-9` `u--p-10` `u--p-12` `u--p-15` `u--pt-0` `u--pt-1` `u--pt-2` `u--pt-3` `u--pt-4` `u--pt-5` `u--pt-6` `u--pt-7` `u--pt-8` `u--pt-9` `u--pt-10` `u--pt-12` `u--pt-15` `u--pr-0` `u--pr-1` `u--pr-2` `u--pr-3` `u--pr-4` `u--pr-5` `u--pr-6` `u--pr-7` `u--pr-8` `u--pr-9` `u--pr-10` `u--pr-12` `u--pr-15` `u--pb-0` `u--pb-1` `u--pb-2` `u--pb-3` `u--pb-4` `u--pb-5` `u--pb-6` `u--pb-7` `u--pb-8` `u--pb-9` `u--pb-10` `u--pb-12` `u--pb-15` `u--pl-0` `u--pl-1` `u--pl-2` `u--pl-3` `u--pl-4` `u--pl-5` `u--pl-6` `u--pl-7` `u--pl-8` `u--pl-9` `u--pl-10` `u--pl-12` `u--pl-15` `u--px-0` `u--px-1` `u--px-2` `u--px-3` `u--px-4` `u--px-5` `u--px-6` `u--px-7` `u--px-8` `u--px-9` `u--px-10` `u--px-12` `u--px-15` `u--py-0` `u--py-1` `u--py-2` `u--py-3` `u--py-4` `u--py-5` `u--py-6` `u--py-7` `u--py-8` `u--py-9` `u--py-10` `u--py-12` `u--py-15` `u--m-0` `u--m-1` `u--m-2` `u--m-3` `u--m-4` `u--m-5` `u--m-6` `u--m-7` `u--m-8` `u--m-9` `u--m-10` `u--m-12` `u--m-15` `u--mt-0` `u--mt-1` `u--mt-2` `u--mt-3` `u--mt-4` `u--mt-5` `u--mt-6` `u--mt-7` `u--mt-8` `u--mt-9` `u--mt-10` `u--mt-12` `u--mt-15` `u--mr-0` `u--mr-1` `u--mr-2` `u--mr-3` `u--mr-4` `u--mr-5` `u--mr-6` `u--mr-7` `u--mr-8` `u--mr-9` `u--mr-10` `u--mr-12` `u--mr-15` `u--mb-0` `u--mb-1` `u--mb-2` `u--mb-3` `u--mb-4` `u--mb-5` `u--mb-6` `u--mb-7` `u--mb-8` `u--mb-9` `u--mb-10` `u--mb-12` `u--mb-15` `u--ml-0` `u--ml-1` `u--ml-2` `u--ml-3` `u--ml-4` `u--ml-5` `u--ml-6` `u--ml-7` `u--ml-8` `u--ml-9` `u--ml-10` `u--ml-12` `u--ml-15` `u--mx-0` `u--mx-1` `u--mx-2` `u--mx-3` `u--mx-4` `u--mx-5` `u--mx-6` `u--mx-7` `u--mx-8` `u--mx-9` `u--mx-10` `u--mx-12` `u--mx-15` `u--my-0` `u--my-1` `u--my-2` `u--my-3` `u--my-4` `u--my-5` `u--my-6` `u--my-7` `u--my-8` `u--my-9` `u--my-10` `u--my-12` `u--my-15` `u--gap-0` `u--gap-1` `u--gap-2` `u--gap-3` `u--gap-4` `u--gap-5` `u--gap-6` `u--gap-7` `u--gap-8` `u--gap-9` `u--gap-10` `u--gap-12` `u--gap-15` `u--row-gap-0` `u--row-gap-1` `u--row-gap-2` `u--row-gap-3` `u--row-gap-4` `u--row-gap-5` `u--row-gap-6` `u--row-gap-7` `u--row-gap-8` `u--row-gap-9` `u--row-gap-10` `u--row-gap-12` `u--row-gap-15` `u--column-gap-0` `u--column-gap-1` `u--column-gap-2` `u--column-gap-3` `u--column-gap-4` `u--column-gap-5` `u--column-gap-6` `u--column-gap-7` `u--column-gap-8` `u--column-gap-9` `u--column-gap-10` `u--column-gap-12` `u--column-gap-15` `u--mx-auto` `u--my-auto` `u--m-auto`

## Components

### Button

a primary, b secondary, c tertiary. Sizes are modifiers: --small, --medium, --large.

`c--btn-a` `c--btn-d` `c--btn-e` `c--btn-b` `c--btn-c` `c--btn-a--fourth` `c--btn-a--small` `c--btn-a--medium` `c--btn-a--large` `c--btn-b--small` `c--btn-b--medium` `c--btn-b--large` `c--btn-c--small` `c--btn-c--medium` `c--btn-c--large` `c--btn-d--small` `c--btn-d--medium` `c--btn-d--large` `c--btn-e--small` `c--btn-e--medium` `c--btn-e--large` `c--btn-a--icon` `c--btn-a--second` `c--btn-a--third` `c--btn-a--fifth`

### Card

The box of a card: put anything inside. b has no padding.

`c--card-wrapper-a` `c--card-wrapper-b`

### Form

A wrapper with an __item inside. States are modifiers of the wrapper: --error, --valid, --disabled. __icon puts an icon inside the field (left or right, an <i> or a button); __bd is the panel a field opens under it (the calendar), a native popover. c--group-a--second is for Noche.

`c--group-a` `c--label-a` `c--label-a--required` `c--legend-a` `c--input-a` `c--input-a__item` `c--input-a--error` `c--input-a--valid` `c--input-a--disabled` `c--textarea-a` `c--textarea-a__item` `c--select-a__item` `c--checkbox-a` `c--checkbox-a__item` `c--checkbox-a__title` `c--radio-a` `c--radio-a__item` `c--radio-a__title` `c--toggle-a` `c--toggle-a__item` `c--toggle-a__title` `c--error-a` `c--input-a__icon` `c--input-a__bd`

### Header

The bar at the top of a page. The height follows what is inside. __logo, __list-group (the links, buttons or links of the system), __item-right (icon buttons, the account) and __btn (the burger, shown below 810px). b is for Noche.

`c--header-a` `c--header-a__logo` `c--header-a__list-group` `c--header-a__item-right` `c--header-a__btn` `c--header-b` `c--header-b__logo` `c--header-b__list-group` `c--header-b__item-right` `c--header-b__btn`

### Menu

A list of actions: a native popover opened by a button (popovertarget), or always visible with no popover attribute. __item is an action, --danger, --warning, --info and --success colour its icon, --second makes it flat. b is for Noche.

`c--menu-a` `c--menu-a__item` `c--menu-b__item` `c--menu-b` `c--menu-a--second`

### Tooltip

A short explanation above what it explains. a is the dark one, b the white one. __item is an inline word with a dotted line, __bd the bubble (hover after 300ms and focus, CSS only, it can hold a link), --second opens it below.

`c--tooltip-a` `c--tooltip-a__item` `c--tooltip-a__bd` `c--tooltip-b` `c--tooltip-b__item` `c--tooltip-b__bd`

### Table

On the table element, inside __wrapper (the card, it scrolls sideways). __btn is a sortable header, --second is the full grid (time off, a rota), b is for Noche.

`c--table-a` `c--table-a__wrapper` `c--table-a__btn` `c--table-b__wrapper` `c--table-b` `c--table-b__btn` `c--table-a--second` `c--table-b--second`

### Diff

On a pre. One class per line: same, add, del, skip.

`c--diff-a` `c--diff-a__item` `c--diff-a__item--second` `c--diff-a__item--fourth` `c--diff-a__item__badge` `c--diff-a__item--third`

### Modal

On a native dialog: showModal() and close(). __hd is the head with a close icon, __ft the footer row, b is for Noche.

`c--modal-a` `c--modal-a--second` `c--modal-a__hd` `c--modal-a__ft` `c--modal-b` `c--modal-b--second`

### Avatar

A circle with a photo or initials. 32px; --small 24, --large 48; --second on Noche; --d to --i draw an identity ring. b is a photo with a neutral fill and an edge; c--avatar-stack-a is several in a row (__item, __badge for the +N).

`c--avatar-a` `c--avatar-a--small` `c--avatar-a--large` `c--avatar-a--second` `c--avatar-a--d` `c--avatar-a--e` `c--avatar-a--f` `c--avatar-a--g` `c--avatar-a--h` `c--avatar-a--i` `c--avatar-stack-a` `c--avatar-stack-a__item` `c--avatar-stack-a__badge` `c--avatar-stack-b` `c--avatar-stack-b__item` `c--avatar-stack-b__badge` `c--avatar-b` `c--avatar-b--small` `c--avatar-b--large` `c--avatar-b--second`

### Pill

A pill. The element decides: a <span> does nothing (an outline and a dot); an <a> or <button> is clickable (a fill, and the corners and fill change on hover or when selected).

`c--pill-a` `c--pill-a--d` `c--pill-a--e` `c--pill-a--g` `c--pill-a--h` `c--pill-a--i` `c--pill-b` `c--pill-c` `c--pill-d` `c--pill-e` `c--pill-f` `c--pill-a--second`

### Alert

An inline message: a soft tint of a colour, big corners, no outline. One variant per colour: a info, b success, c warning, d danger by default (the project sets them with alerts.kinds). __content is the message; --second is for Noche; the layout inside is utilities (stacked by default, or a row); the default size is the text font, small; an f--font-* on it makes it bigger.

`c--alert-a` `c--alert-a__content` `c--alert-b` `c--alert-b__content` `c--alert-c` `c--alert-c__content` `c--alert-d` `c--alert-d__content`

### Code

A literal inside a sentence: an id, a slug, a key, a path or a class, in a mono face at 0.85em of the text on a soft tint of sol yellow. Put it on a <code>; the colour, strength, size and face are the code option.

`c--code-a`

### Sidebar

A column of pages in groups. __link is a page (aria-current="page" makes the Noche capsule with the dot), __item a group that opens and closes, __item__hd its title, __item__hd__icon the system chevron that turns, __item__bd its pages (a c--sidebar too), __dash a line between families, --second is for Noche; the size is the f--font-* on the column.

`c--sidebar-a` `c--sidebar-a__link` `c--sidebar-a__item__hd` `c--sidebar-a__item__hd__icon` `c--sidebar-a__item__bd` `c--sidebar-a__dash` `c--sidebar-b` `c--sidebar-b__link` `c--sidebar-b__item__hd` `c--sidebar-b__item__hd__icon` `c--sidebar-b__item__bd` `c--sidebar-b__dash`

### Segment

Switches between views of the same content: a sunk track that hugs its options, the chosen one raised. __item is an option, __item--icon an icon-only one, --second is for Noche; the size is the f--font-* on the group.

`c--segment-a` `c--segment-a__item` `c--segment-a__item__badge` `c--segment-a__item--icon` `c--segment-b` `c--segment-b__item` `c--segment-b__item__badge` `c--segment-b__item--icon`

### Tabs

Text items on a 1px rule. The open item and the hovered one get an accent underline. __hd is the header, __hd__item a tab, __hd__wrapper the dropdown for narrow screens, __badge a number after the label, --second shows the dropdown at any width; the size is the f--font-* on the component. Same markup as the collapsify tabs.

`c--tabs-a` `c--tabs-a__hd` `c--tabs-a__hd__list-group__list-item__link` `c--tabs-a__hd__list-group__list-item__link__badge` `c--tabs-a__hd__wrapper` `c--tabs-a__hd__wrapper__item`

### Link

a: ink with an underline that retracts. b: ink, no underline, fades. c and d: the same on a Noche surface. Modifiers: --strong, --bold, --icon; __icon is the ↗ of a link that leaves the product.

`c--link-a` `c--link-b` `c--link-c` `c--link-a--strong` `c--link-a--bold` `c--link-a--icon` `c--link-a__icon`

### Icon

Painted with the text color. Types come from icons.css.

`c--icon-a` `c--icon-a--small` `c--icon-a--medium` `c--icon-a--large`

### Icon types

In icons.css: a modifier per icon.

`c--icon-a--archive` `c--icon-a--arrow-left` `c--icon-a--arrow-right` `c--icon-a--calendar` `c--icon-a--check` `c--icon-a--chevron-down` `c--icon-a--chevron-left` `c--icon-a--chevron-right` `c--icon-a--close` `c--icon-a--copy` `c--icon-a--download` `c--icon-a--duplicate` `c--icon-a--external` `c--icon-a--info` `c--icon-a--mail` `c--icon-a--menu` `c--icon-a--more` `c--icon-a--pencil` `c--icon-a--plus` `c--icon-a--search` `c--icon-a--share` `c--icon-a--trash`

### Terraform

Painted with the text color. Alone, or in a trio. Shapes come from terraforms.css.

`c--terraform-a` `c--terraform-a--small` `c--terraform-a--medium` `c--terraform-a--large`

### Terraform trio

Wraps three different shapes in three different colors.

`c--terraform-trio-a`

### Terraform shapes

In terraforms.css: a modifier per shape.

`c--terraform-a--boba` `c--terraform-a--diana` `c--terraform-a--ebb` `c--terraform-a--forma` `c--terraform-a--gollum` `c--terraform-a--infinito` `c--terraform-a--melos` `c--terraform-a--mendia` `c--terraform-a--mistyk` `c--terraform-a--prismo` `c--terraform-a--punky` `c--terraform-a--stanley`

