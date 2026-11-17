import { renderToString } from 'react-dom/server'
import App, { FAQ } from './App.jsx'
import ServicePage from './ServicePage.jsx'
import { SERVICE_PAGES } from './services.js'

export const renderHome = () => renderToString(<App />)
export const renderService = (page) => renderToString(<ServicePage page={page} />)
export { FAQ, SERVICE_PAGES }
