import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/performance.css'
import './styles/homepage-stability.css'

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container not found");
}

try {
  createRoot(container).render(<App />);
} catch (error) {
  console.error("Failed to render React app:", error);
  container.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background-color: #0a0a0a; color: #fafafa; font-family: Inter, system-ui, sans-serif;">
      <div style="text-align: center;">
        <h1 style="margin-bottom: 16px;">Zwanski Tech</h1>
        <p style="margin-bottom: 24px;">There was an error loading the application.</p>
        <button onclick="window.location.reload()" style="padding: 12px 24px; background-color: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer;">
          Reload Page
        </button>
      </div>
    </div>
  `;
}
