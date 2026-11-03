// Pulls everything the docs show from the library itself, so nothing is copied by hand:
// compiled CSS (live examples), class names (tables), TERRA.md and CONTRIBUTING.md (as pages), Uncut Sans files.
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

const root = new URL('../../', import.meta.url)
mkdirSync('public/fonts', { recursive: true })
mkdirSync('src/data', { recursive: true })

// CSS for the live examples: library source + docs/terra.config.js
execFileSync('node', [new URL('bin/terra-ds.mjs', root).pathname, 'build', 'terra.config.js'], { stdio: 'inherit' })

// Class list for the tables comes from the default build, i.e. exactly what ships
const classes = [...new Set(readFileSync(new URL('dist/style.css', root), 'utf8').match(/\.(?:f|u)--[\w-]+/g))].map(c => c.slice(1))
writeFileSync('src/data/classes.json', JSON.stringify(classes))

// Search index: every top-level rule (the base class; breakpoint variants live inside @media) with its declarations
const css = readFileSync(new URL('dist/style.css', root), 'utf8')
const seen = new Map()
for (const m of css.matchAll(/\.((?:f|u)--[\w-]+)\{([^}]*)\}/g)) if (!seen.has(m[1]) && !/-(mobile|tablets|tabletm|tabletl|laptop|desktop)(-|$)/.test(m[1])) seen.set(m[1], m[2].replace(/;$/, '').replace(/;/g, '; '))
writeFileSync('src/data/search.json', JSON.stringify([...seen]))

// Uncut Sans, also used inside the example iframes
const faces = [400, 500].map(w => {
  const f = `uncut-sans-latin-${w}-normal.woff2`
  copyFileSync(`node_modules/@fontsource/uncut-sans/files/${f}`, `public/fonts/${f}`)
  return `@font-face{font-family:'Uncut Sans';font-weight:${w};font-display:swap;src:url(/fonts/${f}) format('woff2')}`
})
writeFileSync('public/fonts.css', faces.join('\n'))

const page = (file, out, front) => {
  const body = readFileSync(new URL(file, root), 'utf8').replace(/^# .*\n/, '')
  writeFileSync(`src/content/docs/${out}`, `---\n${front}\n---\n\n${body}`)
}
page('TERRA.md', 'terra.md', 'title: how terra works\ndescription: Terra design reference (interface register).\ngroup: project\norder: 10')
page('CONTRIBUTING.md', 'contributing.md', 'title: contributing\ndescription: How this repo works and how to add classes without breaking anything.\ngroup: project\norder: 20')
console.log(`sync: ${classes.length} classes`)
