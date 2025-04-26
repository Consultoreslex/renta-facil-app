
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

interface ArrendatarioData {
  nombre: string;
  apellidos: string;
  identificacion: string;
  email: string;
  telefono: string;
  direccion: string;
}

interface ArrendatarioFormProps {
  data: ArrendatarioData;
  updateData: (data: ArrendatarioData) => void;
}

export function ArrendatarioForm({ data, updateData }: ArrendatarioFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <User className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-heading font-semibold">Datos del Arrendatario</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            name="nombre"
            value={data.nombre}
            onChange={handleChange}
            placeholder="Ingrese nombre(s)"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="apellidos">Apellidos</Label>
          <Input
            id="apellidos"
            name="apellidos"
            value={data.apellidos}
            onChange={handleChange}
            placeholder="Ingrese apellidos"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="identificacion">Identificación / DNI</Label>
          <Input
            id="identificacion"
            name="identificacion"
            value={data.identificacion}
            onChange={handleChange}
            placeholder="Ingrese número de identificación"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            id="telefono"
            name="telefono"
            value={data.telefono}
            onChange={handleChange}
            placeholder="Ingrese número de teléfono"
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="direccion">Dirección actual</Label>
          <Input
            id="direccion"
            name="direccion"
            value={data.direccion}
            onChange={handleChange}
            placeholder="Ingrese dirección actual"
          />
        </div>
      </div>
    </div>
  );
}
