import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function OpenPost() {
    const location = useLocation();
    let { eventData, prev_location } = location.state || {} // what is || {}?
    const [showRSVP, setShowRSVP] = useState("");
    const [ rsvp, setRsvp ] = useState("");
    const [myRsvp, setMyRsvp] = React.useState(eventData.rsvp);
    const [myName, setMyName] = React.useState(eventData.name);
    const [myDescription, setMyDescription] = React.useState(eventData.description);
    const [myDate, setMyDate] = React.useState(eventData.date);
    const [myTime, setMyTime] = React.useState(eventData.time);
    // console.log(`eventData = ${JSON.stringify(eventData)}`);
    const navigate = useNavigate();

    React.useEffect(() => {
      fetch(`/api/event/${eventData.eventID}`)
      .then((response) => response.json())
      .then((data) => updateAllData(data))
      .catch();
    }, [])

    function updateAllData(data) {
      setMyRsvp(data.rsvp);
      setMyName(data.name);
      setMyDescription(data.description);
      setMyDate(data.date);
      setMyTime(data.time);
    }
    
    async function handleClick(){
      fetch("/api/event/rsvp", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({eventID: eventData.eventID ,person: rsvp})
      })
      .then((response) => response.json())
      .then((data) => updateAllData(data))
      .catch();
      setRsvp("");
      // window.location.reload();
    };

    return (
        <>
        <div className="open-post-details">
      {/* Toggle button in top-right */}
      <div className="rsvp-header">
        <h2>{myName}</h2>
       
        <button onClick={() => setShowRSVP(!showRSVP)} className="rsvp-toggle">
          {showRSVP ? "Hide RSVP List" : "Show RSVP List"}
        </button>
      </div>
       <h3>Event Details</h3>
       <p>{myDescription}</p>
      <p><strong>Date:</strong> {myDate}</p>
      <p><strong>Time:</strong> {myTime}</p>

      <div><strong>RSVP:</strong>{showRSVP ? 
      (
        <div className="rsvp-list">
          <ul className="list-test">
            {myRsvp && myRsvp.length > 0 ? (
              myRsvp.map((name, idx) => <li key={idx}>{name}</li>)
            ) : (
              <li>No RSVPs yet</li>
            )}
          </ul>
        </div>
      ) : <inline> {myRsvp?.length || 0} attending</inline>}
      </div>

      {/* RSVP list toggle */}
      {/* {showRSVP ? (
        <div className="rsvp-list">
          <strong id="rsvpTitle">RSVP:</strong>
          <ul>
            {myRsvp && myRsvp.length > 0 ? (
              myRsvp.map((name, idx) => <li key={idx}>{name}</li>)
            ) : (
              <li>No RSVPs yet</li>
            )}
          </ul>
        </div>
      ) : (
        <p><strong>RSVP:</strong> {myRsvp?.length || 0} attending</p>
      )} */}
      
      <div className="rsvp">
        <p>RSVP Here:</p>
        <input 
            type="text"
            value={rsvp} 
            onChange={(e) => setRsvp(e.target.value)}
            placeholder="Do you want to RSVP?"
            required
            />
            <button className="rsvp-submit" onClick={() => handleClick()}>RSVP</button>
      </div>
      </div>
      <div className="return-box">
        <button onClick={() => navigate(prev_location.pathname)} className="navButton">RETURN</button>
      </div>


        </>
    )
}

export default OpenPost

