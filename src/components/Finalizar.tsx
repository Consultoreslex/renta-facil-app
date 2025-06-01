import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { generatePdf } from '../lib/generatePdf'
import { generateExcel } from '../lib/generateExcel'
import { sendToGoogleSheet } from '../lib/sendToGoogleSheet'
import { uploadDocument } from '../lib/uploadDocument'
import { updateArrendatario } from '../lib/updateArrendatario'
import { sendEmailNotificacion } from '../lib/sendEmail'

const Finalizar = ({ formData, onBack }: any) => {
  const [status, setStatus] = useState('')

  const handleActualizar = async () => {
    const rut = formData.arrendatario_rut || formData.rut
    const actualizado = await updateArrendatario(rut, {
      nombre: formData.arrendatario_nombre || formData.nombre,
      correo: formData.arrendatario_correo,
      telefono: formData.arrendatario_telefono,
      direccion: formData.arrendatario_direccion,
      representante: formData.arrendatario_representante,
      rut_representante: formData.arrendatario_rut_representante,
    })

    if (actualizado) {
      alert('✅ Datos del arrendatario actualizados correctamente.')
    } else {
      alert('❌ No se pudieron actualizar los datos.')
    }
  }

  const handleGuardar = async () => {
    try {
      setStatus('Guardando...')

      const updatedFormData = { ...formData }

      // Subir documentos si existen
      if (formData.documento) {
        const url = await uploadDocument(formData.documento, 'arrendatarios')
        updatedFormData.documento_url = url
      }

      if (formData.arrendador_documento) {
        const url = await uploadDocument(formData.arrendador_documento, 'arrendadores')
        updatedFormData.arrendador_documento_url = url
      }

      delete updatedFormData.documento
      delete updatedFormData.arrendador_documento

      // Guardar en Supabase
      await supabase.from('contratos').insert([updatedFormData])

      // Enviar a Google Sheets
      await sendToGoogleSheet(updatedFormData)

      // Enviar notificación por correo (si decides usarlo)
      await sendEmailNotificacion(updatedFormData)

      setStatus('✅ Datos guardados correctamente.')
    } catch (error) {
      console.error(error)
      setStatus('❌ Error al guardar los datos.')
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Resumen de Ficha</h2>

      <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
        {JSON.stringify(formData, null, 2)}
      </pre>

      <div className="flex flex-wrap gap-3 justify-center pt-4">
        <button type="button" onClick={onBack} className="bg-gray-400 text-white px-4 py-2 rounded">
          Atrás
        </button>

        <button type="button" onClick={handleGuardar} className="bg-green-600 text-white px-4 py-2 rounded">
          Guardar en Base
        </button>

        <button type="button" onClick={() => generatePdf(formData)} className="bg-purple-600 text-white px-4 py-2 rounded">
          Exportar PDF
        </button>

        <button type="button" onClick={() => generateExcel(formData)} className="bg-yellow-500 text-white px-4 py-2 rounded">
          Exportar Excel
        </button>

        <button type="button" onClick={handleActualizar} className="bg-orange-500 text-white px-4 py-2 rounded">
          Actualizar Arrendatario
        </button>
      </div>

      <p className="text-center text-sm text-gray-600">{status}</p>
    </div>
  )
}

export default Finalizar
