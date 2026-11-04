// Turns src/assets/{icons,terraforms}/*.svg into dist/icons.css and dist/terraforms.css:
// one class per file that sets the mask image used by c--icon-a / c--terraform-a.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'

const enc = svg => encodeURIComponent(svg.trim()).replace(/'/g, '%27')
function build(dir, prefix, variable, out) {
  const css = readdirSync(new URL(`../src/assets/${dir}/`, import.meta.url))
    .filter(f => f.endsWith('.svg'))
    .sort()
    .map(f => `.${prefix}--${f.slice(0, -4)}{${variable}:url("data:image/svg+xml,${enc(readFileSync(new URL(`../src/assets/${dir}/${f}`, import.meta.url), 'utf8'))}")}`)
    .join('\n')
  writeFileSync(new URL(`../dist/${out}`, import.meta.url), css + '\n')
  console.log(`${out}: ${(css.length / 1024).toFixed(1)} kB`)
}
build('icons', 'c--icon-a', '--c-icon', 'icons.css')
build('terraforms', 'c--terraform-a', '--c-terraform', 'terraforms.css')
