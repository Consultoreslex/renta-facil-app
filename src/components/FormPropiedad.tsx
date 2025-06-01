import React, { useState } from 'react'

const FormPropiedad = ({ onNext, onBack }: any) => {
  const [propiedad, setPropiedad] = useState({
    propiedad_rol: '',
    propiedad_direccion: '',
    propiedad_comuna: '',
    propiedad_ciudad: '',
    propiedad_region: '',
  })

  const handleChange = (e: any) => {
    setPropiedad({ ...propiedad, [e.target.name]: e.target.value })
  }

  return (
    <form className="space-y-4">
      <h2 className="text-xl font-bold text-center">Datos de la Propiedad</h2>

      <input name="propiedad_rol" placeholder="ROL" value={propiedad.propiedad_rol} onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="propiedad_direccion" placeholder="Dirección" value={propiedad.propiedad_direccion} onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="propiedad_comuna" placeholder="Comuna" value={propiedad.propiedad_comuna} onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="propiedad_ciudad" placeholder="Ciudad" value={propiedad.propiedad_ciudad} onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="propiedad_region" placeholder="Región" value={propiedad.propiedad_region} onChange={handleChange} className="border p-2 rounded w-full" />

      <div className="flex justify-between pt-4">
        <button type="button" onClick={onBack} className="bg-gray-400 text-white px-4 py-2 rounded">Atrás</button>
        <button type="button" onClick={() => onNext(propiedad)} className="bg-green-600 text-white px-4 py-2 rounded">Siguiente</button>
      </div>
    </form>
  )
}

export default FormPropiedad
