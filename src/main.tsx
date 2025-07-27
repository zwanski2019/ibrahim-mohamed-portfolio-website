import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/performance.css'
import './styles/homepage-stability.css'

const rootEl = document.getElementById('root')

if (!rootEl) {
  console.error('Root element not found')
} else {
  console.log('Mounting React app')
  createRoot(rootEl).render(<App />)
}
