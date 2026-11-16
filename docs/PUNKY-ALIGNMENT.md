# Aligning the design system with Punky

Rule: the syntax of Punky (`punky-framework/punky/src/scss/framework`) is the reference. The team has worked with it for a
long time, so the design system stays close to it. Where the two differ, Punky wins; what the design system has and Punky
does not is added using Punky's grammar.

Compared by compiling Punky's `foundation` and `utilities` (987 classes, 57 families) against `dist/style.css` 0.9.0
(2,464 classes, 128 families).

## 1. Breakpoints: same names, opposite meaning (the serious one)

| Name | Punky (`min-width`, mobile-first) | Design system (`max-width`, desktop-first) |
|---|---|---|
| `tablets` | from 580px | up to 810px |
| `tabletm` | from 810px | up to 1024px |
| `tabletl` | from 1024px | up to (laptop) |
| `laptop` | from 1300px | up to |
| `desktop` | from 1570px | up to |
| `wide` | from 1700px | does not exist |
| `mobile` | does not exist (the base is mobile) | up to 580px |

`u--display-tablets-none` hides from 580px up in Punky and up to 810px in the design system. Same class, opposite result.
Change: the design system uses Punky's variables (`$viewport-type: min-width`, 580 / 810 / 1024 / 1300 / 1570 / 1700) and
drops `mobile`.

## 2. Names that Punky has and the design system renamed

| Punky (keep) | Design system 0.9.0 (change back) |
|---|---|
| `u--p-4` `u--pt-4` `u--pr-4` `u--pb-4` `u--pl-4` | `u--padding-4` `u--padding-top-4` … |
| `u--m-4` `u--mt-4` `u--mr-4` `u--mb-4` `u--ml-4` | `u--margin-4` `u--margin-top-4` … |
| `u--p-auto` / `u--m-auto` style (`auto` is a step) | `u--margin-auto`, `u--margin-x-auto` |
| `u--text-center` `u--text-left` `u--text-right` | `u--text-align-center` … |
| `u--font-regular` `-medium` `-semibold` `-bold` | same, plus `thin` … `black` (extra) |
| `u--opacity-4` `u--opacity-5` | `u--opacity-100/85/70/50` |

Open point: the design system also has `px`, `py`, `mx`, `my` (and Punky does not). Their names follow the same short form.

## 3. Only in Punky (to add to the design system)

`u--display-grid`, `u--overflow-clip`, `u--text-uppercase` (text-transform), `f--order`.

## 4. Only in the design system (to name with Punky's grammar)

`u--border-*`, `u--divide-edge`, `u--flex-1` `u--flex-none` `u--flex-grow-1`, `u--gap` `u--row-gap` `u--column-gap`,
`u--height-n` `u--width-n` `u--min-width-n` `u--min-height-screen`, `u--top|right|bottom|left-*`, `u--z-index-*`,
`u--cursor-pointer`, the states (`u--hover-*`, `u--focus-ring`, `u--active-scale-*`, `u--disabled-opacity-*`,
`u--group*`), motion (`u--transition-*`, `u--duration-*`, `u--ease-*`, `u--animation-*`), `f--radius-*`, `f--shadow-*`,
`f--section-*`, and the components with the Terra modifiers.

## 5. Order of work

1. Breakpoints to Punky's.
2. Names of section 2 back to Punky's, and the migration of terra-docs.
3. Section 3 added.
4. Section 4: each name proposed with Punky's grammar and approved by the team before it is written.
5. Documentation, migration script, one release.
