import React from 'react';
import openPost from "./openPost.jsx"
import { useNavigate } from 'react-router-dom';

export function createPosts(postsArray) {
    const navigate = useNavigate();
    const postList = []
    for (i = 0; i < postsArray.length; i++) {
        postJson = postsArray[i];
        postList.push(
            <div class="post">
                <div class="image"></div>
                <div class="postTitleContainer">
                    <h2 class="postTitleText" onClick={() => {
                        fetch(`/api/event/${postJson.eventID}`)
                        .then((data) => {
                            navigate("/path", {state: {data}})
                        });
                    }}>{postJson.name}
                    </h2>
                </div>
            </div>
        );
    }
    return postList
    
}