import React from "react";
import { useLocation } from "react-router-dom";

function OpenPost() {
    const location = useLocation();
    const { eventData } = location.state || {} // what is || {}?
    console.log(`eventData = ${eventData}`);
    
    return (
        <>
        <div className="open-post">
            <h1 className="open-post-title">{eventData.name}</h1> 
         </div>

        <div className="open-post-details">
        <p><strong>Details: </strong>{eventData.description}</p>
        <p><strong>Date:</strong> {eventData.date}</p>
        <p><strong>Time:</strong> {eventData.time}</p>
        </div>
        

        </>
    )
}

export default OpenPost

