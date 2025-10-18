class Event {
    constructor(eventID, name, description, poster, date, time) {
        this.eventID = eventID;
        this.name = name;
        this.image = "dummy";
        this.description = description;
        this.poster = poster;
        this.date = date;
        this.time = time;
        this.rsvp = [];
        this.comments = [];
    }
}

export default Event;