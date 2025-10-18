class Event {
    constructor(eventID, name, description, poster ) {
        this.eventID = eventID;
        this.name = name;
        this.image = "dummy";
        this.description = description;
        this.poster = poster;
        this.rsvp = [];
        this.comments = [];
    }
}

export default Event;