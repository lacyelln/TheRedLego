import React, { useState } from "react";
import { getAcademicResponse } from "./serviceLayer/llmRouters";
import CreatePosts from "./createPosts.jsx"
import { useNavigate } from "react-router-dom";

export default function Academic() {

    const [userInfo, setUserInfo] = useState("");
    const [posts, setPosts] = React.useState(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        fetch("/api/list")
        .then((response) => response.json())
        .then((postList) => {
            console.log(JSON.stringify(postList));
            setPosts(CreatePosts(postList, navigate, true));
            console.log(posts);
        })
    }, []);

    async function handleClick(userInfo){
    try {
        const result = await getAcademicResponse(userInfo);
        console.log(result);
        console.log(JSON.stringify(result));
        setUserInfo("");

        
    } catch (error) {
      setError(error.message);
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

        <div id="navbar">
        <div className="flex">
          <button onClick={() => navigate('/post')} className="navButton">POST</button>
          <button onClick={() => navigate('/social')} className="navButton">SOCIAL</button>
        </div>
        </div>

        <div className="display-posts">
            {posts}
        </div>
        </>
    )

}