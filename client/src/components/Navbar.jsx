import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiMap } from 'react-icons/fi';
import LogOutButton from "./LogOutButton";
import LogInButton from "./LogInButton";
import Switcher from './ThemeSwitcher';

const Navbar = (props) => {
  const loggedIn = props.loggedIn
  const setLoggedIn = props.setLoggedIn
  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <nav className="w-screen max-w-7xl mb-12 bg-slate-300 dark:bg-zinc-900  py-4">
      <div className="container mx-auto sm:flex items-center justify-between max-w-5xl px-5">
        <h1 className="dark:text-yellow-500 font-bold text-3xl text-blue-700">
          RISE Character Planner
        </h1>
        <div className="space-x-4 flex items-center">
          <Link to="/map" className="text-zinc-700 dark:text-white ">
            <FiMap className="inline mr-1" />
            Map
          </Link>
          <Link to="/documentation" className="text-zinc-700 dark:text-white ">
            <FiHome className="inline mr-1" />
            Documentation
          </Link>
          { loggedIn ?
          <Link to={`/${user._id}/characters`} className="text-zinc-700 dark:text-white ">
            <FiUser className="inline mr-1" />
            My Characters
          </Link>:
          <div className='inline-block mr-1'/>}
          
          
          
          { loggedIn ?
          <LogOutButton setLoggedIn={setLoggedIn}/> :
          <LogInButton/>}
          <Switcher/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
