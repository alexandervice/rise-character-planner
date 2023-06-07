import React from 'react'
import axios from 'axios';
const DeleteButton = (props) => {
  const { storeId, successCallback } = props;
  
  const deleteStore = e => {
    axios.delete(`http://localhost:8000/api/stores/delete/${storeId}`)
      .then(res=>{
        successCallback();
        console.log("store deleted")
      })
      .catch(err=>console.log(err))
  }
  return (
    <button className='storeItem bg-red-200 hover:bg-red-300 rounded px-1 border-solid border-2 border-red-400' onClick={deleteStore}>
      Delete
    </button>
  )
}
export default DeleteButton;

