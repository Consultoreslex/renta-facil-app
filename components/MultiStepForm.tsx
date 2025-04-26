
import { useState } from "react";
import { FormStepIndicator } from "@/components/ui/FormStepIndicator";
import { Button } from "@/components/ui/button";
import { ArrendadorTipoForm } from "@/components/forms/ArrendadorTipoForm";
import { InmuebleForm } from "@/components/forms/InmuebleForm";
import { ArrendatarioTipoForm } from "@/components/forms/ArrendatarioTipoForm";
import { FichaIngresoPreview } from "@/components/forms/FichaIngresoPreview";

const STEPS = ["Arrendador", "Inmueble", "Arrendatario", "Ficha Ingreso"];

interface FormData {
  arrendador: any;
  inmueble: any;
  arrendatario: any;
}

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    arrendador: {},
    inmueble: {},
    arrendatario: {},
  });

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (step: keyof FormData, data: any) => {
    setFormData({
      ...formData,
      [step]: data,
    });
    nextStep();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ArrendadorTipoForm 
            onSubmit={(data) => updateFormData("arrendador", data)}
          />
        );
      case 1:
        return (
          <InmuebleForm 
            onSubmit={(data) => updateFormData("inmueble", data)}
          />
        );
      case 2:
        return (
          <ArrendatarioTipoForm 
            onSubmit={(data) => updateFormData("arrendatario", data)}
          />
        );
      case 3:
        return <FichaIngresoPreview formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="mb-8">
        <FormStepIndicator steps={STEPS} currentStep={currentStep} />
      </div>
      
      <div className="mb-6">{renderStep()}</div>
      
      {currentStep > 0 && currentStep < STEPS.length - 1 && (
        <div className="flex justify-start">
          <Button
            variant="outline"
            onClick={prevStep}
          >
            Anterior
          </Button>
        </div>
      )}
    </div>
  );
}
