import React from 'react'
import { useNavigate } from 'react-router-dom';

export function MakePost() {
    const [eventName, setEventName] = React.useState("");
    const [eventDesc, setEventDesc] = React.useState("");
    const [eventDate, setEventDate] = React.useState("");
    const [eventTime, setEventTime] = React.useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload

        const data = {
        eventName,
        eventDesc,
        eventDate,
        eventTime,
        };

        fetch("/api/event/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(data),
        });
        navigate("/");
    }

    return (
        <>
            <div id="formWrapper">
                <div id="form">
                    <div id="formHeader">CREATE YOUR EVENT!</div>
                    <form onSubmit={handleSubmit}>
                        <div className="twoInputs">
                            <div className="formThing"><p className="formText">Event Name</p><input type="text" placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} required /></div>
                            <div className="formThing"><p className="formText">Event Description</p><input type="text" placeholder="Event Desc" value={eventDesc} onChange={(e) => setEventDesc(e.target.value)} required /></div>
                        </div>
                        <div className="twoInputs">
                            <div className="formThing"><p className="formText">Event Date</p><input type="text" placeholder="Event Date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required /></div>
                            <div className="formThing"><p className="formText">Event Time</p><input type="text" placeholder="Event Time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} required /></div>
                        </div>
                        <div id="submitWrapper"><button type="submit">CREATE EVENT</button></div>
                    </form>
                </div>
            </div>
        </>
    )
}