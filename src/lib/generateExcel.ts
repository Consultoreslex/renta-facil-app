import * as XLSX from 'xlsx'

export const generateExcel = (formData: any): Blob => {
  const wsData = Object.entries(formData).map(([key, value]) => [key, String(value)])
  const worksheet = XLSX.utils.aoa_to_sheet([['Campo', 'Valor'], ...wsData])
  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Ficha')
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

  return new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
}
