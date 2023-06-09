import React from 'react'
import {useNavigate} from "react-router-dom";

const LogInButton = () => {
  const navigate = useNavigate();

  const logIn = e => {
    navigate("/");
  }

  return (
    <button className='mr-5 bg-yellow-200 hover:bg-yellow-300 rounded px-1 border-solid border-2 border-yellow-400 mb-5 dark:text-black dark:hover:bg-yellow-200 dark:bg-yellow-300 dark:border-yellow-100' onClick={logIn}>Log In</button>
  )
}
export default LogInButton;