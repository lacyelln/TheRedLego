import express from 'express';

const app = express();

const port = 3000;

app.use(express.json());
app.use(express.static("public"));

var apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.get('/event/list', async (req, res) => {
    // return the list of events
});

apiRouter.get('/event/get', async (req, res) => {
    // return a single event object
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