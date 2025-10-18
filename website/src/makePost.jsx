import React from 'react'

export function MakePost() {
    const [eventName, setEventName] = React.useState("");
    const [eventDesc, setEventDesc] = React.useState("");
    const [eventDate, setEventDate] = React.useState("");
    const [eventTime, setEventTime] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); // ✅ prevent page reload

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
    }

    return (
        <>
            <form id="eventForm" onSubmit={handleSubmit}>
                <input type="text" name="Event Name" placeholder="Event Name" value={eventName} onChange={(e) => {setEventName(e.target.value)}} required />
                <input type="text" name="Event Desc" placeholder="Event Desc" value={eventDesc} onChange={(e) => {setEventDesc(e.target.value)}} required />
                <input type="text" name="Event Date" placeholder="Event Date" value={eventDate} onChange={(e) => {setEventDate(e.target.value)}} required />
                <input type="text" name="Event Time" placeholder="Event Time" value={eventTime} onChange={(e) => {setEventTime(e.target.value)}} required />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}