import { renderToString } from 'react-dom/server'
import App, { FAQ } from './App.jsx'

export const render = () => renderToString(<App />)
export { FAQ }
