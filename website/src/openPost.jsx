import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function OpenPost() {
    const location = useLocation();
    const { eventData, prev_location } = location.state || {} // what is || {}?
    const [showRSVP, setShowRSVP] = useState("");
    console.log(`eventData = ${eventData}`);
    const navigate = useNavigate();
    
    return (
        <>
        <div className="open-post-details">
      {/* Toggle button in top-right */}
      <div className="rsvp-header">
        <h2>{eventData.name}</h2>
       
        <button onClick={() => setShowRSVP(!showRSVP)} className="rsvp-toggle">
          {showRSVP ? "Hide RSVP List" : "Show RSVP List"}
        </button>
      </div>
       <h3>Event Details</h3>
       <p>{eventData.description}</p>
      <p><strong>Date:</strong> {eventData.date}</p>
      <p><strong>Time:</strong> {eventData.time}</p>


      {/* RSVP list toggle */}
      {showRSVP ? (
        <div className="rsvp-list">
          <strong>RSVP:</strong>
          <ul>
            {eventData.rsvp && eventData.rsvp.length > 0 ? (
              eventData.rsvp.map((name, idx) => <li key={idx}>{name}</li>)
            ) : (
              <li>No RSVPs yet</li>
            )}
          </ul>
        </div>
      ) : (
        <p><strong>RSVP:</strong> {eventData.rsvp?.length || 0} attending</p>
      )}
      </div>
      <div className="return-box">
        <button onClick={() => navigate(prev_location.pathname)} className="navButton">RETURN</button>
      </div>


        </>
    )
}

export default OpenPost

