
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MultiStepForm } from "@/components/MultiStepForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-blue-900 mb-4">
            Contratos de Arrendamiento
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Complete el formulario con los datos del arrendador, el inmueble y el arrendatario 
            para generar un contrato de arrendamiento personalizado.
          </p>
        </div>
        
        <MultiStepForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
