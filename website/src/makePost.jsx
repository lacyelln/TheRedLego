import React from 'react'
import { useNavigate } from 'react-router-dom';

export function MakePost() {
    const [name, setEventName] = React.useState("");
    const [description, setEventDesc] = React.useState("");
    const [date, setEventDate] = React.useState("");
    const [time, setEventTime] = React.useState("");
    const [poster, setEventPoster] = React.useState("");
    const [academic, setEventAcademic] = React.useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload

        const data = {
        name,
        description,
        poster,
        date,
        time,
        academic,
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
                            <div className="formThing"><p className="formText">Event Name</p><input type="text" placeholder="Event Name" value={name} onChange={(e) => setEventName(e.target.value)} required /></div>
                            <div className="formThing"><p className="formText">Event Description</p><input type="text" placeholder="Event Desc" value={description} onChange={(e) => setEventDesc(e.target.value)} required /></div>
                        </div>
                        <div className="twoInputs">
                            <div className="formThing"><p className="formText">Event Date</p><input type="text" placeholder="Event Date" value={date} onChange={(e) => setEventDate(e.target.value)} required /></div>
                            <div className="formThing"><p className="formText">Event Time</p><input type="text" placeholder="Event Time" value={time} onChange={(e) => setEventTime(e.target.value)} required /></div>
                        </div>
                        <div className='twoInputs'>
                            <div className="formThing"><p className="formText">Your Name</p><input type="text" placeholder="Your Name" value={poster} onChange={(e) => setEventPoster(e.target.value)} required /></div>
                            <label>Academic<input className="radio" name="postType" type="radio" value={true} onChange={(e) => setEventAcademic(e.target.value)}/></label>
                            <label>Social<input className="radio" name="postType" type="radio" value={false} onChange={(e) => setEventAcademic(e.target.value)}/></label>
                        </div>
                        <div id="submitWrapper"><button id="createButton" type="submit">CREATE EVENT</button></div>
                    </form>
                </div>
            </div>
        </>
    )
}