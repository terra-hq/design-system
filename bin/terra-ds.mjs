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

// A value of a component option may name the table it points to: ink: 'colors.a', radius: 'radius.c'. The prefix is dropped before
// the options are checked, so 'a' and 'colors.a' mean the same. Only a prefix that does not fit the option is refused.
const TABLES = ['colors', 'radius', 'shadows', 'time', 'ease']
const NOT_COMPONENTS = new Set([...TABLES, 'backgrounds', 'font', 'spacing', 'sizes', 'opacity', 'zIndex', 'offsets', 'output'])
const unprefix = (where, k, v) => {
  if (typeof v !== 'string') return v
  const m = /^([a-zA-Z]+)\.([a-z0-9-]+)$/.exec(v)
  if (!m || !TABLES.includes(m[1])) return v
  if (m[1] === 'colors' && /radius/i.test(k)) { console.error(`${where}.${k} is a key of radius, not a colour. Write 'radius.${m[2]}' or '${m[2]}'. Got ${JSON.stringify(v)}`); process.exit(1) }
  if (m[1] === 'radius' && !/radius/i.test(k)) { console.error(`${where}.${k} is not a radius. Got ${JSON.stringify(v)}`); process.exit(1) }
  if (cfg[m[1]] && !(m[2] in cfg[m[1]])) { console.error(`${where}.${k}: ${JSON.stringify(m[2])} is not in your ${m[1]} (${Object.keys(cfg[m[1]]).join(', ')}). Got ${JSON.stringify(v)}`); process.exit(1) }
  return m[2]
}
for (const [name, opts] of Object.entries(cfg)) {
  if (NOT_COMPONENTS.has(name) || !opts || typeof opts !== 'object' || Array.isArray(opts)) continue
  for (const [k, v] of Object.entries(opts)) opts[k] = Array.isArray(v) ? v.map(x => unprefix(name, k, x)) : unprefix(name, k, v)
}

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
  // the colours of the hover are CSS values written out; the new ones are letters of the palette (and a key of radius)
  const keys = { hoverRadius: 'btn-hover-radius', primaryHover: 'btn-primary-hover-bg', secondRest: 'btn-second-bg', secondBorder: 'btn-second-border', secondHover: 'btn-second-hover-bg', secondHoverText: 'btn-second-hover-text', ink: 'buttons-ink', paper: 'buttons-paper', radius: 'buttons-radius', danger: 'buttons-danger', warning: 'buttons-warning', info: 'buttons-info', success: 'buttons-success' }
  const bad = Object.keys(cfg.buttons).filter(k => !keys[k])
  if (bad.length) fail(`buttons takes the keys ${Object.keys(keys).join(', ')}. Check: ${bad.join(', ')}`)
  for (const k of ['ink', 'paper', 'danger', 'warning', 'info', 'success']) if (k in cfg.buttons && !/^[a-z]$/.test(cfg.buttons[k])) fail(`buttons.${k} is a letter of your palette, for example 'h'. Got ${JSON.stringify(cfg.buttons[k])}`)
  if ('radius' in cfg.buttons && !/^[a-z]+$/.test(cfg.buttons.radius)) fail(`buttons.radius is a key of your radius, for example 'c' or 'full'. Got ${JSON.stringify(cfg.buttons.radius)}`)
  for (const [k, v] of Object.entries(cfg.buttons)) vars.push(`$${keys[k]}: ${v}`)
}
if (cfg.pills) {
  const keys = { restWash: 'pill-rest-wash', hoverWash: 'pill-hover-wash', hoverRadius: 'pill-hover-radius', kinds: 'pill-kinds', radius: 'pill-radius', inkOnDark: 'pill-ink-on-dark' }
  const bad = Object.keys(cfg.pills).filter(k => !keys[k])
  if (bad.length) fail(`pills takes the keys ${Object.keys(keys).join(', ')}. Check: ${bad.join(', ')}`)
  for (const k of ['restWash', 'hoverWash']) if (k in cfg.pills && !(typeof cfg.pills[k] === 'number' && cfg.pills[k] >= 0 && cfg.pills[k] <= 1)) fail(`pills.${k} is an opacity from 0 to 1, for example 0.1. Got ${cfg.pills[k]}`)
  if ('radius' in cfg.pills && !/^[a-z]+$/.test(cfg.pills.radius)) fail(`pills.radius is a key of your radius, for example 'c' or 'full'. Got ${JSON.stringify(cfg.pills.radius)}`)
  if ('inkOnDark' in cfg.pills && !/^[a-z]$/.test(cfg.pills.inkOnDark)) fail(`pills.inkOnDark is a letter of your palette, for example 'b'. Got ${JSON.stringify(cfg.pills.inkOnDark)}`)
  if ('kinds' in cfg.pills) {
    const kinds = cfg.pills.kinds
    if (!Array.isArray(kinds) || !kinds.length || kinds.length > 26) fail(`pills.kinds is a list of 1 to 26 palette letters, for example ['f', 'e', 'g', 'h']. The first is c--pill-a, the second c--pill-b…`)
    for (const k of kinds) if (typeof k !== 'string' || !/^[a-z]$/.test(k)) fail(`pills.kinds takes letters of your palette, for example 'e'. Got ${JSON.stringify(k)}`)
  }
  for (const [k, v] of Object.entries(cfg.pills)) vars.push(k === 'kinds' ? `$pill-kinds: (${v.join(', ')})` : `$${keys[k]}: ${v}`)
}
if (cfg.tabs) {
  const keys = { accent: 'tabs-accent', dropdownBelow: 'tabs-dropdown-below', radius: 'tabs-radius', dropdownPaper: 'tabs-dropdown-paper', dropdownInk: 'tabs-dropdown-ink' }
  const bad = Object.keys(cfg.tabs).filter(k => !keys[k])
  if (bad.length) fail(`tabs takes the keys ${Object.keys(keys).join(', ')}. Check: ${bad.join(', ')}`)
  if ('accent' in cfg.tabs && !/^[a-z]$/.test(cfg.tabs.accent)) fail(`tabs.accent is a letter of your palette, for example 'g'. Got ${cfg.tabs.accent}`)
  if ('radius' in cfg.tabs && !/^[a-z]+$/.test(cfg.tabs.radius)) fail(`tabs.radius is a key of your radius, for example 'a' or 'c'. Got ${JSON.stringify(cfg.tabs.radius)}`)
  for (const k of ['dropdownPaper', 'dropdownInk']) if (k in cfg.tabs && !/^[a-z]$/.test(cfg.tabs[k])) fail(`tabs.${k} is a letter of your palette, for example 'b'. Got ${JSON.stringify(cfg.tabs[k])}`)
  const bps = ['tablets', 'tabletm', 'tabletl', 'laptop', 'desktop', 'wide']
  if ('dropdownBelow' in cfg.tabs && !bps.includes(cfg.tabs.dropdownBelow)) fail(`tabs.dropdownBelow is a breakpoint: ${bps.join(', ')}. Got ${cfg.tabs.dropdownBelow}`)
  for (const [k, v] of Object.entries(cfg.tabs)) vars.push(`$${keys[k]}: ${v}`)
}
if (cfg.segment) {
  const keys = { chosen: 'segment-chosen', chosenText: 'segment-chosen-text', track: 'segment-track', chosenOnDark: 'segment-chosen-on-dark', trackOnDark: 'segment-track-on-dark', ink: 'segment-ink', inkOnDark: 'segment-ink-on-dark', radius: 'segment-radius' }
  const bad = Object.keys(cfg.segment).filter(k => !keys[k])
  if (bad.length) fail(`segment takes the keys ${Object.keys(keys).join(', ')}. Check: ${bad.join(', ')}`)
  for (const [k, v] of Object.entries(cfg.segment)) if (!(k === 'radius' ? /^[a-z]+$/ : /^[a-z]$/).test(v)) fail(`segment.${k} is ${k === 'radius' ? 'a key of your radius, for example \'c\' or \'full\'' : 'a letter of your palette, for example \'n\''}. Got ${v}`)
  for (const [k, v] of Object.entries(cfg.segment)) vars.push(`$${keys[k]}: ${v}`)
}
if (cfg.wizard) {
  const keys = { ink: 'wizard-ink', circle: 'wizard-circle', line: 'wizard-line' }
  const bad = Object.keys(cfg.wizard).filter(k => !keys[k])
  if (bad.length) fail(`wizard takes the keys ${Object.keys(keys).join(', ')}. Check: ${bad.join(', ')}`)
  for (const k of ['ink']) if (k in cfg.wizard && !/^[a-z]$/.test(cfg.wizard[k])) fail(`wizard.${k} is a letter of your palette, for example 'a'. Got ${JSON.stringify(cfg.wizard[k])}`)
  const range = { circle: [3, 8], line: [1, 4] }
  for (const [k, [lo, hi]] of Object.entries(range)) if (k in cfg.wizard && !(Number.isInteger(cfg.wizard[k]) && cfg.wizard[k] >= lo && cfg.wizard[k] <= hi)) fail(`wizard.${k} is ${k === 'circle' ? 'a number of steps of 8px (4 is 32px)' : 'a number of pixels'} from ${lo} to ${hi}. Got ${JSON.stringify(cfg.wizard[k])}`)
  for (const [k, v] of Object.entries(cfg.wizard)) vars.push(`$${keys[k]}: ${typeof v === 'number' && k !== 'circle' ? v + 'px' : v}`)
}
if (cfg.sidebar) {
  const keys = { dot: 'sidebar-dot', ink: 'sidebar-ink', paper: 'sidebar-paper', inkOnDark: 'sidebar-ink-on-dark', paperOnDark: 'sidebar-paper-on-dark', radius: 'sidebar-radius' }
  const bad = Object.keys(cfg.sidebar).filter(k => !keys[k])
  if (bad.length) fail(`sidebar takes the keys ${Object.keys(keys).join(', ')}. Check: ${bad.join(', ')}`)
  for (const [k, v] of Object.entries(cfg.sidebar)) {
    if (!(k === 'radius' ? /^[a-z]+$/ : /^[a-z]$/).test(v)) fail(`sidebar.${k} is ${k === 'radius' ? "a key of your radius, for example 'c' or 'full'" : "a letter of your palette, for example 'd'"}. Got ${JSON.stringify(v)}`)
    vars.push(`$${keys[k]}: ${v}`)
  }
}
if (cfg.header) {
  const keys = { ink: 'header-ink', paper: 'header-paper', inkOnDark: 'header-ink-on-dark', paperOnDark: 'header-paper-on-dark', burgerBelow: 'header-burger-below' }
  const bad = Object.keys(cfg.header).filter(k => !keys[k])
  if (bad.length) fail(`header takes the keys ${Object.keys(keys).join(', ')}. Check: ${bad.join(', ')}`)
  const bps = ['tablets', 'tabletm', 'tabletl', 'laptop', 'desktop', 'wide']
  for (const [k, v] of Object.entries(cfg.header)) {
    if (k === 'burgerBelow') { if (!bps.includes(v)) fail(`header.burgerBelow is a breakpoint: ${bps.join(', ')}. Got ${JSON.stringify(v)}`) }
    else if (typeof v !== 'string' || !/^[a-z]$/.test(v)) fail(`header.${k} is a letter of your palette, for example 'a'. Got ${JSON.stringify(v)}`)
    vars.push(`$${keys[k]}: ${v}`)
  }
}
if (cfg.code) {
  const keys = { tint: 'code-tint', wash: 'code-wash', size: 'code-size', font: 'type-code' }
  const bad = Object.keys(cfg.code).filter(k => !keys[k])
  if (bad.length) fail(`code takes the keys ${Object.keys(keys).join(', ')}. Check: ${bad.join(', ')}`)
  const palette = cfg.colors ? Object.keys(cfg.colors) : 'abcdefghijklmnop'.split('')
  if ('tint' in cfg.code) {
    const t = cfg.code.tint
    // the tint is mixed with an opacity, so it has to be a colour: a key of the palette, a hex, or rgb()/hsl()
    if (typeof t !== 'string' || (!palette.includes(t) && !/^(#[0-9a-f]{3,8}|(rgb|rgba|hsl|hsla)\(.+\))$/i.test(t))) fail(`code.tint is a key of your colors (${palette.join(', ')}) or a colour such as '#ffb41d'. Got ${JSON.stringify(t)}`)
    vars.push(`$code-tint: ${t}`)
  }
  if ('wash' in cfg.code) {
    if (!(typeof cfg.code.wash === 'number' && cfg.code.wash >= 0 && cfg.code.wash <= 1)) fail(`code.wash is an opacity from 0 to 1, for example 0.12. Got ${cfg.code.wash}`)
    vars.push(`$code-wash: ${cfg.code.wash}`)
  }
  if ('size' in cfg.code) {
    if (!(typeof cfg.code.size === 'number' && cfg.code.size >= 0.5 && cfg.code.size <= 1.5)) fail(`code.size is the size in em of the text around it, from 0.5 to 1.5, for example 0.85. Got ${cfg.code.size}`)
    vars.push(`$code-size: ${cfg.code.size}`)
  }
  if ('font' in cfg.code) {
    if (typeof cfg.code.font !== 'string' || !cfg.code.font.trim()) fail(`code.font is a CSS font-family list, for example "'Fira Code', monospace". Got ${JSON.stringify(cfg.code.font)}`)
    vars.push(`$type-code: (${cfg.code.font})`)
  }
}
if (cfg.links) {
  const keys = { ink: 'link-ink', inkOnDark: 'link-ink-on-dark', line: 'link-line', hoverFade: 'link-hover-fade', focusRadius: 'link-focus-radius' }
  const bad = Object.keys(cfg.links).filter(k => !keys[k])
  if (bad.length) fail(`links takes the keys ${Object.keys(keys).join(', ')}. Check: ${bad.join(', ')}`)
  const palette = cfg.colors ? Object.keys(cfg.colors) : 'abcdefghijklmnop'.split('')
  const radii = cfg.radius ? Object.keys(cfg.radius) : ['a', 'b', 'c', 'd', 'full', 'round']
  const cssColor = /^(#[0-9a-f]{3,8}|(rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)\(.+\)|transparent|currentcolor)$/i
  const cssLength = /^(0|\d*\.?\d+(px|rem|em|%))$/
  // A key of the palette (or radius) wins; otherwise it has to be a CSS value; anything else is a typo and the build stops.
  const ref = (k, v, keysOf, isCss, what, example) => {
    if (typeof v !== 'string') fail(`links.${k} is a key of ${what} or a CSS value, for example '${example}'. Got ${JSON.stringify(v)}`)
    if (!keysOf.includes(v) && !isCss.test(v)) fail(`links.${k}: '${v}' is not a key of ${what} (${keysOf.join(', ')}) and not a CSS value. Write a key or a value such as '${example}'.`)
    vars.push(`$${keys[k]}: ${v}`)
  }
  for (const [k, v] of Object.entries(cfg.links)) {
    if (k === 'ink' || k === 'inkOnDark') ref(k, v, palette, cssColor, 'your colors', '#111111')
    else if (k === 'focusRadius') ref(k, v, radii, cssLength, 'your radius', '4px')
    else if (k === 'line') { if (!(typeof v === 'number' && v > 0 && v <= 0.5)) fail(`links.line is the thickness of the underline in em, from above 0 to 0.5, for example 0.0625. Got ${v}`); vars.push(`$${keys[k]}: ${v}`) }
    else if (!(typeof v === 'number' && v >= 0 && v <= 1)) fail(`links.hoverFade is an opacity from 0 to 1, for example 0.6. Got ${v}`)
    else vars.push(`$${keys[k]}: ${v}`)
  }
}
if (cfg.alerts) {
  const keys = ['wash', 'kinds']
  const bad = Object.keys(cfg.alerts).filter(k => !keys.includes(k))
  if (bad.length) fail(`alerts takes the keys ${keys.join(', ')}. Check: ${bad.join(', ')}`)
  if ('wash' in cfg.alerts) {
    if (!(typeof cfg.alerts.wash === 'number' && cfg.alerts.wash >= 0 && cfg.alerts.wash <= 1)) fail(`alerts.wash is an opacity from 0 to 1, for example 0.1. Got ${cfg.alerts.wash}`)
    vars.push(`$alert-wash: ${cfg.alerts.wash}`)
  }
  if ('kinds' in cfg.alerts) {
    const kinds = cfg.alerts.kinds
    if (!Array.isArray(kinds) || !kinds.length || kinds.length > 26) fail(`alerts.kinds is a list of 1 to 26 palette letters, for example ['f', 'e', 'g', 'h']. The first is c--alert-a, the second c--alert-b…`)
    for (const k of kinds) if (typeof k !== 'string' || !/^[a-z]$/.test(k)) fail(`alerts.kinds takes letters of your palette, for example 'e'. Got ${JSON.stringify(k)}`)
    vars.push(`$alert-kinds: (${kinds.join(', ')})`)
  }
}
// The options of a component: forms, table, menu, modal, avatar, tooltip and card. A letter of the palette each (a radius, a key of `radius`; a wash, an opacity).
// They change that component and nothing else. Without them the design is exactly the default one.
const components = {
  forms: { ink: ['forms-ink', 'letter'], paper: ['forms-paper', 'letter'], chosen: ['forms-chosen', 'letter'], chosenOnDark: ['forms-chosen-dark', 'letter'], track: ['forms-track', 'letter'], trackOnDark: ['forms-track-dark', 'letter'], valid: ['forms-valid', 'letter'], validOnDark: ['forms-valid-dark', 'letter'], error: ['forms-error', 'letter'], fieldRadius: ['forms-field-radius', 'radius'], areaRadius: ['forms-area-radius', 'radius'] },
  table: { ink: ['table-ink', 'letter'], paper: ['table-paper', 'letter'], header: ['table-header', 'letter'], hover: ['table-hover', 'letter'], hoverWash: ['table-hover-wash', 'wash'], focus: ['table-focus', 'letter'], radius: ['table-radius', 'radius'] },
  menu: { ink: ['menu-ink', 'letter'], paper: ['menu-paper', 'letter'], hover: ['menu-hover', 'letter'], focus: ['menu-focus', 'letter'], radius: ['menu-radius', 'radius'], itemRadius: ['menu-item-radius', 'radius'] },
  avatar: { ink: ['avatar-ink', 'letter'], paper: ['avatar-paper', 'letter'], inkOnDark: ['avatar-ink-on-dark', 'letter'], paperOnDark: ['avatar-paper-on-dark', 'letter'], ring: ['avatar-ring', 'letter'], ringOnDark: ['avatar-ring-on-dark', 'letter'], stackEdge: ['avatar-stack-edge', 'letter'], stackEdgeOnDark: ['avatar-stack-edge-on-dark', 'letter'] },
  card: { radius: ['card-radius', 'radius'], radiusSecond: ['card-radius-second', 'radius'], padding: ['card-padding', 'steps'], edgeInk: ['card-edge-ink', 'letter'], edge: ['card-edge', 'wash'], hoverEdge: ['card-hover-edge', 'letter'], paper: ['card-paper', 'letter'], focus: ['card-focus', 'letter'], paperOnDark: ['card-paper-on-dark', 'letter'], inkOnDark: ['card-ink-on-dark', 'letter'] },
  tooltip: { ink: ['tooltip-ink', 'letter'], paper: ['tooltip-paper', 'letter'], radius: ['tooltip-radius', 'radius'], delay: ['tooltip-delay', 'time'] },
  modal: { ink: ['modal-ink', 'letter'], paper: ['modal-paper', 'letter'], scrim: ['modal-scrim', 'letter'], scrimWash: ['modal-scrim-wash', 'wash'], radius: ['modal-radius', 'radius'] },
}
for (const [name, keys] of Object.entries(components)) {
  if (!cfg[name]) continue
  const bad = Object.keys(cfg[name]).filter(k => !keys[k])
  if (bad.length) fail(`${name} takes the keys ${Object.keys(keys).join(', ')}. Check: ${bad.join(', ')}`)
  for (const [k, v] of Object.entries(cfg[name])) {
    const [variable, kind] = keys[k]
    if (kind === 'time') { if (typeof v !== 'string' || !/^\d*\.?\d+m?s$/.test(v)) fail(`${name}.${k} is a time such as '0.3s' or '300ms'. Got ${JSON.stringify(v)}`) }
    else if (kind === 'steps') { if (!(typeof v === 'number' && v >= 0 && v <= 12)) fail(`${name}.${k} is a number of steps of 8px, from 0 to 12, for example 3 (24px). Got ${JSON.stringify(v)}`) }
    else if (kind === 'wash') { if (!(typeof v === 'number' && v >= 0 && v <= 1)) fail(`${name}.${k} is an opacity from 0 to 1, for example 0.1. Got ${JSON.stringify(v)}`) }
    else if (kind === 'radius') { if (typeof v !== 'string' || !/^[a-z]+$/.test(v)) fail(`${name}.${k} is a key of your radius, for example 'c' or 'full'. Got ${JSON.stringify(v)}`) }
    else if (typeof v !== 'string' || !/^[a-z]$/.test(v)) fail(`${name}.${k} is a letter of your palette, for example 'e'. Got ${JSON.stringify(v)}`)
    vars.push(`$${variable}: ${v}`)
  }
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
