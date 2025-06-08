import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'

// Set theme on first load before React renders
if (typeof window !== 'undefined') {
  document.documentElement.setAttribute('data-theme', localStorage.getItem('chat-theme') || 'light');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </StrictMode>,
)
