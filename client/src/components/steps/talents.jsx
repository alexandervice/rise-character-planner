import React, {useState} from 'react';
import StepButtons from './StepButtons';

const Talents = (props) => {
  const {allTalents, characterData, setCharacterData, activeStep, setActiveStep} = props
  const [hovered, setHovered] = useState(null);

  const handleTalentSelection = (selected) => {
    const currentTalents = characterData.talents;
    
    // Check if the selected talent is already in the array
    const index = currentTalents.indexOf(selected);
    
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
    console.log(updatedTalents)
    console.log(characterData)
  };


  return (
    <div className='bg-zinc-800 rounded py-5'>
      <StepButtons activeStep={activeStep} setActiveStep={setActiveStep} />
      <div className="flex bg-zinc-800 rounded flex-wrap justify-center py-5">
        <p className='text-xl pb-5'>Please select up to two of the following Talents. Your Talents are generally the noncombat skills you wish to learn. Please see the documentation page for more details.</p>
        {allTalents.map((talent, index) => (
          <div key={index} className={`m-4  ${characterData.talents.includes(talent) ? 'border-4 border-blue-500' : ''}`} onClick={() => handleTalentSelection(talent)} onMouseEnter={() => setHovered(talent)} onMouseLeave={() => setHovered(null)}>
            <img src={`/images/specializations/${talent.name}`} alt={talent.name} className="cursor-pointer w-40 h-40" />
            <p className="text-center text-xl my-2">{talent.name}</p>
            {hovered === talent && (
            <div className="absolute left-1/2 transform -translate-x-1/2 bg-zinc-900 p-4 rounded">
              <p className="text-center text-sm ">{talent.description}</p>
            </div>
            )}
          </div>
        ))}
      </div>
      <StepButtons activeStep={activeStep} setActiveStep={setActiveStep} />
    </div>
  );
}

export default Talents;