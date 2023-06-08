import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from "./views/Main";
import OneCharacter from './components/OneCharacter';
import CreateCharacter from './components/CreateCharacter';
import UpdateCharacter from './components/UpdateCharacter';
import './App.css';
import './index.css';
import LoginRegisterForm from './components/loginRegisterForm';



function App() {
  return (
    <div className="App">
      <h1 className='text-3xl font-bold underline mb-5'>RISE Character Planner</h1>
      <BrowserRouter>
        <Routes>
          <Route element={<LoginRegisterForm/>} path="/" default/>
          {/* this is the default path ^ */}
          <Route element={<Main/>} path="/dashboard"/>
          <Route element={<OneCharacter/>} path="/characters/:id"/>
          <Route element={<UpdateCharacter/>} path="/characters/edit/:id"/>
          <Route element={<CreateCharacter/>} path="/characters/create"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
