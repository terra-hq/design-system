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
docs/                           Astro site (npm run docs:dev)
docs/CLASSES.md                 class reference
TERRA.md                        how Terra works (design reference)
```

## Adding a class

1. If it has a configurable value, put it in `_vars.scss` with `!default`.
2. Create `foundation/<topic>/_<topic>.scss` (or `utilities/_<topic>.scss`) and forward it from `_foundation.scss` / `_utilities.scss`.
3. If it is configurable from `terra.config.js`, add the key in `bin/terra-ds.mjs`.
4. `npm run build && npm run check`.
5. Document it: add an `.mdx` page in `docs/src/content/docs/` (it needs `title`, `group`, `order` in the frontmatter). Class tables fill themselves from the compiled CSS.

## Docs site

`docs/` is a separate Astro project (not published to npm). `npm run docs:dev` builds the library, then starts the site. Its examples run on the real compiled CSS, and `TERRA.md` and this file are copied in as pages by `docs/scripts/sync.mjs`.

## Versioning

Only additions: minor version. Changing or removing something existing: major version.

One deliberate exception so far: in 0.1.0 the default `f--font-*` typeface changed from Arial to Uncut Sans. `scripts/check-foundation.mjs` ignores the `font-family` value for that reason, and nothing else.

## Known gaps

- Breakpoints aren't configurable: 17 utilities define their own map. Check the differences listed in `TERRA.md` before touching them.
- States (`u--hover-*`) and transitions (`u--transition-*`).
