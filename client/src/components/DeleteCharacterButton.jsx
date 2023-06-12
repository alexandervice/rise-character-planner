import React from 'react'
import axios from 'axios';
const DeleteButton = (props) => {
  const { characterId, successCallback } = props;
  const user = JSON.parse(localStorage.getItem("user"))
  
  const deleteCharacter = e => {
    axios.delete(`http://localhost:8000/api/users/${user._id}/characters/delete/${characterId}`)
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

