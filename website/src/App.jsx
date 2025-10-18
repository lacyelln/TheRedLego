import React, { useState } from 'react';
import './App.css';
//import { createPosts } from "./createPosts.jsx";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./Home.jsx"
import OpenPost from "./openPost.jsx"
import Social from "./Social.jsx"
import Academic from "./Academic.jsx"
import { MakePost } from './makePost.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} exact></Route>
          <Route path="/openPost" element={<OpenPost />} exact></Route>
          <Route path="/social" element={<Social />} exact></Route>
          <Route path="/academic" element={<Academic />} exact></Route>
          <Route path="/post" element={<MakePost />} exact></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
