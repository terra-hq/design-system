// The words a class of this package may use. One list, so a new word is a decision and not an accident.
// The first two are Terra's reserved words (the Reserved Words sheet and the Punky component skill); the rest are the
// words the package accepts on top of them, each with the reason.

// After `__`: the elements. Reserved by Punky.
export const ELEMENTS = new Set([
  'hd', 'bd', 'ft', 'wrapper', 'item', 'list-item', 'item-left', 'item-right', 'list-group', // structure
  'title', 'subtitle', 'content', 'date', 'category', 'author', // content
  'btn', 'link', 'icon', 'badge', 'pill', 'logo', // interactive
  'media', 'media-wrapper', 'video', 'artwork', // media
  'dash', 'overlay', 'loader', 'ft-items', 'bg-items', // ui
])

// After `--`: the modifiers. Reserved by Punky.
export const MODIFIERS = new Set([
  'is-hidden', 'is-active', 'is-scroll', 'is-loading', 'is-loaded', // state
  'fade', 'fade-in', 'fade-out', 'slide-in', 'slide-out', // animation
  'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', // ordinal
  'valid', 'error', 'disabled', 'focused', 'required', // form only
])

// Accepted by the package on top of the reserved ones (decided with the team, 0.21.0):
export const PACKAGE_MODIFIERS = new Set([
  'small', 'medium', 'large', // sizes, the same three for every component that has them
  'icon', // an icon button, a link or a segment option that holds an icon
  'strong', 'bold', // the weight of a link
  'danger', 'warning', 'info', 'success', // the intent of an icon button
])

// Modifiers that are data, not words: one per icon and one per Terraform shape.
export const ICON_TYPES = new Set(['archive', 'arrow-left', 'arrow-right', 'calendar', 'check', 'chevron-down', 'chevron-left', 'chevron-right', 'close', 'copy', 'download', 'duplicate', 'external', 'info', 'mail', 'menu', 'more', 'pencil', 'plus', 'search', 'share', 'trash'])
export const TERRAFORM_SHAPES = new Set(['boba', 'diana', 'ebb', 'forma', 'gollum', 'infinito', 'melos', 'mendia', 'mistyk', 'prismo', 'punky', 'stanley'])

// Terra's stylelint: the nesting of a selector is at most five names.
export const MAX_DEPTH = 5
