import React from "react";
import { useLocation } from "react-router-dom";

function OpenPost() {
    const location = useLocation();
    const {eventData } = location.state || {} // what is || {}?
    console.log(eventData);
    
    return (
        <>
            <div id="openPostTitle">{eventData.name}</div>
            <div id="openPostDesc">{eventData.description}</div>
            <div id="openPostPoster">{eventData.nameOfPoster}</div>
            <div id="openPostDate">{eventData.date}</div>
            <div id="openPostTime">{eventData.time}</div>
            <div id="openPostRSVP">{eventData.rsvp}</div>
            <div id="openPostComments">{eventData.comments}</div>
            <h1>test</h1>
        </>
    )
}

export default OpenPost

