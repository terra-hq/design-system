// Copy to your project as terra.config.js, then: npx terra-ds build
// Every key is optional: what you leave out keeps the value Terra ships with, shown here as a comment.
export default {
  // Palette and type
  colors: { a: '#0f0f0f', b: '#ffffff' },        // replaces the palette; "a" and "b" are required
  backgrounds: ['a', 'b'],                         // which colors also get f--background-* (default a to e)
  font: "'Uncut Sans', system-ui, sans-serif",    // font-family of f--font-* (this is the default)

  // Shape and depth
  radius: { a: '4px', full: '999px' },             // replaces f--radius-* (default a 8px, b 12px, c 16px, d 20px, full, round)
  shadows: { a: '0 1px 2px rgb(15 15 15 / .06), 0 4px 16px rgb(15 15 15 / .08)' }, // f--shadow-* (default a, b, c)

  // Scales of the utilities (each step is a class)
  spacing: [0, 1, 2, 4, 8],                        // u--p-*, u--m-*, u--gap-* (x 8px; default 0 to 10, 12 and 15)
  sizes: [2, 4, 5, 6, 8],                          // u--height-*, u--width-* (x 8px; default 2, 3, 4, 5, 6, 8, 10, 12)
  minWidth: [10, 20, 30, 40],                      // u--min-width-* (x 8px; this is the default)
  opacity: { 100: 1, 85: 0.85, 70: 0.7, 50: 0.5 }, // u--opacity-* (this is the default)
  zIndex: [0, 10, 20, 40],                         // u--z-index-* (this is the default)
  offsets: { 0: '0', 100: '100%' },                // u--top-*, u--right-*, u--bottom-*, u--left-* (this is the default)
  tint: 0.1,                                       // strength of u--hover-tint-* (this is the default)

  // Motion
  time: { a: '0.1s', b: '0.3s', c: '0.6s' },       // micro-interactions, expansion, background dimming (this is the default)
  ease: { 'standard-a': 'cubic-bezier(0.2, 0, 0.38, 0.9)' }, // also standard-b, entrance-a/b, exit-a/b

  output: 'public/terra.css',                      // where the CSS is written
}
