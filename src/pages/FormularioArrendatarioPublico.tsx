import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { uploadDocument } from '../lib/uploadDocument'

const FormularioArrendatarioPublico = () => {
  const [formData, setFormData] = useState({
    tipo: 'natural',
    rut: '',
    nombre: '',
    telefono: '',
    correo: '',
    direccion: '',
    representante: '',
    rut_representante: '',
    documento: null,
  })

  const [enviado, setEnviado] = useState(false)

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files[0]
    setFormData({ ...formData, documento: file })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const dataToSave = { ...formData }

    // Si es jurídica y adjuntó documento
    if (formData.tipo === 'juridica' && formData.documento) {
      const url = await uploadDocument(formData.documento, 'arrendatarios')
      dataToSave.documento_url = url
    }

    // Limpiar el objeto de archivo antes de guardar
    delete dataToSave.documento

    const { error } = await supabase.from('arrendatarios').insert([dataToSave])

    if (error) {
      alert('❌ Error al guardar')
      console.error(error)
    } else {
      setEnviado(true)
    }
  }

  if (enviado) {
    return <div className="max-w-xl mx-auto p-6 text-center text-green-600 text-xl">✅ ¡Datos enviados correctamente!</div>
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">Ficha de Arrendatario</h1>

      <select name="tipo" value={formData.tipo} onChange={handleChange} className="border p-2 rounded w-full">
        <option value="natural">Persona Natural</option>
        <option value="juridica">Persona Jurídica</option>
      </select>

      <input name="rut" placeholder="RUT" onChange={handleChange} required className="border p-2 rounded w-full" />
      <input name="nombre" placeholder="Nombre o Razón Social" onChange={handleChange} required className="border p-2 rounded w-full" />
      <input name="telefono" placeholder="Teléfono" onChange={handleChange} required className="border p-2 rounded w-full" />
      <input name="correo" placeholder="Correo" type="email" onChange={handleChange} required className="border p-2 rounded w-full" />
      <input name="direccion" placeholder="Dirección" onChange={handleChange} required className="border p-2 rounded w-full" />

      {formData.tipo === 'juridica' && (
        <>
          <input name="representante" placeholder="Representante Legal" onChange={handleChange} required className="border p-2 rounded w-full" />
          <input name="rut_representante" placeholder="RUT del Representante" onChange={handleChange} required className="border p-2 rounded w-full" />
          <div>
            <label className="block mb-1">Adjuntar Poder de Representación (PDF/JPG)</label>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} required className="border p-2 rounded w-full" />
          </div>
        </>
      )}

      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded w-full">Enviar</button>
    </form>
  )
}

export default FormularioArrendatarioPublico
