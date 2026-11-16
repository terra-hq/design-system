// Fails if a class the docs promise is missing from the build.
import { readFileSync } from 'node:fs'
const read = f => readFileSync(new URL(`../dist/${f}`, import.meta.url), 'utf8')
const style = read('style.css'), icons = read('icons.css'), forms = read('terraforms.css')
const sizes = ['small', 'medium', 'large']
const want = [
  [style, ['c--btn-a', 'c--btn-b', 'c--btn-c', ...['a', 'b', 'c', 'd', 'e'].flatMap(v => sizes.map(s => `c--btn-${v}--${s}`)), 'c--btn-d', 'c--btn-e', 'c--btn-a--second', 'c--btn-a--third', 'c--btn-a--fourth', 'c--btn-a--fifth', 'c--btn-a--sixth',
    'c--card-wrapper-a', 'c--card-wrapper-b', 'c--tag-a', 'c--group-a', 'c--label-a', 'c--legend-a', 'c--input-a', 'c--input-a__item', 'c--input-a--error', 'c--textarea-a', 'c--select-a', 'c--checkbox-a', 'c--checkbox-a__title', 'c--radio-a', 'c--radio-a__title', 'c--error-a', 'c--table-a', 'c--diff-a', 'c--diff-a__same', 'c--diff-a__add', 'c--diff-a__del', 'c--diff-a__skip', 'c--diff-a__mark', 'c--modal-a', 'c--modal-a--second', 'c--icon-a', 'c--terraform-a', 'c--terraform-trio-a',
    ...sizes.map(s => `c--icon-a--${s}`), ...sizes.map(s => `c--terraform-a--${s}`),
    'u--order-last', 'u--order-none', ...Array.from({ length: 11 }, (_, i) => `u--order-${i + 2}`),
    'u--text-decoration-underline', 'u--text-decoration-line-through', 'u--text-decoration-none',
    'u--animation-scale-in', 'u--animation-slide-left', 'u--animation-shake', 'u--animation-shimmer',
    'u--min-height-screen', 'u--cursor-pointer', 'u--my-auto', 'u--m-auto', 'u--top-0', 'u--top-100', 'u--right-0', 'u--bottom-0', 'u--left-0', 'u--z-index-20', 'u--z-index-40', 'u--flex-grow-1', 'u--min-width-30', 'u--flex-1', 'u--flex-none', 'u--min-width-0', 'u--divide-edge', ...[100, 85, 70, 50].map(n => `u--opacity-${n}`),
    ...['d', 'e', 'g', 'h', 'i'].map(c => `c--tag-a--${c}`)]],
  [icons, ['arrow-right', 'arrow-left', 'check', 'close', 'plus', 'search', 'chevron-down', 'external', 'download', 'copy', 'mail', 'info', 'menu', 'trash'].map(n => `c--icon-a--${n}`)],
  [forms, ['forma', 'diana', 'stanley', 'mistyk', 'melos', 'prismo', 'mendia', 'boba', 'ebb', 'gollum', 'punky', 'infinito'].map(n => `c--terraform-a--${n}`)],
]
const missing = want.flatMap(([css, names]) => names.filter(n => !css.includes(`.${n}{`) && !css.includes(`.${n},`) && !css.includes(`.${n}:`) && !css.includes(`.${n}-`) && !css.includes(`.${n}>`)))
if (missing.length) { console.error('missing classes:\n' + missing.join('\n')); process.exit(1) }
console.log(`ok: ${want.reduce((n, [, a]) => n + a.length, 0)} component and utility classes present`)
