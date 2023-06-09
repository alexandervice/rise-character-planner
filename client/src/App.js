import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route, Navigate, useLocation} from 'react-router-dom';
import Main from "./views/Main";
import OneCharacter from './components/OneCharacter';
import CreateCharacter from './components/CreateCharacter';
import UpdateCharacter from './components/UpdateCharacter';
import './App.css';
import './index.css';
import LoginRegistration from './views/LoginRegister';
import Navbar from './components/Navbar';
import Documentation from './components/Documentation';
import Map from "./components/Map"

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  // let location = useLocation();
  // console.log(location) // redux

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
      <div className="bg-slate-200 dark:bg-zinc-800 text-black dark:text-white .h-screen w-screen max-w-6xl flex flex-col items-center">
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
          <div className='p-5'>
            <Routes>
              <Route element={loggedIn? (<Navigate to="/:userId/characters" replace />):( <LoginRegistration setLoggedIn={setLoggedIn}/>)} path="/" default/>
              <Route element={<Main/>} path="/:userId/characters"/>
              <Route element={<OneCharacter/>} path="/:userId/characters/:characterId"/>
              <Route element={<UpdateCharacter/>} path="/:userId/characters/edit/:characterId"/>
              <Route element={<CreateCharacter/>} path="/:userId/characters/create"/>
              <Route element={<Documentation loggedIn={loggedIn}/>} path="/documentation"/>
              <Route element={<Map/>} path="/map"/>
            </Routes>
          </div>
      </div>
    </div>
  </BrowserRouter>
  );
}

export default App;
