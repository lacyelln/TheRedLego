import React from 'react';
import OpenPost from "./openPost.jsx"

function CreatePosts(postsArray, navigate) {
    const postList = []
    for (let i = 0; i < Object.keys(postsArray).length; i++) {
        const postJson = postsArray[i];
        console.log(postJson);
        postList.push(
            <div className="post">
                <div className="image"></div>
                <div className="postTitleContainer">
                    <h2 className="postTitleText"
                    onClick={async () => {
                        try {
                        const response = await fetch(`/api/event/${postJson.eventID}`);
                        const data = await response.json();
                        navigate("/post", { state: { data } });
                        } catch (error) {
                        console.error("Failed to fetch event:", error);
                        }
                    }}
                    >
                    {postJson.name}
                    </h2>
                </div>
            </div>
        );
    }
    return postList
    
}

export default CreatePosts;