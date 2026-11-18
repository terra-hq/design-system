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
if (cfg.sizes) {
  const bad = cfg.sizes.filter(n => !Number.isInteger(n) || n < 1 || [25, 50, 75, 100].includes(n))
  if (bad.length) { console.error(`sizes steps must be whole numbers, 1 or higher, and not 25, 50, 75 or 100 (those are the percentage classes). Got ${bad.join(', ')}. Each step is that number x 8px.`); process.exit(1) }
  vars.push(`$size-steps: ${list(cfg.sizes)}`)
}
const fail = m => { console.error(m); process.exit(1) }
if (cfg.shadows) vars.push(`$shadow-options: (${Object.entries(cfg.shadows).map(([k, v]) => `${k}: (${v})`).join(', ')})`)
if (cfg.opacity) {
  const bad = Object.entries(cfg.opacity).filter(([k, v]) => !/^\d+$/.test(k) || typeof v !== 'number' || v < 0 || v > 1)
  if (bad.length) fail(`opacity must map whole numbers (the class) to a value from 0 to 1, for example { 70: 0.7 }. Check: ${bad.map(([k]) => k).join(', ')}`)
  vars.push(`$opacity-values: ${map(cfg.opacity)}`)
}
if (cfg.zIndex) {
  const bad = cfg.zIndex.filter(n => !Number.isInteger(n) || n < 0)
  if (bad.length) fail(`zIndex steps must be whole numbers, 0 or higher (got ${bad.join(', ')}).`)
  vars.push(`$z-index-values: ${list(cfg.zIndex)}`)
}
if (cfg.offsets) {
  const bad = Object.keys(cfg.offsets).filter(k => !/^\d+$/.test(k))
  if (bad.length) fail(`offsets must map whole numbers (the class) to a CSS length, for example { 0: '0', 100: '100%' }. Check: ${bad.join(', ')}`)
  vars.push(`$offset-values: ${map(cfg.offsets)}`)
}
if (cfg.buttons) {
  const keys = { hoverRadius: 'btn-hover-radius', primaryHover: 'btn-primary-hover-bg', secondRest: 'btn-second-bg', secondBorder: 'btn-second-border', secondHover: 'btn-second-hover-bg', secondHoverText: 'btn-second-hover-text' }
  const bad = Object.keys(cfg.buttons).filter(k => !keys[k])
  if (bad.length) fail(`buttons takes the keys ${Object.keys(keys).join(', ')}. Check: ${bad.join(', ')}`)
  for (const [k, v] of Object.entries(cfg.buttons)) vars.push(`$${keys[k]}: ${v}`)
}
if (cfg.pills) {
  const keys = { restWash: 'pill-rest-wash', hoverWash: 'pill-hover-wash', hoverRadius: 'pill-hover-radius' }
  const bad = Object.keys(cfg.pills).filter(k => !keys[k])
  if (bad.length) fail(`pills takes the keys ${Object.keys(keys).join(', ')}. Check: ${bad.join(', ')}`)
  for (const k of ['restWash', 'hoverWash']) if (k in cfg.pills && !(typeof cfg.pills[k] === 'number' && cfg.pills[k] >= 0 && cfg.pills[k] <= 1)) fail(`pills.${k} is an opacity from 0 to 1, for example 0.1. Got ${cfg.pills[k]}`)
  for (const [k, v] of Object.entries(cfg.pills)) vars.push(`$${keys[k]}: ${v}`)
}
if (cfg.tabs) {
  const keys = { accent: 'tabs-accent', dropdownBelow: 'tabs-dropdown-below' }
  const bad = Object.keys(cfg.tabs).filter(k => !keys[k])
  if (bad.length) fail(`tabs takes the keys ${Object.keys(keys).join(', ')}. Check: ${bad.join(', ')}`)
  if ('accent' in cfg.tabs && !/^[a-z]$/.test(cfg.tabs.accent)) fail(`tabs.accent is a letter of your palette, for example 'g'. Got ${cfg.tabs.accent}`)
  const bps = ['tablets', 'tabletm', 'tabletl', 'laptop', 'desktop', 'wide']
  if ('dropdownBelow' in cfg.tabs && !bps.includes(cfg.tabs.dropdownBelow)) fail(`tabs.dropdownBelow is a breakpoint: ${bps.join(', ')}. Got ${cfg.tabs.dropdownBelow}`)
  for (const [k, v] of Object.entries(cfg.tabs)) vars.push(`$${keys[k]}: ${v}`)
}
if (cfg.segment) {
  const keys = { chosen: 'segment-chosen', chosenText: 'segment-chosen-text', track: 'segment-track' }
  const bad = Object.keys(cfg.segment).filter(k => !keys[k])
  if (bad.length) fail(`segment takes the keys ${Object.keys(keys).join(', ')}. Check: ${bad.join(', ')}`)
  for (const [k, v] of Object.entries(cfg.segment)) if (!/^[a-z]$/.test(v)) fail(`segment.${k} is a letter of your palette, for example 'n'. Got ${v}`)
  for (const [k, v] of Object.entries(cfg.segment)) vars.push(`$${keys[k]}: ${v}`)
}
if (cfg.time) {
  const bad = Object.entries(cfg.time).filter(([k, v]) => !['a', 'b', 'c'].includes(k) || !/^\d*\.?\d+m?s$/.test(v))
  if (bad.length) fail(`time takes the keys a, b and c with values such as '0.1s' or '150ms'. Check: ${bad.map(([k]) => k).join(', ')}`)
  for (const [k, v] of Object.entries(cfg.time)) vars.push(`$time-${k}: ${v}`)
}
if (cfg.ease) {
  const ok = ['standard-a', 'standard-b', 'entrance-a', 'entrance-b', 'exit-a', 'exit-b']
  const bad = Object.keys(cfg.ease).filter(k => !ok.includes(k))
  if (bad.length) fail(`ease takes the keys ${ok.join(', ')}. Check: ${bad.join(', ')}`)
  for (const [k, v] of Object.entries(cfg.ease)) vars.push(`$ease-${k}: ${v}`)
}
if (cfg.minWidth) {
  const bad = cfg.minWidth.filter(n => !Number.isInteger(n) || n < 1)
  if (bad.length) { console.error(`minWidth steps must be whole numbers, 1 or higher (got ${bad.join(', ')}). Each step is that number x 8px.`); process.exit(1) }
  vars.push(`$min-width-steps: ${list(cfg.minWidth)}`)
}

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
