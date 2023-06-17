import React, {useState} from 'react';
import StepForward from './StepForward';

const Race = (props) => {
  const {allRaces, characterData, setCharacterData, activeStep, setActiveStep} = props
  const [hovered, setHovered] = useState(null);


  const handleRaceSelection = (selectedRace) => {
    setCharacterData(data => ({ ...data, race: selectedRace }));
  }

  // console.log(characterData.race)

  return (
    <div className='dark:bg-zinc-800 bg-slate-400 rounded py-5'>
      <StepForward activeStep={activeStep} setActiveStep={setActiveStep} isDataSelected={characterData.race}/>
      <div className="flex  flex-wrap justify-center p-5">
        <p className='text-xl pb-5'>Please select one of the following races. This will determine your charcter's looks and some of their starting abilities. Please see the documentation page for more details.</p>
        {allRaces.map((race, index) => (
            <div key={index} className={`m-4 pt-5  ${characterData && characterData.race._id === race._id ? 'border-4 border-blue-600 dark:border-yellow-600 dark:bg-zinc-900 bg-slate-300' : ''} `} onClick={() => handleRaceSelection(race)} onMouseEnter={() => setHovered(race)} onMouseLeave={() => setHovered(null)}>
              <img src={race.image[0]} alt={race.name} className="cursor-pointer w-40 h-40" />
              <p className="text-center dark:text-yellow-500 text-slate-800 text-xl my-2">{race.name}</p>
              {hovered === race && (
                <div className="absolute left-1/2 transform -translate-x-1/2 dark:bg-zinc-900 p-4 bg-slate-200 rounded">
                  <p className="text-center text-sm ">{race.description}</p>
                </div>
              )}
            </div>
        ))}
      </div>
      <StepForward activeStep={activeStep} setActiveStep={setActiveStep} isDataSelected={characterData.race}/>
    </div>
  );
}

export default Race;