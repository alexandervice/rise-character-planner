import React from 'react'
import {useNavigate} from "react-router-dom";
import axios from "axios";

const LogOutButton = (props) => {
  const setLoggedIn = props.setLoggedIn;
  const navigate = useNavigate();

  const logOut = e => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/logout`)
      .then(res => {
        console.log(res.data);
        localStorage.removeItem("user")
        setLoggedIn(false)
        navigate("/");
      })
      .catch(err => {
        console.log(err)
      });

  }
  return (
    <button className='bg-yellow-200 hover:bg-yellow-300 rounded px-1 border-solid border-2 border-yellow-400 dark:text-black dark:hover:bg-yellow-200 dark:bg-yellow-300 dark:border-yellow-400' onClick={logOut}>Log Out</button>
  )
}
export default LogOutButton;
