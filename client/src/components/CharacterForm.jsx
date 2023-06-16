import React, { useState, useEffect } from 'react';
import axios from "axios"
// import CancelButton from './CancelButton';
import Stepper from 'react-stepper-horizontal';
import Race from './steps/Race';
import Background from './steps/Background';
import Specializations from './steps/Specializations';
import Talents from './steps/Talents';
import Final from './steps/Final';


const CharacterForm= (props) => {
  const {placeholderCharacter, onSubmission, errors} = props;
  const [ characterData, setCharacterData ] = useState(placeholderCharacter);
  const [ activeStep, setActiveStep ] = useState(0);
  const loggedIn = props.loggedIn
  const [allRaces, setAllRaces] = useState([]);
  const [allBackgrounds, setAllBackgrounds] = useState([]);
  const [allSpecializations, setAllSpecializations] = useState([]);
  const [allTalents, setAllTalents] = useState([]);

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
    <div className=' p-4 border-4 border-slate-800 dark:border-zinc-300 bg-slate-600 dark:bg-zinc-900 dark:text-white rounded'>
      <form onSubmit={onSubmitHandler}>
        {errors.map((err, index) => 
        <p className='error' key={index}>{err}</p>
        )}
          <div>
            <Stepper 
            steps={ steps } 
            activeStep={ activeStep }
            activeColor="#EAB306"
            activeTitleColor="#EAB306"
            defaultTitleColor="#FFFFFF"
            defaultColor="#FFFFFF"
            circleFontColor="#18181B"
            completeTitleColor="#848884"
            completeColor="#848884"/>
            <div className='py-5'>
              {activeStep === 0 && <Race allRaces={allRaces} characterData={characterData} setCharacterData={setCharacterData} activeStep={activeStep} setActiveStep={setActiveStep}/>}
              {activeStep === 1 && <Background allBackgrounds={allBackgrounds} characterData={characterData} setCharacterData={setCharacterData} activeStep={activeStep} setActiveStep={setActiveStep}/>}
              {activeStep === 2 && <Specializations allSpecializations={allSpecializations} characterData={characterData} setCharacterData={setCharacterData} activeStep={activeStep} setActiveStep={setActiveStep}/>}
              {activeStep === 3 && <Talents allTalents={allTalents} characterData={characterData} setCharacterData={setCharacterData} activeStep={activeStep} setActiveStep={setActiveStep}/>}
              {activeStep === 4 && <Final characterData={characterData} setCharacterData={setCharacterData} activeStep={activeStep} setActiveStep={setActiveStep}/>}
            </div>
          </div>
          
      </form>
    </div>
  )
}
export default CharacterForm;

