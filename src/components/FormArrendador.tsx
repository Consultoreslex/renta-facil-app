import React, { useState } from 'react'

const FormArrendador = ({ onNext, onBack }: any) => {
  const [arrendador, setArrendador] = useState({
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
    setArrendador({ ...arrendador, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files[0]
    setArrendador({ ...arrendador, documento: file })
  }

  return (
    <form className="space-y-4">
      <h2 className="text-xl font-bold text-center">Datos del Arrendador</h2>

      <select name="tipo" value={arrendador.tipo} onChange={handleChange} className="border p-2 rounded w-full">
        <option value="natural">Persona Natural</option>
        <option value="juridica">Persona Jurídica</option>
      </select>

      <input name="rut" placeholder="RUT" value={arrendador.rut} onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="nombre" placeholder="Nombre o Razón Social" value={arrendador.nombre} onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="telefono" placeholder="Teléfono" value={arrendador.telefono} onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="correo" placeholder="Correo" value={arrendador.correo} onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="direccion" placeholder="Dirección" value={arrendador.direccion} onChange={handleChange} className="border p-2 rounded w-full" />

      {arrendador.tipo === 'juridica' && (
        <>
          <input name="representante" placeholder="Nombre Representante Legal" value={arrendador.representante} onChange={handleChange} className="border p-2 rounded w-full" />
          <input name="rut_representante" placeholder="RUT Representante Legal" value={arrendador.rut_representante} onChange={handleChange} className="border p-2 rounded w-full" />
          <div>
            <label className="block">Adjuntar Poder de Representación (PDF/JPG)</label>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} className="border p-2 rounded w-full" />
          </div>
        </>
      )}

      <div className="flex justify-between pt-4">
        <button type="button" onClick={onBack} className="bg-gray-400 text-white px-4 py-2 rounded">Atrás</button>
        <button type="button" onClick={() => onNext(arrendador)} className="bg-green-600 text-white px-4 py-2 rounded">Siguiente</button>
      </div>
    </form>
  )
}

export default FormArrendador
