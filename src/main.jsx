import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // Ce fichier importe votre App.jsx ou App.tsx
import './index.css'    // Ce fichier contient les directives Tailwind

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
