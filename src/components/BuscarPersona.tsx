import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

const BuscarPersona = ({ onNext, setFormData }: any) => {
  const [rutOrRol, setRutOrRol] = useState('')
  const [error, setError] = useState('')

  const handleBuscar = async () => {
    if (!rutOrRol) {
      setError('Debes ingresar un RUT o ROL')
      return
    }

    // Primero buscar en arrendatarios
    const { data: arrendatarioData, error: arrendatarioError } = await supabase
      .from('arrendatarios')
      .select('*')
      .eq('rut', rutOrRol)
      .single()

    if (arrendatarioData) {
      // Si existe en arrendatarios, autollenar datos de arrendatario
      setFormData((prevData: any) => ({
        ...prevData,
        arrendatario_tipo: arrendatarioData.tipo,
        arrendatario_rut: arrendatarioData.rut,
        arrendatario_nombre: arrendatarioData.nombre,
        arrendatario_telefono: arrendatarioData.telefono,
        arrendatario_correo: arrendatarioData.correo,
        arrendatario_direccion: arrendatarioData.direccion,
        arrendatario_representante: arrendatarioData.representante,
        arrendatario_rut_representante: arrendatarioData.rut_representante,
        arrendatario_documento_url: arrendatarioData.documento_url,
      }))
      onNext()
      return
    }

    // Si no encontró en arrendatarios, buscar en contratos (opcional si quieres también buscar propiedades ya existentes)
    const { data: contratoData, error: contratoError } = await supabase
      .from('contratos')
      .select('*')
      .or(`arrendatario_rut.eq.${rutOrRol},propiedad_rol.eq.${rutOrRol}`)
      .single()

    if (contratoData) {
      setFormData(contratoData)
      onNext()
      return
    }

    // Si no encontró nada
    setError('No se encontró ningún registro para el RUT o ROL ingresado.')
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">Buscar por RUT o ROL</h2>
      <input
        type="text"
        placeholder="Ingrese RUT o ROL"
        value={rutOrRol}
        onChange={(e) => {
          setRutOrRol(e.target.value)
          setError('')
        }}
        className="border p-2 w-full rounded"
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button onClick={handleBuscar} className="bg-blue-600 text-white w-full py-2 rounded">
        Buscar y Continuar
      </button>
    </div>
  )
}

export default BuscarPersona
