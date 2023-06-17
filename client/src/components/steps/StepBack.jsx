import React from 'react';

const StepBack = ({ activeStep, setActiveStep}) => {

  const handlePrevious = () => {
    setActiveStep(prevStep => Math.max(prevStep - 1, 0));
  };
  
  if (activeStep > 0) {
    // Render Previous button
    return (
      <button onClick={handlePrevious} className="bg-blue-200 hover:bg-blue-300 rounded text-xl px-2 border-solid border-2 border-blue-400 text-black my-5 mr-3 w-24">
        Previous
      </button>
    );
    
  } else {
    // Render no buttons
    return null;
  }
};

export default StepBack;
