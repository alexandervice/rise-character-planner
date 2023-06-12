import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiSettings } from 'react-icons/fi';
import LogOutButton from "./LogOutButton";
import LogInButton from "./LogInButton";
import Switcher from './ThemeSwitcher';

const Navbar = (props) => {
  const loggedIn = props.loggedIn
  const setLoggedIn = props.setLoggedIn
  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <nav className="w-screen max-w-7xl mb-12 bg-zinc-200 dark:bg-zinc-900  py-4">
      <div className="container mx-auto flex items-center justify-between max-w-4xl ">
        <h1 className="text-yellow-500 font-bold text-3xl">
          RISE Character Planner
        </h1>
        <div className="space-x-4">
          <Link to="/documentation" className="text-zinc-700 hover:text-black dark:text-white hover:text-gray-300 ">
            <FiHome className="inline-block mr-1" />
            Documentation
          </Link>
          { loggedIn ?
          <Link to={`/${user._id}/characters`} className="text-zinc-700 hover:text-black dark:text-white hover:text-gray-300">
          <FiUser className="inline mr-1" />
          My Characters
        </Link>:
          <div className='inline mr-1'/>}
          
          
          {/* <Link to="/settings" className="text-zinc-700 hover:text-black dark:text-white hover:text-gray-300">
            <FiSettings className="inline mr-1" />
            Settings
          </Link> */}
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
