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
        <p>Congratulations and welcome to your first year at Brigham Young University!
          We hope this webpage will help you connect with help with other students for all your social and academic needs!
          Feel free to post events whenever you want to host your own social or academic event or let people know what's going on. Feel free as well to 
          look around for some activities that might interest you! 
          Good luck this first year! You got it!</p>
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