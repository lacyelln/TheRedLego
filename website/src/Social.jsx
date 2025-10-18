import React, { useState } from "react";
import { getSocialResponse } from "./serviceLayer/llmRouters";
import CreatePosts from "./createPosts.jsx"
import { useNavigate } from "react-router-dom";

export default function Social () {
    const [userInfo, setUserInfo] = useState("");
    const [posts, setPosts] = React.useState(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        fetch("/api/list")
        .then((response) => response.json())
        .then((postList) => {
            // console.log(JSON.stringify(postList));
            setPosts(CreatePosts(postList, navigate, false));
        })
    }, []);

    React.useEffect(() => {
        if (posts) {
          console.log('Updated posts:', posts);
        }
      }, [posts]);
      

    async function handleClick(userInfo){
    try {
        const result = await getSocialResponse(userInfo);
        // console.log("result" + result);
        // console.log(JSON.stringify(result));
        setUserInfo("");
        console.log(JSON.stringify(result));
        const transformed = result.map(item => ({
            eventID: item.ID,
            name: item.Name,
            academic: false,
          }));
        console.log(JSON.stringify(transformed));         
        setPosts(CreatePosts(transformed, navigate, false));   
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
            <h2>Describe what social activities you're looking for around campus!</h2>
            <input 
            type="text"
            value={userInfo} 
            onChange={(e) => setUserInfo(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="I really want to watch the volleyball game with people."
            required
            />

        </div>

        <div id="navbar">
        <div className="flex">
          <button onClick={() => navigate('/post')} className="navButton">POST</button>
          <button onClick={() => navigate('/academic')} className="navButton">ACADEMIC</button>
        </div>
        </div>

        <div className="display-posts">
            {posts}
        </div>
        </>
    )
}