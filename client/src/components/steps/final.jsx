import React, {useState} from 'react';
import StepBack from './StepBack';
import CancelButton from '../CancelButton';
import axios from 'axios';

const Final = (props) => {
  const {characterData, setCharacterData, activeStep, setActiveStep, errors} = props
  const [showChatGPTBackstory, setShowChatGPTBackstory] = useState(true);
  const [loading, setLoading] = useState(false);

  const sendMessageToChatGPT = async (message) => {
    try {
      setLoading(true);
      setShowChatGPTBackstory(false);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/chat`, message, {withCredentials: true});

      // Handle the response from the backend, such as displaying the result in the UI
      // console.log(response.data.text)
      const chatGPTBackstory = response.data.text;
      setCharacterData({ ...characterData, backstory: chatGPTBackstory });
      setLoading(false);
    } catch (error) {
      // Handle errors, such as displaying an error message to the user
      console.error(error);
      setLoading(false);
      setShowChatGPTBackstory(true);
    }
  };

  const handleNameChange = (e) => {
    setCharacterData({ ...characterData, name: e.target.value });
    // console.log(characterData)
  };

  const handleBackstoryChange = (e) => {
    setCharacterData({ ...characterData, backstory: e.target.value });
    // setShowChatGPTBackstory(false);
    // console.log(characterData)
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    const fileSizeLimitInBytes = 5 * 1024 * 1024; // 5 MB (adjust the limit as per your requirements)

    if (file && file.size > fileSizeLimitInBytes) {
      // Display an error message or perform appropriate actions
      alert('File size exceeds the allowed limit (5MB). Please choose a smaller file.');
      e.target.value = null; // Clear the input field if the file is invalid
    } else {
      setCharacterData({ ...characterData, img: file });
    }
}

  return (
    <div className='dark:bg-zinc-800 bg-slate-400 rounded py-5'>
      { loading ? <div/> :
        <StepBack activeStep={activeStep} setActiveStep={setActiveStep} />
      }
      
      <div className="flex flex-col flex-wrap justify-center p-5">
        <p className='text-xl pb-5'>Complete your character by giving them a name and writing a backstory.</p>
        <div className='form-group '>
          {errors.map((err, index) => 
          <p className='error' key={index}>{err}</p>
          )}
          <label htmlFor="characterName">
            Character Name:
            <input type="text" required id='characterName' name='name' className='form-input mb-5 ml-2 mt-5 py-0 px-1 dark:text-black w-1/2' maxLength={40} value={characterData.name} multiple={false} onChange={handleNameChange}/>
          </label>
        </div>
        <div className='form-group'>
          {characterData.img ? 
            <label htmlFor="characterImage">
              Update Character Image:
              <input type="file" id='characterImage' name='image' className='form-input mb-5 ml-2 mt-5 py-0 px-1 dark:text-black w-1/2' onChange={handleImageUpload} style={{display: "test"}} accept=".jpg,.png"/>
            </label> :
            <label htmlFor="characterImage">
              Character Image:
              <input type="file" id='characterImage' name='image' className='form-input mb-5 ml-2 mt-5 py-0 px-1 dark:text-black w-1/2' onChange={handleImageUpload} style={{display: "test"}} accept=".jpg,.png"/>
            </label>
          }
        </div>
        <div className='form-group'>
          <label className='flex flex-col justify-center' htmlFor="characterBackstory">
            Backstory:
            {loading ? (
              <textarea
                id='characterBackstory'
                name='backstory'
                className='form-input mb-5 ml-2 py-0 px-1 text-yellow-200 dark:text-yellow-500 bg-slate-400 dark:bg-zinc-800 cursor-wait w-full mt-2'
                rows="10"
                cols="125"
                value="Please wait for the AI to generate your backstory..."
                disabled
              ></textarea>
            ) : (
              <textarea
                id='characterBackstory'
                name='backstory'
                className='form-input mb-5 ml-2 py-0 px-1 dark:text-black w-full mt-2'
                rows="10"
                cols="125"
                value={characterData.backstory}
                onChange={handleBackstoryChange}
                required
                minLength={10}
              ></textarea>
            )}
          </label>
          {showChatGPTBackstory && characterData.name.length > 2 ? (
            // <button className='bg-red-200 rounded  px-1 border-solid border-2 border-red-400 dark:text-black' disabled>
            //   Backstory Generated
            // </button>
            <button className='text-xl bg-purple-800 hover:bg-purple-400 rounded px-2 p-1 border-solid border-2 hover:border-4 hover:border-purple-100 border-purple-500 text-white hover:text-black' type='button' onClick={() => sendMessageToChatGPT({
              "message" : `Please generate a short character backstory for the character named: ${characterData.name}. They are of the race: ${characterData.race.name} (${characterData.race.description}), they have a background as a ${characterData.background.name} (${characterData.background.description}). They have two specializations: ${characterData.specializations[0].name} (${characterData.specializations[0].description}), and ${characterData.specializations[1].name} (${characterData.specializations[1].description}). And finally they have two talents: ${characterData.talents[0].name} (${characterData.talents[0].description}), and ${characterData.talents[1].name} (${characterData.talents[1].description}). Please note: They live on Elara. This is a world of both science and magic with many interesting races and peoples.`
            })}>
              Generate AI Backstory
            </button>
          ) : (
            <div>
              {characterData.name.length < 3 && loading === false ?
              <div>
                <button className='cursor-not-allowed bg-zinc-400 hover:bg-zinc-400 rounded px-2 p-1 border-solid border-2 border-zinc-500 dark:text-black' disabled type='button' title='You must first give your character a name.'>Generate AI Backstory</button>
              </div> : 
              <div>
                
              </div>}
            </div>
          )}
        </div>
      </div>
        <div className='formButtons text-black text-xl'>
            {loading ? (<div></div>) :
            (<div>
              <CancelButton/>
              {characterData.name.length < 3 || characterData.backstory.length < 3 ? <input className='cursor-not-allowed bg-zinc-400 rounded  px-1 border-solid border-2 border-zinc-500 dark:text-black' type="submit" disabled/> :
              <input className='bg-green-200 hover:bg-green-300 rounded  px-1 border-solid border-2 border-green-400 dark:text-black' type="submit"/>
              }
            </div>
            )}
        </div>
    </div>
  );
}

export default Final;