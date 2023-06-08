import React, { useState, useRef } from 'react';
import CancelButton from './CancelButton';

const CharacterForm= (props) => {
  const {placeholderName, placeholderDetails, onSubmission, errors} = props;
  const [ name, setName ] = useState(placeholderName);
  const [ details, setDetails ] = useState(placeholderDetails);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSubmission({name, details})
  }

  return (
    <div className='p-4 border-4'>
      <form onSubmit={onSubmitHandler}>
        {errors.map((err, index) => 
        <p className='error' key={index}>{err}</p>
        )}
        <h5>
          <label htmlFor="name">Character Name:</label>
          <input type="text" name='name' className='form-input mb-5 ml-2 py-0 px-1' value={name} onChange={(e) => setName(e.target.value)}/>
        </h5>
        <h5>
          <label htmlFor="details">Character Details:</label>
          <input type="number" name='details' className='form-input mb-5 ml-2 py-0 px-1' value={details} onChange={(e) => setDetails(e.target.value)}/>
        </h5>
        <div className='formButtons'>
          <CancelButton/>
          <input className='bg-green-200 hover:bg-green-300 rounded px-1 border-solid border-2 border-green-400' type="submit"/>
        </div>
      </form>
    </div>
  )
}
export default CharacterForm;

