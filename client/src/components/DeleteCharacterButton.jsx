import React, { useState } from 'react'
import axios from 'axios';
const DeleteButton = (props) => {
  const { characterId, successCallback } = props;
  const user = JSON.parse(localStorage.getItem("user"))
  const [showConfirmation, setShowConfirmation] = useState(false);

  const deleteCharacter = e => {
    axios.delete(`http://localhost:8000/api/users/${user._id}/characters/delete/${characterId}`, {withCredentials: true})
      .then(res=>{
        successCallback();
        console.log("character deleted")
      })
      .catch(err=>console.log(err))
  }
  return (
    // <button className='bg-red-200 hover:bg-red-300 rounded px-1 border-solid border-2 border-red-400' onClick={deleteCharacter}>
    //   Delete
    // </button>
    <div>
      {showConfirmation ? (
        <>
          
          <button className='bg-red-200 hover:bg-red-300 rounded px-1 border-solid border-2 border-red-400 mr-3' onClick={deleteCharacter}>
            Confirm Delete
          </button>
          <button className='bg-gray-200 hover:bg-gray-300 rounded px-1 border-solid border-2 border-gray-400' onClick={() => setShowConfirmation(false)}>
            Cancel
          </button>
        </>
      ) : (
        <button className='bg-red-200 hover:bg-red-300 rounded px-1 border-solid border-2 border-red-400' onClick={() => setShowConfirmation(true)}>
          Delete
        </button>
      )}
    </div>
  )
}
export default DeleteButton;

