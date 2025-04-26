
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Folder } from "lucide-react";

interface PropiedadData {
  tipo: string;
  direccion: string;
  ciudad: string;
  estado: string;
  codigoPostal: string;
  descripcion: string;
  montoRenta: string;
  duracion: string;
  fechaInicio: string;
}

interface PropiedadFormProps {
  data: PropiedadData;
  updateData: (data: PropiedadData) => void;
}

export function PropiedadForm({ data, updateData }: PropiedadFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    updateData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Folder className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-heading font-semibold">Datos de la Propiedad</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="tipo">Tipo de Propiedad</Label>
          <Select value={data.tipo} onValueChange={(value) => handleSelectChange("tipo", value)}>
            <SelectTrigger id="tipo">
              <SelectValue placeholder="Seleccione tipo de propiedad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="apartamento">Apartamento</SelectItem>
              <SelectItem value="local">Local Comercial</SelectItem>
              <SelectItem value="oficina">Oficina</SelectItem>
              <SelectItem value="bodega">Bodega</SelectItem>
              <SelectItem value="otro">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="direccion">Dirección de la Propiedad</Label>
          <Input
            id="direccion"
            name="direccion"
            value={data.direccion}
            onChange={handleChange}
            placeholder="Dirección completa de la propiedad"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ciudad">Ciudad</Label>
          <Input
            id="ciudad"
            name="ciudad"
            value={data.ciudad}
            onChange={handleChange}
            placeholder="Ciudad"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="estado">Estado/Provincia</Label>
          <Input
            id="estado"
            name="estado"
            value={data.estado}
            onChange={handleChange}
            placeholder="Estado o provincia"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="codigoPostal">Código Postal</Label>
          <Input
            id="codigoPostal"
            name="codigoPostal"
            value={data.codigoPostal}
            onChange={handleChange}
            placeholder="Código postal"
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="descripcion">Descripción de la Propiedad</Label>
          <Textarea
            id="descripcion"
            name="descripcion"
            value={data.descripcion}
            onChange={handleChange}
            placeholder="Breve descripción de la propiedad"
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="montoRenta">Monto de Renta (mensual)</Label>
          <Input
            id="montoRenta"
            name="montoRenta"
            value={data.montoRenta}
            onChange={handleChange}
            placeholder="Ej: 1000.00"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="duracion">Duración del Contrato (meses)</Label>
          <Input
            id="duracion"
            name="duracion"
            value={data.duracion}
            onChange={handleChange}
            placeholder="Ej: 12"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
          <Input
            id="fechaInicio"
            name="fechaInicio"
            type="date"
            value={data.fechaInicio}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
