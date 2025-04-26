
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface FormData {
  arrendador: any;
  inmueble: any;
  arrendatario: any;
}

interface ContractPreviewProps {
  formData: FormData;
}

export function ContractPreview({ formData }: ContractPreviewProps) {
  const { arrendador, inmueble, arrendatario } = formData;
  
  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  const getNombreArrendador = () => {
    if (arrendador.tipo === "juridica") {
      return arrendador.razonSocial;
    } else {
      return arrendador.nombreCompleto;
    }
  };
  
  const getNombreArrendatario = () => {
    if (arrendatario.tipo === "juridica") {
      return arrendatario.razonSocial;
    } else {
      return arrendatario.nombreCompleto;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-heading font-semibold">Vista Previa del Contrato</h2>
      </div>
      
      <Card className="border-2 border-gray-200 contract-preview">
        <CardContent className="p-6">
          <div className="space-y-6 text-left">
            <div className="text-center">
              <h2 className="text-xl font-bold uppercase">CONTRATO DE ARRENDAMIENTO</h2>
            </div>
            
            <p>
              En la ciudad de {inmueble.ciudadInmueble || "_______________"}, a {formatDate()}, 
              comparecen para celebrar el presente contrato de arrendamiento:
            </p>
            
            <p>
              <strong>EL ARRENDADOR:</strong> {getNombreArrendador() || "_______________"}, 
              con {arrendador.tipo === "juridica" ? "RUT" : "identificación número"} {arrendador.rut || "_______________"}.
              {arrendador.tipo === "juridica" && arrendador.representante && (
                <span> Representado legalmente por {arrendador.representante}.</span>
              )}
            </p>
            
            <p>
              <strong>EL ARRENDATARIO:</strong> {getNombreArrendatario() || "_______________"}, 
              con {arrendatario.tipo === "juridica" ? "RUT" : "identificación número"} {arrendatario.rut || "_______________"}.
              {arrendatario.tipo === "juridica" && arrendatario.representante && (
                <span> Representado legalmente por {arrendatario.representante}.</span>
              )}
            </p>
            
            <div>
              <h3 className="font-bold">PRIMERA - OBJETO DEL CONTRATO:</h3>
              <p>
                El ARRENDADOR da en arrendamiento al ARRENDATARIO un inmueble ubicado en {inmueble.calleInmueble || "_______________"} {inmueble.numeroInmueble || "___"}, 
                {inmueble.sectorInmueble && ` ${inmueble.sectorInmueble},`} {inmueble.ciudadInmueble || "_______________"}, 
                con rol de propiedad N° {inmueble.rolPropiedad || "_______________"}.
                {inmueble.estacionamientos && inmueble.estacionamientos !== "0" && (
                  <span> El inmueble incluye {inmueble.estacionamientos} estacionamiento(s).</span>
                )}
              </p>
            </div>
            
            <div>
              <h3 className="font-bold">SEGUNDA - PRECIO Y FORMA DE PAGO:</h3>
              <p>
                El valor del canon mensual de arrendamiento es la suma de {inmueble.montoArriendo || "_______________"} {inmueble.moneda || "Pesos"}, 
                que EL ARRENDATARIO pagará al ARRENDADOR dentro de los primeros cinco (5) días de cada mes.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold">TERCERA - DURACIÓN:</h3>
              <p>
                El término de duración del presente contrato es de 12 meses, contados a partir de la fecha de firma del presente documento.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold">CUARTA - DESTINACIÓN:</h3>
              <p>
                El inmueble objeto de este contrato será destinado exclusivamente para vivienda, y no podrá ser variado sin previo consentimiento escrito del ARRENDADOR.
              </p>
            </div>
            
            <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200 mt-6">
              <p>
                Este es un documento preliminar generado por Contratos de Arrendamiento. 
                El contrato final debe ser revisado por un asesor legal antes de su firma.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-center mt-6">
        <Button 
          className="flex items-center gap-2"
          onClick={() => {
            const contractElement = document.querySelector('.contract-preview');
            if (contractElement instanceof HTMLElement) {
              import('@/lib/pdfGenerator').then(module => {
                const { generatePDF } = module;
                generatePDF(contractElement, 'contrato-arrendamiento.pdf');
              });
            }
          }}
        >
          <FileText className="h-4 w-4" />
          Descargar Contrato PDF
        </Button>
      </div>
    </div>
  );
}
