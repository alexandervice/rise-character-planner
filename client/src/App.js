import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from "./views/Main";
import OneCharacter from './components/OneCharacter';
import CreateCharacter from './components/CreateCharacter';
import UpdateCharacter from './components/UpdateCharacter';
import './App.css';
import './index.css';
import LoginRegistration from './views/LoginRegister';
import Navbar from './components/Navbar';


function App() {
  return (
  <BrowserRouter>
    <div className="App">
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white .h-screen w-screen max-w-7xl">
        <Navbar/>
          <Routes>
            <Route element={<LoginRegistration/>} path="/" default/>
            {/* this is the default path ^ */}
            <Route element={<Main/>} path="/dashboard"/>
            <Route element={<OneCharacter/>} path="/characters/:id"/>
            <Route element={<UpdateCharacter/>} path="/characters/edit/:id"/>
            <Route element={<CreateCharacter/>} path="/characters/create"/>
          </Routes>
      </div>
    </div>
  </BrowserRouter>
  );
}

export default App;
