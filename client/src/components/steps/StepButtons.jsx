import React from 'react';

const StepButtons = ({ activeStep, setActiveStep}) => {
  const handleNext = () => {
    setActiveStep(prevStep => Math.min(prevStep + 1, 4));
  };

  const handlePrevious = () => {
    setActiveStep(prevStep => Math.max(prevStep - 1, 0));
  };
  
  if (activeStep > 0 && activeStep < 4) {
    // Render Previous button
    return (
      <div className='formButtons '>
        <button onClick={handlePrevious} className="mr-5 bg-blue-200 hover:bg-blue-300 rounded text-xl px-2 border-solid border-2 border-blue-400 text-black my-5">
          Previous
        </button>
        <button onClick={handleNext} className="bg-blue-200 hover:bg-blue-300 rounded text-xl px-2 border-solid border-2 border-blue-400 text-black my-5">
          Next
        </button>
      </div>
      
    );
    } else if (activeStep < 4) {
    // Render Next button
    return (
      <button onClick={handleNext} className="bg-blue-200 hover:bg-blue-300 rounded text-xl px-2 border-solid border-2 border-blue-400 text-black my-5">
        Next
      </button>
    );
  } else if (activeStep > 0) {
    // Render Previous button
    return (
      <button onClick={handlePrevious} className="bg-blue-200 hover:bg-blue-300 rounded text-xl px-2 border-solid border-2 border-blue-400 text-black my-5">
        Previous
      </button>
    );
    
  } else {
    // Render no buttons
    return null;
  }
};

export default StepButtons;
