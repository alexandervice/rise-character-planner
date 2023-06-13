import React from 'react';
import StepButtons from './StepButtons';
import CancelButton from '../CancelButton';

const Final = (props) => {
  const {characterData, setCharacterData, activeStep, setActiveStep} = props

  return (
    <div className='bg-zinc-800 rounded py-5'>
      <StepButtons activeStep={activeStep} setActiveStep={setActiveStep} />
      <div className="flex flex-col flex-wrap justify-center py-5">
        <p className='text-xl pb-5'>Complete your character by giving them a name and writing a backstory.</p>
        <div className='form-group'>
          <label htmlFor="characterName">
            Character Name:
            <input type="text" required id='characterName' name='name' className='form-input mb-5 ml-2 py-0 px-1 dark:text-black' value={characterData.name} onChange={(e) => setCharacterData(e.target.value)}/>
          </label>
        </div>
        <div className='form-group'>
          <label className='flex justify-center' htmlFor="characterBackstory">
            Backstory:
            <textarea id='characterBackstory' name='backstory' className='form-input mb-5 ml-2 py-0 px-1 dark:text-black' rows="4" cols="29" value={characterData.backstory} onChange={(e) => setCharacterData(e.target.value)}></textarea>
          </label>
        </div>
      </div>
        <div className='formButtons text-black text-xl'>
            <CancelButton/>
            <input className='bg-green-200 hover:bg-green-300 rounded  px-1 border-solid border-2 border-green-400 dark:text-black' type="submit"/>
        </div>
    </div>
  );
}

export default Final;