import React from "react";
import { useLocation } from "react-router-dom";

function openPost() {
    const location = useLocation();
    const {eventData } = location.state || {} // what is || {}?
    
    return (
        <>
            <h1>test</h1>
        </>
    )
}

export default openPost

