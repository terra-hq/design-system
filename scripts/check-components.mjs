// Fails if a class the docs promise is missing from the build.
import { readFileSync } from 'node:fs'
const read = f => readFileSync(new URL(`../dist/${f}`, import.meta.url), 'utf8')
const style = read('style.css'), icons = read('icons.css'), forms = read('terraforms.css')
const sizes = ['small', 'medium', 'large']
const want = [
  [style, ['c--btn-a', 'c--btn-b', 'c--btn-c', ...['a', 'b', 'c'].flatMap(v => sizes.map(s => `c--btn-${v}--${s}`)),
    'c--card-wrapper-a', 'c--card-wrapper-b', 'c--tag-a', 'c--icon-a', 'c--terraform-a', 'c--terraform-trio-a',
    ...sizes.map(s => `c--icon-a--${s}`), ...sizes.map(s => `c--terraform-a--${s}`),
    'u--order-last', 'u--order-none', ...Array.from({ length: 11 }, (_, i) => `u--order-${i + 2}`),
    'u--text-decoration-underline', 'u--text-decoration-line-through', 'u--text-decoration-none',
    'u--animation-scale-in', 'u--animation-slide-left', 'u--animation-shake', 'u--animation-shimmer']],
  [icons, ['arrow-right', 'arrow-left', 'check', 'close', 'plus', 'search', 'chevron-down', 'external', 'download', 'copy', 'mail', 'info', 'menu'].map(n => `c--icon-a--${n}`)],
  [forms, ['forma', 'diana', 'stanley', 'mistyk', 'melos', 'prismo', 'mendia', 'boba', 'ebb', 'gollum', 'punky', 'infinito'].map(n => `c--terraform-a--${n}`)],
]
const missing = want.flatMap(([css, names]) => names.filter(n => !css.includes(`.${n}{`) && !css.includes(`.${n},`) && !css.includes(`.${n}:`) && !css.includes(`.${n}-`)))
if (missing.length) { console.error('missing classes:\n' + missing.join('\n')); process.exit(1) }
console.log(`ok: ${want.reduce((n, [, a]) => n + a.length, 0)} component and utility classes present`)
