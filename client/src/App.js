import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from "./views/Main";
import OneStore from './components/OneStore';
import CreateStore from './components/CreateStore';
import UpdateStore from './components/UpdateStore';
import './App.css';
import './index.css';



function App() {
  return (
    <div className="App">
      <h1 className='text-3xl font-bold underline mb-5'>Store Finder</h1>
      <BrowserRouter>
        <Routes>
          <Route element={<Main/>} path="/" default/>
          {/* this is the default path ^ */}
          <Route element={<OneStore/>} path="/stores/:id"/>
          <Route element={<UpdateStore/>} path="/stores/edit/:id"/>
          <Route element={<CreateStore/>} path="/stores/create"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
