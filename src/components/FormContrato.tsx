import React, { useState } from 'react'

const FormContrato = ({ onNext, onBack }: any) => {
  const [contrato, setContrato] = useState({
    monto_arriendo: '',
    fecha_inicio: '',
    duracion_meses: '',
    garantia: '',
    observaciones: '',
  })

  const handleChange = (e: any) => {
    setContrato({ ...contrato, [e.target.name]: e.target.value })
  }

  return (
    <form className="space-y-4">
      <h2 className="text-xl font-bold text-center">Datos del Contrato</h2>

      <input name="monto_arriendo" type="number" placeholder="Monto de Arriendo" value={contrato.monto_arriendo} onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="fecha_inicio" type="date" value={contrato.fecha_inicio} onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="duracion_meses" type="number" placeholder="Duración en Meses" value={contrato.duracion_meses} onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="garantia" placeholder="Garantía" value={contrato.garantia} onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="observaciones" placeholder="Observaciones" value={contrato.observaciones} onChange={handleChange} className="border p-2 rounded w-full" />

      <div className="flex justify-between pt-4">
        <button type="button" onClick={onBack} className="bg-gray-400 text-white px-4 py-2 rounded">Atrás</button>
        <button type="button" onClick={() => onNext(contrato)} className="bg-green-600 text-white px-4 py-2 rounded">Siguiente</button>
      </div>
    </form>
  )
}

export default FormContrato
