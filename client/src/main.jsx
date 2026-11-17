import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import ServicePage from './ServicePage.jsx'
import { SERVICE_PAGES } from './services.js'
import './styles.css'

// Google Analytics 4: set VITE_GA_ID (e.g. G-XXXXXXXXXX) in Vercel to enable.
const gaId = import.meta.env.VITE_GA_ID
if (gaId) {
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  window.gtag('config', gaId)
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
  document.head.appendChild(s)
}

// Each service page lives at /<slug>; everything else is the home page.
const slug = location.pathname.replace(/^\/+|\/+$/g, '').replace(/\.html$/, '')
const page = SERVICE_PAGES.find((s) => s.slug === slug)
const ui = page ? <ServicePage page={page} /> : <App />

const rootEl = document.getElementById('root')
// The build pre-renders each page into #root; hydrate it. Fall back to a fresh render in dev.
if (rootEl.hasChildNodes()) hydrateRoot(rootEl, ui)
else createRoot(rootEl).render(ui)
