import React from 'react';
import OpenPost from "./openPost.jsx"

function CreatePosts(postsArray, navigate, isAcademic, prev_location) {
    const postList = []
    for (let i = 0; i < Object.keys(postsArray).length; i++) {
        const postJson = postsArray[i];
        console.log(`${i}: ${JSON.stringify(postJson)}`);
        if (postJson.academic.toString() != isAcademic.toString()) {
            console.log(`${postJson.academic} vs ${isAcademic}`)
            console.log(i);
            continue;
        }
        postList.push(
            <div className="post">
                
                <div className="postTitleContainer">
                    <h2 className="postTitleText"
                    onClick={async () => {
                        try {
                        const response = await fetch(`/api/event/${postJson.eventID}`);
                        console.log(`response: ${response}`);
                        const eventData = await response.json();
                        console.log(`data: ${eventData}`);
                        navigate("/openPost", { state: { eventData, prev_location } });
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