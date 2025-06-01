import React, { useState } from 'react'

const FormArrendatario = ({ onNext, onBack }: any) => {
  const [arrendatario, setArrendatario] = useState({
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

  const handleChange = (e: any) => {
    setArrendatario({ ...arrendatario, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files[0]
    setArrendatario({ ...arrendatario, documento: file })
  }

  return (
    <form className="space-y-4">
      <h2 className="text-xl font-bold text-center">Datos del Arrendatario</h2>

      <select name="tipo" value={arrendatario.tipo} onChange={handleChange} className="border p-2 rounded w-full">
        <option value="natural">Persona Natural</option>
        <option value="juridica">Persona Jurídica</option>
      </select>

      <input name="rut" placeholder="RUT" value={arrendatario.rut} onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="nombre" placeholder="Nombre o Razón Social" value={arrendatario.nombre} onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="telefono" placeholder="Teléfono" value={arrendatario.telefono} onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="correo" placeholder="Correo" value={arrendatario.correo} onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="direccion" placeholder="Dirección" value={arrendatario.direccion} onChange={handleChange} className="border p-2 rounded w-full" />

      {arrendatario.tipo === 'juridica' && (
        <>
          <input name="representante" placeholder="Nombre Representante Legal" value={arrendatario.representante} onChange={handleChange} className="border p-2 rounded w-full" />
          <input name="rut_representante" placeholder="RUT Representante Legal" value={arrendatario.rut_representante} onChange={handleChange} className="border p-2 rounded w-full" />
          <div>
            <label className="block">Adjuntar Poder de Representación (PDF/JPG)</label>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} className="border p-2 rounded w-full" />
          </div>
        </>
      )}

      <div className="flex justify-between pt-4">
        <button type="button" onClick={onBack} className="bg-gray-400 text-white px-4 py-2 rounded">Atrás</button>
        <button type="button" onClick={() => onNext(arrendatario)} className="bg-green-600 text-white px-4 py-2 rounded">Siguiente</button>
      </div>
    </form>
  )
}

export default FormArrendatario
