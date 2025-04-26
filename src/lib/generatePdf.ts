import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export const generatePdf = async (data: any) => {
  const doc = new jsPDF()
  const content = `
    Ficha de Contrato\n\n
    Arrendatario: ${data.arrendatario_nombre} (${data.arrendatario_rut})\n
    Arrendador: ${data.arrendador_nombre} (${data.arrendador_rut})\n
    Propiedad ROL: ${data.propiedad_rol}\n
    Dirección: ${data.direccion}\n
    Monto: ${data.monto_arriendo}\n
    Fecha Inicio: ${data.fecha_inicio} | Duración: ${data.duracion_meses} meses\n
    Observaciones: ${data.observaciones}
  `
  doc.text(content, 10, 10)
  doc.save('ficha-contrato.pdf')
}
 
