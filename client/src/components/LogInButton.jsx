import React from 'react'
import {Link} from "react-router-dom";

const LogInButton = () => {

  return (
    <Link to={"/"}>
      <button className='bg-yellow-200 hover:bg-yellow-300 rounded px-1 border-solid border-2 border-yellow-400 dark:text-black dark:hover:bg-yellow-200 dark:bg-yellow-300 dark:border-yellow-400' >Log In</button>
    </Link>
      
  )
}
export default LogInButton;