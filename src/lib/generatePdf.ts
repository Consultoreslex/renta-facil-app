import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export const generatePdf = (formData: any): Blob => {
  const doc = new jsPDF()

  doc.setFontSize(16)
  doc.text('Ficha de Contrato', 14, 20)

  const entries = Object.entries(formData)
  const rows = entries.map(([key, value]) => [key, String(value)])

  autoTable(doc, {
    head: [['Campo', 'Valor']],
    body: rows,
    startY: 30,
  })

  return doc.output('blob')
}
