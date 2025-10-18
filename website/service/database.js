class DataAccess {
    constructor() {
        this.eventMap = new Map();
    }

    addEvent(event, eventID=null) {
        if (!eventID) {
            this.eventMap.set(event.eventID, event);
        } else {
            this.eventMap.set(eventID, event);
        }
    }

    deleteEvent(event, eventID=null) {
        if (!eventID) {
            this.eventMap.delete(event.eventID);
        } else {
            this.eventMap.delete(eventID);
        }
    }

    getEvent(eventID) {
        if (!this.eventMap.has(eventID)) {
            return null;
        }
        return this.eventMap.get(eventID);
    }

    updateEventRSVP(eventID, newRSVP) {
        item = this.eventMap.get(eventID);
        if (!item) {
            return null;
        }
        item.rsvp.push(newRSVP);
        this.eventMap.set(eventID, item);
        return true;
    }

    updateEventComment(eventID, newComment) {
        item = this.eventMap.get(eventID);
        if (!item) {
            return null;
        }
        item.comments.push(newComment);
        this.eventMap.set(eventID, item);
        return true;
    }

    getAllEvents() {
        eventArr = [];
        this.eventMap.forEach((value, key) => eventArr.push(value));
        return eventArr;
    }

    getSomeEvents(eventIDs) {
        eventArr = [];
        for (let i = 0; i < eventIDs.length; i++) {
            item = this.getEvent(eventIDs[i]);
            if (item) {
                eventArr.push(item);
            }
        }
        return eventArr;
    }
}

export default DataAccess;