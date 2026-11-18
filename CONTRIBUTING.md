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
