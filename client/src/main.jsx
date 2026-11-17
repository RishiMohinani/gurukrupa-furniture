import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
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

const rootEl = document.getElementById('root')
// The build pre-renders the page into #root; hydrate it. Fall back to a fresh render in dev.
if (rootEl.hasChildNodes()) hydrateRoot(rootEl, <App />)
else createRoot(rootEl).render(<App />)
