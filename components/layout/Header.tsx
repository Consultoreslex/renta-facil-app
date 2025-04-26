
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-heading font-bold text-primary">Renta Fácil Contratos</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">Cómo funciona</Button>
          <Button>Nuevo Contrato</Button>
        </div>
      </div>
    </header>
  );
}
