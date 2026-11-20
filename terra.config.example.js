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
  spacing: [0, 1, 2, 4, 8],                        // u--padding-*, u--margin-*, u--gap-* (x 8px; default 0 to 10, 12 and 15)
  sizes: [2, 4, 5, 6, 8],                          // u--height-*, u--width-* (x 8px; default 2, 3, 4, 5, 6, 8, 10, 12)
  minWidth: [10, 20, 30, 40],                      // u--min-width-* (x 8px; this is the default)
  opacity: { 100: 1, 85: 0.85, 70: 0.7, 50: 0.5 }, // u--opacity-* (this is the default)
  zIndex: [0, 10, 20, 40],                         // u--z-index-* (this is the default)
  offsets: { 0: '0', 100: '100%' },                // u--top-*, u--right-*, u--bottom-*, u--left-* (this is the default)

  // Buttons: the states a design decision can change (any CSS color; what you leave out keeps DESIGN.md's rule)
  buttons: { hoverRadius: '8px', secondRest: '#fff', secondBorder: '#0f0f0f', ink: 'colors.a', paper: 'colors.b', radius: 'radius.full', danger: 'colors.h', warning: 'colors.g', info: 'colors.f', success: 'colors.d' }, // ink, paper and the four intents are letters of the palette, radius a key of radius; these are the defaults; primaryHover, secondHover and secondHoverText (a color) are off by default: only the shape changes on hover

  // Pills: a clickable pill (c--pill-a on an <a> or <button>). All optional.
  pills: { restWash: 0.1, hoverWash: 0.2, hoverRadius: '8px', kinds: ['colors.f', 'colors.e', 'colors.g', 'colors.h', 'colors.d', 'colors.i'], radius: 'radius.full', inkOnDark: 'colors.b' }, // the fill at rest, the fill on hover and when selected (0 to 1), the corners on hover, and the colour of each pill (a letter of the palette; the first is c--pill-a, the second c--pill-b…); these are the defaults (a cielo, b emerald, c sol, d rojizo, e neon, f blushed)

  // Tabs: the underline of the open and hovered tab (c--tabs-a). Optional.
  tabs: { accent: 'colors.g', dropdownBelow: 'tabletm', radius: 'radius.a', dropdownPaper: 'colors.b', dropdownInk: 'colors.a' }, // accent: a letter of your palette (default g, sol). dropdownBelow: below this breakpoint the dropdown replaces the row (default tabletm, 810px)

  // Segment: the colours of the segmented control (c--segment-a). All optional; each is a letter of your palette.
  segment: { chosen: 'colors.b', chosenText: 'colors.a', ink: 'colors.a', inkOnDark: 'colors.b', radius: 'radius.full' }, // the fill and the label of the chosen option, the labels of the others on light and on Noche, and the corners (the defaults); track: 'colors.c' would fill the track; chosenOnDark and trackOnDark do it on Noche (default: Noche at 6%)

  // Sidebar: the dot of the current page (c--sidebar-a). Optional.
  header: { ink: 'colors.a', paper: 'colors.b', inkOnDark: 'colors.b', paperOnDark: 'colors.a', burgerBelow: 'tabletm' }, // the header: letters of the palette on light and on Noche, and the breakpoint below which the links go into the burger; these are the defaults
  sidebar: { dot: 'colors.d', ink: 'colors.a', paper: 'colors.b', inkOnDark: 'colors.b', paperOnDark: 'colors.a', radius: 'radius.full' }, // the dot, the ink and the paper of the current page on light and on Noche (letters of your palette), and the corners (a key of radius); these are the defaults

  // Code: a literal inside a sentence (c--code-a). All optional; these are the defaults.
  code: { tint: 'colors.g', wash: 0.12, size: 0.85, font: "'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace" }, // tint: a key of colors or a colour; wash: its opacity (0 to 1); size: in em of the text around it (0.5 to 1.5); font: the mono face (the package ships no font file)

  // Links: ink, underline and hover of c--link-a to d. All optional; these are the defaults.
  links: { ink: 'colors.a', inkOnDark: 'colors.b', line: 0.0625, hoverFade: 0.6 }, // ink and inkOnDark: a key of colors, or a CSS colour. line: the underline in em (1px at 16px). hoverFade: the opacity of b and d on hover. focusRadius: 'radius.a' (a key of radius, or a length) rounds the focus ring; off by default, 4px

  // Alerts: the fill of c--alert-a. Optional.
  alerts: {
    wash: 0.1, // the colour of the kind at this opacity (0 to 1); the default is 0.1
    kinds: ['colors.f', 'colors.e', 'colors.g', 'colors.h'], // the colour of each alert, a letter of the palette: the first is c--alert-a, the second c--alert-b… These are the defaults (a cielo, b emerald, c sol, d rojizo)
  },

  // Form fields, table, menu, modal and card. Optional; a key changes that component and nothing else. A letter of the palette each
  // (a radius, a key of radius; a wash, an opacity from 0 to 1). These are the defaults.
  forms: { ink: 'colors.a', paper: 'colors.b', chosen: 'colors.a', chosenOnDark: 'colors.b', track: 'colors.e', trackOnDark: 'colors.d', valid: 'colors.e', validOnDark: 'colors.d', error: 'colors.h', fieldRadius: 'radius.full', areaRadius: 'radius.c' },
  table: { ink: 'colors.a', paper: 'colors.b', header: 'colors.c', hover: 'colors.g', hoverWash: 0.08, focus: 'colors.f', radius: 'radius.c' },
  menu: { ink: 'colors.a', paper: 'colors.b', hover: 'colors.j', focus: 'colors.f', radius: 'radius.c', itemRadius: 'radius.b' },
  modal: { ink: 'colors.a', paper: 'colors.b', scrim: 'colors.a', scrimWash: 0.5, radius: 'radius.d' },
  tooltip: { ink: 'colors.a', paper: 'colors.b', radius: 'radius.a', delay: '0.3s' },
  avatar: { ink: 'colors.a', paper: 'colors.b', inkOnDark: 'colors.b', paperOnDark: 'colors.a', ring: 'colors.a', ringOnDark: 'colors.b', stackEdge: 'colors.b', stackEdgeOnDark: 'colors.a' },
  card: { radius: 'radius.c', radiusSecond: 'radius.d', padding: 3, edgeInk: 'colors.a', edge: 0.14, hoverEdge: 'colors.a', paper: 'colors.b', focus: 'colors.f', paperOnDark: 'colors.a', inkOnDark: 'colors.b' }, // c--card-wrapper-a and b: the corners (a key of radius), the corners of --second, the padding of a (steps of 8px: 3 is 24px), the edge (a letter and how strong it is), the edge on hover, the fill, the focus ring, and the fill and text of --third (the highlighted card, Noche); these are the defaults

  // Motion
  time: { a: '0.1s', b: '0.3s', c: '0.6s' },       // micro-interactions, expansion, background dimming (this is the default)
  ease: { 'standard-a': 'cubic-bezier(0.2, 0, 0.38, 0.9)' }, // also standard-b, entrance-a/b, exit-a/b

  output: 'public/terra.css',                      // where the CSS is written
}
