
import { FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <FileText className="h-5 w-5 text-primary" />
            <span className="text-lg font-heading font-semibold text-primary">Renta Fácil Contratos</span>
          </div>
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Renta Fácil Contratos. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
