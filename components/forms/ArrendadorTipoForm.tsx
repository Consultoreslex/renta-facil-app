
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Building, User } from "lucide-react";

export function ArrendadorTipoForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [tipo, setTipo] = useState<"juridica" | "natural" | "">("");
  const [form, setForm] = useState<any>({});

  // Validación número/SN
  const validaNumero = (valor: string) => /^(?:\d+|S\/N|s\/n)$/.test(valor);

  // Campos para persona jurídica
  const formJuridico = (
    <>
      <div className="flex items-center gap-2 mb-4">
        <Building className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-heading font-semibold">Datos del Arrendador (Persona Jurídica)</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Razón Social (Arrendador)<span className="text-red-500">*</span></Label>
          <Input required name="razonSocial" onChange={e => setForm((f: any) => ({ ...f, razonSocial: e.target.value }))} />
        </div>
        <div>
          <Label>RUT (Arrendador)<span className="text-red-500">*</span></Label>
          <Input required name="rut" onChange={e => setForm((f: any) => ({ ...f, rut: e.target.value }))} />
        </div>
        <div>
          <Label>Calle (Domicilio)<span className="text-red-500">*</span></Label>
          <Input required name="calle" onChange={e => setForm((f: any) => ({ ...f, calle: e.target.value }))} />
        </div>
        <div>
          <Label>Número<span className="text-red-500">*</span></Label>
          <Input required name="numero" onBlur={e => {
             if (!validaNumero(e.target.value)) alert('Escribe el número o "S/N" si no tiene');
          }} onChange={e => setForm((f: any) => ({ ...f, numero: e.target.value }))} />
        </div>
        <div>
          <Label>Sector<span className="text-red-500">*</span></Label>
          <Input required name="sector" onChange={e => setForm((f: any) => ({ ...f, sector: e.target.value }))} />
        </div>
        <div>
          <Label>Ciudad<span className="text-red-500">*</span></Label>
          <Input required name="ciudad" onChange={e => setForm((f: any) => ({ ...f, ciudad: e.target.value }))} />
        </div>
        <div>
          <Label>Representante Legal<span className="text-red-500">*</span></Label>
          <Input required name="representante" onChange={e => setForm((f: any) => ({ ...f, representante: e.target.value }))} />
        </div>
        <div>
          <Label>Teléfono Representante<span className="text-red-500">*</span></Label>
          <Input required name="telefono" onChange={e => setForm((f: any) => ({ ...f, telefono: e.target.value }))} />
        </div>
        <div>
          <Label>Correo Representante<span className="text-red-500">*</span></Label>
          <Input required name="correo" type="email" onChange={e => setForm((f: any) => ({ ...f, correo: e.target.value }))} />
        </div>
      </div>
    </>
  );

  // Campos para persona natural
  const formNatural = (
    <>
      <div className="flex items-center gap-2 mb-4">
        <User className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-heading font-semibold">Datos del Arrendador (Persona Natural)</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Nombre Completo (Arrendador)<span className="text-red-500">*</span></Label>
          <Input required name="nombreCompleto" onChange={e => setForm((f: any) => ({ ...f, nombreCompleto: e.target.value }))} />
        </div>
        <div>
          <Label>RUT (Arrendador)<span className="text-red-500">*</span></Label>
          <Input required name="rut" onChange={e => setForm((f: any) => ({ ...f, rut: e.target.value }))} />
        </div>
        <div>
          <Label>Calle (Domicilio)<span className="text-red-500">*</span></Label>
          <Input required name="calle" onChange={e => setForm((f: any) => ({ ...f, calle: e.target.value }))} />
        </div>
        <div>
          <Label>Número<span className="text-red-500">*</span></Label>
          <Input required name="numero" onBlur={e => {
            if (!validaNumero(e.target.value)) alert('Escribe el número o "S/N" si no tiene');
          }} onChange={e => setForm((f: any) => ({ ...f, numero: e.target.value }))} />
        </div>
        <div>
          <Label>Sector<span className="text-red-500">*</span></Label>
          <Input required name="sector" onChange={e => setForm((f: any) => ({ ...f, sector: e.target.value }))} />
        </div>
        <div>
          <Label>Ciudad<span className="text-red-500">*</span></Label>
          <Input required name="ciudad" onChange={e => setForm((f: any) => ({ ...f, ciudad: e.target.value }))} />
        </div>
        <div>
          <Label>Correo electrónico (Arrendador)<span className="text-red-500">*</span></Label>
          <Input required name="correo" type="email" onChange={e => setForm((f: any) => ({ ...f, correo: e.target.value }))} />
        </div>
        <div>
          <Label>Teléfono<span className="text-red-500">*</span></Label>
          <Input required name="telefono" onChange={e => setForm((f: any) => ({ ...f, telefono: e.target.value }))} />
        </div>
      </div>
    </>
  );

  if (!tipo) {
    return (
      <div>
        <p className="mb-4 font-semibold">¿El arrendador es persona jurídica?</p>
        <div className="flex gap-4 mb-6">
          <Button variant={tipo === "juridica" ? "default" : "outline"} 
            onClick={() => setTipo("juridica")}>Sí</Button>
          <Button variant={tipo === "natural" ? "default" : "outline"}
            onClick={() => setTipo("natural")}>No</Button>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={e => {
      e.preventDefault();
      onSubmit({ tipo, ...form });
    }}>
      {tipo === "juridica" ? formJuridico : formNatural}
      <div className="flex gap-4 justify-between">
        <Button type="button" variant="outline" onClick={() => setTipo("")}>Volver</Button>
        <Button type="submit">Siguiente</Button>
      </div>
    </form>
  );
}
