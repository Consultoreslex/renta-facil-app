import React, { useState } from 'react'
import { generatePdf } from '../lib/generatePdf'
import { generateExcel } from '../lib/generateExcel'
import { sendToGoogleSheet } from '../lib/sendToGoogleSheet'
import { supabase } from '../lib/supabase'

const Formulario = () => {
  const [formData, setFormData] = useState({
    arrendatario_rut: '',
    arrendatario_nombre: '',
    arrendador_rut: '',
    arrendador_nombre: '',
    propiedad_rol: '',
    direccion: '',
    monto_arriendo: '',
    fecha_inicio: '',
    duracion_meses: '',
    observaciones: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 1. Guardar en Supabase
    await supabase.from('contratos').insert([formData])

    // 2. Enviar a Google Sheets
    await sendToGoogleSheet(formData)

    alert('Ficha guardada y enviada correctamente.')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="arrendatario_rut" placeholder="RUT Arrendatario" onChange={handleChange} className="input" />
      <input name="arrendatario_nombre" placeholder="Nombre Arrendatario" onChange={handleChange} className="input" />
      <input name="arrendador_rut" placeholder="RUT Arrendador" onChange={handleChange} className="input" />
      <input name="arrendador_nombre" placeholder="Nombre Arrendador" onChange={handleChange} className="input" />
      <input name="propiedad_rol" placeholder="ROL Propiedad" onChange={handleChange} className="input" />
      <input name="direccion" placeholder="Dirección" onChange={handleChange} className="input" />
      <input name="monto_arriendo" placeholder="Monto Arriendo" onChange={handleChange} className="input" />
      <input name="fecha_inicio" type="date" onChange={handleChange} className="input" />
      <input name="duracion_meses" placeholder="Duración en meses" onChange={handleChange} className="input" />
      <input name="observaciones" placeholder="Observaciones" onChange={handleChange} className="input" />

      <div className="flex gap-2">
        <button type="submit" className="btn">Guardar y Enviar</button>
        <button type="button" className="btn" onClick={() => generatePdf(formData)}>Exportar PDF</button>
        <button type="button" className="btn" onClick={() => generateExcel(formData)}>Exportar Excel</button>
      </div>
    </form>
  )
}

export default Formulario