// Runs after `vite build`: renders the page to HTML so search engines and slow
// phones see the full content before JavaScript loads, and adds FAQPage data.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ssrDir = path.join(root, 'dist-ssr')
const htmlPath = path.join(root, 'dist', 'index.html')

const { render, FAQ } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
}
const jsonLd = JSON.stringify(faqLd).replace(/</g, '\\u003c')

let html = fs.readFileSync(htmlPath, 'utf8')
if (!html.includes('<div id="root"></div>')) throw new Error('prerender: #root placeholder not found in dist/index.html')
html = html
  .replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
  .replace('</head>', `    <script type="application/ld+json">${jsonLd}</script>\n  </head>`)
fs.writeFileSync(htmlPath, html)
fs.rmSync(ssrDir, { recursive: true, force: true })
console.log('prerender: wrote', path.relative(root, htmlPath))
