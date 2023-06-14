import React, {useState} from 'react';
import StepButtons from './StepButtons';
const lodash = require("lodash");

const Specializations = (props) => {
  const {allSpecializations, characterData, setCharacterData, activeStep, setActiveStep} = props
  const [hovered, setHovered] = useState(null);

  const handleSpecializationSelection = (selected) => {
    const currentSpecializations = characterData.specializations;
    
    // Check if the selected specialization is already in the array
    const index = lodash.findIndex(currentSpecializations, (spec) => lodash.isEqual(spec, selected));
    // console.log(index)
    let updatedSpecializations;
  
    if (index === -1) {
      // If not present, check if the limit of 2 specializations has been reached
      if (currentSpecializations.length < 2) {
        updatedSpecializations = [...currentSpecializations, selected];
      } else {
        // If the limit is reached, do not add the specialization
        return;
      }
    } else {
      // If already present, remove it from the array
      updatedSpecializations = [...currentSpecializations];
      updatedSpecializations.splice(index, 1);
    }
  
    setCharacterData(data => ({ ...data, specializations: updatedSpecializations }));
  };


  // console.log(characterData.specializations)
  // console.log(allSpecializations[16])
  // console.log(lodash.isEqual(characterData.specializations[0],allSpecializations[16]))
  // console.log(lodash.find(characterData.specializations, allSpecializations[16]))
  // console.log(lodash.includes([{ 'a': 1, 'b': 2 },{ 'c': 3, 'd': 4 }],{ 'c': 3, 'd': 4 }))
  
  return (
    <div className='bg-zinc-800 rounded py-5'>
      <StepButtons activeStep={activeStep} setActiveStep={setActiveStep} />
      <div className="flex bg-zinc-800 rounded flex-wrap justify-center py-5">
        <p className='text-xl pb-5'>Please select up to two of the following Specializations. Your Specializations represent your desired playstyle and greatly influence your combat abilities. Please see the documentation page for more details.</p>
        {allSpecializations.map((specialization, index) => (
          <div key={index} className={`m-4  ${lodash.find(characterData.specializations, specialization)  ? 'border-4 border-blue-500' : ''}`} onClick={() => handleSpecializationSelection(specialization)} onMouseEnter={() => setHovered(specialization)} onMouseLeave={() => setHovered(null)}>
            <img src={`/images/specializations/${specialization.image[0]}.jpg`} alt={specialization.name} className="cursor-pointer w-40 h-40" />
            <p className="text-center text-xl my-2">{specialization.name}</p>
            {hovered === specialization && (
            <div className="absolute left-1/2 transform -translate-x-1/2 bg-zinc-900 p-4 rounded">
              <p className="text-center text-sm ">{specialization.description}</p>
            </div>
            )}
          </div>
        ))}
      </div>
      <StepButtons activeStep={activeStep} setActiveStep={setActiveStep} />
    </div>
  );
}

export default Specializations;