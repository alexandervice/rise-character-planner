import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CharacterList from '../components/CharacterList';
const Main = (props) => {
  const [characterArray, setCharacterArray] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"))
  
  useEffect(()=>{
    axios.get(`http://localhost:8000/api/users/${user._id}/characters`, {withCredentials: true})
      .then((res)=>{
        // console.log(res.data);
        setCharacterArray(res.data.characters);
      })
      .catch(err=>console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterArray.length])


  const deleteCharacter = (id) => {
    // window.location.reload(false);
    setCharacterArray(characterArray.filter(character => character.id !== id));
  }

  return (
    <div>
      {/* more could be added here for the main page */}
      <CharacterList characterArray={characterArray} deleteCharacter={deleteCharacter}/>
    </div>
  )
}
export default Main;
