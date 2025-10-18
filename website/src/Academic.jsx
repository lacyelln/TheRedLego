import { useState, useEffect, useRef } from "react";
import { getAcademicResponse } from "../service";

export default function Academic() {

    const [userInfo, setUserInfo] = useState("");
    const [posts, getPosts] = React.useState(null);

    React.useEffect(() => {
        fetch("/api/list")
        .then((response) => response.json())
        .then((postList) => {
            console.log(JSON.stringify(postList));
            getPosts(CreatePosts(postList, navigate, true));
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
            <p>Describe what academic activities you're looking for around campus!</p>
            <input 
            type="text"
            value={userInfo} 
            ref={inputRef}
            onChange={(e) => setUserInfo(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="I am struggling in Math 290, I need help studying."
            required
            />

        </div>
        <div className="flex">
          <button onClick={() => navigate('/post')} className="navButton">POST</button>
          <button onClick={() => navigate('/academic')} className="navButton">ACADEMIC</button>
        </div>

        <div>
            {posts}
        </div>
        </>
    )

}