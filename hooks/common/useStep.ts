import { useState } from "react";

interface Params {
  steps: Array<unknown>;
}

export default function useStep({ steps }: Params) {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return {
    currentStep,
    currentStepValue: steps[currentStep],
    next,
    prev,
  };
}
