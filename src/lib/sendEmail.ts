import emailjs from '@emailjs/browser'
import { supabase } from './supabase'

export const sendEmailNotificacion = async (datos: any) => {
  // Obtener correos desde Supabase
  const { data, error } = await supabase
    .from('configuracion')
    .select('email_notificaciones')
    .limit(1)
    .single()

  if (error || !data) {
    console.error('❌ Error leyendo correos:', error)
    return
  }

  const correos = data.email_notificaciones

  // Enviar email por cada destinatario
  for (const correo of correos) {
    try {
      await emailjs.send(
        'service_j530snr',           // ID de tu servicio en EmailJS
        'template_8e8u6ak',          // ID de tu plantilla en EmailJS
        {
          nombre: datos.arrendatario_nombre || datos.nombre,
          rut: datos.arrendatario_rut || datos.rut,
          correo: datos.arrendatario_correo || datos.correo,
          direccion: datos.arrendatario_direccion || datos.direccion,
          to_email: correo,
        },
        '3ij1KyMi0wax0qQpF'          // TU Public Key de EmailJS
      )
      console.log(`✅ Correo enviado a: ${correo}`)
    } catch (err) {
      console.error(`❌ Error enviando a ${correo}:`, err)
    }
  }
}
