import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import CharacterForm from './CharacterForm';

const CreateCharacter = (props) => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))
  const newCharacter = {
    name: "",
    img: "",
    backstory: "",
    race: "",
    background: "",
    specializations: [],
    talents: []
  }

  const createCharacter = characterData => {
    axios.post(`http://localhost:8000/api/users/${user._id}/characters/create`, characterData, {withCredentials: true})
      .then(res=>{
        console.log(characterData)
        console.log(res);
        navigate(`/${user._id}/characters`);
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
      <h3 className=' font-bold text-3xl mb-3'>Create New Character:</h3>
      <div>
        <CharacterForm onSubmission={createCharacter} placeholderCharacter={newCharacter} errors={errors}/>
      </div>
    </div>
  )
}
export default CreateCharacter;

