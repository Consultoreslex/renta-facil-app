import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// páginas adicionales
import AdminArrendatarios from './pages/AdminArrendatarios'
import FormularioArrendatarioPublico from './pages/FormularioArrendatarioPublico'
import AdminPropiedades from './pages/AdminPropiedades'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/arrendatario" element={<FormularioArrendatarioPublico />} />
        <Route path="/admin/arrendatarios" element={<AdminArrendatarios />} />
        <Route path="/admin/propiedades" element={<AdminPropiedades />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)