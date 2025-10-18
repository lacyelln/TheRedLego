import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import CreatePosts from "./createPosts.jsx";

function Home() {
    const navigate = useNavigate();

    return (
    <>
    <div >
      <div id="header">
        <div className='banner'>
        <h1>Welcome to BYU!</h1>
        </div>
        <div className='overlay'>
        <p>Congratulations and welcome to Brigham Young University — 
          a place where faith, intellect, and friendship come together 
          in a unique and powerful way. As a new Cougar, you’re now 
          part of a vibrant community committed to lifelong learning, 
          service, and becoming your best self. Your time here will be 
          filled with discovery — both academic and personal — as you build 
          meaningful relationships, grow spiritually, and pursue excellence 
          in everything you do. We’re excited to see how you’ll contribute your 
          talents, your voice, and your light to the BYU family. This is just 
          the beginning of something incredible. This webpage is designed to help you
          in both your academic and social endeavors, feel free to look around and
          welcome home.</p>
          </div>
      </div>
      
       

      <div id="navbar">
        <div className="flex">
          {/* <button onClick={() => navigate('/post')} className="navButton">POST</button> */}
          <button onClick={() => navigate('/social')} className="navButton">SOCIAL</button>
          <button onClick={() => navigate('/academic')} className="navButton">ACADEMIC</button>
        </div>
      </div>
      </div>
     

      {/* <div id="posts">
        {posts}
      </div> */}
    </>
  );
}

export default Home