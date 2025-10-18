import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createPosts } from "./createPosts.jsx"

function App() {
  const [posts, getPosts] = React.useState(null);
  React.useEffect(() => {
    fetch("/api/event/list")
      .then((response) => response.json())
      .then((postList) => {
        getPosts(createPosts(postList));
      })
  }, []);


  return (
    <>
      <div id="header">
        <h1>Welcome to our Website!</h1>
      </div>
      <div id="posts">
        <div class="post">
          <div class="image"></div>
          <div class="postTitleContainer"><h2 class="postTitleText">BYU Redo Hackathon this weekend!</h2></div>
        </div>
        <div class="post">
          <div class="image"></div>
          <div class="postTitleContainer"><h2 class="postTitleText">Halloween Party in TMCB 1999</h2></div>
        </div>
        <div class="post">
          <div class="image"></div>
          <div class="postTitleContainer"><h2 class="postTitleText">Volleyball game @6pm</h2></div>
        </div>
        <div class="post">
          <div class="image"></div>
          <div class="postTitleContainer"><h2 class="postTitleText">Homecoming Dance tonite!</h2></div>
        </div>
        <div class="post">
          <div class="image"></div>
          <div class="postTitleContainer"><h2 class="postTitleText">Tyler surprise bday party!</h2></div>
        </div>
      </div>
    </>
  )
}

export default App
