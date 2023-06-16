import React, {useState} from 'react';
import StepButtons from './StepButtons';
const lodash = require("lodash");

const Talents = (props) => {
  const {allTalents, characterData, setCharacterData, activeStep, setActiveStep} = props
  const [hovered, setHovered] = useState(null);

  const handleTalentSelection = (selected) => {
    const currentTalents = characterData.talents;
    
    // Check if the selected talent is already in the array
    const index = lodash.findIndex(currentTalents, (spec) => lodash.isEqual(spec, selected));
    
    let updatedTalents;
  
    if (index === -1) {
      // If not present, check if the limit of 2 talents has been reached
      if (currentTalents.length < 2) {
        updatedTalents = [...currentTalents, selected];
      } else {
        // If the limit is reached, do not add the talents
        return;
      }
    } else {
      // If already present, remove it from the array
      updatedTalents = [...currentTalents];
      updatedTalents.splice(index, 1);
    }
  
    setCharacterData(data => ({ ...data, talents: updatedTalents }));
  };


  return (
    <div className='dark:bg-zinc-800 bg-slate-400 rounded py-5'>
      <StepButtons activeStep={activeStep} setActiveStep={setActiveStep} />
      <div className="flex  flex-wrap justify-center p-5">
        <p className='text-xl pb-5'>Please select up to two of the following Talents. Your Talents are generally the noncombat skills you wish to learn. Please see the documentation page for more details.</p>

        {allTalents.map((talent, index) => {
          // const hasMatchingTalent = characterData.talents.some(
          //   (tal) => tal._id === talent._id
          // );
        
        return (
          <div key={index} className={`m-4 pt-5 ${lodash.find(characterData.talents, talent) ? 'border-4 border-blue-600 dark:border-yellow-600' : ''}`} onClick={() => handleTalentSelection(talent)} onMouseEnter={() => setHovered(talent)} onMouseLeave={() => setHovered(null)}>
            <img src={`/images/talents/${talent.image[0]}.jpg`} alt={talent.name} className="cursor-pointer w-40 h-40" />
            <p className="text-center dark:text-yellow-500 text-slate-800 text-xl my-2">{talent.name}</p>
            {hovered === talent && (
            <div className="absolute left-1/2 transform -translate-x-1/2 dark:bg-zinc-900 p-4 bg-slate-200 rounded">
              <p className="text-center text-sm ">{talent.description}</p>
            </div>
            )}
          </div>
        )})}
      </div>
      <StepButtons activeStep={activeStep} setActiveStep={setActiveStep} />
    </div>
  );
}

export default Talents;