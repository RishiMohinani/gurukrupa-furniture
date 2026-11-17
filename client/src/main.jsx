import { createRoot } from 'react-dom/client'
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

createRoot(document.getElementById('root')).render(<App />)
