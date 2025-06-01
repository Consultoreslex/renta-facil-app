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

  const [mensaje, setMensaje] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validarCampos = () => {
    return (
      formData.arrendatario_rut &&
      formData.arrendatario_nombre &&
      formData.arrendador_rut &&
      formData.arrendador_nombre &&
      formData.propiedad_rol &&
      formData.direccion
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validarCampos()) {
      setMensaje('⚠️ Por favor completa los campos obligatorios.')
      return
    }

    try {
      await supabase.from('contratos').insert([formData])
      await sendToGoogleSheet(formData)
      setMensaje('✅ Ficha guardada y enviada correctamente.')
    } catch (error) {
      console.error(error)
      setMensaje('❌ Error al guardar los datos.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
      {mensaje && <div className="p-2 bg-yellow-200 rounded">{mensaje}</div>}

      <input name="arrendatario_rut" placeholder="RUT Arrendatario" onChange={handleChange} className="input" required />
      <input name="arrendatario_nombre" placeholder="Nombre Arrendatario" onChange={handleChange} className="input" required />
      <input name="arrendador_rut" placeholder="RUT Arrendador" onChange={handleChange} className="input" required />
      <input name="arrendador_nombre" placeholder="Nombre Arrendador" onChange={handleChange} className="input" required />
      <input name="propiedad_rol" placeholder="ROL Propiedad" onChange={handleChange} className="input" required />
      <input name="direccion" placeholder="Dirección" onChange={handleChange} className="input" required />
      <input name="monto_arriendo" placeholder="Monto Arriendo" onChange={handleChange} className="input" />
      <input name="fecha_inicio" type="date" onChange={handleChange} className="input" />
      <input name="duracion_meses" placeholder="Duración en meses" onChange={handleChange} className="input" />
      <input name="observaciones" placeholder="Observaciones" onChange={handleChange} className="input" />

      <div className="flex flex-wrap gap-2">
        <button type="submit" className="btn bg-green-600 hover:bg-green-700">Guardar y Enviar</button>
        <button type="button" className="btn bg-purple-600 hover:bg-purple-700" onClick={() => generatePdf(formData)}>Exportar PDF</button>
        <button type="button" className="btn bg-yellow-600 hover:bg-yellow-700" onClick={() => generateExcel(formData)}>Exportar Excel</button>
      </div>
    </form>
  )
}

export default Formulario
