import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from "./views/Main";
import OneCharacter from './components/OneCharacter';
import CreateCharacter from './components/CreateCharacter';
import UpdateCharacter from './components/UpdateCharacter';
import './App.css';
import './index.css';
import LoginRegistration from './views/LoginRegister';
import Switcher from './components/ThemeSwitcher';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white .h-screen">
      <div className="App">
        <Navbar/>
        <h1 className='text-3xl font-bold mb-5'>RISE Character Planner</h1>
        <Switcher/>
        <BrowserRouter>
          <Routes>
            <Route element={<LoginRegistration/>} path="/" default/>
            {/* this is the default path ^ */}
            <Route element={<Main/>} path="/dashboard"/>
            <Route element={<OneCharacter/>} path="/characters/:id"/>
            <Route element={<UpdateCharacter/>} path="/characters/edit/:id"/>
            <Route element={<CreateCharacter/>} path="/characters/create"/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
