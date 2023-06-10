import React from 'react'
import {Link} from "react-router-dom";

const LogInButton = () => {


  return (
    <Link className='mr-3' to={"/characters/create"}>
      <button className='mr-5 bg-yellow-200 hover:bg-yellow-300 rounded px-1 border-solid border-2 border-yellow-400 mb-5 dark:text-black dark:hover:bg-yellow-200 dark:bg-yellow-300 dark:border-yellow-400' >Log In</button>
    </Link>
      
  )
}
export default LogInButton;