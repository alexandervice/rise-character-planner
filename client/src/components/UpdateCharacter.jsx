import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";
import CharacterForm from './CharacterForm';

const UpdateCharacter = (props) => {
  const { characterId } = useParams();
  const [character, setCharacter] = useState({});
  const [errors, setErrors] = useState([]);
  const [loaded, setLoaded] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"))

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/${user._id}/characters/find/${characterId}`)
      .then(res => {
        setCharacter(res.data.character)
        console.log(res.data.character)
        res.data.character ?
        setLoaded(true) :
        setLoaded(false)
      })
        .catch(err => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateCharacter = characterData => {
    axios.patch(`http://localhost:8000/api/users/${user._id}/characters/update/${characterId}`, characterData)
      .then(res => {
        console.log(characterData)
        console.log(res);
        navigate(`/${user._id}/characters/${characterId}`);
      })
      .catch(err => {
        // console.log(characterData)
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
      <h3 className=' font-bold text-3xl mb-3'>Edit Character:</h3>
      {loaded? 
      <div>
        <CharacterForm onSubmission={updateCharacter} placeholderCharacter={character} errors={errors}/>
      </div>:
      <div>
        <p>"We're sorry, but we could not find the character you are looking for. Would you like to create a new character?"</p>
        <Link className='characterItem ' to={`/${user._id}/characters/create`}><button className='bg-purple-100 hover:bg-purple-200 rounded px-1 border-solid border-2 mt-3 border-purple-500 mb-5'>Create a New Character</button></Link>
      </div>}
    </div>
  )
}
export default UpdateCharacter;

