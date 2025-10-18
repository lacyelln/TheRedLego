import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function OpenPost() {
    const location = useLocation();
    const { eventData, prev_location } = location.state || {} // what is || {}?
    const [showRSVP, setShowRSVP] = useState("");
    const [ rsvp, setRsvp ] = useState("");
    console.log(`eventData = ${eventData}`);
    console.log(`eventData = ${JSON.stringify(eventData)}`);
    const navigate = useNavigate();
    
  async function handleClick(rsvp){
    fetch("/api/event/rsvp", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({event: EventData.eventID ,person: rsvp})
    })

    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
        e.preventDefault();
        if(rsvp){
           handleClick(rsvp);
        }
       
        }
    };

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
      
      <div className="rsvp">
        <p>RSVP Here:</p>
        <input 
            type="text"
            value={rsvp} 
            onChange={(e) => setRsvp(e.target.value)}
            onKeyDown={handleKeyDown(rsvp)}
            placeholder="Enter your name"
            required
            />
            <button className="rsvp-submit" onClick={handleClick(rsvp)}>RSVP</button>
      </div>
      </div>
      <div className="return-box">
        <button onClick={() => navigate(prev_location.pathname)} className="navButton">RETURN</button>
      </div>


        </>
    )
}

export default OpenPost

