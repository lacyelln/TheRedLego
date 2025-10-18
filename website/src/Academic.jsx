import React, { useState } from "react";
import { getAcademicResponse } from "./serviceLayer/llmRouters";
import CreatePosts from "./createPosts.jsx"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Academic() {

    const [userInfo, setUserInfo] = useState("");
    const [posts, setPosts] = React.useState(null);
    const [numPosts, setNumPosts] = React.useState(0);
    const navigate = useNavigate();
    const prev_location = useLocation();

    React.useEffect(() => {
        fetch("/api/list")
        .then((response) => response.json())
        .then((postList) => {
          const renderedPosts = CreatePosts(postList, navigate, true, prev_location);
          setPosts(renderedPosts);
          setNumPosts(renderedPosts.length); // Now you're counting only the rendered posts
        });
    }, []);

    React.useEffect(() => {
        if (posts) {
          console.log('Updated posts:', posts);
        }
      }, [posts]);
      

    async function handleClick(userInfo){
    try {
        const result = await getAcademicResponse(userInfo);
        // console.log("result" + result);
        // console.log(JSON.stringify(result));
        setUserInfo("");
        console.log(JSON.stringify(result));
        const transformed = result.map(item => ({
            eventID: item.ID,
            name: item.Name,
            academic: true,
          }));
        console.log(JSON.stringify(transformed));         
        setPosts(CreatePosts(transformed, navigate, true, prev_location));   
    } catch (error) {
      console.log(error);
    }  
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
        e.preventDefault();
        if (userInfo) {
            handleClick(userInfo);
            } else {
            alert("submit userInfo!");
            }
        }
    };

    return (
        <>
        <div className="academic">
            <h2>Describe what academic activities you're looking for around campus!</h2>
            <input 
            type="text"
            value={userInfo} 
            onChange={(e) => setUserInfo(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="I am struggling in Math 290, I need help studying."
            required
            />

        </div>
        {/* <div>
         
        </div> */}

        <div id="navbar">
        <div className="flex">
           <p>There are currently {numPosts} events posted!</p>
          <button onClick={() => navigate('/post')} className="navButton">MAKE A POST</button>
          <button onClick={() => navigate('/social')} className="navButton">SOCIAL EVENTS</button>
        </div>
        </div>

        <div className="display-posts">
            {posts}
        </div>
        </>
    )

}