// Fails if a class of the build uses a word that is not on the list of scripts/reserved-names.mjs, or nests more than five names.
// It reads the compiled CSS and not the SCSS on purpose: the SCSS builds names with interpolation (`.c--alert-#{$letter}__content`), which a
// linter of the source cannot see.
import { readFileSync } from 'node:fs'
import { ELEMENTS, MODIFIERS, PACKAGE_MODIFIERS, ICON_TYPES, TERRAFORM_SHAPES, MAX_DEPTH } from './reserved-names.mjs'

const read = f => readFileSync(new URL(`../dist/${f}`, import.meta.url), 'utf8')
const css = ['style.css', 'icons.css', 'terraforms.css'].map(read).join('\n')
const names = [...new Set([...css.matchAll(/\.(c--[a-z0-9]+(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)*(?:--[a-z0-9]+(?:-[a-z0-9]+)*)*)(?![\w-])/g)].map(m => m[1]))]

const problems = []
for (const n of names) {
  // c--{name}-{letter}, then a chain of __element and --modifier
  const m = /^c--([a-z0-9]+(?:-[a-z0-9]+)*?)-([a-z])((?:__|--).*)?$/.exec(n)
  if (!m) { problems.push(`${n}: not c--{name}-{letter}`); continue }
  const [, comp, , rest = ''] = m
  const parts = [...rest.matchAll(/(__|--)([a-z0-9]+(?:-[a-z0-9]+)*)/g)]
  let depth = 0
  for (const [, sep, word] of parts) {
    if (sep === '__') {
      depth++
      if (!ELEMENTS.has(word)) problems.push(`${n}: __${word} is not a reserved element`)
    } else {
      const ok = MODIFIERS.has(word) || PACKAGE_MODIFIERS.has(word) || /^[a-z]$/.test(word) // a single letter is a variant: c--pill-a--d
        || (comp === 'icon' && ICON_TYPES.has(word)) || (comp === 'terraform' && TERRAFORM_SHAPES.has(word))
      if (!ok) problems.push(`${n}: --${word} is not on the list of modifiers`)
    }
  }
  if (depth > MAX_DEPTH) problems.push(`${n}: ${depth} elements deep (the most is ${MAX_DEPTH})`)
}
if (problems.length) { console.error(`names that break the list (${problems.length}):\n` + problems.join('\n')); process.exit(1) }
console.log(`ok: ${names.length} component class names use reserved words, up to ${MAX_DEPTH} deep`)
