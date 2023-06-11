import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";
import CharacterForm from './CharacterForm';

const UpdateCharacter = (props) => {
  const { characterId } = useParams();
  const [character, setCharacter] = useState({});
  const [errors, setErrors] = useState([]);
  const [loaded, setLoaded] =useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/${userId}/characters/find/${characterId}`)
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
    axios.patch(`http://localhost:8000/api/users/${userId}/characters/update/${characterId}`, characterData)
      .then(res => {
        console.log(res);
        navigate(`/characters/${res.data.character._id}`);
      })
      .catch(err => {
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
      <h3 className=' font-bold'>Edit Character:</h3>
      {loaded? 
      <div>
        <CharacterForm onSubmission={updateCharacter} placeholderName={character.name} placeholderDetails={character.details} errors={errors}/>
      </div>:
      <div>
        <p>"We're sorry, but we could not find the character you are looking for. Would you like to create a new character?"</p>
        <Link className='characterItem ' to={"/characters/create"}><button className='bg-purple-100 hover:bg-purple-200 rounded px-1 border-solid border-2 mt-3 border-purple-500 mb-5'>Create a New Character</button></Link>
      </div>}
    </div>
  )
}
export default UpdateCharacter;

