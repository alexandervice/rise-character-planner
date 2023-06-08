import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import CharacterForm from './CharacterForm';

const CreateCharacter = (props) => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const createCharacter = characterData => {
    axios.post('http://localhost:8000/api/characters/create', characterData)
      .then(res=>{
        console.log(res.data);
        navigate(`/characters/${res.data.character._id}`);
      })
      .catch(err=> {
        console.log(characterData)
        console.log(err)
        const errorResponse = err.response.data.errors;
        const errorArray = [];
        for (const key of Object.keys(errorResponse)) {
          errorArray.push(errorResponse[key].message)
        }
        setErrors(errorArray)
        console.log(errors)
      })
  }

  return (
    <div>
      <h3 className=' font-bold'>Create New Character:</h3>
      <div>
        <CharacterForm onSubmission={createCharacter} placeholderName={""} placeholderDetails={""} errors={errors}/>
      </div>
    </div>
  )
}
export default CreateCharacter;
