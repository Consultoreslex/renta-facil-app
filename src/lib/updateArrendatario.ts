import { supabase } from './supabase'

export const updateArrendatario = async (rut: string, newData: any) => {
  const { error } = await supabase
    .from('arrendatarios')
    .update(newData)
    .eq('rut', rut)

  if (error) {
    console.error('❌ Error actualizando arrendatario:', error)
    return false
  }

  return true
}
