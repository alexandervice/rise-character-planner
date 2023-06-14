import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from "./views/Main";
import OneCharacter from './components/OneCharacter';
import CreateCharacter from './components/CreateCharacter';
import UpdateCharacter from './components/UpdateCharacter';
import './App.css';
import './index.css';
import LoginRegistration from './views/LoginRegister';
import Navbar from './components/Navbar';
import Documentation from './components/Documentation';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  
  const checkToken = () => {
    if (localStorage.getItem('user')) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
  <BrowserRouter>
    <div className="App">
      <div className="bg-white dark:bg-zinc-800 text-black dark:text-white .h-screen w-screen max-w-6xl flex flex-col items-center">
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
          <div className='p-5'>
            <Routes>
              <Route element={<LoginRegistration setLoggedIn={setLoggedIn}/>} path="/" default/>
              {/* this is the default path ^ */}
              <Route element={<Main/>} path="/:userId/characters"/>
              <Route element={<OneCharacter/>} path="/:userId/characters/:characterId"/>
              <Route element={<UpdateCharacter/>} path="/:userId/characters/edit/:characterId"/>
              <Route element={<CreateCharacter/>} path="/:userId/characters/create"/>
              <Route element={<Documentation loggedIn={loggedIn}/>} path="/documentation"/>
            </Routes>
          </div>
      </div>
    </div>
  </BrowserRouter>
  );
}

export default App;
