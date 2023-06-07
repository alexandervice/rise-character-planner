import React from 'react'
import {useNavigate} from "react-router-dom";
const CancelButton = (props) => {
  const navigate = useNavigate();
  const cancel = e => {
    navigate("/");
  }
  return (
    <button className='storeItem mr-5 bg-yellow-200 hover:bg-yellow-300 rounded px-1 border-solid border-2 border-yellow-400' onClick={cancel}>Go Home</button>
  )
}
export default CancelButton;

