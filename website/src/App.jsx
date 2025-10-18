import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./Home.jsx"
import OpenPost from "./openPost.jsx"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} exact></Route>
          <Route path="/post" element={<OpenPost />} exact></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
