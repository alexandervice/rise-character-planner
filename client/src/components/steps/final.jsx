import React, {useState} from 'react';
import StepButtons from './StepButtons';
import CancelButton from '../CancelButton';
import axios from 'axios';

const Final = (props) => {
  const {characterData, setCharacterData, activeStep, setActiveStep} = props
  const [showChatGPTBackstory, setShowChatGPTBackstory] = useState(false);

  const sendMessageToChatGPT = async (message) => {
    try {
      const response = await axios.post('/api/chat', { message });
      // Handle the response from the backend, such as displaying the result in the UI
      const chatGPTBackstory = response.data.backstory;
      setCharacterData({ ...characterData, backstory: chatGPTBackstory });
      setShowChatGPTBackstory(true);
    } catch (error) {
      // Handle errors, such as displaying an error message to the user
      console.error(error);
    }
  };

  const handleNameChange = (e) => {
    setCharacterData({ ...characterData, name: e.target.value });
    // console.log(characterData)
  };

  const handleBackstoryChange = (e) => {
    setCharacterData({ ...characterData, backstory: e.target.value });
    setShowChatGPTBackstory(false);
    // console.log(characterData)
  };

  return (
    <div className='bg-zinc-800 rounded py-5'>
      <StepButtons activeStep={activeStep} setActiveStep={setActiveStep} />
      <div className="flex flex-col flex-wrap justify-center py-5">
        <p className='text-xl pb-5'>Complete your character by giving them a name and writing a backstory.</p>
        <div className='form-group'>
          <label htmlFor="characterName">
            Character Name:
            <input type="text" required id='characterName' name='name' className='form-input mb-5 ml-2 py-0 px-1 dark:text-black' value={characterData.name} onChange={handleNameChange}/>
          </label>
        </div>
        <div className='form-group'>
          <label className='flex justify-center' htmlFor="characterBackstory">
            Backstory:
            {showChatGPTBackstory ? (
              <textarea
                id='characterBackstory'
                name='backstory'
                className='form-input mb-5 ml-2 py-0 px-1 dark:text-black'
                rows="4"
                cols="29"
                value={characterData.backstory}
                readOnly
              ></textarea>
            ) : (
              <textarea
                id='characterBackstory'
                name='backstory'
                className='form-input mb-5 ml-2 py-0 px-1 dark:text-black'
                rows="4"
                cols="29"
                value={characterData.backstory}
                onChange={handleBackstoryChange}
              ></textarea>
            )}
          </label>
          {showChatGPTBackstory ? (
            <button className='bg-green-200 hover:bg-green-300 rounded  px-1 border-solid border-2 border-green-400 dark:text-black' type="submit" disabled>
              Generate Backstory
            </button>
          ) : (
            <button className='bg-green-200 hover:bg-green-300 rounded  px-1 border-solid border-2 border-green-400 dark:text-black' type="submit" onClick={() => sendMessageToChatGPT(characterData.backstory)}>
              Generate Backstory
            </button>
          )}
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