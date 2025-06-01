import React, { useState } from 'react'
import BuscarPersona from './components/BuscarPersona'
import FormArrendatario from './components/FormArrendatario'
import FormArrendador from './components/FormArrendador'
import FormPropiedad from './components/FormPropiedad'
import FormContrato from './components/FormContrato'
import Finalizar from './components/Finalizar'

const App = () => {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<any>({})

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  const handleData = (data: any) => {
    setFormData({ ...formData, ...data })
    nextStep()
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {step === 0 && <BuscarPersona onNext={nextStep} setFormData={setFormData} />}
      {step === 1 && <FormArrendatario onNext={handleData} onBack={prevStep} />}
      {step === 2 && <FormArrendador onNext={handleData} onBack={prevStep} />}
      {step === 3 && <FormPropiedad onNext={handleData} onBack={prevStep} />}
      {step === 4 && <FormContrato onNext={handleData} onBack={prevStep} />}
      {step === 5 && <Finalizar formData={formData} onBack={prevStep} />}
    </div>
  )
}

export default App
