import React from 'react';
import openPost from "./openPost.jsx"

export function createPosts(postsArray, navigate) {
    const postList = []
    for (let i = 0; i < Object.keys(postsArray).length; i++) {
        const postJson = postsArray[i];
        postList.push(
            <div className="post">
                <div className="image"></div>
                <div className="postTitleContainer">
                    <h2 className="postTitleText" onClick={() => {
                        fetch(`/api/${postJson.eventID}`)
                        .then(response = resposne.json())
                        .then((data) => {
                            navigate("/path", {state: {data}})
                        })
                    }}>{postJson.name}
                    </h2>
                </div>
            </div>
        );
    }
    return postList
    
}