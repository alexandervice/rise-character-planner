import React, { useState, useEffect } from 'react';
import axios from "axios"
import CancelButton from './CancelButton';
import Stepper from 'react-stepper-horizontal';
import Race from './steps/race';

const CharacterForm= (props) => {
  const {placeholderCharacter, onSubmission, errors} = props;
  const [ characterData, setCharacterData ] = useState(placeholderCharacter);
  const [ activeStep, setActiveStep ] = useState(0);
  const [allRaces, setAllRaces] = useState([]);
  const [allBackgrounds, setAllBackgrounds] = useState([]);
  const [allSpecializations, setAllSpecializations] = useState([]);
  const [allTalents, setAllTalents] = useState([]);
  const loggedIn = props.loggedIn

  useEffect(() => {
    fetchRaceData();
    fetchBackgroundData();
    fetchSpecializationData();
    fetchTalentData();
    // Fetch data for additional tables as needed
  }, []);

  const fetchRaceData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/races/find/all');
      setAllRaces(response.data.races);
      // console.log(localStorage.getItem("user"))
      // console.log(response.data.races)
      console.log(loggedIn)
    } catch (error) {
      console.error('Error fetching data for races:', error);
    }
  };

  const fetchBackgroundData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/backgrounds/find/all'); 
      setAllBackgrounds(response.data.backgrounds);
      // console.log(response.data.backgrounds)
    } catch (error) {
      console.error('Error fetching data for backgrounds:', error);
    }
  };

  const fetchSpecializationData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/specializations/find/all'); 
      setAllSpecializations(response.data.specializations);
      // console.log(response.data.specializations)
    } catch (error) {
      console.error('Error fetching data for specializations:', error);
    }
  };

  const fetchTalentData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/talents/find/all'); 
      setAllTalents(response.data.talents);
      // console.log(response.data.talents)
    } catch (error) {
      console.error('Error fetching data for talents:', error);
    }
  };


  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSubmission({characterData})
  }

  const steps = [
    {title: 'Select Race', onClick: () => setActiveStep(0) }, 
    {title: 'Select Background', onClick: () => setActiveStep(1) }, 
    {title: 'Choose Specializations', onClick: () => setActiveStep(2) }, 
    {title: 'Choose Talents', onClick: () => setActiveStep(3) }, 
    {title: 'Final Details', onClick: () => setActiveStep(4) }
  ];

  return (
    <div className='p-4 border-4 bg-zinc-900 text-white rounded'>
      <form onSubmit={onSubmitHandler}>
        {errors.map((err, index) => 
        <p className='error' key={index}>{err}</p>
        )}
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
            <div>
              <Stepper 
              steps={ steps } 
              activeStep={ activeStep }
              activeColor="#EAB306"
              activeTitleColor="#EAB306"
              defaultTitleColor=""
              circleFontColor="#18181B"/>
              [<Race allRaces={allRaces} characterData={characterData} setCharacterData={setCharacterData}/>]
              <button className='bg-blue-200 hover:bg-blue-300 rounded px-1 border-solid border-2 border-blue-400 text-black my-5'>Next</button>
            </div>
        <div className='formButtons text-black'>
          <CancelButton/>
          <input className='bg-green-200 hover:bg-green-300 rounded px-1 border-solid border-2 border-green-400 dark:text-black' type="submit"/>
        </div>
      </form>
    </div>
  )
}
export default CharacterForm;

