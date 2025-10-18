class DataAccess {
    constructor() {
        this.eventMap = new Map();
    }

    addEvent(event, eventID) {
        if (!eventID) {
            this.eventMap.set(event.eventID, event);
        } else {
            this.eventMap.set(eventID, event);
        }
    }

    deleteEvent(eventID) {
        this.eventMap.delete(eventID);
    }

    getEvent(eventID) {
        eventID = Number(eventID);
        if (!this.eventMap.has(eventID)) {
            return null;
        }
        //console.log(`in server: ${this.eventMap.get(eventID)}`);
        return this.eventMap.get(eventID);
    }

    updateEventRSVP(eventID, newRSVP) {
        let item = this.eventMap.get(eventID);
        if (!item) {
            return null;
        }
        item.rsvp.push(newRSVP);
        this.eventMap.set(eventID, item);
        return true;
    }

    updateEventComment(eventID, newComment) {
        let item = this.eventMap.get(eventID);
        if (!item) {
            return null;
        }
        item.comments.push(newComment);
        this.eventMap.set(eventID, item);
        return true;
    }

    getAllEvents() {
        let eventArr = [];
        this.eventMap.forEach((value, key) => eventArr.push(value));
        return eventArr;
    }

    getSomeEvents(eventIDs) {
        let eventArr = [];
        for (let i = 0; i < eventIDs.length; i++) {
            item = this.getEvent(eventIDs[i]);
            if (item) {
                eventArr.push(item);
            }
        }
        return eventArr;
    }

    getEventNamesAcademic() {
        let eventArr = [];
        this.eventMap.forEach((value, key) => {
                if (value.academic) {
                    eventArr.push({eventID: value.eventID, name: value.name});
                }
        });
        return eventArr;
    }

    getEventNamesSocial() {
        let eventArr = [];
        this.eventMap.forEach((value, key) => {
                if (!value.academic) {
                    eventArr.push({eventID: value.eventID, name: value.name});
                }
        });
        return eventArr;
    }
}

export default DataAccess;