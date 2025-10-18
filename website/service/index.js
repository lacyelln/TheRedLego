import express from 'express';
import { socialEvents, academicEvents } from './ai.js';
import Event from './Event.js';
import DataAccess from './database.js';
import dummyData from './dummyData.json' with {type: "json"};
import cors from 'cors';

var curID = 1;

const app = express();
const dataAccess = new DataAccess();

const API_BASE = "http://localhost:4000";

const port = 4000;
  
app.use(express.json());
app.use(cors());
app.use(express.static("public"));


initalize();

var apiRouter = express.Router();
app.use('/api', apiRouter);


apiRouter.get('/event/:id', async (req, res) => {
    let id = req.params.id;
    if (!id) {
        res.status(404).send({message: "That event does not exist"});
        return;
    }
    console.log(`my id = ${id}`);
    let eventObj = dataAccess.getEvent(id);
    res.json(eventObj);
});

apiRouter.get('/list', async (req, res) => {
    let eventArr = dataAccess.getAllEvents();
    if (eventArr.length === 0) {
        res.status(404).send({message: "events not found"});
        return;
    }
    let prunedEvents = [];
    eventArr.forEach((value) => prunedEvents.push({eventID: value.eventID, name: value.name, poster: value.poster, date: value.date, time: value.time}));
    res.send(JSON.stringify(prunedEvents));
});

apiRouter.get('/event/names', async (req, res) => {
    let socialNames = dataAccess.getEventNamesSocial();
    let academicNames = dataAccess.getEventNamesAcademic();
    res.send({ social: socialNames, academic: academicNames })
    
});

apiRouter.post('/event/create', async (req, res) => {
    let eventID = createEventID();
    let name = req.body?.name;
    let description = req.body?.description;
    let poster = req.body?.poster;
    let date = req.body?.date;
    let time = req.body?.time;
    let academic = req.body?.academic;
    if (!name || !description || !poster || !date || !time) {
        res.status(400).send({message: "Make sure all fields are provided"});
        return;
    }
    let newEvent = new Event(eventID, name, description, poster, date, time, academic);
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

function initalize() {
    for (let i = 0; i < dummyData.length; i++) {
        let item = dummyData[i];
        let eventID = item.eventID;
        let name = item.name;
        let description = item.description;
        let poster = item.poster;
        let date = item.date;
        let time = item.time;
        let academic = item.academic;
        let rsvp = item.rsvp;
        let comments = item.comments;
        let newEvent = Event.createEvent(eventID, name, description, poster, date, time, academic, rsvp, comments);
        dataAccess.addEvent(newEvent, eventID);
        //console.log(JSON.stringify(newEvent));
    }
}

const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

export async function getSocialResponse(userInfo){
    const response = await fetch(`${API_BASE}/event/names`);
    const socialEvent = socialEvents(response.social, userInfo);
    return socialEvent;
}

export async function getAcademicResponse(userInfo){
    const response = await fetch(`${API_BASE}/event/names`);
    const academicEvent = academicEvents(response.academic, userInfo);
    return academicEvent;
}