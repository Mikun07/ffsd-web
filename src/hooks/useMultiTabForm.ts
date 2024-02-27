import React, { useState } from "react";

export const useMultiStepForm = (
  steps: React.ReactNode[],
  titles: any[]
) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const next = () => {
    setCurrentStepIndex((i) => (i >= steps.length - 1 ? i : i + 1));
  };

  const back = () => {
    setCurrentStepIndex((i) => (i <= 0 ? i : i - 1));
  };

  const goTo = (index: number) => {
    setCurrentStepIndex(index);
  };

  return {
    currentStepIndex,
    steps,
    step: steps[currentStepIndex],
    titles,
    title: titles[currentStepIndex],
    next,
    back,
    goTo,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
  };
};
