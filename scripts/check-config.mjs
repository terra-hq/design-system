// A value of a component option may name its table ('colors.a', 'radius.c'): the CSS must be the same as with the bare key,
// and a prefix that does not fit the option must be refused. Run by `npm run check`.
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const dir = mkdtempSync(join(tmpdir(), 'terra-config-'))
const bin = new URL('../bin/terra-ds.mjs', import.meta.url).pathname
const build = (name, cfg) => {
  const file = join(dir, `${name}.config.js`)
  const out = join(dir, `${name}.css`)
  writeFileSync(file, `export default ${JSON.stringify({ output: out, ...cfg })}`)
  const r = spawnSync('node', [bin, 'build', file], { encoding: 'utf8' })
  return { ok: r.status === 0, err: r.stderr, css: r.status === 0 ? readFileSync(out, 'utf8') : '' }
}
const fails = []
const bare = build('bare', { menu: { ink: 'a', hover: 'j', radius: 'c' }, pills: { kinds: ['f', 'e'] }, tooltip: { ink: 'a' } })
const named = build('named', { menu: { ink: 'colors.a', hover: 'colors.j', radius: 'radius.c' }, pills: { kinds: ['colors.f', 'e'] }, tooltip: { ink: 'colors.a' } })
if (!bare.ok || !named.ok) fails.push(`both forms must build: ${bare.err}${named.err}`)
else if (bare.css !== named.css) fails.push("'colors.a' and 'a' must build the same CSS")
const refused = (name, cfg) => { if (build(name, cfg).ok) fails.push(`${name} must be refused`) }
refused('colour-on-radius', { menu: { radius: 'colors.a' } })
refused('radius-on-colour', { menu: { ink: 'radius.c' } })
refused('key-not-in-palette', { colors: { a: '#000', b: '#fff' }, menu: { ink: 'colors.z' } })
refused('wizard-circle-in-pixels', { wizard: { circle: 40 } }) // the circle is a number of steps of 8px (measure), 3 to 8
if (!build('wizard-circle-steps', { wizard: { circle: 5 } }).css.includes('width:2.5rem')) fails.push('wizard.circle: 5 must be 5 steps of measure (2.5rem)')
if (fails.length) { console.error('check-config failed:\n- ' + fails.join('\n- ')); process.exit(1) }
console.log("ok: 'colors.a' and 'a' build the same CSS, 3 wrong prefixes refused, wizard.circle in steps of measure")
