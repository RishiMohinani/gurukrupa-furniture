// Responsive images: each photo in Assets/ has a full-size <name>.webp plus smaller
// <name>-480.webp / <name>-800.webp copies, so phones download a small file.
// To add a photo: save <name>.webp (max ~1600px wide), create the -480/-800 copies,
// and add its width to WIDTHS.
const files = import.meta.glob('../Assets/*.webp', { eager: true, query: '?url', import: 'default' })

const WIDTHS = {
  'Bedroom-design': 1200, bedroom: 1600, 'dining-tables': 1600, 'hero-img': 1122, 'kitchen-design': 1024,
  kitchen: 1600, 'living-room': 1600, 'mandir-design': 1047, mandir: 1600, 'office-furniture': 1600,
  'Sofa-set': 736, 'TV-Cabinet': 735, wardrobe: 1600,
}

export function img(name) {
  const src = files[`../Assets/${name}.webp`]
  if (!src || !WIDTHS[name]) throw new Error(`img(): unknown image "${name}"`)
  const smaller = [480, 800]
    .map((w) => [w, files[`../Assets/${name}-${w}.webp`]])
    .filter(([, url]) => url)
    .map(([w, url]) => `${url} ${w}w`)
  return { src, srcSet: [...smaller, `${src} ${WIDTHS[name]}w`].join(', ') }
}
