import { supabase } from './supabase'

export const uploadDocument = async (file: File, folder: string) => {
  if (!file) return null

  const fileName = `${folder}/${Date.now()}-${file.name}`

  const { data, error } = await supabase.storage
    .from('documentos') // ⚡ TU BUCKET EN SUPABASE (asegúrate que exista)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    console.error('Error subiendo documento:', error)
    return null
  }

  const { data: publicUrlData } = supabase.storage
    .from('documentos')
    .getPublicUrl(fileName)

  return publicUrlData.publicUrl
}
