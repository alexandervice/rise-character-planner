import React from 'react'
import axios from 'axios';
const DeleteButton = (props) => {
  const { CharacterId, successCallback } = props;
  
  const deleteCharacter = e => {
    axios.delete(`http://localhost:8000/api/characters/delete/${CharacterId}`)
      .then(res=>{
        successCallback();
        console.log("character deleted")
      })
      .catch(err=>console.log(err))
  }
  return (
    <button className='bg-red-200 hover:bg-red-300 rounded px-1 border-solid border-2 border-red-400' onClick={deleteCharacter}>
      Delete
    </button>
  )
}
export default DeleteButton;

