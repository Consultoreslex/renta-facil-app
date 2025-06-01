
iimport React from 'react'
import { supabase } from '../lib/supabase'
import { generatePdf } from '../lib/generatePdf'
import { generateExcel } from '../lib/generateExcel'
import { sendToGoogleSheet } from '../lib/sendToGoogleSheet'
import { uploadDocument } from '../lib/uploadDocument'

const Finalizar = ({ formData, onBack }: any) => {
  const handleGuardar = async () => {
    try {
      const updatedFormData = { ...formData }

      // Subir documentos de arrendatario si existe
      if (formData.documento) {
        const url = await uploadDocument(formData.documento, 'arrendatarios')
        updatedFormData.documento_url = url
      }

      // Subir documentos de arrendador si existe
      if (formData.arrendador_documento) {
        const url = await uploadDocument(formData.arrendador_documento, 'arrendadores')
        updatedFormData.arrendador_documento_url = url
      }

      // Eliminar los objetos File antes de guardar
      delete updatedFormData.documento
      delete updatedFormData.arrendador_documento

      // Guardar en Supabase
      await supabase.from('contratos').insert([updatedFormData])

      // Enviar también a Google Sheets
      await sendToGoogleSheet(updatedFormData)

      alert('✅ Datos guardados correctamente en Supabase y enviados a Google Sheets.')
    } catch (error) {
      console.error(error)
      alert('❌ Error al guardar los datos.')
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Resumen de Ficha</h2>

      <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">{JSON.stringify(formData, null, 2)}</pre>

      <div className="flex flex-wrap gap-3 justify-center pt-4">
        <button type="button" onClick={onBack} className="bg-gray-400 text-white px-4 py-2 rounded">Atrás</button>
        <button type="button" onClick={handleGuardar} className="bg-green-600 text-white px-4 py-2 rounded">Guardar en Base</button>
        <button type="button" onClick={() => generatePdf(formData)} className="bg-purple-600 text-white px-4 py-2 rounded">Exportar PDF</button>
        <button type="button" onClick={() => generateExcel(formData)} className="bg-yellow-500 text-white px-4 py-2 rounded">Exportar Excel</button>
      </div>
    </div>
  )
}

export default Finalizar
