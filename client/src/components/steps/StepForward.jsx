import React from 'react';

const StepForward = ({ activeStep, setActiveStep, isDataSelected}) => {
  const handleNext = () => {
    setActiveStep(prevStep => Math.min(prevStep + 1, 4));
  };
  
  if (activeStep < 4 && isDataSelected) {
    // Render Next button
    return (
      <button onClick={handleNext} className="bg-blue-200 hover:bg-blue-300 rounded text-xl px-2 border-solid border-2 border-blue-400 text-black my-5 w-24">
        Next
      </button>
    );
  } else {
    // Render Disabled
    return (
      <button disabled className="bg-zinc-400 rounded text-xl px-2 border-solid border-2 border-zinc-600 text-black my-5 cursor-not-allowed w-24">
        Next
      </button>
    );
  }
};

export default StepForward;
