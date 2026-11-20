# Contributing

## Golden rule

What already exists doesn't change. We only add. Before opening a PR:

```bash
npm run build && npm run check
```

`check` compares the CSS with the frozen v0.0.9 build (`scripts/frozen/`) and fails if any existing rule changed or disappeared.

## `f--` or `u--`

| Question | `f--` foundation | `u--` utility |
|---|---|---|
| How many CSS properties does it set? | Several | One |
| Is it a Terra design decision (named steps, its own responsive behavior)? | Yes | No, the raw value |
| Name | A letter (`a–f`) | The value or a number |

If Terra would decide the value once for every project, it's `f--`. If it's a one-off tweak, it's `u--`. If an `f--` class already covers it, there is no `u--` twin.

## Where things live

```
src/scss/
├── index.scss                  entry: forwards _vars first (so config reaches it), then foundation and utilities
└── framework/
    ├── _var/_vars.scss         EVERY configurable value, with !default
    ├── foundation/<topic>/     f-- : _make-*.scss (mixins) + _<topic>.scss (classes)
    └── utilities/_<topic>.scss u--
bin/terra-ds.mjs                command that reads terra.config.js and compiles
scripts/check-foundation.mjs    the check above
docs/CLASSES.md                 class reference
```

## SCSS of a component: nesting, as in Punky
One block per component class, written the way Punky writes it. The class names do not change; only how they are written.

```scss
.c--tabs-a {
    color: inherit;

    &__hd {                                  // .c--tabs-a__hd
        border-bottom: 1px solid …;

        &__list-group {                      // .c--tabs-a__hd__list-group
            &__list-item {
                &__link {                    // …__list-item__link
                    position: relative;
                    &::after { … }
                    &[aria-expanded="true"] { … }
                    &:focus-visible { … }
                    &__badge { … }           // …__link__badge
                }
            }
        }
    }
    [data-tab-control] { … }                 // what is not BEM goes inside the block, without &
    &--second { … }                          // the modifier, last
}
```

- Elements are `&__x`, following the DOM; modifiers `&--x`; states, pseudo-elements and `@media` go inside the element they affect. There is no depth limit: the limit of 5 is on the class name (`check-names`), and `&__x` writes a flat selector with no extra specificity.
- A rule that needs another component or a context uses the parent selector too: `.c--group-a--second & { … }` inside the field is `.c--group-a--second .c--input-a`.
- `&` only goes at the start of a compound selector, so `a[href]&` is not valid. Use `@include on-tag("a[href]", "button") { … }` (`components/_helpers.scss`): `a[href].c--card-a, button.c--card-a`.
- Two classes that share a body (the letters `a` and `b`, `.c--modal-a, .c--modal-b { &__hd { … } }`) share the block. A loop over the letters (`@each $letter … { .c--x-#{$letter} { &__y { … } } }`) is the same thing written once.
- A nested `@media` comes out right after its rule, not at the end of the file: put it after the declarations it overrides.
- To check a rewrite: build before, build after, and compare the CSS declaration by declaration (same selectors, same values, no change of order between rules that can meet on one element). The frozen baseline (`scripts/frozen/`) compares whole rules, so after a pure rewrite that regroups selectors, freeze it again from the new build.

## `@extend` of utilities in a component
A component does not repeat what a utility already says: `display: flex` is `@extend .u--display-flex` (each file starts with `@use "@scss/framework/utilities/utilities";`, and the `@extend`s go first in the block, before the declarations of its own).

What is extended: one declaration whose property is `display`, `position`, `flex-direction`, `flex-wrap`, `align-items`, `justify-content`, `overflow`, `flex: none`, `min-width: 0`, `cursor: pointer`, `text-decoration: none`, `text-align`, `font-weight` or `width: 100%`, with the exact value of an existing utility, in a base, element (`&__x`) or modifier (`&--x`) rule. What is not:
- anything inside `@media`/`@supports` (Sass does not allow it), and rules with a pseudo-element or a state (`::before`, `:hover`, `:checked +`, `:has()`, `:popover-open`, `[aria-…]`);
- values that come from `$measure`, `pick()`, `radius()` or the config, and the scale utilities (`u--p-3`, `u--gap-2`, `u--width-4`…);
- **a declaration that another rule of the same component sets again at the same specificity** (a modifier, a letter, a state): an `@extend` moves the declaration to where the utility is, which comes before the components, so the override could lose. Leave both plain. The same goes for a longhand placed after its shorthand (`font: inherit; font-weight: 400`): an `@extend` of the longhand would put it before `font: inherit`.

**The font of a component is always a preset of the foundation.** Where a component defines `font-family` or `font-size` it takes the closest `f--font-{a-f}` (a tie, 14px between 16 and 12, goes to `f--font-e`, except a secondary text next to one already in `e`, which goes to `f`). It does not write its own `font-family`, `font-size` or `line-height`; the weight comes from the preset (400) or from `@extend .u--font-medium`. Where the component only inherits (`font: inherit`, no size) nothing is needed.
- A base rule uses `@extend .f--font-e`. A size modifier (`--small`, `--large`) uses the mixin of the foundation, `@include make-font-f(500)`, because an `@extend` cannot override another preset (`f` comes after `e` in the foundation, so it would always win).
- A mono component (`c--diff-a`, the hex of the colour picker) takes the preset and keeps its own `font-family` after it. `c--code-a` is the one exception: its size is the `code.size` option, in em of the text around it.
- A text that did not set its family (it inherited it) now gets the preset's; that is the intended result.

An element with a component and a utility of one property (`c--input-a u--min-width-30`): the component used to win always, because components come last; with `@extend` the component sits in the utility's rule, and the later of the two utilities in its file wins. So `u--display-none`, `u--font-bold` or `u--min-width-30` now work on a component that extended that property, and a utility that comes earlier in its file (`u--display-block` after an `inline-flex`) does not.

To check a change: build, compare the CSS declaration by declaration (same selectors, same values, no order change between rules that can meet on one element) and compare the computed styles of the examples of the docs before and after in a browser. The frozen baseline compares whole rules: after an `@extend` pass, freeze it again from the new build.

## Adding a class

1. If it has a configurable value, put it in `_vars.scss` with `!default`.
2. Create `foundation/<topic>/_<topic>.scss` (or `utilities/_<topic>.scss`) and forward it from `_foundation.scss` / `_utilities.scss`.
3. If it is configurable from `terra.config.js`, add the key in `bin/terra-ds.mjs`.
4. `npm run build && npm run check`.
5. Document it: add the classes to `docs/CLASSES.md`. The full documentation site lives in Terra Docs, outside this repo.

## Adding or changing a component

Every time a component is added or changed, go through this list. The configuration is part of the component, not something added afterwards.

1. **Read the config, do not hard-code.** Colours with `pick(letter)`, corners with `radius(letter, fallback)`, time and curve with `$time-*` and `$ease-*`, the typeface with `$type-a`. No literal colour, radius or duration in a component.
2. **Design decisions get a block.** If a project could reasonably want to change one thing in one state (an opacity, a hover shape, a fill), give the component its own option, like `buttons` and `pills`: a variable with `!default` in `_vars.scss` (`null` when the default is "do nothing"), the key in `bin/terra-ds.mjs` with a check on the value, and the example in `terra.config.example.js`.
2b. **Name it with reserved words.** After `__` only Terra's reserved elements (`hd`, `bd`, `item`, `list-group`, `title`, `content`, `link`, `icon`, `badge`, `dash`…), and the class follows the HTML (`c--tabs-a__hd__list-group__list-item__link`, at most five names). After `--` only the reserved modifiers (`second`, `third`…, `is-active`, `valid`, `error`…) and the few the package accepts. The list is `scripts/reserved-names.mjs` and `npm run check` runs `scripts/check-names.mjs` against it: a new word is a decision, added there with its reason.
3. **Try it with a config of your own.** Build with a small `terra.config.mjs` (another palette, another radius, another time, and your new option) and read the CSS. Also try a palette with only `a` and `b`: it must build, and every missing letter falls back to `a`.
4. **Say what it reads, in the same release.** In Terra Docs: the list "What each component reads from `terra.config.js`" in `components/naming`, the option itself in `configure` (the listing and its section, with what it changes, where you see it and the default), and `design.md`.
5. **Release.** Bump the version, freeze the baseline (`scripts/frozen`), `npm run build && npm run check`, publish, and only then bump the version Terra Docs pins and describe it.

## Documentation

This repo only holds the code and `docs/CLASSES.md`. The documentation site (guides, examples, the design reference) lives in Terra Docs, so there is no docs app to build or deploy here.

## Versioning

Only additions: minor version. Changing or removing something existing: major version.

One deliberate exception so far: in 0.1.0 the default `f--font-*` typeface changed from Arial to Uncut Sans. `scripts/check-foundation.mjs` ignores the `font-family` value for that reason, and nothing else.

## Known gaps

- Breakpoints aren't configurable: 17 utilities define their own map. Check the differences between the utilities' breakpoint maps before touching them.
- States (`u--hover-*`) and transitions (`u--transition-*`).
