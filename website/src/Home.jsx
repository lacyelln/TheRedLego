import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import CreatePosts from "./createPosts.jsx";

function Home() {
    const navigate = useNavigate();
    const [posts, getPosts] = React.useState(null);
    React.useEffect(() => {
        fetch("/api/list")
        .then((response) => response.json())
        .then((postList) => {
            console.log(JSON.stringify(postList));
            getPosts(CreatePosts(postList, navigate));
        })
    }, []);

    return (
    <>
        <div id="header">
        <h1>Welcome to our Website!</h1>
      </div>
      {/* <div id="posts">
        <div className="post">
          <div className="image"></div>
          <div className="postTitleContainer"><h2 className="postTitleText">BYU Redo Hackathon this weekend!</h2></div>
        </div>
        <div className="post">
          <div className="image"></div>
          <div className="postTitleContainer"><h2 className="postTitleText">Halloween Party in TMCB 1999</h2></div>
        </div>
        <div className="post">
          <div className="image"></div>
          <div className="postTitleContainer"><h2 className="postTitleText">Volleyball game @6pm</h2></div>
        </div>
        <div className="post">
          <div className="image"></div>
          <div className="postTitleContainer"><h2 className="postTitleText">Homecoming Dance tonite!</h2></div>
        </div>
        <div className="post">
          <div className="image"></div>
          <div className="postTitleContainer"><h2 className="postTitleText">Tyler surprise bday party!</h2></div>
        </div>
      </div> */}
      <div id="posts">
        {posts}
      </div>
      <div id="navbar">
        <div className="flex">
          <div id="postButton"><p>POST</p></div>
        </div>
      </div>
    </>
    )
}

export default Home