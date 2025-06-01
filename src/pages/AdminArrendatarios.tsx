import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AdminArrendatarios = () => {
  const [arrendatarios, setArrendatarios] = useState<any[]>([])
  const [filtro, setFiltro] = useState('')

  const obtenerArrendatarios = async () => {
    const { data, error } = await supabase.from('arrendatarios').select('*').order('created_at', { ascending: false })
    if (data) setArrendatarios(data)
  }

  useEffect(() => {
    obtenerArrendatarios()
  }, [])

  const filtrados = arrendatarios.filter((a) =>
    a.rut.toLowerCase().includes(filtro.toLowerCase()) ||
    a.nombre.toLowerCase().includes(filtro.toLowerCase())
  )

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Panel de Arrendatarios</h1>

      <input
        type="text"
        placeholder="Buscar por RUT o nombre"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">RUT</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Tipo</th>
              <th className="p-2">Correo</th>
              <th className="p-2">Doc.</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((a) => (
              <tr key={a.rut} className="border-t hover:bg-gray-50">
                <td className="p-2">{a.rut}</td>
                <td className="p-2">{a.nombre}</td>
                <td className="p-2 capitalize">{a.tipo}</td>
                <td className="p-2">{a.correo}</td>
                <td className="p-2">
                  {a.documento_url ? (
                    <a href={a.documento_url} target="_blank" className="text-blue-600 underline">Ver</a>
                  ) : (
                    '—'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminArrendatarios
