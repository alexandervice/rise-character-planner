import React, {useState} from 'react';
import StepButtons from './StepButtons';

const Race = (props) => {
  const {allRaces, characterData, setCharacterData, activeStep, setActiveStep} = props
  const [hovered, setHovered] = useState(null);


  const handleRaceSelection = (selectedRace) => {
    setCharacterData(data => ({ ...data, race: selectedRace }));
  }


  return (
    <div className='bg-zinc-800 rounded py-5'>
      <StepButtons activeStep={activeStep} setActiveStep={setActiveStep} />
      <div className="flex  flex-wrap justify-center py-5">
        <p className='text-xl pb-5'>Please select one of the following races. This will determine your charcter's looks and some of their starting abilities. Please see the documentation page for more details.</p>
        {allRaces.map((race, index) => (
          <div key={index} className={`m-4 pt-5  ${characterData && characterData.race === race ? 'border-4 border-blue-500' : ''}`} onClick={() => handleRaceSelection(race)} onMouseEnter={() => setHovered(race)} onMouseLeave={() => setHovered(null)}>
            <img src={`/images/races/${race.image[0]}.jpg`} alt={race.name} className="cursor-pointer w-40 h-40" />
            <p className="text-center text-yellow-500 text-xl my-2">{race.name}</p>
            {hovered === race && (
            <div className="absolute left-1/2 transform -translate-x-1/2 bg-zinc-900 p-4 rounded">
              <p className="text-center text-sm ">{race.description}</p>
            </div>
          )}
          </div>
        ))}
      </div>
      <StepButtons activeStep={activeStep} setActiveStep={setActiveStep} />
    </div>
  );
}

export default Race;