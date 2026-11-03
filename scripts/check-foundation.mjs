// Fails if any rule from the frozen 0.0.9 build is missing from the current dist/style.css.
// Adding rules is fine; changing or removing existing ones is not.
// One deliberate exception: the font-family VALUE (Arial -> Uncut Sans in 0.1.0), see norm() below.
import { readFileSync } from 'node:fs'

// Intentional change in 0.1.0: the default typeface. Everything else in those rules must still match.
// Vite 5+ minifies `@media (max-width:N)` as `@media all and (max-width: N)` and `@media(...)`: the same rules, so the spellings compare equal.
const norm = r =>
  r
    .replace(/font-family:[^;}]*/g, 'font-family:*')
    .replace(/@media all and /g, '@media ')
    .replace(/@media\s*\(/g, '@media (')
    .replace(/\(([^()]*)\)/g, (m, inner) => '(' + inner.replace(/:\s+/g, ':') + ')')

function rules(css) {
  const out = new Set()
  const walk = (s, ctx) => {
    let i = 0
    while (i < s.length) {
      const o = s.indexOf('{', i)
      if (o < 0) break
      let d = 1, j = o + 1
      while (d && j < s.length) d += s[j] === '{' ? 1 : s[j] === '}' ? -1 : 0, j++
      const head = s.slice(i, o).trim(), body = s.slice(o + 1, j - 1)
      if (head.startsWith('@media')) walk(body, head)
      else out.add(norm(`${ctx}|${head}{${body}}`))
      i = j
    }
  }
  walk(css.replace(/\/\*[\s\S]*?\*\//g, ''), '')
  return out
}

const frozen = rules(readFileSync(new URL('./frozen/style-0.0.9.css', import.meta.url), 'utf8'))
const now = rules(readFileSync(new URL('../dist/style.css', import.meta.url), 'utf8'))
const missing = [...frozen].filter(r => !now.has(r))
if (missing.length) { console.error(`${missing.length} frozen rules changed or missing:\n` + missing.slice(0, 10).join('\n')); process.exit(1) }
console.log(`ok: ${frozen.size} frozen rules intact, ${now.size - frozen.size} new`)
