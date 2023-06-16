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

  const createCharacter = data => {
    let characterData = data.characterData
    let formData = new FormData();
    formData.append('name', characterData.name);
    formData.append('img', characterData.img);
    formData.append('backstory', characterData.backstory);
    formData.append('race', JSON.stringify(characterData.race));
    formData.append('background', JSON.stringify(characterData.background));
    characterData.specializations.forEach((spec, index) => {
      formData.append(`specializations[${index}]`, JSON.stringify(spec));
    });
    characterData.talents.forEach((talent, index) => {
      formData.append(`talents[${index}]`, JSON.stringify(talent));
    });

    axios.post(`http://localhost:8000/api/users/${user._id}/characters/create`, formData, {withCredentials: true, headers: {'Content-Type': 'multipart/form-data'}})
      .then(res=>{
        console.log(formData)
        console.log(res);
        navigate(`/${user._id}/characters`);
      })
      .catch(err=> {
        console.log(formData)
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

