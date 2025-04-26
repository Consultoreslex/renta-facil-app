
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function generatePDF(element: HTMLElement, fileName: string = 'contrato-arrendamiento.pdf') {
  // Crear un canvas a partir del elemento HTML
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
  });
  
  // Dimensiones del canvas
  const imgWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;
  
  // Crear el documento PDF (A4)
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  // Añadir la imagen del canvas a la primera página
  pdf.addImage(
    canvas.toDataURL('image/png'),
    'PNG',
    0,
    position,
    imgWidth,
    imgHeight
  );
  heightLeft -= pageHeight;
  
  // Añadir nuevas páginas si el contenido es más grande que una página
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      0,
      position,
      imgWidth,
      imgHeight
    );
    heightLeft -= pageHeight;
  }
  
  // Guardar el PDF con el nombre especificado
  pdf.save(fileName);
  
  return pdf;
}
