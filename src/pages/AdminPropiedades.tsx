import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AdminPropiedades = () => {
  const [propiedades, setPropiedades] = useState<any[]>([])
  const [filtro, setFiltro] = useState('')

  const obtenerPropiedades = async () => {
    const { data, error } = await supabase.from('contratos').select('*').order('created_at', { ascending: false })
    if (data) setPropiedades(data.filter((p) => p.propiedad_rol))
  }

  useEffect(() => {
    obtenerPropiedades()
  }, [])

  const filtradas = propiedades.filter((p) =>
    (p.propiedad_rol || '').toLowerCase().includes(filtro.toLowerCase()) ||
    (p.propiedad_direccion || '').toLowerCase().includes(filtro.toLowerCase()) ||
    (p.propiedad_comuna || '').toLowerCase().includes(filtro.toLowerCase())
  )

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Panel de Propiedades</h1>

      <input
        type="text"
        placeholder="Buscar por ROL, Dirección o Comuna"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">ROL</th>
              <th className="p-2">Dirección</th>
              <th className="p-2">Comuna</th>
              <th className="p-2">Ciudad</th>
              <th className="p-2">Región</th>
            </tr>
          </thead>
          <tbody>
            {filtradas.map((p, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-2">{p.propiedad_rol}</td>
                <td className="p-2">{p.propiedad_direccion}</td>
                <td className="p-2">{p.propiedad_comuna}</td>
                <td className="p-2">{p.propiedad_ciudad}</td>
                <td className="p-2">{p.propiedad_region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPropiedades
