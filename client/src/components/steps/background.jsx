import React, {useState} from 'react';
import StepForward from './StepForward';
import StepBack from './StepBack';

const Background = (props) => {
  const {allBackgrounds, characterData, setCharacterData, activeStep, setActiveStep} = props;
  const [hovered, setHovered] = useState(null);


  const handleBackgroundSelection = (selected) => {
    setCharacterData(data => ({ ...data, background: selected }));
  }


  return (
    <div className='dark:bg-zinc-800 bg-slate-400 rounded py-5'>
      <StepBack activeStep={activeStep} setActiveStep={setActiveStep}/>
      <StepForward activeStep={activeStep} setActiveStep={setActiveStep} isDataSelected={characterData.background}/>
      <div className="flex rounded flex-wrap justify-center p-5">
        <p className='text-xl pb-5'>Please select one of the following backgrounds. This will determine what your character spent their time doing prior to becoming an adventurer, as well as your starting gear. Please see the documentation page for more details.</p>
        {allBackgrounds.map((background, index) => (
          <div key={index} className={`m-4 pt-5 ${characterData && characterData.background._id === background._id ? 'border-4 border-blue-600 dark:border-yellow-600 dark:bg-zinc-900 bg-slate-300' : ''}`} onClick={() => handleBackgroundSelection(background)} onMouseEnter={() => setHovered(background)} onMouseLeave={() => setHovered(null)}>
            <img src={`/images/backgrounds/${background.image[0]}.png`} alt={background.name} className="cursor-pointer w-40 h-40 dark:invert" />
            <p className="text-center dark:text-yellow-500 text-slate-800 text-xl my-2">{background.name}</p>
            {hovered === background && (
            <div className="absolute w-96 left-1/2 transform -translate-x-1/2 dark:bg-zinc-900 p-4 bg-slate-200 rounded">
              <p className="text-center text-sm ">{background.description}</p>
            </div>
            )}
          </div>
        ))}
      </div>
      <StepBack activeStep={activeStep} setActiveStep={setActiveStep}/>
      <StepForward activeStep={activeStep} setActiveStep={setActiveStep} isDataSelected={characterData.background}/>
    </div>
  );
}

export default Background;