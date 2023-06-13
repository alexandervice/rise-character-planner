import React, { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const RegistrationForm = (props) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const setLoggedIn = props.setLoggedIn
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const changeHandler = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/register", userInfo, {withCredentials: true})
      .then(res => {
        // console.log(res.data);
        // localStorage.setItem('username', userInfo.userName);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setLoggedIn(true)
        navigate(`/${res.data.user._id}/characters`);
      })
      .catch(err => {
        console.log(err)
        const errorResponse = err.response.data.errors;
        const errorArray = [];
        for (const key of Object.keys(errorResponse)) {
          errorArray.push(errorResponse[key].message)
        }
        setErrors(errorArray)
        console.log(errors)
      });
  }

  return (
    <div>
      <div className="row">
        <form action="" className="col-med-4 offset-2 pt-5" onSubmit={submitHandler}>
          {errors.map((err, index) => 
          <p className='error' key={index}>{err}</p>
          )}
          <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input type="text" required className="form-input mb-5 ml-2 py-0 px-1 dark:text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" name="userName" id="userName" placeholder="Username" onChange={changeHandler}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" required className="form-input mb-5 ml-2 py-0 px-1 dark:text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" name="email" id="email" placeholder="Email Address" onChange={changeHandler}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" required className="form-input mb-5 ml-2 py-0 px-1 dark:text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" name="password" id="password" placeholder="Password" onChange={changeHandler}/>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" required className="form-input mb-5 ml-2 py-0 px-1 dark:text-black focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" onChange={changeHandler}/>
          </div>
          <button type="submit" className="bg-green-200 hover:bg-green-300 rounded px-1 border-solid border-2 border-green-400  dark:bg-green-800 dark:hover:bg-green-700">Register</button>
        </form>
      </div>
    </div>
  )
}

export default RegistrationForm