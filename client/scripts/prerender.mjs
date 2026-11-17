// Runs after `vite build`: renders every page to static HTML so search engines and
// slow phones see the full content before JavaScript loads. Writes:
//   dist/index.html          home page (+ FAQPage data)
//   dist/<slug>.html         one page per service (served at /<slug> via cleanUrls)
//   dist/sitemap.xml         all pages
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const SITE = 'https://gurukrupa-furniture.vercel.app'
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { renderHome, renderService, FAQ, SERVICE_PAGES } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
if (!template.includes('<div id="root"></div>')) throw new Error('prerender: #root placeholder not found in dist/index.html')

const attr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const ld = (obj) => `    <script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>\n`
const faqLd = (faq) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
})

function setMeta(html, { title, description, url }) {
  const rep = (re, val) => {
    if (!re.test(html)) throw new Error(`prerender: tag not found for ${re}`)
    html = html.replace(re, val)
  }
  rep(/<title>[^<]*<\/title>/, `<title>${attr(title)}</title>`)
  rep(/(<meta name="description" content=")[^"]*(")/, `$1${attr(description)}$2`)
  rep(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
  rep(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
  rep(/(<meta property="og:title" content=")[^"]*(")/, `$1${attr(title)}$2`)
  rep(/(<meta property="og:description" content=")[^"]*(")/, `$1${attr(description)}$2`)
  rep(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${attr(title)}$2`)
  rep(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${attr(description)}$2`)
  return html
}

const finish = (html, body, extraHead) => html
  .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  .replace('</head>', `${extraHead}  </head>`)

// Home page keeps the title/description written in index.html.
fs.writeFileSync(path.join(dist, 'index.html'), finish(template, renderHome(), ld(faqLd(FAQ))))

for (const page of SERVICE_PAGES) {
  const url = `${SITE}/${page.slug}`
  const head = ld(faqLd(page.faq)) + ld({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: page.name, item: url },
    ],
  }) + ld({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${page.name} in Vadodara`,
    description: page.description,
    url,
    areaServed: ['Vadodara', 'Gujarat'],
    provider: { '@type': 'FurnitureStore', name: 'Gurukrupa Furniture', url: `${SITE}/`, telephone: '+91-9724516312' },
  })
  const html = finish(setMeta(template, { title: page.title, description: page.description, url }), renderService(page), head)
  fs.writeFileSync(path.join(dist, `${page.slug}.html`), html)
}

const today = new Date().toISOString().slice(0, 10)
const urls = [`${SITE}/`, ...SERVICE_PAGES.map((p) => `${SITE}/${p.slug}`)]
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`)

fs.rmSync(ssrDir, { recursive: true, force: true })
console.log(`prerender: home + ${SERVICE_PAGES.length} service pages + sitemap.xml`)
