// The naming contract of the utilities: u--{css-property}[-{breakpoint}]-{value}, like f--offset-tabletm-4 in Terra.
// Fails (or, with --list, prints) every u-- class whose name is not a CSS property followed by a value.
// Run: node scripts/check-naming.mjs [--list]
import { readFileSync } from 'node:fs'

const css = readFileSync(new URL('../dist/style.css', import.meta.url), 'utf8')

// The CSS properties the utilities may be named after (longest match wins). `-x` and `-y` are the logical pairs of
// padding and margin; they are the only suffixes that are not a CSS property on their own.
const PROPERTIES = [
  'display', 'position', 'overflow', 'order', 'opacity', 'z-index', 'cursor', 'animation',
  'top', 'right', 'bottom', 'left',
  'height', 'width', 'min-height', 'min-width', 'aspect-ratio',
  'flex', 'flex-direction', 'flex-wrap', 'flex-grow', 'align-items', 'justify-content',
  'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'padding-x', 'padding-y',
  'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'margin-x', 'margin-y',
  'gap', 'row-gap', 'column-gap',
  'border', 'outline', 'transform',
  'text-align', 'text-decoration', 'font-style', 'font-weight',
  'transition', 'transition-property', 'transition-duration', 'transition-timing-function',
].sort((a, b) => b.length - a.length)

const BREAKPOINT = /-(desktop|laptop|tabletl|tabletm|tablets|mobile)(?=-|$)/
const classes = [...new Set([...css.matchAll(/\.(u--[a-z0-9-]+)/g)].map(m => m[1]))].sort()

const bad = []
for (const c of classes) {
  const name = c.slice(3).replace(BREAKPOINT, '') // the breakpoint sits after the property, as Terra does
  const prop = PROPERTIES.find(p => name === p || name.startsWith(p + '-'))
  const reasons = []
  if (!prop) reasons.push('the name does not start with a CSS property')
  if (/^(hover|focus|active|disabled|group)/.test(c.slice(3))) reasons.push('the state is inside the name (not decided yet: how a state is written)')
  if (reasons.length) bad.push([c, reasons])
}

if (process.argv.includes('--list')) {
  const byReason = new Map()
  for (const [c, rs] of bad) for (const r of rs) byReason.set(r, [...(byReason.get(r) ?? []), c])
  for (const [r, cs] of byReason) console.log(`\n${cs.length} classes: ${r}\n  ${cs.slice(0, 8).join('  ')}${cs.length > 8 ? '  …' : ''}`)
}
if (bad.length) { console.error(`\nnaming: ${bad.length} of ${classes.length} utility classes break the contract`); process.exit(1) }
console.log(`ok: ${classes.length} utility classes follow the naming contract`)
