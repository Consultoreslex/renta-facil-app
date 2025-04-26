
import { cn } from "@/lib/utils";

interface FormStepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function FormStepIndicator({ steps, currentStep }: FormStepIndicatorProps) {
  return (
    <div className="flex w-full justify-between">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2",
              index <= currentStep
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted text-muted-foreground border-muted"
            )}
          >
            {index + 1}
          </div>
          <span
            className={cn(
              "mt-2 text-xs font-medium",
              index <= currentStep
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            {step}
          </span>
        </div>
      ))}
    </div>
  );
}
