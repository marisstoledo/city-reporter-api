'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const weather = require('./modules/weather');

const app = express();
app.use(cors());


const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
    response.send('testing testing...is this thing on??')
});

app.get('/weather', weatherHandler);
 async function weatherHandler(request, response) {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let searchQuery = request.query.searchQuery;
 console.log("lat, lon", lat, lon);

await weather(lat, lon)
    .then(summeries => response.send(summeries))
    .catch(error => {
        console.error(error); 
        response.status(500).send('sorry, something went wrong ');
    });

 };

app.use('*', (request, response) => response.status(404).send('that endpoint does not exists'));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));



