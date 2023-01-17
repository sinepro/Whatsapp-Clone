import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';

import { id, key, secret } from './secrets.js';

// *** This is an API *** \\

// app config
const app = express();
const port = process.env.PORT || 9000; // port where app gonna run

const pusher = new Pusher({
    appId: id,
    key: key,
    secret: secret,
    cluster: "eu",
    useTLS: true
});

// middleware
app.use(express.json());
app.use(cors()); // Sets headers - security?

// DB config
const connection_url = 'mongodb+srv://admin:ASq2Jh4NzMVNhvPn@cluster0.d7cs5tz.mongodb.net/whatsapp?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => {
    /* console.log('DB is connected'); */

    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        /*console.log(change);*/

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
                {
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp,
                    received: messageDetails.received
                });
        } else {
            console.log('Error triggering Pusher');
        }
    });
});

// api routes
app.get('/', (req, res) => res.status(200).send('hello world'));

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));