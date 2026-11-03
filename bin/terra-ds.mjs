#!/usr/bin/env node
// Usage: npx terra-ds build [terra.config.js]   -> writes the CSS to config.output
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import * as sass from 'sass'

const scssRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../src/scss')
const [cmd, file = 'terra.config.js'] = process.argv.slice(2)
if (cmd !== 'build') { console.error('Usage: terra-ds build [terra.config.js]'); process.exit(1) }

const path = resolve(process.cwd(), file)
if (!existsSync(path)) { console.error(`Config not found: ${path}`); process.exit(1) }
const cfg = (await import(pathToFileURL(path))).default

// config key -> Sass variable. Anything set here replaces the default (palette, spacing).
const map = o => `(${Object.entries(o).map(([k, v]) => `${k}: ${v}`).join(', ')})`
const list = a => `(${a.join(', ')})`
const vars = []
if (cfg.colors) {
  if (!cfg.colors.a || !cfg.colors.b) { console.error('colors must include "a" and "b" (the reset uses them)'); process.exit(1) }
  vars.push(`$color-options: ${map(cfg.colors)}`)
}
if (cfg.backgrounds) vars.push(`$colorbg-keys: ${list(cfg.backgrounds)}`)
if (cfg.font) vars.push(`$type-a: (${cfg.font})`)
if (cfg.radius) vars.push(`$radius-options: ${map(cfg.radius)}`)
if (cfg.spacing) {
  const bad = cfg.spacing.filter(n => !Number.isInteger(n) || n < 0)
  if (bad.length) { console.error(`spacing steps must be whole numbers, 0 or higher (got ${bad.join(', ')}). Each step is that number x 8px.`); process.exit(1) }
}
if (cfg.spacing) vars.push(`$space-values: ${list(cfg.spacing)}`)

const { css } = sass.compileString(
  `@use "@scss/index"${vars.length ? ` with (${vars.join(', ')})` : ''};`,
  {
    style: 'compressed',
    // Newer Sass flags the if() calls in the existing utilities; the output is correct, so keep the CLI quiet.
    silenceDeprecations: ['if-function'],
    importers: [{ findFileUrl: u => u.startsWith('@scss/') ? pathToFileURL(resolve(scssRoot, u.slice(6))) : null }],
  },
)

const out = resolve(process.cwd(), cfg.output ?? 'terra.css')
mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, css)
console.log(`terra-ds: ${out} (${(css.length / 1024).toFixed(1)} kB)`)
