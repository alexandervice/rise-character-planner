import React, { useState } from 'react';
import CancelButton from './CancelButton';

const CharacterForm= (props) => {
  const {placeholderName, onSubmission, errors} = props;
  const [ name, setName ] = useState(placeholderName);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSubmission({name})
  }

  return (
    <div className='p-4 border-4'>
      <form onSubmit={onSubmitHandler}>
        {errors.map((err, index) => 
        <p className='error' key={index}>{err}</p>
        )}
        <div>
          <label htmlFor="characterName">Character Name:</label>
          <input type="text" id='characterName' name='name' className='form-input mb-5 ml-2 py-0 px-1 dark:text-black' value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className='formButtons'>
          <CancelButton/>
          <input className='bg-green-200 hover:bg-green-300 rounded px-1 border-solid border-2 border-green-400 dark:text-black' type="submit"/>
        </div>
      </form>
    </div>
  )
}
export default CharacterForm;

