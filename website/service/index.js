import express from 'express';
import Event from 'event';
import DataAccess from 'database.js';

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
    
});

apiRouter.post('/event/create', async (req, res) => {
    // create an event object
});

apiRouter.put('/event/update', async (req, res) => {
    // update the object with new comments or RSVPs
});

apiRouter.delete('/event/delete', async (req, res) => {
    // delete the requested object
});

// default error handling
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message});
});

// returns default page if path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public'});
});