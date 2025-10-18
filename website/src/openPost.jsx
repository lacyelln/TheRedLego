import React from "react";
import { useLocation } from "react-router-dom";

export function openPost() {
    const location = useLocation();
    const {eventData } = location.state || {} // what is || {}?
    
    return (
        
    )
}

