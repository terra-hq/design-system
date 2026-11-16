// Copy to your project as terra.config.js, then: npx terra-ds build
export default {
  colors: { a: '#0f0f0f', b: '#ffffff' }, // replaces the palette; "a" and "b" are required
  backgrounds: ['a', 'b'],                // which colors also get f--background-*
  spacing: [0, 1, 2, 4, 8],               // replaces the u--p-* / u--m-* steps
  sizes: [2, 4, 5, 6, 8],                 // u--height-* and u--width-* steps (x 8px): 4 = 2rem
  minWidth: [10, 20, 30, 40],             // u--min-width-* steps (x 8px): 10 = 5rem, 30 = 15rem
  font: "'Uncut Sans', system-ui, sans-serif", // font-family used by f--font-* (this is already the default)
  radius: { a: '4px', full: '999px' },   // replaces f--radius-*
  output: 'public/terra.css',
}
