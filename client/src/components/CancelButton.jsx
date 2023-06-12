import React from 'react'
import {useNavigate} from "react-router-dom";
const CancelButton = (props) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))
  const cancel = e => {
    navigate(`/${user._id}/characters`);
  }
  return (
    <button className='mr-5 bg-yellow-200 hover:bg-yellow-300 rounded px-1 border-solid border-2 border-yellow-400 dark:text-black' onClick={cancel}>Cancel</button>
  )
}
export default CancelButton;

