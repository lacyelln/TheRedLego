import express from 'express';
import Event from 'event';
import DataAccess from 'database.js';

var curID = 1;

const app = express();
const dataAccess = new DataAccess();

const port = 3000;

app.use(express.json());
app.use(express.static("public"));

var apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.get('/event/:id', async (req, res) => {
    let id = req.params.id;
    if (!id) {
        res.status(404).send({message: "That event does not exist"});
        return;
    }
    let eventObj = dataAccess.getEvent(id);
    res.send(JSON.stringify(eventObj));
});

apiRouter.get('/event/list', async (req, res) => {
    let eventArr = dataAccess.getAllEvents();
    if (eventArr.length === 0) {
        res.status(404).send({message: "events not found"});
        return;
    }
    let prunedEvents;
    eventArr.forEach((value) => prunedEvents.push({eventID: value.eventID, name: value.name, poster: value.poster, date: value.date, time: value.time}));
    res.send(JSON.stringify(prunedEvents));
});

apiRouter.get('/event/names', async (req, res) => {
    let eventNames = dataAccess.getEventNames();
});

apiRouter.post('/event/create', async (req, res) => {
    let eventID = createEventID();
    let name = req.body?.name;
    let description = req.body?.description;
    let poster = req.body?.poster;
    let date = req.body?.date;
    let time = req.body?.time;
    if (!name || !description || !poster || !date || !time) {
        res.status(400).send({message: "Make sure all fields are provided"});
        return;
    }
    let newEvent = new Event(eventID, name, description, poster, date, time);
    dataAccess.addEvent(newEvent, eventID);
    res.send(JSON.stringify(newEvent));
});

apiRouter.put('/event/update', async (req, res) => {
    // update the object with new comments or RSVPs
});

apiRouter.delete('/event/delete', async (req, res) => {
    let eventID = req.body?.eventID;
    if (!eventID) {
        res.status(404).send({message: "Provided ID is not valid"});
        return;
    }
    dataAccess.deleteEvent(eventID);
    res.send({});
});

// default error handling
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message});
});

// returns default page if path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public'});
});


function createEventID() {
    curID += 1;
    let id = curID;
    if (!dataAccess.getEvent(id)) {
        return id;
    }
    return createEventID();
}