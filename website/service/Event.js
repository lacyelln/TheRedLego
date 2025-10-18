class Event {
    constructor(eventID, name, description, poster, date, time, academic) {
        this.eventID = eventID;
        this.name = name;
        this.description = description;
        this.poster = poster;
        this.date = date;
        this.time = time;
        this.academic = academic;
        this.rsvp = [];
        this.comments = [];
    }

    static createEvent(eventID, name, description, poster, date, time, academic, rsvp, comments) {
        let obj = new Event(eventID, name, description, poster, date, time, academic);
        obj.rsvp = rsvp;
        obj.comments = comments;
        return obj;
    }
}

export default Event;