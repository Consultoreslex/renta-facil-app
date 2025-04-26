
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function InmuebleForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [form, setForm] = useState<any>({
    moneda: "Pesos",
  });

  // Validación número/SN
  const validaNumero = (valor: string) => /^(?:\d+|S\/N|s\/n)$/.test(valor);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f: any) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleRadioChange = (value: string) => {
    setForm((f: any) => ({ ...f, moneda: value }));
  };

  return (
    <form className="space-y-6" onSubmit={e => {
      e.preventDefault();
      onSubmit(form);
    }}>
      <div className="flex items-center gap-2 mb-4">
        <Home className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-heading font-semibold">Datos del Inmueble y Contrato</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Calle del Inmueble<span className="text-red-500">*</span></Label>
          <Input required name="calleInmueble" onChange={handleChange} />
        </div>
        <div>
          <Label>Número del Inmueble<span className="text-red-500">*</span></Label>
          <Input required name="numeroInmueble" onBlur={e => {
            if (!validaNumero(e.target.value)) alert('Escribe el número o "S/N" si no tiene');
          }} onChange={handleChange} />
        </div>
        <div>
          <Label>Sector del Inmueble<span className="text-red-500">*</span></Label>
          <Input required name="sectorInmueble" onChange={handleChange} />
        </div>
        <div>
          <Label>Ciudad del Inmueble<span className="text-red-500">*</span></Label>
          <Input required name="ciudadInmueble" onChange={handleChange} />
        </div>
        <div>
          <Label>Rol de la propiedad<span className="text-red-500">*</span></Label>
          <Input required name="rolPropiedad" onChange={handleChange} />
        </div>
        <div>
          <Label className="block mb-2">Moneda del arriendo<span className="text-red-500">*</span></Label>
          <RadioGroup defaultValue="Pesos" onValueChange={handleRadioChange} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Pesos" id="pesos" />
              <Label htmlFor="pesos">Pesos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="UF" id="uf" />
              <Label htmlFor="uf">UF</Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label>Monto del arriendo<span className="text-red-500">*</span></Label>
          <Input required name="montoArriendo" onChange={handleChange} />
        </div>
        <div>
          <Label>Estacionamientos<span className="text-red-500">*</span></Label>
          <Input required name="estacionamientos" onChange={handleChange} />
        </div>
      </div>

      <Button type="submit">Siguiente</Button>
    </form>
  );
}
