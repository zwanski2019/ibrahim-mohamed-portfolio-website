import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/performance.css'
import './styles/homepage-stability.css'
import { monitoredFetch } from './utils/monitoredFetch'

// Override global fetch to log errors to monitoring endpoint
if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).fetch = monitoredFetch as any;
}

createRoot(document.getElementById("root")!).render(<App />);
