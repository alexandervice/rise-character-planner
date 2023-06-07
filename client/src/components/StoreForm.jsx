import React, { useState, useRef } from 'react';
import CancelButton from './CancelButton';

const StoreForm= (props) => {
  const {placeholderName, placeholderStoreNumber, placeholderIsOpen, onSubmission, errors} = props;
  const [ name, setName ] = useState(placeholderName);
  const [ storeNumber, setStoreNumber ] = useState(placeholderStoreNumber);
  const [ isOpen, setIsOpen ] = useState(placeholderIsOpen);
  const checkbox = useRef();

  const onSubmitHandler = (e) => {
    onBoxCheck();
    e.preventDefault();
    onSubmission({name, storeNumber, isOpen})
  }
  const onBoxCheck = () => {
    checkbox.current.checked ?
    setIsOpen(true) :
    setIsOpen(false)
  }

  return (
    <div className='storeForm p-4 border-4'>
      <form onSubmit={onSubmitHandler}>
        {errors.map((err, index) => 
        <p className='error' key={index}>{err}</p>
        )}
        <h5>
          <label htmlFor="name">Store Name:</label>
          <input type="text" name='name' className='form-input mb-5 ml-2 py-0 px-1' value={name} onChange={(e) => setName(e.target.value)}/>
        </h5>
        <h5>
          <label htmlFor="storeNumber">Store Number:</label>
          <input type="number" name='storeNumber' className='form-input mb-5 ml-2 py-0 px-1' value={storeNumber} onChange={(e) => setStoreNumber(e.target.value)}/>
        </h5>
        <h5>
          <label htmlFor="isOpen">Open?</label>
          {
            placeholderIsOpen ?
            <input type="checkbox" name="isOpen" ref={checkbox} defaultChecked className="ml-2 appearance-none checked:bg-blue-500 " onChange={(e) => onBoxCheck(e)}/> :
            <input type="checkbox" name="isOpen" ref={checkbox} className="ml-2 appearance-none checked:bg-blue-500 " onChange={(e) => onBoxCheck(e)}/>
          }
        </h5>
        <div className='formButtons'>
          <CancelButton/>
          <input className='bg-green-200 hover:bg-green-300 rounded px-1 border-solid border-2 border-green-400' type="submit"/>
        </div>
      </form>
    </div>
  )
}
export default StoreForm;

