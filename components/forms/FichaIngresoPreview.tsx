
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, FileExcel, Download } from "lucide-react";
import * as XLSX from "xlsx";

interface FormData {
  arrendador: any;
  inmueble: any;
  arrendatario: any;
}

interface FichaIngresoPreviewProps {
  formData: FormData;
}

export function FichaIngresoPreview({ formData }: FichaIngresoPreviewProps) {
  const { arrendador, inmueble, arrendatario } = formData;

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleDownloadExcel = () => {
    const data = [
      { Seccion: "Arrendador", ...arrendador },
      { Seccion: "Inmueble", ...inmueble },
      { Seccion: "Arrendatario", ...arrendatario }
    ];
    const ws = XLSX.utils.json_to_sheet(data, { skipHeader:false });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "FichaIngreso");
    XLSX.writeFile(wb, "ficha_ingreso.xlsx");
  };

  const handleDownloadPDF = () => {
    const fichaElement = document.querySelector('.ficha-ingreso-preview');
    if (fichaElement instanceof HTMLElement) {
      import('@/lib/pdfGenerator').then(module => {
        const { generatePDF } = module;
        generatePDF(fichaElement, 'ficha_ingreso.pdf');
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-heading font-semibold">Ficha de Ingreso</h2>
      </div>
      <Card className="border-2 border-gray-200 ficha-ingreso-preview">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg mb-2">Datos del Arrendador</h3>
              <ul className="list-disc ml-6 text-sm space-y-1">
                {arrendador.tipo && <li><strong>Tipo:</strong> {arrendador.tipo}</li>}
                {arrendador.razonSocial && <li><strong>Razón Social:</strong> {arrendador.razonSocial}</li>}
                {arrendador.nombreCompleto && <li><strong>Nombre Completo:</strong> {arrendador.nombreCompleto}</li>}
                {arrendador.rut && <li><strong>RUT:</strong> {arrendador.rut}</li>}
                {arrendador.calle && <li><strong>Calle:</strong> {arrendador.calle}</li>}
                {arrendador.numero && <li><strong>Número:</strong> {arrendador.numero}</li>}
                {arrendador.sector && <li><strong>Sector:</strong> {arrendador.sector}</li>}
                {arrendador.ciudad && <li><strong>Ciudad:</strong> {arrendador.ciudad}</li>}
                {arrendador.representante && <li><strong>Representante Legal:</strong> {arrendador.representante}</li>}
                {arrendador.telefono && <li><strong>Teléfono:</strong> {arrendador.telefono}</li>}
                {arrendador.correo && <li><strong>Correo:</strong> {arrendador.correo}</li>}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Datos del Inmueble</h3>
              <ul className="list-disc ml-6 text-sm space-y-1">
                {inmueble.calleInmueble && <li><strong>Calle:</strong> {inmueble.calleInmueble}</li>}
                {inmueble.numeroInmueble && <li><strong>Número:</strong> {inmueble.numeroInmueble}</li>}
                {inmueble.sectorInmueble && <li><strong>Sector:</strong> {inmueble.sectorInmueble}</li>}
                {inmueble.ciudadInmueble && <li><strong>Ciudad:</strong> {inmueble.ciudadInmueble}</li>}
                {inmueble.rolPropiedad && <li><strong>Rol Propiedad:</strong> {inmueble.rolPropiedad}</li>}
                {inmueble.moneda && <li><strong>Moneda:</strong> {inmueble.moneda}</li>}
                {inmueble.montoArriendo && <li><strong>Monto de arriendo:</strong> {inmueble.montoArriendo}</li>}
                {inmueble.estacionamientos && <li><strong>Estacionamientos:</strong> {inmueble.estacionamientos}</li>}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Datos del Arrendatario</h3>
              <ul className="list-disc ml-6 text-sm space-y-1">
                {arrendatario.tipo && <li><strong>Tipo:</strong> {arrendatario.tipo}</li>}
                {arrendatario.razonSocial && <li><strong>Razón Social:</strong> {arrendatario.razonSocial}</li>}
                {arrendatario.nombreCompleto && <li><strong>Nombre Completo:</strong> {arrendatario.nombreCompleto}</li>}
                {arrendatario.rut && <li><strong>RUT:</strong> {arrendatario.rut}</li>}
                {arrendatario.calle && <li><strong>Calle:</strong> {arrendatario.calle}</li>}
                {arrendatario.numero && <li><strong>Número:</strong> {arrendatario.numero}</li>}
                {arrendatario.sector && <li><strong>Sector:</strong> {arrendatario.sector}</li>}
                {arrendatario.ciudad && <li><strong>Ciudad:</strong> {arrendatario.ciudad}</li>}
                {arrendatario.representante && <li><strong>Representante Legal:</strong> {arrendatario.representante}</li>}
                {arrendatario.telefono && <li><strong>Teléfono:</strong> {arrendatario.telefono}</li>}
                {arrendatario.correo && <li><strong>Correo:</strong> {arrendatario.correo}</li>}
                {arrendatario.encargadoPagos && <li><strong>Encargado de pagos:</strong> {arrendatario.encargadoPagos}</li>}
                {arrendatario.correoEncargadoPagos && <li><strong>Correo encargado pagos:</strong> {arrendatario.correoEncargadoPagos}</li>}
              </ul>
            </div>
            <div className="text-right text-xs text-gray-500 border-t pt-2 mt-4">
              <span>Fecha de creación: {formatDate()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-6 justify-center mt-6">
        <Button
          className="flex items-center gap-2"
          onClick={handleDownloadPDF}
          type="button"
        >
          <FileText className="h-4 w-4" /> PDF
        </Button>
        <Button
          className="flex items-center gap-2"
          onClick={handleDownloadExcel}
          type="button"
          variant="outline"
        >
          <FileExcel className="h-4 w-4" /> Excel
        </Button>
      </div>
    </div>
  );
}
