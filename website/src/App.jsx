import React, { useState } from 'react';
import './App.css';
import { createPosts } from "./createPosts.jsx";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./Home.jsx"
import openPost from "./openPost.jsx"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} exact></Route>
          <Route path="/post" element={<openPost />} exact></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
